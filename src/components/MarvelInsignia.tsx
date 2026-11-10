import React from 'react';
import { InsigniaType } from '../types/bingo.js';

interface MarvelInsigniaProps {
  type: InsigniaType;
  className?: string;
  size?: number;
}

export const MarvelInsignia: React.FC<MarvelInsigniaProps> = ({
  type,
  className = '',
  size = 24
}) => {
  switch (type) {
    case 'arc_reactor':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className={`text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] ${className}`}
        >
          <circle cx="12" cy="12" r="10" strokeWidth="2" stroke="currentColor" />
          <circle cx="12" cy="12" r="5" strokeWidth="1.5" stroke="currentColor" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <path d="M12 2v5M12 17v5M2 12h5M17 12h5M4.93 4.93l3.54 3.54M15.54 15.54l3.53 3.53M4.93 19.07l3.54-3.54M15.54 8.46l3.53-3.53" strokeWidth="1" stroke="currentColor" />
        </svg>
      );

    case 'cap_shield':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={`drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] ${className}`}
        >
          <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2.5" fill="#1e293b" />
          <circle cx="12" cy="12" r="7.5" stroke="#f8fafc" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="5" stroke="#ef4444" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="3.2" fill="#3b82f6" />
          <polygon points="12,9.2 12.8,11.5 15.2,11.5 13.2,12.8 14,15.2 12,13.8 10,15.2 10.8,12.8 8.8,11.5 11.2,11.5" fill="#f8fafc" />
        </svg>
      );

    case 'thor_hammer':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={`drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] ${className}`}
        >
          <rect x="5" y="4" width="14" height="8" rx="1.5" stroke="#93c5fd" strokeWidth="1.8" fill="#1e293b" />
          <line x1="12" y1="12" x2="12" y2="21" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M10 21h4" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 8l8 0M10 6l4 0" stroke="#60a5fa" strokeWidth="1" />
          <path d="M12 2l-1 2h2l-1-2" fill="#60a5fa" />
        </svg>
      );

    case 'miss_minutes':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={`drop-shadow-[0_0_10px_rgba(249,115,22,0.85)] ${className}`}
        >
          {/* Orange Clock Body */}
          <circle cx="12" cy="12" r="9.5" fill="#ea580c" stroke="#fed7aa" strokeWidth="1.5" />
          {/* Clock Dial Marks */}
          <circle cx="12" cy="4" r="0.8" fill="#ffedd5" />
          <circle cx="20" cy="12" r="0.8" fill="#ffedd5" />
          <circle cx="12" cy="20" r="0.8" fill="#ffedd5" />
          <circle cx="4" cy="12" r="0.8" fill="#ffedd5" />
          {/* Smiling Eyes */}
          <circle cx="9.5" cy="10" r="1.2" fill="#431407" />
          <circle cx="14.5" cy="10" r="1.2" fill="#431407" />
          <circle cx="9.2" cy="9.6" r="0.4" fill="#ffffff" />
          <circle cx="14.2" cy="9.6" r="0.4" fill="#ffffff" />
          {/* Cheerful Smile */}
          <path d="M9 13.5c.8 1.5 3.2 1.5 4 0" stroke="#431407" strokeWidth="1.2" strokeLinecap="round" />
          {/* Clock Hands pointing happily */}
          <line x1="12" y1="12" x2="12" y2="7" stroke="#ffedd5" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="12" y1="12" x2="15.5" y2="12" stroke="#ffedd5" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="12" r="1.2" fill="#fed7aa" />
        </svg>
      );

    case 'quantum_core':
    default:
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={`drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] ${className}`}
        >
          <circle cx="12" cy="12" r="9" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 2" />
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#c084fc" strokeWidth="1.2" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#c084fc" strokeWidth="1.2" transform="rotate(-30 12 12)" />
          <circle cx="12" cy="12" r="3.5" fill="#a855f7" />
          <circle cx="12" cy="12" r="1.5" fill="#ffffff" />
        </svg>
      );
  }
};
