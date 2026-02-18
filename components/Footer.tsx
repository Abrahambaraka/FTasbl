
import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Globe } from 'lucide-react';
import { CONTACT_DATA } from '../constants';
import Logo from './Logo';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-50 pt-16 pb-8 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          <div className="space-y-4 text-center md:text-left">
            <button onClick={() => onNavigate('home')} className="block hover:scale-105 transition-transform mx-auto md:mx-0">
              <Logo size="sm" />
            </button>
            <p className="text-slate-500 leading-relaxed text-xs italic max-w-sm mx-auto md:mx-0">
              "Agir pour la solidarité et le bien-être des populations vulnérables." - Fondation TUSAIDIYANE est une ASBL engagée pour l'épanouissement humain durable en RDC.
            </p>
            <div className="flex gap-3 justify-center md:justify-start">
              <a href="#" className="w-8 h-8 bg-white shadow-sm rounded-lg flex items-center justify-center text-slate-400 hover:bg-[#0056b3] hover:text-white hover:-translate-y-1 transition-all">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 bg-white shadow-sm rounded-lg flex items-center justify-center text-slate-400 hover:bg-[#e31b23] hover:text-white hover:-translate-y-1 transition-all">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-8 h-8 bg-white shadow-sm rounded-lg flex items-center justify-center text-slate-400 hover:bg-[#ffcc00] hover:text-white hover:-translate-y-1 transition-all">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-base font-bold text-slate-900 mb-4 border-l-4 border-[#0056b3] pl-3">Menu</h4>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-2 text-slate-600 font-medium text-xs">
              <li><button onClick={() => onNavigate('home')} className="hover:text-[#0056b3] transition-colors">Accueil</button></li>
              <li><button onClick={() => onNavigate('mission')} className="hover:text-[#0056b3] transition-colors">Notre Mission</button></li>
              <li><button onClick={() => onNavigate('objectifs')} className="hover:text-[#0056b3] transition-colors">Nos Objectifs</button></li>
              <li><button onClick={() => onNavigate('realisations')} className="hover:text-[#0056b3] transition-colors">Réalisations</button></li>
              <li><button onClick={() => onNavigate('actualites')} className="hover:text-[#0056b3] transition-colors">Actualités</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-[#0056b3] transition-colors">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-bold text-slate-900 mb-4 border-l-4 border-[#e31b23] pl-3">Nos Bureaux</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin size={16} className="text-[#e31b23] shrink-0 mt-1" />
                <p className="text-xs text-slate-600 leading-relaxed italic">{CONTACT_DATA.address}</p>
              </div>
              <div className="flex gap-3">
                <Phone size={16} className="text-[#0056b3] shrink-0 mt-1" />
                <div className="text-xs text-slate-600 font-bold italic">
                  {CONTACT_DATA.phones.map((p, i) => (
                    <a key={i} href={`tel:${p}`} className="block hover:text-[#0056b3]">{p}</a>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Mail size={16} className="text-[#ffcc00] shrink-0 mt-1" />
                <a href={`mailto:${CONTACT_DATA.email}`} className="text-xs text-slate-600 hover:text-[#0056b3] font-bold italic">{CONTACT_DATA.email}</a>
              </div>
              <div className="flex gap-3">
                <Globe size={16} className="text-[#0056b3] shrink-0 mt-1" />
                <a
                  href={CONTACT_DATA.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-600 hover:text-[#0056b3] font-bold italic"
                >
                  {CONTACT_DATA.website}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-[10px] font-medium italic">© 2024 Fondation TUSAIDIYANE (ASBL). Lubumbashi, RDC.</p>
          <div className="flex gap-6 items-center text-[9px] font-bold text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-[#0056b3] transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-[#0056b3] transition-colors">Statuts</a>
            <button
              onClick={() => onNavigate('admin')}
              className="px-3 py-1.5 bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-900 hover:text-white transition-all flex items-center gap-2 text-xs"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
