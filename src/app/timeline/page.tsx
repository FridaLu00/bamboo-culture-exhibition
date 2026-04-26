"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BambooBackground from "../components/BambooBackground";
import Logo from "../components/Logo";
import TopNavbar from "../components/TopNavbar";
import VideoBackground from "../components/VideoBackground";

const timelineData = [
  {
    era: "史前",
    year: "距今7000年",
    title: "河姆渡竹纹",
    tagline: "起源",
    taglineDesc: "竹与文明的初次相遇",
    description: "浙江河姆渡遗址出土的陶片上，发现早期竹纹装饰，见证了先民对竹的认知伊始。",
    detail: "河姆渡遗址出土的猪纹方钵等陶器上，清晰可见竹编纹样印痕，这是人类与竹相伴的最早证据。",
    significance: "中华文明与竹结缘的起点",
    artifact: "猪纹方钵、竹编纹陶片",
    location: "浙江余姚",
    /*image: "https://f01-1309918226.file.myqcloud.com/768/2026/03/12/%E7%AB%B9%E5%AD%90/%E7%AB%B9%E5%AD%90%E5%9B%BE%E6%96%87%E4%BB%B6/0f7fbbff9c6478ab683401c05db33e4b_r.png?x-cos-traffic-limit=10485760",*/
    image: "/picture/shiqian.png",
  },
  {
    era: "战国",
    year: "公元前475-221年",
    title: "竹简问世",
    tagline: "书写",
    taglineDesc: "汗青载道，文明传薪",
    description: "竹简成为主要书写载体，「汗青」一词由此诞生，承载着中华文明的早期记忆。",
    detail: "竹简由竹片串联而成，每片宽约1厘米，长约20厘米。文字以墨书写，内容涵盖经史子集。",
    significance: "奠定了竹在文明记录中的基石地位",
    artifact: "睡虎地秦简、曾侯乙墓竹简",
    location: "湖北云梦、随州",
    quote: "「韦编三绝」—— 孔子《史记》",
    //image: "https://f01-1309918226.file.myqcloud.com/768/2026/03/12/%E7%AB%B9%E5%AD%90/%E7%AB%B9%E5%AD%90%E5%9B%BE%E6%96%87%E4%BB%B6/6646A49E5B4116134A83E1D9907BCD75.png?x-cos-traffic-limit=10485760",
    image: "/picture/zhanguo.png",
  },
  {
    era: "魏晋",
    year: "公元220-420年",
    title: "竹林七贤",
    tagline: "精神",
    taglineDesc: "竹林之下，肆意酣畅",
    description: "嵇康、阮籍等七位名士常集于竹林之下，肆意酣畅，竹从此成为文人精神的象征。",
    detail: "嵇康、阮籍、山涛、向秀、刘伶、王戎、阮咸七人，在河内山阳县竹林中谈玄论道、饮酒赋诗。",
    significance: "竹从实用之物升华为精神图腾",
    artifact: "《竹林七贤与荣启期》砖画",
    location: "河南修武（古山阳）",
    quote: "「竹林之下，肆意酣畅」—— 《世说新语》",
    //image: "https://f01-1309918226.file.myqcloud.com/768/2026/03/12/%E7%AB%B9%E5%AD%90/%E7%AB%B9%E5%AD%90%E5%9B%BE%E6%96%87%E4%BB%B6/R.jpg?x-cos-traffic-limit=10485760",
    image: "/picture/weijin.jpg",
  },
  {
    era: "唐代",
    year: "公元618-907年",
    title: "竹诗繁荣",
    tagline: "诗意",
    taglineDesc: "独坐幽篁，弹琴长啸",
    description: "王维、白居易等诗人写下大量咏竹诗篇，「湿洒池边地，凉开竹下扉」展现竹下清幽之境。",
    detail: "唐代诗人将竹纳入诗歌意象体系，咏竹诗数量超过千首，竹成为隐逸、高洁、坚韧的象征。",
    significance: "竹文学意象体系的形成与成熟",
    artifact: "《全唐诗》中的咏竹诗篇",
    location: "长安、洛阳",
    quote: "「湿洒池边地，凉开竹下扉」—— 白居易",
    //image: "https://f01-1309918226.file.myqcloud.com/768/2026/03/12/%E7%AB%B9%E5%AD%90/%E7%AB%B9%E5%AD%90%E5%9B%BE%E6%96%87%E4%BB%B6/R.png?x-cos-traffic-limit=10485760",
    image: "/picture/tang.png",
  },
  {
    era: "宋代",
    year: "公元960-1279年",
    title: "墨竹画派",
    tagline: "画境",
    taglineDesc: "胸有成竹，以墨写竹",
    description: "文同、苏轼开创墨竹画派，「胸有成竹」的绘画理念影响深远，竹成为君子品格的化身。",
    detail: "文同首创以墨写竹，不施色彩；苏轼提出「画竹必先得成竹于胸中」，奠定文人画理论基础。",
    significance: "竹成为君子人格的视觉符号",
    artifact: "文同《墨竹图》、苏轼《枯木竹石图》",
    location: "四川梓潼、湖北黄冈",
    quote: "「胸有成竹」—— 苏轼",
    //image: "https://f01-1309918226.file.myqcloud.com/768/2026/03/12/%E7%AB%B9%E5%AD%90/%E7%AB%B9%E5%AD%90%E5%9B%BE%E6%96%87%E4%BB%B6/f76e-htstzcc6350308.png?x-cos-traffic-limit=10485760",
    image: "/picture/song.png",
  },
  {
    era: "明清",
    year: "公元1368-1912年",
    title: "竹艺巅峰",
    tagline: "工艺",
    taglineDesc: "千磨万击，还坚且劲",
    description: "竹刻、竹编工艺登峰造极，嘉定竹刻、东阳竹编成为国粹，竹文化深入生活方方面面。",
    detail: "明代嘉定竹刻以刀代笔，清代东阳竹编细如发丝。竹器从文人清玩扩展到日常器用的各个领域。",
    significance: "竹工艺美学的全民化与巅峰化",
    artifact: "嘉定竹刻笔筒、东阳竹编器皿",
    location: "上海嘉定、浙江东阳",
    quote: "「千磨万击还坚劲，任尔东西南北风」—— 郑板桥",
    //image: "https://f01-1309918226.file.myqcloud.com/768/2026/03/12/%E7%AB%B9%E5%AD%90/%E7%AB%B9%E5%AD%90%E5%9B%BE%E6%96%87%E4%BB%B6/art5027681239.png?x-cos-traffic-limit=10485760",
    image: "/picture/ming.png",
  },
];

// 竹节路径点 - 6个竹节对应6个朝代，垂直排列与板块对齐
const bambooNodes: { x: number; y: number }[] = [
  { x: 80, y: 70 },     // 史前 - 与第一板块对齐
  { x: 80, y: 200 },    // 战国 - 与第二板块对齐
  { x: 80, y: 330 },    // 魏晋 - 与第三板块对齐
  { x: 80, y: 460 },    // 唐代 - 与第四板块对齐
  { x: 80, y: 590 },    // 宋代 - 与第五板块对齐
  { x: 80, y: 720 },    // 明清 - 与第六板块对齐
];

// 构建直竹干路径 - 遵循几何秩序感
const buildBambooPath = () => {
  const startPoint = { x: 80, y: 0 };
  const endPoint = { x: 80, y: 780 };
  
  // 简单的直线路径
  let path = `M ${startPoint.x} ${startPoint.y}`;
  
  // 经过每个竹节
  for (const node of bambooNodes) {
    path += ` L ${node.x} ${node.y}`;
  }
  
  // 到终点
  path += ` L ${endPoint.x} ${endPoint.y}`;
  
  return path;
};

export default function TimelinePage() {
  const [isExiting, setIsExiting] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [drawProgress, setDrawProgress] = useState(0);
  const router = useRouter();
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // 首屏标题动画
  useEffect(() => {
    setHeaderVisible(true);
  }, []);

  // 检测每个区块是否进入视口 - 精确控制激活范围
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            // 只有当板块进入中心区域50%以上时才激活
            setActiveIndex(index);
          }
        });
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: "-20% 0px -20% 0px" }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // 计算竹子绘制进度
  useEffect(() => {
    if (activeIndex >= 0) {
      const targetProgress = (activeIndex + 1) / timelineData.length;
      const timer = setTimeout(() => {
        setDrawProgress(targetProgress);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeIndex]);

  // 检测是否滚动到底部触发跳转
  useEffect(() => {
    // const handleScroll = () => {
    //   const currentScrollY = window.scrollY;
    //   const docHeight = document.documentElement.scrollHeight;
    //   const winHeight = window.innerHeight;
    //   
    //   if (currentScrollY + winHeight > docHeight - 100 && !isExiting) {
    //     setIsExiting(true);
    //     setTimeout(() => {
    //       router.push("/chapter1");
    //     }, 800);
    //   }
    // };

    // window.addEventListener("scroll", handleScroll, { passive: true });
    // return () => window.removeEventListener("scroll", handleScroll);
  }, [router, isExiting]);

  const bambooPath = buildBambooPath();
  const pathLength = 1000;

  return (
    <div className={`relative min-h-screen bg-background transition-opacity duration-700 ${isExiting ? "opacity-0" : "opacity-100"}`}>
      <BambooBackground />

      {/* 优化的视频背景组件 */}
      <VideoBackground
        src="https://f01-1309918226.file.myqcloud.com/768/2026/03/25/%E7%AB%B9%E5%AD%90/%E7%A9%BA%E9%95%9C/%E5%BA%8F%E5%88%97%2004.mp4"
        //src="/video/timeline.mp4"
        overlayOpacity={60}
        zIndex={{ video: 5, overlay: 6 }}
      />

      {/* 顶部导航栏 */}
      <TopNavbar />

      {/* Logo */}
      <Logo />

      {/* 导航 */}
      <nav className="fixed top-6 left-6 z-50">
        <Link href="/" className="text-sm text-muted-foreground hover:text-bamboo transition-colors">
          ← 返回序章
        </Link>
      </nav>

      <main ref={containerRef} className="relative z-10">
        {/* 章节标题 - 全屏居中展示 */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6">
          <div className={`text-center transition-all duration-1000 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="inline-block px-4 py-2 text-sm tracking-widest text-ochre border border-ochre/30 rounded-full mb-8">
              时空竹谱
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-bamboo">
              千年脉络
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-4">
              向下滚动，跟随竹的脉络
            </p>
            <p className="text-muted-foreground/80 text-base max-w-xl mx-auto mb-12">
              探索中华文明中的演变轨迹
            </p>
            <div className="animate-bounce">
              <span className="text-muted-foreground/40 text-3xl">↓</span>
            </div>
          </div>
        </section>

        {/* 引言介绍区域 - 全宽排版 */}
        <section className="py-20 px-6 bg-gradient-to-b from-transparent via-muted/20 to-transparent">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* 左侧竖线装饰 */}
              <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-bamboo/40 via-ochre/30 to-bamboo/40" />
              
              <div className="pl-8 md:pl-12">
                {/* 小标题 */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-px bg-ochre/50" />
                  <span className="text-xs tracking-[0.3em] text-ochre/70 uppercase">Prologue</span>
                </div>
                
                {/* 主引言 - 大字号 */}
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
                  竹，从七千年前的河姆渡走来，与中华文明相伴相生。
                </p>
                
                {/* 内容段落 */}
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  <p className="text-base text-muted-foreground/80 leading-relaxed">
                    它曾是先民手中的生产工具，是承载文字的汗青史册，是文人笔下的精神图腾。
                  </p>
                  <p className="text-base text-muted-foreground/80 leading-relaxed">
                    让我们沿着时间的脉络，追溯竹如何从历史深处走来，在实用与精神之间，构筑起独特的东方竹文化。
                  </p>
                </div>
                
                {/* 总结段落 - 带高亮关键词 */}
                <p className="text-base text-muted-foreground/90 leading-relaxed mb-8 py-6 border-y border-dashed border-bamboo/20">
                  从河姆渡的竹纹陶片到明清的精工竹刻，竹贯穿了中华文明的每一个重要节点。
                  它既是<span className="text-bamboo">实用的工具</span>，又是<span className="text-bamboo">精神的寄托</span>；
                  既承载着<span className="text-ochre">文明的书写</span>，也孕育了<span className="text-ochre">艺术的美学</span>。
                  七千年间，竹从器物走向文化，从物质升华为精神，成为东方美学中不可或缺的意象。
                </p>
                
                {/* 底部信息 */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-light text-bamboo/80">7000年</span>
                    <div className="h-8 w-px bg-bamboo/20" />
                    <span className="text-sm text-muted-foreground/80"> six dynasties</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground/40">
                    <span className="text-xs tracking-widest">向下滚动探索</span>
                    <span className="text-lg">↓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* 时间轴内容 - 左侧内容 + 右侧弯曲竹节 */}
        <section className="relative py-12 px-6">
          <div className="max-w-6xl mx-auto">
            {/* 竹节SVG - 固定在右侧 */}
            <div className="fixed right-8 md:right-16 top-1/2 -translate-y-1/2 w-36 md:w-44 h-[85vh] z-20 pointer-events-none hidden md:block">
              <svg 
                viewBox="0 0 160 850" 
                className="w-full h-full" 
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient id="bambooGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--bamboo-dark)" />
                    <stop offset="50%" stopColor="var(--bamboo)" />
                    <stop offset="100%" stopColor="var(--bamboo-light)" />
                  </linearGradient>
                  <linearGradient id="leafGradientActive" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7CB342" />
                    <stop offset="100%" stopColor="var(--bamboo)" />
                  </linearGradient>
                </defs>

                {/* 弯曲竹干 - 随滚动绘制 */}
                <path
                  d={bambooPath}
                  fill="none"
                  stroke="url(#bambooGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={pathLength}
                  strokeDashoffset={pathLength * (1 - drawProgress)}
                  style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
                  className="opacity-70"
                />

                {/* 竹节标记 - 简洁几何风格 */}
                {bambooNodes.map((node, index) => {
                  const isVisible = index <= activeIndex;
                  const isActive = index === activeIndex;

                  return (
                    <g 
                      key={index}
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transition: 'opacity 0.6s ease-out',
                      }}
                    >
                      {/* 竹节横线 - 几何线条 */}
                      <line
                        x1={node.x - 16}
                        y1={node.y}
                        x2={node.x + 16}
                        y2={node.y}
                        stroke={isActive ? "var(--ochre)" : "var(--bamboo-dark)"}
                        strokeWidth="3"
                        strokeLinecap="round"
                        style={{ transition: 'all 0.4s ease-out' }}
                      />

                      {/* 竹节中心圆点 */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isActive ? 10 : 6}
                        fill={isActive ? "var(--ochre)" : "var(--bamboo)"}
                        stroke="var(--background)"
                        strokeWidth="2"
                        style={{ transition: 'all 0.4s ease-out' }}
                      />

                      {/* 朝代标签 - 左侧 */}
                      <text
                        x={node.x - 28}
                        y={node.y + 5}
                        textAnchor="end"
                        fill={isActive ? "var(--ochre)" : "var(--bamboo)"}
                        fontSize="13"
                        fontWeight={isActive ? "600" : "400"}
                        style={{ transition: 'all 0.3s ease-out' }}
                      >
                        {timelineData[index]?.era}
                      </text>

                      {/* 年份标注 - 右侧 */}
                      <text
                        x={node.x + 28}
                        y={node.y + 5}
                        textAnchor="start"
                        fill={isActive ? "var(--ochre)" : "var(--bamboo-light)"}
                        fontSize="11"
                        opacity={isActive ? 1 : 0.7}
                        style={{ transition: 'all 0.3s ease-out' }}
                      >
                        {timelineData[index]?.year}
                      </text>

                      {/* 序号标记 - 下方 */}
                      <text
                        x={node.x}
                        y={node.y + 26}
                        textAnchor="middle"
                        fill={isActive ? "var(--ochre)" : "var(--bamboo)"}
                        fontSize="10"
                        opacity={isActive ? 1 : 0.5}
                        style={{ transition: 'all 0.3s ease-out' }}
                      >
                        0{index + 1}
                      </text>
                    </g>
                  );
                })}

                {/* 竹梢 - 简洁线条 */}
                <path
                  d={`M${bambooNodes[0].x},15 L${bambooNodes[0].x - 8},5 M${bambooNodes[0].x},15 L${bambooNodes[0].x + 8},5`}
                  fill="none"
                  stroke="var(--bamboo)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity={drawProgress > 0 ? 0.6 : 0}
                  style={{ transition: 'opacity 0.5s ease-out' }}
                />
              </svg>
            </div>

            {/* 各个朝代展示区块 - 左侧内容 */}
            <div className="max-w-3xl mr-auto md:mr-48">
              {timelineData.map((item, index) => {
                const isVisible = visibleItems.includes(index);
                const isActive = index === activeIndex;
                
                return (
                  <div
                    key={index}
                    id={item.era}
                    ref={(el) => { itemRefs.current[index] = el; }}
                    data-index={index}
                    className={`min-h-[80vh] flex items-center py-4 transition-all duration-700 ${
                      isActive ? 'scale-100' : 'scale-95'
                    }`}
                  >
                    <div className="w-full relative">
                      {/* 右侧主题标签 - 靠近竹节节点 */}
                      <div className={`absolute right-0 md:right-[-200px] top-1/2 -translate-y-1/2 text-right transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-30'}`}>
                        <div className="flex flex-col items-end gap-2">
                          <span className="text-2xl md:text-3xl font-light text-bamboo/70 tracking-widest">{item.tagline}</span>
                          <span className="text-xs md:text-sm text-muted-foreground/70 tracking-wider">{item.taglineDesc}</span>
                        </div>
                      </div>
                      
                      {/* 顶部年代标题区 */}
                      <div className={`flex items-baseline gap-4 mb-8 transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                        <span className="text-7xl font-light text-bamboo/60">0{index + 1}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className="text-4xl font-bold text-bamboo">{item.era}</span>
                            <span className="text-base text-muted-foreground">{item.year}</span>
                          </div>
                          <div className="w-full h-0.5 bg-gradient-to-r from-bamboo/80 to-transparent mt-2" />
                        </div>
                      </div>

                      {/* 主内容网格 */}
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* 左侧 - 图片与引用 */}
                        <div className="space-y-5">
                          {/* 图片 */}
                          <div className={`relative rounded-xl overflow-hidden shadow-lg transition-all duration-500 ${isActive ? 'ring-2 ring-ochre/30' : ''}`}>
                            <div className="aspect-[4/3] relative">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover object-center"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                              {/* 地点标签 */}
                              <div className="absolute top-3 left-3">
                                <span className="px-3 py-1.5 bg-background/80 text-sm rounded">{item.location}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* 引用诗句 */}
                          {item.quote && (
                            <blockquote className="text-base text-ochre/80 italic font-bold border-l-2 border-ochre/30 pl-4">
                              {item.quote}
                            </blockquote>
                          )}
                        </div>

                        {/* 右侧 - 详细信息 */}
                        <div className="space-y-6">
                          {/* 标题 */}
                          <h3 className="text-3xl font-bold text-bamboo">{item.title}</h3>
                          
                          {/* 主描述 */}
                          <p className="text-lg text-muted-foreground leading-relaxed">{item.description}</p>
                          
                          {/* 详细说明 */}
                          <p className="text-base text-muted-foreground/80 leading-relaxed">{item.detail}</p>
                          
                          {/* 信息卡片 */}
                          <div className="grid grid-cols-2 gap-4 pt-2">
                            <div className="bg-muted/30 rounded-lg p-4">
                              <span className="text-sm text-muted-foreground/100 block mb-1">历史意义</span>
                              <p className="text-base text-foreground">{item.significance}</p>
                            </div>
                            <div className="bg-muted/30 rounded-lg p-4">
                              <span className="text-sm text-muted-foreground/100 block mb-1">代表文物</span>
                              <p className="text-base text-foreground">{item.artifact}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 结尾过渡 */}
        <section className="min-h-[40vh] flex items-center justify-center py-24 px-6">
          <div className="text-center">
            <p className="text-muted-foreground/60 mb-4">竹韵千年，绵延不绝</p>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-bamboo to-transparent mx-auto mb-8" />
            <p className="text-sm text-muted-foreground/40">继续探索竹文化之旅</p>
          </div>
        </section>
      </main>

      {/* 下一页提示 */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 animate-bounce">
        <Link href="/chapter0" className="flex flex-col items-center text-muted-foreground/60 hover:text-bamboo transition-colors">
          <span className="text-xs mb-1">继续探索</span>
          <span className="text-lg">↓</span>
        </Link>
      </div>
    </div>
  );
}
