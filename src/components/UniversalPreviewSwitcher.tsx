import React from 'react';
import { Compass, User, GitBranch, Zap } from 'lucide-react';

export type PageId = 'landing' | 'profile' | 'studio' | 'page01' | 'page02' | 'page03' | 'page04';

interface UniversalPreviewSwitcherProps {
  activePage: PageId;
  onSelectPage: (page: PageId) => void;
}

export const UniversalPreviewSwitcher: React.FC<UniversalPreviewSwitcherProps> = ({
  activePage,
  onSelectPage,
}) => {
  // Canonical 3-page architecture (Zero detached evaluation page, in-place evaluation lives inside Workspace Studio)
  const isLanding = activePage === 'landing' || activePage === 'page01';
  const isProfile = activePage === 'profile' || activePage === 'page02';
  const isStudio = activePage === 'studio' || activePage === 'page03' || activePage === 'page04';

  const pages: { id: PageId; label: string; shortLabel: string; active: boolean; icon: React.ReactNode }[] = [
    {
      id: 'landing',
      label: 'Page 01: Landing',
      shortLabel: '01 Landing',
      active: isLanding,
      icon: <Compass className="w-3.5 h-3.5" />,
    },
    {
      id: 'profile',
      label: 'Page 02: Profile Hub',
      shortLabel: '02 Profile',
      active: isProfile,
      icon: <User className="w-3.5 h-3.5" />,
    },
    {
      id: 'studio',
      label: 'Page 03: Workspace Studio & Evaluation',
      shortLabel: '03 Studio',
      active: isStudio,
      icon: <GitBranch className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 px-2 select-none max-w-[96vw]">
      <nav
        aria-label="Universal Blueprint Switcher"
        className="flex items-center gap-1 p-1 bg-white/90 backdrop-blur-xl border border-emerald-200/80 rounded-full shadow-lg shadow-emerald-950/5 ring-1 ring-black/5"
      >
        {pages.map((p) => {
          return (
            <button
              key={p.id}
              onClick={() => onSelectPage(p.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                p.active
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 active:scale-95'
              }`}
            >
              <span className={p.active ? 'text-white' : 'text-emerald-600'}>{p.icon}</span>
              <span className="hidden sm:inline">{p.label}</span>
              <span className="sm:hidden">{p.shortLabel}</span>
              {p.active && (
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping ml-0.5" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default UniversalPreviewSwitcher;
