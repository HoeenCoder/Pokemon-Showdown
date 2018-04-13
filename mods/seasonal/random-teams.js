'use strict';

const RandomTeams = require('../../data/random-teams');

class RandomStaffBrosTeams extends RandomTeams {
	randomStaffBrosTeam() {
		let team = [];
		// let variant = (this.random(2) === 1);
		let sets = {
			'Acast': {
				species: 'Decidueye', ability: 'Stealth', item: 'Decidium Z', gender: 'M', // ask gender
				moves: ['Spirit Shackle', 'Thousand Arrows', ['High Jump Kick', 'Brave Bird', 'Shadow Sneak'][this.random(3)]],
				signatureMove: 'Arrow Dance',
				evs: {hp: 4, atk: 252, spe: 252}, nature: 'Jolly',
			},
			'Aelita': {
				species: 'Porygon-Z', ability: 'Protean', item: 'Life Orb', gender: 'N',
				moves: [['boomburst', 'moonblast'][this.random(2)], 'quiverdance', 'chatter'],
				signatureMove: "Energy Field",
				evs: {hp: 4, spa: 252, spe: 252}, nature: 'Modest',
			},
			'Akir': {
				species: 'Parasect', ability: 'Mushroom Wall', item: 'Leftovers', gender: 'N', // ask gender
				moves: [['Leech Life', 'Seed Bomb'][this.random(2)], 'Strength Sap', ['Sacred Fire', 'Toxic'][this.random(2)]],
				signatureMove: 'Allergy',
				evs: {hp: 252, atk: 252, def: 4}, nature: 'Impish',
			},
			'Amingo': {
				species: 'Cacturne', ability: 'Disguise', item: 'Focus Sash', gender: 'N', // ask gender
				moves: ['Seed Bomb', 'Sucker Punch', 'Superpower'],
				signatureMove: 'Cactus Ale',
				evs: {hp: 4, atk: 252, spe: 252}, nature: 'Adamant',
			},
			'Andy >_>': {
				species: 'Absol', ability: 'Justified', item: 'Absolite', gender: 'M',
				moves: ['Swords Dance', 'Sucker Punch', ['U-turn', 'Knock Off'][this.random(2)]],
				signatureMove: "Pilfer",
				evs: {hp: 252, atk: 252, spe: 4}, nature: 'Adamant',
			},
			'ant': {
				species: 'Durant', ability: 'TRU ANT', item: 'Leftovers', gender: 'M', // ask gender
				moves: ['Sunsteel Strike', 'U-turn', 'Pursuit'],
				signatureMove: "King's Shield", // No custom
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Jolly',
			},
			'antemortem': {
				species: 'Clefable', ability: ['Magic Bounce', 'Sheer Force'], item: 'Leftovers', gender: 'M',
				moves: ['Earth Power', 'Cosmic Power', 'Recover', 'Giga Drain'],
				signatureMove: 'Postmortem',
				evs: {hp: 252, def: 4, spa: 252}, nature: 'Modest',
			},
			'Arrested': {
				species: 'Wartortle', ability: 'Shell Shocker', item: 'Eviolite', gender: 'N',
				moves: ['Muddy Water', 'Ice Beam', 'Slack Off'],
				signatureMove: 'Jail Shell',
				evs: {hp: 252, def: 4, spa: 252}, nature: 'Modest',
			},
			'Articblast': {
				species: 'Garbodor', ability: 'Speed Boost', item: 'Choice Band', gender: 'N',
				moves: ['Acid Spray', 'Knock Off', 'Earthquake'],
				signatureMove: 'Trashalanche',
				evs: {atk: 252, spd: 4, spe: 252}, nature: 'Adamant',
			},
			'Articuno': {
				species: 'Articuno', ability: 'Icy Down', item: 'Leftovers', gender: 'F',
				moves: ['Blizzard', ['Toxic', 'Aurora Veil'][this.random(2)], ['Roost', 'Air Slash'][this.random(2)]],
				signatureMove: 'Legendary Frost',
				evs: {hp: 252, def: 252, spa: 4}, ivs: {atk: 0}, nature: 'Bold',
			},
			'Ascriptmaster': {
				species: 'Rotom', ability: 'Appliance Change', item: '', gender: 'M', // ask gender
				moves: ['Searing Shot', 'Ice Beam', 'Aeroblast', 'Origin Pulse', 'Seed Flare'],
				signatureMove: 'Voltech Burst',
				evs: {hp: 4, spa: 252, spd: 252}, nature: 'Timid',
			},
			'Astara': {
				species: 'Jirachi', ability: 'Cursed Body', item: ['Leftovers', 'Sitrus Berry'][this.random(2)], gender: 'F', shiny: true,
				moves: ['psystrike', 'moonblast', 'nastyplot', 'scald', 'recover'],
				signatureMove: 'Star Bolt Desperation',
				evs: {hp: 4, spa: 252, spe: 252}, nature: 'Modest',
			},
			'Astyanax': {
				species: 'Seismitoad', ability: 'Frogskin', item: 'Toxic Orb', gender: 'N', shiny: true, // ask gender
				moves: ['Protect', 'Knock Off', 'Drain Punch'],
				signatureMove: 'Call upon the Tympoles!',
				evs: {atk: 252, spd: 4, spe: 252}, nature: 'Adamant',
			},
			'atomicllamas': {
				species: 'Jynx', ability: 'Snow Warning', item: 'Focus Sash', gender: 'N', // ask gender
				moves: ['Lovely Kiss', 'Blizzard', 'Aura Sphere'],
				signatureMove: 'Bitchy Comment',
				evs: {spa: 252, spd: 4, spe: 252}, ivs: {atk: 0}, nature: 'Timid',
			},
			'AuzBat': {
				species: 'Golbat', ability: 'Regenerator', item: 'Eviolite', gender: 'M',
				moves: ['toxic', ['defog', 'uturn'][this.random(2)], ['superfang', 'bravebird'][this.random(2)]],
				signatureMove: "Fat Bat",
				evs: {hp: 212, spd: 240, spe: 56}, nature: 'Careful',
			},
			'Beowulf': {
				species: 'Beedrill', ability: 'Download', item: 'Beedrillite', gender: 'M',
				moves: ['spikyshield', 'gunkshot', ['sacredfire', 'boltstrike', 'diamondstorm'][this.random(3)]],
				signatureMove: "Buzzing of the Storm",
				evs: {def: 4, atk: 252, spe: 252}, nature: 'Jolly',
			},
			'biggie': {
				species: 'Snorlax', ability: 'Fur Coat', item: 'Leftovers', gender: 'M',
				moves: ['Drain Punch', 'Diamond Storm', 'King\'s Shield', 'Knock Off', 'Precipice Blades'],
				signatureMove: 'Food Rush',
				evs: {hp: 4, atk: 252, spd: 252}, nature: 'Adamant',
			},
			'Bondie': {
				species: 'Bellsprout', ability: 'Solar Surge', item: 'Focus Sash', gender: 'M',
				moves: ['Solarbeam', 'Sludge Wave', 'Weather Ball'],
				signatureMove: 'Sprout Powder',
				evs: {hp: 4, spa: 252, spe: 252}, ivs: {atk: 0}, nature: 'Modest',
			},
			'Brandon~': {
				species: 'Azumarill', ability: 'Thick Skin', item: 'Leftovers', gender: 'M',
				moves: ['Milk Drink', 'Moonblast', ['Rapid Spin', 'Roar', 'Heal Bell'][this.random(3)]],
				signatureMove: "Siren's Song",
				evs: {hp: 252, def: 4, spd: 252}, nature: 'Calm',
			},
			'bumbadadabum': {
				species: 'Samurott', ability: 'Analytic', item: 'Leftovers', gender: 'M',
				moves: ['calmmind', 'originpulse', 'icebeam'],
				signatureMove: "Free Software",
				evs: {hp: 252, spa: 252, spd: 4}, ivs: {atk: 0}, nature: 'Modest',
			},
			'cant say': {
				species: 'Aegislash', ability: 'Stance Change', item: 'Weakness Policy', gender: 'M',
				moves: ['Shift Gear', 'Spectral Thief', 'Sacred Sword'],
				signatureMove: 'blade of ~aesthetics~',
				evs: {atk: 252, spd: 4, spe: 252}, nature: 'Adamant',
			},
			'Ceteris Paribus': {
				species: 'Greninja', ability: 'Protean', item: 'Expert Belt', gender: 'M',
				moves: ['Dark Pulse', 'Origin Pulse', ['Gunk Shot', 'Shadow Sneak'][this.random(2)]],
				signatureMove: 'Bringer of Darkness',
				evs: {spa: 252, spd: 4, spe: 252}, nature: 'Naive',
			},
			'chaos': {
				species: 'Bewear', ability: 'Fur Coat', item: 'Red Card', gender: 'M',
				moves: ['Close Combat', ['Recover', 'Swords Dance'][this.random(2)], ['Knock Off', 'Extreme Speed'][this.random(2)]],
				signatureMove: 'Forcewin',
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Adamant',
			},
			'Chloe': {
				species: 'Vileplume', ability: 'Prankster', item: 'Light Clay', gender: 'F',
				moves: ['Parting Shot', 'Topsy Turvy', 'Encore'],
				signatureMove: 'Added Preservatives',
				evs: {hp: 252, def: 252, spd: 4}, nature: 'Bold',
			},
			'Ciran': {
				species: 'Rapidash', ability: 'Defiant', item: 'Life Orb', gender: 'N', shiny: true,
				moves: ['V-Create', 'Knock Off', 'Punishment'],
				signatureMove: 'bUrn-Turn',
				evs: {atk: 252, def: 4, spe: 252}, ivs: {spa: 0}, nature: 'Adamant',
			},
			'Coronis': {
				species: 'Darkrai', ability: 'No Guard', item: 'Life Orb', gender: 'N', // ask gender
				moves: ['Dark Void', 'Focus Blast', 'Sludge Wave'],
				signatureMove: 'Black Hole',
				evs: {spa: 252, spd: 4, spe: 252}, nature: 'Modest',
			},
			'DragonWhale': {
				species: 'Garchomp', ability: 'Dazzling', item: 'Groundium Z', gender: 'M', // ask gender
				moves: ['Fire Fang', 'Earthquake', 'Dragon Rush'],
				signatureMove: "Earth's Blessing",
				evs: {hp: 20, atk: 236, spe: 252}, nature: 'Adamant',
			},
			'Duck': {
				species: 'Farfetch\'d', ability: 'Sniper', item: 'Stick', gender: 'M',
				moves: ['Shift Gear', 'Superpower', 'Dragon Ascent'],
				signatureMove: 'Holy Duck!',
				evs: {atk: 252, spd: 4, spe: 252}, nature: 'Jolly',
			},
			'eternally': {
				species: 'Ducklett', ability: 'Duck Season', item: 'Eviolite', gender: 'N',
				moves: ['Hurricane', 'Origin Pulse', 'Roost'],
				signatureMove: 'Quack Attack',
				evs: {def: 4, spa: 252, spe: 252}, nature: 'Timid',
			},
			'EV': {
				species: 'Muk-Alola', ability: 'Unaware', item: 'Black Sludge', gender: 'M', // ask gender
				moves: [['Gunk Shot', 'Poison Jab'][this.random(2)], 'Recover', 'Coil'],
				signatureMove: 'Dark Aggro',
				evs: {hp: 252, atk: 252, spd: 4}, nature: 'Adamant',
			},
			'Eyan': {
				species: 'Hydreigon', ability: 'Adaptability', item: 'Life Orb', gender: 'M', // ask gender
				moves: ['Roost', 'Quiver Dance', 'Dark Pulse'],
				signatureMove: 'Spectral Thief but Dragon-type', // "(yes, this shall be the name)"
				evs: {hp: 252, atk: 252, spd: 4}, nature: 'Adamant',
			},
			'False': {
				species: 'Roserade', ability: 'Nitric Acid', item: 'Roseradium Z', gender: 'N', // ask gender
				moves: ['Energy Ball', 'Psystrike', 'Quiver Dance'],
				signatureMove: 'Sludge Wave', // custom Z move
				evs: {hp: 4, spa: 252, spe: 252}, nature: 'Timid',
			},
			'Feliburn': {
				species: 'Kommo-o', ability: 'Turboblaze', item: 'Kommonium Z', gender: 'N', // ask gender
				moves: ['Close Combat', 'Dragon Hammer', ['Sunsteel Strike', 'Earthquake'][this.random(2)]],
				signatureMove: 'Clanging Scales', // Clangorous Soulblaze is Physical
				evs: {atk: 252, spd: 4, spe: 252}, nature: 'Jolly',
			},
			'Former Hope': {
				species: 'Toxapex', ability: 'Corrosion', item: 'Leftovers', gender: 'N', // ask gender
				moves: ['Toxic', 'Recover', ['Substitute', 'Magic Coat'][this.random(2)]],
				signatureMove: 'Hope Stikes Back',
				evs: {hp: 252, def: 192, spd: 64}, nature: 'Bold',
			},
			'GoodMorningEspeon': {
				species: 'Espeon', ability: 'Drought', item: 'Red Card', gender: 'M',
				moves: ['morningsun', 'growth', 'storedpower'],
				signatureMove: 'FRIDGE OFF',
				evs: {hp: 4, spa: 252, spe: 252}, ivs: {atk: 0}, nature: 'Timid',
			},
			'grimAuxiliatrix': {
				species: 'Aggron', ability: 'Chrome Finish', item: 'Aggronite', gender: 'M', // ask gender
				moves: ['Thunder Wave', 'Heavy Slam', ['Stealth Rock', 'Dragon Tail', 'Stone Edge'][this.random(3)]],
				signatureMove: 'Cha Cha Slide',
				evs: {hp: 252, def: 16, spd: 240}, nature: 'Impish',
			},
			'Haund': {
				species: 'Swellow', ability: 'Guts', item: 'Toxic Orb', gender: 'M',
				moves: ['boomburst', 'heatwave', 'ominouswind'],
				signatureMove: "Psychokinesis",
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Jolly',
			},
			'HeaLnDeaL': {
				species: 'Lycanroc-Midday', ability: 'Fur Coat', item: 'Rockium Z', gender: 'N',
				moves: ['Diamond Storm', 'Precipice Blades', 'Meteor Mash'],
				signatureMove: 'Petrify Chomp',
				evs: {spa: 252, spd: 4, spe: 252}, nature: 'Jolly',
			},
			'hippopotas': {
				species: 'Hippopotas', ability: 'Sturdy', item: 'Wiki Berry', gender: 'N',
				moves: ['Protect', 'Destiny Bond', ['Stealth Rock', 'Spikes', 'Toxic Spikes', 'Sticky Web'][this.random(4)]],
				signatureMove: 'Be Annoying',
				evs: {hp: 252, def: 252, spd: 4}, ivs: {atk: 0, spa: 0}, nature: 'Bold',
			},
			'HoeenHero': {
				species: 'Ludicolo', ability: 'Swift Swim', item: 'Damp Rock', gender: 'M',
				moves: [['Hydro Pump', 'Scald'][this.random(2)], 'Giga Drain', 'Ice Beam'],
				signatureMove: 'Scripting',
				evs: {def: 4, spa: 252, spe: 252}, nature: 'Modest',
			},
			'imas': {
				species: 'Skarmory', ability: 'Flash Feather', item: 'imasium Z', gender: 'M',
				moves: ['Swords Dance', 'Taunt', 'Roost'],
				signatureMove: 'Accele Squawk',
				evs: {hp: 252, atk: 252, spe: 4}, nature: 'Adamant',
			},
			'innovamania': {
				species: 'Arceus', ability: 'Pick Up', item: 'Black Glasses', gender: 'M',
				moves: [['holdhands', 'trickortreat'][this.random(2)], ['swordsdance', 'agility'][this.random(2)], 'celebrate'],
				signatureMove: "Rage Quit",
				evs: {hp: 4, atk: 252, spe: 252}, nature: 'Jolly',
			},
			'Iyarito': {
				species: 'Gengar', ability: 'Tinted Lens', item: 'Grassium Z', gender: 'M', // Ask gender
				moves: ['Sleep Powder', 'Dream Eater', 'Secret Sword'],
				signatureMove: 'Iya\'s Rage',
				evs: {hp: 184, spa: 252, spe: 60}, nature: 'Timid',
			},
			'Jasmine': {
				species: 'Mew', ability: 'Speed Boost', item: 'Focus Sash', gender: 'F',
				moves: ['Taunt', 'Explosion', 'Protect'],
				signatureMove: 'Reverse Transform',
				evs: {hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84}, nature: 'Quirky',
			},
			'Joim': {
				species: 'Zapdos', ability: 'Tinted Lens', item: 'Life Orb', gender: 'N',
				moves: ['Roost', 'Hurricane', ['Thunderbolt', 'Quiver Dance'][this.random(2)]],
				signatureMove: 'Retirement',
				evs: {hp: 4, spa: 252, spe: 252}, nature: 'Modest', //ask nature
			},
			'Kalalokki': {
				species: 'Wingull', ability: 'Swift Swim', item: ['Waterium Z', 'Electrium Z', 'Flyinium Z'][this.random(3)], gender: 'M',
				moves: ['hurricane', 'thunder', 'waterspout'],
				signatureMove: "Maelström",
				evs: {spa: 252, spd: 4, spe: 252}, nature: 'Modest',
			},
			'kamikaze': {
				species: 'Staraptor', ability: 'Flash Feather', item: 'Choice Band', gender: 'M',
				moves: ['Brave Bird', 'Close Combat', ['Double Edge', 'U-turn'][this.random(2)]],
				signatureMove: 'Kamikaze Rebirth',
				evs: {hp: 252, atk: 148, spe: 108}, nature: 'Adamant',
			},
			'Kaori': {
				species: 'Typhlosion', ability: 'Drought', item: 'Choice Scarf', gender: 'M', // ask gender
				moves: ['Eruption'],
				signatureMove: 'BIG ERUPTION',
				evs: {spa: 252, spd: 4, spe: 252}, ivs: {atk: 0}, nature: 'Timid',
			},
			'Kay': {
				species: 'Inkay', ability: 'Prankster', item: 'Mental Herb', gender: 'M', // ask gender
				moves: [],
				signatureMove: 'Special Kay',
				evs: {hp: 252, def: 4, spe: 252}, nature: 'Timid',
			},
			'KingSwordYT': {
				species: 'Pangoro', ability: 'Kung Fu Panda', item: 'Life Orb', gender: 'M', // ask gender
				moves: ['Swords Dance', 'Bullet Punch', 'Knock Off'],
				signatureMove: 'Dragon Warrior Touch',
				evs: {hp: 4, atk: 252, spe: 252}, nature: 'Jolly',
			},
			'Level 51': {
				species: 'Porygon2', ability: 'Unaware', item: 'Eviolite',
				moves: ['Recover', 'Seismic Toss', ['Cosmic Power', 'Cotton Guard'][this.random(2)]],
				signatureMove: 'Next Level Strats',
				evs: {hp: 236, def: 220, spd: 48, spe: 4}, nature: 'Calm',
			},
			'LifeisDANK': {
				species: 'Delibird', ability: 'Birb', item: 'Lagging Tail', gender: 'F',
				moves: ['U-turn', 'Destiny Bond', 'Sticky Web'],
				signatureMove: 'Peent',
				evs: {hp: 252, def: 252, spd: 4}, nature: 'Impish',
			},
			'MacChaeger': {
				species: 'Mantyke', ability: '350 Cups', item: ['Life Orb', 'Normalium Z'][this.random(2)], gender: 'M',
				moves: ['Scald', 'Clear Smog', 'Sleep Talk'],
				signatureMove: 'Nap Time',
				evs: {hp: 248, spa: 84, spe: 176}, nature: 'Modest',
			},
			'Megazard': {
				species: 'Drampa', ability: 'Unaware', item: 'Leftovers', gender: 'M',
				moves: ['Roost', 'Calm Mind', 'Lava Plume'],
				signatureMove: 'Dragon\'s Wrath',
				evs: {hp: 248, def: 8, spd: 252}, nature: 'Calm',
			},
			'MochaMint': {
				species: 'Deerling', ability: 'Sturdy', item: 'Eviolite', gender: 'M', //needs confirmation
				moves: ['Protect', 'Nuzzle', 'U-turn'],
				signatureMove: 'Car Accident',
				evs: {hp: 252, def: 4, spe: 252}, nature: 'Jolly',
			},
			'NOVED': {
				species: 'Kangaskhan', ability: 'Scrappy', item: 'Kangaskhanite', gender: 'F',
				moves: ['Extreme Speed', 'Knock Off', 'Snatch'],
				signatureMove: 'For the Kids',
				evs: {hp: 252, atk: 252, spe: 4}, nature: 'Adamant',
			},
			'nui': {
				species: 'Quilava', ability: 'Drought', item: 'Choice Specs', gender: 'N', // ask gender
				moves: ['Shadow Ball', 'Blue Flare', 'Solar Beam'],
				signatureMove: "Sozin's Comet",
				evs: {spa: 252, spd: 4, spe: 252}, nature: 'Modest',
			},
			'nv': {
				species: 'Larvitar', ability: 'Arid Plateau', item: 'Eviolite', gender: 'N',
				moves: ['Diamond Storm', ['Precipice Blades', 'Earthquake'][this.random(2)], ['Bolt Strike', 'Sacred Fire', 'Shore Up'][this.random(3)]],
				signatureMove: 'An Apple A Day',
				evs: {hp: 252, atk: 252, spe: 4}, nature: 'Adamant',
			},
			'panpawn': {
				species: 'Cyndaquil', ability: 'Chlorophyll', item: 'Focus Sash', gender: 'M',
				moves: ['Eruption', 'Psycho Boost', 'Solar Beam'],
				signatureMove: 'LaFireBlaze420',
				nature: 'Adamant',
			},
			'Paradise': {
				species: 'Type: Null', ability: 'Toxic User', item: 'Eviolite', gender: 'N',
				moves: ['haze', 'Toxic', 'Recover'],
				signatureMove: 'Dizzy Rock',
				evs: {hp: 248, def: 8, spd: 252}, ivs: {atk: 0}, nature: 'Calm',
			},
			'Scotteh': {
				species: 'Suicune', ability: 'Fur Coat', item: 'Leftovers', gender: 'N',
				moves: ['Slack Off', 'Amnesia', 'Steam Eruption'],
				signatureMove: 'Geomagnetic Storm',
				evs: {def: 252, spa: 4, spe: 252}, nature: 'Bold',
			},
			'Scyther NO Swiping': {
				species: 'scyther', ability: 'Technician', item: 'Razor Claw', gender: 'M',
				moves: ['Leaf Blade', 'Sacred Sword', 'Lunge'],
				signatureMove: '3 Strike Swipe',
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Jolly',
			},
			'Sigilyph': {
				species: 'Sigilyph', ability: 'Magic Guard', item: 'Singularity', gender: 'M',
				moves: ['Aeroblast', 'Blue Flare', 'Night Daze'],
				signatureMove: 'Psystrike', // custom Z move
				evs: {spa: 252, spd: 4, spe: 252}, ivs: {atk: 0}, nature: 'Timid',
			},
			'sirDonovan': {
				species: 'Togetic', ability: 'Gale Wings', item: 'Eviolite', gender: 'M',
				moves: ['Roost', 'Hurricane', 'Charm'],
				signatureMove: 'Ladies First',
				evs: {hp: 252, spa: 252, spe: 4}, nature: 'Modest',
			},
			'Soccer': {
				species: 'Gible', ability: 'Unaware', item: 'Eviolite', gender: 'M', // ask gender
				moves: ['Earthquake', 'Stone Edge', 'Shift Gear'],
				signatureMove: 'Dragonforce',
				evs: {hp: 252, atk: 252, spe: 4}, nature: 'Adamant',
			},
			'SpaceBass': {
				species: 'foongus', ability: 'Prankster', item: 'Eviolite', gender: 'M',
				moves: ['Baton Pass', 'Ingrain', 'Substitute'],
				signatureMove: 'Army of Mushrooms',
				evs: {hp: 252, def: 128, spd: 128}, nature: 'Sassy',
			},
			'Swirlyder': {
				species: 'Swirlix', ability: 'Prankster', item: 'Focus Sash', gender: 'M', // ask gender
				moves: ['Light Screen', 'Heal Bell', 'Toxic'],
				signatureMove: '/me swirls you',
				evs: {hp: 252, def: 252, spd: 4}, nature: 'Bold',
			},
			'Temporaryanonymous': {
				species: 'Doublade', ability: 'Tough Claws', item: 'Eviolite',
				gender: 'M',
				moves: ['Swords Dance', 'Gear Grind', ['Sacred Sword', 'X-Scissor', 'Knock off'][this.random(3)]],
				signatureMove: 'SPOOPY EDGE CUT',
				evs: {atk: 252, hp: 252, def: 4}, nature: 'Adamant',
			},
			'Teremiare': {
				species: 'Zorua', ability: 'Super Prankster', item: 'Red Card', gender: 'M',
				moves: ['Topsy-Turvy', 'Taunt', 'Memento'],
				signatureMove: 'Baton Thief',
				evs: {hp: 252, def: 4, spe: 252}, nature: 'Timid',
			},
			'Team Pokepals': {
				species: 'Lucario', ability: 'Aura Sense', item: 'Salac Berry', gender: 'N',
				moves: ['Aura Sphere', 'Flash Cannon', 'Nasty Plot'],
				signatureMove: 'FINAL KAMEHAMEHA',
				evs: {spa: 252, spd: 4, spe: 252}, nature: 'Timid',
			},
			'The Immortal': {
				species: 'Blastoise', ability: 'Magic Bounce', item: 'Blastoisinite', gender: 'M',
				moves: ['Shell Smash', 'Dragon Tail', 'Steam Eruption'],
				signatureMove: 'Sleep Walk',
				evs: {hp: 252, def: 4, spd: 252}, nature: 'Sassy',
			},
			'Tiksi': {
				species: 'Cradily', ability: 'Sand Stream', item: 'Tiksium Z', gender: 'M',
				moves: ['Shore Up', 'Horn Leech', 'Curse'],
				signatureMove: 'Rock Slide', // custom Z Move
				evs: {hp: 248, atk: 252, spd: 8}, nature: 'Adamant',
			},
			'Timbuktu': {
				species: 'Araquanid', ability: 'Water Bubble', item: 'Waterium Z', gender: 'M', // ask gender
				moves: ['Liquidation', 'Aqua Ring', 'Toxic'],
				signatureMove: 'Entrapment',
				evs: {hp: 184, atk: 252, spe: 72}, nature: 'Adamant',
			},
			'Trickster': {
				species: 'Hoopa', ability: 'Interdimensional', item: 'Figy Berry',
				gender: 'M',
				moves: ['Inferno', 'Zap Cannon', ['Dynamic Punch', 'Grass Whistle'][this.random(2)]],
				signatureMove: 'Event Horizon',
				evs: {hp: 252, atk: 4, spa: 252}, ivs: {spe: 0}, nature: 'Quiet',
			},
			'urkerab': {
				 species: 'Skuntank', ability: 'Sniper', item: 'Razor Claw', gender: 'M',
				 moves: ['nightslash', 'drillrun', 'crosspoison'],
				 signatureMove: 'Holy Orders',
				 evs: {hp: 248, atk: 228, def: 24, spd: 8}, nature: 'Careful',
			},
			'Winry': {
				species: 'Buizel', ability: 'Water Veil', item: 'Life Orb', gender: 'F', shiny: true,
				moves: ['aquajet', ['jumpkick', 'iciclecrash'][this.random(2)], 'waterfall'],
				signatureMove: 'Fight to the Death',
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Jolly',
			},
			'xfix': {
				species: 'Xatu', ability: ['Magic Bounce', 'Prankster'][this.random(2)], item: 'Pomeg Berry', gender: 'M',
				moves: ['Substitute', ['Roost', 'Strength Sap'][this.random(2)], 'Thunder Wave'],
				signatureMove: 'glitzer popping',
				evs: {hp: 4, def: 252, spd: 252}, nature: 'Calm',
			},
			'Yuki': {
				species: 'Ninetales-Alola', ability: 'Snow Warning', item: 'Fairium Z', gender: 'N',
				moves: ['Blizzard', 'Moonblast', 'Aurora Veil'],
				signatureMove: 'Cutie Escape',
				evs: {hp: 4, spa: 252, spe: 252}, nature: 'Timid',
			},
			'Zod': {
				species: 'Oricorio-Pom-Pom', ability: 'Drizzle', item: 'Leftovers', gender: 'M', //needs confirmation
				moves: ['Quiver Dance', 'Thunder', 'Hurricane'],
				signatureMove: 'Cheerleading Squad',
				evs: {spa: 252, spd: 4, spe: 252}, nature: 'Modest',
			},
		};

		// Remove 2 random moves from biggie's pool of 5
		this.sampleNoReplace(sets.biggie.moves);
		this.sampleNoReplace(sets.biggie.moves);

		// Generate the team randomly.
		let pool = Object.keys(sets);
		while (team.length < 6 && pool.length) {
			let name = this.sampleNoReplace(pool);
			let set = sets[name];
			set.level = 100;
			set.name = name;
			if (!set.ivs) {
				set.ivs = {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31};
			} else {
				for (let iv in {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31}) {
					set.ivs[iv] = iv in set.ivs ? set.ivs[iv] : 31;
				}
			}
			// Assuming the hardcoded set evs are all legal.
			if (!set.evs) set.evs = {hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84};
			if (Array.isArray(set.ability)) set.ability = this.sampleNoReplace(set.ability);
			set.moves = [this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves)].concat(set.signatureMove);
			if (name === 'Ascriptmaster') {
				// item hack
				let type = [this.getMove(set.moves[0]).type, this.getMove(set.moves[1]).type, this.getMove(set.moves[2]).type][this.random(3)];
				set.item = {'Grass': 'Grassium Z', 'Fire': 'Firium Z', 'Water': 'Waterium Z', 'Ice': 'Icium Z', 'Flying': 'Flyinium Z'}[type];
			}
			team.push(set);
		}

		return team;
	}
}

module.exports = RandomStaffBrosTeams;
