import React, { useState } from 'react';
import { SkillTrackLogo } from '../../../components/SkillTrackLogo';
import { CinematicVideoBackground } from '../../../components/CinematicVideoBackground';
import { InAppYouTubePlayerModal } from '../../../components/InAppYouTubePlayerModal';
import { InAppContentReaderModal, InAppDocContent } from '../../../components/InAppContentReaderModal';
import { QuizAndEvaluationEngine } from '../../../components/QuizAndEvaluationEngine';
import {
  CheckCircle2,
  Lock,
  Play,
  FileText,
  Clock,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  RotateCcw,
  Sparkles,
  Zap,
  BookOpen,
  Award,
  Layers,
  HelpCircle,
  Flame,
  Shield,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface MilestoneData {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  acus: string[];
  status: 'completed' | 'active' | 'locked';
  videos: {
    id: string;
    title: string;
    channel: string;
    duration: string;
    youtubeId: string;
    takeaway: string;
    keyPoints: string[];
    isWatched?: boolean;
  }[];
  docs: {
    id: string;
    title: string;
    source: string;
    sourceUrl?: string;
    badge: string;
    corePrinciple60s: string;
    executionSteps: { stepNumber: number; title: string; description: string }[];
    misconceptions: { flawedMentalModel: string; accurateAxiom: string }[];
    officialReferenceNote: string;
    isInteractiveTool?: boolean;
    isRead?: boolean;
  }[];
}

export interface WorkspacePageProps {
  trackTitle?: string;
  trackDomain?: string;
  onNavigateBack: () => void;
}

const DEFAULT_MILESTONES: MilestoneData[] = [
  {
    id: 'm-1',
    stepNumber: 1,
    title: 'Classification & Nomenclature',
    subtitle: 'Structural Taxonomy & Halogen Carbon Hybridization',
    description: 'Systematic classification of haloalkanes and haloarenes into sp³ C-X (alkyl, allylic, benzylic) and sp² C-X (vinylic, aryl) structures with IUPAC nomenclature.',
    status: 'completed',
    acus: [
      'ACU-1: Differentiate sp³ vs sp² bonded halides under IUPAC rules',
      'ACU-2: Position isomerism in polyhalogen aromatic rings',
    ],
    videos: [
      {
        id: 'v-1-1',
        title: 'Classification of Haloalkanes & Haloarenes (NCERT Masterclass)',
        channel: 'Khan Academy Chemistry',
        duration: '14 mins',
        youtubeId: 'r1K_B4kE06w',
        takeaway: 'Focus on classifying allylic vs vinylic carbons based on hybridization state.',
        keyPoints: [
          'Allylic carbons are sp³ hybridized adjacent to a C=C double bond',
          'Vinylic carbons are directly sp² hybridized with the double bond',
        ],
        isWatched: true,
      },
    ],
    docs: [
      {
        id: 'd-1-1',
        title: 'IUPAC Gold Book: Halocarbon Structural Taxonomy',
        source: 'IUPAC Compendium of Chemical Terminology',
        sourceUrl: 'https://goldbook.iupac.org/',
        badge: 'Canonical Standard',
        corePrinciple60s: 'Haloalkanes are classified primarily by the hybridization state (sp³ vs sp²) of the carbon atom directly bonded to the halogen atom.',
        executionSteps: [
          { stepNumber: 1, title: 'Identify Carbon Hybridization', description: 'Count sigma bonds to determine sp³ (tetrahedral) vs sp² (trigonal planar).' },
          { stepNumber: 2, title: 'Locate Adjacent Unsaturations', description: 'If adjacent to C=C, classify as allylic; if directly on benzene, classify as aryl.' },
        ],
        misconceptions: [
          { flawedMentalModel: 'Assuming benzyl chloride is an aryl halide because it has a benzene ring.', accurateAxiom: 'In benzyl chloride, chlorine is attached to an sp³ CH₂ group, making it an alkyl/benzylic halide.' },
        ],
        officialReferenceNote: 'NCERT Class 12 Chemistry, Chapter 6, Section 6.1.',
        isRead: true,
      },
    ],
  },
  {
    id: 'm-2',
    stepNumber: 2,
    title: 'Methods of Preparation & Halogen Exchange',
    subtitle: 'Darzens SOCl₂ Process, Finkelstein NaI & Swarts AgF',
    description: 'Synthesizing haloalkanes from alcohols, hydrocarbons, and halogen exchange reactions. Understanding thermodynamic drivers like volatile gas escape and acetone precipitation.',
    status: 'active',
    acus: [
      'ACU-3: Darzens process volatile gaseous byproducts driving equilibrium',
      'ACU-4: Finkelstein acetone precipitation driving force via Le Chatelier',
    ],
    videos: [
      {
        id: 'v-2-1',
        title: 'Finkelstein & Swarts Halogen Exchange Mechanisms',
        channel: 'Physics Wallah / NCERT Chemistry',
        duration: '18 mins',
        youtubeId: 'W1YfD0MUpH4',
        takeaway: 'Acetone dissolves NaI but precipitates NaCl and NaBr, driving halogen substitution.',
        keyPoints: [
          'NaI has covalent lattice character soluble in dry acetone',
          'Heavy metal fluorides (AgF, Hg₂F₂) facilitate clean Swarts exchange',
        ],
        isWatched: false,
      },
      {
        id: 'v-2-2',
        title: 'Preparation from Alcohols: Thionyl Chloride (Darzens Process)',
        channel: 'Professor Dave Explains',
        duration: '12 mins',
        youtubeId: 'o6VUpM4j9n0',
        takeaway: 'SO₂ and HCl are gases that escape automatically, yielding 100% pure chloroalkanes.',
        keyPoints: [
          'Escape of gaseous byproducts drives equilibrium forward',
          'Pyridine can be added to neutralize acidic vapors',
        ],
        isWatched: false,
      },
    ],
    docs: [
      {
        id: 'd-2-1',
        title: 'NCERT Halogen Exchange & Darzens SOCl₂ Mechanics',
        source: 'NCERT Official Curriculum Portal',
        sourceUrl: 'https://ncert.nic.in/',
        badge: 'CBSE Class 12 Core',
        corePrinciple60s: 'Alkyl iodides are prepared by Finkelstein reaction (R-Cl + NaI in dry acetone) where NaCl precipitates. Alkyl fluorides are prepared by Swarts reaction using heavy metal fluorides like AgF.',
        executionSteps: [
          { stepNumber: 1, title: 'Finkelstein Setup', description: 'Reflux alkyl chloride with NaI in dry acetone; monitor NaCl solid precipitate.' },
          { stepNumber: 2, title: 'Swarts Fluorination', description: 'Heat alkyl bromide with AgF or SbF₃ to perform halogen exchange.' },
          { stepNumber: 3, title: 'Darzens SOCl₂ Process', description: 'Treat alcohol with SOCl₂; SO₂ and HCl gases escape directly.' },
        ],
        misconceptions: [
          { flawedMentalModel: 'Direct fluorination of alkanes with F₂ gas is a viable laboratory synthesis.', accurateAxiom: 'Direct fluorination is violently explosive; Swarts halogen exchange is mandatory.' },
        ],
        officialReferenceNote: 'NCERT Class 12, Textbook Part II, Unit 6, Methods of Preparation.',
        isRead: false,
      },
      {
        id: 'd-2-2',
        title: 'MolView 3D Molecular Sandbox: Tetrahedral Halides',
        source: 'MolView Interactive Chemical Visualizer',
        sourceUrl: 'https://molview.org/',
        badge: 'Interactive 3D Tool',
        corePrinciple60s: 'Interactive molecular modeler displaying bond lengths, electrostatic potential surfaces, and steric hindrance.',
        executionSteps: [],
        misconceptions: [],
        officialReferenceNote: 'Open-access 3D chemical structure workbench.',
        isInteractiveTool: true,
      },
    ],
  },
  {
    id: 'm-3',
    stepNumber: 3,
    title: 'Nucleophilic Substitution Mechanics (SN1 vs SN2)',
    subtitle: 'Walden Inversion, Pentacoordinate State & Carbocation Solvation',
    description: 'Kinetic and stereochemical dichotomy of bimolecular vs unimolecular substitution. Polar aprotic solvents, Walden inversion, and carbocation rearrangement.',
    status: 'locked',
    acus: [
      'ACU-5: Polar aprotic solvent acceleration for SN2 transition states',
      'ACU-6: Optical inversion criteria and Walden umbrella inversion',
    ],
    videos: [
      {
        id: 'v-3-1',
        title: 'SN1 vs SN2 Mechanics & Walden Inversion 3D Animation',
        channel: 'Khan Academy Organic Chemistry',
        duration: '22 mins',
        youtubeId: 'U2XWfB8N_Yc',
        takeaway: 'Backside attack into the σ* orbital produces 100% stereochemical inversion.',
        keyPoints: [
          'Backside 180° attack inverts chiral centers',
          'SN1 proceeds via planar carbocation with partial racemization',
        ],
      },
    ],
    docs: [
      {
        id: 'd-3-1',
        title: 'Canonical Reaction Mechanisms: Bimolecular Substitution',
        source: 'Master Organic Chemistry Guide',
        badge: 'Axiomatic Standard',
        corePrinciple60s: 'SN2 involves a concerted single-step backside attack into the σ* antibonding orbital, requiring polar aprotic solvents like DMSO or acetone.',
        executionSteps: [
          { stepNumber: 1, title: 'Nucleophilic Backside Approach', description: 'Nucleophile approaches from 180° opposite the C-X leaving bond.' },
          { stepNumber: 2, title: 'Pentacoordinate Transition State', description: 'Carbon forms partial bonds with both incoming and outgoing groups.' },
        ],
        misconceptions: [
          { flawedMentalModel: 'SN2 reactions proceed faster in water due to higher polarity.', accurateAxiom: 'Protic solvents form hydrogen bonds with the nucleophile, deactivating it; polar aprotic solvents accelerate SN2.' },
        ],
        officialReferenceNote: 'March’s Advanced Organic Chemistry, 8th Edition.',
      },
    ],
  },
  {
    id: 'm-4',
    stepNumber: 4,
    title: 'Elimination vs Substitution Competition',
    subtitle: 'Zaitsev vs Hofmann Regioselectivity & Base Steric Profiles',
    description: 'Bimolecular elimination (E2) mechanics, anti-periplanar transition geometry, temperature influence, and base steric bulk determining alkene substitution patterns.',
    status: 'locked',
    acus: ['ACU-7: Thermodynamic Zaitsev alkene stability', 'ACU-8: Bulky base Hofmann selectivity'],
    videos: [],
    docs: [],
  },
  {
    id: 'm-5',
    stepNumber: 5,
    title: 'Haloarenes & Electrophilic Aromatic Substitution',
    subtitle: 'Resonance Stabilization & Ortho/Para Directing Nature',
    description: 'Low reactivity of haloarenes in nucleophilic substitution due to partial double bond character. Ortho-para directing nature in nitration, halogenation, and Friedel-Crafts.',
    status: 'locked',
    acus: ['ACU-9: Phenyl-halogen partial double bond character', 'ACU-10: EAS directing resonance structures'],
    videos: [],
    docs: [],
  },
  {
    id: 'm-6',
    stepNumber: 6,
    title: 'Polyhalogen Derivatives & Environmental Impact',
    subtitle: 'Chloroform, Iodoform Test, Freons, and p,p\'-DDT Synthesis',
    description: 'Preparation and analytical chemistry of trihalomethanes, the characteristic yellow precipitate in the iodoform reaction, and environmental bioaccumulation of DDT.',
    status: 'locked',
    acus: ['ACU-11: Iodoform test for methyl ketones and ethanols', 'ACU-12: DDT synthesis from chlorobenzene & chloral'],
    videos: [],
    docs: [],
  },
];

export const WorkspaceStudioPage: React.FC<WorkspacePageProps> = ({
  trackTitle = 'NCERT Class 12 Chemistry: Haloalkanes and Haloarenes',
  trackDomain = 'Science',
  onNavigateBack,
}) => {
  const [milestones, setMilestones] = useState<MilestoneData[]>(DEFAULT_MILESTONES);
  const [viewingMilestoneIndex, setViewingMilestoneIndex] = useState<number>(1); // Currently viewing Step 2
  const currentActiveIndex = 1; // Milestone 2 is active

  // In-App Modals State
  const [activeVideoModal, setActiveVideoModal] = useState<any | null>(null);
  const [activeDocModal, setActiveDocModal] = useState<InAppDocContent | null>(null);
  const [isEvaluationOpen, setIsEvaluationOpen] = useState(false);

  const viewingMilestone = milestones[viewingMilestoneIndex];
  const isRetrospectiveMode = viewingMilestoneIndex < currentActiveIndex;

  const handleMarkVideoWatched = (videoId: string) => {
    setMilestones((prev) =>
      prev.map((m) => ({
        ...m,
        videos: m.videos.map((v) => (v.id === videoId ? { ...v, isWatched: true } : v)),
      }))
    );
  };

  const handleMarkDocRead = (docId: string) => {
    setMilestones((prev) =>
      prev.map((m) => ({
        ...m,
        docs: m.docs.map((d) => (d.id === docId ? { ...d, isRead: true } : d)),
      }))
    );
  };

  const handlePassEvaluation = (score: number) => {
    // Unlock next milestone if viewing active
    setMilestones((prev) =>
      prev.map((m, idx) => {
        if (idx === viewingMilestoneIndex) {
          return { ...m, status: 'completed' };
        }
        if (idx === viewingMilestoneIndex + 1) {
          return { ...m, status: 'active' };
        }
        return m;
      })
    );
  };

  const handleAdvanceToNext = () => {
    setIsEvaluationOpen(false);
    if (viewingMilestoneIndex + 1 < milestones.length) {
      setViewingMilestoneIndex(viewingMilestoneIndex + 1);
    }
  };

  return (
    <div className="relative min-h-screen pb-16 bg-transparent text-slate-800">
      <CinematicVideoBackground />

      {/* TOP WORKSPACE NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateBack}
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <SkillTrackLogo mode="auto" size="sm" showText={true} />
          <span className="hidden sm:inline-block text-xs font-bold text-slate-400 border-l border-slate-200 pl-3">
            {trackTitle}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Milestone {viewingMilestone.stepNumber} of {milestones.length}</span>
          </div>

          <button
            onClick={() => setIsEvaluationOpen(true)}
            className="btn-primary text-xs font-bold py-2 px-4 shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>Launch Evaluation Gate</span>
          </button>
        </div>
      </header>

      {/* =====================================================================
          CLICKABLE RETROSPECTIVE ACCESS (TOP BANNER)
          ===================================================================== */}
      {isRetrospectiveMode && (
        <div className="bg-gradient-to-r from-sky-50 via-indigo-50 to-emerald-50 border-b border-sky-200 px-4 sm:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-30">
          <div className="flex items-center gap-2.5 text-xs text-sky-950 font-medium">
            <RotateCcw className="w-4 h-4 text-[#0284C7] shrink-0" />
            <span>
              Viewing <strong>Milestone {viewingMilestone.stepNumber}: {viewingMilestone.title}</strong> (Completed) • You can review past documentation, re-watch video tutorials, or retake the evaluation.
            </span>
          </div>
          <button
            onClick={() => setViewingMilestoneIndex(currentActiveIndex)}
            className="px-4 py-1.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold shrink-0 transition-colors shadow-xs"
          >
            Return to Current Active Milestone (Step {currentActiveIndex + 1}) ➔
          </button>
        </div>
      )}

      {/* WORKSPACE MAIN BODY: TWO COLUMNS */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* =====================================================================
            PART 6: VISUAL FLOWCHART NODE STEPPER (LEFT SIDEBAR / 4 COLS)
            ===================================================================== */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/80 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#0284C7]" />
                <span>Roadmap Flowchart</span>
              </h3>
              <span className="text-[11px] font-bold text-slate-400">Click node to inspect</span>
            </div>

            {/* FLOWCHART SEQUENTIAL STEPPER */}
            <div className="relative space-y-3">
              {milestones.map((m, idx) => {
                const isCompleted = m.status === 'completed';
                const isActive = m.status === 'active';
                const isLocked = m.status === 'locked';
                const isSelected = idx === viewingMilestoneIndex;

                return (
                  <div key={m.id} className="relative">
                    {/* Connecting Pathway Line */}
                    {idx < milestones.length - 1 && (
                      <div
                        className={`absolute left-5 top-10 w-0.5 h-8 -z-10 transition-colors ${
                          isCompleted
                            ? 'bg-emerald-500'
                            : isActive
                            ? 'bg-gradient-to-b from-[#0284C7] to-slate-200'
                            : 'border-l-2 border-dashed border-slate-300'
                        }`}
                      />
                    )}

                    {/* Step Card */}
                    <div
                      onClick={() => {
                        if (!isLocked) setViewingMilestoneIndex(idx);
                      }}
                      className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3.5 ${
                        isSelected
                          ? 'bg-sky-50/90 border-[#0284C7] shadow-sm'
                          : isLocked
                          ? 'bg-slate-50/50 border-slate-200/50 opacity-60 cursor-not-allowed'
                          : 'bg-white border-slate-200 hover:border-slate-300 cursor-pointer'
                      }`}
                    >
                      {/* Node Circle */}
                      <div className="shrink-0 mt-0.5">
                        {isCompleted ? (
                          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        ) : isActive ? (
                          <div className="relative flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-[#0284C7] text-white flex items-center justify-center font-bold text-xs shadow-md shadow-sky-500/30">
                              {m.stepNumber}
                            </div>
                            <span className="absolute -inset-1 rounded-full border-2 border-[#0284C7] animate-ping opacity-60 pointer-events-none" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-xs">
                            <Lock className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[10px] font-black uppercase tracking-wider ${
                              isCompleted
                                ? 'text-emerald-700'
                                : isActive
                                ? 'text-[#0284C7]'
                                : 'text-slate-400'
                            }`}
                          >
                            Milestone {m.stepNumber} {isCompleted ? '✓ Done' : isActive ? '• Active' : '• Locked'}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 truncate mt-0.5">
                          {m.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {m.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* =====================================================================
            PART 7: MAIN CONTENT STAGE (RIGHT / 8 COLS)
            ===================================================================== */}
        <section className="lg:col-span-8 space-y-6">
          {/* Milestone Details Card */}
          <div className="rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-sky-100 text-[#0284C7] border border-sky-200">
                  Milestone {viewingMilestone.stepNumber} of {milestones.length}
                </span>
                {viewingMilestone.status === 'completed' && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Completed ✓
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                {viewingMilestone.title}
              </h2>
              <p className="text-sm text-slate-500 font-semibold mt-1">
                {viewingMilestone.subtitle}
              </p>
              <p className="text-sm text-slate-700 mt-3 leading-relaxed font-medium">
                {viewingMilestone.description}
              </p>
            </div>

            {/* Atomic Competency Units (ACUs) */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Target Competencies (ACUs)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {viewingMilestone.acus.map((acu, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-800 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{acu}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* =====================================================================
              CLEAN RESOURCE CARDS (ZERO THUMBNAIL CLUTTER RULE)
              ===================================================================== */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  Authoritative Study Materials & Media
                </h3>
                <p className="text-xs text-slate-500">
                  Clean zero-thumbnail resource cards opening directly in in-app media players
                </p>
              </div>
            </div>

            {/* Video Resources List */}
            {viewingMilestone.videos.length > 0 && (
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 block">
                  ▶ Video Tutorials (In-App Player)
                </span>
                <div className="space-y-2.5">
                  {viewingMilestone.videos.map((video) => (
                    <div
                      key={video.id}
                      className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-red-300 transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-700 border border-red-200">
                            ▶ YouTube Tutorial
                          </span>
                          <span className="text-xs font-semibold text-slate-400">
                            {video.channel} • {video.duration}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 leading-snug">
                          {video.title}
                        </h4>
                        <p className="text-xs text-slate-600 font-medium">
                          <strong>Pedagogical takeaway:</strong> {video.takeaway}
                        </p>
                      </div>

                      <button
                        onClick={() => setActiveVideoModal(video)}
                        className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shrink-0 shadow-xs cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Watch Video in App ▶</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documentation Resources List */}
            {viewingMilestone.docs.length > 0 && (
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7] block">
                  📄 Canonical Documentation & Syntheses
                </span>
                <div className="space-y-2.5">
                  {viewingMilestone.docs.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-100 text-[#0284C7] border border-sky-200">
                            📄 Canonical Documentation
                          </span>
                          <span className="text-xs font-semibold text-slate-400">
                            {doc.source}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 leading-snug">
                          {doc.title}
                        </h4>
                        <p className="text-xs text-slate-600 font-medium">
                          {doc.corePrinciple60s}
                        </p>
                      </div>

                      {doc.isInteractiveTool ? (
                        <a
                          href={doc.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 rounded-xl border border-[#0284C7] text-[#0284C7] hover:bg-sky-50 font-bold text-xs flex items-center justify-center gap-2 transition-colors shrink-0 cursor-pointer"
                        >
                          <span>Launch Interactive Tool ↗</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <button
                          onClick={() => setActiveDocModal(doc)}
                          className="px-5 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shrink-0 shadow-xs cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Read AI Summary in App 📖</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Socratic Gate Bottom Card Trigger */}
          <div className="rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border border-emerald-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span>Ready to Validate Comprehension?</span>
              </span>
              <h4 className="text-lg font-black text-slate-900">
                Socratic Diagnostic Gate (70% Pass Threshold)
              </h4>
              <p className="text-xs text-slate-600 font-medium max-w-lg">
                Adaptive question pool testing first-principles recall, distractor debunks, and dual-path perfection progression.
              </p>
            </div>
            <button
              onClick={() => setIsEvaluationOpen(true)}
              className="btn-primary py-3.5 px-8 font-extrabold text-xs shrink-0 shadow-lg shadow-sky-500/25"
            >
              <span>⚡ Start Evaluation Gate</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </section>
      </main>

      {/* =====================================================================
          IN-APP MEDIA MODALS
          ===================================================================== */}
      {/* 1. YouTube Player Modal */}
      <InAppYouTubePlayerModal
        isOpen={!!activeVideoModal}
        onClose={() => setActiveVideoModal(null)}
        video={activeVideoModal}
        onMarkAsWatched={handleMarkVideoWatched}
      />

      {/* 2. Structured Content Reader Modal */}
      <InAppContentReaderModal
        isOpen={!!activeDocModal}
        onClose={() => setActiveDocModal(null)}
        doc={activeDocModal}
        onMarkAsRead={handleMarkDocRead}
      />

      {/* 3. Fullscreen Socratic Evaluation Engine Modal / Panel */}
      <AnimatePresence>
        {isEvaluationOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEvaluationOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="relative z-10 w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xl my-8 max-h-[92vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                  {trackTitle} • Milestone {viewingMilestone.stepNumber}
                </span>
                <button
                  onClick={() => setIsEvaluationOpen(false)}
                  className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                >
                  Close Evaluation ✕
                </button>
              </div>

              <QuizAndEvaluationEngine
                currentTrackTitle={trackTitle}
                activeMilestoneTitle={`Milestone ${viewingMilestone.stepNumber}: ${viewingMilestone.title}`}
                nextMilestoneIndex={viewingMilestone.stepNumber + 1}
                onPassEvaluation={handlePassEvaluation}
                onAdvanceMilestone={handleAdvanceToNext}
                onOpenDoc={(docId) => {
                  const doc = viewingMilestone.docs.find((d) => d.id === docId) || viewingMilestone.docs[0];
                  setActiveDocModal(doc);
                }}
                onOpenVideo={(videoId) => {
                  const vid = viewingMilestone.videos.find((v) => v.id === videoId) || viewingMilestone.videos[0];
                  setActiveVideoModal(vid);
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkspaceStudioPage;
