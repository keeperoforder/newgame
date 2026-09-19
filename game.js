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
  wave: 1,
  soundOn: true,
  musicOn: true,
  player: { maxHp: 100, hp: 100, damage: 10, attackSpeed: 1500 },
  monster: { maxHp: 50, hp: 50, damage: 5, attackSpeed: 2000 },
  playerTimer: null,
  monsterTimer: null,
  battleActive: false,
};

const ui = {
  gold: document.getElementById("gold-value"),
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
  ui.status.textContent = `WAVE ${game.wave} · AUTO BATTLE`;
  updateBattleUi();
  writeLog(`${waveLabel()} has begun.`);
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

  game.gold += 10 + (game.wave * 2);
  game.exp += 5 + game.wave;
  updateGold();
  ui.status.textContent = "VICTORY";

  ui.victoryEyebrow.textContent = game.wave === slimeWaves.length
    ? "ALL 10 WAVES CLEARED"
    : `WAVE ${game.wave} COMPLETE`;
  ui.continueButton.textContent = game.wave === slimeWaves.length ? "BACK TO MENU" : "NEXT WAVE";

  if (game.wave < slimeWaves.length) {
    const next = slimeWaves[game.wave];
    ui.nextWaveIcon.textContent = String(game.wave + 1);
    ui.nextWaveEyebrow.textContent = "NEXT BATTLE";
    ui.nextWaveTitle.textContent = `WAVE ${game.wave + 1}`;
    ui.nextWaveDescription.textContent = `${next.name} · HP ${next.maxHp} · Damage ${next.damage}`;
  }

  showScreen(screens.victory);
}

function finishDefeat() {
  game.battleActive = false;
  clearBattleTimers();
  ui.status.textContent = "DEFEAT";
  showScreen(screens.defeat);
}

function setToggle(button, enabled) {
  button.textContent = enabled ? "ON" : "OFF";
  button.classList.toggle("on", enabled);
  button.classList.toggle("off", !enabled);
}

activateSvgButton(document.getElementById("svg-start-game"), () => {
  game.gold = 0;
  game.exp = 0;
  game.wave = 1;
  updateGold();
  startGameFromMenu();
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

document.getElementById("try-again").addEventListener("click", () => {
  startBattle();
});

document.getElementById("back-to-menu-from-defeat").addEventListener("click", () => {
  clearBattleTimers();
  game.battleActive = false;
  game.wave = 1;
  closeMenuOverlayViews();
  showScreen(screens.menu);
});

document.getElementById("continue-game").addEventListener("click", () => {
  if (game.wave >= slimeWaves.length) {
    game.wave = 1;
    closeMenuOverlayViews();
    showScreen(screens.menu);
    return;
  }

  game.wave += 1;
  startBattle();
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
setSvgToggle("svg-music-label", "svg-music-toggle", game.musicOn);

updateGold();
updateBattleUi();
