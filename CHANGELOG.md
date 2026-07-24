# Changelog

All notable changes to **illenium-appearance** are documented here. The top entry
is what gets published to the GitHub release and the Discord announcement, so keep
it curated. Format follows [Keep a Changelog](https://keepachangelog.com/) and this
project adheres to [Semantic Versioning](https://semver.org/).

> How releases work: bump `version` in `fxmanifest.lua`, add a matching
> `## vX.Y.Z` section at the top of this file, then push to `main`. The release
> workflow tags the version, pulls these notes via `detect-version-bump.mjs`
> (`curatedNotes()`), and posts them to Discord. With no matching section it falls
> back to auto-generated notes parsed from commit messages.

## v1.1.7

Full visual overhaul of the appearance editor.

### Changed
- Reworked the whole editor UI — wider panel, cleaner layered controls (steppers, colour grids, sliders), lighter typography, and a refined tab rail with aligned icon + label and a subtle active highlight.
- Accent theming reworked: the accent colour now tints the **foreground** (icons + text) while panels stay neutral dark, instead of washing the backgrounds. Default accent is now cyan — change it in `shared/theme.lua` (`primaryBackground`).
- All icons migrated to Iconify (Material Design Icons), bundled offline (no runtime icon API calls).
- The save button is now **"Save Changes"** with a subtle hover shine + glow effect (no colour fill).
- Tab renamed: **Finishing → Props**.

### Added
- Redesigned import/export as a single-column **"Character Data"** panel: header with close button, an Import/Export switch, a JSON/XML toggle, a monospace data editor, and contextual actions.

## v1.1.6

Baseline changelog entry for the current shipped release.
A flexible player customization script for FiveM servers (NEX Development redesign
of the snakewiz / iLLeniumStudios appearance script).

_Curated, per-version notes are tracked here from this release onward — add a new
`## vX.Y.Z` section above this one on each version bump._
