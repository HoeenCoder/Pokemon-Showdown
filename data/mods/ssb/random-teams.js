'use strict';

/** @typedef {{[name: string]: SSBSet}} SSBSets */
/**
 * @typedef {Object} SSBSet
 * @property {string} species
 * @property {string | string[]} ability
 * @property {string | string[]} item
 * @property {GenderName} gender
 * @property {(string | string[])[]} moves
 * @property {string} signatureMove
 * @property {{hp?: number, atk?: number, def?: number, spa?: number, spd?: number, spe?: number}=} evs
 * @property {{hp?: number, atk?: number, def?: number, spa?: number, spd?: number, spe?: number}=} ivs
 * @property {string | string[]} nature
 * @property {number=} level
 * @property {(number|boolean)=} shiny
 */

const RandomTeams = require('../../random-teams');
class RandomStaffBrosTeams extends RandomTeams {
	/**
	 * @param {Format | string} format
	 * @param {?PRNG | [number, number, number, number]} [prng]
	 */
	constructor(format, prng) {
		super(format, prng);
		this.allXfix = (this.random(500) === 360);
	}

	/**
	 * @param {Object} options
	 */
	randomStaffBrosTeam(options = {}) {
		/** @type {PokemonSet[]} */
		let team = [];
		/** @type {SSBSets} */
		let sets = {
			/*
			// Example:
			'Username': {
				species: 'Species', ability: 'Ability', item: 'Item', gender: '',
				moves: ['Move Name', ['Move Name', 'Move Name']],
				signatureMove: 'Move Name',
				evs: {stat: number}, ivs: {stat: number}, nature: 'Nature', level: 100, shiny: false,
			},
			// Species, ability, and item need to be captialized properly ex: Ludicolo, Swift Swim, Life Orb
			// Gender can be M, F, N, or left as an empty string
			// each slot in moves needs to be a string (the move name, captialized properly ex: Hydro Pump), or an array of strings (also move names)
			// signatureMove also needs to be capitalized properly ex: Scripting
			// You can skip Evs (defaults to 82 all) and/or Ivs (defaults to 31 all), or just skip part of the Evs (skipped evs are 0) and/or Ivs (skipped Ivs are 31)
			// You can also skip shiny, defaults to false. Level can be skipped (defaults to 100).
			// Nature needs to be a valid nature with the first letter capitalized ex: Modest
			*/
			// Please keep sets organized alphabetically based on staff member name!
			'2xTheTap': {
				species: 'Arcanine', ability: 'Mold Breaker', item: 'Life Orb', gender: 'M',
				moves: ['Sacred Fire', 'Extreme Speed', 'Morning Sun'],
				signatureMove: 'Noble Howl',
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Adamant', shiny: true,
			},
			'5gen': {
				species: 'Sawsbuck', ability: 'Season\'s Gift', item: 'Heat Rock', gender: 'M',
				moves: ['Double Edge', 'Knock Off', 'High Jump Kick'],
				signatureMove: 'Too Much Saws',
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Jolly',
			},
			'ACakeWearingAHat': {
				species: 'Dunsparce', ability: 'Serene Grace', item: 'Leftovers', gender: 'M',
				moves: ['Headbutt', 'Shadow Strike', 'Roost'],
				signatureMove: 'Sparce Dance',
				evs: {hp: 252, def: 4, spe: 252}, nature: 'Jolly',
			},
			'Aelita': {
				species: 'Porygon-Z', ability: 'Protean', item: 'Life Orb', gender: 'F',
				moves: [['Boomburst', 'Moonblast'], 'Blue Flare', 'Chatter'],
				signatureMove: 'Energy Field',
				evs: {hp: 4, spa: 252, spe: 252}, ivs: {atk: 0}, nature: 'Modest',
			},
			'Aeonic': {
				species: 'Nosepass', ability: 'Dummy Thicc', item: 'Noseium Z', gender: 'M',
				moves: ['Stealth Rock', 'Thunder Wave', 'Milk Drink'],
				signatureMove: 'Fissure',
				evs: {hp: 248, def: 8, spd: 252}, nature: 'Careful',
			},
			'Aethernum': {
				species: 'Regigigas', ability: 'Awakening', item: 'Leftovers', gender: 'N',
				moves: ['Knock Off', 'Confuse Ray', 'Drain Punch'],
				signatureMove: 'Cataclysm',
				evs: {hp: 252, atk: 252, spe: 4}, ivs: {spa: 0}, nature: 'Adamant',
			},
			'Akiamara': {
				species: 'Croagunk', ability: 'Toxic Swap', item: ['Life Orb', 'Black Sludge'], gender: '',
				moves: [['Gunk Shot', 'Sludge Wave'], 'Taunt', 'Photon Geyser'],
				signatureMove: 'x1',
				evs: {hp: 252, spa: 4, spe: 252}, nature: 'Serious',
			},
			'Akir': {
				species: 'Parasect', ability: 'Regrowth', item: 'Leftovers', gender: 'M',
				moves: ['Spore', ['Leech Life', 'Horn Leech'], 'Healing Wish'],
				signatureMove: 'Compost',
				evs: {hp: 248, atk: 8, spd: 252}, nature: 'Careful',
			},
			'Alpha': {
				species: 'Espeon', ability: 'O SOLE MIO', item: 'Light Clay', gender: 'M',
				moves: ['Psychic', 'Focus Blast', 'Morning Sun'],
				signatureMove: 'Neko Veil',
				evs: {spa: 252, spd: 4, spe: 252}, ivs: {atk: 0}, nature: 'Timid',
			},
			'Andrew': {
				species: 'Quilava', ability: 'Volcanic Tempest', item: 'Eviolite', gender: 'M',
				moves: ['Quiver Dance', 'Seed Flare', 'Fiery Dance'],
				signatureMove: 'Back Off! GRRR!',
				evs: {hp: 4, spa: 252, spe: 252}, ivs: {atk: 0}, nature: 'Timid',
			},
			'A Quag to The Past': {
				species: 'Quagsire', ability: 'Careless', item: 'Leftovers', gender: 'M',
				moves: ['Recover', 'Toxic', 'Scald'],
				signatureMove: 'Murky Ambush',
				evs: {hp: 252, def: 252, spd: 4}, ivs: {spe: 0}, nature: 'Relaxed',
			},
			'a random duck': {
				species: 'Swanna', ability: 'Volt Absorb', item: 'Safety Goggles', gender: 'M',
				moves: ['Nasty Plot', 'Steam Eruption', 'Oblivion Wing'],
				signatureMove: 'Flock',
				evs: {spa: 252, spd: 4, spe: 252}, ivs: {atk: 0}, nature: 'Timid', shiny: true,
			},
			'Arcticblast': {
				species: 'Garbodor', ability: 'Analytic', item: 'Assault Vest', gender: 'M',
				moves: ['Knock Off', 'Earthquake', ['Horn Leech', 'U-turn', 'Avalanche']],
				signatureMove: 'Trashalanche',
				evs: {hp: 252, atk: 252, def: 4}, ivs: {spe: 0}, nature: 'Brave',
			},
			'Arsenal': {
				species: 'Arceus', ability: 'Logia', gender: 'M',
				item: ["Draco Plate", "Dread Plate", "Earth Plate", "Fist Plate", "Flame Plate", "Icicle Plate", "Insect Plate", "Iron Plate", "Meadow Plate", "Mind Plate", "Pixie Plate", "Sky Plate", "Splash Plate", "Spooky Plate", "Stone Plate", "Toxic Plate", "Zap Plate"],
				moves: ['Mimic', 'Stealth Rock', 'Memento'],
				signatureMove: 'Come on you Gunners',
				evs: {hp: 4, spa: 252, spe: 252}, ivs: {hp: 20, def: 20, spd: 20}, nature: 'Naive',
			},
			'Averardo': {
				species: 'Tyrantrum', ability: 'Rock Head', item: 'Choice Scarf', gender: '', // ask Gender
				moves: ['Head Smash', 'Flare Blitz', 'Photon Geyser'],
				signatureMove: 'Dragon Smash',
				evs: {hp: 4, atk: 252, spe: 252}, nature: 'Adamant', shiny: true,
			},
			'Beowulf': {
				species: 'Beedrill', ability: ['Download', 'Speed Boost'], item: 'Beedrillite', gender: 'M',
				moves: ['Spiky Shield', 'Gunk Shot', ['Bolt Strike', 'Diamond Storm', 'Thousand Arrows']],
				signatureMove: 'Buzzing of the Swarm',
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Jolly',
			},
			'Bhris Brown': {
				species: 'Swampert', ability: 'Damp', item: 'Swampertite', gender: 'M',
				moves: ['Waterfall', 'Ice Punch', 'Earthquake'],
				signatureMove: 'Final Impact',
				evs: {atk: 252, spd: 4, spe: 252}, nature: 'Adamant', shiny: true,
			},
			'biggie': {
				species: 'Snorlax', ability: 'Fur Coat', item: 'Leftovers', gender: 'M',
				moves: ['Diamond Storm', 'Knock Off', ['Drain Punch', 'Precipice Blades']],
				signatureMove: 'Food Rush',
				evs: {hp: 4, atk: 252, spd: 252}, nature: 'Adamant',
			},
			'bobochan': {
				species: 'Emolga', ability: 'Huge Power', item: 'Choice Band', gender: 'M',
				moves: ['Brave Bird', 'Knock Off', 'U-turn'],
				signatureMove: 'Thousand Circuit Overload',
				evs: {atk: 252, spd: 4, spe: 252}, nature: 'Jolly',
			},
			'Brandon': {
				species: 'Shaymin', ability: 'Gracidea Mastery', item: 'Red Card', gender: 'N',
				moves: ['Seed Flare', ['Earth Power', 'Moonblast', 'Psychic'], ['Oblivion Wing', 'Strength Sap']],
				signatureMove: 'Blustery Winds',
				evs: {spa: 252, spd: 4, spe: 252}, ivs: {atk: 0}, nature: ['Modest', 'Timid'],
			},
			'bumbadadabum': {
				species: 'Slowbro', ability: 'Regenerator', item: 'Leftovers', gender: 'M',
				moves: ['Scald', 'Slack Off', 'Psyshock'],
				signatureMove: 'Wonder Trade',
				evs: {hp: 252, def: 252, spa: 4}, nature: 'Bold',
			},
			'cant say': {
				species: 'Aegislash', ability: 'Stance Change', item: ['Leftovers', 'Terrain Extender', 'Muscle Band'], gender: 'M',
				moves: ['Shift Gear', 'Spectral Thief', 'Sacred Sword'],
				signatureMove: 'a e s t h e t i s l a s h',
				evs: {hp: 32, atk: 252, spd: 4, spe: 220}, nature: 'Jolly',
			},
			'Ceteris': {
				species: 'Greninja', ability: 'Protean', item: 'Expert Belt', gender: 'M',
				moves: ['Dark Pulse', 'Origin Pulse', 'Gunk Shot', 'Shadow Sneak'],
				signatureMove: 'Bringer of Darkness',
				evs: {spa: 252, spd: 4, spe: 252}, ivs: {atk: 0}, nature: 'Timid', shiny: true,
			},
			'chaos': {
				species: 'Bewear', ability: 'Fur Coat', item: 'Red Card', gender: 'M',
				moves: ['Extreme Speed', 'Close Combat', 'Knock Off', ['Swords Dance', 'Recover']],
				signatureMove: 'Forcewin',
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Adamant',
			},
			'Chloe': {
				species: 'Tapu Fini', ability: 'Prankster', item: 'Light Clay', gender: 'F',
				moves: ['Fleur Cannon', 'Parting Shot', ['Taunt', 'Topsy-Turvy']],
				signatureMove: 'beskyttelsesnet',
				evs: {hp: 248, def: 252, spa: 8}, ivs: {atk: 0}, nature: 'Bold',
			},
			'Cleo': {
				species: 'Sealeo', ability: 'Adrenaline Rush', item: 'Leftovers', gender: 'M',
				moves: ['Icy Wind', 'Ice Beam', 'Draining Kiss'],
				signatureMove: 'Loving Embrace',
				evs: {hp: 4, spa: 252, spe: 252}, nature: 'Modest', shiny: true,
			},
			'DaWoblefet': {
				species: 'Wobbuffet', ability: 'Shadow Artifice', item: 'Iapapa Berry', gender: 'M',
				moves: ['Counter', 'Mirror Coat', 'Encore'],
				signatureMove: 'Super Ego Inflation',
				evs: {hp: 252, def: 252, spd: 4}, ivs: {spe: 0}, nature: 'Relaxed',
			},
			'Decem': {
				species: 'Goodra', ability: 'Miracle Scale', item: 'Choice Scarf', gender: '',
				moves: ['Draco Meteor', 'Fire Blast', 'Sludge Wave'],
				signatureMove: 'Hit and Run',
				evs: {spa: 252, spd: 4, spe: 252}, ivs: {atk: 0}, nature: 'Timid',
			},
			'deg': {
				species: 'Gengar', ability: 'Bad Dreams', item: 'Gengarite', gender: 'M',
				moves: [['Hex', 'Shadow Ball'], 'Sludge Wave', 'Focus Blast'],
				signatureMove: 'Lucid Dreams',
				evs: {spa: 252, spd: 4, spe: 252}, ivs: {atk: 0}, nature: ['Modest', 'Timid'],
			},
			'DragonWhale': {
				species: 'Garchomp', ability: 'Hustle', item: 'Groundium Z', gender: 'M',
				moves: ['Earthquake', 'Dragon Rush', 'Diamond Storm'],
				signatureMove: 'Earth\'s Blessing',
				evs: {hp: 4, atk: 252, spe: 252}, nature: 'Jolly',
			},
			'E4 Flint': {
				species: 'Steelix', ability: 'Sturdy', item: 'Magmarizer', gender: 'M',
				moves: ['Sunsteel Strike', 'Thousand Arrows', ['Dragon Tail', 'Knock Off', 'Fire Lash', 'Fire Lash']], // Fire Lash listed twice for 50% chance to get it
				signatureMove: 'Fang of the Fire King',
				evs: {hp: 252, atk: 36, def: 100, spd: 120}, ivs: {spe: 0}, nature: 'Brave',
			},
			'explodingdaisies': {
				species: 'Houndoom', ability: 'Flash Fire', item: 'Houndoominite', gender: 'M',
				moves: ['Sludge Bomb', 'Nasty Plot', 'Dark Pulse'],
				signatureMove: 'DOOM!',
				evs: {spa: 252, spd: 4, spe: 252}, ivs: {atk: 0}, nature: 'Timid',
			},
			'Eien': {
				species: 'Mew', ability: 'Psychic Surge', item: 'Terrain Extender', gender: 'N',
				moves: ['Calm Mind', 'Psychic', 'Roost'],
				signatureMove: 'Ancestral Power',
				evs: {hp: 252, spd: 4, spe: 252}, nature: 'Timid',
			},
			'Elgino': {
				species: 'Mimikyu', ability: 'Gib love pls', item: ['Mimikium Z', 'Ghostium Z', 'Fightinium Z'], gender: '',
				moves: ['Spectral Thief', 'Play Rough', ['Shadow Sneak', 'Swords Dance']],
				signatureMove: 'Rough Snuggle',
				evs: {hp: 4, atk: 252, spe: 252}, nature: 'Adamant', shiny: true,
			},
			'eternally': {
				species: 'Ducklett', ability: 'Primordial Sea', item: 'Eviolite', gender: 'M',
				moves: ['Origin Pulse', 'Hurricane', 'Roost'],
				signatureMove: 'Quack',
				evs: {spa: 252, spd: 4, spe: 252}, ivs: {atk: 0}, nature: 'Timid',
			},
			'false': {
				species: 'Rayquaza-Mega', ability: 'Infiltrator', item: 'Focus Band', gender: 'F',
				moves: ['Celebrate'],
				signatureMove: 'fr*ck',
				evs: {atk: 252, spe: 252, def: 4}, nature: 'Jolly', shiny: true,
			},
			'fart': {
				species: 'Kartana', ability: 'Rise from the Gases', item: 'Life Orb', gender: 'M',
				moves: ['Iron Head', 'Play Rough', 'U-turn'],
				signatureMove: 'Soup-Stealing 7-Star Strike',
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Jolly', shiny: true,
			},
			'Flare': {
				species: 'Zoroark', ability: 'Super Illusion', item: 'Choice Scarf', gender: 'N',
				moves: ['Fleur Cannon', 'Parting Shot', 'Sludge Bomb'],
				signatureMove: 'Distortion Blast',
				evs: {spa: 252, spd: 4, spe: 252}, ivs: {atk: 0}, nature: 'Timid', shiny: true,
			},
			'FOMG': {
				species: 'Golem', ability: 'Serene Grace', item: 'Astleyium Z', gender: 'M',
				moves: ['Earthquake', 'Explosion', 'Iron Head'],
				signatureMove: 'Rock Slide',
				evs: {hp: 4, atk: 252, spe: 252}, nature: 'Jolly',
			},
			'Gallant Spear': {
				species: 'Rapidash', ability: 'Trombe!', item: ['Eject Button', 'Choice Specs'], gender: 'M',
				moves: [['Magma Storm', 'Fire Blast'], 'U-turn', ['Tri Attack', 'Recover']],
				signatureMove: 'Storm Assault OGs',
				evs: {spa: 252, spd: 4, spe: 252}, nature: 'Timid', shiny: true,
			},
			'grimAuxiliatrix': {
				species: 'Aggron', ability: 'Sturdy', item: 'Aggronite', gender: '',
				moves: [['Toxic', 'Stealth Rock'], ['Stone Edge', 'Heat Crash'], 'Earthquake'],
				signatureMove: 'Pain Train',
				evs: {hp: 252, def: 4, spd: 252}, nature: 'Careful',
			},
			'guishark': {
				species: 'Sharpedo', ability: 'Speed Boost', item: 'Sharpedonite', gender: 'M',
				moves: ['Crabhammer', 'Icicle Crash', 'Protect'],
				signatureMove: 'Dad Joke',
				evs: {hp: 4, atk: 252, spe: 252}, nature: 'Jolly',

			},
			'Hippopotas': {
				species: 'Hippopotas', ability: 'Regenerator', item: 'Eviolite', gender: 'N',
				moves: ['Stealth Rock', 'Spikes', 'Toxic Spikes', 'Sticky Web'],
				signatureMove: 'Hazard Pass',
				evs: {hp: 252, def: 252, spd: 4}, ivs: {atk: 0, spa: 0}, nature: 'Bold',
			},
			'HoeenHero': {
				species: 'Ludicolo', ability: 'Scripter', item: 'Terrain Extender', gender: 'M',
				moves: [['Hydro Pump', 'Scald'], 'Giga Drain', 'Ice Beam'],
				signatureMove: 'Scripted Terrain',
				evs: {spa: 252, spd: 4, spe: 252}, ivs: {atk: 0}, nature: 'Modest',
			},
			'Hubriz': {
				species: 'Roserade', ability: 'Merciless', item: 'Focus Sash', gender: 'F',
				moves: ['Toxic Spikes', 'Fleur Cannon', 'Sludge Bomb'],
				signatureMove: 'Flower Tornado',
				evs: {def: 4, spa: 252, spe: 252}, ivs: {atk: 0}, nature: 'Timid',
			},
			'Hurl': {
				species: 'Flygon', ability: 'Adaptability', item: 'Life Orb', gender: 'M',
				moves: ['Earthquake', 'U-Turn', 'Dragon Dance'],
				signatureMove: 'Draconic Meme',
				evs: {hp: 252, atk: 252, spd: 4}, nature: 'Jolly',
			},
			'inactive': {
				species: 'Dusknoir', ability: 'Soul Eater', item: 'Life Orb', gender: '',
				moves: ['Earthquake', 'Shadow Force', 'Shadow Sneak'],
				signatureMove: 'Petrifying Gaze',
				evs: {hp: 4, atk: 252, spe: 252}, nature: 'Jolly',
			},
			'irritated': {
				species: 'Jirachi', ability: 'Serene Grace', item: 'Leftovers', gender: 'F',
				moves: ['Double Iron Bash', 'Rock Slide', 'Icicle Crash', 'Zing Zap'],
				signatureMove: 'Pure Skill',
				evs: {atk: 252, spd: 4, spe: 252}, nature: 'Jolly',
			},
			'Iyarito': {
				species: 'Vaporeon', ability: 'Poison Heal', item: 'Leftovers', gender: 'F',
				moves: ['Scald', 'Wish', 'Toxic'],
				signatureMove: 'Víbora',
				evs: {hp: 252, def: 220, spd: 36}, nature: 'Bold', shiny: true,
			},
			'Kaiju Bunny': {
				species: 'Gligar', ability: 'Immunity', item: 'Eviolite', gender: 'F',
				moves: ['Earthquake', 'Roost', ['Toxic', 'Stealth Rock']],
				signatureMove: 'Bestial Strike',
				evs: {hp: 252, def: 156, spd: 100}, nature: 'Impish',
			},
			'Kalalokki': {
				species: 'Wingull', ability: 'Swift Swim', item: ['Waterium Z', 'Flyinium Z', 'Electrium Z'], gender: 'M',
				moves: ['Water Spout', 'Hurricane', 'Thunder'],
				signatureMove: 'Maelström',
				evs: {spa: 252, spd: 4, spe: 252}, ivs: {atk: 0}, nature: 'Modest',
			},
			'kaori': {
				species: 'Bellossom', ability: 'Flower Shield', item: 'Heat Rock', gender: 'F',
				moves: ['Solarbeam', 'Fusion Flare', 'Moonlight'],
				signatureMove: '>w<',
				evs: {spa: 252, spd: 4, spe: 252}, ivs: {atk: 0}, nature: 'Modest', shiny: true,
			},
			'kay': {
				species: 'Inkay', ability: 'Contrary', item: 'Eviolite', gender: 'M',
				moves: ['Power Trip', 'Rest', 'Sleep Talk'],
				signatureMove: 'Inkzooka',
				evs: {hp: 252, atk: 144, spe: 112}, nature: 'Adamant',
			},
			'Kie': {
				species: 'Totodile', ability: 'Maelstrom', item: 'Eviolite', gender: 'M',
				moves: ['Aqua Jet', 'Icicle Crash', 'Horn Leech'],
				signatureMove: 'Chaotic',
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Jolly', shiny: true,
			},
			'KingSwordYT': {
				species: 'Pangoro', ability: 'Kung Fu Panda', item: 'Life Orb', gender: 'M',
				moves: ['Ice Punch', 'Bullet Punch', 'Knock Off'],
				signatureMove: 'Dragon Warrior Touch',
				evs: {atk: 252, hp: 4, spe: 252}, nature: 'Jolly',
			},
			'Level 51': {
				species: 'Porygon2', ability: 'Stamina', item: 'Eviolite', gender: 'N',
				moves: ['Recover', ['Seismic Toss', 'Night Shade'], ['Cosmic Power', 'Aqua Ring']],
				signatureMove: 'Next Level Strats',
				evs: {hp: 236, def: 220, spd: 48, spe: 4}, ivs: {atk: 0}, nature: 'Calm',
			},
			'LifeisDANK': {
				species: 'Delibird', ability: 'Aerilate', item: 'Focus Sash', gender: 'F',
				moves: ['Ice Shard', 'Return', 'Explosion'],
				signatureMove: 'Bar Fight',
				evs: {hp: 4, atk: 252, spe: 252}, nature: 'Jolly',
			},
			'Lost Seso': {
				species: 'Typhlosion', ability: 'Dazzling', item: 'Firium Z', gender: 'M',
				moves: ['Calm Mind', 'Petal Dance', 'Fiery Dance'],
				signatureMove: 'Shuffle Ramen Dance',
				evs: {def: 4, spa: 252, spe: 252}, ivs: {atk: 0}, nature: 'Timid', shiny: true,
			},
			'MacChaeger': {
				species: 'Mantyke', ability: 'Water Veil', item: ['Life Orb', 'Normalium Z'], gender: 'M',
				moves: ['Scald', 'Aeroblast', 'Sleep Talk'],
				signatureMove: 'Nap Time',
				evs: {hp: 252, spa: 80, spe: 176}, ivs: {atk: 0}, nature: 'Modest',
			},
			'MajorBowman': {
				species: 'Victini', ability: 'Victory Star', item: 'Victinium Z', gender: 'M',
				moves: ['Bolt Strike', 'Zen Headbutt', 'U-turn'],
				signatureMove: 'V-create',
				evs: {hp: 252, atk: 4, spe: 252}, nature: 'Jolly',
			},
			'Marshmallon': {
				species: 'Castform', ability: 'Sightseeing', item: 'Shell Bell', gender: 'M',
				moves: ['Rain Dance', 'Sunny Day', 'Hail'],
				signatureMove: 'Weather Forecast',
				evs: {spa: 252, spd: 4, spe: 252}, nature: 'Modest',
			},
			'martha': {
				species: 'Diancie', ability: 'Pixilate', item: 'Diancite', gender: 'F',
				moves: ['Hyper Voice', ['Fire Blast', 'Earth Power'], 'Photon Geyser'],
				signatureMove: 'Crystal Boost',
				evs: {hp: 4, spa: 252, spe: 252}, ivs: {atk: 0}, nature: 'Timid',
			},
			'Marty': {
				species: 'Silvally', ability: 'RKS System', item: 'Normal Gem', gender: 'N',
				moves: ['Parting Shot', 'Explosion', 'Extreme Speed'],
				signatureMove: 'Type Analysis',
				evs: {hp: 4, atk: 252, spe: 252}, nature: 'Jolly',
			},
			'Meicoo': {
				species: 'Pidgeot', ability: 'Prankster', item: 'Pidgeotite', gender: 'M',
				moves: ['Hurricane', 'Inferno', 'Roost'],
				signatureMove: '/scavenges u',
				evs: {def: 4, spa: 252, spe: 252}, ivs: {atk: 0}, nature: 'Timid',
			},
			'Megazard': {
				species: 'Exeggutor-Alola', ability: 'Stand Up Tall', item: 'Leftovers', gender: 'M',
				moves: ['Strength Sap', 'Growth', 'Stockpile'],
				signatureMove: 'Tipping Over',
				evs: {hp: 252, atk: 252, def: 4}, ivs: {spe: 0}, nature: 'Adamant',
			},
			'MicktheSpud': {
				species: 'Lycanroc-Midnight', ability: 'Fake Crash', item: 'Life Orb', gender: 'M', // Changes to Lycanroc-Dusk when ability is triggered
				moves: ['Stone Edge', 'Earthquake', ['Dragon Dance', 'Swords Dance']],
				signatureMove: 'Cyclone Spin',
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Jolly',
			},
			'Mitsuki': {
				species: 'Serperior', ability: 'Contrary', item: 'Leftovers', gender: 'M',
				moves: ['Leech Seed', 'Substitute', ['Earth Power', 'Flamethrower', 'Glare']],
				signatureMove: 'Python Ivy',
				evs: {spa: 252, spd: 4, spe: 252}, ivs: {atk: 0}, nature: 'Timid',
			},
			'Morfent ( _̀> ̀)': {
				species: 'Banette', ability: 'Intimidate', item: 'Banettite', gender: 'M',
				moves: ['Shadow Sneak', 'Spectral Thief', 'Drain Punch'],
				signatureMove: 'E',
				evs: {hp: 184, atk: 252, def: 68, spd: 4}, ivs: {spe: 0}, nature: 'Brave',
			},
			'nui': {
				species: 'Milotic', ability: 'Prismatic Surge', item: 'Waterium Z', gender: 'N',
				moves: ['Steam Eruption', 'Toxic', 'Recover'],
				signatureMove: 'Pyramiding Song',
				evs: {hp: 252, def: 252, spd: 4}, ivs: {atk: 0}, nature: 'Bold', shiny: true,
			},
			'OM': {
				species: 'Flareon', ability: 'Pixilate', item: 'Metronome', gender: 'M',
				moves: ['Leaf Blade', 'Thousand Arrows', 'Extreme Speed'],
				signatureMove: 'OM Boom',
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Adamant',
			},
			'Overneat': {
				species: 'Absol', ability: 'Intimidate', item: 'Absolite', gender: 'M',
				moves: ['Play Rough', 'Close Combat', 'Extreme Speed'],
				signatureMove: 'Ultimate Slash',
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Jolly',
			},
			'Pablo': {
				species: 'Blastoise', ability: 'Torrent', item: 'Blastoisinite', gender: 'M',
				moves: ['Muddy Water', 'Ice Beam', 'Slack Off'],
				signatureMove: 'Jail Shell',
				evs: {hp: 252, def: 4, spa: 252}, nature: 'Modest', shiny: true,
			},
			'Paradise': {
				species: 'Muk', ability: 'Unaware', item: 'Black Sludge', gender: '',
				moves: ['Wish', 'Knock Off', 'Protect'],
				signatureMove: 'Corrosive Toxic',
				evs: {hp: 252, def: 4, spd: 252}, nature: 'Careful',
			},
			'pluviometer': {
				species: 'Mismagius', ability: 'Sheer Force', item: 'Life Orb', gender: '',
				moves: ['Taunt', 'Moonblast', ['Mystical Fire', 'Earth Power']],
				signatureMove: 'Grammar Hammer',
				evs: {hp: 4, spa: 252, spe: 252}, ivs: {atk: 0}, nature: 'Timid',
			},
			'Pohjis': {
				species: 'Marowak', ability: 'Huge Power', item: 'Marowakium Z', gender: '',
				moves: ['Fire Punch', 'Knock Off', 'Trick Room'],
				signatureMove: 'Earthquake',
				evs: {hp: 252, atk: 252, spd: 4}, ivs: {spe: 0}, nature: 'Brave',
			},
			'PokemonDeadChannel': {
				species: 'Charizard', ability: 'Magic Guard', item: 'Charizardite Y', gender: '',
				moves: ['Aeroblast', 'Agility', 'Slack Off'],
				signatureMove: 'Plug Walk',
				evs: {def: 4, spa: 252, spe: 252}, nature: 'Timid', shiny: true,
			},
			// Alternate set for PokemonDeadChannel
			'PokemonDeadChannel Alt': {
				species: 'Charizard', ability: 'Magic Guard', item: 'Charizardite X', gender: '',
				moves: ['Dragon Hammer', 'Agility', 'Slack Off'],
				signatureMove: 'Plug Walk',
				evs: {atk: 252, spd: 4, spe: 252}, nature: 'Jolly', shiny: true,
			},
			'pre': {
				species: 'Deoxys', ability: 'Optimize', item: 'Rocky Helmet', gender: 'N',
				moves: ['Psycho Boost', 'Recover', 'Extreme Speed'],
				signatureMove: 'Refactor',
				evs: {hp: 252, def: 4, spd: 252}, ivs: {atk: 0}, nature: 'Bold', shiny: 64,
			},
			'ptoad': {
				species: 'Politoed', ability: 'Fat Rain', item: 'Damp Rock', gender: 'M',
				moves: ['Scald', 'Toxic', 'Ice Beam'],
				signatureMove: 'Lilypad Shield',
				evs: {hp: 252, def: 60, spd: 196}, ivs: {atk: 0}, nature: 'Calm',
			},
			'Psynergy': {
				species: 'Blaziken', ability: 'Wrath', item: 'Blazikenite', gender: 'M',
				moves: ['Flare Blitz', ['High Jump Kick', 'Superpower'], ['Wild Charge', 'Thunder Punch']],
				signatureMove: 'Resolve',
				evs: {atk: 252, spd: 4, spe: 252}, nature: 'Jolly',
			},
			'Quite Quiet': {
				species: 'Misdreavus', ability: 'Levitate', item: 'Leftovers', gender: 'F',
				moves: [['Moongeist Beam', 'Shadow Ball', 'Night Shade'], 'Recover', ['Flatter', 'Swagger']],
				signatureMove: 'Literally Cheating',
				evs: {hp: 252, def: 4, spe: 252}, ivs: {atk: 0}, nature: 'Timid',
			},
			'Rach': {
				species: 'Pikachu-Libre', ability: 'Huge Power', item: 'Fightinium Z', gender: 'F',
				moves: ['Flying Press', 'Icicle Crash', 'Thousand Arrows'],
				signatureMove: 'Stunner',
				evs: {hp: 4, atk: 252, spe: 252}, nature: 'Jolly',
			},
			'Rage': {
				species: 'Salamence', ability: 'Intimidate', item: 'Salamencite', gender: 'M',
				moves: ['Extreme Speed', 'Thousand Arrows', 'Frustration'],
				signatureMove: 'Rageeeee',
				evs: {atk: 252, spd: 4, spe: 252}, nature: 'Jolly',
			},
			'Raid': {
				species: 'Moltres', ability: 'Tempest', item: 'Life Orb', gender: 'N',
				moves: ['Hurricane', 'Roost', 'U-Turn'],
				signatureMove: 'Firestorm',
				evs: {def: 4, spa: 252, spe: 252}, nature: 'Timid',
			},
			'Rory Mercury': {
				species: 'Charjabug', ability: 'Recharge', item: 'Eviolite', gender: 'M',
				moves: ['First Impression', 'Leech Life', 'Bolt Strike'],
				signatureMove: 'Switch Off',
				evs: {hp: 252, atk: 252, def: 4}, ivs: {spe: 0}, nature: 'Brave',
			},
			'Saburo': {
				species: 'Metagross', ability: 'Levitate', item: 'Metagrossite', gender: 'M',
				moves: ['Psychic Fangs', 'Iron Head', ['Earthquake', 'Ice Punch']],
				signatureMove: 'Soulbend',
				evs: {hp: 184, atk: 148, spe: 176}, nature: 'Jolly', shiny: true,
			},
			'SamJo': {
				species: 'Mamoswine', ability: 'Thiccer Fat', item: 'Thiccinium Z', gender: '',
				moves: ['Icicle Crash', 'Precipice Blades', ['Ice Shard', 'Superpower', 'Stone Edge', 'Knock Off']],
				signatureMove: 'Thicc',
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Jolly',
			},
			'Scotteh': {
				species: 'Suicune', ability: 'Fur Coat', item: 'Leftovers', gender: 'M',
				moves: ['Nasty Plot', 'Ice Beam', 'Scald', 'Recover'],
				signatureMove: 'Geomagnetic Storm',
				evs: {def: 252, spa: 4, spe: 252}, nature: 'Bold',
			},
			'Shiba': {
				species: 'Fletchinder', ability: 'Gale Wings v1', item: 'Eviolite', gender: 'F',
				moves: ['Dragon Ascent', 'Sacred Fire', 'Roost'],
				signatureMove: 'GO INDA',
				evs: {hp: 248, atk: 252, spe: 8}, nature: 'Adamant',
			},
			'Slowbroth': {
				species: 'Beheeyem', ability: 'Psychic Surge', item: 'Psychium Z', gender: 'M',
				moves: ['Nasty Plot', 'Psystrike', ['Aura Sphere', 'Earth Power', 'Shadow Ball']],
				signatureMove: 'Alien Wave',
				evs: {hp: 252, spa: 252, spd: 4}, ivs: {atk: 0, spe: 0}, nature: 'Quiet',
			},
			'Snaquaza': {
				species: 'Honchkrow', ability: 'Illusion', item: 'Fakeclaimium Z', gender: 'M',
				moves: ['Superpower', 'Sucker Punch', ['Flamethrower', 'Ice Beam', 'Thunderbolt']],
				signatureMove: 'Brave Bird',
				nature: 'Serious',
			},
			'SpaceBass': {
				species: 'Foongus', ability: 'Prankster', item: 'Eviolite', gender: 'M',
				moves: ['Ingrain', 'Substitute', 'Baton Pass'],
				signatureMove: 'Army of Mushrooms',
				evs: {hp: 252, def: 128, spd: 128}, ivs: {atk: 0, spe: 0}, nature: 'Sassy',
			},
			'SparksBlade': {
				species: 'Blacephalon', ability: 'Magic Guard', item: 'Life Orb', gender: 'N',
				moves: ['Mind Blown', 'Shadow Ball', 'Explosion'],
				signatureMove: 'Kratosmana',
				evs: {hp: 4, spa: 252, spe: 252}, nature: 'Naive', shiny: true,
			},
			'SunGodVolcarona': {
				species: 'Volcarona', ability: 'Solar Flare', item: 'Volcaronium Z', gender: 'M',
				moves: ['Quiver Dance', 'Giga Drain', ['Earth Power', 'Psychic']],
				signatureMove: 'Fiery Dance',
				evs: {spa: 252, spd: 4, spe: 252}, ivs: {atk: 0}, nature: 'Timid',
			},
			'Sunny': {
				species: 'Sceptile', ability: 'Overgrow', item: 'Sceptilite', gender: 'M',
				moves: ['Sludge Wave', 'Draco Meteor', 'Focus Blast'],
				signatureMove: 'Leaf Blaster',
				evs: {def: 4, spa: 252, spe: 252}, nature: 'Timid', shiny: true,
			},
			'Teclis': {
				species: 'Darkrai', ability: 'Dark Aura', item: 'Darkrainium Z', gender: 'N',
				moves: ['Dark Pulse', 'Nasty Plot', 'Earth Power'],
				signatureMove: 'Dark Void',
				evs: {spa: 252, spd: 4, spe: 252}, ivs: {atk: 0}, nature: 'Timid',
			},
			'tennisace': {
				species: 'Raikou', ability: 'Levitate', item: 'Life Orb', gender: 'M',
				moves: ['Volt Switch', 'Ice Beam', ['Aura Sphere', 'Shadow Ball']],
				signatureMove: 'Ground Surge',
				evs: {spa: 252, spd: 4, spe: 252}, ivs: {atk: 0}, nature: 'Timid',
			},
			'Teremiare': {
				species: 'Zorua', ability: 'Not Prankster', item: 'Eject Button', gender: 'N',
				moves: ['Encore', 'Taunt', 'Lunar Dance'],
				signatureMove: 'Rotate',
				evs: {hp: 252, def: 136, spd: 120}, ivs: {atk: 0}, nature: 'Bold', shiny: true,
			},
			'The Immortal': {
				species: 'Buzzwole', ability: 'Beast Boost 2', item: ['Buzznium Z', 'Choice Scarf'], gender: 'M',
				moves: ['Leech Life', 'Plasma Fists', 'Ice Punch'],
				signatureMove: 'Drain Punch',
				evs: {hp: 4, atk: 252, spe: 252}, nature: 'Jolly',
			},
			'The Leprechaun': {
				species: 'Bronzong', ability: 'Steelworker', item: 'Life Orb', gender: 'N',
				moves: ['Photon Geyser', 'Precipice Blades', 'Diamond Storm'],
				signatureMove: 'Gyro Ballin\'',
				evs: {hp: 252, atk: 252, def: 4}, ivs: {spe: 0}, nature: 'Brave', shiny: true,
			},
			'torkool': {
				species: 'Torkoal', ability: 'Deflective Shell', item: 'Leftovers', gender: 'M',
				moves: ['Morning Sun', ['Lava Plume', 'Magma Storm'], 'Toxic'],
				signatureMove: 'Smoke Bomb',
				evs: {hp: 248, spa: 8, spd: 252}, nature: 'Calm',
			},
			'Trickster': {
				species: 'Hoopa', ability: 'Interdimensional', item: 'Life Orb', gender: 'M',
				moves: ['Inferno', 'Zap Cannon', ['Roost', 'Grass Whistle']],
				signatureMove: 'Mini Singularity',
				evs: {hp: 4, spa: 252, spe: 252}, ivs: {atk: 0}, nature: 'Timid',
			},
			'UnleashOurPassion': {
				species: 'Stunfisk', ability: 'Teravolt', item: 'Lum Berry', gender: 'M',
				moves: ['Earth Power', 'Shore Up', ['Surf', 'Giga Drain', 'Stealth Rock']],
				signatureMove: 'Continuous 1v1',
				evs: {hp: 252, spa: 200, spd: 56}, ivs: {atk: 0}, nature: 'Modest',
			},
			'vivalospride': {
				species: 'Araquanid', ability: 'TRASH VIV WEBS', item: 'Wave Incense', gender: 'M',
				moves: ['Liquidation', 'U-turn', 'Toxic'],
				signatureMove: 'CEILINGS ABSENT',
				evs: {hp: 64, atk: 252, spe: 192}, nature: 'Adamant',
			},
			'Volco': {
				species: 'Volcanion', ability: 'Unaware', item: 'Assault Vest', gender: 'M',
				moves: ["Steam Eruption", "Giga Drain", ["Ice Beam", "Ice Beam", "Earth Power"]],
				signatureMove: 'Explosive Drain',
				evs: {hp: 248, spa: 252, spd: 8}, ivs: {atk: 0}, nature: 'Modest',
			},
			'Xayah': {
				species: 'Noivern', ability: 'Dancer', item: 'Flyinium Z', gender: 'F',
				moves: ['Clanging Scales', 'Roost', 'Fiery Dance'],
				signatureMove: 'Stunning Dance',
				evs: {spa: 252, spd: 4, spe: 252}, nature: 'Timid',
			},
			'xfix': {
				species: 'Xatu', ability: 'Magic Bounce', item: 'Focus Sash', gender: 'M',
				moves: ['Substitute', ['Roost', 'Strength Sap'], 'Thunder Wave'],
				signatureMove: 'glitzer popping',
				evs: {hp: 4, def: 252, spd: 252}, nature: 'Calm',
			},
			'xJoelituh': {
				species: 'Marowak-Alola', ability: 'Club Expertise', item: 'Thick Club', gender: 'M',
				moves: ['Shadow Bone', 'Bonemerang', 'Drain Punch'],
				signatureMove: 'Lava Bone',
				evs: {atk: 252, def: 4, spe: 252}, ivs: {spa: 0}, nature: 'Jolly', shiny: true,
			},
			'XpRienzo ☑◡☑': {
				species: 'Reshiram', ability: 'Turboblaze', item: 'Charcoal', gender: 'M',
				moves: ['Core Enforcer', 'Volt Switch', 'Psystrike'],
				signatureMove: 'Blue Flare',
				evs: {spa: 252, spd: 4, spe: 252}, ivs: {atk: 0}, nature: 'Timid',
			},
			'Zarel': {
				species: 'Meloetta', ability: 'Serene Grace', item: '', gender: 'M',
				moves: ['Lunar Dance', 'Fiery Dance', 'Perish Song', 'Petal Dance', 'Quiver Dance'],
				signatureMove: 'Relic Song Dance',
				evs: {hp: 4, atk: 252, spa: 252}, nature: 'Quiet',
			},
		};
		let pool = Object.keys(sets);
		pool.splice(pool.indexOf('PokemonDeadChannel Alt'), 1);
		/** @type {{[type: string]: number}} */
		let typePool = {};
		let debug = true;
		let depth = 0;
		if (options.inBattle) this.allXfix = false;
		while (pool.length && team.length < 6) {
			if (depth >= 200) throw new Error(`Infinite loop in Super Staff Bros team generation.`);
			depth++;
			let name = '';
			if (debug && team.length === 1 && !options.inBattle) {
				// DEBUG CODE, remove before commiting to the main server
				name = 'Rage'; // Change name to force a set to appear
				pool.splice(pool.indexOf(name), 1);
			} else {
				name = this.allXfix ? 'xfix' : this.sampleNoReplace(pool);
			}
			let ssbSet = sets[name];

			if (name === 'PokemonDeadChannel' && Math.round(this.random())) {
				// Swap to the alternate set, use the same name
				ssbSet = sets['PokemonDeadChannel Alt'];
			}
			if (!this.allXfix) {
				// Enforce typing limits
				let types = this.getTemplate(ssbSet.species).types;
				let rejected = false;
				for (let type of types) {
					if (typePool[type] === undefined) typePool[type] = 0;
					if (typePool[type] >= 2) {
						// Reject
						rejected = true;
						break;
					}
				}
				if (rejected) continue;
				// Update type counts
				for (let type of types) {
					typePool[type]++;
				}
			}
			/** @type {PokemonSet} */
			let set = {
				name: name,
				species: ssbSet.species,
				item: Array.isArray(ssbSet.item) ? this.sampleNoReplace(ssbSet.item) : ssbSet.item,
				ability: Array.isArray(ssbSet.ability) ? this.sampleNoReplace(ssbSet.ability) : ssbSet.ability,
				moves: [],
				nature: Array.isArray(ssbSet.nature) ? this.sampleNoReplace(ssbSet.nature) : ssbSet.nature,
				gender: ssbSet.gender,
				evs: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
				ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
				level: ssbSet.level || 100,
				shiny: typeof ssbSet.shiny === 'number' ? this.randomChance(1, ssbSet.shiny) : ssbSet.shiny,
			};
			if (ssbSet.ivs) {
				for (let iv in ssbSet.ivs) {
					// IVs from the set override the default of 31, assume the hardcoded IVs are legal
					// @ts-ignore StatsTable has no index signature
					set.ivs[iv] = ssbSet.ivs[iv];
				}
			}
			if (ssbSet.evs) {
				for (let ev in ssbSet.evs) {
					// EVs from the set override the default of 0, assume the hardcoded EVs are legal
					// @ts-ignore StatsTable has no index signature
					set.evs[ev] = ssbSet.evs[ev];
				}
			} else {
				set.evs = {hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84};
			}
			while (set.moves.length < 3 && ssbSet.moves.length > 0) {
				let move = this.sampleNoReplace(ssbSet.moves);
				if (Array.isArray(move)) move = this.sampleNoReplace(move);
				set.moves.push(move);
			}
			set.moves.push(ssbSet.signatureMove);
			if (name === 'The Immortal' && set.item === 'Choice Scarf') set.moves[3] = 'Superpower';
			if (name === 'irritated' && !set.moves.includes('Double Iron Bash')) set.moves[this.random(3)] = 'Double Iron Bash';
			if (name === 'Rage') set.happiness = 0;
			team.push(set);
		}
		return team;
	}
}

module.exports = RandomStaffBrosTeams;
