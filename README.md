# D35E - Pathfinder 1e Style Sheet

Alternative Actor sheets for **D35E 3.1.0 / Foundry VTT 13**.

## v0.2.0

The module now uses **its own actor HTML/Handlebars templates** instead of placing PF1-like CSS over the original D35E sheet markup.

The goal is to reproduce the PF1 actor-sheet organization while keeping D35E as the rules/data engine.

## Architecture

- Subclasses the native D35E Character, NPC and Monster sheets.
- Overrides the sheet template paths with module templates.
- Keeps D35E data paths and native sheet listeners.
- Reuses D35E functional partials inside PF1-style tab containers where that preserves compatibility.
- Adds custom PF1-style Summary layouts for characters and NPCs/monsters.
- CSS is scoped to `.d35e-pf1` so the stock D35E sheets are not changed.
- No PF1 system installation is required.

## Included sheets

- Character — PF1 Style
- NPC — PF1 Style
- Monster — PF1 Style

## Tabs

Character and NPC sheets provide a PF1-style tab bar for Summary, Attributes, Combat, Inventory, Features, Skills, Buffs, Spells when applicable, Biography, Notes and Settings.

## Installation

Manifest URL:

`https://raw.githubusercontent.com/MestreWellDark/D35E-PF1-Sheet/main/module.json`

Or extract the module into `FoundryVTT/Data/modules/`, restart Foundry and enable **D35E - Pathfinder 1e Style Sheet** in the world.

If an Actor has a sheet explicitly saved, open **Sheet Configuration** and select the PF1-style sheet.

## Compatibility

- Foundry VTT 13
- D35E 3.1.0

## Important

This is a UI compatibility layer for D35E. D35E remains responsible for calculations, embedded items, rolls, progression, spellbooks and Actor data.
