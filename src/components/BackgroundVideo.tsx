import React, { useEffect, useRef } from 'react';

// Video sources for the new video
const VIDEO_SOURCES = [
  '/kling.mp4',
  '/background.mp4',
  'https://drive.google.com/uc?export=download&id=1WQ9Eq9cEhfNbuzvUVzXl9s_nq-mGjGfk',
];
const SENSITIVITY = 0.8;

export const BackgroundVideo: React.FC = () => {
  const [sourceIndex, setSourceIndex] = React.useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const video = videoRef.current;
      if (!video) return;

      const duration = video.duration;
      if (!duration || isNaN(duration)) {
        prevXRef.current = e.clientX;
        return;
      }

      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * duration;
      const newTarget = Math.max(0, Math.min(duration, targetTimeRef.current + timeOffset));
      targetTimeRef.current = newTarget;

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = newTarget;
      }
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const clientX = e.touches[0].clientX;
      const video = videoRef.current;
      if (!video) return;

      const duration = video.duration;
      if (!duration || isNaN(duration)) {
        prevXRef.current = clientX;
        return;
      }

      if (prevXRef.current === null) {
        prevXRef.current = clientX;
        return;
      }

      const delta = clientX - prevXRef.current;
      prevXRef.current = clientX;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * duration;
      const newTarget = Math.max(0, Math.min(duration, targetTimeRef.current + timeOffset));
      targetTimeRef.current = newTarget;

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = newTarget;
      }
    };

    const handleTouchEnd = () => {
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      targetTimeRef.current = videoRef.current.currentTime || 0;
    }
  };

  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video) {
      isSeekingRef.current = false;
      return;
    }

    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.01) {
      video.currentTime = targetTimeRef.current;
    } else {
      isSeekingRef.current = false;
    }
  };

  const handleVideoError = () => {
    setSourceIndex((prev) => (prev < VIDEO_SOURCES.length - 1 ? prev + 1 : prev));
  };

  return (
    <video
      id="hero-background-video"
      ref={videoRef}
      src={VIDEO_SOURCES[sourceIndex]}
      muted
      playsInline
      preload="auto"
      onError={handleVideoError}
      onLoadedMetadata={handleLoadedMetadata}
      onSeeked={handleSeeked}
      className="fixed inset-0 z-0 w-full h-full object-cover hero-video-bg"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        objectFit: 'cover',
        objectPosition: '25% center',
      }}
    />
  );
};
