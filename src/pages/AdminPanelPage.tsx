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
  FileText
} from 'lucide-react';
import { auth } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { knowledgeService, KnowledgeArticle } from '../services/knowledgeService';
import { Link } from '../router';

const ADMIN_EMAIL = 'hgwpanama507g@gmail.com';

export const AdminPanelPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [articles, setArticles] = useState<KnowledgeArticle[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  
  // Editor state
  const [editingArticle, setEditingArticle] = useState<Partial<KnowledgeArticle> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [seedStatus, setSeedStatus] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        if (currentUser.email === ADMIN_EMAIL) {
          setUser(currentUser);
          setUnauthorized(false);
          loadArticles();
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

  const loadArticles = async () => {
    setLoadingArticles(true);
    try {
      const data = await knowledgeService.getAllArticles(true);
      setArticles(data);
    } catch (err) {
      console.error("Error loading articles in admin:", err);
      setErrorMsg("Error al cargar artículos de Firestore.");
    } finally {
      setLoadingArticles(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      if (email !== ADMIN_EMAIL) {
        setUnauthorized(true);
        await signOut(auth);
        setUser(null);
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setErrorMsg("Error al iniciar sesión con Google: " + (err.message || ''));
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const handleRunSeed = async () => {
    if (!window.confirm("¿Deseas poblar Firestore con los artículos locales de respaldo?")) return;
    try {
      setSeedStatus("Sembrando artículos en Firestore...");
      const count = await knowledgeService.seedArticles();
      setSeedStatus(`¡Se sembraron ${count} artículos nuevos exitosamente!`);
      loadArticles();
      setTimeout(() => setSeedStatus(null), 4000);
    } catch (err: any) {
      console.error("Seed error:", err);
      setSeedStatus("Error en el sembrado: " + err.message);
    }
  };

  const handleDelete = async (id: string, title: string) => {
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

      if (isCreating) {
        const customId = `art-${Date.now()}`;
        await knowledgeService.createArticle({ id: customId, ...payload });
      } else if (editingArticle.id) {
        await knowledgeService.updateArticle(editingArticle.id, payload);
      }

      setEditingArticle(null);
      setIsCreating(false);
      setPreviewMode(false);
      loadArticles();
    } catch (err: any) {
      alert("Error al guardar artículo: " + err.message);
    }
  };

  const categories = ['Todas', ...Array.from(new Set(articles.map(a => a.category)))];

  const filteredArticles = articles.filter(art => {
    const matchesCat = selectedCategory === 'Todas' || art.category === selectedCategory;
    const term = searchTerm.toLowerCase();
    const matchesSearch = !term || art.title.toLowerCase().includes(term) || art.summary.toLowerCase().includes(term);
    return matchesCat && matchesSearch;
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#4472C4] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Not logged in -> Show Google Sign in
  if (!user) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#4472C4]/10 text-[#4472C4] flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Panel de Administración</h1>
            <p className="text-xs text-slate-500 mt-1">Acceso restringido para la administración de la Base de Conocimiento</p>
          </div>

          {unauthorized && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Acceso no autorizado. La cuenta ingresada no corresponde al correo de la administradora.</span>
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
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#4472C4] text-white flex items-center justify-center font-black">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-black text-sm text-slate-950">Panel de Administración</h1>
              <p className="text-[10px] text-slate-500">Base de Conocimiento HGW Panamá</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
              {user.email}
            </span>
            <button
              onClick={handleRunSeed}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors cursor-pointer"
              title="Sembrar artículos locales a Firestore"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Ejecutar Seed</span>
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition-colors cursor-pointer"
              title="Cerrar sesión"
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

        {/* Action Header */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-80">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar artículos..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-[#4472C4]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-[#4472C4]"
            >
              {categories.map(c => (
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
                category: categories[1] || 'Afiliación y Tutoriales',
                tags: [],
                source: 'Catálogo HGW 2026',
                destacado: false,
                publicado: true,
                readTime: '3 min'
              });
              setIsCreating(true);
              setPreviewMode(false);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#4472C4] hover:bg-[#33599E] text-white font-black text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Artículo</span>
          </button>
        </div>

        {/* Articles List Table / Grid */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-black text-sm text-slate-900">
              Artículos en Firestore ({filteredArticles.length})
            </h2>
            <span className="text-xs text-slate-500">Gestión de contenido en tiempo real</span>
          </div>

          {loadingArticles ? (
            <div className="p-12 text-center">
              <div className="w-6 h-6 border-3 border-[#4472C4] border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-xs">
              No se encontraron artículos. Puedes ejecutar el Seed inicial o crear uno nuevo.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredArticles.map(art => (
                <div key={art.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors">
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-[#4472C4] text-[10px] font-bold">
                        {art.category}
                      </span>
                      {art.publicado !== false ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3" /> Publicado
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[10px] font-bold">
                          <XCircle className="w-3 h-3" /> Borrador
                        </span>
                      )}
                      {art.destacado && (
                        <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-black">
                          ★ Destacado
                        </span>
                      )}
                    </div>
                    <h3 className="font-extrabold text-sm text-slate-900">{art.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{art.summary}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setEditingArticle(art);
                        setIsCreating(false);
                        setPreviewMode(false);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Editar</span>
                    </button>
                    <button
                      onClick={() => handleDelete(art.id, art.title)}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Eliminar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Editor Modal */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl my-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="font-black text-base text-slate-900">
                {isCreating ? 'Crear Nuevo Artículo' : 'Editar Artículo'}
              </h2>
              <button
                onClick={() => setEditingArticle(null)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {previewMode ? (
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between">
                  <span className="text-xs font-bold text-[#4472C4]">Vista Previa del Artículo</span>
                  <button
                    onClick={() => setPreviewMode(false)}
                    className="text-xs font-bold text-slate-700 hover:underline"
                  >
                    ← Volver a editar
                  </button>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <span className="px-2.5 py-1 bg-slate-100 rounded-full">{editingArticle.category}</span>
                    <span>Actualizado: {editingArticle.updatedAt || 'Hoy'}</span>
                  </div>
                  <h1 className="text-2xl font-black text-slate-900">{editingArticle.title}</h1>
                  <p className="p-4 bg-slate-50 rounded-xl font-semibold text-slate-800 text-sm">{editingArticle.summary}</p>
                  <div className="prose prose-slate text-sm whitespace-pre-line text-slate-800">{editingArticle.content}</div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveArticle} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Título del Artículo *</label>
                  <input
                    type="text"
                    required
                    value={editingArticle.title || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-[#4472C4]"
                    placeholder="Ej. Guía de Afiliación Paso a Paso"
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
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-[#4472C4]"
                      placeholder="Ej. Afiliación y Tutoriales"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">URL Slug</label>
                    <input
                      type="text"
                      value={editingArticle.slug || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-[#4472C4]"
                      placeholder="guia-afiliacion"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Resumen (1-2 líneas)</label>
                  <textarea
                    rows={2}
                    value={editingArticle.summary || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, summary: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-[#4472C4]"
                    placeholder="Breve resumen del artículo..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contenido Completo *</label>
                  <textarea
                    rows={8}
                    required
                    value={editingArticle.content || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-[#4472C4] font-mono"
                    placeholder="Desarrollo del artículo..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Etiquetas (separadas por comas)</label>
                    <input
                      type="text"
                      value={Array.isArray(editingArticle.tags) ? editingArticle.tags.join(', ') : (editingArticle.tags || '')}
                      onChange={(e) => setEditingArticle({ ...editingArticle, tags: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-[#4472C4]"
                      placeholder="Afiliación, Tutorial, Guía"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Fuente</label>
                    <input
                      type="text"
                      value={editingArticle.source || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, source: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-[#4472C4]"
                      placeholder="Catálogo Oficial HGW 2026"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">URL de Video Embed (YouTube Opcional)</label>
                    <input
                      type="text"
                      value={editingArticle.videoUrl || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, videoUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-[#4472C4]"
                      placeholder="https://www.youtube.com/embed/..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Tiempo de Lectura</label>
                    <input
                      type="text"
                      value={editingArticle.readTime || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, readTime: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-[#4472C4]"
                      placeholder="3 min"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={editingArticle.publicado !== false}
                      onChange={(e) => setEditingArticle({ ...editingArticle, publicado: e.target.checked })}
                      className="w-4 h-4 text-[#4472C4] rounded-md border-slate-300 focus:ring-0"
                    />
                    <span>Publicado (Visible para visitantes)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={Boolean(editingArticle.destacado)}
                      onChange={(e) => setEditingArticle({ ...editingArticle, destacado: e.target.checked })}
                      className="w-4 h-4 text-[#4472C4] rounded-md border-slate-300 focus:ring-0"
                    />
                    <span>Destacado</span>
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setPreviewMode(true)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Vista Previa</span>
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#4472C4] hover:bg-[#33599E] text-white font-black text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Artículo</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
