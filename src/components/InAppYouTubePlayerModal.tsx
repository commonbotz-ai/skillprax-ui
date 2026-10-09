import React from 'react';
import { X, Youtube, Clock, CheckCircle2 } from 'lucide-react';

export interface InAppYouTubePlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: {
    id?: string;
    title: string;
    channel: string;
    duration: string;
    youtubeId: string;
    takeaway: string;
    keyPoints?: string[];
  } | null;
  onMarkAsWatched?: (videoId: string) => void;
}

export const InAppYouTubePlayerModal: React.FC<InAppYouTubePlayerModalProps> = ({
  isOpen,
  onClose,
  video,
  onMarkAsWatched,
}) => {
  if (!isOpen || !video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Frosted Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-200/90 flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-600/10 flex items-center justify-center text-red-600">
              <Youtube className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">In-App Tutorial Stream</span>
              <p className="text-sm font-semibold text-slate-900 truncate max-w-md">{video.channel}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close Player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 16:9 Responsive Video Container */}
        <div className="relative w-full aspect-video bg-black shrink-0">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Scrollable Information Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-lg font-bold text-slate-900 leading-snug">{video.title}</h3>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 shrink-0">
              <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {video.duration}
              </span>
              <span className="bg-red-50 text-red-600 px-2.5 py-1 rounded-full border border-red-200">
                Authoritative Pedagogy
              </span>
            </div>
          </div>

          {/* Pedagogical Takeaway Box */}
          <div className="rounded-2xl bg-amber-50/80 border border-amber-200/90 p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
              Core Conceptual Takeaway
            </span>
            <p className="text-sm text-amber-950 font-medium leading-relaxed">{video.takeaway}</p>
          </div>

          {/* Key Focal Points */}
          {video.keyPoints && video.keyPoints.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Key Execution Anchors</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {video.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between">
          <span className="text-xs text-slate-500">Watched in-app • Zero distraction mode</span>
          <div className="flex items-center gap-3">
            {onMarkAsWatched && video.id && (
              <button
                onClick={() => {
                  onMarkAsWatched(video.id!);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 transition-colors"
              >
                Mark as Mastered ✓
              </button>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors"
            >
              Done Watching
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InAppYouTubePlayerModal;
