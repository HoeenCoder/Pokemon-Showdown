'use strict';

const RandomTeams = require('../../data/random-teams');

class RandomStaffBrosTeams extends RandomTeams {
	randomStaffBrosTeam() {
		let team = [];
		let variant = (this.random(2) === 1);
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
				species: 'Parasect', ability: 'Mushroom Wall', item: 'Leftovers', gender: 'M',
				moves: [['x-Scissor', 'Seed Bomb'][this.random(2)], 'Recover', ['Sacred Fire', 'Toxic'][this.random(2)]],
				signatureMove: 'Allergy',
				evs: {hp:248, def:252, spe:8}, nature: 'Impish',
			},
			'Andy >_>': {
				species: 'Absol', ability: 'Justified', item: 'Absolite', gender: 'M',
				moves: ['Swords Dance', 'Sucker Punch', ['U-Turn', 'Knock Off'][this.random(2)]],
				signatureMove: "Pilfer",
				evs: {hp: 252, atk: 252, spe: 4}, nature: 'Adamant',
			},
			'antemortem': {
				species: 'Clefable', ability: ['Magic Bounce', 'Sheer Force'], item: 'Leftovers', gender: 'M',
				moves: ['Earth Power', 'Cosmic Power', 'Recover', 'Giga Drain'],
				signatureMove: 'Postmortem',
				evs: {hp: 252, def: 4, spa: 252}, nature: 'Modest',
			},
			'Articblast': {
				species: 'Garbodor', ability: 'Speed Boost', item: 'Choice Band', gender: 'N',
				moves: ['Acid Spray', 'Knock Off', 'Earthquake'],
				signatureMove: 'Trashalance',
				evs: {atk: 252, spd: 4, spe: 252}, nature: 'Adamant',
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
			'atomicllamas': {
				species: 'Jynx', ability: 'Snow Warning', item: 'Focus Sash', gender: 'N', // ask gender
				moves: ['Lovely Kiss', 'Blizzard', 'Aura Sphere'],
				signatureMove: 'Bitchy Comment',
				evs: {spa: 252, spd: 4, spe: 252}, ivs: {atk: 0}, nature: 'Timid',
			},
			'AuzBat': {
				species: 'Golbat', ability: 'Regenerator', item: 'Eviolite', gender: 'M',
				moves: ['toxic', 'defog', ['superfang', 'bravebird'][this.random(2)]],
				signatureMove: "Fat Bat",
				evs: {hp: 212, spd: 240, spe: 56}, nature: 'Careful',
			},
			'Beowulf': {
				species: 'Beedrill', ability: 'Download', item: 'Beedrillite', gender: 'M',
				moves: ['spikyshield', 'gunkshot', ['sacredfire', 'boltstrike', 'diamondstorm'][this.random(3)]],
				signatureMove: "Buzzing of the Storm",
				evs: {def: 4, atk: 252, spe: 252}, nature: 'Jolly',
			},
			'cant say': {
				species: 'Aegislash', ability: 'Stance Change', item: 'Weakness Policy', gender: 'M',
				moves: ['Shift Gear', 'Spectral Thief', 'Sacred Sword'],
				signatureMove: 'blade of ~aesthetics~',
				evs: {atk: 252, spd: 4, spe: 252}, nature: 'Adamant',
			},
			'Cerberax': {
				species: 'Wailord', ability: 'Huge Power', item: 'Air Balloon', gender: 'M',
				moves: ['Roost', 'Waterfall', 'Shift Gear'],
				signatureMove: 'Blimp Crash',
				evs: {hp:4, atk:252, spe:252}, nature: 'Adamant',
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
			'Duck': {
				species: 'Farfetch\'d', ability: 'Sniper', item: 'Stick', gender: 'M',
				moves: ['Shift Gear', 'Superpower', 'Dragon Ascent'],
				signatureMove: 'Holy Duck!',
				evs: {atk: 252, spd: 4, spe: 252}, nature: 'Jolly',
			},
			'EV': {
				species: 'Muk-Alola', ability: 'Unaware', item: 'Black Sludge', gender: 'M', // ask gender
				moves: [['Gunk Shot', 'Poison Jab'][this.random(2)], 'Recover', 'Coil'],
				signatureMove: 'Dark Aggro',
				evs: {hp: 252, atk: 252, spd: 4}, nature: 'Adamant',
			},
			'Feliburn': {
				species: 'Kommo-o', ability: 'Turboblaze', item: 'Dragonium Z', gender: 'N', // ask gender
				moves: ['Close Combat', 'Dragon Hammer', ['Sunsteel Strike', 'Earthquake'][this.random(2)]],
				signatureMove: 'Clangorous Soulblaze',
				evs: {atk: 252, spd: 4, spe: 252}, nature: 'Jolly',
			},
			'grimAuxiliatrix': {
				species: 'Aggron', ability: 'Chrome Finish', item: 'Aggronite', gender: 'M', // ask gender
				moves: ['Thunder Wave', 'Heavy Slam', ['Stealth Rock', 'Dragon Tail', 'Stone Edge'][this.random(3)]],
				signatureMove: 'Cha Cha Slide',
				evs: {hp: 252, def: 16, spd: 240}, nature: 'Impish',
			},
			'HeaLnDeaL': {
				species: 'Lycanroc-Midday', ability: 'Fur Coat', item: 'Rockium Z', gender: 'N',
				moves: ['Diamond Storm', 'Precipice Blades', 'Meteor Mash'],
				signatureMove: 'Petrify Chomp',
				evs: {spa: 252, spd: 4, spe: 252}, nature: 'Jolly',
			},
			'hippopotas': {
				species: 'Hippopotas', ability: 'Sturdy', item: 'Figy Berry', gender: 'N',
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
				species: 'Gengar', ability: 'Fur Coat', item: 'Grassium Z', gender: 'M', // Ask gender
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
				moves: ['Brave Bird', 'Close Combat', ['Double Edge', 'U-Turn'][this.random(2)]],
				signatureMove: 'Kamikaze Rebirth',
				evs: {hp: 252, atk: 148, spe: 108}, nature: 'Adamant',
			},
			'Level 51': {
				species: 'Porygon2', ability: 'Unaware', item: 'Eviolite',
				moves: ['Recover', ['Night Shade', 'Seismic Toss'][this.random(2)], ['Nature\'s Madness', 'Cosmic Power', 'Cotton Guard'][this.random(3)]],
				signatureMove: 'Next Level Strats',
				evs: {hp: 236, def: 220, spd: 48, spe: 4}, nature: 'Calm',
			},
			'LifeisDANK': {
				species: 'Delibird', ability: 'Birb', item: 'Life Orb', gender: 'N',
				moves: ['Extreme Speed', 'Return', 'Beak Blast'],
				signatureMove: 'Peent Peent',
				evs: {hp: 4, atk: 252, spe: 252}, nature: 'Adamant',
			},
			'Megazard': {
				species: 'Drampa', ability: 'Unaware', item: 'Leftovers', gender: 'M',
				moves: ['Roost', 'Calm Mind', 'Lava Plume'],
				signatureMove: 'Dragon\'s Wrath',
				evs: {hp: 248, def: 8, spd: 252}, nature: 'Calm',
			},
			'MochaMint': {
				species: 'Deerling', ability: 'Sturdy', item: 'Eviolite', gender: 'M', //needs confirmation
				moves: ['Protect', 'Nuzzle', 'U-Turn'],
				signatureMove: 'Car Accident',
				evs: {hp: 252, def: 4, spe: 252}, nature: 'Jolly',
			},
			'NOVED': {
				species: 'Kangaskhan', ability: 'Scrappy', item: 'Kangaskhanite', gender: 'F',
				moves: ['Extreme Speed', 'Knock Off', 'Snatch'],
				signatureMove: 'For the Kids',
				evs: {hp: 252, atk: 252, spe: 4}, nature: 'Adamant',
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
			'Raseri': {
				species: 'Reshiram', ability: 'Sheer Force', item: 'Life Orb', gender: 'M',
				moves: ['Blue Flare', 'Core Enforcer', 'Earth Power'],
				signatureMove: 'hey',
				evs: {def:4, spa:252, spe:252}, ivs: {atk: 0}, nature: 'Modest',
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
			'sirDonovan': {
				species: 'Togetic', ability: 'Gale Wings', item: 'Eviolite', gender: 'M',
				moves: ['Roost', 'Hurricane', 'Charm'],
				signatureMove: 'Ladies First',
				evs: {hp: 252, spa: 252, spe: 4}, nature: 'Modest',
			},
			'SpaceBass': {
				species: 'foongus', ability: 'Prankster', item: 'Eviolite', gender: 'M', // ask gender
				moves: ['Baton Pass', 'Ingrain', 'Substitute'],
				signatureMove: 'Army of Mushrooms',
				evs: {hp: 252, def: 128, spd: 128}, nature: 'Sassy',
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
				species: 'Blastoise', ability: 'Magic Bounce', item: 'Blastoisinite', gender: 'N', // ask gender
				moves: ['Shell Smash', 'Dragon Tail', 'Steam Eruption'],
				signatureMove: 'Sleep Walk',
				evs: {hp: 252, def: 4, spd: 252}, nature: 'Sassy',
			},
			'Tiksi': {
				species: 'Cradily', ability: 'Sand Stream', item: 'Leftovers', gender: 'M',
				moves: ['Shore Up', 'Rock Slide', 'Curse'],
				signatureMove: 'Devolution Wave',
				evs: {hp: 248, atk: 252, spd: 8}, nature: 'Adamant',
			},
			'Trickster': {
				species: 'Hoopa', ability: 'Interdimensional', item: 'Figy Berry',
				gender: 'M',
				moves: ['Inferno', 'Zap Cannon', ['Dynamic Punch', 'Grass Whistle'][this.random(2)]],
				signatureMove: 'Event Horizon',
				evs: {hp: 252, atk: 4, spa: 252}, ivs: {spe: 0}, nature: 'Quiet',
			},
			'xfix': {
				species: 'Xatu', ability: ['Magic Bounce', 'Prankster'][this.random(2)], item: 'Pomeg Berry', gender: 'M',
				moves: ['Substitute', ['Roost', 'Strength Sap'][this.random(2)], 'Thunder Wave'],
				signatureMove: 'glitzer popping',
				evs: {hp: 4, def: 252, spd: 252}, nature: 'Calm',
			},
			/**
			* Side note: would it be able to make the infatuation and trapping persist through the switch? As xfix mentioned it is better for flavour reasons.
			* Cutie Escape isn't adding the volatiles, needs to be fixed.
			*/
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
