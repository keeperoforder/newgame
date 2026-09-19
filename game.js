const screens = {
  menu: document.getElementById("main-menu"),
  settings: document.getElementById("settings-screen"),
  quit: document.getElementById("quit-confirmation"),
  battle: document.getElementById("battle-screen"),
  victory: document.getElementById("victory-screen"),
  defeat: document.getElementById("defeat-screen"),
  wave2: document.getElementById("wave2-screen"),
  thanks: document.getElementById("thanks-screen"),
};

const slimeWaves = [
  { name: "Mire Slime", maxHp: 50, damage: 5, attackSpeed: 2000 },
  { name: "Briar Slime", maxHp: 80, damage: 8, attackSpeed: 1950 },
  { name: "Horned Slime", maxHp: 120, damage: 12, attackSpeed: 1900 },
  { name: "Reefguard Slime", maxHp: 170, damage: 17, attackSpeed: 1850 },
  { name: "Ironhide Slime", maxHp: 230, damage: 23, attackSpeed: 1800 },
  { name: "Crystal Slime", maxHp: 300, damage: 30, attackSpeed: 1750 },
  { name: "Abyss Slime", maxHp: 380, damage: 38, attackSpeed: 1700 },
  { name: "Dread Slime", maxHp: 470, damage: 47, attackSpeed: 1650 },
  { name: "Void Slime", maxHp: 500, damage: 50, attackSpeed: 1600 },
  { name: "Slime Sovereign · MINI-BOSS", maxHp: 5000, damage: 500, attackSpeed: 1500 },
];

const game = {
  gold: 0,
  exp: 0,
  level: 1,
  wave: 1,
  farmingWave: false,
  nextWaveTarget: 1,
  soundOn: true,
  musicOn: true,
  player: { maxHp: 100, hp: 100, damage: 10, attackSpeed: 1500, critChance: 5, critDamage: 150, armor: 0, magicResist: 0 },
  monster: { maxHp: 50, hp: 50, damage: 5, attackSpeed: 2000 },
  playerTimer: null,
  monsterTimer: null,
  battleActive: false,
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
  log: document.getElementById("combat-log"),
  victoryEyebrow: document.getElementById("victory-eyebrow"),
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
}
function updateStatsUi() {
  ui.statsHp.textContent = String(game.player.maxHp);
  ui.statsDamage.textContent = String(game.player.damage);
  ui.statsAttackSpeed.textContent = (game.player.attackSpeed / 1000).toFixed(2) + "s";
  ui.statsCritChance.textContent = String(game.player.critChance) + "%";
  ui.statsCritDamage.textContent = String(game.player.critDamage) + "%";
  ui.statsArmor.textContent = String(game.player.armor);
  ui.statsMagicResist.textContent = String(game.player.magicResist);
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
  game.player.maxHp = 100 + ((game.level - 1) * 10);
  game.player.damage = 10 + ((game.level - 1) * 2);
  game.player.attackSpeed = Math.max(850, 1500 - ((game.level - 1) * 7));
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

function selectSlimeWaveVisual() {
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

function playerAttack() {
  if (!game.battleActive) return;

  game.monster.hp = Math.max(0, game.monster.hp - game.player.damage);
  updateBattleUi();
  writeLog(`Player attacks for ${game.player.damage} damage.`);

  if (game.monster.hp <= 0) {
    finishVictory();
  }
}

function monsterAttack() {
  if (!game.battleActive) return;

  game.player.hp = Math.max(0, game.player.hp - game.monster.damage);
  updateBattleUi();
  writeLog(`Monster attacks for ${game.monster.damage} damage.`);

  if (game.player.hp <= 0) {
    finishDefeat();
  }
}

function startBattle() {
  showScreen(screens.battle);
  resetBattle();

  game.playerTimer = setInterval(playerAttack, game.player.attackSpeed);
  game.monsterTimer = setInterval(monsterAttack, game.monster.attackSpeed);
}

function finishVictory() {
  game.battleActive = false;
  clearBattleTimers();

  const goldReward = 10 + (game.wave * 2);
  const xpReward = 5 + game.wave;

  game.gold += goldReward;
  addExperience(xpReward);
  updateGold();
  updateProgressionUi();
  writeLog(waveLabel() + " defeated. +" + goldReward + " Gold · +" + xpReward + " XP.");
  saveGame();
  ui.status.textContent = "VICTORY";

  ui.victoryEyebrow.textContent = game.wave === slimeWaves.length
    ? "ALL 10 WAVES CLEARED"
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
ui.statsButton.addEventListener("click", openStatsPanel);
ui.statsClose.addEventListener("click", closeStatsPanel);
ui.statsPanel.addEventListener("click", (event) => {
  if (event.target === ui.statsPanel) closeStatsPanel();
});
document.addEventListener("keydown", (event) => {
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
