import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  Trash2,
  ExternalLink,
  LogOut,
  Lock,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Download,
} from 'lucide-react';
import { auth, db } from '../lib/firebase';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';

interface ContactLead {
  id: string;
  fullName: string;
  phone: string;
  visitorType: string;
  interest?: string;
  summary?: string;
  messages?: { role: string; content: string }[];
  status: 'nuevo' | 'contactado' | 'cerrado';
  notes?: string;
  createdAt: string;
}

export const AdminPanelPage: React.FC = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('todos');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [selectedLead, setSelectedLead] = useState<ContactLead | null>(null);
  const [internalNotes, setInternalNotes] = useState('');

  // Listen to Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (currentUser) {
        fetchLeads();
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err: any) {
      console.error('Login error:', err);
      setLoginError('Credenciales incorrectas o acceso denegado. Verifica tu correo y contraseña.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLeads([]);
      setSelectedLead(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const loadedLeads: ContactLead[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        loadedLeads.push({
          id: docSnap.id,
          fullName: data.fullName || 'Sin nombre',
          phone: data.phone || '',
          visitorType: data.visitorType || 'informacion',
          interest: data.interest || '',
          summary: data.summary || '',
          messages: data.messages || [],
          status: data.status || 'nuevo',
          notes: data.notes || '',
          createdAt: data.createdAt || new Date().toISOString(),
        });
      });
      setLeads(loadedLeads);
    } catch (err: any) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoadingLeads(false);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: 'nuevo' | 'contactado' | 'cerrado') => {
    try {
      await updateDoc(doc(db, 'contacts', leadId), { status: newStatus });
      setLeads(leads.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l)));
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead({ ...selectedLead, status: newStatus });
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const saveNotes = async (leadId: string) => {
    try {
      await updateDoc(doc(db, 'contacts', leadId), { notes: internalNotes });
      setLeads(leads.map((l) => (l.id === leadId ? { ...l, notes: internalNotes } : l)));
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead({ ...selectedLead, notes: internalNotes });
      }
      alert('Notas guardadas correctamente.');
    } catch (err) {
      console.error('Error saving notes:', err);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm('¿Estás seguro de eliminar este contacto?')) return;
    try {
      await deleteDoc(doc(db, 'contacts', leadId));
      setLeads(leads.filter((l) => l.id !== leadId));
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead(null);
      }
    } catch (err) {
      console.error('Error deleting lead:', err);
    }
  };

  const exportToCSV = () => {
    const headers = ['Nombre Completo', 'Teléfono', 'Tipo', 'Interés', 'Estado', 'Fecha', 'Notas'];
    const rows = leads.map((l) => [
      `"${l.fullName}"`,
      `"${l.phone}"`,
      `"${l.visitorType}"`,
      `"${l.interest || ''}"`,
      `"${l.status}"`,
      `"${l.createdAt}"`,
      `"${l.notes || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `hgw_contactos_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter leads
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.interest && l.interest.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'todos' || l.visitorType === filterType;
    const matchesStatus = filterStatus === 'todos' || l.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <div className="flex items-center gap-3 bg-white p-6 rounded-2xl shadow-md">
          <div className="w-6 h-6 border-3 border-[#4472C4] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-bold text-stone-700">Verificando sesión de administrador...</span>
        </div>
      </div>
    );
  }

  // Login View
  if (!user) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-stone-200 p-8">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-[#4472C4]/10 rounded-2xl text-[#4472C4] flex items-center justify-center mx-auto mb-3">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-black text-black">Panel de Administrador</h1>
            <p className="text-xs text-stone-500 mt-1">
              Acceso exclusivo para administradores de HGW Panamá
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl font-semibold">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                Correo Electrónico
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@hgwpanama.com"
                className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-[#4472C4]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-[#4472C4]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#4472C4] hover:bg-[#33599E] text-white font-extrabold text-sm rounded-xl shadow-md transition-colors"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 pb-12">
      {/* Top Navbar */}
      <header className="bg-white border-b border-stone-200 px-6 py-4 sticky top-0 z-30 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#4472C4] rounded-xl text-white flex items-center justify-center font-black">
            H
          </div>
          <div>
            <h1 className="font-extrabold text-base text-black">Panel de Administrador – Leads & Chat</h1>
            <span className="text-xs text-stone-500">{user.email}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Exportar CSV</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Filters & Search Bar */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre o teléfono..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-[#4472C4]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700">
              <Filter className="w-3.5 h-3.5 text-[#4472C4]" />
              <span>Tipo:</span>
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none"
            >
              <option value="todos">Todos los tipos</option>
              <option value="emprendedor">Emprendedor / Afiliación</option>
              <option value="cliente">Cliente de productos</option>
              <option value="socio">Socio registrado</option>
              <option value="informacion">Información general</option>
            </select>

            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 ml-2">
              <span>Estado:</span>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none"
            >
              <option value="todos">Todos</option>
              <option value="nuevo">Nuevo</option>
              <option value="contactado">Contactado</option>
              <option value="cerrado">Cerrado</option>
            </select>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Leads Table / List */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
              <h2 className="font-extrabold text-sm text-stone-800">
                Prospectos Registrados ({filteredLeads.length})
              </h2>
            </div>

            {loadingLeads ? (
              <div className="p-12 text-center text-stone-500 text-xs">Cargando registros...</div>
            ) : filteredLeads.length === 0 ? (
              <div className="p-12 text-center text-stone-500 text-xs">No se encontraron prospectos.</div>
            ) : (
              <div className="divide-y divide-stone-100 overflow-x-auto">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => {
                      setSelectedLead(lead);
                      setInternalNotes(lead.notes || '');
                    }}
                    className={`p-4 hover:bg-stone-50 cursor-pointer transition-colors flex items-center justify-between gap-4 ${
                      selectedLead?.id === lead.id ? 'bg-blue-50/70 border-l-4 border-[#4472C4]' : ''
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-xs text-stone-900 truncate">
                          {lead.fullName}
                        </h3>
                        <span
                          className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                            lead.visitorType === 'emprendedor'
                              ? 'bg-purple-100 text-purple-800'
                              : lead.visitorType === 'socio'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {lead.visitorType}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 font-medium mt-0.5 tabular-nums">
                        📱 +507 {lead.phone}
                      </p>
                      <p className="text-[11px] text-stone-500 truncate mt-1">
                        {lead.interest || lead.summary || 'Sin resumen'}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span
                        className={`text-[10px] px-2.5 py-1 rounded-lg font-bold ${
                          lead.status === 'nuevo'
                            ? 'bg-red-100 text-red-700'
                            : lead.status === 'contactado'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {lead.status.toUpperCase()}
                      </span>
                      <span className="text-[10px] text-stone-400">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Detailed Lead Inspector */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sticky top-24">
            {selectedLead ? (
              <div className="space-y-5">
                <div className="flex items-start justify-between border-b border-stone-100 pb-4">
                  <div>
                    <h2 className="font-black text-base text-stone-900">{selectedLead.fullName}</h2>
                    <p className="text-xs text-stone-600 font-medium tabular-nums mt-0.5">
                      📱 +507 {selectedLead.phone}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteLead(selectedLead.id)}
                    className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    title="Eliminar contacto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200">
                    <span className="text-[10px] font-bold text-stone-500 uppercase block">Tipo</span>
                    <span className="text-xs font-extrabold text-stone-900 capitalize">
                      {selectedLead.visitorType}
                    </span>
                  </div>
                  <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200">
                    <span className="text-[10px] font-bold text-stone-500 uppercase block">Estado</span>
                    <select
                      value={selectedLead.status}
                      onChange={(e) =>
                        updateLeadStatus(selectedLead.id, e.target.value as any)
                      }
                      className="text-xs font-bold bg-transparent text-[#4472C4] focus:outline-none cursor-pointer"
                    >
                      <option value="nuevo">NUEVO</option>
                      <option value="contactado">CONTACTADO</option>
                      <option value="cerrado">CERRADO</option>
                    </select>
                  </div>
                </div>

                {/* WhatsApp Quick Action Button */}
                <div>
                  <a
                    href={`https://wa.me/507${selectedLead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `¡Hola ${selectedLead.fullName}! Te escribo de HGW Panamá en respuesta a tu consulta sobre ${selectedLead.visitorType}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 bg-[#00A550] hover:bg-[#008f44] text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors text-center"
                  >
                    <span>Abrir WhatsApp con {selectedLead.fullName}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Conversation History */}
                <div>
                  <h3 className="font-extrabold text-xs text-stone-800 mb-2">Historial de Conversación</h3>
                  <div className="max-h-48 overflow-y-auto space-y-2 bg-stone-50 p-3 rounded-2xl border border-stone-200 text-xs">
                    {selectedLead.messages && selectedLead.messages.length > 0 ? (
                      selectedLead.messages.map((m, i) => (
                        <div
                          key={i}
                          className={`p-2 rounded-xl text-[11px] ${
                            m.role === 'user'
                              ? 'bg-blue-100/70 text-blue-900 ml-4'
                              : 'bg-white text-stone-800 mr-4 border border-stone-200'
                          }`}
                        >
                          <span className="font-bold block text-[10px] text-stone-500">
                            {m.role === 'user' ? 'Visitante' : 'Asistente'}
                          </span>
                          {m.content}
                        </div>
                      ))
                    ) : (
                      <p className="text-stone-500 italic text-[11px]">Sin historial registrado.</p>
                    )}
                  </div>
                </div>

                {/* Internal Notes */}
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1.5">
                    Notas Internas
                  </label>
                  <textarea
                    rows={3}
                    value={internalNotes}
                    onChange={(e) => setInternalNotes(e.target.value)}
                    placeholder="Agregar notas sobre el seguimiento..."
                    className="w-full p-3 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-[#4472C4] resize-none"
                  />
                  <button
                    onClick={() => saveNotes(selectedLead.id)}
                    className="mt-2 px-4 py-2 bg-[#4472C4] hover:bg-[#33599E] text-white font-bold text-xs rounded-xl transition-colors"
                  >
                    Guardar Notas
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center text-stone-400 text-xs">
                Selecciona un prospecto de la lista para ver su conversación y detalles.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
