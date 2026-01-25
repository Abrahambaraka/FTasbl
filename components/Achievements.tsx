
import React, { useState, useEffect } from 'react';
import { MapPin, CheckCircle2, Droplets, HeartPulse, Wallet, Users, ArrowUpRight, X, Calendar, Globe, Loader2 } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

interface AchievementsProps {
  isFullPage?: boolean;
}

interface AchievementData {
  id: string;
  title: string;
  desc: string;
  impact: string;
  locations: string[];
  icon?: React.ReactNode;
  image: string;
  date: string;
  longDesc: string;
  status: string;
}

const Achievements: React.FC<AchievementsProps> = ({ isFullPage = false }) => {
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementData | null>(null);
  const [realizations, setRealizations] = useState<AchievementData[]>([]);
  const [loading, setLoading] = useState(true);

  const getIconForCategory = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('eau') || t.includes('forage')) return <Droplets className="text-blue-500" />;
    if (t.includes('santé') || t.includes('nutrition')) return <HeartPulse className="text-red-500" />;
    if (t.includes('micro') || t.includes('finance') || t.includes('argent')) return <Wallet className="text-yellow-600" />;
    return <Users className="text-blue-600" />;
  };

  useEffect(() => {
    const fetchAchievements = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/achievements');
        if (!response.ok) throw new Error('Failed to fetch achievements');
        const fetched = await response.json();
        setRealizations(fetched);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);


  return (
    <section className={`${isFullPage ? 'pt-24 pb-16' : 'py-16'} bg-white text-slate-900 relative overflow-hidden`}>
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-[#0056b3]/5 rounded-full blur-[60px] md:blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 mb-4 bg-blue-50 text-[#0056b3] rounded-lg text-[9px] font-bold uppercase tracking-[0.2em] border border-blue-100">
              Impact Réel
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 italic">Actions de Terrain</h2>
            <p className="text-slate-600 text-sm md:text-lg leading-relaxed">
              Nous privilégions les projets à impact direct et mesurable pour garantir que chaque contribution serve réellement le bien-être collectif.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
            <div className="bg-slate-50 p-4 md:p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
              <p className="text-2xl md:text-3xl font-bold text-[#ffcc00] mb-0.5">03</p>
              <p className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Projets majeurs</p>
            </div>
            <div className="bg-slate-50 p-4 md:p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
              <p className="text-2xl md:text-3xl font-bold text-[#e31b23] mb-0.5">100%</p>
              <p className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Impact Direct</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {loading ? (
            <div className="col-span-full py-16 flex justify-center">
              <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
          ) : realizations.length === 0 ? (
            <div className="col-span-full py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200 text-center">
              <p className="text-slate-400 font-medium italic text-sm">Aucune réalisation trouvée.</p>
            </div>
          ) : realizations.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedAchievement(item)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 group hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col h-full shadow-sm hover:-translate-y-1.5"
            >
              <div className="h-56 relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute top-4 left-4 bg-white p-2 rounded-xl shadow-xl">
                  {React.cloneElement(getIconForCategory(item.title) as React.ReactElement<any>, { size: 20 })}
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <span className="text-[9px] font-bold bg-[#ffcc00] text-slate-900 px-2 py-0.5 rounded-full uppercase tracking-widest">{item.date}</span>
                  <button className="bg-white text-slate-900 p-2 rounded-full hover:bg-[#0056b3] hover:text-white transition-all transform group-hover:rotate-12 shadow-lg">
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed flex-grow">
                  {item.desc}
                </p>
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#0056b3]">
                      <Users size={14} />
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest leading-none">Bénéficiaires</p>
                      <p className="text-xs font-bold text-slate-700">{item.impact}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center text-[#ffcc00]">
                      <MapPin size={14} />
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest leading-none">Localisation</p>
                      <p className="text-xs font-bold text-slate-700">{item.locations.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isFullPage && (
          <div className="mt-16 p-8 bg-slate-50 rounded-3xl border border-slate-100 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#0056b3]"></div>
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 italic">Transparence & Redevabilité</h3>
            <p className="text-slate-600 mb-8 max-w-xl mx-auto leading-relaxed text-sm">
              Nous publions chaque trimestre un rapport détaillé de l'utilisation de nos ressources et de l'avancement de nos projets sur le terrain pour nos partenaires et donateurs.
            </p>
            <button className="bg-[#0056b3] text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-800 transition-all flex items-center gap-2 mx-auto shadow-lg text-sm">
              Télécharger le rapport (PDF)
              <CheckCircle2 size={18} className="text-blue-200" />
            </button>
          </div>
        )}
      </div>

      {/* Modal de Réalisation */}
      {selectedAchievement && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setSelectedAchievement(null)}
          ></div>

          <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh] animate-in zoom-in duration-500 text-slate-900">
            <button
              onClick={() => setSelectedAchievement(null)}
              className="absolute top-4 right-4 z-20 bg-white/90 text-slate-500 hover:text-red-600 p-1.5 rounded-full transition-colors shadow-lg lg:bg-slate-100"
            >
              <X size={18} />
            </button>

            <div className="lg:w-1/2 relative min-h-[250px] shrink-0">
              <img
                src={selectedAchievement.image}
                alt={selectedAchievement.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="inline-block px-2.5 py-1 bg-[#ffcc00] text-slate-900 rounded-lg font-bold text-[9px] uppercase tracking-widest mb-4">
                  Impact Direct
                </div>
                <h3 className="text-3xl font-serif font-bold italic mb-3">{selectedAchievement.title}</h3>
                <div className="flex items-center gap-4 opacity-90">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span className="text-[10px] font-medium">{selectedAchievement.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    <span className="text-[10px] font-medium">{selectedAchievement.locations.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 p-8 overflow-y-auto">
              <div className="mb-8">
                <h4 className="text-[10px] font-bold text-[#0056b3] uppercase tracking-[0.2em] mb-3 flex items-center gap-3">
                  Description du Projet
                  <div className="h-px bg-slate-100 flex-grow"></div>
                </h4>
                <p className="text-slate-600 text-base leading-relaxed">
                  {selectedAchievement.longDesc}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                  <p className="text-[9px] uppercase font-bold text-blue-400 mb-1 tracking-widest">Population</p>
                  <p className="text-xl font-bold text-[#0056b3]">{selectedAchievement.impact}</p>
                </div>
                <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
                  <p className="text-[9px] uppercase font-bold text-green-400 mb-1 tracking-widest">Statut</p>
                  <p className="text-xl font-bold text-green-600">{selectedAchievement.status}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Indicateurs de Performance</h4>
                <div className="flex flex-wrap gap-2">
                  {["Eau Potable", "Santé Publique", "Infrastructures", "Maintenance Solaire"].map((tag, tIdx) => (
                    <span key={tIdx} className="px-3 py-1.5 bg-slate-50 rounded-lg text-slate-500 font-bold text-[9px] border border-slate-100 uppercase tracking-tighter">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Globe className="text-[#0056b3]" size={16} />
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Impact Lubumbashi</span>
                </div>
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-bold text-[10px] hover:bg-slate-800 transition-all shadow-lg"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Achievements;
