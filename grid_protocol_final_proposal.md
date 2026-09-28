# 👑 MASTER PRODUCTION SYSTEM SPECIFICATION: GRID PROTOCOL
Enterprise Game Design Document & Engineering Blueprint  
Core Graphics Pipeline: PixiJS v8 Native Low-Level WebGPU Engine [2.4]  
Architecture: Decoupled HTML5 UI Layer + Split-Screen Hardware Matrix  
Match Scale Scope: 11,000 km² Living Eco-System [2.4]  

------------------------------

## SECTION 1: ARCHITECTURAL ENGINE SPECIFICATIONS

```
========================================================================================
                                 [ SYSTEM ARCHITECTURE ]
========================================================================================
[ LEFT PANING SCREEN (70%): WEBGPU BLAS FIRING ]   [ RIGHT CONTROL SIDEBAR (30%): HTML5 DOM ]
 - Hardware Instanced Sprites (Goats/Knights)       - Microtransaction Layout Shop Panel
 - Multi-Layer Parallax Cloud Canvas Shading        - Real-Time Supply-and-Demand Tickers
 - Algorithmic Vector Boundary Clamping             - Direct Drag and Drop Interactivity API
========================================================================================
```

### 1.1 WebGPU Hardware Acceleration Pipeline
To ensure the absolute stability of a simulation tracking thousands of rendering assets (livestock, soldiers, buildings, particle systems) across an 11,000 square kilometre virtual board, the engine completely bypasses old, high-overhead canvas rendering contexts [2.4]. By initializing the modern WebGPU graphics API backend, the game engine communicates directly with the user's graphics hardware [2.4].

* **Hardware Instanced Rendering**: Rather than forcing the CPU to issue thousands of separate draw commands for every goat or enemy knight on screen—which would instantly cause the browser to stutter and freeze—WebGPU passes a single master vector graphic model of the asset into the GPU's memory cache [2.4]. The engine then streams a lightweight matrix array of raw coordinate vectors [2.4]. The GPU draws tens of thousands of active moving units in a single, lightning-fast rendering pass, maintaining a locked 60+ FPS performance ceiling [2.4].
* **Camera Visibility Culling Filters**: To protect computer memory, any resource node, tree sprout, worker, or enemy fortress block that moves outside the boundaries of the active monitor viewport has its drawing tasks automatically turned off by the engine loop [2.4]. It exists only as a few bytes of lightweight background math data until the camera scrolls back over its coordinates, completely preventing lag.

### 1.2 The Split-Screen Strategy Interface Design
The user interface avoids the common game design pitfall of drawing interactive menus, texts, and shop cards inside the graphic execution layer.

* **The Left Panel (70% Viewport View)**: A high-fidelity, interactive, WebGPU-accelerated vector canvas mapping out the living, breathing landscape [2.4]. This zone is fully scrollable using keyboard arrow mechanics.
* **The Right Panel (30% Control Sidebar)**: Built entirely out of native HTML5, CSS3 Grid, and the HTML5 Drag-and-Drop API. Running on the browser's standard layout layer keeps button clicks, scrolling market listings, and text reading completely separate from the heavy graphics card pipeline. This makes your dashboard incredibly responsive and ultra-fast.

------------------------------

## SECTION 2: THE 11,000 km² MACRO-GEOGRAPHY BIOME ECOSYSTEM
The map is split into three massive, geographically isolated environmental resource regions. No single sector contains all raw materials; this forces players and AI factions to actively communicate, coordinate, and trade surpluses across long distances.

### 2.1 The Lush Greenery Zone (Parrot Green & Blue Regions)
* **Environmental Makeup**: Dense pixel-art jungle canopies, wide-open grasslands, flowing river arrays, and wild medicinal herb patches.
* **Primary Resources Yielded**: Abundant Timber Wood, organic foods, spun Cotton Fibres, and health-restoring Medicinal Herbs.
* **Strategic Limitation**: Zero natural oil reserves.

### 2.2 The Petroleum Sump Wasteland (Gray & Black Regions)
* **Environmental Makeup**: Barren, rocky tar basins, sand dunes, and bubbling pools of crude pitch.
* **Primary Resources Yielded**: High-value Black Crude Oil and heavy iron ore mineral veins deep beneath the desert surface.
* **Strategic Limitation**: Barren soil—vegetation cannot grow, and livestock will starve to death here unless food is imported.

### 2.3 The Delta Basin & Water Arteries (Maroon & Red Regions)
* **Environmental Makeup**: Extensive systems of natural lakes, deep valleys, and rushing river streams.
* **Primary Resources Yielded**: Total control of Fresh Water Usage. This biome acts as the master agricultural valve of the global map where resource River Dams are engineered.
* **Strategic Limitation**: High vulnerability to cross-border raiding due to open valley pathways.

------------------------------

## SECTION 3: THE LIVING SIDE-MARKET ECONOMY & REPLICATING ASSETS
The right-side control dashboard holds an interactive marketplace where every asset you buy is a living, changing part of your economy.

```
       [ 🪵 THE PASSIVE REVENUE ENGINE ]
  [ Chop Forest Trees ] ➔ [ Pile Raw Timber Logs ] ➔ [ Furnace Combustion / Burn ]
                                                          │
          ┌───────────────────────────────────────────────┴───────────────────────────────┐
          ▼                                                                               ▼
[ STRUCTURAL BRICK HOUSING ]                                                    [ DYNAMIC INFLATION SELLING ]
- Upgrades Nomad Canvas Tents                                                   - Explodes gold counters up to 500%
- Protects livestock from Winter                                                - Bankrupts neighboring empire cash
```

### 3.1 The Living Livestock Replication Array
* **The Shepherd's Flock (Goats & Sheep)**: Low gold cost to purchase from the sidebar menu. They graze on open green grass tiles and run on a strict, automated 10-minute exponential doubling script [2.4]:
  * 00:00 Mins: 10 Goats placed down.
  * 10:00 Mins: 20 Goats (Doubled) [2.4].
  * 20:00 Mins: 40 Goats (Doubled) [2.4].
  * 30:00 Mins: 80 Goats (Doubled) [2.4]!
  * **Yield**: Generates passive wool and meat wealth to keep your growing family lines fed and clothed.
* **The Pastoral Pasture (Cows & Cattle)**: Medium gold cost. They use a 15-minute real-world doubling multiplier. They consume twice the grazing space of goats but yield premium thick hides (leather for heavy armor forging) and massive food reserves that accelerate your population's health metrics.
* **The Equestrian Stables (War Horses)**: High gold cost. Multiplies every 20 minutes. They yield zero food or gold income, but owning them is mandatory to upgrade your young men into elite light-cavalry units and high-speed Talwar Strike Squads on the macro war map.

### 3.2 The Forestry & Lumber Engine
* **The Timber Loop**: Your workers travel to forest tiles on the map to chop down trees, gathering raw logs into your inventory.
* **The Replanting Cycle**: If you clear-cut a forest blindly to make quick money, the soil degrades into a dry desert, destroying your cows' pastures. Your workers must manually spend seedlings from their inventory to plant new forests, creating a fully renewable, strategic ecological loop!
* **The Burn Option**: Logs can be actively burned as raw fuel. This is required to run your metallurgy smelting furnaces and keep your houses warm during the Deep Winter Freeze, preventing your babies from freezing to death.

### 3.3 The Dynamic Market Inflation Engine
Product prices fluctuate based on global supply and demand. If you hoard wood or food during a harsh winter, the global price spikes across the other factions. You can cut off your exports to a rival to drive up the price, then sell it at a 500% markup to completely bankrupt their treasury.

### 3.4 The Brick Era Industrial Layer
Once you gather enough capital, you unlock the Brick Era. Your workers bake raw river mud into hardened red bricks, allowing you to completely replace canvas tents with permanent brick homes, advanced smithies, and stone fortresses.

------------------------------

## SECTION 4: THE HUMAN GENERATIONAL LIFECYCLE ENGINE
Placing a New House from the side-list onto the map acts as a visual beacon that draws more people to your clan. Once inside your borders, every citizen follows a strict 3-Stage Aging Timeline mapped directly to the game years:

```
[ BUILD NEW HOUSE ] ➔ STAGE 1: CHILD (0-10 Mins)   ➔ Consumes Food Reserves // Zero Labor Output
                           │
                           ▼
                      STAGE 2: YOUNG MAN (10-25 Mins) ➔ Assign to Mines, Dam, Spies, or Combat Army
                           │
                           ▼
                      STAGE 3: OLD MAN (25-40 Mins)   ➔ Joins Bey Council // Unlocks Blueprints
                           │
                           ▼
                      [ NATURAL DEATH ] ➔ Leadership Inherited by Eldest Living Offspring
```

1. **Stage 1: The Child (0 to 10 Minutes)**: Consumes a portion of your food reserves but generates zero manual labor. They represent your future empire investment.
2. **Stage 2: The Young Man (10 to 25 Minutes)**: The child physically shifts into a powerful adult. You can assign them to harvest cotton, dig iron mines, operate the River Dam, train as specialized Spies, or draft them directly into the front-line army.
3. **Stage 3: The Old Man (25 to 40 Minutes)**: Warriors age into gray-haired wise men. They can no longer sprint into fast battles, but they sit on your Bey Council, unlocking rare technological blueprints and boosting global faction loyalty.
4. **Succession & Bloodlines**: At the 40-minute mark, the elder passes away naturally. If your main Chieftain leader dies, control of your Parrot Green empire transfers directly to his eldest young child, carrying your family legacy across generations.

------------------------------

## SECTION 5: GEOPOLITICAL FACTIONS & THE REGICIDE LAWS
The world map contains 6 to 9 distinct, abstract color-coded kingdoms. Wars are not won by destroying random farms. To completely collapse a rival faction, you must execute a precise tactical strike to assassinate their leader.

```
                  [ 🏰 THE CAPITAL CITADEL SECTOR ]
  
     [💂 Imperial Knights] ──► [🛡️ Inner Guard] ──► [👑 THE KING]
     (Heavy Armor Block)       (Shield Wall)         (Life Bar: 100%)
  ───────────────────────────────────────────────────────────────────
  [🚨 Outer Walls] ◄─── Defense Layers ───► [🏹 Elite Archers]
```

### 5.1 Faction Telemetry Metrics
* **Your Clan (Parrot Green)**: Starts with basic leather tents. Relies entirely on high-mobility horse-archers, exponential resource multipliers, and generational human planning.
* **The Northern Empire (Blue)**: Massive starting treasury and stone fortresses. Deploys heavily armored knights and slow, unbreakable shield-wall turtle defensive formations.
* **The Steppe Horde (Gray)**: Chaos-driven, hyper-aggressive nomadic raiders. Launches massive horse-cavalry swarm charges that trample fences, gates, and player barricades.
* **The Fallen Sultanate (Mahrooma / Maroon)**: A proud, ancient, but declining empire. Controls large capital cities backed by long-range stationary catapults and ballista defense arrays.
* **The Blood Dynasty (Red)**: Treacherous, highly jealous regional rivals. Relies heavily on stealth shadow ambushes, sudden nighttime raids, and poison-tipped weaponry to assassinate high-tier targets.
* **The Umbral Guild (Black)**: Secretive economic mercenaries. Focuses on setting up deep trade blockades, intercepting passing resource caravans, and triggering artificial food starvation cycles.

### 5.2 The King's Life Percentage Rule
Every King sits inside a heavily fortified Citadel at the center of his capital city, protected by lines of Imperial Knights and a dense Inner Shield Guard. Every King displays a visible 100% Life Bar on screen. If that percentage hits 0%, the King is dead, his crown shatters, and his entire territory color immediately falls and vanishes from the world map.

### 5.3 The Emergency Safe-Rescue Climax
If your capital city is breached and a hostile army surrounds your King, they will stand over him, slashing his health bar down second-by-second. If your reinforcing army or royal knights manage to wipe out the attackers and completely secure the throne room BEFORE the King's life percentage hits 0%, he is rescued.

### 5.4 The Hospital & Tactical Medical Facilities
When your armies return from an intensive border war, they enter your territory wounded and depleted. To restore your military and save a rescued leader, you must build specialized Hospitals and Medical Facilities from your side-list menu:
* **The Field Clinic Boost**: Once an endangered King is safely rescued by his people, routing him into a functioning medical facility automatically injects a 35% Health Recovery Boost, pulling him out of critical danger and stabilizing his life force line.
* **Army Medical Recovery**: Wounded soldier groups stationed inside your Hospital zone automatically heal their damage metrics and recover their unit numbers over time, preventing you from losing veteran high-tier troops permanently.

### 5.5 Tactical Weapon Progression & Shadow Espionage
* **The Small Knife**: Cheap, basic iron steel weapon. Equipped automatically to early workers so they can defend their cotton fields against wildlife or lone enemy scouts.
* **The Talwar (Curve Saber Sword)**: Mid-tier specialized weaponry. Gives your young warriors lethal, sweeping close-range damage modifiers, making your horse-archers deadly in sudden flank attacks.
* **Heavy Plated Armor Rigging**: High-tier metallurgy block. Wrapped around your young men and war-horses to shield them from incoming missile fire, drastically lowering mortality rates during long siege battles.
* **The Spy Network**: You can assign your smart young men to train as Spies. You send a spy into a rival's territory to secretly sneak into their compound at night and poison their cow pastures, set fire to their timber yards, or loosen the structural floodgates of their river dams, weakening their defenses from the inside before your main army even arrives.
* **The Tribal Loyalty & Rebellion Loop**: Your wise old men on the Bey Council monitor your decisions. If you force workers to harvest cotton in freezing winter weather without heating fuel, or if you let a Gray Horde raid pass by without fighting back, your tribe's Loyalty Percentage Bar drops. If loyalty hits 0%, a civil war breaks out inside your own Parrot Green borders, forcing you to resolve an internal coup while managing external enemies.

------------------------------

## 🌦️ SECTION 6: THE SLOW-LOOP CLIMATE ENGINE
Weather and terrain changes creep across the map over long hours, forcing you to constantly adapt your economic plans:
* **The Spring Rain Loop**: The soil turns highly fertile. Wild grass grows rapidly, and your workers' cotton harvesting speeds jump by a massive 50%.
* **The Deep Winter Freeze**: Creeps onto the map slowly every 30 minutes. The green grass dries up, and the river feeding your River Dam freezes solid, halting your water gold income. Your goats and cows will freeze and die unless you have baked Hardened Bricks and constructed thick brick houses to shelter them, forcing you to build grain and timber stockpiles during the summer months.

------------------------------

## 🎬 SECTION 7: CHRONOLOGICAL 4-PHASE PLAYTIME TIMELINE

### ⛺ Sequence 1: The Nomad Roots (Minutes 0 to 15)
You spawn as a single Parrot Green tent in the wild grass. You command your 4 starting citizens to fight the terrain, harvest grass and cotton, and spin basic clothes. You buy 10 Goats and 5 Cows from the side-list and watch them double every 10 and 15 minutes to build your food supply. Your first generation of babies are born. You maintain bodyguards around your vulnerable leader's tent and pay heavy resource tributes to the massive Blue and Maroon empires to buy time.

### 🏗️ Sequence 2: The Brick & Citadel Expansion (Minutes 15 to 45)
Your livestock multiplies into a massive herd, and your children hit their 10-minute aging mark, transforming into a powerful young workforce. You build Clay Kilns, manufacture bricks, and rebuild your town into a permanent brick fortress city. You build a massive River Dam to lock down an explosive gold stream and construct a thick Stone Citadel around your King, staffing it with heavily armed Imperial Knights for security.

### 🌋 Sequence 3: The Industrial Heist & Inflation (Minutes 45 to 90)
The 6 to 9 AI factions unleash massive wars against each other, burning down each other's fields and over-clearing their forests, creating a global resource famine. The Market Inflation Engine activates. You manipulate prices by hoarding wood and food, selling them to the Blue Empire and Gray Horde at a 500% markup. Simultaneously, you deploy Spies to infiltrate the Red Dynasty, secretly poisoning their cattle pastures and burning their timber yards from the shadows to weaken their operational strength.

### 👑 Sequence 4: The Ultimate Purification Strike (Minute 90+)
Global winter sets in, freezing open rivers and testing your brick-housing insulation fuel reserves. You open your forges, equip your workforce with sharp Talwars and Heavy Plated Armor, and march across the map. You don't waste time attacking small towns; your cavalry charges straight into the enemy capital cities. You close your River Dam gates completely, starving down-river enemies of water. Your heavy cavalry breaches the enemy capital Citadel, crashes into their Imperial Knights, smashes their Inner Shield Guard, and attacks their King to drop his 100% Life Bar to 0%—instantly collapsing their empire and painting the whole map a victorious, unified Parrot Green!
