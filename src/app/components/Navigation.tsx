"use client";

import { useState, useEffect } from "react";

interface NavigationProps {
  activeSection: number;
  onNavigate: (index: number) => void;
}

const navItems = [
  { label: "序", title: "时空竹谱" },
  { label: "轴", title: "千年脉络" },
  { label: "一", title: "竹简汗青" },
  { label: "二", title: "墨筠写神" },
  { label: "三", title: "居游有竹" },
  { label: "终", title: "竹简留言" },
];

export default function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-50 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"
      }`}
    >
      <div className="flex flex-col gap-4">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => onNavigate(index)}
            className="group flex items-center gap-3"
            title={item.title}
          >
            <span
              className={`text-xs tracking-widest transition-all duration-300 ${
                activeSection === index
                  ? "text-ochre font-medium"
                  : "text-muted-foreground/50 group-hover:text-muted-foreground"
              }`}
            >
              {item.label}
            </span>
            <span
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === index
                  ? "bg-ochre scale-125"
                  : "bg-border group-hover:bg-muted-foreground/50"
              }`}
            />
          </button>
        ))}
      </div>
    </nav>
  );
}
