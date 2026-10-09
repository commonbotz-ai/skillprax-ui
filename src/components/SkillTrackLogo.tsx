import React, { useState } from 'react';

export interface SkillTrackLogoProps {
  /**
   * Rendering mode:
   * - 'video': Displays the animated high-definition MP4 emblem
   * - 'vector': Displays the crisp SVG vector geometry with CSS animation
   * - 'auto': Uses video for larger sizes ('md', 'lg', 'xl', 'hero') and vector for 'xs', 'sm'
   */
  mode?: 'video' | 'vector' | 'auto';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showText?: boolean;
  subtitle?: string;
  className?: string;
  onClick?: () => void;
  videoSrc?: string;
}

export const SkillTrackLogo: React.FC<SkillTrackLogoProps> = ({
  mode = 'auto',
  size = 'md',
  showText = true,
  subtitle,
  className = '',
  onClick,
  videoSrc = '/videos/logo-animation.mp4',
}) => {
  const [videoError, setVideoError] = useState(false);

  const sizeConfig = {
    xs: {
      videoClass: 'w-6 h-6',
      svgSize: 24,
      textClass: 'text-base',
      subClass: 'text-[9px]',
      gap: 'gap-1.5',
    },
    sm: {
      videoClass: 'w-8 h-8',
      svgSize: 32,
      textClass: 'text-lg',
      subClass: 'text-[10px]',
      gap: 'gap-2',
    },
    md: {
      videoClass: 'w-10 h-10 md:w-12 md:h-12',
      svgSize: 44,
      textClass: 'text-2xl',
      subClass: 'text-xs',
      gap: 'gap-2.5',
    },
    lg: {
      videoClass: 'w-14 h-14 md:w-16 md:h-16',
      svgSize: 64,
      textClass: 'text-3xl md:text-4xl',
      subClass: 'text-sm',
      gap: 'gap-3',
    },
    xl: {
      videoClass: 'w-20 h-20 md:w-24 md:h-24',
      svgSize: 96,
      textClass: 'text-4xl md:text-5xl',
      subClass: 'text-base',
      gap: 'gap-3.5',
    },
    hero: {
      videoClass: 'w-24 h-24 md:w-32 md:h-32',
      svgSize: 128,
      textClass: 'text-5xl md:text-6xl',
      subClass: 'text-lg',
      gap: 'gap-4',
    },
  };

  const current = sizeConfig[size];
  const useVideo =
    (mode === 'video' || (mode === 'auto' && (size === 'md' || size === 'lg' || size === 'xl' || size === 'hero'))) &&
    !videoError;

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center ${current.gap} select-none group ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* EMBLEM CONTAINER */}
      <div className="relative flex items-center justify-center shrink-0">
        {useVideo ? (
          <div className="relative">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onError={() => setVideoError(true)}
              className={`${current.videoClass} object-contain mix-blend-multiply drop-shadow-sm transition-transform duration-300 group-hover:scale-105`}
              src={videoSrc}
            >
              {/* Fallback sources */}
              <source src="/videos/logo-animation.mp4" type="video/mp4" />
              <source src="/logo animation.mp4" type="video/mp4" />
            </video>
          </div>
        ) : (
          /* VECTOR SVG GEOMETRY REPLICATING VERIFIED EMBLEM */
          <svg
            width={current.svgSize}
            height={current.svgSize}
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
          >
            <defs>
              <linearGradient id="arrowFacetLeft" x1="180" y1="90" x2="330" y2="210" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>
              <linearGradient id="arrowFacetRight" x1="280" y1="70" x2="350" y2="230" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#0369A1" />
              </linearGradient>
              <linearGradient id="blueRiverGrad" x1="120" y1="210" x2="310" y2="420" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0284C7" />
                <stop offset="50%" stopColor="#0369A1" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>
              <linearGradient id="goldRibbonGrad" x1="220" y1="160" x2="370" y2="400" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FBBF24" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
              <linearGradient id="goldCompass" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>

            {/* 1. TOP COMPASS POINT: Diamond in Gold */}
            <polygon points="253,24 269,63 253,109 237,63" fill="url(#goldCompass)" />

            {/* 2. WEST COMPASS POINT: Arrowhead West */}
            <polygon points="99,207 160,188 160,225" fill="url(#goldCompass)" />

            {/* 3. EAST COMPASS POINT: Arrowhead East */}
            <polygon points="401,207 339,188 339,225" fill="url(#goldCompass)" />

            {/* 4. MAIN FACETED 3D UPWARD-RIGHT ARROW */}
            <g>
              <polygon points="350,62 172,175 279,160" fill="url(#arrowFacetLeft)" />
              <polygon points="350,62 279,160 314,222" fill="url(#arrowFacetRight)" />
            </g>

            {/* 5. DYNAMIC 'S' HIGHWAY / RIVER RIBBON (BLUE PATH) */}
            <path
              d="M 276,164 
                 C 220,190 178,214 170,240
                 C 158,280 205,295 240,312
                 C 285,335 300,360 270,395
                 C 240,430 185,420 115,395
                 C 160,420 220,435 255,410
                 C 285,385 270,345 220,320
                 C 180,300 135,275 145,225
                 C 155,180 215,160 276,164 Z"
              fill="url(#blueRiverGrad)"
            />

            {/* 6. DYNAMIC GOLDEN ACCENT RIBBON */}
            <path
              d="M 275,163
                 C 228,198 200,224 200,230
                 C 200,234 235,220 275,235
                 C 335,260 365,305 358,350
                 C 350,395 305,418 220,390
                 C 280,410 335,398 348,365
                 C 362,328 342,280 288,255
                 C 255,240 228,245 220,242
                 C 232,228 260,200 275,163 Z"
              fill="url(#goldRibbonGrad)"
            />
          </svg>
        )}
      </div>

      {/* TWO-TONE WORDMARK & SUBTITLE */}
      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <div className={`font-sans font-black tracking-tight ${current.textClass}`}>
            <span className="text-[#0284C7] font-black tracking-tight">SKILL-</span>
            <span className="text-[#F59E0B] font-black tracking-tight">TRACK</span>
          </div>
          {subtitle && (
            <span className={`text-slate-500 font-medium tracking-normal mt-0.5 ${current.subClass}`}>
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillTrackLogo;
