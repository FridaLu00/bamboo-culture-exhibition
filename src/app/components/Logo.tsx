"use client";

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  href?: string;
}

/**
 * Logo组件 - 全站右上角品牌标识
 * 性能优化：使用Next.js Image组件实现懒加载和优化
 */
export default function Logo({ href = "https://f01-1309918226.file.myqcloud.com/768/2026/03/17/%E7%AB%B9%E5%AD%90/%E5%93%81%E7%89%8C%E6%89%8B%E5%86%8C.html?x-cos-traffic-limit=10485760" }: LogoProps) {
  return (
    <div className="fixed top-6 right-6 z-50">
      <Link 
        href={href} 
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-pointer transition-all duration-300 hover:scale-110 hover:drop-shadow-lg active:scale-95"
        title="查看品牌手册"
      >
        {/* [优化] 使用Next.js Image组件实现懒加载和自动优化 */}
        <Image
          src="https://f01-1309918226.file.myqcloud.com/768/2026/03/12/%E7%AB%B9%E5%AD%90/%E7%AB%B9%E5%AD%90%E5%9B%BE%E6%96%87%E4%BB%B6/%E7%AB%B9%E9%9F%B5Logo.png?x-cos-traffic-limit=10485760"
          alt="竹韵千年"
          width={56}
          height={56}
          className="w-12 h-12 md:w-14 md:h-14 object-contain transition-all duration-300"
          loading="lazy"
          unoptimized // 外部URL，跳过Next.js图片优化
        />
      </Link>
    </div>
  );
}
