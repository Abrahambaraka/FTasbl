
import React from 'react';

const Logo: React.FC<{ size?: 'xs' | 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizes = {
    xs: 'h-8 w-8',
    sm: 'h-10 w-10',
    md: 'h-14 w-14',
    lg: 'h-24 w-24'
  };

  const textSizes = {
    xs: 'text-base',
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  const subTextSizes = {
    xs: 'text-[8px]',
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-[14px]'
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative group shrink-0">
        <div className="absolute inset-0 bg-blue-100 rounded-full scale-0 group-hover:scale-125 transition-transform duration-300 opacity-50"></div>
        <img
          src="/logo.png"
          alt="Logo Fondation Tusaidiyane"
          className={`${sizes[size]} relative z-10 transition-transform group-hover:rotate-6 object-contain`}
        />
      </div>
      <div className="flex flex-col justify-center border-l border-slate-100 pl-3">
        <span className={`font-black ${textSizes[size]} tracking-tight text-[#0056b3] leading-none mb-0.5`}>
          TUSAIDIYANE
        </span>
        <span className={`font-bold uppercase tracking-[0.2em] text-[#e31b23] ${subTextSizes[size]} leading-none`}>
          Fondation ASBL
        </span>
      </div>
    </div>
  );
};

export default Logo;
