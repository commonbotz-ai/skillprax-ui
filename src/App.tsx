import React, { useState, useEffect } from 'react';
import { UserProfile, SkillTrack, AIEngine } from './types';
import { CinematicVideoBackground } from './components/CinematicVideoBackground';
import { UniversalPreviewSwitcher, PageId } from './components/UniversalPreviewSwitcher';
import { LandingPage } from './pages/LandingPage';
import { ProfileHubPage } from './pages/ProfileHubPage';
import { WorkspaceStudioPage } from './pages/WorkspaceStudioPage';
import { AdminPasscodeModal } from './components/AdminPasscodeModal';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_PROFILE: UserProfile = {
  id: 'profile-manendra-1',
  name: 'Manendra Patel',
  age: 18,
  profession: 'Class 12 Student',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  targetHours: 10,
  targetMinutes: 50,
  dailyReminderTime: '20:30',
  notificationsEnabled: true,
  activeDays: 22,
  followingsCount: 12,
  skillsCompleted: 1,
  flameStreak: 7,
  activeFreezes: 1,
  maxFreezes: 3,
  studyCadence: [
    { day: 'Sun', hours: 2, minutes: 30, focusArea: 'Sprint Clearance', nodesCompleted: 1 },
    { day: 'Mon', hours: 3, minutes: 45, focusArea: 'Graph Traversal', nodesCompleted: 2 },
    { day: 'Tue', hours: 4, minutes: 15, focusArea: 'Haloalkanes Intro', nodesCompleted: 1 },
    { day: 'Wed', hours: 5, minutes: 0, focusArea: 'Walden Inversion', nodesCompleted: 3 },
    { day: 'Thu', hours: 6, minutes: 30, focusArea: 'SN1/SN2 Socratic Gate', nodesCompleted: 2 },
    { day: 'Fri', hours: 3, minutes: 10, focusArea: 'Biomechanical Force', nodesCompleted: 1 },
    { day: 'Sat', hours: 4, minutes: 50, focusArea: 'Synthesis Review', nodesCompleted: 2 },
  ],
};

const INITIAL_TRACKS: SkillTrack[] = [
  {
    id: 'track-haloalkanes',
    title: 'NCERT Class 12 Chemistry: Haloalkanes and Haloarenes',
    category: 'Chemistry',
    tags: ['Chemistry', 'NCERT', 'JEE Advanced', 'Mechanisms'],
    currentStep: 2,
    totalSteps: 6,
    progressPercent: 33,
    colorScheme: 'amber',
    icon: 'FlaskConical',
    milestones: [
      {
        id: 'm-chem-1',
        stepNumber: 1,
        title: 'Classification & Nomenclature',
        description: 'Aliphatic, allylic, benzylic, vinylic, and arylic halide structures.',
        status: 'completed',
        acus: ['ACU-1: sp³ vs sp² C-X classification', 'ACU-2: IUPAC haloarene numbering'],
      },
      {
        id: 'm-chem-2',
        stepNumber: 2,
        title: 'Methods of Preparation & Halogen Exchange',
        description: 'Darzens SOCl₂ process, Finkelstein NaI/acetone, and Swarts AgF fluorination.',
        status: 'active',
        acus: ['ACU-3: Darzens gaseous byproducts', 'ACU-4: Finkelstein acetone precipitation'],
      },
      {
        id: 'm-chem-3',
        stepNumber: 3,
        title: 'Nucleophilic Substitution Mechanics (SN1 vs SN2)',
        description: 'Walden inversion, pentacoordinate transition state, and planar carbocation stability.',
        status: 'locked',
        acus: ['ACU-5: Polar aprotic solvent acceleration', 'ACU-6: Optical inversion criteria'],
      },
      {
        id: 'm-chem-4',
        stepNumber: 4,
        title: 'Ambident Nucleophiles & Saytzeff Elimination',
        description: 'KCN vs AgCN ambident reactivity, and anti-periplanar E2 dehydrohalogenation.',
        status: 'locked',
        acus: ['ACU-7: Ionic vs covalent ambident control', 'ACU-8: Zaitsev hyperconjugation rule'],
      },
      {
        id: 'm-chem-5',
        stepNumber: 5,
        title: 'Aromatic Wing & Haloarene Low Reactivity',
        description: 'Resonance delocalization, sp² hybridization, Dow’s process, and EAS orientation.',
        status: 'locked',
        acus: ['ACU-9: Phenyl cation instability', 'ACU-10: Ortho/para activating resonance'],
      },
      {
        id: 'm-chem-6',
        stepNumber: 6,
        title: 'Organometallics & Polyhalogen Environmental Profile',
        description: 'Wurtz, Fittig, Grignard reagents, Chloroform oxidation, and p,p\'-DDT bioaccumulation.',
        status: 'locked',
        acus: ['ACU-11: Grignard protic quenching', 'ACU-12: DDT synthesis & persistence'],
      },
    ],
  },
  {
    id: 'track-athletics',
    title: 'Athletics & Kinematic Acceleration',
    category: 'Athletics',
    tags: ['Athletics', 'Biomechanics', 'Sprint'],
    currentStep: 1,
    totalSteps: 5,
    progressPercent: 20,
    colorScheme: 'emerald',
    icon: 'Zap',
    milestones: [
      {
        id: 'm-ath-1',
        stepNumber: 1,
        title: 'Sprint Mechanics & Block Clearance',
        description: 'Biomechanical foot strike angle and initial block projection impulse.',
        status: 'active',
        acus: ['ACU-1: Block angle clearance', 'ACU-2: Acute ground vector'],
      },
      {
        id: 'm-ath-2',
        stepNumber: 2,
        title: 'Max Velocity Phase & Pelvic Kinematics',
        description: 'Maintaining elastic recoil without premature vertical posture.',
        status: 'locked',
        acus: ['ACU-3: Elastic energy storage', 'ACU-4: Hip extension velocity'],
      },
      {
        id: 'm-ath-3',
        stepNumber: 3,
        title: 'Speed Endurance & Deceleration Buffer',
        description: 'Lactate buffering and stride frequency retention.',
        status: 'locked',
        acus: ['ACU-5: Glycolytic pacing'],
      },
      {
        id: 'm-ath-4',
        stepNumber: 4,
        title: 'Competition Cadence Optimization',
        description: 'Environmental wind and neural pre-activation.',
        status: 'locked',
        acus: ['ACU-6: CNS potentiating'],
      },
      {
        id: 'm-ath-5',
        stepNumber: 5,
        title: 'Championship Mastery Synthesis',
        description: 'Integrated physiological peak execution.',
        status: 'locked',
        acus: ['ACU-7: Race-day tapering protocol'],
      },
    ],
  },
  {
    id: 'track-algorithms',
    title: 'Autonomous Graph Theory & Algorithmic Complexity',
    category: 'Programming',
    tags: ['Programming', 'Graph Theory', 'Algorithms', 'Mastery'],
    currentStep: 5,
    totalSteps: 5,
    progressPercent: 100,
    colorScheme: 'amber',
    icon: 'Code',
    milestones: [
      {
        id: 'm-algo-1',
        stepNumber: 1,
        title: 'Asymptotic Analysis & Big-O Axioms',
        description: 'Time and space complexity invariants across recursion trees.',
        status: 'completed',
        acus: ['ACU-1: Recurrence relations', 'ACU-2: Master theorem bounds'],
      },
      {
        id: 'm-algo-2',
        stepNumber: 2,
        title: 'Graph Traversal & Topological DAGs',
        description: 'Depth-first search, cycle detection, and strongly connected components.',
        status: 'completed',
        acus: ['ACU-3: Tarjan articulation points', 'ACU-4: Kahn topological order'],
      },
      {
        id: 'm-algo-3',
        stepNumber: 3,
        title: 'Shortest Path & Network Flows',
        description: 'Dijkstra with indexed priority queues and Ford-Fulkerson max flow.',
        status: 'completed',
        acus: ['ACU-5: Potential functions', 'ACU-6: Residual network cuts'],
      },
      {
        id: 'm-algo-4',
        stepNumber: 4,
        title: 'Dynamic Programming & Memoized Schemas',
        description: 'Subproblem optimal substructure and state space reduction.',
        status: 'completed',
        acus: ['ACU-7: Bitmask transitions', 'ACU-8: Monotonic queue optimization'],
      },
      {
        id: 'm-algo-5',
        stepNumber: 5,
        title: 'Apex Algorithmic Synthesis & Verification',
        description: 'Comprehensive mastery of competitive algorithmic structures.',
        status: 'completed',
        acus: ['ACU-9: Convex hull trick', 'ACU-10: Splay trees & Link-cut'],
      },
    ],
  },
];

export default function App() {
  // Navigation state: 'landing' | 'profile' | 'studio'
  const [currentPage, setCurrentPage] = useState<PageId>('landing');

  // Profile and Skills state (persisted in localStorage)
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('skillprax_profile');
      return saved ? JSON.parse(saved) : INITIAL_PROFILE;
    } catch {
      return INITIAL_PROFILE;
    }
  });

  const [tracks, setTracks] = useState<SkillTrack[]>(() => {
    try {
      const saved = localStorage.getItem('skillprax_tracks');
      return saved ? JSON.parse(saved) : INITIAL_TRACKS;
    } catch {
      return INITIAL_TRACKS;
    }
  });

  const [selectedTrackId, setSelectedTrackId] = useState<string>(tracks[0]?.id || 'track-haloalkanes');
  const [selectedEngine, setSelectedEngine] = useState<AIEngine>('groq-llama-3.3-70b');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('skillprax_profile', JSON.stringify(userProfile));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('skillprax_tracks', JSON.stringify(tracks));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [tracks]);

  // Handle Profile Update
  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updated }));
  };

  // Handle Add Track
  const handleAddTrack = (newTrack: SkillTrack) => {
    setTracks((prev) => [...prev, newTrack]);
    setSelectedTrackId(newTrack.id);
  };

  // Handle Pass Evaluation (advances track milestone and increments flame streak)
  const handlePassEvaluation = () => {
    setTracks((prev) =>
      prev.map((t) => {
        if (t.id === selectedTrackId) {
          const nextStep = Math.min(t.totalSteps, t.currentStep + 1);
          const nextPercent = Math.round((nextStep / t.totalSteps) * 100);
          return {
            ...t,
            currentStep: nextStep,
            progressPercent: nextPercent,
            milestones: t.milestones.map((m, idx) => {
              if (idx < nextStep) return { ...m, status: 'completed' as const };
              if (idx === nextStep) return { ...m, status: 'active' as const };
              return m;
            }),
          };
        }
        return t;
      })
    );

    setUserProfile((prev) => ({
      ...prev,
      flameStreak: prev.flameStreak + 1,
      skillsCompleted: prev.skillsCompleted + 1,
    }));
  };

  // Unlock all nodes for testing (Admin action)
  const handleUnlockAllNodes = () => {
    setTracks((prev) =>
      prev.map((t) => ({
        ...t,
        milestones: t.milestones.map((m) => ({ ...m, status: 'completed' as const })),
        progressPercent: 100,
        currentStep: t.totalSteps,
      }))
    );
  };

  // Map legacy page IDs to canonical views
  const isLandingView = currentPage === 'landing' || currentPage === 'page01';
  const isProfileView = currentPage === 'profile' || currentPage === 'page02';
  const isStudioView =
    currentPage === 'studio' || currentPage === 'page03' || currentPage === 'page04';

  const currentTrack = tracks.find((t) => t.id === selectedTrackId) || tracks[0];

  const handleNavigate = (page: PageId | string) => {
    if (page === 'page01' || page === 'landing') {
      setCurrentPage('landing');
    } else if (page === 'page02' || page === 'profile') {
      setCurrentPage('profile');
    } else {
      // 'studio', 'page03', 'page04' all route directly to Workspace Studio with in-place evaluation
      setCurrentPage('studio');
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent font-sans antialiased text-[#1E293B] selection:bg-emerald-100 selection:text-emerald-900">
      {/* 1. Production-Grade Zero-Cut Cinematic Video Background (Dual-Buffer Anti-Flicker Engine) */}
      <CinematicVideoBackground src="/background video.mp4" poster="/background-poster.jpg" />

      {/* 2. Top Universal Preview Switcher */}
      <UniversalPreviewSwitcher
        activePage={currentPage}
        onSelectPage={(page) => handleNavigate(page)}
      />

      {/* 3. Dynamic Page View with Staggered Entrance Animations & AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isLandingView ? 'landing' : isProfileView ? 'profile' : 'studio'}
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full"
        >
          {isLandingView && (
            <LandingPage
              userProfile={userProfile}
              onUpdateProfile={handleUpdateProfile}
              onNavigate={handleNavigate}
              tracks={tracks}
              onOpenAdmin={() => setIsAdminOpen(true)}
            />
          )}

          {isProfileView && (
            <ProfileHubPage
              userProfile={userProfile}
              onUpdateProfile={handleUpdateProfile}
              tracks={tracks}
              onSelectTrack={(tId) => {
                setSelectedTrackId(tId);
                setCurrentPage('studio');
              }}
              onAddTrack={handleAddTrack}
              onNavigate={handleNavigate}
              onOpenAdmin={() => setIsAdminOpen(true)}
            />
          )}

          {isStudioView && (
            <WorkspaceStudioPage
              currentTrack={currentTrack}
              onNavigate={handleNavigate}
              selectedEngine={selectedEngine}
              onSelectEngine={setSelectedEngine}
              onPassEvaluation={handlePassEvaluation}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* 4. Easter Egg Master Admin Passcode Modal (triggered by typing /admin in profession) */}
      <AdminPasscodeModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        userProfile={userProfile}
        onUpdateProfile={handleUpdateProfile}
        onUnlockAllNodes={handleUnlockAllNodes}
        tracks={tracks}
      />
    </div>
  );
}
