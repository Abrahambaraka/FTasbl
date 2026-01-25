
import React, { useState } from 'react';
import { Users2, Briefcase, Scale, Droplets, Trophy, Shield, Landmark, X, ChevronRight, CheckCircle2 } from 'lucide-react';

interface ObjectivesProps {
  isFullPage?: boolean;
}

interface ObjectiveData {
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  details: string[];
  longDesc: string;
}

const Objectives: React.FC<ObjectivesProps> = ({ isFullPage = false }) => {
  const [selectedObjective, setSelectedObjective] = useState<ObjectiveData | null>(null);

  const objectives: ObjectiveData[] = [
    {
      title: "Cohésion sociale",
      desc: "Nous organisons des forums communautaires et des activités de dialogue pour renforcer le tissu social et prévenir les conflits locaux.",
      icon: <Users2 size={28} />,
      color: "bg-blue-600",
      longDesc: "La cohésion sociale est le socle de tout développement durable. À la Fondation TUSAIDIYANE, nous croyons qu'une communauté unie est une communauté résiliente.",
      details: [
        "Organisation de forums de paix communautaires réguliers",
        "Médiation et résolution pacifique des conflits de voisinage",
        "Promotion du civisme et de la solidarité locale",
        "Activités culturelles et sportives de rassemblement"
      ]
    },
    {
      title: "Lutte contre la Pauvreté",
      desc: "Nos programmes AVEC (Associations Villageoises d'Épargne et de Crédit) permettent à des centaines de femmes de lancer leurs activités génératrices de revenus.",
      icon: <Briefcase size={28} />,
      color: "bg-red-600",
      longDesc: "L'autonomie financière est un levier de dignité. Nous accompagnons les populations vers une indépendance économique progressive.",
      details: [
        "Formation à la gestion simplifiée des petits commerces",
        "Appui technique à la création de coopératives",
        "Accompagnement dans l'épargne solidaire",
        "Octroi de fonds de roulement pour micro-projets"
      ]
    },
    {
      title: "Droits Humains",
      desc: "Défense de l'égalité des genres et protection des droits fondamentaux de la femme et de l'enfant dans nos communautés.",
      icon: <Scale size={28} />,
      color: "bg-slate-800",
      longDesc: "Chaque être humain a droit à la protection et à la justice. Nous luttons activement contre toutes les formes de discrimination.",
      details: [
        "Plaidoyer pour l'accès à l'éducation des jeunes filles",
        "Sensibilisation contre les violences basées sur le genre",
        "Protection juridique des veuves et des orphelins",
        "Vulgarisation des textes de lois protecteurs"
      ]
    },
    {
      title: "Services Sociaux",
      desc: "Améliorer l'accès à l'eau potable, à la santé publique et à l'éducation de base pour les populations les plus vulnérables.",
      icon: <Droplets size={28} />,
      color: "bg-blue-400",
      longDesc: "Les besoins fondamentaux ne doivent plus être un luxe. Nous investissons dans les infrastructures essentielles.",
      details: [
        "Maintenance et construction de forages d'eau potable",
        "Campagnes de sensibilisation à l'hygiène et la santé",
        "Distribution de kits scolaires et médicaux",
        "Appui aux structures de santé communautaires"
      ]
    },
    {
      title: "Culture & Sport",
      desc: "Valorisation des talents sportifs et artistiques locaux pour favoriser une culture d'excellence et de paix chez les jeunes.",
      icon: <Trophy size={28} />,
      color: "bg-yellow-500",
      longDesc: "Le sport et la culture sont des langages universels de paix. Nous offrons aux jeunes des espaces de rêve et d'excellence.",
      details: [
        "Soutien aux académies sportives de quartier",
        "Organisation de festivals artistiques et culturels",
        "Promotion des talents locaux via nos réseaux",
        "Éducation aux valeurs olympiques et citoyennes"
      ]
    }
  ];

  return (
    <section className={`${isFullPage ? 'pt-16 pb-12 md:pt-20 md:pb-16' : 'py-12 md:py-16'} bg-white relative`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 md:mb-12 gap-4 md:gap-6">
          <div className="max-w-2xl">
            <div className="w-8 h-1 bg-[#e31b23] rounded-full mb-3 md:mb-4"></div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-3 md:mb-4 italic">Nos Axes Stratégiques</h2>
            <p className="text-sm md:text-lg text-slate-600 leading-relaxed">
              La Fondation TUSAIDIYANE intervient de manière holistique pour répondre aux besoins urgents des populations du Haut-Katanga.
            </p>
          </div>
          {isFullPage && (
            <div className="bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-100 flex items-center gap-3 shadow-sm w-full md:w-auto">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-md text-[#0056b3]">
                <Shield size={16} />
              </div>
              <p className="text-[10px] md:text-xs font-bold text-slate-700">Organisation certifiée ASBL <br /><span className="text-[#e31b23]">depuis 2023</span></p>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {objectives.map((obj, idx) => (
            <div key={idx} className="group p-5 md:p-8 rounded-2xl md:rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 flex flex-col h-full border-b-4 hover:border-b-[#0056b3]">
              <div className={`w-10 h-10 md:w-12 md:h-12 ${obj.color} text-white rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                {React.cloneElement(obj.icon as React.ReactElement<any>, { size: 20 })}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3">{obj.title}</h3>
              <p className="text-xs md:text-sm text-slate-600 mb-4 md:mb-6 flex-grow leading-relaxed">
                {obj.desc}
              </p>
              <button
                onClick={() => setSelectedObjective(obj)}
                className="flex items-center gap-2 text-[#0056b3] font-bold text-xs md:text-xs group/btn w-fit"
              >
                <span>En savoir plus</span>
                <div className="w-6 md:w-10 h-[2px] bg-slate-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#0056b3] translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500"></div>
                  <div className="absolute inset-0 bg-[#0056b3]/20"></div>
                </div>
              </button>
            </div>
          ))}

          <div className="group p-5 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-br from-[#0056b3] to-blue-900 text-white shadow-xl flex flex-col justify-between hover:scale-[1.01] transition-transform duration-500 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-6 opacity-10 scale-125 rotate-12">
              <Landmark size={60} />
            </div>
            <div className="relative z-10">
              <Landmark className="mb-3 md:mb-4 text-blue-200" size={24} />
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Contribuez à nos projets</h3>
              <p className="text-xs text-blue-100/80 mb-4 md:mb-6 leading-relaxed">
                Votre expertise, votre temps ou vos dons peuvent changer la donne. Devenez partenaire de notre fondation.
              </p>
            </div>
            <button className="bg-[#ffcc00] text-slate-900 py-2.5 md:py-3 px-5 rounded-lg md:rounded-xl font-bold hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 shadow-lg relative z-10 text-xs md:text-sm">
              Faire une proposition
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Détails */}
      {selectedObjective && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-10">
          <div
            className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setSelectedObjective(null)}
          ></div>

          <div className="relative bg-white w-full max-w-3xl rounded-[24px] md:rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh] animate-in zoom-in slide-in-from-bottom-5 duration-500">
            <button
              onClick={() => setSelectedObjective(null)}
              className="absolute top-3 right-3 z-20 bg-white/90 text-slate-500 hover:text-red-600 p-1.5 rounded-full transition-colors shadow-md md:bg-slate-100"
            >
              <X size={18} />
            </button>

            <div className={`md:w-1/3 ${selectedObjective.color} p-6 md:p-8 text-white flex flex-col items-center justify-center text-center relative overflow-hidden shrink-0`}>
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-pattern"></div>
              <div className="bg-white/20 p-4 md:p-6 rounded-[20px] md:rounded-[24px] mb-3 md:mb-6 backdrop-blur-md shadow-lg border border-white/20">
                {React.cloneElement(selectedObjective.icon as React.ReactElement<any>, { size: 32 })}
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-bold italic mb-2 leading-tight">{selectedObjective.title}</h3>
              <div className="h-1 w-8 bg-white/40 rounded-full mb-2"></div>
              <p className="text-white/80 uppercase text-[9px] font-bold tracking-[0.2em]">Secteur d'Impact</p>
            </div>

            <div className="md:w-2/3 p-5 md:p-8 overflow-y-auto">
              <div className="mb-6 md:mb-8">
                <h4 className="text-[9px] font-bold text-[#0056b3] uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                  <div className="w-5 h-[2px] bg-[#0056b3]"></div>
                  Notre Engagement
                </h4>
                <p className="text-slate-700 text-sm md:text-lg leading-relaxed font-medium italic">
                  "{selectedObjective.longDesc}"
                </p>
              </div>

              <div className="space-y-4 md:space-y-6">
                <h4 className="text-[9px] font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                  Actions & Résultats
                  <div className="h-px bg-slate-100 flex-grow"></div>
                </h4>
                <div className="grid gap-2">
                  {selectedObjective.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-slate-50 group hover:bg-white hover:shadow-md transition-all duration-300">
                      <div className="mt-1 w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 size={10} />
                      </div>
                      <p className="text-slate-700 font-semibold text-xs md:text-sm leading-relaxed">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-[#0056b3]">
                    <Shield size={14} />
                  </div>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider text-center sm:text-left">Certifié Action Tusaidiyane</p>
                </div>
                <button
                  onClick={() => setSelectedObjective(null)}
                  className="bg-[#0056b3] text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-800 transition-all shadow-md text-xs w-full sm:w-auto"
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

export default Objectives;
