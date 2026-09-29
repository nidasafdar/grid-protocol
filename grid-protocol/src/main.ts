// src/main.ts
import './style.css';
import { Application, Graphics, Container, Text } from 'pixi.js';
import type {
  EmpireResources,
  LivestockData,
  KingState,
  CameraState,
  RationLevel,
  FoodStocks,
  ArmoryState,
  MilitaryRoster,
  SiegeDefenseState
} from './interfaces/GameTypes';

// --- Web Audio SFX & Medieval Scribe Voice Engine ---
class SoundEngine {
  private ctx: AudioContext | null = null;
  public voiceEnabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playBuy() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.06);
      gain.gain.setValueAtTime(0.05, now + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.2);
    });
  }

  playAction(freq = 440) {
    this.initCtx();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playAlert() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [320, 260, 320, 260].forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);
      gain.gain.setValueAtTime(0.06, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.07);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.08);
    });
  }

  playHeal() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [440, 554.37, 659.25, 880].forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.07);
      gain.gain.setValueAtTime(0.06, now + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.07);
      osc.stop(now + i * 0.07 + 0.3);
    });
  }

  playFire() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [180, 240, 310, 420, 350].forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + i * 0.05);
      gain.gain.setValueAtTime(0.08, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.22);
    });
  }

  speakScribe(phrase: string) {
    if (!this.voiceEnabled) return;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(phrase);
      utter.rate = 1.0;
      utter.pitch = 0.95;
      window.speechSynthesis.speak(utter);
    }
  }
}

const sfx = new SoundEngine();

// --- EMPIRE GLOBAL STATE ---
const resources: EmpireResources = {
  gold: 1250,
  food: 840,
  timber: 320,
  stone: 180,
  iron: 65,
  bricks: 50,
  pitch: 40,
  population: 28,
  loyalty: 94,
  popularity: 82 // Threshold 50
};

// Granary 4-Food Types
const foodStocks: FoodStocks = {
  bread: 340,
  apples: 210,
  cheese: 180,
  meat: 110
};

// Stronghold Popularity Engine Parameters
let rationSetting: RationLevel = 'double';
let taxRateVal: number = 0; // -24 to +16
let aleBonusVal: number = 3;
let religionBonusVal: number = 3;
let fearFactorVal: number = 0; // -5 to +5

// Armory Inventory
const armory: ArmoryState = {
  bows: 12,
  crossbows: 6,
  spears: 15,
  pikes: 8,
  maces: 5,
  swords: 7,
  leatherArmor: 11,
  plateArmor: 9
};

// Military Roster
const roster: MilitaryRoster = {
  spearmen: 14,
  archers: 18,
  crossbowmen: 8,
  macemen: 6,
  pikemen: 4,
  swordsmen: 4,
  knights: 2,
  engineers: 3
};

// Siege Defenses
const siegeDefenses: SiegeDefenseState = {
  pitchDitches: 12,
  pitchIgnited: false,
  boilingOilReady: 4,
  batteringRams: 1,
  catapults: 2,
  trebuchets: 1
};

// Livestock State
const livestockMap: Record<string, LivestockData> = {
  goats: {
    kind: 'goats',
    name: "The Shepherd's Flock",
    count: 10,
    baseCost: 100,
    doublingMinutes: 10,
    nextDoublingSeconds: 600,
    yieldDescription: 'Passive wool & meat'
  },
  cows: {
    kind: 'cows',
    name: 'Pastoral Pasture',
    count: 5,
    baseCost: 250,
    doublingMinutes: 15,
    nextDoublingSeconds: 900,
    yieldDescription: 'Leather & dense food'
  },
  horses: {
    kind: 'horses',
    name: 'Equestrian Stables',
    count: 2,
    baseCost: 500,
    doublingMinutes: 20,
    nextDoublingSeconds: 1200,
    yieldDescription: 'Warhorses for Knights'
  }
};

const king: KingState = {
  name: 'Chieftain Arsalan',
  faction: 'Parrot Green',
  healthPercent: 100,
  isUnderAttack: false,
  isRescued: false,
  hospitalActive: true
};

// --- DOM ELEMENTS CACHE ---
const elResGold = document.getElementById('res-gold');
const elResFood = document.getElementById('res-food');
const elResTimber = document.getElementById('res-timber');
const elResStone = document.getElementById('res-stone');
const elResIron = document.getElementById('res-iron');
const elResPitch = document.getElementById('res-pitch');
const elResPop = document.getElementById('res-pop');
const elResPopularity = document.getElementById('res-popularity');
const elPopMainVal = document.getElementById('pop-main-val');
const elCampfireStatus = document.getElementById('campfire-status-text');
const elScribeText = document.getElementById('scribe-text');
const elBtnSound = document.getElementById('btn-sound-toggle');

const elKingHealthNum = document.getElementById('king-health-num');
const elKingHealthBar = document.getElementById('king-health-bar');
const elKingStatus = document.getElementById('king-status-indicator');

const elHudCoords = document.getElementById('hud-camera-coords');
const elHudBiome = document.getElementById('hud-biome-name');
const elHudFps = document.getElementById('hud-fps-val');

// Food quantities in Granary
const elQtyBread = document.getElementById('qty-food-bread');
const elQtyApples = document.getElementById('qty-food-apples');
const elQtyCheese = document.getElementById('qty-food-cheese');
const elQtyMeat = document.getElementById('qty-food-meat');

// Armory stock elements
const elStockBows = document.getElementById('stock-bows');
const elStockCrossbows = document.getElementById('stock-crossbows');
const elStockSpears = document.getElementById('stock-spears');
const elStockPikes = document.getElementById('stock-pikes');
const elStockMaces = document.getElementById('stock-maces');
const elStockSwords = document.getElementById('stock-swords');
const elStockLeather = document.getElementById('stock-leather');
const elStockPlate = document.getElementById('stock-plate');

// Roster elements
const elRosterSpearmen = document.getElementById('roster-spearmen');
const elRosterArchers = document.getElementById('roster-archers');
const elRosterCrossbowmen = document.getElementById('roster-crossbowmen');
const elRosterMacemen = document.getElementById('roster-macemen');
const elRosterSwordsmen = document.getElementById('roster-swordsmen');
const elRosterKnights = document.getElementById('roster-knights');

// Calculate Stronghold Popularity Score (0 to 100)
function calculatePopularity(): number {
  let score = 50; // Neutral baseline

  // 1. Food Rations Modifier
  if (rationSetting === 'none') score -= 8;
  else if (rationSetting === 'half') score -= 4;
  else if (rationSetting === 'normal') score += 0;
  else if (rationSetting === 'double') score += 4;
  else if (rationSetting === 'extra') score += 8;

  // 2. Diet Diversity (+1 to +4)
  let varieties = 0;
  if (foodStocks.bread > 0) varieties++;
  if (foodStocks.apples > 0) varieties++;
  if (foodStocks.cheese > 0) varieties++;
  if (foodStocks.meat > 0) varieties++;
  score += varieties;

  // 3. Tax / Bribes (-24 to +16)
  score += taxRateVal;

  // 4. Ale & Religion
  score += aleBonusVal;
  score += religionBonusVal;

  // 5. Fear Factor
  score += fearFactorVal;

  // Clamp 0 to 100
  return Math.max(0, Math.min(100, score));
}

function updateScribe(quote: string, speak = false) {
  if (elScribeText) {
    elScribeText.innerText = `"${quote}"`;
  }
  if (speak) {
    sfx.speakScribe(quote);
  }
}

function updateDOMResources() {
  // Recalculate total food from stocks
  resources.food = foodStocks.bread + foodStocks.apples + foodStocks.cheese + foodStocks.meat;
  resources.popularity = calculatePopularity();

  if (elResGold) elResGold.innerText = resources.gold.toLocaleString();
  if (elResFood) elResFood.innerText = resources.food.toLocaleString();
  if (elResTimber) elResTimber.innerText = resources.timber.toLocaleString();
  if (elResStone) elResStone.innerText = resources.stone.toLocaleString();
  if (elResIron) elResIron.innerText = resources.iron.toLocaleString();
  if (elResPitch) elResPitch.innerText = resources.pitch.toLocaleString();
  if (elResPop) elResPop.innerText = resources.population.toString();

  if (elResPopularity) elResPopularity.innerText = `${resources.popularity} / 100`;
  if (elPopMainVal) elPopMainVal.innerText = resources.popularity.toString();

  // Campfire Status
  if (elCampfireStatus) {
    if (resources.popularity > 50) {
      elCampfireStatus.innerText = 'PEASANTS ARRIVING (+2/min)';
      elCampfireStatus.className = 'text-green';
    } else if (resources.popularity === 50) {
      elCampfireStatus.innerText = 'STATIC BALANCE (0/min)';
      elCampfireStatus.className = 'text-gold';
    } else {
      elCampfireStatus.innerText = 'PEASANTS LEAVING (-2/min)';
      elCampfireStatus.className = 'text-red';
    }
  }

  // Food stocks in granary
  if (elQtyBread) elQtyBread.innerText = foodStocks.bread.toString();
  if (elQtyApples) elQtyApples.innerText = foodStocks.apples.toString();
  if (elQtyCheese) elQtyCheese.innerText = foodStocks.cheese.toString();
  if (elQtyMeat) elQtyMeat.innerText = foodStocks.meat.toString();

  // Armory
  if (elStockBows) elStockBows.innerText = armory.bows.toString();
  if (elStockCrossbows) elStockCrossbows.innerText = armory.crossbows.toString();
  if (elStockSpears) elStockSpears.innerText = armory.spears.toString();
  if (elStockPikes) elStockPikes.innerText = armory.pikes.toString();
  if (elStockMaces) elStockMaces.innerText = armory.maces.toString();
  if (elStockSwords) elStockSwords.innerText = armory.swords.toString();
  if (elStockLeather) elStockLeather.innerText = armory.leatherArmor.toString();
  if (elStockPlate) elStockPlate.innerText = armory.plateArmor.toString();

  // Roster
  if (elRosterSpearmen) elRosterSpearmen.innerText = roster.spearmen.toString();
  if (elRosterArchers) elRosterArchers.innerText = roster.archers.toString();
  if (elRosterCrossbowmen) elRosterCrossbowmen.innerText = roster.crossbowmen.toString();
  if (elRosterMacemen) elRosterMacemen.innerText = roster.macemen.toString();
  if (elRosterSwordsmen) elRosterSwordsmen.innerText = roster.swordsmen.toString();
  if (elRosterKnights) elRosterKnights.innerText = roster.knights.toString();
}

function updateDOMKing() {
  if (elKingHealthNum) elKingHealthNum.innerText = `${Math.max(0, king.healthPercent)}%`;
  if (elKingHealthBar) {
    elKingHealthBar.style.width = `${Math.max(0, king.healthPercent)}%`;
    elKingHealthBar.classList.remove('warning', 'critical');
    if (king.healthPercent <= 30) {
      elKingHealthBar.classList.add('critical');
    } else if (king.healthPercent <= 60) {
      elKingHealthBar.classList.add('warning');
    }
  }

  if (elKingStatus) {
    if (king.healthPercent <= 0) {
      elKingStatus.innerText = 'REGICIDE (FALLEN)';
      elKingStatus.className = 'king-status-tag danger';
      updateScribe('The King has fallen! The realm collapses into ruin!', true);
    } else if (king.isUnderAttack) {
      elKingStatus.innerText = 'CITADEL UNDER SIEGE!';
      elKingStatus.className = 'king-status-tag danger';
    } else {
      elKingStatus.innerText = 'SECURE';
      elKingStatus.className = 'king-status-tag safe';
    }
  }
}

function formatTimer(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// --- BOOTSTRAP MAIN APPLICATION ---
(async () => {
  const canvasContainer = document.getElementById('canvas-container');
  if (!canvasContainer) return;

  const app = new Application();
  await app.init({
    resizeTo: canvasContainer,
    backgroundAlpha: 0,
    preference: 'webgpu'
  });

  canvasContainer.appendChild(app.canvas);

  // --- 11,000 km² VIRTUAL MACRO WORLD CONTAINER ---
  const worldContainer = new Container();
  app.stage.addChild(worldContainer);

  const worldWidth = 3200;
  const worldHeight = 2200;

  // Camera State with smooth interpolations
  const camera: CameraState = {
    x: 400,
    y: 350,
    zoom: 1,
    minX: 0,
    maxX: Math.max(0, worldWidth - app.renderer.width),
    minY: 0,
    maxY: Math.max(0, worldHeight - app.renderer.height)
  };

  // --- RENDER 3 GEOGRAPHIC BIOMES ---
  const biomesLayer = new Graphics();
  worldContainer.addChild(biomesLayer);

  // Biome 1: Lush Greenery Zone (Parrot Green: X: 0 to 1400)
  biomesLayer.rect(0, 0, 1400, worldHeight).fill({ color: 0x081e18, alpha: 0.55 });
  // Lush River Artery
  biomesLayer.moveTo(0, 700).bezierCurveTo(400, 650, 800, 850, 1400, 780).stroke({ width: 44, color: 0x0284c7, alpha: 0.6 });
  biomesLayer.moveTo(0, 700).bezierCurveTo(400, 650, 800, 850, 1400, 780).stroke({ width: 28, color: 0x38bdf8, alpha: 0.8 });

  // Biome 2: Petroleum Sump Wasteland (Gray/Black: X: 1400 to 2300)
  biomesLayer.rect(1400, 0, 900, worldHeight).fill({ color: 0x0f131a, alpha: 0.6 });
  // Bubbling Crude Pitch Tar pools
  biomesLayer.ellipse(1700, 450, 120, 70).fill({ color: 0x020305 }).stroke({ width: 4, color: 0x1e293b });
  biomesLayer.ellipse(1950, 1100, 150, 90).fill({ color: 0x020305 }).stroke({ width: 4, color: 0x1e293b });
  biomesLayer.ellipse(1600, 1600, 110, 60).fill({ color: 0x020305 }).stroke({ width: 4, color: 0x1e293b });

  // Biome 3: Delta Basin & River Dam (Maroon/Red: X: 2300 to 3200)
  biomesLayer.rect(2300, 0, 900, worldHeight).fill({ color: 0x1c0b0b, alpha: 0.6 });
  biomesLayer.ellipse(2800, 900, 240, 360).fill({ color: 0x1e3a5f }).stroke({ width: 8, color: 0x991b1b });

  // Biome Text Labels
  const labelGreenery = new Text({
    text: 'BIOME 1: LUSH GREENERY ZONE\n[ TIMBER • COTTON • ORCHARDS • HERBS ]',
    style: { fontFamily: 'Courier New', fontSize: 16, fill: 0x10b981, fontWeight: 'bold' }
  });
  labelGreenery.x = 200; labelGreenery.y = 80;
  worldContainer.addChild(labelGreenery);

  const labelSump = new Text({
    text: 'BIOME 2: PETROLEUM SUMP WASTELAND\n[ PITCH TAR • IRON MINES • ROCK BASTIONS ]',
    style: { fontFamily: 'Courier New', fontSize: 16, fill: 0x94a3b8, fontWeight: 'bold' }
  });
  labelSump.x = 1500; labelSump.y = 80;
  worldContainer.addChild(labelSump);

  // --- FOREST NODES ---
  const forestLayer = new Container();
  worldContainer.addChild(forestLayer);
  for (let i = 0; i < 40; i++) {
    const tx = 100 + (i % 8) * 140 + Math.sin(i) * 30;
    const ty = 250 + Math.floor(i / 8) * 140 + Math.cos(i) * 30;
    const tree = new Graphics()
      .circle(0, 0, 22)
      .fill({ color: 0x064e3b, alpha: 0.85 })
      .stroke({ width: 2, color: 0x10b981 })
      .circle(0, -6, 12)
      .fill({ color: 0x059669 });
    tree.x = tx; tree.y = ty;
    forestLayer.addChild(tree);
  }

  // --- STRONGHOLD FORTRESS OF PARROT GREEN ---
  const citadelGroup = new Container();
  citadelGroup.x = 680; citadelGroup.y = 1100;
  worldContainer.addChild(citadelGroup);

  // Defensive Water Moat
  const moatGraphics = new Graphics()
    .rect(-210, -210, 420, 420)
    .fill({ color: 0x0369a1, alpha: 0.75 })
    .stroke({ width: 6, color: 0x38bdf8 });

  // Outer Curtain Stone Wall with Crenelations
  const outerWall = new Graphics()
    .rect(-180, -180, 360, 360)
    .fill({ color: 0x0a1626, alpha: 0.9 })
    .stroke({ width: 5, color: 0x00ffcc });

  // 4 Corner Round Towers
  const tNW = new Graphics().circle(-180, -180, 24).fill({ color: 0x334155 }).stroke({ width: 3, color: 0x00ffcc });
  const tNE = new Graphics().circle(180, -180, 24).fill({ color: 0x334155 }).stroke({ width: 3, color: 0x00ffcc });
  const tSW = new Graphics().circle(-180, 180, 24).fill({ color: 0x334155 }).stroke({ width: 3, color: 0x00ffcc });
  const tSE = new Graphics().circle(180, 180, 24).fill({ color: 0x334155 }).stroke({ width: 3, color: 0x00ffcc });

  // Gatehouse Drawbridge Entryway
  const gatehouse = new Graphics()
    .rect(-30, 160, 60, 40)
    .fill({ color: 0x1e293b })
    .stroke({ width: 3, color: 0xd97706 });

  // Inner Keep Bastion
  const innerWall = new Graphics()
    .rect(-90, -90, 180, 180)
    .fill({ color: 0x060e18 })
    .stroke({ width: 3, color: 0xf59e0b });

  // Central Keep Palace
  const palace = new Graphics()
    .rect(-45, -45, 90, 90)
    .fill({ color: 0x10b981 })
    .stroke({ width: 2, color: 0xffffff });

  const kingSprite = new Text({
    text: '👑\nLORD',
    style: { fontFamily: 'Courier New', fontSize: 13, fill: 0xffffff, align: 'center', fontWeight: 'bold' }
  });
  kingSprite.anchor.set(0.5);

  // Dynamic Fire Layer for Pitch Ditch ignition
  const pitchFireLayer = new Graphics();
  citadelGroup.addChild(moatGraphics, outerWall, tNW, tNE, tSW, tSE, gatehouse, innerWall, palace, kingSprite, pitchFireLayer);

  const citadelLabel = new Text({
    text: 'STRONGHOLD CITADEL OF PARROT GREEN\n[ KEEP • CRENELLATED WALLS • WATER MOAT ]',
    style: { fontFamily: 'Courier New', fontSize: 13, fill: 0x00ffcc, align: 'center', fontWeight: 'bold' }
  });
  citadelLabel.x = 0; citadelLabel.y = 230; citadelLabel.anchor.set(0.5);
  citadelGroup.addChild(citadelLabel);

  // --- HARDWARE INSTANCED LIVESTOCK & PEASANT HERD LAYER ---
  const livestockLayer = new Container();
  worldContainer.addChild(livestockLayer);

  interface HerdVisual {
    graphic: Graphics;
    type: string;
    baseX: number;
    baseY: number;
    speed: number;
    angle: number;
  }

  const activeHerdVisuals: HerdVisual[] = [];

  function spawnVisualLivestock(type: 'goat' | 'cow' | 'horse' | 'peasant', x: number, y: number) {
    const g = new Graphics();
    if (type === 'goat') {
      g.circle(0, 0, 7).fill({ color: 0xf8fafc }).stroke({ width: 1.5, color: 0x94a3b8 });
    } else if (type === 'cow') {
      g.rect(-9, -6, 18, 12).fill({ color: 0x78350f }).stroke({ width: 2, color: 0xfef3c7 });
    } else if (type === 'horse') {
      g.ellipse(0, 0, 12, 7).fill({ color: 0xb45309 }).stroke({ width: 2, color: 0xf59e0b });
    } else {
      // Peasant walking
      g.circle(0, -4, 5).fill({ color: 0xfbd38d });
      g.rect(-3, 0, 6, 9).fill({ color: 0x38a169 });
    }
    g.x = x; g.y = y;
    livestockLayer.addChild(g);

    activeHerdVisuals.push({
      graphic: g,
      type,
      baseX: x,
      baseY: y,
      speed: 0.4 + Math.random() * 0.4,
      angle: Math.random() * Math.PI * 2
    });
  }

  // Seed initial visual sprites
  for (let i = 0; i < 10; i++) spawnVisualLivestock('goat', 350 + Math.random() * 220, 600 + Math.random() * 180);
  for (let i = 0; i < 5; i++) spawnVisualLivestock('cow', 400 + Math.random() * 200, 850 + Math.random() * 160);
  for (let i = 0; i < 2; i++) spawnVisualLivestock('horse', 320 + Math.random() * 160, 1100 + Math.random() * 120);
  for (let i = 0; i < 6; i++) spawnVisualLivestock('peasant', 550 + Math.random() * 100, 1050 + Math.random() * 80);

  // --- KEYBOARD CONTROLS & CAMERA MAPPING ---
  const activeKeys: Record<string, boolean> = {};
  window.addEventListener('keydown', (e) => activeKeys[e.key] = true);
  window.addEventListener('keyup', (e) => activeKeys[e.key] = false);

  // Mouse drag camera controls
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;

  const canvasEl = app.canvas;
  canvasEl.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;
    camera.x -= dx;
    camera.y -= dy;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
  });

  window.addEventListener('mouseup', () => isDragging = false);

  // --- TAB NAVIGATION ---
  const tabs = document.querySelectorAll<HTMLButtonElement>('.nav-tab');
  const panes = document.querySelectorAll<HTMLElement>('.tab-pane');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      sfx.playAction(600);
      tabs.forEach((t) => t.classList.remove('active'));
      panes.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      if (targetId) {
        document.getElementById(targetId)?.classList.add('active');
      }
    });
  });

  // Sound toggle button
  elBtnSound?.addEventListener('click', () => {
    sfx.voiceEnabled = !sfx.voiceEnabled;
    elBtnSound.innerText = sfx.voiceEnabled ? '🔊' : '🔇';
    sfx.playAction(sfx.voiceEnabled ? 650 : 300);
  });

  // --- STRONGHOLD POPULARITY CONTROLS ---
  // 1. Food Rations Buttons
  const rationButtons = document.querySelectorAll<HTMLButtonElement>('.btn-ration');
  const elBadgeRation = document.getElementById('badge-ration-mod');

  rationButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      rationButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      rationSetting = (btn.getAttribute('data-ration') as RationLevel) || 'normal';

      if (rationSetting === 'none') {
        if (elBadgeRation) elBadgeRation.innerText = 'No Rations (-8)';
        updateScribe('Sire, the people are starving! Food stocks are completely shut!', true);
      } else if (rationSetting === 'half') {
        if (elBadgeRation) elBadgeRation.innerText = 'Half Rations (-4)';
        updateScribe('Half rations declared. The people grumble, my Lord.');
      } else if (rationSetting === 'normal') {
        if (elBadgeRation) elBadgeRation.innerText = 'Normal Rations (0)';
        updateScribe('Standard rations served at the granary.');
      } else if (rationSetting === 'double') {
        if (elBadgeRation) elBadgeRation.innerText = 'Double Rations (+4)';
        updateScribe('Double rations! The people praise your feast, Sire!', true);
      } else if (rationSetting === 'extra') {
        if (elBadgeRation) elBadgeRation.innerText = 'Extra Rations (+8)';
        updateScribe('A grand banquet! The people love you, my Lord!', true);
      }

      sfx.playAction(500);
      updateDOMResources();
    });
  });

  // 2. Tax Slider
  const sliderTaxes = document.getElementById('slider-taxes') as HTMLInputElement | null;
  const elBadgeTax = document.getElementById('badge-tax-mod');
  const elTaxStatus = document.getElementById('tax-label-status');
  const elTaxRevenue = document.getElementById('tax-revenue-calc');

  sliderTaxes?.addEventListener('input', (e) => {
    taxRateVal = parseInt((e.target as HTMLInputElement).value, 10);
    const goldPerPop = (taxRateVal / 8).toFixed(1);
    const monthlyRev = Math.round(resources.population * (taxRateVal / 8));

    if (elTaxStatus) {
      if (taxRateVal === 0) elTaxStatus.innerText = 'Tax Rate: No Taxes (+0g/citizen)';
      else if (taxRateVal > 0) elTaxStatus.innerText = `Bribe Handouts: ${taxRateVal > 0 ? '+' : ''}${taxRateVal} Pop (${goldPerPop}g)`;
      else elTaxStatus.innerText = `Heavy Taxes: ${taxRateVal} Pop (${Math.abs(Number(goldPerPop))}g)`;
    }

    if (elTaxRevenue) {
      elTaxRevenue.innerText = `${monthlyRev >= 0 ? '+' : ''}${monthlyRev} 🪙 / mo`;
    }

    if (elBadgeTax) {
      elBadgeTax.innerText = taxRateVal === 0 ? 'No Taxes (0)' : `${taxRateVal > 0 ? '+' : ''}${taxRateVal} Pop`;
    }

    if (taxRateVal === 0) updateScribe('No taxes is good taxes, that is what I say!', true);
    else if (taxRateVal <= -16) updateScribe('The people groan under these extortionate taxes, Sire!');
    else if (taxRateVal >= 8) updateScribe('A generous bribe! The peasants bless your royal name, Sire!');

    updateDOMResources();
  });

  // 3. Ale & Priest Blessing Handlers
  document.getElementById('btn-brew-ale')?.addEventListener('click', () => {
    if (resources.gold >= 30) {
      resources.gold -= 30;
      aleBonusVal = Math.min(8, aleBonusVal + 2);
      sfx.playBuy();
      updateScribe('A flagon of foaming ale for every man! Cheers to the Lord!', true);
      updateDOMResources();
    }
  });

  document.getElementById('btn-priest-bless')?.addEventListener('click', () => {
    if (resources.gold >= 25) {
      resources.gold -= 25;
      religionBonusVal = Math.min(8, religionBonusVal + 2);
      sfx.playAction(700);
      updateScribe('The Father has blessed the workers. Faith fills the castle!');
      updateDOMResources();
    }
  });

  // 4. Fear Factor Toggles
  const btnFearBad = document.getElementById('btn-fear-bad');
  const btnFearNeutral = document.getElementById('btn-fear-neutral');
  const btnFearGood = document.getElementById('btn-fear-good');
  const elFearStatus = document.getElementById('fear-factor-status');

  btnFearBad?.addEventListener('click', () => {
    fearFactorVal = -4;
    btnFearBad.classList.add('active');
    btnFearNeutral?.classList.remove('active');
    btnFearGood?.classList.remove('active');
    if (elFearStatus) elFearStatus.innerText = 'Cruelty Mode (+25% Labor, -25% Morale)';
    updateScribe('The gallows cast a grim shadow. Workers toil in terror, Sire!');
    sfx.playAlert();
    updateDOMResources();
  });

  btnFearNeutral?.addEventListener('click', () => {
    fearFactorVal = 0;
    btnFearNeutral.classList.add('active');
    btnFearBad?.classList.remove('active');
    btnFearGood?.classList.remove('active');
    if (elFearStatus) elFearStatus.innerText = 'Neutral Balance (0)';
    sfx.playAction(400);
    updateDOMResources();
  });

  btnFearGood?.addEventListener('click', () => {
    fearFactorVal = 4;
    btnFearGood.classList.add('active');
    btnFearBad?.classList.remove('active');
    btnFearNeutral?.classList.remove('active');
    if (elFearStatus) elFearStatus.innerText = 'Pageantry Mode (+25% Combat Morale)';
    updateScribe('Dancing bears and maypoles! A glorious day in the kingdom, Sire!', true);
    sfx.playAction(550);
    updateDOMResources();
  });

  // --- BARRACKS MILITARY DRAFTING (STRONGHOLD SYSTEM) ---
  document.getElementById('btn-draft-spearman')?.addEventListener('click', () => {
    if (resources.gold >= 10 && armory.spears >= 1 && resources.population > 5) {
      resources.gold -= 10;
      armory.spears -= 1;
      resources.population -= 1;
      roster.spearmen += 1;
      sfx.playAction(350);
      updateScribe('Spearman reporting for duty, Sire!');
      updateDOMResources();
    } else {
      sfx.playAlert();
      updateScribe('Cannot draft: Need spear, 10 gold, and idle peasant!');
    }
  });

  document.getElementById('btn-draft-archer')?.addEventListener('click', () => {
    if (resources.gold >= 20 && armory.bows >= 1 && resources.population > 5) {
      resources.gold -= 20;
      armory.bows -= 1;
      resources.population -= 1;
      roster.archers += 1;
      sfx.playAction(450);
      updateScribe('Bow ready, my Lord! Castle archer enlisted.', true);
      updateDOMResources();
    } else {
      sfx.playAlert();
      updateScribe('Cannot draft: Need carved bow, 20 gold, and peasant!');
    }
  });

  document.getElementById('btn-draft-crossbowman')?.addEventListener('click', () => {
    if (resources.gold >= 35 && armory.crossbows >= 1 && armory.leatherArmor >= 1 && resources.population > 5) {
      resources.gold -= 35;
      armory.crossbows -= 1;
      armory.leatherArmor -= 1;
      resources.population -= 1;
      roster.crossbowmen += 1;
      sfx.playAction(480);
      updateScribe('Heavy Crossbowman ready to pierce enemy armor, Sire!');
      updateDOMResources();
    } else {
      sfx.playAlert();
      updateScribe('Cannot draft: Need crossbow, leather armor, and 35 gold!');
    }
  });

  document.getElementById('btn-draft-maceman')?.addEventListener('click', () => {
    if (resources.gold >= 40 && armory.maces >= 1 && armory.leatherArmor >= 1 && resources.population > 5) {
      resources.gold -= 40;
      armory.maces -= 1;
      armory.leatherArmor -= 1;
      resources.population -= 1;
      roster.macemen += 1;
      sfx.playAction(520);
      updateScribe('Maceman at your service! Ready to scale enemy walls!');
      updateDOMResources();
    } else {
      sfx.playAlert();
    }
  });

  document.getElementById('btn-draft-swordsman')?.addEventListener('click', () => {
    if (resources.gold >= 60 && armory.swords >= 1 && armory.plateArmor >= 1 && resources.population > 5) {
      resources.gold -= 60;
      armory.swords -= 1;
      armory.plateArmor -= 1;
      resources.population -= 1;
      roster.swordsmen += 1;
      sfx.playAction(600);
      updateScribe('Ironclad Swordsman stands as your personal shield, Sire!', true);
      updateDOMResources();
    } else {
      sfx.playAlert();
      updateScribe('Cannot draft: Need broadsword, metal plate, and 60 gold!');
    }
  });

  document.getElementById('btn-draft-knight')?.addEventListener('click', () => {
    if (resources.gold >= 120 && armory.swords >= 1 && armory.plateArmor >= 1 && livestockMap.horses.count >= 1 && resources.population > 5) {
      resources.gold -= 120;
      armory.swords -= 1;
      armory.plateArmor -= 1;
      livestockMap.horses.count -= 1;
      resources.population -= 1;
      roster.knights += 1;
      sfx.playBuy();
      updateScribe('Mounted Knight prepared for the charge! God save the King!', true);
      updateDOMResources();
    } else {
      sfx.playAlert();
      updateScribe('Cannot draft Knight: Requires sword, plate armor, warhorse, and 120g!');
    }
  });

  // --- ACTIVE DEFENSES: PITCH DITCHES & BOILING OIL ---
  document.getElementById('btn-ignite-pitch')?.addEventListener('click', () => {
    if (resources.pitch >= 10) {
      resources.pitch -= 10;
      siegeDefenses.pitchIgnited = true;
      sfx.playFire();
      updateScribe('Pitch ditches ignited! Roaring inferno on the battlefield!', true);
      
      // Draw fire ring on canvas
      pitchFireLayer.clear();
      pitchFireLayer.rect(-200, -200, 400, 400).stroke({ width: 14, color: 0xef4444, alpha: 0.9 });
      pitchFireLayer.rect(-200, -200, 400, 400).stroke({ width: 8, color: 0xf59e0b, alpha: 0.95 });

      setTimeout(() => {
        pitchFireLayer.clear();
        siegeDefenses.pitchIgnited = false;
      }, 5000);

      updateDOMResources();
    } else {
      sfx.playAlert();
      updateScribe('No pitch reserves! Extract more pitch from the marsh rig!');
    }
  });

  document.getElementById('btn-pour-oil')?.addEventListener('click', () => {
    if (resources.pitch >= 5) {
      resources.pitch -= 5;
      sfx.playFire();
      updateScribe('Boiling oil poured from the battlements! Attackers incinerated!', true);
      updateDOMResources();
    } else {
      sfx.playAlert();
    }
  });

  // --- SIEGE WEAPONS WORKSHOP ---
  document.getElementById('btn-build-ram')?.addEventListener('click', () => {
    if (resources.gold >= 150 && resources.timber >= 50) {
      resources.gold -= 150;
      resources.timber -= 50;
      siegeDefenses.batteringRams += 1;
      sfx.playBuy();
      updateScribe('Battering Ram assembled by our engineers!');
      updateDOMResources();
    }
  });

  document.getElementById('btn-build-catapult')?.addEventListener('click', () => {
    if (resources.gold >= 200 && resources.timber >= 60 && resources.stone >= 20) {
      resources.gold -= 200;
      resources.timber -= 60;
      resources.stone -= 20;
      siegeDefenses.catapults += 1;
      sfx.playBuy();
      updateScribe('Catapult primed! Stone bombardment ready, Sire!', true);
      updateDOMResources();
    }
  });

  document.getElementById('btn-build-trebuchet')?.addEventListener('click', () => {
    if (resources.gold >= 350 && resources.timber >= 100 && resources.stone >= 40) {
      resources.gold -= 350;
      resources.timber -= 100;
      resources.stone -= 40;
      siegeDefenses.trebuchets += 1;
      sfx.playBuy();
      updateScribe('Trebuchet erected! Ready to launch giant boulders and diseased cattle!', true);
      updateDOMResources();
    }
  });

  // --- LIVESTOCK PURCHASE HANDLERS ---
  document.getElementById('btn-buy-goats')?.addEventListener('click', () => {
    if (resources.gold >= livestockMap.goats.baseCost) {
      resources.gold -= livestockMap.goats.baseCost;
      livestockMap.goats.count += 10;
      sfx.playBuy();
      updateDOMResources();
      for (let i = 0; i < 4; i++) spawnVisualLivestock('goat', 360 + Math.random() * 180, 600 + Math.random() * 160);
    } else sfx.playAlert();
  });

  document.getElementById('btn-buy-cows')?.addEventListener('click', () => {
    if (resources.gold >= livestockMap.cows.baseCost) {
      resources.gold -= livestockMap.cows.baseCost;
      livestockMap.cows.count += 5;
      sfx.playBuy();
      updateDOMResources();
      for (let i = 0; i < 3; i++) spawnVisualLivestock('cow', 400 + Math.random() * 180, 850 + Math.random() * 140);
    } else sfx.playAlert();
  });

  document.getElementById('btn-buy-horses')?.addEventListener('click', () => {
    if (resources.gold >= livestockMap.horses.baseCost) {
      resources.gold -= livestockMap.horses.baseCost;
      livestockMap.horses.count += 2;
      sfx.playBuy();
      updateDOMResources();
      for (let i = 0; i < 2; i++) spawnVisualLivestock('horse', 330 + Math.random() * 150, 1100 + Math.random() * 100);
    } else sfx.playAlert();
  });

  // --- INDUSTRIAL HARVEST ACTIONS ---
  document.getElementById('btn-action-harvest')?.addEventListener('click', () => {
    resources.timber += 40;
    foodStocks.apples += 15;
    sfx.playAction(320);
    updateDOMResources();
  });

  document.getElementById('btn-action-quarry')?.addEventListener('click', () => {
    resources.stone += 25;
    sfx.playAction(290);
    updateDOMResources();
  });

  document.getElementById('btn-action-brick')?.addEventListener('click', () => {
    if (resources.timber >= 20) {
      resources.timber -= 20;
      resources.bricks += 25;
      sfx.playAction(400);
      updateDOMResources();
    } else sfx.playAlert();
  });

  document.getElementById('btn-action-pitch')?.addEventListener('click', () => {
    resources.pitch += 15;
    sfx.playAction(270);
    updateDOMResources();
  });

  // --- REGICIDE & HOSPITAL CONTROLS ---
  document.getElementById('btn-test-attack')?.addEventListener('click', () => {
    sfx.playAlert();
    king.healthPercent = Math.max(0, king.healthPercent - 20);
    king.isUnderAttack = true;
    updateDOMKing();
  });

  document.getElementById('btn-hospital-boost')?.addEventListener('click', () => {
    sfx.playHeal();
    king.healthPercent = Math.min(100, king.healthPercent + 35);
    king.isUnderAttack = false;
    king.isRescued = true;
    updateScribe('The King has been treated at the Field Hospital and stabilized!', true);
    updateDOMKing();
  });

  // --- DYNAMIC MARKET SELLING ---
  document.getElementById('btn-sell-timber')?.addEventListener('click', () => {
    if (resources.timber >= 20) {
      resources.timber -= 20;
      resources.gold += Math.round(20 * 15 * 1.4);
      sfx.playBuy();
      updateDOMResources();
    }
  });

  document.getElementById('btn-sell-food')?.addEventListener('click', () => {
    if (foodStocks.bread >= 50) {
      foodStocks.bread -= 50;
      resources.gold += Math.round(50 * 10 * 2.2);
      sfx.playBuy();
      updateDOMResources();
    }
  });

  document.getElementById('btn-sell-stone')?.addEventListener('click', () => {
    if (resources.stone >= 20) {
      resources.stone -= 20;
      resources.gold += Math.round(20 * 25 * 1.6);
      sfx.playBuy();
      updateDOMResources();
    }
  });

  document.getElementById('btn-sell-pitch')?.addEventListener('click', () => {
    if (resources.pitch >= 10) {
      resources.pitch -= 10;
      resources.gold += Math.round(10 * 60 * 4.8);
      sfx.playBuy();
      updateDOMResources();
    }
  });

  // --- MAIN WEBGPU TICKER LOOP ---
  let timerAccumulator = 0;
  let fpsAccumulator = 0;
  let frameCount = 0;
  let granaryTickAccumulator = 0;

  app.ticker.add((ticker) => {
    const delta = ticker.deltaTime;

    // A. Camera Movement Panning
    const panSpeed = 9 * delta;
    if (activeKeys['ArrowLeft'] || activeKeys['a'] || activeKeys['A']) camera.x -= panSpeed;
    if (activeKeys['ArrowRight'] || activeKeys['d'] || activeKeys['D']) camera.x += panSpeed;
    if (activeKeys['ArrowUp'] || activeKeys['w'] || activeKeys['W']) camera.y -= panSpeed;
    if (activeKeys['ArrowDown'] || activeKeys['s'] || activeKeys['S']) camera.y += panSpeed;

    // Camera Clamping to 11,000 km² World Boundaries
    camera.maxX = Math.max(0, worldWidth - app.renderer.width);
    camera.maxY = Math.max(0, worldHeight - app.renderer.height);
    camera.x = Math.max(camera.minX, Math.min(camera.maxX, camera.x));
    camera.y = Math.max(camera.minY, Math.min(camera.maxY, camera.y));

    worldContainer.x = -camera.x;
    worldContainer.y = -camera.y;

    // B. Telemetry Bar Updates
    if (elHudCoords) {
      elHudCoords.innerText = `X: ${Math.round(camera.x)} | Y: ${Math.round(camera.y)}`;
    }

    if (elHudBiome) {
      if (camera.x < 1300) elHudBiome.innerText = 'LUSH GREENERY ZONE (740 km²)';
      else if (camera.x < 2200) elHudBiome.innerText = 'PETROLEUM SUMP WASTELAND (1,200 km²)';
      else elHudBiome.innerText = 'DELTA BASIN & WATER ARTERIES (950 km²)';
    }

    // FPS Counter
    fpsAccumulator += ticker.deltaMS;
    frameCount++;
    if (fpsAccumulator >= 500) {
      if (elHudFps) {
        elHudFps.innerText = Math.round((frameCount * 1000) / fpsAccumulator).toString();
      }
      fpsAccumulator = 0;
      frameCount = 0;
    }

    // C. Roaming Livestock & Peasant Vectors
    for (const herd of activeHerdVisuals) {
      herd.angle += (Math.random() - 0.5) * 0.1;
      herd.graphic.x += Math.cos(herd.angle) * herd.speed * delta;
      herd.graphic.y += Math.sin(herd.angle) * herd.speed * delta;

      const dist = Math.hypot(herd.graphic.x - herd.baseX, herd.graphic.y - herd.baseY);
      if (dist > 75) {
        herd.angle = Math.atan2(herd.baseY - herd.graphic.y, herd.baseX - herd.graphic.x);
      }
    }

    // D. 1-Second Timer Tick for Livestock Doubling & Granary Consumption
    timerAccumulator += ticker.deltaMS;
    granaryTickAccumulator += ticker.deltaMS;

    if (granaryTickAccumulator >= 4000) {
      granaryTickAccumulator = 0;

      // Granary Food Consumption according to chosen ration setting
      let consumptionMultiplier = 1;
      if (rationSetting === 'none') consumptionMultiplier = 0;
      else if (rationSetting === 'half') consumptionMultiplier = 0.5;
      else if (rationSetting === 'normal') consumptionMultiplier = 1.0;
      else if (rationSetting === 'double') consumptionMultiplier = 2.0;
      else if (rationSetting === 'extra') consumptionMultiplier = 3.0;

      const foodConsumed = Math.round(resources.population * 0.2 * consumptionMultiplier);

      if (foodConsumed > 0) {
        if (foodStocks.bread >= foodConsumed) foodStocks.bread -= foodConsumed;
        else if (foodStocks.apples >= foodConsumed) foodStocks.apples -= foodConsumed;
        else if (foodStocks.cheese >= foodConsumed) foodStocks.cheese -= foodConsumed;
        else if (foodStocks.meat >= foodConsumed) foodStocks.meat -= foodConsumed;
      }

      // Stronghold Campfire Peasant Arrival / Departure rule
      if (resources.popularity > 50) {
        resources.population = Math.min(200, resources.population + 1);
        spawnVisualLivestock('peasant', 550 + Math.random() * 80, 1060 + Math.random() * 60);
      } else if (resources.popularity < 50 && resources.population > 4) {
        resources.population -= 1;
      }

      updateDOMResources();
    }

    if (timerAccumulator >= 1000) {
      timerAccumulator = 0;

      livestockMap.goats.nextDoublingSeconds = Math.max(0, livestockMap.goats.nextDoublingSeconds - 1);
      livestockMap.cows.nextDoublingSeconds = Math.max(0, livestockMap.cows.nextDoublingSeconds - 1);
      livestockMap.horses.nextDoublingSeconds = Math.max(0, livestockMap.horses.nextDoublingSeconds - 1);

      // Automated Doubling Checks
      if (livestockMap.goats.nextDoublingSeconds === 0) {
        livestockMap.goats.count *= 2;
        livestockMap.goats.nextDoublingSeconds = 600;
        foodStocks.meat += 80;
        sfx.playBuy();
        updateDOMResources();
      }

      if (livestockMap.cows.nextDoublingSeconds === 0) {
        livestockMap.cows.count *= 2;
        livestockMap.cows.nextDoublingSeconds = 900;
        foodStocks.cheese += 120;
        armory.leatherArmor += 6;
        sfx.playBuy();
        updateDOMResources();
      }

      if (livestockMap.horses.nextDoublingSeconds === 0) {
        livestockMap.horses.count *= 2;
        livestockMap.horses.nextDoublingSeconds = 1200;
        sfx.playBuy();
        updateDOMResources();
      }

      // Update timer labels in DOM
      const elGoatTimer = document.getElementById('metric-goats-timer');
      if (elGoatTimer) elGoatTimer.innerText = formatTimer(livestockMap.goats.nextDoublingSeconds);

      const elCowTimer = document.getElementById('metric-cows-timer');
      if (elCowTimer) elCowTimer.innerText = formatTimer(livestockMap.cows.nextDoublingSeconds);

      const elHorseTimer = document.getElementById('metric-horses-timer');
      if (elHorseTimer) elHorseTimer.innerText = formatTimer(livestockMap.horses.nextDoublingSeconds);
    }
  });

  // Initial DOM synchronization
  updateDOMResources();
  updateDOMKing();
})();
