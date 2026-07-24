Framework = {}

function Framework.ESX()
    local state = GetResourceState("es_extended")
    if state == "missing" then return false end

    while GetResourceState("es_extended") ~= "started" do
        Wait(50)
    end

    return true
end

function Framework.QBCore()
    return GetResourceState("qb-core") ~= "missing"
end

function Framework.Ox()
    return GetResourceState("ox_core") ~= "missing"
end
