
import React, { useState, useEffect } from 'react';
import { ChevronRight, Users, ShieldCheck, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';

interface HeroProps {
  onNavigate: (page: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    '/slider-1.jpg',
    '/slider-2.jpg',
    '/slider-3.jpg',
    '/hero-foundation.jpg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center pt-24 lg:pt-16 overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-slate-50 rounded-bl-[150px] hidden lg:block"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
        <div className="space-y-4 lg:space-y-6 animate-in fade-in slide-in-from-left duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0056b3] font-bold text-[9px] uppercase tracking-widest shadow-sm">
            <ShieldCheck size={12} />
            Fondation TUSAIDIYANE (ASBL)
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 leading-[1.2]">
            Agir pour la <span className="text-[#0056b3]">solidarité</span> et le bien-être
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-lg leading-relaxed">
            Établie à Lubumbashi, notre mission est de transformer durablement le quotidien des populations vulnérables en RDC à travers l'eau, la santé et l'éducation.
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => onNavigate('mission')}
              className="bg-[#0056b3] text-white px-5 py-2.5 lg:px-6 lg:py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-800 transition-all shadow-lg hover:shadow-blue-200 text-sm"
            >
              Notre Mission
              <ChevronRight size={16} />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-white border-2 border-slate-200 text-slate-700 px-5 py-2.5 lg:px-6 lg:py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:border-[#0056b3] hover:text-[#0056b3] transition-all text-sm"
            >
              Rejoignez-nous
            </button>
          </div>

          <div className="pt-2 grid grid-cols-2 gap-4 lg:gap-6 max-w-sm">
            <div className="border-l-3 border-[#ffcc00] pl-3">
              <span className="block text-lg lg:text-2xl font-bold text-slate-900">2023</span>
              <span className="text-[9px] lg:text-[10px] font-medium text-slate-500 uppercase">Fondation</span>
            </div>
            <div className="border-l-3 border-[#e31b23] pl-3">
              <span className="block text-lg lg:text-2xl font-bold text-slate-900">100%</span>
              <span className="text-[9px] lg:text-[10px] font-medium text-slate-500 uppercase">Engagement</span>
            </div>
          </div>
        </div>

        <div className="relative animate-in fade-in zoom-in duration-1000 mt-6 lg:mt-0">
          <div className="rounded-[20px] lg:rounded-[30px] overflow-hidden shadow-xl relative z-10 border-[4px] lg:border-[8px] border-white lg:rotate-1 hover:rotate-0 transition-all duration-700 group">
            <div className="relative h-[220px] sm:h-[350px] lg:h-[450px] w-full">
              {images.map((img, index) => (
                <img
                  key={img}
                  src={img}
                  alt={`Action Humanitaire RDC - ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentImage ? 'opacity-100' : 'opacity-0'
                    }`}
                />
              ))}

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              >
                <ChevronLeft className="text-slate-900" size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              >
                <ChevronRightIcon className="text-slate-900" size={20} />
              </button>

              {/* Indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${index === currentImage ? 'bg-[#0056b3] w-4' : 'bg-white/60'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="absolute -bottom-3 -left-2 lg:-bottom-6 lg:-left-6 bg-white p-3 lg:p-5 rounded-lg lg:rounded-2xl shadow-xl z-20 flex items-center gap-2 lg:gap-4 border border-slate-100">
            <div className="bg-[#ffcc00] p-1.5 lg:p-3 rounded-lg lg:rounded-xl text-white shadow-lg">
              <Users size={16} className="lg:w-8 lg:h-8" />
            </div>
            <div>
              <p className="text-[10px] lg:text-xs font-bold text-slate-900">Impact Direct</p>
              <p className="text-[9px] lg:text-[10px] text-slate-500 font-medium">Communautés du Haut-Katanga</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

