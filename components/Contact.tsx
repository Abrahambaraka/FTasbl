
import React from 'react';
import { Mail, Phone, MapPin, Info, Globe } from 'lucide-react';
import { CONTACT_DATA } from '../constants';

interface ContactProps {
  isFullPage?: boolean;
}

const Contact: React.FC<ContactProps> = ({ isFullPage = false }) => {
  return (
    <section id="contact" className={`${isFullPage ? 'pt-24 pb-16' : 'py-16'} bg-white overflow-hidden`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="w-10 h-1 bg-[#ffcc00] rounded-full mb-4 mx-auto"></div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4 italic">Entrons en Contact</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Vous avez une question ou une proposition de partenariat ? Notre équipe est à votre écoute pour construire ensemble un avenir solidaire.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Siège Social */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 group hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-50 text-[#0056b3] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#0056b3] group-hover:text-white transition-all">
              <MapPin size={24} />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-3">Notre Siège Social</h4>
            <p className="text-slate-600 text-[13px] leading-relaxed mb-3 italic">
              {CONTACT_DATA.address}
            </p>
            <span className="text-[10px] font-bold text-[#e31b23] uppercase tracking-widest">Lubumbashi, RDC</span>
          </div>

          {/* Email */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 group hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-red-50 text-[#e31b23] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#e31b23] group-hover:text-white transition-all">
              <Mail size={24} />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-3">Email Direct</h4>
            <a href={`mailto:${CONTACT_DATA.email}`} className="text-[#0056b3] font-bold text-xs hover:underline transition-colors break-all">
              {CONTACT_DATA.email}
            </a>
            <p className="text-[10px] text-slate-400 mt-3 uppercase font-bold tracking-tighter">Réponse sous 48h</p>
          </div>

          {/* Téléphone */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 group hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-yellow-50 text-[#ffcc00] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#ffcc00] group-hover:text-white transition-all">
              <Phone size={24} />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-3">Appelez-nous</h4>
            <div className="space-y-1.5">
              {CONTACT_DATA.phones.map((phone, idx) => (
                <a key={idx} href={`tel:${phone.replace(/\s/g, '')}`} className="block text-slate-700 font-bold hover:text-[#0056b3] transition-colors text-xs">
                  {phone}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info & Map Placeholder */}
        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          <div className="bg-blue-900 text-white p-8 rounded-3xl shadow-xl flex items-start gap-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 rotate-12">
              <Globe size={100} />
            </div>
            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm relative z-10 shrink-0">
              <Info size={24} className="text-blue-200" />
            </div>
            <div className="relative z-10">
              <h4 className="text-xl font-bold mb-3 italic">Heures de permanence</h4>
              <div className="space-y-1.5 text-blue-100/80 text-sm">
                <p className="flex justify-between gap-6 border-b border-white/10 pb-1.5">
                  <span className="font-medium">Lundi - Vendredi</span>
                  <span className="font-bold text-white">08h00 - 16h30</span>
                </p>
                <p className="flex justify-between gap-6 pt-1.5">
                  <span className="font-medium">Samedi</span>
                  <span className="font-bold text-white">09h00 - 13h00</span>
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl shadow-md grayscale hover:grayscale-0 transition-all duration-700 h-full min-h-[200px] relative border border-slate-100">
            <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
              <div className="text-center p-6">
                <MapPin className="mx-auto mb-3 text-[#e31b23]" size={32} />
                <p className="font-bold text-slate-500 italic text-sm">Lubumbashi, Haut-Katanga, RDC</p>
                <p className="text-[10px] text-slate-400 mt-1.5 italic">Commune de la Rwashi - Av. Kundelungu</p>
              </div>
            </div>
            <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-20" alt="Map background" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
