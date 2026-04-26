"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BambooBackground from "../components/BambooBackground";
import Logo from "../components/Logo";
import TopNavbar from "../components/TopNavbar";
import VideoBackground from "../components/VideoBackground";

const exhibits = [
  {
    id: "writing",
    title: "竹与书写",
    subtitle: "汗青留史",
    era: "先秦·战国",
    description: "战国楚竹简承载着先秦典籍的珍贵文字。竹简由竹片串联而成，每片宽约1厘米，长约20厘米。文字以墨书写，内容涵盖经史子集，是研究先秦文化的重要实物资料。",
    detail: "从甲骨文到竹简，书写材料的演变标志着文明的飞跃。竹简轻便易得，使知识得以广泛传播。孔子读《易》，韦编三绝，正是竹简时代的生动写照。",
    //image: "https://f01-1309918226.file.myqcloud.com/768/2026/03/12/%E7%AB%B9%E5%AD%90/%E7%AB%B9%E5%AD%90%E5%9B%BE%E6%96%87%E4%BB%B6/zhu.png?x-cos-traffic-limit=10485760",
    image: "/picture/shuxie.png",
  },
  {
    id: "building",
    title: "竹与营造",
    subtitle: "骨血构架",
    era: "宋·明",
    description: "竹篾在中国古建筑中扮演着「钢筋」的角色，构建出柔韧而坚固的空间。竹材抗拉强度可与钢材媲美，古代工匠将竹篾编入墙体，形成「竹筋土墙」，兼具韧性与透气性，在地震多发区尤为适用。",
    detail: "《营造法式》中记载了竹材在建筑中的多种应用。竹子的中空结构赋予其极佳的强度重量比，使之成为传统建筑中不可或缺的材料。",
    //image: "https://f01-1309918226.file.myqcloud.com/768/2026/03/17/%E7%AB%B9%E5%AD%90/%E7%AB%B9%E5%AD%90%E5%9B%BE%E6%96%87%E4%BB%B62/%E7%AB%B9%E4%BA%AD%E5%AD%90_upscayl_2x_upscayl-standard-4x.png?x-cos-traffic-limit=10485760",
    image: "/picture/yingzao.png", 
  },
  {
    id: "transport",
    title: "竹与交通",
    subtitle: "江湖之便",
    era: "唐·宋",
    description: "竹筏、竹轿等竹制交通工具，承载着古人的出行智慧与地域风情。竹筏轻便灵活，是南方水乡的主要交通工具；竹轿则是山地丘陵地区的特色，竹的弹性使乘坐更为舒适。",
    detail: "李白乘舟将欲行，忽闻岸上踏歌声。诗中的「舟」在长江流域多为竹筏。竹材的浮力与韧性，使其成为水上交通的理想选择，至今仍在部分景区使用。",
    //image: "https://f01-1309918226.file.myqcloud.com/768/2026/03/17/%E7%AB%B9%E5%AD%90/%E7%AB%B9%E5%AD%90%E5%9B%BE%E6%96%87%E4%BB%B62/%E7%AB%B9%E4%BA%A4%E9%80%9Ajpg.jpg?x-cos-traffic-limit=10485760",
    image: "/picture/jiaotong.jpg",
  },
];

// 竹与生态数据 - 已注释
// const bambooEcology = [
//   {
//     id: "maozhu",
//     name: "毛竹（楠竹）",
//     location: "主要分布在长江流域以南的亚热带地区，如浙江、福建、江西、湖南、四川等省份，集中在武夷山、南岭等山区。",
//     usage: "建筑用材（竹楼、脚手架）、竹制家具、造纸原料、竹笋食用；也是重要的生态防护林，固土保水效果显著。",
//     characteristic: "抗拉强度可达钢材的1/2，抗压强度接近混凝土；纤维密度高，弹性模量约为10-12 GPa，可承受自身重量30倍的荷载，弯曲变形后能快速恢复，零下20℃仍能保持良好韧性，生长速度极快（最快每天长1米）。",
//   },
//   {
//     id: "jianzhu",
//     name: "箭竹",
//     location: "主要分布在西南高山地区，集中于四川、云南、甘肃、陕西的大熊猫栖息地，海拔1500-3800米的高山针叶林带。",
//     usage: "大熊猫的主要食物来源（占其食谱的99%）；可制作箭杆、手杖、编织品；高山水土保持的关键物种，耐寒性强。",
//     characteristic: "茎秆壁厚/直径比高（约0.3），抗风折能力极强，能适应高山大风环境；纤维韧性好，断裂伸长率约3-5%，低温环境下（-10℃）仍保持柔韧性，不易脆裂，根系发达，抗倒伏能力突出。",
//   },
//   {
//     id: "cizhu",
//     name: "慈竹（甜慈）",
//     location: "主要分布在西南地区，以四川盆地、重庆、贵州、云南为主，喜温暖湿润的河谷、平原地带。",
//     usage: "编织（竹席、竹篮、竹编工艺品）、造纸、药用（竹叶清热）、园林绿化；竹笋可食用，口感清甜。",
//     characteristic: "茎秆细长且柔韧性极佳，可弯曲成弧形而不断裂，断裂强度约80-100 MPa；纤维细长（长度1.5-3 mm），是编织的理想材料，耐腐性强，在湿润环境下使用寿命可达5-8年。",
//   },
// ];

// 竹简风格板块组件
function ExhibitSection({ exhibit, index }: { exhibit: typeof exhibits[0]; index: number }) {
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

  return (
    <section
      ref={sectionRef}
      id={exhibit.id}
      className={`py-16 px-6 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
    >
      <div className="max-w-5xl mx-auto">
        {/* 竹简卷轴装饰顶部 */}
        <div className="relative">
          {/* 左侧竹节标记 */}
          <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col items-center py-4">
            <div className="w-3 h-3 rounded-full bg-ochre/40" />
            <div className="w-px flex-1 bg-gradient-to-b from-ochre/40 via-ochre/20 to-ochre/40 my-2" />
            <div className="w-3 h-3 rounded-full bg-ochre/40" />
          </div>

          {/* 内容区域 */}
          <div className="ml-12 pl-8 border-l border-dashed border-bamboo/30">
            {/* 年代标签 */}
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 text-xs tracking-widest text-ochre bg-ochre/10 rounded-full">
                {exhibit.era}
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-ochre/30 to-transparent" />
            </div>

            {/* 标题区 */}
            <div className="mb-8">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-5xl font-serif text-bamboo/20">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-bamboo mb-1">
                    {exhibit.title}
                  </h2>
                  <p className="text-ochre text-sm tracking-[0.3em]">{exhibit.subtitle}</p>
                </div>
              </div>
            </div>

            {/* 图文内容 - 杂志风格 */}
            <div className="grid md:grid-cols-5 gap-8">
              {/* 图片 - 占据2列 */}
              <div className="md:col-span-2">
                <div className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer transition-shadow duration-500 hover:shadow-2xl hover:shadow-bamboo/20">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img
                      src={exhibit.image}
                      alt={exhibit.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-60" />
                  </div>
                  {/* 图片装饰框 */}
                  <div className="absolute inset-3 border border-white/20 rounded pointer-events-none transition-all duration-500 group-hover:border-white/50 group-hover:inset-4" />
                </div>
              </div>

              {/* 文字 - 占据3列 */}
              <div className="md:col-span-3 flex flex-col justify-center">
                <p className="text-muted-foreground leading-relaxed text-base mb-6">
                  {exhibit.description}
                </p>
                <div className="p-4 bg-muted/30 rounded-lg border-l-2 border-ochre/50">
                  <p className="text-sm text-muted-foreground/80 leading-relaxed italic">
                    {exhibit.detail}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧竹节标记 */}
          <div className="absolute right-0 top-0 bottom-0 w-8 flex flex-col items-center py-4">
            <div className="w-3 h-3 rounded-full bg-ochre/40" />
            <div className="w-px flex-1 bg-gradient-to-b from-ochre/40 via-ochre/20 to-ochre/40 my-2" />
            <div className="w-3 h-3 rounded-full bg-ochre/40" />
          </div>
        </div>

        {/* 分隔装饰 */}
        {index < exhibits.length - 1 && (
          <div className="flex items-center justify-center gap-4 mt-16 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-bamboo/30" />
            <div className="w-2 h-2 rotate-45 border border-bamboo/40" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-bamboo/30" />
          </div>
        )}
      </div>
    </section>
  );
}

// 竹与生态板块组件 - 杂志式上下布局 (已注释)
// function BambooEcologySection() {
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
//       { threshold: 0.05 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   // 竹子图片
//   const bambooImages = [
//     "https://f01-1309918226.file.myqcloud.com/768/2026/03/20/%E7%AB%B9%E5%AD%90/%E7%AB%B9%E5%AD%90%E5%9B%BE%E6%96%87%E4%BB%B62/true.jpg?x-cos-traffic-limit=10485760",
//     "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80",
//     "https://images.unsplash.com/photo-1531875456634-3235177e94e4?w=800&q=80"
//   ];

//   return (
//     <section
//       ref={sectionRef}
//       id="ecology"
//       className="relative z-10"
//     >
//       {/* 标题区域 - 全屏高度 */}
//       <div className={`min-h-[60vh] flex items-center justify-center px-6 py-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
//         <div className="text-center max-w-2xl">
//           <div className="flex items-center justify-center gap-4 mb-6">
//             <div className="w-16 h-px bg-gradient-to-r from-transparent to-ochre/50" />
//             <span className="text-xs tracking-[0.4em] text-ochre uppercase">Ecology</span>
//             <div className="w-16 h-px bg-gradient-to-l from-transparent to-ochre/50" />
//           </div>
//           <h2 className="text-5xl md:text-7xl font-bold text-bamboo mb-6 tracking-tight">
//             竹与生态
//           </h2>
//           <p className="text-lg text-muted-foreground leading-relaxed mb-8">
//             三种典型竹种，展现竹类植物的多样性与生态价值
//           </p>
//           <div className="flex items-center justify-center gap-3">
//             <span className="w-2 h-2 rounded-full bg-bamboo/40" />
//             <span className="w-2 h-2 rounded-full bg-ochre/40" />
//             <span className="w-2 h-2 rounded-full bg-emerald-500/40" />
//           </div>
//         </div>
//       </div>

//       {/* 三个竹子板块 - 垂直排列 */}
//       <div className="space-y-0">
//         {bambooEcology.map((bamboo, index) => (
//           <article
//             key={bamboo.id}
//             className={`min-h-screen flex items-center transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
//             style={{ transitionDelay: `${index * 200}ms` }}
//           >
//             <div className={`w-full grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
//               {/* 图片区域 */}
//               <div className={`relative h-[50vh] lg:h-screen overflow-hidden ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
//                 <div className="absolute inset-0 bg-gradient-to-br from-bamboo/10 to-ochre/10" />
//                 <img
//                   src={bambooImages[index]}
//                   alt={bamboo.name}
//                   className="w-full h-full object-cover object-center opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-700"
//                 />
//                 {/* 图片叠加装饰 - 根据板块奇偶性调整渐变方向 */}
//                 <div className={`absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent lg:bg-gradient-to-r ${index % 2 === 1 ? 'lg:to-transparent lg:from-background/80' : 'lg:from-transparent lg:to-background/80'} lg:via-transparent`} />
//                 {/* 编号装饰 */}
//                 <div className="absolute top-8 left-8 text-8xl font-bold text-white/20">
//                   {String(index + 1).padStart(2, '0')}
//                 </div>
//               </div>

//               {/* 内容区域 */}
//               <div className={`flex items-center px-6 lg:px-16 py-12 lg:py-0 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
//                 <div className="max-w-lg">
//                   {/* 标签 */}
//                   <div className="flex items-center gap-3 mb-6">
//                     <div className="w-8 h-px bg-ochre" />
//                     <span className="text-xs tracking-[0.3em] text-ochre uppercase">
//                       {index === 0 ? 'Phyllostachys edulis' : index === 1 ? 'Fargesia sp.' : 'Neosinocalamus affinis'}
//                     </span>
//                   </div>

//                   {/* 名称 */}
//                   <h3 className="text-3xl md:text-4xl font-bold text-bamboo mb-8">
//                     {bamboo.name}
//                   </h3>

//                   {/* 信息列表 */}
//                   <div className="space-y-8">
//                     {/* 生长地点 */}
//                     <div className="group">
//                       <div className="flex items-center gap-3 mb-3">
//                         <div className="w-10 h-10 rounded-full bg-ochre/10 flex items-center justify-center">
//                           <svg className="w-5 h-5 text-ochre" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                           </svg>
//                         </div>
//                         <h4 className="text-sm font-semibold text-foreground tracking-wide">生长地点</h4>
//                       </div>
//                       <p className="text-muted-foreground leading-relaxed pl-13 text-sm">
//                         {bamboo.location}
//                       </p>
//                     </div>

//                     {/* 核心用途 */}
//                     <div className="group">
//                       <div className="flex items-center gap-3 mb-3">
//                         <div className="w-10 h-10 rounded-full bg-bamboo/10 flex items-center justify-center">
//                           <svg className="w-5 h-5 text-bamboo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//                           </svg>
//                         </div>
//                         <h4 className="text-sm font-semibold text-foreground tracking-wide">核心用途</h4>
//                       </div>
//                       <p className="text-muted-foreground leading-relaxed pl-13 text-sm">
//                         {bamboo.usage}
//                       </p>
//                     </div>

//                     {/* 生物特性 */}
//                     <div className="group">
//                       <div className="flex items-center gap-3 mb-3">
//                         <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
//                           <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                           </svg>
//                         </div>
//                         <h4 className="text-sm font-semibold text-foreground tracking-wide">生物特性（韧性）</h4>
//                       </div>
//                       <p className="text-muted-foreground leading-relaxed pl-13 text-sm">
//                         {bamboo.characteristic}
//                       </p>
//                     </div>
//                   </div>

//                   {/* 装饰线 */}
//                   <div className="mt-12 flex items-center gap-4">
//                     <div className="w-20 h-px bg-gradient-to-r from-bamboo/50 to-transparent" />
//                     <span className="text-bamboo/30 text-xs tracking-widest">{String(index + 1).padStart(2, '0')} / 03</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </article>
//         ))}
//       </div>
//     </section>
//   );
// }

export default function ChapterOnePage() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [introVisible, setIntroVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();
  const introRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setHeaderVisible(true);

    // 引言区域观察
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntroVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (introRef.current) {
      observer.observe(introRef.current);
    }

    //const handleScroll = () => {
    //  const currentScrollY = window.scrollY;
    //  const docHeight = document.documentElement.scrollHeight;
    //  const winHeight = window.innerHeight;
    //  if (currentScrollY + winHeight > docHeight - 100 && !isExiting) {
    //    setIsExiting(true);
    //    setTimeout(() => {
    //      router.push("/chapter2");
    //    }, 800);
    //  }
    //};

    //window.addEventListener("scroll", handleScroll, { passive: true });
    //return () => {
    //  window.removeEventListener("scroll", handleScroll);
    //  observer.disconnect();
    //};
  }, [router, isExiting]);

  return (
    <div className={`relative bg-background transition-opacity duration-700 ${isExiting ? "opacity-0" : "opacity-100"}`}>
      <BambooBackground />

      {/* 优化的视频背景组件 */}
      <VideoBackground
        //src="https://f01-1309918226.file.myqcloud.com/768/2026/03/25/%E7%AB%B9%E5%AD%90/%E7%A9%BA%E9%95%9C/%E7%94%9F.mp4"
        src="/video/chapter1.mp4"
        overlayOpacity={40}
        zIndex={{ video: 5, overlay: 6 }}
      />

      {/* 顶部导航栏 */}
      <TopNavbar />

      {/* Logo */}
      <Logo />

      {/* 导航 */}
      <nav className="fixed top-6 left-6 z-50">
        <Link href="/timeline" className="text-sm text-muted-foreground hover:text-bamboo transition-colors">
          ← 第一篇章
        </Link>
      </nav>

      {/* 页面标题区域 - 全屏居中 */}
      <header className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        <div className={`text-center transition-all duration-1000 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block px-4 py-2 text-sm tracking-widest text-ochre border border-ochre/30 rounded-full mb-8">
            第二篇章
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-bamboo">
            竹简汗青
          </h1>
          <p className="text-muted-foreground/60 text-lg tracking-widest mb-6">
            实用之史
          </p>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12">
            竹在中华文明记录与日常构建中的基石作用
          </p>
          <div className="animate-bounce">
            <span className="text-muted-foreground/40 text-3xl">↓</span>
          </div>
        </div>
      </header>

      {/* 竹与生态板块 - 已注释 */}
      {/* <BambooEcologySection /> */}

      {/* 引言介绍区域 - 新增 */}
      <section 
        ref={introRef}
        className="relative z-10 py-24 px-6 bg-gradient-to-b from-transparent via-muted/20 to-transparent"
      >
        <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${introVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* 装饰引号 */}
          <div className="text-6xl text-bamboo/20 font-serif mb-6">"</div>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
            自远古先民以竹为器，这青翠之材便与华夏文明结下不解之缘。
            它记录思想、构筑居所、便利行旅，在实用与美学之间架起桥梁。
            本章将展开三卷竹简，追溯竹如何成为中华文明不可或缺的基石。
          </p>
          
          {/* 三个关键词 */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {["书写载体", "建筑筋骨", "交通之便"].map((tag, i) => (
              <div key={tag} className="flex items-center gap-3">
                <div className="w-2 h-2 rotate-45 bg-ochre/60" />
                <span className="text-sm text-muted-foreground/70 tracking-widest">{tag}</span>
                {i < 2 && <div className="w-12 h-px bg-gradient-to-r from-ochre/30 to-transparent ml-3" />}
              </div>
            ))}
          </div>

          {/* 底部装饰线 */}
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-bamboo/40 to-transparent mx-auto mt-12" />
        </div>
      </section>

      {/* 三个板块 - 竹简书卷式布局 */}
      <main className="relative z-10 py-12">
        {/* 页面卷轴装饰顶部 */}
        <div className="max-w-5xl mx-auto px-6 mb-12">
          <div className="flex items-center justify-center gap-4">
            <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent to-bamboo/60" />
            <span className="text-sm font-bold tracking-[0.5em] text-bamboo/70">卷轴展开</span>
            {/* 框框已注释 */}
            {/* <div className="px-4 py-2 border-1 border-bamboo/60 rounded-full">
              <span className="text-sm font-bold tracking-[0.5em] text-bamboo/70">卷轴展开</span>
            </div> */}
            <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent to-bamboo/60" />
          </div>
        </div>

        {exhibits.map((exhibit, index) => (
          <ExhibitSection key={exhibit.id} exhibit={exhibit} index={index} />
        ))}

        {/* 页面卷轴装饰底部 */}
        <div className="max-w-5xl mx-auto px-6 mt-12">
          <div className="flex items-center justify-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-bamboo/30" />
            <div className="w-2 h-2 rotate-45 bg-bamboo/40" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-bamboo/30" />
          </div>
        </div>
      </main>

      {/* 诗句引用 */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-bamboo/50 to-transparent mx-auto mb-12" />
          <blockquote className="text-2xl md:text-3xl text-muted-foreground/80 font-serif leading-relaxed">
            "宁可食无肉，不可居无竹"
          </blockquote>
          <cite className="block mt-6 text-sm text-muted-foreground/60">
            —— 苏轼《于潜僧绿筠亭》
          </cite>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-bamboo/50 to-transparent mx-auto mt-12" />
        </div>
      </section>

      {/* 底部过渡提示 */}
      {/* <section className="relative z-10 py-16 px-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground/40 tracking-widest mb-4">继续滚动进入第二篇章</p>
          <div className="w-px h-12 bg-gradient-to-b from-bamboo/40 to-transparent mx-auto" />
        </div>
      </section>*/}
      {/* 底部固定导航 */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <Link href="/chapter2" className="flex flex-col items-center text-muted-foreground/60 hover:text-bamboo transition-colors">
          <span className="text-xs mb-1">继续探索</span>
          <span className="text-lg">↓</span>
        </Link>
      </div>
    </div>
  );
}
