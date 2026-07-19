export const siteConfig = {
  name: 'TSC Official',
  description: 'The Streamer Creator Server',

  // 👇 右側に表示されるロゴの画像パス
  logo: '/tsc-official/GoznTJVa4AAoq0S.jpg',

  // 👇 中央に表示される11人の集合写真の画像パス
  heroImages: ['/ittannn/Snapshot_868.webp'],
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
  { id: 'admins', label: 'ADMINS' },
  { id: 'navigation', label: 'NAVIGATOR' },
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
  {
    id: 2,
    date: '2026.05.18',
    category: 'EVENT',
    title: '明日！！5月23、24日！【TSC4000人APEX記念カスタム】開催のお知らせ',
    content:
      'TSCサーバー4000人突破を記念した過去最大規模のAPEXカスタムが、いよいよ5月23日より開幕します！全120名の参加メンバーに加え、豪華視聴者プレゼントや特別動画もご用意。半年間の準備を注ぎ込んだ過去最高の大会をぜひお見逃しなく！',
    articleId: 'news-002',
  },
];

export const memoryItems = [
  {
    id: 'm1',
    type: 'image',
    src: '/ittannn/Snapshot_868 (1).webp',
    title: 'TSC公式サイトオープン',
  },
  {
    id: 'm2',
    type: 'image',
    src: '/ittannn/sss.png',
    title: '管理者ヒロキングtwitchパートナーへ',
  },
  {
    id: 'm3', // または m4 など
    type: 'video',
    platform: 'twitch', // 👈 ここを twitch にする！
    videoId: '2553796570', // 👈 Twitchの動画IDを入れる！
    title: 'TSC3000人記念杯', // 👈 動画のタイトルを入れる！
  },
  {
    id: 'm4', // または m4 など
    type: 'image',
    src: '/ittannn/aruitimaie.webp',
    title: 'いっぱいどうだい？', // 👈 動画のタイトルを入れる！
  },
  
];

// データの型（TypeScriptを使っている場合）
export interface CreatorProfile {
  id: string;
  name: string;
  image: string;
  scopes: string[]; // 活動範囲（例: ['配信者', 'VTuber']）
  platforms: { name: string; url: string }[]; // プラットフォーム
  description: string; // 紹介文
}

// 実際のデータ
export const recommendedCreators: CreatorProfile[] = [
  {
    id: 'wolf_yarou',
    name: '狼の野郎',
    image: '/ittannn/ookami.webp', // ※実際の立ち絵のパスに変更してください
    scopes: ['配信者', 'VTuber', 'モデレーター'],
    platforms: [
      { name: 'Twitch', url: 'https://twitch.tv/...' },
      { name: 'YouTube', url: 'https://youtube.com/...' },
      { name: 'X (Twitter)', url: 'https://x.com/...' },
    ],
    description: 'tFPSゲームを中心に、リスナーとの距離が近い参加型配信をメインに活動中！コミュニティの盛り上げ役として様々な企画にも顔を出しています。',
  },
  // ... 他のメンバーも同様に追加
];


export const galleryItems = [
  {
    id: 1,
    image: '/tsc-official/sss.png',
    date: '2026.03.25',
    title: '第3回 TSC3000人記念杯',
    category: 'TOURNAMENT',
    description:
      '2025年8月30日（土）、配信者やクリエイターが集うDiscordサーバー「The streamer Creator server」の参加者3,000人突破を記念した、特別なAPEXカスタムマッチが開催されました！サーバー設立以来の大きな節目を祝うべく行われた本大会。総勢60名の配信者が参戦し、豪華な演出と驚愕のプレゼント企画で、始終熱気に包まれた当日の様子をレポートをお届けします。',
    articleId: 'activity-001',
  },
];

// data.ts

// ==========================================
// ⭐ 運営チーム（ABOUT）データ
// ==========================================
export const collectiveData = {
  image: '/tsc-official/Snapshot_849.PNG', // ※実際の画像パスに直してくださいね
  adminCount: 1,
  subAdminCount: 11,
  totalCount: 12,
  title: '管理者・サブ管理人',
  subtitle: 'Admins & Sub-Admins',
  mainMessage: 'あなたの活動をサポートします。',
  description: [
    'TSCサーバーでは、1名の管理人と11名のサブ管理人、計12名の運営チームが日々サーバーの治安維持と環境アップデートに努めています。',
    '「Discordサーバーに参加するのは初めてで不安…」「もしトラブルがあったらどうしよう…」という方でも心配いりません。皆さんが安心して楽しく活動できるよう、しっかりとサポートする体制を整えています。',
  ],
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
    q: '配信者じゃなくても入れますか？',
    a: 'もちろんです！現在はクリエイター様、モデレーター様、企業様なども多数参加しており、配信者以外の方も活発に活動しております！',
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
      '当サーバーは「配信外で遊ぶ時間」も大切なコンセプトとしています。皆様が安心して過ごせるよう、以下のご協力をお願いします。配信を行う場合：必ず「配信専用のボイスチャンネル」をご利用ください（通常のVCでの配信はNGです）。',
      '初めから配信や録画を予定してボイスチャンネルを利用する場合は、専用の『録画OK・遊び場出入り自由』チャンネルをご利用ください。また、他メンバーの途中参加の可否などについては、必ずチャンネルステータスに明記してください。',
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
    'TSCサーバーを応援してくださる企業様をご紹介します。\nメンバー限定の特別価格や、専用のサポートをご提供いただいております。\n詳細はDiscordサーバー内の専用チャンネルをご確認ください。',
  homeSection: {
    title: '協賛企業様について',
    subtitle: '企業様もこのコミュニティに参加されています',
    text: 'TSCサーバーには、私たちの活動に賛同してくださる企業様も参加しています。クリエイターやストリーマーの皆様に向けて、このサーバー独自の特別価格や限定サポートをご提示いただくことも可能です。',

    // 🌟 ここを実際の運用に合わせてアップデート！
    features: [
      {
        title: '協賛企業様からの特別案内', // ※「交流」から実情に合わせたタイトルに微調整しました
        description:
          'ご希望の方を専用サーバーへご案内し、企業担当者様から直接サービスの説明や案内を聞くことができる機会を設けています。有益な情報をキャッチして、活動の幅を広げるきっかけとしてご活用ください。',
      },
      {
        title: 'サーバー限定価格のご案内',
        description:
          'TSC参加者様限定の特別割引や専用プランをご案内しています。現在はクリエイター活動を多角的にサポートする企業様と提携しており、今後はさらにジャンルを問わず、皆さんの活動を支えるパートナーをどんどん増やしていく予定です。日々進化していくTSCのサポート体制にぜひご期待ください！',
      },
    ],
  },
  companies: [
    {
      id: 'sp1',
      category: '動画制作サービス',
      name: '㈱NECOWorks  様',
      description:
        '配信の切り抜きや解説動画、Montageなど、ストリーマー・クリエイターの活動を加速させるハイクオリティな動画制作サービスを提供.TSCメンバー専用の特別割引プランをご用意いただいており、あなたの活動のステップアップを強力にバックアップしてくれます。（※メリットの詳細はdiscord内でチェック！）',
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
    date: '2026.05.13',
    title: 'TSC公式ポータルサイトがついにオープンしました！',
    thumbnail: '/tsc-official/Snapshot_841.PNG',
    content: `ストリーマーとクリエイターのための次世代コミュニティ「TSC」の公式ポータルサイトが、ついに本日オープンいたしました！

今までDiscord内だけで完結していた情報を、外部の方やこれから参加を検討している方にも分かりやすくお伝えできるよう、このサイトを立ち上げました。

【このサイトでできること・見れること】
・TSCサーバーの理念や活動内容の確認
・一部ガイドライン（ルール）の確認
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
    thumbnail: '/tsc-official/sss.png',
    content: `2025年8月30日（土）、配信者やクリエイターが集うDiscordサーバー「The streamer Creator server」の参加者3,000人突破を記念した、特別なAPEXカスタムマッチが開催されました！サーバー設立以来の大きな節目を祝うべく行われた本大会。総勢60名の配信者が参戦し、豪華な演出と驚愕のプレゼント企画で、始終熱気に包まれた当日の様子をレポートをお届けします。
【豪華演出で祭典の幕を開け！】
カウントダウンクイズ動画から始まり、記念大会にふさわしい圧倒的なクオリティーの豪華なオープニング映像演出でスタートしました。
大会終わりのエンディング動画も含め、七皇の剣メンバー、りき狐りき子氏による完全オリジナル制作。プロフェッショナルな映像美が、参加者と視聴者の期待を一気に高めました。また、全20チーム60名のメンバー紹介や、本大会を支えてくださったスポンサー様紹介も丁寧に行われ、一人ひとりひとりが主役になれる、まさに「配信者・クリエイターサーバー」らしい愛の詰まった運営が印象的でした。
【コミュニティが一体となった「ライブビューイング」】
当日は配信画面だけでなく、Discordサーバー内のボイスチャットも大盛り上がり！ 多くのメンバーが集まり、リアルタイムで戦況を見守る「ライブビューイング」が実施されました。
ナイスプレイには歓喜の声が上がり、惜しい場面ではため息が漏れる。サーバー内での結束力がより一層深まり、最高の交流の場となりました。
【総額45万円超え！豪華視聴者プレゼントでコメント欄も熱狂】
本大会の目玉の一つが、総額45万円を超えるという桁外れの視聴者プレゼント企画です。
豪華な景品が発表されるたびに、配信のコメント欄は驚きと喜びのメッセージで埋め尽くされました。プレイヤーだけでなく、視聴者も一緒に「お祭り」を楽しめる仕掛けが、大会の活気をさらに押し上げていました。
【激戦を制した優勝チームは…？】
ハイレベルな攻防が繰り広げられた戦場を勝ち抜き、見事栄冠に輝いたのは……
優勝：チーム「シン・太陽神ゴッドサンシャインジャスティスの魂」 （リーダー：神鬼しゅらら 氏）
チームワークと個々のスキルが光る、素晴らしい立ち回りで大会を制しました！
【配信最大同時接続数を更新！大成功のフィナーレ】
今回のカスタムマッチは、大きなトラブルもなく、極めてスムーズに進行しました。
その結果、配信での最大同時接続数も見事に更新。数字としても、コミュニティの熱量としても、過去最大級の成功を収めることができました。
主催の七皇の剣（ヒロキング氏）を中心に、参加者、運営スタッフ、スポンサー、そして視聴者の皆様が一体となって作り上げたこの「3000人記念APEXカスタム」。The streamer Creator serverは、これからも配信者・クリエイターたちが繋がり、輝ける場所として歩み続けます。
参加された皆様、本当にお疲れ様でした！
【イベント概要まとめ】
イベント名： The streamer Creator server 3000人記念APEXカスタム
開催日： 2025年8月30日（土）
参加規模： 20チーム 60名
主催・運営： 七皇の剣
映像制作： 七皇の剣`,
  },
  {
    id: 'news-002',
    category: 'EVENT',
    date: '2026.05.18',
    title: '明日！！【TSC4000人APEX記念カスタム】開催のお知らせ',
    thumbnail: '/tsc-official/TSChonabann1.jpg',
    content: `全チーム参加メンバー累計120名！スポンサー様や運営陣を合わせると総勢170名が関わる、TSC過去最大規模のイベント【TSC4000人APEX記念カスタム】がいよいよ開幕します！

X（旧Twitter）掲載用の特別なプロモーション動画も作成しておりますので、当日のオープニングとは一味違う映像をぜひご覧ください！（※拡散大希望です！）

【開催スケジュール】
■ 予選 Aブロック
・日程：5月23日(土) 20:50～
※リーダー枠は20:30集合

■ 予選 Bブロック
・日程：5月24日(日) 20:30～
※リーダー枠は20:30集合

■ 本戦
・日程：8月29日(土) 20:45～
Aブロック・Bブロックの上位10チームずつ（計20チーム）が本戦への出場権を獲得します！本戦開始前には、カウントダウンおよび視聴者プレゼント企画を実施します。

【動画コンテンツ】
予選・本戦ともに、皆様に楽しんでいただける特別な映像をご用意しています。

《予選》
・特別オープニング動画⟡.（※エンディングは本戦のみとなります）

《本戦》
・カウントダウン動画
・視聴者プレゼントクロスワード動画
・本戦用特別オープニング動画
・本戦用特別エンディング動画（スポンサー様もご紹介いたします）
※もちろん、本戦を戦い抜く出場者の皆様に向けた豪華賞品も別途ご用意しております！

【超豪華！視聴者プレゼント】
半年間の取り組み期間を経て、過去最大規模のプレゼントをご用意しました！
（※賞品はすべて、同額分の「Amazonギフト券」でのお渡しとなります）

・Stream Deck Neo 相当（14,000円×2）＝ 28,000円分
・audio-technica AT4040 相当 ＝ 40,000円分
・INZONE Buds ワイヤレスイヤホン 相当 ＝ 30,000円分
・カタログギフト 相当（5,000円×6）＝ 30,000円分
・Amazonギフト券（10,000円×2）＝ 20,000円分

総額 約148,000円分！

僕らの出せる全てをここに注ぎます。
過去最高の仕上がりを、ぜひ刮目してください。

APEXカスタムの魅力を、少しでも多くの方へ届けたい。
更に向こうへ、Plus ultra！皆様のご参加・ご視聴を心よりお待ちしております。`,
  },
];

// ==========================================
// ⭐ 運営陣・管理者（ADMINS）データ
// ==========================================
export const adminList = [
  {
    id: 'creator_01',
    name: '狼の野郎',
    romanName: 'WOLF YAROU',
    role: 'Streamer / Creator',
    image: '/ookaminoyarou.webp', // 狼の野郎さんの立ち絵パス
    // 🌟 ミリシタ風の縦書きキャッチコピー（配列で複数行対応）
    // 🌟 これを追加！好きな色コード（HEX）を入れてください
    // 例：青系なら '#3B82F6'、赤系なら '#EF4444'、紫なら '#A855F7' など
    themeColor: '#F97316',

    // 🌟 これらをドーンと追加！（PROFILEで設定していた数値と同じでOKです）
    offsetX: -100,
    offsetY: 400,
    scale: 3.8, // 👈 2倍の大きさに！
    mobileOffsetX: 0,
    mobileOffsetY: 170,
    mobileScale: 2,

    catchphrases: ['ただの狼、', '人間生活大満喫中狼。'],
    // 🌟 右側に並べるグリッド情報
    profileGrid: [
      { label: 'メインゲーム', value: 'Apex, VALORANT' },
      { label: 'プレイスタイル', value: 'ストーリー系も多岐にわたる' },
      { label: '活動内容', value: '配信、物作り、小説執筆' },
      { label: '出没時間', value: '自由気まま' },
      // 🌟 ここから下が自動で追加されて描画されるデータ！
      { label: 'MANAGEMENT', value: 'TSC Sub Administrator' },
      { label: 'CREATIVE TOOLS', value: 'Blender, After Effects, AviUtl' },
      { label: 'DEV SKILLS', value: 'Next.js, React, Tailwind CSS, SQL' },
      { label: 'SPECIAL SKILL', value: 'Handball Coaching, DIY' },
    ],
    profileText:
      'ただの狼、人間生活大満喫中狼。\n配信者やら、物作りやら、小説書いたり、自由気ままにインターネット生活ライフ！\n『Apex Legends』、『原神』、『VALORANT』や『魔法少女ノ魔女裁判』などのストーリー系ゲームなど、多岐にわたるゲームを配信中。動画制作など色々と作り中。ぜひみてね～たのしぃ。',
    youtubeId: 'Pj1G8lVq8y0', // 🌟 ピックアップ動画のID
    links: {
      x: 'https://x.com/wolf_wolf_wolfA',
      twitch: 'https://www.twitch.tv/wolfyarou',
      youtube: 'https://www.youtube.com/channel/UCLJ0tGK4PpfdZJvf0fjGVWw',
    },
  },
  // 他のクリエイターもここに追加していきます
  {
    id: 'creator_02',
    name: 'kayo',
    romanName: 'kayo',
    role: 'Streamer / Creator',
    image: '/kayotatie.webp', // 狼の野郎さんの立ち絵パス
    // 🌟 ミリシタ風の縦書きキャッチコピー（配列で複数行対応）
    // 🌟 これを追加！好きな色コード（HEX）を入れてください
    // 例：青系なら '#3B82F6'、赤系なら '#EF4444'、紫なら '#A855F7' など
    themeColor: '#0284C7',

    // 🌟 これらをドーンと追加！（PROFILEで設定していた数値と同じでOKです）
    offsetX: -100,
    offsetY: 1100,
    scale: 2.8, // 👈 2倍の大きさに！
    mobileOffsetX: 0,
    mobileOffsetY: 170,
    mobileScale: 2,

    catchphrases: ['ただの狼、', '人間生活大満喫中狼。'],
    // 🌟 右側に並べるグリッド情報
    profileGrid: [
      { label: 'メインゲーム', value: 'Apex, VALORANT' },
      { label: 'プレイスタイル', value: 'ストーリー系も多岐にわたる' },
      { label: '活動内容', value: '配信、物作り、小説執筆' },
      { label: '出没時間', value: '自由気まま' },
      // 🌟 ここから下が自動で追加されて描画されるデータ！
      { label: 'MANAGEMENT', value: 'TSC Sub Administrator' },
      { label: 'CREATIVE TOOLS', value: 'Blender, After Effects, AviUtl' },
      { label: 'DEV SKILLS', value: 'Next.js, React, Tailwind CSS, SQL' },
      { label: 'SPECIAL SKILL', value: 'Handball Coaching, DIY' },
    ],
    profileText:
      'ただの狼、人間生活大満喫中狼。\n配信者やら、物作りやら、小説書いたり、自由気ままにインターネット生活ライフ！\n『Apex Legends』、『原神』、『VALORANT』や『魔法少女ノ魔女裁判』などのストーリー系ゲームなど、多岐にわたるゲームを配信中。動画制作など色々と作り中。ぜひみてね～たのしぃ。',
    youtubeId: 'Pj1G8lVq8y0', // 🌟 ピックアップ動画のID
    links: {
      x: 'https://x.com/wolf_wolf_wolfA',
      twitch: 'https://www.twitch.tv/wolfyarou',
      youtube: 'https://www.youtube.com/channel/UCLJ0tGK4PpfdZJvf0fjGVWw',
    },
  },
];
