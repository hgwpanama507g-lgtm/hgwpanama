import React from 'react';

export const HGW_AFFILIATE_URL = 'https://www.healthgreenworld.com/?userName=Yamilka507';

/**
 * Replaces standalone occurrences of the word "HGW" in text strings with a clickable link
 * pointing to HGW_AFFILIATE_URL with target="_blank" rel="noopener noreferrer",
 * preserving original typography, color, and styling.
 */
export const renderWithHGWLinks = (text: string): React.ReactNode => {
  if (!text || typeof text !== 'string') return text;

  // Split by word boundary for "HGW"
  const parts = text.split(/\bHGW\b/g);
  if (parts.length === 1) return text;

  const result: React.ReactNode[] = [];
  parts.forEach((part, index) => {
    result.push(part);
    if (index < parts.length - 1) {
      result.push(
        <a
          key={`hgw-link-${index}`}
          href={HGW_AFFILIATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-inherit no-underline hover:underline"
          title="Sitio Oficial HGW - Yamilka507"
        >
          HGW
        </a>
      );
    }
  });

  return <>{result}</>;
};

/**
 * Helper component that renders children strings with HGW auto-linked.
 */
export const HGWText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (typeof children === 'string') {
    return <>{renderWithHGWLinks(children)}</>;
  }
  return <>{children}</>;
};
