
import React from 'react';
import { Target, Eye, HeartHandshake, Award, BookOpen, Globe } from 'lucide-react';

interface MissionProps {
  isFullPage?: boolean;
}

const Mission: React.FC<MissionProps> = ({ isFullPage = false }) => {
  return (
    <section className={`${isFullPage ? 'pt-24 pb-16' : 'py-16'} bg-slate-50 relative overflow-hidden`}>
      <div className="absolute inset-0 bg-pattern"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 mb-3 bg-blue-100 text-[#0056b3] rounded-full text-[10px] font-bold uppercase tracking-widest">
            Identité & Valeurs
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4 italic">Notre Vision & Notre Mission</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            La Fondation TUSAIDIYANE est une organisation à but non lucratif dédiée au relèvement social et au développement intégral de l'homme en RDC.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 hover:shadow-xl transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0056b3]"></div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#0056b3] mb-6 group-hover:scale-110 transition-transform">
              <Target size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Notre Vision</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Devenir un acteur de référence dans le Haut-Katanga pour l'éradication de la précarité extrême et la promotion d'une société congolaise résiliente, éduquée et en bonne santé.
            </p>
          </div>

          <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 hover:shadow-xl transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#e31b23]"></div>
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-[#e31b23] mb-6 group-hover:scale-110 transition-transform">
              <HeartHandshake size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Notre Mission</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Mettre en œuvre des projets communautaires d'accès à l'eau potable, soutenir l'entrepreneuriat des jeunes et protéger les droits des plus vulnérables (veuves, orphelins).
            </p>
          </div>

          <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 hover:shadow-xl transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#ffcc00]"></div>
            <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-[#ffcc00] mb-6 group-hover:scale-110 transition-transform">
              <Eye size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Nos Valeurs</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              L'intégrité dans la gestion de nos ressources, la transparence envers nos partenaires et une solidarité sans faille envers les communautés démunies.
            </p>
          </div>
        </div>

        {isFullPage && (
          <div className="mt-16 bg-white rounded-[30px] p-8 shadow-lg border border-slate-100">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-6">Engagement envers les ODD</h3>
                <p className="text-base text-slate-600 mb-6 leading-relaxed">
                  Nos actions s'inscrivent directement dans le cadre des Objectifs de Développement Durable des Nations Unies, avec une priorité sur :
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-slate-700 font-bold italic text-sm">
                    <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">6</span>
                    Eau & Assainissement
                  </div>
                  <div className="flex items-center gap-3 text-slate-700 font-bold italic text-sm">
                    <span className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0">1</span>
                    Pas de Pauvreté
                  </div>
                  <div className="flex items-center gap-3 text-slate-700 font-bold italic text-sm">
                    <span className="w-8 h-8 rounded-lg bg-green-600 text-white flex items-center justify-center shrink-0">3</span>
                    Bonne Santé
                  </div>
                  <div className="flex items-center gap-3 text-slate-700 font-bold italic text-sm">
                    <span className="w-8 h-8 rounded-lg bg-yellow-600 text-white flex items-center justify-center shrink-0">5</span>
                    Égalité des Sexes
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-3 pt-8">
                  <div className="h-32 bg-slate-100 rounded-2xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
                  </div>
                  <div className="h-48 bg-slate-100 rounded-2xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-48 bg-slate-100 rounded-2xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
                  </div>
                  <div className="h-32 bg-slate-100 rounded-2xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Mission;
