import React from 'react';
import { Sparkles } from 'lucide-react';

interface MissMinutesDancingMascotProps {
  size?: number;
  className?: string;
  showBadge?: boolean;
}

export const MissMinutesDancingMascot: React.FC<MissMinutesDancingMascotProps> = ({
  size = 110,
  className = '',
  showBadge = true
}) => {
  return (
    <div className={`flex flex-col items-center pointer-events-none ${className}`}>
      {/* Bouncy Sway Dancing Container */}
      <div className="relative animate-miss-minutes-bouncy-sway">
        {/* Luminous Pulsing Glow Backdrop */}
        <div
          className="absolute inset-0 rounded-full bg-orange-500/35 blur-2xl animate-pulse"
          style={{ width: size, height: size }}
        />

        {/* Orbiting Sparkles */}
        <div className="absolute -top-3 -right-2 text-amber-300 animate-ping">
          <Sparkles className="w-5 h-5 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
        </div>
        <div className="absolute -bottom-2 -left-3 text-orange-300 animate-pulse">
          <Sparkles className="w-4 h-4 drop-shadow-[0_0_8px_rgba(249,115,22,0.9)]" />
        </div>

        {/* Miss Minutes Vector Cartoon Character */}
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className="relative z-10 filter drop-shadow-[0_0_24px_rgba(249,115,22,0.85)]"
        >
          {/* Outer Dial Glow */}
          <circle cx="50" cy="50" r="44" fill="#c2410c" opacity="0.4" />

          {/* Main Orange Clock Body */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="#ea580c"
            stroke="#ffedd5"
            strokeWidth="3.5"
          />

          {/* Clock Dial Accent Ring */}
          <circle
            cx="50"
            cy="50"
            r="36"
            fill="none"
            stroke="#fed7aa"
            strokeWidth="1"
            strokeDasharray="2 3"
            opacity="0.8"
          />

          {/* Dial Markers */}
          <circle cx="50" cy="17" r="2.2" fill="#ffedd5" />
          <circle cx="83" cy="50" r="2.2" fill="#ffedd5" />
          <circle cx="50" cy="83" r="2.2" fill="#ffedd5" />
          <circle cx="17" cy="50" r="2.2" fill="#ffedd5" />

          {/* 1960s Cartoon White Gloves (Left waving, Right gesturing) */}
          {/* Left Hand */}
          <path
            d="M 10 46 C 4 42, 2 52, 6 56 C 10 58, 14 54, 12 48 Z"
            fill="#fef08a"
            stroke="#78350f"
            strokeWidth="1.2"
          />
          {/* Right Hand */}
          <path
            d="M 90 46 C 96 42, 98 52, 94 56 C 90 58, 86 54, 88 48 Z"
            fill="#fef08a"
            stroke="#78350f"
            strokeWidth="1.2"
          />

          {/* Big Cartoon Eyes */}
          <ellipse cx="40" cy="42" rx="6" ry="8" fill="#431407" />
          <ellipse cx="60" cy="42" rx="6" ry="8" fill="#431407" />
          {/* Big White Catchlights */}
          <ellipse cx="38" cy="39" rx="2.4" ry="3.2" fill="#ffffff" />
          <ellipse cx="58" cy="39" rx="2.4" ry="3.2" fill="#ffffff" />
          {/* Small Catchlights */}
          <circle cx="43" cy="45" r="1.2" fill="#ffffff" />
          <circle cx="63" cy="45" r="1.2" fill="#ffffff" />

          {/* Rosy Cheerful Cheeks */}
          <circle cx="30" cy="52" r="4" fill="#fb923c" opacity="0.6" />
          <circle cx="70" cy="52" r="4" fill="#fb923c" opacity="0.6" />

          {/* Happy Cartoon Mouth */}
          <path
            d="M 36 56 Q 50 72 64 56"
            fill="#7f1d1d"
            stroke="#431407"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Tongue */}
          <path
            d="M 44 63 Q 50 60 56 63 Q 50 70 44 63 Z"
            fill="#f87171"
          />

          {/* FAST SPINNING CLOCK HANDS */}
          <g className="animate-tva-hands-spin" style={{ transformOrigin: '50px 50px' }}>
            {/* Hour hand */}
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="28"
              stroke="#ffedd5"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Minute hand */}
            <line
              x1="50"
              y1="50"
              x2="72"
              y2="50"
              stroke="#ffedd5"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            {/* Center Pin */}
            <circle cx="50" cy="50" r="3.5" fill="#fef08a" stroke="#78350f" strokeWidth="1" />
          </g>

          {/* Cute Yellow Cartoon Shoes */}
          <ellipse cx="40" cy="91" rx="7" ry="4" fill="#fef08a" stroke="#78350f" strokeWidth="1.2" />
          <ellipse cx="60" cy="91" rx="7" ry="4" fill="#fef08a" stroke="#78350f" strokeWidth="1.2" />
        </svg>
      </div>
    </div>
  );
};
