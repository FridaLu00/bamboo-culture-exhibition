"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BambooBackground from "../components/BambooBackground";
import Logo from "../components/Logo";
import TopNavbar from "../components/TopNavbar";
import VideoBackground from "../components/VideoBackground";

const crafts = [
  {
    region: "浙江安吉",
    name: "安吉竹编",
    description: "中国竹编之乡，传统技艺被列入国家级非物质文化遗产。",
    detail: "将竹剖成细如发丝的篾丝，经过数十道工序编织成精美器物。",
    history: "始于秦汉，兴于唐宋，盛于明清",
    material: "毛竹、淡竹、石竹",
    technique: "挑一压一、挑二压二、人字编、十字编",
    application: "茶具、花器、收纳、装饰",
    honor: "2008年列入国家级非遗名录",
    //icon: "https://f01-1309918226.file.myqcloud.com/768/2026/03/12/%E7%AB%B9%E5%AD%90/%E7%AB%B9%E5%AD%90%E5%9B%BE%E6%96%87%E4%BB%B6/%E5%AE%89%E5%90%89%E7%AB%B9%E7%BC%96Logo-%E7%BA%AF%E5%9B%BE%E5%BD%A2.png?x-cos-traffic-limit=10485760",
    //image: "https://f01-1309918226.file.myqcloud.com/768/2026/03/17/%E7%AB%B9%E5%AD%90/%E7%AB%B9%E5%AD%90%E5%9B%BE%E6%96%87%E4%BB%B62/%E5%AE%89%E5%90%89%E7%AB%B9%E7%BC%96.jpg?x-cos-traffic-limit=10485760",
    icon: "/picture/zhubianlogo.png",
    image: "/picture/zhubian.jpg",
  },
  {
    region: "上海嘉定",
    name: "嘉定竹刻",
    description: "以刀代笔，在竹臂、竹根上刻字作画，素有「竹刻之乡」美誉。",
    detail: "留青刻、浅刻、深刻、透雕等多种技法，层次分明，意境深远。",
    history: "始于明代正德年间，距今五百余年",
    material: "毛竹臂、竹根、竹节",
    technique: "留青刻、浅刻、深刻、透雕",
    application: "笔筒、臂搁、扇骨、摆件",
    honor: "2006年列入国家级非遗名录",
    //icon: "https://f01-1309918226.file.myqcloud.com/768/2026/03/12/%E7%AB%B9%E5%AD%90/%E7%AB%B9%E5%AD%90%E5%9B%BE%E6%96%87%E4%BB%B6/%E5%98%89%E5%BD%A2.png?x-cos-traffic-limit=10485760",
    //image: "https://f01-1309918226.file.myqcloud.com/768/2026/03/17/%E7%AB%B9%E5%AD%90/%E7%AB%B9%E5%AD%90%E5%9B%BE%E6%96%87%E4%BB%B62/%E5%98%89%E5%AE%9A%E7%AB%B9%E5%88%BB.jpg?x-cos-traffic-limit=10485760",
    icon: "/picture/zhukelogo.png",
    image: "/picture/zhuke.jpg",
  },
  {
    region: "四川泸州",
    name: "江阳油纸伞",
    description: "以竹为骨、以纸为衣，传统手工制伞技艺已有四百余年历史。",
    detail: "伞骨选用三年以上老竹，经过蒸煮、晾干、刮青等工序处理。",
    history: "起源于明末清初，兴盛于民国时期",
    material: "楠竹、岩竹、棉纸、桐油",
    technique: "劈竹、刨青、蒸煮、穿骨、糊纸、绘花、上油",
    application: "防雨、遮阳、收藏、舞蹈道具",
    honor: "2008年列入国家级非遗名录",
    //icon: "https://f01-1309918226.file.myqcloud.com/768/2026/03/14/%E7%AB%B9%E5%AD%90/%E7%AB%B9%E5%AD%90%E5%9B%BE%E6%96%87%E4%BB%B6/%E6%B1%9F%E9%98%B3%E6%B2%B9%E7%BA%B8%E4%BC%9ELogo-%E7%9C%9F%E5%AE%9E%E7%BB%93%E6%9E%84%E7%89%88.png?x-cos-traffic-limit=10485760",
    //link: "https://f01-1309918226.file.myqcloud.com/768/2026/03/14/%E7%AB%B9%E5%AD%90/%E6%B2%B9%E7%BA%B8%E4%BC%9E.html?x-cos-traffic-limit=10485760",
    //image: "https://f01-1309918226.file.myqcloud.com/768/2026/03/17/%E7%AB%B9%E5%AD%90/%E7%AB%B9%E5%AD%90%E5%9B%BE%E6%96%87%E4%BB%B62/%E6%B1%9F%E9%98%B3%E6%B2%B9%E7%BA%B8%E4%BC%9E.jpg?x-cos-traffic-limit=10485760",
    icon: "/picture/zhusanlogo.png",
    image: "/picture/zhusan.jpg",
  },
];

const modernLife = [
  { 
    name: "竹建筑设计", 
    subtitle: "Bamboo Architecture",
    intro: "绿色建筑的未来之选",
    desc: "竹材因其生长迅速、强度高、低碳环保的特性，成为现代建筑设计的理想材料。从竹结构房屋到竹装饰元素，建筑师们正在重新发现这种古老材料的现代价值。竹建筑的柔韧性和抗震性能使其在地震多发区尤为适用。",
    detail: "全球已有超过 200 座大型竹建筑项目，从越南的竹餐厅到哥伦比亚的竹社区中心，竹子正在重塑可持续建筑的边界。",
    year: "2020s",
  },
  { 
    name: "竹纤维服饰", 
    subtitle: "Bamboo Fiber Fashion",
    intro: "贴身的自然馈赠",
    desc: "竹纤维是从竹子中提取的天然纤维素纤维，具有优异的透气性和吸湿排汗功能。它柔软如丝、凉爽似麻，是夏季服装的理想选择。更重要的是，竹纤维生产过程中的碳排放远低于棉花和合成纤维。",
    detail: "竹纤维的天然抗菌特性使其成为内衣、袜子和运动服饰的理想材料， market 规模预计 2025 年达到 18 亿美元。",
    year: "2010s",
  },
  { 
    name: "竹纸环保", 
    subtitle: "Eco Bamboo Paper",
    intro: "书写可持续的未来",
    desc: "竹纸是以竹子为原料制作的纸张，具有生长周期短、纤维长、强度高的特点。与传统木浆纸相比，竹纸生产可减少森林砍伐，且竹子再生能力强，是真正的可持续书写材料。",
    detail: "竹子 3-5 年即可成材，而树木需要 10-50 年。每吨竹纸可节省 17 棵成年树木，减少 75% 的碳排放。",
    year: "2000s",
  },
  { 
    name: "竹茶道具", 
    subtitle: "Bamboo Tea Ware",
    intro: "茶道中的自然哲学",
    desc: "竹制茶具以其天然、素雅的特性深受茶道爱好者喜爱。竹茶则、茶夹、茶针等器具不仅实用，更与茶文化的精神内核相契合——自然、谦逊、质朴。每一件竹茶器都承载着匠人的心血与岁月的痕迹。",
    detail: "日本茶道中的「茶筅」、中国工夫茶的「茶则」，历经千年仍是最完美的茶具材质，无需金属的冰冷，远离塑料的浮躁。",
    year: "Traditional",
  },
];

// 竹音藏境数据 - 已注释
// const sounds = [
//   { 
//     name: "晨露竹林", 
//     subtitle: "Morning Dew Bamboo Grove",
//     quote: "「竹露滴清响，鸟鸣山更幽」",
//     desc: "清晨，竹林间鸟鸣婉转，露珠从叶尖滴落，发出清脆的声响。微风拂过，竹叶沙沙作响，如同大自然的晨曲。这是属于竹林的早安问候，唤醒沉睡的心灵。",
//     season: "春日清晨",
//     mood: "清新 · 宁静",
//   },
//   { 
//     name: "竹筒流水", 
//     subtitle: "Bamboo Water Channel",
//     quote: "「流水无心恋落花，竹筒有意传清音」",
//     desc: "清澈的泉水通过竹制水槽缓缓流淌，发出悦耳的叮咚声。水流与竹壁的碰撞，谱写出山林间的田园诗篇。这声音里有夏日的清凉，有山居的闲适。",
//     season: "夏夜纳凉",
//     mood: "清凉 · 悠然",
//   },
//   { 
//     name: "雨敲竹伞", 
//     subtitle: "Rain on Bamboo Umbrella",
//     quote: "「青箬笠，绿蓑衣，斜风细雨不须归」",
//     desc: "细雨轻敲油纸伞面，发出轻柔的哒哒声。雨中的竹林更显青翠，雨声、叶声交织成一曲动人的江南小调。这是中国人心中最诗意的听觉记忆。",
//     season: "秋雨绵绵",
//     mood: "诗意 · 缠绵",
//   },
// ];

// 现代生活板块 - 杂志式分屏排版
function ModernLifeSection({ item, index }: { item: typeof modernLife[0]; index: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <section
      ref={sectionRef}
      className={`min-h-screen flex items-center transition-all duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="w-full">
        <div className={`grid lg:grid-cols-2 min-h-screen ${isEven ? "" : "lg:grid-flow-dense"}`}>
          {/* 文字区域 - 杂志排版 */}
          <div className={`flex items-center justify-center px-8 md:px-16 py-16 ${isEven ? "" : "lg:col-start-2"}`}>
            <div className={`max-w-lg transition-all duration-1000 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
              {/* 序号与年份 */}
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-7xl font-light text-bamboo/70">0{index + 1}</span>
                <span className="text-xs text-ochre tracking-widest uppercase">{item.year}</span>
              </div>
              
              {/* 小标题 */}
              <p className="text-sm text-ochre tracking-wider mb-2">{item.subtitle}</p>
              
              {/* 主标题 */}
              <h2 className="text-4xl md:text-5xl font-bold text-bamboo mb-4">{item.name}</h2>
              
              {/* 引言 */}
              <p className="text-xl text-muted-foreground/80 italic mb-6">{item.intro}</p>
              
              {/* 分隔线 */}
              <div className="w-16 h-px bg-bamboo/30 mb-6" />
              
              {/* 详细描述 */}
              <p className="text-muted-foreground leading-relaxed mb-6">{item.desc}</p>
              
              {/* 数据/细节 */}
              <div className="pt-4 border-t border-border/30">
                <p className="text-sm text-muted-foreground/86">{item.detail}</p>
              </div>
            </div>
          </div>

          {/* 视觉区域 - 大面积留白与几何图形 */}
          <div className={`relative bg-muted/30 flex items-center justify-center ${isEven ? "" : "lg:col-start-1"} group`}>
            {/* 现代生活板块背景图片 */}
            {index >= 0 && index <= 3 && (
              <div className="absolute inset-0 z-0">
                <img
                  src={
                    index === 0
                      ? "/picture/zhujianzhu.jpg"//"https://f01-1309918226.file.myqcloud.com/768/2026/03/17/%E7%AB%B9%E5%AD%90/%E7%AB%B9%E5%AD%90%E5%9B%BE%E6%96%87%E4%BB%B62/%E7%AB%B9%E5%BB%BA%E7%AD%91.jpg?x-cos-traffic-limit=10485760"
                      : index === 1 
                      ? "/picture/zhufushi.jpg"//"https://f01-1309918226.file.myqcloud.com/768/2026/03/17/%E7%AB%B9%E5%AD%90/%E7%AB%B9%E5%AD%90%E5%9B%BE%E6%96%87%E4%BB%B62/%E7%AB%B9%E7%BA%A4%E7%BB%B4%E6%9C%8D%E9%A5%B0.jpg?x-cos-traffic-limit=10485760"
                      : index === 2
                      ? "/picture/zhuzhi.jpg"//"https://f01-1309918226.file.myqcloud.com/768/2026/03/17/%E7%AB%B9%E5%AD%90/%E7%AB%B9%E5%AD%90%E5%9B%BE%E6%96%87%E4%BB%B62/%E7%AB%B9%E7%BA%B8.jpg?x-cos-traffic-limit=10485760"
                      : "/picture/zhucha.jpg"//"https://f01-1309918226.file.myqcloud.com/768/2026/03/17/%E7%AB%B9%E5%AD%90/%E7%AB%B9%E5%AD%90%E5%9B%BE%E6%96%87%E4%BB%B62/%E7%AB%B9%E8%8C%B6%E9%81%93%E5%85%B7.jpg?x-cos-traffic-limit=10485760"
                  }
                  alt={index === 0 ? "竹建筑设计" : index === 1 ? "竹纤维服饰" : index === 2 ? "竹纸环保" : "竹茶道具"}
                  className="w-full h-full object-cover object-center opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>
            )}
            
            {/* 背景装饰 */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-bamboo rounded-full" />
              <div className="absolute bottom-1/3 right-1/4 w-48 h-48 border border-ochre/50 rounded-full" />
            </div>

            {/* 中心文字 */}
            <div className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-1000 delay-500 ${isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}>
              <span className="text-8xl md:text-9xl font-bold text-ivory/90 drop-shadow-lg block mb-4">竹</span>
              <span className="text-lg text-ivory/70 tracking-[0.5em] uppercase drop-shadow-md">{item.subtitle.split(' ')[0]}</span>
            </div>

            {/* 角落装饰数字 */}
            <div className={`absolute ${isEven ? 'bottom-8 right-8' : 'bottom-8 left-8'}`}>
              <span className="text-[120px] font-bold text-bamboo/[0.03] leading-none">{String(index + 1).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 声音地图板块 - 诗意卡片式排版 (已注释)
// function SoundSection({ item, index }: { item: typeof sounds[0]; index: number }) {
//   const sectionRef = useRef<HTMLElement>(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.unobserve(entry.target);
//         }
//       },
//       { threshold: 0.3 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className={`min-h-screen flex items-center px-6 ${index === 0 ? 'pt-8 pb-20' : 'py-20'}`}
//     >
//       <div className="max-w-4xl mx-auto w-full">
//         <div className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
//           {/* 顶部标签 */}
//           <div className="flex items-center justify-center gap-4 mb-8">
//             <span className="text-xs text-ochre tracking-widest">{item.season}</span>
//             <div className="w-12 h-px bg-border" />
//             <span className="text-xs text-muted-foreground/60">{item.mood}</span>
//           </div>

//           {/* 英文小标题 */}
//           <p className="text-xs text-muted-foreground/50 tracking-[0.3em] uppercase mb-4">{item.subtitle}</p>

//           {/* 主标题 */}
//           <h2 className="text-4xl md:text-5xl font-bold text-bamboo mb-8">{item.name}</h2>

//           {/* 诗句引用 */}
//           <blockquote className="text-2xl md:text-3xl text-ochre/80 italic mb-12 font-serif">
//             {item.quote}
//           </blockquote>

//           {/* 装饰分隔 */}
//           <div className="flex items-center justify-center gap-3 mb-12">
//             <div className="w-8 h-px bg-bamboo/30" />
//             <span className="text-bamboo/40">❦</span>
//             <div className="w-8 h-px bg-bamboo/30" />
//           </div>

//           {/* 描述文字 */}
//           <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
//             {item.desc}
//           </p>

//           {/* 序号 */}
//           <div className="mt-16">
//             <span className="text-6xl font-light text-bamboo/10">0{index + 1}</span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// 地域工艺板块组件 - 档案卡式排版
function CraftSection({ craft, index }: { craft: typeof crafts[0]; index: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: "-50px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <section
      ref={sectionRef}
      className={`min-h-screen flex items-center py-16 px-6 transition-all duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* 地域标签 - 顶部通栏 */}
        <div className={`flex items-center gap-4 mb-8 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          {craft.icon.startsWith('http') || craft.icon.startsWith('/') ? (
            <img src={craft.icon} alt={craft.name} className="w-16 h-16 object-contain" />
          ) : (
            <span className="text-6xl">{craft.icon}</span>
          )}
          <div className="flex-1">
            <div className="flex items-baseline gap-3">
              <span className="text-sm text-ochre tracking-widest">{craft.region}</span>
              <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-bamboo mt-1">
              {'link' in craft ? (
                <a 
                  href={craft.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-ochre transition-colors cursor-pointer border-b-2 border-transparent hover:border-ochre/50"
                >
                  {craft.name}
                </a>
              ) : (
                craft.name
              )}
            </h2>
          </div>
          <span className="text-7xl font-light text-bamboo/10">0{index + 1}</span>
        </div>

        {/* 主内容区 - 档案卡布局 */}
        <div className={`grid lg:grid-cols-5 gap-8 ${isEven ? '' : 'lg:grid-flow-dense'}`}>
          {/* 图片区 - 占2列 */}
          <div className={`lg:col-span-2 ${isEven ? '' : 'lg:col-start-4'}`}>
            <div className="relative rounded-xl overflow-hidden shadow-xl group">
              <div className="aspect-[3/4] relative">
                <img 
                  src={craft.image} 
                  alt={craft.name} 
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* 非遗标识 */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-ochre/90 text-white text-xs rounded-full">
                    国家级非遗
                  </span>
                </div>
                
                {/* 历史年份 - 底部 */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white/90 text-sm">{craft.history}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 信息区 - 占3列 */}
          <div className={`lg:col-span-3 ${isEven ? '' : 'lg:col-start-1'}`}>
            <div className={`space-y-6 transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {/* 主描述 */}
              <div className="bg-card/50 rounded-xl p-6 border border-border/30">
                <p className="text-lg text-muted-foreground leading-relaxed">{craft.description}</p>
              </div>

              {/* 详细信息网格 */}
              <div className="grid grid-cols-2 gap-4">
                {/* 原料 */}
                <div className="bg-muted/60 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-ochre text-xs">◈</span>
                    <span className="text-xs text-muted-foreground/96 uppercase tracking-wider">主要原料</span>
                  </div>
                  <p className="text-sm text-foreground">{craft.material}</p>
                </div>

                {/* 技法 */}
                <div className="bg-muted/60 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-ochre text-xs">◈</span>
                    <span className="text-xs text-muted-foreground/96 uppercase tracking-wider">核心技法</span>
                  </div>
                  <p className="text-sm text-foreground">{craft.technique}</p>
                </div>

                {/* 应用 */}
                <div className="bg-muted/60 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-ochre text-xs">◈</span>
                    <span className="text-xs text-muted-foreground/96 uppercase tracking-wider">主要用途</span>
                  </div>
                  <p className="text-sm text-foreground">{craft.application}</p>
                </div>

                {/* 荣誉 */}
                <div className="bg-muted/60 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-ochre text-xs">◈</span>
                    <span className="text-xs text-muted-foreground/96 uppercase tracking-wider">非遗认证</span>
                  </div>
                  <p className="text-sm text-foreground">{craft.honor}</p>
                </div>
              </div>

              {/* 技艺详解 */}
              <div className="border-l-2 border-bamboo/60 pl-4 py-2">
                <span className="text-xs text-ochre tracking-wider block mb-2">技艺特点</span>
                <p className="text-muted-foreground leading-relaxed">{craft.detail}</p>
              </div>

              {/* 底部装饰线 */}
              <div className="pt-4 flex items-center gap-3">
                <div className="w-12 h-px bg-bamboo/30" />
                <span className="text-xs text-muted-foreground">{craft.region} · 传统技艺</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 板块标题组件
function SectionHeader({ title, subtitle, index }: { title: string; subtitle: string; index: number }) {
  const headerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={headerRef}
      className="min-h-[50vh] flex items-center justify-center py-20 px-6"
    >
      <div className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <span className="text-6xl font-light text-bamboo/20 block mb-4">0{index}</span>
        <h2 className="text-3xl md:text-5xl font-bold text-bamboo mb-4">{title}</h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-lg">{subtitle}</p>
        <div className="mt-8 w-16 h-px bg-gradient-to-r from-transparent via-bamboo/50 to-transparent mx-auto" />
      </div>
    </section>
  );
}

export default function ChapterThreePage() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHeaderVisible(true);

    // const handleScroll = () => {
    //   const currentScrollY = window.scrollY;
    //   const docHeight = document.documentElement.scrollHeight;
    //   const winHeight = window.innerHeight;
    //   if (currentScrollY + winHeight > docHeight - 100 && !isExiting) {
    //     setIsExiting(true);
    //     setTimeout(() => {
    //       router.push("/");
    //     }, 800);
    //   }
    // };

    // window.addEventListener("scroll", handleScroll, { passive: true });
    // return () => window.removeEventListener("scroll", handleScroll);
  }, [router, isExiting]);

  return (
    <div className={`relative bg-background transition-opacity duration-700 ${isExiting ? "opacity-0" : "opacity-100"}`}>
      <BambooBackground />

      {/* 优化的视频背景组件 */}
      <VideoBackground
        //src="https://f01-1309918226.file.myqcloud.com/768/2026/03/25/%E7%AB%B9%E5%AD%90/%E7%A9%BA%E9%95%9C/%E5%B1%85.mp4?x-cos-traffic-limit=10485760"
        src="/video/chapter3.mp4"
        overlayOpacity={60}
        zIndex={{ video: 5, overlay: 6 }}
      />

      {/* 顶部导航栏 */}
      <TopNavbar />

      {/* Logo */}
      <Logo />

      {/* 导航 */}
      <nav className="fixed top-6 left-6 z-50">
        <Link href="/chapter2" className="text-sm text-muted-foreground hover:text-bamboo transition-colors">
          ← 第三篇章
        </Link>
      </nav>

      {/* 页面标题区域 - 全屏居中 */}
      <header className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        <div className={`text-center transition-all duration-1000 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block px-4 py-2 text-sm tracking-widest text-ochre border border-ochre/30 rounded-full mb-8">
            第四篇章
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-bamboo">
            居游有竹
          </h1>
          <p className="text-muted-foreground/60 text-lg tracking-widest mb-6">
            当代之承
          </p>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12">
            从竹编匠心到诗意栖居，传统技艺的现代新生
          </p>
          <div className="animate-bounce">
            <span className="text-muted-foreground/40 text-3xl">↓</span>
          </div>
        </div>
      </header>

      {/* 地域工艺 - 三个滚动板块 */}
      <main className="relative z-10">
        {/* 竹与非遗标题 */}
        <div id="heritage" className="py-16 px-6 text-center">
          <span className="inline-block px-4 py-1.5 text-xs tracking-widest text-ochre border border-ochre/30 rounded-full mb-4">
            匠心传承
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-bamboo mb-3">竹与非遗</h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            三项国家级非物质文化遗产，千年竹艺的匠心传承
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-12 h-px bg-bamboo/30" />
            <span className="text-bamboo/40 text-lg">◆</span>
            <div className="w-12 h-px bg-bamboo/30" />
          </div>
        </div>

        {crafts.map((craft, index) => (
          <CraftSection key={craft.region} craft={craft} index={index} />
        ))}
      </main>

      {/* 现代生活标题 */}
      <section id="modern" className="relative z-10 py-16 px-6 text-center">
        <span className="inline-block px-4 py-1.5 text-xs tracking-widest text-ochre border border-ochre/30 rounded-full mb-4">
          当代演绎
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-bamboo mb-3">竹与当代生活</h2>
        <p className="text-muted-foreground max-w-lg mx-auto text-sm">
          从传统到现代，竹艺在当代生活中的创新演绎
        </p>
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="w-12 h-px bg-bamboo/30" />
          <span className="text-bamboo/40 text-lg">◆</span>
          <div className="w-12 h-px bg-bamboo/30" />
        </div>
      </section>

      {/* 现代生活 - 四个杂志式分屏板块 */}
      <section className="relative z-10">
        {modernLife.map((item, index) => (
          <ModernLifeSection key={item.name} item={item} index={index} />
        ))}
      </section>

      {/* 声音地图标题 - 已注释 */}
      {/* <section id="sound" className="relative z-10 pt-48 pb-0 px-6 text-center">
        <span className="inline-block px-4 py-1.5 text-xs tracking-widest text-ochre border border-ochre/30 rounded-full mb-4">
          声景诗韵
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-bamboo mb-3">竹音藏境</h2>
        <p className="text-muted-foreground max-w-lg mx-auto text-sm">
          聆听竹林间的自然之声，感受东方美学的听觉维度
        </p>
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="w-12 h-px bg-bamboo/30" />
          <span className="text-bamboo/40 text-lg">◆</span>
          <div className="w-12 h-px bg-bamboo/30" />
        </div>
      </section>

      {/* 声音地图 - 三个诗意卡片板块 - 已注释 */}
      {/* <section className="relative z-10">
        {sounds.map((item, index) => (
          <SoundSection key={item.name} item={item} index={index} />
        ))}
      </section> */}

      {/* 底部空白背景 */}
      <section className="relative z-10 min-h-[40vh] flex items-center justify-center">
        <div className="text-center">
          <span className="text-8xl font-light text-bamboo/5">竹</span>
        </div>
      </section>

      {/* 结尾引导 
      <section className="relative z-10 py-32 px-6">
        <div className="text-center">
          <p className="text-muted-foreground/50 text-sm mb-4">向下滚动，重返竹林起点</p>
          <div className="animate-bounce">
            <span className="text-muted-foreground/40 text-xl">↓</span>
          </div>
        </div>
      </section>*/}

      {/* 底部固定导航 */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <Link href="/" className="flex flex-col items-center text-muted-foreground/60 hover:text-bamboo transition-colors">
          <span className="text-xs mb-1">返回首页</span>
          <span className="text-lg">↻</span>
        </Link>
      </div>
    </div>
  );
}
