# illenium-appearance

A replacement for clothing resources for various frameworks

<div align='center'><h1><a href='https://docs.illenium.dev/free-resources/illenium-appearance/installation/'>Documentation</a></h3></div>
<br>

<img src="https://i.ibb.co/fVR2hCJX/Ekran-g-r-nt-s-2025-06-11-211556.png" alt="" />
<img src="https://i.ibb.co/RpyrN4p0/Ekran-g-r-nt-s-2025-06-11-211604.png" alt="" />
<img src="https://i.ibb.co/0pbm1Rt8/Ekran-g-r-nt-s-2025-06-11-211612.png" alt="" />

Discord: https://discord.gg/bitline
Tebex: https://bitline.tebex.io

**Note:** Do **NOT** use the `main` branch as it will most likely be broken for you. NO SUPPORT WILL BE PROVIDED IF YOU USE IT. Only use the [latest release](https://github.com/iLLeniumStudios/illenium-appearance/releases/latest)

## What's New in the NEX Redesign

A full visual + UX overhaul of the appearance menu. Everything below is
shipped on top of the original feature set — nothing has been removed.

### Look & Feel
- **Brand-new modern dark UI** with layered panels, smooth open/close
  transitions, and a soft accent glow on the major chrome.
- **Pick your own theme color.** Set the `currentTheme` in
  `shared/theme.lua` and the active tabs, primary buttons, sliders, panel
  borders, and glow all track your server's brand color automatically.
  Neutral themes (black / white / gray) cleanly fall back to the original
  dark palette.
- **Custom ped silhouettes** rendered to fit the new card layout, and the
  Inter typeface used across the whole UI for a cleaner read.

### Layout
- **Clothing tab cleaned up** — only the items players think of as
  clothing live here: Jacket, Undershirt, Arms & Gloves, Pants, Shoes,
  Decals.
- **Accessories tab now holds the rest** — Masks, Scarf & Chains, Body
  Armor, Bags, Hats, Glasses, Earrings, Watches, Bracelets — everything
  worn *on* the outfit in one place.
- **Characters section redesigned** with freemode cards plus a custom ped
  picker that lists the full GTA ped roster.
- **Import / Export character data** as JSON or XML — save a look to a
  file, load it on another character, share it with friends.

### Camera
- **Flattering full-body framing.** The menu opens on a head-to-toe shot
  of the ped, offset slightly to the right of the screen so the menu
  panels never cover the player, with a gentle downward angle.

### Performance & Polish
- **Save AND Cancel feel instant.** No more half-second freeze when you
  back out of the menu — both close with the same snappy animation.
- **Scales properly to every resolution.** 720p, 1080p, 1440p, ultrawide
  1440p, 4K, and 8K all render the UI at the right on-screen size — no
  more microscopic menus on 4K or oversized chrome on smaller monitors.
- **Polished interactions everywhere**: segmented number steppers,
  layered dropdowns that match the rest of the design, inline scrollbars
  that don't shift the layout, hover/active states with real visual
  feedback, and a redesigned save/load modal.

## Supported Frameworks

- qb-core
- ESX
- ox_core

## Dependencies

- [qb-core](https://github.com/qbcore-framework/qb-core) (Latest) (Only for qb-core based servers)
- [es_extended](https://github.com/esx-framework/esx-legacy) (Latest) (Only for ESX based servers)
- [ox_core](https://github.com/overextended/ox_core) (experimental) (Only for ox_core based servers)
- [ox_lib](https://github.com/overextended/ox_lib)
- [qb-target](https://github.com/BerkieBb/qb-target) (Optional) (Only for qb-core based servers)

## Features

- Everything from standalone fivem-appearance
- UI from OX Lib
- Player outfits
- Rank based Clothing Rooms for Jobs / Gangs
- Job / Gang locked Stores
- Tattoo's Support
- Hair Textures
- Polyzone Support
- Ped Menu command (/pedmenu) (Configurable)
- Reload Skin command (/reloadskin)
- Improved code quality
- Plastic Surgeons
- qb-target Support
- Skin migration support (qb-clothing / old fivem-appearance / esx_skin)
- Player specific outfit locations (Restricted via CitizenID)
- Makeup Secondary Color
- Blacklist / Limit Components & Props to certain Jobs / Gangs / CitizenIDs / ACEs (Allows you to have VIP clothing on your Server)
- Blacklist / Limit Peds to certain Jobs / Gangs / CitizenIDs / ACEs
- Persist Job / Gang Clothes on reconnects / logout
- Themes Support (Default & QBCore provided out of the box)
- Disable Components / Props Entirely (Clothing as items support)

## Documentation

Read the docs here: https://docs.illenium.dev

## Credits
- Original Script: https://github.com/pedr0fontoura/fivem-appearance
- Tattoo's Support: https://github.com/franfdezmorales/fivem-appearance
- Last Maintained Fork for QB: https://github.com/mirrox1337/aj-fivem-appearance
