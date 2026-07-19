'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  Variants,
} from 'framer-motion';
import {
  Zen_Maru_Gothic,
  Noto_Sans_JP,
  Montserrat,
  Playfair_Display,
  Six_Caps,
  Dela_Gothic_One,
} from 'next/font/google';
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
  memoryItems,
  recommendedCreators,
  faqList,
  guidelineList,
  sponsorData,
  collectiveData,
  adminList,
} from './data';

// コンポーネントの外側（他のフォント設定の近く）に追加
const sixCaps = Six_Caps({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const delaGothic = Dela_Gothic_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const softFont = Zen_Maru_Gothic({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});
const cleanFont = Noto_Sans_JP({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
});
const montserrat = Montserrat({
  weight: ['200', '300', '400', '700', '900'],
  subsets: ['latin'],
});
const playfair = Playfair_Display({
  weight: ['400', '700', '900'],
  style: ['italic', 'normal'],
  subsets: ['latin'],
});

const menuBgTransition = {
  duration: 0.3,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};
const menuStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};
const menuStaggerItem = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' as const },
  },
};
const pageTransition = { duration: 0.5 };
const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) =>
  Math.abs(offset) * velocity;

export default function UltimateCommunitySite({
  dynamicNews = [],
  dynamicArticles = [],
  dynamicGallery = [],
}: {
  dynamicNews?: any[];
  dynamicArticles?: any[];
  dynamicGallery?: any[];
}) {
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activePage, setActivePage] = useState('home');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [memoryIndex, setMemoryIndex] = useState(0);
  const [previousPage, setPreviousPage] = useState('home');

  const [direction, setDirection] = useState(0);
  const [modalMode, setModalMode] = useState(''); // "" なら閉じている、"join" なら参加、"contact" なら問い合わせ
  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setMemoryIndex(
      (prevIndex) =>
        (prevIndex + newDirection + memoryItems.length) % memoryItems.length
    );
  };

  // 🌟 いま何番目の管理者を表示するか（初期値は 0番目 = 狼の野郎さん）
  const [currentAdminIdx, setCurrentAdminIdx] = useState(0);

  // 🌟 [0] 固定ではなく、選択された番号（currentAdminIdx）を身代わりに指定する
  const admin = adminList[currentAdminIdx];

  const heroIndex = 0;
  const profileRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress, scrollY } = useScroll();
  const yBg1 = useTransform(scrollY, [0, 1000], [0, 150]);
  const yBg2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const yHero = useTransform(scrollY, [0, 1000], [0, -50]);
  const parallaxAbout = useTransform(scrollYProgress, [0, 1], [50, -150]);
  const parallaxX = useTransform(scrollYProgress, [0, 1], [0, -1000]);
  const carouselRef = useRef(null);

  const [selectedCreatorIndex, setSelectedCreatorIndex] = useState(0);

  // 🌟 フワッと感を極めたヘッダーアニメーション設定
  const headerNavContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // 💡 パラパラめくれる間隔を少しゆっくりに（0.1 -> 0.15）
        delayChildren: 0.8, // 💡 ローディング明けの「タメ」を少し長く（0.6 -> 0.8）
      },
    },
  };

  const headerNavItem = {
    hidden: { opacity: 0, y: -20 }, // 💡 もう少し高い位置からフワッと落とす（-10 -> -20）
    visible: {
      opacity: 1,
      y: 0,
      // 💡 時間を倍の0.8秒にし、動きを「じわ〜っ」と止まる高級なカーブに！
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  // =========================================================================
  // ⭐ 画像サイズ＆位置調整パネル
  // =========================================================================
  const heroImageConfig = {
    marginTop: '5vh',
    marginBottom: '10vh',
  };
  // =========================================================================
  // =========================================================================
  const marqueeMembers = useMemo(() => {
    const individuals = recommendedCreators.filter(
      (s) => s.id !== 'collective'
    );
    // 💡 12個の枠を埋めるために、メンバーを順番にループさせます
    return Array.from({ length: 12 }).map((_, idx) => {
      const baseMember = individuals[idx % individuals.length];
      return {
        ...baseMember,
        uniqueKey: `marquee-${idx}`,
        // 💡 ダミーの名前ではなく、data.tsの本物のデータをそのまま使う！
        displayName: baseMember.name,
        roleName: baseMember.scopes?.[0] || 'メンバー', // ← scopesの1つ目を表示（無ければ'メンバー'）
      };
    });
  }, []);

  useEffect(() => {
    // 🌟 1. 読み込みたい画像のURLを配列にまとめる（立ち絵など重い画像を優先）
    const imageUrls = marqueeMembers.map((member) => member.image);

    // 🌟 2. ここに追加したい画像のURLを push（追加）していく！
    // 例：トップページの背景画像を絶対URLで追加する場合
    //imageUrls.push('https://hazimarinomahoutukai001-ai.github.io/tsc-official/images/hero-bg.png');

    // 複数あるなら、何行でも続けて書いてOKだ！
    //imageUrls.push('https://hazimarinomahoutukai001-ai.github.io/tsc-official/images/logo.png');
    //imageUrls.push('https://別の場所にある画像.jpg');

    // 🌟 2. 画像を裏側でダウンロードする関数
    const preloadImages = async () => {
      const promises = imageUrls.map((url) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = resolve; // 読み込み成功したら次へ
          img.onerror = resolve; // 万が一エラーになっても、サイト全体が止まらないように次へ
        });
      });

      // 🌟 3. すべての画像の読み込みが終わるまでここで待機！
      await Promise.all(promises);

      // 🌟 4. 最低限アニメーションを見せるための待機時間（ミリ秒）
      // 君のローディングアニメーションが3.5秒くらいあるから、
      // 画像が一瞬で読み込めた場合でも、少しだけアニメーションを見せるために時間を稼ぐ。
      setTimeout(() => {
        setLoading(false); // ここでついにローディング画面が消える！
      }, 3500);
    };

    preloadImages();
  }, []); // 最初の1回だけ実行

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
        const elementPosition =
          profileRef.current.getBoundingClientRect().top + window.scrollY;
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
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-4"
      >
        {faqList.map((faq, idx) => (
          <motion.div
            variants={staggerItem}
            key={idx}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:border-blue-200 hover:shadow-md"
          >
            <button
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              className="w-full p-6 text-left flex justify-between items-center font-bold text-slate-800 hover:text-blue-500 transition-colors"
            >
              <span className="pr-4">{faq.q}</span>
              <div
                className={`p-2 rounded-full transition-colors ${
                  openFaq === idx
                    ? 'bg-blue-50 text-blue-500'
                    : 'bg-slate-50 text-slate-400'
                }`}
              >
                {openFaq === idx ? <Minus size={16} /> : <Plus size={16} />}
              </div>
            </button>
            <AnimatePresence>
              {openFaq === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6 text-slate-500 text-sm leading-relaxed overflow-hidden"
                >
                  <div className="pt-4 border-t border-slate-50">{faq.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );

  // 🌟 復活！最高のローディング画面 🌟
  if (loading)
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white fixed inset-0 z-[9999]">
        {/* max-w-xsを外して、画面幅いっぱい(w-full)で中央揃えにすることで狭いスマホにも対応 */}
        <div className="flex flex-col items-center w-full px-2">
          {/* 1. 英語名称：絶対に改行させない (whitespace-nowrap) */}
          <motion.div
            initial={{ opacity: 0, letterSpacing: '0.2em' }}
            animate={{ opacity: 1, letterSpacing: '0.6em' }} // スマホでもはみ出ないように最大幅を少し調整
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="text-[9px] sm:text-[10px] md:text-xs font-serif font-extralight text-[#111] uppercase whitespace-nowrap ml-[0.6em]"
          >
            The Streamer Creator Community
          </motion.div>

          {/* 2. センターライン */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: '60px' }}
            transition={{ duration: 1.5, delay: 0.8, ease: 'easeInOut' }}
            className="w-[0.5px] bg-[#333] my-6 md:my-8"
          />

          {/* 3. 日本語名称（テキスト変更）：絶対に改行させない (whitespace-nowrap) */}
          <div className="overflow-hidden w-full flex justify-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.5, ease: 'easeOut' }}
              // 🌟 スマホでは文字と字間を少し小さくし、PCでは大きくするレスポンシブ対応！
              className="text-[8px] sm:text-[9px] md:text-[11px] font-serif font-light tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.8em] text-[#555] ml-[0.3em] sm:ml-[0.4em] md:ml-[0.8em] whitespace-nowrap"
            >
              配信者クリエイターコミュニティ
            </motion.div>
          </div>

          {/* 4. 下部の進行状況 */}
          <div className="w-24 md:w-32 h-[1px] bg-[#eee] mt-12 md:mt-16 relative overflow-hidden">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
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
    <div
      className={`bg-white text-slate-800 selection:bg-blue-100 selection:text-blue-600 overflow-x-hidden min-h-screen flex flex-col ${softFont.className}`}
    >
      {/* 🌟🌟🌟 ここから：時間差で上がる3枚のベール（多重レイヤー演出） 🌟🌟🌟 */}
      <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col">
        {/* 1枚目（最背面）：ほんの少しだけグレー */}
        <motion.div
          initial={{ y: '0%' }}
          animate={{ y: '-100%' }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          className="absolute inset-0 bg-[#f8f9fa]"
        />
        {/* 2枚目（中間）：さらに薄いグレー */}
        <motion.div
          initial={{ y: '0%' }}
          animate={{ y: '-100%' }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
          className="absolute inset-0 bg-[#fdfdfd]"
        />
        {/* 3枚目（最前面）：純白 ＋ 下部の影 */}
        <motion.div
          initial={{ y: '0%' }}
          animate={{ y: '-100%' }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          className="absolute inset-0 bg-white"
        >
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

      {/* 🌟 1. 丸ボタンとスライドメニュー */}
      <nav>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="fixed top-6 left-6 md:top-20 md:left-8 z-[120] p-4 bg-white/90 backdrop-blur-md rounded-full shadow-sm border border-slate-200 text-slate-800 hover:text-blue-600 transition-all"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isMenuOpen ? 'close' : 'menu'}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.div>
          </AnimatePresence>
        </button>
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100%', opacity: 0 }}
                transition={menuBgTransition}
                className="fixed inset-y-0 left-0 z-[110] bg-white/95 backdrop-blur-2xl w-full md:w-[450px] border-r border-slate-200 px-12 pt-36 pb-12 overflow-y-auto flex flex-col shadow-[20px_0_60px_-15px_rgba(0,0,0,0.05)]"
              >
                <motion.div
                  variants={menuStaggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-8 mt-auto mb-auto"
                >
                  {menuItems.map((item) => (
                    <div key={item.id} className="overflow-hidden py-1">
                      <motion.button
                        variants={menuStaggerItem}
                        onClick={() => switchPage(item.id)}
                        className={`group relative block w-full text-lg md:text-xl tracking-widest font-bold transition-colors duration-500 text-left ${
                          montserrat.className
                        } ${
                          activePage === item.id
                            ? 'text-blue-600'
                            : 'text-slate-500 hover:text-blue-600'
                        }`}
                      >
                        {item.label}
                        <span className="relative block h-[2px] w-full bg-transparent mt-3 overflow-hidden">
                          <span
                            className={`absolute inset-0 bg-blue-600 transition-transform duration-[600ms] ease-out ${
                              activePage === item.id
                                ? 'translate-x-0'
                                : '-translate-x-[101%] group-hover:translate-x-0'
                            }`}
                          />
                        </span>
                      </motion.button>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[105] bg-slate-900/20 backdrop-blur-sm"
                onClick={() => setIsMenuOpen(false)}
              />
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* 🌟 2. PC版専用：Cygames風スリムヘッダー */}
      <header className="hidden md:block fixed top-0 left-0 w-full h-14 z-[100] bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-end">
          <motion.nav
            variants={headerNavContainer}
            initial="hidden"
            animate="visible"
            className={`flex items-center space-x-10 text-[11px] font-bold tracking-[0.25em] text-slate-500 uppercase ${montserrat.className}`}
          >
            <motion.button
              variants={headerNavItem}
              onClick={() => switchPage('home')}
              className="hover:text-blue-600 transition-colors"
            >
              HOME
            </motion.button>
            <motion.button
              variants={headerNavItem}
              onClick={() => switchPage('news')}
              className="hover:text-blue-600 transition-colors"
            >
              NEWS
            </motion.button>
            <motion.button
              variants={headerNavItem}
              onClick={() => switchPage('profile')}
              className="hover:text-blue-600 transition-colors"
            >
              PROFILE
            </motion.button>
            <motion.button
              variants={headerNavItem}
              onClick={() => switchPage('activity')}
              className="hover:text-blue-600 transition-colors"
            >
              ACTIVITY
            </motion.button>
            <motion.button
              variants={headerNavItem}
              onClick={() => switchPage('guidelines')}
              className="hover:text-blue-600 transition-colors"
            >
              GUIDELINES
            </motion.button>
            <motion.button
              variants={headerNavItem}
              onClick={() => switchPage('magazine')}
              className="hover:text-blue-600 transition-colors"
            >
              MAGAZINE
            </motion.button>
            <motion.button
              variants={headerNavItem}
              onClick={() => switchPage('sponsors')}
              className="hover:text-blue-600 transition-colors"
            >
              SPONSORS
            </motion.button>
            <motion.button
              variants={headerNavItem}
              onClick={() => switchPage('faq')}
              className="hover:text-blue-600 transition-colors"
            >
              FAQ
            </motion.button>
          </motion.nav>
        </div>
      </header>

      {/* 🌟 3. メインコンテンツ */}
      <div className="flex-grow flex flex-col w-full md:pt-14">
        <AnimatePresence mode="wait">
          <motion.main
            key={activePage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={pageTransition}
            className="w-full flex-grow flex flex-col"
          >
            {activePage === 'home' && (
              <>
                {/* 🌟🌟🌟 ここで「ホーム画面の箱」スタート！ 🌟🌟🌟 */}
                {/* 💡 flex-row (左右分割) に設定 */}
                <section className="relative w-full min-h-screen flex flex-col lg:flex-row items-center justify-between overflow-hidden bg-white">
                  {/* 1. 背景グリッド */}
                  <div className="absolute inset-0 z-0 bg-grid-pattern opacity-100 pointer-events-none" />

                  {/* 🌟 復活：サイドの縦書きテキスト（そのまま維持） 🌟 */}
                  <div
                    className={`absolute left-4 md:left-12 top-[40vh] z-30 opacity-40 pointer-events-none ${montserrat.className}`}
                  >
                    <span className="vertical-text text-[10px] md:text-xs font-bold tracking-[0.5em] text-slate-500 uppercase">
                      Official Portal Site — EST. 2026
                    </span>
                  </div>
                  <div
                    className={`absolute right-4 md:right-12 top-[40vh] z-30 opacity-40 pointer-events-none ${montserrat.className}`}
                  >
                    <span className="vertical-text text-[10px] md:text-xs font-bold tracking-[0.5em] text-slate-500 uppercase">
                      The Streamer Creator Server
                    </span>
                  </div>

                  {/* 🌟 5. キャラクター層（左半分に超巨大に配置） 🌟 */}
                  {/* 💡 w-full lg:w-[50%] で画面の左半分を確保 */}
                  <motion.div className="relative z-20 w-full lg:w-[50%] h-full flex justify-center items-end pointer-events-none mt-20 lg:mt-0 overflow-hidden">
                    <motion.img
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 1.2,
                        ease: 'easeOut',
                        delay: 0.2,
                      }}
                      src={siteConfig.heroImages[heroIndex] || siteConfig.logo}
                      alt="TSC Members"
                      // 🌟 ここを調整！ width をメチャクチャ大きく (w-[350%]) する！
                      // 💡 巨大化して右にはみ出す分を、 lg:translate-x-[-20%] で左へ押しやる調整！
                      className="w-[350%] lg:w-[350%] lg:translate-x-[-20%] max-w-none h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)] pointer-events-auto"
                    />
                  </motion.div>

                  {/* 🌟 3 & 4. テキストエリア（右半分にまとめて配置） 🌟 */}
                  {/* 💡 w-full lg:w-[50%] で画面の右半分を確保し、中央に寄せる */}
                  <div className="relative z-30 w-full lg:w-[50%] h-full flex flex-col justify-center items-start px-8 lg:px-16 pointer-events-none pb-32 lg:pb-0">
                    {/* 🌟 4. 右側オシャレ文字（英語ロゴ：上） 🌟 */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 1.2,
                        duration: 1.2,
                        ease: 'easeOut',
                      }}
                      className="relative text-left mb-16"
                    >
                      {/* 🌟 クラス： font-[200] text-slate-800 のまま！ */}
                      <h1
                        className={`${montserrat.className} text-4xl xl:text-[4.5rem] font-[200] tracking-[0.2em] text-slate-800 leading-[1.1]`}
                      >
                        THE
                        <br />
                        STREAMER
                        <br />
                        CREATOR
                        <br />
                        <span className="text-blue-600 font-[300]">SERVER</span>
                      </h1>
                      <div className="mt-8 flex items-center gap-4 opacity-60">
                        <div className="w-16 h-[1px] bg-slate-800"></div>
                        <span
                          className={`text-[10px] tracking-[0.4em] font-bold uppercase ${montserrat.className}`}
                        >
                          EST. 2026
                        </span>
                      </div>
                    </motion.div>

                    {/* 🌟 3. キャッチコピー（日本語キャッチ：下） 🌟 */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: 0.8,
                        duration: 0.5,
                        ease: 'easeOut',
                      }}
                      className="relative"
                    >
                      <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        // 🌟 クラス： font-bold text-slate-800 のまま！影もそのまま！
                        className={`${cleanFont.className} text-4xl xl:text-5xl font-bold tracking-widest text-slate-800 relative leading-loose flex flex-col items-start`}
                        style={{
                          filter:
                            'drop-shadow(0px 0px 15px rgba(255,255,255,0.9)) drop-shadow(0px 4px 4px rgba(255,255,255,1))',
                        }}
                      >
                        {/* ⭐ 1行目 */}
                        <div className="relative overflow-hidden w-fit px-1">
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.4, duration: 0.01 }}
                            className="block"
                          >
                            良き出会いを！
                          </motion.span>
                          <motion.div
                            initial={{ x: '-101%' }}
                            animate={{ x: ['-101%', '0%', '101%'] }}
                            transition={{ delay: 1.0, duration: 0.8 }}
                            className="absolute inset-0 bg-slate-800"
                          />
                        </div>
                        {/* ⭐ 2行目 */}
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
                            initial={{ x: '-101%' }}
                            animate={{ x: ['-101%', '0%', '101%'] }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                            className="absolute inset-0 bg-slate-800"
                          />
                        </div>
                        {/* ⭐ 3行目 */}
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
                            initial={{ x: '-101%' }}
                            animate={{ x: ['-101%', '0%', '101%'] }}
                            transition={{ delay: 1.4, duration: 0.8 }}
                            className="absolute inset-0 bg-slate-800"
                          />
                        </div>
                      </motion.h1>
                    </motion.div>
                  </div>

                  {/* 🌟 復活：モバイル用テキスト（PC版コンテナの外に配置してスマホ対応をキープ！） 🌟 */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="block md:hidden mt-6 text-center relative z-20 pointer-events-none px-4"
                  >
                    <h1
                      className={`text-2xl font-black text-slate-800 tracking-widest ${cleanFont.className}`}
                    >
                      TSC OFFICIAL
                    </h1>
                    <p
                      className={`text-[10px] font-bold text-slate-400 tracking-[0.3em] mt-1 uppercase ${montserrat.className}`}
                    >
                      The Streamer Creator Server
                    </p>
                  </motion.div>

                  {/* 6. スクロールボタン（変更なし） */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 1 }}
                    onClick={() =>
                      window.scrollTo({
                        top: window.innerHeight,
                        behavior: 'smooth',
                      })
                    }
                    className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex-col items-center pointer-events-auto cursor-pointer gap-3 opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <span
                      className={`text-[9px] font-bold tracking-[0.4em] text-slate-800 pl-1 uppercase ${montserrat.className}`}
                    >
                      SCROLL
                    </span>
                    <div className="w-[1px] h-6 bg-slate-300 relative overflow-hidden">
                      <motion.div
                        animate={{ y: ['-100%', '0%', '100%'] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          times: [0, 0.5, 1],
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
                          <h2
                            className={`text-3xl md:text-4xl font-black tracking-tight text-slate-900 ${cleanFont.className}`}
                          >
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
                          {dynamicNews.slice(0, 3).map((news) => (
                            <div
                              key={news.id}
                              onClick={() =>
                                news.articleId && openArticle(news.articleId)
                              }
                              className={`py-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center gap-2 md:gap-6 group transition-colors hover:bg-slate-50 px-2 -mx-2 rounded-lg ${
                                news.articleId ? 'cursor-pointer' : ''
                              }`}
                            >
                              <div
                                className={`text-sm font-bold text-slate-900 shrink-0 ${montserrat.className}`}
                              >
                                {news.date}
                              </div>
                              <h3
                                className={`text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors leading-relaxed ${cleanFont.className}`}
                              >
                                {news.title}
                              </h3>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* ▼ 右カラム：Magazine ▼ */}
                      <div>
                        <div className="flex items-end justify-between mb-6 pb-4 border-b border-slate-200">
                          <h2
                            className={`text-3xl md:text-4xl font-black tracking-tight text-slate-900 ${cleanFont.className}`}
                          >
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
                          {dynamicArticles.slice(0, 2).map((article) => (
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
                                  <span
                                    className={`font-bold tracking-widest ${montserrat.className}`}
                                  >
                                    NO IMAGE
                                  </span>
                                </div>
                              )}
                              <div className="p-5 flex flex-col flex-grow">
                                <span
                                  className={`text-xs font-bold text-slate-900 mb-2 ${montserrat.className}`}
                                >
                                  {article.date}
                                </span>
                                <h3
                                  className={`text-sm font-bold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors line-clamp-3 ${cleanFont.className}`}
                                >
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

                {/* 🌟 ここを変更中 🌟 */}

                <ActivityLogGrid
                  memoryItems={memoryItems}
                  montserrat={montserrat}
                  cleanFont={cleanFont}
                />

                {/* 🌟 ここまで 🌟 */}
                <section className="py-32 px-6 bg-white border-t border-slate-100 overflow-hidden relative">
                  <motion.div
                    style={{ x: parallaxX }}
                    className="absolute top-16 left-0 w-[200%] pointer-events-none select-none z-0"
                  >
                    <span
                      className={`text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-black text-slate-100/60 whitespace-nowrap tracking-tighter ${cleanFont.className}`}
                    >
                      THE STREAMER CREATOR SERVER THE STREAMER CREATOR SERVER
                    </span>
                  </motion.div>

                  <div className="max-w-5xl mx-auto relative z-10">
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-100px' }}
                      variants={fadeInVariant}
                      className="mb-20"
                    >
                      <p className="text-blue-500 font-bold text-[11px] tracking-[0.4em] uppercase mb-4">
                        About TSC
                      </p>
                      <h2
                        className={`text-4xl md:text-5xl font-black tracking-tight uppercase mb-4 text-slate-900 ${cleanFont.className}`}
                      >
                        TSC鯖ってどんなところ?
                      </h2>
                      <div className="w-8 h-1 bg-blue-500" />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                      <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInVariant}
                        className="space-y-6 text-slate-600 relative z-10"
                      >
                        <p className="text-xl leading-loose font-medium text-slate-800 bg-white/50 backdrop-blur-sm rounded-lg">
                          表現する人、創る人、そして支える人。交差するすべての人が集う「第三の居場所」です。
                        </p>
                        <p className="leading-loose text-slate-500 bg-white/50 backdrop-blur-sm rounded-lg">
                          ここは、ただのチャットサーバーではありません。何気ない雑談からふと生まれるアイデアや、一人では辿り着けなかった最高の仲間との出会い。そして、培ってきた配信のノウハウや技術を惜しみなく分かち合う、創造の連鎖。一人で歩むよりも、遊ぶよりも誰かと共有する喜びを。技術と創造性を掛け合わせ、私たちは新しいエンターテインメントの形を追求しています。私たちは、あなたの「次の一歩」を応援するとともに、数ある世界の中の、ひとつの新しい居場所でありたいと願っています。
                        </p>
                      </motion.div>

                      <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 gap-4 relative z-10"
                      >
                        {[
                          {
                            icon: <Globe size={20} />,
                            title: 'Open Environment',
                            desc: '誰でも歓迎するオープンな空気感。',
                          },
                          {
                            icon: <Zap size={20} />,
                            title: 'Tech & Creative',
                            desc: '最新技術を取り入れた配信環境。',
                          },
                          {
                            icon: <Users size={20} />,
                            title: 'A New Third Place',
                            desc: '役割の垣根を超え、すべての人が自分らしくいられる「もうひとつの居場所」。',
                          },
                        ].map((item, idx) => (
                          <motion.div
                            variants={staggerItem}
                            key={idx}
                            className="flex items-start gap-5 p-8 bg-[#FAFAFA] rounded-2xl border border-slate-100 transition-all hover:shadow-md hover:border-blue-100 hover:-translate-y-1 group relative overflow-hidden"
                          >
                            <div className="text-blue-500 p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform relative z-10">
                              {item.icon}
                            </div>
                            <div className="relative z-10">
                              <h4
                                className={`font-bold text-sm uppercase tracking-wider mb-2 text-slate-900 ${cleanFont.className}`}
                              >
                                {item.title}
                              </h4>
                              <p className="text-xs text-slate-500 leading-relaxed">
                                {item.desc}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </section>

                {/* 🔽🔽🔽 ここに変更中🔽🔽🔽 */}
                <section className="py-20 bg-white border-y border-slate-200 overflow-hidden relative">
                  {/* タイトル部分 */}
                  <div className="mb-12 flex flex-col items-center z-10 relative">
                    <p
                      className={`text-blue-500 font-bold text-xs tracking-[0.3em] uppercase mb-2 ${montserrat.className}`}
                    >
                      Management & Sub-Admins
                    </p>
                    <h3
                      className={`text-2xl md:text-3xl font-black text-slate-800 tracking-wider ${cleanFont.className}`}
                    >
                      コミュニティ運営陣
                    </h3>
                  </div>

                  {/* 🌟 親コンテナ（Framer Motion担当）：左から順番にドミノ倒し */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ staggerChildren: 0.18 }}
                    className="w-full max-w-7xl mx-auto px-2 md:px-4 flex justify-center items-center h-[50vh] md:h-[60vh] gap-1 md:gap-2"
                  >
                    {marqueeMembers.map((member, idx) => {
                      // 🌟 エラーの原因はコレが消えていたことだ！今回はバッチリ入ってるぜ！
                      const isEven = idx % 2 === 0;

                      return (
                        /* 外箱（CPU担当）：ジグザグ配置とホバー伸縮 */
                        <div
                          key={`admin-wrapper-${idx}`}
                          className={`relative flex-1 min-w-[30px] md:min-w-[40px] h-[80%] transition-all duration-500 ease-in-out hover:flex-[4] md:hover:flex-[5] ${
                            isEven
                              ? 'translate-y-4 md:translate-y-6'
                              : '-translate-y-4 md:-translate-y-6'
                          }`}
                        >
                          {/* 🌟 中身（GPU担当）：ゆっくり豪華に登場させるアニメーション */}
                          <motion.div
                            variants={{
                              hidden: {
                                opacity: 0,
                                scale: 0.95,
                                y: isEven ? 40 : -40,
                              },
                              visible: {
                                opacity: 1,
                                scale: 1,
                                y: 0,
                                transition: {
                                  duration: 1.5, // 箱は1.5秒かけて超ゆったり定位置へ
                                  ease: [0.25, 1, 0.5, 1],
                                },
                              },
                            }}
                            className="w-full h-full group bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden cursor-pointer hover:shadow-xl"
                            onClick={() => switchPage('profile')}
                          >
                            {/* 完全白背景コンテナ */}
                            <div className="w-full h-full relative aspect-[2/3] bg-white overflow-hidden">
                              {/* 画像（立ち絵） */}
                              <img
                                src={member.image}
                                alt={member.displayName}
                                loading="lazy"
                                decoding="async"
                                // 箱がゆったり動いている間に、0.5秒でサクッと合流させる！
                                className="absolute inset-0 w-full h-full object-cover object-top opacity-0 transition-opacity duration-500 ease-in-out group-hover:scale-105 z-10"
                                onLoad={(e) => {
                                  e.currentTarget.classList.remove('opacity-0');
                                }}
                              />
                            </div>

                            {/* ホバー時のテキスト */}
                            <div className="absolute inset-x-0 bottom-0 pt-20 pb-4 px-2 bg-gradient-to-t from-white via-white/90 to-transparent flex flex-col items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                              <span
                                className={`text-[9px] md:text-[10px] font-black text-blue-500 tracking-widest uppercase mb-1 ${montserrat.className}`}
                              >
                                {member.roleName}
                              </span>
                              <span className="text-xs md:text-sm font-bold text-slate-800 truncate w-full">
                                {member.displayName}
                              </span>
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </motion.div>
                </section>
                {/* 🔽🔽🔽変更中🔽🔽🔽 */}

                {/* 🔽🔽🔽 ここにABOUTをペースト！！ 🔽🔽🔽 */}
                {/* ⭐ ABOUT セクション（data.ts 連動＆安全対策版） ⭐ */}
                <section className="py-32 px-6 bg-[#FAFAFA] relative overflow-hidden border-t border-slate-100">
                  <motion.div
                    style={{ x: parallaxAbout }}
                    className="absolute top-10 right-0 z-0 pointer-events-none select-none opacity-[0.03]"
                  >
                    <span
                      className={`text-[12rem] md:text-[20rem] font-black text-slate-900 leading-none tracking-tighter uppercase ${cleanFont.className}`}
                    >
                      ABOUT
                    </span>
                  </motion.div>

                  <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
                    {/* 左側：画像とステータス */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="w-full lg:w-[40%] 2xl:w-[55%] relative flex flex-col items-center lg:items-end justify-center"
                    >
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
                          <span className="text-[10px] md:text-xs text-blue-500 font-black tracking-[0.3em]">
                            ADMIN
                          </span>
                          <span className="text-lg md:text-xl font-bold text-slate-700 mt-2 whitespace-nowrap">
                            管理人{' '}
                            <span className="text-sm ml-1 text-slate-500">
                              {collectiveData?.adminCount || 1}名
                            </span>
                          </span>
                        </div>
                        <div className="w-px h-12 bg-slate-300/50" />
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] md:text-xs text-slate-400 font-black tracking-[0.3em]">
                            SUB-ADMIN
                          </span>
                          <span className="text-lg md:text-xl font-bold text-slate-700 mt-2 whitespace-nowrap">
                            サブ管理人{' '}
                            <span className="text-sm ml-1 text-slate-500">
                              {collectiveData?.subAdminCount || 11}名
                            </span>
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    {/* 右側：テキストコンテンツ */}
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="w-full lg:w-[60%] 2xl:w-[45%] flex flex-col items-center lg:items-start text-left relative z-10 pt-16 lg:pt-0"
                    >
                      <div className="mb-4 relative w-full text-center lg:text-left">
                        <span
                          className={`text-[4.5rem] md:text-[6.5rem] font-black text-slate-300 leading-none tracking-tighter uppercase absolute -top-8 md:-top-12 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 pointer-events-none select-none opacity-80 ${cleanFont.className}`}
                        >
                          ABOUT
                        </span>
                        <h2
                          className={`text-3xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight uppercase relative z-10 ${cleanFont.className}`}
                        >
                          {collectiveData?.title || '管理者・サブ管理人'}
                        </h2>
                      </div>

                      <div className="w-full mb-8 relative z-10 flex justify-center lg:justify-start">
                        <div className="inline-block bg-blue-50/80 border border-blue-100 px-4 py-2 rounded-full shadow-sm">
                          <p className="text-blue-600 font-black tracking-[0.2em] text-xs md:text-sm uppercase flex items-center gap-2">
                            <ShieldCheck size={16} /> 管理体制{' '}
                            <span className="text-[10px] md:text-xs font-bold text-blue-400">
                              /{' '}
                              {collectiveData?.subtitle ||
                                'Admins & Sub-Admins'}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="space-y-6 text-slate-600 leading-loose font-medium text-sm md:text-base border-l-4 border-blue-500 pl-6 bg-white p-6 rounded-2xl lg:rounded-l-none shadow-sm relative z-10 w-full max-w-2xl lg:max-w-none text-left">
                        <p className="text-lg md:text-xl font-bold text-slate-800">
                          総勢
                          <span className="text-blue-500 text-2xl md:text-3xl mx-1 font-black">
                            {collectiveData?.totalCount || 12}
                          </span>
                          名の運営チームが、
                          <br className="hidden md:block" />
                          {collectiveData?.mainMessage ||
                            'あなたの活動をサポートします。'}
                        </p>

                        {collectiveData?.description?.map((text, idx) => (
                          <p key={idx}>{text}</p>
                        ))}
                      </div>

                      <button
                        onClick={() => switchPage('profile')}
                        className="mt-10 mx-auto lg:mx-0 relative z-10 px-8 py-4 bg-white border-2 border-[#333333] text-[#333333] hover:bg-blue-500 hover:border-blue-500 hover:text-white font-bold rounded-full transition-all duration-300 tracking-widest text-xs md:text-sm flex items-center gap-3 group shadow-sm hover:shadow-[0_10px_20px_-10px_rgba(59,130,246,0.5)] hover:-translate-y-1"
                      >
                        VIEW MEMBERS{' '}
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </button>
                    </motion.div>
                  </div>
                </section>

                {/* ⭐ SPONSOR セクション（完全データ連動版！） ⭐ */}
                <section className="py-24 bg-white relative z-20 border-t border-slate-100">
                  <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                      <p
                        className={`text-blue-500 font-bold text-[11px] tracking-[0.4em] uppercase mb-4 ${montserrat.className}`}
                      >
                        {sponsorData.headerTitle}
                      </p>
                      <h2
                        className={`text-3xl md:text-4xl font-black tracking-tight text-slate-900 ${cleanFont.className}`}
                      >
                        {sponsorData.homeSection.title}
                      </h2>
                      <div className="w-12 h-1 bg-blue-500 mx-auto mt-6 rounded-full"></div>
                    </div>

                    <div className="bg-[#F8FAFC] rounded-3xl p-8 md:p-16 max-w-4xl mx-auto text-center shadow-sm border border-slate-100">
                      <h3
                        className={`text-xl md:text-2xl font-bold text-slate-800 mb-6 ${cleanFont.className}`}
                      >
                        {sponsorData.homeSection.subtitle}
                      </h3>
                      {/* 🌟 修正後： whitespace-pre-wrap に変更！ */}
                      <p className="text-sm md:text-base text-slate-600 leading-loose mb-10 max-w-3xl mx-auto whitespace-pre-wrap">
                        {sponsorData.homeSection.text}
                      </p>

                      {/* 🌟 data.ts からタイトルと説明文を自動で読み込んでカードを作る！ */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12 text-left relative z-10">
                        {sponsorData.homeSection.features.map(
                          (feature, idx) => (
                            <div
                              key={idx}
                              className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-4 hover:shadow-md hover:border-blue-200 transition-all duration-300 group"
                            >
                              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                {/* 1個目はビル、2個目はパーセントのアイコンを自動で出す */}
                                {idx === 0 ? (
                                  <Building size={28} />
                                ) : (
                                  <BadgePercent size={28} />
                                )}
                              </div>
                              <h4 className="text-lg md:text-xl font-bold text-slate-800">
                                {feature.title}
                              </h4>
                              <p className="text-sm text-slate-600 leading-relaxed">
                                {feature.description}
                              </p>
                            </div>
                          )
                        )}
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
                      <p
                        className={`text-blue-500 font-bold text-[11px] tracking-[0.4em] uppercase mb-4 ${montserrat.className}`}
                      >
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
                      <p
                        className={`text-blue-500 font-bold text-[11px] tracking-[0.4em] uppercase mb-4 ${montserrat.className}`}
                      >
                        Questions & Answers
                      </p>
                      <h2
                        className={`text-3xl md:text-4xl font-black tracking-tight text-slate-900 uppercase ${cleanFont.className}`}
                      >
                        FAQ
                      </h2>
                    </div>

                    <div className="space-y-4 mb-12">
                      {faqList.slice(0, 3).map((faq, index) => (
                        <div
                          key={index}
                          className="bg-[#FAFAFA] rounded-xl p-6 md:p-8 border border-slate-100 hover:border-blue-100 transition-colors"
                        >
                          <h3
                            className={`text-sm md:text-base font-bold text-slate-800 mb-3 flex items-start gap-3 ${cleanFont.className}`}
                          >
                            <span className="text-blue-600 font-black mt-0.5">
                              Q.
                            </span>
                            {faq.q}
                          </h3>
                          <p className="text-sm text-slate-600 pl-7 leading-relaxed">
                            <span className="text-slate-400 font-black mr-2">
                              A.
                            </span>
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
                    <p
                      className={`text-blue-500 font-bold text-[11px] tracking-[0.4em] uppercase mb-4 ${montserrat.className}`}
                    >
                      Latest Information
                    </p>
                    <h2
                      className={`text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase ${cleanFont.className}`}
                    >
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
                    {dynamicNews.map((news) => (
                      <motion.div
                        variants={staggerItem}
                        key={news.id}
                        onClick={() =>
                          news.articleId && openArticle(news.articleId)
                        }
                        className={`group bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 ${
                          news.articleId
                            ? 'cursor-pointer hover:-translate-y-1 hover:border-blue-200'
                            : ''
                        }`}
                      >
                        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                          <div className="flex items-center gap-3">
                            <span
                              className={`text-sm font-bold text-slate-400 tracking-widest ${montserrat.className}`}
                            >
                              {news.date}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider ${
                                news.category === 'IMPORTANT'
                                  ? 'bg-red-50 text-red-600'
                                  : 'bg-blue-50 text-blue-600'
                              } ${montserrat.className}`}
                            >
                              {news.category}
                            </span>
                          </div>
                        </div>
                        <h3
                          className={`text-xl md:text-2xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors ${cleanFont.className}`}
                        >
                          {news.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                          {news.content}
                        </p>

                        {news.articleId && (
                          <div
                            className={`mt-6 flex items-center gap-1 text-[10px] font-bold text-blue-500 tracking-widest uppercase ${montserrat.className}`}
                          >
                            READ MORE{' '}
                            <ArrowRight
                              size={12}
                              className="group-hover:translate-x-1 transition-transform"
                            />
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
                    <p
                      className={`text-blue-500 font-bold text-[11px] tracking-[0.4em] uppercase mb-4 ${montserrat.className}`}
                    >
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
                    {dynamicArticles.map((article) => (
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
                            <span
                              className={`text-xs font-bold tracking-widest text-slate-400 ${montserrat.className}`}
                            >
                              {article.date}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider bg-blue-50 text-blue-600 ${montserrat.className}`}
                            >
                              {article.category}
                            </span>
                          </div>
                          <h3
                            className={`text-xl font-bold mb-4 text-slate-900 group-hover:text-blue-500 transition-colors leading-snug ${cleanFont.className}`}
                          >
                            {article.title}
                          </h3>

                          <div
                            className={`mt-auto pt-4 flex items-center gap-1 text-[10px] font-bold text-blue-500 tracking-widest uppercase ${montserrat.className}`}
                          >
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
                const article = dynamicArticles.find(
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
                            <span
                              className={`text-xs font-bold tracking-widest text-slate-400 ${montserrat.className}`}
                            >
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
                    <p
                      className={`text-blue-500 font-bold text-[11px] tracking-[0.4em] uppercase mb-4 ${montserrat.className}`}
                    >
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
                        <div
                          className={`inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold tracking-wider rounded-md mb-4 uppercase ${montserrat.className}`}
                        >
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
                      onClick={() => setModalMode('contact')} // 🌟 "contact" をセット
                      className="relative z-10 px-8 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-full transition-all duration-300 tracking-widest text-sm flex items-center gap-2 mx-auto"
                    >
                      <Mail size={16} /> お問い合わせ
                    </button>
                  </motion.div>
                </div>
              </section>
            )}
            
  {/* おすすめ配信者 一覧ページ */}
{activePage === 'profile' && (
  <section className="relative w-full min-h-screen bg-[#FAFAFA] overflow-hidden">
    {/* サイト全体の背景（ドット） */}
    <div
      className="absolute inset-0 z-0 pointer-events-none opacity-40"
      aria-hidden="true"
      style={{
        backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    />

    <div className="max-w-7xl mx-auto px-6 pt-0 pb-20 relative z-10">
      
      {/* ヒーローヘッダー（特大バナーエリア） */}
      <div className="relative w-full rounded-3xl overflow-hidden mb-12 shadow-2xl min-h-[350px] md:min-h-[450px] flex flex-col">
        {/* ▼ バナー画像のURL ▼ */}
        <img
          src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=2000&q=80"
          alt="Hero Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
        <div className="relative z-10 p-8 md:p-12 mt-auto flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
          <div className="border-l-4 border-blue-500 pl-6">
            <p className="text-blue-300 font-mono text-[10px] tracking-[0.3em] uppercase mb-2 drop-shadow-md" aria-hidden="true">
              // Recommended
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-lg">
              おすすめ
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 ml-3">
                配信者 / クリエイター
              </span>
            </h2>
          </div>
          <div className="flex gap-2 pb-1 overflow-x-auto no-scrollbar">
            {['6月', '7月', '8月'].map((month) => (
              <button
                key={month}
                className="px-6 py-2.5 text-xs font-bold rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none transition-all whitespace-nowrap shadow-sm"
              >
                {month}アーカイブ
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* メンバー選択タブ */}
      <div className="flex flex-wrap gap-2 mb-10 relative z-30">
        {recommendedCreators?.map((creator, idx) => {
          if (creator?.id === 'collective') return null;
          const isSelected = selectedIndex === idx;
          return (
            <button
              key={creator?.id || idx}
              onClick={() => setSelectedIndex(idx)}
              aria-current={isSelected ? 'true' : 'false'}
              className={`px-6 py-3 text-sm font-bold tracking-wide transition-all rounded-t-lg border-b-2 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                isSelected
                  ? 'bg-white text-slate-900 border-blue-600 shadow-sm'
                  : 'bg-transparent text-slate-400 border-transparent hover:bg-white/50 hover:text-slate-600'
              }`}
            >
              {creator?.name}
            </button>
          );
        })}
      </div>

      {/* メイン：ショーケース（🌟 ここが丸ごとゲーム風UIになっています！） */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedIndex}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
          className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden p-6 md:p-10"
        >
          {/* 🌟 背景の巨大な透かし立ち絵（ウォーターマーク） */}
          <div className="absolute top-0 left-[-20%] w-[80%] h-full opacity-[0.04] pointer-events-none overflow-hidden z-0">
            <img
              src={recommendedCreators[selectedIndex]?.image}
              alt="Background Watermark"
              className="w-full h-full object-cover object-top grayscale scale-150 transform -translate-y-10"
            />
          </div>

         {/* --- 左側：立ち絵ビジュアル --- */}
          <div className="lg:col-span-5 relative h-[450px] md:h-[650px] flex items-end justify-center pointer-events-none z-10">
            {/* キャラクターの横に添える「縦書き」のアクセント */}
            <div className="absolute left-0 top-1/4 -translate-x-4 hidden md:flex items-center text-slate-300 font-black text-2xl tracking-[0.5em] select-none z-0" style={{ writingMode: 'vertical-rl' }}>
              {recommendedCreators[selectedIndex]?.id?.toUpperCase()}
            </div>

            {/* 🌟 ここが変更点！データから位置・サイズ情報を取得してCSSに適用するラッパー */}
            <div 
              className="relative z-10 w-full h-full flex items-end justify-center pointer-events-auto"
              style={{
                // data.tsに設定があればそれを使い、無ければデフォルト(ズレなし・等倍)にする
                transform: `
                  translate(
                    ${recommendedCreators[selectedIndex]?.imageStyle?.x || '0px'}, 
                    ${recommendedCreators[selectedIndex]?.imageStyle?.y || '0px'}
                  ) 
                  scale(${recommendedCreators[selectedIndex]?.imageStyle?.scale || 1})
                `,
                transformOrigin: 'bottom center' // 足元を基準に拡大縮小する
              }}
            >
              <motion.img
                initial={{ scale: 0.95, opacity: 0, x: -20 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.5, type: 'spring' }}
                src={recommendedCreators[selectedIndex]?.image}
                alt={`${recommendedCreators[selectedIndex]?.name || 'クリエイター'}の立ち絵`}
                // max-wやmax-hの制限を少し緩めて、scaleで自由に大きくできるように調整
                className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
              />
            </div>
          </div>
          
          {/* --- 右側：詳細情報エリア --- */}
          <div className="lg:col-span-7 flex flex-col relative z-10 h-full justify-center">
            
            {/* 🌟 名前と役職の「タイトルバナー」 */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-700 rounded-2xl p-6 md:p-8 mb-8 text-white shadow-lg relative overflow-hidden">
              {/* バナー内のキラキラした装飾 */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
              
              <div className="flex flex-col gap-2 relative z-10">
                <div className="flex flex-wrap gap-2 mb-1">
                  {recommendedCreators[selectedIndex]?.scopes?.map((scope, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded-full border border-white/10"
                    >
                      {scope}
                    </span>
                  ))}
                </div>
                <div className="flex items-end gap-4">
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight drop-shadow-md">
                    {recommendedCreators[selectedIndex]?.name}
                  </h3>
                  <span className="text-slate-300 font-bold tracking-widest uppercase text-sm mb-2 hidden md:block">
                    {recommendedCreators[selectedIndex]?.id}
                  </span>
                </div>
              </div>
            </div>

            {/* 紹介文 */}
            <div className="mb-10 px-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-blue-500"></div>
                <h4 className="text-sm font-black text-slate-800 tracking-[0.2em] uppercase">
                  紹介文
                </h4>
              </div>
              <p className="text-slate-600 text-base md:text-lg leading-loose font-medium pl-11">
                {recommendedCreators[selectedIndex]?.description || '紹介文が設定されていません。'}
              </p>
            </div>

            {/* 活動プラットフォーム */}
            <div className="mt-auto pt-6 px-2">
              <h4 className="text-xs font-bold text-slate-400 tracking-[0.25em] uppercase mb-4 pl-11">
                Official Links
              </h4>
              <div className="flex flex-wrap gap-3 pl-11">
                {recommendedCreators[selectedIndex]?.platforms?.map((platform, i) => (
                  <a
                    key={i}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-5 py-2.5 bg-white text-slate-700 rounded-xl text-xs font-bold tracking-widest uppercase focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none transition-all duration-300 border-2 border-slate-200 hover:border-blue-500 hover:text-blue-600 hover:-translate-y-1 shadow-sm hover:shadow-md"
                  >
                    {platform.name}
                    <svg className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            
          </div>
        </motion.div>
      </AnimatePresence>

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
                    <p
                      className={`text-blue-500 font-bold text-[10px] tracking-[0.5em] uppercase mb-2 ${montserrat.className}`}
                    >
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

            {/* 🌟 CREATOR ページ（Mac Dock風ボトムUI ＆ 白基調ポップアップ仕様） */}
            {activePage === 'admins' &&
              (() => {
                const admin = adminList[selectedCreatorIndex];
                if (!admin) return null;

                // 🌟 次・前へ切り替える関数
                const handlePrev = () =>
                  setSelectedCreatorIndex((prev) =>
                    prev === 0 ? adminList.length - 1 : prev - 1
                  );
                const handleNext = () =>
                  setSelectedCreatorIndex((prev) =>
                    prev === adminList.length - 1 ? 0 : prev + 1
                  );

                return (
                  <section className="relative w-full min-h-screen bg-[#FAFAFA] overflow-hidden flex flex-col lg:flex-row transition-colors duration-700">
                    {/* 🌟 メンバーカラーのふんわりオーラ背景 */}
                    <div
                      className="absolute inset-0 z-0 pointer-events-none transition-all duration-1000 opacity-15"
                      style={{
                        background: `radial-gradient(circle at 25% 50%, ${admin.themeColor} 0%, transparent 70%)`,
                      }}
                    />

                    {/* 🌟 背景の巨大透かし文字 */}
                    <div
                      className={`absolute top-20 right-10 text-[10rem] md:text-[15rem] font-black leading-none select-none pointer-events-none z-0 transition-colors duration-1000 ${
                        cleanFont?.className || ''
                      }`}
                      style={{ color: admin.themeColor, opacity: 0.05 }}
                    >
                      {admin.romanName.split(' ')[0]}
                    </div>

                    {/* ========================================================== */}
                    {/* 🌟 画面端の直感切り替えボタン（PREV / NEXT） */}
                    {/* ========================================================== */}
                    <button
                      onClick={handlePrev}
                      className="absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 z-40 p-3 md:p-4 rounded-full bg-white/60 hover:bg-white backdrop-blur-md border border-slate-200/50 shadow-lg text-slate-400 hover:text-slate-800 transition-all group"
                    >
                      <svg
                        className="w-6 h-6 md:w-8 md:h-8 group-hover:-translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={handleNext}
                      className="absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 z-40 p-3 md:p-4 rounded-full bg-white/60 hover:bg-white backdrop-blur-md border border-slate-200/50 shadow-lg text-slate-400 hover:text-slate-800 transition-all group"
                    >
                      <svg
                        className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>

                    {/* 🎨 左カラム：立ち絵とキャッチコピー */}
                    <div className="w-full lg:w-[45%] relative z-20 flex flex-col justify-center px-4 md:px-12 lg:pl-16 pt-24 pb-32">
                      <div className="absolute top-32 lg:top-40 left-12 lg:left-24 flex gap-3 md:gap-5 z-20 pointer-events-none">
                        {admin.catchphrases.map(
                          (phrase: string, idx: number) => (
                            <motion.div
                              key={`phrase-${idx}-${admin.id}`}
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.8, delay: idx * 0.2 }}
                              className="relative group"
                            >
                              <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-white/30 backdrop-blur-md skew-y-[8deg] shadow-[0_10px_20px_rgba(0,0,0,0.1)] border border-white/50" />
                              <div
                                className={`relative vertical-text text-xl md:text-2xl font-black text-slate-800 tracking-[0.15em] px-2 py-8 md:py-10 ${
                                  cleanFont?.className || ''
                                }`}
                              >
                                {phrase}
                              </div>
                            </motion.div>
                          )
                        )}
                      </div>

                      <div className="absolute bottom-0 w-full flex justify-center pointer-events-none z-10">
                        <div
                          key={`wrapper-${admin.id}`}
                          className="w-[120%] lg:w-[150%] max-w-none flex justify-center origin-bottom"
                          style={{
                            transform: `translateX(${
                              admin.offsetX || 0
                            }px) translateY(${admin.offsetY || 0}px) scale(${
                              admin.scale || 1.0
                            })`,
                          }}
                        >
                          <motion.img
                            key={`img-${admin.id}`}
                            initial={{
                              opacity: 0,
                              filter: 'blur(10px)',
                              scale: 0.95,
                            }}
                            animate={{
                              opacity: 1,
                              filter: 'blur(0px)',
                              scale: 1,
                            }}
                            transition={{
                              duration: 1.2,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            src={admin.image}
                            alt={admin.name}
                            className="w-full h-auto object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 🌟 背景レイヤー：Six Capsアウトライン＆グリッドライン */}
                    <div
                      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
                      style={{
                        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 1px, transparent 1px)`,
                        backgroundSize: '45px 45px',
                        transform: 'skewY(-6deg) rotate(-6deg)',
                        scale: 1.2,
                      }}
                    >
                      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                        <div
                          className="absolute left-0 right-0 h-[1.5px] opacity-40 animate-pulse transition-colors duration-1000"
                          style={{
                            top: '16%',
                            background: `linear-gradient(to right, ${admin.themeColor} 70%, transparent)`,
                          }}
                        />
                        <div
                          className="absolute top-0 bottom-0 w-[1.5px] opacity-30 transition-colors duration-1000"
                          style={{
                            right: '22%',
                            background: `linear-gradient(to bottom, ${admin.themeColor}, transparent 90%)`,
                          }}
                        />
                        <div
                          className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-mono text-[10px] font-bold opacity-60 transition-colors duration-1000"
                          style={{
                            top: '16%',
                            right: '22%',
                            color: admin.themeColor,
                          }}
                        >
                          +
                        </div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        className={`absolute right-2 md:right-8 top-0 bottom-0 flex justify-center items-center [writing-mode:vertical-rl] text-[12rem] md:text-[16rem] leading-none tracking-widest select-none ${
                          sixCaps?.className || ''
                        }`}
                        style={{
                          color: 'transparent',
                          WebkitTextStroke: '2px rgba(0, 0, 0, 0.06)',
                        }}
                      >
                        {admin.romanName}
                      </motion.div>

                      <div className="absolute left-[15%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-slate-400/20 to-transparent" />
                      <div className="absolute right-[20%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-slate-400/20 to-transparent" />
                      <div className="absolute top-[40%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-400/20 to-transparent" />
                      <div className="absolute top-[10%] right-[20%] translate-x-1/2 text-slate-400/40 text-xl font-light">
                        +
                      </div>
                      <div className="absolute bottom-[20%] left-[15%] -translate-x-1/2 text-slate-400/40 text-xl font-light">
                        +
                      </div>
                    </div>

                    {/* 🎨 右カラム：スクロールできるプロフィールエリア */}
                    <div className="w-full lg:w-[55%] h-full relative z-20 px-6 py-12 lg:px-16 lg:py-32 mt-4 lg:mt-0 pb-32">
                      <motion.div
                        key={`header-${admin.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-10 pt-4 lg:pt-0"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className="w-2 h-2 rounded-full animate-pulse transition-colors duration-1000"
                            style={{ backgroundColor: admin.themeColor }}
                          />
                          <span
                            className="font-bold text-xs tracking-[0.3em] uppercase transition-colors duration-1000"
                            style={{ color: admin.themeColor }}
                          >
                            {admin.role}
                          </span>
                        </div>
                        <h2
                          className={`text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-2 ${
                            cleanFont?.className || ''
                          }`}
                        >
                          {admin.name}
                        </h2>
                        <p className="text-slate-400 font-bold tracking-[0.4em] uppercase">
                          {admin.romanName}
                        </p>
                      </motion.div>

                      <motion.div
                        key={`profile-card-${admin.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative z-20 mb-10 mt-4 w-full max-w-2xl"
                      >
                        <div className="relative p-4 md:p-6 rounded-none bg-white/80 backdrop-blur-2xl border border-slate-900/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden">
                          <div
                            className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 transition-colors duration-1000"
                            style={{ borderColor: admin.themeColor }}
                          />
                          <div
                            className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 transition-colors duration-1000"
                            style={{ borderColor: admin.themeColor }}
                          />
                          <div
                            className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 transition-colors duration-1000"
                            style={{ borderColor: admin.themeColor }}
                          />
                          <div
                            className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 transition-colors duration-1000"
                            style={{ borderColor: admin.themeColor }}
                          />
                          <div className="absolute inset-1 rounded-none border border-slate-900/[0.01] pointer-events-none" />
                          <div
                            className="absolute inset-0 opacity-[0.01] pointer-events-none transition-colors duration-1000"
                            style={{
                              background: `linear-gradient(135deg, transparent, ${admin.themeColor})`,
                            }}
                          />

                          <div className="flex items-center justify-between mb-3.5 border-b border-slate-900/10 pb-2">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-1.5 h-3 rounded-none transition-colors duration-1000"
                                style={{ backgroundColor: admin.themeColor }}
                              />
                              <h3 className="text-lg md:text-xl font-black tracking-[0.15em] uppercase text-slate-800">
                                Profile
                              </h3>
                            </div>
                            <div className="text-[9px] font-mono tracking-widest text-slate-400 uppercase hidden sm:block">
                              SYS_REF // {admin.id}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 relative z-10 mb-4">
                            {admin.profileGrid.map((info: any, idx: number) => (
                              <div
                                key={idx}
                                className="flex flex-col border-l-2 pl-2.5 pb-0.5 group transition-colors duration-1000"
                                style={{
                                  borderLeftColor: `${admin.themeColor}33`,
                                }}
                              >
                                <div
                                  className={`text-[9px] md:text-[11px] font-bold tracking-wide text-slate-400 uppercase leading-none mb-0.5 ${
                                    cleanFont?.className || ''
                                  }`}
                                >
                                  {info.label}
                                </div>
                                <div
                                  className={`text-xs md:text-sm font-black text-slate-800 break-words leading-tight ${
                                    cleanFont?.className || ''
                                  }`}
                                >
                                  {info.value}
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="relative z-10 pt-3 border-t border-slate-900/10">
                            <div className="flex items-center gap-2 mb-1.5 opacity-60">
                              <span className="text-[8px] font-mono tracking-widest uppercase text-slate-400">
                                // DESCRIPTION_LOG
                              </span>
                            </div>
                            <p className="text-slate-600 leading-relaxed font-bold text-xs md:text-sm whitespace-pre-wrap pl-1">
                              {admin.profileText}
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      {/* ピックアップ動画 */}
                      {admin.youtubeId && (
                        <motion.div
                          key={`video-${admin.id}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                          className="mb-12"
                        >
                          <h3
                            className={`text-xl font-black text-slate-900 mb-6 flex items-center gap-2 ${
                              cleanFont?.className || ''
                            }`}
                          >
                            <div
                              className="w-5 h-5 flex items-center justify-center transition-colors duration-1000"
                              style={{ color: admin.themeColor }}
                            >
                              <svg
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className="w-full h-full"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                            PICKUP VIDEO
                          </h3>
                          <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-xl bg-slate-900 border border-slate-200">
                            <iframe
                              src={`https://www.youtube.com/embed/${admin.youtubeId}`}
                              className="w-full h-full border-0"
                              allowFullScreen
                            />
                          </div>
                        </motion.div>
                      )}

                      {/* SNSリンク群 */}
                      <motion.div
                        key={`links-${admin.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-wrap gap-4"
                      >
                        {Object.entries(admin.links).map(([platform, url]) => (
                          <a
                            key={platform}
                            href={url as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 text-white rounded-full text-xs font-bold tracking-widest uppercase hover:-translate-y-1 transition-all shadow-md flex items-center gap-2 duration-1000"
                            style={{ backgroundColor: admin.themeColor }}
                          >
                            {platform === 'x' ? 'X (Twitter)' : platform}
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </a>
                        ))}
                      </motion.div>
                    </div>

                    {/* ========================================================== */}
                    {/* 🌟 新・キャラセレクトUI（Mac Dock風 ボトム配置 ＋ 白基調ポップアップ） */}
                    {/* ========================================================== */}
                    {/* 見切れ対策：bottom-4 から bottom-6(PCはbottom-8)に少し上げ、z-indexを強化 */}
                    <div className="absolute bottom-6 md:bottom-8 left-0 right-0 z-[100] w-full flex justify-center px-4 pointer-events-none">
                      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
                      <div
                        className="flex items-end gap-2 md:gap-3 overflow-x-auto no-scrollbar px-6 py-3 bg-white/60 hover:bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-full border border-white/80 shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-colors duration-300 pointer-events-auto max-w-[95vw]"
                        style={{
                          scrollbarWidth: 'none',
                          msOverflowStyle: 'none',
                        }}
                      >
                        {adminList.map((creator: any, idx: number) => {
                          const isSelected = selectedCreatorIndex === idx;
                          return (
                            <button
                              key={creator.id}
                              onClick={() => setSelectedCreatorIndex(idx)}
                              className="relative group flex flex-col items-center justify-end origin-bottom shrink-0 transition-all duration-300 hover:z-20"
                            >
                              {/* 🌟 新生：白基調のクールなツールチップ */}
                              <div
                                className={`absolute bottom-full mb-4 flex flex-col items-center transition-all duration-300 pointer-events-none origin-bottom
                    ${
                      isSelected
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100'
                    }`}
                              >
                                <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl flex flex-col items-center shadow-[0_15px_35px_rgba(0,0,0,0.1)] border border-slate-900/5 whitespace-nowrap">
                                  <span
                                    className="text-[9px] font-bold tracking-[0.2em] uppercase mb-0.5"
                                    style={{ color: creator.themeColor }}
                                  >
                                    {creator.role}
                                  </span>
                                  <span className="text-xs md:text-sm font-black text-slate-800 tracking-wider">
                                    {creator.name}
                                  </span>
                                </div>
                                {/* 白い三角 */}
                                <div className="w-3 h-3 bg-white/95 border-b border-r border-slate-900/5 rotate-45 -mt-1.5 shadow-[5px_5px_15px_rgba(0,0,0,0.05)]" />
                              </div>

                              {/* 🌟 アイコン本体（Dock風に拡大） */}
                              <div
                                className={`relative rounded-full overflow-hidden transition-all duration-300 origin-bottom flex items-center justify-center
                      ${
                        isSelected
                          ? 'w-12 h-12 md:w-14 md:h-14 shadow-[0_0_20px_rgba(0,0,0,0.15)]'
                          : 'w-10 h-10 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 group-hover:w-12 group-hover:h-12'
                      }
                    `}
                                style={{
                                  border: isSelected
                                    ? `2.5px solid ${creator.themeColor}`
                                    : '2px solid transparent',
                                  boxShadow: isSelected
                                    ? `0 0 20px ${creator.themeColor}40`
                                    : 'none',
                                }}
                              >
                                <img
                                  src={creator.image}
                                  alt={creator.name}
                                  className="w-full h-full object-cover object-top"
                                />
                              </div>

                              {/* アクティブインジケーター（下部の小さな点） */}
                              <div
                                className={`w-1 h-1 rounded-full mt-1.5 transition-all duration-300 ${
                                  isSelected ? 'opacity-100' : 'opacity-0'
                                }`}
                                style={{ backgroundColor: creator.themeColor }}
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    {/* ========================================================== */}
                  </section>
                );
              })()}

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
                    {dynamicGallery.map((item) => (
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
                          <div
                            className={`absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-bold text-slate-700 tracking-widest uppercase shadow-sm ${montserrat.className}`}
                          >
                            {item.category}
                          </div>
                        </div>
                        <div className="p-8">
                          <span
                            className={`text-xs text-slate-400 font-bold mb-3 block tracking-wider ${montserrat.className}`}
                          >
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
                            <div
                              className={`mt-6 flex items-center gap-1 text-[10px] font-bold text-blue-600 tracking-widest uppercase ${montserrat.className}`}
                            >
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

            {/* 🌟 MOVEMENTアップデート版：サーバーナビゲーション動画ページ (クリーン＆キュート仕様) */}
            {/* 🌟 MOVEMENTアップデート版：サーバーナビゲーション動画ページ */}
            {activePage === 'navigation' && (
              <NavigationVideoPanel sixCaps={sixCaps} cleanFont={cleanFont} />
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
                className={`text-xs md:text-sm font-bold tracking-widest transition-colors uppercase hover:-translate-y-0.5 ${
                  montserrat.className
                } ${
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
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'radial-gradient(#00AEEF 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
            <div className="text-center md:text-left relative z-10">
              <h3
                className={`text-xl md:text-2xl font-black text-white mb-2 tracking-tight uppercase ${cleanFont.className}`}
              >
                Contact Us
              </h3>
              <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                サーバーへの参加希望やコラボのご相談など、お気軽にお問い合わせください。
              </p>
            </div>
            <button
              onClick={() => setModalMode('contact')} // 🌟 これを追加！
              className={`relative z-10 shrink-0 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full shadow-lg transition-all flex items-center gap-2 tracking-widest text-xs hover:-translate-y-1 ${montserrat.className}`}
            >
              <Mail size={16} /> Contact
            </button>
          </div>

          {/* 中段：サーバー名のロゴ部分 */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
            <h2
              className={`text-xl md:text-2xl font-black tracking-tight text-white uppercase leading-tight text-center md:text-left ${montserrat.className}`}
            >
              The Streamer{' '}
              <span className="text-slate-700 hidden md:inline">/</span>
              <br className="md:hidden" /> Creator Server
            </h2>
            <div className="flex flex-wrap justify-center md:justify-end gap-2 md:gap-3">
              {/* 🌟 1. 文字列から「名前とURLのセット（オブジェクト）」に変更！ */}
              {[
                {
                  name: 'X (Twitter)',
                  url: 'https://x.com/hiroking_0306?lang=ja',
                },
                {
                  name: 'Twitch',
                  url: 'https://www.twitch.tv/theseventhone666',
                },
              ].map((sns, idx) => (
                <a
                  key={idx}
                  href={sns.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block px-5 py-2 bg-slate-800 border border-slate-700 hover:bg-blue-600 hover:border-blue-600 hover:text-white rounded-full transition-all duration-300 text-xs font-bold tracking-wider text-slate-400 hover:-translate-y-1 shadow-sm ${montserrat.className}`}
                >
                  {sns.name}
                </a>
              ))}
            </div>
          </div>
          {/* 最下部：コピーライト */}
          <div className="border-t border-slate-800 pt-8 text-center flex flex-col md:flex-row justify-between items-center gap-4">
            <p
              className={`text-[10px] font-bold tracking-widest text-slate-500 uppercase ${montserrat.className}`}
            >
              © 2026 THE STREAMER CREATOR SERVER.
            </p>
            <div
              className={`flex gap-6 text-[10px] font-bold tracking-widest text-slate-500 uppercase ${montserrat.className}`}
            >
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
      {modalMode !== '' && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full relative shadow-2xl animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setModalMode('')} // 🌟 空にすると閉じる
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-3xl font-bold"
            >
              ×
            </button>

            <img
              src="/tsc-official/hirokinngutatie.jpg"
              alt="ヒロキング"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 mx-auto mb-4"
            />

            {/* 🌟 ここで文面を切り替えています！ */}
            <h3 className="text-xl font-bold text-black text-center mb-2">
              {modalMode === 'join'
                ? '参加申請はこちらから！'
                : 'お問い合わせはこちらから！'}
            </h3>

            <p className="text-sm text-gray-600 text-center mb-6">
              {modalMode === 'join'
                ? '現在、コミュニティへの参加はヒロキングのDMにて承っております。お気軽にご連絡ください！'
                : 'サイトやコミュニティに関するお問い合わせは、ヒロキングのDMにて一括でお受けしております。'}
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

const NavigationVideoPanel = ({ sixCaps, cleanFont }: any) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const charaConfig = {
    width: 130,
    height: 130,
    right: -20,
    top: -50,
    floatDistance: 10,
    floatSpeed: 4,
  };

  const snapTransition: any = { type: 'spring', damping: 25, stiffness: 120 };
  const maskTransition: any = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

  return (
    <section className="relative w-full min-h-screen bg-[#F0F2F5] text-slate-800 overflow-hidden flex flex-col justify-center items-center">
      {/* 背景パネル */}
      <motion.div
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 w-full h-[55%] bg-white rounded-b-[40px] shadow-[0_10px_30px_rgba(0,0,0,0.02)] z-0"
      />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 right-0 w-[80%] h-[40%] bg-slate-100 rounded-tl-[60px] z-0"
      />

      {/* 🌟 新演出：左端の縦文字装飾 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-4 text-slate-300/80 font-mono text-[9px] tracking-[0.4em] uppercase select-none z-0"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      >
        <span className="w-[1px] h-12 bg-slate-300/50" />
        TSC_Guidance_System
        <span className="w-[1px] h-12 bg-slate-300/50" />
      </motion.div>

      {/* 🌟 新演出：右端の縦文字装飾 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-4 text-slate-300/80 font-mono text-[9px] tracking-[0.4em] uppercase select-none z-0"
        style={{ writingMode: 'vertical-rl' }}
      >
        <span className="w-[1px] h-12 bg-slate-300/50" />
        Server_Navigation_Protocol
        <span className="w-[1px] h-12 bg-slate-300/50" />
      </motion.div>

      {/* 🌟 レイアウト調整：max-w-6xlから1000pxに縮め、justify-centerで中央へ寄せました */}
      <div className="w-full max-w-[1000px] mx-auto px-12 md:px-16 py-20 relative z-10 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-12">
        {/* 左側：タイトルエリア（幅を40%にして重なりを防止） */}
        <div className="w-full lg:w-[40%] flex flex-col items-center lg:items-start text-center lg:text-left shrink-0">
          <div className="relative inline-block py-6 px-4 -ml-4 lg:ml-0">
            {/* 装飾線 */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-slate-400 to-transparent origin-left"
            />
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="absolute top-0 left-0 w-[1px] h-4 bg-slate-400 origin-top"
            />
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute bottom-0 right-0 w-4/5 h-[1px] bg-gradient-to-l from-slate-300 to-transparent origin-right"
            />
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="absolute bottom-0 right-0 w-[1px] h-4 bg-slate-300 origin-bottom"
            />

            <div className="overflow-hidden mb-1">
              <motion.h2
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ ...maskTransition, delay: 0.3 }}
                className={`text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none text-slate-800 ${
                  cleanFont?.className || ''
                }`}
              >
                Server
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ ...maskTransition, delay: 0.4 }}
                className={`text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-200 pb-2 ${
                  cleanFont?.className || ''
                }`}
              >
                Navigation
              </motion.div>
            </div>
          </div>

          <div className="overflow-hidden mt-4">
            <motion.p
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ ...maskTransition, delay: 0.5 }}
              className="text-sm text-slate-500 font-medium tracking-wide"
            >
              当サーバーの歩き方を映像で確認できます。
            </motion.p>
          </div>
        </div>

        {/* 右側：メインプレイヤーエリア（幅を60%にして存在感を確保） */}
        <div className="w-full lg:w-[60%] relative shrink-0">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ...snapTransition, delay: 0.5 }}
            className="relative w-full p-2 md:p-3 bg-white/80 backdrop-blur-xl rounded-[24px] md:rounded-[32px] shadow-[0_30px_60px_-15px_rgba(15,23,42,0.08),0_0_0_1px_rgba(255,255,255,1)_inset]"
          >
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ...snapTransition, delay: 0.7 }}
              className="relative w-full aspect-video bg-slate-900 rounded-[16px] md:rounded-[24px] overflow-hidden group cursor-pointer"
              onClick={() => setIsPlaying(true)}
            >
              {/* サムネイル画像 */}
              <div className="absolute inset-0 bg-[url('/path/to/thumbnail.jpg')] bg-cover bg-center opacity-60 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-slate-900/30 transition-colors duration-300 group-hover:bg-slate-900/10" />

              {/* PLAYボタンとフレンドリーなテキスト */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                <div className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-3 md:mb-4">
                  <div
                    className="absolute inset-0 bg-white/30 rounded-full animate-ping"
                    style={{ animationDuration: '3s' }}
                  />
                  <div className="relative z-10 flex items-center justify-center w-full h-full bg-white/95 backdrop-blur-sm rounded-full shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-transform duration-300 group-hover:scale-110">
                    <svg
                      className="w-6 h-6 md:w-8 md:h-8 text-slate-800 ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                <div className="text-xs md:text-sm font-bold text-white tracking-widest opacity-80 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 drop-shadow-md">
                  WATCH VIDEO
                </div>
              </div>
            </motion.div>

            {/* 説明文 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-3 md:mt-4 px-2 border-t border-slate-100/50 pt-3 md:pt-4"
            >
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                有志のクリエイターによって制作された、当サーバーの歩き方・各チャンネルの機能解説動画です。
              </p>
            </motion.div>

            {/* ミニキャラ */}
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.8 }}
              animate={{
                y: [50, 0, -charaConfig.floatDistance, 0],
                opacity: 1,
                scale: 1,
              }}
              transition={{
                y: {
                  times: [0, 0.3, 0.65, 1],
                  duration: charaConfig.floatSpeed,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'mirror',
                  delay: 1.2,
                },
                opacity: { duration: 0.4, delay: 1.2 },
                scale: { type: 'spring', delay: 1.2 },
              }}
              className="absolute z-[-1] pointer-events-none drop-shadow-xl hidden sm:block"
              style={{
                width: charaConfig.width,
                height: charaConfig.height,
                right: charaConfig.right,
                top: charaConfig.top,
              }}
            >
              <img
                src="/path/to/your-mini-character.png"
                alt="Mini Character"
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* くるっと飛び出す全画面プレイヤー */}
      <AnimatePresence>
        {isPlaying && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
              onClick={() => setIsPlaying(false)}
            />
            <motion.div
              initial={{ rotateY: -90, scale: 0.7, opacity: 0 }}
              animate={{ rotateY: 0, scale: 1, opacity: 1 }}
              exit={{ rotateY: 90, scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 100 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-xl md:rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden z-10 border border-slate-800"
              style={{ perspective: 1000 }}
            >
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <iframe
                src="https://www.youtube.com/embed/Pj1G8lVq8y0?autoplay=1"
                title="TSC Official Server Navigation"
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

{
  /* 🌟 activitylog */
}
export const ActivityLogGrid = ({
  memoryItems,
  montserrat,
  cleanFont,
}: any) => {
  const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };
  
  const getGridSpan = (index: number) => {
    const pattern = [
      'col-span-2 row-span-2', // 大
      'col-span-1 row-span-1', // 小
      'col-span-1 row-span-2', // 縦長
      'col-span-1 row-span-1', // 小
      'col-span-2 row-span-1', // 横長
      'col-span-1 row-span-1', // 小
      'col-span-1 row-span-1', // 小
      'col-span-2 row-span-2', // 大
    ];
    return pattern[index % pattern.length];
  };

  const handleTileClick = (item: any) => {
    console.log('クリックされました:', item);
    // if (item.link) window.open(item.link, '_blank');
  };

  return (
    <section className="py-24 bg-[#FAFAFA] relative overflow-hidden z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
      <div className="max-w-[85rem] mx-auto relative z-10 px-4 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInVariant}
          className="mb-16 text-center relative z-50"
        >
          <p
            className={`text-blue-500 font-bold text-[11px] tracking-[0.4em] uppercase mb-4 ${
              montserrat?.className || ''
            }`}
          >
            Activity Log
          </p>
          <h2
            className={`text-3xl md:text-4xl font-black tracking-tight uppercase ${
              cleanFont?.className || ''
            }`}
          >
            TSC Activity Log
          </h2>
          <div className="w-12 h-1 bg-blue-500 mx-auto mt-6" />
        </motion.div>

        {/* 
          【ここが変更点！】
          - PCサイズ(lg)の列数を 5列 → 6列 に増やして横幅を圧縮
          - タブレット(md)の列数を 4列 → 5列 に増やして横幅を圧縮
          - 基準の高さを PC: 180px → 140px、スマホ: 120px → 90px にして縦幅を圧縮
        */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 grid-flow-dense gap-1 md:gap-2 auto-rows-[90px] md:auto-rows-[140px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {memoryItems.map((item: any, idx: number) => (
            <motion.div
              key={item.id || idx}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                zIndex: 50,
                boxShadow:
                  '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={`relative overflow-hidden bg-slate-900 cursor-pointer group rounded-lg md:rounded-xl ${getGridSpan(
                idx
              )}`}
              onClick={() => handleTileClick(item)}
            >
              <div className="absolute inset-0 z-20 bg-black/10 transition-colors duration-300 group-hover:bg-transparent" />

              {item.type === 'image' ? (
                <img
                  src={item.src}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                  alt={item.title || '思い出'}
                />
              ) : (
                <div className="w-full h-full relative pointer-events-none">
                  {item.platform === 'twitch' ? (
                    <iframe
                      src={`https://player.twitch.tv/?video=${item.videoId}&parent=localhost&parent=streamerhubjp-lab.github.io&autoplay=false`}
                      frameBorder="0"
                      allowFullScreen
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    ></iframe>
                  ) : (
                    <iframe
                      src={`https://www.youtube.com/embed/${
                        item.youtubeId || item.videoId
                      }?controls=0`}
                      frameBorder="0"
                      allowFullScreen
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    ></iframe>
                  )}
                </div>
              )}

              {/* タイトルの文字サイズも箱に合わせて少し小さめに調整 */}
              {item.title && (
                <div className="absolute bottom-0 inset-x-0 p-2 md:p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-30 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3
                    className={`text-xs md:text-sm font-bold text-white tracking-wide line-clamp-2 ${
                      cleanFont?.className || ''
                    }`}
                  >
                    {item.title}
                  </h3>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
