import React, { useState } from 'react';
import { LaunchGatewayPage, UserProfileData } from './app/page';
import { ProfilePage, SkillTrackSummary } from './app/profile/page';
import { WorkspaceStudioPage } from './app/workspace/[id]/page';
import { SkillTrackLogo } from './components/SkillTrackLogo';
import { Compass, User, Layers, ArrowLeft } from 'lucide-react';

export type ScreenType = 'gateway' | 'profile' | 'workspace';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('gateway');
  const [userProfile, setUserProfile] = useState<UserProfileData>({
    name: 'alex_dev',
    age: 18,
    profession: 'Student',
    educationBoard: 'CBSE',
    grade: 'Class 12',
  });

  const [enrolledTracks, setEnrolledTracks] = useState<SkillTrackSummary[]>([
    {
      id: 'ncert-haloalkanes',
      title: 'NCERT Class 12 Chemistry: Haloalkanes and Haloarenes',
      domain: 'Science',
      specialization: 'Nucleophilic Substitution & Stereochemical Inversion',
      milestonesCount: 6,
      completedMilestones: 2,
      progressPercent: 33,
      badgeColor: 'sky',
      icon: 'Atom',
    },
    {
      id: 'sprint-kinematics',
      title: 'Explosive Sprint Kinematics & Stride Frequency',
      domain: 'Athletics',
      specialization: 'Acceleration Drive Phase & Ground Contact Time',
      milestonesCount: 5,
      completedMilestones: 1,
      progressPercent: 20,
      badgeColor: 'amber',
      icon: 'Dumbbell',
    },
  ]);

  const [activeTrackId, setActiveTrackId] = useState<string>('ncert-haloalkanes');

  const activeTrack = enrolledTracks.find((t) => t.id === activeTrackId) || enrolledTracks[0];

  const handleInitializeProfile = (profile: UserProfileData) => {
    setUserProfile(profile);
    setCurrentScreen('profile');
  };

  const handleSelectTrack = (trackId: string) => {
    setActiveTrackId(trackId);
    setCurrentScreen('workspace');
  };

  const handleEnrollNewTrack = (track: Partial<SkillTrackSummary>) => {
    const fullTrack: SkillTrackSummary = {
      id: track.id || `track-${Date.now()}`,
      title: track.title || 'Custom Track',
      domain: track.domain || 'Science',
      specialization: track.specialization || 'Foundations',
      milestonesCount: track.milestonesCount || 6,
      completedMilestones: track.completedMilestones || 0,
      progressPercent: track.progressPercent || 0,
      badgeColor: track.badgeColor || 'sky',
      icon: track.icon || 'Atom',
    };
    setEnrolledTracks((prev) => [fullTrack, ...prev]);
    setActiveTrackId(fullTrack.id);
    setCurrentScreen('workspace');
  };

  return (
    <div className="relative min-h-screen font-sans antialiased text-slate-800 selection:bg-sky-100 selection:text-sky-900">
      {/* GLOBAL SCREEN QUICK SWITCHER (FOR INSTANT PROTOTYPE EVALUATION) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 shadow-2xl rounded-full px-3 py-1.5 flex items-center gap-1.5 sm:gap-2">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 pl-2 pr-1 hidden sm:inline">
          Screen Navigation:
        </span>

        <button
          onClick={() => setCurrentScreen('gateway')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            currentScreen === 'gateway'
              ? 'bg-[#0284C7] text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>1. Launch Gateway</span>
        </button>

        <button
          onClick={() => setCurrentScreen('profile')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            currentScreen === 'profile'
              ? 'bg-[#0284C7] text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>2. Profile Telemetry</span>
        </button>

        <button
          onClick={() => setCurrentScreen('workspace')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            currentScreen === 'workspace'
              ? 'bg-[#0284C7] text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>3. Workspace Studio</span>
        </button>
      </div>

      {/* SCREEN 1: LAUNCH GATEWAY WITH AMBIENT CANVAS & ONBOARDING MODAL */}
      {currentScreen === 'gateway' && (
        <LaunchGatewayPage
          onInitializeProfile={handleInitializeProfile}
          onDirectNavigate={(screen) => setCurrentScreen(screen)}
        />
      )}

      {/* SCREEN 2: PROFILE TELEMETRY HUB & CURATED NEXT HORIZONS */}
      {currentScreen === 'profile' && (
        <ProfilePage
          userProfile={userProfile}
          enrolledTracks={enrolledTracks}
          onSelectTrack={handleSelectTrack}
          onEnrollNewTrack={handleEnrollNewTrack}
          onNavigateHome={() => setCurrentScreen('gateway')}
        />
      )}

      {/* SCREEN 3: INTERACTIVE FLOWCHART WORKSPACE & RETROSPECTIVE VIEWER */}
      {currentScreen === 'workspace' && (
        <WorkspaceStudioPage
          trackTitle={activeTrack.title}
          trackDomain={activeTrack.domain}
          onNavigateBack={() => setCurrentScreen('profile')}
        />
      )}
    </div>
  );
}

export default App;
