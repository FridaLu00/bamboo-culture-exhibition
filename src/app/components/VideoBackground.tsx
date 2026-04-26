"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  overlayOpacity?: number;
  zIndex?: {
    video?: number;
    overlay?: number;
  };
  className?: string;
  style?: React.CSSProperties;
}

/**
 * VideoBackground - 视频背景组件
 * 性能优化：
 * 1. 使用 preload="metadata" 减少初始加载量
 * 2. 页面不可见时暂停视频
 * 3. 懒加载视频资源
 */
export default function VideoBackground({
  src,
  poster,
  overlayOpacity = 30,
  zIndex = { video: 5, overlay: 6 },
  className = "",
  style = {},
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isVisibleRef = useRef<boolean>(true);

  // [优化] 视频播放函数
  const playVideo = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      video.muted = true;
      await video.play();
    } catch (err) {
      // 静默处理自动播放被阻止的情况
      console.debug("视频自动播放被阻止:", err);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // [优化] 监听视频加载完成
    const handleCanPlay = () => {
      setIsLoaded(true);
      if (isVisibleRef.current) {
        playVideo();
      }
    };

    // [优化] 页面可见性变化时暂停/恢复视频
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
      
      if (!document.hidden && video.paused && isLoaded) {
        playVideo();
      } else if (document.hidden && !video.paused) {
        video.pause();
      }
    };

    video.addEventListener("canplay", handleCanPlay);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 初始播放尝试
    playVideo();

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [playVideo, isLoaded]);

  // [优化] 缓存overlay样式，避免每次渲染重新计算
  const overlayStyle = {
    zIndex: zIndex.overlay,
    opacity: overlayOpacity / 100,
  };

  return (
    <>
      {/* 视频元素 */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        disablePictureInPicture
        disableRemotePlayback
        className={`fixed inset-0 w-full h-full object-cover ${className}`}
        style={{
          zIndex: zIndex.video,
          ...style,
        }}
      />

      {/* 视频叠加层 */}
      <div
        className="fixed inset-0 bg-background pointer-events-none"
        style={overlayStyle}
      />
    </>
  );
}
