// src/main.ts
import './style.css';
import { Application, Graphics, Container, Text } from 'pixi.js';
import type { EmpireResources, LivestockData, KingState, CameraState } from './interfaces/GameTypes';

// --- Web Audio SFX Synthesizer (Zero-Dependency) ---
class SoundEngine {
  private ctx: AudioContext | null = null;

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
}

const sfx = new SoundEngine();

// --- EMPIRE GLOBAL STATE ---
const resources: EmpireResources = {
  gold: 1250,
  food: 840,
  timber: 320,
  bricks: 50,
  population: 28,
  loyalty: 94
};

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
    name: 'The Pastoral Pasture',
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
    yieldDescription: 'Cavalry & Talwar squads'
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
const elResBricks = document.getElementById('res-bricks');
const elResPop = document.getElementById('res-pop');
const elResLoyalty = document.getElementById('res-loyalty');

const elKingHealthNum = document.getElementById('king-health-num');
const elKingHealthBar = document.getElementById('king-health-bar');
const elKingStatus = document.getElementById('king-status-indicator');

const elHudCoords = document.getElementById('hud-camera-coords');
const elHudBiome = document.getElementById('hud-biome-name');
const elHudFps = document.getElementById('hud-fps-val');

function updateDOMResources() {
  if (elResGold) elResGold.innerText = resources.gold.toLocaleString();
  if (elResFood) elResFood.innerText = resources.food.toLocaleString();
  if (elResTimber) elResTimber.innerText = resources.timber.toLocaleString();
  if (elResBricks) elResBricks.innerText = resources.bricks.toLocaleString();
  if (elResPop) elResPop.innerText = resources.population.toString();
  if (elResLoyalty) elResLoyalty.innerText = `${resources.loyalty}%`;
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
    } else if (king.isUnderAttack) {
      elKingStatus.innerText = 'CITADEL UNDER ATTACK!';
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
    backgroundColor: 0x030712,
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

  // --- RENDER 3 GEOGRAPHIC BIOMES (Section 2) ---
  const biomesLayer = new Graphics();
  worldContainer.addChild(biomesLayer);

  // Biome 1: Lush Greenery Zone (Parrot Green: X: 0 to 1400)
  biomesLayer.rect(0, 0, 1400, worldHeight).fill({ color: 0x081e18 });
  // Lush River Artery
  biomesLayer.moveTo(0, 700).bezierCurveTo(400, 650, 800, 850, 1400, 780).stroke({ width: 44, color: 0x0284c7, alpha: 0.6 });
  biomesLayer.moveTo(0, 700).bezierCurveTo(400, 650, 800, 850, 1400, 780).stroke({ width: 28, color: 0x38bdf8, alpha: 0.8 });

  // Biome 2: Petroleum Sump Wasteland (Gray/Black: X: 1400 to 2300)
  biomesLayer.rect(1400, 0, 900, worldHeight).fill({ color: 0x0f131a });
  // Bubbling Crude Pitch Tar pools
  biomesLayer.ellipse(1700, 450, 120, 70).fill({ color: 0x020305 }).stroke({ width: 4, color: 0x1e293b });
  biomesLayer.ellipse(1950, 1100, 150, 90).fill({ color: 0x020305 }).stroke({ width: 4, color: 0x1e293b });
  biomesLayer.ellipse(1600, 1600, 110, 60).fill({ color: 0x020305 }).stroke({ width: 4, color: 0x1e293b });

  // Biome 3: Delta Basin & River Dam (Maroon/Red: X: 2300 to 3200)
  biomesLayer.rect(2300, 0, 900, worldHeight).fill({ color: 0x1c0b0b });
  // Deep valley lake reservoir
  biomesLayer.ellipse(2800, 900, 240, 360).fill({ color: 0x1e3a5f }).stroke({ width: 8, color: 0x991b1b });

  // Biome Divider Lines & Labels
  biomesLayer.moveTo(1400, 0).lineTo(1400, worldHeight).stroke({ width: 2, color: 0x334155, alpha: 0.5 });
  biomesLayer.moveTo(2300, 0).lineTo(2300, worldHeight).stroke({ width: 2, color: 0x334155, alpha: 0.5 });

  // Biome World Canvas Text Markers
  const labelGreenery = new Text({
    text: 'BIOME 1: LUSH GREENERY ZONE\n[ TIMBER • COTTON • MEDICINAL HERBS ]',
    style: { fontFamily: 'Courier New', fontSize: 16, fill: 0x10b981, fontWeight: 'bold' }
  });
  labelGreenery.x = 200; labelGreenery.y = 80;
  worldContainer.addChild(labelGreenery);

  const labelSump = new Text({
    text: 'BIOME 2: PETROLEUM SUMP WASTELAND\n[ CRUDE OIL • HEAVY IRON MINES ]',
    style: { fontFamily: 'Courier New', fontSize: 16, fill: 0x94a3b8, fontWeight: 'bold' }
  });
  labelSump.x = 1500; labelSump.y = 80;
  worldContainer.addChild(labelSump);

  const labelDelta = new Text({
    text: 'BIOME 3: DELTA BASIN & WATER ARTERIES\n[ FRESH WATER VALVE • RIVER DAM CITADEL ]',
    style: { fontFamily: 'Courier New', fontSize: 16, fill: 0xef4444, fontWeight: 'bold' }
  });
  labelDelta.x = 2400; labelDelta.y = 80;
  worldContainer.addChild(labelDelta);

  // --- FOREST NODES & TIMBER LOOP (Lush Greenery Zone) ---
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

  // --- CITADEL OF PARROT GREEN (King's Seat & Imperial Knights) ---
  const citadelGroup = new Container();
  citadelGroup.x = 680; citadelGroup.y = 1100;
  worldContainer.addChild(citadelGroup);

  // Outer Defense Walls
  const outerWall = new Graphics()
    .rect(-180, -180, 360, 360)
    .fill({ color: 0x0a1626, alpha: 0.9 })
    .stroke({ width: 4, color: 0x00ffcc });
  
  // Inner Shield Wall
  const innerWall = new Graphics()
    .rect(-90, -90, 180, 180)
    .fill({ color: 0x060e18 })
    .stroke({ width: 3, color: 0xf59e0b });

  // Citadel Palace
  const palace = new Graphics()
    .rect(-45, -45, 90, 90)
    .fill({ color: 0x10b981 })
    .stroke({ width: 2, color: 0xffffff });

  const kingSprite = new Text({
    text: '👑\nKING',
    style: { fontFamily: 'Courier New', fontSize: 13, fill: 0xffffff, align: 'center', fontWeight: 'bold' }
  });
  kingSprite.anchor.set(0.5);

  citadelGroup.addChild(outerWall, innerWall, palace, kingSprite);

  // Citadel Banner
  const citadelLabel = new Text({
    text: 'CITADEL OF PARROT GREEN\n[ ROYAL IMPERIAL GUARD WALL ]',
    style: { fontFamily: 'Courier New', fontSize: 13, fill: 0x00ffcc, align: 'center', fontWeight: 'bold' }
  });
  citadelLabel.x = 0; citadelLabel.y = 195; citadelLabel.anchor.set(0.5);
  citadelGroup.addChild(citadelLabel);

  // --- HARDWARE INSTANCED LIVESTOCK HERD LAYER ---
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

  function spawnVisualLivestock(type: 'goat' | 'cow' | 'horse', x: number, y: number) {
    const g = new Graphics();
    if (type === 'goat') {
      g.circle(0, 0, 7).fill({ color: 0xf8fafc }).stroke({ width: 1.5, color: 0x94a3b8 });
    } else if (type === 'cow') {
      g.rect(-9, -6, 18, 12).fill({ color: 0x78350f }).stroke({ width: 2, color: 0xfef3c7 });
    } else {
      g.ellipse(0, 0, 12, 7).fill({ color: 0xb45309 }).stroke({ width: 2, color: 0xf59e0b });
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

  // Seed starting livestock on pasture
  for (let i = 0; i < 10; i++) spawnVisualLivestock('goat', 350 + Math.random() * 220, 600 + Math.random() * 180);
  for (let i = 0; i < 5; i++) spawnVisualLivestock('cow', 400 + Math.random() * 200, 850 + Math.random() * 160);
  for (let i = 0; i < 2; i++) spawnVisualLivestock('horse', 320 + Math.random() * 160, 1100 + Math.random() * 120);

  // --- RIVER DAM VALVE (Delta Basin: X: 2450, Y: 850) ---
  const riverDam = new Graphics()
    .rect(-40, -120, 80, 240)
    .fill({ color: 0x475569 })
    .stroke({ width: 3, color: 0x94a3b8 })
    .rect(-20, -100, 40, 200)
    .fill({ color: 0x1e293b });
  riverDam.x = 2450; riverDam.y = 850;
  worldContainer.addChild(riverDam);

  const damLabel = new Text({
    text: '⚙️ RIVER DAM MASTER VALVE\n[ AGRICULTURAL CONTROL ]',
    style: { fontFamily: 'Courier New', fontSize: 13, fill: 0x38bdf8, align: 'center', fontWeight: 'bold' }
  });
  damLabel.x = 2450; damLabel.y = 700; damLabel.anchor.set(0.5);
  worldContainer.addChild(damLabel);

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

  // --- SIDEBAR DOM INTERACTIVITY & BUTTON HANDLERS ---
  // 1. Tab Navigation
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

  // 2. Buy Livestock Handlers
  document.getElementById('btn-buy-goats')?.addEventListener('click', () => {
    if (resources.gold >= livestockMap.goats.baseCost) {
      resources.gold -= livestockMap.goats.baseCost;
      livestockMap.goats.count += 10;
      sfx.playBuy();
      updateDOMResources();
      const elCount = document.getElementById('metric-goats-count');
      if (elCount) elCount.innerText = livestockMap.goats.count.toString();
      for (let i = 0; i < 4; i++) spawnVisualLivestock('goat', 360 + Math.random() * 180, 600 + Math.random() * 160);
    } else {
      sfx.playAlert();
    }
  });

  document.getElementById('btn-buy-cows')?.addEventListener('click', () => {
    if (resources.gold >= livestockMap.cows.baseCost) {
      resources.gold -= livestockMap.cows.baseCost;
      livestockMap.cows.count += 5;
      sfx.playBuy();
      updateDOMResources();
      const elCount = document.getElementById('metric-cows-count');
      if (elCount) elCount.innerText = livestockMap.cows.count.toString();
      for (let i = 0; i < 3; i++) spawnVisualLivestock('cow', 400 + Math.random() * 180, 850 + Math.random() * 140);
    } else {
      sfx.playAlert();
    }
  });

  document.getElementById('btn-buy-horses')?.addEventListener('click', () => {
    if (resources.gold >= livestockMap.horses.baseCost) {
      resources.gold -= livestockMap.horses.baseCost;
      livestockMap.horses.count += 2;
      sfx.playBuy();
      updateDOMResources();
      const elCount = document.getElementById('metric-horses-count');
      if (elCount) elCount.innerText = livestockMap.horses.count.toString();
      for (let i = 0; i < 2; i++) spawnVisualLivestock('horse', 330 + Math.random() * 150, 1100 + Math.random() * 100);
    } else {
      sfx.playAlert();
    }
  });

  // 3. Forestry & Brick Handlers
  document.getElementById('btn-action-harvest')?.addEventListener('click', () => {
    resources.timber += 40;
    resources.food += 10;
    sfx.playAction(320);
    updateDOMResources();
  });

  document.getElementById('btn-action-replant')?.addEventListener('click', () => {
    if (resources.gold >= 10) {
      resources.gold -= 10;
      resources.loyalty = Math.min(100, resources.loyalty + 2);
      sfx.playAction(550);
      updateDOMResources();
    }
  });

  document.getElementById('btn-action-brick')?.addEventListener('click', () => {
    if (resources.timber >= 20) {
      resources.timber -= 20;
      resources.bricks += 25;
      sfx.playAction(400);
      updateDOMResources();
    } else {
      sfx.playAlert();
    }
  });

  document.getElementById('btn-action-burn')?.addEventListener('click', () => {
    if (resources.timber >= 20) {
      resources.timber -= 20;
      resources.loyalty = Math.min(100, resources.loyalty + 3);
      sfx.playAction(280);
      updateDOMResources();
    }
  });

  // 4. King Regicide & Hospital Rescue Handlers
  document.getElementById('btn-test-attack')?.addEventListener('click', () => {
    sfx.playAlert();
    king.healthPercent = Math.max(0, king.healthPercent - 20);
    king.isUnderAttack = true;
    updateDOMKing();
  });

  document.getElementById('btn-hospital-boost')?.addEventListener('click', () => {
    sfx.playHeal();
    king.healthPercent = Math.min(100, king.healthPercent + 35); // +35% Health Recovery Boost [Section 5.4]
    king.isUnderAttack = false;
    king.isRescued = true;
    updateDOMKing();
  });

  // 5. Market Ticker Selling Handlers
  document.getElementById('btn-sell-timber')?.addEventListener('click', () => {
    if (resources.timber >= 20) {
      resources.timber -= 20;
      resources.gold += Math.round(20 * 15 * 1.4);
      sfx.playBuy();
      updateDOMResources();
    }
  });

  document.getElementById('btn-sell-food')?.addEventListener('click', () => {
    if (resources.food >= 50) {
      resources.food -= 50;
      resources.gold += Math.round(50 * 10 * 2.2);
      sfx.playBuy();
      updateDOMResources();
    }
  });

  document.getElementById('btn-sell-water')?.addEventListener('click', () => {
    resources.gold += Math.round(35 * 1.8);
    sfx.playBuy();
    updateDOMResources();
  });

  // --- MAIN WEBGPU TICKER LOOP ---
  let timerAccumulator = 0;
  let fpsAccumulator = 0;
  let frameCount = 0;

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
      if (camera.x < 1300) {
        elHudBiome.innerText = 'LUSH GREENERY ZONE (740 km²)';
      } else if (camera.x < 2200) {
        elHudBiome.innerText = 'PETROLEUM SUMP WASTELAND (1,200 km²)';
      } else {
        elHudBiome.innerText = 'DELTA BASIN & WATER ARTERIES (950 km²)';
      }
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

    // C. Roaming Livestock Vectors
    for (const herd of activeHerdVisuals) {
      herd.angle += (Math.random() - 0.5) * 0.1;
      herd.graphic.x += Math.cos(herd.angle) * herd.speed * delta;
      herd.graphic.y += Math.sin(herd.angle) * herd.speed * delta;

      // Keep within home radius
      const dist = Math.hypot(herd.graphic.x - herd.baseX, herd.graphic.y - herd.baseY);
      if (dist > 70) {
        herd.angle = Math.atan2(herd.baseY - herd.graphic.y, herd.baseX - herd.graphic.x);
      }
    }

    // D. 1-Second Timer Tick for Livestock Doubling Loops
    timerAccumulator += ticker.deltaMS;
    if (timerAccumulator >= 1000) {
      timerAccumulator = 0;

      // Decrement timers
      livestockMap.goats.nextDoublingSeconds = Math.max(0, livestockMap.goats.nextDoublingSeconds - 1);
      livestockMap.cows.nextDoublingSeconds = Math.max(0, livestockMap.cows.nextDoublingSeconds - 1);
      livestockMap.horses.nextDoublingSeconds = Math.max(0, livestockMap.horses.nextDoublingSeconds - 1);

      // Automated Doubling Checks (Section 3.1)
      if (livestockMap.goats.nextDoublingSeconds === 0) {
        livestockMap.goats.count *= 2;
        livestockMap.goats.nextDoublingSeconds = 600;
        resources.food += 150;
        sfx.playBuy();
        updateDOMResources();
      }

      if (livestockMap.cows.nextDoublingSeconds === 0) {
        livestockMap.cows.count *= 2;
        livestockMap.cows.nextDoublingSeconds = 900;
        resources.food += 300;
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
