const screens = {
  menu: document.getElementById("main-menu"),
  settings: document.getElementById("settings-screen"),
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
  Object.values(screens).forEach((element) => element.classList.remove("active"));
  screen.classList.add("active");
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

document.getElementById("start-game").addEventListener("click", () => {
  game.gold = 0;
  game.exp = 0;
  updateGold();
  startBattle();
});

document.getElementById("open-settings").addEventListener("click", () => {
  showScreen(screens.settings);
});

document.getElementById("back-to-menu-from-settings").addEventListener("click", () => {
  showScreen(screens.menu);
});

document.getElementById("quit-game").addEventListener("click", () => {
  clearBattleTimers();
  game.battleActive = false;
  showScreen(screens.thanks);
});

document.getElementById("try-again").addEventListener("click", () => {
  startBattle();
});

document.getElementById("back-to-menu-from-defeat").addEventListener("click", () => {
  clearBattleTimers();
  game.battleActive = false;
  showScreen(screens.menu);
});

document.getElementById("continue-game").addEventListener("click", () => {
  showScreen(screens.wave2);
});

document.getElementById("back-to-menu-from-wave2").addEventListener("click", () => {
  showScreen(screens.menu);
});

document.getElementById("back-to-menu-from-thanks").addEventListener("click", () => {
  showScreen(screens.menu);
});

document.getElementById("sound-toggle").addEventListener("click", (event) => {
  game.soundOn = !game.soundOn;
  setToggle(event.currentTarget, game.soundOn);
});

document.getElementById("music-toggle").addEventListener("click", (event) => {
  game.musicOn = !game.musicOn;
  setToggle(event.currentTarget, game.musicOn);
});

updateGold();
updateBattleUi();
