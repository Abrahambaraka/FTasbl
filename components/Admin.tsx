
import React, { useState, useEffect } from 'react';
import {
    Plus, Edit2, Trash2, Save, X, Image as ImageIcon,
    LayoutDashboard, LogOut, ChevronRight, Search,
    Settings, FileText, Target, Award, Home, Loader2,
    CheckCircle2, Info, Calendar
} from 'lucide-react';




interface AdminProps {
    onNavigate: (page: string) => void;
    onLogout: () => void;
}

type TabType = 'news' | 'achievements' | 'mission' | 'objectives';

const Admin: React.FC<AdminProps> = ({ onNavigate, onLogout }) => {

    const [activeTab, setActiveTab] = useState<TabType>('news');
    const [isEditing, setIsEditing] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchItems();
    }, [activeTab]);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/${activeTab}`);
            if (!response.ok) throw new Error('Failed to fetch items');
            const fetchedItems = await response.json();

            setItems(fetchedItems.map((item: any) => ({
                ...item,
                displayDate: new Date(item.date || item.createdAt).toLocaleDateString('fr-FR')
            })));
        } catch (error) {
            console.error("Error fetching items:", error);
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item: any) => {
        setSelectedItem({
            ...item,
            date: item.date ? new Date(item.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
        });
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setSelectedItem({
            title: "",
            category: activeTab === 'news' ? "Social" : "Général",
            date: new Date().toISOString().split('T')[0],
            content: "",
            image: "",
            impact: "",
            locations: "",
            status: "Actif"
        });
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Voulez-vous vraiment supprimer cet élément ? Cette action est irréversible.")) {
            try {
                const response = await fetch(`/api/${activeTab}/${id}`, {
                    method: 'DELETE'
                });
                if (!response.ok) throw new Error('Delete failed');
                setItems(items.filter(item => item.id !== id));
            } catch (error) {
                console.error("Error deleting document:", error);
                alert("Erreur lors de la suppression.");
            }
        }
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedItem.image && activeTab !== 'objectives') {
            alert("Veuillez uploader une image.");
            return;
        }

        setSaving(true);
        const formData = new FormData(e.target as HTMLFormElement);

        const data: any = {
            title: formData.get('title'),
            content: formData.get('content'),
            image: selectedItem.image || "",
            date: new Date(formData.get('date') as string).toISOString(),
        };

        if (activeTab === 'news' || activeTab === 'achievements') {
            data.category = formData.get('category');
        }

        if (activeTab === 'news') {
            data.excerpt = (formData.get('content') as string).substring(0, 160) + '...';
            data.author = "Admin Fondation";
            data.readTime = Math.ceil((formData.get('content') as string).length / 500) + " min";
        }

        if (activeTab === 'achievements') {
            data.impact = formData.get('impact');
            data.locations = (formData.get('locations') as string).split(',').map(l => l.trim()).filter(l => l !== "");
            data.status = formData.get('status');
            data.longDesc = formData.get('content');
            data.desc = (formData.get('content') as string).substring(0, 120) + '...';
        }

        try {
            const url = selectedItem.id
                ? `/api/${activeTab}/${selectedItem.id}`
                : `/api/${activeTab}`;

            const response = await fetch(url, {
                method: selectedItem.id ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error('Save failed');

            setIsEditing(false);
            fetchItems();
        } catch (error) {
            console.error("Error saving document:", error);
            alert("Erreur lors de l'enregistrement.");
        } finally {
            setSaving(false);
        }
    };


    const handleLogout = () => {
        onLogout();
    };


    return (
        <div className="min-h-screen bg-slate-50 flex flex-col pt-16 pb-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 text-slate-800">
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* Sidebar Admin */}
                    <aside className="lg:w-56 space-y-2 shrink-0">
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 sticky top-24">
                            <div className="flex items-center gap-3 mb-6 px-1">
                                <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-100">
                                    <LayoutDashboard size={18} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 leading-none text-sm">Admin</p>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Fondation FT</p>
                                </div>
                            </div>

                            <nav className="space-y-1">
                                {[
                                    { id: 'news', label: 'Actualités', icon: <FileText size={16} /> },
                                    { id: 'achievements', label: 'Réalisations', icon: <Award size={16} /> },
                                    { id: 'mission', label: 'Mission', icon: <Home size={16} /> },
                                    { id: 'objectives', label: 'Objectifs', icon: <Target size={16} /> },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as any)}
                                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === tab.id
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {tab.icon}
                                            {tab.label}
                                        </div>
                                        {activeTab === tab.id && <ChevronRight size={12} className="opacity-50" />}
                                    </button>
                                ))}
                            </nav>

                            <div className="mt-6 pt-6 border-t border-slate-100">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 transition-all"
                                >
                                    <LogOut size={16} />
                                    Déconnexion
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-grow">
                        {isEditing ? (
                            /* Edit/Create Form */
                            <div className="bg-white rounded-[40px] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="p-8 md:p-12 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                                                {activeTab}
                                            </span>
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 italic">
                                            {selectedItem?.id ? 'Modifier le contenu' : 'Nouvelle publication'}
                                        </h2>
                                    </div>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="p-3 bg-white text-slate-400 rounded-2xl hover:text-red-500 hover:shadow-lg transition-all border border-slate-100"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <form className="p-8 md:p-12 space-y-8" onSubmit={handleSubmit}>
                                    <div className="grid md:grid-cols-2 gap-10">
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Titre de l'élément</label>
                                                <input
                                                    name="title"
                                                    type="text"
                                                    required
                                                    defaultValue={selectedItem?.title}
                                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-slate-900"
                                                    placeholder="Ex: Construction d'un forage à Juge"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                {(activeTab === 'news' || activeTab === 'achievements') && (
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Catégorie</label>
                                                        <select name="category" defaultValue={selectedItem?.category} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-700">
                                                            <option>Social</option>
                                                            <option>Santé</option>
                                                            <option>Éducation</option>
                                                            <option>Environnement</option>
                                                            <option>Activités</option>
                                                            <option>Général</option>
                                                        </select>
                                                    </div>
                                                )}
                                                <div className="space-y-2 flex-grow">
                                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Date</label>
                                                    <input
                                                        name="date"
                                                        type="date"
                                                        required
                                                        defaultValue={selectedItem?.date}
                                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-700"
                                                    />
                                                </div>
                                            </div>

                                            {activeTab === 'achievements' && (
                                                <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-300">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Nombre d'impactés</label>
                                                        <input name="impact" defaultValue={selectedItem?.impact} type="text" placeholder="+500 personnes" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Statut du projet</label>
                                                        <select name="status" defaultValue={selectedItem?.status} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-700">
                                                            <option>Actif</option>
                                                            <option>Continu</option>
                                                            <option>Expansion</option>
                                                            <option>Terminé</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            )}

                                            {(activeTab === 'mission' || activeTab === 'objectives') && (
                                                <div className="space-y-2 animate-in fade-in duration-300">
                                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Ordre d'affichage</label>
                                                    <input name="order" defaultValue={selectedItem?.order || 0} type="number" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Lien de l'image (URL)</label>
                                                <input
                                                    type="url"
                                                    value={selectedItem?.image || ""}
                                                    onChange={(e) => setSelectedItem({ ...selectedItem, image: e.target.value })}
                                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-slate-900"
                                                    placeholder="https://images.unsplash.com/..."
                                                />
                                                {selectedItem?.image && (
                                                    <div className="mt-4 w-full h-40 rounded-2xl overflow-hidden border border-slate-100">
                                                        <img src={selectedItem.image} className="w-full h-full object-cover" alt="Preview" />
                                                    </div>
                                                )}
                                            </div>

                                            {activeTab === 'achievements' && (
                                                <div className="space-y-2 animate-in fade-in duration-300">
                                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Localisations (séparées par virgules)</label>
                                                    <input name="locations" defaultValue={Array.isArray(selectedItem?.locations) ? selectedItem.locations.join(', ') : selectedItem?.locations} type="text" placeholder="Lubumbashi, Rwashi, Juge" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center px-1">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Description complète</label>
                                            <span className="text-[10px] font-bold text-slate-300">Format texte libre</span>
                                        </div>
                                        <textarea
                                            name="content"
                                            required
                                            defaultValue={selectedItem?.content || selectedItem?.longDesc}
                                            rows={10}
                                            className="w-full px-8 py-6 bg-slate-50 border border-slate-200 rounded-[32px] focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-slate-700 leading-relaxed resize-none"
                                            placeholder="Détaillez ici votre publication. Pour les réalisations, c'est ce texte qui apparaîtra dans la vue détaillée..."
                                        ></textarea>
                                    </div>

                                    <div className="pt-10 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6">
                                        <div className="flex items-center gap-3 text-slate-400">
                                            <Info size={16} />
                                            <p className="text-[11px] font-medium italic">Les modifications sont visibles instantanément sur le site public après enregistrement.</p>
                                        </div>
                                        <div className="flex gap-4 w-full sm:w-auto">
                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(false)}
                                                className="flex-grow sm:flex-grow-0 px-8 py-4 bg-white border border-slate-100 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
                                            >
                                                Annuler
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={saving || uploading}
                                                className="flex-grow sm:flex-grow-0 px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-200 flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:translate-y-0 active:scale-95"
                                            >
                                                {saving ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
                                                {selectedItem?.id ? 'Mettre à jour' : 'Publier maintenant'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            /* List View */
                            <div className="space-y-6">
                                <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 gap-6">
                                    <div className="max-w-md">
                                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 italic mb-2">Gestion des {activeTab === 'news' ? 'Actualités' : activeTab === 'achievements' ? 'Réalisations' : activeTab === 'mission' ? 'Missions' : 'Objectifs'}</h2>
                                        <p className="text-slate-500 text-xs leading-relaxed">Centralisez vos publications et gardez le site à jour en quelques clics.</p>
                                    </div>
                                    <button
                                        onClick={handleAddNew}
                                        className="w-full md:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 active:scale-95 text-sm"
                                    >
                                        <Plus size={18} />
                                        Ajouter un élément
                                    </button>
                                </div>

                                <div className="grid gap-4">
                                    {loading ? (
                                        <div className="py-32 flex flex-col items-center justify-center bg-white rounded-[48px] border border-slate-50">
                                            <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
                                            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Chargement de la base de données...</p>
                                        </div>
                                    ) : items.length === 0 ? (
                                        <div className="text-center py-32 bg-white rounded-[48px] border border-dashed border-slate-200">
                                            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200 mx-auto mb-6">
                                                <Info size={40} />
                                            </div>
                                            <p className="text-slate-400 font-bold mb-2">Aucun contenu publié dans cette section.</p>
                                            <p className="text-slate-300 text-sm italic">Cliquez sur le bouton pour faire votre première publication.</p>
                                        </div>
                                    ) : (
                                        items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="bg-white p-6 md:p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center gap-8 group hover:border-blue-100 hover:shadow-xl hover:shadow-slate-100 transition-all duration-500"
                                            >
                                                <div className="w-full sm:w-28 h-28 rounded-3xl overflow-hidden shrink-0 border border-slate-50 bg-slate-50 flex items-center justify-center group-hover:scale-105 transition-transform">
                                                    {item.image ? (
                                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <ImageIcon className="text-slate-200" size={32} />
                                                    )}
                                                </div>

                                                <div className="flex-grow min-w-0 text-center sm:text-left">
                                                    <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 mb-3">
                                                        {item.category && (
                                                            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold uppercase tracking-widest">{item.category}</span>
                                                        )}
                                                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                                                            <Calendar size={12} className="text-[#ffcc00]" />
                                                            {item.displayDate}
                                                        </div>
                                                        {item.impact && (
                                                            <span className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-bold uppercase tracking-widest">{item.impact}</span>
                                                        )}
                                                    </div>
                                                    <h3 className="text-xl font-bold text-slate-900 mb-2 truncate group-hover:text-blue-600 transition-colors pr-4">{item.title}</h3>
                                                    <p className="text-slate-400 text-sm truncate pr-8">{item.content?.substring(0, 100)}...</p>
                                                </div>

                                                <div className="flex items-center gap-3 shrink-0 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                    <button
                                                        onClick={() => handleEdit(item)}
                                                        className="w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-blue-600 hover:text-white rounded-2xl transition-all shadow-sm hover:shadow-blue-200"
                                                        title="Modifier"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white rounded-2xl transition-all shadow-sm hover:shadow-red-200"
                                                        title="Supprimer"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                                <div className="hidden sm:block shrink-0 px-2 group-hover:translate-x-1 transition-transform">
                                                    <ChevronRight size={24} className="text-slate-100 group-hover:text-blue-100" />
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Admin;
