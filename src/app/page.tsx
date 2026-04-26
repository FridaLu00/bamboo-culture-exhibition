"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import BambooBackground from "./components/BambooBackground";
import Logo from "./components/Logo";
import VideoBackground from "./components/VideoBackground";

export default function HeroPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [windowHeight, setWindowHeight] = useState(800);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  // [修复] 使用ref存储isExiting状态，避免effect依赖导致timer被清除
  const isExitingRef = useRef(false);

  useEffect(() => {
    // 在客户端获取窗口高度
    setWindowHeight(window.innerHeight);
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // 当滚动超过一定距离（内容完全显示后），触发页面切换
      // [修复] 使用ref检查状态，避免闭包问题
      if (currentScrollY > window.innerHeight * 1.2 && !isExitingRef.current) {
        isExitingRef.current = true;
        setIsExiting(true);
        timerRef.current = setTimeout(() => {
          router.push("/timeline");
        }, 800);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      // 清理setTimeout，防止内存泄漏
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [router]);

  // [优化] 使用useMemo缓存计算结果，避免每次渲染重新计算
  const screenProgress = useMemo(() => {
    const screenOpenThreshold = windowHeight * 0.4;
    return Math.min(scrollY / screenOpenThreshold, 1);
  }, [scrollY, windowHeight]);
  
  const isScreenFullyOpen = screenProgress >= 1;
  
  // [优化] 使用useMemo缓存内容显示相关计算
  const { contentOpacity, contentTranslateY } = useMemo(() => {
    const screenOpenThreshold = windowHeight * 0.4;
    const contentStartScroll = screenOpenThreshold;
    const contentShowProgress = isScreenFullyOpen 
      ? Math.min((scrollY - contentStartScroll) / (windowHeight * 0.5), 1)
      : 0;
    return {
      contentOpacity: contentShowProgress,
      contentTranslateY: 30 * (1 - contentShowProgress)
    };
  }, [scrollY, windowHeight, isScreenFullyOpen]);

  return (
    <div 
      ref={containerRef}
      className={`relative min-h-[250vh] bg-background transition-opacity duration-700 ${isExiting ? "opacity-0" : "opacity-100"}`}
    >
      {/* 优化的视频背景组件 */}
      <VideoBackground
        src="https://f01-1309918226.file.myqcloud.com/768/2026/03/25/%E7%AB%B9%E5%AD%90/%E7%A9%BA%E9%95%9C/%E5%BC%80.mp4"
        overlayOpacity={30}
        zIndex={{ video: 0, overlay: 5 }}
        className="transition-opacity duration-500 will-change-transform"
        style={{ opacity: screenProgress > 0.05 ? Math.min(screenProgress * 1.5, 1) : 0 }}
      />

      {/* 竹林背景 - 前置在视频前面 */}
      <div className="fixed inset-0 z-10">
        <BambooBackground />
      </div>

      {/* Logo */}
      <Logo />

      {/* 中式屏风遮罩 */}
      <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
        {/* 左侧屏风 */}
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#2D4A3E] to-[#1A2F28] transition-transform duration-75 ease-out"
          style={{
            width: "50%",
            transform: `translateX(${-screenProgress * 100}%)`,
          }}
        >
          {/* 屏风装饰 */}
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
              {/* 竹纹装饰 */}
              {[0, 1, 2, 3].map((i) => (
                <g key={i} opacity={0.4}>
                  <line x1={80 + i * 80} y1="100" x2={80 + i * 80} y2="700" stroke="#4A6B5A" strokeWidth="3" />
                  <path d={`M${80 + i * 80},200 Q${60 + i * 80},180 40,160`} fill="none" stroke="#4A6B5A" strokeWidth="2" />
                  <path d={`M${80 + i * 80},300 Q${100 + i * 80},280 120,260`} fill="none" stroke="#4A6B5A" strokeWidth="2" />
                </g>
              ))}
              {/* 边框 */}
              <rect x="20" y="20" width="360" height="760" fill="none" stroke="#A0522D" strokeWidth="4" />
              <rect x="40" y="40" width="320" height="720" fill="none" stroke="#A0522D" strokeWidth="2" />
            </svg>
          </div>
          {/* 左屏风文字 */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 text-ivory/60 text-6xl font-bold writing-vertical">
            竹韵
          </div>
        </div>

        {/* 右侧屏风 */}
        <div 
          className="absolute top-0 right-0 h-full bg-gradient-to-l from-[#2D4A3E] to-[#1A2F28] transition-transform duration-75 ease-out"
          style={{
            width: "50%",
            transform: `translateX(${screenProgress * 100}%)`,
          }}
        >
          {/* 屏风装饰 */}
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
              {[0, 1, 2, 3].map((i) => (
                <g key={i} opacity={0.4}>
                  <line x1={320 - i * 80} y1="100" x2={320 - i * 80} y2="700" stroke="#4A6B5A" strokeWidth="3" />
                  <path d={`M${320 - i * 80},250 Q${340 - i * 80},230 360,210`} fill="none" stroke="#4A6B5A" strokeWidth="2" />
                  <path d={`M${320 - i * 80},400 Q${300 - i * 80},380 280,360`} fill="none" stroke="#4A6B5A" strokeWidth="2" />
                </g>
              ))}
              <rect x="20" y="20" width="360" height="760" fill="none" stroke="#A0522D" strokeWidth="4" />
              <rect x="40" y="40" width="320" height="720" fill="none" stroke="#A0522D" strokeWidth="2" />
            </svg>
          </div>
          {/* 右屏风文字 */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 text-ivory/60 text-6xl font-bold writing-vertical">
            千年
          </div>
        </div>

        {/* 提示文字 - 在屏风打开前显示 */}
        <div 
          className="absolute bottom-20 left-0 right-0 flex flex-col items-center justify-center transition-all duration-300"
          style={{ 
            opacity: isScreenFullyOpen ? 0 : 1,
            transform: isScreenFullyOpen ? 'translateY(20px)' : 'translateY(0)'
          }}
        >
          <p className="text-ivory/60 text-sm tracking-widest mb-2">向下滚动</p>
          <p className="text-ivory/40 text-xs">拉开屏风</p>
        </div>
      </div>

      {/* 主内容 - 起始页 */}
      <main 
        className="fixed inset-0 z-40 flex flex-col items-center justify-center pointer-events-none"
        style={{ 
          opacity: contentOpacity,
          transform: `translateY(${contentTranslateY}px)`,
          transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
        }}
      >
        <div className="text-center px-6 max-w-4xl mx-auto pointer-events-auto">
          <div className="mb-8">
            <span className="inline-block px-4 py-1.5 text-xs tracking-[0.3em] font-bold border rounded-full backdrop-blur-sm" style={{ color: "#8B4513", borderColor: "#8B4513", backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
              线上数字展览
            </span>
          </div>

          <h1 className="mb-6">
            <span 
              className="block text-7xl md:text-9xl font-bold tracking-wider mb-4"
              style={{ color: "var(--bamboo)" }}
            >
              竹韵
            </span>
            <span className="block text-lg md:text-xl tracking-[0.5em] font-bold drop-shadow-lg" style={{ color: "#8B4513" }}>
              中国千年竹子传统文化线上展
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-12 tracking-widest font-bold" style={{ color: "var(--bamboo)" }}>
            格物致知，竹见天地
          </p>

          <div className="max-w-2xl mx-auto mb-16">
            <p className="text-base leading-loose font-bold drop-shadow-lg" style={{ color: "#8B4513" }}>
              以历史脉络为经，以生活美学为纬，
              <br />
              通过轻量化、沉浸式、强叙事的数字设计，
              <br />
              构建一个可游、可听、可感的云端竹林会客厅。
            </p>
          </div>

          {/* 底部引导 */}
          <div 
            className="transition-all duration-500"
            style={{ opacity: contentOpacity > 0.8 ? 1 : 0 }}
          >
            <div className="flex flex-col items-center gap-2 animate-bounce">
              <span className="text-xs font-bold drop-shadow-md" style={{ color: "var(--bamboo)" }}>继续探索</span>
              <span className="text-lg" style={{ color: "var(--bamboo)" }}>↓</span>
            </div>
          </div>
        </div>
      </main>

      {/* 空白区域用于滚动触发 - 增加高度以支持更多滚动 */}
      <div className="h-[250vh]" />

      <style>{`
        .writing-vertical {
          writing-mode: vertical-rl;
          text-orientation: upright;
        }
      `}</style>
    </div>
  );
}
