
import React from 'react';

export const COLORS = {
  blue: '#0056b3',
  red: '#e31b23',
  yellow: '#ffcc00',
  white: '#ffffff',
  gray: '#f8fafc'
};

export const CONTACT_DATA = {
  address: "Numéro 1 (ou 3), Av. Kundelungu, Réf. Paroisse Saint Amand, Commune de la Rwashi, Lubumbashi, RDC",
  phones: ["+243 848 950 509", "+243 823 716 282"],
  email: "fondationtusaidiyane@gmail.com"
};

export const LogoSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Simplified RDC Map Outline */}
    <path d="M40,20 L60,20 L75,35 L80,55 L70,80 L40,85 L20,70 L15,45 L30,25 Z" fill={COLORS.blue} opacity="0.2" />
    {/* Sun */}
    <circle cx="75" cy="25" r="10" fill={COLORS.yellow} />
    {/* Palm Tree - Simplified */}
    <rect x="48" y="45" width="4" height="35" fill="#5D4037" />
    <path d="M50,45 Q65,30 80,45" stroke="#2E7D32" strokeWidth="3" fill="none" />
    <path d="M50,45 Q35,30 20,45" stroke="#2E7D32" strokeWidth="3" fill="none" />
    <path d="M50,45 Q65,55 75,65" stroke="#2E7D32" strokeWidth="3" fill="none" />
    <path d="M50,45 Q35,55 25,65" stroke="#2E7D32" strokeWidth="3" fill="none" />
    {/* Hands (Solidarity) */}
    <path d="M35,90 Q50,75 65,90" stroke={COLORS.red} strokeWidth="4" fill="none" strokeLinecap="round" />
  </svg>
);
