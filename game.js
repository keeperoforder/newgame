const screens = {
  menu: document.getElementById("main-menu"),
  settings: document.getElementById("settings-screen"),
  quit: document.getElementById("quit-confirmation"),
  battle: document.getElementById("battle-screen"),
  victory: document.getElementById("victory-screen"),
  character: document.getElementById("character-screen"),
  inventory: document.getElementById("inventory-screen"),
  defeat: document.getElementById("defeat-screen"),
  wave2: document.getElementById("wave2-screen"),
  thanks: document.getElementById("thanks-screen"),
};

const equipmentSlots = [
  { id: "weapon", name: "Weapon", effect: "Damage", baseName: "Iron Sword", craftGold: 100, craft: { iron: 5 }, tier2Name: "Steel Sword", tier2Gold: 500, tier2: { steel: 10 }, stat: "damage",
    tierNames: ["Iron Sword", "Steel Sword", "Mithril Sword", "Obsidian Blade", "Runeblade", "Dragonblade", "Voidfang", "Astral Edge", "Celestial Blade", "Eternal Edge"] },
  { id: "helmet", name: "Helmet", effect: "HP / Defense", baseName: "Iron Helm", craftGold: 100, craft: { iron: 5, leather: 3 }, tier2Name: "Steel Helm", tier2Gold: 500, tier2: { steel: 10, leather: 5 }, stat: "defense",
    tierNames: ["Iron Helm", "Steel Helm", "Mithril Helm", "Obsidian Helm", "Runic Helm", "Dragon Helm", "Void Helm", "Astral Helm", "Celestial Helm", "Eternal Helm"] },
  { id: "armor", name: "Armor", effect: "HP / Defense", baseName: "Iron Armor", craftGold: 150, craft: { iron: 8, leather: 5 }, tier2Name: "Steel Armor", tier2Gold: 650, tier2: { steel: 12, leather: 8 }, stat: "defense",
    tierNames: ["Iron Armor", "Steel Armor", "Mithril Armor", "Obsidian Armor", "Runic Armor", "Dragon Armor", "Void Armor", "Astral Armor", "Celestial Armor", "Eternal Armor"] },
  { id: "gloves", name: "Gloves", effect: "Attack Speed", baseName: "Leather Gloves", craftGold: 120, craft: { leather: 6, wood: 2 }, tier2Name: "Steel Gauntlets", tier2Gold: 600, tier2: { steel: 10, leather: 6 }, stat: "attackSpeed",
    tierNames: ["Leather Gloves", "Steel Gauntlets", "Mithril Gauntlets", "Obsidian Gauntlets", "Runic Gauntlets", "Dragon Gauntlets", "Void Gauntlets", "Astral Gauntlets", "Celestial Gauntlets", "Eternal Gauntlets"] },
  { id: "boots", name: "Boots", effect: "Movement Speed / Dodge", baseName: "Traveler Boots", craftGold: 120, craft: { leather: 6, wood: 3 }, tier2Name: "Steel Boots", tier2Gold: 600, tier2: { steel: 10, leather: 6 }, stat: "dodge",
    tierNames: ["Traveler Boots", "Steel Boots", "Mithril Boots", "Obsidian Boots", "Runic Boots", "Dragon Boots", "Void Boots", "Astral Boots", "Celestial Boots", "Eternal Boots"] },
  { id: "ring", name: "Ring", effect: "Crit Chance / Crit Damage", baseName: "Copper Ring", craftGold: 200, craft: { iron: 8, magicDust: 2 }, tier2Name: "Steel Ring", tier2Gold: 800, tier2: { steel: 12, magicDust: 5 }, stat: "crit",
    tierNames: ["Copper Ring", "Steel Ring", "Mithril Ring", "Obsidian Ring", "Runic Ring", "Dragon Ring", "Void Ring", "Astral Ring", "Celestial Ring", "Eternal Ring"] },
  { id: "amulet", name: "Amulet", effect: "XP Gain / Gold Gain", baseName: "Apprentice Amulet", craftGold: 250, craft: { wood: 5, magicDust: 4 }, tier2Name: "Arcane Amulet", tier2Gold: 900, tier2: { steel: 6, magicDust: 8, rare: 1 }, stat: "gain",
    tierNames: ["Apprentice Amulet", "Arcane Amulet", "Mithril Amulet", "Obsidian Amulet", "Runic Amulet", "Dragon Amulet", "Void Amulet", "Astral Amulet", "Celestial Amulet", "Eternal Amulet"] },
];

const equipmentTiers = {
  1: { multiplier: 1.00, maxLevel: 5 },
  2: { multiplier: 1.35, maxLevel: 5 },
  3: { multiplier: 1.75, maxLevel: 5 },
  4: { multiplier: 2.20, maxLevel: 5 },
  5: { multiplier: 2.80, maxLevel: 5 },
  6: { multiplier: 3.50, maxLevel: 5 },
  7: { multiplier: 4.35, maxLevel: 5 },
  8: { multiplier: 5.35, maxLevel: 5 },
  9: { multiplier: 6.55, maxLevel: 5 },
  10: { multiplier: 8.00, maxLevel: 5 },
};

const monsterZoneForWave = (wave) => {
  const zone = zones.find((entry) => wave >= entry[1] && wave <= entry[2]);
  return zone ? zone[0] : "UNKNOWN";
};

const zones = [["SLIMES",1,10],["RATS",11,20],["GOBLINS",21,30],["UNDEAD",31,40],["BEASTS",41,50],["SPIDERS",51,60],["CORRUPTED",61,70],["ORCS",71,80],["DEMONS",81,90],["ANCIENT",91,100]];

const slimeWaves = [{"name":"Green Slime","maxHp":50,"damage":5,"attackSpeed":2000,"zone":"SLIMES","isBoss":false},{"name":"Blue Slime","maxHp":58,"damage":6,"attackSpeed":1992,"zone":"SLIMES","isBoss":false},{"name":"Red Slime","maxHp":67,"damage":7,"attackSpeed":1984,"zone":"SLIMES","isBoss":false},{"name":"Yellow Slime","maxHp":78,"damage":8,"attackSpeed":1976,"zone":"SLIMES","isBoss":false},{"name":"Purple Slime","maxHp":91,"damage":9,"attackSpeed":1968,"zone":"SLIMES","isBoss":false},{"name":"Crystal Slime","maxHp":105,"damage":11,"attackSpeed":1960,"zone":"SLIMES","isBoss":false},{"name":"Poison Slime","maxHp":122,"damage":12,"attackSpeed":1952,"zone":"SLIMES","isBoss":false},{"name":"Lightning Slime","maxHp":141,"damage":14,"attackSpeed":1944,"zone":"SLIMES","isBoss":false},{"name":"Shadow Slime","maxHp":164,"damage":16,"attackSpeed":1936,"zone":"SLIMES","isBoss":false},{"name":"King Slime","maxHp":295,"damage":30,"attackSpeed":1828,"zone":"SLIMES","isBoss":true},{"name":"Sewer Rat","maxHp":221,"damage":22,"attackSpeed":1920,"zone":"RATS","isBoss":false},{"name":"Dirty Rat","maxHp":234,"damage":23,"attackSpeed":1912,"zone":"RATS","isBoss":false},{"name":"Scrap Rat","maxHp":248,"damage":25,"attackSpeed":1904,"zone":"RATS","isBoss":false},{"name":"Plague Rat","maxHp":263,"damage":26,"attackSpeed":1896,"zone":"RATS","isBoss":false},{"name":"Armored Rat","maxHp":278,"damage":28,"attackSpeed":1888,"zone":"RATS","isBoss":false},{"name":"Tunnel Rat","maxHp":295,"damage":30,"attackSpeed":1880,"zone":"RATS","isBoss":false},{"name":"Toxic Rat","maxHp":313,"damage":31,"attackSpeed":1872,"zone":"RATS","isBoss":false},{"name":"Berserk Rat","maxHp":332,"damage":33,"attackSpeed":1864,"zone":"RATS","isBoss":false},{"name":"Rat Shaman","maxHp":352,"damage":35,"attackSpeed":1856,"zone":"RATS","isBoss":false},{"name":"Sewer Matriarch","maxHp":578,"damage":58,"attackSpeed":1748,"zone":"RATS","isBoss":true},{"name":"Goblin Scout","maxHp":395,"damage":40,"attackSpeed":1840,"zone":"GOBLINS","isBoss":false},{"name":"Goblin Cutthroat","maxHp":419,"damage":42,"attackSpeed":1832,"zone":"GOBLINS","isBoss":false},{"name":"Goblin Brute","maxHp":444,"damage":44,"attackSpeed":1824,"zone":"GOBLINS","isBoss":false},{"name":"Goblin Shielder","maxHp":470,"damage":47,"attackSpeed":1816,"zone":"GOBLINS","isBoss":false},{"name":"Goblin Archer","maxHp":499,"damage":50,"attackSpeed":1808,"zone":"GOBLINS","isBoss":false},{"name":"Goblin Shaman","maxHp":529,"damage":53,"attackSpeed":1800,"zone":"GOBLINS","isBoss":false},{"name":"Goblin Warrior","maxHp":560,"damage":56,"attackSpeed":1792,"zone":"GOBLINS","isBoss":false},{"name":"Goblin Berserker","maxHp":594,"damage":59,"attackSpeed":1784,"zone":"GOBLINS","isBoss":false},{"name":"Goblin Chief","maxHp":630,"damage":63,"attackSpeed":1776,"zone":"GOBLINS","isBoss":false},{"name":"Goblin Warlord","maxHp":1034,"damage":103,"attackSpeed":1668,"zone":"GOBLINS","isBoss":true},{"name":"Rotting Skeleton","maxHp":707,"damage":71,"attackSpeed":1760,"zone":"UNDEAD","isBoss":false},{"name":"Bone Warrior","maxHp":750,"damage":75,"attackSpeed":1752,"zone":"UNDEAD","isBoss":false},{"name":"Skeleton Archer","maxHp":795,"damage":80,"attackSpeed":1744,"zone":"UNDEAD","isBoss":false},{"name":"Armored Skeleton","maxHp":843,"damage":84,"attackSpeed":1736,"zone":"UNDEAD","isBoss":false},{"name":"Skeleton Knight","maxHp":893,"damage":89,"attackSpeed":1728,"zone":"UNDEAD","isBoss":false},{"name":"Grave Walker","maxHp":947,"damage":95,"attackSpeed":1720,"zone":"UNDEAD","isBoss":false},{"name":"Bone Reaper","maxHp":1003,"damage":100,"attackSpeed":1712,"zone":"UNDEAD","isBoss":false},{"name":"Undead Berserker","maxHp":1064,"damage":106,"attackSpeed":1704,"zone":"UNDEAD","isBoss":false},{"name":"Death Priest","maxHp":1127,"damage":113,"attackSpeed":1696,"zone":"UNDEAD","isBoss":false},{"name":"Grave Lord","maxHp":1852,"damage":185,"attackSpeed":1588,"zone":"UNDEAD","isBoss":true},{"name":"Wild Wolf","maxHp":1267,"damage":127,"attackSpeed":1680,"zone":"BEASTS","isBoss":false},{"name":"Dire Wolf","maxHp":1343,"damage":134,"attackSpeed":1672,"zone":"BEASTS","isBoss":false},{"name":"Feral Boar","maxHp":1423,"damage":142,"attackSpeed":1664,"zone":"BEASTS","isBoss":false},{"name":"Alpha Wolf","maxHp":1509,"damage":151,"attackSpeed":1656,"zone":"BEASTS","isBoss":false},{"name":"Cave Bear","maxHp":1599,"damage":160,"attackSpeed":1648,"zone":"BEASTS","isBoss":false},{"name":"Razorfang Wolf","maxHp":1695,"damage":170,"attackSpeed":1640,"zone":"BEASTS","isBoss":false},{"name":"Black Bear","maxHp":1797,"damage":180,"attackSpeed":1632,"zone":"BEASTS","isBoss":false},{"name":"Bloodfang Beast","maxHp":1905,"damage":191,"attackSpeed":1624,"zone":"BEASTS","isBoss":false},{"name":"Ancient Beast","maxHp":2019,"damage":202,"attackSpeed":1616,"zone":"BEASTS","isBoss":false},{"name":"Beast Alpha","maxHp":3317,"damage":332,"attackSpeed":1508,"zone":"BEASTS","isBoss":true},{"name":"Cave Spider","maxHp":2269,"damage":227,"attackSpeed":1600,"zone":"SPIDERS","isBoss":false},{"name":"Venom Spider","maxHp":2405,"damage":241,"attackSpeed":1592,"zone":"SPIDERS","isBoss":false},{"name":"Web Crawler","maxHp":2549,"damage":255,"attackSpeed":1584,"zone":"SPIDERS","isBoss":false},{"name":"Dark Spider","maxHp":2702,"damage":270,"attackSpeed":1576,"zone":"SPIDERS","isBoss":false},{"name":"Armored Spider","maxHp":2864,"damage":286,"attackSpeed":1568,"zone":"SPIDERS","isBoss":false},{"name":"Spider Hunter","maxHp":3036,"damage":304,"attackSpeed":1560,"zone":"SPIDERS","isBoss":false},{"name":"Toxic Widow","maxHp":3218,"damage":322,"attackSpeed":1552,"zone":"SPIDERS","isBoss":false},{"name":"Shadow Spider","maxHp":3411,"damage":341,"attackSpeed":1544,"zone":"SPIDERS","isBoss":false},{"name":"Brood Mother","maxHp":3616,"damage":362,"attackSpeed":1536,"zone":"SPIDERS","isBoss":false},{"name":"Spider Queen","maxHp":5941,"damage":594,"attackSpeed":1428,"zone":"SPIDERS","isBoss":true},{"name":"Corrupted Villager","maxHp":4063,"damage":406,"attackSpeed":1520,"zone":"CORRUPTED","isBoss":false},{"name":"Dark Wanderer","maxHp":4307,"damage":431,"attackSpeed":1512,"zone":"CORRUPTED","isBoss":false},{"name":"Cursed Warrior","maxHp":4565,"damage":457,"attackSpeed":1504,"zone":"CORRUPTED","isBoss":false},{"name":"Corrupted Archer","maxHp":4839,"damage":484,"attackSpeed":1496,"zone":"CORRUPTED","isBoss":false},{"name":"Dark Knight","maxHp":5129,"damage":513,"attackSpeed":1488,"zone":"CORRUPTED","isBoss":false},{"name":"Blood Cultist","maxHp":5437,"damage":544,"attackSpeed":1480,"zone":"CORRUPTED","isBoss":false},{"name":"Corrupted Mage","maxHp":5763,"damage":576,"attackSpeed":1472,"zone":"CORRUPTED","isBoss":false},{"name":"Soul Eater","maxHp":6109,"damage":611,"attackSpeed":1464,"zone":"CORRUPTED","isBoss":false},{"name":"Dark Executioner","maxHp":6476,"damage":648,"attackSpeed":1456,"zone":"CORRUPTED","isBoss":false},{"name":"Corrupted Champion","maxHp":10639,"damage":1064,"attackSpeed":1348,"zone":"CORRUPTED","isBoss":true},{"name":"Orc Grunt","maxHp":7276,"damage":728,"attackSpeed":1440,"zone":"ORCS","isBoss":false},{"name":"Orc Raider","maxHp":7713,"damage":771,"attackSpeed":1432,"zone":"ORCS","isBoss":false},{"name":"Orc Warrior","maxHp":8175,"damage":818,"attackSpeed":1424,"zone":"ORCS","isBoss":false},{"name":"Orc Archer","maxHp":8666,"damage":867,"attackSpeed":1416,"zone":"ORCS","isBoss":false},{"name":"Orc Brute","maxHp":9186,"damage":919,"attackSpeed":1408,"zone":"ORCS","isBoss":false},{"name":"Orc Berserker","maxHp":9737,"damage":974,"attackSpeed":1400,"zone":"ORCS","isBoss":false},{"name":"Orc Shielder","maxHp":10321,"damage":1032,"attackSpeed":1392,"zone":"ORCS","isBoss":false},{"name":"Orc Warlock","maxHp":10941,"damage":1094,"attackSpeed":1384,"zone":"ORCS","isBoss":false},{"name":"Orc Commander","maxHp":11597,"damage":1160,"attackSpeed":1376,"zone":"ORCS","isBoss":false},{"name":"Orc Warlord","maxHp":19054,"damage":1905,"attackSpeed":1268,"zone":"ORCS","isBoss":true},{"name":"Lesser Imp","maxHp":13030,"damage":1303,"attackSpeed":1360,"zone":"DEMONS","isBoss":false},{"name":"Flame Imp","maxHp":13812,"damage":1381,"attackSpeed":1352,"zone":"DEMONS","isBoss":false},{"name":"Demon Hound","maxHp":14641,"damage":1464,"attackSpeed":1344,"zone":"DEMONS","isBoss":false},{"name":"Hellspawn","maxHp":15520,"damage":1552,"attackSpeed":1336,"zone":"DEMONS","isBoss":false},{"name":"Demon Warrior","maxHp":16451,"damage":1645,"attackSpeed":1328,"zone":"DEMONS","isBoss":false},{"name":"Blood Demon","maxHp":17438,"damage":1744,"attackSpeed":1320,"zone":"DEMONS","isBoss":false},{"name":"Flame Demon","maxHp":18484,"damage":1848,"attackSpeed":1312,"zone":"DEMONS","isBoss":false},{"name":"Shadow Demon","maxHp":19593,"damage":1959,"attackSpeed":1304,"zone":"DEMONS","isBoss":false},{"name":"Demon General","maxHp":20769,"damage":2077,"attackSpeed":1300,"zone":"DEMONS","isBoss":false},{"name":"Demon Lord","maxHp":34123,"damage":3412,"attackSpeed":1200,"zone":"DEMONS","isBoss":true},{"name":"Ancient Lizard","maxHp":23336,"damage":2334,"attackSpeed":1300,"zone":"ANCIENT","isBoss":false},{"name":"Stone Golem","maxHp":24736,"damage":2474,"attackSpeed":1300,"zone":"ANCIENT","isBoss":false},{"name":"Crystal Golem","maxHp":26220,"damage":2622,"attackSpeed":1300,"zone":"ANCIENT","isBoss":false},{"name":"Ancient Guardian","maxHp":27793,"damage":2779,"attackSpeed":1300,"zone":"ANCIENT","isBoss":false},{"name":"Wyvern","maxHp":29461,"damage":2946,"attackSpeed":1300,"zone":"ANCIENT","isBoss":false},{"name":"Ancient Dragonspawn","maxHp":31228,"damage":3123,"attackSpeed":1300,"zone":"ANCIENT","isBoss":false},{"name":"Elder Golem","maxHp":33102,"damage":3310,"attackSpeed":1300,"zone":"ANCIENT","isBoss":false},{"name":"Void Beast","maxHp":35088,"damage":3509,"attackSpeed":1300,"zone":"ANCIENT","isBoss":false},{"name":"Ancient Dragon","maxHp":37193,"damage":3719,"attackSpeed":1300,"zone":"ANCIENT","isBoss":false},{"name":"Elder Dragon","maxHp":61109,"damage":6111,"attackSpeed":1200,"zone":"ANCIENT","isBoss":true}];

const game = {
  gold: 0,
  exp: 0,
  level: 1,
  materials: { iron: 0, leather: 0, wood: 0, steel: 0, magicDust: 0, rare: 0 },
  equipment: { weapon: null, helmet: null, armor: null, gloves: null, boots: null, ring: null, amulet: null },
  inventory: [],
  wave: 1,
  farmingWave: false,
  nextWaveTarget: 1,
  soundOn: true,
  musicOn: true,
  player: { maxHp: 100, hp: 100, damage: 10, attackSpeed: 1500, critChance: 5, critDamage: 150, armor: 0, magicResist: 0, dodge: 0, movementSpeed: 100, xpGain: 0, goldGain: 0 },
  monster: { maxHp: 50, hp: 50, damage: 5, attackSpeed: 2000 },
  playerTimer: null,
  monsterTimer: null,
  battleActive: false,
  inventoryOpen: false,
};

const ui = {
  gold: document.getElementById("gold-value"),
  playerLevel: document.getElementById("player-level"),
  playerLevelCard: document.getElementById("player-level-card"),
  playerExpText: document.getElementById("player-exp-text"),
  playerXpBar: document.getElementById("player-xp-bar"),
  playerDamage: document.getElementById("player-damage"),
  playerAttackSpeed: document.getElementById("player-attack-speed"),
  waveTitle: document.getElementById("wave-title"),
  playerName: document.getElementById("player-name"),
  playerHpText: document.getElementById("player-hp-text"),
  playerHpBar: document.getElementById("player-hp-bar"),
  monsterName: document.getElementById("monster-name"),
  monsterHpText: document.getElementById("monster-hp-text"),
  monsterHpBar: document.getElementById("monster-hp-bar"),
  monsterDamage: document.getElementById("monster-damage"),
  monsterAttackSpeed: document.getElementById("monster-attack-speed"),
  status: document.getElementById("battle-status"),
  nextWaveButton: document.getElementById("next-wave-button"),
  autoWaveText: document.getElementById("auto-wave-text"),
  characterButton: document.getElementById("character-button"),
  characterScreen: document.getElementById("character-screen"),
  characterClose: document.getElementById("character-close"),
  characterBack: document.getElementById("character-back"),
  characterPower: document.getElementById("character-power"),
  equippedAura: document.getElementById("equipped-aura"),
  equipmentSlotsLeft: document.getElementById("equipment-slots-left"),
  equipmentSlotsRight: document.getElementById("equipment-slots-right"),
  openInventory: document.getElementById("open-inventory"),
  inventoryScreen: document.getElementById("inventory-screen"),
  inventoryClose: document.getElementById("inventory-close"),
  inventoryGrid: document.getElementById("inventory-grid"),
  inventoryGold: document.getElementById("inventory-gold"),
  inventoryMessage: document.getElementById("inventory-message"),
  blacksmithButton: document.getElementById("blacksmith-button"),
  blacksmithPanel: document.getElementById("blacksmith-panel"),
  blacksmithClose: document.getElementById("blacksmith-close"),
  blacksmithResources: document.getElementById("blacksmith-resources"),
  equipmentGrid: document.getElementById("equipment-grid"),
  blacksmithMessage: document.getElementById("blacksmith-message"),
  statsButton: document.getElementById("stats-button"),
  statsPanel: document.getElementById("stats-panel"),
  statsClose: document.getElementById("stats-close"),
  statsHp: document.getElementById("stats-hp"),
  statsDamage: document.getElementById("stats-damage"),
  statsAttackSpeed: document.getElementById("stats-attack-speed"),
  statsCritChance: document.getElementById("stats-crit-chance"),
  statsCritDamage: document.getElementById("stats-crit-damage"),
  statsArmor: document.getElementById("stats-armor"),
  statsMagicResist: document.getElementById("stats-magic-resist"),
  statsMovementSpeed: document.getElementById("stats-movement-speed"),
  log: document.getElementById("combat-log"),
  victoryEyebrow: document.getElementById("victory-eyebrow"),
  victoryGoldReward: document.getElementById("victory-gold-reward"),
  victoryXpReward: document.getElementById("victory-xp-reward"),
  victoryMaterialReward: document.getElementById("victory-material-reward"),
  continueButton: document.getElementById("continue-game"),
  nextWaveIcon: document.getElementById("next-wave-icon"),
  nextWaveEyebrow: document.getElementById("next-wave-eyebrow"),
  nextWaveTitle: document.getElementById("next-wave-title"),
  nextWaveDescription: document.getElementById("next-wave-description"),
};

function showScreen(screen) {
  Object.values(screens).forEach((element) => {
    if (element) {
      element.classList.remove("active");
      element.setAttribute("aria-hidden", "true");
    }
  });

  screen.classList.add("active");
  screen.setAttribute("aria-hidden", "false");
}

function setSvgView(view) {
  document.getElementById("main-menu-view").classList.add("svg-view-hidden");
  document.getElementById("svg-settings-view").classList.add("svg-view-hidden");
  document.getElementById("svg-quit-view").classList.add("svg-view-hidden");

  view.classList.remove("svg-view-hidden");
}

function openSettingsView() {
  setSvgView(document.getElementById("svg-settings-view"));
}

function closeMenuOverlayViews() {
  setSvgView(document.getElementById("main-menu-view"));
}

function openQuitView() {
  setSvgView(document.getElementById("svg-quit-view"));
}

function startGameFromMenu() {
  closeMenuOverlayViews();
  screens.menu.classList.add("is-leaving");

  window.setTimeout(() => {
    screens.menu.classList.remove("is-leaving");
    showScreen(screens.battle);
    resetBattle();

    game.playerTimer = setInterval(playerAttack, game.player.attackSpeed);
    game.monsterTimer = setInterval(monsterAttack, game.monster.attackSpeed);
  }, 240);
}

function activateSvgButton(button, handler) {
  button.addEventListener("click", handler);
  button.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handler();
    }
  });
}

function setSvgToggle(labelId, toggleId, enabled) {
  const label = document.getElementById(labelId);
  const toggle = document.getElementById(toggleId);
  label.textContent = enabled ? "ON" : "OFF";
  toggle.setAttribute("fill", enabled ? "#4a3021" : "#15191f");
  toggle.setAttribute("aria-label", enabled ? "Enabled" : "Disabled");
}

function updateGold() {
  ui.gold.textContent = String(game.gold);
  updateBlacksmithUi();
  updateCharacterUi();
  updateInventoryUi();
}

const rarityData = {
  Common: { color: "#aeb5c0", glow: "rgba(174,181,192,.15)" },
  Rare: { color: "#5ca9ff", glow: "rgba(92,169,255,.25)" },
  Epic: { color: "#bd72ff", glow: "rgba(189,114,255,.28)" },
  Legendary: { color: "#f0b85f", glow: "rgba(240,184,95,.34)" },
};

function getCraftRarity(wave = game.wave) {
  if (wave >= 15) return "Legendary";
  if (wave >= 10) return "Epic";
  if (wave >= 5) return "Rare";
  return "Common";
}

function getCraftItemLevel(wave = game.wave, tier = 1) {
  const maxLevel = equipmentTiers[tier]?.maxLevel || 5;
  return Math.max(1, Math.min(maxLevel, tier === 1 ? wave : Math.max(1, wave - 9)));
}

function getEquipmentName(slot, tier) {
  const names = slot?.tierNames || [slot?.baseName, slot?.tier2Name];
  return names[Math.max(1, Math.min(10, tier)) - 1] || slot.baseName;
}

function getEquipmentTierRecipe(slot, tier) {
  if (tier <= 1) return slot.craft;
  const source = slot.tier2 || slot.craft;
  const scale = 1 + ((tier - 2) * 0.55);
  return Object.fromEntries(Object.entries(source).map(([key, value]) => [key, Math.max(1, Math.ceil(value * scale))]));
}

function getEquipmentTierCost(slot, targetTier) {
  const tier = Math.max(2, Math.min(10, targetTier));
  const gold = Math.round(slot.tier2Gold * Math.pow(1.55, tier - 2));
  return { gold, materials: getEquipmentTierRecipe(slot, tier) };
}

function getEquipmentTierForWave(wave = game.wave) {
  return Math.max(1, Math.min(10, Math.ceil(wave / 2)));
}

function createEquipmentItem(slotId, tier = 1, level = getCraftItemLevel(), rarity = getCraftRarity()) {
  const slot = equipmentSlots.find((entry) => entry.id === slotId);
  const safeTier = Math.max(1, Math.min(10, tier));
  const maxLevel = equipmentTiers[safeTier]?.maxLevel || 5;
  const safeLevel = Math.max(1, Math.min(maxLevel, level));
  return {
    uid: "item-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8),
    slotId, tier: safeTier, level: safeLevel, rarity, name: getEquipmentName(slot, safeTier),
  };
}

function getItemVisualClass(item) {
  return item ? "rarity-" + item.rarity.toLowerCase() : "";
}

function addItemToInventory(item) {
  game.inventory.push(item);
}

function removeInventoryItem(uid) {
  game.inventory = game.inventory.filter((item) => item.uid !== uid);
}

function getEquippedItem(slotId) {
  return game.equipment[slotId];
}

function renderCharacterSlot(slotId) {
  const slot = equipmentSlots.find((entry) => entry.id === slotId);
  const item = getEquippedItem(slotId);
  return "<button class=\"character-slot " + (item ? getItemVisualClass(item) : "empty") + "\" data-slot=\"" + slotId + "\">" +
    "<span class=\"slot-icon\">" + (item ? getSlotIcon(slotId) : "+") + "</span>" +
    "<span><strong>" + slot.name + "</strong><small>" + (item ? item.name + " · T" + item.tier + " · Lv." + item.level : "EMPTY") + "</small></span>" +
    (item ? "<em>UNEQUIP</em>" : "") + "</button>";
}

function getSlotIcon(slotId) {
  return ({ helmet: "◈", armor: "◆", gloves: "◇", boots: "◀▶", weapon: "⚔", ring: "○", amulet: "✦" })[slotId] || "◆";
}

function getEquipmentArtSvg(slotId, tier = 1) {
  const tierPalette = [
    ["#8f99a5", "#c18b5a", "#4a3428", "#9da8b5"],
    ["#b8c7d6", "#e7c27a", "#3e5267", "#f0b85f"],
    ["#9bd3c7", "#6ee7c8", "#24443f", "#77f5d5"],
    ["#8e94a8", "#8b72ff", "#29213f", "#b7a4ff"],
    ["#b7a0d8", "#d6a8ff", "#3b254e", "#e3b8ff"],
    ["#c99a6b", "#f1c27d", "#493021", "#ffd99b"],
    ["#5e708f", "#5f9cff", "#17253d", "#7ab1ff"],
    ["#8798c8", "#a8c7ff", "#24304f", "#c8dcff"],
    ["#d4c68f", "#f5df7a", "#4a421f", "#fff0a3"],
    ["#e5e7eb", "#ffffff", "#30333a", "#ffffff"],
  ];
  const palette = tierPalette[Math.max(1, Math.min(10, tier)) - 1];
  const [metal, edge, leather, glow] = palette;
  const common = 'fill="' + metal + '" stroke="' + edge + '" stroke-width="5" stroke-linejoin="round"';
  const art = {
    weapon: '<path d="M38 76L98 18L108 28L48 86Z" ' + common + '/><path d="M25 87L48 64L60 76L37 99Z" fill="' + leather + '" stroke="#1a2028" stroke-width="4"/><path d="M50 55L83 23" stroke="' + glow + '" stroke-width="3"/>',
    helmet: '<path d="M25 74Q50 18 75 74V91H25Z" ' + common + '/><path d="M28 61H72L68 76H32Z" fill="#111821"/><path d="M50 23V54" stroke="' + glow + '" stroke-width="3"/>',
    armor: '<path d="M24 26L50 17L76 26L88 82Q50 105 12 82Z" ' + common + '/><path d="M50 20V91M22 46H78" stroke="' + glow + '" stroke-width="3" opacity=".8"/><path d="M30 30L18 52M70 30L82 52" stroke="' + leather + '" stroke-width="8"/>',
    gloves: '<path d="M24 30L42 23L51 48L43 82L22 75Z" ' + common + '/><path d="M76 30L58 23L49 48L57 82L78 75Z" ' + common + '/><path d="M28 52H47M53 52H72" stroke="' + glow + '" stroke-width="3"/>',
    boots: '<path d="M24 19L48 24L45 68L79 75L77 92H20Z" ' + common + '/><path d="M76 19L52 24L55 68L21 75L23 92H80Z" ' + common + '/><path d="M28 76H72" stroke="' + glow + '" stroke-width="3"/>',
    ring: '<circle cx="50" cy="55" r="27" fill="none" stroke="' + edge + '" stroke-width="10"/><circle cx="50" cy="28" r="10" fill="' + glow + '" stroke="' + edge + '" stroke-width="4"/><path d="M42 28L50 19L58 28" fill="' + metal + '"/>',
    amulet: '<path d="M50 18L78 49L50 91L22 49Z" fill="' + glow + '" stroke="' + edge + '" stroke-width="6"/><path d="M50 30L65 49L50 72L35 49Z" fill="#172332" stroke="' + metal + '" stroke-width="4"/><path d="M50 8V22" stroke="' + edge + '" stroke-width="5"/>'
  };
  return '<svg class="equipment-art-svg" viewBox="0 0 100 110" aria-hidden="true"><defs><filter id="equipmentGlow"><feGaussianBlur stdDeviation="2"/></filter></defs><g filter="url(#equipmentGlow)" opacity=".35" stroke="' + glow + '">' + (art[slotId] || art.armor) + '</g><g>' + (art[slotId] || art.armor) + '</g></svg>';
}

function updateCharacterVisuals() {
  const equipped = Object.fromEntries(Object.entries(game.equipment).map(([key, item]) => [key, Boolean(item)]));
  ["helmet","armor","weapon","gloves","boots","ring","amulet"].forEach((slot) => {
    const el = document.getElementById("visual-" + slot);
    if (el) {
      el.style.opacity = equipped[slot] ? "1" : "0";
      el.style.filter = equipped[slot] ? "drop-shadow(0 0 8px " + rarityData[game.equipment[slot].rarity].color + ")" : "";
    }
  });
  ui.equippedAura.className = "equipped-aura " + Object.values(game.equipment).filter(Boolean).map((item) => item.rarity.toLowerCase()).join(" ");
  const power = Math.round(game.player.damage + game.player.maxHp / 10 + game.player.armor * 5 + game.player.critChance * 2);
  ui.characterPower.textContent = "POWER " + power;
}

function updateCharacterUi() {
  if (!ui.characterScreen) return;
  const slots = equipmentSlots.map((slot) => renderCharacterSlot(slot.id));
  ui.equipmentSlotsLeft.innerHTML = slots.slice(0, 4).join("");
  ui.equipmentSlotsRight.innerHTML = slots.slice(4).join("");
  [ui.equipmentSlotsLeft, ui.equipmentSlotsRight].forEach((container) => {
    container.querySelectorAll(".character-slot").forEach((button) => button.addEventListener("click", () => {
      if (game.equipment[button.dataset.slot]) unequipItem(button.dataset.slot);
    }));
  });
  updateCharacterVisuals();
}

function openCharacterScreen() {
  updateCharacterUi();
  showScreen(screens.character);
}

function closeCharacterScreen() {
  showScreen(screens.battle);
}

function openInventoryOverlay() {
  updateInventoryUi();
  game.inventoryOpen = true;
  ui.inventoryScreen.classList.add("inventory-overlay-active");
  ui.inventoryScreen.setAttribute("aria-hidden", "false");
}

function closeInventoryOverlay() {
  game.inventoryOpen = false;
  ui.inventoryScreen.classList.remove("inventory-overlay-active");
  ui.inventoryScreen.setAttribute("aria-hidden", "true");
  if (game.battleActive || game.farmingWave || game.wave >= 1) {
    showScreen(screens.battle);
  } else {
    showScreen(screens.character);
  }
}

function renderInventoryItem(item) {
  const slot = equipmentSlots.find((entry) => entry.id === item.slotId);
  const rarity = rarityData[item.rarity];
  const actionData = getEquipmentAction(slot, item);
  const canUpgrade = actionData.action !== "max" && canAfford(actionData.cost);
  const upgradeLabel = actionData.action === "tier" ? "FORGE T" + actionData.targetTier : actionData.action === "upgrade" ? "UPGRADE" : "";
  return "<article class=\"inventory-item " + getItemVisualClass(item) + "\" style=\"--rarity:" + rarity.color + ";--rarity-glow:" + rarity.glow + "\">" +
    "<div class=\"inventory-item-icon\">" + getSlotIcon(item.slotId) + "</div>" +
    "<div class=\"inventory-item-info\"><div class=\"inventory-rarity\">" + item.rarity + "</div><h3>" + item.name + " <span>Lv." + item.level + "</span></h3><p>" + slot.effect + " · Item Level " + item.level + "</p><div>" + equipmentEffectText(item.slotId, item) + "</div>" + getEquipmentComparisonHtml(item) + "</div>" +
    "<div class=\"inventory-actions\"><button data-item=\"" + item.uid + "\" data-action=\"equip\">EQUIP</button>" +
    (upgradeLabel ? "<button data-item=\"" + item.uid + "\" data-action=\"upgrade\" " + (canUpgrade ? "" : "disabled") + ">" + upgradeLabel + "</button>" : "") +
    "<button data-item=\"" + item.uid + "\" data-action=\"sell\">SELL</button></div></article>";
}

function upgradeInventoryItem(item) {
  const slot = equipmentSlots.find((entry) => entry.id === item.slotId);
  const actionData = getEquipmentAction(slot, item);
  if (actionData.action === "max" || !canAfford(actionData.cost)) {
    ui.inventoryMessage.textContent = "Not enough Gold or materials for this upgrade.";
    return;
  }

  payCost(actionData.cost);
  if (actionData.action === "tier") {
    item.tier = actionData.targetTier;
    item.name = getEquipmentName(slot, item.tier);
    item.level = 1;
    item.rarity = game.wave >= 15 ? "Legendary" : Math.max(item.tier, 2) >= 4 ? "Epic" : item.rarity;
    ui.inventoryMessage.textContent = item.name + " forged to Tier " + item.tier + " · Lv.1.";
  } else {
    const maxLevel = equipmentTiers[item.tier]?.maxLevel || 5;
    item.level = Math.min(maxLevel, item.level + 1);
    ui.inventoryMessage.textContent = item.name + " upgraded to Item Lv." + item.level + ".";
  }

  updateProgressionUi();
  updateInventoryUi();
  updateBlacksmithUi();
  saveGame();
}

function updateInventoryUi() {
  if (!ui.inventoryGrid) return;
  ui.inventoryGold.textContent = "GOLD " + game.gold + " · " + game.inventory.length + " ITEMS";
  ui.inventoryGrid.innerHTML = game.inventory.length ? game.inventory.map(renderInventoryItem).join("") : "<div class=\"inventory-empty\">Inventory is empty.</div>";
  ui.inventoryGrid.querySelectorAll("[data-action]").forEach((button) => button.addEventListener("click", () => {
    const item = game.inventory.find((entry) => entry.uid === button.dataset.item);
    if (!item) return;
    if (button.dataset.action === "equip") equipInventoryItem(item);
    if (button.dataset.action === "upgrade") upgradeInventoryItem(item);
    if (button.dataset.action === "sell") sellInventoryItem(item);
  }));
}

function equipInventoryItem(item) {
  const previous = game.equipment[item.slotId];
  if (previous) addItemToInventory(previous);
  removeInventoryItem(item.uid);
  game.equipment[item.slotId] = item;
  applyEquipmentStats();
  game.player.hp = Math.min(game.player.maxHp, game.player.hp + 1);
  updateProgressionUi();
  updateBattleUi();
  updateCharacterUi();
  updateInventoryUi();
  saveGame();
}

function unequipItem(slotId) {
  const item = game.equipment[slotId];
  if (!item) return;
  addItemToInventory(item);
  game.equipment[slotId] = null;
  applyEquipmentStats();
  game.player.hp = Math.min(game.player.maxHp, game.player.hp);
  updateProgressionUi();
  updateBattleUi();
  updateCharacterUi();
  updateInventoryUi();
  saveGame();
}

function sellInventoryItem(item) {
  const value = Math.max(5, Math.round((equipmentSlots.find((entry) => entry.id === item.slotId).craftGold * item.level * (equipmentTiers[item.tier]?.multiplier || 1)) * ({Common:1,Rare:1.5,Epic:2.5,Legendary:4}[item.rarity] || 1) * .35));
  removeInventoryItem(item.uid);
  game.gold += value;
  ui.inventoryMessage.textContent = item.name + " sold for " + value + " Gold.";
  updateGold();
  saveGame();
}

function craftAnimation(item, done) {
  const overlay = document.createElement("div");
  overlay.className = "craft-animation";
  overlay.innerHTML =
    '<div class="craft-forge-scene">' +
      '<div class="forge-anvil"><div class="anvil-top"></div><div class="anvil-body"></div></div>' +
      '<div class="forge-sparks"><i></i><i></i><i></i><i></i><i></i><i></i></div>' +
      '<div class="forge-hammer"><span></span></div>' +
      '<div class="craft-reveal">' + getEquipmentArtSvg(item.slotId, item.tier) + '</div>' +
      '<div class="craft-item-name"><strong>' + item.name + '</strong><span>' + item.rarity + ' · Lv.' + item.level + '</span></div>' +
      '<div class="craft-status">FORGING · TEMPERING · COMPLETE</div>' +
    '</div>';
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add("active"));
  setTimeout(() => overlay.classList.add("hammer-strike-1"), 420);
  setTimeout(() => overlay.classList.add("hammer-strike-2"), 820);
  setTimeout(() => overlay.classList.add("hammer-strike-3"), 1220);
  setTimeout(() => overlay.classList.add("reveal"), 1540);
  setTimeout(() => {
    overlay.classList.remove("active");
    setTimeout(() => { overlay.remove(); done(); }, 320);
  }, 2450);
}

function getMaterialIconSvg(id) {
  const icons = {
    iron: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M9 4h14l5 8-8 16H12L4 12z" fill="currentColor" opacity=".9"/><path d="M9 4l7 8-4 16M23 4l-7 8 4 16M4 12h24" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.6"/></svg>',
    leather: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8 5q8 5 16 0l3 6-5 16H10L5 11z" fill="currentColor" opacity=".9"/><path d="M9 9l4 4m10-4l-4 4M10 23h12" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.5"/></svg>',
    wood: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7 6h18v20H7z" fill="currentColor" opacity=".9"/><path d="M11 6v20m5-20v20m5-20v20" stroke="rgba(255,255,255,.4)" stroke-width="1.5"/><path d="M10 11h4m5 5h4m-12 5h5" stroke="rgba(255,255,255,.6)" stroke-width="1.5"/></svg>',
    steel: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 8l11-5 11 5-3 17-8 4-8-4z" fill="currentColor" opacity=".9"/><path d="M5 8l11 6 11-6M16 14v15" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="1.6"/></svg>',
    magicDust: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3l2.5 9.5L28 16l-9.5 2.5L16 28l-2.5-9.5L4 16l9.5-3.5z" fill="currentColor"/><circle cx="25" cy="7" r="2" fill="currentColor"/><circle cx="7" cy="24" r="1.8" fill="currentColor"/></svg>',
    rare: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3l4 7 8 1-6 6 1.5 8-7.5-3.8L8.5 25 10 17 4 11l8-1z" fill="currentColor"/><path d="M16 7v16M10 12h12" stroke="rgba(255,255,255,.55)" stroke-width="1.4"/></svg>'
  };
  return icons[id] || '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="11" fill="currentColor"/></svg>';
}

function showResourceDrop(id, amount) {
  if (!amount || amount <= 0) return;
  let feed = document.getElementById("resource-drop-feed");
  if (!feed) {
    feed = document.createElement("div");
    feed.id = "resource-drop-feed";
    feed.className = "resource-drop-feed";
    feed.setAttribute("aria-live", "polite");
    document.body.appendChild(feed);
  }

  const drop = document.createElement("div");
  drop.className = "resource-drop";
  drop.innerHTML =
    '<span class="resource-drop-icon">' + getMaterialIconSvg(id) + '</span>' +
    '<span class="resource-drop-copy"><strong>+' + amount + '</strong><small>' + formatMaterialName(id) + '</small></span>';
  feed.appendChild(drop);

  requestAnimationFrame(() => drop.classList.add("show"));
  window.setTimeout(() => {
    drop.classList.remove("show");
    window.setTimeout(() => drop.remove(), 350);
  }, 1900);
}

function formatMaterialName(id) {
  return ({ iron: "Iron", leather: "Leather", wood: "Wood", steel: "Steel", magicDust: "Magic Dust", rare: "Rare" })[id] || id;
}

function getEquipmentBonus(slotId, item) {
  if (!item) return {};
  const tierMultiplier = equipmentTiers[item.tier]?.multiplier || 1;
  const rarityMultiplier = ({ Common: 1, Rare: 1.25, Epic: 1.6, Legendary: 2.1 }[item.rarity] || 1);
  const levelMultiplier = 1 + ((Math.max(1, item.level) - 1) * 0.12);
  const multiplier = tierMultiplier * rarityMultiplier * levelMultiplier;

  switch (slotId) {
    case "weapon":
      return { damage: Math.round(8 * multiplier), critChance: Number((1.5 * multiplier).toFixed(1)), critDamage: Math.round(6 * multiplier) };
    case "helmet":
      return { maxHp: Math.round(24 * multiplier), armor: Math.round(2.5 * multiplier) };
    case "armor":
      return { maxHp: Math.round(42 * multiplier), armor: Math.round(5 * multiplier) };
    case "gloves":
      return { attackSpeed: Math.round(28 * multiplier), critChance: Number((1.25 * multiplier).toFixed(1)) };
    case "boots":
      return { dodge: Number((1.5 * multiplier).toFixed(1)), movementSpeed: Number((4 * multiplier).toFixed(1)) };
    case "ring":
      return { critChance: Number((2.2 * multiplier).toFixed(1)), critDamage: Math.round(9 * multiplier) };
    case "amulet":
      return { xpGain: Number((4 * multiplier).toFixed(1)), goldGain: Number((4 * multiplier).toFixed(1)) };
    default:
      return {};
  }
}

function getEquipmentTotals() {
  const totals = { maxHp: 0, damage: 0, attackSpeed: 0, armor: 0, dodge: 0, movementSpeed: 0, critChance: 0, critDamage: 0, xpGain: 0, goldGain: 0 };
  Object.entries(game.equipment).forEach(([slotId, item]) => {
    const bonus = getEquipmentBonus(slotId, item);
    Object.keys(totals).forEach((key) => { totals[key] += Number(bonus[key] || 0); });
  });
  return totals;
}

function applyEquipmentStats() {
  const totals = getEquipmentTotals();
  game.player.maxHp = 100 + ((game.level - 1) * 10) + totals.maxHp;
  game.player.damage = 10 + ((game.level - 1) * 2) + totals.damage;
  game.player.attackSpeed = Math.max(350, Math.max(850, 1500 - ((game.level - 1) * 7)) - totals.attackSpeed);
  game.player.armor = totals.armor;
  game.player.critChance = 5 + totals.critChance;
  game.player.critDamage = 150 + totals.critDamage;
  game.player.dodge = totals.dodge;
  game.player.movementSpeed = 100 + totals.movementSpeed;
  game.player.xpGain = totals.xpGain;
  game.player.goldGain = totals.goldGain;
}

function getEquipmentCost(slot, item, action) {
  if (!item) return { gold: slot.craftGold, materials: slot.craft };
  if (action === "tier") return getEquipmentTierCost(slot, item.tier + 1);
  const level = item.level + 1;
  const recipe = getEquipmentTierRecipe(slot, item.tier);
  return {
    gold: Math.round((slot.craftGold * (0.45 + item.tier * 0.08)) * level),
    materials: Object.fromEntries(Object.entries(recipe).map(([key, value]) => [key, Math.max(1, Math.ceil(value * (0.35 + level * 0.12)))])),
  };
}

function canAfford(cost) {
  return game.gold >= cost.gold && Object.entries(cost.materials).every(([key, value]) => (game.materials[key] || 0) >= value);
}

function payCost(cost) {
  game.gold -= cost.gold;
  Object.entries(cost.materials).forEach(([key, value]) => { game.materials[key] -= value; });
}

function equipmentEffectText(slotId, item) {
  if (!item) return "Not crafted";
  const bonus = getEquipmentBonus(slotId, item);
  const labels = { maxHp: "Max HP", damage: "Damage", armor: "Defense", attackSpeed: "Attack Speed", dodge: "Dodge Chance", movementSpeed: "Movement Speed", critChance: "Crit Chance", critDamage: "Crit Damage", xpGain: "XP Gain", goldGain: "Gold Gain" };
  return Object.entries(bonus).map(([key, value]) => {
    const suffix = ["dodge", "movementSpeed", "critChance", "critDamage", "xpGain", "goldGain"].includes(key) ? "%" : key === "attackSpeed" ? " ms faster" : "";
    const display = Number.isInteger(value) ? value : value.toFixed(1);
    return labels[key] + " +" + display + suffix;
  }).join(" · ");
}

function getEquipmentComparisonHtml(item) {
  const current = game.equipment[item.slotId];
  const currentBonus = getEquipmentBonus(item.slotId, current);
  const newBonus = getEquipmentBonus(item.slotId, item);
  const keys = Array.from(new Set([...Object.keys(currentBonus), ...Object.keys(newBonus)]));
  const labels = { maxHp: "Max HP", damage: "Damage", armor: "Defense", attackSpeed: "Attack Speed", dodge: "Dodge Chance", movementSpeed: "Movement Speed", critChance: "Crit Chance", critDamage: "Crit Damage", xpGain: "XP Gain", goldGain: "Gold Gain" };
  const percentKeys = new Set(["dodge","movementSpeed","critChance","critDamage","xpGain","goldGain"]);
  const format = (key, value) => {
    const n = Number(value || 0);
    return (Number.isInteger(n) ? String(n) : n.toFixed(1)) + (percentKeys.has(key) ? "%" : key === "attackSpeed" ? " ms" : "");
  };
  return "<div class=\"item-comparison\"><div class=\"comparison-title\">COMPARISON · " + (current ? current.name + " Lv." + current.level : "EMPTY SLOT") + "</div>" +
    keys.map((key) => {
      const oldValue = Number(currentBonus[key] || 0);
      const newValue = Number(newBonus[key] || 0);
      const diff = newValue - oldValue;
      const state = diff > 0 ? "better" : diff < 0 ? "worse" : "same";
      const diffText = diff > 0 ? "+" + format(key, diff) : format(key, diff);
      return "<div class=\"comparison-row\"><span>" + labels[key] + "</span><span>" + format(key, oldValue) + " → " + format(key, newValue) + "</span><strong class=\"" + state + "\">" + diffText + "</strong></div>";
    }).join("") + "</div>";
}

function getEquipmentAction(slot, item) {
  if (!item) return { action: "craft", label: "CRAFT", cost: { gold: slot.craftGold, materials: slot.craft } };

  const tier = Math.max(1, Math.min(10, item.tier || 1));
  const maxLevel = equipmentTiers[tier]?.maxLevel || 5;

  if (item.level < maxLevel) {
    const level = item.level + 1;
    const recipe = getEquipmentTierRecipe(slot, tier);
    return {
      action: "upgrade",
      label: "UPGRADE Lv." + level,
      cost: {
        gold: Math.round((slot.craftGold * (0.45 + tier * 0.08)) * level),
        materials: Object.fromEntries(Object.entries(recipe).map(([key, value]) => [key, Math.max(1, Math.ceil(value * (0.35 + level * 0.12)))])),
      },
    };
  }

  if (tier < 10) {
    const targetTier = tier + 1;
    return {
      action: "tier",
      targetTier,
      label: "FORGE TIER " + targetTier,
      cost: getEquipmentTierCost(slot, targetTier),
    };
  }

  return { action: "max", label: "MAX T10", cost: { gold: 0, materials: {} } };
}

function renderEquipmentCard(slot) {
  const item = game.equipment[slot.id];
  const actionData = getEquipmentAction(slot, item);
  const canBuy = actionData.action !== "max" && canAfford(actionData.cost);
  const materialLine = Object.entries(actionData.cost.materials).map(([key, value]) => "<span>" + value + " " + formatMaterialName(key) + "</span>").join("");
  const title = item ? item.name : slot.baseName;
  const levelText = item ? " <span>T" + item.tier + " · Lv." + item.level + "</span>" : "";
  const button = actionData.action === "max" || !canBuy ? " disabled" : "";
  const previewItem = item || createEquipmentItem(slot.id, 1, 1, getCraftRarity());
  const comparison = item ? "" : getEquipmentComparisonHtml(previewItem);
  return "<article class=\"equipment-card\">" +
    "<div class=\"equipment-preview " + getItemVisualClass(previewItem) + "\">" + getEquipmentArtSvg(slot.id, previewItem.tier) + "</div>" +
    "<div class=\"equipment-card-top\"><div><div class=\"equipment-slot\">" + slot.name + "</div><h3>" + title + levelText + "</h3></div>" +
    "<div class=\"equipment-effect\">" + (item ? equipmentEffectText(slot.id, item) : "New item · Item Lv." + previewItem.level + " · " + previewItem.rarity) + "</div></div>" +
    comparison +
    "<div class=\"equipment-recipe\"><strong>" + actionData.cost.gold + " Gold</strong>" + materialLine + "</div>" +
    "<button class=\"equipment-action\" data-slot=\"" + slot.id + "\" data-action=\"" + actionData.action + "\"" + button + ">" + actionData.label + "</button>" +
    "</article>";
}

function updateBlacksmithUi() {
  if (!ui.blacksmithResources) return;
  ui.blacksmithResources.innerHTML = "<strong class=\"resource-chip gold-resource\"><span class=\"resource-chip-icon gold-chip\">✦</span><span>Gold</span><b>" + game.gold + "</b></strong>" +
    Object.entries(game.materials).map(([key, value]) => "<span class=\"resource-chip resource-" + key + "\"><span class=\"resource-chip-icon\">" + getMaterialIconSvg(key) + "</span><span>" + formatMaterialName(key) + "</span><b>" + value + "</b></span>").join("");
  ui.equipmentGrid.innerHTML = equipmentSlots.map(renderEquipmentCard).join("");
  ui.equipmentGrid.querySelectorAll(".equipment-action").forEach((button) => {
    button.addEventListener("click", () => craftOrUpgradeEquipment(button.dataset.slot, button.dataset.action));
  });
}

function openBlacksmithPanel() {
  updateBlacksmithUi();
  ui.blacksmithPanel.classList.add("active");
  ui.blacksmithPanel.setAttribute("aria-hidden", "false");
}

function closeBlacksmithPanel() {
  ui.blacksmithPanel.classList.remove("active");
  ui.blacksmithPanel.setAttribute("aria-hidden", "true");
}

function craftOrUpgradeEquipment(slotId, action) {
  const slot = equipmentSlots.find((entry) => entry.id === slotId);
  const item = game.equipment[slotId];
  const actionData = getEquipmentAction(slot, item);
  if (actionData.action !== action || !canAfford(actionData.cost)) {
    ui.blacksmithMessage.textContent = "Not enough Gold or materials.";
    return;
  }

  payCost(actionData.cost);
  if (!item) {
    const newItem = createEquipmentItem(slotId, 1, 1, getCraftRarity());
    craftAnimation(newItem, () => {
      addItemToInventory(newItem);
      ui.blacksmithMessage.textContent = newItem.name + " · T1 · " + newItem.rarity + " · Item Lv.1 crafted and added to Inventory.";
      updateProgressionUi(); updateInventoryUi(); updateBlacksmithUi(); saveGame();
    });
    return;
  }

  const oldHp = game.player.hp;
  if (action === "tier") {
    item.tier = actionData.targetTier;
    item.level = 1;
    item.name = getEquipmentName(slot, item.tier);
    item.rarity = game.wave >= 15 ? "Legendary" : item.tier >= 4 ? "Epic" : item.rarity;
    ui.blacksmithMessage.textContent = item.name + " · T" + item.tier + " · Lv.1 forged.";
  } else {
    const maxLevel = equipmentTiers[item.tier]?.maxLevel || 5;
    item.level = Math.min(maxLevel, item.level + 1);
    ui.blacksmithMessage.textContent = item.name + " upgraded to Item Lv." + item.level + ".";
  }

  applyEquipmentStats();
  game.player.hp = Math.min(game.player.maxHp, oldHp);
  updateProgressionUi(); updateBattleUi(); updateGold(); updateInventoryUi(); updateCharacterUi(); saveGame(); updateBlacksmithUi();
}

function updateStatsUi() {
  ui.statsHp.textContent = String(game.player.maxHp);
  ui.statsDamage.textContent = String(game.player.damage);
  ui.statsAttackSpeed.textContent = (game.player.attackSpeed / 1000).toFixed(2) + "s";
  ui.statsCritChance.textContent = String(game.player.critChance) + "%";
  ui.statsCritDamage.textContent = String(game.player.critDamage) + "%";
  ui.statsArmor.textContent = String(game.player.armor);
  ui.statsMagicResist.textContent = String(game.player.magicResist);
  ui.statsMovementSpeed.textContent = String(Math.round(game.player.movementSpeed)) + "%";
}

function openStatsPanel() {
  updateStatsUi();
  ui.statsPanel.classList.add("active");
  ui.statsPanel.setAttribute("aria-hidden", "false");
}

function closeStatsPanel() {
  ui.statsPanel.classList.remove("active");
  ui.statsPanel.setAttribute("aria-hidden", "true");
}


function getXpToNextLevel(level = game.level) {
  if (level >= 100) return 0;
  return 100 + ((level - 1) * 35) + ((level - 1) * (level - 1) * 5);
}

function getTotalXpForLevel(level) {
  let total = 0;
  for (let current = 1; current < level; current += 1) {
    total += getXpToNextLevel(current);
  }
  return total;
}

function updatePlayerStatsFromLevel() {
  applyEquipmentStats();
}

function updateProgressionUi() {
  const currentLevelXp = getTotalXpForLevel(game.level);
  const nextLevelXp = getXpToNextLevel(game.level);
  const progress = game.level >= 100
    ? 100
    : Math.max(0, Math.min(100, ((game.exp - currentLevelXp) / nextLevelXp) * 100));

  ui.playerLevel.textContent = String(game.level);
  ui.playerLevelCard.textContent = String(game.level);
  ui.playerExpText.textContent = game.level >= 100
    ? String(game.exp) + " / MAX"
    : String(game.exp - currentLevelXp) + " / " + nextLevelXp;
  ui.playerXpBar.style.width = progress + "%";
  ui.playerDamage.textContent = String(game.player.damage);
  ui.playerAttackSpeed.textContent = (game.player.attackSpeed / 1000).toFixed(2) + "s";
  updateStatsUi();
}

function addExperience(amount) {
  if (amount <= 0 || game.level >= 100) return;

  game.exp += amount;
  let leveledUp = false;

  while (game.level < 100 && game.exp >= getTotalXpForLevel(game.level + 1)) {
    game.level += 1;
    leveledUp = true;
  }

  updatePlayerStatsFromLevel();
  updateProgressionUi();

  if (leveledUp) {
    game.player.hp = game.player.maxHp;
    writeLog("LEVEL UP! Warden reached level " + game.level + ".");
  }
}

function updateBattleUi() {
  const playerPercent = Math.max(0, (game.player.hp / game.player.maxHp) * 100);
  const monsterPercent = Math.max(0, (game.monster.hp / game.monster.maxHp) * 100);

  ui.playerHpText.textContent = `${Math.max(0, game.player.hp)} / ${game.player.maxHp}`;
  ui.monsterHpText.textContent = `${Math.max(0, game.monster.hp)} / ${game.monster.maxHp}`;
  ui.playerHpBar.style.width = `${playerPercent}%`;
  ui.monsterHpBar.style.width = `${monsterPercent}%`;
}

function writeLog(message) {
  ui.log.innerHTML = `<p>${message}</p>`;
}

function restartPlayerTimer() {
  if (game.playerTimer) clearInterval(game.playerTimer);
  game.playerTimer = game.battleActive
    ? setInterval(playerAttack, game.player.attackSpeed)
    : null;
}

function clearBattleTimers() {
  if (game.playerTimer) {
    clearInterval(game.playerTimer);
    game.playerTimer = null;
  }
  if (game.monsterTimer) {
    clearInterval(game.monsterTimer);
    game.monsterTimer = null;
  }
}

function getCurrentSlime() {
  return slimeWaves[game.wave - 1];
}

function ensureAdvancedWaveVisuals() {
  const svg = document.querySelector(".slime-art svg");
  if (!svg) return;

  const namespace = "http://www.w3.org/2000/svg";
  const palettes = {
    GOBLINS: ["#6f8f48", "#b7cf72", "#29351f"],
    UNDEAD: ["#68727b", "#d5d8d1", "#252a2d"],
    BEASTS: ["#755744", "#b98b68", "#30231d"],
    SPIDERS: ["#493b61", "#9b72c8", "#211b2b"],
    CORRUPTED: ["#573b68", "#b36cc4", "#251a2e"],
    ORCS: ["#5d6f42", "#a5a95d", "#26301e"],
    DEMONS: ["#743d3d", "#ef6b4f", "#321b1b"],
    ANCIENT: ["#64707c", "#d2b76d", "#202832"],
  };

  for (let wave = 21; wave <= 100; wave += 1) {
    if (svg.querySelector(".advanced-wave-" + wave)) continue;

    const data = slimeWaves[wave - 1];
    const [bodyColor, accentColor, darkColor] = palettes[data.zone] || palettes.ANCIENT;
    const group = document.createElementNS(namespace, "g");
    group.setAttribute("class", "slime-wave slime-wave-" + wave + " advanced-wave advanced-wave-" + wave);
    group.setAttribute("display", "none");

    const body = document.createElementNS(namespace, "ellipse");
    body.setAttribute("cx", "220"); body.setAttribute("cy", "205");
    body.setAttribute("rx", data.isBoss ? "125" : "108"); body.setAttribute("ry", data.isBoss ? "82" : "70");
    body.setAttribute("fill", bodyColor); body.setAttribute("stroke", darkColor); body.setAttribute("stroke-width", data.isBoss ? "11" : "8");

    const head = document.createElementNS(namespace, "path");
    head.setAttribute("d", data.zone === "SPIDERS"
      ? "M120 190Q135 115 220 105Q305 115 320 190L295 230H145Z"
      : "M145 205Q145 125 220 105Q295 125 295 205L270 245H170Z");
    head.setAttribute("fill", bodyColor); head.setAttribute("stroke", darkColor); head.setAttribute("stroke-width", data.isBoss ? "10" : "7");

    const eyeL = document.createElementNS(namespace, "circle");
    eyeL.setAttribute("cx","188"); eyeL.setAttribute("cy","170"); eyeL.setAttribute("r",data.isBoss?"14":"10"); eyeL.setAttribute("fill",accentColor);
    const eyeR=eyeL.cloneNode(); eyeR.setAttribute("cx","252");

    const accent=document.createElementNS(namespace,"path");
    accent.setAttribute("d", data.zone==="DEMONS" ? "M180 110L160 55L205 91L220 45L235 91L280 55L260 110Z" : "M170 115L220 70L270 115");
    accent.setAttribute("fill","none"); accent.setAttribute("stroke",accentColor); accent.setAttribute("stroke-width",data.isBoss?"13":"8"); accent.setAttribute("stroke-linecap","round"); accent.setAttribute("stroke-linejoin","round");

    const weapon=document.createElementNS(namespace,"path");
    weapon.setAttribute("d", data.zone==="BEASTS" ? "M120 250L75 300L92 314L145 268Z" : "M112 275L65 310L78 326L132 289Z");
    weapon.setAttribute("fill",accentColor); weapon.setAttribute("stroke",darkColor); weapon.setAttribute("stroke-width","6");

    [body,head,eyeL,eyeR,accent,weapon].forEach((el)=>group.appendChild(el));

    if (data.isBoss) {
      const crown=document.createElementNS(namespace,"path");
      crown.setAttribute("d","M170 72L190 35L220 65L250 35L270 72L250 94H190Z");
      crown.setAttribute("fill",accentColor); crown.setAttribute("stroke",darkColor); crown.setAttribute("stroke-width","6");
      group.appendChild(crown);
    }

    svg.appendChild(group);
  }
}

function ensureRatWaveVisuals() {
  const svg = document.querySelector(".slime-art svg");
  if (!svg) return;

  const namespace = "http://www.w3.org/2000/svg";
  for (let wave = 10; wave <= 20; wave += 1) {
    if (svg.querySelector(`.rat-wave-${wave}`)) continue;

    const group = document.createElementNS(namespace, "g");
    group.setAttribute("class", "slime-wave slime-wave-" + wave + " rat-wave rat-wave-" + wave);
    group.setAttribute("display", "none");

    const t = (wave - 10) / 10;
    const body = document.createElementNS(namespace, "ellipse");
    body.setAttribute("cx", "220");
    body.setAttribute("cy", "205");
    body.setAttribute("rx", String(105 + t * 22));
    body.setAttribute("ry", String(68 + t * 16));
    body.setAttribute("fill", wave === 20 ? "#4b2630" : (wave >= 17 ? "#5b303b" : "#675048"));
    body.setAttribute("stroke", wave === 20 ? "#e3a75d" : "#241b1d");
    body.setAttribute("stroke-width", wave === 20 ? "12" : "9");

    const head = document.createElementNS(namespace, "path");
    head.setAttribute("d", "M128 205Q125 137 174 112L153 70L191 91L220 67L249 91L287 70L266 115Q314 143 312 205Z");
    head.setAttribute("fill", body.getAttribute("fill"));
    head.setAttribute("stroke", body.getAttribute("stroke"));
    head.setAttribute("stroke-width", body.getAttribute("stroke-width"));

    const eyeL = document.createElementNS(namespace, "circle");
    eyeL.setAttribute("cx", "185"); eyeL.setAttribute("cy", "158"); eyeL.setAttribute("r", wave === 20 ? "13" : "10"); eyeL.setAttribute("fill", "#ff4d5e");
    const eyeR = eyeL.cloneNode(); eyeR.setAttribute("cx", "255");

    const nose = document.createElementNS(namespace, "path");
    nose.setAttribute("d", "M209 181Q220 171 231 181L220 192Z");
    nose.setAttribute("fill", "#d98a8f");

    const teeth = document.createElementNS(namespace, "path");
    teeth.setAttribute("d", "M183 205Q220 234 257 205");
    teeth.setAttribute("fill", "none");
    teeth.setAttribute("stroke", "#e8d7c4");
    teeth.setAttribute("stroke-width", wave === 20 ? "10" : "7");
    teeth.setAttribute("stroke-linecap", "round");

    const earL = document.createElementNS(namespace, "path");
    earL.setAttribute("d", "M158 111L132 48L187 91Z"); earL.setAttribute("fill", "#8a4d55"); earL.setAttribute("stroke", "#24151a"); earL.setAttribute("stroke-width", "7");
    const earR = earL.cloneNode(); earR.setAttribute("d", "M282 111L308 48L253 91Z");

    const armor = document.createElementNS(namespace, "path");
    armor.setAttribute("d", "M150 246Q220 218 290 246L307 286Q220 315 133 286Z");
    armor.setAttribute("fill", wave === 20 ? "#7d4933" : (wave >= 17 ? "#48394c" : "#303944"));
    armor.setAttribute("stroke", wave === 20 ? "#f0bd72" : "#161c24");
    armor.setAttribute("stroke-width", "7");

    const clawL = document.createElementNS(namespace, "path");
    clawL.setAttribute("d", "M145 255L91 281L104 298L161 278Z"); clawL.setAttribute("fill", "#b9a18c"); clawL.setAttribute("stroke", "#20181a"); clawL.setAttribute("stroke-width", "6");
    const clawR = clawL.cloneNode(); clawR.setAttribute("d", "M295 255L349 281L336 298L279 278Z");

    [body, head, earL, earR, eyeL, eyeR, nose, teeth, armor, clawL, clawR].forEach((el) => group.appendChild(el));
    if (wave === 20) {
      const crown = document.createElementNS(namespace, "path");
      crown.setAttribute("d", "M180 70L194 37L220 62L246 37L260 70L246 91H194Z");
      crown.setAttribute("fill", "#f0bd72");
      crown.setAttribute("stroke", "#5b371d");
      crown.setAttribute("stroke-width", "5");
      group.appendChild(crown);
    }
    svg.appendChild(group);
  }
}

function selectSlimeWaveVisual() {
  ensureRatWaveVisuals();
  ensureAdvancedWaveVisuals();
  document.querySelectorAll(".slime-wave").forEach((element) => {
    element.setAttribute("display", "none");
  });

  const active = document.querySelector(`.slime-wave-${game.wave}`);
  if (active) active.setAttribute("display", "block");
}

function applyWaveData() {
  const wave = getCurrentSlime();
  game.monster.maxHp = wave.maxHp;
  game.monster.hp = wave.maxHp;
  game.monster.damage = wave.damage;
  game.monster.attackSpeed = wave.attackSpeed;

  ui.waveTitle.textContent = `WAVE ${game.wave}`;
  const enemyType = wave.isBoss ? "ENEMY · MINI-BOSS" : "ENEMY · " + wave.zone;
  const enemyTypeLabel = document.getElementById("enemy-type-label");
  if (enemyTypeLabel) enemyTypeLabel.textContent = enemyType;
  ui.monsterName.textContent = wave.name;
  ui.monsterDamage.textContent = String(wave.damage);
  ui.monsterAttackSpeed.textContent = `${(wave.attackSpeed / 1000).toFixed(1)}s`;
  selectSlimeWaveVisual();
}

function resetBattle() {
  clearBattleTimers();
  applyWaveData();
  game.player.hp = game.player.maxHp;
  game.battleActive = true;
  ui.status.textContent = game.farmingWave
    ? `WAVE ${game.wave} · FARMING`
    : `WAVE ${game.wave} · AUTO BATTLE`;
  ui.nextWaveButton.hidden = !game.farmingWave || game.wave >= slimeWaves.length;
  ui.autoWaveText.textContent = game.farmingWave
    ? "FARMING · MANUAL ADVANCE"
    : "AUTO ADVANCING";
  updateBattleUi();
  writeLog(game.farmingWave
    ? `${waveLabel()} is being farmed. Win it until you are ready for the next wave.`
    : `${waveLabel()} has begun.`);
}

function waveLabel() {
  const wave = getCurrentSlime();
  return `Wave ${game.wave}: ${wave.name}`;
}

function showDamageNumber(target, amount, isCrit = false) {
  const layer = document.getElementById(target === "player" ? "player-damage-layer" : "monster-damage-layer");
  const combatant = layer ? layer.parentElement : null;
  if (!layer || !combatant) return;

  const number = document.createElement("div");
  number.className = "damage-number" + (isCrit ? " critical" : "");
  number.textContent = (isCrit ? "CRIT " : "") + amount;
  number.style.setProperty("--damage-x", ((Math.random() * 70) - 35).toFixed(1) + "px");
  number.style.setProperty("--damage-rotate", ((Math.random() * 12) - 6).toFixed(1) + "deg");
  layer.appendChild(number);

  combatant.classList.remove("damage-flash", "critical-hit");
  void combatant.offsetWidth;
  combatant.classList.add(isCrit ? "critical-hit" : "damage-flash");

  window.setTimeout(() => number.remove(), isCrit ? 1050 : 800);
  window.setTimeout(() => combatant.classList.remove("damage-flash", "critical-hit"), isCrit ? 330 : 220);
}

function playerAttack() {
  if (!game.battleActive) return;

  const isCrit = Math.random() * 100 < game.player.critChance;
  const baseDamage = Math.max(1, Math.round(game.player.damage));
  const damage = isCrit
    ? Math.max(baseDamage, Math.round(baseDamage * (game.player.critDamage / 100)))
    : baseDamage;

  game.monster.hp = Math.max(0, game.monster.hp - damage);
  showDamageNumber("monster", damage, isCrit);
  updateBattleUi();
  writeLog(`Player attacks for ${damage} damage${isCrit ? " · CRITICAL HIT!" : ""}.`);

  if (game.monster.hp <= 0) {
    finishVictory();
  }
}

function monsterAttack() {
  if (!game.battleActive) return;

  const damage = Math.max(1, Math.round(game.monster.damage));
  game.player.hp = Math.max(0, game.player.hp - damage);
  showDamageNumber("player", damage, false);
  updateBattleUi();
  writeLog(`Monster attacks for ${damage} damage.`);

  if (game.player.hp <= 0) {
    finishDefeat();
  }
}

function startBattle() {
  if (!game.inventoryOpen) {
    showScreen(screens.battle);
  }
  resetBattle();

  game.playerTimer = setInterval(playerAttack, game.player.attackSpeed);
  game.monsterTimer = setInterval(monsterAttack, game.monster.attackSpeed);
}

function addMaterialsForWave(wave) {
  const commonAmount = 1 + Math.floor(Math.random() * 3);
  game.materials.iron += commonAmount;
  game.materials.leather += commonAmount;
  game.materials.wood += commonAmount;
  if (wave >= 4) game.materials.steel += 1 + Math.floor(Math.random() * (wave >= 10 ? 3 : 2));
  if (wave >= 6) game.materials.magicDust += Math.random() < Math.min(0.95, 0.35 + wave * 0.035) ? 1 + (wave >= 15 && Math.random() < 0.35 ? 1 : 0) : 0;
  if (wave >= 10) game.materials.rare += Math.random() < Math.min(0.65, 0.15 + (wave - 10) * 0.035) ? 1 : 0;
  if (wave === slimeWaves.length) {
    game.materials.rare += 2 + Math.floor(Math.random() * 2);
    game.materials.magicDust += 2;
    game.materials.steel += 2;
  }
}

function finishVictory() {
  game.battleActive = false;
  clearBattleTimers();

  const goldReward = Math.round((10 + (game.wave * 2)) * (1 + ((game.player.goldGain || 0) / 100)));
  const xpReward = Math.round((5 + game.wave) * (1 + ((game.player.xpGain || 0) / 100)));

  game.gold += goldReward;
  const materialBefore = { ...game.materials };
  addMaterialsForWave(game.wave);

  let droppedItem = null;
  const dropChance = game.wave === slimeWaves.length ? 1 : Math.min(0.45, 0.08 + game.wave * 0.018);
  if (Math.random() < dropChance) {
    const slot = equipmentSlots[Math.floor(Math.random() * equipmentSlots.length)];
    const tier = Math.random() < Math.min(0.75, 0.08 + game.wave * 0.035) ? getEquipmentTierForWave(game.wave) : 1;
    const rarity = game.wave === slimeWaves.length ? "Legendary" : getCraftRarity(game.wave);
    droppedItem = createEquipmentItem(slot.id, tier, getCraftItemLevel(game.wave, tier), rarity);
    game.inventory.push(droppedItem);
  }

  const materialDrops = Object.entries(game.materials)
    .map(([key, value]) => [key, value - materialBefore[key]])
    .filter(([, value]) => value > 0);
  materialDrops.forEach(([key, value], index) => {
    window.setTimeout(() => showResourceDrop(key, value), index * 70);
  });
  addExperience(xpReward);
  updateGold();
  updateProgressionUi();
  ui.victoryGoldReward.textContent = "Gold +" + goldReward;
  ui.victoryXpReward.textContent = "EXP +" + xpReward;
  ui.victoryMaterialReward.textContent = (materialDrops.length ? materialDrops.map(([key, value]) => formatMaterialName(key) + " +" + value).join(" · ") : "Materials +0") + (droppedItem ? " · ITEM DROP: " + droppedItem.name + " · " + droppedItem.rarity + " · Lv." + droppedItem.level : "");
  writeLog(waveLabel() + " defeated. +" + goldReward + " Gold · +" + xpReward + " XP · " + (materialDrops.length ? materialDrops.map(([key, value]) => formatMaterialName(key) + " +" + value).join(" · ") : "no materials") + (droppedItem ? " · ITEM DROP: " + droppedItem.name + " " + droppedItem.rarity + " Lv." + droppedItem.level : "") + ".");
  saveGame();
  ui.status.textContent = "VICTORY";

  if (game.inventoryOpen) {
    ui.status.textContent = game.farmingWave ? "FARMING · NEXT WAVE READY" : "VICTORY · NEXT WAVE";

    if (game.farmingWave) {
      ui.nextWaveButton.hidden = false;
      ui.autoWaveText.textContent = "FARMING · MANUAL ADVANCE";
      writeLog(waveLabel() + " cleared while Inventory is open. Next Wave is ready when you choose to advance.");
      saveGame();
      return;
    }

    if (game.wave < slimeWaves.length) {
      writeLog(waveLabel() + " cleared while Inventory is open. Next wave starting automatically...");
      window.setTimeout(() => {
        if (game.battleActive || !game.inventoryOpen || game.wave >= slimeWaves.length) return;
        game.wave += 1;
        startBattle();
      }, 1400);
    }
    return;
  }

  ui.victoryEyebrow.textContent = game.wave === slimeWaves.length
    ? "ALL " + slimeWaves.length + " WAVES CLEARED"
    : `WAVE ${game.wave} COMPLETE`;
  ui.continueButton.textContent = "BACK TO MENU";

  if (game.wave < slimeWaves.length) {
    const next = slimeWaves[game.wave];
    ui.nextWaveIcon.textContent = String(game.wave + 1);
    ui.nextWaveEyebrow.textContent = "NEXT BATTLE";
    ui.nextWaveTitle.textContent = `WAVE ${game.wave + 1}`;
    ui.nextWaveDescription.textContent = `${next.name} · HP ${next.maxHp} · Damage ${next.damage}`;
  }

  if (game.farmingWave) {
    ui.status.textContent = "FARMING · NEXT WAVE READY";
    writeLog(waveLabel() + " cleared. Keep farming or press NEXT WAVE when ready.");
    ui.nextWaveButton.hidden = game.wave >= slimeWaves.length;
    saveGame();
    window.setTimeout(() => {
      if (game.battleActive || !game.farmingWave) return;
      startBattle();
    }, 900);
    return;
  }

  if (game.wave < slimeWaves.length) {
    ui.status.textContent = "VICTORY · NEXT WAVE";
    writeLog(waveLabel() + " cleared. Next wave starting automatically...");
    window.setTimeout(() => {
      if (game.battleActive || game.wave >= slimeWaves.length) return;
      game.wave += 1;
      startBattle();
    }, 1400);
    return;
  }

  showScreen(screens.victory);
}

function finishDefeat() {
  const failedWave = game.wave;
  game.battleActive = false;
  clearBattleTimers();

  game.nextWaveTarget = failedWave;
  game.farmingWave = failedWave > 1;
  game.wave = failedWave > 1 ? failedWave - 1 : 1;

  saveGame();

  if (game.farmingWave) {
    writeLog("Wave " + failedWave + " defeated you. Returning to Wave " + game.wave + " to farm until you are ready.");
    ui.status.textContent = "DEFEAT · RETURNING TO FARM";
    window.setTimeout(() => {
      if (game.battleActive) return;
      startBattle();
    }, 900);
    return;
  }

  ui.status.textContent = "DEFEAT";
  showScreen(screens.defeat);
}

function setToggle(button, enabled) {
  button.textContent = enabled ? "ON" : "OFF";
  button.classList.toggle("on", enabled);
  button.classList.toggle("off", !enabled);
}

activateSvgButton(document.getElementById("svg-start-game"), () => {
  startGameFromMenu();
});
ui.characterButton.addEventListener("click", openCharacterScreen);
ui.characterClose.addEventListener("click", closeCharacterScreen);
ui.characterBack.addEventListener("click", closeCharacterScreen);
ui.openInventory.addEventListener("click", openInventoryOverlay);
ui.inventoryClose.addEventListener("click", closeInventoryOverlay);
ui.blacksmithButton.addEventListener("click", openBlacksmithPanel);
ui.blacksmithClose.addEventListener("click", closeBlacksmithPanel);
ui.blacksmithPanel.addEventListener("click", (event) => {
  if (event.target === ui.blacksmithPanel) closeBlacksmithPanel();
});
ui.statsButton.addEventListener("click", openStatsPanel);
ui.statsClose.addEventListener("click", closeStatsPanel);
ui.statsPanel.addEventListener("click", (event) => {
  if (event.target === ui.statsPanel) closeStatsPanel();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && ui.blacksmithPanel.classList.contains("active")) {
    closeBlacksmithPanel();
  }
  if (event.key === "Escape" && ui.statsPanel.classList.contains("active")) {
    closeStatsPanel();
  }
});


activateSvgButton(document.getElementById("svg-open-settings"), openSettingsView);

activateSvgButton(document.getElementById("svg-quit-game"), () => {
  clearBattleTimers();
  game.battleActive = false;
  openQuitView();
});

activateSvgButton(document.getElementById("svg-settings-back"), closeMenuOverlayViews);

activateSvgButton(document.getElementById("svg-cancel-quit"), closeMenuOverlayViews);

activateSvgButton(document.getElementById("svg-confirm-quit"), () => {
  closeMenuOverlayViews();
  try {
    window.close();
  } catch (_) {}
  showScreen(screens.thanks);
});

activateSvgButton(document.getElementById("svg-sound-toggle"), () => {
  game.soundOn = !game.soundOn;
  setSvgToggle("svg-sound-label", "svg-sound-toggle", game.soundOn);
});

activateSvgButton(document.getElementById("svg-music-toggle"), () => {
  game.musicOn = !game.musicOn;
  setSvgToggle("svg-music-label", "svg-music-toggle", game.musicOn);
});

ui.nextWaveButton.addEventListener("click", () => {
  if (!game.farmingWave || game.nextWaveTarget <= game.wave) return;

  game.wave = Math.min(slimeWaves.length, game.nextWaveTarget);
  game.farmingWave = false;
  ui.nextWaveButton.hidden = true;
  saveGame();
  writeLog("Moving to Wave " + game.wave + ". The player has chosen to advance.");
  startBattle();
});

document.getElementById("try-again").addEventListener("click", () => {
  game.farmingWave = false;
  startBattle();
});

document.getElementById("back-to-menu-from-defeat").addEventListener("click", () => {
  clearBattleTimers();
  game.battleActive = false;
  game.farmingWave = false;
  game.wave = 1;
  closeMenuOverlayViews();
  showScreen(screens.menu);
});

document.getElementById("continue-game").addEventListener("click", () => {
  game.farmingWave = false;
  game.wave = 1;
  closeMenuOverlayViews();
  showScreen(screens.menu);
});

document.getElementById("back-to-menu-from-wave2").addEventListener("click", () => {
  clearBattleTimers();
  game.battleActive = false;
  game.wave = 1;
  closeMenuOverlayViews();
  showScreen(screens.menu);
});

document.getElementById("back-to-menu-from-thanks").addEventListener("click", () => {
  closeMenuOverlayViews();
  showScreen(screens.menu);
});

setSvgToggle("svg-sound-label", "svg-sound-toggle", game.soundOn);
function saveGame() {
  const saveData = {
    gold: game.gold,
    exp: game.exp,
    level: game.level,
    materials: { ...game.materials },
    equipment: JSON.parse(JSON.stringify(game.equipment)),
    inventory: JSON.parse(JSON.stringify(game.inventory)),
    wave: game.wave,
    farmingWave: game.farmingWave,
    nextWaveTarget: game.nextWaveTarget,
    soundOn: game.soundOn,
    musicOn: game.musicOn,
    playerHp: game.player.hp,
    monsterHp: game.monster.hp,
    playerDamage: game.player.damage,
    playerAttackSpeed: game.player.attackSpeed,
    playerCritChance: game.player.critChance,
    playerCritDamage: game.player.critDamage,
    playerArmor: game.player.armor,
    playerMagicResist: game.player.magicResist,
    savedAt: Date.now(),
  };

  try {
    localStorage.setItem("beyondTheWavesSave", JSON.stringify(saveData));
  } catch (_) {}
}

function loadGame() {
  try {
    const raw = localStorage.getItem("beyondTheWavesSave");
    if (!raw) return;

    const saveData = JSON.parse(raw);
    game.gold = Number.isFinite(saveData.gold) ? saveData.gold : 0;
    game.exp = Number.isFinite(saveData.exp) ? saveData.exp : 0;
    if (saveData.materials && typeof saveData.materials === "object") {
      Object.keys(game.materials).forEach((key) => {
        game.materials[key] = Math.max(0, Number(saveData.materials[key]) || 0);
      });
    }
    if (saveData.equipment && typeof saveData.equipment === "object") {
      Object.keys(game.equipment).forEach((key) => {
        const item = saveData.equipment[key];
        if (item && Number.isFinite(item.tier) && Number.isFinite(item.level)) {
          const tier = Math.max(1, Math.min(10, Number(item.tier)));
          const maxLevel = equipmentTiers[tier]?.maxLevel || 5;
          game.equipment[key] = { ...item, tier, level: Math.max(1, Math.min(maxLevel, Number(item.level))), name: getEquipmentName(equipmentSlots.find((entry) => entry.id === key), tier) };
        }
      });
    }
    if (Array.isArray(saveData.inventory)) game.inventory = saveData.inventory.map((item) => {
      const slot = equipmentSlots.find((entry) => entry.id === item.slotId);
      if (!slot) return item;
      const tier = Math.max(1, Math.min(10, Number(item.tier) || 1));
      const maxLevel = equipmentTiers[tier]?.maxLevel || 5;
      return { ...item, tier, level: Math.max(1, Math.min(maxLevel, Number(item.level) || 1)), name: getEquipmentName(slot, tier) };
    });
    game.level = Math.max(1, Math.min(100, Number.isFinite(saveData.level) ? saveData.level : 1));
    game.wave = Math.max(1, Math.min(slimeWaves.length, Number.isFinite(saveData.wave) ? saveData.wave : 1));
    game.farmingWave = saveData.farmingWave === true;
    game.nextWaveTarget = Math.max(game.wave, Math.min(
      slimeWaves.length,
      Number.isFinite(saveData.nextWaveTarget) ? saveData.nextWaveTarget : game.wave
    ));
    game.soundOn = saveData.soundOn !== false;
    game.musicOn = saveData.musicOn !== false;

    updatePlayerStatsFromLevel();
    applyWaveData();

    if (Number.isFinite(saveData.monsterHp)) {
      game.monster.hp = Math.max(0, Math.min(game.monster.maxHp, saveData.monsterHp));
    }

    game.player.damage = Number.isFinite(saveData.playerDamage) ? Math.max(0, saveData.playerDamage) : game.player.damage;
    game.player.attackSpeed = Number.isFinite(saveData.playerAttackSpeed) ? Math.max(100, saveData.playerAttackSpeed) : game.player.attackSpeed;
    game.player.critChance = Number.isFinite(saveData.playerCritChance) ? Math.max(0, saveData.playerCritChance) : game.player.critChance;
    game.player.critDamage = Number.isFinite(saveData.playerCritDamage) ? Math.max(0, saveData.playerCritDamage) : game.player.critDamage;
    game.player.armor = Number.isFinite(saveData.playerArmor) ? Math.max(0, saveData.playerArmor) : game.player.armor;
    game.player.magicResist = Number.isFinite(saveData.playerMagicResist) ? Math.max(0, saveData.playerMagicResist) : game.player.magicResist;

    game.player.hp = Number.isFinite(saveData.playerHp)
      ? Math.max(0, Math.min(game.player.maxHp, saveData.playerHp))
      : game.player.maxHp;
  } catch (_) {}
}


// Developer bridge. The actual developer UI lives in dev-panel.js.
// This keeps testing tools isolated from the normal game interface.
window.beyondTheWavesDevApi = {
  getState() {
    return {
      wave: game.wave,
      level: game.level,
      gold: game.gold,
      exp: game.exp,
      player: { ...game.player },
      monster: { ...game.monster },
      battleActive: game.battleActive,
      farmingWave: game.farmingWave,
    };
  },

  getMaxWave() {
    return slimeWaves.length;
  },

  setWave(value) {
    const target = Math.max(1, Math.min(slimeWaves.length, Math.trunc(Number(value) || 1)));
    clearBattleTimers();
    game.wave = target;
    game.farmingWave = false;
    game.nextWaveTarget = target;
    startBattle();
    saveGame();
  },

  skipWave() {
    const target = Math.min(slimeWaves.length, game.wave + 1);
    if (target === game.wave) return;
    this.setWave(target);
  },

  winWave() {
    if (!game.battleActive) startBattle();
    finishVictory();
  },

  loseWave() {
    if (!game.battleActive) startBattle();
    finishDefeat();
  },

  setLevel(value) {
    const target = Math.max(1, Math.min(100, Math.trunc(Number(value) || 1)));
    game.level = target;
    game.exp = getTotalXpForLevel(target);
    updatePlayerStatsFromLevel();
    game.player.hp = game.player.maxHp;
    updateProgressionUi();
    updateBattleUi();
    restartPlayerTimer();
    saveGame();
  },

  setPlayerStat(stat, value) {
    const numericValue = Number(value);
    if (!Number.isFinite(numericValue)) return;

    if (stat === "damage") {
      game.player.damage = Math.max(0, numericValue);
    } else if (stat === "attackSpeed") {
      game.player.attackSpeed = Math.max(100, numericValue);
    } else if (stat === "critChance") {
      game.player.critChance = Math.max(0, numericValue);
    } else if (stat === "critDamage") {
      game.player.critDamage = Math.max(0, numericValue);
    } else if (stat === "armor") {
      game.player.armor = Math.max(0, numericValue);
    } else if (stat === "magicResist") {
      game.player.magicResist = Math.max(0, numericValue);
    }

    updateProgressionUi();
    updateBattleUi();
    restartPlayerTimer();
    saveGame();
  },

  setGold(value) {
    game.gold = Math.max(0, Math.trunc(Number(value) || 0));
    updateGold();
    saveGame();
  },

  setExp(value) {
    const targetExp = Math.max(0, Math.trunc(Number(value) || 0));
    game.exp = targetExp;

    let targetLevel = 1;
    while (targetLevel < 100 && targetExp >= getTotalXpForLevel(targetLevel + 1)) {
      targetLevel += 1;
    }

    game.level = targetLevel;
    updatePlayerStatsFromLevel();
    game.player.hp = Math.min(game.player.hp, game.player.maxHp);
    updateProgressionUi();
    updateBattleUi();
    saveGame();
  },

  fullHeal() {
    game.player.hp = game.player.maxHp;
    updateBattleUi();
    saveGame();
  },

  damagePlayer(amount) {
    game.player.hp = Math.max(0, game.player.hp - Math.max(0, Number(amount) || 0));
    updateBattleUi();
  },

  save() {
    saveGame();
  },

  resetBattle() {
    startBattle();
  },

  resetSave() {
    try {
      localStorage.removeItem("beyondTheWavesSave");
    } catch (_) {}
    window.location.reload();
  },
};

loadGame();
setSvgToggle("svg-sound-label", "svg-sound-toggle", game.soundOn);
setSvgToggle("svg-music-label", "svg-music-toggle", game.musicOn);
updateGold();
updateProgressionUi();
updateBattleUi();

window.setInterval(saveGame, 10000);
window.addEventListener("beforeunload", saveGame);
