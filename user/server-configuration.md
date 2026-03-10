---
title: Server Configuration Overview
parent: For Users
---

# Server Configuration Overview

## Every game is a server

V Rising has no separate multiplayer mode. Whether you are playing solo, hosting a LAN game for friends, or running a public dedicated server, the game always starts a server process. The difference is only where that process runs:

- **Private / LAN game:** the server runs inside the game client on your PC. Settings are configured through the in-game UI.
- **Dedicated server:** the server runs as a standalone process (via `VRisingServer.exe`), usually on a separate machine. Settings are configured through JSON files.

Both modes use the same underlying settings system. Understanding one helps with the other.

## The two settings files

Server behaviour is split across two JSON files:

**`ServerHostSettings.json`** controls server infrastructure: things that affect how the server runs, not what happens inside the game world.
- Network (port, name, password, max players)
- Saves (auto-save interval, slot count)
- RCON remote console
- AFK kick, API, admin list

**`ServerGameSettings.json`** controls gameplay rules: everything that affects the experience inside the world.
- Game mode, PvP rules, castle damage
- Loot rates, crafting speed, resource yields
- Vampire and enemy stat multipliers
- Castle limits, servant limits, build height
- PvP and raid scheduling windows

### File locations

**Dedicated server** settings live within the dedicated server's own installation folder:

```
C:\Program Files (x86)\Steam\steamapps\common\VRisingDedicatedServer\VRisingServer_Data\StreamingAssets\Settings\
```

The dedicated server reads only from within its own directory — files outside that folder have no effect on it.

**Client-hosted servers** (private and LAN games run through the game client) use a separate override folder in AppData:

```
%USERPROFILE%\AppData\LocalLow\Stunlock Studios\VRisingServer\Settings\
```

This folder may be empty or only contain `adminlist.txt` and `banlist.txt` if you have not customised anything yet. That is normal — the server falls back to its built-in defaults for any file or key that is missing.

**Private game presets** configured through the in-game UI are stored as generated-name files under:

```
%USERPROFILE%\AppData\LocalLow\Stunlock Studios\VRising\ServerSettingsPresets\
```

## You only need to include what you want to change

Neither file needs to contain every setting. The server reads whatever keys are present and uses built-in defaults for anything missing. A minimal `ServerGameSettings.json` might be just a few lines:

```json
{
  "GameModeType": "PvE",
  "ClanSize": 6,
  "CraftRateModifier": 2.0
}
```

This is the safest way to manage settings. Your file stays small, diffs are readable, and game updates that add new settings fall back to defaults automatically.

## How difficulty presets work

`ServerHostSettings.json` has a `GameDifficultyPreset` field that acts as a bundle shortcut. Setting it to a named preset (for example `"Relaxed"` or `"Brutal"`) overrides a collection of `ServerGameSettings.json` values, including blood drain rate, enemy health and damage, loot rates, and sun damage.

The preset is applied at server startup. Any individual setting you explicitly include in `ServerGameSettings.json` will override the preset's value for that field, so you can still customise from a preset base:

```json
// ServerHostSettings.json
{ "GameDifficultyPreset": "Brutal" }

// ServerGameSettings.json - override just one value from Brutal
{ "BloodDrainModifier": 1.5 }
```

`GameDifficulty` (in `ServerGameSettings.json`) is a separate, narrower setting that controls boss behaviour complexity only. It is not the same as the preset.

## See also

- [Server Host Settings](/user/server-host-settings): full reference for `ServerHostSettings.json`
- [Server Game Settings](/user/server-game-settings): full reference for `ServerGameSettings.json`
