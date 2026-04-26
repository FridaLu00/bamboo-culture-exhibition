"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

/**
 * TopNavbar - 顶部居中导航栏
 * 显示：时空竹谱、竹简汗青、墨筠写神、居游有竹
 * 当前页面高亮显示
 * 时空竹谱、竹简汗青支持下拉菜单导航
 */
const navItems = [
  { label: "时空竹谱", href: "/timeline", hasDropdown: true },
  { label: "竹韵万象", href: "/chapter0", hasDropdown: true },
  { label: "竹简汗青", href: "/chapter1", hasDropdown: true },
  { label: "墨筠写神", href: "/chapter2", hasDropdown: true },
  { label: "居游有竹", href: "/chapter3", hasDropdown: true },
];

// 时空竹谱下拉菜单项
const timelineSubItems = [
  { label: "史前", href: "/timeline#史前" },
  { label: "战国", href: "/timeline#战国" },
  { label: "魏晋", href: "/timeline#魏晋" },
  { label: "唐代", href: "/timeline#唐代" },
  { label: "宋代", href: "/timeline#宋代" },
  { label: "明清", href: "/timeline#明清" },
];

// 竹韵万象下拉菜单项
const chapter0SubItems = [
  { label: "竹韵九州", href: "/chapter0#distribution" },
  { label: "竹影风物", href: "/chapter0#ecology" },
  { label: "竹语空声", href: "/chapter0#sound" },
];

// 竹简汗青下拉菜单项
const chapter1SubItems = [
  { label: "竹与书写", href: "/chapter1#writing" },
  { label: "竹与营造", href: "/chapter1#building" },
  { label: "竹与交通", href: "/chapter1#transport" },
];

// 墨筠写神下拉菜单项
const chapter2SubItems = [
  { label: "竹林七贤", href: "/chapter2#sages" },
  { label: "墨竹谱系", href: "/chapter2#paintings" },
  { label: "竹影诗韵", href: "/chapter2#poetry" },
];

// 居游有竹下拉菜单项
const chapter3SubItems = [
  { label: "竹与非遗", href: "/chapter3#heritage" },
  { label: "竹与当代生活", href: "/chapter3#modern" },
];

export default function TopNavbar() {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getSubItems = (href: string) => {
    if (href === "/timeline") return timelineSubItems;
    if (href === "/chapter0") return chapter0SubItems;
    if (href === "/chapter1") return chapter1SubItems;
    if (href === "/chapter2") return chapter2SubItems;
    if (href === "/chapter3") return chapter3SubItems;
    return [];
  };

  return (
    <nav 
      className="fixed top-6 left-1/2 -translate-x-1/2 z-40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveDropdown(null);
      }}
    >
      {/* 展开状态 - 初始状态或鼠标悬停时 */}
      {(isHovered || !isScrolled) && (
        <div className="flex items-center gap-1 px-4 py-2 bg-background/80 backdrop-blur-md rounded-full border border-border/50 shadow-lg">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const isDropdownActive = activeDropdown === item.href;
            const subItems = getSubItems(item.href);
            
            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.href)}
                onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`
                    relative px-4 py-2 text-sm font-medium rounded-full
                    transition-all duration-300 ease-out block
                    ${isActive 
                      ? "text-primary-foreground bg-bamboo shadow-md" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }
                  `}
                >
                  {item.label}
                </Link>
                
                {/* 下拉菜单 */}
                {item.hasDropdown && isDropdownActive && subItems.length > 0 && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                    <div className="flex flex-col gap-1 px-2 py-2 bg-background/95 backdrop-blur-md rounded-2xl border border-border/50 shadow-xl min-w-[90px]">
                      {subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="
                            px-3 py-1.5 text-xs font-medium text-center rounded-full
                            text-muted-foreground hover:text-foreground hover:bg-muted
                            transition-all duration-200 whitespace-nowrap
                          "
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 收起状态 - 5段短线首尾相连（滚动后） */}
      {!isHovered && isScrolled && (
        <div className="flex items-center gap-3 px-6 py-1 bg-background/60 backdrop-blur-md rounded-full border border-border/30 shadow-sm">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative w-6 h-1 rounded-full
                  transition-all duration-300 ease-out
                  ${isActive 
                    ? "bg-bamboo shadow-md scale-110" 
                    : "bg-muted-foreground/40 hover:bg-muted-foreground/60 hover:scale-110"
                  }
                `}
                title={item.label}
              />
            );
          })}
        </div>
      )}
    </nav>
  );
}
