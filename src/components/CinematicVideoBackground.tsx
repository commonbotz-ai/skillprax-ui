import React, { useEffect, useRef, useState, useCallback } from 'react';

export interface CinematicVideoBackgroundProps {
  /**
   * Video source path. Defaults to `/videos/background-schematics.mp4`
   */
  src?: string;
  /**
   * Scrim overlay opacity (0 to 1)
   */
  overlayOpacity?: number;
  /**
   * Poster image fallback
   */
  poster?: string;
  className?: string;
}

export const CinematicVideoBackground: React.FC<CinematicVideoBackgroundProps> = ({
  src = '/videos/background-schematics.mp4',
  overlayOpacity = 0.35,
  poster = '/background-poster.jpg',
  className = '',
}) => {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);

  const [opacityA, setOpacityA] = useState<number>(1);
  const [opacityB, setOpacityB] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  const activeLayerRef = useRef<'A' | 'B'>('A');
  const isTransitioningRef = useRef<boolean>(false);
  const animFrameIdRef = useRef<number | null>(null);

  // Check reduced motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const configureVideo = useCallback((v: HTMLVideoElement | null) => {
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
    v.setAttribute('disablepictureinpicture', '');
    v.controls = false;
  }, []);

  const safePlay = useCallback(async (v: HTMLVideoElement | null) => {
    if (!v) return;
    try {
      configureVideo(v);
      await v.play();
    } catch {
      // Ignored: autoplay restriction or transient state
    }
  }, [configureVideo]);

  // Dual buffer crossfade
  useEffect(() => {
    if (prefersReducedMotion) return;

    const vA = videoARef.current;
    const vB = videoBRef.current;
    if (!vA || !vB) return;

    configureVideo(vA);
    configureVideo(vB);

    let isMounted = true;
    activeLayerRef.current = 'A';
    isTransitioningRef.current = false;
    setOpacityA(1);
    setOpacityB(0);

    vA.currentTime = 0;
    safePlay(vA).then(() => {
      if (isMounted) setIsReady(true);
    });

    const crossfadeWindow = 0.8; // seconds before end

    const loop = () => {
      if (!isMounted) return;

      const currentActive = activeLayerRef.current;
      const currentVideo = currentActive === 'A' ? vA : vB;
      const nextVideo = currentActive === 'A' ? vB : vA;

      if (
        currentVideo &&
        currentVideo.duration &&
        !isNaN(currentVideo.duration) &&
        !isTransitioningRef.current
      ) {
        const remaining = currentVideo.duration - currentVideo.currentTime;
        if (remaining <= crossfadeWindow && remaining > 0) {
          isTransitioningRef.current = true;
          nextVideo.currentTime = 0;
          safePlay(nextVideo);

          if (currentActive === 'A') {
            setOpacityA(0);
            setOpacityB(1);
          } else {
            setOpacityA(1);
            setOpacityB(0);
          }

          setTimeout(() => {
            if (!isMounted) return;
            activeLayerRef.current = currentActive === 'A' ? 'B' : 'A';
            isTransitioningRef.current = false;
            try {
              currentVideo.pause();
              currentVideo.currentTime = 0;
            } catch {
              // ignore
            }
          }, crossfadeWindow * 1000);
        }
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      isMounted = false;
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      try {
        vA.pause();
        vB.pause();
      } catch {
        // ignore
      }
    };
  }, [src, prefersReducedMotion, safePlay, configureVideo]);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 w-full h-full pointer-events-none select-none -z-10 overflow-hidden bg-white ${className}`}
    >
      {/* Fallback poster for reduced motion */}
      {prefersReducedMotion ? (
        <img
          src={poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      ) : (
        <>
          {/* Static poster underlay during initial buffer */}
          <img
            src={poster}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-700 ${
              isReady ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {/* DUAL-BUFFER VIDEO ENGINE */}
          <video
            ref={videoARef}
            src={src}
            autoPlay
            muted
            playsInline
            loop={false}
            preload="auto"
            controls={false}
            disablePictureInPicture
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{
              opacity: opacityA,
              transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'opacity',
            }}
          >
            <source src={src} type="video/mp4" />
            <source src="/background video.mp4" type="video/mp4" />
          </video>

          <video
            ref={videoBRef}
            src={src}
            muted
            playsInline
            loop={false}
            preload="auto"
            controls={false}
            disablePictureInPicture
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{
              opacity: opacityB,
              transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'opacity',
            }}
          >
            <source src={src} type="video/mp4" />
            <source src="/background video.mp4" type="video/mp4" />
          </video>
        </>
      )}

      {/* SCRIM OVERLAY: Radial gradient light wash for optimal contrast */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none bg-radial from-white/50 via-white/75 to-slate-50/90 backdrop-blur-[1px]"
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
};

export default CinematicVideoBackground;
