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

const game = {
  gold: 0,
  exp: 0,
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
  playerHpText: document.getElementById("player-hp-text"),
  playerHpBar: document.getElementById("player-hp-bar"),
  monsterHpText: document.getElementById("monster-hp-text"),
  monsterHpBar: document.getElementById("monster-hp-bar"),
  status: document.getElementById("battle-status"),
  log: document.getElementById("combat-log"),
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

function resetBattle() {
  clearBattleTimers();
  game.player.hp = game.player.maxHp;
  game.monster.hp = game.monster.maxHp;
  game.battleActive = true;
  ui.status.textContent = "AUTO BATTLE";
  updateBattleUi();
  writeLog("Battle started...");
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

  game.gold += 10;
  game.exp += 5;
  updateGold();
  ui.status.textContent = "VICTORY";
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
  closeMenuOverlayViews();
  showScreen(screens.menu);
});

document.getElementById("continue-game").addEventListener("click", () => {
  showScreen(screens.wave2);
});

document.getElementById("back-to-menu-from-wave2").addEventListener("click", () => {
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
