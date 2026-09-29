import React, { useState } from 'react';
import { SkillTrack, FlowchartNode } from '../types';
import {
  Lock,
  CheckCircle2,
  Zap,
  Sparkles,
  Plus,
  Target,
  FileCheck,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Award,
  Check,
  AlertCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InteractiveNodeFlowProps {
  currentTrack: SkillTrack;
  onOpenQuiz: (nodeTitle?: string, acuTitle?: string) => void;
  onPassEvaluation: () => void;
}

export const InteractiveNodeFlow: React.FC<InteractiveNodeFlowProps> = ({
  currentTrack,
  onOpenQuiz,
  onPassEvaluation,
}) => {
  // Graph Zoom Level
  const [zoomLevel, setZoomLevel] = useState(1);

  // Dynamic Nodes State (supports Spawning Next Step)
  const [nodes, setNodes] = useState<FlowchartNode[]>([
    {
      id: 'node-1',
      label: 'Step 1: Axiomatic Foundations',
      subLabel: 'Core Physical & Syntactic Axioms',
      status: 'completed',
      x: 60,
      y: 190,
      width: 190,
      height: 76,
      tier: 1,
      objectives: [
        'Master initial baseline boundary rules and conservation principles',
        'Eliminate introductory nomenclature and formula oversights',
        'Verify prerequisite kinematic parameters',
      ],
      acus: ['ACU-101: Axiomatic verification', 'ACU-102: Boundary conditions test'],
      aiSummary: 'Axiomatic baseline established with 100% verified prerequisite checks.',
    },
    {
      id: 'node-2',
      label: 'Step 2: Core Dynamics & Execution',
      subLabel: 'Active Socratic Learning Node',
      status: 'active',
      x: 320,
      y: 190,
      width: 210,
      height: 80,
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
      aiSummary: 'Currently active competency gate. 3 ACUs require verification in Socratic Quiz.',
    },
    {
      id: 'node-3',
      label: 'Step 3: High-Load Dynamics',
      subLabel: 'Locked Milestone Node',
      status: 'locked',
      x: 600,
      y: 190,
      width: 190,
      height: 76,
      tier: 3,
      objectives: [
        'Handle high-frequency perturbance and fatigue buffers',
        'Solve advanced stereochemical / algorithmic constraints',
      ],
      acus: ['ACU-301: Perturbance dampening', 'ACU-302: Stereochemical retention'],
      aiSummary: 'Locked until Step 2 Socratic gate evaluation passes with 100% mastery.',
    },
  ]);

  // Selected Node for Active Milestone Studio Inspector
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-2');

  // Celebratory Simulation Toast & High-Voltage Beam
  const [showCelebrationToast, setShowCelebrationToast] = useState(false);
  const [voltageBeamActive, setVoltageBeamActive] = useState(false);
  const [lockedAlertMessage, setLockedAlertMessage] = useState<string | null>(null);

  // Active selected node object
  const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[1] || nodes[0];

  // Handle Node Click
  const handleNodeClick = (node: FlowchartNode) => {
    if (node.status === 'locked') {
      setLockedAlertMessage(`Locked: Complete prior step evaluation to unlock "${node.label}"!`);
      setTimeout(() => setLockedAlertMessage(null), 3000);
      return;
    }
    setSelectedNodeId(node.id);
  };

  // Dynamic Node Spawner (+ Spawn Next Step)
  const handleSpawnNextStep = () => {
    const nextStepNum = nodes.length + 1;
    const lastNode = nodes[nodes.length - 1];
    const newX = lastNode ? lastNode.x + 270 : 800;

    const newNode: FlowchartNode = {
      id: `node-${Date.now()}`,
      label: `Step ${nextStepNum}: Autonomous Synthesis`,
      subLabel: 'Autonomous Expansion Milestone',
      status: 'locked',
      x: newX,
      y: 190,
      width: 200,
      height: 76,
      tier: nextStepNum,
      objectives: [
        'Autonomous synthesis across complex domain boundaries',
        'Defend counter-arguments in real-time Socratic oral review',
      ],
      acus: [`ACU-${nextStepNum}01: Global synthesis defense`, `ACU-${nextStepNum}02: Invariant audit`],
      aiSummary: 'Autonomously spawned milestone appended to graph canvas.',
    };

    setNodes((prev) => [...prev, newNode]);
  };

  // Simulation Action: Simulate Passing Quiz
  const handleSimulatePass = () => {
    setVoltageBeamActive(true);

    setTimeout(() => {
      setVoltageBeamActive(false);

      // Advance Node 2 to completed, Node 3 to active
      setNodes((prev) => {
        let foundActive = false;
        return prev.map((n, i) => {
          if (n.status === 'active' && !foundActive) {
            foundActive = true;
            return { ...n, status: 'completed' as const };
          }
          if (foundActive && n.status === 'locked') {
            foundActive = false;
            setSelectedNodeId(n.id);
            return { ...n, status: 'active' as const };
          }
          return n;
        });
      });

      // Trigger Celebration Toast
      setShowCelebrationToast(true);
      setTimeout(() => setShowCelebrationToast(false), 3500);

      // Notify parent app state
      onPassEvaluation();
    }, 900);
  };

  return (
    <div className="w-full space-y-6">
      {/* Living Node Graph Canvas Container */}
      <div className="relative bg-white/95 backdrop-blur-md rounded-3xl border border-emerald-200/90 shadow-xl shadow-emerald-950/5 overflow-hidden min-h-[460px] p-4 flex flex-col justify-between">
        {/* Top Control Bar inside Canvas */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-heading font-bold text-slate-900">
              Interactive Living Node Graph Engine
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold">
              {nodes.filter((n) => n.status === 'completed').length}/{nodes.length} Steps Done
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Dynamic Node Spawner Button */}
            <button
              onClick={handleSpawnNextStep}
              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 btn-tactile cursor-pointer group"
            >
              <Plus className="w-3.5 h-3.5 transition-transform group-hover:rotate-90" />
              <span>+ Spawn Next Step</span>
            </button>

            {/* Simulation Action: Simulate Passing Quiz */}
            <button
              onClick={handleSimulatePass}
              className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-xs font-bold shadow-md btn-tactile flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 animate-bounce" />
              <span>Simulate Passing Quiz</span>
            </button>

            {/* Canvas Zoom Controls */}
            <div className="flex items-center bg-slate-100 rounded-xl p-1 text-slate-600 border border-slate-200">
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.1))}
                className="p-1 hover:text-slate-900 hover:bg-white rounded-lg transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3 h-3" />
              </button>
              <span className="text-[10px] font-mono font-bold px-1.5">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(1.3, z + 0.1))}
                className="p-1 hover:text-slate-900 hover:bg-white rounded-lg transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3 h-3" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1 hover:text-slate-900 hover:bg-white rounded-lg transition-colors border-l border-slate-200 ml-1 cursor-pointer"
                title="Reset Zoom"
              >
                <RotateCcw className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Celebratory Simulation Particle Toast */}
        <AnimatePresence>
          {showCelebrationToast && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.85 }}
              className="absolute top-16 left-1/2 -translate-x-1/2 z-30 bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 text-white px-5 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20 animate-toast"
            >
              <Award className="w-5 h-5 text-amber-300 animate-bounce" />
              <div className="text-xs">
                <span className="font-bold block">Evaluation Passed! Milestone Verified 🎉</span>
                <span className="text-emerald-100 text-[11px]">
                  High-voltage pulse connected! Next step unlocked.
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Locked Node Feedback Alert */}
        <AnimatePresence>
          {lockedAlertMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-16 left-1/2 -translate-x-1/2 z-30 bg-slate-900 text-white px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 text-xs border border-slate-700"
            >
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>{lockedAlertMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SVG Living Graph Canvas */}
        <div className="relative flex-1 flex items-center justify-start overflow-x-auto py-12 px-6">
          <div
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'left center',
              width: `${Math.max(900, nodes.length * 280 + 100)}px`,
              height: '340px',
            }}
            className="relative transition-transform duration-200"
          >
            {/* SVG Connecting Energy Beams with stroke-dashoffset Keyframes */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              viewBox={`0 0 ${Math.max(900, nodes.length * 280 + 100)} 340`}
            >
              <defs>
                <linearGradient id="beamCompletedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
                <linearGradient id="beamActiveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#0284C7" />
                </linearGradient>
                <linearGradient id="beamLockedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#94A3B8" />
                  <stop offset="100%" stopColor="#CBD5E1" />
                </linearGradient>
                <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Connecting Beams between consecutive nodes */}
              {nodes.map((node, i) => {
                if (i === nodes.length - 1) return null;
                const nextNode = nodes[i + 1];

                const startX = node.x + node.width;
                const startY = node.y + node.height / 2;
                const endX = nextNode.x;
                const endY = nextNode.y + nextNode.height / 2;

                const isBeamActive =
                  node.status === 'completed' && nextNode.status === 'active';
                const isBeamCompleted =
                  node.status === 'completed' && nextNode.status === 'completed';

                return (
                  <g key={`beam-${node.id}-${nextNode.id}`}>
                    {/* Underlying Guide Line */}
                    <path
                      d={`M ${startX},${startY} L ${endX},${endY}`}
                      stroke={
                        isBeamCompleted
                          ? 'url(#beamCompletedGrad)'
                          : isBeamActive
                          ? 'url(#beamActiveGrad)'
                          : '#E2E8F0'
                      }
                      strokeWidth={isBeamActive || isBeamCompleted ? '3' : '2'}
                      strokeDasharray={isBeamCompleted ? 'none' : '6 6'}
                      fill="none"
                    />

                    {/* Animated Energy Flow Line */}
                    {(isBeamActive || isBeamCompleted || voltageBeamActive) && (
                      <path
                        d={`M ${startX},${startY} L ${endX},${endY}`}
                        stroke={voltageBeamActive ? '#F59E0B' : '#10B981'}
                        strokeWidth="3.5"
                        fill="none"
                        className="animate-flowing-beam"
                        filter="url(#glowEffect)"
                      />
                    )}

                    {/* Traveling Energy Pulse Orb */}
                    {(isBeamActive || isBeamCompleted) && (
                      <circle r="4" fill="#34D399" filter="url(#glowEffect)">
                        <animateMotion
                          path={`M ${startX},${startY} L ${endX},${endY}`}
                          dur="1.8s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Interactive Node Cards directly on the Graph */}
            {nodes.map((node, nodeIndex) => {
              const isSelected = selectedNodeId === node.id;
              const isCompleted = node.status === 'completed';
              const isActive = node.status === 'active';
              const isLocked = node.status === 'locked';

              return (
                <div
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  style={{
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    width: `${node.width}px`,
                    height: `${node.height}px`,
                  }}
                  className={`absolute z-10 rounded-2xl p-3 flex items-center justify-between cursor-pointer transition-all duration-300 wobble-card select-none ${
                    isActive
                      ? 'bg-white border-2 border-emerald-500 shadow-xl shadow-emerald-500/30 ring-4 ring-emerald-100/90 scale-105'
                      : isCompleted
                      ? 'bg-emerald-50/95 border border-emerald-400 text-emerald-950 shadow-sm'
                      : 'bg-slate-50/85 border border-slate-300/80 text-slate-400 opacity-75 hover:opacity-100'
                  } ${isSelected ? 'ring-4 ring-sky-500 shadow-2xl' : ''}`}
                >
                  {/* Concentric Radar Rings for Active Workspace Step */}
                  {isActive && (
                    <>
                      <div className="absolute -inset-1 rounded-2xl border-2 border-emerald-400 pointer-events-none animate-radar-ring" />
                      <div className="absolute -inset-1 rounded-2xl border-2 border-teal-400 pointer-events-none animate-radar-ring-delayed" />
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

                  {/* Status Indicator Icon */}
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
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Helper Bar */}
        <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Click any unlocked step to inspect objectives & ACUs in the studio pane below</span>
          </div>

          <button
            onClick={() => onOpenQuiz(activeNode.label, activeNode.acus[0] || 'Milestone Checkpoint')}
            className="px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl text-xs font-bold shadow-md btn-tactile cursor-pointer flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Ready for Evaluation (Start Quiz) ➔</span>
          </button>
        </div>
      </div>

      {/* ACTIVE MILESTONE STUDIO INSPECTOR PANE (Updates dynamically when clicking nodes) */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-emerald-200/80 shadow-lg wobble-card space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-2xl">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                    activeNode.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : activeNode.status === 'active'
                      ? 'bg-sky-100 text-sky-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {activeNode.status}
                </span>
                <span className="text-xs text-slate-400 font-mono">Tier {activeNode.tier}</span>
              </div>
              <h3 className="text-lg font-heading font-bold text-slate-900 mt-0.5">
                {activeNode.label}
              </h3>
              <p className="text-xs text-slate-500">{activeNode.subLabel}</p>
            </div>
          </div>

          {/* Direct Launch Quiz Action for this Node */}
          <div className="relative p-[1.5px] rounded-xl conic-beam animate-pulse-glow self-start sm:self-center">
            <button
              onClick={() => onOpenQuiz(activeNode.label, activeNode.acus[0] || 'Unit Assessment')}
              className="relative z-10 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-400 text-white rounded-[10px] text-xs font-bold uppercase tracking-wider shadow-md btn-tactile btn-shimmer cursor-pointer flex items-center gap-2 active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Take Socratic Evaluation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* AI Socratic Summary & ACUs Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Milestone Objectives */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-emerald-600" />
              Milestone Objectives
            </h4>
            <ul className="space-y-2">
              {activeNode.objectives.map((obj, i) => (
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
            <div className="space-y-2">
              {activeNode.acus.map((acu, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 font-mono"
                >
                  <span>{acu}</span>
                  <button
                    onClick={() => onOpenQuiz(activeNode.label, acu)}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-sans font-bold flex items-center gap-1 shadow-sm btn-tactile cursor-pointer"
                  >
                    <Zap className="w-3 h-3 text-amber-300" />
                    <span>Ready for Eval ➔</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveNodeFlow;
