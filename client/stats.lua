local stats = nil

local function ResetRechargeMultipliers()
    SetPlayerHealthRechargeMultiplier(cache.playerId, 0.0)
    SetPlayerHealthRechargeLimit(cache.playerId, 0.0)
end

function BackupPlayerStats()
    stats = {
        health = GetEntityHealth(cache.ped),
        armour = GetPedArmour(cache.ped)
    }
end

function RestorePlayerStats()
    -- Snapshot and clear `stats` upfront. exitPlayerCustomization now runs
    -- this on a thread so the 1s safety Wait doesn't block save/cancel. If
    -- the player re-enters the menu within that 1s window, BackupPlayerStats
    -- can overwrite `stats` mid-wait — capturing it locally first prevents
    -- the wakeup from restoring the wrong (new) snapshot.
    local snapshot = stats
    stats = nil

    if snapshot then
        SetEntityMaxHealth(cache.ped, 200)
        Wait(1000) -- safety delay so SetEntityMaxHealth lands before SetEntityHealth
        SetEntityHealth(cache.ped, snapshot.health)
        SetPedArmour(cache.ped, snapshot.armour)
        ResetRechargeMultipliers()
        return
    end

    -- If no stats are backed up, restore from the framework
    Framework.RestorePlayerArmour()
end
