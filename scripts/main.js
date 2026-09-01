import { ActorSheetPFCharacter } from "/systems/D35E/module/actor/sheets/character.js";
import { ActorSheetPFNPC } from "/systems/D35E/module/actor/sheets/npc.js";
import { ActorSheetPFNPCMonster } from "/systems/D35E/module/actor/sheets/npc-monster.js";

const MODULE_ID = "d35e-pf1-sheet";

function mergeOptions(base, extra) {
  return foundry.utils.mergeObject(base, extra, { inplace: false });
}

class D35EPF1CharacterSheet extends ActorSheetPFCharacter {
  static get defaultOptions() {
    return mergeOptions(super.defaultOptions, {
      classes: [...super.defaultOptions.classes, "d35e-pf1", "pf1-character"],
      width: 960,
      height: 860,
      resizable: true
    });
  }
}

class D35EPF1NPCSheet extends ActorSheetPFNPC {
  static get defaultOptions() {
    return mergeOptions(super.defaultOptions, {
      classes: [...super.defaultOptions.classes, "d35e-pf1", "pf1-npc"],
      width: 960,
      height: 820,
      resizable: true
    });
  }
}

class D35EPF1MonsterSheet extends ActorSheetPFNPCMonster {
  static get defaultOptions() {
    return mergeOptions(super.defaultOptions, {
      classes: [...super.defaultOptions.classes, "d35e-pf1", "pf1-monster"],
      width: 960,
      height: 820,
      resizable: true
    });
  }
}

Hooks.once("init", () => {
  if (game.system.id !== "D35E") return;

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
    types: ["npc", "character"],
    makeDefault: false,
    label: game.i18n.localize("D35EPF1.MonsterSheet")
  });
});

Hooks.on("renderActorSheet", (app, html) => {
  if (!(app instanceof D35EPF1CharacterSheet || app instanceof D35EPF1NPCSheet || app instanceof D35EPF1MonsterSheet)) return;
  const root = html?.nodeType === 1 ? html : html?.[0];
  root?.classList?.add("d35e-pf1-rendered");
});

Hooks.once("ready", () => {
  if (game.system.id === "D35E") console.info(`${MODULE_ID} | ${game.i18n.localize("D35EPF1.Ready")}`);
});
