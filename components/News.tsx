
import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, X, Share2, Tag, Search, Clock, Loader2 } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

interface NewsProps {
    isFullPage?: boolean;
}

interface NewsItem {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    category: string;
    image: string;
    readTime: string;
}

const News: React.FC<NewsProps> = ({ isFullPage = false }) => {
    const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
    const [activeCategory, setActiveCategory] = useState('Tous');
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    const categories = ['Tous', 'Activités', 'Santé', 'Éducation', 'Environnement', 'Social'];

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/news');
                if (!response.ok) throw new Error('Failed to fetch news');
                const fetchedNews = await response.json();

                // Format news item dates if they are strings from DB
                const formattedNews = fetchedNews.map((item: any) => ({
                    ...item,
                    date: new Date(item.date).toLocaleDateString('fr-FR')
                }));

                setNewsItems(formattedNews);
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);


    const filteredNews = activeCategory === 'Tous'
        ? newsItems
        : newsItems.filter(item => item.category === activeCategory);

    return (
        <section className={`${isFullPage ? 'pt-24 pb-16' : 'py-16'} bg-slate-50 relative overflow-hidden`}>
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0056b3]/20 to-transparent"></div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-block px-3 py-1 mb-4 bg-[#0056b3]/10 text-[#0056b3] rounded-lg text-[9px] font-bold uppercase tracking-[0.2em] border border-[#0056b3]/20">
                            Actualités & Publications
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4 italic">Vie de la Fondation</h2>
                        <p className="text-slate-600 text-sm md:text-lg leading-relaxed">
                            Suivez nos dernières actions sur le terrain, nos projets en cours et les moments forts de notre engagement communautaire.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all duration-300 ${activeCategory === cat
                                    ? 'bg-[#0056b3] text-white shadow-md'
                                    : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNews.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-3xl overflow-hidden border border-slate-100 group hover:shadow-xl transition-all duration-500 flex flex-col h-full shadow-sm"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-slate-900 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-lg">
                                        {item.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-3 mb-4 text-slate-400 text-[9px] font-bold uppercase tracking-tighter">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={12} className="text-[#0056b3]" />
                                        {item.date}
                                    </div>
                                    <div className="flex items-center gap-1 font-bold">
                                        <Clock size={12} className="text-[#ffcc00]" />
                                        {item.readTime}
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-[#0056b3] transition-colors leading-tight">
                                    {item.title}
                                </h3>

                                <p className="text-slate-600 mb-6 leading-relaxed text-xs flex-grow">
                                    {item.excerpt}
                                </p>

                                <button
                                    onClick={() => setSelectedArticle(item)}
                                    className="mt-auto flex items-center gap-2 text-slate-900 font-bold text-[10px] group/btn hover:gap-3 transition-all w-fit"
                                >
                                    Lire la publication
                                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center group-hover/btn:bg-[#0056b3] group-hover/btn:text-white transition-colors">
                                        <ArrowRight size={12} />
                                    </div>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredNews.length === 0 && (
                    <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
                        <p className="text-slate-400 font-medium italic text-sm">Aucune publication trouvée dans cette catégorie pour le moment.</p>
                    </div>
                )}

                {isFullPage && newsItems.length > 6 && (
                    <div className="mt-12 text-center">
                        <button className="px-8 py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm text-sm">
                            Charger plus de publications
                        </button>
                    </div>
                )}
            </div>

            {/* Article Detail Modal */}
            {selectedArticle && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setSelectedArticle(null)}
                    ></div>

                    <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in duration-500 text-slate-900">
                        <button
                            onClick={() => setSelectedArticle(null)}
                            className="absolute top-4 right-4 z-20 bg-white/90 text-slate-500 hover:text-red-600 p-1.5 rounded-full transition-colors shadow-lg"
                        >
                            <X size={18} />
                        </button>

                        <div className="overflow-y-auto">
                            <div className="relative h-60 md:h-80 w-full">
                                <img
                                    src={selectedArticle.image}
                                    alt={selectedArticle.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                                <div className="absolute bottom-8 left-8">
                                    <span className="px-3 py-1.5 bg-[#0056b3] text-white rounded-lg text-[9px] font-bold uppercase tracking-widest shadow-xl">
                                        {selectedArticle.category}
                                    </span>
                                </div>
                            </div>

                            <div className="px-8 md:px-12 pb-12 pt-4">
                                <div className="flex flex-wrap items-center gap-4 mb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={14} className="text-[#0056b3]" />
                                        {selectedArticle.date}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <User size={14} className="text-[#e31b23]" />
                                        Par {selectedArticle.author}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock size={14} className="text-[#ffcc00]" />
                                        {selectedArticle.readTime} de lecture
                                    </div>
                                </div>

                                <h2 className="text-2xl md:text-4xl font-serif font-bold italic mb-8 text-slate-900 leading-tight">
                                    {selectedArticle.title}
                                </h2>

                                <div className="prose prose-slate max-w-none">
                                    <p className="text-slate-600 text-lg leading-relaxed mb-6 italic border-l-4 border-blue-500 pl-5 bg-blue-50/30 py-3 rounded-r-xl">
                                        {selectedArticle.excerpt}
                                    </p>
                                    <p className="text-slate-700 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                                        {selectedArticle.content}
                                    </p>
                                </div>

                                <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Partager :</span>
                                        <div className="flex gap-2">
                                            <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-[#0056b3] hover:text-white transition-all">
                                                <Share2 size={14} />
                                            </button>
                                            <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-black hover:text-white transition-all">
                                                <X size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedArticle(null)}
                                        className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-xs hover:bg-slate-800 transition-all shadow-lg"
                                    >
                                        Retour aux actualités
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default News;
