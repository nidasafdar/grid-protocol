// src/main.ts
import './style.css';
import { Application, Graphics, Container, Text } from 'pixi.js';
import type { Mission, GamePhase } from './interfaces/GameTypes';

// --- Web Audio SFX Synthesizer (Zero-dependency Audio Engine) ---
class SoundEngine {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playType() {
    this.initCtx();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(800 + Math.random() * 400, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  playSuccess() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);
      gain.gain.setValueAtTime(0.08, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.35);
    });
  }

  playAction() {
    this.initCtx();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }
}

const sfx = new SoundEngine();

(async () => {
  // 1. Initialize PixiJS Engine
  const app = new Application();
  await app.init({
    width: 960,
    height: 540,
    backgroundColor: 0x05070f,
    preference: 'webgpu'
  });

  const appContainer = document.getElementById('app') || document.body;
  appContainer.appendChild(app.canvas);

  // 2. Mission 1 Rulebook Specs
  const mission1: Mission = {
    id: 1,
    title: 'SQUEEZED COMPOUND INFRASTRUCTURE BREACH',
    instructions: 'Navigate past localized check barriers. Retrieve the classified briefcase telemetry.',
    timeLimit: 180,
    targetScore: 1
  };

  let phase: GamePhase = 'BRIEFING';
  let timeRemaining = mission1.timeLimit;

  // --- 3. ENVIRONMENTAL MATRIX WALLS ---
  const environmentGroup = new Container();
  app.stage.addChild(environmentGroup);

  // Background subtle grid lines
  const gridLines = new Graphics();
  for (let x = 240; x <= 720; x += 40) {
    gridLines.moveTo(x, 0).lineTo(x, 500).stroke({ width: 1, color: 0x111c2e, alpha: 0.5 });
  }
  for (let y = 0; y <= 500; y += 40) {
    gridLines.moveTo(240, y).lineTo(720, y).stroke({ width: 1, color: 0x111c2e, alpha: 0.5 });
  }
  environmentGroup.addChild(gridLines);

  // Left & Right facility building barriers
  const leftBuilding = new Graphics().rect(0, 0, 230, 540).fill({ color: 0x0a0f1d }).stroke({ width: 2, color: 0x1e293b });
  const rightBuilding = new Graphics().rect(730, 0, 230, 540).fill({ color: 0x0a0f1d }).stroke({ width: 2, color: 0x1e293b });
  const baseFloor = new Graphics().rect(0, 500, 960, 40).fill({ color: 0x02040a }).stroke({ width: 1, color: 0x1e293b });
  environmentGroup.addChild(leftBuilding, rightBuilding, baseFloor);

  // Boundary warning text
  const leftWarning = new Text({
    text: 'RESTRICTED PERIMETER\nSURVEILLANCE ACTIVE',
    style: { fontFamily: 'Courier New', fontSize: 11, fill: 0x475569, align: 'center' }
  });
  leftWarning.x = 115; leftWarning.y = 260; leftWarning.anchor.set(0.5);
  environmentGroup.addChild(leftWarning);

  const rightWarning = new Text({
    text: 'AUTHORIZED AGENTS ONLY\nBIO-SCAN ENFORCED',
    style: { fontFamily: 'Courier New', fontSize: 11, fill: 0x475569, align: 'center' }
  });
  rightWarning.x = 845; rightWarning.y = 260; rightWarning.anchor.set(0.5);
  environmentGroup.addChild(rightWarning);

  // --- 4. PROCEDURAL HERO OPERATIVE DRONE ---
  const heroDrone = new Graphics()
    .circle(0, 0, 16)
    .fill({ color: 0x00ffcc, alpha: 0.25 })
    .stroke({ width: 3, color: 0x00ffcc })
    .circle(0, 0, 6)
    .fill({ color: 0x00ffcc });

  heroDrone.x = 290;
  heroDrone.y = 440;
  app.stage.addChild(heroDrone);

  // --- 5. TARGET CLASSIFIED BRIEFCASE ---
  const briefcaseNode = new Graphics()
    .rect(-16, -10, 32, 20)
    .fill({ color: 0xf59e0b })
    .stroke({ width: 2, color: 0xffffff })
    .rect(-4, -13, 8, 4)
    .stroke({ width: 2, color: 0xffffff });

  briefcaseNode.x = 670;
  briefcaseNode.y = 440;
  app.stage.addChild(briefcaseNode);

  // --- 6. TOP HUD TELEMETRY BAR ---
  const hudContainer = new Container();
  const hudBacking = new Graphics().rect(235, 10, 490, 48).fill({ color: 0x090e1a, alpha: 0.85 }).stroke({ width: 1, color: 0x1e293b });
  const hudText = new Text({
    text: '',
    style: { fontFamily: 'Courier New', fontSize: 12, fill: 0x00ffcc }
  });
  hudText.x = 248; hudText.y = 16;
  hudContainer.addChild(hudBacking, hudText);
  app.stage.addChild(hudContainer);

  // --- 7. BRIEFING OVERLAY (Phase 2 Typing Terminal) ---
  const briefingOverlay = new Container();
  app.stage.addChild(briefingOverlay);

  const briefingBackdrop = new Graphics().rect(0, 0, 960, 540).fill({ color: 0x000000, alpha: 0.88 });
  const briefingBox = new Graphics().rect(180, 110, 600, 320).fill({ color: 0x070b14 }).stroke({ width: 2, color: 0x00ffcc });
  const briefingTitle = new Text({
    text: '[ PROTOCOL TERMINAL: MISSION DISPATCH ]',
    style: { fontFamily: 'Courier New', fontSize: 14, fill: 0x00ffcc, fontWeight: 'bold' }
  });
  briefingTitle.x = 210; briefingTitle.y = 130;

  const dialogueDisplay = new Text({
    text: '',
    style: { fontFamily: 'Courier New', fontSize: 13, fill: 0x94a3b8, wordWrap: true, wordWrapWidth: 540 }
  });
  dialogueDisplay.x = 210; dialogueDisplay.y = 165;

  briefingOverlay.addChild(briefingBackdrop, briefingBox, briefingTitle, dialogueDisplay);

  const fullPromptText =
    `TARGET SECTOR: COMPOUND 01\n` +
    `SECURITY THREAT: TIGHT CORRIDOR SURVEILLANCE\n\n` +
    `OBJECTIVE: ${mission1.title}\n` +
    `${mission1.instructions}\n\n` +
    `CONTROLS: Use [Arrow Keys] or [W, A, S, D] to maneuver operative drone.`;

  let charIndex = 0;
  let textTicker = 0;

  // --- 8. SUIT INVENTORY CONSOLE (Phase 3 Tactical HUD) ---
  const suitConsoleContainer = new Container();
  suitConsoleContainer.visible = false;
  app.stage.addChild(suitConsoleContainer);

  const invBackdrop = new Graphics().rect(0, 0, 960, 540).fill({ color: 0x000000, alpha: 0.85 });
  const consoleBox = new Graphics().rect(260, 90, 440, 360).fill({ color: 0x050914 }).stroke({ width: 2, color: 0xf59e0b });

  const consoleTitle = new Text({
    text: '--- SUIT LINK HUD: ITEM EXTRACTION ---',
    style: { fontFamily: 'Courier New', fontSize: 15, fill: 0xf59e0b, fontWeight: 'bold' }
  });
  consoleTitle.x = 480; consoleTitle.y = 120; consoleTitle.anchor.set(0.5);

  const consoleSubtitle = new Text({
    text: 'BRIEFCASE REQUIRES AGENT CIPHER KEYCARD',
    style: { fontFamily: 'Courier New', fontSize: 12, fill: 0x94a3b8 }
  });
  consoleSubtitle.x = 480; consoleSubtitle.y = 150; consoleSubtitle.anchor.set(0.5);

  // Left Pocket Button
  const leftPocketButton = new Graphics().rect(300, 210, 360, 56).fill({ color: 0x131d35 }).stroke({ width: 2, color: 0xf59e0b });
  leftPocketButton.eventMode = 'static';
  leftPocketButton.cursor = 'pointer';

  const buttonLabel = new Text({
    text: '[ EXTRACT LEFT POCKET KEYCARD ]',
    style: { fontFamily: 'Courier New', fontSize: 14, fill: 0xf59e0b, fontWeight: 'bold' }
  });
  buttonLabel.x = 480; buttonLabel.y = 238; buttonLabel.anchor.set(0.5);

  leftPocketButton.on('pointerover', () => {
    buttonLabel.style.fill = 0x00ffcc;
    leftPocketButton.tint = 0x1e293b;
  });
  leftPocketButton.on('pointerout', () => {
    buttonLabel.style.fill = 0xf59e0b;
    leftPocketButton.tint = 0xffffff;
  });

  suitConsoleContainer.addChild(invBackdrop, consoleBox, consoleTitle, consoleSubtitle, leftPocketButton, buttonLabel);

  // --- 9. INPUT HANDLING ---
  const activeKeys: Record<string, boolean> = {};
  window.addEventListener('keydown', (e) => {
    activeKeys[e.key] = true;
    activeKeys[e.code] = true;
  });
  window.addEventListener('keyup', (e) => {
    activeKeys[e.key] = false;
    activeKeys[e.code] = false;
  });

  // Left pocket click handler
  leftPocketButton.once('pointerdown', () => {
    sfx.playSuccess();
    suitConsoleContainer.visible = false;
    briefcaseNode.visible = false;
    phase = 'MISSION_CLEAR';

    const clearBanner = new Container();
    const bannerBox = new Graphics().rect(220, 160, 520, 220).fill({ color: 0x030712, alpha: 0.95 }).stroke({ width: 2, color: 0x00ffcc });
    const clearTitle = new Text({
      text: 'MISSION 01 COMPLETED\n\nKEYCARD VERIFIED OUT OF SUIT POCKET\nCLASSIFIED RECORD SECURED',
      style: { fontFamily: 'Courier New', fontSize: 18, fill: 0x00ffcc, align: 'center', fontWeight: 'bold' }
    });
    clearTitle.x = 480; clearTitle.y = 250; clearTitle.anchor.set(0.5);
    clearBanner.addChild(bannerBox, clearTitle);
    app.stage.addChild(clearBanner);
  });

  // --- 10. MAIN GAME LOOP ---
  let pulseTimer = 0;

  app.ticker.add((ticker) => {
    pulseTimer += ticker.deltaMS * 0.003;

    // A. Briefing Typing Phase
    if (phase === 'BRIEFING') {
      textTicker += ticker.deltaMS;
      if (textTicker >= 20 && charIndex < fullPromptText.length) {
        dialogueDisplay.text += fullPromptText[charIndex];
        if (charIndex % 3 === 0) sfx.playType();
        charIndex++;
        textTicker = 0;
      }

      if (charIndex >= fullPromptText.length) {
        dialogueDisplay.text = fullPromptText + '\n\n>>> PRESS [SPACEBAR] TO DEPLOY OPERATIVE <<<';
        if (activeKeys[' '] || activeKeys['Space']) {
          sfx.playAction();
          briefingOverlay.visible = false;
          phase = 'PLAYING';
        }
      }
      return;
    }

    // B. Inventory Active Phase (Pause drone movement)
    if (phase === 'INVENTORY' || phase === 'MISSION_CLEAR') return;

    // C. Playing Phase
    const stepVelocity = 5 * ticker.deltaTime;

    if (activeKeys['ArrowLeft'] || activeKeys['KeyA'] || activeKeys['a']) heroDrone.x -= stepVelocity;
    if (activeKeys['ArrowRight'] || activeKeys['KeyD'] || activeKeys['d']) heroDrone.x += stepVelocity;
    if (activeKeys['ArrowUp'] || activeKeys['KeyW'] || activeKeys['w']) heroDrone.y -= stepVelocity;
    if (activeKeys['ArrowDown'] || activeKeys['KeyS'] || activeKeys['s']) heroDrone.y += stepVelocity;

    // Enforce corridor movement boundaries
    if (heroDrone.x < 250) heroDrone.x = 250;
    if (heroDrone.x > 710) heroDrone.x = 710;
    if (heroDrone.y < 40) heroDrone.y = 40;
    if (heroDrone.y > 480) heroDrone.y = 480;

    // Briefcase pulse animation
    briefcaseNode.scale.set(1 + Math.sin(pulseTimer) * 0.05);

    // Timer countdown
    timeRemaining = Math.max(0, timeRemaining - ticker.deltaMS / 1000);
    hudText.text =
      `GRID TELEMETRY // STATUS: ACTIVE // CHRONO: ${Math.ceil(timeRemaining)}s\n` +
      `CORRIDOR: SECTOR-01 // COORD: [${Math.round(heroDrone.x)}, ${Math.round(heroDrone.y)}]`;

    // Proximity trigger to Briefcase
    const distance = Math.hypot(heroDrone.x - briefcaseNode.x, heroDrone.y - briefcaseNode.y);
    if (distance < 36 && briefcaseNode.visible) {
      sfx.playAction();
      phase = 'INVENTORY';
      suitConsoleContainer.visible = true;
    }
  });
})();
