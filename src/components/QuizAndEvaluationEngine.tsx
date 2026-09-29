import React, { useState, useEffect, useMemo } from 'react';
import { QuizQuestion, SkillTrack, FlowchartNode } from '../types';
import {
  Zap,
  RotateCcw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Award,
  Sparkles,
  ArrowRight,
  HelpCircle,
  BookOpen,
  TrendingUp,
  Target,
  Flame,
  ShieldCheck,
  Check,
  Compass,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuizAndEvaluationEngineProps {
  currentTrack: SkillTrack;
  activeNode?: FlowchartNode;
  onPassEvaluation: () => void;
  onAdvanceNode?: () => void;
  onReviewResources?: () => void;
  onOpenAIEngineModal?: () => void;
}

// Question banks per topic domain
const QUESTION_BANK: Record<string, QuizQuestion[]> = {
  chemistry: [
    {
      id: 'chem-q1',
      question:
        'Why does chlorobenzene exhibit drastically lower reactivity toward nucleophilic substitution compared to chloroethane?',
      socraticContext: 'Axiomatic sp² vs sp³ hybridization and conjugated lone-pair resonance mechanics.',
      options: [
        {
          id: 'opt-a',
          text: 'The C–Cl bond acquires partial double-bond character through delocalization of the chlorine lone pair into the aromatic ring.',
          isCorrect: true,
          misconceptionExplanation: 'This is the verified physical cause. The C-Cl bond length contracts to 169 pm.',
        },
        {
          id: 'opt-b',
          text: 'The benzene ring acts as a powerful Lewis acid that neutralizes the incoming nucleophile instantly.',
          isCorrect: false,
          misconceptionExplanation:
            'Misconception: Benzene is electron-rich (π-electron cloud) and acts as a nucleophile or base, never a Lewis acid.',
        },
        {
          id: 'opt-c',
          text: 'Chlorine exerts an overwhelming +I inductive electron-donating effect on the phenyl ring.',
          isCorrect: false,
          misconceptionExplanation:
            'Misconception: Halogens are strongly electronegative and exert a -I inductive electron-withdrawing effect, not +I.',
        },
        {
          id: 'opt-d',
          text: 'Phenyl carbocation intermediate formed in SN1 substitution is stabilized by hyperconjugation.',
          isCorrect: false,
          misconceptionExplanation:
            'Misconception: Phenyl cation is sp-hybridized, perpendicular to the aromatic π-system, and extremely unstable (no resonance or hyperconjugation).',
        },
      ],
      correctExplanation:
        'Resonance delocalization of chlorine’s unshared electron pairs with the benzene ring yields a shorter, stronger C=Cl bond with partial double bond character. In addition, the phenyl carbon is sp² hybridized (33% s-character), holding electrons tighter than sp³ carbon.',
    },
    {
      id: 'chem-q2',
      question:
        'When 2-bromopentane is treated with alcoholic KOH under thermal reflux, why is pent-2-ene the predominant product rather than pent-1-ene?',
      socraticContext: 'Thermodynamics of β-elimination dehydrohalogenation under Zaitsev criteria.',
      options: [
        {
          id: 'opt-a',
          text: 'Saytzeff (Zaitsev) rule dictates that the more highly substituted, hyperconjugation-stabilized alkene predominates with unhindered bases.',
          isCorrect: true,
          misconceptionExplanation:
            'Correct: Pent-2-ene has 5 hyperconjugative α-hydrogens compared to only 2 for pent-1-ene.',
        },
        {
          id: 'opt-b',
          text: 'Steric congestion prevents the base from approaching the primary β-hydrogen on carbon-1.',
          isCorrect: false,
          misconceptionExplanation:
            'Misconception: Primary β-hydrogens are actually the least sterically hindered; they would yield Hofmann product if a bulky base like t-BuOK were employed.',
        },
        {
          id: 'opt-c',
          text: 'Bromine departs first through a unimolecular E1 path generating a stabilized allylic carbocation.',
          isCorrect: false,
          misconceptionExplanation:
            'Misconception: High concentration of strong base (alcoholic KOH) enforces concerted bimolecular E2 anti-periplanar elimination.',
        },
        {
          id: 'opt-d',
          text: 'Pent-1-ene undergoes instantaneous thermodynamic rearrangement into pent-2-ene upon formation.',
          isCorrect: false,
          misconceptionExplanation:
            'Misconception: Alkenes do not spontaneously isomerize without strong protic superacids or transition metal catalysts.',
        },
      ],
      correctExplanation:
        'According to Saytzeff’s rule, in dehydrohalogenation reactions, the alkene with greater number of alkyl substituents attached to doubly bonded carbons is more stable due to hyperconjugation and forms preferentially.',
    },
    {
      id: 'chem-q3',
      question:
        'Why does reaction of an alkyl halide with KCN yield predominantly alkyl cyanide (R-CN), whereas with AgCN it produces alkyl isocyanide (R-NC)?',
      socraticContext: 'Ambident nucleophile duality: ionic lattice dissociation vs covalent coordinate bonding.',
      options: [
        {
          id: 'opt-a',
          text: 'KCN is ionic, allowing nucleophilic attack via carbon (stronger C–C bond formed); AgCN is largely covalent, leaving only nitrogen lone pairs free to attack.',
          isCorrect: true,
          misconceptionExplanation:
            'Correct: C-C bond enthalpy (~347 kJ/mol) exceeds C-N (~305 kJ/mol), favoring carbon attack when free cyanide ion is liberated.',
        },
        {
          id: 'opt-b',
          text: 'Potassium forms a chelate complex with nitrogen, while silver binds irreversibly to carbon lone pairs.',
          isCorrect: false,
          misconceptionExplanation:
            'Misconception: Potassium is an alkali metal that completely dissociates in polar solvent without covalent chelation.',
        },
        {
          id: 'opt-c',
          text: 'Silver cyanide undergoes radical oxidation which forces thermal inversion of the nitrile group.',
          isCorrect: false,
          misconceptionExplanation:
            'Misconception: The reaction is polar nucleophilic substitution (SN2/SN1), not free radical rearrangement.',
        },
        {
          id: 'opt-d',
          text: 'AgCN acts as a reducing agent converting nascent alkyl halides into volatile carbylamines.',
          isCorrect: false,
          misconceptionExplanation:
            'Misconception: AgCN acts as an ambident nucleophile donor, not a redox reducing agent.',
        },
      ],
      correctExplanation:
        'Cyanide ion is ambident. KCN is predominantly ionic: K+ [:C≡N:]-, so both C and N can attack, but C-C bond is more stable than C-N. In AgCN, Ag-C bond is covalent; thus nitrogen lone pair attacks R, forming isocyanide.',
    },
    {
      id: 'chem-q4',
      question:
        'In the reaction of chiral (R)-2-bromooctane with sodium hydroxide in acetone, what stereochemical outcome is observed in the resulting 2-octanol?',
      socraticContext: 'Walden inversion kinematics during bimolecular nucleophilic substitution (SN2).',
      options: [
        {
          id: 'opt-a',
          text: 'Complete (100%) inversion of configuration to (S)-2-octanol via backside nucleophilic attack.',
          isCorrect: true,
          misconceptionExplanation:
            'Correct: Secondary alkyl halide in polar aprotic acetone with strong nucleophile undergoes classic concerted SN2 backside attack.',
        },
        {
          id: 'opt-b',
          text: 'Total racemization resulting in an optically inactive (±)-2-octanol 50:50 mixture.',
          isCorrect: false,
          misconceptionExplanation:
            'Misconception: Racemization occurs in unimolecular SN1 via planar carbocation in polar protic solvents, not SN2 in acetone.',
        },
        {
          id: 'opt-c',
          text: 'Full retention of configuration yielding (R)-2-octanol via frontside internal collapse (SNi).',
          isCorrect: false,
          misconceptionExplanation:
            'Misconception: SNi with retention occurs with reagents like SOCl2 in nonpolar solvents (dioxane/ether), not NaOH in acetone.',
        },
        {
          id: 'opt-d',
          text: 'Elimination exclusively yields oct-1-ene with zero alcohol formation.',
          isCorrect: false,
          misconceptionExplanation:
            'Misconception: OH- is a good nucleophile on 2° substrate; substitution competes favorably in polar aprotic solvent without high heat.',
        },
      ],
      correctExplanation:
        'SN2 reactions proceed with stereochemical Walden inversion because the nucleophile attacks from the side directly opposite to the leaving group (180° trajectory), flipping the carbon tetrahedral umbrella.',
    },
    {
      id: 'chem-q5',
      question:
        'Why does thionyl chloride (SOCl₂) represent the superior laboratory reagent for converting alcohols to alkyl chlorides (Darzens process)?',
      socraticContext: 'Thermodynamics of gaseous byproduct evacuation driving Le Chatelier equilibrium.',
      options: [
        {
          id: 'opt-a',
          text: 'Both byproducts (SO₂ and HCl) are volatile gases that escape the reaction mixture, leaving pure alkyl chloride without laborious separation.',
          isCorrect: true,
          misconceptionExplanation:
            'Correct: SO2(g) and HCl(g) evolve spontaneously, driving completion with pristine purity.',
        },
        {
          id: 'opt-b',
          text: 'Thionyl chloride operates at cryogenic sub-zero temperatures preventing alkene byproduct formation.',
          isCorrect: false,
          misconceptionExplanation:
            'Misconception: The Darzens process is typically conducted at room temperature or gentle reflux, not cryogenic temperatures.',
        },
        {
          id: 'opt-c',
          text: 'SOCl₂ provides free chlorine radicals that bypass steric resistance in tertiary alcohols.',
          isCorrect: false,
          misconceptionExplanation:
            'Misconception: The reaction mechanism is nucleophilic substitution via chlorosulfite ester intermediate, not radical.',
        },
        {
          id: 'opt-d',
          text: 'It completely suppresses optical inversion, preserving 100% molecular enantiomeric purity under all conditions.',
          isCorrect: false,
          misconceptionExplanation:
            'Misconception: In the presence of pyridine, SOCl2 actually yields inversion of configuration via SN2.',
        },
      ],
      correctExplanation:
        'ROH + SOCl2 -> R-Cl + SO2↑ + HCl↑. Because the side products are escapable gases, the reaction goes to completion and the product is obtained in high purity.',
    },
  ],
  default: [
    {
      id: 'def-q1',
      question:
        'How does an authoritative mastery engine ensure concept durability compared to rote memorization?',
      socraticContext: 'Cognitive load theory and retrieval practice under deliberate spaced repetition.',
      options: [
        {
          id: 'opt-a',
          text: 'By forcing diagnostic misconception interrogation and requiring 80%+ active threshold before unlocking dependent concepts.',
          isCorrect: true,
          misconceptionExplanation:
            'Correct: Gating progression on conceptual clarity prevents compounding gaps downstream.',
        },
        {
          id: 'opt-b',
          text: 'By presenting passive summary cards with indefinite repeat clicks without test gates.',
          isCorrect: false,
          misconceptionExplanation:
            'Misconception: Passive consumption creates an illusion of competence without enduring mental schemas.',
        },
        {
          id: 'opt-c',
          text: 'By prioritizing high question velocity over deep diagnostic analysis of distractor traps.',
          isCorrect: false,
          misconceptionExplanation:
            'Misconception: Speed without reflection reinforces flawed intuition and erroneous heuristics.',
        },
        {
          id: 'opt-d',
          text: 'By keeping question options in fixed order A to D so learners memorize spatial positions.',
          isCorrect: false,
          misconceptionExplanation:
            'Misconception: Fixed option patterns induce spatial bias and eliminate genuine conceptual discrimination.',
        },
      ],
      correctExplanation:
        'Deliberate practice with diagnostic feedback and competency gating ensures deep mental schema integration.',
    },
    {
      id: 'def-q2',
      question:
        'When diagnosing learner errors on a multiple-choice item, what delivers the highest pedagogical value?',
      socraticContext: 'Formative assessment and cognitive error taxonomy.',
      options: [
        {
          id: 'opt-a',
          text: 'Exposing the exact false mental model (misconception) that made the chosen incorrect option enticing.',
          isCorrect: true,
          misconceptionExplanation:
            'Correct: Deconstructing the misconception directly neutralizes intuitive fallacies.',
        },
        {
          id: 'opt-b',
          text: 'Merely displaying a red crossmark and stating the correct letter without explanation.',
          isCorrect: false,
          misconceptionExplanation:
            'Misconception: Binary right/wrong signaling leaves the underlying cognitive misunderstanding unresolved.',
        },
        {
          id: 'opt-c',
          text: 'Penalizing user score with zero opportunity to review authoritative study references.',
          isCorrect: false,
          misconceptionExplanation:
            'Misconception: Punitive scoring without remedial guidance induces test anxiety and halts progression.',
        },
        {
          id: 'opt-d',
          text: 'Replacing the entire curriculum with lower-tier introductory flashcards.',
          isCorrect: false,
          misconceptionExplanation:
            'Misconception: Regressing the curriculum rather than targeted error correction wastes learner tenure.',
        },
      ],
      correctExplanation:
        'Targeted misconception feedback explains precisely why a distractor felt plausible, breaking invalid cognitive shortcuts.',
    },
    {
      id: 'def-q3',
      question:
        'In deliberate skill acquisition, what role does the Socratic Evaluation Gate serve in the learning loop?',
      socraticContext: 'Mastery learning model (Bloom) and formative boundary verification.',
      options: [
        {
          id: 'opt-a',
          text: 'It operates as an immutable validation checkpoint ensuring prerequisite competency before graph expansion.',
          isCorrect: true,
          misconceptionExplanation:
            'Correct: Prerequisites must be locked in before advanced nodes can be syntactically comprehended.',
        },
        {
          id: 'opt-b',
          text: 'It serves as a competitive leaderboard metric to encourage high-stakes peer comparisons.',
          isCorrect: false,
          misconceptionExplanation:
            'Misconception: Socratic gates are mastery-oriented and individualized, not competitive vanity boards.',
        },
        {
          id: 'opt-c',
          text: 'It is an optional decorative widget that learners should skip during accelerated study tracks.',
          isCorrect: false,
          misconceptionExplanation:
            'Misconception: Bypassing gates leads to catastrophic failure at higher-tier synthesis nodes.',
        },
        {
          id: 'opt-d',
          text: 'It locks the curriculum permanently if the learner scores below 100% on the initial attempt.',
          isCorrect: false,
          misconceptionExplanation:
            'Misconception: The Socratic method encourages iterative retakes with novel shuffled questions until mastery is attained.',
        },
      ],
      correctExplanation:
        'Evaluation gates enforce mastery-based progression: only validated comprehension unlocks subsequent conceptual tiers.',
    },
    {
      id: 'def-q4',
      question:
        'Why does Fisher-Yates algorithmic option shuffling represent a strict standard for online assessment engines?',
      socraticContext: 'Psychometric validity and mitigation of position bias in multiple choice instruments.',
      options: [
        {
          id: 'opt-a',
          text: 'It guarantees every permutation of choices is equally probable, completely eliminating option location bias.',
          isCorrect: true,
          misconceptionExplanation:
            'Correct: Fisher-Yates produces an unbiased random permutation in O(n) runtime.',
        },
        {
          id: 'opt-b',
          text: 'It ensures option A is always the easiest distractor and option D is the correct answer.',
          isCorrect: false,
          misconceptionExplanation:
            'Misconception: Fisher-Yates achieves the exact opposite: non-deterministic, uniformly distributed option positions.',
        },
        {
          id: 'opt-c',
          text: 'It slows down question rendering to simulate examination server latency.',
          isCorrect: false,
          misconceptionExplanation:
            'Misconception: Shuffling is executed client-side in sub-millisecond time and enhances test integrity.',
        },
        {
          id: 'opt-d',
          text: 'It automatically penalizes students who change their selections multiple times.',
          isCorrect: false,
          misconceptionExplanation:
            'Misconception: Shuffling affects option ordering before display; it does not track or penalize deliberation.',
        },
      ],
      correctExplanation:
        'Unbiased shuffling forces the student to evaluate conceptual substance rather than inferring patterns from option position.',
    },
  ],
};

// Fisher-Yates Shuffle utility
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const QuizAndEvaluationEngine: React.FC<QuizAndEvaluationEngineProps> = ({
  currentTrack,
  activeNode,
  onPassEvaluation,
  onAdvanceNode,
  onReviewResources,
  onOpenAIEngineModal,
}) => {
  // Engine States: 'ready' (Launchpad button spawned) | 'evaluating' (Evaluation Window open) | 'completed' (Diagnostic Board)
  const [engineState, setEngineState] = useState<'ready' | 'evaluating' | 'completed'>('ready');
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [evaluationFeedback, setEvaluationFeedback] = useState<{
    correctCount: number;
    totalCount: number;
    scorePercent: number;
    passed: boolean;
  } | null>(null);

  // Initialize or generate quiz questions
  const generateNewQuestions = () => {
    const isChemistry =
      currentTrack.category === 'Chemistry' ||
      currentTrack.title.toLowerCase().includes('chem') ||
      currentTrack.title.toLowerCase().includes('halo');

    const sourceBank = isChemistry ? QUESTION_BANK.chemistry : QUESTION_BANK.default;

    // Pick 4 questions and randomize their options using Fisher-Yates
    const selected = shuffleArray(sourceBank).slice(0, 4);

    const randomizedQuestions: QuizQuestion[] = selected.map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));

    setQuizQuestions(randomizedQuestions);
    setSelectedAnswers({});
    setEvaluationFeedback(null);
  };

  // Generate question pool ready in memory
  useEffect(() => {
    generateNewQuestions();
  }, [currentTrack.id, activeNode?.id]);

  // When clicking the spawned "Ready for Evaluation" button
  const handleLaunchEvaluationWindow = () => {
    if (quizQuestions.length === 0) {
      generateNewQuestions();
    }
    setEngineState('evaluating');
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (engineState === 'completed') return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const allAnswered = useMemo(() => {
    if (quizQuestions.length === 0) return false;
    return quizQuestions.every((q) => selectedAnswers[q.id] !== undefined);
  }, [quizQuestions, selectedAnswers]);

  const handleSubmitEvaluation = () => {
    if (!allAnswered) return;
    setIsSubmitting(true);

    setTimeout(() => {
      let correct = 0;
      quizQuestions.forEach((q) => {
        const chosenId = selectedAnswers[q.id];
        const chosenOpt = q.options.find((o) => o.id === chosenId);
        if (chosenOpt && chosenOpt.isCorrect) {
          correct += 1;
        }
      });

      const total = quizQuestions.length;
      const scorePct = Math.round((correct / total) * 100);
      const passed = scorePct >= 80;

      setEvaluationFeedback({
        correctCount: correct,
        totalCount: total,
        scorePercent: scorePct,
        passed,
      });

      setIsSubmitting(false);
      setEngineState('completed');

      if (passed) {
        onPassEvaluation();
      }
    }, 700);
  };

  const handleRetake = () => {
    generateNewQuestions();
    setEngineState('evaluating');
  };

  const handleBackToGateway = () => {
    setEngineState('ready');
  };

  const targetTitle = activeNode ? activeNode.label : currentTrack.title;

  return (
    <div className="w-full max-w-5xl mx-auto py-2">
      {/* Dynamic Header Status Strip */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-sky-500 to-amber-500" />
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
            <Zap className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-heading font-semibold text-slate-800">
                Socratic Evaluation Gate
              </h2>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  engineState === 'ready'
                    ? 'bg-sky-100 text-sky-800 border border-sky-200'
                    : engineState === 'evaluating'
                    ? 'bg-amber-100 text-amber-800 border border-amber-200 animate-pulse'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}
              >
                {engineState === 'ready'
                  ? 'Gateway Ready'
                  : engineState === 'evaluating'
                  ? 'Evaluation in Progress'
                  : 'Diagnostic Analysis Complete'}
              </span>
            </div>
            <p className="text-xs text-slate-700 mt-0.5">
              Assessing Target:{' '}
              <strong className="text-slate-800 font-semibold">{targetTitle}</strong> • Passing Benchmark: ≥ 80% Mastery
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenAIEngineModal && (
            <button
              onClick={onOpenAIEngineModal}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>AI Engine: Groq LLaMA 3.3</span>
            </button>
          )}

          {engineState !== 'ready' && (
            <button
              onClick={handleBackToGateway}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-slate-500" />
              <span>Gateway Launchpad</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Switcher: Ready Launchpad -> Active Evaluation Window -> Diagnostic Board */}
      <AnimatePresence mode="wait">
        {engineState === 'ready' && (
          /* STATE 1: SPAWNED QUIZ GATEWAY LAUNCHPAD */
          <motion.div
            key="quiz-launchpad"
            initial={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, scale: 0.98, filter: 'blur(6px)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 md:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-lg text-center relative overflow-hidden"
          >
            {/* Ambient Auroral Glow & Background Rings */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-emerald-400/10 via-sky-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              {/* Radar Icon & Beacon */}
              <div className="relative inline-flex items-center justify-center">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-xl shadow-emerald-500/25">
                  <div className="w-full h-full bg-white rounded-[22px] flex items-center justify-center text-emerald-600">
                    <Target className="w-10 h-10 animate-pulse" />
                  </div>
                </div>
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500" />
                </span>
              </div>

              {/* Title & Socratic Premise */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Socratic Competency Gate</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-slate-900 tracking-tight">
                  Ready to Validate Your Comprehension?
                </h3>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-xl mx-auto">
                  Test your mastery of <strong className="text-slate-800 font-semibold">{targetTitle}</strong> with our
                  adaptive Socratic quiz. Unlocks subsequent node progression upon achieving ≥ 80% mastery.
                </p>
              </div>

              {/* 3 Metric Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 text-left">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    04
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Dynamic Items</div>
                    <div className="text-[11px] text-slate-500">Fisher-Yates shuffled</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
                    80%
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Passing Mastery</div>
                    <div className="text-[11px] text-slate-500">Unlocks next node</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                    ⚡
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Misconceptions</div>
                    <div className="text-[11px] text-slate-500">In-place debunks</div>
                  </div>
                </div>
              </div>

              {/* THE SPAWNED QUIZ BUTTON (With Linear rotating border beam & active animations) */}
              <div className="pt-4 flex flex-col items-center justify-center gap-3">
                <div className="relative p-[2px] rounded-2xl conic-beam shadow-xl shadow-emerald-500/20 group">
                  <button
                    onClick={handleLaunchEvaluationWindow}
                    className="relative z-10 px-8 py-4 rounded-[14px] bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 text-white font-heading font-extrabold text-sm md:text-base tracking-wide flex items-center gap-3 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.96] active:translate-y-0 btn-shimmer"
                  >
                    <Zap className="w-5 h-5 text-amber-300 animate-pulse" />
                    <span>⚡ Ready for Evaluation — Start Socratic Quiz</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>

                <span className="text-xs text-slate-600 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Instant diagnostic report upon completion • No penalties for retries
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {engineState === 'evaluating' && (
          /* STATE 2: ACTIVE EVALUATION WINDOW (With React Landing Entrance Animations) */
          <motion.div
            key="quiz-window"
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Top Interactive Progress Header */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  {Object.keys(selectedAnswers).length}/{quizQuestions.length}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Evaluation in Progress: {Object.keys(selectedAnswers).length} of {quizQuestions.length} Answered
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Select your answer based on first-principles mechanics
                  </div>
                </div>
              </div>

              {/* Segmented Progress Track */}
              <div className="flex items-center gap-1.5">
                {quizQuestions.map((q, idx) => (
                  <div
                    key={q.id}
                    className={`w-7 h-2 rounded-full transition-all duration-300 ${
                      selectedAnswers[q.id] ? 'bg-emerald-500 shadow-xs' : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Questions Container with Staggered Visual Reveal */}
            <div className="space-y-5">
              {quizQuestions.map((q, qIndex) => {
                const isAnswered = selectedAnswers[q.id] !== undefined;
                return (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: qIndex * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm transition-all hover:border-slate-300"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-slate-900 text-white text-xs font-bold font-mono flex items-center justify-center">
                          0{qIndex + 1}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Question {qIndex + 1} of {quizQuestions.length}
                        </span>
                      </div>
                      {isAnswered ? (
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Response Selected
                        </span>
                      ) : (
                        <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md flex items-center gap-1 border border-amber-200">
                          <AlertTriangle className="w-3.5 h-3.5" /> Pending Response
                        </span>
                      )}
                    </div>

                    <h3 className="text-base md:text-lg font-heading font-semibold text-slate-900 leading-snug mb-2">
                      {q.question}
                    </h3>

                    <p className="text-xs text-slate-700 italic mb-5 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      {q.socraticContext}
                    </p>

                    {/* Randomized Option Choices (Fisher-Yates) */}
                    <div className="grid grid-cols-1 gap-2.5">
                      {q.options.map((opt, optIndex) => {
                        const optionLetters = ['A', 'B', 'C', 'D'];
                        const letter = optionLetters[optIndex] || String.fromCharCode(65 + optIndex);
                        const isSelected = selectedAnswers[q.id] === opt.id;

                        return (
                          <div
                            key={opt.id}
                            onClick={() => handleSelectOption(q.id, opt.id)}
                            className={`p-3.5 rounded-xl border text-sm transition-all duration-150 cursor-pointer flex items-start gap-3.5 relative overflow-hidden select-none active:scale-[0.99] ${
                              isSelected
                                ? 'bg-emerald-50/90 border-emerald-500 text-emerald-950 font-medium shadow-xs ring-2 ring-emerald-400/30'
                                : 'bg-slate-50/60 hover:bg-slate-100/90 border-slate-200 text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <span
                              className={`w-6 h-6 rounded-md text-xs font-bold font-mono flex items-center justify-center shrink-0 transition-all ${
                                isSelected
                                  ? 'bg-emerald-600 text-white shadow-xs scale-105'
                                  : 'bg-white border border-slate-300 text-slate-600'
                              }`}
                            >
                              {letter}
                            </span>
                            <span className="text-slate-800 leading-relaxed pt-0.5 flex-1">
                              {opt.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Sticky Submission Dock with Conic Gradient & Hover Lift */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    {Object.keys(selectedAnswers).length} of {quizQuestions.length} Questions Answered
                  </div>
                  <div className="text-xs text-slate-500">
                    {allAnswered
                      ? 'All items recorded. Ready to verify mastery.'
                      : 'Complete all questions to enable diagnostic submission.'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleBackToGateway}
                  className="px-4 py-3 rounded-xl font-heading font-semibold text-xs text-slate-600 hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer"
                >
                  Cancel
                </button>

                <div
                  className={`relative p-[1.5px] rounded-xl ${
                    allAnswered ? 'conic-beam shadow-md shadow-emerald-500/20' : ''
                  }`}
                >
                  <button
                    disabled={!allAnswered || isSubmitting}
                    onClick={handleSubmitEvaluation}
                    className={`px-7 py-3 rounded-[10px] font-heading font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                      allAnswered
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.96] active:translate-y-0 btn-shimmer'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Diagnosing Mental Models...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit & Diagnose Misconceptions</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {engineState === 'completed' && (
          /* STATE 3: POST-SUBMISSION IN-PLACE DIAGNOSTIC EVALUATION BOARD */
          <motion.div
            key="diagnostic-board"
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.98, filter: 'blur(6px)' }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
          >
            {/* Top Score Ratio & Radial Gauge Banner */}
            {evaluationFeedback && (
              <div
                className={`p-6 md:p-8 rounded-3xl border shadow-lg relative overflow-hidden ${
                  evaluationFeedback.passed
                    ? 'bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 border-emerald-300'
                    : 'bg-gradient-to-br from-amber-50 via-white to-rose-50/40 border-amber-300'
                }`}
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  {/* Left: Score & Ratio Display */}
                  <div className="flex items-center gap-5">
                    {/* Radial Score Gauge */}
                    <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          className="text-slate-200"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={2 * Math.PI * 40}
                          strokeDashoffset={
                            2 * Math.PI * 40 * (1 - evaluationFeedback.scorePercent / 100)
                          }
                          strokeLinecap="round"
                          className={
                            evaluationFeedback.passed ? 'text-emerald-500' : 'text-amber-500'
                          }
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-xl font-heading font-extrabold text-slate-900">
                          {evaluationFeedback.scorePercent}%
                        </span>
                        <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
                          Mastery
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-xs ${
                            evaluationFeedback.passed
                              ? 'bg-emerald-600 text-white'
                              : 'bg-amber-500 text-white'
                          }`}
                        >
                          {evaluationFeedback.passed ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" /> COMPETENCY PASSED
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="w-3.5 h-3.5" /> CRITICAL GAPS IDENTIFIED
                            </>
                          )}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-600">
                          {evaluationFeedback.correctCount}/{evaluationFeedback.totalCount} Correct
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-heading font-bold text-slate-900">
                        {evaluationFeedback.passed
                          ? 'Milestone Validated! Concept Schema Intact'
                          : 'Remediation Required to Secure Axioms'}
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5 max-w-xl">
                        {evaluationFeedback.passed
                          ? 'Your mental model accurately separated canonical mechanics from distractor traps. The node graph is updated.'
                          : 'Review the targeted misconception breakdowns below before retrying the gate with novel randomized questions.'}
                      </p>
                    </div>
                  </div>

                  {/* Segmented Ratio Bar */}
                  <div className="w-full md:w-64 bg-white/80 p-3.5 rounded-2xl border border-slate-200/90 shadow-xs">
                    <div className="flex justify-between text-xs font-semibold text-slate-600 mb-2">
                      <span>Accuracy Ratio</span>
                      <span className="font-mono">
                        {evaluationFeedback.correctCount} / {evaluationFeedback.totalCount}
                      </span>
                    </div>
                    {/* Visual Segments */}
                    <div className="grid grid-cols-4 gap-1.5 h-3.5 rounded-full overflow-hidden">
                      {quizQuestions.map((q, idx) => {
                        const isCorrect =
                          q.options.find((o) => o.id === selectedAnswers[q.id])?.isCorrect ?? false;
                        return (
                          <div
                            key={idx}
                            className={`rounded-sm transition-all ${
                              isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
                            }`}
                            title={`Question ${idx + 1}: ${isCorrect ? 'Correct' : 'Incorrect'}`}
                          />
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" /> Correct
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-rose-500" /> Distractor Trap
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="mt-6 pt-5 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleRetake}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-all flex items-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-[0.96]"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                      <span>Retake Evaluation (Novel Questions)</span>
                    </button>
                    {onReviewResources && (
                      <button
                        onClick={onReviewResources}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-all flex items-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-[0.96]"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-sky-500" />
                        <span>Review Study Resources</span>
                      </button>
                    )}
                  </div>

                  {evaluationFeedback.passed && onAdvanceNode && (
                    <button
                      onClick={onAdvanceNode}
                      className="px-5 py-2.5 rounded-xl text-xs font-heading font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.96]"
                    >
                      <Award className="w-4 h-4 text-emerald-100" />
                      <span>Advance to Next Node ➔</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* In-Place Misconception Diagnostic Cards */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-heading font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-slate-500" />
                  Item-by-Item Misconception Breakdown
                </h4>
                <span className="text-xs text-slate-500">
                  Targeted diagnostics explaining why distractors fail
                </span>
              </div>

              {quizQuestions.map((q, idx) => {
                const chosenOptionId = selectedAnswers[q.id];
                const chosenOption = q.options.find((o) => o.id === chosenOptionId);
                const correctOption = q.options.find((o) => o.isCorrect);
                const isCorrect = chosenOption?.isCorrect ?? false;

                return (
                  <div
                    key={q.id}
                    className={`p-6 rounded-2xl bg-white border transition-all ${
                      isCorrect
                        ? 'border-emerald-200/90 shadow-xs'
                        : 'border-rose-200/90 shadow-xs bg-rose-50/15'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-6 h-6 rounded-md text-xs font-bold font-mono flex items-center justify-center ${
                            isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                            isCorrect
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" /> Distractor Selected
                            </>
                          )}
                        </span>
                      </div>
                    </div>

                    <h5 className="text-base font-heading font-semibold text-slate-900 mb-3">
                      {q.question}
                    </h5>

                    {/* Side-by-Side: Chosen vs Correct */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      {/* Learner's Selected Option */}
                      <div
                        className={`p-3.5 rounded-xl border text-xs ${
                          isCorrect
                            ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                            : 'bg-rose-50/70 border-rose-300 text-rose-950'
                        }`}
                      >
                        <div className="font-semibold uppercase tracking-wider text-[10px] mb-1 opacity-75">
                          Your Selected Answer
                        </div>
                        <div className="font-medium text-slate-900">{chosenOption?.text}</div>
                      </div>

                      {/* Authoritative Correct Option */}
                      <div className="p-3.5 rounded-xl border bg-emerald-50/70 border-emerald-300 text-xs text-emerald-950">
                        <div className="font-semibold uppercase tracking-wider text-[10px] mb-1 text-emerald-700">
                          Authoritative Scientific Answer
                        </div>
                        <div className="font-medium text-slate-900">{correctOption?.text}</div>
                      </div>
                    </div>

                    {/* Targeted Misconception Rationale */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 text-xs space-y-2">
                      <div className="flex items-center gap-1.5 font-bold text-slate-800 uppercase tracking-wider text-[10px]">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                        <span>Socratic Misconception Rationale</span>
                      </div>

                      {!isCorrect && chosenOption?.misconceptionExplanation && (
                        <p className="text-rose-700 font-medium">
                          <strong>Why your choice was a distractor trap:</strong>{' '}
                          {chosenOption.misconceptionExplanation}
                        </p>
                      )}

                      <p className="text-slate-600 leading-relaxed">
                        <strong className="text-slate-800">First-Principles Core Truth:</strong>{' '}
                        {q.correctExplanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
