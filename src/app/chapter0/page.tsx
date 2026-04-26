"use client";

// 为window对象添加echarts属性的类型声明
declare global {
  interface Window {
    echarts: any;
  }
}

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BambooBackground from "../components/BambooBackground";
import TopNavbar from "../components/TopNavbar";
import VideoBackground from "../components/VideoBackground";
import Logo from "../components/Logo";

// 竹与生态数据
const bambooEcology = [
  {
    id: "maozhu",
    name: "毛竹（楠竹）",
    location: "主要分布在长江流域以南的亚热带地区，如浙江、福建、江西、湖南、四川等省份，集中在武夷山、南岭等山区。",
    usage: "建筑用材（竹楼、脚手架）、竹制家具、造纸原料、竹笋食用；也是重要的生态防护林，固土保水效果显著。",
    characteristic: "抗拉强度可达钢材的1/2，抗压强度接近混凝土；纤维密度高，弹性模量约为10-12 GPa，可承受自身重量30倍的荷载，弯曲变形后能快速恢复，零下20℃仍能保持良好韧性，生长速度极快（最快每天长1米）。",
  },
  {
    id: "yunzhu",
    name: "箭竹（云竹）",
    location: "主要分布在海拔1000-3000米的高山地区，如四川、云南、贵州、陕西、甘肃等地的山地和亚高山地带。",
    usage: "大熊猫的主要食物来源；可用于制作箭杆、竹笛、钓鱼竿等精细竹制品；也是水土保持和水源涵养的重要植物。",
    characteristic: "茎秆细小但坚韧，直径一般在1-2厘米，壁厚仅1-2毫米；弹性极佳，弯曲角度可达180度而不断裂，适合制作弹性要求高的工具；耐寒性强，可在-10℃环境下正常生长。",
  },
  {
    id: "longzhu",
    name: "慈竹（龙竹）",
    location: "主要分布在西南地区，如四川、云南、贵州等省份，喜欢温暖湿润的气候，多生长在海拔1000米以下的河谷和低山地区。",
    usage: "编织竹席、竹帘、竹篮等日常用品；竹纤维可用于制作纸张、纤维板；竹浆可用于造纸工业，竹炭可用于净化空气和水质。",
    characteristic: "纤维长而细，平均长度约2.5-3.5毫米，纤维强度高，柔韧性好，适合编织；茎秆中空，壁厚均匀，结构稳定，不易变形；生长速度快，3-5年即可成材。",
  },
];

// 声音地图数据 - 已注释，准备替换为视频
// const sounds = [
//   {
//     id: "spring",
//     name: "竹音春晓",
//     subtitle: "春·晨",
//     season: "春",
//     mood: "生机",
//     description: "春日清晨，竹林间万物复苏，新笋破土，竹叶沙沙，鸟鸣啁啾，构成一曲生机盎然的春之乐章。",
//     quote: "竹外桃花三两枝，春江水暖鸭先知",
//     poet: "苏轼",
//     year: "宋代",
//   },
//   {
//     id: "summer",
//     name: "竹影夏韵",
//     subtitle: "夏·午",
//     season: "夏",
//     mood: "清凉",
//     description: "夏日午后，阳光透过竹叶洒下斑驳光影，竹风徐来，带来丝丝凉意，蝉鸣此起彼伏，营造出宁静祥和的夏日氛围。",
//     quote: "竹深树密虫鸣处，时有微凉不是风",
//     poet: "杨万里",
//     year: "宋代",
//   },
//   {
//     id: "autumn",
//     name: "竹声秋意",
//     subtitle: "秋·暮",
//     season: "秋",
//     mood: "萧瑟",
//     description: "秋日黄昏，竹叶在秋风中沙沙作响，竹影摇曳，夕阳西下，满地金黄，勾勒出一幅诗意的秋景图。",
//     quote: "宁可食无肉，不可居无竹",
//     poet: "苏轼",
//     year: "宋代",
//   },
//   {
//     id: "winter",
//     name: "竹雪冬静",
//     subtitle: "冬·夜",
//     season: "冬",
//     mood: "静谧",
//     description: "冬日夜晚，雪花飘落竹梢，竹枝在雪中傲然挺立，万籁俱寂，唯有雪落竹枝的细微声响，传递着冬日的宁静与坚韧。",
//     quote: "雪压竹头低，低下欲沾泥",
//     poet: "方志敏",
//     year: "现代",
//   },
// ];

// 竹与生态板块组件 - 杂志式上下布局
function BambooEcologySection({ bamboo, index }: { bamboo: typeof bambooEcology[0]; index: number }) {
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
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 竹子图片
  const bambooImages = [
    //"https://f01-1309918226.file.myqcloud.com/768/2026/03/20/%E7%AB%B9%E5%AD%90/%E7%AB%B9%E5%AD%90%E5%9B%BE%E6%96%87%E4%BB%B62/true.jpg?x-cos-traffic-limit=10485760",
    //"https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80",
    //"https://images.unsplash.com/photo-1531875456634-3235177e94e4?w=800&q=80"
    "/picture/maozhu.jpg",
    "/picture/jianzhu.jpg",
    "/picture/cizhu.jpg"
  ];

  return (
    <article
      ref={sectionRef}
      key={bamboo.id}
      className={`min-h-screen flex items-center transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div className={`w-full grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
        {/* 图片区域 */}
        <div className={`relative h-[50vh] lg:h-screen overflow-hidden ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-bamboo/10 to-ochre/10" />
          <img
            src={bambooImages[index]}
            alt={bamboo.name}
            className="w-full h-full object-cover object-center opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-700"
          />
          {/* 图片叠加装饰 - 根据板块奇偶性调整渐变方向 */}
          <div className={`absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent lg:bg-gradient-to-r ${index % 2 === 1 ? 'lg:to-transparent lg:from-background/80' : 'lg:from-transparent lg:to-background/80'} lg:via-transparent`} />
          {/* 编号装饰 */}
          <div className="absolute top-8 left-8 text-8xl font-bold text-white/50">
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>

        {/* 内容区域 */}
        <div className={`flex items-center px-6 lg:px-16 py-12 lg:py-0 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
          <div className="max-w-lg">
            {/* 标签 */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-ochre" />
              <span className="text-xs tracking-[0.3em] text-ochre uppercase">
                {index === 0 ? 'Phyllostachys edulis' : index === 1 ? 'Fargesia sp.' : 'Neosinocalamus affinis'}
              </span>
            </div>

            {/* 名称 */}
            <h3 className="text-3xl md:text-4xl font-bold text-bamboo mb-8">
              {bamboo.name}
            </h3>

            {/* 信息列表 */}
            <div className="space-y-8">
              {/* 生长地点 */}
              <div className="group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-ochre/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-ochre" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground tracking-wide">生长地点</h4>
                </div>
                <div className="bg-background/30 backdrop-blur-sm p-3 rounded-xl border border-border/30 ml-13">
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {bamboo.location}
                  </p>
                </div>
              </div>

              {/* 核心用途 */}
              <div className="group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-bamboo/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-bamboo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground tracking-wide">核心用途</h4>
                </div>
                <div className="bg-background/30 backdrop-blur-sm p-3 rounded-xl border border-border/30 ml-13">
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {bamboo.usage}
                  </p>
                </div>
              </div>

              {/* 生物特性 */}
              <div className="group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground tracking-wide">生物特性（韧性）</h4>
                </div>
                <div className="bg-background/30 backdrop-blur-sm p-3 rounded-xl border border-border/30 ml-13">
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {bamboo.characteristic}
                  </p>
                </div>
              </div>
            </div>

            {/* 装饰线 */}
            <div className="mt-12 flex items-center gap-4">
              <div className="w-20 h-px bg-gradient-to-r from-bamboo/50 to-transparent" />
              <span className="text-bamboo/30 text-xs tracking-widest">{String(index + 1).padStart(2, '0')} / 03</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// 中国各省竹子分布数据
const bambooDistribution = [
  {
    province: "四川",
    hasBamboo: true,
    types: ["毛竹", "慈竹", "箭竹", "斑竹"],
    description: "中国竹子资源最丰富的省份之一，拥有大熊猫栖息地的高山竹林，箭竹是大熊猫的主要食物来源。川西高山地区分布着大面积的箭竹林。",
    area: "约120万公顷"
  },
  {
    province: "云南",
    hasBamboo: true,
    types: ["龙竹", "凤尾竹", "慈竹", "箭竹"],
    description: "热带、亚热带竹种丰富，西双版纳有热带竹林景观。云南是世界竹类植物分布中心之一，拥有众多特有竹种。",
    area: "约80万公顷"
  },
  {
    province: "浙江",
    hasBamboo: true,
    types: ["毛竹", "刚竹", "早园竹"],
    description: "中国毛竹主产区之一，安吉被誉为「中国竹乡」。竹产业发达，竹编、竹工艺品享誉全国。",
    area: "约70万公顷"
  },
  {
    province: "福建",
    hasBamboo: true,
    types: ["毛竹", "麻竹", "绿竹"],
    description: "南方重要竹产区，武夷山地区竹林茂密。闽北山区盛产优质毛竹，竹笋制品闻名遐迩。",
    area: "约90万公顷"
  },
  {
    province: "江西",
    hasBamboo: true,
    types: ["毛竹", "刚竹", "水竹"],
    description: "井冈山、庐山等地竹林广布，是长江流域重要的竹子产区。竹材资源丰富，传统竹工艺历史悠久。",
    area: "约100万公顷"
  },
  {
    province: "湖南",
    hasBamboo: true,
    types: ["毛竹", "楠竹", "桂竹"],
    description: "洞庭湖周边及湘西南山区竹林茂密，「潇湘竹海」闻名。岳阳君山岛的斑竹（湘妃竹）更是文化名竹。",
    area: "约85万公顷"
  },
  {
    province: "广东",
    hasBamboo: true,
    types: ["麻竹", "绿竹", "粉单竹"],
    description: "粤北南岭山区有大面积竹林，珠三角地区种植食用竹笋。岭南竹文化深厚，竹建筑独具特色。",
    area: "约60万公顷"
  },
  {
    province: "广西",
    hasBamboo: true,
    types: ["撑篙竹", "粉单竹", "麻竹"],
    description: "桂林山水间翠竹成荫，桂北山区竹林资源丰富。壮乡竹文化浓郁，竹编工艺精湛。",
    area: "约55万公顷"
  },
  {
    province: "安徽",
    hasBamboo: true,
    types: ["毛竹", "刚竹", "雷竹"],
    description: "黄山、九华山周边竹林葱郁，皖南是重要竹产区。宣纸制作也离不开优质的竹浆原料。",
    area: "约40万公顷"
  },
  {
    province: "贵州",
    hasBamboo: true,
    types: ["慈竹", "楠竹", "方竹"],
    description: "赤水市拥有中国最大的连片竹林，「竹海国家森林公园」蔚为壮观。黔西北方竹资源独特。",
    area: "约45万公顷"
  },
  {
    province: "湖北",
    hasBamboo: true,
    types: ["毛竹", "刚竹", "水竹"],
    description: "神农架林区有原生竹林分布，鄂西南山区竹资源丰富。咸宁地区的竹产业正在蓬勃发展。",
    area: "约35万公顷"
  },
  {
    province: "江苏",
    hasBamboo: true,
    types: ["刚竹", "淡竹", "早园竹"],
    description: "宜兴、溧阳等地有传统竹林，苏南丘陵地区适宜竹子生长。江南园林中竹景不可或缺。",
    area: "约15万公顷"
  },
  {
    province: "海南",
    hasBamboo: true,
    types: ["麻竹", "藤竹", "沙罗单竹"],
    description: "热带竹种分布区，中部山区有原生竹林。热带风情与竹韵交融，别具一格。",
    area: "约8万公顷"
  },
  {
    province: "台湾",
    hasBamboo: true,
    types: ["孟宗竹", "绿竹", "麻竹"],
    description: "阿里山、溪头等地竹林茂密，竹笋是重要农产品。台湾竹编工艺精致，享誉国际。",
    area: "约15万公顷"
  },
  {
    province: "陕西",
    hasBamboo: true,
    types: ["箭竹", "刚竹", "巴山木竹"],
    description: "秦岭以南的汉中、安康地区有竹林分布，是大熊猫栖息地的北缘。秦岭箭竹独特珍贵。",
    area: "约12万公顷"
  },
  {
    province: "甘肃",
    hasBamboo: true,
    types: ["箭竹"],
    description: "陇南文县等地有少量箭竹分布，是大熊猫栖息地的重要组成部分。北方竹子的最北界。",
    area: "约5万公顷"
  }
];

// 中国地图SVG路径数据（更精确的省份轮廓）
const chinaMapPaths = [
  { id: "heilongjiang", name: "黑龙江", path: "M520,40 L580,35 L610,50 L630,70 L640,90 L630,110 L600,120 L570,125 L540,115 L520,95 L505,70 L510,50 Z" },
  { id: "jilin", name: "吉林", path: "M530,120 L570,115 L595,125 L610,145 L605,165 L580,180 L550,175 L530,155 L525,135 Z" },
  { id: "liaoning", name: "辽宁", path: "M545,180 L580,175 L600,185 L610,205 L595,225 L570,230 L545,220 L535,205 L540,185 Z" },
  { id: "neimenggu", name: "内蒙古", path: "M300,60 L480,50 L510,70 L520,100 L510,140 L470,160 L400,170 L330,165 L290,145 L270,110 L280,80 Z" },
  { id: "beijing", name: "北京", path: "M505,200 L520,195 L525,205 L515,215 L500,210 Z" },
  { id: "tianjin", name: "天津", path: "M520,210 L535,205 L540,215 L530,225 L515,220 Z" },
  { id: "hebei", name: "河北", path: "M470,190 L505,185 L525,200 L520,225 L500,240 L470,235 L455,215 L460,195 Z" },
  { id: "shanxi", name: "山西", path: "M440,200 L470,195 L480,215 L475,245 L450,255 L430,240 L435,210 Z" },
  { id: "shandong", name: "山东", path: "M525,230 L560,225 L580,240 L575,270 L550,280 L525,270 L515,250 Z" },
  { id: "henan", name: "河南", path: "M455,250 L490,245 L505,260 L500,290 L470,300 L450,285 L450,260 Z" },
  { id: "shaanxi", name: "陕西", path: "M400,230 L435,225 L445,250 L440,285 L410,300 L390,285 L395,245 Z" },
  { id: "gansu", name: "甘肃", path: "M280,200 L370,190 L395,215 L390,260 L340,280 L290,270 L270,240 L275,210 Z" },
  { id: "qinghai", name: "青海", path: "M230,220 L295,215 L310,245 L300,290 L260,305 L220,285 L225,240 Z" },
  { id: "ningxia", name: "宁夏", path: "M380,240 L395,235 L400,250 L390,265 L375,265 L370,250 Z" },
  { id: "xinjiang", name: "新疆", path: "M60,100 L180,90 L220,130 L210,200 L150,230 L90,220 L50,170 L45,130 Z" },
  { id: "xizang", name: "西藏", path: "M100,260 L190,250 L230,290 L225,360 L170,390 L120,370 L95,320 Z" },
  { id: "sichuan", name: "四川", path: "M310,310 L370,300 L395,330 L390,380 L350,405 L310,400 L290,360 L300,320 Z" },
  { id: "chongqing", name: "重庆", path: "M395,340 L415,335 L420,350 L410,365 L390,365 L385,350 Z" },
  { id: "yunnan", name: "云南", path: "M260,380 L320,370 L345,405 L335,455 L290,470 L255,450 L260,400 Z" },
  { id: "guizhou", name: "贵州", path: "M360,375 L395,370 L410,395 L400,425 L370,430 L355,410 L355,385 Z" },
  { id: "hunan", name: "湖南", path: "M440,335 L485,330 L505,355 L495,395 L460,405 L435,390 L435,350 Z" },
  { id: "hubei", name: "湖北", path: "M420,290 L465,285 L480,305 L475,335 L440,345 L415,330 L415,300 Z" },
  { id: "anhui", name: "安徽", path: "M495,280 L530,275 L545,295 L535,325 L505,335 L490,320 L490,290 Z" },
  { id: "jiangsu", name: "江苏", path: "M530,260 L560,255 L570,275 L560,300 L535,305 L525,285 Z" },
  { id: "shanghai", name: "上海", path: "M560,300 L570,295 L575,305 L565,315 L555,310 Z" },
  { id: "zhejiang", name: "浙江", path: "M530,320 L560,315 L575,335 L565,370 L540,380 L525,360 L525,330 Z" },
  { id: "fujian", name: "福建", path: "M535,370 L565,365 L580,390 L570,425 L545,435 L530,415 L530,380 Z" },
  { id: "jiangxi", name: "江西", path: "M495,375 L530,370 L540,395 L530,430 L500,440 L485,420 L490,390 Z" },
  { id: "guangdong", name: "广东", path: "M465,430 L510,425 L525,450 L515,490 L480,500 L460,480 L460,440 Z" },
  { id: "guangxi", name: "广西", path: "M385,420 L435,415 L450,445 L440,485 L405,495 L380,475 L380,435 Z" },
  { id: "hainan", name: "海南", path: "M440,515 L465,510 L475,525 L465,545 L440,545 L430,530 Z" },
  { id: "taiwan", name: "台湾", path: "M600,410 L615,405 L620,425 L615,460 L600,465 L595,435 Z" }
];

// 声音地图板块 - 诗意卡片式排版 (已注释，准备替换为视频)
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

//           {/* 诗人信息 */}
//           <div className="flex items-center justify-center gap-3 mb-12">
//             <div className="w-16 h-px bg-ochre/30" />
//             <span className="text-sm text-muted-foreground/70">{item.poet} · {item.year}</span>
//             <div className="w-16 h-px bg-ochre/30" />
//           </div>

//           {/* 描述文本 */}
//           <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-16">
//             {item.description}
//           </p>

//           {/* 装饰性元素 */}
//           <div className="flex items-center justify-center gap-6">
//             <div className="w-3 h-3 rounded-full bg-bamboo/30" />
//             <div className="w-3 h-3 rounded-full bg-ochre/30" />
//             <div className="w-3 h-3 rounded-full bg-bamboo/30" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// 中国竹子分布地图组件 - 使用ECharts官方标准地图
function BambooDistributionMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  const getProvinceData = (provinceName: string) => {
    return bambooDistribution.find(p => p.province === provinceName);
  };

  useEffect(() => {
    // 检查ECharts是否已加载
    if (typeof window === 'undefined' || !window.echarts) {
      // 加载ECharts和中国地图数据
      const script1 = document.createElement('script');
      script1.src = 'https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js';
      script1.onload = () => {
        const script2 = document.createElement('script');
        script2.src = 'https://cdn.jsdelivr.net/npm/echarts/map/js/china.js';
        script2.onload = initChart;
        document.head.appendChild(script2);
      };
      document.head.appendChild(script1);
    } else {
      initChart();
    }

    function initChart() {
      if (!mapRef.current || !window.echarts) return;

      // 初始化ECharts实例
      chartRef.current = window.echarts.init(mapRef.current);

      // 准备地图数据
      const mapData = chinaMapPaths.map(province => {
        const data = getProvinceData(province.name);
        return {
          name: province.name,
          value: data?.hasBamboo ? 1 : 0,
          data: data
        };
      });

      // 配置项
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: function(params: any) {
            const data = params.data?.data;
            if (!data) {
              return `${params.name}<br/>无竹子分布`;
            }
            return `
              <div style="padding: 10px;">
                <h3 style="font-size: 18px; font-weight: bold; color: #6b8e23; margin-bottom: 8px;">${data.province}</h3>
                <div style="font-size: 12px; color: #6b8e23; background: rgba(107, 142, 35, 0.1); padding: 2px 8px; border-radius: 10px; display: inline-block; margin-bottom: 8px;">${data.area}</div>
                <div style="margin-bottom: 8px;">
                  <div style="font-size: 12px; color: #d97706; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">主要竹种</div>
                  <div style="display: flex; flex-wrap: gap; gap: 4px;">
                    ${data.types.map((type: string) => `<span style="font-size: 12px; background: rgba(241, 245, 249, 0.6); color: #1e293b; padding: 2px 8px; border-radius: 8px;">${type}</span>`).join('')}
                  </div>
                </div>
                <div style="border-top: 1px solid rgba(148, 163, 184, 0.3); padding-top: 8px; font-size: 12px; line-height: 1.4; color: #64748b;">
                  ${data.description}
                </div>
                <div style="margin-top: 8px; font-size: 10px; color: #d97706; display: flex; align-items: center; gap: 4px;">
                  <span>◆</span>
                  <span>悬停查看详情</span>
                </div>
              </div>
            `;
          },
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderColor: 'rgba(107, 142, 35, 0.3)',
          borderWidth: 1,
          borderRadius: 12,
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.1)'
        },
        visualMap: {
          show: false,
          pieces: [
            {
              value: 1,
              color: 'rgba(107, 142, 35, 0.35)'
            },
            {
              value: 0,
              color: 'rgba(148, 163, 184, 0.15)'
            }
          ]
        },
        series: [
          {
            name: '竹子分布',
            type: 'map',
            map: 'china',
            roam: false,
            zoom: 1.2,
            center: [104, 38],
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: false
              },
              itemStyle: {
                areaColor: 'rgba(107, 142, 35, 0.7)',
                borderColor: 'rgba(107, 142, 35, 0.6)',
                borderWidth: 2
              }
            },
            data: mapData
          }
        ]
      };

      // 设置配置项
      chartRef.current.setOption(option);

      // 响应式调整
      const resizeHandler = () => {
        chartRef.current?.resize();
      };

      window.addEventListener('resize', resizeHandler);

      // 清理函数
      return () => {
        window.removeEventListener('resize', resizeHandler);
        chartRef.current?.dispose();
      };
    }

    // 清理函数
    return () => {
      chartRef.current?.dispose();
    };
  }, []);

  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20" id="distribution">
      <div className="max-w-6xl w-full">
        {/* 标题 */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-ochre/50" />
            <span className="text-xs tracking-[0.4em] text-ochre uppercase">Distribution</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-ochre/50" />
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-bamboo mb-6 tracking-tight">
            竹韵九州
          </h2>
          <p className="text-muted-foreground/60 text-lg tracking-widest mb-4">
            分布概览
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            竹子主要分布于中国长江流域及以南地区，十六省区拥有丰富的竹资源
          </p>
        </div>

        {/* 地图容器 */}
        <div className="relative bg-card/30 rounded-2xl p-8 backdrop-blur-sm border border-border/20">
          <div 
            ref={mapRef}
            className="w-full h-[70vh]"
            style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
          />

          {/* 图例 */}
          <div className="mt-8 flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-bamboo/50 border border-bamboo/60"></div>
              <span className="text-muted-foreground">竹子分布区</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-slate-400/20 border border-slate-400/30"></div>
              <span className="text-muted-foreground">无竹子分布</span>
            </div>
          </div>
        </div>

        {/* 底部说明 */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground/60">
            鼠标悬停在绿色区域可查看该省竹子详细信息
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Chapter0() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    setHeaderVisible(true);
  }, []);

  return (
    <div className={`relative bg-background transition-opacity duration-700 ${isExiting ? "opacity-0" : "opacity-100"}`}>
      {/* 背景 */}
      <BambooBackground />

      {/* 视频背景组件 */}
      <VideoBackground
        //src="/video/chapter0.mp4"
        src="https://liveln-my.sharepoint.com/:v:/g/personal/yitonglu2_ln_hk/IQB5ndLSgZPuQ4hcjquT4QlcAaSNjHWYm-W4W14OORe0hrk?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=37oO2J"
        overlayOpacity={50}
        zIndex={{ video: 5, overlay: 6 }}
      />

      {/* 顶部导航栏 */}
      <TopNavbar />

      {/* Logo */}
      <Logo />

      {/* 导航 */}
      <nav className="fixed top-6 left-6 z-50">
        <Link href="/timeline" className="text-sm text-muted-foreground hover:text-bamboo transition-colors">
          ← 时间轴
        </Link>
      </nav>

      {/* 页面标题区域 - 全屏居中 */}
      <header className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        <div className={`text-center transition-all duration-1000 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-ochre/50" />
          <span className="inline-block px-4 py-2 text-sm tracking-widest text-ochre border border-ochre/30 rounded-full mb-8">
            第一篇章
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-bamboo">
            竹韵万象
          </h1>
          <p className="text-muted-foreground/80 text-lg tracking-widest mb-6">
            生态之美
          </p>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12">
            一竿竹影，万籁清音，藏着竹的生态万象
          </p>
          <div className="animate-bounce">
            <span className="text-muted-foreground/40 text-3xl">↓</span>
          </div>
        </div>
      </header>

      {/* 竹韵九州 - 中国竹子分布地图 */}
      <BambooDistributionMap />

      {/* 竹影风物板块 */}
      <section className="relative z-10" id="ecology">
        {/* 板块标题 */}
        <div className="min-h-[15vh] flex items-center justify-center px-6 py-10">
          <div className="text-center max-w-2xl">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-ochre/50" />
              <span className="text-xs tracking-[0.4em] text-ochre uppercase">ECOLOGY</span>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-ochre/50" />
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-bamboo mb-6 tracking-tight">
              竹影风物
            </h2>
            <p className="text-muted-foreground/60 text-lg tracking-widest mb-6">
              生态之美
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              三种典型竹种，展现竹类植物的多样性与生态价值
            </p>
            <div className="animate-bounce">
              <span className="text-muted-foreground/40 text-3xl">↓</span>
            </div>
          </div>
        </div>

        {/* 竹子内容 */}
        <div className="space-y-0">
          {bambooEcology.map((bamboo, index) => (
            <BambooEcologySection key={bamboo.id} bamboo={bamboo} index={index} />
          ))}
        </div>
      </section>

      {/* 竹语空声板块 */}
      <section className="relative z-10" id="sound">
        {/* 板块标题 */}
        <div className="min-h-[60vh] flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-2xl">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-ochre/50" />
              <span className="text-xs tracking-[0.4em] text-ochre uppercase">Sound</span>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-ochre/50" />
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-bamboo mb-6 tracking-tight">
              竹语空声
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              四季竹声，诗意盎然，传承千年文化底蕴
            </p>
          </div>
        </div>

        {/* 视频播放器区域 - 三个视频水平分布 */}
        <div className="relative w-full px-6 mt-4 mb-12">
          <div className="flex gap-6 justify-center items-start">
            {/* 视频1 */}
            <div className="flex-1 max-w-sm">
              <video
                className="w-full h-auto object-contain rounded-lg"
                controls
                playsInline
                src="https://liveln-my.sharepoint.com/:v:/g/personal/yitonglu2_ln_hk/IQDHA19IGI8dSJegji-MwqmnAYgevptznXpfx7eUmmqvSa4?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=pdejV4"
              />
            </div>
            {/* 视频2 */}
            <div className="flex-1 max-w-sm">
              <video
                className="w-full h-auto object-contain rounded-lg"
                controls
                playsInline
                src="https://liveln-my.sharepoint.com/:v:/g/personal/yitonglu2_ln_hk/IQDWAxNuFdnuS6x4_zILaPkcASRT-PJtdsgru1BymQfj-Ms?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=lciwtq"
              />
            </div>
            {/* 视频3 */}
            <div className="flex-1 max-w-sm">
              <video
                className="w-full h-auto object-contain rounded-lg"
                controls
                playsInline
                src="https://liveln-my.sharepoint.com/:v:/g/personal/yitonglu2_ln_hk/IQBoUh9nhL5RTqX9xIoU6w1PAR-PtDUDEABNL1vVQF6BGwc?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=YuvSSR"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 空白背景区域 */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80"></div>
        <div className="relative text-9xl font-bold text-white/10">竹</div>
      </section>

      {/* 底部固定导航 */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <Link href="/chapter1" className="flex flex-col items-center text-muted-foreground/60 hover:text-bamboo transition-colors">
          <span className="text-xs mb-1">继续探索</span>
          <span className="text-lg">↓</span>
        </Link>
      </div>
    </div>
  );
}
