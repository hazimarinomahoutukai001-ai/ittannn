// app/data.ts

// 🌟 ここでサイトのロゴを設定します！
export const siteConfig = {
  logo: '/GoznTJVa4AAoq0S.jpg', 
  title: 'The Streamer Creator Server',
};

export const menuItems = [
  { label: 'HOME', id: 'home' },
  { label: 'お知らせ', id: 'news' },
  { label: 'PROFILE（プロフィール）', id: 'profile' },
  { label: 'ACTIVITY', id: 'activity' },
  { id: 'guidelines', label: 'GUIDELINES' },
  { label: 'FAQ', id: 'faq' },
];

export const newsItems = [
  {
    id: 1,
    date: '2026.04.16',
    category: 'IMPORTANT',
    title: 'TSC公式サイトを正式リリースしました！',
    content:
      'コミュニティの皆様、大変お待たせいたしました。ついに我々の新しい拠点となる公式サイトがオープンしました。今後のイベント情報や配信スケジュールはこちらでチェックしてください。',
  },
  {
    id: 2,
    date: '2026.04.10',
    category: 'EVENT',
    title: '週末のカスタムサーバー大会について',
    content:
      '今週末の土曜日21:00より、恒例のカスタムマッチを開催します。参加希望の方はDiscordの専用チャンネルにてエントリーをお願いします！',
  },
  {
    id: 3,
    date: '2026.04.01',
    category: 'INFO',
    title: '新メンバー「LUNA」加入のお知らせ',
    content:
      '癒やし担当のLUNAさんが新たにコミュニティへ加入しました！プロフィール画面から詳細をチェックしてみてください。',
  },
];

export const memoryItems = [
  {
    id: 1,
    type: 'image',
    src: '/3599568-2.output.png',
    title: 'てすとてすと',
  },
  {
    id: 2,
    type: 'video',
    youtubeId: '8mtmIz1aiu0',
    title: 'TSC鯖ハイライトクリップ',
  },
  {
    id: 3,
    type: 'image',
    src: 'https://via.placeholder.com/600x800/f0f9ff/3b82f6?text=Memories+2',
    title: '共同制作プロジェクトの裏側',
  },
  {
    id: 4,
    type: 'image',
    src: 'https://via.placeholder.com/800x450/e0f2fe/00aeff?text=Memories+3',
    title: '突発的なゲーム大会',
  },
  {
    id: 5,
    type: 'image',
    src: 'https://via.placeholder.com/800x600/e0f2fe/00aeff?text=Memories+4',
    title: '新メンバー歓迎会',
  },
  {
    id: 6,
    type: 'image',
    src: 'https://via.placeholder.com/600x800/f0f9ff/3b82f6?text=Memories+5',
    title: 'オフ会のお知らせ？',
  },
];

export const staffList = [
  // 🌟 集合写真データ
  { 
    id: 'collective', 
    name: 'COLLECTIVE', 
    role: '集合写真', 
    image: '/Snapshot_849.PNG', // 🔧 集合写真
    customScale: 'w-[90%] md:w-[70%]', 
    customPosition: 'translate-x-0 translate-y-0',
  },
  // 🌟 メンバーデータ
  {
    id: 'admin',
    role: 'ADMIN',
    name: 'ヒロキング',
    image: 'https://via.placeholder.com/600x800/e0f2fe/00aeff?text=WOLF',
    customScale: 'scale-[1.2] md:scale-[1.5]',
    customPosition: 'translate-x-0 translate-y-0',
    profile:
      'サーバー創設者。誰でも歓迎の精神で、新しい居場所作りを追求中。配信ではFPSを中心に、皆が楽しめる空気作りを大切にしています。またより一層コミュニティの充実に力を入れています。',
    schedule: '月水金 21:00〜',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    id: 'sub',
    role: 'CO-ADMIN',
    name: '狼の野郎',
    image: '/3599568-3.png',
    customScale: 'scale-[1.8] md:scale-[2.0]',
    customPosition: 'translate-x-[-200px] translate-y-[70px]',
    profile:
      'サブマネージャー兼盛り上げ役。IT技術とゲームをこよなく愛する。裏方としてサーバーの治安維持と、イベントの企画・運営を担当。皆が安心して過ごせる環境を技術面からサポートしています。',
    schedule: '火木土 22:00〜',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    id: 'mem1',
    role: 'MEMBER',
    name: 'こゆき',
    image: 'IMG_4294.png',
    customScale: 'scale-[0.4] md:scale-[1.1]',
    customPosition: 'translate-x-[-140px] translate-y-[130px]',
    profile: 'エースアタッカー。圧倒的なエイムでチームを牽引します。',
    schedule: '毎日 20:00〜',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    id: 'mem2',
    role: 'MEMBER',
    name: 'LUNA',
    image: 'https://via.placeholder.com/600x800/f0f9ff/3b82f6?text=LUNA',
    customScale: 'scale-[1.2] md:scale-[1.5]',
    customPosition: 'translate-x-0 translate-y-0',
    profile: '癒やし担当。雑談配信や協力ゲームで平和な時間を提供します。',
    schedule: '不定期',
    youtubeId: 'dQw4w9WgXcQ',
  },
];

export const galleryItems = [
  {
    id: 1,
    category: 'EVENT',
    title: '第一回 サーバー交流戦',
    date: '2026.04.10',
    description:
      '総勢20名が参加した記念すべき初イベント。最後はまさかの拳対決で幕を閉じました。',
    image: 'https://via.placeholder.com/800x450/e0f2fe/00aeff?text=Event+Photo',
  },
  {
    id: 2,
    category: 'INFO',
    title: '公式サイト 始動',
    date: '2026.04.15',
    description: 'コミュニティのポータルサイトが完成。より繋がりやすい環境へ。',
    image: 'https://via.placeholder.com/800x450/f0f9ff/3b82f6?text=Web+Project',
  },
];

export const faqList = [
  {
    q: '初心者でも参加できますか？',
    a: 'もちろんです！ランクや経験は問いません。',
  },
  {
    q: '配信への参加ルールはありますか？',
    a: '各配信者の概要欄をご確認ください。基本は楽しく！',
  },
  {
    q: 'サーバーへの招待はどこから？',
    a: '公式Twitterや配信時のリンクから参加いただけます。',
  },
];

export const guidelineList = [
  {
    category: '基本マナー',
    items: [
      '相手をリスペクトし、攻撃的な発言や誹謗中傷は禁止です。',
      '過度な自分語りや、他者の活動を妨げる行為は控えましょう。',
      '不快感を与えるようなニックネームやアイコンの使用は禁止です。',
    ],
  },
  {
    category: '配信・クリエイティブ',
    items: [
      'コラボ配信の際は、参加者全員の同意を得てから行いましょう。',
      '著作権を侵害する素材の無断使用は禁止です。',
      'サーバー内での宣伝活動は、専用のチャンネルで行ってください。',
    ],
  },
  {
    category: '禁止事項',
    items: [
      '外部ツールを使用したチート行為やグリッチの利用。',
      '個人情報の特定・晒し行為（SNS含む）。',
      '政治・宗教・過度な勧誘活動。',
    ],
  },
];