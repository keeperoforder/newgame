(() => {
  "use strict";

  const api = window.beyondTheWavesDevApi;
  if (!api) return;

  const panel = document.getElementById("dev-panel");
  const openButton = document.getElementById("dev-open-button");
  const closeButton = document.getElementById("dev-close-button");
  const waveValue = document.getElementById("dev-wave-value");
  const levelValue = document.getElementById("dev-level-value");
  const hpValue = document.getElementById("dev-hp-value");
  const damageValue = document.getElementById("dev-damage-value");
  const attackSpeedValue = document.getElementById("dev-attack-speed-value");
  const goldValue = document.getElementById("dev-gold-value");
  const expValue = document.getElementById("dev-exp-value");
  const message = document.getElementById("dev-message");

  function state() {
    return api.getState();
  }

  function refresh() {
    const current = state();
    waveValue.textContent = String(current.wave);
    levelValue.textContent = String(current.level);
    hpValue.textContent = String(current.player.hp) + " / " + String(current.player.maxHp);
    damageValue.textContent = String(current.player.damage);
    attackSpeedValue.textContent = (current.player.attackSpeed / 1000).toFixed(2) + "s";
    goldValue.textContent = String(current.gold);
    expValue.textContent = String(current.exp);
  }

  function notify(text) {
    message.textContent = text;
    refresh();
  }

  function open() {
    panel.classList.add("active");
    panel.setAttribute("aria-hidden", "false");
    refresh();
  }

  function close() {
    panel.classList.remove("active");
    panel.setAttribute("aria-hidden", "true");
  }

  function bind(id, handler) {
    document.getElementById(id).addEventListener("click", () => {
      handler();
      refresh();
    });
  }

  openButton.addEventListener("click", open);
  closeButton.addEventListener("click", close);

  panel.addEventListener("click", (event) => {
    if (event.target === panel) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "F2") {
      event.preventDefault();
      panel.classList.contains("active") ? close() : open();
    }

    if (event.key === "Escape" && panel.classList.contains("active")) {
      close();
    }
  });

  bind("dev-wave-minus", () => {
    const current = state().wave;
    api.setWave(Math.max(1, current - 1));
    notify("Wave changed.");
  });

  bind("dev-wave-plus", () => {
    const current = state().wave;
    api.setWave(Math.min(api.getMaxWave(), current + 1));
    notify("Wave changed.");
  });

  bind("dev-set-wave", () => {
    const value = Number(document.getElementById("dev-wave-input").value);
    if (!Number.isInteger(value)) return notify("Enter a whole wave number.");
    api.setWave(value);
    notify("Wave set to " + Math.max(1, Math.min(api.getMaxWave(), value)) + ".");
  });

  bind("dev-skip-wave", () => {
    api.skipWave();
    notify("Skipped to the next wave.");
  });

  bind("dev-win-wave", () => {
    api.winWave();
    notify("Current wave forced to victory.");
  });

  bind("dev-lose-wave", () => {
    api.loseWave();
    notify("Current wave forced to defeat.");
  });

  bind("dev-level-minus", () => api.setLevel(state().level - 1));
  bind("dev-level-plus", () => api.setLevel(state().level + 1));

  bind("dev-set-level", () => {
    const value = Number(document.getElementById("dev-level-input").value);
    if (!Number.isInteger(value)) return notify("Enter a whole level number.");
    api.setLevel(value);
    notify("Level changed.");
  });

  bind("dev-full-heal", () => {
    api.fullHeal();
    notify("Player fully healed.");
  });

  bind("dev-damage-player", () => {
    const value = Number(document.getElementById("dev-damage-input").value);
    api.damagePlayer(Number.isFinite(value) && value > 0 ? value : 10);
    notify("Player damaged.");
  });

  bind("dev-set-damage", () => {
    const value = Number(document.getElementById("dev-damage-stat-input").value);
    if (!Number.isFinite(value)) return notify("Enter a damage value.");
    api.setPlayerStat("damage", value);
    notify("Damage changed.");
  });

  bind("dev-set-attack-speed", () => {
    const value = Number(document.getElementById("dev-attack-speed-input").value);
    if (!Number.isFinite(value) || value <= 0) return notify("Enter attack speed in seconds.");
    api.setPlayerStat("attackSpeed", value * 1000);
    notify("Attack speed changed.");
  });

  bind("dev-set-gold", () => {
    const value = Number(document.getElementById("dev-gold-input").value);
    if (!Number.isFinite(value)) return notify("Enter a gold value.");
    api.setGold(value);
    notify("Gold changed.");
  });

  bind("dev-set-exp", () => {
    const value = Number(document.getElementById("dev-exp-input").value);
    if (!Number.isFinite(value)) return notify("Enter an XP value.");
    api.setExp(value);
    notify("XP changed.");
  });

  bind("dev-save-now", () => {
    api.save();
    notify("Game saved.");
  });

  bind("dev-reset-battle", () => {
    api.resetBattle();
    notify("Battle reset.");
  });

  bind("dev-reset-save", () => {
    if (!window.confirm("Reset the entire local save?")) return;
    api.resetSave();
  });

  refresh();
})();