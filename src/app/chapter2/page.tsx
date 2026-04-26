"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BambooBackground from "../components/BambooBackground";
import Logo from "../components/Logo";
import TopNavbar from "../components/TopNavbar";
import VideoBackground from "../components/VideoBackground";

const paintings = [
  {
    artist: "文同",
    title: "墨竹图",
    era: "北宋",
    description: "胸有成竹，意在笔先。文同开创了「墨竹」画派的先河，被后世尊为「墨竹大师」。",
    style: "笔法严谨，竹叶层次分明，尽显竹之挺拔与坚韧。其画竹必先成竹于胸，故下笔有神。",
    //image: "https://f01-1309918226.file.myqcloud.com/768/2026/03/17/%E7%AB%B9%E5%AD%90/%E7%AB%B9%E5%AD%90%E5%9B%BE%E6%96%87%E4%BB%B62/xxx.png?x-cos-traffic-limit=10485760",
    image: "/picture/wentong.png",
  },
  {
    artist: "苏轼",
    title: "枯木竹石图",
    era: "北宋",
    description: "宁可食无肉，不可居无竹。苏轼以竹明志，借笔墨抒发胸臆，将竹的品格与文人的风骨融为一体。",
    style: "笔墨豪放洒脱，竹石相依相生，表现了文人的傲骨与气节。其画不求形似，重在传神。",
    //image: "https://f01-1309918226.file.myqcloud.com/768/2026/03/17/%E7%AB%B9%E5%AD%90/%E7%AB%B9%E5%AD%90%E5%9B%BE%E6%96%87%E4%BB%B62/%E8%8B%8F%E8%BD%BC.jpg?x-cos-traffic-limit=10485760",
    image: "/picture/sushi.jpg",
  },
  {
    artist: "倪瓒",
    title: "竹枝图",
    era: "元代",
    description: "逸笔草草，不求形似。在倪瓒笔下，竹成为隐逸情怀的寄托，是乱世中清高品格的象征。",
    style: "简淡空灵，疏林坡石间几竿修竹，意境清远。画面留白处皆是诗意，令人回味无穷。",
    //image: "https://f01-1309918226.file.myqcloud.com/768/2026/03/17/%E7%AB%B9%E5%AD%90/%E7%AB%B9%E5%AD%90%E5%9B%BE%E6%96%87%E4%BB%B62/%E5%80%AA%E7%93%92.jpg?x-cos-traffic-limit=10485760",
    image: "/picture/nizan.jpg",
  },
  {
    artist: "郑板桥",
    title: "竹石图",
    era: "清代",
    description: "千磨万击还坚劲，任尔东西南北风。郑板桥以诗书画三绝闻名，其竹画更是千古流传。",
    style: "竹枝瘦劲挺拔，竹叶繁茂生动，题诗书画三绝合一。每一笔都蕴含着对竹的深刻理解和热爱。",
    //image: "https://f01-1309918226.file.myqcloud.com/768/2026/03/17/%E7%AB%B9%E5%AD%90/%E7%AB%B9%E5%AD%90%E5%9B%BE%E6%96%87%E4%BB%B62/%E9%83%91%E6%9D%BF%E6%A1%A5.jpg?x-cos-traffic-limit=10485760",
    image: "/picture/zhengbanqiao.jpg",
  },
];

const scenes = [
  { 
    title: "独坐幽篁", 
    poem: "独坐幽篁里，弹琴复长啸", 
    author: "王维",
    work: "《竹里馆》",
    desc: "诗人独坐竹林深处，弹琴长啸，与竹为伴，体现了文人雅士隐逸山林、超然物外的闲适情怀。"
  },
  { 
    title: "竹影扫阶", 
    poem: "竹影扫阶尘不动，月穿潭底水无痕", 
    author: "志勤",
    work: "《开悟诗》",
    desc: "竹影扫过石阶，尘埃却纹丝不动；月光穿透潭底，水面不留痕迹。禅意与竹韵相融，意境空灵。"
  },
  { 
    title: "窗含翠色", 
    poem: "窗含西岭千秋雪，门泊东吴万里船", 
    author: "杜甫",
    work: "《绝句》",
    desc: "窗外翠竹与西岭白雪相映成趣，门前江水与万里航船尽收眼底。竹，是连接天地、古今的纽带。"
  },
];

// 画家板块组件
function PaintingSection({ painting, index }: { painting: typeof paintings[0]; index: number }) {
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
      className={`min-h-screen flex items-center py-20 px-6 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? "" : "lg:grid-flow-dense"}`}>
          {/* 画作区域 */}
          <div className={`relative ${isEven ? "" : "lg:col-start-2"}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-muted/30">
              <div className="aspect-[3/4] relative">
                <img 
                  src={painting.image} 
                  alt={painting.title} 
                  className="w-full h-full object-cover object-center" 
                />
              </div>
            </div>
            {/* 装饰边框 */}
            {isEven ? (
              <>
                <div className="absolute -top-4 -right-4 w-32 h-32 border-t-2 border-r-2 border-ochre/30 rounded-tr-3xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 border-b-2 border-l-2 border-ochre/30 rounded-bl-3xl" />
              </>
            ) : (
              <>
                <div className="absolute -top-4 -left-4 w-32 h-32 border-t-2 border-l-2 border-ochre/30 rounded-tl-3xl" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 border-b-2 border-r-2 border-ochre/30 rounded-br-3xl" />
              </>
            )}
            {/* 年代标签 */}
            <div className={`absolute top-4 ${isEven ? "left-4" : "right-4"} px-3 py-1 bg-background/90 backdrop-blur rounded-full text-xs text-ochre border border-ochre/20`}>
              {painting.era}
            </div>
          </div>

          {/* 文字区域 */}
          <div className={`${isEven ? "" : "lg:col-start-1 lg:row-start-1"}`}>
            <div className="mb-6">
              <span className="text-xs text-ochre/70 tracking-widest">{painting.era} · 墨竹谱系</span>
              <h2 className="text-3xl md:text-4xl font-bold text-bamboo mt-2">{painting.artist}</h2>
              <p className="text-xl text-muted-foreground mt-1">《{painting.title}》</p>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              {painting.description}
            </p>
            <div className="pt-4 border-t border-border/30">
              <span className="text-xs text-muted-foreground/80">艺术风格</span>
              <p className="text-sm mt-2 text-muted-foreground italic">{painting.style}</p>
            </div>
            <div className="mt-8 w-24 h-px bg-gradient-to-r from-bamboo/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

// 竹林七贤板块
function SevenSagesSection() {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const sages = ["嵇康", "阮籍", "山涛", "向秀", "刘伶", "王戎", "阮咸"];

  return (
    <section ref={sectionRef} id="sages" className="min-h-screen flex items-center py-20 px-6 scroll-mt-24 relative z-10">
      <div className="max-w-6xl mx-auto w-full">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-xs text-ochre tracking-widest">魏晋风度</span>
          <h2 className="text-3xl md:text-5xl font-bold text-bamboo mt-4 mb-6">竹林七贤</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            魏晋时期，嵇康、阮籍、山涛、向秀、刘伶、王戎、阮咸七位名士，
            常集于竹林之下，肆意酣畅，谈玄论道，世称「竹林七贤」。
            他们以竹为友，以酒为朋，代表了乱世中独立不羁的精神风骨。
          </p>
        </div>

        <div className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {sages.map((name, index) => (
            <div 
              key={name} 
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-bamboo/20 to-bamboo/5 border border-bamboo/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-bamboo/40">
                <span className="text-lg md:text-xl font-medium text-bamboo">{name}</span>
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-muted-foreground whitespace-nowrap">
                {["弹琴咏啸", "穷途之哭", "量才授职", "思旧赋", "以酒为命", "黄公酒垆", "妙解音律"][index]}
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-20 text-center transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <blockquote className="text-xl text-muted-foreground/80 italic">
            "竹林之下，肆意酣畅，脱略行迹，高谈玄理"
          </blockquote>
        </div>
      </div>
    </section>
  );
}

// 诗意场景板块 - 差异化设计：全屏垂直诗句展示
function PoetryScenesSection() {
  return (
    <section id="poetry" className="scroll-mt-24 relative z-10">
      {/* 板块标题 */}
      <div className="min-h-[50vh] flex items-center justify-center py-20 px-6">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 text-xs tracking-widest text-ochre border border-ochre/30 rounded-full mb-4">
            诗意栖居
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-bamboo mb-3">竹影诗韵</h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            唐诗宋词中的竹影清风，文人雅士的精神家园
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-12 h-px bg-bamboo/30" />
            <span className="text-bamboo/40 text-lg">◆</span>
            <div className="w-12 h-px bg-bamboo/30" />
          </div>
        </div>
      </div>

      {/* 三首诗 - 全屏垂直展示 */}
      {scenes.map((scene, index) => (
        <PoemScene key={scene.title} scene={scene} />
      ))}
    </section>
  );
}

// 单首诗组件 - 全屏展示
function PoemScene({ scene }: { scene: typeof scenes[0] }) {
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

  return (
    <section 
      ref={sectionRef}
      className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-all duration-1000 bg-gradient-to-b from-transparent via-bamboo/[0.02] to-transparent`}
    >
      {/* 内容区域 */}
      <div className={`relative z-10 max-w-4xl mx-auto px-6 text-center transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}>
        {/* 诗题 */}
        <div className="mb-8">
          <span className="inline-block px-4 py-1 text-xs text-ochre border border-ochre/30 rounded-full mb-4">
            {scene.author} {scene.work}
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-bamboo">{scene.title}</h3>
        </div>

        {/* 诗句 - 大字号竖排展示 */}
        <div className="mb-10">
          <p className="text-3xl md:text-5xl lg:text-6xl font-serif text-foreground leading-relaxed tracking-wider">
            {scene.poem.split('，').map((line, i) => (
              <span key={i} className="block mb-2">{line}{i === 0 ? '，' : ''}</span>
            ))}
          </p>
        </div>

        {/* 装饰分隔 */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-bamboo/30" />
          <span className="text-bamboo/40 text-lg">❧</span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-bamboo/30" />
        </div>

        {/* 赏析 */}
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          {scene.desc}
        </p>
      </div>
    </section>
  );
}

export default function ChapterTwoPage() {
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
    //       router.push("/chapter3");
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
        src="https://f01-1309918226.file.myqcloud.com/768/2026/03/25/%E7%AB%B9%E5%AD%90/%E7%A9%BA%E9%95%9C/%E7%A5%9E.mp4"
        //src="/video/chapter2.mp4"
        overlayOpacity={60}
        zIndex={{ video: 5, overlay: 6 }}
      />

      {/* 顶部导航栏 */}
      <TopNavbar />

      {/* Logo */}
      <Logo />

      {/* 导航 */}
      <nav className="fixed top-6 left-6 z-50">
        <Link href="/chapter1" className="text-sm text-muted-foreground hover:text-bamboo transition-colors">
          ← 第二篇章
        </Link>
      </nav>

      {/* 页面标题区域 - 全屏居中 */}
      <header className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        <div className={`text-center transition-all duration-1000 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block px-4 py-2 text-sm tracking-widest text-ochre border border-ochre/30 rounded-full mb-8">
            第三篇章
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-bamboo">
            墨筠写神
          </h1>
          <p className="text-muted-foreground/80 text-lg tracking-widest mb-6">
            审美之韵
          </p>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12">
            从物象到心象，竹成为君子品格的化身
          </p>
          <div className="animate-bounce">
            <span className="text-muted-foreground/40 text-3xl">↓</span>
          </div>
        </div>
      </header>

      {/* 竹林七贤 */}
      <SevenSagesSection />

      {/* 四个画家 - 滚动展示 */}
      <main id="paintings" className="relative z-10 scroll-mt-24">
        {/* 墨竹谱系标题 */}
        <div className="py-16 px-6 text-center">
          <span className="inline-block px-4 py-1.5 text-xs tracking-widest text-ochre border border-ochre/30 rounded-full mb-4">
            四家墨竹
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-bamboo mb-3">墨竹谱系</h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            从北宋到清代，四位大师以墨写竹，传承千年画竹精神
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-12 h-px bg-bamboo/30" />
            <span className="text-bamboo/40 text-lg">◆</span>
            <div className="w-12 h-px bg-bamboo/30" />
          </div>
        </div>

        {paintings.map((painting, index) => (
          <PaintingSection key={painting.artist} painting={painting} index={index} />
        ))}
      </main>

      {/* 诗意场景 */}
      <PoetryScenesSection />

      {/* 结尾引导 
      <section className="relative z-10 py-32 px-6">
        <div className="text-center">
          <p className="text-muted-foreground/50 text-sm mb-4">向下滚动，进入第三篇章</p>
          <div className="animate-bounce">
            <span className="text-muted-foreground/40 text-xl">↓</span>
          </div>
        </div>
      </section>*/}

      {/* 底部固定导航 */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <Link href="/chapter3" className="flex flex-col items-center text-muted-foreground/60 hover:text-bamboo transition-colors">
          <span className="text-xs mb-1">继续探索</span>
          <span className="text-lg">↓</span>
        </Link>
      </div>
    </div>
  );
}
