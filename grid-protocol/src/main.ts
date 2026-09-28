// src/main.ts
import { Application, Graphics, Container, Text } from 'pixi.js';

export interface Mission {
  id: number;
  title: string;
  instructions: string;
  timeLimit: number;
  targetScore: number;
}

(async () => {
  // Initialize the low-level WebGPU engine canvas smoothly [2.4]
  const app = new Application();
  await app.init({
    width: 960,
    height: 540,
    backgroundColor: 0x05070f,
    preference: 'webgpu'
  });
  document.body.appendChild(app.canvas);

  const mission1: Mission = {
    id: 1,
    title: "SQUEEZED COMPOUND INFRASTRUCTURE BREACH",
    instructions: "Navigate past localized check barriers. Retrieve the target classified briefcase files.",
    timeLimit: 180,
    targetScore: 1
  };

  // System Core Flags
  let isGameRunning = false;
  let timeRemaining = mission1.timeLimit;
  let isInventoryPhaseActive = false; // Tracks if suit interface is visible

  // --- 1. BUILD ENVIRONMENTAL MATRIX WALLS ("SANDWICHED IN-BETWEEN THINGS") ---
  const environmentGroup = new Container();
  app.stage.addChild(environmentGroup);

  // Left towering facility building block
  const leftBuilding = new Graphics().rect(0, 0, 220, 540).fill({ color: 0x0e131f }).stroke({ width: 2, color: 0x1e293b });
  // Right facility building block squeezing the open pathway tight
  const rightBuilding = new Graphics().rect(740, 0, 220, 540).fill({ color: 0x0e131f }).stroke({ width: 2, color: 0x1e293b });
  // Floor boundary plate
  const baseFloor = new Graphics().rect(0, 500, 960, 40).fill({ color: 0x02040a });

  environmentGroup.addChild(leftBuilding, rightBuilding, baseFloor);

  // --- 2. PROCEDURAL HERO VECTOR OBJECT ---
  const heroDrone = new Graphics()
    .circle(0, 0, 18)
    .fill({ color: 0x00ffcc, alpha: 0.25 })
    .stroke({ width: 3, color: 0x00ffcc });

  heroDrone.x = 280; // Start inside the open corridor path
  heroDrone.y = 450;
  app.stage.addChild(heroDrone);

  // TARGET CLASSIFIED BRIEFCASE OBJECT
  const briefcaseNode = new Graphics()
    .rect(-16, -10, 32, 20)
    .fill({ color: 0xf59e0b })
    .stroke({ width: 2, color: 0xffffff });

  briefcaseNode.x = 680; // Hidden near the right structural building entry boundary line
  briefcaseNode.y = 450;
  app.stage.addChild(briefcaseNode);

  // Dynamic HUD readout panel text placement
  const hudText = new Text({
    text: ``,
    style: { fontFamily: 'Courier New', fontSize: 13, fill: 0x00ffcc }
  });
  hudText.x = 240;
  hudText.y = 25;
  app.stage.addChild(hudText);

  // --- 3. THE INTERACTIVE BRIEFCASE DIALOGUE PANEL CONTAINER ---
  const briefingOverlay = new Container();
  app.stage.addChild(briefingOverlay);

  const backdropShield = new Graphics().rect(0, 0, 960, 540).fill({ color: 0x000000, alpha: 0.85 });
  briefingOverlay.addChild(backdropShield);

  const panelBox = new Graphics().rect(180, 120, 600, 300).fill({ color: 0x090d16 }).stroke({ width: 2, color: 0x00ffcc });
  briefingOverlay.addChild(panelBox);

  const dialogueDisplay = new Text({
    text: '',
    style: { fontFamily: 'Courier New', fontSize: 15, fill: 0x00ffcc, wordWrap: true, wordWrapWidth: 540 }
  });
  dialogueDisplay.x = 210;
  dialogueDisplay.y = 150;
  briefingOverlay.addChild(dialogueDisplay);

  const fullTextString = `[ INTERFACE INCOMING BRIEFING ]\n\nMISSION 01: ${mission1.title}\n\nINSTRUCTIONS: ${mission1.instructions}`;
  let characterPointer = 0;
  let textTimeCounter = 0;

  // --- 4. THE INTERACTIVE LEFT POCKET INVENTORY INTERFACE CONSOLE ---
  const suitConsoleContainer = new Container();
  suitConsoleContainer.visible = false;
  app.stage.addChild(suitConsoleContainer);

  // Dark screen overlay for inventory focus state
  const inventoryShading = new Graphics().rect(0, 0, 960, 540).fill({ color: 0x000000, alpha: 0.8 });
  const consoleBox = new Graphics().rect(280, 100, 400, 340).fill({ color: 0x060914 }).stroke({ width: 2, color: 0xf59e0b });
  suitConsoleContainer.addChild(inventoryShading, consoleBox);

  const consoleTitle = new Text({
    text: "--- SUIT LINK SATELLITE HUD ---",
    style: { fontFamily: 'Courier New', fontSize: 16, fill: '#ffffff' }
  });
  consoleTitle.x = 480; consoleTitle.y = 130; consoleTitle.anchor.set(0.5);
  suitConsoleContainer.addChild(consoleTitle);

  // Interactive Left Pocket Click Button Block Frame
  const leftPocketButton = new Graphics().rect(330, 240, 300, 50).fill({ color: 0x1e1b4b }).stroke({ width: 1, color: 0xf59e0b });
  leftPocketButton.interactive = true;
  leftPocketButton.cursor = 'pointer';
  suitConsoleContainer.addChild(leftPocketButton);

  const buttonLabel = new Text({
    text: "[ EXTRACT LEFT POCKET KEYCARD ]",
    style: { fontFamily: 'Courier New', fontSize: 14, fill: 0xf59e0b }
  });
  buttonLabel.x = 480; buttonLabel.y = 265; buttonLabel.anchor.set(0.5);
  suitConsoleContainer.addChild(buttonLabel);

  // Interactive button hover styling triggers
  leftPocketButton.on('pointerover', () => buttonLabel.style.fill = '#00ffcc');
  leftPocketButton.on('pointerout', () => buttonLabel.style.fill = '#f59e0b');

  // 5. Keyboard Input States Mapping
  const activeControlKeys: { [key: string]: boolean } = {};
  window.addEventListener('keydown', (e) => activeControlKeys[e.key] = true);
  window.addEventListener('keyup', (e) => activeControlKeys[e.key] = false);

  // 6. HIGH PERFORMANCE GPU TICKER RENDERING TIMELINE LOOP [2.4]
  app.ticker.add((ticker) => {
    // Dialogue sequence update ticks
    if (!isGameRunning && !isInventoryPhaseActive) {
      textTimeCounter += ticker.deltaMS;
      if (textTimeCounter >= 25 && characterPointer < fullTextString.length) {
        dialogueDisplay.text += fullTextString[characterPointer];
        characterPointer++;
        textTimeCounter = 0;
      }
      if (characterPointer >= fullTextString.length) {
        dialogueDisplay.text = fullTextString + `\n\n\n[ TAP 'SPACEBAR' TO INITIALIZE OPERATIONS ]`;
        if (activeControlKeys[' ']) {
          briefingOverlay.visible = false;
          isGameRunning = true;
        }
      }
      return;
    }

    // Halt timeline frame iterations if user is actively browsing their pocket inventory module grid
    if (isInventoryPhaseActive) return;

    // Player multi-directional vector flight controls
    const stepVelocity = 5 * ticker.deltaTime;
    if (activeControlKeys['ArrowLeft']) heroDrone.x -= stepVelocity;
    if (activeControlKeys['ArrowRight']) heroDrone.x += stepVelocity;
    if (activeControlKeys['ArrowUp']) heroDrone.y -= stepVelocity;
    if (activeControlKeys['ArrowDown']) heroDrone.y += stepVelocity;

    // Keep drone contained inside our narrow, squeezed air-corridor path coordinates layout boundaries
    if (heroDrone.x < 240) heroDrone.x = 240;
    if (heroDrone.x > 720) heroDrone.x = 720;
    if (heroDrone.y > 480) heroDrone.y = 480;
    if (heroDrone.y < 20) heroDrone.y = 20;

    timeRemaining -= ticker.deltaMS / 1000;
    hudText.text = `OPERATIVE RADAR TELEMETRY\nCHRONO TIME LIMIT: ${Math.ceil(timeRemaining)}s\nSECTOR SCAN STATUS: SQUEEZED IN-BETWEEN DEFENSE BUILDINGS`;

    // Proximity contact detection between drone and amber briefcase item block
    const distanceDelta = Math.hypot(heroDrone.x - briefcaseNode.x, heroDrone.y - briefcaseNode.y);

    if (distanceDelta < 32 && briefcaseNode.visible) {
      // Trigger the unique interactive suit inventory console screen phase!
      isGameRunning = false;
      isInventoryPhaseActive = true;
      suitConsoleContainer.visible = true;

      // Clicking the Left Pocket button fires final data decryption logs and wraps up the level metrics rules
      leftPocketButton.once('pointerdown', () => {
        suitConsoleContainer.visible = false;
        briefcaseNode.visible = false;
        isInventoryPhaseActive = false;
        this.sound.play('sfx_boom', { volume: 0.6 });

        const clearTitle = new Text({
          text: 'KEYCARD VERIFIED OUT OF SUIT LEFT POCKET\nCLASSIFIED RECORD SECURED SUCCESSFULLY\n\nMISSION 1 CLEAR',
          style: { fontFamily: 'Courier New', fontSize: 22, fill: 0x00ffcc, align: 'center', fontWeight: 'bold' }
        });
        clearTitle.x = 480; clearTitle.y = 270;
        clearTitle.anchor.set(0.5);
        app.stage.addChild(clearTitle);
      });
    }
  });
})();
