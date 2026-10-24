/**
 * Lenny Face Pro - Master Internationalization Knowledge Base (i18n-data.js)
 * Full authentic translations for Spanish (es), Japanese (ja/jp), and Korean (ko/kr).
 * Provides localized metadata, H1s, hero descriptions, editorial guides, FAQs, and breadcrumbs.
 */

const LANGUAGES = [
  { code: 'en', dir: '', name: 'English', flag: '🇺🇸', hreflang: 'en', prefix: '' },
  { code: 'es', dir: 'es', name: 'Español', flag: '🇪🇸', hreflang: 'es', prefix: 'es/' },
  { code: 'ja', dir: 'jp', name: '日本語', flag: '🇯🇵', hreflang: 'ja', prefix: 'jp/' },
  { code: 'ko', dir: 'kr', name: '한국어', flag: '🇰🇷', hreflang: 'ko', prefix: 'kr/' }
];

const UI_STRINGS = {
  en: {
    siteName: 'Lenny Face',
    navBrowse: 'Browse All',
    navTextFaces: 'Text Faces',
    navKaomoji: 'Kaomoji',
    navEmoticons: 'Emoticons',
    navSymbols: 'Symbols',
    navAesthetic: 'Aesthetic',
    searchPlaceholder: 'Search faces & keywords...',
    hubAll: 'All Faces',
    hubFavs: '❤️ Favorites',
    hubLenny: 'Lenny Faces',
    hubTextFaces: 'Text Faces',
    hubKaomoji: 'Kaomoji',
    hubEmoticons: 'Emoticons',
    hubSymbols: 'Symbols',
    hubAesthetic: 'Aesthetic Bios',
    showingItems: 'Showing',
    itemsInCategory: 'items in this category',
    clickToCopy: '💡 Click any card to copy instantly',
    copyBtn: 'Copy',
    copiedBtn: 'Copied! ✔',
    shareTitle: 'Share Collection With Friends',
    exploreRelated: 'Explore Related Categories',
    footerDesc: 'Copy and paste Lenny Face ( ͡° ͜ʖ ͡°), text faces, kaomoji, aesthetic emoticons, and text symbols in 1-click. Free Lenny Face generator with cute, angry, sad, and custom styles.',
    footerLennyStyles: 'Lenny Face Styles',
    footerKaomojiEmoticons: 'Kaomoji & Emoticons',
    footerSymbolsAesthetic: 'Symbols & Aesthetic',
    allRightsReserved: 'All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    about: 'About Us',
    toastCopied: 'Copied to clipboard!',
    toastFavAdd: '❤️ Saved to Favorites!',
    toastFavRemove: '🤍 Removed from Favorites'
  },
  es: {
    siteName: 'Caritas Lenny',
    navBrowse: 'Ver Todos',
    navTextFaces: 'Caras de Texto',
    navKaomoji: 'Kaomojis',
    navEmoticons: 'Emoticones',
    navSymbols: 'Símbolos',
    navAesthetic: 'Estéticos',
    searchPlaceholder: 'Buscar caritas, kaomojis y símbolos...',
    hubAll: 'Todas las Caritas',
    hubFavs: '❤️ Favoritos',
    hubLenny: 'Caritas Lenny',
    hubTextFaces: 'Caras de Texto',
    hubKaomoji: 'Kaomojis',
    hubEmoticons: 'Emoticones',
    hubSymbols: 'Símbolos',
    hubAesthetic: 'Biografías Estéticas',
    showingItems: 'Mostrando',
    itemsInCategory: 'elementos en esta categoría',
    clickToCopy: '💡 Toca cualquier tarjeta para copiar al instante',
    copyBtn: 'Copiar',
    copiedBtn: '¡Copiado! ✔',
    shareTitle: 'Compartir Colección con Amigos',
    exploreRelated: 'Explorar Categorías Relacionadas',
    footerDesc: 'Copia y pega caritas Lenny ( ͡° ͜ʖ ͡°), caras de texto, kaomojis, emoticones estéticos y símbolos con 1 solo clic. Generador gratuito de caritas tiernas, enojadas, tristes y personalizadas.',
    footerLennyStyles: 'Estilos de Caritas Lenny',
    footerKaomojiEmoticons: 'Kaomojis y Emoticones',
    footerSymbolsAesthetic: 'Símbolos y Estéticos',
    allRightsReserved: 'Todos los derechos reservados.',
    privacy: 'Política de Privacidad',
    terms: 'Términos de Servicio',
    about: 'Sobre Nosotros',
    toastCopied: '¡Copiado al portapapeles!',
    toastFavAdd: '❤️ ¡Guardado en Favoritos!',
    toastFavRemove: '🤍 Eliminado de Favoritos'
  },
  ja: {
    siteName: '顔文字コピペ',
    navBrowse: 'すべて表示',
    navTextFaces: 'テキスト顔文字',
    navKaomoji: '顔文字 (Kaomoji)',
    navEmoticons: 'アスキー絵文字',
    navSymbols: '特殊記号',
    navAesthetic: '特殊文字バイオ',
    searchPlaceholder: '顔文字、記号、レニーフェイスを検索...',
    hubAll: 'すべての顔文字',
    hubFavs: '❤️ お気に入り',
    hubLenny: 'レニーフェイス',
    hubTextFaces: 'テキスト顔文字',
    hubKaomoji: '顔文字 (Kaomoji)',
    hubEmoticons: 'アスキー絵文字',
    hubSymbols: '特殊記号',
    hubAesthetic: 'プロフィール装飾',
    showingItems: '表示中:',
    itemsInCategory: '件の顔文字',
    clickToCopy: '💡 タップで瞬時にクリップボードにコピー',
    copyBtn: 'コピー',
    copiedBtn: 'コピー完了! ✔',
    shareTitle: '友達にコレクションをシェア',
    exploreRelated: '関連カテゴリーを見る',
    footerDesc: 'ワンクリックでコピーできるかわいい顔文字（Kaomoji）、レニーフェイス（Lenny Face）、アスキーアート、特殊文字の無料まとめサイト。',
    footerLennyStyles: 'レニーフェイス一覧',
    footerKaomojiEmoticons: '顔文字＆アスキー絵文字',
    footerSymbolsAesthetic: '特殊記号＆装飾バイオ',
    allRightsReserved: '無断転載を禁じます。',
    privacy: 'プライバシーポリシー',
    terms: '利用規約',
    about: '当サイトについて',
    toastCopied: 'クリップボードにコピーしました！',
    toastFavAdd: '❤️ お気に入りに追加しました！',
    toastFavRemove: '🤍 お気に入りから削除しました'
  },
  ko: {
    siteName: '레니페이스 복사',
    navBrowse: '전체 보기',
    navTextFaces: '텍스트 얼굴',
    navKaomoji: '카오모지',
    navEmoticons: '이모티콘',
    navSymbols: '특수문자 기호',
    navAesthetic: '감성 바이오',
    searchPlaceholder: '이모티콘, 특수문자, 카오모지 검색...',
    hubAll: '전체 이모티콘',
    hubFavs: '❤️ 즐겨찾기',
    hubLenny: '레니페이스',
    hubTextFaces: '텍스트 얼굴',
    hubKaomoji: '카오모지',
    hubEmoticons: '이모티콘',
    hubSymbols: '특수문자 기호',
    hubAesthetic: '감성 프로필',
    showingItems: '표시 중:',
    itemsInCategory: '개 이모티콘',
    clickToCopy: '💡 카드를 클릭하여 즉시 복사하세요',
    copyBtn: '복사',
    copiedBtn: '복사 완료! ✔',
    shareTitle: '친구들에게 모음 공유하기',
    exploreRelated: '관련 카테고리 둘러보기',
    footerDesc: '원클릭으로 간편하게 복사하는 레니페이스 ( ͡° ͜ʖ ͡°), 카오모지, 귀여운 텍스트 이모티콘 및 특수문자 모음집. 무료 생성기 및 다양한 스타일 지원.',
    footerLennyStyles: '레니페이스 스타일',
    footerKaomojiEmoticons: '카오모지 & 이모티콘',
    footerSymbolsAesthetic: '특수문자 & 감성 바이오',
    allRightsReserved: '모든 권리 보유.',
    privacy: '개인정보처리방침',
    terms: '이용약관',
    about: '사이트 소개',
    toastCopied: '클립보드에 복사되었습니다!',
    toastFavAdd: '❤️ 즐겨찾기에 저장되었습니다!',
    toastFavRemove: '🤍 즐겨찾기에서 제거되었습니다'
  }
};

// Localized Metadata & Content for Homepage
const HOMEPAGE_I18N = {
  es: {
    title: 'Caritas Lenny ( ͡° ͜ʖ ͡°) — Copiar y Pegar Caras de Texto, Kaomojis y Símbolos',
    description: 'Copia y pega caritas Lenny ( ͡° ͜ʖ ͡°), caras de texto, kaomojis japoneses y símbolos estéticos con 1 clic. Generador gratuito de caritas tiernas, enojadas y personalizadas.',
    h1: 'Caritas Lenny & Kaomojis <span>( ͡° ͜ʖ ͡°)</span>',
    heroSub: 'Toca cualquier tarjeta para copiar al instante al portapapeles. Colección 100% gratuita para Discord, WhatsApp, TikTok y videojuegos.',
    heroBadge: '⚡ 1 Clic para Copiar • Más de 1,000 Caritas',
    editorialHtml: `
      <h2>Guía Completa de Caritas Lenny, Kaomojis y Caras de Texto</h2>
      <p>Bienvenido al mayor directorio en español de <strong>Caritas Lenny ( ͡° ͜ʖ ͡°)</strong>, kaomojis japoneses y caras de texto en Unicode. Todas las caritas están optimizadas para copiarse con un solo toque y pegarse sin errores en WhatsApp, Discord, TikTok, Instagram, Roblox y cualquier juego online.</p>
      <h3>¿Qué Significa la Carita Lenny?</h3>
      <p>Nacida en foros de internet, la carita Lenny representa una expresión pícara, cómplice o sarcástica ("si sabes a qué me refiero"). Gracias a que está creada con caracteres especiales de Unicode, funciona como texto puro sin necesidad de instalar fuentes ni aplicaciones adicionales.</p>
    `,
    faqList: [
      { q: "¿Cómo copio las caritas en mi teléfono?", a: "Simplemente pulsa sobre cualquier tarjeta y se copiará automáticamente al portapapeles de tu móvil." },
      { q: "¿Funcionan en WhatsApp, Discord y redes sociales?", a: "¡Sí! Todos los símbolos utilizan el estándar Unicode universal, por lo que son 100% compatibles con Android, iPhone, Windows y Mac." }
    ]
  },
  ja: {
    title: 'レニーフェイス ( ͡° ͜ʖ ͡°) — コピペできる顔文字・アスキーアートまとめ',
    description: 'ワンクリックでコピーできるかわいい顔文字（Kaomoji）、レニーフェイス（Lenny Face）、テキスト絵文字、特殊記号一覧。Twitter、Discord、LINEですぐに使えます。',
    h1: '顔文字 コピペ & レニーフェイス <span>( ͡° ͜ʖ ͡°)</span>',
    heroSub: 'カードをタップするだけでクリップボードに瞬時にコピー。Twitter、Discord、LINE、ゲームチャットで使える豊富な顔文字一覧です。',
    heroBadge: '⚡ ワンクリックで簡単コピー • 1000種以上の顔文字',
    editorialHtml: `
      <h2>顔文字（Kaomoji）とレニーフェイス（Lenny Face）の魅力</h2>
      <p>日本のインターネット文化が生んだ<strong>顔文字（Kaomoji）</strong>と、世界的なネットミームである<strong>レニーフェイス ( ͡° ͜ʖ ͡°)</strong>の完全コレクションです。ユニコード（Unicode）を組み合わせたテキストアートなので、画像を使わずにチャットやSNSで感情を表情豊かに伝えられます。</p>
      <h3>スマホ・PCでそのまま使える</h3>
      <p>Twitter(X)、Discord、LINE、ゲームチャット（APEX、VALORANT、Fortnite）のチャット欄に直接ペースト可能。文字化けしない標準文字のみを厳選しています。</p>
    `,
    faqList: [
      { q: "顔文字はどうやってコピーしますか？", a: "カードをタップまたはクリックするだけで、自動的にクリップボードにコピーされます。" },
      { q: "スマホでも文字化けしませんか？", a: "はい。当サイトの顔文字は世界共通のUnicode規格を使用しているため、iPhone・Android・PCで綺麗に表示されます。" }
    ]
  },
  ko: {
    title: '레니페이스 복사 ( ͡° ͜ʖ ͡°) — 텍스트 이모티콘, 카오모지 & 특수문자 모음',
    description: '원클릭으로 간편하게 복사하는 레니페이스 ( ͡° ͜ʖ ͡°), 카오모지, 귀여운 텍스트 이모티콘 모음. 디스코드, 인스타그램, 롤 채팅 완벽 지원.',
    h1: '레니페이스 & 특수문자 이모티콘 <span>( ͡° ͜ʖ ͡°)</span>',
    heroSub: '카드를 탭하여 클립보드에 바로 복사하세요. 디스코드, 카카오톡, 게임 채팅에서 사용할 수 있는 다양한 텍스트 얼굴 모음입니다.',
    heroBadge: '⚡ 원클릭 복사 • 1,000+ 텍스트 이모티콘',
    editorialHtml: `
      <h2>레니페이스 ( ͡° ͜ʖ ͡°) 와 특수문자 이모티콘 가이드</h2>
      <p><strong>레니페이스(Lenny Face)</strong>는 음흉하면서도 익살스러운 표정으로 전 세계 게이머와 온라인 커뮤니티에서 폭발적인 인기를 얻은 대표적인 텍스트 이모티콘입니다. 유니코드 조합 문자를 사용하여 이미지 없이 텍스트 형태로 깔끔하게 전송됩니다.</p>
      <h3>어디서든 자유롭게 사용</h3>
      <p>디스코드, 인스타그램 소개글, 유튜브 댓글, 롤/발로란트 게임 채팅 등에서 돋보이는 나만의 개성을 표현해보세요.</p>
    `,
    faqList: [
      { q: "원클릭 복사는 어떻게 하나요?", a: "원하는 이모티콘 카드를 누르면 즉시 클립보드에 복사되며, 원하는 곳에 붙여넣기(Ctrl+V)하여 바로 사용할 수 있습니다." },
      { q: "모바일 스마트폰에서도 호환되나요?", a: "네! 아이폰, 갤럭시, PC 등 모든 최신 기기에서 깨짐 없이 완벽하게 지원됩니다." }
    ]
  }
};

// 17 Lenny Subpages Translations
const LENNY_SUBPAGES_I18N = {
  'cute': {
    es: {
      name: 'Caritas Tiernas',
      title: 'Caritas Lenny Tiernas ( ͜° ͜ʊ ͜°) — Copiar Caritas Lindas y Kawaii',
      description: 'Copia y pega caritas Lenny tiernas ( ͜° ͜ʊ ͜°), caras de texto kawaii y sonrisas adorables con 1 clic. Gratis para Discord y WhatsApp.',
      h1: 'Caritas Lenny Tiernas <span>( ͜° ͜ʊ ͜°)</span>',
      heroSub: 'Colección de caritas Lenny tiernas, dulces y kawaii. Toca cualquier carita para copiar al instante.'
    },
    ja: {
      name: 'かわいいレニー',
      title: 'かわいいレニーフェイス ( ͜° ͜ʊ ͜°) — キュート＆癒やし系顔文字コピペ',
      description: 'ワンクリックでコピーできるかわいいレニーフェイス( ͜° ͜ʊ ͜°)と癒やし系顔文字一覧。DiscordやSNSにぴったり。',
      h1: 'かわいいレニーフェイス <span>( ͜° ͜ʊ ͜°)</span>',
      heroSub: '無邪気でかわいらしいレニーフェイス一覧。タップするだけで瞬時にコピーできます。'
    },
    ko: {
      name: '귀여운 레니',
      title: '귀여운 레니페이스 ( ͜° ͜ʊ ͜°) — 사랑스러운 텍스트 이모티콘 복사',
      description: '원클릭으로 복사하는 귀여운 레니페이스( ͜° ͜ʊ ͜°)와 카와이 텍스트 이모티콘. 디스코드 및 SNS 프로필용.',
      h1: '귀여운 레니페이스 <span>( ͜° ͜ʊ ͜°)</span>',
      heroSub: '순수하고 귀여운 표정의 레니페이스 컬렉션입니다. 탭하여 즉시 복사하세요.'
    }
  },
  'sad': {
    es: {
      name: 'Caritas Tristes',
      title: 'Caritas Lenny Triste ( ͡° ʖ̯ ͡°) — Copiar Caritas Melancólicas y con Desánimo',
      description: 'Copia y pega caritas Lenny tristes ( ͡° ʖ̯ ͡°), expresiones de desilusión y kaomojis cabizbajos con 1 clic para Discord y chat.',
      h1: 'Caritas Lenny Triste <span>( ͡° ʖ̯ ͡°)</span>',
      heroSub: 'Expresa decepción, tristeza y melancolía con caritas Lenny tristes. Toca para copiar al portapapeles.'
    },
    ja: {
      name: '悲しいレニー',
      title: '悲しいレニーフェイス ( ͡° ʖ̯ ͡°) — 落ち込み・しょんぼり顔文字コピペ',
      description: '悲しいレニーフェイス ( ͡° ʖ̯ ͡°) や落ち込んだ表情のアスキーアートをワンクリックでコピー。',
      h1: '悲しいレニーフェイス <span>( ͡° ʖ̯ ͡°)</span>',
      heroSub: 'がっかりした気持ちや落ち込んだ気分を表現するレニーフェイス一覧です。'
    },
    ko: {
      name: '슬픈 레니',
      title: '슬픈 레니페이스 ( ͡° ʖ̯ ͡°) — 우울·시무룩 텍스트 이모티콘 복사',
      description: '원클릭으로 복사하는 슬픈 레니페이스 ( ͡° ʖ̯ ͡°) 와 시무룩한 텍스트 얼굴. 실망과 슬픔 표현용.',
      h1: '슬픈 레니페이스 <span>( ͡° ʖ̯ ͡°)</span>',
      heroSub: '실망, 우울, 아쉬움을 표현할 수 있는 슬픈 레니페이스 모음입니다.'
    }
  },
  'happy': {
    es: {
      name: 'Caritas Felices',
      title: 'Caritas Lenny Feliz ( ͡ᵔ ͜ʖ ͡ᵔ) — Copiar Caritas Sonrientes y de Alegría',
      description: 'Copia y pega caritas Lenny felices ( ͡ᵔ ͜ʖ ͡ᵔ), sonrisas radiantes y caras alegres de texto en 1 clic para chat y comentarios.',
      h1: 'Caritas Lenny Feliz <span>( ͡ᵔ ͜ʖ ͡ᵔ)</span>',
      heroSub: 'Celebra momentos felices y comparte sonrisas con caritas Lenny alegres.'
    },
    ja: {
      name: '笑顔のレニー',
      title: '笑顔のレニーフェイス ( ͡ᵔ ͜ʖ ͡ᵔ) — うれしい・ハッピー顔文字コピペ',
      description: '楽しい気分や笑顔を伝えるレニーフェイス ( ͡ᵔ ͜ʖ ͡ᵔ) コピペ一覧。ワンクリックで使えます。',
      h1: '笑顔のレニーフェイス <span>( ͡ᵔ ͜ʖ ͡ᵔ)</span>',
      heroSub: '喜びや嬉しい気持ちを伝える笑顔のレニーフェイス一覧です。'
    },
    ko: {
      name: '행복한 레니',
      title: '행복한 레니페이스 ( ͡ᵔ ͜ʖ ͡ᵔ) — 웃는·기쁜 텍스트 이모티콘 복사',
      description: '행복한 웃음과 기쁨을 나타내는 레니페이스 ( ͡ᵔ ͜ʖ ͡ᵔ) 원클릭 복사 모음.',
      h1: '행복한 레니페이스 <span>( ͡ᵔ ͜ʖ ͡ᵔ)</span>',
      heroSub: '밝은 미소와 긍정적인 에너지를 전하는 행복한 레니페이스 모음입니다.'
    }
  },
  'angry': {
    es: {
      name: 'Caritas Enojadas',
      title: 'Caritas Lenny Enojado ( ͠° ͟ʖ ͡°) — Copiar Caritas de Furia y Boxeador',
      description: 'Copia y pega caritas Lenny enojadas ( ͠° ͟ʖ ͡°), boxeador listo para pelear (ง ͠° ͟ل͜ ͡°)ง y caras de furia con 1 clic.',
      h1: 'Caritas Lenny Enojado <span>( ͠° ͟ʖ ͡°)</span>',
      heroSub: 'Caritas de enojo, pelea y actitud desafiante para videojuegos y chats.'
    },
    ja: {
      name: '怒るレニー',
      title: '怒るレニーフェイス ( ͠° ͟ʖ ͡°) — 激怒・ボクサー顔文字コピペ',
      description: '怒ったレニーフェイス ( ͠° ͟ʖ ͡°) やファイター顔文字 (ง ͠° ͟ل͜ ͡°)ง のワンクリックコピペまとめ。',
      h1: '怒るレニーフェイス <span>( ͠° ͟ʖ ͡°)</span>',
      heroSub: '怒りや戦闘態勢をアピールできる激怒系レニーフェイス一覧です。'
    },
    ko: {
      name: '화난 레니',
      title: '화난 레니페이스 ( ͠° ͟ʖ ͡°) — 분노·복서 텍스트 이모티콘 복사',
      description: '화난 레니페이스 ( ͠° ͟ʖ ͡°) 와 주먹 쥔 파이터 이모티콘 (ง ͠° ͟ل͜ ͡°)ง 원클릭 복사 모음.',
      h1: '화난 레니페이스 <span>( ͠° ͟ʖ ͡°)</span>',
      heroSub: '분노, 결투, 장난스러운 도발을 표현할 수 있는 화난 레니페이스입니다.'
    }
  },
  'crying': {
    es: {
      name: 'Caritas Llorando',
      title: 'Caritas Lenny Llorando (ಥ﹏ಥ) — Copiar Caritas con Lágrimas y Llanto',
      description: 'Copia y pega caritas Lenny llorando (ಥ﹏ಥ), ojos con lágrimas y llanto desconsolado en 1 clic.',
      h1: 'Caritas Lenny Llorando <span>(ಥ﹏ಥ)</span>',
      heroSub: 'Expresa dolor, lágrimas y llanto dramático con caritas Lenny con lágrimas.'
    },
    ja: {
      name: '泣くレニー',
      title: '泣くレニーフェイス (ಥ﹏ಥ) — 涙・号泣のアスキーアート顔文字コピペ',
      description: '大粒の涙を流す泣くレニーフェイス (ಥ﹏ಥ) と号泣顔文字のワンクリックコピペまとめ。',
      h1: '泣くレニーフェイス <span>(ಥ﹏ಥ)</span>',
      heroSub: '涙や号泣、悲しみを大げさに伝える泣き顔レニーフェイス一覧です。'
    },
    ko: {
      name: '우는 레니',
      title: '우는 레니페이스 (ಥ﹏ಥ) — 눈물·오열 텍스트 이모티콘 복사',
      description: '눈물을 흘리는 우는 레니페이스 (ಥ﹏ಥ) 와 오열 텍스트 얼굴 원클릭 복사.',
      h1: '우는 레니페이스 <span>(ಥ﹏ಥ)</span>',
      heroSub: '눈물과 서러움을 극적으로 표현하는 우는 레니페이스 모음입니다.'
    }
  },
  'blushing': {
    es: {
      name: 'Caritas Sonrojadas',
      title: 'Caritas Lenny Sonrojado ( ͡° ⁄ ⁄ ͜ʖ ⁄ ⁄ ͡°) — Copiar Caritas Tímidas y con Rubor',
      description: 'Copia y pega caritas Lenny sonrojadas ( ͡° ⁄ ⁄ ͜ʖ ⁄ ⁄ ͡°), timidez y mejillas rojas con 1 clic.',
      h1: 'Caritas Lenny Sonrojado <span>( ͡° ⁄ ⁄ ͜ʖ ⁄ ⁄ ͡°)</span>',
      heroSub: 'Para momentos de timidez, vergüenza linda y rubor tierno.'
    },
    ja: {
      name: '照れるレニー',
      title: '照れるレニーフェイス ( ͡° ⁄ ⁄ ͜ʖ ⁄ ⁄ ͡°) — 赤面・恥ずかしい顔文字コピペ',
      description: '頬を赤らめた照れるレニーフェイス ( ͡° ⁄ ⁄ ͜ʖ ⁄ ⁄ ͡°) と赤面顔文字コピペ一覧。',
      h1: '照れるレニーフェイス <span>( ͡° ⁄ ⁄ ͜ʖ ⁄ ⁄ ͡°)</span>',
      heroSub: '恥ずかしい時や照れた時の感情を表現するレニーフェイス一覧です。'
    },
    ko: {
      name: '부끄러운 레니',
      title: '부끄러운 레니페이스 ( ͡° ⁄ ⁄ ͜ʖ ⁄ ⁄ ͡°) — 홍조·수줍은 텍스트 이모티콘',
      description: '볼이 빨개진 부끄러운 레니페이스 ( ͡° ⁄ ⁄ ͜ʖ ⁄ ⁄ ͡°) 와 수줍은 텍스트 이모티콘.',
      h1: '부끄러운 레니페이스 <span>( ͡° ⁄ ⁄ ͜ʖ ⁄ ⁄ ͡°)</span>',
      heroSub: '수줍음과 설렘, 부끄러운 순간을 표현하는 레니페이스입니다.'
    }
  },
  'shrug': {
    es: {
      name: 'Caritas de Encogerse de Hombros',
      title: 'Caritas Lenny Shrug ¯\\_( ͡° ͜ʖ ͡°)_/¯ — No me Importa / Qué se le va a hacer',
      description: 'Copia y pega caritas de encogerse de hombros ¯\\_( ͡° ͜ʖ ͡°)_/¯ en 1 clic para expresar indiferencia o humor.',
      h1: 'Caritas Lenny Shrug <span>¯\\_( ͡° ͜ʖ ͡°)_/¯</span>',
      heroSub: 'El clásico encogimiento de hombros para decir "¿a mí qué?" o "¿qué le vamos a hacer?".'
    },
    ja: {
      name: '肩をすくめるレニー',
      title: '肩をすくめるレニー ¯\\_( ͡° ͜ʖ ͡°)_/¯ — しょうがない・やれやれ顔文字',
      description: '肩をすくめるポーズ ¯\\_( ͡° ͜ʖ ͡°)_/¯ のレニーフェイスコピペまとめ。',
      h1: '肩をすくめるレニー <span>¯\\_( ͡° ͜ʖ ͡°)_/¯</span>',
      heroSub: '「やれやれ」「仕方ない」というニュアンスを伝える定番顔文字です。'
    },
    ko: {
      name: '어깨 으쓱 레니',
      title: '어깨 으쓱 레니 ¯\\_( ͡° ͜ʖ ͡°)_/¯ — 어쩔티비 텍스트 이모티콘',
      description: '어깨를 으쓱하는 레니 ¯\\_( ͡° ͜ʖ ͡°)_/¯ 어쩔 수 없다는 표정 원클릭 복사.',
      h1: '어깨 으쓱 레니 <span>¯\\_( ͡° ͜ʖ ͡°)_/¯</span>',
      heroSub: '신경 쓰지 않거나 어쩔 수 없음을 표현하는 레니페이스입니다.'
    }
  },
  'middle-finger': {
    es: {
      name: 'Caritas Dedo Medio',
      title: 'Caritas Lenny con Dedo Medio t( ͡° ͜ʖ ͡° t) — Copiar Caritas Rebeldes',
      description: 'Copia y pega caritas Lenny sacando el dedo medio t( ͡° ͜ʖ ͡° t) en 1 clic para bromas y memes en juegos.',
      h1: 'Caritas Lenny Dedo Medio <span>t( ͡° ͜ʖ ͡° t)</span>',
      heroSub: 'Caritas rebeldes para bromas entre amigos en servidores de Discord.'
    },
    ja: {
      name: '中指レニー',
      title: '中指レニーフェイス t( ͡° ͜ʖ ͡° t) — 挑発アスキーアートコピペ',
      description: '中指を立てた挑発的なレニーフェイス t( ͡° ͜ʖ ͡° t) コピペまとめ。',
      h1: '中指レニーフェイス <span>t( ͡° ͜ʖ ͡° t)</span>',
      heroSub: 'ゲームチャットや親しい仲間との冗談に使える挑発系アスキーアートです。'
    },
    ko: {
      name: '뻐큐 레니',
      title: '뻐큐 레니페이스 t( ͡° ͜ʖ ͡° t) — 도발 텍스트 이모티콘 복사',
      description: '가운데 손가락을 든 도발적인 레니페이스 t( ͡° ͜ʖ ͡° t) 원클릭 복사.',
      h1: '뻐큐 레니페이스 <span>t( ͡° ͜ʖ ͡° t)</span>',
      heroSub: '친구들과의 장난이나 도발을 표현하는 레니페이스입니다.'
    }
  },
  'wink': {
    es: {
      name: 'Caritas con Guiño',
      title: 'Caritas Lenny Guiñando ( ͡~ ͜ʖ ͡°) — Caritas Cómplices y Coquetas',
      description: 'Copia y pega caritas Lenny con guiño ( ͡~ ͜ʖ ͡°) con 1 clic para bromas cómplices y coqueteo.',
      h1: 'Caritas Lenny Guiñando <span>( ͡~ ͜ʖ ͡°)</span>',
      heroSub: 'Un guiño cómplice para decir "te lo dije" o "ya sabes qué significa".'
    },
    ja: {
      name: 'ウインクレニー',
      title: 'ウインクレニーフェイス ( ͡~ ͜ʖ ͡°) — お茶目な顔文字コピペ',
      description: 'お茶目にウインクするレニーフェイス ( ͡~ ͜ʖ ͡°) のワンクリックコピペまとめ。',
      h1: 'ウインクレニーフェイス <span>( ͡~ ͜ʖ ͡°)</span>',
      heroSub: '合図やお茶目なジョークにぴったりなウインク顔文字一覧です。'
    },
    ko: {
      name: '윙크 레니',
      title: '윙크 레니페이스 ( ͡~ ͜ʖ ͡°) — 장난스러운 텍스트 이모티콘',
      description: '한쪽 눈을 찡긋하는 윙크 레니페이스 ( ͡~ ͜ʖ ͡°) 원클릭 복사.',
      h1: '윙크 레니페이스 <span>( ͡~ ͜ʖ ͡°)</span>',
      heroSub: '센스 있는 농담이나 눈인사를 보낼 때 사용하는 윙크 레니페이스입니다.'
    }
  },
  'cool': {
    es: {
      name: 'Caritas Geniales',
      title: 'Caritas Lenny Genial con Lentes (⌐■_■) — Deal With It',
      description: 'Copia y pega caritas Lenny con lentes de sol (⌐■_■), estilo relajado y triunfal con 1 clic.',
      h1: 'Caritas Lenny Genial <span>(⌐■_■)</span>',
      heroSub: 'Estilo inconfundible con gafas de sol para celebrar victorias y jugadas épicas.'
    },
    ja: {
      name: 'サングラスレニー',
      title: 'サングラスレニー (⌐■_■) — クール・キメ顔文字コピペ',
      description: 'サングラスをかけたカッコいいレニーフェイス (⌐■_■) コピペまとめ。',
      h1: 'サングラスレニー <span>(⌐■_■)</span>',
      heroSub: 'ドヤ顔や勝利の瞬間に使えるサングラスアスキーアートです。'
    },
    ko: {
      name: '선글라스 레니',
      title: '선글라스 레니 (⌐■_■) — 쿨한 멋쟁이 텍스트 이모티콘',
      description: '선글라스를 착용한 멋진 레니페이스 (⌐■_■) 딜위딧 원클릭 복사.',
      h1: '선글라스 레니 <span>(⌐■_■)</span>',
      heroSub: '승리 후의 여유와 멋진 순간을 기념하는 선글라스 레니페이스입니다.'
    }
  },
  'strong': {
    es: {
      name: 'Caritas Fuertes',
      title: 'Caritas Lenny Musculoso ᕦ( ͡° ͜ʖ ͡°)ᕤ — Caritas de Fuerza y Poder',
      description: 'Copia y pega caritas Lenny con bíceps ᕦ( ͡° ͜ʖ ͡°)ᕤ mostrando músculos con 1 clic.',
      h1: 'Caritas Lenny Musculoso <span>ᕦ( ͡° ͜ʖ ͡°)ᕤ</span>',
      heroSub: 'Muestra tu fuerza física y mental con caritas Lenny que presumen bíceps.'
    },
    ja: {
      name: 'ムキムキレニー',
      title: 'ムキムキレニーフェイス ᕦ( ͡° ͜ʖ ͡°)ᕤ — 筋肉・パワー顔文字コピペ',
      description: '力こぶを作って筋肉をアピールするレニーフェイス ᕦ( ͡° ͜ʖ ͡°)ᕤ まとめ。',
      h1: 'ムキムキレニー <span>ᕦ( ͡° ͜ʖ ͡°)ᕤ</span>',
      heroSub: '筋トレや自信満々のパワーを表現するアスキーアートです。'
    },
    ko: {
      name: '근육 레니',
      title: '근육 레니페이스 ᕦ( ͡° ͜ʖ ͡°)ᕤ — 파워풀 텍스트 이모티콘',
      description: '양팔에 힘을 주는 근육 레니페이스 ᕦ( ͡° ͜ʖ ͡°)ᕤ 원클릭 복사.',
      h1: '근육 레니페이스 <span>ᕦ( ͡° ͜ʖ ͡°)ᕤ</span>',
      heroSub: '자신감 넘치는 근육과 파워를 과시하는 레니페이스 모음입니다.'
    }
  },
  'hug': {
    es: {
      name: 'Caritas de Abrazo',
      title: 'Caritas Lenny de Abrazo (つ ͡° ͜ʖ ͡°)つ — Abrazo Virtual y Afecto',
      description: 'Copia y pega caritas Lenny con brazos abiertos (つ ͡° ͜ʖ ͡°)つ dando un abrazo virtual con 1 clic.',
      h1: 'Caritas Lenny de Abrazo <span>(つ ͡° ͜ʖ ͡°)つ</span>',
      heroSub: 'Envía un abrazo cálido y virtual a tus amigos en cualquier momento.'
    },
    ja: {
      name: 'ハグレニー',
      title: 'ハグレニーフェイス (つ ͡° ͜ʖ ͡°)つ — ぎゅー・抱擁顔文字コピペ',
      description: '両手を広げてハグするレニーフェイス (つ ͡° ͜ʖ ͡°)つ のコピペまとめ。',
      h1: 'ハグレニーフェイス <span>(つ ͡° ͜ʖ ͡°)つ</span>',
      heroSub: '温かいハグや愛情を伝える抱擁系顔文字一覧です。'
    },
    ko: {
      name: '포옹 레니',
      title: '포옹 레니페이스 (つ ͡° ͜ʖ ͡°)つ — 따뜻한 포옹 텍스트 이모티콘',
      description: '두 팔을 벌려 안아주는 포옹 레니페이스 (つ ͡° ͜ʖ ͡°)つ 원클릭 복사.',
      h1: '포옹 레니페이스 <span>(つ ͡° ͜ʖ ͡°)つ</span>',
      heroSub: '따뜻한 위로와 격려, 사랑의 포옹을 전할 때 사용하는 레니페이스입니다.'
    }
  },
  'love': {
    es: {
      name: 'Caritas de Amor',
      title: 'Caritas Lenny Enamorado (♥ ͜ʖ♥) — Caritas con Corazones y Romance',
      description: 'Copia y pega caritas Lenny con ojos de corazón (♥ ͜ʖ♥) para mensajes románticos y cariñosos con 1 clic.',
      h1: 'Caritas Lenny Enamorado <span>(♥ ͜ʖ♥)</span>',
      heroSub: 'Ojos de corazón y romance para sorprender a esa persona especial.'
    },
    ja: {
      name: '恋するレニー',
      title: '恋するレニーフェイス (♥ ͜ʖ♥) — ハート・胸キュン顔文字コピペ',
      description: '目がハートになった恋するレニーフェイス (♥ ͜ʖ♥) のコピペまとめ。',
      h1: '恋するレニーフェイス <span>(♥ ͜ʖ♥)</span>',
      heroSub: '大好きな気持ちや胸キュンを伝えるハート顔文字一覧です。'
    },
    ko: {
      name: '사랑 레니',
      title: '사랑에 빠진 레니 (♥ ͜ʖ♥) — 하트 눈 로맨틱 텍스트 이모티콘',
      description: '하트 눈을 한 사랑스러운 레니페이스 (♥ ͜ʖ♥) 원클릭 복사.',
      h1: '사랑에 빠진 레니 <span>(♥ ͜ʖ♥)</span>',
      heroSub: '로맨틱한 애정과 호감을 전하는 하트 눈 레니페이스입니다.'
    }
  },
  'donger': {
    es: {
      name: 'Caritas Donger',
      title: 'Caritas Donger ヽ༼ຈل͜ຈ༽ﾉ — Raise Your Dongers para Copiar y Pegar',
      description: 'Copia y pega caritas Donger clásicas ヽ༼ຈل͜ຈ༽ﾉ de Twitch y League of Legends con 1 clic.',
      h1: 'Caritas Donger <span>ヽ༼ຈل͜ຈ༽ﾉ</span>',
      heroSub: 'El legendario meme de Twitch "Raise Your Dongers" para chats y streams.'
    },
    ja: {
      name: 'ドンガー',
      title: 'ドンガー顔文字 ヽ༼ຈل͜ຈ༽ﾉ — レイズユアドンガーコピペまとめ',
      description: 'Twitchや海外ゲームコミュニティで愛されるドンガー ヽ༼ຈل͜ຈ༽ﾉ コピペ。',
      h1: 'ドンガー顔文字 <span>ヽ༼ຈل͜ຈ༽ﾉ</span>',
      heroSub: '「Raise Your Dongers」で有名なTwitch配信の定番アスキーアートです。'
    },
    ko: {
      name: '동거 페이스',
      title: '동거 텍스트 얼굴 ヽ༼ຈل͜ຈ༽ﾉ — 트위치 밈 이모티콘 복사',
      description: '트위치와 롤에서 유명한 동거 ヽ༼ຈل͜ຈ༽ﾉ 텍스트 얼굴 원클릭 복사.',
      h1: '동거 텍스트 얼굴 <span>ヽ༼ຈل͜ຈ༽ﾉ</span>',
      heroSub: '게임 스트림과 커뮤니티의 전설적인 밈 동거 이모티콘 모음입니다.'
    }
  },
  'shocked': {
    es: {
      name: 'Caritas Sorprendidas',
      title: 'Caritas Lenny Sorprendido ( ͡o ͜ʖ ͡o) — Asombro e Impacto',
      description: 'Copia y pega caritas Lenny con ojos abiertos ( ͡o ͜ʖ ͡o) en shock y sorpresa con 1 clic.',
      h1: 'Caritas Lenny Sorprendido <span>( ͡o ͜ʖ ͡o)</span>',
      heroSub: 'Expresa sorpresa total, desconcierto e impacto con ojos abiertos.'
    },
    ja: {
      name: '驚くレニー',
      title: '驚くレニーフェイス ( ͡o ͜ʖ ͡o) — びっくり・衝撃顔文字コピペ',
      description: '目を丸くして驚くレニーフェイス ( ͡o ͜ʖ ͡o) のコピペまとめ。',
      h1: '驚くレニーフェイス <span>( ͡o ͜ʖ ͡o)</span>',
      heroSub: '予想外の出来事やショックな瞬間に使える驚き顔文字一覧です。'
    },
    ko: {
      name: '놀란 레니',
      title: '놀란 레니페이스 ( ͡o ͜ʖ ͡o) — 충격·경악 텍스트 이모티콘',
      description: '눈이 휘둥그레진 놀란 레니페이스 ( ͡o ͜ʖ ͡o) 원클릭 복사.',
      h1: '놀란 레니페이스 <span>( ͡o ͜ʖ ͡o)</span>',
      heroSub: '예상치 못한 충격과 경악을 표현하는 놀란 레니페이스입니다.'
    }
  },
  'sparkle': {
    es: {
      name: 'Caritas Brillantes',
      title: 'Caritas Lenny Brillante (★ ͜ʖ★) — Caritas con Estrellas y Brillo',
      description: 'Copia y pega caritas Lenny con estrellas (★ ͜ʖ★) llenas de brillo y magia con 1 clic.',
      h1: 'Caritas Lenny Brillante <span>(★ ͜ʖ★)</span>',
      heroSub: 'Destaca en tus perfiles con caritas Lenny que brillan con estrellas.'
    },
    ja: {
      name: 'キラキラレニー',
      title: 'キラキラレニーフェイス (★ ͜ʖ★) — 星目・輝く顔文字コピペ',
      description: '目が星マークになったキラキラレニーフェイス (★ ͜ʖ★) コピペまとめ。',
      h1: 'キラキラレニーフェイス <span>(★ ͜ʖ★)</span>',
      heroSub: '感動やワクワク、希望に満ちた輝く星目のレニーフェイス一覧です。'
    },
    ko: {
      name: '반짝이는 레니',
      title: '반짝이는 레니페이스 (★ ͜ʖ★) — 별눈 텍스트 이모티콘',
      description: '눈에 별이 반짝이는 레니페이스 (★ ͜ʖ★) 원클릭 복사.',
      h1: '반짝이는 레니페이스 <span>(★ ͜ʖ★)</span>',
      heroSub: '기대감과 설렘, 빛나는 순간을 표현하는 별눈 레니페이스입니다.'
    }
  },
  'weapons': {
    es: {
      name: 'Caritas con Armas',
      title: 'Caritas Lenny con Armas ( ͠° ͟ʖ ͡°)=ε/̵͇̿̿/\'̿̿ — Francotirador y Batalla',
      description: 'Copia y pega caritas Lenny con armas tácticas ( ͠° ͟ʖ ͡°)=ε/̵͇̿̿/\'̿̿ para Discord y videojuegos en 1 clic.',
      h1: 'Caritas Lenny con Armas <span>( ͠° ͟ʖ ͡°)=ε/̵͇̿̿/\'̿̿</span>',
      heroSub: 'Rifles de francotirador y armas ASCII para lobbies de CS:GO, Valorant y Call of Duty.'
    },
    ja: {
      name: '武器持ちレニー',
      title: '武器持ちレニー ( ͠° ͟ʖ ͡°)=ε/̵͇̿̿/\'̿̿ — スナイパー銃顔文字コピペ',
      description: 'スナイパーライフルや銃を構えた戦闘用レニーフェイスのアスキーアートまとめ。',
      h1: '武器持ちレニー <span>( ͠° ͟ʖ ͡°)=ε/̵͇̿̿/\'̿̿</span>',
      heroSub: 'FPSや対戦ゲームのチャットで人気の銃持ちアスキーアート一覧です。'
    },
    ko: {
      name: '무기 든 레니',
      title: '무기를 든 레니 ( ͠° ͟ʖ ͡°)=ε/̵͇̿̿/\'̿̿ — 저격총·전투 텍스트 이모티콘',
      description: '저격총을 든 전투 모드 레니페이스 ( ͠° ͟ʖ ͡°)=ε/̵͇̿̿/\'̿̿ 원클릭 복사.',
      h1: '무기를 든 레니 <span>( ͠° ͟ʖ ͡°)=ε/̵͇̿̿/\'̿̿</span>',
      heroSub: '배그, 서든, 발로란트 등 슈팅 게임 채팅에 어울리는 전투 레니페이스입니다.'
    }
  }
};

// 5 Hubs Translations
const HUBS_I18N = {
  'text-faces': {
    es: {
      name: 'Caras de Texto',
      title: 'Caras de Texto (ง\'̀-\'́)ง — Copiar y Pegar Emoticones de Texto y Dongers',
      description: 'Directorio masivo de más de 500 caras de texto, dongers, encogimientos de hombros y caras ASCII. Copia con 1 clic para Discord y TikTok.',
      h1: 'Caras de Texto <span>(ง\'̀-\'́)ง</span>',
      heroSub: 'Cientos de expresiones en caracteres de texto para videojuegos, redes sociales y chats.'
    },
    ja: {
      name: 'テキスト顔文字',
      title: 'テキスト顔文字 (ง\'̀-\'́)ง — コピペできるアスキーアート＆ドンガー',
      description: '500種以上のテキスト顔文字、ドンガー、アスキーアートまとめ。ワンクリックでDiscordやSNSにコピー可能。',
      h1: 'テキスト顔文字 <span>(ง\'̀-\'́)ง</span>',
      heroSub: 'ユーモア溢れる海外のアスキーアートやテキスト顔文字を多数収録。'
    },
    ko: {
      name: '텍스트 얼굴',
      title: '텍스트 얼굴 (ง\'̀-\'́)ง — 원클릭 복사 특수문자 이모티콘 & 동거 모음',
      description: '500개 이상의 텍스트 얼굴, 동거, 아스키 아트 모음집. 디스코드와 틱톡에서 원클릭 복사로 바로 사용.',
      h1: '텍스트 얼굴 <span>(ง\'̀-\'́)ง</span>',
      heroSub: '표정이 살아있는 다양한 텍스트 얼굴과 아스키 문자를 간편하게 복사하세요.'
    }
  },
  'kaomoji': {
    es: {
      name: 'Kaomojis',
      title: 'Kaomojis (顔文字) — Directorio de Emoticones Japoneses Kawaii para Copiar',
      description: 'La colección definitiva de Kaomojis japoneses: gatos, ternura, lágrimas y corazones. 1 clic para copiar a tu portapapeles.',
      h1: 'Kaomojis <span>(*^▽^*)</span>',
      heroSub: 'Emoticones tipográficos japoneses organizados por emoción, animales y estilos kawaii.'
    },
    ja: {
      name: '顔文字 (Kaomoji)',
      title: '顔文字 コピペ (Kaomoji) — かわいい顔文字＆レニーフェイス一覧 [2026]',
      description: 'ワンクリックでコピーできるかわいい顔文字（Kaomoji）の無料一覧まとめ。Twitter、Discord、LINEですぐに使えます。',
      h1: '顔文字 <span>(*^▽^*)</span>',
      heroSub: '感情や動物、シチュエーション別に整理された日本発祥の豊かな顔文字コレクション。'
    },
    ko: {
      name: '카오모지',
      title: '카오모지 (顔文字) — 일본 텍스트 이모티콘 원클릭 복사 모음집',
      description: '고양이, 강아지, 귀여운 표정, 눈물 등 500개 이상의 일본 카오모지 컬렉션. 원클릭 클립보드 복사.',
      h1: '카오모지 <span>(*^▽^*)</span>',
      heroSub: '다채로운 표정과 감성을 전달하는 일본식 카오모지 모음집입니다.'
    }
  },
  'emoticons': {
    es: {
      name: 'Emoticones Clásicos',
      title: 'Emoticones Clásicos :-) — Caritas de Teclado para Copiar y Pegar',
      description: 'Copia y pega emoticones clásicos de teclado: sonrisas, guiños, besos y caritas felices con 1 clic.',
      h1: 'Emoticones Clásicos <span>:-)</span>',
      heroSub: 'Los emoticones retro de los primeros días de internet, siempre funcionales y elegantes.'
    },
    ja: {
      name: 'アスキー絵文字',
      title: 'アスキー絵文字 :-) — 定番キーボードスマイリーコピペまとめ',
      description: '往年のキーボードスマイリー、ウインク、キス顔などのクラシックなアスキー絵文字一覧。',
      h1: 'アスキー絵文字 <span>:-)</span>',
      heroSub: 'インターネット黎明期から愛され続けるシンプルな横向きスマイリー集。'
    },
    ko: {
      name: '클래식 이모티콘',
      title: '클래식 이모티콘 :-) — 키보드 스마일리 원클릭 복사',
      description: '미소, 윙크, 하트, 키스 등 빈티지 키보드 스마일리 이모티콘 원클릭 복사 모음.',
      h1: '클래식 이모티콘 <span>:-)</span>',
      heroSub: '인터넷 초창기부터 널리 사용되어 온 클래식 아스키 키보드 이모티콘입니다.'
    }
  },
  'symbols': {
    es: {
      name: 'Símbolos de Texto',
      title: 'Símbolos de Texto ♡ ★ ✦ — Copiar y Pegar Símbolos Estéticos de Unicode',
      description: 'Extenso directorio de símbolos de texto: corazones, estrellas, flores, coronas, flechas y destellos en 1 clic.',
      h1: 'Símbolos de Texto <span>♡ ★ ✦</span>',
      heroSub: 'Personaliza tus biografías de Instagram, TikTok y Discord con miles de símbolos estéticos.'
    },
    ja: {
      name: '特殊記号',
      title: '特殊記号 ♡ ★ ✦ — コピペできるかわいい装飾テキストシンボル',
      description: 'ハート、星、キラキラ、花、十字架、矢印など、インスタやSNSプロフィールで使える特殊文字記号集。',
      h1: '特殊記号 <span>♡ ★ ✦</span>',
      heroSub: 'プロフィールやメッセージをおしゃれに飾るかわいい特殊文字・記号一覧です。'
    },
    ko: {
      name: '특수문자 기호',
      title: '특수문자 기호 ♡ ★ ✦ — 인스타·디스코드 감성 특수기호 복사',
      description: '하트, 별, 반짝이, 꽃, 왕관, 화살표 등 예쁜 감성 특수문자 기호 원클릭 복사.',
      h1: '특수문자 기호 <span>♡ ★ ✦</span>',
      heroSub: '인스타그램 바이오, 디스코드 상태 메시지를 꾸밀 수 있는 감성 특수기호 모음입니다.'
    }
  },
  'aesthetic': {
    es: {
      name: 'Biografías Estéticas',
      title: 'Biografías y Separadores Estéticos ─── ⋆⋅☆⋅⋆ ─── — Plantillas para Perfiles',
      description: 'Copia y pega biografías estéticas para Discord, separadores de texto, bordes elegantes y combinaciones de emojis.',
      h1: 'Biografías Estéticas <span>⋆ ˚｡⋆୨୧˚</span>',
      heroSub: 'Diseña perfiles deslumbrantes en Discord, Instagram y TikTok con plantillas listas para usar.'
    },
    ja: {
      name: 'プロフィール装飾',
      title: 'プロフィール装飾＆飾り罫 ─── ⋆⋅☆⋅⋆ ─── — ディスコード＆インスタ用バイオ',
      description: 'Discordプロフィール、Instagramバイオ用の可愛い飾り罫線、枠線、絵文字組み合わせテンプレート。',
      h1: 'プロフィール装飾 <span>⋆ ˚｡⋆୨୧˚</span>',
      heroSub: 'コピペするだけで映えるSNSプロフィールが作れるデザイン枠線・仕切り線テンプレート集。'
    },
    ko: {
      name: '감성 프로필',
      title: '감성 바이오 & 구분선 ─── ⋆⋅☆⋅⋆ ─── — 인스타그램·디스코드 프로필 꾸미기',
      description: '디스코드 프로필, 인스타 소개글 꾸미기를 위한 텍스트 구분선, 액자 프레임, 이모지 조합 템플릿.',
      h1: '감성 바이오 & 구분선 <span>⋆ ˚｡⋆୨୧˚</span>',
      heroSub: '개성 있는 프로필을 완성할 수 있는 세련된 텍스트 구분선과 템플릿 모음입니다.'
    }
  }
};

// Subpages Translations across all hubs
const SUBPAGES_I18N = {
  // text-faces
  'text-faces/donger': {
    es: { name: 'Caritas Donger', title: 'Caritas Donger ヽ༼ຈل͜ຈ༽ﾉ — Copiar y Pegar' },
    ja: { name: 'ドンガー顔文字', title: 'ドンガー顔文字 ヽ༼ຈل͜ຈ༽ﾉ — コピペまとめ' },
    ko: { name: '동거 텍스트 얼굴', title: '동거 텍스트 얼굴 ヽ༼ຈل͜ຈ༽ﾉ — 원클릭 복사' }
  },
  'text-faces/table-flipping': {
    es: { name: 'Tirando la Mesa', title: 'Caritas Tirando la Mesa (╯°□°)╯︵ ┻━┻ — Copiar' },
    ja: { name: 'ちゃぶ台返し', title: 'ちゃぶ台返し顔文字 (╯°□°)╯︵ ┻━┻ — コピペ' },
    ko: { name: '밥상 뒤엎기', title: '밥상 뒤엎기 이모티콘 (╯°□°)╯︵ ┻━┻ — 원클릭 복사' }
  },
  'text-faces/disapproval': {
    es: { name: 'Desaprobación ಠ_ಠ', title: 'Caritas de Desaprobación ಠ_ಠ — Copiar y Pegar' },
    ja: { name: '蔑視の目 ಠ_ಠ', title: '不満・ジト目顔文字 ಠ_ಠ — コピペ' },
    ko: { name: '못마땅한 눈 ಠ_ಠ', title: '불만의 눈빛 이모티콘 ಠ_ಠ — 원클릭 복사' }
  },
  'text-faces/bear': {
    es: { name: 'Caritas de Oso', title: 'Caritas de Oso ʕ•ᴥ•ʔ — Caritas Tiernas de Animales' },
    ja: { name: 'クマの顔文字', title: 'クマの顔文字 ʕ•ᴥ•ʔ — かわいい動物アスキーアート' },
    ko: { name: '곰 이모티콘', title: '곰 텍스트 얼굴 ʕ•ᴥ•ʔ — 귀여운 동물 이모티콘' }
  },
  'text-faces/cat': {
    es: { name: 'Caritas de Gato', title: 'Caritas de Gato (=^･ω･^=) — Copiar Caras Felinas' },
    ja: { name: '猫の顔文字', title: '猫の顔文字 (=^･ω･^=) — にゃんこアスキーアート' },
    ko: { name: '고양이 이모티콘', title: '고양이 텍스트 얼굴 (=^･ω･^=) — 야옹이 복사' }
  },
  'text-faces/hug': {
    es: { name: 'Caritas de Abrazo', title: 'Caritas de Abrazo (づ｡◕‿‿◕｡)づ — Cariño y Afecto' },
    ja: { name: 'ハグ顔文字', title: 'ハグ顔文字 (づ｡◕‿‿◕｡)づ — ぎゅーっと抱きしめる顔文字' },
    ko: { name: '포옹 얼굴', title: '포옹 텍스트 얼굴 (づ｡◕‿‿◕｡)づ — 따뜻한 안아주기' }
  },
  'text-faces/crying': {
    es: { name: 'Caritas Llorando', title: 'Caritas Llorando (╥﹏╥) — Lágrimas y Tristeza' },
    ja: { name: '泣き顔文字', title: '泣く顔文字 (╥﹏╥) — 号泣・なみだのアスキーアート' },
    ko: { name: '눈물 얼굴', title: '우는 텍스트 얼굴 (╥﹏╥) — 눈물 뚝뚝 이모티콘' }
  },
  'text-faces/cool': {
    es: { name: 'Caritas con Lentes', title: 'Caritas Geniales (⌐■_■) — Deal With It' },
    ja: { name: 'クール顔文字', title: 'クールなサングラス顔文字 (⌐■_■) — ドヤ顔コピペ' },
    ko: { name: '선글라스 얼굴', title: '선글라스 멋진 얼굴 (⌐■_■) — 쿨한 이모티콘' }
  },
  'text-faces/happy': {
    es: { name: 'Caritas Felices', title: 'Caritas Felices (☞ﾟヮﾟ)☞ — Alegría y Sonrisas' },
    ja: { name: '笑顔の顔文字', title: '笑顔・ハッピー顔文字 (☞ﾟヮﾟ)☞ — 元気が出るアスキーアート' },
    ko: { name: '행복한 얼굴', title: '행복한 텍스트 얼굴 (☞ﾟヮﾟ)☞ — 즐거운 미소 복사' }
  },
  'text-faces/cute': {
    es: { name: 'Caritas Tiernas', title: 'Caritas Tiernas (✿◠‿◠) — Lindas y Kawaii' },
    ja: { name: 'かわいい顔文字', title: 'かわいい顔文字 (✿◠‿◠) — キュート＆癒やし' },
    ko: { name: '귀여운 얼굴', title: '귀여운 텍스트 얼굴 (✿◠‿◠) — 카와이 모음' }
  },
  'text-faces/love': {
    es: { name: 'Caritas de Amor', title: 'Caritas de Amor (｡♥‿♥｡) — Románticas y Corazones' },
    ja: { name: '愛・恋の顔文字', title: '恋する顔文字 (｡♥‿♥｡) — ハート・胸キュン' },
    ko: { name: '사랑 얼굴', title: '사랑 텍스트 얼굴 (｡♥‿♥｡) — 하트 눈 이모티콘' }
  },
  'text-faces/sad': {
    es: { name: 'Caritas Tristes', title: 'Caritas Tristes (｡•́︿•̀｡) — Desánimo y Pena' },
    ja: { name: '悲しい顔文字', title: '悲しい顔文字 (｡•́︿•̀｡) — しょんぼり・切ない' },
    ko: { name: '슬픈 얼굴', title: '슬픈 텍스트 얼굴 (｡•́︿•̀｡) — 아쉬움과 속상함' }
  },
  'text-faces/angry': {
    es: { name: 'Caritas Enojadas', title: 'Caritas Enojadas (งಠ益ಠ)ง — Rabia y Furia' },
    ja: { name: '怒る顔文字', title: '怒りの顔文字 (งಠ益ಠ)ง — 激おこアスキーアート' },
    ko: { name: '화난 얼굴', title: '화난 텍스트 얼굴 (งಠ益ಠ)ง — 극대노 이모티콘' }
  },
  'text-faces/blushing': {
    es: { name: 'Caritas Sonrojadas', title: 'Caritas Sonrojadas (´• ω •`) — Timidez y Rubor' },
    ja: { name: '照れる顔文字', title: '照れ顔文字 (´• ω •`) — 赤面・もじもじ' },
    ko: { name: '부끄러운 얼굴', title: '부끄러운 얼굴 (´• ω •`) — 수줍은 홍조' }
  },
  'text-faces/sleepy': {
    es: { name: 'Caritas Durmiendo', title: 'Caritas con Sueño (－_－) zzz — Dormir y Siesta' },
    ja: { name: '眠い顔文字', title: '眠い顔文字 (－_－) zzz — おやすみ・すやすや' },
    ko: { name: '졸린 얼굴', title: '졸린 텍스트 얼굴 (－_－) zzz — 수면·쿨쿨' }
  },
  'text-faces/fight': {
    es: { name: 'Caritas de Pelea', title: 'Caritas de Pelea (ง\'̀-\'́)ง — Boxeador y Combate' },
    ja: { name: '戦う顔文字', title: '戦う顔文字 (ง\'̀-\'́)ง — ファイター・バトル' },
    ko: { name: '싸우는 얼굴', title: '싸우는 텍스트 얼굴 (ง\'̀-\'́)ง — 파이터 모드' }
  },

  // kaomoji
  'kaomoji/happy': {
    es: { name: 'Kaomoji Feliz', title: 'Kaomojis Felices (*^▽^*) — Sonrisas Japonesas' },
    ja: { name: '嬉しい顔文字', title: '嬉しい顔文字 (*^▽^*) — 笑顔・ハッピー顔文字一覧' },
    ko: { name: '행복 카오모지', title: '행복한 카오모지 (*^▽^*) — 기쁨의 미소' }
  },
  'kaomoji/cute': {
    es: { name: 'Kaomoji Tierno', title: 'Kaomojis Tiernos ( ˶ˆ꒳ˆ˵ ) — Kawaii Japonés' },
    ja: { name: 'かわいい顔文字', title: 'かわいい顔文字 ( ˶ˆ꒳ˆ˵ ) — 定番癒やし系まとめ' },
    ko: { name: '귀여운 카오모지', title: '귀여운 카오모지 ( ˶ˆ꒳ˆ˵ ) — 사랑스러운 표정' }
  },
  'kaomoji/heart': {
    es: { name: 'Kaomoji con Corazón', title: 'Kaomojis de Corazón (◕‿◕)♡ — Amor y Romance' },
    ja: { name: 'ハート顔文字', title: 'ハート顔文字 (◕‿◕)♡ — 愛情・スキを伝える顔文字' },
    ko: { name: '하트 카오모지', title: '하트 카오모지 (◕‿◕)♡ — 애정 표현 이모티콘' }
  },
  'kaomoji/hug': {
    es: { name: 'Kaomoji de Abrazo', title: 'Kaomojis de Abrazo (つ✧ω✧)つ — Cariño y Apoyo' },
    ja: { name: 'ハグ顔文字', title: 'ぎゅーハグ顔文字 (つ✧ω✧)つ — やさしい抱擁' },
    ko: { name: '포옹 카오모지', title: '포옹 카오모지 (つ✧ω✧)つ — 따뜻한 품' }
  },
  'kaomoji/kiss': {
    es: { name: 'Kaomoji de Beso', title: 'Kaomojis de Beso (づ￣ ³￣)づ — Besitos Kawaii' },
    ja: { name: 'キス顔文字', title: 'ちゅっキス顔文字 (づ￣ ³￣)づ — キス・投げキッス' },
    ko: { name: '뽀뽀 카오모지', title: '뽀뽀 카오모지 (づ￣ ³￣)づ — 츄 이모티콘' }
  },
  'kaomoji/sad': {
    es: { name: 'Kaomoji Triste', title: 'Kaomojis Tristes (ノ_<。) — Pena y Desánimo' },
    ja: { name: '泣き顔文字', title: 'しくしく悲しい顔文字 (ノ_<。) — 切ない・涙' },
    ko: { name: '슬픈 카오모지', title: '슬픈 카오모지 (ノ_<。) — 눈물 글썽' }
  },
  'kaomoji/angry': {
    es: { name: 'Kaomoji Enojado', title: 'Kaomojis Enojados (#`Д´) — Furia y Molestia' },
    ja: { name: '怒る顔文字', title: 'ぷんぷん怒る顔文字 (#`Д´) — 怒り・ぷりぷり' },
    ko: { name: '화난 카오모지', title: '화난 카오모지 (#`Д´) — 씩씩 분노' }
  },
  'kaomoji/cat': {
    es: { name: 'Kaomoji de Gato', title: 'Kaomojis de Gato /ᐠ｡ꞈ｡ᐟ\\ — Gatitos Kawaii' },
    ja: { name: '猫の顔文字', title: '猫の顔文字 /ᐠ｡ꞈ｡ᐟ\\ — にゃんこ・ねこ顔文字集' },
    ko: { name: '고양이 카오모지', title: '고양이 카오모지 /ᐠ｡ꞈ｡ᐟ\\ — 냥이 이모티콘' }
  },
  'kaomoji/dog': {
    es: { name: 'Kaomoji de Perro', title: 'Kaomojis de Perro ૮₍ • ᴥ • ₎ა — Perritos Kawaii' },
    ja: { name: '犬の顔文字', title: '犬の顔文字 ૮₍ • ᴥ • ₎ა — わんこ・いぬ顔文字集' },
    ko: { name: '강아지 카오모지', title: '강아지 카오모지 ૮₍ • ᴥ • ₎ა — 댕댕이 모음' }
  },
  'kaomoji/bunny': {
    es: { name: 'Kaomoji de Conejito', title: 'Kaomojis de Conejo ᕱ⑅ᕱ — Orejitas Kawaii' },
    ja: { name: 'うさぎ顔文字', title: 'うさぎ顔文字 ᕱ⑅ᕱ — ぴょんぴょんウサギ' },
    ko: { name: '토끼 카오모지', title: '토끼 카오모지 ᕱ⑅ᕱ — 쫑긋 귀여운 토끼' }
  },
  'kaomoji/bear': {
    es: { name: 'Kaomoji de Oso', title: 'Kaomojis de Oso ʕ •ᴥ•ʔ — Ositos Tiernos' },
    ja: { name: 'クマ顔文字', title: 'クマの顔文字 ʕ •ᴥ•ʔ — もこもこクマちゃん' },
    ko: { name: '곰 카오모지', title: '곰 카오모지 ʕ •ᴥ•ʔ — 포근한 곰돌이' }
  },
  'kaomoji/spider': {
    es: { name: 'Kaomoji de Araña', title: 'Kaomojis de Araña — Patas y Telaraña' },
    ja: { name: 'クモ顔文字', title: 'クモの顔文字 — 多足アスキーアート' },
    ko: { name: '거미 카오모지', title: '거미 카오모지 — 이색 텍스트 아트' }
  },
  'kaomoji/begging': {
    es: { name: 'Kaomoji Suplicando', title: 'Kaomojis Suplicando ༼ つ ◕_◕ ༽つ — Por Favor' },
    ja: { name: 'おねだり顔文字', title: 'お願い顔文字 ༼ つ ◕_◕ ༽つ — おねだり・頼み込む' },
    ko: { name: '부탁 카오모지', title: '간청하는 카오모지 ༼ つ ◕_◕ ༽つ — 제발 이모티콘' }
  },
  'kaomoji/determined': {
    es: { name: 'Kaomoji Decidido', title: 'Kaomojis de Determinación (ง •̀_•́)ง — Voluntad Fuerte' },
    ja: { name: 'やる気顔文字', title: '決意・やる気顔文字 (ง •̀_•́)ง — ガンバるぞ' },
    ko: { name: '결의 카오모지', title: '결의에 찬 카오모지 (ง •̀_•́)ง — 파이팅 모드' }
  },
  'kaomoji/dancing': {
    es: { name: 'Kaomoji Bailando', title: 'Kaomojis Bailando ヽ(>∀<☆)ノ — Fiesta y Ritmo' },
    ja: { name: 'ダンス顔文字', title: 'ダンス顔文字 ヽ(>∀<☆)ノ — 踊る・ノリノリ' },
    ko: { name: '춤추는 카오모지', title: '춤추는 카오모지 ヽ(>∀<☆)ノ — 둠칫둠칫 신남' }
  },
  'kaomoji/sleepy': {
    es: { name: 'Kaomoji Dormilón', title: 'Kaomojis con Sueño (人-ω-)ﾟ*｡☆ — Buenas Noches' },
    ja: { name: 'おやすみ顔文字', title: 'すやすや顔文字 (人-ω-)ﾟ*｡☆ — 睡眠・いい夢を' },
    ko: { name: '꿈나라 카오모지', title: '꿈나라 카오모지 (人-ω-)ﾟ*｡☆ — 잘 자요 이모티콘' }
  },
  'kaomoji/sparkle': {
    es: { name: 'Kaomoji Brillante', title: 'Kaomojis con Brillo (★ω★) — Ojos de Estrella' },
    ja: { name: '星目顔文字', title: 'キラキラ顔文字 (★ω★) — キラめき・ワクワク' },
    ko: { name: '반짝 카오모지', title: '반짝반짝 카오모지 (★ω★) — 초롱초롱 눈망울' }
  },

  // emoticons
  'emoticons/smiley': {
    es: { name: 'Smiley Clásico', title: 'Emoticones Smiley :-) — Sonrisas Retro' },
    ja: { name: 'スマイリー絵文字', title: 'スマイリー絵文字 :-) — 定番アスキーアート' },
    ko: { name: '스마일리 이모티콘', title: '스마일리 이모티콘 :-) — 클래식 미소' }
  },
  'emoticons/winky': {
    es: { name: 'Guiño Clásico', title: 'Emoticones con Guiño ;-) — Coqueteo Retro' },
    ja: { name: 'ウインク絵文字', title: 'ウインク絵文字 ;-) — お茶目スマイル' },
    ko: { name: '윙크 이모티콘', title: '윙크 이모티콘 ;-) — 센스 만점 눈인사' }
  },
  'emoticons/laughing': {
    es: { name: 'Risa a Carcajadas', title: 'Emoticones Riendo :-D — Risas y Carcajadas' },
    ja: { name: '大笑い絵文字', title: '大笑い絵文字 :-D — 爆笑・笑顔アスキーアート' },
    ko: { name: '박장대소 이모티콘', title: '박장대소 이모티콘 :-D — 함박웃음 복사' }
  },
  'emoticons/sad': {
    es: { name: 'Tristeza Clásica', title: 'Emoticones Tristes :-( — Boca Hacia Abajo' },
    ja: { name: '悲しみ絵文字', title: '悲しい絵文字 :-( — 定番しょんぼりマーク' },
    ko: { name: '슬픈 스마일리', title: '슬픈 스마일리 :-( — 실망과 아쉬움' }
  },
  'emoticons/mad': {
    es: { name: 'Enojo Clásico', title: 'Emoticones Furiosos >:-( — Cara de Rabia' },
    ja: { name: '激怒絵文字', title: '怒り絵文字 >:-( — 眉間にシワのアスキー絵文字' },
    ko: { name: '화난 스마일리', title: '화난 스마일리 >:-( — 뿔난 표정 복사' }
  },
  'emoticons/kissy': {
    es: { name: 'Beso con Trompita', title: 'Emoticones de Beso :-* — Besos con Afecto' },
    ja: { name: 'キス絵文字', title: 'キス絵文字 :-* — 愛情たっぷりのキスマーク' },
    ko: { name: '키스 이모티콘', title: '키스 이모티콘 :-* — 달콤한 쪽 쪽' }
  },
  'emoticons/heart': {
    es: { name: 'Corazón Clásico', title: 'Emoticones de Corazón <3 — Amor de Texto' },
    ja: { name: 'ハート絵文字', title: 'ハート絵文字 <3 — クラシックなテキストハート' },
    ko: { name: '하트 기호 <3', title: '하트 이모티콘 <3 — 클래식 텍스트 사랑' }
  },
  'emoticons/cute': {
    es: { name: 'Ternura con Bigotitos', title: 'Emoticones Tiernos :-3 — Boquita Dulce' },
    ja: { name: 'かわいい絵文字', title: 'かわいい絵文字 :-3 — ねこ口スマイリー' },
    ko: { name: '귀요미 이모티콘', title: '귀요미 이모티콘 :-3 — 고양이 입술 미소' }
  },
  'emoticons/creepy': {
    es: { name: 'Sorpresa / Escalofriante', title: 'Emoticones con Boca Abierta :-O — Asombro' },
    ja: { name: 'びっくり絵文字', title: 'びっくり口絵文字 :-O — 驚き・ポカーン' },
    ko: { name: '입 쩍 이모티콘', title: '입 벌린 이모티콘 :-O — 깜놀 표정' }
  },

  // symbols
  'symbols/heart': {
    es: { name: 'Símbolos de Corazón', title: 'Símbolos de Corazón ♡ ♥ — Amor y Romance' },
    ja: { name: 'ハート記号', title: 'ハート記号 ♡ ♥ — かわいい特殊文字コピペ' },
    ko: { name: '하트 특수문자', title: '하트 특수문자 ♡ ♥ — 인스타 감성 기호' }
  },
  'symbols/star': {
    es: { name: 'Símbolos de Estrella', title: 'Símbolos de Estrella ★ ☆ ✦ — Brillo Celestial' },
    ja: { name: '星の記号', title: '星の記号 ★ ☆ ✦ — キラめくスター記号集' },
    ko: { name: '별 특수문자', title: '별 특수문자 ★ ☆ ✦ — 반짝이는 별표 기호' }
  },
  'symbols/sparkle': {
    es: { name: 'Símbolos de Brillo', title: 'Símbolos de Brillo ✦ ✧ — Destellos Mágicos' },
    ja: { name: 'キラキラ記号', title: 'キラキラ記号 ✦ ✧ — 輝きテキストシンボル' },
    ko: { name: '반짝이 기호', title: '반짝이 특수기호 ✦ ✧ — 감성 반짝임 모음' }
  },
  'symbols/flower': {
    es: { name: 'Símbolos de Flor', title: 'Símbolos de Flor ✿ ❀ — Flores de Texto' },
    ja: { name: '花の記号', title: '花の記号 ✿ ❀ — かわいいフラワー特殊文字' },
    ko: { name: '꽃 특수문자', title: '꽃 특수기호 ✿ ❀ — 봄날의 감성 꽃 기호' }
  },
  'symbols/moon': {
    es: { name: 'Símbolos de Luna', title: 'Símbolos de Luna ☾ ☽ — Fases Lunares Estéticas' },
    ja: { name: '月の記号', title: '月の記号 ☾ ☽ — 三日月・月齢特殊文字' },
    ko: { name: '달 특수문자', title: '달 특수기호 ☾ ☽ — 초승달·밤하늘 감성' }
  },
  'symbols/skull': {
    es: { name: 'Símbolos de Calavera', title: 'Símbolos de Calavera ☠ 💀 — Estilo Gótico' },
    ja: { name: 'ドクロ記号', title: 'ドクロ記号 ☠ 💀 — スカル・ゴシック特殊文字' },
    ko: { name: '해골 특수기호', title: '해골 특수기호 ☠ 💀 — 고딕 펑크 스타일' }
  },
  'symbols/crown': {
    es: { name: 'Símbolos de Corona', title: 'Símbolos de Corona 👑 ♔ — Realeza y Éxito' },
    ja: { name: '王冠の記号', title: '王冠記号 👑 ♔ — クラウン・キングテキスト' },
    ko: { name: '왕관 특수문자', title: '왕관 특수기호 👑 ♔ — 로열 감성 기호' }
  },
  'symbols/weapons': {
    es: { name: 'Símbolos de Armas', title: 'Símbolos de Armas y Espadas ⚔ 🗡 — Batalla' },
    ja: { name: '武器・剣の記号', title: '武器・剣の記号 ⚔ 🗡 — クロスソード' },
    ko: { name: '무기·칼 기호', title: '무기·검 특수기호 ⚔ 🗡 — 배틀 심볼' }
  },
  'symbols/bow': {
    es: { name: 'Símbolos de Arco', title: 'Símbolos de Arco y Flecha 🏹 ➶ — Precisión' },
    ja: { name: '弓矢の記号', title: '弓矢の記号 🏹 ➶ — キューピッドの矢' },
    ko: { name: '활과 화살 기호', title: '활과 화살 기호 🏹 ➶ — 큐피트의 화살' }
  },
  'symbols/music': {
    es: { name: 'Símbolos Musicales', title: 'Símbolos de Música ♫ ♬ ♩ — Notas Musicales' },
    ja: { name: '音符記号', title: '音符記号 ♫ ♬ ♩ — メロディー・音楽テキスト' },
    ko: { name: '음표 특수문자', title: '음표 특수기호 ♫ ♬ ♩ — 멜로디 음악 기호' }
  },
  'symbols/butterfly': {
    es: { name: 'Símbolos de Mariposa', title: 'Símbolos de Mariposa 🦋 ᠊ — Estética Suave' },
    ja: { name: '蝶の記号', title: '蝶の記号 🦋 ᠊ — バタフライ装飾' },
    ko: { name: '나비 특수기호', title: '나비 특수기호 🦋 ᠊ — 몽환적 감성 기호' }
  },
  'symbols/fire': {
    es: { name: 'Símbolos de Fuego', title: 'Símbolos de Fuego 🔥 𓏲 — Llamas y Energía' },
    ja: { name: '炎の記号', title: '炎の記号 🔥 𓏲 — ファイヤー・情熱シンボル' },
    ko: { name: '불꽃 특수기호', title: '불꽃 특수기호 🔥 𓏲 — 핫한 열정 기호' }
  },
  'symbols/snowflake': {
    es: { name: 'Símbolos de Copo de Nieve', title: 'Símbolos de Nieve ❄ ❅ — Invierno Mágico' },
    ja: { name: '雪の結晶記号', title: '雪の結晶記号 ❄ ❅ — スノーフレーク' },
    ko: { name: '눈꽃 특수문자', title: '눈꽃 특수기호 ❄ ❅ — 겨울 왕국 감성' }
  },
  'symbols/sun': {
    es: { name: 'Símbolos de Sol', title: 'Símbolos de Sol ☼ ☀ — Luz y Calidez' },
    ja: { name: '太陽の記号', title: '太陽の記号 ☼ ☀ — サンシャイン・明るい' },
    ko: { name: '햇살 특수문자', title: '태양 특수기호 ☼ ☀ — 따스한 햇빛' }
  },
  'symbols/check-mark': {
    es: { name: 'Símbolos de Check', title: 'Símbolos de Check ✔ ☑ — Palomitas de Verificación' },
    ja: { name: 'チェックマーク記号', title: 'チェックマーク記号 ✔ ☑ — 確認・完了' },
    ko: { name: '체크표시 기호', title: '체크표시 특수문자 ✔ ☑ — 확인 완료' }
  },
  'symbols/bullet-point': {
    es: { name: 'Puntos de Lista', title: 'Símbolos de Puntos • ◦ — Separadores de Texto' },
    ja: { name: '箇条書き記号', title: '箇条書き丸記号 • ◦ — リスト用ビュレット' },
    ko: { name: '글머리 기호', title: '글머리 기호 • ◦ — 깔끔한 목록 정렬' }
  },
  'symbols/cross': {
    es: { name: 'Símbolos de Cruz', title: 'Símbolos de Cruz ✞ ✟ — Cruces Estéticas' },
    ja: { name: '十字架記号', title: '十字架記号 ✞ ✟ — クロス・ゴシック' },
    ko: { name: '십자가 특수문자', title: '십자가 특수기호 ✞ ✟ — 고딕 십자가' }
  },
  'symbols/arrow': {
    es: { name: 'Símbolos de Flecha', title: 'Símbolos de Flecha ➔ ➜ — Flechas Decorativas' },
    ja: { name: '矢印記号', title: '矢印記号 ➔ ➜ — アロー・方向シンボル' },
    ko: { name: '화살표 특수기호', title: '화살표 특수문자 ➔ ➜ — 방향 지시 기호' }
  },

  // aesthetic
  'aesthetic/discord-bio': {
    es: { name: 'Biografías para Discord', title: 'Biografías Estéticas para Discord ⋆ ˚｡⋆୨୧˚ — Plantillas' },
    ja: { name: 'ディスコード用バイオ', title: 'Discord用プロフィール装飾 ⋆ ˚｡⋆୨୧˚ — テンプレート' },
    ko: { name: '디스코드 소개글', title: '디스코드 감성 프로필 ⋆ ˚｡⋆୨୧˚ — 템플릿 모음' }
  },
  'aesthetic/instagram-bio': {
    es: { name: 'Biografías para Instagram', title: 'Biografías para Instagram ˗ˏˋ ★ ˎˊ˗ — Ideas Estéticas' },
    ja: { name: 'インスタ用バイオ', title: 'Instagram用バイオ ˗ˏˋ ★ ˎˊ˗ — おしゃれテキスト' },
    ko: { name: '인스타 소개글', title: '인스타그램 감성 바이오 ˗ˏˋ ★ ˎˊ˗ — 예쁜 글씨체' }
  },
  'aesthetic/tiktok-bio': {
    es: { name: 'Biografías para TikTok', title: 'Biografías para TikTok ♡ — Estados Estéticos' },
    ja: { name: 'TikTok用バイオ', title: 'TikTok用プロフィール ♡ — かわいい装飾' },
    ko: { name: '틱톡 소개글', title: '틱톡 프로필 바이오 ♡ — 감성 상태메시지' }
  },
  'aesthetic/dividers': {
    es: { name: 'Separadores de Texto', title: 'Separadores de Línea Estéticos ─── ⋆⋅☆⋅⋆ ─── — Copiar' },
    ja: { name: '飾り罫線・仕切り', title: 'おしゃれな飾り罫線 ─── ⋆⋅☆⋅⋆ ─── — コピペ用' },
    ko: { name: '텍스트 구분선', title: '감성 텍스트 구분선 ─── ⋆⋅☆⋅⋆ ─── — 깔끔한 분리선' }
  },
  'aesthetic/borders': {
    es: { name: 'Marcos y Bordes', title: 'Bordes y Marcos Estéticos ╔═══*.·:·.☽✧ — Decoración' },
    ja: { name: 'デザイン枠線', title: 'おしゃれなデザイン枠線 ╔═══*.·:·.☽✧ — フレーム集' },
    ko: { name: '텍스트 프레임', title: '감성 텍스트 프레임 액자 ╔═══*.·:·.☽✧ — 테두리 장식' }
  },
  'aesthetic/emoji-combos': {
    es: { name: 'Combos de Emojis', title: 'Combinaciones de Emojis Estéticos ೀ ִֶָ 𓂃 ࣪˖ — Copiar' },
    ja: { name: '絵文字の組み合わせ', title: 'おしゃれ絵文字コンボ ೀ ִֶָ 𓂃 ࣪˖ — コピペまとめ' },
    ko: { name: '감성 이모지 조합', title: '예쁜 감성 이모지 조합 ೀ ִֶָ 𓂃 ࣪˖ — 분위기 뿜뿜' }
  },
  'aesthetic/bio-templates': {
    es: { name: 'Plantillas de Perfil', title: 'Plantillas para Biografía ⋆｡°✩ — Listas para Rellenar' },
    ja: { name: 'バイオテンプレート', title: 'プロフィール用テンプレート ⋆｡°✩ — 入力するだけ' },
    ko: { name: '바이오 서식 템플릿', title: '프로필 작성용 바이오 템플릿 ⋆｡°✩ — 간편 완성' }
  },
  'aesthetic/symbols': {
    es: { name: 'Símbolos Estéticos', title: 'Símbolos Estéticos ִֶָ 𓂃 ࣪˖ — Caracteres Delicados' },
    ja: { name: 'エモい特殊記号', title: 'エモい特殊記号 ִֶָ 𓂃 ࣪˖ — 儚げテキストアート' },
    ko: { name: '감성 특수기호 모음', title: '여리여리 감성 특수기호 ִֶָ 𓂃 ࣪˖ — 인기 심볼' }
  }
};

module.exports = {
  LANGUAGES,
  UI_STRINGS,
  HOMEPAGE_I18N,
  LENNY_SUBPAGES_I18N,
  HUBS_I18N,
  SUBPAGES_I18N
};
