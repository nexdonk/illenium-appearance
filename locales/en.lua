Locales["en"] = {
    UI = {
        modal = {
            save = {
                title = "Lock in this look?",
                description = "Your character will step out wearing exactly this."
            },
            exit = {
                title = "Walk away from changes?",
                description = "Anything you touched in here gets rolled back."
            },
            accept = "Yes, do it",
            decline = "Not yet"
        },
        ped = {
            title = "Identity",
            model = "Body type"
        },
        headBlend = {
            title = "Heritage",
            shape = {
                title = "Face shape",
                firstOption = "Parent A",
                secondOption = "Parent B",
                mix = "Blend"
            },
            skin = {
                title = "Skin tone",
                firstOption = "Parent A",
                secondOption = "Parent B",
                mix = "Blend"
            },
            race = {
                title = "Ancestry",
                shape = "Face influence",
                skin = "Skin influence",
                mix = "Blend"
            }
        },
        faceFeatures = {
            title = "Sculpt the face",
            nose = {
                title = "Nose",
                width = "Width",
                height = "Height",
                size = "Tip size",
                boneHeight = "Bridge height",
                boneTwist = "Bridge twist",
                peakHeight = "Tip lift"
            },
            eyebrows = {
                title = "Brow line",
                height = "Lift",
                depth = "Push"
            },
            cheeks = {
                title = "Cheeks",
                boneHeight = "Cheekbone lift",
                boneWidth = "Cheekbone width",
                width = "Fullness"
            },
            eyesAndMouth = {
                title = "Eyes & mouth",
                eyesOpening = "Eye openness",
                lipsThickness = "Lip fullness"
            },
            jaw = {
                title = "Jaw",
                width = "Width",
                size = "Heft"
            },
            chin = {
                title = "Chin",
                lowering = "Drop",
                length = "Length",
                size = "Size",
                hole = "Dimple"
            },
            neck = {
                title = "Neck",
                thickness = "Thickness"
            }
        },
        headOverlays = {
            title = "Skin & details",
            hair = {
                title = "Hair",
                style = "Cut",
                color = "Main color",
                highlight = "Highlight",
                texture = "Texture",
                fade = "Fade"
            },
            opacity = "Strength",
            style = "Style",
            color = "Color",
            secondColor = "Accent color",
            blemishes = "Blemishes",
            beard = "Facial hair",
            eyebrows = "Brows",
            ageing = "Age lines",
            makeUp = "Makeup",
            blush = "Blush",
            complexion = "Complexion",
            sunDamage = "Sun-kissed",
            lipstick = "Lipstick",
            moleAndFreckles = "Moles & freckles",
            chestHair = "Chest hair",
            bodyBlemishes = "Body marks",
            eyeColor = "Eye color"
        },
        components = {
            title = "Wardrobe",
            drawable = "Style",
            texture = "Variant",
            mask = "Mask",
            upperBody = "Arms & gloves",
            lowerBody = "Pants",
            bags = "Bag / parachute",
            shoes = "Shoes",
            scarfAndChains = "Scarf & chains",
            shirt = "Undershirt",
            bodyArmor = "Body armor",
            decals = "Decals",
            jackets = "Jacket",
            head = "Hat slot"
        },
        props = {
            title = "Finishing touches",
            drawable = "Style",
            texture = "Variant",
            hats = "Hats & helmets",
            glasses = "Glasses",
            ear = "Earpiece",
            watches = "Watch",
            bracelets = "Bracelet"
        },
        tattoos = {
            title = "Ink",
            items = {
                ZONE_TORSO = "Torso",
                ZONE_HEAD = "Head & neck",
                ZONE_LEFT_ARM = "Left arm",
                ZONE_RIGHT_ARM = "Right arm",
                ZONE_LEFT_LEG = "Left leg",
                ZONE_RIGHT_LEG = "Right leg"
            },
            apply = "Ink it",
            delete = "Erase",
            deleteAll = "Erase every tattoo",
            opacity = "Boldness"
        }
    },
    outfitManagement = {
        title = "Outfit Management",
        jobText = "Manage outfits for Job",
        gangText = "Manage outfits for Gang"
    },
    cancelled = {
        title = "Look discarded",
        description = "Nothing you touched stuck — you're back to how you started."
    },
    outfits = {
        import = {
            title = "Enter outfit code",
            menuTitle = "Import Outfit",
            description = "Import an outfit from a sharing code",
            name = {
                label = "Name the Outfit",
                placeholder = "A nice outfit",
                default = "Imported Outfit"
            },
            code = {
                label = "Outfit Code"
            },
            success = {
                title = "Outfit Imported",
                description = "You can now change to the outfit using the outfit menu"
            },
            failure = {
                title = "Import Failure",
                description = "Invalid outfit code"
            }
        },
        generate = {
            title = "Generate Outfit Code",
            description = "Generate an outfit code for sharing",
            failure = {
                title = "Something went wrong",
                description = "Code generation failed for the outfit"
            },
            success = {
                title = "Outfit Code Generated",
                description = "Here is your outfit code"
            }
        },
        save = {
            menuTitle = "Save current Outfit",
            menuDescription = "Save your current outfit as %s outfit",
            description = "Save your current outfit",
            title = "Name your outfit",
            managementTitle = "Management Outfit Details",
            name = {
                label = "Outfit Name",
                placeholder = "Very cool outfit"
            },
            gender = {
                label = "Gender",
                male = "Male",
                female = "Female"
            },
            rank = {
                label = "Minimum Rank"
            },
            failure = {
                title = "Save Failed",
                description = "Outfit with this name already exists"
            },
            success = {
                title = "Success",
                description = "Outfit %s has been saved"
            }
        },
        update = {
            title = "Update Outfit",
            description = "Save your current clothing to an existing outfit",
            failure = {
                title = "Update Failed",
                description = "That outfit does not exist"
            },
            success = {
                title = "Success",
                description = "Outfit %s has been updated"
            }
        },
        change = {
            title = "Change Outfit",
            description = "Pick from any of your currently saved %s outfits",
            pDescription = "Pick from any of your currently saved outfits",
            failure = {
                title = "Something went wrong",
                description = "The outfit that you're trying to change to, does not have a base appearance",
            }
        },
        delete = {
            title = "Delete Outfit",
            description = "Delete a saved %s outfit",
            mDescription = "Delete any of your saved outfits",
            item = {
                title = 'Delete "%s"',
                description = "Model: %s%s"
            },
            success = {
                title = "Success",
                description = "Outfit Deleted"
            }
        },
        manage = {
            title = "👔 | Manage %s Outfits"
        }
    },
    jobOutfits = {
        title = "Work Outfits",
        description = "Pick from any of your work outfits"
    },
    menu = {
        returnTitle = "Return",
        title = "Clothing Room",
        outfitsTitle = "Player Outfits",
        clothingShopTitle = "Clothing Shop",
        barberShopTitle = "Barber Shop",
        tattooShopTitle = "Tattoo Shop",
        surgeonShopTitle = "Surgeon Shop"
    },
    clothing = {
        title = "Buy Clothing - $%d",
        titleNoPrice = "Change Clothing",
        options = {
            title = "👔 | Clothing Store Options",
            description = "Pick from a wide range of items to wear"
        },
        outfits = {
            title = "👔 | Outfit Options",
            civilian = {
                title = "Civilian Outfit",
                description = "Put on your clothes"
            }
        }
    },
    commands = {
        reloadskin = {
            title = "Reloads your character",
            failure = {
                title = "Error",
                description = "You cannot use reloadskin right now"
            }
        },
        clearstuckprops = {
            title = "Removes all the props attached to the entity",
            failure = {
                title = "Error",
                description = "You cannot use clearstuckprops right now"
            }
        },
        pedmenu = {
            title = "Open / Give Clothing Menu",
            failure = {
                title = "Error",
                description = "Player not online"
            }
        },
        joboutfits = {
            title = "Opens Job Outfits Menu"
        },
        gangoutfits = {
            title = "Opens Gang Outfits Menu"
        },
        bossmanagedoutfits = {
            title = "Opens Boss Managed Outfits Menu"
        }
    },
    textUI = {
        clothing = "Clothing Store - Price: $%d",
        barber = "Barber - Price: $%d",
        tattoo = "Tattoo Shop - Price: $%d",
        surgeon = "Plastic Surgeon - Price: $%d",
        clothingRoom = "Clothing Room",
        playerOutfitRoom = "Outfits"
    },
    migrate = {
        success = {
            title = "Success",
            description = "Migration finished. %s skins migrated",
            descriptionSingle = "Migrated Skin"
        },
        skip = {
            title = "Information",
            description = "Skipped skin"
        },
        typeError = {
            title = "Error",
            description = "Invalid type"
        }
    },
    purchase = {
        tattoo = {
            success = {
                title = "Success",
                description = "Purchased %s tattoo for %s$"
            },
            failure = {
                title = "Tattoo apply failed",
                description = "You don't have enough money!"
            }
        },
        store = {
            success = {
                title = "Success",
                description = "Gave $%s to %s!"
            },
            failure = {
                title = "Exploit!",
                description = "You didn't have enough money! Tried to exploit the system!"
            }
        }
    }
}
