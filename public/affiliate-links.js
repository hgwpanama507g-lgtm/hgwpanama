const AFFILIATE_ENABLED = true;
const affiliateRules = [
  {
    keyword: "HGW",
    url: "https://www.healthgreenworld.com/?userName=Yamilka507",
    caseSensitive: false,
    wholeWordOnly: true,
    openInNewTab: true,
    rel: "nofollow sponsored noopener noreferrer",
    maxPerPage: 0   // 0 = todas las apariciones
  }
];

(function () {
  "use strict";

  if (!AFFILIATE_ENABLED || !Array.isArray(affiliateRules) || affiliateRules.length === 0) {
    return;
  }

  const EXCLUDED_SELECTOR =
    "a, script, style, noscript, code, pre, input, textarea, select, button, title, head, svg, [contenteditable='true'], [contenteditable=''], [data-no-affiliate], .no-affiliate, [data-auto-affiliate='true'], .auto-affiliate-link";

  const STYLE_ID = "auto-affiliate-links-style";
  const DISCLOSURE_ID = "auto-affiliate-disclosure";
  const processedNodes = new WeakSet();
  const pageMatchCounts = new Map();
  let observer = null;
  let scheduled = false;

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function compileRuleRegex(rule) {
    const escaped = escapeRegExp(rule.keyword);
    const pattern = rule.wholeWordOnly ? "\\b" + escaped + "\\b" : escaped;
    const flags = rule.caseSensitive ? "g" : "gi";
    return new RegExp(pattern, flags);
  }

  const compiledRules = affiliateRules
    .filter((rule) => rule && rule.keyword && rule.url)
    .map((rule) => ({
      rule,
      regex: compileRuleRegex(rule),
    }));

  if (compiledRules.length === 0) {
    return;
  }

  function injectStyles() {
    if (document.getElementById(STYLE_ID) || !document.head) {
      return;
    }
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = [
      ".auto-affiliate-link {",
      "  color: inherit;",
      "  font: inherit;",
      "  text-decoration: underline;",
      "  text-decoration-color: rgba(68, 114, 196, 0.45);",
      "  text-underline-offset: 2px;",
      "  transition: color 0.18s ease, text-decoration-color 0.18s ease;",
      "}",
      ".auto-affiliate-link:hover,",
      ".auto-affiliate-link:focus-visible {",
      "  color: #1E40AF;",
      "  text-decoration-color: currentColor;",
      "}",
      "#" + DISCLOSURE_ID + " {",
      "  width: 100%;",
      "  padding: 10px 16px;",
      "  text-align: center;",
      "  font-family: inherit;",
      "  font-size: 12px;",
      "  line-height: 1.5;",
      "  color: #475569;",
      "  background-color: #f8fafc;",
      "  border-top: 1px solid #e2e8f0;",
      "}",
    ].join("\n");
    document.head.appendChild(style);
  }

  function injectDisclosure() {
    if (!document.body || document.getElementById(DISCLOSURE_ID)) {
      return;
    }
    const disclosure = document.createElement("div");
    disclosure.id = DISCLOSURE_ID;
    disclosure.setAttribute("data-no-affiliate", "true");
    disclosure.className = "no-affiliate";
    disclosure.setAttribute("role", "note");
    disclosure.textContent =
      "Este sitio contiene enlaces de afiliado. Podemos recibir una comisión por compras realizadas a través de ellos, sin costo adicional para ti.";
    document.body.appendChild(disclosure);
  }

  function isExcludedNode(node) {
    const parent = node.parentElement;
    if (!parent) {
      return true;
    }
    return Boolean(parent.closest(EXCLUDED_SELECTOR));
  }

  function createAffiliateAnchor(matchedText, rule) {
    const anchor = document.createElement("a");
    anchor.href = rule.url;
    anchor.className = "auto-affiliate-link";
    anchor.setAttribute("data-auto-affiliate", "true");
    if (rule.openInNewTab) {
      anchor.target = "_blank";
    }
    if (rule.rel) {
      anchor.rel = rule.rel;
    }
    anchor.textContent = matchedText;
    if (anchor.firstChild) {
      processedNodes.add(anchor.firstChild);
    }
    return anchor;
  }

  function findFirstMatchInText(text) {
    let bestMatch = null;

    for (let i = 0; i < compiledRules.length; i++) {
      const entry = compiledRules[i];
      const maxPerPage = Number(entry.rule.maxPerPage) || 0;
      const currentCount = pageMatchCounts.get(entry.rule) || 0;

      if (maxPerPage > 0 && currentCount >= maxPerPage) {
        continue;
      }

      entry.regex.lastIndex = 0;
      const match = entry.regex.exec(text);
      if (match && (!bestMatch || match.index < bestMatch.index)) {
        bestMatch = {
          index: match.index,
          text: match[0],
          rule: entry.rule,
        };
      }
    }

    return bestMatch;
  }

  function processTextNode(textNode) {
    if (!textNode || processedNodes.has(textNode) || isExcludedNode(textNode)) {
      return;
    }

    const originalText = textNode.nodeValue;
    if (!originalText || !originalText.trim()) {
      processedNodes.add(textNode);
      return;
    }

    let remaining = originalText;
    const firstMatch = findFirstMatchInText(remaining);
    if (!firstMatch) {
      processedNodes.add(textNode);
      return;
    }

    const fragment = document.createDocumentFragment();
    let safetyCounter = 0;

    while (remaining.length > 0 && safetyCounter < 500) {
      safetyCounter++;
      const match = findFirstMatchInText(remaining);
      if (!match) {
        const trailingNode = document.createTextNode(remaining);
        processedNodes.add(trailingNode);
        fragment.appendChild(trailingNode);
        break;
      }

      if (match.index > 0) {
        const leadingNode = document.createTextNode(remaining.slice(0, match.index));
        processedNodes.add(leadingNode);
        fragment.appendChild(leadingNode);
      }

      const anchor = createAffiliateAnchor(match.text, match.rule);
      fragment.appendChild(anchor);

      const prevCount = pageMatchCounts.get(match.rule) || 0;
      pageMatchCounts.set(match.rule, prevCount + 1);

      remaining = remaining.slice(match.index + match.text.length);
    }

    processedNodes.add(textNode);
    if (textNode.parentNode) {
      textNode.parentNode.replaceChild(fragment, textNode);
    }
  }

  function processSubtree(root) {
    if (!root) {
      return;
    }

    if (root.nodeType === Node.TEXT_NODE) {
      processTextNode(root);
      return;
    }

    if (root.nodeType !== Node.ELEMENT_NODE) {
      return;
    }

    if (root.matches && root.matches(EXCLUDED_SELECTOR)) {
      return;
    }

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (processedNodes.has(node) || isExcludedNode(node)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const nodesToProcess = [];
    let current;
    while ((current = walker.nextNode())) {
      nodesToProcess.push(current);
    }

    for (let i = 0; i < nodesToProcess.length; i++) {
      processTextNode(nodesToProcess[i]);
    }
  }

  function scanDocument() {
    if (!document.body) {
      return;
    }
    injectStyles();
    processSubtree(document.body);
    injectDisclosure();
  }

  function scheduleScan() {
    if (scheduled) {
      return;
    }
    scheduled = true;
    window.requestAnimationFrame(function () {
      scheduled = false;
      if (observer) {
        observer.disconnect();
      }
      scanDocument();
      startObserver();
    });
  }

  function startObserver() {
    if (!document.body || typeof MutationObserver === "undefined") {
      return;
    }
    if (!observer) {
      observer = new MutationObserver(function (mutations) {
        let shouldScan = false;
        for (let i = 0; i < mutations.length; i++) {
          const mutation = mutations[i];
          if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
            shouldScan = true;
            break;
          }
          if (mutation.type === "characterData" && !processedNodes.has(mutation.target)) {
            shouldScan = true;
            break;
          }
        }
        if (shouldScan) {
          scheduleScan();
        }
      });
    }
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  function init() {
    scanDocument();
    startObserver();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
