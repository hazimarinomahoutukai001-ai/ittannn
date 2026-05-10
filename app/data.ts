export const siteConfig = {
  name: "TSC Official",
  description: "The Streamer Creator Server",
  
  // 👇 右側に表示されるロゴの画像パス
  logo: '/GoznTJVa4AAoq0S.jpg',  
  
  // 👇 中央に表示される11人の集合写真の画像パス
  heroImages: [
    '/Snapshot_868.PNG', 
  ],
};

export const menuItems = [
  { id: 'home', label: 'HOME' },
  { id: 'news', label: 'NEWS' },
  { id: 'profile', label: 'PROFILE' },
  { id: 'activity', label: 'ACTIVITY' },
  { id: 'guidelines', label: 'GUIDELINES' },
  { id: 'sponsors', label: 'SPONSORS' },
  { id: 'magazine', label: 'MAGAZINE' },
  { id: 'faq', label: 'FAQ' },
];

export const newsItems = [
  {
    id: 1,
    date: '2026.04.15',
    category: 'IMPORTANT',
    title: 'TSC鯖専用サイト開設',
    content:
      'TSC公式ポータルサイトがついにオープンしました！サーバーのガイドラインや活動記録、運営メンバーのプロフィールなど、TSCに関するあらゆる情報を集約しています。メンバーの皆様にとって使いやすく、外部の方には私たちの魅力をより伝えられる場所を目指していきます。ぜひチェックしてみてください！',
    articleId: 'news-001',
  },
];

export const memoryItems = [
  {
    id: 'm1',
    type: 'image',
    src: '/Snapshot_841.PNG',
    title: 'TSC公式サイトオープン',
  },
  {
    id: 'm2',
    type: 'image',
    src: '/HHXii0FbcAAbaDj.jpg',
    title: '管理者ヒロキングtwitchパートナーへ',
  },
  {
    id: 'm3', // または m4 など
    type: 'video',
    platform: 'twitch', // 👈 ここを twitch にする！
    videoId: '2553796570', // 👈 Twitchの動画IDを入れる！
    title: 'TSC３０００人記念杯', // 👈 動画のタイトルを入れる！
  },
];

export const staffList = [
  {
    id: 'collective',
    name: 'TSC STAFF COLLECTIVE',
    role: '運営チーム',
    image: '/ittannn/collective.png',
  },
  {
    id: 'admin_hiro',
    name: 'ヒロキング',
    role: '管理者',
    image: '/IMG_0795 (1).webp',
    profile: 'Twitchパートナーとして活動する配信者。ゲーム配信や雑談配信を中心に活動しながら、配信者・VTuber・クリエイター交流コミュニティ「TSC」を運営。コラボ企画やイベント運営を通して、活動者同士が繋がれる場所を作り続けている。',
    links: {
    x: 'https://x.com/hiroking_0306',
    twitch: 'https://www.twitch.tv/theseventhone666'
      },
    offsetX: -200,
    offsetY: 200,
    scale: 1.7,
    // ▼ スマホ用の設定（追加！） ▼
    mobileOffsetX: -200,   // スマホではズラさない（0）
    mobileOffsetY: 290,   // スマホではズラさない（0）
    mobileScale: 1.5,   // スマホでは等倍（1.0）に戻す

},
  {
    id: 'SUB_ADMIN_01',
    name: 'ふゆち',
    role: 'サブ管理人',
    image: '/ba32f0a3566c8740.png',
    profile:
      'TSCの舞台裏を支える技術担当。Discordの複雑な権限設定やロール構築、機能的なチャンネルレイアウトの設計を一手に引き受けるスペシャリスト。メンバーが『使いやすい』と感じるその瞬間のために、裏側で緻密なコードと設定を組み上げる、鯖の心臓部を守るエンジニアです。技術的な相談があれば、ふゆちに聞けば間違いなし。',
    customScale: 'scale-90',
    links: {
    twitch: 'https://www.twitch.tv/fuyuchi_'
      },
    offsetX: -250,
    offsetY: 120,
    scale: 1.00,
        // ▼ スマホ用の設定（追加！） ▼
    mobileOffsetX: -250,   // スマホではズラさない（0）
    mobileOffsetY: 190,   // スマホではズラさない（0）
    mobileScale: 0.9,  
  },
  {
    id: 'sub_admin_2',
    name: 'ひうひむ',
    role: 'サブ管理人',
    image: '/ittannn/あるう様立ち絵.png',
    profile: '本人に考えてもらおうかな？',
    customScale: 'scale-110',
    customPosition: 'translate-y-4',
    offsetX: -50,
    offsetY: 60,
    scale: 1.15,
  },
  {
    id: 'sub_admin_3',
    name: 'がいくま',
    role: 'サブ管理人',
    image: '/gaikuma.png', 
    profile: '本人に考えてもらおうかな？',
    offsetX: -180,
    offsetY: 170,
    scale: 1.2,

            // ▼ スマホ用の設定（追加！） ▼
    mobileOffsetX: -250,   // スマホではズラさない（0）
    mobileOffsetY:400,   // スマホではズラさない（0）
    mobileScale: 1.3,  
  },
  {
    id: 'sub_admin_4',
    name: '狼の野郎',
    role: 'サブ管理人',
    image: '/3599568-3.png',
    profile: 'まぁ俺のは適当で良き',
    offsetX: -250,
    offsetY: 270,
    scale: 2.5,
     // ▼ スマホ用の設定（追加！） ▼
    mobileOffsetX: -280,   // スマホではズラさない（0）
    mobileOffsetY: 370,   // スマホではズラさない（0）
    mobileScale: 2.5,  
  },
  {
    id: 'sub_admin_5',
    name: 'こゆき',
    role: 'サブ管理人',
    image: '/ittannn/あるう様立ち絵.png',
    profile: '本人に考えてもらいます',
  },
  {
    id: 'sub_admin_6',
    name: 'あるぅ',
    role: 'サブ管理人',
    image: '/ittannn/あるう様立ち絵.png',
    profile: '本人に考えてもらいます',
  },
  {
    id: 'sub_admin_7',
    name: 'あるぅ',
    role: 'サブ管理人',
    image: '/ittannn/あるう様立ち絵.png',
    profile: '本人に考えてもらいます',
  },
  {
    id: 'sub_admin_8',
    name: 'つゆりひお',
    role: 'サブ管理人',
    image: '/ittannn/あるう様立ち絵.png',
    profile: '本人に考えてもらいます',
  },
  {
    id: 'sub_admin_9',
    name: 'よるねるか',
    role: 'サブ管理人',
    image: '/ittannn/あるう様立ち絵.png',
    profile: '本人に考えてもらいます',
  },
  {
    id: 'sub_admin_10',
    name: 'ʸᵘᵏⁱʰᵃ/ₖₐᵧₒ',
    role: 'サブ管理人',
    image: '/ittannn/あるう様立ち絵.png',
    profile: '本人に考えてもらいます',
  },
  {
    id: 'sub_admin_11',
    name: '一楓あやの',
    role: 'サブ管理人',
    image: '/ittannn/あるう様立ち絵.png',
    profile: '本人に考えてもらいます',
  },
];

export const galleryItems = [
  {
    id: 1,
    image: '/sss.PNG',
    date: '2026.03.25',
    title: '第3回 TSC3000人記念杯',
    category: 'TOURNAMENT',
    description:
      'サーバー参加者3,000人突破を祝して開催された、TSC初の大規模カスタムマッチ！各チームのリーダーは当サーバーの代表メンバーから選出され、プライドを懸けた名勝負が繰り広げられました。優勝チームや活躍したプレイヤーには、総額〇〇円相当の超豪華景品が贈呈され、コミュニティ全体が大熱狂に包まれた記念すべき一夜となりました。。',
    articleId: 'activity-001',
  },
];


// data.ts

// ==========================================
// ⭐ 運営チーム（ABOUT）データ
// ==========================================
export const collectiveData = {
  image: '/Snapshot_849.PNG', // ※実際の画像パスに直してくださいね
  adminCount: 1,
  subAdminCount: 11,
  totalCount: 12,
  title: '管理者・サブ管理人',
  subtitle: 'Admins & Sub-Admins',
  mainMessage: 'あなたの活動をサポートします。',
  description: [
    "TSCサーバーでは、1名の管理人と11名のサブ管理人、計12名の運営チームが日々サーバーの治安維持と環境アップデートに努めています。",
    "「Discordサーバーに参加するのは初めてで不安…」「もしトラブルがあったらどうしよう…」という方でも心配いりません。皆さんが安心して楽しく活動できるよう、しっかりとサポートする体制を整えています。"
  ]
};


export const faqList = [
  {
    q: '参加に年齢制限はありますか？',
    a: 'Discordの利用規約に基づき、16歳以上であればどなたでも参加可能です！サーバー内で特別な年齢制限ロールなどは設けていませんが、未成年の夜更かしは成長の敵です。夜はしっかり寝て、深夜の雑談に参加するのは18歳になってからの特権にしましょう！',
  },
  {
    q: '配信経験が全くないのですが、参加しても大丈夫ですか？',
    a: 'もちろん大歓迎です！TSCには『これから配信活動を始めてみたい！』という方も多数在籍しています。現在活躍中の配信者さんや、動画編集・イラスト制作などを行うクリエイターさんもたくさんいるので、先輩たちから刺激を受けながら楽しく活動をスタートできる環境が整っています！',
  },
  {
    q: 'サーバー内で他のメンバーにコラボを誘ってもいいですか？',
    a: '大丈夫です！募集チャンネルやVCチャンネルを使って自由に声をかけてください！ただし、執拗な誘いや、断られた後の無理な要求はガイドライン違反となりますのでご注意ください。',
  },
  {
    q: '自分のYouTubeやTwitchの宣伝をしてもいいですか？',
    a: '専用の「宣伝・告知チャンネル」を用意しております。そちらであれば、ご自身の配信開始の通知や、新作動画のアップロード報告を自由に行っていただいて構いません。',
  },
  {
    q: 'トラブルが起きた場合はどうすればいいですか？',
    a: '当事者同士で直接解決しようとせず、速やかにサーバー内の『お問い合わせチケット』を作成するか、運営陣（管理者・サブ管理人）へご報告ください。運営チームが間に入り、中立な立場でしっかりと対応いたします。',
  },
];

export const guidelineList = [
  {
    category: 'コミュニケーション',
    items: [
      '相手のプレイスタイルや価値観を尊重し、否定的な発言は控えましょう。',
      '過度な指示出し（いわゆる指示厨行為）や、求められていないアドバイスは避けましょう。',
      '政治、宗教、極端な思想に関わる話題は、トラブルの元になるため禁止とします。',
    ],
  },
  {
    category: '配信・録画について',
    items: [
      'ボイスチャンネルでの会話を配信・録画に乗せる場合は、必ず事前に同席者の許可を得てください。',
      '初めから配信や録画を予定してボイスチャンネルを利用する場合は、専用の『撮影・配信可能 遊び場』チャンネルをご利用ください。また、他メンバーの途中参加の可否などについては、必ずチャンネルステータスに明記してください。',
    ],
  },
  {
    category: '禁止事項',
    items: [
      '他者への誹謗中傷、暴言、ハラスメント行為。',
      'サーバー内での出会い目的の利用や、過度なDM（ダイレクトメッセージ）の送信。',
      'チートツール、マクロ、その他ゲームの規約に違反するツールの使用および共有。',
      '運営の指示や警告に従わない行為。',
    ],
  },
];

export const sponsorData = {
  headerTitle: 'Official Sponsors',
  mainTitle: 'Sponsors',
  description:
    'TSCサーバーを応援してくださる企業様をご紹介します。\nメンバー限定の特別価格や、専用のサポートをご提供いただいております。詳細はDiscordサーバー内の専用チャンネルをご確認ください。',
  homeSection: {
    title: '協賛企業様について',
    subtitle: '企業様もこのコミュニティに参加されています',
    text: 'TSCサーバーには、私たちの活動に賛同してくださる企業様も参加しています。クリエイターやストリーマーの皆様に向けて、このサーバー独自の特別価格や限定サポートをご提示いただくことも可能です。',
    features: ['協賛企業との交流', 'サーバー限定価格のご案内'],
  },
  companies: [
    {
      id: 'sp1',
      category: '動画制作サービス',
      name: '㈱NECOWorks  様',
      description:
        '配信の切り抜きや解説動画、Montageなど、ストリーマー・クリエイターの活動を加速させるハイクオリティな動画制作サービスを提供.TSCメンバー専用の特別割引プランをご用意いただいており、あなたの活動のステップアップを強力にバックアップしてくれます。（※メリットの詳細は後日アップデート予定！）',
      benefit: 'サーバー限定割引あり',
    },
    {
      id: 'sp2',
      category: 'COMING SOON',
      name: '新規スポンサー様 参画予定！',
      description:
        '現在、TSCのコミュニティ理念に深く共感してくださった新たな企業様と、スポンサーシップに向けたお話しが進行中です。クリエイターの皆様の活動をさらに後押しする、強力で魅力的なサポートを絶賛準備しております。正式な情報解禁を楽しみにお待ちください！',
      benefit: '近日情報解禁',
    },
  ],
  footer: {
    title: '協賛をご検討の企業様へ',
    text: 'TSCでは、コミュニティを共に盛り上げてくださるスポンサー企業様を随時募集しております。お問い合わせフォームよりお気軽にご連絡ください。',
  },
};

export const floatingMemories: never[] = [];

export const articleItems = [
  {
    id: 'news-001',
    category: 'IMPORTANT',
    date: '2026.04.15',
    title: 'TSC公式ポータルサイトがついにオープンしました！',
    thumbnail: '/Snapshot_841.PNG',
    content: `ストリーマーとクリエイターのための次世代コミュニティ「TSC」の公式ポータルサイトが、ついに本日オープンいたしました！

今までDiscord内だけで完結していた情報を、外部の方やこれから参加を検討している方にも分かりやすくお伝えできるよう、このサイトを立ち上げました。

【このサイトでできること・見れること】
・TSCサーバーの理念や活動内容の確認
・ガイドライン（ルール）の確認
・運営チーム（管理者・サブ管理人）の詳細プロフィール
・過去の大会やイベントの活動ギャラリー
・協賛企業様からのサポート内容のご案内

まだまだコンテンツは拡充中ですが、まずはブックマークに登録していただき、サーバーの最新ニュースをいつでもチェックできるようにしていただければ嬉しいです。

今後のTSCのさらなる発展にご期待ください！
皆様、引き続きよろしくお願いいたします！`,
  },
  {
    id: 'activity-001',
    category: 'TOURNAMENT',
    date: '2026.03.25',
    title: '第1回 TSC3000人記念杯 開催レポート！',
    thumbnail: '/sss.PNG',
    content: `サーバー参加者3,000人突破を記念して開催された、TSC初の大規模カスタムマッチ「第1回 TSC3000人記念杯」の開催レポートをお届けします！\n\n当日は総勢40名のメンバーが参加し、サーバーを代表するリーダーたちが率いるチームで白熱したバトルが繰り広げられました。普段は別々のゲームで遊んでいるメンバー同士が連携を取り、数々の名プレイや珍プレイが生まれ、DiscordのVCは終始笑いと歓声に包まれました。\n\n【大会結果】\n見事優勝を飾ったのは「チーム〇〇」の皆様！\n圧倒的な連携力とエイム力で、見事に他チームを圧倒しました。\n\n【豪華景品について】\n本大会では、協賛企業様からのご支援もあり、総額〇〇円相当の豪華景品が用意されました。\n・優勝チーム：特製デバイスセット\n・MVP賞：ギフトカード〇〇円分\n・珍プレイ賞：お好きなゲーム1本\n\nご参加いただいた皆様、そして大会を盛り上げてくれた視聴者の皆様、本当にありがとうございました！\n今後もTSCでは、誰もが楽しめるイベントを定期的に企画していきますので、次回開催もどうぞお楽しみに！`,
  },
];