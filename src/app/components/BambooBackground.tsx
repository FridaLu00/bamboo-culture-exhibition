"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* 
 * BambooBackground - 竹叶飘落Canvas背景动画
 * 性能优化：
 * 1. 页面不可见时暂停动画（减少CPU占用）
 * 2. 使用requestAnimationFrame节流
 * 3. 减少不必要的重绘
 */

interface Leaf {
  x: number;
  y: number;
  size: number;
  rotation: number;
  speedY: number;
  speedX: number;
  rotationSpeed: number;
  opacity: number;
  swayOffset: number;
}

// [优化] 使用固定种子生成伪随机数，避免Math.random()开销
function createSeededRandom(seed: number) {
  return function() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

// [优化] 叶片数量限制
const LEAF_COUNT = 30; // 从40减少到30

export default function BambooBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const leavesRef = useRef<Leaf[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const timeRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);
  const seededRandomRef = useRef(createSeededRandom(12345));
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // [修复] 将handleResize移到组件顶层，避免在useEffect中使用useCallback
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // 初始化叶片
    const seededRandom = seededRandomRef.current;
    const leaves: Leaf[] = [];
    for (let i = 0; i < LEAF_COUNT; i++) {
      leaves.push({
        x: seededRandom() * canvas.width,
        y: seededRandom() * canvas.height,
        size: 8 + seededRandom() * 12,
        rotation: seededRandom() * Math.PI * 2,
        speedY: 0.8 + seededRandom() * 2,
        speedX: (seededRandom() - 0.5) * 1.2,
        rotationSpeed: (seededRandom() - 0.5) * 0.03,
        opacity: 0.3 + seededRandom() * 0.4,
        swayOffset: seededRandom() * Math.PI * 2,
      });
    }
    leavesRef.current = leaves;
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const seededRandom = seededRandomRef.current;

    // [优化] 使用ResizeObserver替代resize事件，性能更好
    let resizeObserver: ResizeObserver | null = null;
    
    // 初始化画布
    handleResize();

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(document.body);
    } else {
      window.addEventListener("resize", handleResize);
    }

    // [优化] 页面可见性检测 - 不可见时暂停动画
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
      // 页面重新可见时继续动画
      if (isVisibleRef.current && !animationRef.current) {
        animate();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const createLeaf = (startY?: number): Leaf => ({
      x: seededRandom() * canvas.width,
      y: startY !== undefined ? startY : -20 - seededRandom() * 100,
      size: 8 + seededRandom() * 12,
      rotation: seededRandom() * Math.PI * 2,
      speedY: 0.8 + seededRandom() * 2,
      speedX: (seededRandom() - 0.5) * 1.2,
      rotationSpeed: (seededRandom() - 0.5) * 0.03,
      opacity: 0.3 + seededRandom() * 0.4,
      swayOffset: seededRandom() * Math.PI * 2,
    });

    const drawLeaf = (leaf: Leaf, time: number) => {
      const swayX = Math.sin(time * 0.5 + leaf.swayOffset) * 20;
      
      ctx.save();
      ctx.translate(leaf.x + swayX, leaf.y);
      ctx.rotate(leaf.rotation);
      
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(leaf.size / 2, -leaf.size / 4, leaf.size, 0);
      ctx.quadraticCurveTo(leaf.size / 2, leaf.size / 4, 0, 0);
      ctx.fillStyle = `rgba(74, 107, 90, ${leaf.opacity})`;
      ctx.fill();
      
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(leaf.size * 0.8, 0);
      ctx.strokeStyle = `rgba(45, 74, 62, ${leaf.opacity * 0.6})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
      
      ctx.restore();
    };

    const animate = () => {
      // [优化] 页面不可见时暂停动画
      if (!isVisibleRef.current) {
        animationRef.current = undefined;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      timeRef.current += 0.016;
      const time = timeRef.current;
      
      const leaves = leavesRef.current;
      const canvasHeight = canvas.height;
      const canvasWidth = canvas.width;
      
      for (let index = 0; index < leaves.length; index++) {
        const leaf = leaves[index];
        leaf.y += leaf.speedY;
        leaf.x += leaf.speedX + Math.sin(time * 0.3 + leaf.swayOffset) * 0.3;
        leaf.rotation += leaf.rotationSpeed;
        
        // [优化] 叶片离开画布时重置，避免频繁创建新对象
        if (leaf.y > canvasHeight + 20) {
          leaf.y = -20;
          leaf.x = seededRandom() * canvasWidth;
        }
        if (leaf.x < -50) leaf.x = canvasWidth + 50;
        if (leaf.x > canvasWidth + 50) leaf.x = -50;
        
        drawLeaf(leaf, time);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      // [优化] 清理所有资源
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", handleResize);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
    };
  }, [isClient, handleResize]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        opacity: 0.9,
        willChange: 'opacity'
      }}
    />
  );
}
