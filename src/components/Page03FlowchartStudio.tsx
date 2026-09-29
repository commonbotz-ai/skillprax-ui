import React, { useState } from 'react';
import { SkillTrack, FlowchartNode, AIEngine } from '../types';
import { SkillpraxLogo } from './SkillpraxLogo';
import {
  GitBranch,
  BookOpen,
  Zap,
  Lock,
  CheckCircle2,
  Cpu,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  Target,
  FileCheck,
  Sparkles,
  HelpCircle,
  ChevronRight,
  RotateCcw,
  Activity,
  Layers,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Page03FlowchartStudioProps {
  currentTrack: SkillTrack;
  onNavigate: (page: 'page01' | 'page02' | 'page03' | 'page04') => void;
  selectedEngine: AIEngine;
  onSelectEngine: (engine: AIEngine) => void;
  onCompleteNode: (nodeId: string) => void;
  onOpenQuiz: (nodeTitle?: string, acuTitle?: string) => void;
}

export const Page03FlowchartStudio: React.FC<Page03FlowchartStudioProps> = ({
  currentTrack,
  onNavigate,
  selectedEngine,
  onSelectEngine,
  onCompleteNode,
  onOpenQuiz,
}) => {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'resources' | 'evaluation'>('roadmap');
  const [selectedNode, setSelectedNode] = useState<FlowchartNode | null>(null);
  const [showEngineModal, setShowEngineModal] = useState(false);
  const [tempEngine, setTempEngine] = useState<AIEngine>(selectedEngine);
  const [engineReders, setEngineReders] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Nodes for currentTrack
  const nodes: FlowchartNode[] = [
    {
      id: 'node-1',
      label: 'Axiomatic Foundations',
      subLabel: 'Prerequisite Axioms & Syntax',
      status: 'completed',
      x: 170,
      y: 220,
      width: 175,
      height: 70,
      tier: 1,
      objectives: [
        'Master base kinematic/structural formulas',
        'Verify prerequisite conservation principles',
        'Eliminate introductory nomenclature errors',
      ],
      acus: ['ACU-101: Formula verification', 'ACU-102: Boundary conditions'],
      aiSummary: 'Axiomatic baseline established with 100% verified prerequisite checks.',
    },
    {
      id: 'node-2',
      label: 'Core Kinematics & Execution',
      subLabel: 'Active Socratic Learning Node',
      status: 'active',
      x: 440,
      y: 220,
      width: 195,
      height: 74,
      tier: 2,
      objectives: [
        'Execute multi-step synthesis and coordinate mapping',
        'Derive velocity gradients and force transfer loops',
        'Prevent rate-limiting step bottlenecking',
      ],
      acus: [
        'ACU-201: Rate determination analysis',
        'ACU-202: Transition state stability',
        'ACU-203: Vector clearance timing',
      ],
      aiSummary: 'Currently active competency gate. 3 ACUs require verification in Page 04.',
    },
    {
      id: 'node-3',
      label: 'High-Load Dynamics',
      subLabel: 'Locked Milestone Node',
      status: 'locked',
      x: 440,
      y: 75,
      width: 175,
      height: 66,
      tier: 2,
      objectives: [
        'Handle high-frequency perturbance and fatigue',
        'Advanced transition state energy barriers',
      ],
      acus: ['ACU-301: Perturbance dampening', 'ACU-302: Stereochemical retention'],
      aiSummary: 'Locked until Node 2 Socratic gate evaluation passes with score >= 80%.',
    },
    {
      id: 'node-4',
      label: 'Intermediate Synthesis',
      subLabel: 'Locked Milestone Node',
      status: 'locked',
      x: 440,
      y: 365,
      width: 175,
      height: 66,
      tier: 2,
      objectives: [
        'Branching decision trees and counter-intuitive pathways',
        'Orthogonal chemical/kinematic decoupling',
      ],
      acus: ['ACU-401: Decoupled pathway isolation', 'ACU-402: Yield optimization'],
      aiSummary: 'Locked. Requires active node completion.',
    },
    {
      id: 'node-5',
      label: 'Autonomous Synthesis Gate',
      subLabel: 'Terminal Mastery Node',
      status: 'locked',
      x: 725,
      y: 220,
      width: 195,
      height: 72,
      tier: 3,
      objectives: [
        'Defend counter-arguments in real-time Socratic oral review',
        'Complete timed diagnostic evaluation across all curriculum tiers',
      ],
      acus: ['ACU-501: Global synthesis defense', 'ACU-502: Real-time oral Socratic duel'],
      aiSummary: 'Final milestone before awarding Master Competency Badge.',
    },
  ];

  const handleTabChange = (tab: 'roadmap' | 'resources' | 'evaluation') => {
    setActiveTab(tab);
    if (tab === 'resources') {
      onNavigate('page04');
    } else if (tab === 'evaluation') {
      onOpenQuiz(currentTrack.title, 'Competency Evaluation Gate');
    }
  };

  const handleApplyEngine = () => {
    onSelectEngine(tempEngine);
    setShowEngineModal(false);
  };

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

        {/* Tripartite Studio Header Navigation with Active Pill Highlighting */}
        <div className="hidden md:flex items-center p-1 bg-slate-100/90 border border-slate-200/80 rounded-2xl shadow-inner">
          <button
            onClick={() => handleTabChange('roadmap')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-heading font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'roadmap'
                ? 'bg-white text-emerald-800 shadow-sm shadow-emerald-500/10 scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5 text-emerald-600" />
            <span>🗺️ Flowchart Roadmap</span>
          </button>
          <button
            onClick={() => handleTabChange('resources')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-heading font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'resources'
                ? 'bg-white text-emerald-800 shadow-sm shadow-emerald-500/10 scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-600" />
            <span>📚 Study Resources</span>
          </button>
          <button
            onClick={() => handleTabChange('evaluation')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-heading font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'evaluation'
                ? 'bg-white text-emerald-800 shadow-sm shadow-emerald-500/10 scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>⚡ Evaluation Gate</span>
          </button>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowEngineModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold btn-tactile cursor-pointer group"
          >
            <Cpu className="w-3.5 h-3.5 text-emerald-600 transition-transform group-hover:rotate-45" />
            <span className="hidden sm:inline">Engine:</span>
            <span className="font-mono text-[11px] font-bold">
              {selectedEngine.includes('llama-3.3') ? 'LLaMA 3.3 70B' : selectedEngine}
            </span>
          </button>

          <button
            onClick={() => onNavigate('page04')}
            className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-xl text-xs font-bold btn-tactile shadow-md shadow-emerald-500/20 cursor-pointer flex items-center gap-1.5 active:scale-95"
          >
            <span className="hidden sm:inline">Proceed</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.header>

      {/* Main Studio Arena */}
      <main className="max-w-7xl mx-auto w-full space-y-4 pt-4">
        {/* Studio Track Info Strip */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/90 backdrop-blur-md rounded-2xl px-5 py-3.5 border border-emerald-200/70 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl p-2 bg-emerald-50 rounded-xl border border-emerald-100 shadow-sm">
              {currentTrack.icon}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-heading font-bold text-slate-900">
                  {currentTrack.title}
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-100/90 text-emerald-800 rounded-full font-bold">
                  STEP {currentTrack.currentStep}/{currentTrack.totalSteps}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Interactive Socratic dependency graph with live ACU verification
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            {/* Zoom & Canvas controls */}
            <div className="flex items-center bg-slate-100 rounded-xl p-1 text-slate-600 border border-slate-200">
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.1))}
                className="p-1 hover:text-slate-900 hover:bg-white rounded-lg transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono font-semibold px-2">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
                className="p-1 hover:text-slate-900 hover:bg-white rounded-lg transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1 hover:text-slate-900 hover:bg-white rounded-lg transition-colors ml-1 border-l border-slate-200 cursor-pointer"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            <button
              onClick={() => setShowEngineModal(true)}
              className="px-3 py-1.5 bg-white border border-slate-200 hover:border-emerald-300 text-slate-700 rounded-xl text-xs font-semibold shadow-sm hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Cpu className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-xs">AI Selector</span>
            </button>
          </div>
        </motion.div>

        {/* Flowchart Interactive Canvas with Graph Animations */}
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white/95 backdrop-blur-md rounded-3xl border border-emerald-200/80 shadow-xl shadow-emerald-950/5 overflow-hidden min-h-[540px] flex items-center justify-center p-4"
        >
          {/* Subtle canvas background coordinate grid */}
          <div className="absolute inset-0 bg-tech-grid-dense opacity-65 pointer-events-none" />

          {/* SVG Canvas for Connectors & Energy Beams */}
          <div
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
            className="relative w-[960px] h-[500px] transition-transform duration-200"
          >
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              viewBox="0 0 960 500"
            >
              <defs>
                <linearGradient id="edgeGradActive" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#0EA5E9" />
                </linearGradient>
                <linearGradient id="edgeGradCompleted" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
                <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Edge 1: Completed Node 1 -> Active Node 2 with Energy Pulses */}
              <path
                d="M 345,255 L 440,255"
                stroke="url(#edgeGradCompleted)"
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M 345,255 L 440,255"
                stroke="#10B981"
                strokeWidth="3"
                fill="none"
                className="animate-energy-line"
                filter="url(#glowFilter)"
              />
              {/* Animated energy orb traveling from Node 1 to Node 2 */}
              <circle r="4" fill="#34D399" filter="url(#glowFilter)">
                <animateMotion
                  path="M 345,255 L 440,255"
                  dur="1.8s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Edge 2: Node 1 -> Node 3 (Upper branch) */}
              <path
                d="M 257,220 C 257,108 330,108 440,108"
                stroke="#CBD5E1"
                strokeWidth="2"
                strokeDasharray="4 4"
                fill="none"
              />

              {/* Edge 3: Node 1 -> Node 4 (Lower branch) */}
              <path
                d="M 257,290 C 257,398 330,398 440,398"
                stroke="#CBD5E1"
                strokeWidth="2"
                strokeDasharray="4 4"
                fill="none"
              />

              {/* Edge 4: Active Node 2 -> Terminal Node 5 */}
              <path
                d="M 635,255 L 725,255"
                stroke="url(#edgeGradActive)"
                strokeWidth="3"
                strokeDasharray="6 6"
                fill="none"
                className="animate-energy-line"
              />
              {/* Luminous energy particle traveling towards terminal gate */}
              <circle r="4" fill="#38BDF8" filter="url(#glowFilter)">
                <animateMotion
                  path="M 635,255 L 725,255"
                  dur="2.2s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Edge 5: Node 3 & Node 4 -> Node 5 */}
              <path
                d="M 615,108 C 670,108 670,230 725,242"
                stroke="#E2E8F0"
                strokeWidth="2"
                strokeDasharray="4 4"
                fill="none"
              />
              <path
                d="M 615,398 C 670,398 670,270 725,268"
                stroke="#E2E8F0"
                strokeWidth="2"
                strokeDasharray="4 4"
                fill="none"
              />
            </svg>

            {/* Interactive Node Elements with Motion Entrance and Live Radars */}
            {nodes.map((node, nodeIdx) => {
              const isSelected = selectedNode?.id === node.id;
              const isCompleted = node.status === 'completed';
              const isActive = node.status === 'active';
              const isLocked = node.status === 'locked';

              return (
                <motion.div
                  key={node.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: nodeIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setSelectedNode(node)}
                  style={{
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    width: `${node.width}px`,
                    height: `${node.height}px`,
                  }}
                  className={`absolute z-10 rounded-2xl p-3 flex items-center justify-between cursor-pointer transition-all duration-300 wobble-card select-none ${
                    isActive
                      ? 'bg-white border-2 border-emerald-500 shadow-xl shadow-emerald-500/25 ring-4 ring-emerald-100/90'
                      : isCompleted
                      ? 'bg-emerald-50/95 border border-emerald-400 text-emerald-950 shadow-sm'
                      : 'bg-slate-50/85 border border-slate-300/80 text-slate-400 opacity-75 hover:opacity-100'
                  } ${isSelected ? 'ring-4 ring-sky-500 scale-105' : ''}`}
                >
                  {/* Radar Wave Effect for Active Node */}
                  {isActive && (
                    <>
                      <div className="absolute -inset-1 rounded-2xl border-2 border-emerald-400 pointer-events-none animate-radar" />
                      <div className="absolute -inset-1 rounded-2xl border-2 border-teal-400 pointer-events-none animate-radar-delayed" />
                    </>
                  )}

                  <div className="flex-1 pr-2 relative z-10">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-xs font-heading font-bold truncate ${
                          isActive
                            ? 'text-emerald-900'
                            : isCompleted
                            ? 'text-emerald-800'
                            : 'text-slate-600'
                        }`}
                      >
                        {node.label}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5">
                      {node.subLabel}
                    </div>
                  </div>

                  {/* Status Indicator Icon with Animations */}
                  <div className="shrink-0 ml-1 relative z-10">
                    {isCompleted && (
                      <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/30">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    )}
                    {isActive && (
                      <div className="relative flex items-center justify-center w-7 h-7">
                        <span className="w-4 h-4 rounded-full bg-emerald-500 animate-ping absolute" />
                        <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 shadow-md shadow-emerald-600/50 relative z-10" />
                      </div>
                    )}
                    {isLocked && (
                      <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center">
                        <Lock className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Helper Floating Pill */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl px-3 py-1.5 text-[11px] text-slate-500 flex items-center gap-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Click any node to inspect objectives & ACUs</span>
          </div>

          {/* Major Proceed Button with Active Breathing Aura and Shimmer */}
          <div className="absolute bottom-4 right-4">
            <div className="relative p-[1.5px] rounded-2xl conic-beam animate-pulse-glow">
              <button
                onClick={() => onNavigate('page04')}
                className="relative z-10 px-6 py-2.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white rounded-[14px] font-heading font-bold text-xs tracking-wide shadow-lg btn-tactile btn-shimmer cursor-pointer flex items-center gap-2 active:scale-95 group"
              >
                <span>Proceed to Study Resources</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Node Detail Slide-Over Drawer with Spring Transition */}
      <AnimatePresence>
        {selectedNode && (
          <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-sm animate-fade-in">
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: '0%', opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto border-l border-emerald-200 flex flex-col justify-between"
            >
              <div className="space-y-5">
                {/* Drawer Header */}
                <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                          selectedNode.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : selectedNode.status === 'active'
                            ? 'bg-sky-100 text-sky-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {selectedNode.status}
                      </span>
                      <span className="text-xs text-slate-400">Tier {selectedNode.tier}</span>
                    </div>
                    <h3 className="text-lg font-heading font-bold text-slate-900">
                      {selectedNode.label}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{selectedNode.subLabel}</p>
                  </div>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* AI Socratic Summary */}
                <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 text-xs text-slate-700">
                  <div className="font-semibold text-emerald-800 flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                    Socratic Assessment Context
                  </div>
                  <p className="leading-relaxed text-slate-600">{selectedNode.aiSummary}</p>
                </div>

                {/* Milestone Objectives */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-emerald-600" />
                    Milestone Objectives
                  </h4>
                  <ul className="space-y-2">
                    {selectedNode.objectives.map((obj, i) => (
                      <li
                        key={i}
                        className="text-xs text-slate-600 flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100"
                      >
                        <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Assessable Concept Units (ACUs) */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-sky-600" />
                    Assessable Concept Units (ACUs)
                  </h4>
                  <div className="space-y-1.5">
                    {selectedNode.acus.map((acu, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 font-mono"
                      >
                        <span>{acu}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedNode(null);
                            onOpenQuiz(selectedNode.label, acu);
                          }}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-sans font-bold flex items-center gap-1 shadow-sm btn-tactile cursor-pointer active:scale-95"
                        >
                          <Zap className="w-3 h-3 text-amber-300 animate-pulse" />
                          <span>Ready for Eval ➔</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons in Drawer */}
              <div className="pt-6 border-t border-slate-100 space-y-2">
                {selectedNode.status === 'active' && (
                  <button
                    onClick={() => {
                      onCompleteNode(selectedNode.id);
                      setSelectedNode(null);
                    }}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md btn-tactile cursor-pointer"
                  >
                    Mark Active Node Complete (Pass Verification)
                  </button>
                )}
                <button
                  onClick={() => {
                    const firstAcu = selectedNode.acus[0] || 'Unit Assessment';
                    setSelectedNode(null);
                    onOpenQuiz(selectedNode.label, firstAcu);
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white rounded-xl text-xs font-bold shadow-md btn-tactile btn-shimmer cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  <span>Ready for Evaluation (Start Socratic Quiz)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* AI Engine Selector Modal */}
      {showEngineModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-emerald-200 ring-1 ring-black/5 animate-scale-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-emerald-600 animate-spin" style={{ animationDuration: '10s' }} />
                <h3 className="text-base font-heading font-bold text-slate-900">
                  AI Engine Selector
                </h3>
              </div>
              <button
                onClick={() => setShowEngineModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  AI Engine selector (e.g.)
                </label>
                <select
                  value={tempEngine}
                  onChange={(e) => setTempEngine(e.target.value as AIEngine)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="groq-llama-3.3-70b">Groq LLaMA 3.3 70B (Default)</option>
                  <option value="llama-3.1-8b">LLaMA 3.1 8B (Low Latency)</option>
                  <option value="mixtral-8x7b">Mixtral 8x7B (MoE Architecture)</option>
                  <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                </select>
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={engineReders}
                  onChange={(e) => setEngineReders(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                />
                <span className="text-xs text-slate-700 font-medium">Engine Reders</span>
              </label>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEngineModal(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyEngine}
                  className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold rounded-xl shadow-md btn-tactile cursor-pointer"
                >
                  Select Engine
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page03FlowchartStudio;
