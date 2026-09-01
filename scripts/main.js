import { ActorSheetPFCharacter } from "/systems/D35E/module/actor/sheets/character.js";
import { ActorSheetPFNPC } from "/systems/D35E/module/actor/sheets/npc.js";
import { ActorSheetPFNPCMonster } from "/systems/D35E/module/actor/sheets/npc-monster.js";

const MODULE_ID = "d35e-pf1-sheet";
const MODULE_ROOT = `modules/${MODULE_ID}`;

function mergeOptions(base, extra) {
  return foundry.utils.mergeObject(base, extra, { inplace: false });
}

class D35EPF1CharacterSheet extends ActorSheetPFCharacter {
  static get defaultOptions() {
    return mergeOptions(super.defaultOptions, {
      classes: [...super.defaultOptions.classes, "d35e-pf1", "pf1-character"],
      width: 820,
      height: 860,
      resizable: true
    });
  }

  get template() {
    if (!game.user.isGM && this.actor.limited) return "systems/D35E/templates/actors/limited-sheet.html";
    return `${MODULE_ROOT}/templates/actors/character-sheet.html`;
  }
}

class D35EPF1NPCSheet extends ActorSheetPFNPC {
  static get defaultOptions() {
    return mergeOptions(super.defaultOptions, {
      classes: [...super.defaultOptions.classes, "d35e-pf1", "pf1-npc"],
      width: 900,
      height: 840,
      resizable: true
    });
  }

  get template() {
    if (!game.user.isGM && this.actor.limited) return "systems/D35E/templates/actors/limited-sheet.html";
    return `${MODULE_ROOT}/templates/actors/npc-sheet.html`;
  }
}

class D35EPF1MonsterSheet extends ActorSheetPFNPCMonster {
  static get defaultOptions() {
    return mergeOptions(super.defaultOptions, {
      classes: ["D35E", "sheet", "actor", "npc", "monster", "d35e-pf1", "pf1-monster"],
      width: 900,
      height: 840,
      resizable: true
    });
  }

  get template() {
    if (!game.user.isGM && this.actor.limited) return "systems/D35E/templates/actors/limited-sheet.html";
    return `${MODULE_ROOT}/templates/actors/npc-sheet.html`;
  }
}

Hooks.once("init", async () => {
  if (game.system.id !== "D35E") return;

  await foundry.applications.handlebars.loadTemplates([
    `${MODULE_ROOT}/templates/actors/parts/item-drawer.html`,
    `${MODULE_ROOT}/templates/actors/parts/npc-summary.html`,
    `${MODULE_ROOT}/templates/actors/parts/attributes-pf1.html`,
    `${MODULE_ROOT}/templates/actors/parts/combat-pf1.html`,
    `${MODULE_ROOT}/templates/actors/parts/inventory-pf1.html`,
    `${MODULE_ROOT}/templates/actors/parts/features-pf1.html`,
    `${MODULE_ROOT}/templates/actors/parts/skills-pf1.html`,
    `${MODULE_ROOT}/templates/actors/parts/buffs-pf1.html`,
    `${MODULE_ROOT}/templates/actors/parts/spellbook-pf1.html`
  ]);

  const Actors = foundry.documents.collections.Actors;
  Actors.registerSheet(MODULE_ID, D35EPF1CharacterSheet, {
    types: ["character"],
    makeDefault: true,
    label: game.i18n.localize("D35EPF1.CharacterSheet")
  });
  Actors.registerSheet(MODULE_ID, D35EPF1NPCSheet, {
    types: ["npc"],
    makeDefault: true,
    label: game.i18n.localize("D35EPF1.NPCSheet")
  });
  Actors.registerSheet(MODULE_ID, D35EPF1MonsterSheet, {
    types: ["npc"],
    makeDefault: false,
    label: game.i18n.localize("D35EPF1.MonsterSheet")
  });
});

Hooks.on("renderActorSheet", (app, html) => {
  if (!(app instanceof D35EPF1CharacterSheet || app instanceof D35EPF1NPCSheet || app instanceof D35EPF1MonsterSheet)) return;
  const root = html?.nodeType === 1 ? html : html?.[0] ?? html;
  root?.classList?.add("d35e-pf1-rendered");

  root?.querySelectorAll?.(".pf1-search-filter").forEach((input) => {
    input.addEventListener("input", (event) => {
      const query = String(event.currentTarget.value ?? "").trim().toLowerCase();
      const tab = event.currentTarget.closest(".tab");
      if (!tab) return;
      tab.querySelectorAll(".item-list > .item, .skills-list > .skill, .skills-list > .sub-skill").forEach((row) => {
        const text = row.textContent?.toLowerCase() ?? "";
        row.style.display = !query || text.includes(query) ? "" : "none";
      });
    });
  });
});

Hooks.once("ready", () => {
  if (game.system.id === "D35E") console.info(`${MODULE_ID} | ${game.i18n.localize("D35EPF1.Ready")}`);
});
