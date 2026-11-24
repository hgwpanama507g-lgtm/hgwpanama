import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  LogOut,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Database,
  Eye,
  Save,
  X,
  Lock,
  AlertTriangle,
  FileText,
  Package,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { auth } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { knowledgeService, KnowledgeArticle } from '../services/knowledgeService';
import { productosService, FirestoreProduct, sanitizeImageUrl } from '../services/productosService';
import { Link } from '../router';

const ADMIN_EMAIL = 'hgwpanama507g@gmail.com';

export const AdminPanelPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [activeTab, setActiveTab] = useState<'articulos' | 'productos'>('articulos');

  // Articles state
  const [articles, setArticles] = useState<KnowledgeArticle[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [articleSearch, setArticleSearch] = useState('');
  const [selectedArticleCategory, setSelectedArticleCategory] = useState('Todas');
  const [editingArticle, setEditingArticle] = useState<Partial<KnowledgeArticle> | null>(null);
  const [isCreatingArticle, setIsCreatingArticle] = useState(false);
  const [articlePreview, setArticlePreview] = useState(false);

  // Products state
  const [products, setProducts] = useState<FirestoreProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [selectedProductStatus, setSelectedProductStatus] = useState('todos');
  const [editingProduct, setEditingProduct] = useState<Partial<FirestoreProduct> | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [productPreview, setProductPreview] = useState(false);

  const [seedStatus, setSeedStatus] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        if (currentUser.email === ADMIN_EMAIL) {
          setUser(currentUser);
          setUnauthorized(false);
          loadData();
        } else {
          setUnauthorized(true);
          setUser(null);
          await signOut(auth);
        }
      } else {
        setUser(null);
        setUnauthorized(false);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loadData = () => {
    loadArticles();
    loadProducts();
  };

  const loadArticles = async () => {
    setLoadingArticles(true);
    try {
      const data = await knowledgeService.getAllArticles(true);
      setArticles(data);
    } catch (err) {
      console.error("Error loading articles in admin:", err);
    } finally {
      setLoadingArticles(false);
    }
  };

  const loadProducts = async () => {
    setLoadingProducts(true);
    try {
      const data = await productosService.getAllProducts(true);
      setProducts(data);
    } catch (err) {
      console.error("Error loading products in admin:", err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user.email !== ADMIN_EMAIL) {
        setUnauthorized(true);
        await signOut(auth);
        setUser(null);
      }
    } catch (err: any) {
      setErrorMsg("Error al iniciar sesión con Google: " + (err.message || ''));
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const handleRunSeed = async () => {
    if (!window.confirm("¿Deseas poblar Firestore con los artículos y productos locales de respaldo?")) return;
    try {
      setSeedStatus("Sembrando datos en Firestore...");
      const artCount = await knowledgeService.seedArticles();
      const prodCount = await productosService.seedProducts();
      setSeedStatus(`¡Se sembraron ${artCount} artículos y ${prodCount} productos nuevos con éxito!`);
      loadData();
      setTimeout(() => setSeedStatus(null), 4000);
    } catch (err: any) {
      setSeedStatus("Error en el sembrado: " + err.message);
    }
  };

  // Article handlers
  const handleDeleteArticle = async (id: string, title: string) => {
    if (!window.confirm(`¿Estás seguro de eliminar el artículo "${title}"?`)) return;
    try {
      await knowledgeService.deleteArticle(id);
      loadArticles();
    } catch (err: any) {
      alert("Error al eliminar: " + err.message);
    }
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle || !editingArticle.title || !editingArticle.category) {
      alert("Por favor completa al menos el título y la categoría.");
      return;
    }
    try {
      const slug = editingArticle.slug || editingArticle.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const payload = {
        slug,
        title: editingArticle.title,
        summary: editingArticle.summary || '',
        content: editingArticle.content || '',
        category: editingArticle.category,
        tags: typeof editingArticle.tags === 'string' ? (editingArticle.tags as string).split(',').map(t => t.trim()).filter(Boolean) : (editingArticle.tags || []),
        source: editingArticle.source || 'HGW Panamá',
        destacado: Boolean(editingArticle.destacado),
        publicado: editingArticle.publicado !== false,
        updatedAt: new Date().toISOString().split('T')[0],
        readTime: editingArticle.readTime || '3 min',
        videoUrl: editingArticle.videoUrl || '',
      };

      if (isCreatingArticle) {
        await knowledgeService.createArticle({ id: `art-${Date.now()}`, ...payload });
      } else if (editingArticle.id) {
        await knowledgeService.updateArticle(editingArticle.id, payload);
      }
      setEditingArticle(null);
      setIsCreatingArticle(false);
      setArticlePreview(false);
      loadArticles();
    } catch (err: any) {
      alert("Error al guardar artículo: " + err.message);
    }
  };

  // Product handlers
  const handleDeleteProduct = async (id: string, name: string) => {
    if (!window.confirm(`¿Estás seguro de eliminar el producto "${name}"?`)) return;
    try {
      await productosService.deleteProduct(id);
      loadProducts();
    } catch (err: any) {
      alert("Error al eliminar producto: " + err.message);
    }
  };

  const handleDuplicateProduct = (prod: FirestoreProduct) => {
    setEditingProduct({
      ...prod,
      id: `prod-${Date.now()}`,
      slug: `${prod.slug}-copia`,
      nombre: `${prod.nombre} (Copia)`,
    });
    setIsCreatingProduct(true);
    setProductPreview(false);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.nombre || editingProduct.precio === undefined) {
      alert("Por favor completa al menos el nombre y el precio.");
      return;
    }

    if (Number(editingProduct.precio) < 0) {
      alert("El precio no puede ser menor a 0.");
      return;
    }

    try {
      const slug = editingProduct.slug || editingProduct.nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const images = Array.isArray(editingProduct.imagenes)
        ? editingProduct.imagenes.map(sanitizeImageUrl).filter(Boolean)
        : ['https://media.academiahgw.online/wp-content/uploads/2026/11/productos-hgw-1024x683.webp'];

      const payload = {
        code: editingProduct.code || '',
        slug,
        nombre: editingProduct.nombre,
        descripcion: editingProduct.descripcion || '',
        categoria: editingProduct.categoria || 'cafes-bebidas',
        categoryLabel: editingProduct.categoryLabel || 'Cafés y Bebidas',
        tags: Array.isArray(editingProduct.tags) ? editingProduct.tags : [],
        precio: Number(editingProduct.precio),
        moneda: editingProduct.moneda || 'USD',
        imagenes: images,
        enlaceCompra: editingProduct.enlaceCompra || 'https://www.healthgreenworld.com/?userName=Yamilka507',
        ficha: editingProduct.ficha || {},
        relacionados: editingProduct.relacionados || {},
        destacado: Boolean(editingProduct.destacado),
        estado: (editingProduct.estado as any) || 'publicado',
        orden: Number(editingProduct.orden) || 99,
        bv: Number(editingProduct.bv) || 0,
        fechaActualizacion: new Date().toISOString().split('T')[0],
      };

      if (isCreatingProduct) {
        await productosService.createProduct({ id: editingProduct.id || `prod-${Date.now()}`, ...payload });
      } else if (editingProduct.id) {
        await productosService.updateProduct(editingProduct.id, payload);
      }

      setEditingProduct(null);
      setIsCreatingProduct(false);
      setProductPreview(false);
      loadProducts();
    } catch (err: any) {
      alert("Error al guardar producto: " + err.message);
    }
  };

  const articleCategories = ['Todas', ...Array.from(new Set(articles.map(a => a.category)))];
  const filteredArticles = articles.filter(art => {
    const matchesCat = selectedArticleCategory === 'Todas' || art.category === selectedArticleCategory;
    const term = articleSearch.toLowerCase();
    const matchesSearch = !term || art.title.toLowerCase().includes(term) || art.summary.toLowerCase().includes(term);
    return matchesCat && matchesSearch;
  });

  const filteredProducts = products.filter(prod => {
    const matchesStatus = selectedProductStatus === 'todos' || prod.estado === selectedProductStatus;
    const term = productSearch.toLowerCase();
    const matchesSearch = !term || prod.nombre.toLowerCase().includes(term) || prod.descripcion.toLowerCase().includes(term);
    return matchesStatus && matchesSearch;
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#4472C4] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#4472C4]/10 text-[#4472C4] flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Panel de Administración</h1>
            <p className="text-xs text-slate-500 mt-1">Acceso restringido para hgwpanama507g@gmail.com</p>
          </div>

          {unauthorized && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Acceso no autorizado. Cuenta incorrecta.</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          <button
            onClick={handleGoogleLogin}
            className="w-full py-3.5 bg-[#4472C4] hover:bg-[#33599E] text-white font-black text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <svg className="w-4 h-4 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Iniciar Sesión con Google</span>
          </button>

          <div className="pt-2">
            <Link to="/" className="text-xs font-bold text-slate-500 hover:underline">
              ← Volver al sitio principal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 pb-16 text-slate-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#4472C4] text-white flex items-center justify-center font-black">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-black text-sm text-slate-950">Panel de Administración</h1>
              <p className="text-[10px] text-slate-500">Gestión de Artículos y Productos HGW</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
              {user.email}
            </span>
            <button
              onClick={handleRunSeed}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors cursor-pointer"
              title="Sembrar datos iniciales en Firestore"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Ejecutar Seed</span>
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Salir</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {seedStatus && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{seedStatus}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('articulos')}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'articulos' ? 'bg-[#4472C4] text-white shadow-md' : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Artículos ({articles.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('productos')}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'productos' ? 'bg-[#4472C4] text-white shadow-md' : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Productos ({products.length})</span>
          </button>
        </div>

        {/* =========================================
            ARTICLES TAB SECTION
            ========================================= */}
        {activeTab === 'articulos' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-80">
                  <input
                    type="text"
                    value={articleSearch}
                    onChange={(e) => setArticleSearch(e.target.value)}
                    placeholder="Buscar artículos..."
                    className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-[#4472C4]"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>

                <select
                  value={selectedArticleCategory}
                  onChange={(e) => setSelectedArticleCategory(e.target.value)}
                  className="py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-[#4472C4]"
                >
                  {articleCategories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  setEditingArticle({
                    title: '',
                    summary: '',
                    content: '',
                    category: articleCategories[1] || 'Afiliación y Tutoriales',
                    tags: [],
                    source: 'Catálogo HGW 2026',
                    destacado: false,
                    publicado: true,
                    readTime: '3 min'
                  });
                  setIsCreatingArticle(true);
                  setArticlePreview(false);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#4472C4] hover:bg-[#33599E] text-white font-black text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Artículo</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-black text-sm text-slate-900">Artículos ({filteredArticles.length})</h2>
              </div>
              {loadingArticles ? (
                <div className="p-12 text-center"><div className="w-6 h-6 border-3 border-[#4472C4] border-t-transparent rounded-full animate-spin mx-auto"></div></div>
              ) : filteredArticles.length === 0 ? (
                <div className="p-12 text-center text-slate-500 text-xs">No se encontraron artículos.</div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {filteredArticles.map(art => (
                    <div key={art.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors">
                      <div className="space-y-1 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-[#4472C4] text-[10px] font-bold">{art.category}</span>
                          {art.publicado !== false ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                              <CheckCircle2 className="w-3 h-3" /> Publicado
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[10px] font-bold">
                              <XCircle className="w-3 h-3" /> Borrador
                            </span>
                          )}
                        </div>
                        <h3 className="font-extrabold text-sm text-slate-900">{art.title}</h3>
                        <p className="text-xs text-slate-500 line-clamp-1">{art.summary}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => { setEditingArticle(art); setIsCreatingArticle(false); setArticlePreview(false); }}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" /> <span>Editar</span>
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(art.id, art.title)}
                          className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> <span>Eliminar</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================
            PRODUCTS TAB SECTION
            ========================================= */}
        {activeTab === 'productos' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-80">
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Buscar productos por nombre..."
                    className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-[#4472C4]"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>

                <select
                  value={selectedProductStatus}
                  onChange={(e) => setSelectedProductStatus(e.target.value)}
                  className="py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-[#4472C4]"
                >
                  <option value="todos">Todos los estados</option>
                  <option value="publicado">Publicado</option>
                  <option value="agotado">Agotado</option>
                  <option value="oculto">Oculto</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setEditingProduct({
                    nombre: '',
                    precio: 23.00,
                    categoria: 'cafes-bebidas',
                    categoryLabel: 'Cafés y Bebidas',
                    descripcion: '',
                    imagenes: ['https://media.academiahgw.online/wp-content/uploads/2026/11/productos-hgw-1024x683.webp'],
                    estado: 'publicado',
                    orden: 10,
                    bv: 10,
                    ficha: { descripcionDetallada: '', modoDeUso: '', ingredientes: [], presentacion: '', advertencias: [], preguntasFrecuentes: [] }
                  });
                  setIsCreatingProduct(true);
                  setProductPreview(false);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#4472C4] hover:bg-[#33599E] text-white font-black text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Producto</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-black text-sm text-slate-900">Productos en Firestore ({filteredProducts.length})</h2>
              </div>
              {loadingProducts ? (
                <div className="p-12 text-center"><div className="w-6 h-6 border-3 border-[#4472C4] border-t-transparent rounded-full animate-spin mx-auto"></div></div>
              ) : filteredProducts.length === 0 ? (
                <div className="p-12 text-center text-slate-500 text-xs">No se encontraron productos. Ejecuta el Seed inicial.</div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {filteredProducts.map(prod => (
                    <div key={prod.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors">
                      <div className="flex items-center gap-4">
                        <img src={prod.imagenes[0]} alt={prod.nombre} className="w-16 h-16 object-contain rounded-2xl bg-slate-50 p-1 shrink-0 border border-slate-200" referrerPolicy="no-referrer" />
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold">{prod.categoryLabel}</span>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              prod.estado === 'publicado' ? 'bg-blue-50 text-blue-700' : prod.estado === 'agotado' ? 'bg-amber-50 text-amber-700' : 'bg-slate-200 text-slate-700'
                            }`}>
                              {prod.estado.toUpperCase()}
                            </span>
                            <span className="text-xs font-black text-[#4472C4]">${prod.precio.toFixed(2)} USD</span>
                          </div>
                          <h3 className="font-extrabold text-sm text-slate-900">{prod.nombre}</h3>
                          <p className="text-xs text-slate-500 line-clamp-1">{prod.descripcion}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleDuplicateProduct(prod)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                          title="Duplicar producto"
                        >
                          <Copy className="w-3.5 h-3.5" /> <span>Duplicar</span>
                        </button>
                        <button
                          onClick={() => { setEditingProduct(prod); setIsCreatingProduct(false); setProductPreview(false); }}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" /> <span>Editar</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id, prod.nombre)}
                          className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> <span>Eliminar</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* =========================================
          ARTICLE EDIT MODAL
          ========================================= */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl my-8 space-y-6 max-h-[90vh] overflow-y-auto text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="font-black text-base text-slate-900">
                {isCreatingArticle ? 'Crear Nuevo Artículo' : 'Editar Artículo'}
              </h2>
              <button onClick={() => setEditingArticle(null)} className="p-1 rounded-xl text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>

            {articlePreview ? (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between">
                  <span className="text-xs font-bold text-[#4472C4]">Vista Previa</span>
                  <button onClick={() => setArticlePreview(false)} className="text-xs font-bold text-slate-700 hover:underline">← Volver</button>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
                  <h1 className="text-2xl font-black">{editingArticle.title}</h1>
                  <p className="p-3 bg-slate-50 rounded-xl text-xs font-bold">{editingArticle.summary}</p>
                  <div className="text-xs whitespace-pre-line">{editingArticle.content}</div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveArticle} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Título *</label>
                  <input
                    type="text"
                    required
                    value={editingArticle.title || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Categoría *</label>
                    <input
                      type="text"
                      required
                      value={editingArticle.category || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">URL Slug</label>
                    <input
                      type="text"
                      value={editingArticle.slug || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Resumen</label>
                  <textarea
                    rows={2}
                    value={editingArticle.summary || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, summary: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contenido *</label>
                  <textarea
                    rows={6}
                    required
                    value={editingArticle.content || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-mono"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Etiquetas (comas)</label>
                    <input
                      type="text"
                      value={Array.isArray(editingArticle.tags) ? editingArticle.tags.join(', ') : (editingArticle.tags || '')}
                      onChange={(e) => setEditingArticle({ ...editingArticle, tags: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Video YouTube URL</label>
                    <input
                      type="text"
                      value={editingArticle.videoUrl || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, videoUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
                    <input
                      type="checkbox"
                      checked={editingArticle.publicado !== false}
                      onChange={(e) => setEditingArticle({ ...editingArticle, publicado: e.target.checked })}
                      className="w-4 h-4 text-[#4472C4] rounded-md"
                    />
                    <span>Publicado</span>
                  </label>
                </div>
                <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                  <button type="button" onClick={() => setArticlePreview(true)} className="px-4 py-2 bg-slate-100 text-xs font-bold rounded-xl">Vista Previa</button>
                  <button type="submit" className="px-5 py-2 bg-[#4472C4] text-white text-xs font-black rounded-xl">Guardar</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* =========================================
          PRODUCT EDIT MODAL
          ========================================= */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl my-8 space-y-6 max-h-[90vh] overflow-y-auto text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="font-black text-base text-slate-900">
                {isCreatingProduct ? 'Crear Nuevo Producto' : 'Editar Producto'}
              </h2>
              <button onClick={() => setEditingProduct(null)} className="p-1 rounded-xl text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>

            {productPreview ? (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800">Vista Previa del Producto</span>
                  <button onClick={() => setProductPreview(false)} className="text-xs font-bold text-slate-700 hover:underline">← Volver</button>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
                  <img src={editingProduct.imagenes?.[0]} alt="" className="w-32 h-32 object-contain bg-slate-50 p-2 rounded-xl mx-auto" />
                  <h1 className="text-2xl font-black text-center">{editingProduct.nombre}</h1>
                  <p className="text-center font-black text-[#4472C4] text-lg">${Number(editingProduct.precio || 0).toFixed(2)} USD</p>
                  <p className="text-xs font-medium text-center">{editingProduct.descripcion}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nombre del Producto *</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.nombre || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, nombre: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Precio (USD) *</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      value={editingProduct.precio ?? ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, precio: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Categoría ID</label>
                    <input
                      type="text"
                      value={editingProduct.categoria || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, categoria: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                      placeholder="cafes-bebidas"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nombre Categoría</label>
                    <input
                      type="text"
                      value={editingProduct.categoryLabel || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, categoryLabel: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                      placeholder="Cafés y Bebidas"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Estado</label>
                    <select
                      value={editingProduct.estado || 'publicado'}
                      onChange={(e) => setEditingProduct({ ...editingProduct, estado: e.target.value as any })}
                      className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                    >
                      <option value="publicado">Publicado</option>
                      <option value="agotado">Agotado</option>
                      <option value="oculto">Oculto</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Descripción Corta / Resumen</label>
                  <textarea
                    rows={2}
                    value={editingProduct.descripcion || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, descripcion: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Imágenes (Una URL por línea / Enlaces https o Google Drive)</label>
                  <textarea
                    rows={3}
                    value={Array.isArray(editingProduct.imagenes) ? editingProduct.imagenes.join('\n') : (editingProduct.imagenes || '')}
                    onChange={(e) => setEditingProduct({ ...editingProduct, imagenes: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-mono"
                    placeholder="https://... o https://drive.google.com/file/d/.../view"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">La primera imagen será la principal. Los enlaces de Google Drive se convierten automáticamente.</p>
                </div>

                {/* Ficha de conocimiento fields */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <h3 className="font-black text-xs text-slate-800 uppercase">Ficha de Conocimiento (Opcional)</h3>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Descripción Detallada</label>
                    <textarea
                      rows={3}
                      value={editingProduct.ficha?.descripcionDetallada || ''}
                      onChange={(e) => setEditingProduct({
                        ...editingProduct,
                        ficha: { ...editingProduct.ficha, descripcionDetallada: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Modo de Uso</label>
                    <input
                      type="text"
                      value={editingProduct.ficha?.modoDeUso || ''}
                      onChange={(e) => setEditingProduct({
                        ...editingProduct,
                        ficha: { ...editingProduct.ficha, modoDeUso: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Ingredientes (separados por comas)</label>
                    <input
                      type="text"
                      value={editingProduct.ficha?.ingredientes ? editingProduct.ficha.ingredientes.join(', ') : ''}
                      onChange={(e) => setEditingProduct({
                        ...editingProduct,
                        ficha: { ...editingProduct.ficha, ingredientes: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }
                      })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl"
                      placeholder="Café arábica, Ganoderma lucidum..."
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                  <button type="button" onClick={() => setProductPreview(true)} className="px-4 py-2.5 bg-slate-100 text-xs font-bold rounded-xl">Vista Previa</button>
                  <button type="submit" className="px-5 py-2.5 bg-[#4472C4] text-white text-xs font-black rounded-xl">Guardar Producto</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
