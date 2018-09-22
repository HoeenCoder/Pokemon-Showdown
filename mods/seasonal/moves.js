'use strict';

// Used for bumbadadabum's move
const RandomStaffBrosTeams = require('./random-teams');
const Pokemon = require('../../sim/pokemon');

/** @type {{[k: string]: ModdedMoveData}} */
let BattleMovedex = {
	/*
	// Example
	"moveid": {
		accuracy: 100, // a number or true for always hits
		basePower: 100, // Not used for Status moves, base power of the move, number
		category: "Physical", // "Physical", "Special", or "Status"
		desc: "", // long description
		shortDesc: "", // short description, shows up in /dt
		id: "moveid",
		name: "Move Name",
		pp: 10, // unboosted PP count
		priority: 0, // move priority, -6 -> 6
		flags: {}, // Move flags https://github.com/Zarel/Pokemon-Showdown/blob/master/data/moves.js#L1-L27
		secondary: {
			status: "tox",
			chance: 20,
		}, // secondary, set to null to not use one. Exact usage varies, check data/moves.js for examples
		target: "normal", // What does this move hit?
		// normal = the targeted foe, self = the user, allySide = your side (eg light screen), foeSide = the foe's side (eg spikes), all = the field (eg raindance). More can be found in data/moves.js
		type: "Water", // The move's type
		// Other useful things
		noPPBoosts: true, // add this to not boost the PP of a move, not needed for Z moves, dont include it otherwise
		isZ: "crystalname", // marks a move as a z move, list the crystal name inside
		zMoveEffect: '', // for status moves, what happens when this is used as a Z move? check data/moves.js for examples
		zMoveBoost: {atk: 2}, // for status moves, stat boost given when used as a z move
		critRatio: 2, // The higher the number (above 1) the higher the ratio, lowering it lowers the crit ratio
		drain: [1, 2], // recover first num / second num % of the damage dealt
		heal: [1, 2], // recover first num / second num % of the target's HP
	},
	*/
	// Please keep sets organized alphabetically based on staff member name!
	// 2xTheTap
	noblehowl: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "",
		shortDesc: "",
		id: "noblehowl",
		name: "Noble Howl",
		pp: 3,
		noPPBoosts: true,
		priority: 0,
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Howl', source);
			this.add('-anim', source, 'Boomburst', source);
		},
		onHit: function (target, source, move) {
			this.boost({atk: 2}, source, source, 'move: Noble Howl');
			if (!(['', 'slp', 'frz'].includes(source.status))) {
				source.cureStatus();
			}
			let success = false;
			let removeTarget = ['reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
			let removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.getEffect(targetCondition).name, '[from] move: Noble Howl', '[of] ' + target);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.getEffect(sideCondition).name, '[from] move: Noble Howl', '[of] ' + source);
					success = true;
				}
			}
			return success;
		},
		flags: {mirror: 1, snatch: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	// Aelita
	energyfield: {
		accuracy: 100,
		basePower: 140,
		category: "Special",
		desc: "Has a 40% chance to paralyze the target. Lowers the user's spa, spd, and spe by 1 stage.",
		shortDesc: "40% to paralyze target. Lowers user's spa, spd, spe.",
		id: "energyfield",
		isNonstandard: true,
		name: "Energy Field",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Electro Ball", target);
			this.add('-anim', source, "Ion Deluge", target);
		},
		self: {boosts: {spa: -1, spd: -1, spe: -1}},
		secondary: {
			chance: 40,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
		zMovePower: 200,
	},
	// Andy
	pilfer: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "",
		shortDesc: "",
		id: "pilfer",
		name: "Pilfer",
		pp: 5,
		priority: 1,
		flags: {protect: 1, mirror: 1, contact: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
		},
		onTryHit: function (target, pokemon) {
			let decision = this.willMove(target);
			if (decision) {
				let move = this.getMoveCopy(decision.move.id);
				if (move.category === 'Status' && move.id !== 'mefirst') {
					this.useMove(move, pokemon, pokemon);
					this.attrLastMove('[still]');
					this.add('-anim', pokemon, "Sucker Punch", target);
					this.add('-anim', pokemon, "Night Slash", target);
					return;
				}
			}
			return false;
		},
		volatileStatus: 'pilfer',
		effect: {
			// Simulate the snatch effect while being able to use the pilfered move 1st
			duration: 1,
			onStart: function () {
			},
			onBeforeMovePriority: 3,
			onBeforeMove: function (pokemon, target, move) {
				if (move.category === 'Status') {
					this.add('-message', move.name + ' was pilfered and unable to be used.');
					return false;
				}
			},
		},
		target: "normal",
		type: "Dark",
	},
	// ant
	truant: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "The target's ability is changed to Truant if this move hits.",
		shortDesc: "Changes the target's ability to Truant.",
		id: "truant",
		name: "TRU ANT",
		pp: 5,
		flags: {protect: 1, mirror: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Sunsteel Strike', target);
		},
		onHit: function (pokemon) {
			let oldAbility = pokemon.setAbility('truant');
			if (oldAbility) {
				this.add('-ability', pokemon, 'Truant', '[from] move: TRU ANT');
				return;
			}
			return false;
		},
		target: "normal",
		type: "Steel",
	},
	// Akir
	compost: {
		accuracy: true,
		category: "Status",
		desc: "If any ally of the user fainted last turn, the user's atk, def, and spd are boosted by 1 stage, and the user's bad status condition is cured.",
		shortDesc: "Boosts stats and cures status if ally fainted last turn.",
		id: "compost",
		name: "Compost",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Ingrain", target);
		},
		onTry: function (pokemon) {
			if (pokemon.side.faintedLastTurn) {
				this.boost({atk: 1, def: 1, spd: 1});
				pokemon.cureStatus();
			}
		},
		secondary: null,
		target: "self",
		type: "Ghost",
	},
	// Arcticblast
	trashalanche: {
		basePower: 40,
		basePowerCallback: function (pokemon, target, move) {
			let noitem = 0;
			for (const foes of target.side.pokemon) {
				if (!foes.item) noitem += 40;
			}
			return move.basePower + noitem;
		},
		accuracy: 100,
		category: "Physical",
		desc: "",
		shortDesc: "",
		id: "trashalanche",
		name: "Trashalanche",
		pp: 10,
		flags: {protect: 1, mirror: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Gunk Shot", target);
		},
		secondary: null,
		target: "normal",
		type: "Poison",
	},
	// Arrested
	jailshell: {
		accuracy: 90,
		basePower: 90,
		category: "Special",
		id: "jailshell",
		name: "Jail Shell",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Anchor Shot", target);
		},
		onHit: function (target, source, move) {
			if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			source.addVolatile('imprison', source, move);
		},
		secondary: {
			chance: 50,
			status: 'par',
		},
		target: "normal",
		type: "Normal",
	},
	// Beowulf
	buzzingoftheswarm: {
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		desc: "Has a 20% chance to cause the target to flinch.",
		shortDesc: "20% chance to flinch",
		id: "buzzingoftheswarm",
		name: "Buzzing of the Swarm",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Bug Buzz', source);
		},
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Bug",
	},
	// biggie
	foodrush: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "Forces the target to switch to a random Pokemon.",
		shortDesc: "Forces the target to switch.",
		id: "foodrush",
		name: "Food Rush",
		pp: 10,
		priority: -6,
		flags: {protect: 1, mirror: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Stockpile', source);
			this.add('-anim', source, 'Spit Up', target);
		},
		forceSwitch: true,
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	// Brandon
	blusterywinds: {
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "",
		shortDesc: "",
		id: "blusterywinds",
		name: "Blustery Winds",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			// delta stream unable to be done without adding the weather for the move duration then removing it after
			this.add('-anim', source, "Defog", target);
		},
		onHit: function (target, source, move) {
			/** @type {boolean} */
			let success = false;
			if (this.clearWeather()) success = true;
			if (this.clearTerrain()) success = true;
			let removeAll = ['reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
			for (const targetCondition of removeAll) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.getEffect(targetCondition).name, '[from] move: Blustery Winds', '[of] ' + target);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.getEffect(sideCondition).name, '[from] move: Blustery Winds', '[of] ' + source);
					success = true;
				}
			}
			return success;
		},
		secondary: null,
		target: "normal",
		type: "Flying",
	},
	// bumbadadabum
	wondertrade: {
		accuracy: true,
		category: "Status",
		desc: "",
		shortDesc: "",
		id: "wondertrade",
		name: "Wonder Trade",
		pp: 2,
		noPPBoosts: true,
		priority: 0,
		flags: {},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Amnesia', source);
			this.add('-anim', source, 'Double Team', source);
		},
		onTryHit: function (target, source) {
			if (source.name !== 'bumbadadabum') {
				this.add('-fail', source);
				this.add('-hint', 'Only bumbadadabum can use Wonder Trade.');
				return null;
			}
		},
		onHit: function (target, source) {
			// Store percent of HP left, percent of PP left, and status for each pokemon on the user's team
			let carryOver = [];
			let currentTeam = source.side.pokemon;
			for (let pokemon of currentTeam) {
				carryOver.push({
					hp: pokemon.hp / pokemon.maxhp,
					status: pokemon.status,
					pp: pokemon.moveSlots.slice().map(m => {
						return m.pp / m.maxpp;
					}),
				});
			}
			// Generate a new team
			let generator = new RandomStaffBrosTeams(this.format, this.prng);
			let team = generator.generateTeam();
			// Overwrite un-fainted pokemon other than the user
			for (let i = 0; i < currentTeam.length; i++) {
				if (currentTeam[i].fainted || !currentTeam[i].hp || currentTeam[i].position === source.position) continue;
				let set = team.shift();
				let oldSet = carryOver[i];
				if (set.name === 'bumbadadabum') {
					// No way am I allowing 2 of this mon on one team
					set = team.shift();
				}

				// Bit of a hack so client doesn't crash when formeChange is called for the new pokemon
				let effect = this.effect;
				this.effect = /** @type {Effect} */ ({id: ''});
				let pokemon = new Pokemon(set, source.side);
				this.effect = effect;

				pokemon.hp = Math.floor(pokemon.maxhp * oldSet.hp) || 1;
				pokemon.status = oldSet.status;
				for (let j = 0; j < pokemon.moveSlots.length; j++) {
					pokemon.moveSlots[j].pp = pokemon.moveSlots[j].maxpp * oldSet.pp[j];
				}
				pokemon.position = currentTeam[i].position;
				currentTeam[i] = pokemon;
			}
			this.add('message', `${source.side.name} wonder traded their team away!`);
		},
		target: "self",
		type: "Psychic",
	},
	// cant say
	aesthetislash: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "The terrain becomes Grassy Terrain.",
		shortDesc: "Summons Grassy Terrain.",
		id: "aesthetislash",
		name: "a e s t h e t i s l a s h",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Geomancy', source);
			this.add('-anim', source, 'Swords Dance', source);
			this.add('-anim', source, 'Bloom Doom', target);
		},
		onHit: function () {
			this.setTerrain('grassyterrain');
		},
		target: "normal",
		type: "Steel",
	},
	// cc
	restartingrouter: {
		accuracy: 100,
		category: "Status",
		desc: "Boosts the user's spa and spe by 1 stage.",
		shortDesc: "+1 spa, spe",
		id: "restartingrouter",
		name: "Restarting Router",
		pp: 10,
		priority: 0,
		flags: {mirror: 1, snatch: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Charge', source);
		},
		boosts: {spa: 1, spe: 1},
		secondary: null,
		target: "self",
		type: "Electric",
	},
	// Ceteris
	bringerofdarkness: {
		accuracy: true,
		category: "Status",
		desc: "",
		shortDesc: "",
		id: "bringerofdarkness",
		name: "Bringer of Darkness",
		pp: 5,
		priority: 0,
		flags: {reflectable: 1, mirror: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dark Void", target);
		},
		onHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Spikes", target);
			target.side.addSideCondition('spikes');
			let stats = [];
			for (let stat in source.boosts) {
				// @ts-ignore
				if (stat !== 'accuracy' && stat !== 'evasion' && source.boosts[stat] < 6) {
					stats.push(stat);
				}
			}
			if (stats.length) {
				let randomStat = this.sample(stats);
				let boost = {};
				boost[randomStat] = 1;
				this.boost(boost, source);
			}
		},
		secondary: {
			chance: 50,
			status: 'slp',
		},
		target: "normal",
		type: "Dark",
	},
	// Cerberax
	blimpcrash: {
		accuracy: true,
		isNonstandard: true,
		onModifyAccuracy: function (accuracy, target, source) {
			if (target.isGrounded()) return 80;
			return accuracy;
		},
		basePower: 165,
		category: "Physical",
		desc: "80% Accuracy if target is grounded. The user and the target will be grounded, and the user will take 1/2 of the damage inflicted as recoil.",
		shortDesc: "80% Acc against grounded, grounds both sides, 1/2 recoil.",
		id: "blimpcrash",
		name: "Blimp Crash",
		pp: 5,
		priority: 0,
		flags: {mirror: 1, protect: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Head Smash', target);
			this.add('-anim', source, 'Earthquake', target);
		},
		onHit: function (target, source) {
			target.addVolatile('smackdown');
			source.addVolatile('smackdown');
		},
		secondary: null,
		recoil: [1, 2],
		target: "normal",
		type: "Flying",
	},
	// chaos
	forcewin: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		id: "forcewin",
		name: "Forcewin",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Entrainment", target);
			this.add('-anim', source, "Lock On", target);
		},
		onHit: function (target, source) {
			target.addVolatile('taunt', source);
			target.addVolatile('embargo', source);
			target.addVolatile('torment', source);
			target.addVolatile('confusion', source);
			target.addVolatile('healblock', source);
		},
		secondary: null,
		target: "normal",
		type: "???",
	},
	// Chloe
	beskyttelsesnet: {
		accuracy: true,
		category: "Status",
		desc: "",
		shortDesc: "",
		id: "beskyttelsesnet",
		name: "beskyttelsesnet",
		pp: 10,
		priority: 0,
		flags: {mirror: 1, snatch: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Geomancy', source);
			this.add('-anim', source, 'Memento', target);
		},
		onHit: function (target, source) {
			source.side.addSideCondition('lightscreen', source);
			source.side.addSideCondition('reflect', source);
			source.side.addSideCondition('safeguard', source);
		},
		selfdestruct: "ifHit",
		secondary: null,
		target: "self",
		type: "Dark",
	},
	// deg
	luciddreams: {
		accuracy: 100,
		category: "Status",
		desc: "The foe falls asleep, and is inflicted with and leech seed. The user loses 1/2 of their HP.",
		shortDesc: "Foe: sleep + nightmare + leech seed. User loses 1/2 HP.",
		id: "luciddreams",
		name: "Lucid Dreams",
		pp: 5,
		priority: 0,
		flags: {mirror: 1, snatch: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dark Void', target);
			this.add('-anim', source, 'Night Shade', target);
		},
		onHit: function (target, source, move) {
			let hadEffect = false;
			if (target.trySetStatus('slp')) hadEffect = true;
			if (target.addVolatile('nightmare')) hadEffect = true;
			if (target.addVolatile('leechseed')) hadEffect = true;
			if (!hadEffect) {
				this.add('-fail', target);
			} else {
				this.damage(source.maxhp / 2, source, source, 'recoil');
			}
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	// DragonWhale
	earthsblessing: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "",
		shortDesc: "",
		id: "earthsblessing",
		name: "Earth's Blessing",
		pp: 5,
		priority: 0,
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Swords Dance', source);
			this.add('-anim', source, 'Wood Hammer', source);
		},
		onHit: function (pokemon, move) {
			if (this.pseudoWeather.gravity) return false;
			this.boost({atk: 2}, pokemon, pokemon, 'move: Earth\'s Blessing');
			this.addPseudoWeather('gravity');
			if (['', 'slp', 'frz'].includes(pokemon.status)) return;
			pokemon.cureStatus();
		},
		flags: {mirror: 1, snatch: 1},
		secondary: null,
		target: "self",
		type: "Ground",
		zMoveEffect: 'healhalf',
	},
	// duck
	holyduck: {
		accuracy: 95,
		basePower: 95,
		category: "Physical",
		desc: "",
		shortDesc: "",
		id: "holyduck",
		name: "Holy Duck!",
		pp: 5,
		priority: 1,
		flags: {mirror: 1, protect: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Extreme Speed', target);
			this.add('-anim', source, 'Feather Dance', target);
		},
		onTryHit: function (pokemon) {
			if (pokemon.runImmunity('Normal')) {
				pokemon.side.removeSideCondition('reflect');
				pokemon.side.removeSideCondition('lightscreen');
				pokemon.side.removeSideCondition('auroraveil');
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	// E4 Flint
	fangofthefireking: {
		accuracy: 100,
		basePower: 0,
		damage: 150,
		category: "Physical",
		desc: "Does 150 damage and burns the target.",
		shortDesc: "Does 150 damage, burns.",
		id: "fangofthefireking",
		name: "Fang of the Fire King",
		pp: 10,
		priority: 0,
		flags: {mirror: 1, protect: 1, bite: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Burn Up', target);
			this.add('-anim', source, 'Crunch', target);
			this.add('-anim', source, 'Crunch', target);
		},
		onHit: function (target, source) {
			target.setStatus('brn', source, null, true);
			// Cringy message
			if (this.random(5) === 1) this.add(`c|@E4 Flint|here's a __taste__ of my __firepower__ XD`);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	// explodingdaisies
	doom: {
		basePower: 100,
		accuracy: 100,
		category: "Special",
		desc: "",
		shortDesc: "",
		id: "doom",
		name: "DOOM!",
		pp: 5,
		priority: 0,
		flags: {mirror: 1, protect: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Eruption', target);
			this.add('-anim', source, 'Sunny Day', source);
		},
		weather: 'sunnyday',
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	// Eien
	ancestralpower: {
		accuracy: true,
		category: "Status",
		desc: "",
		shortDesc: "",
		id: "ancestralpower",
		name: "Ancestral Power",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
		},
		onHit: function (target, source, move) {
			let baseForme = source.template.id;
			let formes = {
				celebi: 'Future Sight',
				jirachi: 'Doom Desire',
				manaphy: 'Tail Glow',
				shaymin: 'Seed Flare',
				victini: 'V-create',
			};
			let forme = Object.keys(formes)[this.random(5)];
			source.formeChange(forme, this.getAbility('psychicsurge'), true);
			this.boost({atk: 1, spa: 1}, source, source, move);
			this.useMove(formes[forme], source, target);
			this.boost({atk: -1, spa: -1}, source, source, move);
			source.formeChange(baseForme, this.getAbility('psychicsurge'), true);
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	// eternally
	quack: {
		accuracy: 100,
		category: "Status",
		desc: "Boosts the users def, spd, and spe by 1 stage.",
		shortDesc: "+1 def, spd, spe",
		id: "quack",
		name: "Quack",
		pp: 5,
		priority: 0,
		flags: {mirror: 1, snatch: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Feather Dance', source);
			this.add('-anim', source, 'Aqua Ring', source);
		},
		boosts: {def: 1, spd: 1, spe: 1},
		secondary: null,
		target: "self",
		type: "Flying",
	},
	// EV
	evoblast: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "This move's type changes to match the user's primary type. This move is a Physical attack if the user's atk stat is greater than its spa stat, otherwise its a Special attack.",
		shortDesc: "Type = users type. Physical if atk > spa, else Special.",
		id: "evoblast",
		name: "Evoblast",
		pp: 10,
		priority: 0,
		flags: {mirror: 1, protect: 1},
		isNonstandard: true,
		onModifyMove: function (move, pokemon, target) {
			move.type = pokemon.types[0];
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		onPrepareHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Extreme Evoboost', source);
			switch (move.type) {
			case 'Fire':
				this.add('-anim', source, 'Flamethrower', target);
				break;
			case 'Electric':
				this.add('-anim', source, 'Thunderbolt', target);
				break;
			case 'Water':
				this.add('-anim', source, 'Bubblebeam', target);
				break;
			case 'Psychic':
				this.add('-anim', source, 'Psybeam', target);
				break;
			case 'Dark':
				this.add('-anim', source, 'Dark Pulse', target);
				break;
			case 'Grass':
				this.add('-anim', source, 'Solar Beam', target);
				break;
			case 'Ice':
				this.add('-anim', source, 'Ice Beam', target);
				break;
			case 'Fairy':
				this.add('-anim', source, 'Dazzling Gleam', target);
				break;
			}
		},
		onHit: function (target, source) {
			let stat = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy'][this.random(6)];
			let boost = {};
			boost[stat] = 1;
			this.boost(boost, source);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	// False
	frck: {
		accuracy: true,
		basePower: 1000,
		category: "Physical",
		desc: "",
		shortDesc: "",
		id: "frck",
		name: "fr*ck",
		pp: 6,
		noPPBoosts: true,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		selfdestruct: "ifHit",
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-activate', source, 'move: Celebrate');
			this.add('-anim', source, 'Searing Sunraze Smash', target);
			this.add('-anim', source, 'Explosion', target);
		},
		secondary: null,
		target: "normal",
		type: "???",
	},
	// grimAuxiliatrix
	paintrain: {
		accuracy: 100,
		basePower: 0,
		basePowerCallback: function (pokemon, target) {
			let targetWeight = target.getWeight();
			let pokemonWeight = pokemon.getWeight();
			if (pokemonWeight > targetWeight * 5) {
				return 120;
			}
			if (pokemonWeight > targetWeight * 4) {
				return 100;
			}
			if (pokemonWeight > targetWeight * 3) {
				return 80;
			}
			if (pokemonWeight > targetWeight * 2) {
				return 60;
			}
			return 40;
		},
		category: "Physical",
		desc: "The power of this move depends on (user's weight / target's weight), rounded down. Power is equal to 120 if the result is 5 or more, 100 if 4, 80 if 3, 60 if 2, and 40 if 1 or less. Damage doubles and no accuracy check is done if the target has used Minimize while active.",
		shortDesc: "More power the heavier the user than the target.",
		id: "paintrain",
		isNonstandard: true,
		name: "Pain Train",
		pp: 10,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Meteor Mash', target);
		},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	// Hippopotas
	hazardpass: {
		accuracy: 100,
		category: "Status",
		pp: 20,
		desc: "The user sets 2 of Stealth Rocks, Spikes (1 layer), Toxic Spikes (1 layer), and Sticky Web on the foe's side of the field, and then switches out.",
		shortDesc: "Sets 2 random hazards, then switches out.",
		id: "hazardpass",
		isNonstandard: true,
		name: "Hazard Pass",
		flags: {reflectable: 1, mirror: 1, authentic: 1},
		onPrepareHit: function () {
			this.attrLastMove('[still]');
		},
		onHitSide: function (target, source) {
			// All possible hazards, and their maximum possible layer count
			/** @type {{[key: string]: number}} */
			let hazards = {stealthrock: 1, spikes: 3, toxicspikes: 2, stickyweb: 1};
			// Check how many layers of each hazard can still be added to the foe's side
			if (target.getSideCondition('stealthrock')) delete hazards.stealthrock;
			if (target.getSideCondition('spikes')) {
				hazards.spikes -= target.sideConditions['spikes'].layers;
				if (!hazards.spikes) delete hazards.spikes;
			}
			if (target.getSideCondition('toxicspikes')) {
				hazards.toxicspikes -= target.sideConditions['toxicspikes'].layers;
				if (!hazards.toxicspikes) delete hazards.toxicspikes;
			}
			if (target.getSideCondition('stickyweb')) delete hazards.stickyweb;
			// Create a list of hazards not yet at their maximum layer count
			let hazardTypes = Object.keys(hazards);
			// If there are no possible hazards, don't do anything
			if (!hazardTypes.length) return false;
			// Pick a random hazard, and set it
			let hazard1 = this.sample(hazardTypes);
			// Theoretically, this should always work
			this.add('-anim', source, this.getMove(hazard1).name, target);
			target.addSideCondition(hazard1, source, this.effect);
			// If that was the last possible layer of that hazard, remove it from our list of possible hazards
			if (hazards[hazard1] === 1) {
				hazardTypes.splice(hazardTypes.indexOf(hazard1), 1);
				// If there are no more hazards we can set, end early on a success
				if (!hazardTypes.length) return true;
			}
			// Set the last hazard and animate the switch
			let hazard2 = this.sample(hazardTypes);
			this.add('-anim', source, this.getMove(hazard2).name, target);
			target.addSideCondition(hazard2, source, this.effect);
			this.add('-anim', source, "Baton Pass", target);
		},
		selfSwitch: true,
		secondary: null,
		target: "foeSide",
		type: "Normal",
		zMoveBoost: {def: 1},
	},
	//hoeenhero
	scripting: {
		accuracy: 100,
		category: "Status",
		desc: "The user summon's rainy weather and boosts its spa by 1 stage.",
		shortDesc: "Rain Dance & +1 spa",
		id: "scripting",
		name: "Scripting",
		pp: 5,
		priority: 0,
		flags: {mirror: 1, snatch: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Calm Mind', source);
			this.add('-anim', source, 'Geomancy', source);
		},
		weather: 'raindance',
		boosts: {spa: 1},
		secondary: null,
		target: "self",
		type: "Psychic",
	},
	// imas
	boi: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "",
		shortDesc: "",
		id: "boi",
		name: "B O I",
		pp: 15,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Supersonic Skystrike', target);
		},
		recoil: [33, 100],
		secondary: null,
		target: "normal",
		type: "Flying",
	},
	// Iyarito
	vbora: {
		accuracy: 100,
		category: "Status",
		desc: "Cures the user's party of all status conditions, but poisons the user.",
		shortDesc: "Cures party's statuses, poisons self.",
		id: "vbora",
		name: "Víbora",
		pp: 5,
		flags: {mirror: 1, snatch: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Acid Armor', source);
		},
		onHit: function (pokemon, source, move) {
			//this.add('-activate', source, 'move: Víbora');
			let success = false;
			for (const ally of pokemon.side.pokemon) {
				if (ally.cureStatus()) success = true;
			}
			pokemon.setStatus('psn', pokemon);
			return success;
		},
		secondary: null,
		target: "allyTeam",
		type: "Poison",
	},
	// jdarden
	"wyvernswail": {
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "Deals damage and forces target to switch. Sound based",
		shortDesc: "Deals damage and forces target to switch. Sound based",
		id: "wyvernswail",
		name: "Wyvern's Wail",
		pp: 15,
		priority: -6,
		flags: {protect: 1, mirror: 1, sound: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Whirlwind', source);
		},
		forceSwitch: true,
		target: "normal",
		type: "Flying",
	},
	// kalalokki
	maelstrm: {
		accuracy: 85,
		basePower: 100,
		category: "Special",
		desc: "The user traps the target, preventing them from switching out.",
		shortDesc: "Traps the target",
		id: "maelstrm",
		name: "Maelström",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'partiallytrapped',
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dark Void', target);
			this.add('-anim', source, 'Surf', target);
		},
		onHit: function (target, source) {
			target.addVolatile('maelstrm', source);
		},
		effect: {
			duration: 5,
			durationCallback: function (target, source) {
				if (source.hasItem('gripclaw')) {
					this.debug('maelstrm grip claw duration boost');
					return 8;
				}
				return 5;
			},
			onStart: function () {
				this.add('message', 'It became trapped in an enormous maelström!');
			},
			onResidualOrder: 11,
			onResidual: function (pokemon) {
				if (this.effectData.source.hasItem('bindingband')) {
					this.debug('maelstrm binding band damage boost');
					this.damage(pokemon.maxhp / 6);
				} else {
					this.damage(pokemon.maxhp / 8);
				}
			},
			onEnd: function () {
				this.add('message', 'The maelström dissipated.');
			},
			onTrapPokemon: function (pokemon) {
				pokemon.tryTrap();
			},
		},
		secondary: null,
		target: "normal",
		type: "Water",
	},
	// Kay
	inkzooka: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Lowers the user's Defense, Special Defense and Speed by 1 stage.",
		shortDesc: "Lowers the user's Def, SpD and Spe by 1.",
		isNonstandard: true,
		id: "inkzooka",
		name: "Inkzooka",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Never Ending Nightmare', target);
		},
		self: {
			boosts: {
				def: -1,
				spd: -1,
				spe: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	// KingSwordYT
	dragonwarriortouch: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		id: "dragonwarriortouch",
		name: "Dragon Warrior Touch",
		isNonstandard: true,
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, punch: 1, contact: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Outrage', target);
			this.add('-anim', source, 'Drain Punch', target);
		},
		self: {
			boosts: {
				atk: 1,
			},
		},
		drain: [1, 2],
		target: "normal",
		type: "Fighting",
	},
	// Level 51
	nextlevelstrats: {
		accuracy: true,
		category: "Status",
		desc: "The user gains 5 levels when using this move.",
		shortDesc: "User gains 5 levels",
		id: "nextlevelstrats",
		name: "Next Level Strats",
		pp: 5,
		isNonstandard: true,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Nasty Plot", target);
		},
		onHit: function (pokemon) {
			const template = pokemon.template;
			pokemon.level += 5;
			pokemon.set.level = pokemon.level;
			pokemon.formeChange(template);
			// ability is set to default from formeChange
			pokemon.setAbility('unaware');
			this.add('-hint', 'Level 51 still has the Unaware ability.');

			pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
			this.add('detailschange', pokemon, pokemon.details);

			const newHP = Math.floor(Math.floor(2 * template.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100) * pokemon.level / 100 + 10);
			pokemon.hp = newHP - (pokemon.maxhp - pokemon.hp);
			pokemon.maxhp = newHP;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');

			this.add('-message', `${pokemon.name} advanced 10 levels! It is now level ${pokemon.level}!`);
		},
		secondary: null,
		target: "self",
		type: "Normal",

	},
	// LifeisDANK
	barfight: {
		accuracy: 100,
		basePower: 10,
		category: "Physical",
		desc: "3 Priority. Gives the user and target +3 atk, -3 def and confusion.",
		shortDesc: "Hits first. +3 atk, -3 def & confusion for both sides.",
		id: "barfight",
		name: "Bar Fight",
		isNonstandard: true,
		pp: 10,
		priority: 3,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fake Out", target);
			this.add('-anim', source, "Feather Dance", target);
			return this.runEvent('StallMove', source);
		},
		onHit: function (target, source) {
			source.addVolatile('stall');
			this.boost({atk: 3, def: -3}, target);
			this.boost({atk: 3, def: -3}, source);
			target.addVolatile('confusion');
			source.addVolatile('confusion');
			target.addVolatile('flinch');
		},
		secondary: null,
		target: "normal",
		type: "Flying",
	},
	// Lycanium Z
	changelingcrash: {
		accuracy: 100,
		basePower: 50,
		category: "Special",
		desc: "",
		shortDesc: "",
		id: "changelingcrash",
		name: "Changeling Crash",
		pp: 10,
		priority: 3,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Play Rough", target);
		},
		onHit: function (target, pokemon) {
			if (!pokemon.transformInto(target, pokemon)) {
				return false;
			}
		},
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Bug",
	},
	// MacChaeger
	naptime: {
		accuracy: 100,
		category: "Status",
		desc: "The user falls asleep for the next turn and restores 50% of its HP, curing itself of any major status condition. If the user falls asleep in this way, all other active Pokemon that are not asleep or frozen also try to use Nap Time. Fails if the user has full HP, is already asleep, or if another effect is preventing sleep.",
		shortDesc: "All active Pokemon sleep 1 turn, restore HP & status.",
		id: "naptime",
		isNonstandard: true,
		name: "Nap Time",
		pp: 5,
		priority: 0,
		isNonstandard: true,
		flags: {snatch: 1, heal: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rest", target);
			this.add('-anim', source, "Aromatic Mist", target);
		},
		onTryMove: function (pokemon) {
			this.attrLastMove('[still]');
			if (pokemon.hp < pokemon.maxhp && pokemon.status !== 'slp' && !pokemon.hasAbility('comatose')) return;
			this.add('-fail', pokemon);
			return null;
		},
		onHit: function (target, source, move) {
			let napWeather = this.pseudoWeather['naptime'];
			// Trigger sleep clause if not the original user
			// @ts-ignore
			if (!target.setStatus('slp', napWeather.source, move)) return false;
			target.statusData.time = 2;
			target.statusData.startTime = 2;
			this.heal(target.maxhp / 2); //Aesthetic only as the healing happens after you fall asleep in-game
			this.add('-status', target, 'slp', '[from] move: Rest');
			// @ts-ignore
			if (napWeather.source === target) {
				for (let i = 0; i < this.sides.length; i++) {
					for (let j = 0; j < this.sides[i].active.length; j++) {
						let curMon = this.sides[i].active[j];
						if (curMon === source) continue;
						if (curMon && curMon.hp && curMon.status !== 'slp' && curMon.status !== 'frz' && !curMon.hasAbility('comatose')) {
							this.add('-anim', source, "Yawn", curMon);
							this.useMove(move, curMon, curMon, move);
						}
					}
				}
			}
			this.removePseudoWeather('naptime');
		},
		pseudoWeather: 'naptime',
		effect: {
			duration: 1,
		},
		target: "self",
		type: "Fairy",
		zMoveEffect: 'clearnegativeboosts',
	},
	// MajorBowman
	blazeofglory: {
		accuracy: true,
		basePower: 0,
		isNonstandard: true,
		damageCallback: function (pokemon) {
			let damage = pokemon.hp;
			pokemon.faint();
			return damage;
		},
		category: "Physical",
		desc: "",
		shortDesc: "",
		id: "blazeofglory",
		name: "Blaze of Glory",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Recover", source);
			this.heal(source.maxhp, source, source, 'Blaze of Glory');
			this.add('-anim', source, "Final Gambit", target);
		},
		isZ: "victiniumz",
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	// martha
	crystalboost: {
		accuracy: 90,
		basePower: 75,
		category: "Special",
		desc: "Has a 50% chance to boost the user's spa by 1 stage.",
		shortDesc: "50% chance to boost spa by 1 stage.",
		id: "crystalboost",
		name: "Crystal Boost",
		isNonstandard: true,
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Power Gem", target);
		},
		secondary: {
			chance: 50,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Rock",
	},
	// Marty
	"typeanalysis": {
		accuracy: true,
		category: "Status",
		desc: "If the user is a Silvally, it gains a Memory to match one of the target's weaknesses, changes form, and uses Multi-Attack. This move and its effects ignore the Abilities of other Pokemon. Fails if the target has no weaknesses, or if the user is not a Silvally.",
		shortDesc: "Changes form to match the target's weakness.",
		id: "typeanalysis",
		name: "Type Analysis",
		pp: 10,
		priority: 0,
		flags: {authentic: 1, protect: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Conversion", source);
		},
		onHit: function (target, source) {
			if (source.baseTemplate.baseSpecies !== 'Silvally') return false;
			let targetTypes = target.getTypes(true).filter(type => type !== '???');
			if (!targetTypes.length) {
				if (target.addedType) {
					targetTypes = ['Normal'];
				} else {
					return false;
				}
			}
			let weaknesses = [];
			for (let type in this.data.TypeChart) {
				let typeMod = this.getEffectiveness(type, targetTypes);
				if (typeMod > 0 && this.getImmunity(type, target)) weaknesses.push(type);
			}
			if (!weaknesses.length) {
				return false;
			}
			let randomType = this.sample(weaknesses);
			source.setItem(randomType + 'memory');
			this.add('-item', source, source.getItem(), '[from] move: Type Analysis');
			let template = this.getTemplate('Silvally-' + randomType);
			source.formeChange(template, this.getAbility('rkssystem'), true);
			let move = this.getMoveCopy('multiattack');
			move.ignoreAbility = true;
			this.useMove(move, source, target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMoveEffect: 'heal',
	},
	// Meicoo
	scavengesu: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "",
		shortDesc: "",
		id: "scavengesu",
		name: "/scavenges u",
		pp: 5,
		priority: 0,
		flags: {mirror: 1, protect: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Imprison", source);
			this.add('-anim', source, "Miracle Eye", target);
		},
		onHit: function (target, source) {
			this.boost({atk: -2, spa: -2}, source, source, 'move: /scavenges u');
			let targetBoosts = {};
			let sourceBoosts = {};

			for (let i in target.boosts) {
				// @ts-ignore
				targetBoosts[i] = target.boosts[i];
				// @ts-ignore
				sourceBoosts[i] = source.boosts[i];
			}

			target.setBoost(sourceBoosts);
			source.setBoost(targetBoosts);

			this.add(`c|%Meicoo|cool quiz`);

			this.add('-swapboost', source, target, '[from] move: /scavenges u');
			this.add('-message', source.name + ' switched stat changes with its target!');
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	// Megazard
	tippingover: {
		accuracy: 100,
		basePower: 20,
		basePowerCallback: function (pokemon, target, move) {
			return move.basePower + 20 * pokemon.positiveBoosts();
		},
		category: "Physical",
		desc: "Power is equal to 20+(X*20), where X is the user's total stat stage changes that are greater than 0. If the user had any stockpile layers, they lose them.",
		shortDesc: "+20 per boost. Removes some defensive boosts.",
		id: "tippingover",
		name: "Tipping Over",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Hammer", target);
			this.add('-anim', target, "Earthquake", target);
		},
		onTry: function (pokemon) {
			if (!pokemon.volatiles['stockpile']) {
				this.add('-fail', pokemon);
				return false;
			}
		},
		onHit: function (target, source, move) {
			let stockpileLayers = source.volatiles['stockpile'].layers;
			let boosts = {};
			boosts.def = (source.boosts.def - stockpileLayers) * -1;
			boosts.spd = (source.boosts.spd - stockpileLayers) * -1;
			this.boost(boosts, source, source, move);
		},
		secondary: null,
		target: "normal",
		type: "???",
	},
	// MicktheSpud
	cyclonespin: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "",
		shortDesc: "",
		id: "cyclonespin",
		name: "Cyclone Spin",
		pp: 10,
		priority: 0,
		flags: {mirror: 1, protect: 1, contact: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rapid Spin", target);
		},
		self: {
			onHit: function (pokemon) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Cyclone Spin', '[of] ' + pokemon);
				}
				let sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.getEffect(condition).name, '[from] move: Cyclone Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
	// moo
	proteinshake: {
		accuracy: 100,
		category: "Status",
		desc: "The user's Attack, Special Attack, and Speed are boosted by 1. The user also gains 100kg of weight.",
		shortDesc: "+1 atk, spa, and spe. User gains 100kg.",
		id: "proteinshake",
		name: "Protein Shake",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Milk Drink", source);
		},
		isNonstandard: true,
		volatileStatus: 'proteinshake',
		effect: {
			onStart: function (pokemon) {
				this.effectData.multiplier = 1;
				this.add('-start', pokemon, 'Protein Shake', '[silent]');
			},
			onRestart: function (pokemon) {
				this.effectData.multiplier++;
				this.add('-start', pokemon, 'Protein Shake', '[silent]');
			},
			onModifyWeightPriority: 1,
			onModifyWeight: function (weight, pokemon) {
				if (this.effectData.multiplier) {
					weight += this.effectData.multiplier * 100;
					return weight;
				}
			},
		},
		boosts: {atk: 1, def: 1, spe: 1},
		secondary: null,
		target: "self",
		type: "Normal",
	},
	// nui
	pyramidingsong: {
		accuracy: 100,
		desc: "",
		shortDesc: "",
		id: "pyramidingsong",
		name: "Pyramiding Song",
		category: "Status",
		pp: 20,
		priority: 0,
		flags: {mirror: 1, protect: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Freeze Dry", target);
			this.add('-anim', source, "Mist", target);
		},
		onTryHit: function (target, source, move) {
			target.side.addSideCondition('pyramidingsong');
		},
		onHit: function (target, source, move) {
			if (this.runEvent('DragOut', source, target, move)) {
				source.forceSwitchFlag = true;
			}
		},
		effect: {
			duration: 1,
			onSwitchIn: function (pokemon) {
				this.boost({spe: -1}, pokemon, pokemon.side.foe.active[0], this.getMove('pyramidingsong'));
			},
		},
		forceSwitch: true,
		secondary: null,
		target: "normal",
		type: "Water",
		zMoveEffect: "boostreplacement",
	},
	// OM
	omboom: {
		accuracy: 95,
		basePower: 110,
		desc: "",
		shortDesc: "",
		id: "omboom",
		name: "OM Boom",
		category: "Physical",
		pp: 15,
		priority: 0,
		flags: {mirror: 1, protect: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fire Lash", target);
			this.add('-anim', source, "Heat Crash", target);
		},
		onHit: function () {
			this.add(`c|%OM|Bang Bang`);
		},
		secondary: {
			chance: 50,
			self: {
				boosts: {
					spe: 2,
				},
			},
		},
		target: "normal",
		type: "Fire",
	},
	// Osiris
	nightmarch: {
		basePower: 60,
		basePowerCallback: function (pokemon, target, move) {
			let faintedmons = 0;
			for (const ally of pokemon.side.pokemon) {
				if (ally.fainted || !ally.hp) faintedmons += 20;
			}
			for (const foes of target.side.pokemon) {
				if (foes.fainted || !foes.hp) faintedmons += 20;
			}
			return move.basePower + faintedmons;
		},
		isNonstandard: true,
		accuracy: 100,
		category: "Physical",
		desc: "",
		shortDesc: "",
		id: "nightmarch",
		name: "Night March",
		pp: 5,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Nightmare", target);
			this.add('-anim', source, "Moongeist Beam", target);
			this.add('-anim', source, "Stomping Tantrum", target);
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	// Paradise
	"corrosivetoxic": {
		accuracy: true,
		category: "Status",
		desc: "",
		shortDesc: "",
		id: "corrosivetoxic",
		name: "Corrosive Toxic",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Toxic", target);
		},
		onTryHit: function (target, source, move) {
			// hacky way of forcing toxic to effect poison / steel types without corrosion usage
			if (target.hasType('Steel') || target.hasType('Poison')) {
				let status = this.getEffect(move.status);
				target.status = status.id;
				target.statusData = {id: status.id, target: target, source: source, stage: 0};
				this.add('-status', target, target.status);
				move.status = undefined;
			}
		},
		status: 'tox',
		secondary: null,
		target: "normal",
		type: "Poison",
	},
	// Quite Quiet
	literallycheating: {
		accuracy: true,
		category: "Status",
		desc: "",
		shortDesc: "",
		id: "literallycheating",
		name: "Literally Cheating",
		pp: 5,
		priority: 0,
		flags: {nosky: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Genesis Supernova", source);
		},
		isNonstandard: true,
		terrain: 'literallycheating',
		effect: {
			duration: 3,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 5;
				}
				return 3;
			},
			onBoost: function (boost, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				let positiveBoost = false;
				let values = Object.values(boost);
				for (let i of values) {
					if (i !== undefined && i > 0) {
						positiveBoost = true;
						break;
					}
				}
				if (!positiveBoost || !target.lastMove) return;
				target.deductPP(target.lastMove.id, target.lastMove.pp);
				this.add('-activate', target, 'move: Literally Cheating', target.lastMove.name, target.lastMove.pp);
				this.add('-message', `${target.name} lost PP!`);
			},
			onStart: function (battle, source, effect) {
				this.add('-fieldstart', 'move: Literally Cheating');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'move: Literally Cheating');
			},
		},
		secondary: null,
		target: "all",
		type: "Ghost",
	},
	// Scotteh
	geomagneticstorm: {
		accuracy: 100,
		basePower: 140,
		category: "Special",
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
		id: "geomagneticstorm",
		name: "Geomagnetic Storm",
		pp: 10,
		priority: 0,
		isNonstandard: true,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Discharge", target);
		},
		secondary: null,
		target: "allAdjacent",
		type: "Electric",
	},
	// Shiba
	goinda: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Attack by 2 stages and Speed by 1 stage.",
		shortDesc: "Raises the user's Attack by 2 and Speed by 1.",
		id: "goinda",
		name: "GO INDA",
		pp: 5,
		priority: 0,
		flags: {snatch: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Swords Dance", source);
			this.add('-anim', source, "Sacred Fire", source);
		},
		boosts: {
			atk: 2,
			spe: 1,
		},
		target: "self",
		type: "Flying",
	},
	// tennisace
	groundsurge: {
		accuracy: 100,
		basePower: 95,
		desc: "",
		shortDesc: "",
		id: "groundsurge",
		name: "Ground Surge",
		category: "Special",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Thunder", target);
			this.add('-anim', source, "Fissure", target);
		},
		onModifyMovePriority: -5,
		onModifyMove: function (move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Electric'] = true;
			}
		},
		onEffectiveness: function (typeMod, type) {
			if (type === 'Ground') return 1;
		},
		secondary: null,
		target: "normal",
		type: "Electric",
	},
	// Teremiare
	nofunzone: {
		accuracy: 100,
		category: "Status",
		desc: "",
		shortDesc: "",
		id: "nofunzone",
		name: "No Fun Zone",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, mirror: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Celebrate", target);
		},
		onHit: function (target, source) {
			for (const side of this.sides) {
				for (const pokemon of side.active) {
					if (pokemon.hasAbility('soundproof')) continue;
					pokemon.cureStatus();
				}
			}
			target.addVolatile('healblock');
			target.addVolatile('embargo');
			let removeTarget = ['reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
			let removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.getEffect(targetCondition).name, '[from] move: No Fun Zone', '[of] ' + target);
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.getEffect(sideCondition).name, '[from] move: No Fun Zone', '[of] ' + source);
				}
			}
			this.add('-clearallboost');
			for (const side of this.sides) {
				for (const pokemon of side.active) {
					if (pokemon && pokemon.isActive) pokemon.clearBoosts();
				}
			}
			for (const clear in this.pseudoWeather) {
				if (clear.endsWith('mod') || clear.endsWith('clause')) continue;
				this.removePseudoWeather(clear);
			}
			this.clearWeather();
			this.clearTerrain();
		},
		secondary: null,
		target: "foe",
		type: "Normal",
	},
	// The Immortal
	ultrasucc: {
		accuracy: 95,
		basePower: 90,
		desc: "The user boosts their speed by 1 stage, and recovers 50% of the damage dealt.",
		shortDesc: "+1 spe, user heals 50% of the damage dealt.",
		id: "ultrasucc",
		name: "Ultra Succ",
		category: "Physical",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Ascent", target);
			this.add('-anim', source, "Draining Kiss", target);
		},
		self: {
			boosts: {spe: 1},
		},
		drain: [1, 2],
		target: "normal",
		type: "Fighting",
	},
	// Tiksi
	devolutionwave: {
		accuracy: true,
		basePower: 25,
		category: "Physical",
		desc: "This move hits 5 times. After the first hit, the target is badly poisoned or paralyzed. After the second hit, the target swaps abilities with the user, or gains the water type. After the third hit, the target gains stealth rocks or a layer of spikes on their side. After the fourth hit, grassy terrain or misty terrain covers the field. After the fifth hit, the user gains a boost of 1 stage in atk or def.",
		shortDesc: "Hits 5 times, various effects after each hit.",
		id: "devolutionwave",
		name: "Devolution Wave",
		pp: 1,
		priority: 0,
		flags: {},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psywave", target);
		},
		multihit: 5,
		onAfterHit: function (target, source, move) {
			// @ts-ignore hack for tiksi's move
			if (!move.curHits) move.curHits = 1;
			let option = this.random(2);
			this.add('-anim', source, 'Rock Throw', target);
			// @ts-ignore hack for tiksi's move
			switch (move.curHits) {
			case 1:
				if (option) {
					target.trySetStatus('tox', source);
				} else {
					target.trySetStatus('par', source);
				}
				break;
			case 2:
				if (option) {
					let bannedAbilities = ['battlebond', 'comatose', 'disguise', 'illusion', 'multitype', 'powerconstruct', 'rkssystem', 'schooling', 'shieldsdown', 'stancechange', 'wonderguard'];
					if (bannedAbilities.includes(target.ability) || bannedAbilities.includes(source.ability)) {
						this.add('-fail', target, 'move: Skill Swap');
						break;
					}
					let targetAbility = this.getAbility(target.ability);
					let sourceAbility = this.getAbility(source.ability);
					if (target.side === source.side) {
						this.add('-activate', source, 'move: Skill Swap', '', '', '[of] ' + target);
					} else {
						this.add('-activate', source, 'move: Skill Swap', targetAbility, sourceAbility, '[of] ' + target);
					}
					this.singleEvent('End', sourceAbility, source.abilityData, source);
					this.singleEvent('End', targetAbility, target.abilityData, target);
					if (targetAbility.id !== sourceAbility.id) {
						source.ability = targetAbility.id;
						target.ability = sourceAbility.id;
						source.abilityData = {id: toId(source.ability), target: source};
						target.abilityData = {id: toId(target.ability), target: target};
					}
					this.singleEvent('Start', targetAbility, source.abilityData, source);
					this.singleEvent('Start', sourceAbility, target.abilityData, target);
				} else {
					if (!target.setType('Water')) {
						this.add('-fail', target, 'move: Soak');
					} else {
						this.add('-start', target, 'typechange', 'Water');
					}
				}
				break;
			case 3:
				if (option) {
					target.side.addSideCondition('stealthrock');
				} else {
					target.side.addSideCondition('spikes');
				}
				break;
			case 4:
				if (option) {
					this.setTerrain('grassyterrain', source);
				} else {
					this.setTerrain('mistyterrain', source);
				}
				break;
			case 5:
				if (option) {
					this.boost({atk: 1}, source);
				} else {
					this.boost({def: 1}, source);
				}
				break;
			}
			// @ts-ignore hack for tiksi's move
			move.curHits++;
		},
		isZ: "tiksiumz",
		secondary: null,
		target: "normal",
		type: "Rock",
	},
	// torkool
	smokebomb: {
		accuracy: 100,
		category: "Status",
		desc: "Moves all hazards on the user's side of the field to the foe's side of the field. The user then switches out.",
		shortDesc: "Moves hazards to foe's side. Switches out.",
		id: "smokebomb",
		name: "Smoke Bomb",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, mirror: 1},
		isNonstandard: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Smokescreen", target);
			this.add('-anim', source, "Parting Shot", target);
		},
		onHit: function (target, source) {
			const sideConditions = {'spikes': 1, 'toxicspikes': 1, 'burnspikes': 1, 'stealthrock': 1, 'stickyweb': 1};
			for (let i in sideConditions) {
				let layers = source.side.sideConditions[i] ? (source.side.sideConditions[i].layers || 1) : 1;
				if (source.side.removeSideCondition(i)) {
					this.add('-sideend', source.side, this.getEffect(i).name, '[from] move: Smoke Bomb', '[of] ' + source);
					for (layers; layers > 0; layers--) target.side.addSideCondition(i, source);
				}
			}
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	// Trickster
	minisingularity: {
		accuracy: 55,
		basePower: 0,
		basePowerCallback: function (pokemon, target) {
			let targetWeight = target.getWeight();
			if (targetWeight >= 200) {
				this.debug('120 bp');
				return 120;
			}
			if (targetWeight >= 100) {
				this.debug('100 bp');
				return 100;
			}
			if (targetWeight >= 50) {
				this.debug('80 bp');
				return 80;
			}
			if (targetWeight >= 25) {
				this.debug('60 bp');
				return 60;
			}
			if (targetWeight >= 10) {
				this.debug('40 bp');
				return 40;
			}
			this.debug('20 bp');
			return 20;
		},
		category: "Special",
		isNonstandard: true,
		desc: "The heavier the target is, the more damage this move does. The target's item is replaced with an Iron Ball, and the target's weight is doubled.",
		shortDesc: "Heavier foe = more power. Increases foe's weigth.",
		id: "minisingularity",
		name: "Mini Singularity",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: "minisingularity",
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Spacial Rend", target);
			this.add('-anim', source, "Flash", target);
		},
		onAfterHit: function (target, source) {
			if (source.hp) {
				let item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Mini Singularity', '[of] ' + source);
					target.setItem('ironball');
					this.add('-message', target.name + ' obtained an Iron Ball.');
				}
			}
		},
		effect: {
			noCopy: true,
			onStart: function (pokemon) {
				this.add('-message', pokemon.name + ' weight has doubled.');
			},
			onModifyWeight: function (weight) {
				return weight * 2;
			},
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	// urkerab
	holyorders: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "holyorders",
		name: "Holy Orders",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit: function () {
			this.attrLastMove('[still]');
		},
		onHit: function (target, source) {
			this.useMove("healorder", source, source);
			this.useMove("defendorder", source, source);
			this.useMove("attackorder", source, source.side.foe.active[0]);
		},
		isNonstandard: true,
		secondary: null,
		target: "self",
		type: "Bug",
	},
	// XpRienzo ☑◡☑
	blehflame: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "Has a 10% chance to raise the user's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage.",
		shortDesc: "10% chance to raise all stats by 1 (not acc/eva).",
		id: "blehflame",
		name: "Bleh Flame",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flame Charge", target);
			this.add('-anim', source, "Overheat", target);
		},
		secondary: {
			chance: 10,
			self: {
				boosts: {
					atk: 1,
					def: 1,
					spa: 1,
					spd: 1,
					spe: 1,
				},
			},
		},
		isNonstandard: true,
		target: "normal",
		type: "Fire",
	},
	// Yuki
	cutieescape: {
		accuracy: true,
		category: "Status",
		desc: "",
		shortDesc: "",
		id: "cutieescape",
		name: "Cutie Escape",
		pp: 10,
		priority: -6,
		flags: {snatch: 1, mirror: 1},
		isNonstandard: true,
		beforeTurnCallback: function (pokemon) {
			pokemon.addVolatile('cutieescape');
			this.add('-message', `${pokemon.name} is preparing to flee!`);
		},
		beforeMoveCallback: function (pokemon) {
			if (!pokemon.volatiles['cutieescape'] || !pokemon.volatiles['cutieescape'].tookDamage) {
				this.add('-fail', pokemon, 'move: Cutie Escape');
				this.add('-hint', 'Cutie Escape only works when Yuki is hit in the same turn the move is used.');
				return true;
			}
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Baton Pass", source);
		},
		onHit: function (target, source) {
			target.addVolatile('confusion');
			target.addVolatile('cutietrap');
		},
		effect: {
			duration: 1,
			onStart: function (pokemon) {
				this.add('-singleturn', pokemon, 'move: Cutie Escape');
			},
			onHit: function (pokemon, source, move) {
				if (move.category !== 'Status') {
					pokemon.volatiles['cutieescape'].tookDamage = true;
				}
			},
		},
		selfSwitch: true,
		target: "normal",
		type: "Fairy",
	},
	// Zarel
	relicsongdance: {
		accuracy: 100,
		basePower: 60,
		multihit: 2,
		category: "Special",
		id: "relicsongdance",
		name: "Relic Song Dance",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		ignoreImmunity: true,
		isNonstandard: true,
		onTryHit: function (target, pokemon) {
			this.attrLastMove('[still]');
			let move = pokemon.template.speciesid === 'meloettapirouette' ? 'Brick Break' : 'Relic Song';
			this.add('-anim', pokemon, move, target);
		},
		onHit: function (target, pokemon, move) {
			if (pokemon.template.speciesid === 'meloettapirouette') {
				pokemon.formeChange('Meloetta');
			} else if (pokemon.formeChange('Meloetta-Pirouette')) {
				move.category = 'Physical';
				move.type = 'Fighting';
			}
		},
		onAfterMove: function (pokemon) {
			// Ensure Meloetta goes back to standard form after using the move
			if (pokemon.template.speciesid === 'meloettapirouette') {
				pokemon.formeChange('Meloetta');
			}
			this.add('-hint', 'Zarel still has the Serene Grace ability.');
		},
		effect: {
			duration: 1,
			onAfterMoveSecondarySelf: function (pokemon, target, move) {
				if (pokemon.template.speciesid === 'meloettapirouette') {
					pokemon.formeChange('Meloetta');
				} else {
					pokemon.formeChange('Meloetta-Pirouette');
				}
				pokemon.removeVolatile('relicsong');
			},
		},
		target: "allAdjacentFoes",
		type: "Psychic",
	},
};

exports.BattleMovedex = BattleMovedex;
