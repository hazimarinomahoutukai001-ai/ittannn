'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Zen_Maru_Gothic, Noto_Sans_JP, Montserrat, Playfair_Display } from 'next/font/google';
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  PlayCircle,
  Plus,
  Minus,
  Globe,
  Zap,
  CheckCircle2,
  Heart,
  ArrowRight,
  Mail,
  Users,
  Trophy,
  Video,
  Building2,
  BadgePercent,
  Handshake,
  CheckCircle,
  Building,
} from 'lucide-react';

import {
  siteConfig,
  menuItems,
  newsItems,
  memoryItems,
  staffList,
  galleryItems,
  faqList,
  guidelineList,
  sponsorData,
  articleItems,
  collectiveData,
} from './data';

const softFont = Zen_Maru_Gothic({ weight: ['400', '500', '700'], subsets: ['latin'] });
const cleanFont = Noto_Sans_JP({ weight: ['400', '500', '700', '900'], subsets: ['latin'] });
const montserrat = Montserrat({ weight: ['200', '300', '400', '700', '900'], subsets: ['latin'] });
const playfair = Playfair_Display({ weight: ['400', '700', '900'], style: ['italic', 'normal'], subsets: ['latin'] });

const menuBgTransition = { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };
const menuStaggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } } };
const menuStaggerItem = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' as const } } };
const pageTransition = { duration: 0.5 };
const fadeInVariant = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const staggerItem = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

export default function UltimateCommunitySite() {
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activePage, setActivePage] = useState('home');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [memoryIndex, setMemoryIndex] = useState(0);
  const [previousPage, setPreviousPage] = useState('home')

  const [direction, setDirection] = useState(0); 
  const [modalMode, setModalMode] = useState(""); // "" なら閉じている、"join" なら参加、"contact" なら問い合わせ
  const paginate = (newDirection: number) => { 
    setDirection(newDirection);
    setMemoryIndex((prevIndex) => (prevIndex + newDirection + memoryItems.length) % memoryItems.length);
  };

  const heroIndex = 0; 
  const profileRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress, scrollY } = useScroll();
  const yBg1 = useTransform(scrollY, [0, 1000], [0, 150]); 
  const yBg2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const yHero = useTransform(scrollY, [0, 1000], [0, -50]); 
  const parallaxAbout = useTransform(scrollYProgress, [0, 1], [50, -150]);
  const parallaxX = useTransform(scrollYProgress, [0, 1], [0, -1000]);
  const carouselRef = useRef(null);
// =========================================================================
  // ⭐ 画像サイズ＆位置調整パネル
  // =========================================================================
  const heroImageConfig = {
    marginTop: "5vh", 
    marginBottom: "10vh",
  };
  // =========================================================================
  // =========================================================================
    const marqueeMembers = useMemo(() => {
    const individuals = staffList.filter((s) => s.id !== 'collective');
    // 💡 12個の枠を埋めるために、メンバーを順番にループさせます
    return Array.from({ length: 12 }).map((_, idx) => {
      const baseMember = individuals[idx % individuals.length];
      return {
        ...baseMember,
        uniqueKey: `marquee-${idx}`,
        // 💡 ダミーの名前ではなく、data.tsの本物のデータをそのまま使う！
        displayName: baseMember.name,
        roleName: baseMember.role,
      };
    });
  }, []);

 useEffect(() => {
  // サイト訪問から3.5秒後にロードを解除する
  const timer = setTimeout(() => {
    setLoading(false);
  }, 3500); 

  return () => clearTimeout(timer);
}, []);

  const switchPage = (pageName: string) => {
    setActivePage(pageName);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openArticle = (articleId: string) => {
    setPreviousPage(activePage);
    setActiveArticleId(articleId);
    setActivePage('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMemberClick = (idx: number) => {
    setSelectedIndex(idx);
    setTimeout(() => {
      if (profileRef.current) {
        const elementPosition = profileRef.current.getBoundingClientRect().top + window.scrollY;
        const offset = -80;
        window.scrollTo({ top: elementPosition + offset, behavior: 'smooth' });
      }
    }, 100);
  };

  const faqSection = (
    <div className="max-w-3xl mx-auto">
      <div className="mb-12 border-b border-slate-200 pb-6">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-2">
          FAQ
        </h2>
        <p className="text-blue-500 text-[11px] font-bold tracking-[0.2em] uppercase">
          Common Questions
        </p>
      </div>
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
        {faqList.map((faq, idx) => (
          <motion.div variants={staggerItem} key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:border-blue-200 hover:shadow-md">
            <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full p-6 text-left flex justify-between items-center font-bold text-slate-800 hover:text-blue-500 transition-colors">
              <span className="pr-4">{faq.q}</span>
              <div className={`p-2 rounded-full transition-colors ${openFaq === idx ? 'bg-blue-50 text-blue-500' : 'bg-slate-50 text-slate-400'}`}>
                {openFaq === idx ? <Minus size={16} /> : <Plus size={16} />}
              </div>
            </button>
            <AnimatePresence>
              {openFaq === idx && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-slate-500 text-sm leading-relaxed overflow-hidden">
                  <div className="pt-4 border-t border-slate-50">{faq.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );

if (loading)
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white fixed inset-0 z-[9999]">
        
        {/* max-w-xsを外して、画面幅いっぱい(w-full)で中央揃えにすることで狭いスマホにも対応 */}
        <div className="flex flex-col items-center w-full px-2">
          
          {/* 1. 英語名称：絶対に改行させない (whitespace-nowrap) */}
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.6em" }} // スマホでもはみ出ないように最大幅を少し調整
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="text-[9px] sm:text-[10px] md:text-xs font-serif font-extralight text-[#111] uppercase whitespace-nowrap ml-[0.6em]"
          >
            The Streamer Creator Community
          </motion.div>

          {/* 2. センターライン */}
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: "60px" }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
            className="w-[0.5px] bg-[#333] my-6 md:my-8" 
          />

          {/* 3. 日本語名称（テキスト変更）：絶対に改行させない (whitespace-nowrap) */}
          <div className="overflow-hidden w-full flex justify-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
              // 🌟 スマホでは文字と字間を少し小さくし、PCでは大きくするレスポンシブ対応！
              className="text-[8px] sm:text-[9px] md:text-[11px] font-serif font-light tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.8em] text-[#555] ml-[0.3em] sm:ml-[0.4em] md:ml-[0.8em] whitespace-nowrap"
            >
              配信者クリエイターコミュニティ
            </motion.div>
          </div>

          {/* 4. 下部の進行状況 */}
          <div className="w-24 md:w-32 h-[1px] bg-[#eee] mt-12 md:mt-16 relative overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
              className="absolute inset-0 bg-[#999]"
            />
          </div>
        </div>

        {/* 5. 画面全体のフェードアウト予兆 */}
        <motion.div 
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1, delay: 3.5 }}
          className="fixed inset-0 bg-white pointer-events-none z-[-1]"
        />
      </div>
    );

  return (
    <div className={`bg-white text-slate-800 selection:bg-blue-100 selection:text-blue-600 overflow-x-hidden min-h-screen flex flex-col ${softFont.className}`}>

     {/* 🌟🌟🌟 ここから：時間差で上がる3枚のベール（多重レイヤー演出） 🌟🌟🌟 */}
      <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col">
        {/* 1枚目（最背面）：ほんの少しだけグレー */}
        <motion.div
          initial={{ y: "0%" }}
          animate={{ y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          className="absolute inset-0 bg-[#f8f9fa]"
        />
        {/* 2枚目（中間）：さらに薄いグレー */}
        <motion.div
          initial={{ y: "0%" }}
          animate={{ y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
          className="absolute inset-0 bg-[#fdfdfd]"
        />
        {/* 3枚目（最前面）：純白 ＋ 下部の影 */}
        <motion.div
          initial={{ y: "0%" }}
          animate={{ y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          className="absolute inset-0 bg-white"
        >
          {/* この1pxの線と影が、ベールの立体感と高級感を生み出します */}
          <div className="absolute bottom-0 w-full h-[1px] bg-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)]" />
        </motion.div>
      </div>
      {/* 🌟🌟🌟 追加ここまで 🌟🌟🌟 */}
      
      <style jsx global>{`
        .outline-text-elegant {
          color: transparent;
          -webkit-text-stroke: 1px rgba(200, 200, 200, 0.6);
        }
        .bg-grid-pattern {
          background-size: 60px 60px;
          background-image: 
            linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 1px, transparent 1px);
        }
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>

      <nav>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="fixed top-6 left-6 md:top-8 md:left-8 z-[100] p-4 bg-white/90 backdrop-blur-md rounded-full shadow-sm border border-slate-200 text-slate-800 hover:text-blue-600 hover:shadow-md hover:scale-105 active:scale-95 transition-all"
        >
          <AnimatePresence mode="wait">
            <motion.div key={isMenuOpen ? 'close' : 'menu'} initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.3 }}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.div>
          </AnimatePresence>
        </button>
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div initial={{ x: '-100%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: '-100%', opacity: 0 }} transition={menuBgTransition} className="fixed inset-y-0 left-0 z-[90] bg-white/95 backdrop-blur-2xl w-full md:w-[450px] border-r border-slate-200 px-12 pt-36 pb-12 overflow-y-auto flex flex-col shadow-[20px_0_60px_-15px_rgba(0,0,0,0.05)]">
                <motion.div variants={menuStaggerContainer} initial="hidden" animate="visible" className="space-y-8 mt-auto mb-auto">
                  {menuItems.map((item) => (
                    <div key={item.id} className="overflow-hidden py-1">
                      <motion.button variants={menuStaggerItem} onClick={() => switchPage(item.id)} className={`group relative block w-full text-lg md:text-xl tracking-widest font-bold transition-colors duration-500 text-left ${montserrat.className} ${activePage === item.id ? 'text-blue-600' : 'text-slate-500 hover:text-blue-600'}`}>
                        {item.label}
                        <span className="relative block h-[2px] w-full bg-transparent mt-3 overflow-hidden">
                          <span className={`absolute inset-0 bg-blue-600 transition-transform duration-[600ms] ease-out ${activePage === item.id ? 'translate-x-0' : '-translate-x-[101%] group-hover:translate-x-0'}`} />
                        </span>
                      </motion.button>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-[80] bg-slate-900/20 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
            </>
          )}
        </AnimatePresence>
      </nav>

      <div className="flex-grow flex flex-col w-full">
        <AnimatePresence mode="wait">
          <motion.main key={activePage} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={pageTransition} className="w-full flex-grow flex flex-col">
            
            {activePage === 'home' && (
              <>
                <section className="relative w-full min-h-screen flex flex-col items-center justify-start overflow-hidden bg-white">
                  
                  {/* 1. 背景グリッド */}
                  <div className="absolute inset-0 z-0 bg-grid-pattern opacity-100 pointer-events-none" />
                  
                  {/* 2. 背景タイポグラフィ装飾 */}
                  <div className="absolute top-0 left-0 w-full h-screen z-10 pointer-events-none overflow-visible select-none">
                    <motion.div style={{ y: yBg1 }} className={`absolute top-[10vh] left-[5vw] opacity-40 ${playfair.className}`}>
                      <div className="text-[40vw] md:text-[30vw] font-black text-slate-100 leading-[0.7] tracking-tighter italic">
                        TSC
                      </div>
                    </motion.div>

                    <motion.div style={{ y: yBg2 }} className={`absolute top-[20vh] w-full flex justify-center opacity-70 z-0 ${montserrat.className}`}>
                      <div className="text-[12vw] md:text-[8vw] font-black outline-text-elegant tracking-[0.2em] uppercase">
                        Streamer
                      </div>
                    </motion.div>
                    
                    <motion.div style={{ y: yBg2 }} className={`absolute top-[50vh] w-full flex justify-center opacity-70 z-0 ${montserrat.className}`}>
                      <div className="text-[12vw] md:text-[8vw] font-black outline-text-elegant tracking-[0.2em] uppercase">
                        Creator
                      </div>
                    </motion.div>

                    {/* サイドの縦書きテキスト */}
                    <div className={`absolute left-4 md:left-12 top-[40vh] z-30 opacity-40 ${montserrat.className}`}>
                      <span className="vertical-text text-[10px] md:text-xs font-bold tracking-[0.5em] text-slate-500 uppercase">
                        Official Portal Site — EST. 2026
                      </span>
                    </div>

                    <div className={`absolute right-4 md:right-12 top-[40vh] z-30 opacity-40 ${montserrat.className}`}>
                      <span className="vertical-text text-[10px] md:text-xs font-bold tracking-[0.5em] text-slate-500 uppercase">
                        The Streamer Creator Server
                      </span>
                    </div>
                  </div>

                  {/* 3. 左下キャッチコピーエリア（マスクアニメーション維持） */}
                  <div className="absolute hidden lg:flex flex-col justify-center items-start left-[5%] bottom-[60vh] z-10 pointer-events-none overflow-hidden">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
                      className="relative"
                    >
                     <motion.h1 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className={`${cleanFont.className} text-4xl xl:text-5xl font-bold tracking-widest text-slate-800 relative leading-loose flex flex-col items-start`}
                      >
                        {/* ⭐ 1行目 */}
                        <div className="relative overflow-hidden w-fit px-1">
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            // 黒い箱が文字を覆い隠した瞬間（1.4秒）に、箱の裏で文字をパッと表示させます
                            transition={{ delay: 1.4, duration: 0.01 }} 
                            className="block"
                          >
                            良き出会いを！
                          </motion.span>
                          <motion.div
                            initial={{ x: "-101%" }} // 最初は左の外側で待機
                            animate={{ x: ["-101%", "0%", "101%"] }} // 左から入ってきて(0%)、右へ抜ける(101%)
                            transition={{ 
                              delay: 1.0, 
                              duration: 0.8, // 全体で0.8秒かける
                              times: [0, 0.5, 1], // 0秒(左), 0.4秒で真ん中, 0.8秒で右へ抜ける
                              ease: "easeInOut" 
                            }} 
                            className="absolute inset-0 bg-slate-800" 
                          />
                        </div>

                        {/* ⭐ 2行目 (タイミングを0.2秒遅らせる) */}
                        <div className="relative overflow-hidden w-fit px-1">
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.6, duration: 0.01 }} 
                            className="block"
                          >
                            良き活動を！
                          </motion.span>
                          <motion.div
                            initial={{ x: "-101%" }} 
                            animate={{ x: ["-101%", "0%", "101%"] }} 
                            transition={{ delay: 1.2, duration: 0.8, times: [0, 0.5, 1], ease: "easeInOut" }} 
                            className="absolute inset-0 bg-slate-800" 
                          />
                        </div>

                        {/* ⭐ 3行目 (さらに0.2秒遅らせる) */}
                        <div className="relative overflow-hidden w-fit px-1">
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.8, duration: 0.01 }} 
                            className="block"
                          >
                            そして良き居場所を！
                          </motion.span>
                          <motion.div
                            initial={{ x: "-101%" }} 
                            animate={{ x: ["-101%", "0%", "101%"] }} 
                            transition={{ delay: 1.4, duration: 0.8, times: [0, 0.5, 1], ease: "easeInOut" }} 
                            className="absolute inset-0 bg-slate-800" 
                          />
                        </div>
                      </motion.h1>
                    </motion.div>
                  </div>

                  {/* ⭐ 4. 右側オシャレ文字エリア（ふわっと浮き上がるアニメーションに変更） ⭐ */}
                  <div className="absolute hidden lg:flex flex-col justify-center items-start right-[4%] xl:right-[6%] top-[48%] -translate-y-1/2 z-10 pointer-events-none">
                    <motion.div
                      // 下から（y: 30）上へ（y: 0）ふわっとフェードインします
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      // タイミングは左のキャッチコピーと合うようにディレイを調整
                      transition={{ delay: 1.2, duration: 1.2, ease: "easeOut" }}
                      className="relative"
                    >
                      <h1 className={`${montserrat.className} text-4xl xl:text-[4.5rem] font-[200] tracking-[0.2em] text-slate-800 leading-[1.1]`}>
                        THE<br />
                        STREAMER<br />
                        CREATOR<br />
                        <span className="text-blue-600 font-[300]">SERVER</span>
                      </h1>
                      
                      <div className="mt-6 flex items-center gap-4 opacity-60">
                        <div className="w-12 h-[1px] bg-slate-800"></div>
                        <span className={`text-[9px] tracking-[0.4em] font-bold uppercase ${montserrat.className}`}>EST. 2026</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* 5. キャラクター層 */}
                  <motion.div 
                    className="relative z-20 flex-shrink-0 flex justify-center pointer-events-none"
                    style={{ 
                      y: yHero, 
                      marginTop: heroImageConfig.marginTop,
                      marginBottom: heroImageConfig.marginBottom,
                      transform: "translateX(-2%)" 
                    }}
                  >
                    <motion.img
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                      src={siteConfig.heroImages[heroIndex] || siteConfig.logo}
                      alt="TSC Members"
                      className="w-[270%] max-w-none h-auto md:w-auto md:h-[130vh] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)] pointer-events-auto relative z-10"
                    />
                  </motion.div>
                  
                  <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.8 }}
                      // ⭐ ここが魔法！「block」で表示し、「md:hidden」でPCの時は消す！
                      className="block md:hidden mt-6 text-center relative z-20 pointer-events-none"
                    >
                      <h1 className={`text-2xl font-black text-slate-800 tracking-widest ${cleanFont.className}`}>
                        TSC OFFICIAL
                      </h1>
                      <p className={`text-[10px] font-bold text-slate-400 tracking-[0.3em] mt-1 uppercase ${montserrat.className}`}>
                        The Streamer Creator Server
                      </p>
                    </motion.div>

                      {/* 6. スクロールボタン（SCROLLテキスト＋縦線アニメーション） */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 1 }}
                    // クリックしたら、画面1枚分（100vh）下に自動スクロールする便利な機能付き！
                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                    // ⭐ ここに hidden md:flex を追加！
                    className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex-col items-center pointer-events-auto cursor-pointer gap-3 opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <span className={`text-[9px] font-bold tracking-[0.4em] text-slate-800 pl-1 uppercase ${montserrat.className}`}>
                      SCROLL
                    </span>
                    <div className="w-[1px] h-6 bg-slate-300 relative overflow-hidden">
                      {/* ⭐ 上から下へスーッと線が伸びて消えるアニメーション */}
                      <motion.div 
                        animate={{ y: ['-100%', '0%', '100%'] }} 
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          ease: "easeInOut",
                          times: [0, 0.5, 1]
                        }}
                        className="absolute inset-0 w-full h-full bg-slate-800"
                      />
                    </div>
                  </motion.div>
                </section>

            {/* ⭐ NEWS & MAGAZINE セクション（2カラムレイアウト） ⭐ */}
                <section className="py-24 bg-white relative z-20">
                  <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                      
                      {/* ▼ 左カラム：News ▼ */}
                      <div>
                        <div className="flex items-end justify-between mb-6 pb-4 border-b border-slate-200">
                          <h2 className={`text-3xl md:text-4xl font-black tracking-tight text-slate-900 ${cleanFont.className}`}>
                            News
                          </h2>
                          <button 
                            onClick={() => switchPage('news')}
                            className={`text-[11px] md:text-xs font-bold tracking-widest text-slate-800 hover:text-blue-600 transition-colors flex items-center gap-1 uppercase ${montserrat.className}`}
                          >
                            MORE <ChevronRight size={14} className="mt-0.5" />
                          </button>
                        </div>
                        
                        <div className="flex flex-col">
                          {newsItems.slice(0, 3).map((news) => (
                            <div 
                              key={news.id} 
                              onClick={() => news.articleId && openArticle(news.articleId)}
                              className={`py-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center gap-2 md:gap-6 group transition-colors hover:bg-slate-50 px-2 -mx-2 rounded-lg ${news.articleId ? 'cursor-pointer' : ''}`}
                            >
                              <div className={`text-sm font-bold text-slate-900 shrink-0 ${montserrat.className}`}>
                                {news.date}
                              </div>
                              <h3 className={`text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors leading-relaxed ${cleanFont.className}`}>
                                {news.title}
                              </h3>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* ▼ 右カラム：Magazine ▼ */}
                      <div>
                        <div className="flex items-end justify-between mb-6 pb-4 border-b border-slate-200">
                          <h2 className={`text-3xl md:text-4xl font-black tracking-tight text-slate-900 ${cleanFont.className}`}>
                            Magazine
                          </h2>
                          <button 
                            onClick={() => switchPage('magazine')}
                            className={`text-[11px] md:text-xs font-bold tracking-widest text-slate-800 hover:text-blue-600 transition-colors flex items-center gap-1 uppercase ${montserrat.className}`}
                          >
                            MORE <ChevronRight size={14} className="mt-0.5" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {articleItems.slice(0, 2).map((article) => (
                            <div 
                              key={article.id}
                              onClick={() => openArticle(article.id)}
                              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col"
                            >
                              {article.thumbnail ? (
                                <div className="w-full h-40 bg-slate-100 overflow-hidden shrink-0">
                                  <img 
                                    src={article.thumbnail} 
                                    alt={article.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                  />
                                </div>
                              ) : (
                                <div className="w-full h-40 bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center text-slate-300">
                                  <span className={`font-bold tracking-widest ${montserrat.className}`}>NO IMAGE</span>
                                </div>
                              )}
                              <div className="p-5 flex flex-col flex-grow">
                                <span className={`text-xs font-bold text-slate-900 mb-2 ${montserrat.className}`}>
                                  {article.date}
                                </span>
                                <h3 className={`text-sm font-bold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors line-clamp-3 ${cleanFont.className}`}>
                                  {article.title}
                                </h3>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                </section>


                {/* ACTIVITY LOG セクション */}
                <section className="py-24 bg-[#FAFAFA] relative overflow-hidden z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                  <div className="max-w-6xl mx-auto relative z-10 px-6 md:px-0">
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-100px' }}
                      variants={fadeInVariant}
                      className="mb-12 text-center"
                    >
                      <p className={`text-blue-500 font-bold text-[11px] tracking-[0.4em] uppercase mb-4 ${montserrat.className}`}>
                        Activity Log
                      </p>
                      <h2
                        className={`text-3xl md:text-4xl font-black tracking-tight uppercase ${cleanFont.className}`}
                      >
                        TSC Activity Log
                      </h2>
                      <div className="w-12 h-1 bg-blue-500 mx-auto mt-6" />
                    </motion.div>
                  </div>

                  <div className="relative w-full max-w-6xl mx-auto h-[250px] sm:h-[350px] md:h-[450px] flex items-center justify-center overflow-hidden px-4 md:px-0">
                    {memoryItems.map((item, idx) => {
                      const length = memoryItems.length;
                      let offset = (idx - memoryIndex) % length;
                      if (offset > Math.floor(length / 2)) offset -= length;
                      if (offset < -Math.floor(length / 2)) offset += length;

                      const isCenter = offset === 0;
                      const isVisible = Math.abs(offset) <= 1;

                      const xPosition = offset * 85;
                      const scale = isCenter ? 1 : 0.85;
                      const opacity = isCenter ? 1 : isVisible ? 0.4 : 0;
                      const zIndex = isCenter ? 10 : isVisible ? 5 : 0;

                      return (
                        <motion.div
                          key={item.id || idx}
                          animate={{
                            x: `${xPosition}%`,
                            scale: scale,
                            opacity: opacity,
                            zIndex: zIndex,
                          }}
                          transition={{ duration: 0.6 }}
                          drag={isCenter ? 'x' : false}
                          dragConstraints={{ left: 0, right: 0 }}
                          dragElastic={1}
                          onDragEnd={(e, { offset: dragOffset, velocity }) => {
                            if (!isCenter) return;
                            const swipe = swipePower(dragOffset.x, velocity.x);
                            if (swipe < -swipeConfidenceThreshold) paginate(1);
                            else if (swipe > swipeConfidenceThreshold)
                              paginate(-1);
                          }}
                          onClick={() => {
                            if (offset === -1) paginate(-1);
                            if (offset === 1) paginate(1);
                          }}
                          className={`absolute w-[75%] sm:w-[65%] max-w-4xl h-full flex items-center justify-center ${
                            isCenter
                              ? 'cursor-grab active:cursor-grabbing'
                              : 'cursor-pointer'
                          } ${
                            isVisible
                              ? 'pointer-events-auto'
                              : 'pointer-events-none'
                          }`}
                        >
                          <div
                            className={`relative w-full h-full rounded-3xl overflow-hidden shadow-xl border-4 ${
                              isCenter ? 'border-white' : 'border-white/50'
                            } bg-white group`}
                          >
                           {item.type === 'image' ? (
                              <img
                                src={item.src}
                                className="w-full h-full object-cover pointer-events-none"
                                alt={item.title || '思い出'}
                              />
                            ) : (
                              <div className="w-full h-full relative">
                                {(item as any).platform === 'twitch' ? (
                                  <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://player.twitch.tv/?video=${(item as any).videoId}&parent=localhost&parent=hazimarinomahoutukai001-ai.github.io&autoplay=false`}
                                    frameBorder="0"
                                    allowFullScreen
                                    className={`w-full h-full ${
                                      isCenter
                                        ? 'pointer-events-auto'
                                        : 'pointer-events-none'
                                    }`}
                                  ></iframe>
                                ) : (
                                  <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${(item as any).youtubeId || (item as any).videoId}`}
                                    frameBorder="0"
                                    allowFullScreen
                                    className={`w-full h-full ${
                                      isCenter
                                        ? 'pointer-events-auto'
                                        : 'pointer-events-none'
                                    }`}
                                  ></iframe>
                                )}
                                {!isCenter && (
                                  <div className="absolute inset-0 z-10" />
                                )}
                              </div>
                            )}

                            {item.title && (
                              <div
                                className={`absolute bottom-0 inset-x-0 p-4 md:p-6 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent pointer-events-none transition-opacity duration-300 ${
                                  isCenter ? 'opacity-100' : 'opacity-0'
                                }`}
                              >
                                <h3
                                  className={`text-lg md:text-2xl font-bold text-white tracking-wider ${cleanFont.className}`}
                                >
                                  {item.title}
                                </h3>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}

                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 md:px-8 z-20 pointer-events-none">
                      <button
                        onClick={() => paginate(-1)}
                        className="pointer-events-auto p-3 md:p-4 bg-white/90 backdrop-blur-md shadow-lg border border-slate-100 rounded-full text-blue-600 hover:text-white hover:bg-blue-500 hover:border-blue-500 hover:scale-110 active:scale-95 transition-all"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={() => paginate(1)}
                        className="pointer-events-auto p-3 md:p-4 bg-white/90 backdrop-blur-md shadow-lg border border-slate-100 rounded-full text-blue-600 hover:text-white hover:bg-blue-500 hover:border-blue-500 hover:scale-110 active:scale-95 transition-all"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center gap-3 mt-8 relative z-10">
                    {memoryItems.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setDirection(idx > memoryIndex ? 1 : -1);
                          setMemoryIndex(idx);
                        }}
                        className={`transition-all duration-300 rounded-full ${
                          memoryIndex === idx
                            ? 'w-8 h-2 bg-blue-600'
                            : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                        }`}
                      />
                    ))}
                  </div>

                </section>
                                <section className="py-32 px-6 bg-white border-t border-slate-100 overflow-hidden relative">
                  <motion.div style={{ x: parallaxX }} className="absolute top-16 left-0 w-[200%] pointer-events-none select-none z-0">
                    <span className={`text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-black text-slate-100/60 whitespace-nowrap tracking-tighter ${cleanFont.className}`}>THE STREAMER CREATOR SERVER THE STREAMER CREATOR SERVER</span>
                  </motion.div>

                  <div className="max-w-5xl mx-auto relative z-10">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={fadeInVariant} className="mb-20">
                      <p className="text-blue-500 font-bold text-[11px] tracking-[0.4em] uppercase mb-4">About TSC</p>
                      <h2 className={`text-4xl md:text-5xl font-black tracking-tight uppercase mb-4 text-slate-900 ${cleanFont.className}`}>TSC鯖ってどんなところ?</h2>
                      <div className="w-8 h-1 bg-blue-500" />
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInVariant} className="space-y-6 text-slate-600 relative z-10">
                        <p className="text-xl leading-loose font-medium text-slate-800 bg-white/50 backdrop-blur-sm rounded-lg">ストリーマー、クリエイター、そしてゲームを愛するすべての人が集う「第三の居場所」です。</p>
                        <p className="leading-loose text-slate-500 bg-white/50 backdrop-blur-sm rounded-lg">一人で遊ぶよりも、誰かと共有する喜びを。技術と創造性を掛け合わせ、新しいエンターテインメントの形を追求しています。</p>
                      </motion.div>
                      
                      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 gap-4 relative z-10">
                        {[ { icon: <Globe size={20} />, title: 'Open Environment', desc: '誰でも歓迎するオープンな空気感。' }, { icon: <Zap size={20} />, title: 'Tech & Creative', desc: '最新技術を取り入れた配信環境。' }, ].map((item, idx) => (
                          <motion.div variants={staggerItem} key={idx} className="flex items-start gap-5 p-8 bg-[#FAFAFA] rounded-2xl border border-slate-100 transition-all hover:shadow-md hover:border-blue-100 hover:-translate-y-1 group relative overflow-hidden">
                            <div className="text-blue-500 p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform relative z-10">{item.icon}</div>
                            <div className="relative z-10">
                              <h4 className={`font-bold text-sm uppercase tracking-wider mb-2 text-slate-900 ${cleanFont.className}`}>{item.title}</h4>
                              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </section>


                <section className="py-16 bg-[#FAFAFA] border-t border-slate-200/50 overflow-hidden flex flex-col items-center justify-center relative">
                  <div className="mb-10 flex flex-col items-center z-10">
                    <p className={`text-blue-500 font-bold text-[10px] tracking-[0.4em] uppercase mb-2 ${montserrat.className}`}>
                      Our Staffs
                    </p>
                    <h3
                      className={`text-xl md:text-2xl font-black text-slate-800 tracking-wider ${cleanFont.className}`}
                    >
                      総勢12名の運営チーム
                    </h3>
                  </div>

                  <div className="w-full flex overflow-hidden group px-0" ref={carouselRef}>
                    <motion.div
                      drag="x"
                      dragConstraints={carouselRef}
                      /* 🌟 修正1：全て半角スペースに直しました！ */
                      className="flex gap-8 md:gap-12 px-4 md:px-6 w-max cursor-grab active:cursor-grabbing"
                      animate={{ x: ['-50%', '0%'] }}
                      transition={{
                        ease: 'linear',
                        duration: 180,
                        repeat: Infinity,
                      }}
                    >
                      {[...marqueeMembers, ...marqueeMembers].map(
                        (member, idx) => (
                          <div
                            key={`marquee-item-${idx}`}
                            className="w-[70vw] h-[50vh] sm:w-[45vw] sm:h-[40vh] md:w-[30vw] md:h-[45vh] lg:w-[25vw] lg:h-[55vh] shrink-0 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-md relative transition-all duration-500 group-hover:opacity-50 hover:!opacity-100 hover:scale-105 hover:shadow-2xl cursor-pointer hover:z-20"
                            onClick={() => switchPage('profile')}
                          >
                            <img
                              src={member.image}
                              alt={member.displayName}
                              /* 🌟 修正2：pointer-events-none を追加しました！ */

                              className="w-full h-full object-cover pointer-events-none"
                            />
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent p-6 flex flex-col justify-end h-1/2">
                              <span className={`text-[10px] md:text-xs font-black text-blue-400 tracking-widest uppercase mb-1 drop-shadow-md ${montserrat.className}`}>
                                {member.roleName}
                              </span>
                              <span className="text-lg md:text-2xl font-bold text-white truncate drop-shadow-md">
                                {member.displayName}
                              </span>
                            </div>
                          </div>
                        )
                      )}
                    </motion.div>
                  </div>
                </section>

                {/* 🔽🔽🔽 ここにABOUTをペースト！！ 🔽🔽🔽 */}
                {/* ⭐ ABOUT セクション（data.ts 連動＆安全対策版） ⭐ */}
               <section className="py-32 px-6 bg-[#FAFAFA] relative overflow-hidden border-t border-slate-100">
                  <motion.div style={{ x: parallaxAbout }} className="absolute top-10 right-0 z-0 pointer-events-none select-none opacity-[0.03]">
                    <span className={`text-[12rem] md:text-[20rem] font-black text-slate-900 leading-none tracking-tighter uppercase ${cleanFont.className}`}>ABOUT</span>
                  </motion.div>

                  <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
                    
                    {/* 左側：画像とステータス */}
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="w-full lg:w-[40%] 2xl:w-[55%] relative flex flex-col items-center lg:items-end justify-center">
                        
                       <div className="relative w-full flex justify-center lg:justify-end pr-4 lg:pr-0">
                          {collectiveData?.image && (
                            <img 
                              src={collectiveData.image} 
                              className="w-[120%] sm:w-[130%] lg:w-full 2xl:w-[150%] max-w-none h-auto object-contain drop-shadow-2xl z-20 relative -right-[5%] lg:-right-[10%]" 
                              alt="TSC Staff Collective" 
                            />
                          )}
                       </div>

                       {/* 🌟 修正済：箱を広げて(w-full)、改行を絶対に防ぐ(whitespace-nowrap)！ */}
                       <div className="mt-12 flex justify-center gap-6 sm:gap-10 lg:gap-6 2xl:gap-16 border-t border-slate-300/50 pt-8 w-full mx-auto relative z-10">
                         <div className="flex flex-col items-center">
                           <span className="text-[10px] md:text-xs text-blue-500 font-black tracking-[0.3em]">ADMIN</span>
                           <span className="text-lg md:text-xl font-bold text-slate-700 mt-2 whitespace-nowrap">
                             管理人 <span className="text-sm ml-1 text-slate-500">{collectiveData?.adminCount || 1}名</span>
                           </span>
                         </div>
                         <div className="w-px h-12 bg-slate-300/50" />
                         <div className="flex flex-col items-center">
                           <span className="text-[10px] md:text-xs text-slate-400 font-black tracking-[0.3em]">SUB-ADMIN</span>
                           <span className="text-lg md:text-xl font-bold text-slate-700 mt-2 whitespace-nowrap">
                             サブ管理人 <span className="text-sm ml-1 text-slate-500">{collectiveData?.subAdminCount || 11}名</span>
                           </span>
                         </div>
                       </div>
                    </motion.div>

                    {/* 右側：テキストコンテンツ */}
                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="w-full lg:w-[60%] 2xl:w-[45%] flex flex-col items-center lg:items-start text-left relative z-10 pt-16 lg:pt-0">
                        
                       <div className="mb-4 relative w-full text-center lg:text-left">
                         <span className={`text-[4.5rem] md:text-[6.5rem] font-black text-slate-300 leading-none tracking-tighter uppercase absolute -top-8 md:-top-12 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 pointer-events-none select-none opacity-80 ${cleanFont.className}`}>ABOUT</span>
                         <h2 className={`text-3xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight uppercase relative z-10 ${cleanFont.className}`}>
                           {collectiveData?.title || '管理者・サブ管理人'}
                         </h2>
                       </div>

                       <div className="w-full mb-8 relative z-10 flex justify-center lg:justify-start">
                         <div className="inline-block bg-blue-50/80 border border-blue-100 px-4 py-2 rounded-full shadow-sm">
                            <p className="text-blue-600 font-black tracking-[0.2em] text-xs md:text-sm uppercase flex items-center gap-2">
                              <ShieldCheck size={16} /> 管理体制 <span className="text-[10px] md:text-xs font-bold text-blue-400">/ {collectiveData?.subtitle || 'Admins & Sub-Admins'}</span>
                            </p>
                         </div>
                       </div>
                       
                       <div className="space-y-6 text-slate-600 leading-loose font-medium text-sm md:text-base border-l-4 border-blue-500 pl-6 bg-white p-6 rounded-2xl lg:rounded-l-none shadow-sm relative z-10 w-full max-w-2xl lg:max-w-none text-left">
                         <p className="text-lg md:text-xl font-bold text-slate-800">
                           総勢<span className="text-blue-500 text-2xl md:text-3xl mx-1 font-black">{collectiveData?.totalCount || 12}</span>名の運営チームが、<br className="hidden md:block" />{collectiveData?.mainMessage || 'あなたの活動をサポートします。'}
                         </p>
                         
                         {collectiveData?.description?.map((text, idx) => (
                           <p key={idx}>{text}</p>
                         ))}
                       </div>

                       <button onClick={() => switchPage('profile')} className="mt-10 mx-auto lg:mx-0 relative z-10 px-8 py-4 bg-white border-2 border-[#333333] text-[#333333] hover:bg-blue-500 hover:border-blue-500 hover:text-white font-bold rounded-full transition-all duration-300 tracking-widest text-xs md:text-sm flex items-center gap-3 group shadow-sm hover:shadow-[0_10px_20px_-10px_rgba(59,130,246,0.5)] hover:-translate-y-1">
                         VIEW MEMBERS <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                       </button>
                    </motion.div>
                  </div>
                </section>

               {/* ⭐ SPONSOR セクション（完全データ連動版！） ⭐ */}
                <section className="py-24 bg-white relative z-20 border-t border-slate-100">
                  <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                      <p className={`text-blue-500 font-bold text-[11px] tracking-[0.4em] uppercase mb-4 ${montserrat.className}`}>
                        {sponsorData.headerTitle}
                      </p>
                      <h2 className={`text-3xl md:text-4xl font-black tracking-tight text-slate-900 ${cleanFont.className}`}>
                        {sponsorData.homeSection.title}
                      </h2>
                      <div className="w-12 h-1 bg-blue-500 mx-auto mt-6 rounded-full"></div>
                    </div>

                    <div className="bg-[#F8FAFC] rounded-3xl p-8 md:p-16 max-w-4xl mx-auto text-center shadow-sm border border-slate-100">
                      <h3 className={`text-xl md:text-2xl font-bold text-slate-800 mb-6 ${cleanFont.className}`}>
                        {sponsorData.homeSection.subtitle}
                      </h3>
                      <p className="text-sm md:text-base text-slate-600 leading-loose mb-10 max-w-2xl mx-auto">
                        {sponsorData.homeSection.text}
                      </p>

                      {/* 🌟 data.ts からタイトルと説明文を自動で読み込んでカードを作る！ */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12 text-left relative z-10">
                        {sponsorData.homeSection.features.map((feature, idx) => (
                          <div key={idx} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-4 hover:shadow-md hover:border-blue-200 transition-all duration-300 group">
                            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                              {/* 1個目はビル、2個目はパーセントのアイコンを自動で出す */}
                              {idx === 0 ? <Building size={28} /> : <BadgePercent size={28} />}
                            </div>
                            <h4 className="text-lg md:text-xl font-bold text-slate-800">
                              {feature.title}
                            </h4>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        ))}
                      </div>

                      <button 
                        onClick={() => switchPage('sponsors')}
                        className={`inline-flex items-center gap-2 bg-[#333333] text-white px-8 py-4 rounded-full text-xs md:text-sm font-bold tracking-widest hover:bg-blue-600 transition-colors uppercase shadow-md hover:shadow-lg hover:-translate-y-1 duration-300 ${montserrat.className}`}
                      >
                        VIEW SPONSORS <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </section>

                <section className="py-32 px-6 bg-white">
                  <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeInVariant}
                      className="mb-20"
                    >
                      <p className={`text-blue-500 font-bold text-[11px] tracking-[0.4em] uppercase mb-4 ${montserrat.className}`}>
                        Our Activities
                      </p>
                      <h2
                        className={`text-4xl md:text-5xl font-black tracking-tight uppercase ${cleanFont.className}`}
                      >
                        どんなことやってるの？
                      </h2>
                      <div className="w-12 h-1 bg-blue-500 mx-auto mt-6" />
                    </motion.div>

                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-50px' }}
                      className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                      {[
                        {
                          icon: <Users size={28} />,
                          title: 'コラボ・雑談配信',
                          desc: '突発的なゲームコラボや、深夜のまったり雑談配信など、メンバー同士で自由に交流しています。',
                        },
                        {
                          icon: <Trophy size={28} />,
                          title: 'カスタムマッチ・大会',
                          desc: '週末を利用して、サーバー内でのカスタムマッチやプチ大会を企画・開催しています。',
                        },
                        {
                          icon: <Video size={28} />,
                          title: 'クリエイティブ共有',
                          desc: '動画編集のコツや、サムネイルの作り方など、クリエイター同士でのノウハウ共有も盛んです。',
                        },
                      ].map((card, idx) => (
                        <motion.div
                          variants={staggerItem}
                          key={idx}
                          className="bg-[#FAFAFA] p-10 rounded-2xl border border-slate-100 hover:bg-white hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 transition-all duration-300 text-left group"
                        >
                          <div className="text-blue-600 mb-8 inline-block p-4 bg-blue-50 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform">
                            {card.icon}
                          </div>
                          <h4
                            className={`text-xl font-bold mb-3 tracking-wide text-slate-900 ${cleanFont.className}`}
                          >
                            {card.title}
                          </h4>
                          <p className="text-sm text-slate-500 leading-relaxed">
                            {card.desc}
                          </p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </section>
                <section className="py-24 bg-white relative z-20 border-t border-slate-100">
                    <div className="max-w-4xl mx-auto px-6">
                      <div className="text-center mb-16">
                        <p className={`text-blue-500 font-bold text-[11px] tracking-[0.4em] uppercase mb-4 ${montserrat.className}`}>
                          Questions & Answers
                        </p>
                        <h2 className={`text-3xl md:text-4xl font-black tracking-tight text-slate-900 uppercase ${cleanFont.className}`}>
                          FAQ
                        </h2>
                      </div>

                      <div className="space-y-4 mb-12">
                        {faqList.slice(0, 3).map((faq, index) => (
                          <div key={index} className="bg-[#FAFAFA] rounded-xl p-6 md:p-8 border border-slate-100 hover:border-blue-100 transition-colors">
                            <h3 className={`text-sm md:text-base font-bold text-slate-800 mb-3 flex items-start gap-3 ${cleanFont.className}`}>
                              <span className="text-blue-600 font-black mt-0.5">Q.</span>
                              {faq.q}
                            </h3>
                            <p className="text-sm text-slate-600 pl-7 leading-relaxed">
                              <span className="text-slate-400 font-black mr-2">A.</span>
                              {faq.a}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="text-center">
                        <button 
                          onClick={() => switchPage('faq')}
                          className={`inline-flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 hover:text-blue-600 transition-colors uppercase ${montserrat.className}`}
                        >
                          VIEW ALL FAQ <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </section>
              </>

              
            )}

            {activePage === 'news' && (
              <section className="pt-32 md:pt-40 pb-32 px-4 md:px-6 bg-[#FAFAFA] min-h-screen relative overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10">
                  <div className="mb-16 border-b border-slate-200 pb-8 text-center md:text-left">
                    <p className={`text-blue-500 font-bold text-[11px] tracking-[0.4em] uppercase mb-4 ${montserrat.className}`}>
                      Latest Information
                    </p>
                    <h2 className={`text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase ${cleanFont.className}`}>
                      News
                    </h2>
                    <p className="text-slate-500 mt-4 text-sm font-medium">
                      運営チームからの最新情報やお知らせ一覧です。
                    </p>
                  </div>

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    {newsItems.map((news) => (
                      <motion.div
                        variants={staggerItem}
                        key={news.id}
                        onClick={() => news.articleId && openArticle(news.articleId)}
                        className={`group bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 ${
                          news.articleId ? 'cursor-pointer hover:-translate-y-1 hover:border-blue-200' : ''
                        }`}
                      >
                        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                          <div className="flex items-center gap-3">
                            <span className={`text-sm font-bold text-slate-400 tracking-widest ${montserrat.className}`}>
                              {news.date}
                            </span>
                            <span className={`text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider ${
                              news.category === 'IMPORTANT' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                            } ${montserrat.className}`}>
                              {news.category}
                            </span>
                          </div>
                        </div>
                        <h3 className={`text-xl md:text-2xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors ${cleanFont.className}`}>
                          {news.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                          {news.content}
                        </p>
                        
                        {news.articleId && (
                          <div className={`mt-6 flex items-center gap-1 text-[10px] font-bold text-blue-500 tracking-widest uppercase ${montserrat.className}`}>
                            READ MORE <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </section>
            )}

            {/* MAGAZINE 一覧ページ */}
            {activePage === 'magazine' && (
              <section className="pt-32 md:pt-40 pb-32 px-6 bg-[#FAFAFA] min-h-screen">
                <div className="max-w-5xl mx-auto">
                  <div className="mb-16 border-b border-slate-200 pb-8 text-center md:text-left">
                    <p className={`text-blue-500 font-bold text-[11px] tracking-[0.4em] uppercase mb-4 ${montserrat.className}`}>
                      Official Magazine
                    </p>
                    <h2
                      className={`text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase ${cleanFont.className}`}
                    >
                      Magazine
                    </h2>
                    <p className="text-slate-500 mt-4 text-sm font-medium">
                      運営チームからのコラムや、イベントの詳細レポートなどをお届けします。
                    </p>
                  </div>

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  >
                    {articleItems.map((article) => (
                      <motion.div
                        variants={staggerItem}
                        key={article.id}
                        onClick={() => openArticle(article.id)}
                        className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-2 flex flex-col"
                      >
                        {article.thumbnail && (
                          <div className="w-full h-48 md:h-56 bg-slate-50 relative overflow-hidden shrink-0">
                            <img
                              src={article.thumbnail}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[0.22,1,0.36,1]"
                              alt={article.title}
                            />
                          </div>
                        )}
                        <div className="p-8 flex flex-col flex-grow">
                          <div className="flex items-center gap-3 mb-4">
                            <span className={`text-xs font-bold tracking-widest text-slate-400 ${montserrat.className}`}>
                              {article.date}
                            </span>
                            <span className={`text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider bg-blue-50 text-blue-600 ${montserrat.className}`}>
                              {article.category}
                            </span>
                          </div>
                          <h3
                            className={`text-xl font-bold mb-4 text-slate-900 group-hover:text-blue-500 transition-colors leading-snug ${cleanFont.className}`}
                          >
                            {article.title}
                          </h3>

                          <div className={`mt-auto pt-4 flex items-center gap-1 text-[10px] font-bold text-blue-500 tracking-widest uppercase ${montserrat.className}`}>
                            READ MORE{' '}
                            <ArrowRight
                              size={12}
                              className="group-hover:translate-x-1 transition-transform"
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </section>
            )}

            {/* 記事の詳細ページ（器） */}
            {activePage === 'article' &&
              (() => {
                const article = articleItems.find(
                  (a) => a.id === activeArticleId
                );

                if (!article)
                  return (
                    <div className="pt-40 text-center font-bold text-slate-500 h-screen">
                      記事が見つかりませんでした。
                    </div>
                  );

                return (
                  <section className="pt-32 md:pt-40 pb-32 px-4 md:px-6 bg-[#FAFAFA] min-h-screen relative overflow-hidden">
                    <div className="max-w-3xl mx-auto relative z-10">
                      <button
                        onClick={() => switchPage(previousPage)}
                        className={`mb-8 flex items-center gap-2 text-slate-500 hover:text-blue-500 font-bold text-sm tracking-widest transition-colors group ${montserrat.className}`}
                      >
                        <ChevronLeft
                          size={16}
                          className="group-hover:-translate-x-1 transition-transform"
                        />
                        BACK 
                      </button>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm"
                      >
                        {article.thumbnail && (
                          <div className="w-full h-64 md:h-80 bg-slate-100 relative">
                            <img
                              src={article.thumbnail}
                              alt={article.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-8 md:p-12">
                          <div className="flex items-center gap-4 mb-6">
                            <span className={`text-xs font-bold tracking-widest text-slate-400 ${montserrat.className}`}>
                              {article.date}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider bg-blue-50 text-blue-600 ${montserrat.className}`}
                            >
                              {article.category}
                            </span>
                          </div>
                          <h1
                            className={`text-2xl md:text-4xl font-black text-slate-900 mb-10 leading-tight ${cleanFont.className}`}
                          >
                            {article.title}
                          </h1>
                          <div className="w-12 h-1 bg-blue-500 mb-10 rounded-full" />

                          <div className="text-slate-600 leading-loose font-medium text-sm md:text-base whitespace-pre-wrap">
                            {article.content}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </section>
                );
              })()}

            {activePage === 'sponsors' && (
              <section className="pt-32 md:pt-40 pb-32 px-6 bg-[#FAFAFA] min-h-screen">
                <div className="max-w-6xl mx-auto">
                  <div className="mb-16 border-b border-slate-200 pb-8 text-center md:text-left">
                    <p className={`text-blue-500 font-bold text-[11px] tracking-[0.4em] uppercase mb-4 ${montserrat.className}`}>
                      {sponsorData.headerTitle}
                    </p>
                    <h2
                      className={`text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase ${cleanFont.className}`}
                    >
                      {sponsorData.mainTitle}
                    </h2>
                    <p className="text-slate-500 mt-6 leading-relaxed max-w-2xl font-medium text-sm md:text-base whitespace-pre-wrap">
                      {sponsorData.description}
                    </p>
                  </div>

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  >
                    {sponsorData.companies.map((company, idx) => (
                      <motion.div
                        key={company.id}
                        variants={staggerItem}
                        className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 group"
                      >
                        <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                          <Building2 size={32} className="text-blue-600" />
                        </div>
                        <div className={`inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold tracking-wider rounded-md mb-4 uppercase ${montserrat.className}`}>
                          {company.category}
                        </div>
                        <h3
                          className={`text-2xl font-bold text-slate-900 mb-3 ${cleanFont.className}`}
                        >
                          {company.name}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">
                          {company.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm font-bold text-blue-500">
                          {idx === 0 ? (
                            <BadgePercent size={16} />
                          ) : (
                            <Handshake size={16} />
                          )}{' '}
                          {company.benefit}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    variants={fadeInVariant}
                    initial="hidden"
                    animate="visible"
                    className="mt-16 bg-slate-900 rounded-3xl p-10 text-center relative overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          'radial-gradient(#00AEEF 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                      }}
                    />
                    <h3
                      className={`text-2xl font-bold text-white mb-4 relative z-10 ${cleanFont.className}`}
                    >
                      {sponsorData.footer.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-8 max-w-2xl mx-auto relative z-10">
                      {sponsorData.footer.text}
                    </p>
                    <button 
                      onClick={() => setModalMode("contact")} // 🌟 "contact" をセット
                      className="relative z-10 px-8 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-full transition-all duration-300 tracking-widest text-sm flex items-center gap-2 mx-auto"
                    >
                      <Mail size={16} /> お問い合わせ
                    </button>
                  </motion.div>
                </div>
              </section>
            )}

            {activePage === 'profile' && (
              <section className="pt-24 md:pt-28 pb-32 px-4 md:px-6 bg-[#FAFAFA] text-slate-900 min-h-screen relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

                <div className="max-w-6xl mx-auto relative z-10">
                  <div className="mb-6 flex flex-col items-center">
                    <p className={`text-blue-500 font-bold text-[10px] tracking-[0.5em] uppercase mb-1 ${montserrat.className}`}>
                      Member Profiles
                    </p>
                    <h2
                      className={`text-3xl font-black text-slate-900 italic tracking-wider uppercase ${cleanFont.className}`}
                    >
                      Members
                    </h2>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 mb-10 px-4 max-w-4xl mx-auto relative z-30">
                    {staffList.map((staff, idx) => {
                      if (staff.id === 'collective') return null;
                      return (
                        <button
                          key={staff.id}
                          onClick={() => handleMemberClick(idx)}
                          className={`relative group px-4 py-2 md:px-5 md:py-2.5 -skew-x-[15deg] transition-all duration-300 border-b-2 bg-white ${
                            selectedIndex === idx
                              ? 'border-blue-600 shadow-[0_5px_15px_-5px_rgba(59,130,246,0.3)]'
                              : 'border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm'
                          }`}
                        >
                          {selectedIndex === idx && (
                            <motion.div
                              layoutId="activeTabProfile"
                              className="absolute inset-0 bg-blue-50/50 pointer-events-none"
                            />
                          )}
                          <span
                            className={`block skew-x-[15deg] text-[10px] md:text-xs font-bold tracking-widest uppercase transition-colors ${montserrat.className} ${
                              selectedIndex === idx
                                ? 'text-blue-600'
                                : 'text-slate-500 group-hover:text-slate-700'
                            }`}
                          >
                            {staff.name.replace('SUB_ADMIN_', 'SUB_')}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div ref={profileRef} className="scroll-mt-24 relative z-20">
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-50 pointer-events-none flex justify-between px-2 md:-mx-8">
                      <button
                        onClick={() => {
                          let nextIdx =
                            (selectedIndex - 1 + staffList.length) %
                            staffList.length;
                          if (staffList[nextIdx]?.id === 'collective') {
                            nextIdx =
                              (nextIdx - 1 + staffList.length) %
                              staffList.length;
                          }
                          setSelectedIndex(nextIdx);
                        }}
                        className="pointer-events-auto p-3 md:p-4 bg-white/90 backdrop-blur-md shadow-md border border-slate-100 rounded-full text-blue-600 hover:text-white hover:bg-blue-600 transition-all"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={() => {
                          let nextIdx = (selectedIndex + 1) % staffList.length;
                          if (staffList[nextIdx]?.id === 'collective') {
                            nextIdx = (nextIdx + 1) % staffList.length;
                          }
                          setSelectedIndex(nextIdx);
                        }}
                        className="pointer-events-auto p-3 md:p-4 bg-white/90 backdrop-blur-md shadow-md border border-slate-100 rounded-full text-blue-600 hover:text-white hover:bg-blue-600 transition-all"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedIndex}
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.98 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-full max-w-6xl mx-auto"
                      >
                        {staffList[selectedIndex]?.id === 'collective' ? (
                          <div className="text-center text-slate-500 py-20">
                            集合写真データはPROFILEでは表示されません。
                          </div>
                        ) : (
                          <div className="relative bg-white/90 backdrop-blur-xl border border-slate-200 p-8 md:p-14 -skew-x-[5deg] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] flex flex-col md:flex-row items-center gap-8 md:gap-16">
                            <div className="relative w-full md:w-1/2 h-[350px] md:h-[550px] skew-x-[5deg]">
                              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[5rem] md:text-[7rem] font-black text-slate-100 whitespace-nowrap tracking-tighter -rotate-90 md:rotate-0 pointer-events-none select-none z-0 ${montserrat.className}`}>
                                {staffList[selectedIndex]?.name}
                              </div>

                              <motion.div
                                initial={{ x: -30, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-none z-10 flex justify-center origin-bottom pointer-events-none"
                              >
                                <div
                                  className="w-full flex justify-center origin-bottom"
                            style={{
                          transform: `
                            translateX(${
                              isMobile && staffList[selectedIndex]?.mobileOffsetX !== undefined
                                ? staffList[selectedIndex].mobileOffsetX
                                : staffList[selectedIndex]?.offsetX || 0
                            }px) 
                            translateY(${
                              isMobile && staffList[selectedIndex]?.mobileOffsetY !== undefined
                                ? staffList[selectedIndex].mobileOffsetY
                                : staffList[selectedIndex]?.offsetY || 0
                            }px) 
                            scale(${
                              isMobile && staffList[selectedIndex]?.mobileScale !== undefined
                                ? staffList[selectedIndex].mobileScale
                                : staffList[selectedIndex]?.scale || 1
                            })
                          `,
                        }}
                                >
                                  <motion.img
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{
                                      duration: 6,
                                      repeat: Infinity,
                                      ease: 'easeInOut',
                                    }}
                                    src={staffList[selectedIndex]?.image}
                                    alt={staffList[selectedIndex]?.name}
                                    className="w-full h-auto object-contain origin-bottom"
                                    style={{
                                      filter:
                                        'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15))',
                                    }}
                                  />
                                </div>
                              </motion.div>
                            </div>

                            <div className="relative z-20 w-full md:w-1/2 skew-x-[5deg] flex flex-col justify-center">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                                <span className={`text-blue-600 font-bold text-[10px] tracking-widest uppercase ${montserrat.className}`}>
                                  {staffList[selectedIndex]?.role}
                                </span>
                              </div>

                              <h3
                                className={`text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase mb-6 ${cleanFont.className}`}
                              >
                                {staffList[selectedIndex]?.name}
                              </h3>

                              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 text-sm md:text-base text-slate-700 leading-relaxed font-medium rounded-r-xl">
                                {staffList[selectedIndex]?.profile}
                              </div>

                                    <div className="flex flex-wrap gap-4">
                              {/* 💡 data.tsのlinksに書いてあるSNSだけを自動でボタンにする魔法 */}
                              {Object.entries(staffList[selectedIndex]?.links || {}).map(([platform, url]) =>  (
                                <a
                                  key={platform}
                                  href={url as string}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="relative group px-6 py-2 -skew-x-[15deg] bg-white border border-slate-200 overflow-hidden transition-all hover:border-blue-600 hover:shadow-md"
                                >
                                  <span className="absolute inset-0 w-0 bg-blue-100 transition-all duration-300 ease-out group-hover:w-full" />
                                  <span className={`relative skew-x-[15deg] block text-xs font-bold tracking-wider text-slate-500 group-hover:text-blue-700 transition-colors ${montserrat.className}`}>
                                    {/* 表示名を整える処理 */}
                                    {platform === 'x' ? 'X (Twitter)' : 
                                    platform === 'youtube' ? 'YouTube' : 
                                    platform === 'twitch' ? 'Twitch' : platform.toUpperCase()}
                                  </span>
                                </a>
                              ))}
                            </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </section>
            )}

            {activePage === 'guidelines' && (
              <section className="pt-32 md:pt-40 pb-32 px-4 md:px-6 bg-[#FAFAFA] text-slate-900 min-h-screen relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50 pointer-events-none" />

                <div className="max-w-4xl mx-auto relative z-10">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInVariant}
                    className="mb-16 flex flex-col items-center text-center"
                  >
                    <p className={`text-blue-500 font-bold text-[10px] tracking-[0.5em] uppercase mb-2 ${montserrat.className}`}>
                      Server Rules
                    </p>
                    <h2
                      className={`text-4xl md:text-5xl font-black text-slate-900 italic tracking-wider uppercase mb-6 ${cleanFont.className}`}
                    >
                      Guidelines
                    </h2>
                    <div className="w-12 h-1 bg-blue-500 mx-auto mb-8 rounded-full" />
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl font-medium">
                      皆様の自由な創作活動と、心地よい交流を守るための大切なプロトコル（約束事）です。全文の中から、コミュニティの基盤となる重要なルールを一部抜粋いたしました。
                    </p>
                  </motion.div>

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                  >
                    {guidelineList.map((group, idx) => (
                      <motion.div
                        variants={staggerItem}
                        key={idx}
                        className="bg-white border border-slate-100 rounded-2xl p-8 md:p-10 -skew-x-[2deg] hover:border-blue-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-300"
                      >
                        <h3
                          className={`text-xl md:text-2xl font-bold text-slate-800 mb-8 flex items-center gap-4 skew-x-[2deg] ${cleanFont.className}`}
                        >
                          <span className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-black">
                            0{idx + 1}
                          </span>
                          {group.category}
                        </h3>
                        <ul className="space-y-5 skew-x-[2deg] pl-2 md:pl-4">
                          {group.items.map((item, itemIdx) => (
                            <li
                              key={itemIdx}
                              className="flex items-start gap-4 text-slate-600 leading-relaxed font-medium"
                            >
                              <CheckCircle2
                                size={20}
                                className="text-blue-500 mt-0.5 shrink-0"
                              />
                              <span className="text-sm md:text-base">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    variants={fadeInVariant}
                    initial="hidden"
                    animate="visible"
                    className="mt-16 p-8 bg-blue-50 border border-blue-200 rounded-2xl text-center -skew-x-[2deg]"
                  >
                    <p className="text-sm text-blue-700 font-bold leading-relaxed skew-x-[2deg] tracking-widest">
                      ※ここに記載しきれない一般的なマナー（無断での連絡先交換の禁止など）につきましても、節度ある行動をお願いいたします。細かなルールで過度に制限することは本意ではありませんが、皆様が安心して活動できるコミュニティを守るため、運営陣がしっかりと治安維持に努めております。ご不明な点やご不安なことがございましたら、いつでも管理メンバーまでご相談ください。
                    </p>
                  </motion.div>
                </div>
              </section>
            )}

            {activePage === 'activity' && (
              <section className="pt-32 md:pt-40 pb-32 px-6">
                <div className="max-w-6xl mx-auto">
                  <div className="mb-16 border-b border-slate-200 pb-8">
                    <h2
                      className={`text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase ${cleanFont.className}`}
                    >
                      Activity
                    </h2>
                  </div>
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  >
                    {galleryItems.map((item) => (
                      <motion.div
                        variants={staggerItem}
                        key={item.id}
                        onClick={() =>
                          item.articleId && openArticle(item.articleId)
                        }
                        className={`bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group transition-all duration-500 ${
                          item.articleId
                            ? 'cursor-pointer hover:shadow-xl hover:-translate-y-2'
                            : ''
                        }`}
                      >
                        <div className="h-64 bg-slate-50 relative overflow-hidden">
                          <img
                            src={item.image}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-[0.22,1,0.36,1]"
                            alt={item.title}
                          />
                          <div className={`absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-bold text-slate-700 tracking-widest uppercase shadow-sm ${montserrat.className}`}>
                            {item.category}
                          </div>
                        </div>
                        <div className="p-8">
                          <span className={`text-xs text-slate-400 font-bold mb-3 block tracking-wider ${montserrat.className}`}>
                            {item.date}
                          </span>
                          <h3
                            className={`text-2xl font-bold mb-3 text-slate-900 transition-colors ${
                              cleanFont.className
                            } ${
                              item.articleId ? 'group-hover:text-blue-600' : ''
                            }`}
                          >
                            {item.title}
                          </h3>
                          <p className="text-slate-500 leading-relaxed text-sm">
                            {item.description}
                          </p>
                          {item.articleId && (
                            <div className={`mt-6 flex items-center gap-1 text-[10px] font-bold text-blue-600 tracking-widest uppercase ${montserrat.className}`}>
                              READ MORE{' '}
                              <ArrowRight
                                size={12}
                                className="group-hover:translate-x-1 transition-transform"
                              />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </section>
            )}

            {activePage === 'faq' && (
              <section className="pt-32 md:pt-40 pb-32 px-6">
                {faqSection}
              </section>
            )}
          </motion.main>
        </AnimatePresence>
      </div>

{/* ⭐ フッター全体を bg-slate-900（黒）に変更 */}
      <footer className="relative bg-slate-900 text-slate-400 py-12 overflow-hidden mt-auto border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          {/* 上部メニュー：文字色を白っぽく調整 */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10 border-b border-slate-800 pb-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => switchPage(item.id)}
                className={`text-xs md:text-sm font-bold tracking-widest transition-colors uppercase hover:-translate-y-0.5 ${montserrat.className} ${
                  activePage === item.id
                    ? 'text-blue-500'
                    : 'text-slate-400 hover:text-blue-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Contact Us バナー：背景を透過させてフッターの黒を活かすスタイル */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:px-10 mb-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#00AEEF 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="text-center md:text-left relative z-10">
              <h3 className={`text-xl md:text-2xl font-black text-white mb-2 tracking-tight uppercase ${cleanFont.className}`}>
                Contact Us
              </h3>
              <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                サーバーへの参加希望やコラボのご相談など、お気軽にお問い合わせください。
              </p>
            </div>
            <button 
            onClick={() => setModalMode("contact")} // 🌟 これを追加！
            className={`relative z-10 shrink-0 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full shadow-lg transition-all flex items-center gap-2 tracking-widest text-xs hover:-translate-y-1 ${montserrat.className}`}>
              <Mail size={16} /> Contact
            </button>
          </div>

          {/* 中段：サーバー名のロゴ部分 */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
            <h2 className={`text-xl md:text-2xl font-black tracking-tight text-white uppercase leading-tight text-center md:text-left ${montserrat.className}`}>
              The Streamer <span className="text-slate-700 hidden md:inline">/</span>
              <br className="md:hidden" /> Creator Server
            </h2>
            <div className="flex flex-wrap justify-center md:justify-end gap-2 md:gap-3">
              {['X (Twitter)', 'YouTube', 'Twitch', 'Discord'].map((sns, idx) => (
                <button
                  key={idx}
                  className={`px-5 py-2 bg-slate-800 border border-slate-700 hover:bg-blue-600 hover:border-blue-600 hover:text-white rounded-full transition-all duration-300 text-xs font-bold tracking-wider text-slate-400 hover:-translate-y-1 shadow-sm ${montserrat.className}`}
                >
                  {sns}
                </button>
              ))}
            </div>
          </div>
          {/* 最下部：コピーライト */}
          <div className="border-t border-slate-800 pt-8 text-center flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`text-[10px] font-bold tracking-widest text-slate-500 uppercase ${montserrat.className}`}>
              © 2026 THE STREAMER CREATOR SERVER.
            </p>
            <div className={`flex gap-6 text-[10px] font-bold tracking-widest text-slate-500 uppercase ${montserrat.className}`}>
              <span className="hover:text-blue-400 cursor-pointer transition-colors">
                Privacy Policy
              </span>
              <span className="hover:text-blue-400 cursor-pointer transition-colors">
                Terms of Service
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================= */}
      {/* 🌟 文面切り替え対応版ポップアップ本体 */}
      {/* ========================================= */}
      {modalMode !== "" && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full relative shadow-2xl animate-in fade-in zoom-in duration-300">
            
            <button
              onClick={() => setModalMode("")} // 🌟 空にすると閉じる
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-3xl font-bold"
            >
              ×
            </button>

            <img
              src="/ittannn/hirokinngutatie.jpg" 
              alt="ヒロキング"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 mx-auto mb-4"
            />

            {/* 🌟 ここで文面を切り替えています！ */}
            <h3 className="text-xl font-bold text-black text-center mb-2">
              {modalMode === "join" ? "参加申請はこちらから！" : "お問い合わせはこちらから！"}
            </h3>
            
            <p className="text-sm text-gray-600 text-center mb-6">
              {modalMode === "join" 
                ? "現在、コミュニティへの参加はヒロキングのDMにて承っております。お気軽にご連絡ください！" 
                : "サイトやコミュニティに関するお問い合わせは、ヒロキングのDMにて一括でお受けしております。"}
            </p>

            <a
              href="https://x.com/hiroking_0306" 
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-black text-white text-center font-bold py-3 rounded-full hover:bg-gray-800 transition"
            >
              𝕏 DMを送る
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
