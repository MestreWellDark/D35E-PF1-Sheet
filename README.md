# D35E - Pathfinder 1e Style Sheet

Alternative Actor sheets for **D35E 3.1.0 / Foundry VTT 13**.

## Design

The module intentionally **does not copy PF1 system logic or data paths**. It subclasses the D35E sheets, keeps D35E's templates/listeners/data model, and applies a PF1-inspired presentation layer. This avoids breaking attacks, items, spells, skills, drag/drop, compendium integrations, level progression, and future D35E data updates.

## Included sheets

- Character: PF1 Style (default while module is active)
- NPC: PF1 Style (default while module is active)
- Monster: PF1 Style (optional via Sheet Configuration)

## Install

Extract `D35E-PF1-Sheet` into `FoundryVTT/Data/modules/`, restart Foundry, enable **D35E - Pathfinder 1e Style Sheet** in the world.

If an existing Actor has a sheet explicitly saved, open **Sheet Configuration** and choose the PF1 Style sheet.

## Compatibility

- Foundry VTT 13
- D35E 3.1.0

## Technical notes

- Uses Foundry v13 `Actors.registerSheet` API.
- Imports the D35E sheet classes from `/systems/D35E/module/actor/sheets/`.
- Uses D35E's own actor templates (`systems/D35E/templates/...`).
- CSS is scoped under `.d35e-pf1`, so ordinary D35E sheets are not restyled.
- No PF1 system installation is required.
