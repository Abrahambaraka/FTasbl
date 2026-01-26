
import React, { useState, useEffect } from 'react';


import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Mission from './components/Mission';
import Objectives from './components/Objectives';
import Achievements from './components/Achievements';
import News from './components/News';
import Admin from './components/Admin';
import Login from './components/Login';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Analytics } from "@vercel/analytics/react";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('is_foundation_admin') === 'true';
  });

  // Gestion du scroll automatique vers le haut lors du changement de page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    localStorage.setItem('is_foundation_admin', 'true');
    setCurrentPage('admin');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('is_foundation_admin');
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'mission':
        return <Mission isFullPage={true} />;
      case 'objectifs':
        return <Objectives isFullPage={true} />;
      case 'realisations':
        return <Achievements isFullPage={true} />;
      case 'actualites':
        return <News isFullPage={true} />;
      case 'admin':
        return isAdmin ? (
          <Admin onNavigate={setCurrentPage} onLogout={handleLogout} />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        );

      case 'contact':
        return <Contact isFullPage={true} />;
      default:
        return (
          <>
            <Hero onNavigate={setCurrentPage} />
            <Mission isFullPage={false} />
            <Objectives isFullPage={false} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={setCurrentPage} />
      <Analytics />
    </div>
  );
};


export default App;
