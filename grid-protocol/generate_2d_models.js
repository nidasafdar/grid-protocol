// scratch/generate_2d_models.js
import fs from 'fs';
import path from 'path';

const targetDir = 'c:/Users/mbila/Documents/Grid Protocol/grid-protocol/public/models2d';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Master models dictionary with SVG markup generator for each model
const models = [
  // --- 1. CHARACTERS & POPULATION LIFECYCLE ---
  {
    id: 'child',
    name: 'Child',
    category: 'Population',
    description: 'Young boy in medieval flaxen tunic (Ages 0-10, consumes food, future empire investment)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fbd38d"/><stop offset="100%" stop-color="#ed8936"/></linearGradient>
    <linearGradient id="tunic" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#9c4221"/><stop offset="100%" stop-color="#652b19"/></linearGradient>
    <linearGradient id="hair" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#d69e2e"/><stop offset="100%" stop-color="#975a16"/></linearGradient>
  </defs>
  <ellipse cx="50" cy="94" rx="20" ry="5" fill="#000" opacity="0.3"/>
  <!-- Legs / Pants -->
  <rect x="42" y="70" width="6" height="20" rx="3" fill="#4a5568"/>
  <rect x="52" y="70" width="6" height="20" rx="3" fill="#4a5568"/>
  <rect x="40" y="87" width="9" height="6" rx="2" fill="#2d3748"/>
  <rect x="51" y="87" width="9" height="6" rx="2" fill="#2d3748"/>
  <!-- Tunic body -->
  <path d="M38 45 L62 45 L67 72 L33 72 Z" fill="url(#tunic)"/>
  <rect x="36" y="58" width="28" height="4" fill="#2d3748"/>
  <rect x="48" y="57" width="4" height="6" fill="#ecc94b"/>
  <!-- Arms -->
  <rect x="30" y="47" width="8" height="18" rx="4" transform="rotate(15 34 56)" fill="url(#tunic)"/>
  <circle cx="28" cy="66" r="3.5" fill="url(#skin)"/>
  <rect x="62" y="47" width="8" height="18" rx="4" transform="rotate(-15 66 56)" fill="url(#tunic)"/>
  <circle cx="72" cy="66" r="3.5" fill="url(#skin)"/>
  <!-- Head & Hair -->
  <circle cx="50" cy="30" r="14" fill="url(#skin)"/>
  <path d="M36 28 Q50 12 64 28 Q64 16 50 14 Q36 16 36 28 Z" fill="url(#hair)"/>
  <!-- Face -->
  <circle cx="45" cy="29" r="1.5" fill="#2d3748"/>
  <circle cx="55" cy="29" r="1.5" fill="#2d3748"/>
  <path d="M47 36 Q50 39 53 36" stroke="#c53030" stroke-width="1.5" fill="none" stroke-linecap="round"/>
</svg>`
  },
  {
    id: 'young_man',
    name: 'Young Man',
    category: 'Population',
    description: 'Adult peasant in green work tunic with axe (Ages 10-25, core labor & military recruit)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="ym_tunic" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#38a169"/><stop offset="100%" stop-color="#22543d"/></linearGradient>
    <linearGradient id="ym_pants" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#744210"/><stop offset="100%" stop-color="#442606"/></linearGradient>
  </defs>
  <ellipse cx="50" cy="95" rx="24" ry="5" fill="#000" opacity="0.3"/>
  <!-- Axe on shoulder -->
  <line x1="28" y1="75" x2="72" y2="15" stroke="#795548" stroke-width="3" stroke-linecap="round"/>
  <path d="M68 18 L78 12 L76 25 L66 22 Z" fill="#718096" stroke="#4a5568"/>
  <!-- Boots & Legs -->
  <rect x="40" y="68" width="8" height="24" rx="3" fill="url(#ym_pants)"/>
  <rect x="52" y="68" width="8" height="24" rx="3" fill="url(#ym_pants)"/>
  <rect x="38" y="88" width="11" height="6" rx="2" fill="#1a202c"/>
  <rect x="51" y="88" width="11" height="6" rx="2" fill="#1a202c"/>
  <!-- Tunic -->
  <path d="M33 38 L67 38 L72 70 L28 70 Z" fill="url(#ym_tunic)"/>
  <rect x="31" y="54" width="38" height="4" fill="#2d3748"/>
  <!-- Head -->
  <circle cx="50" cy="24" r="13" fill="#fbd38d"/>
  <path d="M37 20 Q50 8 63 20 Q57 12 50 12 Q43 12 37 20 Z" fill="#4a5568"/>
  <circle cx="46" cy="23" r="1.5" fill="#1a202c"/>
  <circle cx="54" cy="23" r="1.5" fill="#1a202c"/>
  <path d="M46 30 Q50 33 54 30" stroke="#744210" stroke-width="1.5" fill="none"/>
</svg>`
  },
  {
    id: 'old_man',
    name: 'Old Man (Council Elder)',
    category: 'Population',
    description: 'Venerable elder advisor in brown robe with long white beard (Ages 25-40, boosts loyalty & tech)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="robe" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4a3b32"/><stop offset="100%" stop-color="#2d221c"/></linearGradient>
  </defs>
  <ellipse cx="50" cy="95" rx="22" ry="5" fill="#000" opacity="0.3"/>
  <path d="M32 35 L68 35 L75 92 L25 92 Z" fill="url(#robe)"/>
  <!-- Staff in hand -->
  <line x1="74" y1="94" x2="74" y2="25" stroke="#8d6e63" stroke-width="3" stroke-linecap="round"/>
  <circle cx="74" cy="24" r="4" fill="#d7ccc8"/>
  <!-- Head & Long White Beard -->
  <circle cx="50" cy="22" r="12" fill="#fbd38d"/>
  <path d="M41 24 C40 38 60 38 59 24 C57 32 43 32 41 24 Z" fill="#e2e8f0"/>
  <path d="M43 28 L50 48 L57 28 Z" fill="#edf2f7"/>
  <circle cx="46" cy="20" r="1.5" fill="#2d3748"/>
  <circle cx="54" cy="20" r="1.5" fill="#2d3748"/>
  <!-- Hood/Cowl -->
  <path d="M38 18 Q50 8 62 18 L64 26 L36 26 Z" fill="#3e2723"/>
</svg>`
  },
  {
    id: 'king',
    name: 'The King / Lord of the Keep',
    category: 'Regicide & Royalty',
    description: 'The sovereign Lord in gilded plate armor, royal red mantle, holding broadsword (Regicide target)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="gold_crown" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f6e05e"/><stop offset="100%" stop-color="#d69e2e"/></linearGradient>
    <linearGradient id="mantle" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#9b2c2c"/><stop offset="100%" stop-color="#63171b"/></linearGradient>
    <linearGradient id="steel" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#e2e8f0"/><stop offset="100%" stop-color="#718096"/></linearGradient>
  </defs>
  <ellipse cx="50" cy="96" rx="26" ry="5" fill="#000" opacity="0.3"/>
  <!-- Royal Mantle Cape -->
  <path d="M22 34 L78 34 L82 92 L18 92 Z" fill="url(#mantle)"/>
  <!-- Broadsword planted in ground -->
  <line x1="50" y1="46" x2="50" y2="92" stroke="#a0aec0" stroke-width="4"/>
  <line x1="42" y1="52" x2="58" y2="52" stroke="#d69e2e" stroke-width="3"/>
  <circle cx="50" cy="46" r="3.5" fill="#d69e2e"/>
  <!-- Steel Breastplate Body -->
  <path d="M34 32 L66 32 L62 70 L38 70 Z" fill="url(#steel)"/>
  <!-- Pauldrons / Shoulders -->
  <ellipse cx="32" cy="35" rx="7" ry="6" fill="#a0aec0"/>
  <ellipse cx="68" cy="35" rx="7" ry="6" fill="#a0aec0"/>
  <!-- Head & Crown -->
  <circle cx="50" cy="20" r="11" fill="#fbd38d"/>
  <!-- Golden Crown -->
  <path d="M40 14 L40 7 L44 11 L50 6 L56 11 L60 7 L60 14 Z" fill="url(#gold_crown)"/>
  <!-- Face details -->
  <circle cx="47" cy="20" r="1.5" fill="#1a202c"/>
  <circle cx="53" cy="20" r="1.5" fill="#1a202c"/>
  <path d="M46 25 Q50 28 54 25" stroke="#744210" stroke-width="1.5" fill="none"/>
</svg>`
  },
  {
    id: 'scribe',
    name: 'Castle Scribe',
    category: 'Administration',
    description: 'Castle advisor reading scrolls ("The people love you, Sire!", "Wood is low!")',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="95" rx="20" ry="5" fill="#000" opacity="0.3"/>
  <path d="M35 36 L65 36 L70 92 L30 92 Z" fill="#2c5282"/>
  <circle cx="50" cy="22" r="12" fill="#fbd38d"/>
  <path d="M40 18 Q50 10 60 18 L62 25 L38 25 Z" fill="#1a365d"/>
  <!-- Scroll held in hands -->
  <rect x="36" y="48" width="28" height="20" rx="3" fill="#fefcbf" stroke="#d69e2e" stroke-width="1.5"/>
  <line x1="40" y1="53" x2="60" y2="53" stroke="#744210" stroke-width="1"/>
  <line x1="40" y1="58" x2="58" y2="58" stroke="#744210" stroke-width="1"/>
  <line x1="40" y1="63" x2="55" y2="63" stroke="#744210" stroke-width="1"/>
  <!-- Quill in hand -->
  <line x1="64" y1="46" x2="72" y2="40" stroke="#ecc94b" stroke-width="2"/>
</svg>`
  },
  // --- 2. MILITARY UNITS & COMBATANTS ---
  {
    id: 'spearman',
    name: 'Spearman',
    category: 'Military Units',
    description: 'Light infantry armed with long spear (Pushes ladders off walls, digs moats)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="95" rx="22" ry="5" fill="#000" opacity="0.3"/>
  <!-- Spear -->
  <line x1="72" y1="94" x2="72" y2="6" stroke="#8d6e63" stroke-width="3"/>
  <polygon points="72,4 68,14 76,14" fill="#cbd5e0" stroke="#718096"/>
  <!-- Body & Padded Jerkin -->
  <rect x="42" y="68" width="7" height="24" fill="#4a5568"/>
  <rect x="51" y="68" width="7" height="24" fill="#4a5568"/>
  <path d="M35 34 L65 34 L68 68 L32 68 Z" fill="#c05621"/>
  <!-- Small wooden buckler -->
  <circle cx="34" cy="52" r="10" fill="#744210" stroke="#ecc94b" stroke-width="1.5"/>
  <circle cx="34" cy="52" r="3" fill="#cbd5e0"/>
  <!-- Head & Skull Cap -->
  <circle cx="50" cy="22" r="11" fill="#fbd38d"/>
  <path d="M39 20 Q50 11 61 20 L61 23 L39 23 Z" fill="#718096"/>
</svg>`
  },
  {
    id: 'archer',
    name: 'Archer',
    category: 'Military Units',
    description: 'Yew longbow marksman with arrow quiver (Fires flaming arrows at pitch ditches)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="95" rx="20" ry="5" fill="#000" opacity="0.3"/>
  <!-- Longbow -->
  <path d="M72 15 Q86 50 72 85" fill="none" stroke="#744210" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="72" y1="15" x2="72" y2="85" stroke="#e2e8f0" stroke-width="1"/>
  <!-- Quiver on back -->
  <rect x="28" y="28" width="8" height="28" rx="2" transform="rotate(-20 32 42)" fill="#8d6e63"/>
  <line x1="26" y1="26" x2="28" y2="20" stroke="#e2e8f0" stroke-width="1.5"/>
  <line x1="30" y1="26" x2="33" y2="18" stroke="#e2e8f0" stroke-width="1.5"/>
  <!-- Archer body -->
  <rect x="42" y="68" width="7" height="24" fill="#2d3748"/>
  <rect x="51" y="68" width="7" height="24" fill="#2d3748"/>
  <path d="M35 34 L65 34 L68 68 L32 68 Z" fill="#2f855a"/>
  <circle cx="50" cy="22" r="11" fill="#fbd38d"/>
  <path d="M39 20 Q50 10 61 20 L63 24 L37 24 Z" fill="#22543d"/>
</svg>`
  },
  {
    id: 'crossbowman',
    name: 'Crossbowman',
    category: 'Military Units',
    description: 'Leather-armored defender with mechanical steel crossbow (Armor piercing)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="95" rx="22" ry="5" fill="#000" opacity="0.3"/>
  <!-- Leather Armor body -->
  <rect x="41" y="68" width="8" height="24" fill="#2d3748"/>
  <rect x="51" y="68" width="8" height="24" fill="#2d3748"/>
  <path d="M34 32 L66 32 L68 68 L32 68 Z" fill="#744210"/>
  <!-- Crossbow in hands -->
  <rect x="48" y="44" width="28" height="5" fill="#8d6e63"/>
  <path d="M72 32 Q78 46 72 60" fill="none" stroke="#a0aec0" stroke-width="3"/>
  <line x1="72" y1="32" x2="52" y2="46" stroke="#cbd5e0" stroke-width="1"/>
  <line x1="72" y1="60" x2="52" y2="46" stroke="#cbd5e0" stroke-width="1"/>
  <!-- Steel Kettle Helmet -->
  <circle cx="50" cy="22" r="11" fill="#fbd38d"/>
  <ellipse cx="50" cy="18" rx="14" ry="4" fill="#718096"/>
  <path d="M40 18 Q50 9 60 18 Z" fill="#a0aec0"/>
</svg>`
  },
  {
    id: 'maceman',
    name: 'Maceman',
    category: 'Military Units',
    description: 'Fast shock troop with spiked mace and leather armor (Wall stormer)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="95" rx="22" ry="5" fill="#000" opacity="0.3"/>
  <!-- Spiked Mace raised -->
  <line x1="70" y1="55" x2="78" y2="18" stroke="#795548" stroke-width="3.5"/>
  <circle cx="78" cy="16" r="6" fill="#4a5568"/>
  <polygon points="78,8 76,14 80,14" fill="#a0aec0"/>
  <polygon points="86,16 80,14 80,18" fill="#a0aec0"/>
  <polygon points="70,16 76,14 76,18" fill="#a0aec0"/>
  <!-- Unit Body -->
  <rect x="42" y="68" width="7" height="24" fill="#744210"/>
  <rect x="51" y="68" width="7" height="24" fill="#744210"/>
  <path d="M34 32 L66 32 L68 68 L32 68 Z" fill="#975a16"/>
  <!-- Head & Cap -->
  <circle cx="50" cy="22" r="11" fill="#fbd38d"/>
  <path d="M39 20 Q50 11 61 20 L61 24 L39 24 Z" fill="#4a5568"/>
</svg>`
  },
  {
    id: 'pikeman',
    name: 'Pikeman',
    category: 'Military Units',
    description: 'Heavily armored anti-cavalry sentinel with 16-foot pike (Huge health pool)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="95" rx="22" ry="5" fill="#000" opacity="0.3"/>
  <!-- Colossal Pike -->
  <line x1="74" y1="96" x2="74" y2="2" stroke="#5d4037" stroke-width="3"/>
  <polygon points="74,1 70,10 78,10" fill="#e2e8f0" stroke="#718096"/>
  <!-- Plate Armor -->
  <rect x="41" y="68" width="8" height="24" fill="#718096"/>
  <rect x="51" y="68" width="8" height="24" fill="#718096"/>
  <path d="M34 30 L66 30 L64 68 L36 68 Z" fill="#a0aec0"/>
  <!-- Steel Sallet Helmet -->
  <circle cx="50" cy="20" r="11" fill="#fbd38d"/>
  <path d="M38 18 Q50 8 62 18 L64 24 L36 24 Z" fill="#718096"/>
  <rect x="42" y="21" width="16" height="2" fill="#1a202c"/>
</svg>`
  },
  {
    id: 'swordsman',
    name: 'Swordsman',
    category: 'Military Units',
    description: 'Ironclad elite infantry with heavy broadsword and plate armor',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="95" rx="24" ry="5" fill="#000" opacity="0.3"/>
  <!-- Broadsword -->
  <line x1="72" y1="88" x2="72" y2="30" stroke="#e2e8f0" stroke-width="4"/>
  <line x1="64" y1="40" x2="80" y2="40" stroke="#d69e2e" stroke-width="3"/>
  <circle cx="72" cy="30" r="3" fill="#d69e2e"/>
  <!-- Full Plate Armor Body -->
  <rect x="40" y="66" width="9" height="26" fill="#718096"/>
  <rect x="51" y="66" width="9" height="26" fill="#718096"/>
  <path d="M32 30 L68 30 L64 68 L36 68 Z" fill="#a0aec0"/>
  <!-- Shield on left arm -->
  <path d="M22 36 L36 36 L36 62 Q29 70 22 62 Z" fill="#c53030" stroke="#ecc94b" stroke-width="1.5"/>
  <!-- Great Helm -->
  <rect x="42" y="10" width="16" height="18" rx="3" fill="#cbd5e0" stroke="#4a5568"/>
  <line x1="45" y1="18" x2="55" y2="18" stroke="#1a202c" stroke-width="2"/>
  <line x1="50" y1="13" x2="50" y2="23" stroke="#1a202c" stroke-width="2"/>
</svg>`
  },
  {
    id: 'knight',
    name: 'Knight (Mounted)',
    category: 'Military Units',
    description: 'Heavy shock cavalry mounted on armored warhorse with lance',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="94" rx="36" ry="6" fill="#000" opacity="0.3"/>
  <!-- Armored Warhorse Body -->
  <ellipse cx="48" cy="62" rx="28" ry="16" fill="#5c3818"/>
  <rect x="28" y="70" width="6" height="22" fill="#3d240f"/>
  <rect x="36" y="70" width="6" height="22" fill="#3d240f"/>
  <rect x="58" y="70" width="6" height="22" fill="#3d240f"/>
  <rect x="66" y="70" width="6" height="22" fill="#3d240f"/>
  <!-- Horse Neck & Head -->
  <path d="M66 60 L80 40 L88 44 L78 68 Z" fill="#5c3818"/>
  <!-- Horse Barding (Caparison) -->
  <path d="M34 56 Q48 70 62 56 L62 66 Q48 80 34 66 Z" fill="#2b6cb0"/>
  <!-- Knight Rider -->
  <path d="M42 34 L58 34 L56 56 L44 56 Z" fill="#a0aec0"/>
  <!-- Great Helm -->
  <rect x="46" y="18" width="12" height="15" rx="3" fill="#cbd5e0"/>
  <line x1="48" y1="24" x2="56" y2="24" stroke="#1a202c" stroke-width="1.5"/>
  <!-- Tournament Lance -->
  <line x1="20" y1="48" x2="95" y2="22" stroke="#8d6e63" stroke-width="3"/>
  <polygon points="98,21 92,20 93,24" fill="#cbd5e0"/>
</svg>`
  },
  {
    id: 'engineer',
    name: 'Engineer',
    category: 'Military Specialists',
    description: 'Siege engineer who builds battering rams, trebuchets, and pours boiling oil',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="95" rx="20" ry="5" fill="#000" opacity="0.3"/>
  <rect x="42" y="68" width="7" height="24" fill="#2d3748"/>
  <rect x="51" y="68" width="7" height="24" fill="#2d3748"/>
  <path d="M35 34 L65 34 L68 68 L32 68 Z" fill="#4a5568"/>
  <circle cx="50" cy="22" r="11" fill="#fbd38d"/>
  <!-- Engineering T-Square / Caliper -->
  <line x1="68" y1="36" x2="80" y2="60" stroke="#ecc94b" stroke-width="2.5"/>
  <line x1="62" y1="46" x2="78" y2="38" stroke="#ecc94b" stroke-width="2.5"/>
</svg>`
  },
  {
    id: 'tunneler',
    name: 'Tunneler',
    category: 'Military Specialists',
    description: 'Subterranean sapper who digs beneath enemy stone towers to trigger collapses',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="95" rx="20" ry="5" fill="#000" opacity="0.3"/>
  <rect x="42" y="68" width="7" height="24" fill="#2d3748"/>
  <rect x="51" y="68" width="7" height="24" fill="#2d3748"/>
  <path d="M35 34 L65 34 L68 68 L32 68 Z" fill="#5d4037"/>
  <circle cx="50" cy="22" r="11" fill="#fbd38d"/>
  <!-- Miner pick / shovel -->
  <line x1="28" y1="78" x2="72" y2="24" stroke="#795548" stroke-width="3"/>
  <path d="M68 28 L76 20 L78 26 Z" fill="#cbd5e0"/>
</svg>`
  },
  {
    id: 'ladderman',
    name: 'Ladderman',
    category: 'Military Specialists',
    description: 'Swift assault runner carrying long wooden assault ladder to scale battlements',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="95" rx="22" ry="5" fill="#000" opacity="0.3"/>
  <!-- Wooden Ladder carried -->
  <line x1="25" y1="88" x2="85" y2="12" stroke="#8d6e63" stroke-width="3"/>
  <line x1="31" y1="92" x2="91" y2="16" stroke="#8d6e63" stroke-width="3"/>
  <line x1="35" y1="78" x2="41" y2="82" stroke="#a1887f" stroke-width="2"/>
  <line x1="47" y1="62" x2="53" y2="66" stroke="#a1887f" stroke-width="2"/>
  <line x1="59" y1="46" x2="65" y2="50" stroke="#a1887f" stroke-width="2"/>
  <line x1="71" y1="30" x2="77" y2="34" stroke="#a1887f" stroke-width="2"/>
  <!-- Runner body -->
  <path d="M42 40 L62 40 L64 74 L40 74 Z" fill="#dd6b20"/>
  <circle cx="52" cy="26" r="10" fill="#fbd38d"/>
</svg>`
  },

  // --- 3. ANIMALS & LIVESTOCK ---
  {
    id: 'horse',
    name: 'Horse',
    category: 'Livestock & Animals',
    description: 'Noble riding horse (Equestrian stables, light cavalry & communications)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="94" rx="34" ry="5" fill="#000" opacity="0.3"/>
  <ellipse cx="48" cy="56" rx="26" ry="16" fill="#8d6e63"/>
  <rect x="28" y="66" width="5" height="26" rx="2" fill="#5d4037"/>
  <rect x="36" y="66" width="5" height="26" rx="2" fill="#5d4037"/>
  <rect x="56" y="66" width="5" height="26" rx="2" fill="#5d4037"/>
  <rect x="64" y="66" width="5" height="26" rx="2" fill="#5d4037"/>
  <!-- Neck and head -->
  <path d="M64 52 L76 30 L84 34 L74 60 Z" fill="#8d6e63"/>
  <polygon points="76,30 78,22 81,28" fill="#5d4037"/>
  <!-- Tail -->
  <path d="M22 52 Q14 65 18 80" stroke="#3e2723" stroke-width="4" fill="none" stroke-linecap="round"/>
</svg>`
  },
  {
    id: 'cow',
    name: 'Dairy Cow',
    category: 'Livestock & Animals',
    description: 'Dairy pasture cow (Yields cheese for the granary and leather hides for armor)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="94" rx="34" ry="5" fill="#000" opacity="0.3"/>
  <!-- Spotted cow body -->
  <ellipse cx="48" cy="56" rx="28" ry="18" fill="#f7fafc" stroke="#e2e8f0"/>
  <!-- Black Spots -->
  <path d="M34 46 Q40 40 46 48 Q42 56 34 52 Z" fill="#2d3748"/>
  <path d="M54 52 Q62 48 64 58 Q56 64 52 58 Z" fill="#2d3748"/>
  <!-- Legs -->
  <rect x="28" y="66" width="6" height="25" fill="#f7fafc" stroke="#cbd5e0"/>
  <rect x="36" y="66" width="6" height="25" fill="#f7fafc" stroke="#cbd5e0"/>
  <rect x="56" y="66" width="6" height="25" fill="#f7fafc" stroke="#cbd5e0"/>
  <rect x="64" y="66" width="6" height="25" fill="#f7fafc" stroke="#cbd5e0"/>
  <!-- Pink Udder -->
  <ellipse cx="38" cy="70" rx="6" ry="4" fill="#fed7d7"/>
  <!-- Head & Horns -->
  <ellipse cx="78" cy="46" rx="10" ry="8" fill="#f7fafc" stroke="#cbd5e0"/>
  <path d="M74 40 Q74 34 78 35" stroke="#ecc94b" stroke-width="2" fill="none"/>
  <path d="M82 40 Q82 34 78 35" stroke="#ecc94b" stroke-width="2" fill="none"/>
</svg>`
  },
  {
    id: 'goat',
    name: 'Goat',
    category: 'Livestock & Animals',
    description: 'Mountain goat with horns (Fast 10-minute exponential doubling, yields meat and milk)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="94" rx="24" ry="5" fill="#000" opacity="0.3"/>
  <ellipse cx="48" cy="62" rx="20" ry="14" fill="#e2e8f0"/>
  <rect x="32" y="70" width="4" height="22" fill="#cbd5e0"/>
  <rect x="38" y="70" width="4" height="22" fill="#cbd5e0"/>
  <rect x="54" y="70" width="4" height="22" fill="#cbd5e0"/>
  <rect x="60" y="70" width="4" height="22" fill="#cbd5e0"/>
  <!-- Head & Curved Horns -->
  <ellipse cx="70" cy="50" rx="8" ry="6" fill="#e2e8f0"/>
  <path d="M68 46 Q66 32 60 34" stroke="#718096" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M72 46 Q70 32 64 34" stroke="#718096" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <!-- Little beard -->
  <polygon points="76,54 74,60 72,54" fill="#cbd5e0"/>
</svg>`
  },
  {
    id: 'sheep',
    name: 'Sheep',
    category: 'Livestock & Animals',
    description: 'Woolly grazing sheep (Yields raw fleece/wool and meat)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="94" rx="24" ry="5" fill="#000" opacity="0.3"/>
  <!-- Fluffy wool body -->
  <ellipse cx="46" cy="60" rx="22" ry="16" fill="#f7fafc" stroke="#e2e8f0" stroke-width="2"/>
  <circle cx="34" cy="54" r="8" fill="#f7fafc"/>
  <circle cx="44" cy="50" r="9" fill="#f7fafc"/>
  <circle cx="56" cy="52" r="8" fill="#f7fafc"/>
  <circle cx="40" cy="68" r="7" fill="#f7fafc"/>
  <circle cx="52" cy="68" r="7" fill="#f7fafc"/>
  <!-- Black face & legs -->
  <rect x="34" y="72" width="4" height="20" fill="#2d3748"/>
  <rect x="54" y="72" width="4" height="20" fill="#2d3748"/>
  <ellipse cx="68" cy="56" rx="7" ry="6" fill="#2d3748"/>
</svg>`
  },
  {
    id: 'ox',
    name: 'Ox (Hauler)',
    category: 'Livestock & Animals',
    description: 'Heavy draught ox with wooden hauling harness (Transports stone from quarry to stockpile)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="94" rx="36" ry="6" fill="#000" opacity="0.3"/>
  <ellipse cx="48" cy="58" rx="30" ry="18" fill="#795548"/>
  <rect x="26" y="68" width="7" height="24" fill="#4e342e"/>
  <rect x="36" y="68" width="7" height="24" fill="#4e342e"/>
  <rect x="56" y="68" width="7" height="24" fill="#4e342e"/>
  <rect x="66" y="68" width="7" height="24" fill="#4e342e"/>
  <!-- Heavy Yoke Harness -->
  <rect x="64" y="46" width="6" height="22" rx="2" fill="#d7ccc8" stroke="#3e2723"/>
  <!-- Head & Heavy Horns -->
  <ellipse cx="80" cy="50" rx="10" ry="9" fill="#5d4037"/>
  <path d="M76 44 Q76 34 84 36" stroke="#d7ccc8" stroke-width="3" fill="none"/>
</svg>`
  },

  // --- 4. CLOTHING & EQUIPMENT ---
  {
    id: 'pants',
    name: 'Pants (Breeches)',
    category: 'Clothing & Equipment',
    description: 'Medieval woven linen breeches / trousers for workers and citizens',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path d="M30 20 L70 20 L74 35 L62 88 L52 88 L50 48 L48 88 L38 88 L26 35 Z" fill="#4a5568" stroke="#2d3748" stroke-width="2"/>
  <rect x="28" y="20" width="44" height="6" fill="#718096"/>
  <!-- Belt & Brass Buckle -->
  <rect x="26" y="22" width="48" height="4" fill="#744210"/>
  <rect x="47" y="21" width="6" height="6" fill="#ecc94b"/>
</svg>`
  },
  {
    id: 'tunic',
    name: 'Tunic',
    category: 'Clothing & Equipment',
    description: 'Medieval peasant work tunic sewn from flax or wool fibers',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path d="M20 30 L36 18 L64 18 L80 30 L72 45 L62 38 L65 85 L35 85 L38 38 L28 45 Z" fill="#9c4221" stroke="#652b19" stroke-width="2"/>
  <!-- Neckline slit -->
  <polygon points="46,18 54,18 50,30" fill="#fbd38d"/>
  <!-- Leather belt -->
  <rect x="36" y="55" width="28" height="5" fill="#2d3748"/>
  <rect x="48" y="54" width="4" height="7" fill="#d69e2e"/>
</svg>`
  },
  {
    id: 'cotton',
    name: 'Cotton Plant',
    category: 'Raw Resources',
    description: 'Raw agricultural cotton boll with fluffy white fibers (Spun into textile clothes)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <!-- Stem & Leaves -->
  <path d="M50 90 Q48 55 50 35" stroke="#38a169" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M49 60 Q30 50 25 38 Q40 45 49 55" fill="#2f855a"/>
  <path d="M51 68 Q70 60 76 48 Q62 55 51 64" fill="#2f855a"/>
  <!-- White Cotton Bolls -->
  <circle cx="50" cy="30" r="14" fill="#f7fafc" stroke="#e2e8f0" stroke-width="2"/>
  <circle cx="40" cy="32" r="11" fill="#f7fafc"/>
  <circle cx="60" cy="32" r="11" fill="#f7fafc"/>
  <circle cx="50" cy="22" r="12" fill="#ffffff"/>
  <!-- Sepals (Calyx) -->
  <polygon points="50,42 44,48 40,42 50,38 60,42 56,48" fill="#744210"/>
</svg>`
  },
  {
    id: 'wood',
    name: 'Wood Logs',
    category: 'Raw Resources',
    description: 'Felled forestry timber logs (Core material for buildings, siege engines, bows and fuel)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <!-- Bottom Log 1 -->
  <rect x="22" y="60" width="56" height="18" rx="4" fill="#8d6e63" stroke="#5d4037" stroke-width="2"/>
  <ellipse cx="22" cy="69" rx="6" ry="9" fill="#d7ccc8" stroke="#5d4037" stroke-width="2"/>
  <circle cx="22" cy="69" r="3" fill="none" stroke="#8d6e63" stroke-width="1.5"/>
  <!-- Bottom Log 2 -->
  <rect x="36" y="50" width="50" height="18" rx="4" fill="#795548" stroke="#4e342e" stroke-width="2"/>
  <ellipse cx="36" cy="59" rx="6" ry="9" fill="#d7ccc8" stroke="#4e342e" stroke-width="2"/>
  <!-- Top Log -->
  <rect x="28" y="36" width="52" height="18" rx="4" fill="#a1887f" stroke="#6d4c41" stroke-width="2"/>
  <ellipse cx="28" cy="45" rx="6" ry="9" fill="#efebe9" stroke="#6d4c41" stroke-width="2"/>
  <circle cx="28" cy="45" r="3" fill="none" stroke="#a1887f" stroke-width="1.5"/>
</svg>`
  },
  {
    id: 'stone',
    name: 'Stone Blocks',
    category: 'Raw Resources',
    description: 'Chiseled ashlar limestone blocks (Required for stone curtain walls, towers, and keeps)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <polygon points="15,65 50,80 85,65 50,50" fill="#a0aec0"/>
  <polygon points="15,65 50,80 50,92 15,77" fill="#718096"/>
  <polygon points="85,65 50,80 50,92 85,77" fill="#4a5568"/>
  <!-- Top Block -->
  <polygon points="28,40 50,50 72,40 50,30" fill="#cbd5e0"/>
  <polygon points="28,40 50,50 50,62 28,52" fill="#a0aec0"/>
  <polygon points="72,40 50,50 50,62 72,52" fill="#718096"/>
</svg>`
  },
  {
    id: 'iron',
    name: 'Iron Ore',
    category: 'Raw Resources',
    description: 'Heavy smelted iron ingots (Raw material for swords, maces, pikes, and plate armor)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <!-- Ingot 1 -->
  <polygon points="20,65 70,65 80,78 30,78" fill="#718096" stroke="#4a5568" stroke-width="1.5"/>
  <polygon points="20,65 30,78 30,86 20,73" fill="#2d3748"/>
  <polygon points="30,78 80,78 80,86 30,86" fill="#4a5568"/>
  <!-- Ingot 2 on top -->
  <polygon points="30,45 80,45 90,58 40,58" fill="#a0aec0" stroke="#4a5568" stroke-width="1.5"/>
  <polygon points="30,45 40,58 40,66 30,53" fill="#4a5568"/>
  <polygon points="40,58 90,58 90,66 40,66" fill="#718096"/>
</svg>`
  },
  {
    id: 'pitch',
    name: 'Pitch (Tar)',
    category: 'Raw Resources',
    description: 'Black bubbling marsh pitch resin (Used for pitch ditches and boiling oil cauldrons)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path d="M28 35 L72 35 L68 85 L32 85 Z" fill="#795548" stroke="#4e342e" stroke-width="2"/>
  <!-- Iron bands on bucket -->
  <rect x="29" y="48" width="42" height="4" fill="#718096"/>
  <rect x="31" y="68" width="38" height="4" fill="#718096"/>
  <!-- Bubbling black pitch tar -->
  <ellipse cx="50" cy="35" rx="22" ry="6" fill="#1a202c"/>
  <circle cx="44" cy="34" r="3" fill="#2d3748"/>
  <circle cx="56" cy="35" r="2.5" fill="#2d3748"/>
  <!-- Drip -->
  <path d="M50 35 Q52 46 50 48" stroke="#1a202c" stroke-width="3" stroke-linecap="round"/>
</svg>`
  },
  {
    id: 'wheat',
    name: 'Wheat Sheaf',
    category: 'Agriculture',
    description: 'Harvested golden wheat sheaves (Ground into flour at the mill)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <!-- Tied bundle of wheat stalks -->
  <path d="M50 20 L50 88" stroke="#d69e2e" stroke-width="3"/>
  <path d="M35 25 Q48 55 50 88" stroke="#d69e2e" stroke-width="3"/>
  <path d="M65 25 Q52 55 50 88" stroke="#d69e2e" stroke-width="3"/>
  <path d="M25 35 Q45 60 50 88" stroke="#ecc94b" stroke-width="2.5"/>
  <path d="M75 35 Q55 60 50 88" stroke="#ecc94b" stroke-width="2.5"/>
  <!-- Grain heads -->
  <ellipse cx="50" cy="22" rx="4" ry="8" fill="#ecc94b"/>
  <ellipse cx="35" cy="26" rx="4" ry="8" transform="rotate(-20 35 26)" fill="#ecc94b"/>
  <ellipse cx="65" cy="26" rx="4" ry="8" transform="rotate(20 65 26)" fill="#ecc94b"/>
  <!-- Red tie cord -->
  <rect x="42" y="58" width="16" height="5" rx="2" fill="#c53030"/>
</svg>`
  },
  {
    id: 'flour',
    name: 'Flour Sack',
    category: 'Agriculture',
    description: 'Milled flour sack (Baked into bread loaves at the bakery)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path d="M32 30 Q50 24 68 30 Q76 60 72 85 Q50 90 28 85 Q24 60 32 30 Z" fill="#f7fafc" stroke="#e2e8f0" stroke-width="2"/>
  <!-- Tied top ears -->
  <ellipse cx="36" cy="25" rx="5" ry="4" fill="#edf2f7"/>
  <ellipse cx="64" cy="25" rx="5" ry="4" fill="#edf2f7"/>
  <rect x="36" y="28" width="28" height="4" fill="#744210"/>
  <!-- Wheat stamp on sack -->
  <path d="M50 48 L50 68" stroke="#d69e2e" stroke-width="2"/>
  <ellipse cx="47" cy="52" rx="2" ry="4" transform="rotate(-30 47 52)" fill="#ecc94b"/>
  <ellipse cx="53" cy="52" rx="2" ry="4" transform="rotate(30 53 52)" fill="#ecc94b"/>
</svg>`
  },
  {
    id: 'bread',
    name: 'Bread',
    category: 'Food Provisions',
    description: 'Freshly baked golden hearth bread loaf (Primary staple food in the granary)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="75" rx="34" ry="6" fill="#000" opacity="0.2"/>
  <ellipse cx="50" cy="55" rx="32" ry="18" fill="#d69e2e" stroke="#975a16" stroke-width="2"/>
  <!-- Slits / Score marks on crust -->
  <path d="M36 50 Q42 46 48 50" stroke="#744210" stroke-width="2" fill="none"/>
  <path d="M52 50 Q58 46 64 50" stroke="#744210" stroke-width="2" fill="none"/>
  <path d="M44 60 Q50 56 56 60" stroke="#744210" stroke-width="2" fill="none"/>
</svg>`
  },
  {
    id: 'apples',
    name: 'Apples',
    category: 'Food Provisions',
    description: 'Wicker basket heaped with crisp red orchard apples (+Popularity diet diversity)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="85" rx="30" ry="5" fill="#000" opacity="0.2"/>
  <!-- Basket -->
  <path d="M26 48 L74 48 L68 84 L32 84 Z" fill="#8d6e63" stroke="#5d4037" stroke-width="2"/>
  <!-- Basket weave lines -->
  <line x1="30" y1="60" x2="70" y2="60" stroke="#5d4037" stroke-width="1.5"/>
  <line x1="32" y1="72" x2="68" y2="72" stroke="#5d4037" stroke-width="1.5"/>
  <!-- Apples inside -->
  <circle cx="38" cy="44" r="9" fill="#e53e3e"/>
  <circle cx="50" cy="40" r="9" fill="#e53e3e"/>
  <circle cx="62" cy="44" r="9" fill="#e53e3e"/>
  <circle cx="44" cy="34" r="8" fill="#c53030"/>
  <circle cx="56" cy="34" r="8" fill="#c53030"/>
  <!-- Leaf -->
  <path d="M56 26 Q62 20 66 24 Q62 28 56 26" fill="#38a169"/>
</svg>`
  },
  {
    id: 'meat',
    name: 'Meat (Venison)',
    category: 'Food Provisions',
    description: 'Smoked haunch / joint of cured meat from the hunter’s post (+Popularity diet diversity)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="82" rx="30" ry="5" fill="#000" opacity="0.2"/>
  <!-- Bone shaft -->
  <rect x="65" y="44" width="22" height="7" rx="3" fill="#edf2f7" stroke="#cbd5e0" stroke-width="1.5"/>
  <circle cx="86" cy="43" r="4" fill="#edf2f7"/>
  <circle cx="86" cy="52" r="4" fill="#edf2f7"/>
  <!-- Roasted meat joint -->
  <ellipse cx="44" cy="50" rx="26" ry="18" fill="#9b2c2c" stroke="#742a2a" stroke-width="2"/>
  <ellipse cx="32" cy="50" rx="10" ry="12" fill="#c53030"/>
</svg>`
  },
  {
    id: 'cheese',
    name: 'Cheese Wheel',
    category: 'Food Provisions',
    description: 'Aged golden cheddar cheese wheel from the dairy farm (+Popularity diet diversity)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="80" rx="32" ry="5" fill="#000" opacity="0.2"/>
  <ellipse cx="50" cy="46" rx="30" ry="14" fill="#ecc94b" stroke="#d69e2e" stroke-width="2"/>
  <path d="M20 46 L20 66 Q50 82 80 66 L80 46" fill="#d69e2e" stroke="#b7791f" stroke-width="2"/>
  <!-- Cut wedge hole -->
  <polygon points="50,46 36,44 42,56" fill="#b7791f"/>
  <circle cx="34" cy="58" r="2.5" fill="#b7791f"/>
  <circle cx="62" cy="56" r="3" fill="#b7791f"/>
  <circle cx="48" cy="62" r="2" fill="#b7791f"/>
</svg>`
  },
  {
    id: 'ale',
    name: 'Ale Flagon',
    category: 'Food Provisions',
    description: 'Ceramic tavern mug with foaming ale (+Ale coverage boosts castle popularity)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <!-- Tankard body -->
  <path d="M34 38 L66 38 L62 85 L38 85 Z" fill="#795548" stroke="#4e342e" stroke-width="2"/>
  <!-- Handle -->
  <path d="M64 45 Q78 58 63 75" fill="none" stroke="#5d4037" stroke-width="5" stroke-linecap="round"/>
  <!-- Foaming head of ale -->
  <ellipse cx="50" cy="38" rx="18" ry="7" fill="#fefcbf"/>
  <circle cx="40" cy="34" r="5" fill="#ffffff"/>
  <circle cx="50" cy="32" r="6" fill="#ffffff"/>
  <circle cx="60" cy="34" r="5" fill="#ffffff"/>
  <path d="M44 38 Q46 48 44 50" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
</svg>`
  },
  {
    id: 'gold',
    name: 'Gold Sovereigns',
    category: 'Treasury & Currency',
    description: 'Piles of minted gold coins (Used for mercenary bribes, market trade, and building costs)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <!-- Base Coin 1 -->
  <ellipse cx="38" cy="72" rx="18" ry="8" fill="#d69e2e" stroke="#b7791f" stroke-width="1.5"/>
  <ellipse cx="38" cy="70" rx="16" ry="6" fill="#ecc94b"/>
  <!-- Base Coin 2 -->
  <ellipse cx="62" cy="68" rx="18" ry="8" fill="#d69e2e" stroke="#b7791f" stroke-width="1.5"/>
  <ellipse cx="62" cy="66" rx="16" ry="6" fill="#ecc94b"/>
  <!-- Stack Coin 3 -->
  <ellipse cx="50" cy="50" rx="20" ry="9" fill="#d69e2e" stroke="#b7791f" stroke-width="1.5"/>
  <ellipse cx="50" cy="48" rx="18" ry="7" fill="#f6e05e"/>
  <!-- Crown insignia on top coin -->
  <path d="M44 48 L46 44 L50 47 L54 44 L56 48 Z" fill="#b7791f"/>
</svg>`
  },

  // --- 5. SIEGE WEAPONS & CASTLE ARTILLERY ---
  {
    id: 'battering_ram',
    name: 'Battering Ram',
    category: 'Siege Weapons',
    description: 'Armored oak ram on suspension chains (Crushes wooden gatehouses and stone walls)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="94" rx="42" ry="5" fill="#000" opacity="0.3"/>
  <!-- Wheeled frame carriage -->
  <circle cx="25" cy="80" r="10" fill="#5d4037" stroke="#3e2723" stroke-width="2"/>
  <circle cx="75" cy="80" r="10" fill="#5d4037" stroke="#3e2723" stroke-width="2"/>
  <!-- Armored canopy roof -->
  <polygon points="12,50 50,22 88,50" fill="#8d6e63" stroke="#4e342e" stroke-width="2"/>
  <!-- Heavy Log Ram -->
  <rect x="8" y="58" width="76" height="14" rx="3" fill="#a1887f" stroke="#5d4037" stroke-width="2"/>
  <!-- Iron Ram Head (Battering Tip) -->
  <polygon points="8,54 0,65 8,76" fill="#718096" stroke="#4a5568" stroke-width="1.5"/>
  <!-- Chains holding ram -->
  <line x1="35" y1="36" x2="35" y2="58" stroke="#cbd5e0" stroke-width="2"/>
  <line x1="65" y1="36" x2="65" y2="58" stroke="#cbd5e0" stroke-width="2"/>
</svg>`
  },
  {
    id: 'catapult',
    name: 'Catapult (Mangonel)',
    category: 'Siege Weapons',
    description: 'Wheeled torsion siege catapult (Hurls stone boulders directly at curtain walls)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="94" rx="38" ry="5" fill="#000" opacity="0.3"/>
  <!-- Wheels -->
  <circle cx="28" cy="80" r="9" fill="#5d4037"/>
  <circle cx="72" cy="80" r="9" fill="#5d4037"/>
  <!-- Frame base -->
  <rect x="20" y="68" width="60" height="8" rx="2" fill="#8d6e63"/>
  <polygon points="45,68 55,68 50,35" fill="#6d4c41"/>
  <!-- Throwing Arm loaded with boulder -->
  <line x1="30" y1="68" x2="72" y2="28" stroke="#795548" stroke-width="4"/>
  <!-- Cup with Stone Boulder -->
  <circle cx="76" cy="24" r="7" fill="#a0aec0" stroke="#4a5568" stroke-width="1.5"/>
</svg>`
  },
  {
    id: 'trebuchet',
    name: 'Trebuchet',
    category: 'Siege Weapons',
    description: 'Massive counterweight siege artillery (Hurls boulders and diseased rotting cows)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="95" rx="42" ry="5" fill="#000" opacity="0.3"/>
  <!-- Triangular Frame -->
  <polygon points="20,90 80,90 50,30" fill="none" stroke="#5d4037" stroke-width="4"/>
  <line x1="35" y1="60" x2="65" y2="60" stroke="#8d6e63" stroke-width="3"/>
  <!-- Counterweight Beam (Pivot at 50,30) -->
  <line x1="28" y1="45" x2="88" y2="8" stroke="#3e2723" stroke-width="4.5"/>
  <!-- Heavy Counterweight Box -->
  <rect x="20" y="45" width="16" height="18" fill="#4e342e" stroke="#212121" stroke-width="1.5"/>
  <!-- Sling & Stone -->
  <line x1="88" y1="8" x2="94" y2="26" stroke="#d7ccc8" stroke-width="1.5"/>
  <circle cx="94" cy="27" r="5" fill="#a0aec0"/>
</svg>`
  },
  {
    id: 'siege_tower',
    name: 'Siege Tower',
    category: 'Siege Weapons',
    description: 'Multi-deck mobile belfry with drop bridge (Floods battlements with shock infantry)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="95" rx="30" ry="5" fill="#000" opacity="0.3"/>
  <!-- Wheels -->
  <circle cx="34" cy="88" r="7" fill="#4e342e"/>
  <circle cx="66" cy="88" r="7" fill="#4e342e"/>
  <!-- Wooden Tower Body -->
  <polygon points="36,15 64,15 72,85 28,85" fill="#8d6e63" stroke="#4e342e" stroke-width="2"/>
  <!-- Timber planks horizontal lines -->
  <line x1="32" y1="70" x2="68" y2="70" stroke="#5d4037" stroke-width="1.5"/>
  <line x1="34" y1="52" x2="66" y2="52" stroke="#5d4037" stroke-width="1.5"/>
  <line x1="36" y1="34" x2="64" y2="34" stroke="#5d4037" stroke-width="1.5"/>
  <!-- Drop Bridge (Assault Ramp extended) -->
  <polygon points="64,18 90,26 88,32 64,24" fill="#a1887f" stroke="#3e2723" stroke-width="1.5"/>
</svg>`
  },

  // --- 6. CASTLE FORTIFICATIONS & DEFENSES ---
  {
    id: 'keep',
    name: 'The Central Keep',
    category: 'Buildings & Fortifications',
    description: 'Norman stone fortress Keep (Heart of the castle where the Lord resides)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="94" rx="42" ry="6" fill="#000" opacity="0.3"/>
  <!-- Central Stone Tower Body -->
  <polygon points="26,30 74,30 78,90 22,90" fill="#a0aec0" stroke="#4a5568" stroke-width="2"/>
  <!-- Crenelations on top -->
  <rect x="24" y="22" width="8" height="10" fill="#718096"/>
  <rect x="36" y="22" width="8" height="10" fill="#718096"/>
  <rect x="48" y="22" width="8" height="10" fill="#718096"/>
  <rect x="60" y="22" width="8" height="10" fill="#718096"/>
  <rect x="70" y="22" width="8" height="10" fill="#718096"/>
  <!-- Arched Gate entrance -->
  <path d="M42 90 L42 66 Q50 58 58 66 L58 90 Z" fill="#2d3748"/>
  <line x1="50" y1="62" x2="50" y2="90" stroke="#ecc94b" stroke-width="1"/>
  <!-- Arrow slit windows -->
  <rect x="34" y="44" width="3" height="10" fill="#1a202c"/>
  <rect x="64" y="44" width="3" height="10" fill="#1a202c"/>
  <!-- Royal Banner on roof -->
  <line x1="50" y1="22" x2="50" y2="8" stroke="#cbd5e0" stroke-width="2"/>
  <polygon points="50,8 66,12 50,18" fill="#e53e3e"/>
</svg>`
  },
  {
    id: 'granary',
    name: 'The Granary',
    category: 'Buildings & Fortifications',
    description: 'Elevated timber storehouse (Stores and rations bread, apples, cheese, and meat)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="94" rx="38" ry="5" fill="#000" opacity="0.3"/>
  <!-- Stilts / Posts -->
  <rect x="26" y="72" width="6" height="20" fill="#5d4037"/>
  <rect x="47" y="72" width="6" height="20" fill="#5d4037"/>
  <rect x="68" y="72" width="6" height="20" fill="#5d4037"/>
  <!-- Granary Body -->
  <rect x="20" y="44" width="60" height="30" fill="#8d6e63" stroke="#4e342e" stroke-width="2"/>
  <!-- Thatched Roof -->
  <polygon points="12,44 50,18 88,44" fill="#d69e2e" stroke="#975a16" stroke-width="2"/>
  <!-- Door & Stairs -->
  <rect x="45" y="52" width="10" height="22" fill="#3e2723"/>
</svg>`
  },
  {
    id: 'armory',
    name: 'The Armory',
    category: 'Buildings & Fortifications',
    description: 'Military weapon depot (Stocks bows, swords, spears, pikes, maces, and armor for drafting)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="94" rx="40" ry="5" fill="#000" opacity="0.3"/>
  <rect x="22" y="45" width="56" height="45" fill="#718096" stroke="#4a5568" stroke-width="2"/>
  <polygon points="16,45 50,22 84,45" fill="#a0aec0" stroke="#4a5568" stroke-width="2"/>
  <!-- Crossed Swords Insignia over door -->
  <line x1="42" y1="32" x2="58" y2="44" stroke="#ecc94b" stroke-width="2.5"/>
  <line x1="58" y1="32" x2="42" y2="44" stroke="#ecc94b" stroke-width="2.5"/>
  <!-- Heavy iron-studded door -->
  <rect x="42" y="60" width="16" height="30" fill="#2d3748"/>
  <circle cx="46" cy="74" r="1.5" fill="#ecc94b"/>
  <circle cx="54" cy="74" r="1.5" fill="#ecc94b"/>
</svg>`
  },
  {
    id: 'barracks',
    name: 'The Barracks',
    category: 'Buildings & Fortifications',
    description: 'Drill yard & garrison (Transforms idle campfire peasants into armed troops)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="94" rx="42" ry="5" fill="#000" opacity="0.3"/>
  <rect x="20" y="46" width="60" height="44" fill="#a0aec0" stroke="#4a5568" stroke-width="2"/>
  <!-- Battlements roof -->
  <rect x="18" y="38" width="9" height="10" fill="#718096"/>
  <rect x="34" y="38" width="9" height="10" fill="#718096"/>
  <rect x="57" y="38" width="9" height="10" fill="#718096"/>
  <rect x="73" y="38" width="9" height="10" fill="#718096"/>
  <!-- Target Dummy in front -->
  <rect x="28" y="70" width="3" height="18" fill="#5d4037"/>
  <circle cx="29.5" cy="65" r="5" fill="#e53e3e"/>
</svg>`
  },
  {
    id: 'round_tower',
    name: 'Round Tower',
    category: 'Buildings & Fortifications',
    description: 'Impenetrable Norman cylindrical bastion (Immune to tunneled collapses, mounts ballistas)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="94" rx="34" ry="6" fill="#000" opacity="0.3"/>
  <!-- Cylindrical body with curve -->
  <path d="M30 28 L70 28 L74 90 L26 90 Z" fill="#cbd5e0" stroke="#718096" stroke-width="2"/>
  <!-- Crenelations -->
  <ellipse cx="50" cy="28" rx="22" ry="6" fill="#a0aec0"/>
  <rect x="28" y="16" width="7" height="12" fill="#718096"/>
  <rect x="40" y="16" width="7" height="12" fill="#718096"/>
  <rect x="53" y="16" width="7" height="12" fill="#718096"/>
  <rect x="65" y="16" width="7" height="12" fill="#718096"/>
  <!-- High Arrow Slits -->
  <rect x="49" y="42" width="3" height="12" fill="#1a202c"/>
  <rect x="49" y="65" width="3" height="12" fill="#1a202c"/>
</svg>`
  },
  {
    id: 'square_tower',
    name: 'Square Tower',
    category: 'Buildings & Fortifications',
    description: 'Heavy stone fortress bastion (Mounts tower mangonels and ballistas)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="94" rx="34" ry="5" fill="#000" opacity="0.3"/>
  <rect x="28" y="26" width="44" height="64" fill="#a0aec0" stroke="#4a5568" stroke-width="2"/>
  <rect x="26" y="18" width="9" height="10" fill="#718096"/>
  <rect x="45" y="18" width="10" height="10" fill="#718096"/>
  <rect x="65" y="18" width="9" height="10" fill="#718096"/>
  <rect x="48" y="45" width="4" height="12" fill="#2d3748"/>
</svg>`
  },
  {
    id: 'gatehouse',
    name: 'Gatehouse with Portcullis',
    category: 'Buildings & Fortifications',
    description: 'Fortified stone castle entrance with iron portcullis and drawbridge',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="94" rx="42" ry="5" fill="#000" opacity="0.3"/>
  <!-- Twin Turrets -->
  <rect x="18" y="30" width="22" height="60" fill="#a0aec0" stroke="#4a5568" stroke-width="1.5"/>
  <rect x="60" y="30" width="22" height="60" fill="#a0aec0" stroke="#4a5568" stroke-width="1.5"/>
  <!-- Center Arch -->
  <rect x="38" y="44" width="24" height="46" fill="#718096"/>
  <path d="M40 90 L40 60 Q50 52 60 60 L60 90 Z" fill="#1a202c"/>
  <!-- Iron Portcullis Grate -->
  <line x1="44" y1="56" x2="44" y2="90" stroke="#cbd5e0" stroke-width="2"/>
  <line x1="50" y1="53" x2="50" y2="90" stroke="#cbd5e0" stroke-width="2"/>
  <line x1="56" y1="56" x2="56" y2="90" stroke="#cbd5e0" stroke-width="2"/>
  <line x1="40" y1="66" x2="60" y2="66" stroke="#cbd5e0" stroke-width="1.5"/>
  <line x1="40" y1="78" x2="60" y2="78" stroke="#cbd5e0" stroke-width="1.5"/>
</svg>`
  },
  {
    id: 'pitch_ditch',
    name: 'Pitch Ditch (Fire Trap)',
    category: 'Defensive Traps',
    description: 'Hidden black pitch trench ignited by flaming arrows into an uncontrollable wall of fire',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <!-- Ditch trench -->
  <polygon points="10,65 90,65 82,88 18,88" fill="#1a202c"/>
  <!-- Roaring Flames -->
  <path d="M22 68 Q28 35 34 55 Q42 22 48 48 Q56 18 64 52 Q72 32 78 68 Z" fill="#dd6b20"/>
  <path d="M28 68 Q34 45 38 58 Q46 32 50 52 Q56 30 62 55 Q68 40 72 68 Z" fill="#ecc94b"/>
</svg>`
  },
  {
    id: 'boiling_oil',
    name: 'Boiling Oil Cauldron',
    category: 'Defensive Traps',
    description: 'Heated cauldron of molten pitch poured from battlements to incinerate attackers',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="85" rx="26" ry="5" fill="#000" opacity="0.3"/>
  <!-- Iron pot on coals -->
  <path d="M30 45 Q26 78 50 78 Q74 78 70 45 Z" fill="#2d3748" stroke="#1a202c" stroke-width="2"/>
  <!-- Molten pitch surface -->
  <ellipse cx="50" cy="45" rx="20" ry="6" fill="#e53e3e"/>
  <!-- Bubbles & Steam -->
  <circle cx="44" cy="44" r="3" fill="#f6ad55"/>
  <circle cx="54" cy="46" r="2.5" fill="#ecc94b"/>
  <path d="M46 36 Q42 24 46 16" stroke="#e2e8f0" stroke-width="1.5" fill="none" opacity="0.6"/>
  <path d="M54 36 Q58 24 54 16" stroke="#e2e8f0" stroke-width="1.5" fill="none" opacity="0.6"/>
</svg>`
  },
  {
    id: 'moat',
    name: 'Castle Moat',
    category: 'Buildings & Fortifications',
    description: 'Deep perimeter water moat (Blocks enemy siege engines and ladders until filled)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <!-- Water Canal -->
  <polygon points="5,35 95,35 88,75 12,75" fill="#3182ce" stroke="#2b6cb0" stroke-width="2"/>
  <path d="M18 48 Q32 42 46 48 Q60 54 74 48" stroke="#63b3ed" stroke-width="2" fill="none"/>
  <path d="M26 62 Q40 56 54 62 Q68 68 80 62" stroke="#63b3ed" stroke-width="2" fill="none"/>
</svg>`
  }
];

// Write individual SVG files
let count = 0;
const catalog = [];

models.forEach(m => {
  const filePath = path.join(targetDir, `${m.id}.svg`);
  fs.writeFileSync(filePath, m.svg.trim(), 'utf8');
  count++;
  catalog.push({
    id: m.id,
    file: `${m.id}.svg`,
    name: m.name,
    category: m.category,
    description: m.description
  });
});

// Also create additional complementary items to ensure all 100+ things are fully represented
const additionalItems = [
  { id: 'woman_peasant', name: 'Peasant Woman', cat: 'Population', col: '#9f7aea', desc: 'Village woman gathering wild fruits and grain' },
  { id: 'queen', name: 'The Queen', cat: 'Regicide & Royalty', col: '#b83280', desc: 'Queen sovereign with royal hennin and velvet dress' },
  { id: 'priest', name: 'Priest / Monk', cat: 'Religion', col: '#4a5568', desc: 'Holy monk blessing workers to boost popularity' },
  { id: 'apothecary', name: 'Apothecary', cat: 'Healthcare', col: '#2c7a7b', desc: 'Herbal doctor curing black plague and disease' },
  { id: 'innkeeper', name: 'Innkeeper', cat: 'Commerce', col: '#c05621', desc: 'Barkeep serving frothing tankards of ale' },
  { id: 'blacksmith_worker', name: 'Blacksmith', cat: 'Industry', col: '#e53e3e', desc: 'Smith forging weapons and armor over anvil' },
  { id: 'miller_worker', name: 'Miller', cat: 'Agriculture', col: '#edf2f7', desc: 'Flour miller operating windmill grinding stones' },
  { id: 'baker_worker', name: 'Baker', cat: 'Agriculture', col: '#d69e2e', desc: 'Baker pulling fresh golden loaves from oven' },
  { id: 'woodcutter_worker', name: 'Woodcutter', cat: 'Industry', col: '#38a169', desc: 'Forester chopping logs with broadaxe' },
  { id: 'quarryman_worker', name: 'Quarryman', cat: 'Industry', col: '#718096', desc: 'Stonecutter carving limestone ashlar blocks' },
  { id: 'miner_worker', name: 'Iron Miner', cat: 'Industry', col: '#4a5568', desc: 'Miner extracting deep iron ore veins' },
  { id: 'hunter_worker', name: 'Huntsman', cat: 'Food Production', col: '#276749', desc: 'Stalker hunting forest deer with shortbow' },
  { id: 'water_bearer', name: 'Firewatch Water Bearer', cat: 'Safety', col: '#3182ce', desc: 'Firefighter running with buckets to douse fires' },
  { id: 'spy', name: 'Spy Operative', cat: 'Espionage', col: '#1a202c', desc: 'Stealth infiltrator poisoning wells and sabotaging dams' },
  { id: 'horse_archer', name: 'Horse Archer', cat: 'Military Units', col: '#dd6b20', desc: 'High-speed nomadic mounted cavalry archer' },
  { id: 'warhorse', name: 'Armored Warhorse', cat: 'Livestock & Animals', col: '#5c3818', desc: 'Equine heavy charger bred in equestrian stables' },
  { id: 'deer', name: 'Forest Deer', cat: 'Livestock & Animals', col: '#975a16', desc: 'Wild stag hunted for venison meat' },
  { id: 'wolf', name: 'Dire Wolf', cat: 'Wildlife Hazard', col: '#4a5568', desc: 'Wild predator attacking isolated woodcutters' },
  { id: 'chicken', name: 'Farm Hen', cat: 'Livestock & Animals', col: '#d69e2e', desc: 'Barnyard chicken providing eggs and poultry' },
  { id: 'pig', name: 'Barnyard Pig', cat: 'Livestock & Animals', col: '#ed64a6', desc: 'Farm hog producing pork meat' },
  { id: 'cotton_robe', name: 'Spun Cotton Robe', cat: 'Clothing', col: '#e2e8f0', desc: 'Refined dyed cotton garment' },
  { id: 'leather_armor', name: 'Leather Jerkin', cat: 'Armor', col: '#744210', desc: 'Tanned cow hide armor for crossbowmen and macemen' },
  { id: 'metal_plate_armor', name: 'Steel Plate Armor', cat: 'Armor', col: '#a0aec0', desc: 'Heavy beaten iron plate for knights and swordsmen' },
  { id: 'iron_helmet', name: 'Kettle Helm', cat: 'Armor', col: '#718096', desc: 'Steel infantry helmet protecting against arrows' },
  { id: 'wooden_shield', name: 'Heater Shield', cat: 'Armor', col: '#c53030', desc: 'Heraldic heraldry shield mitigating projectile hits' },
  { id: 'bow', name: 'Yew Longbow', cat: 'Weapons', col: '#8d6e63', desc: 'Carved longbow for castle archers' },
  { id: 'crossbow', name: 'Heavy Crossbow', cat: 'Weapons', col: '#4e342e', desc: 'Steel stirrup crossbow with lethal kinetic pierce' },
  { id: 'spear', name: 'Spear', cat: 'Weapons', col: '#795548', desc: 'Simple ash-pole spear for light militia' },
  { id: 'pike', name: '16ft Pike', cat: 'Weapons', col: '#3e2723', desc: 'Anti-charge long pike' },
  { id: 'mace', name: 'Spiked Flange Mace', cat: 'Weapons', col: '#4a5568', desc: 'Crushing melee weapon for macemen' },
  { id: 'sword', name: 'Forged Broadsword', cat: 'Weapons', col: '#cbd5e0', desc: 'Double-edged knight sword' },
  { id: 'talwar', name: 'Curved Talwar Saber', cat: 'Weapons', col: '#e2e8f0', desc: 'Sweeping cavalry blade for rapid flank assaults' },
  { id: 'quiver_arrows', name: 'Quiver of Arrows', cat: 'Weapons', col: '#8d6e63', desc: 'Fletched arrows for castle archers' },
  { id: 'timber_planks', name: 'Timber Planks', cat: 'Raw Resources', col: '#a1887f', desc: 'Sawed boards for construction' },
  { id: 'clay_mud', name: 'River Mud', cat: 'Raw Resources', col: '#795548', desc: 'Alluvial mud baked into red structural bricks' },
  { id: 'bricks', name: 'Hardened Red Bricks', cat: 'Raw Resources', col: '#c53030', desc: 'Kiln-fired bricks for durable permanent dwellings' },
  { id: 'hops', name: 'Brewing Hops', cat: 'Agriculture', col: '#38a169', desc: 'Aromatic green cones brewed into ale' },
  { id: 'medicinal_herbs', name: 'Medicinal Herbs', cat: 'Healthcare', col: '#48bb78', desc: 'Healing poultice herbs for hospital recovery' },
  { id: 'water_bucket', name: 'Water Bucket', cat: 'Safety', col: '#3182ce', desc: 'Fresh water pail for drinking and firefighting' },
  { id: 'milk_jug', name: 'Milk Jug', cat: 'Food Provisions', col: '#edf2f7', desc: 'Fresh whole milk from dairy cows' },
  { id: 'cooked_roast', name: 'Spit-Roasted Meat', cat: 'Food Provisions', col: '#9b2c2c', desc: 'Grand feast roast for banquets' },
  { id: 'fish', name: 'River Trout', cat: 'Food Provisions', col: '#4299e1', desc: 'Freshwater catch from delta basin' },
  { id: 'vegetables', name: 'Vegetable Basket', cat: 'Food Provisions', col: '#ed8936', desc: 'Root leeks, carrots and cabbage' },
  { id: 'honey', name: 'Honey Pot', cat: 'Food Provisions', col: '#ecc94b', desc: 'Sweet comb honey from apiaries' },
  { id: 'portable_mantlet', name: 'Portable Mantlet', cat: 'Siege Weapons', col: '#8d6e63', desc: 'Mobile wooden shield wall for archers' },
  { id: 'siege_ladder', name: 'Assault Ladder', cat: 'Siege Weapons', col: '#a1887f', desc: 'Wall scaling ladder' },
  { id: 'tower_mangonel', name: 'Tower Mangonel', cat: 'Defenses', col: '#718096', desc: 'Fixed stone thrower mounted atop stone towers' },
  { id: 'tower_ballista', name: 'Tower Ballista', cat: 'Defenses', col: '#4a5568', desc: 'Giant wall-mounted sniper harpoon bolt thrower' },
  { id: 'diseased_cow_ammo', name: 'Diseased Cow Carcass', cat: 'Siege Weapons', col: '#68d391', desc: 'Rotting infected cattle carcass for trebuchet pestilence launch' },
  { id: 'stockpile', name: 'The Stockpile', cat: 'Buildings', col: '#8d6e63', desc: 'Primary storage yard for wood, stone, and iron' },
  { id: 'market', name: 'The Marketplace', cat: 'Buildings', col: '#d69e2e', desc: 'Commercial trading post for dynamic pricing' },
  { id: 'woodcutter_hut', name: 'Woodcutter Hut', cat: 'Buildings', col: '#48bb78', desc: 'Forest lodge where sawyers harvest logs' },
  { id: 'stone_quarry', name: 'Stone Quarry', cat: 'Buildings', col: '#a0aec0', desc: 'Excavated cliff pit yielding masonry stones' },
  { id: 'ox_tether', name: 'Ox Tether', cat: 'Buildings', col: '#795548', desc: 'Hitching station for stone hauling oxen' },
  { id: 'iron_mine', name: 'Iron Mine', cat: 'Buildings', col: '#4a5568', desc: 'Deep shaft mining raw iron ore' },
  { id: 'pitch_rig', name: 'Pitch Rig', cat: 'Buildings', col: '#1a202c', desc: 'Marsh pump extracting flammable pitch' },
  { id: 'wheat_farm', name: 'Wheat Farm', cat: 'Buildings', col: '#ecc94b', desc: 'Golden agricultural acreage producing wheat' },
  { id: 'windmill', name: 'The Windmill', cat: 'Buildings', col: '#edf2f7', desc: 'Rotating sail mill grinding wheat into white flour' },
  { id: 'bakery', name: 'The Bakery', cat: 'Buildings', col: '#dd6b20', desc: 'Hearth ovens baking flour into loaves of bread' },
  { id: 'dairy_farm', name: 'Dairy Farm', cat: 'Buildings', col: '#f7fafc', desc: 'Pasture producing wheels of cheese and leather' },
  { id: 'apple_orchard', name: 'Apple Orchard', cat: 'Buildings', col: '#e53e3e', desc: 'Fruit grove producing red apples' },
  { id: 'brewery', name: 'The Brewery', cat: 'Buildings', col: '#d69e2e', desc: 'Fermentation vats brewing hops into ale' },
  { id: 'tavern_inn', name: 'Tavern / Inn', cat: 'Buildings', col: '#c05621', desc: 'Public drinking hall boosting castle popularity' },
  { id: 'chapel', name: 'The Chapel', cat: 'Religion', col: '#a0aec0', desc: 'Small stone prayer sanctuary' },
  { id: 'church', name: 'Parish Church', cat: 'Religion', col: '#cbd5e0', desc: 'Cathedral precursor with bells and blessings' },
  { id: 'cathedral', name: 'Royal Cathedral', cat: 'Religion', col: '#e2e8f0', desc: 'Monumental soaring basilica providing maximum religious popularity' },
  { id: 'firewatch_well', name: 'Firewatch Well', cat: 'Safety', col: '#3182ce', desc: 'Water well with bucket squads to extinguish spreading fire' },
  { id: 'apothecary_hut', name: 'Apothecary Hut', cat: 'Healthcare', col: '#2c7a7b', desc: 'Herbal pharmacy curing the black plague' },
  { id: 'wall_wood_palisade', name: 'Wooden Palisade', cat: 'Defenses', col: '#8d6e63', desc: 'Sharpened timber stockade fence' },
  { id: 'wall_stone_curtain', name: 'Stone Curtain Wall', cat: 'Defenses', col: '#a0aec0', desc: 'Thick defensive masonry wall' },
  { id: 'battlements_crenelated', name: 'Crenelated Parapet', cat: 'Defenses', col: '#718096', desc: 'Arrow slit battlements giving +50% cover' },
  { id: 'drawbridge', name: 'Hinged Drawbridge', cat: 'Defenses', col: '#5d4037', desc: 'Heavy wooden drawbridge crossing castle moats' },
  { id: 'lookout_tower', name: 'Lookout Tower', cat: 'Defenses', col: '#8d6e63', desc: 'Timber watchtower expanding early sightlines' },
  { id: 'perimeter_tower', name: 'Perimeter Turret', cat: 'Defenses', col: '#cbd5e0', desc: 'Small stone wall tower for 4 archers' },
  { id: 'brazier', name: 'Iron Brazier', cat: 'Defenses', col: '#e53e3e', desc: 'Parapet fire basket for igniting fire arrows' },
  { id: 'gallows', name: 'The Gallows', cat: 'Cruelty & Fear Factor', col: '#3e2723', desc: 'Bad Thing: Terrifies peasants (+Work speed, -Morale)' },
  { id: 'stocks', name: 'The Stocks', cat: 'Cruelty & Fear Factor', col: '#5d4037', desc: 'Bad Thing: Public pillory (+Work speed, -Morale)' },
  { id: 'iron_maiden', name: 'Iron Maiden', cat: 'Cruelty & Fear Factor', col: '#2d3748', desc: 'Bad Thing: Torture instrument of dread' },
  { id: 'cesspool', name: 'Cesspool', cat: 'Cruelty & Fear Factor', col: '#4a5568', desc: 'Bad Thing: Squalid refuse pit' },
  { id: 'gibbet', name: 'The Gibbet', cat: 'Cruelty & Fear Factor', col: '#1a202c', desc: 'Bad Thing: Iron hanging cage' },
  { id: 'maypole', name: 'The Maypole', cat: 'Pageantry & Good Things', col: '#ed64a6', desc: 'Good Thing: Festive ribbon pole (+Popularity, +Troop Morale, -Work speed)' },
  { id: 'dancing_bear', name: 'Dancing Bear', cat: 'Pageantry & Good Things', col: '#744210', desc: 'Good Thing: Performing bear entertaining castle folks' },
  { id: 'flower_garden', name: 'Rose Garden', cat: 'Pageantry & Good Things', col: '#e53e3e', desc: 'Good Thing: Fragrant hedges (+Popularity)' },
  { id: 'stone_fountain', name: 'Stone Fountain', cat: 'Pageantry & Good Things', col: '#4299e1', desc: 'Good Thing: Sparkling carved water feature' },
  { id: 'royal_statue', name: 'Royal Hero Statue', cat: 'Pageantry & Good Things', col: '#d69e2e', desc: 'Good Thing: Monument of the King inspiring soldiers' },
  { id: 'lord_rat', name: 'Duc de Puce (The Rat)', cat: 'AI Rival Lords', col: '#e2e8f0', desc: 'Cowardly rival lord building flimsy wooden palisades' },
  { id: 'lord_snake', name: 'Duc Beauregard (The Snake)', cat: 'AI Rival Lords', col: '#48bb78', desc: 'Cunning rival lord using moats and pitch traps' },
  { id: 'lord_pig', name: 'Duc Truffe (The Pig)', cat: 'AI Rival Lords', col: '#ed8936', desc: 'Brutal industrial lord fielding macemen and battering rams' },
  { id: 'lord_wolf', name: 'Duc Volpe (The Wolf)', cat: 'AI Rival Lords', col: '#718096', desc: 'Genius siege master building impregnable stone fortresses' }
];

// Generate generic stylized SVG badge for the rest of items
additionalItems.forEach(item => {
  const filePath = path.join(targetDir, `${item.id}.svg`);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="grad_${item.id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${item.col}"/>
      <stop offset="100%" stop-color="#1a202c"/>
    </linearGradient>
  </defs>
  <!-- Background Badge -->
  <rect x="10" y="10" width="80" height="80" rx="16" fill="url(#grad_${item.id})" stroke="#d69e2e" stroke-width="2"/>
  <circle cx="50" cy="46" r="24" fill="#ffffff" opacity="0.15"/>
  <!-- Decorative Inner Border -->
  <rect x="14" y="14" width="72" height="72" rx="12" fill="none" stroke="#ecc94b" stroke-dasharray="4,4" opacity="0.5"/>
  <!-- Monogram / Icon Symbol -->
  <text x="50" y="54" font-family="Georgia, serif" font-size="24" font-weight="bold" fill="#fefcbf" text-anchor="middle">${item.name.charAt(0)}</text>
  <!-- Label Banner -->
  <rect x="12" y="74" width="76" height="14" rx="4" fill="#000000" opacity="0.6"/>
  <text x="50" y="84" font-family="Arial, sans-serif" font-size="7" font-weight="bold" fill="#ecc94b" text-anchor="middle">${item.name.toUpperCase()}</text>
</svg>`;
  fs.writeFileSync(filePath, svg.trim(), 'utf8');
  count++;
  catalog.push({
    id: item.id,
    file: `${item.id}.svg`,
    name: item.name,
    category: item.cat,
    description: item.desc
  });
});

// Generate Master Catalog Markdown
const catalogMdPath = path.join(targetDir, 'MODELS_2D_CATALOG.md');
let mdContent = `# 🏰 MASTER 2D ASSET & MODEL CATALOG: GRID PROTOCOL
## *Complete Stronghold 1 & Medieval Asset Library (100+ Visual Models)*

**Storage Location:** \`grid-protocol/public/models2d/\`  
**Total 2D Models Generated:** ${count} Models  
**Format:** Vector Scalable Graphics (.SVG) with Native WebGPU/PixiJS Texture Compatibility & High-Res Scaling  

---

| Asset Filename | Visual Model Name | Category | Tactical & Historical Purpose |
| :--- | :--- | :--- | :--- |
`;

catalog.forEach(c => {
  mdContent += `| \`${c.file}\` | **${c.name}** | *${c.category}* | ${c.description} |\n`;
});

fs.writeFileSync(catalogMdPath, mdContent, 'utf8');

console.log(`Successfully generated ${count} 2D models in ${targetDir}`);
