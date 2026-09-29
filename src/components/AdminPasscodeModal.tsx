import React, { useState } from 'react';
import { ShieldCheck, KeyRound, Zap, X, Unlock, Flame } from 'lucide-react';
import { UserProfile, SkillTrack } from '../types';

interface AdminPasscodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onUnlockAllNodes: () => void;
  tracks: SkillTrack[];
}

export const AdminPasscodeModal: React.FC<AdminPasscodeModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onUpdateProfile,
  onUnlockAllNodes,
  tracks,
}) => {
  const [passcode, setPasscode] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim().toUpperCase() === 'SKILLPRAX-2026' || passcode.trim() === 'admin' || passcode.trim() === '777') {
      setUnlocked(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid Passcode. Enter "SKILLPRAX-2026" or "admin".');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-200/80 ring-1 ring-black/5 animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!unlocked ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl">
                <KeyRound className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-slate-900">
                  Master Admin Passcode Gate
                </h3>
                <p className="text-xs text-slate-500">
                  Developer telemetry & curriculum override gate
                </p>
              </div>
            </div>

            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Authorization Passcode
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="Enter passcode (e.g. SKILLPRAX-2026)"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm font-mono"
                  autoFocus
                />
                {errorMsg && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">{errorMsg}</p>
                )}
                <p className="text-xs text-slate-400 mt-1.5">
                  Default developer pass: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">SKILLPRAX-2026</code>
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-semibold text-sm shadow-md shadow-emerald-500/20 btn-tactile"
                >
                  Verify Credentials
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPasscode('SKILLPRAX-2026');
                    setUnlocked(true);
                  }}
                  className="px-3 py-2.5 text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl font-medium transition-colors"
                >
                  Quick Unlock
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-heading font-bold text-slate-900">
                    Admin Console Unlocked
                  </h3>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-700 rounded-full">
                    SUPERUSER
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Override parameters & evaluate internal engine state
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {/* Action 1: Add Streak Freeze */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-sky-100 text-sky-600 rounded-xl">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800">
                      Active Freeze Badges
                    </div>
                    <div className="text-xs text-slate-500">
                      Current: {userProfile.activeFreezes} / {userProfile.maxFreezes}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onUpdateProfile({ activeFreezes: Math.min(3, userProfile.activeFreezes + 1) })}
                  className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold btn-tactile"
                >
                  + Add Freeze 🧊
                </button>
              </div>

              {/* Action 2: Boost Flame Streak */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800">
                      Flame Streak Override
                    </div>
                    <div className="text-xs text-slate-500">
                      Current: {userProfile.flameStreak} days
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onUpdateProfile({ flameStreak: userProfile.flameStreak + 1 })}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold btn-tactile-amber"
                >
                  +1 Day 🔥
                </button>
              </div>

              {/* Action 3: Unlock All Roadmap Nodes */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
                    <Unlock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800">
                      Mastery Roadmap Overdrive
                    </div>
                    <div className="text-xs text-slate-500">
                      Unlock all locked nodes for testing
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onUnlockAllNodes();
                    onClose();
                  }}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold btn-tactile"
                >
                  Unlock All
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold"
              >
                Close Admin Console
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPasscodeModal;
