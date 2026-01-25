
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', id: 'home' },
    { name: 'Mission', id: 'mission' },
    { name: 'Objectifs', id: 'objectifs' },
    { name: 'Réalisations', id: 'realisations' },
    { name: 'Actualités', id: 'actualites' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || currentPage !== 'home' ? 'bg-white/95 backdrop-blur-md shadow-sm py-1' : 'bg-transparent py-2 md:py-3'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          <button onClick={() => handleLinkClick('home')} className="flex-shrink-0 transition-transform hover:scale-105">
            <Logo size="xs" />
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-xs font-bold transition-all ${currentPage === link.id
                  ? 'text-[#0056b3] border-b-2 border-[#0056b3] pb-0.5'
                  : 'text-slate-600 hover:text-[#0056b3]'
                  }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-700 p-2">
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 animate-in fade-in slide-in-from-top duration-300 shadow-xl rounded-b-2xl">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`block w-full text-left px-3 py-2.5 text-sm font-bold rounded-lg ${currentPage === link.id ? 'bg-blue-50 text-[#0056b3]' : 'text-slate-700 hover:bg-slate-50'
                  }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
