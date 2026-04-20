'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Zen_Maru_Gothic, Noto_Sans_JP } from 'next/font/google';
import { Menu, X, ChevronLeft, ChevronRight, ChevronDown, ShieldCheck, PlayCircle, Plus, Minus, Globe, Zap, CheckCircle2, Heart, ArrowRight, Mail, Users, Trophy, Video, Building2, BadgePercent, Handshake } from 'lucide-react';

import { siteConfig, menuItems, newsItems, memoryItems, staffList, galleryItems, faqList, guidelineList, sponsorData, floatingMemories, articleItems } from './data';

const softFont = Zen_Maru_Gothic({ weight: ['400', '500', '700'], subsets: ['latin'] });
const cleanFont = Noto_Sans_JP({ weight: ['400', '500', '700', '900'], subsets: ['latin'] });

// 🌟 ここがエラーの原因だった箇所です！バッチリ修正済みです！
const menuBgTransition = { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

const menuStaggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
};
const menuStaggerItem = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } }
};

const pageTransition = { duration: 0.5 };
const fadeInVariant = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};
const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function UltimateCommunitySite() {
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(1); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activePage, setActivePage] = useState('home');
  
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);

  const [memoryIndex, setMemoryIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const profileRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const parallaxX = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const parallaxAbout = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const marqueeMembers = useMemo(() => {
    const individuals = staffList.filter(s => s.id !== 'collective');
    return Array.from({ length: 12 }).map((_, idx) => {
      const baseMember = individuals[idx % individuals.length];
      return {
        ...baseMember,
        uniqueKey: `marquee-${idx}`,
        displayName: idx === 0 ? 'ヒロキング' : `SUB_ADMIN_${String(idx).padStart(2, '0')}`,
        roleName: idx === 0 ? 'ADMIN' : 'SUB-ADMIN'
      };
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (activePage !== 'home') return;
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [memoryIndex, activePage]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setMemoryIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = memoryItems.length - 1;
      if (nextIndex >= memoryItems.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const switchPage = (pageName: string) => {
    setActivePage(pageName);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openArticle = (articleId: string) => {
    setActiveArticleId(articleId);
    setActivePage('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-2">FAQ</h2>
        <p className="text-blue-500 text-[11px] font-bold tracking-[0.2em] uppercase">Common Questions</p>
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
      <div className={`h-screen w-full flex items-center justify-center bg-white font-black text-blue-500 tracking-widest text-xl ${cleanFont.className}`}>
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>LOADING</motion.div>
      </div>
    );

  const collectiveData = staffList.find(s => s.id === 'collective');

  return (
    <div className={`bg-[#FAFAFA] text-slate-800 selection:bg-blue-100 selection:text-blue-600 overflow-x-hidden min-h-screen flex flex-col ${softFont.className}`}>
      <nav>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="fixed top-6 left-6 md:top-8 md:left-8 z-[100] p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200 text-slate-700 hover:text-blue-500 hover:shadow-md hover:scale-105 active:scale-95 transition-all">
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
                      <motion.button variants={menuStaggerItem} onClick={() => switchPage(item.id)} className={`group relative block w-full text-lg md:text-xl tracking-widest font-bold transition-colors duration-500 text-left ${cleanFont.className} ${activePage === item.id ? 'text-blue-500' : 'text-slate-600 hover:text-blue-500'}`}>
                        {item.label}
                        <span className="relative block h-[2px] w-full bg-transparent mt-3 overflow-hidden">
                          <span className={`absolute inset-0 bg-blue-500 transition-transform duration-[600ms] ease-out ${activePage === item.id ? 'translate-x-0' : '-translate-x-[101%] group-hover:translate-x-0'}`} />
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
                <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-white">
                  <div className="absolute inset-0 opacity-[0.03] z-0" style={{ backgroundImage: 'radial-gradient(#00AEEF 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                  <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
                    <motion.img 
                      initial={{ opacity: 0 }} animate={{ opacity: 0.12 }} transition={{ duration: 2 }}
                      src={siteConfig.logo} className="w-[80vw] md:w-[60vw] h-auto object-contain mix-blend-multiply opacity-5" 
                    />
                    <div className="absolute top-0 right-[20%] w-[100px] h-[200%] bg-gradient-to-b from-blue-100/30 to-transparent rotate-[30deg] origin-top" />
                    <div className="absolute bottom-0 left-[10%] w-[50px] h-[150%] bg-gradient-to-t from-blue-200/20 to-transparent rotate-[30deg] origin-bottom" />
                  </div>

                  <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                    {floatingMemories.map((item) => (
                      <motion.div
                        key={`float-media-${item.id}`}
                        className="absolute w-48 h-32 md:w-64 md:h-40 border-2 border-slate-200/50 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] bg-white/50 backdrop-blur-sm"
                        style={{
                          top: item.top,
                          scale: item.scale,
                          opacity: item.opacity,
                          left: 0,
                        }}
                        animate={{
                          x: item.dir === 1 ? ['-50vw', '150vw'] : ['150vw', '-50vw'],
                          y: [0, 15, 0]
                        }}
                        transition={{
                          x: { duration: item.duration, repeat: Infinity, ease: "linear", delay: item.delay },
                          y: { duration: 6 + item.id, repeat: Infinity, ease: "easeInOut" }
                        }}
                      >
                        {item.type === 'image' ? (
                          <img 
                            src={item.src} 
                            alt="Floating Memory" 
                            className="w-full h-full object-cover pointer-events-none select-none opacity-90"
                          />
                        ) : (
                          <div className="w-full h-full relative opacity-90">
                            <iframe 
                              width="100%" 
                              height="100%" 
                              src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${item.youtubeId}`} 
                              frameBorder="0" 
                              allow="autoplay; encrypted-media" 
                              className="w-full h-full pointer-events-none scale-[1.35]"
                              tabIndex={-1}
                            ></iframe>
                            <div className="absolute inset-0 z-10 bg-transparent" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="relative z-30 w-full max-w-7xl mx-auto flex flex-col items-center h-full pt-10 pointer-events-none">
                    {collectiveData && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className={`absolute inset-x-0 bottom-0 pb-16 md:pb-24 z-10 flex justify-center items-end pointer-events-none w-full`}
                      >
                        <motion.img 
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                          src={collectiveData.image} 
                          alt="Collective Photograph" 
                          className={`w-[120%] sm:w-[110%] md:w-full max-w-none object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)] pointer-events-none select-none`}
                        />
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-28 md:bottom-36 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none"
                  >
                    <div className="bg-white/80 backdrop-blur-md rounded-full px-4 py-2 shadow-sm border border-slate-100 flex flex-col items-center">
                      <span className="text-[10px] font-black tracking-widest text-slate-800 uppercase mb-1">SCROLL</span>
                      <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        <ChevronDown size={16} className="text-slate-600" />
                      </motion.div>
                    </div>
                  </motion.div>

                  <div className="absolute bottom-0 inset-x-0 h-20 md:h-28 bg-[#333333] z-40 border-t-4 border-blue-500 flex items-center overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.2)]">
                    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center relative z-10">
                      <div className="flex items-center gap-4 md:gap-6">
                        <div className="flex flex-col">
                          <h1 className={`text-xl sm:text-2xl md:text-4xl font-black text-white tracking-widest uppercase ${cleanFont.className}`}>
                            The Streamer <span className="text-blue-400">Creator</span> Server
                          </h1>
                          <p className="text-white/60 text-[8px] md:text-[10px] font-bold tracking-[0.4em]">配信者クリエイターサーバー</p>
                        </div>
                      </div>
                      <div className="hidden lg:flex flex-col items-end border-l border-white/20 pl-6 ml-6">
                        <span className="text-blue-400 font-bold text-[10px] tracking-[0.4em] uppercase">OFFICIAL PORTAL</span>
                        <span className="text-white/40 text-xs tracking-wider">EST. 2026</span>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="py-24 bg-[#FAFAFA] relative overflow-hidden">
                  <div className="max-w-6xl mx-auto relative z-10 px-6 md:px-0">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={fadeInVariant} className="mb-12 text-center">
                      <p className="text-blue-500 font-bold text-[11px] tracking-[0.4em] uppercase mb-4">Activity Log</p>
                      <h2 className={`text-3xl md:text-4xl font-black tracking-tight uppercase ${cleanFont.className}`}>TSC Activity Log</h2>
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
                          animate={{ x: `${xPosition}%`, scale: scale, opacity: opacity, zIndex: zIndex }}
                          transition={{ duration: 0.6 }}
                          drag={isCenter ? "x" : false}
                          dragConstraints={{ left: 0, right: 0 }}
                          dragElastic={1}
                          onDragEnd={(e, { offset: dragOffset, velocity }) => {
                            if (!isCenter) return;
                            const swipe = swipePower(dragOffset.x, velocity.x);
                            if (swipe < -swipeConfidenceThreshold) paginate(1);
                            else if (swipe > swipeConfidenceThreshold) paginate(-1);
                          }}
                          onClick={() => {
                            if (offset === -1) paginate(-1);
                            if (offset === 1) paginate(1);
                          }}
                          className={`absolute w-[75%] sm:w-[65%] max-w-4xl h-full flex items-center justify-center ${
                            isCenter ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'
                          } ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
                        >
                          <div className={`relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 ${
                            isCenter ? 'border-white' : 'border-white/50'
                          } bg-slate-900 group`}>
                            
                            {item.type === 'image' ? (
                              <img src={item.src} className="w-full h-full object-cover pointer-events-none" alt={item.title || "思い出"} />
                            ) : (
                              <div className="w-full h-full relative">
                                <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${item.youtubeId}`} frameBorder="0" allowFullScreen className={`w-full h-full ${isCenter ? 'pointer-events-auto' : 'pointer-events-none'}`}></iframe>
                                {!isCenter && <div className="absolute inset-0 z-10" />}
                              </div>
                            )}
                            
                            {item.title && (
                              <div className={`absolute bottom-0 inset-x-0 p-4 md:p-6 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent pointer-events-none transition-opacity duration-300 ${
                                isCenter ? 'opacity-100' : 'opacity-0'
                              }`}>
                                <h3 className={`text-lg md:text-2xl font-bold text-white tracking-wider ${cleanFont.className}`}>
                                  {item.title}
                                </h3>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}

                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 md:px-8 z-20 pointer-events-none">
                      <button onClick={() => paginate(-1)} className="pointer-events-auto p-3 md:p-4 bg-white/90 backdrop-blur-md shadow-lg border border-slate-100 rounded-full text-slate-600 hover:text-blue-500 hover:scale-110 active:scale-95 transition-all">
                        <ChevronLeft size={24} />
                      </button>
                      <button onClick={() => paginate(1)} className="pointer-events-auto p-3 md:p-4 bg-white/90 backdrop-blur-md shadow-lg border border-slate-100 rounded-full text-slate-600 hover:text-blue-500 hover:scale-110 active:scale-95 transition-all">
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
                          memoryIndex === idx ? 'w-8 h-2 bg-blue-500' : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                        }`}
                      />
                    ))}
                  </div>
                </section>

                <section className="py-16 bg-[#FAFAFA] border-t border-slate-200/50 overflow-hidden flex flex-col items-center justify-center relative">
                  <div className="mb-10 flex flex-col items-center z-10">
                    <p className="text-blue-500 font-bold text-[10px] tracking-[0.4em] uppercase mb-2">Our Staffs</p>
                    <h3 className={`text-xl md:text-2xl font-black text-slate-800 tracking-wider ${cleanFont.className}`}>総勢12名の運営チーム</h3>
                  </div>

                  <div className="w-full flex overflow-hidden group px-0">
                    <motion.div
                      className="flex gap-8 md:gap-12 px-4 md:px-6 w-max"
                      animate={{ x: ["-50%", "0%"] }} 
                      transition={{ ease: "linear", duration: 180, repeat: Infinity }} 
                    >
                      {[...marqueeMembers, ...marqueeMembers].map((member, idx) => (
                        <div 
                          key={`marquee-item-${idx}`} 
                          className="w-[70vw] h-[50vh] sm:w-[45vw] sm:h-[40vh] md:w-[30vw] md:h-[45vh] lg:w-[25vw] lg:h-[55vh] shrink-0 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-md relative transition-all duration-500 group-hover:opacity-50 hover:!opacity-100 hover:scale-105 hover:shadow-2xl cursor-pointer hover:z-20"
                          onClick={() => switchPage('profile')} 
                        >
                          <img src={member.image} alt={member.displayName} className="w-full h-full object-cover" />
                          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent p-6 flex flex-col justify-end h-1/2">
                             <span className="text-[10px] md:text-xs font-black text-blue-400 tracking-widest uppercase mb-1 drop-shadow-md">{member.roleName}</span>
                             <span className="text-lg md:text-2xl font-bold text-white truncate drop-shadow-md">{member.displayName}</span>
                          </div>
                        </div>
                      ))}
                    </motion.div>
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

                <section className="py-32 px-6 bg-[#FAFAFA] relative overflow-hidden border-t border-slate-100">
                  <motion.div style={{ x: parallaxAbout }} className="absolute top-10 right-0 z-0 pointer-events-none select-none opacity-[0.03]">
                    <span className={`text-[12rem] md:text-[20rem] font-black text-slate-900 leading-none tracking-tighter uppercase ${cleanFont.className}`}>ABOUT</span>
                  </motion.div>

                  <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
                    
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="w-full lg:w-[55%] relative flex flex-col justify-center items-center">
                       
                       <div className="relative w-full flex justify-center lg:justify-end pr-4 lg:pr-0">
                          {collectiveData && (
                            <img 
                              src={collectiveData.image} 
                              className="w-[120%] sm:w-[130%] lg:w-[140%] xl:w-[150%] max-w-none h-auto object-contain drop-shadow-2xl z-20 relative -right-[5%] lg:-right-[10%]" 
                              alt="TSC Staff Collective" 
                            />
                          )}
                       </div>

                       <div className="mt-12 flex justify-center gap-8 md:gap-16 border-t border-slate-300/50 pt-8 w-[90%] md:w-[70%] mx-auto relative z-10">
                         <div className="flex flex-col items-center">
                           <span className="text-[10px] md:text-xs text-blue-500 font-black tracking-[0.3em]">ADMIN</span>
                           <span className="text-lg md:text-xl font-bold text-slate-700 mt-2">管理人 <span className="text-sm ml-1 text-slate-500">1名</span></span>
                         </div>
                         <div className="w-px h-12 bg-slate-300/50" />
                         <div className="flex flex-col items-center">
                           <span className="text-[10px] md:text-xs text-slate-400 font-black tracking-[0.3em]">SUB-ADMIN</span>
                           <span className="text-lg md:text-xl font-bold text-slate-700 mt-2">サブ管理人 <span className="text-sm ml-1 text-slate-500">11名</span></span>
                         </div>
                       </div>

                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="w-full lg:w-[45%] flex flex-col items-start text-left relative z-10 pt-16 lg:pt-0">
                       
                       <div className="mb-4 relative w-full">
                         <span className={`text-[4.5rem] md:text-[6.5rem] font-black text-slate-300 leading-none tracking-tighter uppercase absolute -top-8 md:-top-12 -left-2 md:-left-4 pointer-events-none select-none opacity-80 ${cleanFont.className}`}>ABOUT</span>
                         <h2 className={`text-3xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight uppercase relative z-10 ${cleanFont.className}`}>「TSC」とは？</h2>
                       </div>

                       <div className="w-full mb-8 relative z-10">
                         <div className="inline-block bg-blue-50/80 border border-blue-100 px-4 py-2 rounded-full shadow-sm">
                            <p className="text-blue-600 font-black tracking-[0.2em] text-xs md:text-sm uppercase flex items-center gap-2">
                              <ShieldCheck size={16} /> 管理体制 <span className="text-[10px] md:text-xs font-bold text-blue-400">/ Admins & Sub-Admins</span>
                            </p>
                         </div>
                       </div>
                       
                       <div className="space-y-6 text-slate-600 leading-loose font-medium text-sm md:text-base border-l-4 border-blue-500 pl-6 bg-white p-6 rounded-r-2xl shadow-sm relative z-10 w-full">
                         <p className="text-lg md:text-xl font-bold text-slate-800">
                           総勢<span className="text-blue-500 text-2xl md:text-3xl mx-1 font-black">12</span>名の運営チームが、<br className="hidden md:block" />あなたの活動をサポートします。
                         </p>
                         <p>
                           TSCサーバーでは、1名の管理人と11名のサブ管理人、計12名の運営チームが日々サーバーの治安維持と環境アップデートに努めています。
                         </p>
                         <p>
                           「Discordサーバーに参加するのは初めてで不安…」「もしトラブルがあったらどうしよう…」という方でも心配いりません。皆さんが安心して楽しく活動できるよう、しっかりとサポートする体制を整えています。
                         </p>
                       </div>

                       <button onClick={() => switchPage('profile')} className="mt-10 mx-auto lg:mx-0 relative z-10 px-8 py-4 bg-white border-2 border-[#333333] text-[#333333] hover:bg-blue-500 hover:border-blue-500 hover:text-white font-bold rounded-full transition-all duration-300 tracking-widest text-xs md:text-sm flex items-center gap-3 group shadow-sm hover:shadow-[0_10px_20px_-10px_rgba(59,130,246,0.5)] hover:-translate-y-1">
                         VIEW MEMBERS <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                       </button>
                    </motion.div>
                  </div>
                </section>

                <section className="py-32 px-6 bg-slate-900 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
                  <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 translate-y-1/3" />

                  <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInVariant} className="lg:col-span-5">
                      <p className="text-blue-400 font-bold text-[11px] tracking-[0.4em] uppercase mb-4">Requirements</p>
                      <h2 className={`text-4xl md:text-5xl font-black tracking-tight uppercase mb-6 leading-[1.2] ${cleanFont.className}`}>誰でも歓迎、<br />でもリスペクトを。</h2>
                      <p className="text-slate-400 leading-relaxed mb-10 text-sm md:text-base">TSC鯖は、スキルや経験よりも「一緒に楽しむ心」を大切にしています。配信者も、クリエイターも、それを応援したい人も。最低限のマナーを守り、お互いをリスペクトできる方なら、誰でも参加可能です。</p>
                      <button className="px-10 py-4 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-full shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)] hover:shadow-[0_0_50px_-5px_rgba(59,130,246,0.7)] transition-all flex items-center gap-3 tracking-widest text-sm hover:-translate-y-1 group">
                        JOIN DISCORD <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-7 space-y-4">
                      {[ { icon: <PlayCircle size={24} />, title: 'Streamers & Creators', desc: '配信や動画制作、デザインなど、何かを発信・創造するのが好きな方。プラットフォームや登録者数は問いません。' }, { icon: <Heart size={24} />, title: 'Supporters & Players', desc: 'コミュニティを一緒に盛り上げてくれる方。配信を見るのが好きな方や、ただ一緒にゲームを楽しみたい方も大歓迎です。' }, { icon: <CheckCircle2 size={24} />, title: 'Rules & Manners', desc: '暴言や迷惑行為をしないこと。ゲームの腕前よりも、負けても笑い合えるような温かい空気作りをお願いします。' }, ].map((req, idx) => (
                        <motion.div variants={staggerItem} key={idx} className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-6 md:p-8 rounded-3xl flex gap-6 items-start hover:bg-slate-800/80 hover:border-blue-500/30 transition-all duration-300 group">
                          <div className="text-blue-400 p-3 bg-slate-900/80 rounded-2xl shadow-inner group-hover:scale-110 transition-transform shrink-0">{req.icon}</div>
                          <div>
                            <h4 className={`text-lg md:text-xl font-bold mb-2 text-white ${cleanFont.className}`}>{req.title}</h4>
                            <p className="text-sm text-slate-400 leading-relaxed">{req.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </section>

                <section className="py-32 px-6 bg-white border-t border-slate-100">
                  <div className="max-w-5xl mx-auto text-center">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInVariant} className="mb-20">
                      <p className="text-blue-500 font-bold text-[11px] tracking-[0.4em] uppercase mb-4">Our Activities</p>
                      <h2 className={`text-4xl md:text-5xl font-black tracking-tight uppercase ${cleanFont.className}`}>どんなことやってるの？</h2>
                      <div className="w-12 h-1 bg-blue-500 mx-auto mt-6" />
                    </motion.div>
                    
                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[ { icon: <Users size={28} />, title: 'コラボ・雑談配信', desc: '突発的なゲームコラボや、深夜のまったり雑談配信など、メンバー同士で自由に交流しています。' }, { icon: <Trophy size={28} />, title: 'カスタムマッチ・大会', desc: '週末を利用して、サーバー内でのカスタムマッチやプチ大会を企画・開催しています。' }, { icon: <Video size={28} />, title: 'クリエイティブ共有', desc: '動画編集のコツや、サムネイルの作り方など、クリエイター同士でのノウハウ共有も盛んです。' }, ].map((card, idx) => (
                        <motion.div variants={staggerItem} key={idx} className="bg-[#FAFAFA] p-10 rounded-2xl border border-slate-100 hover:bg-white hover:-translate-y-2 hover:shadow-xl hover:border-blue-100 transition-all duration-300 text-left group">
                          <div className="text-blue-500 mb-8 inline-block p-4 bg-blue-50 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform">{card.icon}</div>
                          <h4 className={`text-xl font-bold mb-3 tracking-wide text-slate-900 ${cleanFont.className}`}>{card.title}</h4>
                          <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </section>

                <section className="py-32 px-6 bg-[#FAFAFA] border-t border-slate-100 relative overflow-hidden">
                  <div className="max-w-5xl mx-auto text-center relative z-10">
                     <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeInVariant} className="mb-16">
                        <p className="text-blue-500 font-bold text-[11px] tracking-[0.4em] uppercase mb-4">{sponsorData.headerTitle}</p>
                        <h2 className={`text-4xl md:text-5xl font-black tracking-tight uppercase ${cleanFont.className}`}>{sponsorData.homeSection.title}</h2>
                        <div className="w-12 h-1 bg-blue-500 mx-auto mt-6" />
                     </motion.div>

                     <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white p-10 md:p-16 rounded-3xl border border-slate-200 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                        
                        <h3 className={`text-2xl md:text-3xl font-black text-slate-900 mb-6 ${cleanFont.className}`}>
                           {sponsorData.homeSection.subtitle}
                        </h3>
                        <p className="text-slate-600 leading-loose mb-10 max-w-2xl mx-auto font-medium">
                           {sponsorData.homeSection.text}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                           <div className="flex items-center justify-center gap-3 bg-slate-50 px-6 py-4 rounded-xl border border-slate-100">
                              <Building2 className="text-blue-400" size={24} />
                              <span className="font-bold text-slate-700">{sponsorData.homeSection.features[0]}</span>
                           </div>
                           <div className="flex items-center justify-center gap-3 bg-slate-50 px-6 py-4 rounded-xl border border-slate-100">
                              <BadgePercent className="text-blue-400" size={24} />
                              <span className="font-bold text-slate-700">{sponsorData.homeSection.features[1]}</span>
                           </div>
                        </div>

                        <button onClick={() => switchPage('sponsors')} className="mt-12 px-8 py-4 bg-[#333333] hover:bg-blue-500 text-white font-bold rounded-full transition-all duration-300 tracking-widest text-sm flex items-center gap-3 mx-auto shadow-md hover:shadow-xl hover:-translate-y-1 group">
                           VIEW SPONSORS <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                     </motion.div>
                  </div>
                </section>

                <section className="py-32 px-6 bg-[#FAFAFA] border-t border-slate-100">
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInVariant}>{faqSection}</motion.div>
                </section>
              </>
            )}

            {/* 🌟 MAGAZINE 一覧ページ */}
            {activePage === 'magazine' && (
              <section className="pt-32 md:pt-40 pb-32 px-6 bg-[#FAFAFA] min-h-screen">
                <div className="max-w-5xl mx-auto">
                  <div className="mb-16 border-b border-slate-200 pb-8 text-center md:text-left">
                    <p className="text-blue-500 font-bold text-[11px] tracking-[0.4em] uppercase mb-4">Official Magazine</p>
                    <h2 className={`text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase ${cleanFont.className}`}>Magazine</h2>
                    <p className="text-slate-500 mt-4 text-sm font-medium">運営チームからのコラムや、イベントの詳細レポートなどをお届けします。</p>
                  </div>

                  <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {articleItems.map((article) => (
                      <motion.div 
                        variants={staggerItem} 
                        key={article.id}
                        onClick={() => openArticle(article.id)}
                        className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-2 flex flex-col"
                      >
                        {article.thumbnail && (
                          <div className="w-full h-48 md:h-56 bg-slate-50 relative overflow-hidden shrink-0">
                            <img src={article.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[0.22,1,0.36,1]" alt={article.title} />
                          </div>
                        )}
                        <div className="p-8 flex flex-col flex-grow">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-xs font-bold tracking-widest text-slate-400 font-mono">{article.date}</span>
                            <span className="text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider bg-blue-50 text-blue-600">{article.category}</span>
                          </div>
                          <h3 className={`text-xl font-bold mb-4 text-slate-900 group-hover:text-blue-500 transition-colors leading-snug ${cleanFont.className}`}>{article.title}</h3>
                          
                          <div className="mt-auto pt-4 flex items-center gap-1 text-[10px] font-bold text-blue-500 tracking-widest uppercase">
                            READ MORE <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </section>
            )}

            {/* 🌟 記事の詳細ページ（器） */}
            {activePage === 'article' && (() => {
              const article = articleItems.find(a => a.id === activeArticleId);

              if (!article) return <div className="pt-40 text-center font-bold text-slate-500 h-screen">記事が見つかりませんでした。</div>;

              return (
                <section className="pt-32 md:pt-40 pb-32 px-4 md:px-6 bg-[#FAFAFA] min-h-screen relative overflow-hidden">
                  <div className="max-w-3xl mx-auto relative z-10">
                    <button onClick={() => switchPage('magazine')} className="mb-8 flex items-center gap-2 text-slate-500 hover:text-blue-500 font-bold text-sm tracking-widest transition-colors group">
                      <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                      BACK TO LIST
                    </button>
                    
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                      {article.thumbnail && (
                        <div className="w-full h-64 md:h-80 bg-slate-100 relative">
                          <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="p-8 md:p-12">
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-xs font-bold tracking-widest text-slate-400 font-mono">{article.date}</span>
                          <span className={`text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider bg-blue-50 text-blue-600`}>{article.category}</span>
                        </div>
                        <h1 className={`text-2xl md:text-4xl font-black text-slate-900 mb-10 leading-tight ${cleanFont.className}`}>{article.title}</h1>
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
                    <p className="text-blue-500 font-bold text-[11px] tracking-[0.4em] uppercase mb-4">{sponsorData.headerTitle}</p>
                    <h2 className={`text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase ${cleanFont.className}`}>{sponsorData.mainTitle}</h2>
                    <p className="text-slate-500 mt-6 leading-relaxed max-w-2xl font-medium text-sm md:text-base whitespace-pre-wrap">
                       {sponsorData.description}
                    </p>
                  </div>

                  <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {sponsorData.companies.map((company, idx) => (
                       <motion.div key={company.id} variants={staggerItem} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 group">
                          <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                             <Building2 size={32} className="text-slate-400" />
                          </div>
                          <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold tracking-wider rounded-md mb-4 uppercase">{company.category}</div>
                          <h3 className={`text-2xl font-bold text-slate-900 mb-3 ${cleanFont.className}`}>{company.name}</h3>
                          <p className="text-slate-500 text-sm leading-relaxed mb-6">
                             {company.description}
                          </p>
                          <div className="flex items-center gap-2 text-sm font-bold text-blue-500">
                             {idx === 0 ? <BadgePercent size={16} /> : <Handshake size={16} />} {company.benefit}
                          </div>
                       </motion.div>
                     ))}
                  </motion.div>
                  
                  <motion.div variants={fadeInVariant} initial="hidden" animate="visible" className="mt-16 bg-slate-900 rounded-3xl p-10 text-center relative overflow-hidden">
                     <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#00AEEF 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                     <h3 className={`text-2xl font-bold text-white mb-4 relative z-10 ${cleanFont.className}`}>{sponsorData.footer.title}</h3>
                     <p className="text-slate-400 text-sm mb-8 max-w-2xl mx-auto relative z-10">
                        {sponsorData.footer.text}
                     </p>
                     <button className="relative z-10 px-8 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-full transition-all duration-300 tracking-widest text-sm flex items-center gap-2 mx-auto">
                        <Mail size={16} /> お問い合わせ
                     </button>
                  </motion.div>
                </div>
              </section>
            )}

            {activePage === 'news' && (
              <section className="pt-32 md:pt-40 pb-32 px-6">
                <div className="max-w-4xl mx-auto">
                  <div className="mb-16 border-b border-slate-200 pb-8">
                    <h2 className={`text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase ${cleanFont.className}`}>News</h2>
                  </div>
                  <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
                    {newsItems.map((news) => (
                      <motion.div 
                        variants={staggerItem} 
                        key={news.id} 
                        onClick={() => news.articleId && openArticle(news.articleId)}
                        className={`group bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 md:gap-10 items-start transition-all duration-300 ${news.articleId ? 'cursor-pointer hover:shadow-lg hover:border-blue-200 hover:-translate-y-1' : ''}`}
                      >
                        <div className="shrink-0 w-full md:w-40 pt-1">
                          <span className="text-xs font-bold tracking-widest text-slate-400 block mb-3 font-mono">{news.date}</span>
                          <span className={`text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider ${news.category === 'IMPORTANT' ? 'bg-red-50 text-red-600' : news.category === 'EVENT' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>{news.category}</span>
                        </div>
                        <div className="flex-grow">
                          <h3 className={`text-xl font-bold mb-3 text-slate-900 leading-snug transition-colors duration-300 ${news.articleId ? 'group-hover:text-blue-500' : ''}`}>{news.title}</h3>
                          <p className="text-slate-500 leading-relaxed text-sm">{news.content}</p>
                          {news.articleId && (
                             <span className="inline-flex items-center gap-1 mt-4 text-[10px] font-bold text-blue-500 tracking-widest uppercase">
                               READ MORE <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                             </span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </section>
            )}

            {activePage === 'profile' && (
              <section className="pt-24 md:pt-28 pb-32 px-4 md:px-6 bg-[#FAFAFA] text-slate-900 min-h-screen relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50 pointer-events-none" />
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-6xl mx-auto relative z-10">
                  <div className="mb-6 flex flex-col items-center">
                    <p className="text-blue-500 font-bold text-[10px] tracking-[0.5em] uppercase mb-1">Member Profiles</p>
                    <h2 className={`text-3xl font-black text-slate-900 italic tracking-wider uppercase ${cleanFont.className}`}>
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
                              ? 'border-blue-500 shadow-[0_5px_15px_-5px_rgba(59,130,246,0.3)]' 
                              : 'border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm'
                          }`}
                        >
                          {selectedIndex === idx && (
                            <motion.div layoutId="activeTabProfile" className="absolute inset-0 bg-blue-50/50 pointer-events-none" />
                          )}
                          <span className={`block skew-x-[15deg] text-[10px] md:text-xs font-bold tracking-widest uppercase transition-colors ${
                            selectedIndex === idx ? 'text-blue-600' : 'text-slate-500 group-hover:text-slate-700'
                          }`}>
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
                          let nextIdx = (selectedIndex - 1 + staffList.length) % staffList.length;
                          if (staffList[nextIdx]?.id === 'collective') {
                            nextIdx = (nextIdx - 1 + staffList.length) % staffList.length;
                          }
                          setSelectedIndex(nextIdx);
                        }} 
                        className="pointer-events-auto p-3 md:p-4 bg-white/90 backdrop-blur-md shadow-md border border-slate-100 rounded-full text-slate-600 hover:text-blue-500 hover:border-blue-200 hover:shadow-lg hover:scale-110 active:scale-95 transition-all"
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
                        className="pointer-events-auto p-3 md:p-4 bg-white/90 backdrop-blur-md shadow-md border border-slate-100 rounded-full text-slate-600 hover:text-blue-500 hover:border-blue-200 hover:shadow-lg hover:scale-110 active:scale-95 transition-all"
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
                          <div className="text-center text-slate-500 py-20">集合写真データはPROFILEでは表示されません。</div>
                        ) : (
                          <div className="relative bg-white/80 backdrop-blur-xl border border-slate-100 p-8 md:p-14 -skew-x-[5deg] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] flex flex-col md:flex-row items-center gap-8 md:gap-16">
                            
                            <div className="relative w-full md:w-1/2 h-[350px] md:h-[550px] skew-x-[5deg]">
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[5rem] md:text-[7rem] font-black text-slate-100 whitespace-nowrap tracking-tighter -rotate-90 md:rotate-0 pointer-events-none select-none z-0">
                                {staffList[selectedIndex]?.name}
                              </div>
                              
                              <motion.div 
                                initial={{ x: -30, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-none z-10 flex justify-center origin-bottom pointer-events-none"
                              >
                                <div className={`w-full flex justify-center origin-bottom transition-all duration-500
                                  ${staffList[selectedIndex]?.customScale || 'scale-100'} 
                                  ${staffList[selectedIndex]?.customPosition || ''}
                                `}>
                                  <motion.img 
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    src={staffList[selectedIndex]?.image} 
                                    alt={staffList[selectedIndex]?.name} 
                                    className="w-full h-auto object-contain origin-bottom"
                                    style={{ filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15))' }}
                                  />
                                </div>
                              </motion.div>
                            </div>

                            <div className="relative z-20 w-full md:w-1/2 skew-x-[5deg] flex flex-col justify-center">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                <span className="text-blue-500 font-bold text-[10px] tracking-widest uppercase">{staffList[selectedIndex]?.role}</span>
                              </div>
                              
                              <h3 className={`text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase mb-6 ${cleanFont.className}`}>
                                {staffList[selectedIndex]?.name}
                              </h3>
                              
                              <div className="bg-slate-50 border-l-2 border-blue-500 p-6 mb-8 text-sm md:text-base text-slate-600 leading-relaxed font-medium rounded-r-xl">
                                {staffList[selectedIndex]?.profile}
                              </div>

                              <div className="flex flex-wrap gap-4">
                                {['X (Twitter)', 'YouTube', 'Twitch'].map((sns, idx) => (
                                  <button key={idx} className="relative group px-6 py-2 -skew-x-[15deg] bg-white border border-slate-200 overflow-hidden transition-all hover:border-blue-500 hover:shadow-md">
                                    <span className="absolute inset-0 w-0 bg-blue-50 transition-all duration-300 ease-out group-hover:w-full" />
                                    <span className="relative skew-x-[15deg] block text-xs font-bold tracking-wider text-slate-500 group-hover:text-blue-600 transition-colors">
                                      {sns}
                                    </span>
                                  </button>
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
                  <motion.div initial="hidden" animate="visible" variants={fadeInVariant} className="mb-16 flex flex-col items-center text-center">
                    <p className="text-blue-500 font-bold text-[10px] tracking-[0.5em] uppercase mb-2">Server Rules</p>
                    <h2 className={`text-4xl md:text-5xl font-black text-slate-900 italic tracking-wider uppercase mb-6 ${cleanFont.className}`}>
                      Guidelines
                    </h2>
                    <div className="w-12 h-1 bg-blue-500 mx-auto mb-8 rounded-full" />
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl font-medium">
                      皆様の自由な創作活動と、心地よい交流を守るための大切なプロトコル（約束事）です。全文の中から、コミュニティの基盤となる重要なルールを一部抜粋いたしました。
                    </p>
                  </motion.div>

                  <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
                    {guidelineList.map((group, idx) => (
                      <motion.div variants={staggerItem} key={idx} className="bg-white border border-slate-100 rounded-2xl p-8 md:p-10 -skew-x-[2deg] hover:border-blue-100 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-300">
                        <h3 className={`text-xl md:text-2xl font-bold text-slate-800 mb-8 flex items-center gap-4 skew-x-[2deg] ${cleanFont.className}`}>
                          <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center text-sm font-black">
                            0{idx + 1}
                          </span>
                          {group.category}
                        </h3>
                        <ul className="space-y-5 skew-x-[2deg] pl-2 md:pl-4">
                          {group.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-4 text-slate-600 leading-relaxed font-medium">
                              <CheckCircle2 size={20} className="text-blue-400 mt-0.5 shrink-0" />
                              <span className="text-sm md:text-base">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div variants={fadeInVariant} initial="hidden" animate="visible" className="mt-16 p-8 bg-blue-50 border border-blue-100 rounded-2xl text-center -skew-x-[2deg]">
                    <p className="text-sm text-blue-600 font-bold leading-relaxed skew-x-[2deg] tracking-widest">
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
                    <h2 className={`text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase ${cleanFont.className}`}>Activity</h2>
                  </div>
                  <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {galleryItems.map((item) => (
                      <motion.div 
                        variants={staggerItem} 
                        key={item.id} 
                        onClick={() => item.articleId && openArticle(item.articleId)}
                        className={`bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group transition-all duration-500 ${item.articleId ? 'cursor-pointer hover:shadow-xl hover:-translate-y-2' : ''}`}
                      >
                        <div className="h-64 bg-slate-50 relative overflow-hidden">
                          <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-[0.22,1,0.36,1]" alt={item.title} />
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-bold text-slate-700 tracking-widest uppercase shadow-sm">{item.category}</div>
                        </div>
                        <div className="p-8">
                          <span className="text-xs text-slate-400 font-bold mb-3 block font-mono tracking-wider">{item.date}</span>
                          <h3 className={`text-2xl font-bold mb-3 text-slate-900 transition-colors ${cleanFont.className} ${item.articleId ? 'group-hover:text-blue-500' : ''}`}>{item.title}</h3>
                          <p className="text-slate-500 leading-relaxed text-sm">{item.description}</p>
                          {item.articleId && (
                             <div className="mt-6 flex items-center gap-1 text-[10px] font-bold text-blue-500 tracking-widest uppercase">
                               READ MORE <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
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
              <section className="pt-32 md:pt-40 pb-32 px-6">{faqSection}</section>
            )}
          </motion.main>
        </AnimatePresence>
      </div>

      <footer className="relative bg-slate-950 text-slate-300 py-12 overflow-hidden mt-auto">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-24 bg-blue-500/10 blur-[80px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10 border-b border-slate-800/80 pb-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => switchPage(item.id)}
                className={`text-xs md:text-sm font-bold tracking-widest transition-colors uppercase hover:-translate-y-0.5 ${activePage === item.id ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:px-10 mb-10 shadow-lg backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className={`text-xl md:text-2xl font-black text-white mb-2 tracking-tight uppercase ${cleanFont.className}`}>Contact Us</h3>
              <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                サーバーへの参加希望やコラボのご相談など、お気軽にお問い合わせください。
              </p>
            </div>
            <button className="shrink-0 px-8 py-3.5 bg-white hover:bg-blue-50 text-slate-900 font-bold rounded-full shadow-[0_0_15px_-5px_rgba(255,255,255,0.3)] transition-all flex items-center gap-2 tracking-widest text-xs hover:-translate-y-1">
              <Mail size={16} /> お問い合わせ
            </button>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
            <h2 className={`text-xl md:text-2xl font-black tracking-tight text-white uppercase leading-tight text-center md:text-left ${cleanFont.className}`}>
              The Streamer <span className="text-blue-500 hidden md:inline">/</span><br className="md:hidden" /> Creator Server
            </h2>
            <div className="flex flex-wrap justify-center md:justify-end gap-2 md:gap-3">
              {['X (Twitter)', 'YouTube', 'Twitch', 'Discord'].map((sns, idx) => (
                <button key={idx} className="px-5 py-2 bg-slate-800/60 border border-slate-700 hover:bg-blue-500 hover:border-blue-500 hover:text-white rounded-full transition-all duration-300 text-xs font-bold tracking-wider text-slate-400 hover:-translate-y-1 shadow-sm">
                  {sns}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-800/80 pt-8 text-center flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`text-[10px] font-bold tracking-widest text-slate-500 uppercase ${cleanFont.className}`}>© 2026 THE STREAMER CREATOR SERVER.</p>
            <div className="flex gap-6 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
              <span className="hover:text-slate-300 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-slate-300 cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}