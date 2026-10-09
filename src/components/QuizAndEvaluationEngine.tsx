import React, { useState, useMemo } from 'react';
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
  Target,
  Flame,
  Check,
  Compass,
  Play,
  FileText,
  Lock,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  misconceptionExplanation?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  socraticContext: string;
  options: QuizOption[];
  correctExplanation: string;
  conceptKey?: string;
}

export interface QuizAndEvaluationEngineProps {
  currentTrackTitle?: string;
  activeMilestoneTitle?: string;
  nextMilestoneIndex?: number;
  onPassEvaluation: (score: number) => void;
  onAdvanceMilestone?: () => void;
  onOpenDoc?: (docId: string) => void;
  onOpenVideo?: (videoId: string) => void;
  customQuestions?: QuizQuestion[];
}

// 10 Curated Socratic Questions with Equal-Length Options
const MASTER_QUESTION_POOL: QuizQuestion[] = [
  {
    id: 'q1',
    conceptKey: 'hybridization_resonance',
    question: 'Why does chlorobenzene exhibit drastically lower reactivity toward nucleophilic substitution compared to chloroethane?',
    socraticContext: 'Axiomatic sp² vs sp³ hybridization and conjugated lone-pair resonance mechanics.',
    options: [
      {
        id: 'q1-a',
        text: 'The C–Cl bond acquires partial double-bond character through delocalization of the chlorine lone pair into the aromatic ring.',
        isCorrect: true,
        misconceptionExplanation: 'This is the verified physical cause. The C-Cl bond length contracts from 178 pm to 169 pm.',
      },
      {
        id: 'q1-b',
        text: 'The benzene ring acts as a powerful Lewis acid that neutralizes the incoming nucleophile instantly upon collision in solution.',
        isCorrect: false,
        misconceptionExplanation: 'Benzene is electron-rich due to its aromatic π-electron cloud and acts as a nucleophile, never a Lewis acid.',
      },
      {
        id: 'q1-c',
        text: 'Chlorine exerts an overwhelming positive inductive electron-donating effect (+I) across the coplanar hexagonal phenyl frame.',
        isCorrect: false,
        misconceptionExplanation: 'Halogens are electronegative and exert a strong -I electron-withdrawing inductive effect, not +I.',
      },
      {
        id: 'q1-d',
        text: 'The phenyl carbocation intermediate formed in SN1 substitution is exceptionally stabilized by hyperconjugative hydrogen overlap.',
        isCorrect: false,
        misconceptionExplanation: 'The phenyl cation is sp-hybridized, perpendicular to the aromatic ring, and thermodynamically unstable.',
      },
    ],
    correctExplanation: 'Resonance delocalization of chlorine’s unshared electron pairs into the benzene ring generates partial double-bond character (shorter and stronger bond). Furthermore, the phenyl carbon is sp² hybridized, holding electron density tighter than sp³ carbon.',
  },
  {
    id: 'q2',
    conceptKey: 'elimination_regiochemistry',
    question: 'When 2-bromopentane is treated with hot alcoholic KOH, why is pent-2-ene the predominant product rather than pent-1-ene?',
    socraticContext: 'Thermodynamics of β-elimination dehydrohalogenation under Zaitsev criteria.',
    options: [
      {
        id: 'q2-a',
        text: 'The Zaitsev rule dictates that the more highly substituted, hyperconjugation-stabilized alkene predominates with unhindered bases.',
        isCorrect: true,
        misconceptionExplanation: 'Pent-2-ene has 5 hyperconjugative α-hydrogens compared to only 2 for pent-1-ene, giving lower Gibbs energy.',
      },
      {
        id: 'q2-b',
        text: 'Steric congestion prevents the base from approaching the primary β-hydrogen on carbon-1 under standard reflux conditions.',
        isCorrect: false,
        misconceptionExplanation: 'Primary hydrogens are the least sterically hindered; bulky bases like t-BuOK favor them (Hofmann product).',
      },
      {
        id: 'q2-c',
        text: 'Bromine departs first through a unimolecular E1 path generating a fully stabilized allylic planar carbocation intermediate.',
        isCorrect: false,
        misconceptionExplanation: 'High concentration of strong base (alcoholic KOH) enforces concerted bimolecular E2 anti-periplanar elimination.',
      },
      {
        id: 'q2-d',
        text: 'Pent-1-ene undergoes instantaneous acid-catalyzed isomerization into pent-2-ene due to basic potassium bromide salt catalysis.',
        isCorrect: false,
        misconceptionExplanation: 'Alkenes do not isomerize spontaneously under basic, aprotic or weakly alcoholic salt conditions.',
      },
    ],
    correctExplanation: 'In E2 elimination with unhindered hydroxide/ethoxide bases, the thermodynamically more stable, more substituted alkene (pent-2-ene with 5 hyperconjugative α-hydrogens) is formed as the major product via Zaitsev’s rule.',
  },
  {
    id: 'q3',
    conceptKey: 'finkelstein_equilibrium',
    question: 'In the Finkelstein reaction (R–Cl + NaI → R–I + NaCl), what is the exact thermodynamic driving force pushing the equilibrium forward?',
    socraticContext: 'Solubility differentials and Le Chatelier precipitation driving forces.',
    options: [
      {
        id: 'q3-a',
        text: 'Sodium chloride precipitates out of dry acetone solvent due to lower lattice solubility, shifting equilibrium forward via Le Chatelier.',
        isCorrect: true,
        misconceptionExplanation: 'Acetone dissolves covalent NaI but cannot solvate NaCl or NaBr lattices, precipitating them out cleanly.',
      },
      {
        id: 'q3-b',
        text: 'The carbon-iodine covalent bond has significantly higher bond dissociation enthalpy than the carbon-chlorine bond in alkanes.',
        isCorrect: false,
        misconceptionExplanation: 'The C-I bond is actually weaker (~238 kJ/mol) than the C-Cl bond (~338 kJ/mol); thermodynamics relies on precipitation.',
      },
      {
        id: 'q3-c',
        text: 'Iodide acts as a powerful Bronsted acid that neutralizes chlorine gas bubbles escaping dynamically from the heated round flask.',
        isCorrect: false,
        misconceptionExplanation: 'Iodide is a nucleophile, not a Bronsted acid, and chloride is captured as solid NaCl precipitate.',
      },
      {
        id: 'q3-d',
        text: 'Acetone coordinates directly to the alkyl radical to prevent homolytic recombination before iodide can reach the reactive site.',
        isCorrect: false,
        misconceptionExplanation: 'Finkelstein reaction is a polar SN2 bimolecular substitution, not a radical homolytic pathway.',
      },
    ],
    correctExplanation: 'Dry acetone readily dissolves NaI because iodide has high polarizability, but NaCl and NaBr have high lattice energies and precipitate out. By Le Chatelier’s principle, continuous precipitation drives the reversible substitution forward.',
  },
  {
    id: 'q4',
    conceptKey: 'sn2_stereochemistry',
    question: 'What stereochemical consequence is universally observed during an SN2 substitution on an optically active chiral haloalkane?',
    socraticContext: 'Frontside vs backside attack geometry and Walden inversion.',
    options: [
      {
        id: 'q4-a',
        text: 'Strict 100% Walden inversion of configuration due to backside attack into the σ* antibonding orbital of the leaving group.',
        isCorrect: true,
        misconceptionExplanation: 'Backside attack forces an umbrella-like flip of the other three substituents, inverting the chiral center.',
      },
      {
        id: 'q4-b',
        text: 'Complete 50:50 racemic mixture formation because the incoming nucleophile attacks both faces of a planar carbocation intermediate.',
        isCorrect: false,
        misconceptionExplanation: 'Racemization via planar carbocation is the hallmark of SN1 unimolecular substitution, not SN2.',
      },
      {
        id: 'q4-c',
        text: 'Retention of configuration caused by frontside chelation between the leaving halide and incoming nucleophilic electron pair.',
        isCorrect: false,
        misconceptionExplanation: 'Frontside attack is electrostatically repelled by the leaving group and prohibited by orbital symmetry.',
      },
      {
        id: 'q4-d',
        text: 'Partial loss of optical rotation solely due to thermal racemization of the solvent without any structural bond reconfiguration.',
        isCorrect: false,
        misconceptionExplanation: 'The inversion is stoichiometric and stereospecific at the reactive carbon center itself.',
      },
    ],
    correctExplanation: 'SN2 proceeds through a concerted pentacoordinate transition state where the nucleophile attacks from the side opposite to the leaving group (180° backside attack into the C-X σ* orbital), causing 100% Walden inversion.',
  },
  {
    id: 'q5',
    conceptKey: 'ambident_nucleophiles',
    question: 'Why does haloalkane substitution with KCN yield alkyl cyanides (R–CN), whereas substitution with AgCN yields alkyl isocyanides (R–NC)?',
    socraticContext: 'Ambident nucleophilicity and ionic vs covalent coordination.',
    options: [
      {
        id: 'q5-a',
        text: 'KCN is predominantly ionic exposing nucleophilic carbon, whereas AgCN is largely covalent leaving only nitrogen lone pair free.',
        isCorrect: true,
        misconceptionExplanation: 'K+ CN- provides free ambident cyanide with negative charge on carbon; Ag-C bond is covalent, so nitrogen attacks.',
      },
      {
        id: 'q5-b',
        text: 'Silver ions act as a phase-transfer catalyst that flips the cyanide molecule backwards during its voyage across the interface.',
        isCorrect: false,
        misconceptionExplanation: 'There is no tumbling phase-transfer mechanism; bonding character determines which atom has available electron density.',
      },
      {
        id: 'q5-c',
        text: 'Potassium cyanide reacts exclusively through an electrophilic aromatic path while silver cyanide initiates radical addition.',
        isCorrect: false,
        misconceptionExplanation: 'Both are aliphatic nucleophilic substitutions on haloalkanes, differing only in nucleophile atom coordination.',
      },
      {
        id: 'q5-d',
        text: 'The carbon atom in AgCN is completely missing its valence electrons due to oxidation into silver carbonate by ambient oxygen.',
        isCorrect: false,
        misconceptionExplanation: 'Silver is Ag(I) and cyanide remains CN-, with the Ag-C covalent bond shielding carbon’s electron pair.',
      },
    ],
    correctExplanation: 'KCN is ionic, yielding K+ and :C≡N:- where both C and N can attack, but the C-C bond is stronger than C-N, yielding R-CN. AgCN is covalent (Ag-C≡N:), so only the nitrogen lone pair is available to attack, giving isocyanide (R-NC).',
  },
  {
    id: 'q6',
    conceptKey: 'darzens_halogenation',
    question: 'Why is the reaction of alcohols with thionyl chloride (SOCl₂) considered the cleanest method for preparing pure chloroalkanes?',
    socraticContext: 'Darzens process and thermodynamic separation of volatile gaseous byproducts.',
    options: [
      {
        id: 'q6-a',
        text: 'Both secondary byproducts (SO₂ and HCl) are gases that escape into the atmosphere, leaving behind pure liquid chloroalkane product.',
        isCorrect: true,
        misconceptionExplanation: 'Gaseous escape drives the reaction forward and eliminates tedious chromatographic purification.',
      },
      {
        id: 'q6-b',
        text: 'Thionyl chloride generates zero heat during the reaction and prevents any possibility of thermal decomposition or rearrangement.',
        isCorrect: false,
        misconceptionExplanation: 'The reaction is exothermic and often requires reflux or cooling; its advantage is byproduct volatility.',
      },
      {
        id: 'q6-c',
        text: 'The sulfur atom in thionyl chloride permanently bonds to the alcohol oxygen and forms an insoluble solid polymeric precipitate.',
        isCorrect: false,
        misconceptionExplanation: 'Sulfur leaves as sulfur dioxide gas (SO₂), not an insoluble polymer precipitate.',
      },
      {
        id: 'q6-d',
        text: 'It operates through a photochemical triplet mechanism that ignores normal carbocation stability and steric hindrances entirely.',
        isCorrect: false,
        misconceptionExplanation: 'The reaction occurs through an internal nucleophilic substitution (SNi) or SN2 in presence of pyridine.',
      },
    ],
    correctExplanation: 'In Darzen’s process (ROH + SOCl₂ → RCl + SO₂↑ + HCl↑), both sulfur dioxide and hydrogen chloride are volatile gases that escape continuously, leaving pure alkyl chloride without complicated extraction steps.',
  },
  {
    id: 'q7',
    conceptKey: 'grignard_organometallics',
    question: 'Why must Grignard reagent preparation (R–X + Mg → R–Mg–X) be carried out in strictly anhydrous ether conditions?',
    socraticContext: 'Carbanionic basicity of organomagnesium reagents and proton quenching.',
    options: [
      {
        id: 'q7-a',
        text: 'Grignard reagents are supremely strong Bronsted bases that react instantaneously with traces of water to yield inert hydrocarbons.',
        isCorrect: true,
        misconceptionExplanation: 'R-MgX acts as R:⁻ which deprotonates H2O to form R-H and Mg(OH)X, destroying the reagent.',
      },
      {
        id: 'q7-b',
        text: 'Water dissolves magnesium metal into magnesium hydroxide within milliseconds, preventing ether coordination to the halogen.',
        isCorrect: false,
        misconceptionExplanation: 'Mg metal reacts slowly with cold water; the primary issue is the hyper-reactivity of the formed organometallic carbanion.',
      },
      {
        id: 'q7-c',
        text: 'Ether acts as an oxidizing agent that donates electrons to the water molecules to generate protective gaseous hydrogen bubbles.',
        isCorrect: false,
        misconceptionExplanation: 'Ether is an aprotic solvent that solvates Mg through lone pairs; it does not oxidize water.',
      },
      {
        id: 'q7-d',
        text: 'Moisture causes the alkyl halide to undergo explosive nucleophilic polymerization before reaching the magnesium surface.',
        isCorrect: false,
        misconceptionExplanation: 'Alkyl halides do not explosively polymerize with water; they are simply insoluble or hydrolyze sluggishly.',
      },
    ],
    correctExplanation: 'Grignard reagents possess a highly polarized carbon-magnesium bond (Cδ⁻—Mgδ⁺) where carbon behaves as a potent carbanion and Bronsted base. Even traces of moisture instantly quench it: R-MgX + H₂O → R-H + Mg(OH)X.',
  },
  {
    id: 'q8',
    conceptKey: 'swarts_fluorination',
    question: 'Which reagent combination is specifically utilized in the Swarts reaction to synthesize volatile alkyl fluorides from alkyl bromides?',
    socraticContext: 'Heavy metal fluorides for halogen exchange.',
    options: [
      {
        id: 'q8-a',
        text: 'Metallic fluorides like AgF, Hg₂F₂, or SbF₃ heated with alkyl bromides facilitate efficient halogen exchange to form alkyl fluorides.',
        isCorrect: true,
        misconceptionExplanation: 'Heavy metal fluorides provide the required polarization and precipitation driving force for fluorination.',
      },
      {
        id: 'q8-b',
        text: 'Bubbling elemental fluorine gas (F₂) through liquid alkane solutions under direct ultraviolet sunlight at ambient room temperature.',
        isCorrect: false,
        misconceptionExplanation: 'Direct fluorination with F2 gas is violently explosive and non-selective, cleaving carbon-carbon bonds.',
      },
      {
        id: 'q8-c',
        text: 'Treating alcohol precursors with concentrated aqueous hydrofluoric acid (HF) in the presence of anhydrous calcium chloride catalyst.',
        isCorrect: false,
        misconceptionExplanation: 'Aqueous HF with alcohols yields low conversions and severe side-reactions; Swarts is halogen exchange from halides.',
      },
      {
        id: 'q8-d',
        text: 'Heating alkyl chlorides with dry sodium fluoride in acetone under high-pressure autoclave reflux conditions for several days.',
        isCorrect: false,
        misconceptionExplanation: 'NaF in acetone is ineffective because NaF is insoluble in acetone; heavy metal fluorides (AgF, Hg2F2) are necessary.',
      },
    ],
    correctExplanation: 'Swarts reaction is the standard method for preparing alkyl fluorides by heating alkyl chlorides or bromides in the presence of a heavy metal fluoride such as AgF, Hg₂F₂, CoF₃, or SbF₃.',
  },
  {
    id: 'q9',
    conceptKey: 'wurtz_coupling',
    question: 'Why is the Wurtz reaction (2 R–X + 2 Na → R–R + 2 NaX) practically ineffective for synthesizing alkanes with an odd number of carbons?',
    socraticContext: 'Statistical product distribution and boiling point separation limits.',
    options: [
      {
        id: 'q9-a',
        text: 'Cross-coupling of two distinct alkyl halides yields a statistical mixture of three different alkanes with near-identical boiling points.',
        isCorrect: true,
        misconceptionExplanation: 'Using R-X and R\'-X produces R-R, R-R\', and R\'-R\', which are difficult to separate by fractional distillation.',
      },
      {
        id: 'q9-b',
        text: 'Metallic sodium cannot react with alkyl halides possessing odd numbers of carbon atoms due to parity restrictions in sodium.',
        isCorrect: false,
        misconceptionExplanation: 'Sodium reacts with any alkyl halide via single-electron transfer; parity has no effect on chemical reactivity.',
      },
      {
        id: 'q9-c',
        text: 'Alkanes with odd carbon chains are thermodynamically unstable and spontaneously decompose into methane and ethylene gases.',
        isCorrect: false,
        misconceptionExplanation: 'Odd-carbon alkanes (propane, pentane, heptane) are completely stable molecules.',
      },
      {
        id: 'q9-d',
        text: 'Odd-chain alkyl halides selectively undergo intramolecular cyclization rather than intermolecular bimolecular radical coupling.',
        isCorrect: false,
        misconceptionExplanation: 'Intramolecular cyclization only occurs in specific dihaloalkanes (e.g. 1,4-dibromobutane), not simple alkyl halides.',
      },
    ],
    correctExplanation: 'When two different alkyl halides (R-X + R\'-X) are treated with sodium, three alkanes form: R-R, R\'-R\', and R-R\'. Because their boiling points are close, separation is extremely difficult, resulting in very low yields of the desired odd-carbon alkane.',
  },
  {
    id: 'q10',
    conceptKey: 'eas_haloarene_directing',
    question: 'Why do haloarenes direct incoming electrophiles to ortho- and para-positions despite being overall deactivating toward EAS?',
    socraticContext: 'Dual interplay of -I inductive withdrawal and +R resonance donation.',
    options: [
      {
        id: 'q10-a',
        text: 'Electronegative -I effect deactivates the ring, but +R resonance donation selectively stabilizes arenium ions at ortho- and para-positions.',
        isCorrect: true,
        misconceptionExplanation: 'Resonance (+R) partially offsets inductive (-I) electron withdrawal specifically at ortho and para positions.',
      },
      {
        id: 'q10-b',
        text: 'The bulky halogen atom sterically shields the meta position from attack, forcing the electrophile toward the perimeter positions.',
        isCorrect: false,
        misconceptionExplanation: 'Steric hindrance actually disfavors the ortho position; electronic resonance stability is the dominant directing factor.',
      },
      {
        id: 'q10-c',
        text: 'Halogens possess +I inductive electron-donating properties that push high electron density directly into the ortho and para carbons.',
        isCorrect: false,
        misconceptionExplanation: 'Halogens are strongly electronegative and withdraw electron density via inductive effect (-I).',
      },
      {
        id: 'q10-d',
        text: 'Incoming electrophiles form a coordination complex with halogen d-orbitals that guides them directly to the adjacent positions.',
        isCorrect: false,
        misconceptionExplanation: 'Fluorine and chlorine direct via p-π resonance conjugation with the aromatic system, not d-orbital coordination.',
      },
    ],
    correctExplanation: 'Halogens deactivate the ring via strong -I inductive effect (withdrawing electrons and slowing EAS overall). However, their lone pairs participate in +R resonance with the π system, dispersing positive charge in the arenium ion specifically at ortho and para positions.',
  },
];

export const QuizAndEvaluationEngine: React.FC<QuizAndEvaluationEngineProps> = ({
  currentTrackTitle = 'NCERT Class 12: Haloalkanes and Haloarenes',
  activeMilestoneTitle = 'Milestone 2: Methods of Preparation & Halogen Exchange',
  nextMilestoneIndex = 3,
  onPassEvaluation,
  onAdvanceMilestone,
  onOpenDoc,
  onOpenVideo,
  customQuestions,
}) => {
  const questions = useMemo(() => customQuestions || MASTER_QUESTION_POOL, [customQuestions]);

  // Quiz Navigation & State
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isPerfectionMode, setIsPerfectionMode] = useState<boolean>(false);
  const [perfectionQuestions, setPerfectionQuestions] = useState<QuizQuestion[]>([]);

  // Remediation Review State
  const [reviewedDoc, setReviewedDoc] = useState<boolean>(false);
  const [reviewedVideo, setReviewedVideo] = useState<boolean>(false);

  const activeQuestions = isPerfectionMode ? perfectionQuestions : questions;
  const currentQ = activeQuestions[currentQIndex] || activeQuestions[0];

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (isSubmitted && !isPerfectionMode) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  // Evaluation computation
  const { correctCount, totalCount, scorePercent, missedQuestions } = useMemo(() => {
    let correct = 0;
    const missed: QuizQuestion[] = [];

    activeQuestions.forEach((q) => {
      const selectedOptId = selectedAnswers[q.id];
      const correctOpt = q.options.find((o) => o.isCorrect);
      if (selectedOptId && correctOpt && selectedOptId === correctOpt.id) {
        correct++;
      } else {
        missed.push(q);
      }
    });

    const total = activeQuestions.length;
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;

    return {
      correctCount: correct,
      totalCount: total,
      scorePercent: score,
      missedQuestions: missed,
    };
  }, [activeQuestions, selectedAnswers]);

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (scorePercent >= 70) {
      onPassEvaluation(scorePercent);
    }
  };

  const handleStartPerfectionQuiz = () => {
    if (missedQuestions.length === 0) return;
    setPerfectionQuestions(missedQuestions);
    setIsPerfectionMode(true);
    setIsSubmitted(false);
    setCurrentQIndex(0);
    // Clear only missed answers
    const updated = { ...selectedAnswers };
    missedQuestions.forEach((q) => delete updated[q.id]);
    setSelectedAnswers(updated);
  };

  const handleRetakeFull = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setIsPerfectionMode(false);
    setReviewedDoc(false);
    setReviewedVideo(false);
    setCurrentQIndex(0);
  };

  const allAnswered = activeQuestions.every((q) => !!selectedAnswers[q.id]);

  // Determine which branch to display
  const isBranch1 = isSubmitted && scorePercent >= 70 && scorePercent < 100;
  const isBranch2 = isSubmitted && scorePercent === 100;
  const isBranch3 = isSubmitted && scorePercent < 70;

  return (
    <div className="w-full max-w-4xl mx-auto py-2">
      {/* STATUS HEADER STRIP */}
      <div className="mb-6 p-5 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0284C7] to-sky-400 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
                Socratic Diagnostic Gate
              </span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                Passing Threshold: 70% Mastery
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              {activeMilestoneTitle}
            </h2>
          </div>
        </div>

        {/* Progress or Score */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {isSubmitted ? (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Score:</span>
              <span
                className={`text-lg font-black px-3 py-1 rounded-xl ${
                  scorePercent >= 70 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}
              >
                {scorePercent}%
              </span>
            </div>
          ) : (
            <div className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
              {Object.keys(selectedAnswers).length} of {activeQuestions.length} answered
            </div>
          )}
        </div>
      </div>

      {/* QUIZ ACTIVE VIEW (NOT SUBMITTED) */}
      {!isSubmitted && (
        <div className="space-y-6">
          {/* Question Jumper Navigation Bar (Q1 - Q10) */}
          <div className="p-3.5 rounded-2xl bg-white/90 border border-slate-200/90 shadow-xs flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0 ml-1 mr-2">
              Questions:
            </span>
            {activeQuestions.map((q, idx) => {
              const isAnswered = !!selectedAnswers[q.id];
              const isCurrent = idx === currentQIndex;

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQIndex(idx)}
                  className={`w-9 h-9 rounded-xl text-xs font-black transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                    isCurrent
                      ? 'bg-[#0284C7] text-white shadow-md shadow-sky-500/30 scale-105'
                      : isAnswered
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Q{idx + 1}
                </button>
              );
            })}
          </div>

          {/* Current Question Card */}
          <div className="rounded-3xl bg-white border border-slate-200/90 shadow-lg p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>QUESTION {currentQIndex + 1} OF {activeQuestions.length}</span>
                <span className="text-[#0284C7]">{currentQ.socraticContext}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {currentQ.question}
              </h3>
            </div>

            {/* Options List (Strict Equal Length Rule adhered) */}
            <div className="space-y-3">
              {currentQ.options.map((option, oIdx) => {
                const isSelected = selectedAnswers[currentQ.id] === option.id;
                const letter = String.fromCharCode(65 + oIdx);

                return (
                  <div
                    key={option.id}
                    onClick={() => handleSelectOption(currentQ.id, option.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? 'bg-sky-50/80 border-[#0284C7] shadow-sm'
                        : 'bg-slate-50/70 border-slate-200/80 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#0284C7] text-white shadow-sm'
                          : 'bg-white border border-slate-300 text-slate-700'
                      }`}
                    >
                      {letter}
                    </div>
                    <p className="text-sm font-medium text-slate-800 pt-0.5 leading-relaxed">
                      {option.text}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Bottom Stepper Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                disabled={currentQIndex === 0}
                onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                ← Previous
              </button>

              <div className="flex items-center gap-3">
                {currentQIndex < activeQuestions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQIndex((prev) => Math.min(activeQuestions.length - 1, prev + 1))}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0284C7] hover:bg-[#0369A1] shadow-sm transition-colors flex items-center gap-1.5"
                  >
                    <span>Next Question</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    disabled={!allAnswered}
                    onClick={handleSubmit}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-xs font-bold py-2.5 px-6"
                  >
                    <span>Submit & Diagnose Comprehension</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TRI-BRANCH SUBMISSION GATE (POST-SUBMIT)
          ===================================================================== */}

      {/* BRANCH 1: PASSING WITH ROOM FOR GROWTH (70% <= score < 100%) */}
      {isBranch1 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Main Success Clearance Banner */}
          <div className="rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-sky-50 border border-emerald-300 p-8 shadow-xl text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
                Threshold Cleared
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Mastery Threshold Satisfied!
              </h3>
              <p className="text-sm font-medium text-slate-600 max-w-lg mx-auto">
                You scored <strong className="text-emerald-700 font-bold">{scorePercent}%</strong> ({correctCount}/{totalCount} correct) and are cleared to advance to Milestone {nextMilestoneIndex}.
              </p>
            </div>

            {/* DUAL-CHOICE PROGRESSION SCREEN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 text-left">
              {/* CHOICE A: ADVANCE TO NEXT MILESTONE */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-all">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                    <Check className="w-4 h-4" />
                    <span>Path A: Standard Progression</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    Advance to Milestone {nextMilestoneIndex}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Unlocks the next consecutive milestone on the roadmap while logging verified competency into your telemetry profile.
                  </p>
                </div>
                <button
                  onClick={onAdvanceMilestone}
                  className="btn-primary w-full text-xs font-bold py-3"
                >
                  <span>Advance to Milestone {nextMilestoneIndex} ➔</span>
                </button>
              </div>

              {/* CHOICE B: AIM FOR 100% PERFECTION */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50/60 to-white border border-amber-300 shadow-sm flex flex-col justify-between space-y-4 hover:border-amber-400 transition-all">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>Path B: Grandmaster Perfection</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    Targeted 100% Perfection Gate
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Want to achieve 100% Mastery? You missed {missedQuestions.length} concept questions. Take a focused re-test targeting only missed traps for bonus XP!
                  </p>
                </div>
                <button
                  onClick={handleStartPerfectionQuiz}
                  className="btn-gold w-full text-xs font-bold py-3"
                >
                  <span>Take Targeted Perfection Quiz for 100% 🎯</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* BRANCH 2: PERFECT MASTERY (score === 100%) */}
      {isBranch2 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl bg-gradient-to-br from-amber-50 via-white to-yellow-50 border-2 border-amber-400 p-8 md:p-10 shadow-2xl text-center space-y-5"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 flex items-center justify-center mx-auto shadow-lg shadow-amber-400/30">
            <Award className="w-10 h-10 animate-bounce" />
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-300 uppercase tracking-wider">
              🏆 Flawless Execution • 100% Mastery
            </span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">
              Flawless Architectural Execution!
            </h3>
            <p className="text-sm font-medium text-slate-700 max-w-lg mx-auto">
              Every single axiomatic distractor trap was successfully identified and countered. Awarded <strong className="text-amber-700">+1000 Bonus XP</strong> and the Grandmaster Laurel badge.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onAdvanceMilestone}
              className="btn-gold text-sm font-extrabold py-3.5 px-8 shadow-lg shadow-amber-500/25"
            >
              <span>Advance to Milestone {nextMilestoneIndex} (Grandmaster) ➔</span>
            </button>
            <button
              onClick={handleRetakeFull}
              className="px-5 py-3 rounded-full text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Review Full Breakdown
            </button>
          </div>
        </motion.div>
      )}

      {/* BRANCH 3: DEFICIT DETECTED (score < 70%) */}
      {isBranch3 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Failure Alert Banner */}
          <div className="rounded-3xl bg-gradient-to-br from-rose-50 via-white to-amber-50 border border-rose-300 p-8 shadow-xl text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-100 border border-rose-300 text-rose-600 flex items-center justify-center mx-auto shadow-md">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-200 uppercase tracking-wider">
                Deficit Detected • Score: {scorePercent}%
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Targeted Remediation Required
              </h3>
              <p className="text-sm font-medium text-slate-600 max-w-xl mx-auto">
                Passing benchmark is 70%. You scored {correctCount}/{totalCount} correct. To protect cognitive foundations, please review the 2 prescribed authoritative resources below before retaking the gate.
              </p>
            </div>

            {/* Prescribed Resources Lock System */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 text-left">
              {/* Prescribed Doc */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0284C7]">
                    <FileText className="w-4 h-4" />
                    <span>Prescribed Canonical Brief</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    NCERT Halogen Exchange & Darzens SOCl₂ Mechanism
                  </h4>
                  <p className="text-xs text-slate-500">
                    Detailed step-by-step resolution of all 3 distractor traps.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setReviewedDoc(true);
                    if (onOpenDoc) onOpenDoc('darzens-socl2');
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold shrink-0 transition-colors ${
                    reviewedDoc
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-sky-100 text-[#0284C7] hover:bg-sky-200'
                  }`}
                >
                  {reviewedDoc ? 'Reviewed ✓' : 'Read Brief 📖'}
                </button>
              </div>

              {/* Prescribed YouTube Tutorial */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-red-600">
                    <Play className="w-4 h-4" />
                    <span>Prescribed Video Masterclass</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    SN1 vs SN2 Walden Inversion Mechanics
                  </h4>
                  <p className="text-xs text-slate-500">
                    Visual orbital demonstration of σ* backside attack.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setReviewedVideo(true);
                    if (onOpenVideo) onOpenVideo('sn1-sn2-walden');
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold shrink-0 transition-colors ${
                    reviewedVideo
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  {reviewedVideo ? 'Watched ✓' : 'Watch Video ▶'}
                </button>
              </div>
            </div>

            {/* Retake Button (Locked until both reviewed) */}
            <div className="pt-4 flex flex-col items-center justify-center gap-2">
              <button
                disabled={!reviewedDoc || !reviewedVideo}
                onClick={handleRetakeFull}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-xs font-bold py-3 px-8 flex items-center gap-2"
              >
                {!reviewedDoc || !reviewedVideo ? (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Unlock Retest (Review Prescribed Resources Above)</span>
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-4 h-4" />
                    <span>Retake Evaluation with Clear Mental Models ➔</span>
                  </>
                )}
              </button>
              <span className="text-[11px] text-slate-400">
                {!reviewedDoc || !reviewedVideo
                  ? `Requirements: ${!reviewedDoc ? '1 Doc Pending • ' : ''}${!reviewedVideo ? '1 Video Pending' : ''}`
                  : 'All prescribed remediation completed. Ready to retest.'}
              </span>
            </div>
          </div>

          {/* Missed Concept Breakdown List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Identified Mental Model Misconceptions ({missedQuestions.length})
            </h4>
            {missedQuestions.map((q, idx) => {
              const selectedOptId = selectedAnswers[q.id];
              const selectedOpt = q.options.find((o) => o.id === selectedOptId);
              const correctOpt = q.options.find((o) => o.isCorrect);

              return (
                <div key={q.id} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-600">
                    <XCircle className="w-4 h-4" />
                    <span>Question {idx + 1}: {q.socraticContext}</span>
                  </div>
                  <h5 className="text-sm font-bold text-slate-900">{q.question}</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-950">
                      <span className="font-bold text-rose-800 block mb-0.5">Your Choice (Distractor Trap):</span>
                      <span>{selectedOpt?.text || 'No answer selected'}</span>
                      {selectedOpt?.misconceptionExplanation && (
                        <p className="mt-1 text-[11px] text-rose-700 italic">
                          Why: {selectedOpt.misconceptionExplanation}
                        </p>
                      )}
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                      <span className="font-bold text-emerald-800 block mb-0.5">Target Mental Model:</span>
                      <span>{correctOpt?.text}</span>
                      <p className="mt-1 text-[11px] text-emerald-700 italic">
                        {q.correctExplanation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QuizAndEvaluationEngine;
