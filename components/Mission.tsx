
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

        <div className="grid lg:grid-cols-3 gap-8">
          {[
            {
              title: "Notre Vision",
              icon: <Target size={28} />,
              color: "#0056b3",
              bg: "bg-blue-50",
              text: "Devenir un acteur de référence dans le Haut-Katanga pour l'éradication de la précarité extrême et la promotion d'une société congolaise résiliente, éduquée et en bonne santé."
            },
            {
              title: "Notre Mission",
              icon: <HeartHandshake size={28} />,
              color: "#e31b23",
              bg: "bg-red-50",
              text: "Mettre en œuvre des projets communautaires d'accès à l'eau potable, soutenir l'entrepreneuriat des jeunes et protéger les droits des plus vulnérables (veuves, orphelins)."
            },
            {
              title: "Nos Valeurs",
              icon: <Eye size={28} />,
              color: "#ffcc00",
              bg: "bg-yellow-50",
              text: "L'intégrité dans la gestion de nos ressources, la transparence envers nos partenaires et une solidarité sans faille envers les communautés démunies."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500"></div>
              <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-8 relative z-10`} style={{ color: item.color }}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed relative z-10">
                {item.text}
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: item.color }}>
                En savoir plus <span className="text-lg">→</span>
              </div>
            </div>
          ))}
        </div>

        {isFullPage && (
          <div className="mt-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-block px-3 py-1 mb-4 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Impact Global
                </div>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6 italic leading-tight">
                  Notre Engagement envers les Objectifs de Développement Durable (ODD)
                </h3>
                <p className="text-base text-slate-600 mb-8 leading-relaxed max-w-xl">
                  La Fondation TUSAIDIYANE aligne ses interventions sur l'Agenda 2030 des Nations Unies. Nous concentrons nos ressources sur quatre piliers fondamentaux pour transformer durablement les vies en RDC.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: '6', label: 'Eau & Assainissement', color: 'bg-blue-600', text: 'Garantir l\'accès à l\'eau potable pour tous.' },
                    { id: '1', label: 'Pas de Pauvreté', color: 'bg-red-600', text: 'Éliminer la pauvreté sous toutes ses formes.' },
                    { id: '3', label: 'Bonne Santé', color: 'bg-green-600', text: 'Promouvoir le bien-être à tout âge.' },
                    { id: '5', label: 'Égalité des Sexes', color: 'bg-orange-500', text: 'Autonomiser les femmes et les filles.' }
                  ].map((odd) => (
                    <div key={odd.id} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`w-8 h-8 rounded-lg ${odd.color} text-white flex items-center justify-center font-bold text-sm shrink-0 group-hover:scale-110 transition-transform`}>
                          {odd.id}
                        </span>
                        <span className="font-bold text-slate-900 text-[10px] sm:text-xs md:text-sm">{odd.label}</span>
                      </div>
                      <p className="hidden sm:block text-[10px] text-slate-500 leading-snug">{odd.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div className="group relative rounded-3xl overflow-hidden shadow-lg transform transition-transform hover:-translate-y-2">
                    <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600" alt="Environnement" className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="group relative rounded-3xl overflow-hidden shadow-lg transform transition-transform hover:-translate-y-2">
                    <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600" alt="Education" className="w-full h-64 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="group relative rounded-3xl overflow-hidden shadow-lg transform transition-transform hover:-translate-y-2">
                    <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600" alt="Enfants" className="w-full h-64 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="group relative rounded-3xl overflow-hidden shadow-lg transform transition-transform hover:-translate-y-2">
                    <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=600" alt="Santé" className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
