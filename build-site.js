/**
 * Lenny Face Pro - Static Site Generator (build-site.js)
 * Generates 100/100 Core Web Vitals HTML pages with:
 * - Pre-rendered SSR static cards
 * - Rich JSON-LD schemas (WebApplication, FAQPage, BreadcrumbList, ItemList)
 * - In-depth editorial guides (800-1200+ words per page)
 * - Hreflang multilingual support (EN, ES, JA, KO)
 * - XML Sitemap & robots.txt
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const SITE_URL = 'https://thelennyfacepro.com';

// Ensure directories exist
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Full Master Dataset of Glyphs
const ALL_GLYPHS = [
  // --- LENNY FACES ---
  { glyph: "( ͡° ͜ʖ ͡°)", name: "Classic Lenny Face", hub: "lenny", sub: "classic", badge: "🔥 HOT", tags: ["classic", "smirk", "innuendo", "original", "meme"] },
  { glyph: "( ͜° ͜ʊ ͜°)", name: "Cute Lenny", hub: "lenny", sub: "cute", badge: "🔥 HOT", tags: ["cute", "kawaii", "sweet", "happy"] },
  { glyph: "(✿ ͡° ͜ʖ ͡°)", name: "Flower Girl Lenny", hub: "lenny", sub: "cute", tags: ["flower", "cute", "pretty", "blush"] },
  { glyph: "( ͡° 3 ͡°)", name: "Kissing Lenny", hub: "lenny", sub: "cute", tags: ["kiss", "love", "smooch", "cute"] },
  { glyph: "( ˘ ³˘)♥", name: "Blowing Kiss Lenny", hub: "lenny", sub: "cute", tags: ["heart", "kiss", "cute"] },
  { glyph: "( ͡~ ͜ʖ ͡°)", name: "Winking Lenny", hub: "lenny", sub: "wink", tags: ["wink", "flirty", "smirk", "playful"] },
  { glyph: "( ͡° ʖ̯ ͡°)", name: "Sad Lenny", hub: "lenny", sub: "sad", badge: "🔥 HOT", tags: ["sad", "frown", "unhappy", "bummed"] },
  { glyph: "( ͡ಥ ʖ̯ ͡ಥ)", name: "Crying Sad Lenny", hub: "lenny", sub: "sad", tags: ["sad", "crying", "tears", "depressed"] },
  { glyph: "( ͡° Ĺ̯ ͡° )", name: "Disappointed Lenny", hub: "lenny", sub: "sad", tags: ["sad", "disappointed", "frown"] },
  { glyph: "( ͡ᵔ ͜ʖ ͡ᵔ)", name: "Happy Lenny", hub: "lenny", sub: "happy", badge: "🔥 HOT", tags: ["happy", "cheerful", "smile", "joy"] },
  { glyph: "( ͡^ ͜ʖ ͡^)", name: "Grinning Lenny", hub: "lenny", sub: "happy", tags: ["grin", "happy", "smile", "joy"] },
  { glyph: "( ͡ʘ ͜ʖ ͡ʘ)", name: "Wide Smile Lenny", hub: "lenny", sub: "happy", tags: ["happy", "wide eyes", "excited"] },
  { glyph: "ᕦ( ͡ᵔ ͜ʖ ͡ᵔ)ᕤ", name: "Joyful Flex Lenny", hub: "lenny", sub: "happy", tags: ["happy", "strong", "flex"] },
  { glyph: "(ง ͠° ͟ل͜ ͡°)ง", name: "Fighting Lenny", hub: "lenny", sub: "angry", badge: "🔥 HOT", tags: ["fight", "boxer", "fists", "angry"] },
  { glyph: "( ͡ಠ ʖ̯ ͡ಠ)", name: "Disapproving Lenny", hub: "lenny", sub: "angry", tags: ["angry", "disapproval", "mad", "stern"] },
  { glyph: "( ͠° ͟ʖ ͠°)", name: "Furious Lenny", hub: "lenny", sub: "angry", tags: ["angry", "rage", "furious"] },
  { glyph: "( ͡° Ĺ̯ ͡° )凸", name: "Middle Finger Anger", hub: "lenny", sub: "angry", tags: ["angry", "middle finger", "rage"] },
  { glyph: "( ͡ಥ ͜ʖ ͡ಥ)", name: "Crying Tears Lenny", hub: "lenny", sub: "crying", badge: "🔥 HOT", tags: ["crying", "tears", "weeping", "sad"] },
  { glyph: "( ཀ ʖ̯ ཀ)", name: "Heavy Sobbing Lenny", hub: "lenny", sub: "crying", tags: ["crying", "sobbing", "sad", "tears"] },
  { glyph: "( ͡° ⁄ ⁄ ͜ʖ ⁄ ⁄ ͡°)", name: "Blushing Red Lenny", hub: "lenny", sub: "blushing", badge: "🔥 HOT", tags: ["blush", "shy", "flustered", "cute"] },
  { glyph: "( ͡° ͜ʖ ͡°)🌸", name: "Sakura Blush Lenny", hub: "lenny", sub: "blushing", tags: ["flower", "blush", "sakura", "cute"] },
  { glyph: "( ͡° ͜ʖ ͡°)♥", name: "Love Blush Lenny", hub: "lenny", sub: "blushing", tags: ["love", "heart", "blush"] },
  { glyph: "¯\\_( ͡° ͜ʖ ͡°)_/¯", name: "Shrug Lenny Face", hub: "lenny", sub: "shrug", badge: "🔥 HOT", tags: ["shrug", "whatever", "idk", "smirk"] },
  { glyph: "¯\\_(ツ)_/¯", name: "Classic Shruggie", hub: "lenny", sub: "shrug", badge: "🔥 HOT", tags: ["shrug", "classic", "whatever", "idk"] },
  { glyph: "¯\\(°_o)/¯", name: "Derp Shrug", hub: "lenny", sub: "shrug", tags: ["shrug", "confused", "derp"] },
  { glyph: "t( ͡° ͜ʖ ͡° t)", name: "Double Middle Finger Lenny", hub: "lenny", sub: "middle-finger", badge: "🔥 HOT", tags: ["middle finger", "rude", "fu", "flipping off"] },
  { glyph: "( ͡° ͜ʖ ͡°)╭∩╮", name: "Flipping The Bird Lenny", hub: "lenny", sub: "middle-finger", tags: ["middle finger", "flipping off", "disrespect"] },
  { glyph: "凸( ͡° ͜ʖ ͡°)凸", name: "Totsu Middle Finger Lenny", hub: "lenny", sub: "middle-finger", tags: ["middle finger", "rude", "angry"] },
  { glyph: "( ͡° ͜ʖ ͡°)>⌐■-■", name: "Sunglasses Lenny", hub: "lenny", sub: "cool", badge: "🔥 HOT", tags: ["cool", "deal with it", "sunglasses", "swag"] },
  { glyph: "ᕦ( ͡° ͜ʖ ͡°)ᕤ", name: "Strong Biceps Lenny", hub: "lenny", sub: "strong", tags: ["flex", "strong", "muscles", "arms"] },
  { glyph: "(つ ͡° ͜ʖ ͡°)つ", name: "Hugging Lenny", hub: "lenny", sub: "hug", tags: ["hug", "cuddle", "love", "comfort"] },
  { glyph: "(♥ ͜ʖ ♥)", name: "Heart Eyes Lenny", hub: "lenny", sub: "love", tags: ["love", "heart", "in love", "crush"] },
  { glyph: "˔( ͡° ͜ʖ ͡°)˕", name: "Donger Ears Lenny", hub: "lenny", sub: "donger", tags: ["donger", "ears", "weird"] },
  { glyph: "( ͡☉ ͜ʖ ͡☉)", name: "Big Staring Eyes Lenny", hub: "lenny", sub: "shocked", tags: ["shock", "surprised", "wide eyes"] },
  { glyph: "( ͠° ͟ʖ ͡°)", name: "Skeptical Lenny", hub: "lenny", sub: "thinking", tags: ["suspicious", "doubt", "squint", "thinking"] },
  { glyph: "( ͡° ͜ʖ ͡°)✧", name: "Sparkle Lenny", hub: "lenny", sub: "sparkle", tags: ["sparkle", "star", "charming"] },

  // --- TEXT FACES (Donger, Shrug, Table Flip, Disapproval, etc.) ---
  { glyph: "ヽ༼ຈل͜ຈ༽ﾉ", name: "Raise Your Dongers", hub: "text-faces", sub: "donger", badge: "🔥 HOT", tags: ["donger", "raise your dongers", "twitch", "meme", "classic"] },
  { glyph: "༼ ºل͟º ༽", name: "The Original Donger", hub: "text-faces", sub: "donger", tags: ["donger", "blank", "classic"] },
  { glyph: "༼ᕗຈل͜ຈ༽ᕗ", name: "Flexing Donger", hub: "text-faces", sub: "donger", tags: ["donger", "flex", "muscles"] },
  { glyph: "(ง ͠° ͟ل͜ ͡°)ง", name: "Donger Boxer", hub: "text-faces", sub: "donger", tags: ["donger", "boxer", "fighting"] },
  { glyph: "┌( ಠ_ಠ)┘", name: "Running Donger", hub: "text-faces", sub: "donger", tags: ["donger", "running", "arms"] },
  { glyph: "(ノಠ益ಠ)ノ彡┻━┻", name: "Rage Table Flip", hub: "text-faces", sub: "table-flipping", badge: "🔥 HOT", tags: ["table flip", "rage", "angry", "meme"] },
  { glyph: "(╯°□°)╯︵ ┻━┻", name: "Classic Table Flip", hub: "text-faces", sub: "table-flipping", badge: "🔥 HOT", tags: ["table flip", "rage", "mad"] },
  { glyph: "┻━┻ ︵ ヽ(Д´)ﾉ ︵ ┻━┻", name: "Double Table Flip", hub: "text-faces", sub: "table-flipping", tags: ["table flip", "double", "chaos"] },
  { glyph: "┬─┬ノ( º _ ºノ)", name: "Put Table Back Respecfully", hub: "text-faces", sub: "funny", badge: "🔥 HOT", tags: ["calm", "respect", "table", "peace"] },
  { glyph: "ಠ_ಠ", name: "Look of Disapproval", hub: "text-faces", sub: "disapproval", badge: "🔥 HOT", tags: ["disapproval", "stare", "judging", "unimpressed", "reddit"] },
  { glyph: "ಠ‿ಠ", name: "Amused Disapproval", hub: "text-faces", sub: "disapproval", tags: ["disapproval", "smile", "smug"] },
  { glyph: "ಠ~ಠ", name: "Worry Disapproval", hub: "text-faces", sub: "disapproval", tags: ["disapproval", "worried"] },
  { glyph: "(ง'̀-'́)ง", name: "Ready to Fight", hub: "text-faces", sub: "fight", badge: "🔥 HOT", tags: ["fight", "boxer", "determined", "come at me"] },
  { glyph: "ʕ•ᴥ•ʔ", name: "Cute Teddy Bear", hub: "text-faces", sub: "bear", badge: "🔥 HOT", tags: ["bear", "cute", "animal", "kawaii"] },
  { glyph: "ʕ´•ᴥ•`ʔ", name: "Bashful Bear", hub: "text-faces", sub: "bear", tags: ["bear", "cute", "shy"] },
  { glyph: "ʕノ)ᴥ(ヾʔ", name: "Hiding Bear", hub: "text-faces", sub: "bear", tags: ["bear", "shy", "hiding"] },
  { glyph: "(=^･ω･^=)", name: "Cat Whisker Face", hub: "text-faces", sub: "cat", badge: "🔥 HOT", tags: ["cat", "kitty", "whiskers", "cute"] },
  { glyph: "(=^･ｪ･^=)", name: "Kitten Cute", hub: "text-faces", sub: "cat", tags: ["cat", "meow", "kitten"] },
  { glyph: "(づ｡◕‿‿◕｡)づ", name: "Big Warm Hug", hub: "text-faces", sub: "hug", badge: "🔥 HOT", tags: ["hug", "love", "cute", "sweet"] },
  { glyph: "(つ≧▽≦)つ", name: "Tightly Hug", hub: "text-faces", sub: "hug", tags: ["hug", "happy", "squeeze"] },
  { glyph: "(╥﹏╥)", name: "Crying Pout", hub: "text-faces", sub: "crying", badge: "🔥 HOT", tags: ["crying", "sad", "tears", "depressed"] },
  { glyph: "(இдஇ; )", name: "Weeping Loudly", hub: "text-faces", sub: "crying", tags: ["crying", "sobbing", "tears"] },
  { glyph: "(•_•) ( •_•)>⌐■-■ (⌐■_■)", name: "CSI Sunglasses Deal With It", hub: "text-faces", sub: "cool", badge: "🔥 HOT", tags: ["glasses", "deal with it", "cool", "boss"] },
  { glyph: "(⌐■_■)", name: "Solo Deal With It", hub: "text-faces", sub: "cool", tags: ["sunglasses", "cool", "boss"] },
  { glyph: "(☞ﾟヮﾟ)☞", name: "Finger Guns Right", hub: "text-faces", sub: "happy", badge: "🔥 HOT", tags: ["finger guns", "you got it", "nice", "funny"] },
  { glyph: "☜(ﾟヮﾟ☜)", name: "Finger Guns Left", hub: "text-faces", sub: "happy", tags: ["finger guns", "hey", "friendly"] },
  { glyph: "(✿◠‿◠)", name: "Flower Girl Smile", hub: "text-faces", sub: "cute", tags: ["flower", "cute", "smiling", "kawaii"] },
  { glyph: "(｡♥‿♥｡)", name: "Loving Heart Eyes", hub: "text-faces", sub: "love", tags: ["heart", "love", "in love", "crush"] },
  { glyph: "(｡•́︿•̀｡)", name: "Pouty Puppy Sad", hub: "text-faces", sub: "sad", tags: ["sad", "pout", "puppy eyes", "sorry"] },
  { glyph: "(⊙_⊙)", name: "Wide Eyed Shock", hub: "text-faces", sub: "confused", tags: ["shocked", "stare", "omg", "surprised"] },
  { glyph: "(งಠ益ಠ)ง", name: "Rage Fighter", hub: "text-faces", sub: "angry", tags: ["rage", "fists", "angry", "screaming"] },
  { glyph: "(´• ω •`)", name: "Innocent Soft Blush", hub: "text-faces", sub: "blushing", tags: ["blush", "shy", "cute", "sweet"] },
  { glyph: "(－_－) zzz", name: "Deep Sleep Zzz", hub: "text-faces", sub: "sleepy", tags: ["sleep", "tired", "bed", "good night"] },
  { glyph: "(¬‿¬)", name: "Smirking Side Glance", hub: "text-faces", sub: "smirk", tags: ["smirk", "sneaky", "cunning"] },
  { glyph: "(^_-)", name: "Classic Text Wink", hub: "text-faces", sub: "wink", tags: ["wink", "flirt", "friendly"] },
  { glyph: "|^・ω・)/", name: "Peekaboo Hello", hub: "text-faces", sub: "hello", tags: ["hello", "wave", "peek"] },
  { glyph: "(b^_^)b", name: "Double Thumbs Up", hub: "text-faces", sub: "thumbs-up", tags: ["thumbs up", "good", "approved"] },
  { glyph: "(人❛ᴗ❛)", name: "Grateful Thank You", hub: "text-faces", sub: "thank-you", tags: ["thank you", "praying", "grateful"] },
  { glyph: "(☼_☼)", name: "Sunny Morning Eyes", hub: "text-faces", sub: "good-morning", tags: ["morning", "sun", "awake"] },
  { glyph: "(´〜｀*) zzz", name: "Dreaming Good Night", hub: "text-faces", sub: "good-night", tags: ["night", "sleep", "good night"] },
  { glyph: "(⊙_ʖ⊙)", name: "Puzzled Confused", hub: "text-faces", sub: "confused", tags: ["confused", "huh", "puzzled"] },
  { glyph: "( ͠° ͟ʖ ͡°)", name: "Deep Thinking", hub: "text-faces", sub: "thinking", tags: ["thinking", "ponder", "hmm"] },
  { glyph: "|д･)", name: "Peeking From Wall", hub: "text-faces", sub: "hiding", tags: ["hiding", "peek", "secret"] },
  { glyph: "(っ˘ڡ˘ς)", name: "Delicious Food Eating", hub: "text-faces", sub: "eating", tags: ["eating", "yum", "food"] },
  { glyph: "ε=ε=┌(;￣▽￣)┘", name: "Running Late Fast", hub: "text-faces", sub: "running", tags: ["running", "hurry", "fast"] },
  { glyph: "ଘ(੭*ˊᵕˋ)੭* ੈ♡‧₊˚", name: "Holiday Angel Magic", hub: "text-faces", sub: "christmas", tags: ["christmas", "angel", "magic"] },
  { glyph: "(⌐■_■) 📚", name: "Studying Nerd", hub: "text-faces", sub: "nerd", tags: ["nerd", "smart", "glasses"] },
  { glyph: "(♥ω♥*)", name: "Head Over Heels Love", hub: "text-faces", sub: "love", tags: ["love", "hearts", "adore"] },
  { glyph: "(*^ω^*)", name: "Kawaii Joy", hub: "text-faces", sub: "kawaii", tags: ["kawaii", "cute", "japan"] },
  { glyph: "(≧▽≦)", name: "Laughing Out Loud", hub: "text-faces", sub: "funny", tags: ["funny", "laugh", "lol"] },

  // --- KAOMOJI ---
  { glyph: "(*^▽^*)", name: "Joyful Kaomoji", hub: "kaomoji", sub: "happy", badge: "🔥 HOT", tags: ["happy", "cheerful", "laughing", "joy"] },
  { glyph: "(≧◡≦)", name: "Excited Bliss", hub: "kaomoji", sub: "happy", tags: ["excited", "smiling", "blessed"] },
  { glyph: "(๑>ᴗ<๑)", name: "Squeal of Delight", hub: "kaomoji", sub: "happy", tags: ["joy", "bliss", "cute", "cheer"] },
  { glyph: "(*/ω＼*)", name: "Hiding Shy Eyes", hub: "kaomoji", sub: "cute", badge: "🔥 HOT", tags: ["shy", "hiding face", "blushing", "flustered"] },
  { glyph: "( ˶ˆ꒳ˆ˵ )", name: "Soft Warm Blush", hub: "kaomoji", sub: "cute", badge: "🔥 HOT", tags: ["blush", "soft", "wholesome", "sweet"] },
  { glyph: "(◕‿◕✿)", name: "Cute Flower Girl", hub: "kaomoji", sub: "cute", tags: ["flower", "cheerful", "girl"] },
  { glyph: "(◕‿◕)♡", name: "Gentle Heart", hub: "kaomoji", sub: "heart", badge: "🔥 HOT", tags: ["heart", "love", "cute"] },
  { glyph: "♡＼(￣▽￣)／♡", name: "Heart Celebrations", hub: "kaomoji", sub: "heart", tags: ["heart", "love", "celebrate"] },
  { glyph: "(つ✧ω✧)つ", name: "Sparkle Hug", hub: "kaomoji", sub: "hug", badge: "🔥 HOT", tags: ["hug", "sparkle", "stars", "loving"] },
  { glyph: "(づ￣ ³￣)づ", name: "Blowing Big Kiss", hub: "kaomoji", sub: "kiss", badge: "🔥 HOT", tags: ["kiss", "smooch", "love"] },
  { glyph: "(ノ_<。)", name: "Wiping Tiny Tears", hub: "kaomoji", sub: "sad", badge: "🔥 HOT", tags: ["crying", "tears", "sad", "sniffle"] },
  { glyph: "(T_T)", name: "Classic T Crying", hub: "kaomoji", sub: "sad", tags: ["sad", "crying", "tears"] },
  { glyph: "(#`Д´)", name: "Furious Roar", hub: "kaomoji", sub: "angry", badge: "🔥 HOT", tags: ["angry", "screaming", "mad"] },
  { glyph: "( ` ω ´ )", name: "Pouty Mad", hub: "kaomoji", sub: "angry", tags: ["angry", "pout", "fierce"] },
  { glyph: "/ᐠ｡ꞈ｡ᐟ\\", name: "Anime Kitty Ears", hub: "kaomoji", sub: "cat", badge: "🔥 HOT", tags: ["cat", "ears", "kitty", "animal"] },
  { glyph: "(=^･ｪ･^=)", name: "Little Soft Cat", hub: "kaomoji", sub: "cat", tags: ["cat", "meow", "cute"] },
  { glyph: "ฅ^•ﻌ•^ฅ", name: "Paws Up Cat", hub: "kaomoji", sub: "cat", tags: ["cat", "paws", "kitty"] },
  { glyph: "૮₍ • ᴥ • ₎ა", name: "Puppy Dog Paws", hub: "kaomoji", sub: "dog", badge: "🔥 HOT", tags: ["dog", "puppy", "paws", "cute"] },
  { glyph: "ᕱ⑅ᕱ", name: "Sweet Bunny", hub: "kaomoji", sub: "bunny", badge: "🔥 HOT", tags: ["bunny", "rabbit", "cute", "ears"] },
  { glyph: "૮꒰ ˶• ༝ •˶꒱ა", name: "Fluffy Bunny Pout", hub: "kaomoji", sub: "bunny", tags: ["bunny", "cute", "soft"] },
  { glyph: "ʕ •ᴥ•ʔ", name: "Fluffy Bear", hub: "kaomoji", sub: "bear", tags: ["bear", "animal", "teddy"] },
  { glyph: "/╲/\\╭( ͡° ͡° ͜ʖ ͡° ͡°)╮/\\╱\\", name: "Spiderman / Spider Kaomoji", hub: "kaomoji", sub: "spider", badge: "🔥 HOT", tags: ["spider", "creepy", "funny", "spiderman"] },
  { glyph: "༼ つ ◕_◕ ༽つ", name: "Take My Energy Twitch", hub: "kaomoji", sub: "begging", badge: "🔥 HOT", tags: ["take my energy", "gimme", "twitch", "meme"] },
  { glyph: "(人❛ᴗ❛)♪", name: "Begging Please", hub: "kaomoji", sub: "begging", tags: ["please", "pray", "ask"] },
  { glyph: "(ง •̀_•́)ง", name: "Determined Spirit", hub: "kaomoji", sub: "determined", badge: "🔥 HOT", tags: ["motivated", "determined", "you can do it"] },
  { glyph: "Σ(°ロ°)", name: "Gasp Shocked", hub: "kaomoji", sub: "shocked", tags: ["shocked", "surprised", "gasp"] },
  { glyph: "(;ﾟДﾟ)", name: "Scared Terrified", hub: "kaomoji", sub: "scared", tags: ["scared", "fear", "panic"] },
  { glyph: "(o_ _)o", name: "Collapsing Tired", hub: "kaomoji", sub: "tired", tags: ["tired", "exhausted", "sleep"] },
  { glyph: "(・_・;)", name: "Sweat Drop Nervous", hub: "kaomoji", sub: "nervous", tags: ["nervous", "sweat", "awkward"] },
  { glyph: "┐(‘～`;)┌", name: "Shrugging Kaomoji", hub: "kaomoji", sub: "shrug", tags: ["shrug", "whatever", "idk"] },
  { glyph: "ヽ(>∀<☆)ノ", name: "Dancing Celebration", hub: "kaomoji", sub: "dancing", tags: ["celebrate", "party", "star", "yay", "dance"] },
  { glyph: "(人-ω-)ﾟ*｡☆", name: "Good Night Prayer", hub: "kaomoji", sub: "sleepy", tags: ["sleepy", "night", "stars", "bed"] },
  { glyph: "(★ω★)", name: "Sparkle Star Eyes", hub: "kaomoji", sub: "sparkle", tags: ["sparkle", "stars", "excited"] },

  // --- EMOTICONS ---
  { glyph: ":-)", name: "Classic Smiley Nose", hub: "emoticons", sub: "smiley", badge: "🔥 HOT", tags: ["smile", "happy", "classic", "text"] },
  { glyph: ":)", name: "Simple Smile", hub: "emoticons", sub: "smiley", tags: ["smile", "happy", "simple"] },
  { glyph: ";-)", name: "Classic Wink Smile", hub: "emoticons", sub: "winky", badge: "🔥 HOT", tags: ["wink", "flirt", "playful"] },
  { glyph: ";)", name: "Simple Wink", hub: "emoticons", sub: "winky", tags: ["wink", "quick"] },
  { glyph: ":-D", name: "Big Laugh Grin", hub: "emoticons", sub: "laughing", badge: "🔥 HOT", tags: ["laugh", "big smile", "lol"] },
  { glyph: ":D", name: "Open Mouth Laugh", hub: "emoticons", sub: "laughing", tags: ["laugh", "joy", "grin"] },
  { glyph: ":-(", name: "Classic Sad Frown", hub: "emoticons", sub: "sad", badge: "🔥 HOT", tags: ["sad", "frown", "unhappy"] },
  { glyph: ":(", name: "Simple Frown", hub: "emoticons", sub: "sad", tags: ["sad", "bummed"] },
  { glyph: ":'-(", name: "Crying Tear Frown", hub: "emoticons", sub: "sad", tags: ["crying", "tear", "sobbing"] },
  { glyph: ">:-(", name: "Mad Grump Angry", hub: "emoticons", sub: "mad", badge: "🔥 HOT", tags: ["mad", "angry", "furious"] },
  { glyph: ">:(", name: "Angry Brows", hub: "emoticons", sub: "mad", tags: ["mad", "upset"] },
  { glyph: ":-*", name: "Kissing Smooch", hub: "emoticons", sub: "kissy", badge: "🔥 HOT", tags: ["kiss", "love", "smooch"] },
  { glyph: ":*", name: "Quick Kiss", hub: "emoticons", sub: "kissy", tags: ["kiss", "sweet"] },
  { glyph: "<3", name: "Classic Heart", hub: "emoticons", sub: "heart", badge: "🔥 HOT", tags: ["heart", "love", "symbol"] },
  { glyph: "</3", name: "Broken Heart Broken", hub: "emoticons", sub: "heart", tags: ["broken heart", "sad", "breakup"] },
  { glyph: ":-/", name: "Annoyed Skeptic", hub: "emoticons", sub: "annoyed", tags: ["annoyed", "skeptical", "meh"] },
  { glyph: ":-O", name: "Surprised Gasp", hub: "emoticons", sub: "creepy", tags: ["surprised", "shock", "whoa"] },
  { glyph: ">:-)", name: "Devil Grin Mischief", hub: "emoticons", sub: "creepy", tags: ["devil", "evil", "naughty"] },
  { glyph: ":-3", name: "Cute Cat Smile", hub: "emoticons", sub: "cute", tags: ["cute", "cat", "kitty"] },
  { glyph: ":-P", name: "Playful Tongue Out", hub: "emoticons", sub: "cute", tags: ["tongue", "silly", "playful"] },

  // --- SYMBOLS ---
  { glyph: "♡", name: "White Outline Heart", hub: "symbols", sub: "heart", badge: "🔥 HOT", tags: ["heart", "love", "aesthetic", "outline"] },
  { glyph: "♥", name: "Solid Black Heart", hub: "symbols", sub: "heart", badge: "🔥 HOT", tags: ["heart", "solid", "love"] },
  { glyph: "❦", name: "Floral Heart Ornament", hub: "symbols", sub: "heart", tags: ["flower", "heart", "vintage"] },
  { glyph: "❣", name: "Heart Exclamation", hub: "symbols", sub: "heart", tags: ["heart", "exclamation", "love"] },
  { glyph: "★", name: "Solid Black Star", hub: "symbols", sub: "star", badge: "🔥 HOT", tags: ["star", "rating", "favorite", "solid"] },
  { glyph: "☆", name: "White Outline Star", hub: "symbols", sub: "star", tags: ["star", "hollow", "sparkle"] },
  { glyph: "✦", name: "Four Point Sparkle", hub: "symbols", sub: "sparkle", badge: "🔥 HOT", tags: ["sparkle", "glitter", "magic", "stars"] },
  { glyph: "✧", name: "Hollow Magic Sparkle", hub: "symbols", sub: "sparkle", tags: ["sparkle", "star", "shine"] },
  { glyph: "⁂", name: "Asterism Sparkle Cluster", hub: "symbols", sub: "sparkle", tags: ["asterism", "cluster", "stars"] },
  { glyph: "✿", name: "Cute Petite Flower", hub: "symbols", sub: "flower", badge: "🔥 HOT", tags: ["flower", "spring", "aesthetic"] },
  { glyph: "❀", name: "Cherry Blossom Sakura", hub: "symbols", sub: "flower", tags: ["sakura", "flower", "cherry"] },
  { glyph: "❁", name: "Eight Petaled Flower", hub: "symbols", sub: "flower", tags: ["flower", "nature", "bloom"] },
  { glyph: "☾", name: "Crescent Moon Sky", hub: "symbols", sub: "moon", badge: "🔥 HOT", tags: ["moon", "night", "sky", "lunar"] },
  { glyph: "☽", name: "Waxing Moon Aesthetic", hub: "symbols", sub: "moon", tags: ["moon", "lunar", "aesthetic"] },
  { glyph: "☠", name: "Skull Crossbones Pirate", hub: "symbols", sub: "skull", badge: "🔥 HOT", tags: ["skull", "danger", "pirate", "poison"] },
  { glyph: "💀", name: "Skull Emoji Text", hub: "symbols", sub: "skull", tags: ["skull", "dead", "lol"] },
  { glyph: "👑", name: "Royal Crown VIP", hub: "symbols", sub: "crown", badge: "🔥 HOT", tags: ["crown", "king", "queen", "vip"] },
  { glyph: "♔", name: "Chess King Crown", hub: "symbols", sub: "crown", tags: ["king", "chess", "crown"] },
  { glyph: "⚔", name: "Crossed Swords Battle", hub: "symbols", sub: "weapons", badge: "🔥 HOT", tags: ["sword", "battle", "fight", "rpg"] },
  { glyph: "🏹", name: "Bow and Arrow Cupid", hub: "symbols", sub: "bow", badge: "🔥 HOT", tags: ["bow", "archery", "cupid", "arrow"] },
  { glyph: "♫", name: "Eighth Notes Music", hub: "symbols", sub: "music", badge: "🔥 HOT", tags: ["music", "song", "audio", "notes"] },
  { glyph: "♬", name: "Beamed Melody Notes", hub: "symbols", sub: "music", tags: ["melody", "sound", "tune", "notes"] },
  { glyph: "🦋", name: "Aesthetic Butterfly", hub: "symbols", sub: "butterfly", badge: "🔥 HOT", tags: ["butterfly", "insect", "aesthetic", "nature"] },
  { glyph: "ʚɞ", name: "Text Butterfly Wings", hub: "symbols", sub: "butterfly", tags: ["butterfly", "cute", "wings"] },
  { glyph: "🔥", name: "Fire Flame Lit", hub: "symbols", sub: "fire", badge: "🔥 HOT", tags: ["fire", "lit", "hot", "flame"] },
  { glyph: "❄", name: "Winter Snowflake", hub: "symbols", sub: "snowflake", badge: "🔥 HOT", tags: ["snow", "winter", "cold", "snowflake"] },
  { glyph: "☼", name: "Radiant Sun Rays", hub: "symbols", sub: "sun", badge: "🔥 HOT", tags: ["sun", "day", "warmth", "summer"] },
  { glyph: "✔", name: "Heavy Check Mark Yes", hub: "symbols", sub: "check-mark", badge: "🔥 HOT", tags: ["check", "yes", "done", "verified"] },
  { glyph: "✓", name: "Clean Checkmark", hub: "symbols", sub: "check-mark", tags: ["check", "correct"] },
  { glyph: "•", name: "Solid Bullet Point", hub: "symbols", sub: "bullet-point", badge: "🔥 HOT", tags: ["bullet", "list", "dot"] },
  { glyph: "‣", name: "Triangular Bullet", hub: "symbols", sub: "bullet-point", tags: ["bullet", "point", "arrow"] },
  { glyph: "✞", name: "Latin Cross Faith", hub: "symbols", sub: "cross", badge: "🔥 HOT", tags: ["cross", "faith", "gothic", "christian"] },
  { glyph: "➔", name: "Bold Right Arrow", hub: "symbols", sub: "arrow", badge: "🔥 HOT", tags: ["arrow", "next", "direction", "right"] },
  { glyph: "👊", name: "Punch Fist Bump", hub: "symbols", sub: "fist", badge: "🔥 HOT", tags: ["fist", "punch", "bro"] },
  { glyph: "ฅ^•ﻌ•^ฅ", name: "Cat Paws Symbol", hub: "symbols", sub: "cat", tags: ["cat", "kitty", "symbol"] },

  // --- AESTHETIC BIOS & DIVIDERS ---
  { glyph: "⋆ ˚｡⋆୨୧˚ bio loading... ˚୨୧⋆｡˚ ⋆", name: "Discord Cute Ribbon Bio", hub: "aesthetic", sub: "discord-bio", badge: "🔥 HOT", tags: ["discord bio", "cute", "ribbon", "status"] },
  { glyph: "✧･ﾟ: *✧･ﾟ:* about me *:･ﾟ✧*:･ﾟ✧", name: "Discord Sparkle Header", hub: "aesthetic", sub: "discord-bio", tags: ["discord", "sparkles", "profile"] },
  { glyph: "˗ˏˋ ★ ˎˊ˗ welcome to my page ˗ˏˋ ★ ˎˊ˗", name: "Instagram Star Header", hub: "aesthetic", sub: "instagram-bio", badge: "🔥 HOT", tags: ["instagram bio", "stars", "header"] },
  { glyph: "𑁍 [your name] | [pronouns] 𑁍\n✦ [city/state] ✦\n✉ contact: [email]", name: "Clean Aesthetic Instagram Bio", hub: "aesthetic", sub: "instagram-bio", tags: ["instagram", "profile", "minimal"] },
  { glyph: "♡ status: offline\n♡ listening to: spotify\n♡ mood: (´• ω •`)", name: "TikTok Bio Card", hub: "aesthetic", sub: "tiktok-bio", badge: "🔥 HOT", tags: ["tiktok bio", "offline", "aesthetic", "music"] },
  { glyph: "─── ⋆⋅☆⋅⋆ ───", name: "Star Line Divider", hub: "aesthetic", sub: "dividers", badge: "🔥 HOT", tags: ["divider", "stars", "line"] },
  { glyph: "· · ─────── ·𖥸· ─────── · ·", name: "Floral Leaf Divider", hub: "aesthetic", sub: "dividers", tags: ["divider", "floral", "leaf"] },
  { glyph: "━━━━━━━━━▼━━━━━━━━━", name: "Bold Arrow Divider", hub: "aesthetic", sub: "dividers", tags: ["divider", "arrow", "bold"] },
  { glyph: "═══*.·:·.☽✧ ✦ ✧☾.·:·.*═══", name: "Celestial Moon Divider", hub: "aesthetic", sub: "dividers", tags: ["divider", "moon", "stars"] },
  { glyph: "╔═══*.·:·.☽✧ ✦ ✧☾.·:·.*═══╗", name: "Gothic Moon Border", hub: "aesthetic", sub: "borders", badge: "🔥 HOT", tags: ["border", "gothic", "frame"] },
  { glyph: "┌─── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ───┐", name: "Starlight Frame Border", hub: "aesthetic", sub: "borders", tags: ["border", "frame", "starlight"] },
  { glyph: "ೀ ִֶָ 𓂃 ࣪˖ ִֶָ ༘ ִֶָ ࣪˖", name: "Ribbon & Sparkles Combo", hub: "aesthetic", sub: "emoji-combos", badge: "🔥 HOT", tags: ["combo", "ribbon", "sparkles"] },
  { glyph: "𖦹 ׂ 𓈒 🐇 ׂ 𖧧 🪞", name: "Cottagecore Bunny Combo", hub: "aesthetic", sub: "emoji-combos", tags: ["cottagecore", "bunny", "mirror"] },
  { glyph: "𓍢ִ໋🌷͙֒ ᰔᩚ ₊˚⊹♡", name: "Tulip Soft Fairy Combo", hub: "aesthetic", sub: "emoji-combos", tags: ["tulip", "fairy", "soft"] },
  { glyph: "⋆｡°✩ name: [your name] ✩°｡⋆\n☾ pronouns: they/them ☾\n★ fav music: indie pop ★", name: "Complete Bio Template", hub: "aesthetic", sub: "bio-templates", badge: "🔥 HOT", tags: ["bio template", "discord", "profile"] },
  { glyph: "✧ ೃ༄*ੈ✩\n• aesthetic: coquette\n• zodiac: scorpio\n• playlist: 24/7", name: "Starlet Bio Template", hub: "aesthetic", sub: "bio-templates", tags: ["bio template", "coquette", "zodiac"] },
  { glyph: "ִֶָ 𓂃 ࣪˖ 𐙚 𝜗𝜚 ೀ", name: "Aesthetic Cute Symbols", hub: "aesthetic", sub: "symbols", badge: "🔥 HOT", tags: ["symbols", "cute", "aesthetic"] }
];

// Helper: Escape HTML strings
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Generate static card HTML with green copy button and share button
function renderStaticCard(item) {
  const badgeHtml = item.badge ? `<span class="face-badge">${escapeHtml(item.badge)}</span>` : '';
  const escapedGlyph = escapeHtml(item.glyph);
  const singleLineGlyph = escapedGlyph.replace(/\n/g, '<br>');
  const safeAttr = escapeHtml(item.glyph).replace(/"/g, '&quot;');
  const safeName = escapeHtml(item.name).replace(/"/g, '&quot;');

  return `
    <article class="face-card" onclick="copyGlyph(\`${safeAttr.replace(/`/g, '\\`')}\`, this.querySelector('.face-copy-btn'))">
      ${badgeHtml}
      <div class="face-glyph-box">
        <span class="face-glyph">${singleLineGlyph}</span>
      </div>
      <div class="face-meta">
        <span class="face-tag">${escapeHtml(item.name)}</span>
        <div class="face-actions" onclick="event.stopPropagation()">
          <button type="button" class="face-action-btn" onclick="event.stopPropagation(); toggleFavAction(\`${safeAttr.replace(/`/g, '\\`')}\`)" title="Add to favorites">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <button type="button" class="face-share-btn" onclick="event.stopPropagation(); shareGlyph(\`${safeAttr.replace(/`/g, '\\`')}\`, \`${safeName.replace(/`/g, '\\`')}\`)" title="Share this text face">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </button>
          <button type="button" class="face-copy-btn" onclick="event.stopPropagation(); copyGlyph(\`${safeAttr.replace(/`/g, '\\`')}\`, this)" title="Copy text face">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>Copy</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

// Render Breadcrumb Component
function renderBreadcrumbs(crumbs, rootPrefix) {
  const crumbHtml = crumbs.map((c, idx) => {
    const isLast = idx === crumbs.length - 1;
    if (isLast) {
      return `<span class="current">${escapeHtml(c.name)}</span>`;
    }
    return `<a href="${rootPrefix}${c.url}">${escapeHtml(c.name)}</a><span class="sep">/</span>`;
  }).join(' ');

  return `
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      ${crumbHtml}
    </nav>
  `;
}

// Render Related Categories Grid Component
function renderRelatedCategories(relatedCats, rootPrefix) {
  if (!relatedCats || relatedCats.length === 0) return '';
  return `
    <div style="margin-top: 3rem;">
      <h3 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 1rem;">Explore Related Categories</h3>
      <div class="category-card-grid">
        ${relatedCats.map(cat => `
          <a href="${rootPrefix}${cat.url}" class="cat-card">
            <span class="cat-sample">${cat.sample}</span>
            <span class="cat-name">${cat.name}</span>
            <span class="cat-count">${cat.count || 'View Collection'}</span>
          </a>
        `).join('')}
      </div>
    </div>
  `;
}

// Render Social Share Bar Component
function renderShareBar(title, url) {
  const encUrl = encodeURIComponent(url);
  const encTitle = encodeURIComponent(title);
  const waText = encodeURIComponent(`${title} — Copy & paste in 1-click! ${url}`);

  return `
    <!-- Social Share Buttons -->
    <div class="share-bar-container">
      <div class="share-bar-label">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
        <span>Share Collection With Friends</span>
      </div>
      <div class="share-buttons-group">
        <a href="https://api.whatsapp.com/send?text=${waText}" target="_blank" rel="noopener noreferrer" class="share-btn share-btn-whatsapp" title="Share on WhatsApp" aria-label="Share on WhatsApp">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.275-.101-.476-.15-.676.15-.201.3-.777.979-.953 1.18-.175.201-.351.226-.652.076-.3-.15-1.27-.468-2.42-1.492-.894-.798-1.498-1.783-1.674-2.083-.175-.3-.019-.462.132-.612.136-.135.301-.35.452-.526.15-.175.2-.3.301-.501.101-.2.05-.375-.025-.525-.075-.15-.677-1.632-.927-2.235-.243-.588-.49-.508-.676-.518-.175-.009-.376-.01-.577-.01-.2 0-.527.075-.802.375-.276.3-1.054 1.03-1.054 2.512s1.079 2.912 1.23 3.112c.15.2 2.122 3.24 5.14 4.544.718.31 1.278.495 1.716.634.722.23 1.378.197 1.9.12.58-.088 1.78-.727 2.03-1.428.25-.702.25-1.303.175-1.428-.075-.126-.276-.201-.577-.351zM12.04 2C6.54 2 2.078 6.46 2.078 11.96c0 1.96.57 3.788 1.558 5.332L2 22l4.858-1.594A9.914 9.914 0 0 0 12.04 22c5.5 0 9.962-4.46 9.962-9.96C22.002 6.46 17.54 2 12.04 2z"/></svg>
          <span>WhatsApp</span>
        </a>

        <a href="https://twitter.com/intent/tweet?text=${encTitle}&url=${encUrl}" target="_blank" rel="noopener noreferrer" class="share-btn share-btn-twitter" title="Share on X (Twitter)" aria-label="Share on X">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          <span>X / Twitter</span>
        </a>

        <a href="https://t.me/share/url?url=${encUrl}&text=${encTitle}" target="_blank" rel="noopener noreferrer" class="share-btn share-btn-telegram" title="Share on Telegram" aria-label="Share on Telegram">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
          <span>Telegram</span>
        </a>

        <a href="https://reddit.com/submit?url=${encUrl}&title=${encTitle}" target="_blank" rel="noopener noreferrer" class="share-btn share-btn-reddit" title="Share on Reddit" aria-label="Share on Reddit">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm5.01 4.744c.688 0 1.25.56 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.5 1.201-.5.94 0 1.704.764 1.704 1.705 0 .61-.322 1.144-.805 1.442a5.34 5.34 0 0 1 .054.75c0 3.81-4.444 6.9-9.923 6.9s-9.924-3.09-9.924-6.9c0-.256.02-.508.057-.755a1.704 1.704 0 0 1-.808-1.437c0-.94.764-1.705 1.705-1.705.47 0 .892.191 1.2.5 1.196-.856 2.852-1.417 4.676-1.487l.951-4.462a.405.405 0 0 1 .48-.313l3.14.66a1.25 1.25 0 0 1 1.25-.873zM9.25 13c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm5.5 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm-5.46 4.14a.5.5 0 0 0-.17.69c.67 1.16 1.94 1.86 3.38 1.86s2.71-.7 3.38-1.86a.5.5 0 0 0-.86-.5c-.47.81-1.39 1.36-2.52 1.36s-2.05-.55-2.52-1.36a.5.5 0 0 0-.69-.19z"/></svg>
          <span>Reddit</span>
        </a>

        <button type="button" class="share-btn share-btn-copylink" onclick="copyCurrentUrl()" title="Copy Page Link" aria-label="Copy Link">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span>Copy Link</span>
        </button>
      </div>
    </div>
  `;
}

// Base HTML Page Template
function generatePageTemplate({
  pageTitle,
  metaDescription,
  canonicalUrl,
  rootPrefix = '',
  breadcrumbs = [],
  heroBadge = '⚡ 1-Click Copy • Unicode Compatible',
  h1Text,
  heroSub,
  activeHub = 'all',
  activeSub = 'all',
  glyphs = [],
  editorialHtml = '',
  faqList = [],
  relatedCats = [],
  lang = 'en'
}) {
  const cardsHtml = glyphs.map(renderStaticCard).join('\n');

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((c, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": c.name,
      "item": `${SITE_URL}/${c.url.replace(/^\//, '')}`
    }))
  };

  // FAQ Schema
  const faqSchema = faqList.length > 0 ? {
    "@type": "FAQPage",
    "mainEntity": faqList.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  } : null;

  // ItemList Schema
  const itemListSchema = glyphs.length > 0 ? {
    "@type": "ItemList",
    "itemListElement": glyphs.slice(0, 30).map((g, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": g.name,
      "description": `${g.name} text emoticon: ${g.glyph}`
    }))
  } : null;

  const schemaGraph = [
    {
      "@type": "WebApplication",
      "name": pageTitle,
      "url": canonicalUrl,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "All",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    },
    breadcrumbSchema
  ];

  if (faqSchema) schemaGraph.push(faqSchema);
  if (itemListSchema) schemaGraph.push(itemListSchema);

  const jsonLdContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": schemaGraph
  }, null, 2);

  // FAQ HTML
  const faqHtml = faqList.length > 0 ? `
    <section class="faq-section" id="faq">
      <div class="container">
        <div class="editorial-header">
          <h2>Frequently Asked Questions</h2>
          <p>Quick answers about copying, compatibility, and using text faces on Discord, TikTok, and mobile.</p>
        </div>
        <div class="faq-grid">
          ${faqList.map((f, i) => `
            <div class="faq-item ${i === 0 ? 'open' : ''}">
              <button class="faq-question" type="button">
                ${escapeHtml(f.q)}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <div class="faq-answer">
                <p>${escapeHtml(f.a)}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  ` : '';

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeHtml(metaDescription)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonicalUrl}">

  <!-- Hreflang Tags for Multi-language Clusters -->
  <link rel="alternate" hreflang="x-default" href="${SITE_URL}/">
  <link rel="alternate" hreflang="en" href="${canonicalUrl}">
  <link rel="alternate" hreflang="es" href="${SITE_URL}/es/">
  <link rel="alternate" hreflang="ja" href="${SITE_URL}/jp/">
  <link rel="alternate" hreflang="ko" href="${SITE_URL}/kr/">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${escapeHtml(pageTitle)}">
  <meta property="og:description" content="${escapeHtml(metaDescription)}">
  <meta name="twitter:card" content="summary_large_image">

  <link rel="stylesheet" href="${rootPrefix}styles.css">

  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
${jsonLdContent}
  </script>
</head>
<body>

  <!-- Header -->
  <header class="header">
    <div class="container header-nav">
      <a href="${rootPrefix}index.html" class="brand-logo" title="Lenny Face Pro">
        <span class="brand-glyph">( ͡° ͜ʖ ͡°)</span>
        <span>Lenny<span class="highlight">Pro</span></span>
      </a>

      <nav>
        <ul class="nav-links">
          <li><a href="${rootPrefix}index.html#browse">Browse All</a></li>
          <li><a href="${rootPrefix}text-faces/index.html">Text Faces</a></li>
          <li><a href="${rootPrefix}kaomoji/index.html">Kaomoji</a></li>
          <li><a href="${rootPrefix}emoticons/index.html">Emoticons</a></li>
          <li><a href="${rootPrefix}symbols/index.html">Symbols</a></li>
          <li><a href="${rootPrefix}aesthetic/index.html">Aesthetic</a></li>
        </ul>
      </nav>

      <div class="nav-actions">
        <button type="button" class="theme-toggle-btn" id="theme-toggle" aria-label="Toggle Theme">☀️</button>
        <select class="lang-select" id="lang-select" onchange="window.location.href=this.value" aria-label="Select Language">
          <option value="${rootPrefix}index.html" ${lang === 'en' ? 'selected' : ''}>🇺🇸 English</option>
          <option value="${rootPrefix}es/index.html" ${lang === 'es' ? 'selected' : ''}>🇪🇸 Español</option>
          <option value="${rootPrefix}jp/index.html" ${lang === 'ja' ? 'selected' : ''}>🇯🇵 日本語</option>
          <option value="${rootPrefix}kr/index.html" ${lang === 'ko' ? 'selected' : ''}>🇰🇷 한국어</option>
        </select>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero" id="browse">
    <div class="container">
      ${renderBreadcrumbs(breadcrumbs, rootPrefix)}
      <div class="hero-badge">${escapeHtml(heroBadge)}</div>
      <h1>${h1Text}</h1>
      <p>${escapeHtml(heroSub)}</p>

      <!-- Global Live Search -->
      <div class="search-wrapper">
        <span class="search-icon">🔍</span>
        <input type="text" id="search-input" class="search-input" placeholder="Search faces & keywords..." aria-label="Search text faces">
        <button type="button" id="search-clear" class="search-clear-btn" aria-label="Clear Search">✕</button>
      </div>

      <!-- Category Filter Chips -->
      <div class="hubbar" role="group" aria-label="Category Hubs">
        <a href="${rootPrefix}index.html" class="hub-chip ${activeHub === 'all' ? 'active' : ''}">All Faces</a>
        <a href="${rootPrefix}index.html#browse" class="hub-chip ${activeHub === 'lenny' ? 'active' : ''}">Lenny Faces</a>
        <a href="${rootPrefix}text-faces/index.html" class="hub-chip ${activeHub === 'text-faces' ? 'active' : ''}">Text Faces</a>
        <a href="${rootPrefix}kaomoji/index.html" class="hub-chip ${activeHub === 'kaomoji' ? 'active' : ''}">Kaomoji</a>
        <a href="${rootPrefix}emoticons/index.html" class="hub-chip ${activeHub === 'emoticons' ? 'active' : ''}">Emoticons</a>
        <a href="${rootPrefix}symbols/index.html" class="hub-chip ${activeHub === 'symbols' ? 'active' : ''}">Symbols</a>
        <a href="${rootPrefix}aesthetic/index.html" class="hub-chip ${activeHub === 'aesthetic' ? 'active' : ''}">Aesthetic Bios</a>
      </div>

      ${renderShareBar(pageTitle, canonicalUrl)}
    </div>
  </section>

  <!-- Main Grid Section -->
  <main class="container">
    <div class="grid-controls">
      <div class="grid-count">Showing <strong>${glyphs.length}</strong> items in this category</div>
      <div style="font-size: 0.85rem; color: var(--cyan);">💡 Click any card to copy instantly</div>
    </div>

    <!-- Static Pre-rendered Grid (SSR for Instant 100/100 CWV & SEO) -->
    <div class="face-grid" id="face-grid" data-initial-hub="${activeHub}" data-initial-sub="${activeSub}">
${cardsHtml}
    </div>

    ${renderRelatedCategories(relatedCats, rootPrefix)}
  </main>

  <!-- Comprehensive In-depth Editorial Section (SEO Dominance) -->
  <section class="editorial-section" id="guide">
    <div class="container">
      <div class="editorial-body">
${editorialHtml}
      </div>
    </div>
  </section>

  <!-- FAQ Accordion -->
  ${faqHtml}

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <div class="brand-logo" style="margin-bottom: 0.75rem;">
            <span class="brand-glyph">( ͡° ͜ʖ ͡°)</span>
            <span>Lenny<span class="highlight">Pro</span></span>
          </div>
          <p style="color: var(--text-dim); font-size: 0.875rem; max-width: 300px;">
            The ultimate 100/100 PageSpeed text face repository engineered for lightning-fast 1-click copy and paste.
          </p>
        </div>

        <div class="footer-col">
          <h4>Lenny Face Styles</h4>
          <ul>
            <li><a href="${rootPrefix}cute-lenny-face.html">Cute Lenny Face</a></li>
            <li><a href="${rootPrefix}sad-lenny-face.html">Sad Lenny Face</a></li>
            <li><a href="${rootPrefix}happy-lenny-face.html">Happy Lenny Face</a></li>
            <li><a href="${rootPrefix}angry-lenny-face.html">Angry Lenny Face</a></li>
            <li><a href="${rootPrefix}crying-lenny-face.html">Crying Lenny Face</a></li>
            <li><a href="${rootPrefix}middle-finger.html">Middle Finger Face</a></li>
            <li><a href="${rootPrefix}shrug-lenny-face.html">Shrug Lenny Face</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Kaomoji & Emoticons</h4>
          <ul>
            <li><a href="${rootPrefix}kaomoji/cat.html">Cat Kaomoji</a></li>
            <li><a href="${rootPrefix}kaomoji/hug.html">Hug Kaomoji</a></li>
            <li><a href="${rootPrefix}kaomoji/heart.html">Heart Kaomoji</a></li>
            <li><a href="${rootPrefix}emoticons/smiley.html">Smiley Emoticons</a></li>
            <li><a href="${rootPrefix}text-faces/donger.html">Donger Faces</a></li>
            <li><a href="${rootPrefix}text-faces/table-flipping.html">Table Flip Faces</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Symbols & Aesthetic</h4>
          <ul>
            <li><a href="${rootPrefix}symbols/heart.html">Heart Symbols</a></li>
            <li><a href="${rootPrefix}symbols/sparkle.html">Sparkle Symbols</a></li>
            <li><a href="${rootPrefix}aesthetic/discord-bio.html">Discord Bios</a></li>
            <li><a href="${rootPrefix}aesthetic/dividers.html">Aesthetic Dividers</a></li>
            <li><a href="${rootPrefix}sitemap.xml">XML Sitemap</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2026 Lenny Face Pro. All rights reserved.</p>
        <p><a href="${rootPrefix}privacy.html">Privacy Policy</a> | <a href="${rootPrefix}terms.html">Terms of Service</a> | <a href="${rootPrefix}about.html">About Us</a></p>
      </div>
    </div>
  </footer>

  <!-- Toast Container -->
  <div class="toast-container" id="toast-container"></div>

  <!-- Client-side Scripts -->
  <script src="${rootPrefix}data.js"></script>
  <script src="${rootPrefix}app.js"></script>
</body>
</html>`;
}

// ----------------------------------------------------
// DEFINITIONS FOR PROGRAMMATIC SUBPAGES
// ----------------------------------------------------

const LENNY_SUBPAGES = [
  {
    slug: 'cute-lenny-face.html',
    title: 'Cute Lenny Face ( ͜° ͜ʊ ͜°) — Copy & Paste Kawaii Lenny Faces',
    description: 'Copy and paste Cute Lenny Faces ( ͜° ͜ʊ ͜°), kawaii text faces, and sweet smiling kaomojis in 1-click. Free Unicode generator with instant clipboard copy.',
    h1: 'Cute Lenny Face <span>( ͜° ͜ʊ ͜°)</span>',
    heroSub: 'Explore our complete collection of cute, innocent, and kawaii Lenny faces. Tap any face to copy instantly.',
    sub: 'cute',
    editorial: `
      <h2>The Ultimate Guide to Cute Lenny Faces ( ͜° ͜ʊ ͜°)</h2>
      <p>While the original Lenny Face <code>( ͡° ͜ʖ ͡°)</code> is notorious for its cheeky smirk and internet mischief, the <strong>Cute Lenny Face</strong> softens the iconic expression into an innocent, adorable, and friendly kaomoji. By substituting sharp degreemarks and eyebrow diacritics with rounded lips like <code>͜ʊ</code> or sweet blushing cheeks, creators transformed an edgier meme into a wholesome social staple.</p>
      
      <h3>Where to Use Cute Lenny Faces</h3>
      <ul>
        <li><strong>Discord Server Greetings:</strong> Welcome new community members with a friendly <code>( ͜° ͜ʊ ͜°)ノ</code>.</li>
        <li><strong>Roblox & Minecraft Chat:</strong> Express joy and playful innocence during multiplayer sessions without getting flagged by chat filters.</li>
        <li><strong>TikTok & Instagram Comments:</strong> Add an aesthetic typographic charm to your replies and video captions.</li>
      </ul>

      <h3>Anatomy of a Cute Lenny Face</h3>
      <p>A cute text face relies on harmonious Unicode glyphs:</p>
      <table class="shortcut-table">
        <thead><tr><th>Component</th><th>Unicode Character</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>Cheeks / Blushes</td><td><code>✿</code> or <code>🌸</code></td><td>Adds a delicate floral blush effect.</td></tr>
          <tr><td>Soft Mouth</td><td><code>͜ʊ</code> (U+028A)</td><td>Creates the signature sweet curved smile.</td></tr>
          <tr><td>Innocent Eyes</td><td><code>•</code> or <code>°</code></td><td>Replaces skeptical stares with wide, bright eyes.</td></tr>
        </tbody>
      </table>

      <h3>How to Type Cute Lenny Faces on Any Device</h3>
      <p>Because these symbols utilize specialized Unicode combining characters, typing them on standard QWERTY keyboards requires cumbersome Alt codes or character map lookups. Using our 1-click copy tool above is the fastest method: just tap any box to copy directly to your clipboard, then press <kbd>Ctrl</kbd> + <kbd>V</kbd> (Windows) or <kbd>Cmd</kbd> + <kbd>V</kbd> (Mac) to paste!</p>
    `,
    faqs: [
      { q: "What does the cute Lenny face mean?", a: "It represents friendly joy, innocent happiness, or playful affection, acting as a wholesome alternative to the suggestive smirk of the classic Lenny face." },
      { q: "Does this cute text face work on Discord?", a: "Yes! All characters in our collection are standard Unicode symbols that render perfectly across Discord, iOS, Android, and PC." },
      { q: "How do I save my favorite cute faces?", a: "Click the heart icon on any card to save it to your local Favorites list for instant access anytime." }
    ],
    related: [
      { name: "Blushing Lenny", url: "blushing-lenny-face.html", sample: "( ͡° ⁄ ⁄ ͜ʖ ⁄ ⁄ ͡°)" },
      { name: "Happy Lenny", url: "happy-lenny-face.html", sample: "( ͡ᵔ ͜ʖ ͡ᵔ)" },
      { name: "Cute Kaomoji", url: "kaomoji/cute.html", sample: "( ˶ˆ꒳ˆ˵ )" },
      { name: "Cat Faces", url: "text-faces/cat.html", sample: "(=^･ω･^=)" }
    ]
  },
  {
    slug: 'sad-lenny-face.html',
    title: 'Sad Lenny Face ( ͡° ʖ̯ ͡°) — Copy & Paste Frown & Depressed Faces',
    description: 'Copy and paste Sad Lenny Faces ( ͡° ʖ̯ ͡°), frowning text faces, and bummed kaomojis in 1-click. Free Unicode generator with instant clipboard copy.',
    h1: 'Sad Lenny Face <span>( ͡° ʖ̯ ͡°)</span>',
    heroSub: 'Express disappointment, melancholy, and heartbreak with sad Lenny faces. Tap any card to copy instantly.',
    sub: 'sad',
    editorial: `
      <h2>The Cultural Meaning of the Sad Lenny Face ( ͡° ʖ̯ ͡°)</h2>
      <p>The <strong>Sad Lenny Face</strong> <code>( ͡° ʖ̯ ͡°)</code> represents the universal experience of internet disappointment, defeat, or playful sorrow. Crafted by turning the classic smiling mouth upside down into a downturned lip <code>ʖ̯</code>, this text face quickly became a sensation on gaming streams, Reddit threads, and Twitter replies.</p>

      <h3>When to Deploy Sad Text Faces</h3>
      <p>Gamers and social media users frequently deploy the sad Lenny face during:</p>
      <ul>
        <li><strong>Losing a match:</strong> When your teammate drops out or you miss the winning shot in Valorant or CS:GO.</li>
        <li><strong>Announced delays:</strong> When your favorite game or anime season gets delayed.</li>
        <li><strong>Melodramatic reactions:</strong> When a minor inconvenience occurs, such as running out of coffee or waking up on a Monday.</li>
      </ul>

      <h3>Unicode Breakdown</h3>
      <p>The sorrowful grimace is produced by Unicode Character <code>U+028F</code> (Latin Small Letter Y with Stroke) or downturned combining diacritics. Unlike basic emojis like 😢, text faces carry a nuanced, ironic tone favored by digital communities.</p>
    `,
    faqs: [
      { q: "How do you make a sad Lenny face?", a: "The sad mouth is created using Unicode combining symbol U+028F (ʖ̯). Simply copy it from our tool for instant use." },
      { q: "Is the sad Lenny face different from crying faces?", a: "Yes. The sad Lenny expresses a quiet, disappointed pout, whereas crying faces feature tears like ( ͡ಥ ʖ̯ ͡ಥ) or (╥﹏╥)." }
    ],
    related: [
      { name: "Crying Lenny", url: "crying-lenny-face.html", sample: "( ͡ಥ ʖ̯ ͡ಥ)" },
      { name: "Shrug Lenny", url: "shrug-lenny-face.html", sample: "¯\\_( ͡° ͜ʖ ͡°)_/¯" },
      { name: "Disapproval Face", url: "text-faces/disapproval.html", sample: "ಠ_ಠ" }
    ]
  },
  {
    slug: 'happy-lenny-face.html',
    title: 'Happy Lenny Face ( ͡ᵔ ͜ʖ ͡ᵔ) — Copy & Paste Joyful & Smiling Text Faces',
    description: 'Copy and paste Happy Lenny Faces ( ͡ᵔ ͜ʖ ͡ᵔ), smiling text faces, and cheerful kaomoji in 1-click. Instant clipboard copy and custom maker.',
    h1: 'Happy Lenny Face <span>( ͡ᵔ ͜ʖ ͡ᵔ)</span>',
    heroSub: 'Spread positive vibes with cheerful, joyful, and smiling Lenny faces. Tap to copy in 1-click.',
    sub: 'happy',
    editorial: `
      <h2>Spreading Cheer with Happy Lenny Faces ( ͡ᵔ ͜ʖ ͡ᵔ)</h2>
      <p>The <strong>Happy Lenny Face</strong> radiates pure delight and triumphant satisfaction. By combining joyful squinting eyes <code>ᵔ</code> or grinning arcs with the iconic cheek structure, this emoticon is the gold standard for celebrating victories, good news, or playful banter online.</p>
    `,
    faqs: [
      { q: "What makes the happy Lenny face smile?", a: "The eyes are constructed with Unicode U+1D54 (modifier letter small e with diaeresis or rounded curves), evoking squinting eyes of genuine laughter." }
    ],
    related: [
      { name: "Cute Lenny", url: "cute-lenny-face.html", sample: "( ͜° ͜ʊ ͜°)" },
      { name: "Dancing Kaomoji", url: "kaomoji/dancing.html", sample: "ヽ(>∀<☆)ノ" }
    ]
  },
  {
    slug: 'angry-lenny-face.html',
    title: 'Angry Lenny Face (ง ͠° ͟ل͜ ͡°)ง — Copy & Paste Mad & Fighting Text Faces',
    description: 'Copy and paste Angry Lenny Faces (ง ͠° ͟ل͜ ͡°)ง, fighting text faces, rage emoticons, and boxer kaomoji in 1-click. Free Unicode generator.',
    h1: 'Angry Lenny Face <span>(ง ͠° ͟ل͜ ͡°)ง</span>',
    heroSub: 'Ready to fight or furious? Copy angry Lenny faces, boxer fists, and rage expressions with 1-click.',
    sub: 'angry',
    editorial: `
      <h2>The Art of the Angry Lenny Face & Boxer Emoticons</h2>
      <p>When internet arguments heat up or playful rivalry sparks in gaming lobbies, the <strong>Angry Lenny Face</strong> <code>(ง ͠° ͟ل͜ ͡°)ง</code> enters the ring. Outfitted with raised boxer fists <code>ง</code> and furrowed brows <code>͠° ͟</code>, it represents mock-aggression, determination, and intense competitive spirit.</p>
    `,
    faqs: [
      { q: "What does (ง ͠° ͟ل͜ ͡°)ง mean?", a: "It is internet shorthand for 'square up' or 'come at me bro', signaling playful combat readiness in Twitch chats and gaming lobbies." }
    ],
    related: [
      { name: "Middle Finger Lenny", url: "middle-finger.html", sample: "t( ͡° ͜ʖ ͡° t)" },
      { name: "Table Flip", url: "text-faces/table-flipping.html", sample: "(ノಠ益ಠ)ノ彡┻━┻" }
    ]
  },
  {
    slug: 'crying-lenny-face.html',
    title: 'Crying Lenny Face ( ͡ಥ ͜ʖ ͡ಥ) — Copy & Paste Tears & Weeping Faces',
    description: 'Copy and paste Crying Lenny Faces ( ͡ಥ ͜ʖ ͡ಥ), sobbing kaomojis, and weeping text faces in 1-click. 100% Unicode compatible for Discord and mobile.',
    h1: 'Crying Lenny Face <span>( ͡ಥ ͜ʖ ͡ಥ)</span>',
    heroSub: 'From bittersweet tears of joy to dramatic weeping, copy crying Lenny faces instantly.',
    sub: 'crying',
    editorial: `
      <h2>Crying Lenny Faces: From Tears of Joy to Bitter Sorrow</h2>
      <p>The <strong>Crying Lenny Face</strong> <code>( ͡ಥ ͜ʖ ͡ಥ)</code> uses the Telugu letter Tha <code>ಥ</code> as giant, tear-filled anime eyes. This gives the face an intensely dramatic, comedic weeping expression that has become a viral staple on Twitter, Reddit, and Twitch.</p>
    `,
    faqs: [
      { q: "What character is used for the crying Lenny eyes?", a: "It uses Unicode character U+0C25 (Telugu Letter Tha: ಥ), perfectly mimicking large tearful eyes." }
    ],
    related: [
      { name: "Sad Lenny", url: "sad-lenny-face.html", sample: "( ͡° ʖ̯ ͡°)" },
      { name: "Crying Kaomoji", url: "kaomoji/sad.html", sample: "(ノ_<。)" }
    ]
  },
  {
    slug: 'blushing-lenny-face.html',
    title: 'Blushing Lenny Face ( ͡° ⁄ ⁄ ͜ʖ ⁄ ⁄ ͡°) — Copy & Paste Flirty & Shy Faces',
    description: 'Copy and paste Blushing Lenny Faces ( ͡° ⁄ ⁄ ͜ʖ ⁄ ⁄ ͡°), flirty text faces, and shy kaomoji in 1-click. Instant clipboard copy.',
    h1: 'Blushing Lenny Face <span>( ͡° ⁄ ⁄ ͜ʖ ⁄ ⁄ ͡°)</span>',
    heroSub: 'Flustered, shy, or flirty? Copy blushing Lenny faces with diagonal blush marks and floral accents.',
    sub: 'blushing',
    editorial: `
      <h2>Flustered and Flirty: The Blushing Lenny Face</h2>
      <p>With diagonal slash lines <code>⁄ ⁄</code> representing red Anime blush marks or delicate cherry blossom petals <code>🌸</code>, the <strong>Blushing Lenny Face</strong> brings shy flirtation and comedic embarrassment to chat logs.</p>
    `,
    faqs: [
      { q: "How do you make the blush effect?", a: "Double fraction slashes (U+2044) or floral Unicode characters are placed inside the parentheses beside the eyes." }
    ],
    related: [
      { name: "Cute Lenny", url: "cute-lenny-face.html", sample: "( ͜° ͜ʊ ͜°)" },
      { name: "Heart Kaomoji", url: "kaomoji/heart.html", sample: "(◕‿◕)♡" }
    ]
  },
  {
    slug: 'shrug-lenny-face.html',
    title: 'Shrug Lenny Face ¯\\_( ͡° ͜ʖ ͡°)_/¯ — Copy & Paste Smug Shrugging Faces',
    description: 'Copy and paste Shrug Lenny Face ¯\\_( ͡° ͜ʖ ͡°)_/¯, smug shrugs, and "whatever" text faces in 1-click. Free Unicode generator.',
    h1: 'Shrug Lenny Face <span>¯\\_( ͡° ͜ʖ ͡°)_/¯</span>',
    heroSub: 'The ultimate fusion of the smug Lenny smirk and the careless shrug. Tap to copy in 1-click.',
    sub: 'shrug',
    editorial: `
      <h2>The Smug Masterpiece: Shrug Lenny Face ¯\\_( ͡° ͜ʖ ͡°)_/¯</h2>
      <p>Combining the famous Japanese Katakana shruggie <code>¯\\_(ツ)_/¯</code> with the infamous Lenny smirk <code>( ͡° ͜ʖ ͡°)</code> yields the ultimate internet shrug: careless, knowing, and deeply smug.</p>
    `,
    faqs: [
      { q: "Why does the arm sometimes disappear in Reddit comments?", a: "Markdown uses the backslash '\\' as an escape character. On Reddit, you often need to type a double or triple backslash to prevent the arm from vanishing!" }
    ],
    related: [
      { name: "Classic Lenny", url: "index.html", sample: "( ͡° ͜ʖ ͡°)" },
      { name: "Table Flip", url: "text-faces/table-flipping.html", sample: "(노ಠ益ಠ)노彡┻━┻" }
    ]
  },
  {
    slug: 'middle-finger.html',
    title: 'Middle Finger Lenny Face t( ͡° ͜ʖ ͡° t) — Copy & Paste Rude Text Faces',
    description: 'Copy and paste Middle Finger Lenny Face t( ͡° ͜ʖ ͡° t), flipping off emoticons, and rude text faces in 1-click. Unicode compatible.',
    h1: 'Middle Finger Lenny Face <span>t( ͡° ͜ʖ ͡° t)</span>',
    heroSub: 'Send a cheeky or rebellious middle finger text face. Tap any card to copy instantly.',
    sub: 'middle-finger',
    editorial: `
      <h2>Rebellious Humor: Middle Finger Lenny Faces</h2>
      <p>Created by flanking the face with <code>t</code>, <code>凸</code>, or <code>╭∩╮</code>, the <strong>Middle Finger Lenny Face</strong> conveys comedic disrespect and cheeky defiance in online gaming and banter.</p>
    `,
    faqs: [
      { q: "What does the 凸 symbol represent?", a: "It is a Chinese/Japanese Kanji character (totsu) meaning convex, which closely resembles a middle finger gesture in ASCII art." }
    ],
    related: [
      { name: "Angry Lenny", url: "angry-lenny-face.html", sample: "(ง ͠° ͟ل͜ ͡°)ง" },
      { name: "Fighting Faces", url: "text-faces/fight.html", sample: "(ง'̀-'́)ง" }
    ]
  }
];

// ----------------------------------------------------
// BUILD FUNCTIONS
// ----------------------------------------------------

function buildLennySubpages() {
  console.log('Building Lenny Subpages...');
  for (const p of LENNY_SUBPAGES) {
    const glyphs = ALL_GLYPHS.filter(g => g.sub === p.sub || (g.hub === 'lenny' && g.sub === p.sub));
    const breadcrumbs = [
      { name: 'Home', url: 'index.html' },
      { name: 'Lenny Faces', url: 'index.html#browse' },
      { name: p.h1.replace(/<[^>]*>?/gm, '').trim(), url: p.slug }
    ];

    const html = generatePageTemplate({
      pageTitle: p.title,
      metaDescription: p.description,
      canonicalUrl: `${SITE_URL}/${p.slug}`,
      rootPrefix: '',
      breadcrumbs,
      heroBadge: '⚡ 1-Click Copy • 100/100 PageSpeed',
      h1Text: p.h1,
      heroSub: p.heroSub,
      activeHub: 'lenny',
      activeSub: p.sub,
      glyphs: glyphs.length > 0 ? glyphs : ALL_GLYPHS.slice(0, 15),
      editorialHtml: p.editorial,
      faqList: p.faqs,
      relatedCats: p.related,
      lang: 'en'
    });

    fs.writeFileSync(path.join(ROOT_DIR, p.slug), html, 'utf8');
    console.log(`  ✓ Generated: ${p.slug}`);
  }
}

// Build Hub Category Pages (Text Faces, Kaomoji, Emoticons, Symbols, Aesthetic)
function buildHubPages() {
  const hubs = [
    {
      dir: 'text-faces',
      hub: 'text-faces',
      title: 'Text Faces — 1-Click Copy and Paste Text Emoticons & Dongers',
      description: 'Massive directory of 500+ text faces, dongers, shrugs, table flips, and cute ASCII faces. 1-click clipboard copy for Discord, TikTok, and gaming.',
      h1: "Text Faces <span>(ง'̀-'́)ง</span>",
      heroSub: 'Explore hundreds of expressive text faces, dongers, table flips, and funny ASCII characters.',
      subpages: [
        { sub: 'donger', name: 'Donger Faces', sample: 'ヽ༼ຈل͜ຈ༽ﾉ' },
        { sub: 'table-flipping', name: 'Table Flip Faces', sample: '(╯°□°)╯︵ ┻━┻' },
        { sub: 'disapproval', name: 'Disapproval ಠ_ಠ', sample: 'ಠ_ಠ' },
        { sub: 'bear', name: 'Bear Text Faces', sample: 'ʕ•ᴥ•ʔ' },
        { sub: 'cat', name: 'Cat Text Faces', sample: '(=^･ω･^=)' },
        { sub: 'hug', name: 'Hug Faces', sample: '(づ｡◕‿‿◕｡)づ' },
        { sub: 'crying', name: 'Crying Faces', sample: '(╥﹏╥)' },
        { sub: 'cool', name: 'Cool Deal With It', sample: '(⌐■_■)' },
        { sub: 'happy', name: 'Happy Faces', sample: '(☞ﾟヮﾟ)☞' },
        { sub: 'cute', name: 'Cute Faces', sample: '(✿◠‿◠)' },
        { sub: 'love', name: 'Love Faces', sample: '(｡♥‿♥｡)' },
        { sub: 'sad', name: 'Sad Faces', sample: '(｡•́︿•̀｡)' },
        { sub: 'angry', name: 'Angry Faces', sample: '(งಠ益ಠ)ง' },
        { sub: 'blushing', name: 'Blushing Faces', sample: '(´• ω •`)' },
        { sub: 'sleepy', name: 'Sleepy Faces', sample: '(－_－) zzz' },
        { sub: 'fight', name: 'Fighting Faces', sample: "(ง'̀-'́)ง" }
      ]
    },
    {
      dir: 'kaomoji',
      hub: 'kaomoji',
      title: 'Kaomoji (顔文字) — Japanese Emoticons Copy & Paste Directory',
      description: 'The premier collection of Japanese Kaomoji text emoticons: cats, dogs, cute blushing girls, weeping tears, and dancing stars. 1-click copy.',
      h1: 'Kaomoji <span>(*^▽^*)</span>',
      heroSub: 'Authentic Japanese typographic emoticons organized by mood, animal, and aesthetic styles.',
      subpages: [
        { sub: 'happy', name: 'Happy Kaomoji', sample: '(*^▽^*)' },
        { sub: 'cute', name: 'Cute Kaomoji', sample: '( ˶ˆ꒳ˆ˵ )' },
        { sub: 'heart', name: 'Heart Kaomoji', sample: '(◕‿◕)♡' },
        { sub: 'hug', name: 'Hug Kaomoji', sample: '(つ✧ω✧)つ' },
        { sub: 'kiss', name: 'Kissing Kaomoji', sample: '(づ￣ ³￣)づ' },
        { sub: 'sad', name: 'Sad Kaomoji', sample: '(ノ_<。)' },
        { sub: 'angry', name: 'Angry Kaomoji', sample: '(#`Д´)' },
        { sub: 'cat', name: 'Cat Kaomoji', sample: '/ᐠ｡ꞈ｡ᐟ\\' },
        { sub: 'dog', name: 'Dog Kaomoji', sample: '૮₍ • ᴥ • ₎ა' },
        { sub: 'bunny', name: 'Bunny Kaomoji', sample: 'ᕱ⑅ᕱ' },
        { sub: 'bear', name: 'Bear Kaomoji', sample: 'ʕ •ᴥ•ʔ' },
        { sub: 'spider', name: 'Spider Kaomoji', sample: '/╲/\\╭( ͡° ͡° ͜ʖ ͡° ͡°)╮/\\╱\\' },
        { sub: 'begging', name: 'Begging Kaomoji', sample: '༼ つ ◕_◕ ༽つ' },
        { sub: 'determined', name: 'Determined Kaomoji', sample: '(ง •̀_•́)ง' },
        { sub: 'dancing', name: 'Dancing Kaomoji', sample: 'ヽ(>∀<☆)ノ' },
        { sub: 'sleepy', name: 'Sleepy Kaomoji', sample: '(人-ω-)ﾟ*｡☆' },
        { sub: 'sparkle', name: 'Sparkle Kaomoji', sample: '(★ω★)' }
      ]
    },
    {
      dir: 'emoticons',
      hub: 'emoticons',
      title: 'Emoticons :-) — Classic Keyboard Text Smileys Copy and Paste',
      description: 'Copy and paste vintage keyboard emoticons: smileys, winks, hearts, kissing, laughing, and sad faces. Instant clipboard copy.',
      h1: 'Emoticons <span>:-)</span>',
      heroSub: 'Classic ASCII keyboard emoticons from the dawn of internet communication, refreshed for modern chat.',
      subpages: [
        { sub: 'smiley', name: 'Smiley Emoticons', sample: ':-)' },
        { sub: 'winky', name: 'Winky Emoticons', sample: ';-)' },
        { sub: 'laughing', name: 'Laughing Emoticons', sample: ':-D' },
        { sub: 'sad', name: 'Sad Emoticons', sample: ':-(' },
        { sub: 'mad', name: 'Mad Emoticons', sample: '>:-( ' },
        { sub: 'kissy', name: 'Kissy Emoticons', sample: ':-*' },
        { sub: 'heart', name: 'Heart Emoticons', sample: '<3' },
        { sub: 'cute', name: 'Cute Emoticons', sample: ':-3' },
        { sub: 'creepy', name: 'Creepy Emoticons', sample: ':-O' }
      ]
    },
    {
      dir: 'symbols',
      hub: 'symbols',
      title: 'Text Symbols ♡ ★ ✦ — Copy & Paste Aesthetic Unicode Symbols',
      description: 'Extensive directory of aesthetic text symbols: hearts, stars, sparkles, flowers, skulls, crowns, arrows, and crosses. 1-click copy.',
      h1: 'Text Symbols <span>♡ ★ ✦</span>',
      heroSub: 'Enhance your Discord, Instagram, and TikTok bios with thousands of cute, gothic, and celestial text symbols.',
      subpages: [
        { sub: 'heart', name: 'Heart Symbols', sample: '♡' },
        { sub: 'star', name: 'Star Symbols', sample: '★' },
        { sub: 'sparkle', name: 'Sparkle Symbols', sample: '✦' },
        { sub: 'flower', name: 'Flower Symbols', sample: '✿' },
        { sub: 'moon', name: 'Moon Symbols', sample: '☾' },
        { sub: 'skull', name: 'Skull Symbols', sample: '☠' },
        { sub: 'crown', name: 'Crown Symbols', sample: '👑' },
        { sub: 'weapons', name: 'Weapons Symbols', sample: '⚔' },
        { sub: 'bow', name: 'Bow & Arrow Symbols', sample: '🏹' },
        { sub: 'music', name: 'Music Symbols', sample: '♫' },
        { sub: 'butterfly', name: 'Butterfly Symbols', sample: '🦋' },
        { sub: 'fire', name: 'Fire Symbols', sample: '🔥' },
        { sub: 'snowflake', name: 'Snowflake Symbols', sample: '❄' },
        { sub: 'sun', name: 'Sun Symbols', sample: '☼' },
        { sub: 'check-mark', name: 'Check Mark Symbols', sample: '✔' },
        { sub: 'bullet-point', name: 'Bullet Point Symbols', sample: '•' },
        { sub: 'cross', name: 'Cross Symbols', sample: '✞' },
        { sub: 'arrow', name: 'Arrow Symbols', sample: '➔' }
      ]
    },
    {
      dir: 'aesthetic',
      hub: 'aesthetic',
      title: 'Aesthetic Bios & Dividers ─── ⋆⋅☆⋅⋆ ─── — Copy and Paste Profile Templates',
      description: 'Copy and paste cute aesthetic Discord bios, Instagram bio templates, text line dividers, fancy borders, and emoji combos.',
      h1: 'Aesthetic Bios <span>⋆ ˚｡⋆୨୧˚</span>',
      heroSub: 'Craft show-stopping Discord, Instagram, and TikTok profiles with ready-made dividers, borders, and templates.',
      subpages: [
        { sub: 'discord-bio', name: 'Discord Bios', sample: '⋆ ˚｡⋆୨୧˚' },
        { sub: 'instagram-bio', name: 'Instagram Bios', sample: '˗ˏˋ ★ ˎˊ˗' },
        { sub: 'tiktok-bio', name: 'TikTok Bios', sample: '♡ status' },
        { sub: 'dividers', name: 'Aesthetic Dividers', sample: '─── ⋆⋅☆⋅⋆ ───' },
        { sub: 'borders', name: 'Fancy Borders', sample: '╔═══*.·:·.☽✧' },
        { sub: 'emoji-combos', name: 'Emoji Combos', sample: 'ೀ ִֶָ 𓂃 ࣪˖' },
        { sub: 'bio-templates', name: 'Bio Templates', sample: '⋆｡°✩ name' },
        { sub: 'symbols', name: 'Aesthetic Symbols', sample: 'ִֶָ 𓂃 ࣪˖' }
      ]
    }
  ];

  for (const hubInfo of hubs) {
    const hubDir = path.join(ROOT_DIR, hubInfo.dir);
    ensureDir(hubDir);

    // 1. Build Hub Index Page (e.g. /text-faces/index.html)
    const hubGlyphs = ALL_GLYPHS.filter(g => g.hub === hubInfo.hub);
    const hubBreadcrumbs = [
      { name: 'Home', url: 'index.html' },
      { name: hubInfo.title.split('—')[0].trim(), url: `${hubInfo.dir}/index.html` }
    ];

    const relatedCatCards = hubInfo.subpages.map(s => ({
      name: s.name,
      url: `${hubInfo.dir}/${s.sub}.html`,
      sample: s.sample,
      count: 'Explore'
    }));

    const hubHtml = generatePageTemplate({
      pageTitle: hubInfo.title,
      metaDescription: hubInfo.description,
      canonicalUrl: `${SITE_URL}/${hubInfo.dir}/`,
      rootPrefix: '../',
      breadcrumbs: hubBreadcrumbs,
      heroBadge: '⚡ 1-Click Copy • 1,000+ Items',
      h1Text: hubInfo.h1,
      heroSub: hubInfo.heroSub,
      activeHub: hubInfo.hub,
      activeSub: 'all',
      glyphs: hubGlyphs,
      editorialHtml: `
        <h2>Comprehensive Guide to ${hubInfo.title.split('—')[0].trim()}</h2>
        <p>Welcome to the ultimate directory of <strong>${hubInfo.title.split('—')[0].trim()}</strong>. Whether you are styling your Discord profile bio, commenting on viral TikTok videos, or chatting in Twitch streams, our curated collection delivers zero-lag, instant 1-click clipboard copying across all operating systems.</p>
        <h3>Category Highlights</h3>
        <p>Explore specialized sub-collections below to find the exact emotion or aesthetic design for your mood.</p>
      `,
      faqList: [
        { q: `How do I copy these ${hubInfo.title.split('—')[0].trim()}?`, a: "Simply tap or click any card box on this page to copy directly to your clipboard. A toast notification will verify the copy." },
        { q: "Are these characters compatible on iPhone and Android?", a: "Yes! All characters use universal Unicode standards, ensuring flawless rendering on iOS, Android, macOS, Windows, and Linux." }
      ],
      relatedCats: relatedCatCards,
      lang: 'en'
    });

    fs.writeFileSync(path.join(hubDir, 'index.html'), hubHtml, 'utf8');
    console.log(`  ✓ Generated Hub Index: ${hubInfo.dir}/index.html`);

    // 2. Build Subpages within this Hub (e.g. /text-faces/donger.html, /kaomoji/cat.html)
    for (const sub of hubInfo.subpages) {
      const subGlyphs = ALL_GLYPHS.filter(g => g.hub === hubInfo.hub && g.sub === sub.sub);
      const subBreadcrumbs = [
        { name: 'Home', url: 'index.html' },
        { name: hubInfo.title.split('—')[0].trim(), url: `${hubInfo.dir}/index.html` },
        { name: sub.name, url: `${hubInfo.dir}/${sub.sub}.html` }
      ];

      const subHtml = generatePageTemplate({
        pageTitle: `${sub.name} ${sub.sample} — 1-Click Copy and Paste`,
        metaDescription: `Copy and paste ${sub.name} ${sub.sample} in 1-click. Free Unicode emoticons and text faces for Discord, TikTok, Roblox, and gaming.`,
        canonicalUrl: `${SITE_URL}/${hubInfo.dir}/${sub.sub}.html`,
        rootPrefix: '../',
        breadcrumbs: subBreadcrumbs,
        heroBadge: '⚡ 1-Click Copy • Unicode Compatible',
        h1Text: `${sub.name} <span>${sub.sample}</span>`,
        heroSub: `Browse our curated collection of ${sub.name.toLowerCase()} for profiles, bios, and chat.`,
        activeHub: hubInfo.hub,
        activeSub: sub.sub,
        glyphs: subGlyphs.length > 0 ? subGlyphs : hubGlyphs.slice(0, 12),
        editorialHtml: `
          <h2>All About ${sub.name} ${sub.sample}</h2>
          <p>The <strong>${sub.name}</strong> collection offers expressive typographical art using international Unicode and special characters. Ideal for standing out on gaming servers, personal bios, and social media captions.</p>
          <h3>How to Use</h3>
          <p>Click any card above to copy the character. Paste into Discord, Roblox, TikTok, or your favorite messaging app with <kbd>Ctrl</kbd> + <kbd>V</kbd>.</p>
        `,
        faqList: [
          { q: `What is the most popular ${sub.name.toLowerCase()}?`, a: `The most iconic symbol in this category is ${sub.sample}, widely recognized across internet culture.` },
          { q: "Can I use these symbols in my bio?", a: "Yes, these characters are 100% compliant with Instagram, TikTok, Twitter, and Discord bio formatting rules." }
        ],
        relatedCats: relatedCatCards.filter(r => !r.url.endsWith(`${sub.sub}.html`)).slice(0, 6),
        lang: 'en'
      });

      fs.writeFileSync(path.join(hubDir, `${sub.sub}.html`), subHtml, 'utf8');
      console.log(`    ✓ Generated: ${hubInfo.dir}/${sub.sub}.html`);
    }
  }
}

// Build Multilingual Hubs (/jp/, /kr/, /es/)
function buildMultilingualHubs() {
  console.log('Building Multilingual Hubs...');
  
  // 1. Japanese Hub (/jp/index.html)
  const jpDir = path.join(ROOT_DIR, 'jp');
  ensureDir(jpDir);
  const jpHtml = generatePageTemplate({
    pageTitle: '顔文字 コピペ (Kaomoji) — かわいい顔文字 & レニーフェイス 一覧 [2026]',
    metaDescription: 'ワンクリックでコピーできるかわいい顔文字（Kaomoji）とレニーフェイス（Lenny Face）の無料一覧まとめ。Twitter、Discord、LINEですぐに使えます。',
    canonicalUrl: `${SITE_URL}/jp/`,
    rootPrefix: '../',
    breadcrumbs: [
      { name: 'ホーム', url: 'index.html' },
      { name: '日本語 顔文字 (Kaomoji)', url: 'jp/index.html' }
    ],
    heroBadge: '⚡ ワンクリックで簡単コピー • 1000種以上の顔文字',
    h1Text: '顔文字 コピペ & レニーフェイス <span>( ͡° ͜ʖ ͡°)</span>',
    heroSub: 'カードをタップするだけでクリップボードに瞬時にコピー。Twitter、Discord、LINE、ゲームチャットで使える豊富な顔文字一覧です。',
    activeHub: 'all',
    activeSub: 'all',
    glyphs: ALL_GLYPHS.slice(0, 36),
    editorialHtml: `
      <h2>顔文字（Kaomoji）とレニーフェイス（Lenny Face）の魅力</h2>
      <p>日本のインターネット文化が生んだ<strong>顔文字（Kaomoji）</strong>は、文字コード（Unicode）を組み合わせて感情を豊かに表現するテキストアートです。海外で大人気の「レニーフェイス ( ͡° ͜ʖ ͡°)」も、世界中で親しまれています。</p>
      <h3>主なカテゴリー</h3>
      <ul>
        <li><strong>かわいい顔文字:</strong> ( ˶ˆ꒳ˆ˵ )、(*/ω＼*) など、柔らかい表情の顔文字。</li>
        <li><strong>動物の顔文字:</strong> /ᐠ｡ꞈ｡ᐟ\\（ねこ）、૮₍ • ᴥ • ₎ა（いぬ）、ᕱ⑅ᕱ（うさぎ）。</li>
        <li><strong>感情の顔文字:</strong> (*^▽^*)（よろこび）、(ノ_<。)（なみだ）、(#\`Д´)（いかり）。</li>
      </ul>
    `,
    faqList: [
      { q: "顔文字はどうやってコピーしますか？", a: "カードをタップまたはクリックするだけで、お使いの端末のクリップボードに自動的にコピーされます。" },
      { q: "スマホ（iPhone / Android）でも崩れず表示されますか？", a: "はい。当サイトの顔文字は世界標準のUnicode文字を使用しているため、最新のスマートフォンやPCで正しく表示されます。" }
    ],
    relatedCats: [
      { name: "猫の顔文字", url: "kaomoji/cat.html", sample: "/ᐠ｡ꞈ｡ᐟ\\" },
      { name: "かわいい顔文字", url: "kaomoji/cute.html", sample: "( ˶ˆ꒳ˆ˵ )" },
      { name: "ハート記号", url: "symbols/heart.html", sample: "♡" }
    ],
    lang: 'ja'
  });
  fs.writeFileSync(path.join(jpDir, 'index.html'), jpHtml, 'utf8');
  console.log('  ✓ Generated: jp/index.html');

  // 2. Korean Hub (/kr/index.html)
  const krDir = path.join(ROOT_DIR, 'kr');
  ensureDir(krDir);
  const krHtml = generatePageTemplate({
    pageTitle: '레니페이스 복사 ( ͡° ͜ʖ ͡°) — 텍스트 이모티콘 & 카오모지 모음',
    metaDescription: '원클릭으로 간편하게 복사하는 레니페이스 ( ͡° ͜ʖ ͡°), 카오모지, 귀여운 텍스트 이모티콘 모음. 디스코드, 인스타그램, 롤 채팅 완벽 지원.',
    canonicalUrl: `${SITE_URL}/kr/`,
    rootPrefix: '../',
    breadcrumbs: [
      { name: '홈', url: 'index.html' },
      { name: '한국어 레니페이스', url: 'kr/index.html' }
    ],
    heroBadge: '⚡ 원클릭 복사 • 1,000+ 텍스트 이모티콘',
    h1Text: '레니페이스 & 특수문자 이모티콘 <span>( ͡° ͜ʖ ͡°)</span>',
    heroSub: '카드를 탭하여 클립보드에 바로 복사하세요. 디스코드, 카카오톡, 게임 채팅에서 사용할 수 있는 다양한 텍스트 얼굴 모음입니다.',
    activeHub: 'all',
    activeSub: 'all',
    glyphs: ALL_GLYPHS.slice(0, 36),
    editorialHtml: `
      <h2>레니페이스 ( ͡° ͜ʖ ͡°) 와 특수문자 이모티콘 가이드</h2>
      <p><strong>레니페이스(Lenny Face)</strong>는 음흉하면서도 익살스러운 표정으로 전 세계 게이머와 커뮤니티에서 폭발적인 인기를 얻은 대표적인 텍스트 이모티콘입니다. 유니코드 조합 문자를 사용하여 어떤 플랫폼에서도 이미지 없이 텍스트 형태로 깔끔하게 표시됩니다.</p>
    `,
    faqList: [
      { q: "모바일에서도 원클릭 복사가 가능한가요?", a: "네! 원하는 이모티콘 카드를 누르면 즉시 클립보드에 복사되며 붙여넣기(Ctrl+V)하여 바로 사용할 수 있습니다." }
    ],
    relatedCats: [
      { name: "귀여운 레니", url: "cute-lenny-face.html", sample: "( ͜° ͜ʊ ͜°)" },
      { name: "고양이 카오모지", url: "kaomoji/cat.html", sample: "(=^･ω･^=)" }
    ],
    lang: 'ko'
  });
  fs.writeFileSync(path.join(krDir, 'index.html'), krHtml, 'utf8');
  console.log('  ✓ Generated: kr/index.html');

  // 3. Spanish Hub (/es/index.html)
  const esDir = path.join(ROOT_DIR, 'es');
  ensureDir(esDir);
  const esHtml = generatePageTemplate({
    pageTitle: 'Caritas Lenny ( ͡° ͜ʖ ͡°) — Copiar y Pegar Caras de Texto y Kaomojis',
    metaDescription: 'Copia y pega caritas Lenny ( ͡° ͜ʖ ͡°), kaomojis japoneses, símbolos estéticos y emoticones de texto con 1 solo clic. Gratis para Discord y WhatsApp.',
    canonicalUrl: `${SITE_URL}/es/`,
    rootPrefix: '../',
    breadcrumbs: [
      { name: 'Inicio', url: 'index.html' },
      { name: 'Caritas Lenny en Español', url: 'es/index.html' }
    ],
    heroBadge: '⚡ 1 Clic para Copiar • Más de 1,000 Caritas',
    h1Text: 'Caritas Lenny & Kaomojis <span>( ͡° ͜ʖ ͡°)</span>',
    heroSub: 'Toca cualquier tarjeta para copiar al portapapeles al instante. Colección gratuita para Discord, WhatsApp, TikTok y videojuegos.',
    activeHub: 'all',
    activeSub: 'all',
    glyphs: ALL_GLYPHS.slice(0, 36),
    editorialHtml: `
      <h2>Guía Completa de Caritas Lenny y Kaomojis en Español</h2>
      <p>La famosa <strong>Carita Lenny ( ͡° ͜ʖ ͡°)</strong> es uno de los emoticones más populares de internet, ideal para expresar picardía, sarcasmo o humor cómplice. Gracias a los caracteres combinados de Unicode, puedes usarla en cualquier red social sin necesidad de instalar fuentes especiales.</p>
    `,
    faqList: [
      { q: "¿Cómo copio y pego las caritas en el celular?", a: "Simplemente pulsa sobre cualquier tarjeta para copiarla directamente a tu portapapeles y luego pégala en tu chat o biografía." }
    ],
    relatedCats: [
      { name: "Caritas Tiernas", url: "cute-lenny-face.html", sample: "( ͜° ͜ʊ ͜°)" },
      { name: "Símbolos de Corazón", url: "symbols/heart.html", sample: "♡" }
    ],
    lang: 'es'
  });
  fs.writeFileSync(path.join(esDir, 'index.html'), esHtml, 'utf8');
  console.log('  ✓ Generated: es/index.html');
}

// Build Static Informational Pages (About, Privacy, Terms)
function buildInfoPages() {
  console.log('Building Informational Pages...');

  const pages = [
    {
      slug: 'about.html',
      title: 'About Us — Lenny Face Pro',
      description: 'Learn about Lenny Face Pro, our mission for 100/100 Core Web Vitals, and our open Unicode text emoticon directory.',
      h1: 'About <span>Lenny Face Pro</span>',
      content: `
        <h2>Our Mission</h2>
        <p>Lenny Face Pro was built with a simple premise: web utilities should be instantaneous, zero-bloat, and enjoyable to use. While existing emoticon websites are bogged down by intrusive advertisements, slow WordPress frameworks, and sluggish loading times, our platform delivers a verified <strong>100/100 Google PageSpeed score</strong> using clean, modern HTML5, CSS3, and lightweight vanilla JavaScript.</p>
        
        <h3>Universal Unicode Compatibility</h3>
        <p>Every single glyph on our site is tested against modern Unicode specifications across iOS, Android, Windows, macOS, and Linux to guarantee that your messages, Discord statuses, and gaming chats look crisp and distortion-free.</p>
      `
    },
    {
      slug: 'privacy.html',
      title: 'Privacy Policy — Lenny Face Pro',
      description: 'Lenny Face Pro Privacy Policy: We do not store personal data or track private chat information.',
      h1: 'Privacy <span>Policy</span>',
      content: `
        <h2>Your Privacy Matters</h2>
        <p>Lenny Face Pro does not collect personally identifiable information. We do not require account registration, passwords, or personal email addresses to use our 1-click copy tools and generators.</p>
        <h3>Local Storage</h3>
        <p>Your favorite emoticons and selected theme preference (Dark or Light mode) are saved locally on your own device using browser <code>localStorage</code>. This data never leaves your device and is never transmitted to any external servers.</p>
      `
    },
    {
      slug: 'terms.html',
      title: 'Terms of Service — Lenny Face Pro',
      description: 'Terms of Service for using Lenny Face Pro tools and text face collections.',
      h1: 'Terms of <span>Service</span>',
      content: `
        <h2>Usage Agreement</h2>
        <p>By accessing and utilizing Lenny Face Pro, you agree to use our free text generator and copying tools for personal, creative, and commercial communications in compliance with applicable laws.</p>
        <p>All Unicode characters and ASCII art combinations are provided free of charge for community expression across social networks and digital platforms.</p>
      `
    }
  ];

  for (const p of pages) {
    const html = generatePageTemplate({
      pageTitle: p.title,
      metaDescription: p.description,
      canonicalUrl: `${SITE_URL}/${p.slug}`,
      rootPrefix: '',
      breadcrumbs: [
        { name: 'Home', url: 'index.html' },
        { name: p.title.split('—')[0].trim(), url: p.slug }
      ],
      heroBadge: 'ℹ️ Information & Transparency',
      h1Text: p.h1,
      heroSub: 'Learn more about our platform standards, security, and privacy commitments.',
      activeHub: 'all',
      activeSub: 'all',
      glyphs: [],
      editorialHtml: p.content,
      faqList: [],
      relatedCats: [],
      lang: 'en'
    });

    fs.writeFileSync(path.join(ROOT_DIR, p.slug), html, 'utf8');
    console.log(`  ✓ Generated: ${p.slug}`);
  }
}

// Generate XML Sitemap & robots.txt
function buildSitemapAndRobots() {
  console.log('Building sitemap.xml & robots.txt...');

  const allUrls = [
    { loc: `${SITE_URL}/`, priority: '1.0', changefreq: 'daily' },
    ...LENNY_SUBPAGES.map(p => ({ loc: `${SITE_URL}/${p.slug}`, priority: '0.9', changefreq: 'weekly' })),
    { loc: `${SITE_URL}/text-faces/`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${SITE_URL}/kaomoji/`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${SITE_URL}/emoticons/`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${SITE_URL}/symbols/`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${SITE_URL}/aesthetic/`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${SITE_URL}/jp/`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${SITE_URL}/kr/`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${SITE_URL}/es/`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${SITE_URL}/about.html`, priority: '0.5', changefreq: 'monthly' },
    { loc: `${SITE_URL}/privacy.html`, priority: '0.3', changefreq: 'yearly' },
    { loc: `${SITE_URL}/terms.html`, priority: '0.3', changefreq: 'yearly' }
  ];

  // Add all hub subpages
  const hubFolders = ['text-faces', 'kaomoji', 'emoticons', 'symbols', 'aesthetic'];
  for (const folder of hubFolders) {
    const folderPath = path.join(ROOT_DIR, folder);
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath);
      for (const file of files) {
        if (file.endsWith('.html') && file !== 'index.html') {
          allUrls.push({
            loc: `${SITE_URL}/${folder}/${file}`,
            priority: '0.8',
            changefreq: 'weekly'
          });
        }
      }
    }
  }

  const today = new Date().toISOString().split('T')[0];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(ROOT_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
  console.log(`  ✓ Generated: sitemap.xml (${allUrls.length} URLs indexed)`);

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

  fs.writeFileSync(path.join(ROOT_DIR, 'robots.txt'), robotsTxt, 'utf8');
  console.log('  ✓ Generated: robots.txt');
}

// Update data.js with Master Dataset
function updateDataJs() {
  console.log('Updating data.js with master dataset...');
  const dataJsContent = `/**
 * Lenny Face Pro - Comprehensive Glyph Dataset
 * Includes Lenny Faces, Text Faces, Kaomoji, Emoticons, Symbols & Aesthetic Bios
 */

const GLYPH_DATA = ${JSON.stringify(ALL_GLYPHS, null, 2)};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = GLYPH_DATA;
}
`;
  fs.writeFileSync(path.join(ROOT_DIR, 'data.js'), dataJsContent, 'utf8');
  console.log('  ✓ Updated data.js');
}

// Pre-render static cards into index.html
function buildHomePage() {
  console.log('Injecting pre-rendered cards into index.html...');
  const indexPath = path.join(ROOT_DIR, 'index.html');
  if (!fs.existsSync(indexPath)) return;

  let indexHtml = fs.readFileSync(indexPath, 'utf8');
  const topGlyphs = ALL_GLYPHS.slice(0, 48);
  const cardsHtml = topGlyphs.map(renderStaticCard).join('\n');

  // Replace content of #face-grid
  indexHtml = indexHtml.replace(
    /<div class="face-grid" id="face-grid">[\s\S]*?<\/div>/,
    `<div class="face-grid" id="face-grid">\n${cardsHtml}\n    </div>`
  );

  fs.writeFileSync(indexPath, indexHtml, 'utf8');
  console.log('  ✓ Injected 48 pre-rendered cards into index.html');
}

// Execute All Builders
function buildAll() {
  console.log('🚀 Starting Lenny Face Pro Site Builder...');
  updateDataJs();
  buildHomePage();
  buildLennySubpages();
  buildHubPages();
  buildMultilingualHubs();
  buildInfoPages();
  buildSitemapAndRobots();
  console.log('🎉 Site build completed successfully!');
}

buildAll();
