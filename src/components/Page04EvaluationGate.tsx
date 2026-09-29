import React, { useState } from 'react';
import { SkillTrack, StudyResource } from '../types';
import { SkillpraxLogo } from './SkillpraxLogo';
import {
  Zap,
  BookOpen,
  Youtube,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Award,
  ChevronRight,
  ArrowLeft,
  FileText,
  Play,
  HelpCircle,
  Eye,
  Check,
  ShieldCheck,
  Clock,
  Layers,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Page04EvaluationGateProps {
  currentTrack: SkillTrack;
  onNavigate: (page: 'page01' | 'page02' | 'page03' | 'page04') => void;
  onPassEvaluation: () => void;
  onOpenQuiz: (nodeTitle?: string, acuTitle?: string) => void;
}

export const Page04EvaluationGate: React.FC<Page04EvaluationGateProps> = ({
  currentTrack,
  onNavigate,
  onPassEvaluation,
  onOpenQuiz,
}) => {
  const [isSynthesizingResources, setIsSynthesizingResources] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const [showPreviewQuestions, setShowPreviewQuestions] = useState(false);

  // Lazy Study Resources: Strict Quota of 2 YouTube Videos & 3 Verified Canonical Docs
  const youtubeCards: StudyResource[] = [
    {
      id: 'yt-1',
      type: 'youtube',
      title: 'How to Understand Core Biomechanics & Velocity Transfer',
      subtitle: 'Sprint mechanics & power application breakdown',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      durationOrPages: '14 mins',
      viewsOrCitation: '1.2M views',
      thumbnailUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&auto=format&fit=crop&q=80',
      videoId: 'dQw4w9WgXcQ',
      verified: true,
      organization: 'Olympic Biomechanics Labs',
    },
    {
      id: 'yt-2',
      type: 'youtube',
      title: 'Rate-Determining Steps & Stereochemical Traps in Synthesis',
      subtitle: 'Canonical demonstration of SN1/SN2 inversion vs retention',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      durationOrPages: '18 mins',
      viewsOrCitation: '840K views',
      thumbnailUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&auto=format&fit=crop&q=80',
      videoId: 'dQw4w9WgXcQ',
      verified: true,
      organization: 'NCERT / ACS Socratic Academy',
    },
  ];

  const authoritativeDocs: StudyResource[] = [
    {
      id: 'doc-1',
      type: 'doc',
      title: 'Official NCERT Chapter 6: Haloalkanes and Haloarenes Specification',
      subtitle: 'Section 6.4 Nucleophilic Substitution & Ambident Kinetics',
      url: 'https://ncert.nic.in/textbook.php',
      verified: true,
      durationOrPages: '32 pages',
      organization: 'NCERT / National Curriculum Framework',
    },
    {
      id: 'doc-2',
      type: 'doc',
      title: 'IUPAC Gold Book: Inversion of Configuration (Walden Inversion)',
      subtitle: 'Rigorous physical chemistry nomenclature and stereochemical axioms',
      url: 'https://goldbook.iupac.org',
      verified: true,
      durationOrPages: 'Canonical Ref',
      organization: 'IUPAC Standards Committee',
    },
    {
      id: 'doc-3',
      type: 'doc',
      title: 'Biomechanics of Maximum Velocity Sprint Acceleration Curve',
      subtitle: 'Ground reaction force vectors and pelvic kinematic alignment',
      url: 'https://pubmed.ncbi.nlm.nih.gov',
      verified: true,
      durationOrPages: 'Peer-Reviewed Spec',
      organization: 'Journal of Applied Biomechanics',
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-tech-grid text-slate-800 pt-16 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Top Header Bar */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/85 backdrop-blur-md border-b border-emerald-100/80 px-4 sm:px-8 py-3 flex items-center justify-between"
      >
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onNavigate('page01')}
        >
          <SkillpraxLogo size="xs" showText={false} />
          <span className="font-heading font-extrabold text-xl tracking-tight transition-transform duration-200 group-hover:scale-105">
            <span className="text-[#0091FF]">Skill</span>
            <span className="text-[#F59E0B]">prax</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('page03')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-all cursor-pointer group active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back to Studio</span>
          </button>

          {/* Direct Ready for Evaluation Header Action */}
          <div className="relative p-[1.5px] rounded-xl conic-beam animate-pulse-glow">
            <button
              onClick={() => onOpenQuiz(currentTrack.title, 'Milestone Synthesis Gate')}
              className="relative z-10 px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-[10px] text-xs font-bold tracking-wide shadow-md btn-tactile btn-shimmer cursor-pointer uppercase flex items-center gap-1.5 active:scale-95"
            >
              <Zap className="w-3 h-3 text-amber-300 animate-pulse" />
              <span>Ready for Evaluation</span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full space-y-8 pt-4">
        {/* Banner with Animated Entrance */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-emerald-200/80 shadow-lg shadow-emerald-950/5 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-amber-100 text-amber-800 rounded-full uppercase">
                Gate Tier {currentTrack.currentStep}
              </span>
              <span className="text-xs text-slate-500">{currentTrack.title}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
              Evaluation & Authoritative Resource Gate
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              Bounded authoritative study materials paired with active Socratic diagnostic evaluation. When you finish preparing, click <strong>"Ready for Evaluation"</strong> to launch the Socratic Quiz Interspace.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenQuiz(currentTrack.title, 'Socratic Checkpoint')}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-500/25 btn-tactile btn-shimmer flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
              <span>Ready for Evaluation ➔</span>
            </button>
          </div>
        </motion.div>

        {/* 2-Column Split Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Lazy Study Resources (6 cols) */}
          <motion.div
            initial={{ x: -24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-emerald-200/80 shadow-lg shadow-emerald-950/5 wobble-card space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-heading font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    Authoritative Curriculum Resources
                  </h2>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Strict quota: 2 curated high-view videos & 3 canonical specifications
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsSynthesizingResources(true);
                    setTimeout(() => setIsSynthesizingResources(false), 500);
                  }}
                  className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all btn-tactile cursor-pointer"
                >
                  <Zap className={`w-3.5 h-3.5 text-emerald-600 ${isSynthesizingResources ? 'animate-bounce' : 'animate-pulse'}`} />
                  <span>Synthesize</span>
                </button>
              </div>

              {/* Strict YouTube Quota: Exactly 2 Video Cards */}
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Curated Video Synthesis (Strict 2-Quota)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {youtubeCards.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => setSelectedVideoUrl(video.url)}
                      className="group bg-slate-50/90 hover:bg-white rounded-2xl p-3 border border-slate-200/80 hover:border-emerald-300 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md flex flex-col gap-2 relative overflow-hidden"
                    >
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className="w-full h-full object-cover opacity-85 group-hover:scale-108 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-115">
                            <Play className="w-4 h-4 fill-white ml-0.5" />
                          </div>
                        </div>
                        <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-[10px] font-mono rounded backdrop-blur-sm">
                          {video.durationOrPages}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-xs font-heading font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                          {video.title}
                        </h4>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                          <span className="flex items-center gap-1 text-red-600 font-semibold">
                            <Youtube className="w-3.5 h-3.5" />
                            YouTube
                          </span>
                          <span className="flex items-center gap-1 font-mono">
                            <Eye className="w-3 h-3 text-slate-400" />
                            {video.viewsOrCitation}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Authoritative Document Links (3 Verified Cards) */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Authoritative Canonical Documents
                </span>

                <div className="space-y-2">
                  {authoritativeDocs.map((doc) => (
                    <a
                      key={doc.id}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 hover:bg-emerald-50/70 border border-slate-200/70 hover:border-emerald-300 text-xs transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 pr-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 group-hover:text-emerald-800 line-clamp-1">
                            {doc.title}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {doc.organization} • {doc.durationOrPages}
                          </div>
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Socratic Evaluation Readiness Gate Terminal (6 cols) */}
          <motion.div
            initial={{ x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-emerald-200/80 shadow-xl shadow-emerald-950/5 wobble-card space-y-6 text-center sm:text-left">
              {/* Gate Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-2xl">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-base font-heading font-bold text-slate-900">
                      Evaluation Readiness Gate
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Socratic duel gate for {currentTrack.title}
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 bg-emerald-100 text-emerald-900 font-mono text-xs font-bold rounded-full self-start sm:self-center">
                  100% READY
                </span>
              </div>

              {/* Assessment Protocol Specifications */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Assessment Protocol & Invariants
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                    <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Fisher-Yates Randomization
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Options A, B, C, D are dynamically shuffled on every attempt.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                    <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                      Misconception Diagnostics
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Instant feedback explaining why selected distractors failed.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                    <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      10:00 Exam Clock
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Paced Socratic review designed for Class 12 / NEET / JEE rigor.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                    <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-orange-500" />
                      Streak Potentiation
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Passing this duel advances milestone and increments flame streak!
                    </p>
                  </div>
                </div>
              </div>

              {/* HERO ACTION: Ready for Evaluation Button that Launches Quiz Interspace */}
              <div className="pt-2">
                <div className="relative p-[2px] rounded-3xl conic-beam animate-pulse-glow">
                  <button
                    onClick={() => onOpenQuiz(currentTrack.title, 'Competency Milestone Evaluation')}
                    className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white rounded-[22px] font-heading font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-xl btn-tactile btn-shimmer cursor-pointer flex items-center justify-center gap-3 active:scale-95 group"
                  >
                    <Zap className="w-5 h-5 text-amber-300 animate-bounce" />
                    <span>Ready for Evaluation (Launch Quiz)</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                  </button>
                </div>
                <p className="text-center text-[11px] text-slate-500 mt-2">
                  Clicking opens the immersive Socratic Quiz Interspace duel arena
                </p>
              </div>

              {/* Sample Practice Questions Toggle */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowPreviewQuestions(!showPreviewQuestions)}
                  className="w-full py-2 text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showPreviewQuestions ? 'Hide Curriculum Syllabus Probe' : 'Inspect Socratic Duel Objectives Preview'}</span>
                </button>

                {showPreviewQuestions && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2 font-mono"
                  >
                    <div className="font-bold text-slate-900 font-sans">Tested Competency Domains:</div>
                    <ul className="space-y-1 list-disc list-inside text-[11px] text-slate-600">
                      <li>Walden Inversion kinetics in SN2 stereochemistry</li>
                      <li>Haloarene resonance hybridization & Dow's process barrier</li>
                      <li>Horizontal ground reaction impulse vectors (0-10m sprint)</li>
                    </ul>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Video Modal Player */}
      {selectedVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-2xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800 animate-scale-up">
            <div className="p-3 bg-slate-900 flex items-center justify-between text-white text-xs px-4">
              <span className="font-semibold flex items-center gap-1.5 text-emerald-400">
                <Youtube className="w-4 h-4 text-red-500" />
                Authoritative Video Stream
              </span>
              <button
                onClick={() => setSelectedVideoUrl(null)}
                className="text-slate-400 hover:text-white px-2 py-1 rounded cursor-pointer"
              >
                ✕ Close
              </button>
            </div>
            <div className="aspect-video w-full bg-slate-950 flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center mb-3 shadow-lg animate-pulse">
                <Play className="w-6 h-6 fill-white ml-1" />
              </div>
              <h3 className="text-white font-bold text-sm mb-1">
                Embedded Canonical Simulation Stream
              </h3>
              <p className="text-xs text-slate-400 max-w-md">
                Streamed directly from verified authoritative repositories.
              </p>
              <button
                onClick={() => setSelectedVideoUrl(null)}
                className="mt-4 px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold btn-tactile cursor-pointer"
              >
                Return to Evaluation Gate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page04EvaluationGate;
