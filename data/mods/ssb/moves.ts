import {getName} from './conditions';
// Used for grimAuxiliatrix's move
import {ssbSets} from "./random-teams";
import {changeSet, changeMoves} from "./abilities";

export const Moves: {[k: string]: ModdedMoveData} = {
	/*
	// Example
	moveid: {
		accuracy: 100, // a number or true for always hits
		basePower: 100, // Not used for Status moves, base power of the move, number
		category: "Physical", // "Physical", "Special", or "Status"
		desc: "", // long description
		shortDesc: "", // short description, shows up in /dt
		name: "Move Name",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10, // unboosted PP count
		priority: 0, // move priority, -6 -> 6
		flags: {}, // Move flags https://github.com/smogon/pokemon-showdown/blob/master/data/moves.js#L1-L27
		onTryMove() {
			this.attrLastMove('[still]'); // For custom animations
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Move Name 1', source);
			this.add('-anim', source, 'Move Name 2', source);
		}, // For custom animations
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
		zMove: {effect: ''}, // for status moves, what happens when this is used as a Z move? check data/moves.js for examples
		zMove: {boost: {atk: 2}}, // for status moves, stat boost given when used as a z move
		critRatio: 2, // The higher the number (above 1) the higher the ratio, lowering it lowers the crit ratio
		drain: [1, 2], // recover first num / second num % of the damage dealt
		heal: [1, 2], // recover first num / second num % of the target's HP
	},
	*/
	// Please keep sets organized alphabetically based on staff member name!
	// Adri
	skystriker: {
		accuracy: 100,
		basePower: 50,
		category: "Special",
		desc: "If this move is successful and the user has not fainted, the effects of Leech Seed and binding moves end for the user, and all hazards are removed from the user's side of the field. Raises the user's Speed by 1 stage.",
		shortDesc: "Free user from hazards/bind/Leech Seed; +1 Spe.",
		name: "Skystriker",
		isNonstandard: "Custom",
		gen: 8,
		pp: 30,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Aerial Ace', target);
		},
		onAfterHit(target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Skystriker', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'shiftingrocks', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Skystriker', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		onAfterSubDamage(damage, target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Skystriker', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'shiftingrocks', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Skystriker', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		self: {
			boosts: {
				spe: 1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Flying",
	},

	// aegii
	reset: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "King's Shield; except reduces the opponent's attacking stat by 1 if hit by a Special or contact move. Changes the user's set from Physical to Special or Special to Physical.",
		shortDesc: "King's Shield; reduces attacking stat by 1 if hit by a contact or special move; Changes the user's set.",
		name: "Reset",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'reset',
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this .add('-anim', source, 'Petal Dance', target);
			this .add('-anim', source, 'King\'s Shield', source);
		},
		onTryHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
			pokemon.m.swapSets();
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect'] || move.category === 'Status') {
					if (move.isZ || (move.isMax && !move.breaksProtect)) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Reset');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (move.category === "Special") {
					this.boost({spa: -1}, source, target, this.dex.getActiveMove("Reset"));
				} else if (move.category === "Physical" && move.flags["contact"]) {
					this.boost({atk: -1}, source, target, this.dex.getActiveMove("Reset"));
				}
				return this.NOT_FAIL;
			},
		},
		secondary: null,
		target: "self",
		type: "Steel",
	},

	// Aelita
	xanaskeystolyoko: {
		accuracy: 100,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return move.basePower + 20 * pokemon.positiveBoosts();
		},
		category: "Physical",
		desc: "Power is equal to 20+(X*20), where X is the user's total stat stage changes that are greater than 0. User raises a random stat if it has less than 5 positive stat changes.",
		shortDesc: "+ 20 power for each of the user's stat boosts. Boosts a random stat if below 5 boosts.",
		name: "XANA's Keys To Lyoko",
		isNonstandard: "Custom",
		gen: 8,
		pp: 40,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Draco Meteor', target);
		},
		self: {
			onHit(pokemon) {
				if (pokemon.positiveBoosts() < 5) {
					const stats: BoostName[] = [];
					let stat: BoostName;
					for (stat in pokemon.boosts) {
						if (stat !== 'accuracy' && stat !== 'evasion' && pokemon.boosts[stat] < 6) {
							stats.push(stat);
						}
					}
					if (stats.length) {
						const randomStat = this.sample(stats);
						const boost: SparseBoostsTable = {};
						boost[randomStat] = 1;
						this.boost(boost);
					}
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
	},

	// Aeonic
	lookingcool: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up Stealth Rock on the opposing side of the field and boosts the user's Attack by 2 stages. Can only be used once per the user's time on the field.",
		shortDesc: "1 use per switchin. +2 Atk + Stealth Rock.",
		name: "Looking Cool",
		isNonstandard: "Custom",
		gen: 8,
		pp: 5,
		priority: 0,
		flags: {},
		volatileStatus: 'lookingcool',
		onTryMove(target) {
			if (target.volatiles['lookingcool']) return false;
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			const foe = source.side.foe.active[0];
			this.add('-anim', source, 'Smokescreen', source);
			this.add('-anim', source, 'Stealth Rock', foe);
		},
		onHit(target, source, move) {
			const foe = source.side.foe;
			if (!foe.getSideCondition('stealthrock')) {
				foe.addSideCondition('stealthrock');
			}
		},
		boosts: {
			atk: 2,
		},
		secondary: null,
		target: "self",
		type: "Dark",
	},

	// Aethernum
	lilypadoverflow: {
		accuracy: 100,
		basePower: 60,
		basePowerCallback(source, target, move) {
			if (!source.volatiles['raindrop'] || !source.volatiles['raindrop'].layers) return move.basePower;
			return move.basePower + (source.volatiles['raindrop'].layers * 20);
		},
		category: "Special",
		desc: "Power is equal to 60 + (Number of Raindrops collected * 20). Whether or not this move is successful, the user's Defense and Special Defense decrease by as many stages as Raindrop had increased them, and the user's Raindrop count resets to 0.",
		shortDesc: "More power with more collected Raindrops.",
		name: "Lilypad Overflow",
		isNonstandard: "Custom",
		gen: 8,
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Water Spout', target);
			this.add('-anim', source, 'Max Geyser', target);
		},
		onAfterMove(pokemon) {
			if (pokemon.volatiles['raindrop']) pokemon.removeVolatile('raindrop');
		},
		secondary: null,
		target: "normal",
		type: "Water",
	},

	// Akir
	ravelin: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "Heals 50% of the user's max HP; Sets up Light Screen for 5 turns on the user's side.",
		shortDesc: "Heals 50% of the user's max HP; Sets up Light Screen for 5 turns on the user's side.",
		name: "Ravelin",
		isNonstandard: "Custom",
		gen: 8,
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Aura Sphere', target);
			this.add('-anim', source, 'Protect', source);
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			this.heal(pokemon.maxhp / 2, pokemon, pokemon, move);
			if (pokemon.side.getSideCondition('lightscreen')) return;
			pokemon.side.addSideCondition('lightscreen');
		},
		secondary: null,
		target: "normal",
		type: "Steel",
	},

	// Alpha
	blisteringiceage: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "On switch-in, the weather becomes extremely heavy hailstorm lasts for 3 turns that prevents damaging Steel-type moves from executing, causes Ice-type moves to be 50% stronger, causes all non-Ice-type Pokemon on the opposing side to take 1/8 damage from hail, and causes all moves to have a 10% chance to freeze. This weather bypasses Magic Guard and Overcoat. This weather remains in effect until the 3 turns are up, or the weather is changed by Delta Stream, Desolate Land, or Primordial Sea.",
		shortDesc: "3 Turns. Heavy Hailstorm. Steel fail. 1.5x Ice.",
		name: "Blistering Ice Age",
		isNonstandard: "Custom",
		gen: 8,
		pp: 1,
		priority: 0,
		flags: {},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Hail', target);
			this.add('-anim', target, 'Subzero Slammer', target);
			this.add('-anim', source, 'Subzero Slammer', source);
		},
		isZ: "caioniumz",
		secondary: null,
		weather: 'heavyhailstorm',
		target: "all",
		type: "Ice",
	},

	// Annika
	refactor: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises Special Attack by 1 stage and regenerates user and foe movesets, restoring PP.",
		shortDesc: "Regenerates user, foe movesets; +1 Sp. Atk.",
		name: "Refactor",
		isNonstandard: "Custom",
		gen: 8,
		pp: 5,
		flags: {authentic: 1},
		priority: -7,
		onHit(target, source, move) {
			for (const pokemon of this.getAllActive()) {
				const newMoveIDs: (string | string[])[] = [ssbSets[pokemon.name].signatureMove];
				while (newMoveIDs.length < 4) {
					const randomIndex = Math.floor(Math.random() * ssbSets[pokemon.name].moves.length);
					newMoveIDs.push(ssbSets[pokemon.name].moves[randomIndex]);
				}
				const newMoves = changeMoves(this, pokemon, newMoveIDs);
				pokemon.moveSlots = newMoves;
				// @ts-ignore
				pokemon.baseMoveSlots = newMoves;
				this.add('-message', `${source.name} refactored ${pokemon === target ? `themselves` : `the opposing ${pokemon.name}`}!`);
			}
		},
		target: "self",
		type: "Psychic",
	},

	// A Quag To The Past
	bountyplace: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Puts a bounty on the target. If the target is KOed by a direct attack, the attacker will gain +1 Attack, Defense, Special Attack, Special Defense, and Speed. If the target has a major status condition, it cannot have a bounty placed on it.",
		shortDesc: "Puts a bounty on the target.",
		name: "Bounty Place",
		isNonstandard: "Custom",
		gen: 8,
		pp: 1,
		priority: 0,
		flags: {},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Pay Day', target);
			this.add('-anim', source, 'Block', target);
		},
		status: "bounty",
		isZ: "quagniumz",
		secondary: null,
		target: "normal",
		type: "Ground",
	},

	// a random duck
	grapes: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Restores 50% HP, 50% Chance to boost Attack OR Speed 1 stage",
		shortDesc: "Restores 50% HP, 50% Chance to boost Attack OR Speed 1 stage,",
		name: "Grapes",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {heal: 1},
		heal: [1, 2],
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Splash', source);
			this.add('-anim', source, 'Dragon Dance', source);
			this.add('-anim', source, 'Roost', source);
		},
		onHit(target, source, move) {
			if (!this.randomChance(1, 2)) return;
			const boostName: string[] = ['atk', 'spe'];
			const boost: {[key: string]: number} = {};
			boost[boostName[this.random(2)]] = 1;
			this.boost(boost, target);
		},
		target: "self",
		type: "Flying",
	},

	// ArchasTL
	broadsidebarrage: {
		accuracy: 90,
		basePower: 30,
		category: "Physical",
		shortDesc: "Hits 4 times. Super effective on Steel.",
		name: "Broadside Barrage",
		isNonstandard: "Custom",
		gen: 8,
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', target, 'Close Combat', target);
			this.add('-anim', target, 'Earthquake', target);
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Steel') return 1;
		},
		multihit: 4,
		secondary: null,
		target: "normal",
		type: "Steel",
	},

	// Arcticblast
	radiantburst: {
		accuracy: 100,
		basePower: 180,
		category: "Special",
		desc: "Move causes Tapu Fini to become Brilliant if not, and vice versa. Move Mode depends on whether Tapu Fini is Brilliant or not.",
		shortDesc: "Move's Mode depends on whether Tapu Fini has the Brilliant condition or not.",
		name: "Radiant Burst",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 1,
		flags: {protect: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onTry(source, target) {
			if (!source.volatiles['brilliant']) {
				this.add('-anim', source, 'Recover', source);
				source.addVolatile('brilliant');
				return null;
			}
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Diamond Storm', target);
		},
		onModifyPriority(priority, source, target, move) {
			if (source.volatiles['brilliant']) return 0;
		},
		onModifyMove(move, source) {
			if (!source.volatiles['brilliant']) {
				move.accuracy = true;
				move.target = "self";
				move.flags.protect = 0;
			}
		},
		onHit(target, pokemon) {
			this.add(`c|${getName('Arcticblast')}|YEET`);
			if (pokemon.volatiles['brilliant']) pokemon.removeVolatile('brilliant');
		},
		secondary: null,
		infiltrates: true,
		target: "normal",
		type: "Fairy",
	},

	// Averardo
	hatofwisdom: {
		accuracy: 100,
		basePower: 110,
		category: "Special",
		desc: "Deals damage two turns after this move is used. At the end of that turn, the damage is calculated at that time and dealt to the Pokemon at the position the target had when the move was used. If the user is no longer active at the time, damage is calculated based on the user's natural Special Attack stat, types, and level, with no boosts from its held item or Ability. Fails if this move or Doom Desire is already in effect for the target's position.",
		shortDesc: "Hits 1 turn after being used. User switches.",
		name: "Hat of Wisdom",
		isNonstandard: "Custom",
		gen: 8,
		pp: 15,
		priority: 0,
		flags: {},
		ignoreImmunity: true,
		isFutureMove: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 2,
				move: 'hatofwisdom',
				source: source,
				moveData: {
					id: 'hatofwisdom',
					name: "Hat of Wisdom",
					accuracy: 100,
					basePower: 110,
					category: "Special",
					priority: 0,
					flags: {},
					ignoreImmunity: false,
					effectType: 'Move',
					isFutureMove: true,
					type: 'Psychic',
				},
			});
			this.add('-start', source, 'move: Hat of Wisdom');
			source.switchFlag = 'hatofwisdom' as ID;
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
	},

	// awa
	awa: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "Sets up Sandstorm.",
		shortDesc: "Sets up Sandstorm.",
		name: "awa!",
		isNonstandard: "Custom",
		gen: 8,
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Let\'s Snuggle Forever', target);
		},
		weather: 'sandstorm',
		secondary: null,
		target: "normal",
		type: "Rock",
	},

	// Beowulf
	buzzinspection: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Gains the ability Compound Eyes and then switches out",
		shortDesc: "Gains Compound Eyes and switches.",
		name: "Buzz Inspection",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Night Shade', source);
		},
		onHit(pokemon) {
			pokemon.baseAbility = 'compoundeyes' as ID;
			pokemon.setAbility('compoundeyes');
			this.add('-ability', pokemon, pokemon.getAbility().name, '[from] move: Buzz Inspection');
		},
		selfSwitch: true,
		secondary: null,
		target: "self",
		type: "Bug",
	},

	// biggie
	juggernautpunch: {
		accuracy: 100,
		basePower: 150,
		category: "Physical",
		desc: "The user loses its focus and does nothing if it is hit by a damaging attack this turn before it can execute the move.",
		shortDesc: "Fails if the user takes damage before it hits.",
		name: "Juggernaut Punch",
		isNonstandard: "Custom",
		gen: 8,
		pp: 20,
		priority: -3,
		flags: {contact: 1, protect: 1, punch: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Focus Punch', target);
		},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('juggernautpunch');
		},
		beforeMoveCallback(pokemon) {
			if (pokemon.volatiles['juggernautpunch'] && pokemon.volatiles['juggernautpunch'].lostFocus) {
				this.add('cant', pokemon, 'Juggernaut Punch', 'Juggernaut Punch');
				return true;
			}
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Juggernaut Punch');
			},
			onDamagePriority: -101,
			onDamage(damage, target, source, effect) {
				if (effect.effectType !== 'Move') return;
				if (damage > target.baseMaxhp / 5) {
					target.volatiles['juggernautpunch'].lostFocus = true;
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
	},

	// Blaz
	bleakdecember: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "Damage is calculated using the user's Special Defense stat as its Special Attack, including stat stage changes. Other effects that modify the Special Attack stat are used as normal.",
		shortDesc: "Uses user's SpD stat as SpA in damage calculation.",
		name: "Bleak December",
		isNonstandard: "Custom",
		gen: 8,
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Spirit Break', target);
		},
		useSourceDefensiveAsOffensive: true,
		secondary: null,
		target: "normal",
		type: "Fairy",
	},

	// Brandon
	flowershower: {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "This move is physical if the target's Defense is lower than the target's Special Defense.",
		shortDesc: "Physical if target Def < Sp. Def.",
		name: "Flower Shower",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Petal Dance', target);
		},
		onModifyMove(move, source, target) {
			if (target.getStat('def') < target.getStat('spd')) {
				move.category = "Physical";
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
	},

	// Used for Brandon's ability
	baneterrain: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the terrain becomes Bane Terrain. During the effect, moves hit off of the Pokemon's weaker attacking stat. Fails if the current terrain is Bane Terrain.",
		shortDesc: "5 turns. Moves hit off of weaker stat.",
		name: "Bane Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'baneterrain',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			// Stat modifying in scripts.ts
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Bane Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Bane Terrain');
				}
			},
			onResidualOrder: 5,
			onResidualSubOrder: 3,
			onResidual() {
				this.eachEvent('Terrain');
			},
			onEnd() {
				if (!this.effectData.duration) this.eachEvent('Terrain');
				this.add('-fieldend', 'move: Bane Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Grass",
		zMove: {boost: {def: 1}},
		contestType: "Beautiful",
	},

	// Cake
	kevin: {
		accuracy: true,
		basePower: 100,
		category: "Physical",
		desc: "This move combines the user's current typing in its type effectiveness against the target.",
		shortDesc: "Combines current types in its type effectiveness.",
		name: "Kevin",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source, move) {
			this.add('-anim', source, 'Brave Bird', target);
			if (!this.randomChance(255, 256)) {
				this.attrLastMove('[miss]');
				this.add('-activate', target, 'move: Celebrate');
				this.add('-miss', source);
				this.hint("In Super Staff Bros, this move can still miss 1/256 of the time regardless of accuracy or evasion.");
				return null;
			}
		},
		onModifyType(move, pokemon, target) {
			move.type = pokemon.types[0];
		},
		onTryImmunityPriority: -2,
		onTryImmunity(target, pokemon) {
			if (pokemon.types[1]) {
				if (!target.runImmunity(pokemon.types[1])) return false;
			}
			return true;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			const pokemon = target.side.foe.active[0];
			if (pokemon.types[1]) {
				return typeMod + this.dex.getEffectiveness(pokemon.types[1], type);
			}
			return typeMod;
		},
		priority: 0,
		recoil: [1, 8],
		secondary: null,
		target: "normal",
		type: "Bird",
	},

	// cant say
	neverlucky: {
		accuracy: 85,
		basePower: 110,
		category: "Special",
		desc: "Doubles base power if statused. Has a 10% chance to boost every stat 1 stage. High Crit Ratio.",
		shortDesc: "Doubles base power if statused. Has a 10% chance to boost every stat 1 stage. High Crit Ratio.",
		name: "Never Lucky",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Overheat', target);
		},
		onBasePower(basePower, pokemon) {
			if (pokemon.status && pokemon.status !== 'slp') {
				return this.chainModify(2);
			}
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
		critRatio: 2,
		target: "normal",
		type: "Fire",
	},

	// Celestial
	pandorasbox: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Please refer to the guide for details on this move.",
		shortDesc: "Please refer to the guide for details on this move.",
		name: "Pandora's Box",
		isNonstandard: "Custom",
		gen: 8,
		pp: 8,
		priority: 1,
		flags: {},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Teeter Dance', target);
		},
		volatileStatus: 'pandorasbox',
		condition: {
			onStart(target) {
				const typeMovePair: {[key: string]: string} = {
					'Normal': 'Body Slam',
					'Fighting': 'Drain Punch',
					'Flying': 'Floaty Fall',
					'Poison': 'Baneful Banker',
					'Ground': 'Shore Up',
					'Rock': 'Stealth Rock',
					'Bug': 'Sticky Web',
					'Ghost': 'Shadow Sneak',
					'Steel': 'Iron Defense',
					'Fire': 'Fire Fang',
					'Water': 'Life Dew',
					'Grass': 'Synthesis',
					'Electric': 'Thunder Fang',
					'Psychic': 'Psychic Fangs',
					'Ice': 'Icicle Crash',
					'Dragon': 'Dragon Darts',
					'Dark': 'Taunt',
					'Fairy': 'Play Rough',
				};
				const foe = target.side.foe;
				const types = [foe.pokemon[this.random(foe.pokemon.length)].types[0]];
				for (const pokemon of foe.pokemon) {
					if (!types.includes(pokemon.types[0])) {
						types.push(pokemon.types[0]);
						break;
					}
				}
				const moves = [typeMovePair[types[0]], typeMovePair[types[1]]];
				target.m.replacedMoves = [typeMovePair[types[0]], typeMovePair[types[1]]];
				this.effectData.moveToUse = moves[this.random(2)];
				for (const moveSlot of target.moveSlots) {
					if (!(moveSlot.id === 'swordsdance' || moveSlot.id === 'pandorasbox')) continue;
					if (!target.m.backupMoves) {
						target.m.backupMoves = [this.dex.deepClone(moveSlot)];
					} else {
						target.m.backupMoves.push(this.dex.deepClone(moveSlot));
					}
					const moveData = this.dex.getMove(this.toID(moves.pop()));
					if (!moveData.id) continue;
					target.moveSlots[target.moveSlots.indexOf(moveSlot)] = {
						move: moveData.name,
						id: moveData.id,
						pp: Math.floor(moveData.pp * (moveSlot.pp / moveSlot.maxpp)),
						maxpp: ((moveData.noPPBoosts || moveData.isZ) ? moveData.pp : moveData.pp * 8 / 5),
						target: moveData.target,
						disabled: false,
						disabledSource: '',
						used: false,
					};
				}
				target.setAbility('protean');
			},
			onResidual(pokemon) {
				if (this.effectData.moveToUse) {
					this.useMove(this.effectData.moveToUse, pokemon);
					delete this.effectData.moveToUse;
				}
			},
			onEnd(pokemon) {
				if (!pokemon.m.backupMoves) return;
				for (const [index, moveSlot] of pokemon.moveSlots.entries()) {
					if (!(pokemon.m.replacedMoves.includes(moveSlot.move))) continue;
					pokemon.moveSlots[index] = pokemon.m.backupMoves.shift();
					pokemon.moveSlots[index].pp = Math.floor(pokemon.moveSlots[index].maxpp * (moveSlot.pp / moveSlot.maxpp));
				}
				delete pokemon.m.backupMoves;
				delete pokemon.m.replacedMoves;
			},
		},
		target: "self",
		type: "Dragon",
	},

	// Celine
	statusguard: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Protects from physical moves. If hit by physical move, opponent is either badly poisoned, burned, or paralyzed at random and is forced out. Special attacks and status moves go through this protect.",
		shortDesc: "Protected from physical attacks. Contact: burn, par, or tox.",
		name: "Status Guard",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'statusguard',
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Protect', source);
		},
		onTryHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Status Guard');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect']) {
					if (move.isZ || (move.isMax && !move.breaksProtect)) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.category === 'Special' || move.category === 'Status') {
					return;
				} else if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Status Guard');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (move.category === 'Physical') {
					const statuses = ['brn', 'par', 'tox'];
					source.trySetStatus(this.sample(statuses), target);
					source.forceSwitchFlag = true;
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.category === 'Physical') {
					const statuses = ['brn', 'par', 'tox'];
					source.trySetStatus(this.sample(statuses), target);
					source.forceSwitchFlag = true;
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},

	// c.kilgannon
	soulsiphon: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "Lowers the target's Attack by 1 stage. The user restores its HP equal to the target's Attack stat calculated with its stat stage before this move was used. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down. Fails if the target's Attack stat stage is -6.",
		shortDesc: "User heals HP=target's Atk stat. Lowers Atk by 1.",
		name: "Soul Siphon",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {protect: 1, heal: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Supersonic Skystrike', target);
		},
		onHit(target, source) {
			if (target.boosts.atk === -6) return false;
			const atk = target.getStat('atk', false, true);
			const success = this.boost({atk: -1}, target, source, null, false, true);
			return !!(this.heal(atk, source, target) || success);
		},
		secondary: null,
		target: "normal",
		type: "Flying",
	},

	// Coconut
	devolutionbeam: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "If the target Pokemon is evolved, this move will reduce the target to its first-stage form. If the target Pokemon is single-stage or is already in its first-stage form, this move deals damage and forces the target out. Hits Ghost types.",
		shortDesc: "Devolves evolved mons; dmg+forces small mons out.",
		name: "Devolution Beam",
		isNonstandard: "Custom",
		gen: 8,
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		ignoreImmunity: {'Normal': true},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Psywave', target);
		},
		onBasePower(damage, source, target) {
			let species = target.species;
			if (species.isMega) species = this.dex.getSpecies(species.baseSpecies);
			const isSingleStage = (species.nfe && !species.prevo) || (!species.nfe && !species.prevo);
			if (!isSingleStage) return 0;
		},
		onHit(target, source, move) {
			let species = target.species;
			if (species.isMega) species = this.dex.getSpecies(species.baseSpecies);
			const ability = target.ability;
			const isSingleStage = (species.nfe && !species.prevo) || (!species.nfe && !species.prevo);
			if (isSingleStage) {
				target.forceSwitchFlag = true;
			} else {
				let prevo = species.prevo;
				if (this.dex.getSpecies(prevo).prevo) {
					prevo = this.dex.getSpecies(prevo).prevo;
				}
				target.formeChange(prevo, this.effect);
				target.canMegaEvo = null;
				target.setAbility(ability);
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},

	// Darth
	archangelsrequiem: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "This move type is always the user's secondary typing. If this move is successful, both the target and the user ar forced out, and the user's replacement gets 1/3 of its maximum health restored.",
		shortDesc: "Type=2nd type,both mons switch,replacement: heal.",
		name: "Archangel's Requiem",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: -5,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Roost', source);
			this.add('-anim', source, 'Whirlwind', target);
			this.add('-anim', source, 'Whirlwind', source);
		},
		onModifyType(move, pokemon) {
			const type = pokemon.types[1] ? pokemon.types[1] : pokemon.types[0];
			move.type = type;
		},
		onHit(target, source, move) {
			if (source && source !== target && target.hp) {
				if (!this.canSwitch(target.side) || target.forceSwitchFlag) return;
				if (source.switchFlag === true) return;
				target.switchFlag = true;
				source.side.addSideCondition('archangelsrequiem');
			}
		},
		condition: {
			duration: 1,
			onSwitchInPriority: -1,
			onSwitchIn(pokemon) {
				this.add(`c|${getName('Darth')}|Take my place, serve the Angel of Stall!`);
				pokemon.heal(pokemon.baseMaxhp / 3);
				this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			},
		},
		selfSwitch: true,
		target: "normal",
		type: "Normal",
	},

	// drampa's grandpa
	getoffmylawn: {
		accuracy: 100,
		basePower: 78,
		category: "Special",
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button or through the effect of the Emergency Exit or Wimp Out Abilities.",
		shortDesc: "User switches out after damaging the target.",
		name: "GET OFF MY LAWN!",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: -6,
		flags: {protect: 1, sound: 1, authentic: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Boomburst', target);
		},
		onHit() {
			this.add(`c|${getName('drampa\'s grandpa')}|GET OFF MY LAWN!!!`);
		},
		secondary: null,
		forceSwitch: true,
		selfSwitch: true,
		target: "normal",
		type: "Normal",
	},

	// DragonWhale
	cloakdance: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "If Mimikyu's Disguise is intact or if Mimikyu is the last remaining Pokemon, Attack goes up 2 stages. If Mimikyu's Disguise is busted and there are other Pokemon on Mimikyu's side, the Disguise will be repaired and Mimikyu will switch out.",
		shortDesc: "If Disguise intact or Mimikyu is the last remaining Pokemon, raises attack by 2; otherwise repairs Disguise and switches out.",
		name: "Cloak Dance",
		pp: 5,
		priority: 0,
		flags: {dance: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			const moveAnim = (!source.abilityData.busted || source.side.pokemonLeft === 1) ? 'Swords Dance' : 'Teleport';
			this.add('-anim', source, moveAnim, target);
		},
		onHit(target, source) {
			if (!source.abilityData.busted || source.side.pokemonLeft === 1) {
				this.boost({atk: 2}, target);
			} else {
				delete source.abilityData.busted;
				source.formeChange('Mimikyu', this.effect, true);
				source.switchFlag = true;
			}
		},
		secondary: null,
		target: "self",
		type: "Fairy",
	},

	// dream
	lockandkey: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Special Attack and Special Defense stats by 1 stage and prevents the target from switching out.",
		shortDesc: "Raises user's SpA and SpD by 1 Prevents foe from switching.",
		name: "Lock and Key",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {},
		onHit(target, source, move) {
			if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
		},
		self: {
			boosts: {
				spa: 1,
				spd: 1,
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Steel",
	},

	// Elgino
	navisgrace: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "This move is super effective on Steel- and Poison-type Pokemon.",
		shortDesc: "Super effective on Steel and Poison types.",
		name: "Navi's Grace",
		isNonstandard: "Custom",
		gen: 8,
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		secondary: null,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Dazzling Gleam', target);
			this.add('-anim', source, 'Earth Power', target);
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Poison' || type === 'Steel') return 1;
		},
		target: 'normal',
		type: 'Fairy',
	},

	// Elsa
	bigbang: {
		accuracy: 100,
		basePower: 120,
		category: "Special",
		desc: "The user loses 33% of the damage dealt by this attack. Resets the field by clearing all hazards, terrains, walls, and weather.",
		shortDesc: "33% recoil; removes hazards/weather/terrain.",
		name: "Big Bang",
		isNonstandard: "Custom",
		gen: 8,
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Extreme Evoboost', source);
			this.add('-anim', source, 'Light of Ruin', target);
			this.add('-anim', source, 'Dark Void', target);
		},
		onHit(target, source, move) {
			let success = false;
			const removeAll = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'shiftingrocks', 'stickyweb',
			];
			const silentRemove = ['reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist'];
			for (const sideCondition of removeAll) {
				if (target.side.removeSideCondition(sideCondition)) {
					if (!(silentRemove.includes(sideCondition))) {
						this.add('-sideend', target.side, this.dex.getEffect(sideCondition).name, '[from] move: Big Bang', '[of] ' + source);
						success = true;
					}
				}
				if (source.side.removeSideCondition(sideCondition)) {
					if (!(silentRemove.includes(sideCondition))) {
						this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: Big Bang', '[of] ' + source);
						success = true;
					}
				}
			}
			this.field.clearTerrain();
			this.field.clearWeather();
			return success;
		},
		recoil: [33, 100],
		secondary: null,
		target: "normal",
		type: "Fairy",
	},

	// Emeri
	forcedlanding: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP, rounded half up. For 5 turns, the evasiveness of all active Pokemon is multiplied by 0.6. At the time of use, Bounce, Fly, Magnet Rise, Sky Drop, and Telekinesis end immediately for all active Pokemon. During the effect, Bounce, Fly, Flying Press, High Jump Kick, Jump Kick, Magnet Rise, Sky Drop, Splash, and Telekinesis are prevented from being used by all active Pokemon. Ground-type attacks, Spikes, Toxic Spikes, Sticky Web, and the Arena Trap Ability can affect Flying types or Pokemon with the Levitate Ability. Fails if this move is already in effect.",
		shortDesc: "Restore 50% HP + set Gravity.",
		name: "Forced Landing",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {heal: 1},
		heal: [1, 2],
		pseudoWeather: 'gravity',
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Roost', source);
			this.add('-anim', source, 'Gravity', source);
		},
		secondary: null,
		target: "self",
		type: "Flying",
	},

	// EpicNikolai
	epicrage: {
		accuracy: 95,
		basePower: 120,
		category: "Physical",
		desc: "Paralyzes target, and take 40% recoil. If the user is fire-type, it burns the target and take 33% recoil.",
		shortDesc: "Paralyzes target + 40% recoil. Fire: burns target + 33% recoil.",
		name: "Epic Rage",
		isNonstandard: "Custom",
		gen: 8,
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Draco Meteor', target);
		},
		onModifyMove(move, pokemon) {
			if (!pokemon.types.includes('Fire')) return;
			move.secondaries = [];
			move.secondaries.push({
				chance: 100,
				status: 'brn',
			});
			move.recoil = [33, 100];
		},
		recoil: [4, 10],
		secondary: {
			chance: 100,
			status: "par",
		},
		target: "normal",
		type: "Fire",
	},

	// estarossa
	sandbalance: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Hippowdon uses Roar, then switches out after forcing out the opposing Pokemon.",
		shortDesc: "Hippowdon uses Roar, switches out after.",
		name: "Sand Balance",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: -6,
		flags: {authentic: 1, protect: 1, mirror: 1, sound: 1, refractable: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Roar', target);
			this.add('-anim', source, 'Parting Shot', target);
		},
		forceSwitch: true,
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Ground",
	},

	// explodingdaisies
	youhavenohope: {
		accuracy: 100,
		basePower: 0,
		damageCallback(pokemon, target) {
			return target.getUndynamaxedHP() - pokemon.hp;
		},
		onTryImmunity(target, pokemon) {
			return pokemon.hp < target.hp;
		},
		category: "Physical",
		desc: "Lowers the target's HP to the user's HP. Goes thru Substitute",
		shortDesc: "Lowers the target's HP to the user's HP.",
		name: "You Have No Hope!",
		pp: 1,
		priority: 0,
		flags: {authentic: 1, contact: 1, protect: 1, mirror: 1},
		isNonstandard: "Custom",
		gen: 8,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Endeavor', target);
		},
		onHit(target, source) {
			this.add(`c|${getName('explodingdaisies')}|You have no hope ${target.name}!`);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		noPPBoosts: true,
	},
	// fart
	soupstealing7starstrikeredux: {
		accuracy: 100,
		basePower: 40,
		basePowerCallback() {
			if (this.field.pseudoWeather.soupstealing7starstrikeredux) {
				return 40 * this.field.pseudoWeather.soupstealing7starstrikeredux.multiplier;
			}
			return 40;
		},
		category: "Physical",
		desc: "This move is either a Water, Fire, or Grass type move. The selected type is added to the user of this move. For every consecutive turn that this move is used by at least one Pokemon, this move's power is multiplied by the number of turns to pass, but not more than 5.",
		shortDesc: "Changes user/move type to fire, water, or grass. Power increases when repeated.",
		name: "Soup-Stealing 7-Star Strike: Redux",
		isNonstandard: "Custom",
		gen: 8,
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTry() {
			this.field.addPseudoWeather('soupstealing7starstrikeredux');
		},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Conversion", source);
		},
		onModifyMove(move, pokemon) {
			const types = ['Fire', 'Water', 'Grass'];
			const randomType = this.sample(types);
			move.type = randomType;
			pokemon.addType(randomType);
			this.add('-start', pokemon, 'typeadd', randomType);
		},
		onHit(target, source) {
			this.add('-anim', source, 'Spectral Thief', target);
			if (this.randomChance(1, 2)) {
				this.add(`c|${getName('fart')}|I hl on soup`);
			} else {
				this.add(`c|${getName('fart')}|I walk with purpose. bring me soup.`);
			}
		},
		condition: {
			duration: 2,
			onStart() {
				this.effectData.multiplier = 1;
			},
			onRestart() {
				if (this.effectData.duration !== 2) {
					this.effectData.duration = 2;
					if (this.effectData.multiplier < 5) {
						this.effectData.multiplier++;
					}
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},

	// Felucia
	riggeddice: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Inverts target's stat boosts if they have any; taunts otherwise. User then switches out.",
		shortDesc: "Inverts target's stat boosts if they have any; taunts otherwise. User then switches out.",
		name: "Rigged Dice",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Smart Strike', source);
		},
		onHit(target, source, move) {
			let success = false;
			let i: BoostName;
			for (i in target.boosts) {
				if (target.boosts[i] === 0) continue;
				target.boosts[i] = -target.boosts[i];
				success = true;
			}
			if (success) {
				this.add('-invertboost', target, '[from] move: Rigged Dice');
			} else {
				target.addVolatile("taunt");
			}
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Ice",
	},

	// frostyicelad
	frostywave: {
		accuracy: 100,
		basePower: 95,
		category: "Special",
		desc: "This move and its effects ignore the Abilities of other Pokemon.",
		shortDesc: "Ignores abilities. Hits adjacent opponents.",
		name: "Frosty Wave",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		ignoreAbility: true,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Boomburst', target);
			this.add('-anim', source, 'Blizzard', target);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ice",
	},

	// Gimmick
	alternatingcurrent: {
		accuracy: 100,
		basePower: 95,
		category: "Special",
		desc: "Forces the target to switch out. Deal 1.5x damage on the target if the user attacks first next turn. Will fail if used consecutively.",
		shortDesc: "Forces the target to switch out. Deal 1.5x damage on the target if the user attacks first next turn. Will fail if used consecutively.",
		name: "Alternating Current",
		isNonstandard: "Custom",
		gen: 8,
		pp: 5,
		priority: -1,
		flags: {protect: 1, mirror: 1},
		ignoreAbility: true,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Charge', source);
			this.add('-anim', source, 'Double Team', source);
			this.add('-anim', source, 'Plasma Fists', target);
			return this.runEvent('StallMove', source);
		},
		onHit(target, source) {
			source.addVolatile('stall');
			source.addVolatile('alternatingcurrent');
		},
		condition: {
			duration: 2,
			onBasePower(basePower, pokemon, target, move) {
				if (target.newlySwitched || this.queue.willMove(target)) {
					this.debug('Alternating Current damage boost');
					return this.chainModify(2);
				}
				this.debug('Alternating Current NOT boosted');
			},
		},
		forceSwitch: true,
		secondary: null,
		target: "normal",
		type: "Electric",
	},

	// used for Gimmick's ability
	gimmickterrain: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the terrain becomes Wave Terrain. During the effect, the accuracy of Water type moves is multiplied by 1.2, even if the user is not grounded. Hazards and screens are removed and cannot be set while Wave Terrain is active. Fails if the current terrain is Inversion Terrain.",
		shortDesc: "5 turns. Removes hazards. Water move acc 1.2x.",
		name: "Gimmick Terrain",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {},
		terrain: 'gimmickterrain',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onStart(battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Gimmick Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Gimmick Terrain');
				}
				this.add('-message', 'The battlefield suddenly gimmicky!');
			},
			onModifyPriority(priority, pokemon, target, move) {
				return priority * -1;
			},
			onResidualOrder: 5,
			onResidualSubOrder: 3,
			onResidual() {
				this.eachEvent('Terrain');
			},
			onEnd() {
				if (!this.effectData.duration) this.eachEvent('Terrain');
				this.add('-fieldend', 'move: Gimmick Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Water",
	},

	// GMars
	gacha: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Shell Smash; Then Randomly Changes Minior's Forme.",
		shortDesc: "Shell Smash; Then Randomly Changes Minior's Forme.",
		name: "Gacha",
		pp: 15,
		priority: 0,
		flags: {snatch: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Brick Break', source);
		},
		onHit(target, source, move) {
			if (target.species.id !== 'miniormeteor') return;
			let forme: string;
			let message = "";
			const random = this.random(100);
			if (random >= 0 && random < 3) {
				forme = "Minior-Violet";
				message = "Oof, Violet. Tough break. A Violet Minior is sluggish and won't always listen to your commands. Best of luck! Rating: ★ ☆ ☆ ☆ ☆ ";
			} else if (random >= 3 && random < 13) {
				forme = "Minior-Indigo";
				message = "Uh oh, an Indigo Minior. Its inspiring color may have had some unintended effects and boosted your foe's attacking stats. Better hope you can take it down first! Rating: ★ ☆ ☆ ☆ ☆";
			} else if (random >= 13 && random < 33) {
				forme = "Minior";
				message = "Nice one, a Red Minior is hard for your opponent to ignore. They'll be goaded into attacking the first time they see this! Rating: ★ ★ ★ ☆ ☆ ";
			} else if (random >= 33 && random < 66) {
				forme = "Minior-Orange";
				message = "Solid, you pulled an Orange Minior. Nothing too fancy, but it can definitely get the job done if you use it right. Rating: ★ ★ ☆ ☆ ☆";
			} else if (random >= 66 && random < 86) {
				forme = "Minior-Yellow";
				message = "Sweet, a Yellow Minior! This thing had a lot of static energy built up that released when you cracked it open, paralyzing the foe. Rating: ★ ★ ★ ☆ ☆ ";
			} else if (random >= 86 && random < 96) {
				forme = "Minior-Blue";
				message = "Woah! You got a Blue Minior. This one's almost translucent; it looks like it'd be hard for an opponent to find a way to reduce its stats. Rating: ★ ★ ★ ★ ☆";
			} else if (random >= 96 && random < 99) {
				forme = "Minior-Green";
				message = "Nice! You cracked a Green Minior, that's definitely a rare one. This type of Minior packs an extra punch, and it's great for breaking through defensive teams without risking multiple turns of setup. Rating: ★ ★ ★ ★ ★";
			} else if (random === 99) {
				forme = "Minior";
				target.set.shiny = true;
				message = "YO!! I can't believe it, you cracked open a Shiny Minior! Its multicolored interior dazzles its opponents and throws off their priority moves. Big grats. Rating: ★ ★ ★ ★ ★ ★";
			} else {
				forme = "Minior";
			}
			target.formeChange(forme, move, true);
			if (message) this.add(`c|${getName('GMars')}|${message}`);
			target.setAbility('capsulearmor');
			target.baseAbility = target.ability;
			if (forme === 'Minior-Indigo') {
				this.boost({atk: 1, spa: 1}, target.side.foe.active[0]);
			} else if (forme === 'Minior') {
				target.side.foe.active[0].addVolatile('taunt');
			} else if (forme === 'Minior-Yellow') {
				target.side.foe.active[0].trySetStatus('par', target);
			} else if (forme === 'Minior-Green') {
				this.boost({atk: 1}, target);
			}
		},
		boosts: {
			def: -1,
			spd: -1,
			atk: 2,
			spa: 2,
			spe: 2,
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},

	// grimAuxiliatrix
	donotsteel: {
		accuracy: true,
		basePower: 0,
		category: "Special",
		desc: "Randomly calls SSB moves.",
		shortDesc: "Randomly calls SSB moves.",
		name: "Do Not Steel",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {},
		onTryMove(target) {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Nasty plot', source);
		},
		onHit(target, source, move) {
			// @ts-ignore this is a really dumb hack
			if (!move.curHits) move.curHits = 1;
			const moves: MoveData[] = [];
			for (const member in ssbSets) {
				// No way in hell am I letting this infinitely recurse
				if (member === 'grimAuxiliatrix') continue;
				const set = ssbSets[member];
				if (set.skip) continue;
				moves.push(this.dex.getMove(set.signatureMove));
			}

			let randomMove;
			if (moves.length) {
				moves.sort((a, b) => a.num! - b.num!);
				randomMove = this.sample(moves);
			}
			if (!randomMove) {
				return false;
			}

			this.useMove(randomMove.name, source);
			if (randomMove.category !== 'Status') {
				delete move.onHit;
				delete move.multihit;
				// @ts-ignore this is a really dumb hack
				this.add('-hitcount', source, move.curHits);
				return;
			}
			// @ts-ignore this is a really dumb hack
			move.curHits++;
		},
		multihit: [1, 3],
		secondary: null,
		target: "normal",
		type: "Steel",
	},

	// HoeenHero
	landfall: {
		accuracy: 100,
		category: "Special",
		basePower: 0,
		basePowerCallback(target, source, move) {
			const windSpeeds = [65, 85, 85, 95, 95, 95, 95, 115, 115, 140];
			move.basePower = windSpeeds[this.random(0, 10)];
			return move.basePower;
		},
		desc: "The foe is hit with a hurricane with a Base Power that varies based on the strength (category) of the hurricane. Category 1 is 65, category 2 is 85, category 3 is 95, category 4 is 115, and category 5 is 140. In addition, the target's side of the field is covered in a storm surge. Storm surge applies a 1/4 Speed multiplier to pokemon on that side of the field. Storm surge will last for as many turns as the hurricane's category (not including the turn Landfall was used).",
		shortDesc: "Higher category = more damage, foe side speed 1/4.",
		name: "Landfall",
		isNonstandard: "Custom",
		gen: 8,
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Hurricane', target);
			this.add('-anim', source, 'Surf', target);
		},
		onHit(target, source, move) {
			const windSpeeds = [65, 85, 95, 115, 140];
			const category = windSpeeds.indexOf(move.basePower) + 1;
			this.add('-message', `A category ${category} hurricane made landfall!`);
		},
		sideCondition: 'stormsurge', // Programmed in conditions.ts
		target: "normal",
		type: "Water",
	},

	// Hubriz
	steroidanaphylaxia: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Inverts the target's stat stages.",
		name: "Steroid Anaphylaxia",
		isNonstandard: "Custom",
		gen: 8,
		pp: 20,
		priority: 1,
		flags: {protect: 1, reflectable: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			// No animation
		},
		onHit(target) {
			let success = false;
			let i: BoostName;
			for (i in target.boosts) {
				if (target.boosts[i] === 0) continue;
				target.boosts[i] = -target.boosts[i];
				success = true;
			}
			if (!success) return false;
			this.add('-invertboost', target, '[from] move: Steroid Anaphylaxia');
		},
		target: "normal",
		type: "Poison",
	},

	// Hydro
	hydrostatics: {
		accuracy: 100,
		basePower: 50,
		category: "Special",
		desc: "Has a 70% chance to raise the user's Special Attack by 1 stage and a 50% chance to paralyze the target. This move combines Water in its type effectiveness against the target.",
		shortDesc: "70% boost SpA;50% para;Combine Water in typeeff.",
		name: "Hydrostatics",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 2,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Origin Pulse', target);
			this.add('-anim', source, 'Charge Beam', target);
		},
		secondaries: [
			{
				chance: 70,
				self: {
					boosts: {
						spa: 1,
					},
				},
			}, {
				chance: 50,
				status: 'par',
			},
		],
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Water', type);
		},
		target: "normal",
		type: "Electric",
	},

	// Inactive
	paranoia: {
		accuracy: 90,
		basePower: 100,
		category: "Physical",
		shortDesc: "Has a 15% chance to burn the target.",
		name: "Paranoia",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Max Flare', target);
		},
		secondary: {
			chance: 15,
			status: 'brn',
		},
		target: "normal",
		type: "Dark",
	},

	// Instruct
	kickofftune: {
		accuracy: true,
		basePower: 10,
		category: "Physical",
		shortDesc: "First turn: Flinches the oppnent then switches out",
		name: "Kickoff Tune",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 3,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Fake Out', target);
		},
		onTry(pokemon, target) {
			if (pokemon.activeMoveActions > 1) {
				this.attrLastMove('[still]');
				this.add('-fail', pokemon);
				this.hint("Kickoff Tune can only works on your first turn out.");
				return null;
			}
		},
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		selfSwitch: true,
		target: "normal",
		type: "???",
	},

	// Iyarito
	patronaattack: {
		accuracy: 100,
		basePower: 50,
		category: "Special",
		shortDesc: "No additional effect.",
		name: "Patrona Attack",
		isNonstandard: "Custom",
		gen: 8,
		pp: 20,
		priority: 1,
		flags: {protect: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Moongeist Beam', target);
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},

	// Jett
	thehuntison: {
		accuracy: 100,
		basePower: 55,
		basePowerCallback(pokemon, target, move) {
			// You can't get here unless the pursuit effect succeeds
			if (target.beingCalledBack) {
				this.debug('Thehuntison damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		desc: "If an opposing Pokemon switches out this turn, this move hits that Pokemon before it leaves the field, even if it was not the original target. If the user moves after an opponent using Parting Shot, U-turn, or Volt Switch, but not Baton Pass, it will hit that opponent before it leaves the field. Power doubles and no accuracy check is done if the user hits an opponent switching out, and the user's turn is over; if an opponent faints from this, the replacement Pokemon does not become active until the end of the turn.",
		shortDesc: "Foe: 2x power when switching.",
		name: "The Hunt is On!",
		isNonstandard: "Custom",
		gen: 8,
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Sucker Punch', target);
			this.add('-anim', source, 'Pursuit', target);
		},
		beforeTurnCallback(pokemon) {
			for (const side of this.sides) {
				if (side === pokemon.side) continue;
				side.addSideCondition('thehuntison', pokemon);
				const data = side.getSideConditionData('thehuntison');
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack) move.accuracy = true;
		},
		onTryHit(target, pokemon) {
			target.side.removeSideCondition('thehuntison');
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) {
				this.add(`c|${getName('Jett')}|Owned!`);
			}
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Thehuntison start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectData.sources) {
					if (!this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: The Hunt is On!');
						alreadyAdded = true;
					}
					this.runMove('thehuntison', source, this.getTargetLoc(pokemon, source));
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},

	// Jho
	genrechange: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "If the user is a Toxtricity, it changes into its Low-Key forme and Nasty Plot and Overdrive change to Aura Sphere and Boomburst, respectively. If the user is a Toxtricity in its Low-Key forme, it changes into its Amped forme and Aura Sphere and Boomburst turn into Nasty Plot and Overdrive, respectively. Raises the user's Speed by 1 stage.",
		shortDesc: "Toxtricity: +1 Speed. Changes forme.",
		name: "Genre Change",
		isNonstandard: "Custom",
		gen: 8,
		pp: 5,
		priority: 0,
		flags: {sound: 1},
		onTryMove(pokemon, target, move) {
			this.attrLastMove('[still]');
			if (pokemon.species.baseSpecies === 'Toxtricity') {
				return;
			}
			this.add('-fail', pokemon, 'move: Genre Change');
			this.hint("Only a Pokemon whose form is Toxtricity or Toxtricity-Low-Key can use this move.");
			return null;
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Screech', source);
			// The transform animation is done via `formeChange`
		},
		onHit(pokemon) {
			if (pokemon.species.forme === 'Low-Key') {
				changeSet(this, pokemon, ssbSets['Jho'], true);
			} else {
				changeSet(this, pokemon, ssbSets['Jho-Low-Key'], true);
			}
		},
		boosts: {
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},

	// Jordy
	archeopssrage: {
		accuracy: 85,
		basePower: 90,
		category: "Physical",
		desc: "Upon damaging the target, the user gains +1 Speed.",
		shortDesc: "+1 Speed upon hit.",
		name: "Archeops's Rage",
		isNonstandard: "Custom",
		gen: 8,
		pp: 5,
		flags: {protect: 1},
		priority: 0,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Sunsteel Strike', target);
		},
		type: "Flying",
		self: {
			boosts: {
				spe: 1,
			},
		},
		secondary: null,
		target: "normal",
	},

	// Kaiju Bunny
	cozycuddle: {
		accuracy: 95,
		basePower: 0,
		category: "Status",
		desc: "Traps the target and lowers its Attack and Defense by two stages.",
		shortDesc: "Target: trapped, Atk and Def lowered by 2.",
		name: "Cozy Cuddle",
		isNonstandard: "Custom",
		gen: 8,
		pp: 20,
		priority: 0,
		flags: {},
		volatileStatus: 'cozycuddle',
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onTryHit(target, source, move) {
			if (target.volatiles['cozycuddle']) return false;
			if (target.volatiles['trapped']) {
				delete move.volatileStatus;
			}
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Flatter', target);
			this.add('-anim', source, 'Let\'s Snuggle Forever', target);
		},
		onHit(target, source, move) {
			this.boost({atk: -2, def: -2}, target, target);
		},
		condition: {
			onStart(pokemon, source) {
				this.add('-start', pokemon, 'Cozy Cuddle');
			},
			onTrapPokemon(pokemon) {
				if (this.effectData.source?.isActive) pokemon.tryTrap();
			},
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
	},

	// Kalalokki
	blackbird: {
		accuracy: 100,
		basePower: 70,
		category: "Special",
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button or through the effect of the Emergency Exit or Wimp Out Abilities.",
		shortDesc: "User switches out after damaging the target.",
		name: "Blackbird",
		isNonstandard: "Custom",
		gen: 8,
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		selfSwitch: true,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Gust', target);
			this.add('-anim', source, 'Parting Shot', target);
		},
		secondary: null,
		target: "normal",
		type: "Flying",
	},
	gaelstrom: {
		accuracy: true,
		basePower: 140,
		category: "Special",
		desc: "Hits foe and phazes them out, phaze the next one out and then another one, set a random entry hazard at the end of the move.",
		shortDesc: "Forces the target to switch to a random ally; this happens two more times; and finally sets up a random entry hazard.",
		name: "Gaelstrom",
		isNonstandard: "Custom",
		gen: 8,
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "kalalokkiumz",
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Hurricane', target);
		},
		sideCondition: 'gaelstrom',
		condition: {
			duration: 1,
			onSwitchIn(pokemon) {
				if (!this.effectData.count) this.effectData.count = 1;
				if (this.effectData.count < 3) {
					pokemon.forceSwitchFlag = true;
					this.effectData.count++;
					return;
				}
				pokemon.side.removeSideCondition('gaelstrom');
			},
			onStart(side) {
				side.addSideCondition(['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'][this.random(4)]);
			},
		},
		forceSwitch: true,
		target: "normal",
		type: "Flying",
	},

	// Kennedy
	topbins: {
		accuracy: 70,
		basePower: 130,
		category: "Physical",
		desc: "Has a 20% chance to burn the target and a 10% chance to flinch it.",
		shortDesc: "20% chance to burn. 10% chance to flinch.",
		name: "Top Bins",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Pyro Ball', target);
			this.add('-anim', source, 'Blaze Kick', target);
		},
		secondaries: [
			{
				chance: 20,
				status: 'brn',
			}, {
				chance: 10,
				volatileStatus: 'flinch',
			},
		],
		target: "normal",
		type: "Fire",
	},

	// Kev
	kevcustommove: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Special Attack by 1 stage and Speed by 2 stages.",
		shortDesc: "Gives user +1 Sp. Atk and +2 Spe.",
		name: "Kev Custom Move",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target) {
			this.add('-anim', target, 'Dragon Dance', target);
		},
		self: {
			boosts: {
				spa: 1,
				spe: 2,
			},
		},
		secondary: null,
		target: "self",
		type: "Water",
	},

	// Kingbaruk
	leaveittotheteam: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user faints and the Pokemon brought out to replace it gets healing wish effects, 1 boost to attack, defense, special attack and special defense.",
		shortDesc: "User faints. Replacement gets healed & +1 Atk/Def/SpA/SpD.",
		name: "Leave it to the team!",
		isNonstandard: "Custom",
		gen: 8,
		pp: 5,
		priority: 0,
		flags: {snatch: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onTryHit(pokemon, target, move) {
			if (!this.canSwitch(pokemon.side)) {
				delete move.selfdestruct;
				return false;
			}
		},
		selfdestruct: "ifHit",
		sideCondition: 'leaveittotheteam',
		condition: {
			duration: 2,
			onStart(side, source) {
				this.debug('Leave it to the team! started on ' + side.name);
				this.effectData.positions = [];
				for (const i of side.active.keys()) {
					this.effectData.positions[i] = false;
				}
				this.effectData.positions[source.position] = true;
			},
			onRestart(side, source) {
				this.effectData.positions[source.position] = true;
			},
			onSwitchInPriority: 1,
			onSwitchIn(target) {
				const positions: boolean[] = this.effectData.positions;
				if (target.position !== this.effectData.sourcePosition) {
					return;
				}
				if (!target.fainted) {
					target.heal(target.maxhp);
					this.boost({atk: 1, def: 1, spa: 1, spd: 1}, target);
					target.setStatus('');
					for (const moveSlot of target.moveSlots) {
						moveSlot.pp = moveSlot.maxpp;
					}
					this.add('-heal', target, target.getHealth, '[from] move: Leave it to the team!');
					positions[target.position] = false;
				}
				if (!positions.some(affected => affected === true)) {
					target.side.removeSideCondition('leaveittotheteam');
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Fairy",
	},

	// KingSwordYT
	clashofpangoros: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "If this move is successful, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user restores 1/8 of its maximum HP, rounded half up. Target can't use status moves its next 3 turns. Lowers the target's Attack by 1 stages.",
		shortDesc: "Heals 1/8, taunts, lowers Atk, switches out.",
		name: "Clash of Pangoros",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Black Hole Eclipse', target);
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			this.heal(pokemon.maxhp / 8, pokemon, pokemon, move);
		},
		onHit(target, pokemon, move) {
			this.boost({atk: -1}, target, target, move);
			target.addVolatile('taunt', pokemon);
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Dark",
	},

	// Kipkluif
	kipup: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "When used, if hit by an attack on the same turn this move was used, this Pokemon boost defense and special defense by 2 if the relevant stat is at 0 or lower, or 1 if the relevant stat is at +1 or higher, and increases priority of the next used move by 1.",
		shortDesc: "If used and hit by an attack on the same turn, boosts defenses; boosts next moves priority by 1.",
		name: "Kip Up",
		pp: 10,
		priority: 3,
		flags: {protect: 1, mirror: 1},
		beforeTurnCallback(pokemon) {
			this.add('-anim', pokemon, 'Focus Energy', pokemon);
			pokemon.addVolatile('kipup');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-message', 'This Pokémon prepares itself to be knocked down!');
			},
			onHit(pokemon, source, move) {
				if (this.effectData.gotHit) return;
				if (pokemon.side !== source.side && move.category !== 'Status') {
					this.effectData.gotHit = true;
					this.add('-message', 'Gossifleur was prepared for the impact!');
					const boosts: {[k: string]: number} = {def: 2, spd: 2};
					if (pokemon.boosts.def >= 1) boosts.def--;
					if (pokemon.boosts.spd >= 1) boosts.spd--;
					this.boost(boosts, pokemon);
					this.add('-message', "Gossifleur did a Kip Up and can jump right back into the action!");
					this.effectData.duration++;
				}
			},
			onModifyPriority(priority, pokemon, target, move) {
				if (!this.effectData.gotHit) return priority;
				return priority + 1;
			},
		},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		secondary: null,
		target: "self",
		type: "Fighting",
	},

	// Kris
	alphabetsoup: {
		accuracy: true,
		basePower: 81,
		category: "Special",
		desc: "The user changes into a random Pokemon with a first name letter that matches the forme Unown is currently in (A -> Alakazam, etc) that has base stats that would benefit from Unown's EV/IV/Nature spread and moves. Using it while in a forme that is not Unown will make it revert back to the Unown forme it transformed in (If an Unown transforms into Alakazam, it'll transform back to Unown-A when used again). Light of Ruin becomes Strange Steam, Psystrike becomes Psyshock, Secret Sword becomes Aura Sphere, Mind Blown becomes Flamethrower, and Seed Flare becomes Apple Acid while in a non-Unown forme.",
		shortDesc: "Transform into Unown. Unown: Transform into mon.",
		name: "Alphabet Soup",
		isNonstandard: "Custom",
		gen: 8,
		pp: 20,
		priority: 0,
		flags: {protect: 1},
		onTryMove(source) {
			this.attrLastMove('[still]');
			if (source.name !== 'Kris') {
				this.add('-fail', source);
				this.hint("Only Kris can use Alphabet Soup.");
				return null;
			}
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Dark Pulse', target);
			this.add('-anim', source, 'Teleport', source);
		},
		onHit(target, source) {
			if (!source) return;
			if (source.species.id.includes('unown')) {
				const monList = Object.keys(this.dex.data.Pokedex).filter(speciesid => {
					const species = this.dex.getSpecies(speciesid);
					if (species.id.startsWith('unown')) return false;
					if (species.isNonstandard && ['Gigantamax', 'Unobtainable'].includes(species.isNonstandard)) return false;
					if (['Arceus', 'Silvally'].includes(species.baseSpecies) && species.types[0] !== 'Normal') return false;
					if (species.baseStats.spa < 80) return false;
					if (species.baseStats.spe < 80) return false;
					const unownLetter = source.species.id.charAt(5) || 'a';
					if (!species.id.startsWith(unownLetter.trim().toLowerCase())) return false;
					return true;
				});
				source.formeChange(this.sample(monList), this.effect, true);
				source.setAbility('Protean');
				source.moveSlots = source.moveSlots.map(slot => {
					const newMoves: {[k: string]: string} = {
						lightofruin: 'strangesteam',
						psystrike: 'psyshock',
						secretsword: 'aurasphere',
						mindblown: 'flamethrower',
						seedflare: 'appleacid',
					};
					if (slot.id in newMoves) {
						const newMove = this.dex.getMove(newMoves[slot.id]);
						const newSlot = {
							id: newMove.id,
							move: newMove.name,
							pp: newMove.pp * 8 / 5,
							maxpp: newMove.pp * 8 / 5,
							disabled: slot.disabled,
							used: false,
						};
						return newSlot;
					}
					return slot;
				});
			} else {
				let transformingLetter = source.species.id[0];
				if (transformingLetter === 'a') transformingLetter = '';
				source.formeChange(`unown${transformingLetter}`, this.effect, true);
				source.moveSlots = source.moveSlots.map(slot => {
					const newMoves: {[k: string]: string} = {
						strangesteam: 'lightofruin',
						psyshock: 'psystrike',
						aurasphere: 'secretsword',
						flamethrower: 'mindblown',
						appleacid: 'seedflare',
					};
					if (slot.id in newMoves) {
						const newMove = this.dex.getMove(newMoves[slot.id]);
						const newSlot = {
							id: newMove.id,
							move: newMove.name,
							pp: newMove.pp * 8 / 5,
							maxpp: newMove.pp * 8 / 5,
							disabled: slot.disabled,
							used: false,
						};
						return newSlot;
					}
					return slot;
				});
			}
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},

	// Lamp
	soulswap: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "The user copies the target's positive stat stage changes and then inverts the target's stats.",
		shortDesc: "Copies target's stat boosts then inverts.",
		name: "Soul Swap",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Spectral Thief', target);
			this.add('-anim', source, 'Teleport', source);
			this.add('-anim', source, 'Topsy-Turvy', target);
		},
		onHit(target, source) {
			let i: BoostName;
			const boosts: SparseBoostsTable = {};
			for (i in target.boosts) {
				const stage = target.boosts[i];
				if (stage > 0) {
					boosts[i] = stage;
				}
				if (target.boosts[i] !== 0) {
					target.boosts[i] = -target.boosts[i];
				}
			}
			this.add('-message', `${source.name} stole ${target.name}'s boosts!`);
			this.boost(boosts, source);
			this.add('-invertboost', target, '[from] move: Soul Swap');
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},

	// Level 51
	swansong: {
		accuracy: true,
		basePower: 0,
		category: "Special",
		desc: "Randomly calls Seismic Toss, Night Shade, and/or Psywave.",
		shortDesc: "Randomly calls Seismic Toss, Night Shade, and/or Psywave.",
		name: "Swan Song",
		isNonstandard: "Custom",
		gen: 8,
		pp: 5,
		priority: 0,
		flags: {},
		onTryMove(target) {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Nasty plot', source);
		},
		onHit(target, source, move) {
			const randomMove = this.sample(['Seismic Toss', 'Night Shade', 'Psywave']);
			this.useMove(randomMove, source);
		},
		multihit: [2, 4],
		secondary: null,
		target: "normal",
		type: "Fairy",
	},

	// LittEleven
	nexthunt: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "If this Pokemon does not take damage this turn, it switches out to another Pokemon in the party and gives it the Download boost. Fails otherwise.",
		shortDesc: "If not damaged this turn, switches out and gives next Pokemon Download boost; fails otherwise.",
		name: "/nexthunt",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('nexthuntcheck');
		},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Teleport', source);
		},
		beforeMoveCallback(pokemon) {
			if (pokemon.volatiles['nexthuntcheck'] && pokemon.volatiles['nexthuntcheck'].lostFocus) {
				this.add('cant', pokemon, '/nexthunt', '/nexthunt');
				return true;
			}
		},
		onHit(target, source, move) {
			this.add('-message', 'Time for the next hunt!');
		},
		sideCondition: 'nexthunt',
		condition: {
			duration: 1,
			onStart(side, source) {
				this.debug('/nexthunt started on ' + side.name);
				this.effectData.positions = [];
				for (const i of side.active.keys()) {
					this.effectData.positions[i] = false;
				}
				this.effectData.positions[source.position] = true;
			},
			onRestart(side, source) {
				this.effectData.positions[source.position] = true;
			},
			onSwitchInPriority: 1,
			onSwitchIn(target) {
				this.add('-activate', target, 'move: /nexthunt');
				let statName = 'atk';
				let bestStat = 0;
				let s: StatNameExceptHP;
				for (s in target.storedStats) {
					if (target.storedStats[s] > bestStat) {
						statName = s;
						bestStat = target.storedStats[s];
					}
				}
				this.boost({[statName]: 1}, target, null, this.dex.getActiveMove('/nexthunt'));
			},
		},
		selfSwitch: true,
		secondary: null,
		target: "self",
		type: "Normal",
	},

	// Mad Monty ¾°
	callamaty: {
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		desc: "30% chance to paralyze. Starts Rain Dance if not currently active.",
		name: "Ca-LLAMA-ty",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		shortDesc: "30% chance to paralyze. Summons rain.",
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Dark Void', target);
			this.add('-anim', source, 'Plasma Fists', target);
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		self: {
			onHit(source) {
				this.field.setWeather('raindance');
			},
		},
		target: "normal",
		type: "Electric",
	},

	// MajorBowman
	corrosivecloud: {
		accuracy: true,
		basePower: 90,
		category: "Special",
		desc: "Has a 30% chance to burn the target. This move's type effectiveness against Steel is changed to be super effective no matter what this move's type is.",
		shortDesc: "30% chance to burn. Super effective on Steel.",
		name: "Corrosive Cloud",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Poison Gas', target);
			this.add('-anim', source, 'Fire Spin', target);
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Steel') return 1;
		},
		ignoreImmunity: {'Poison': true},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Poison",
	},

	// Marshmallon
	rawwwr: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Heals the user by 50% of its max HP. Forces the target to switch to a random ally. User switches out after.",
		shortDesc: "Heals the user by 50% of its max HP. Forces the target to switch to a random ally. User switches out after.",
		name: "RAWWWR",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {reflectable: 1, mirror: 1, sound: 1, authentic: 1, heal: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Slack Off', source);
			this.add('-anim', source, 'Roar of Time', target);
			this.add('-anim', source, 'Roar', target);
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			this.heal(pokemon.maxhp / 2, pokemon, pokemon, move);
		},
		forceSwitch: true,
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Dark",
	},

	// Mitsuki
	terraforming: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "Upon use, this move sets up Stealth Rock on the target's side of the field, as well as setting up Grassy Terrain.",
		shortDesc: "Sets up Grassy Terrain and Stealth Rock.",
		name: "Terraforming",
		isNonstandard: "Custom",
		gen: 8,
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Rock Slide', target);
			this.add('-anim', source, 'Ingrain', target);
			this.add('-anim', source, 'Stealth Rock', target);
		},
		sideCondition: 'stealthrock',
		secondary: null,
		target: "normal",
		type: "Rock",
	},

	// Morfent
	owowutsdis: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "Has a 50% chance to torment the opponent.",
		shortDesc: "Has a 50% chance to torment the opponent.",
		name: "OwO wuts dis?",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Return', target);
		},
		secondary: {
			chance: 50,
			volatileStatus: 'torment',
		},
		target: "normal",
		type: "Normal",
	},

	// naziel
	notsoworthypirouette: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "55% chance to OHKO the target; otherwise, it OHKOs itself.",
		shortDesc: "55% chance to OHKO target. 45% to OHKO user.",
		name: "Not-so-worthy Pirouette",
		isNonstandard: "Custom",
		pp: 5,
		priority: 0,
		flags: {},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "High Jump Kick", target);
		},
		onHit(target, source) {
			if (this.randomChance(11, 20)) {
				target.faint();
			} else {
				source.faint();
			}
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
	},

	// n10siT
	"unbind": {
		accuracy: 100,
		basePower: 60,
		category: "Special",
		desc: "Has a 100% chance to raise the user's Speed by 1 stage. If the user is a Hoopa in its Confined forme, this move is Psychic type, and Hoopa will change into its Unbound forme. If the user is a Hoopa in its Unbound forme, this move is Dark type, and Hoopa will change into its Confined forme. This move cannot be used successfully unless the user's current form, while considering Transform, is Confined or Unbound Hoopa.",
		shortDesc: "Hoopa: Psychic; Unbound: Dark; 100% +1 Spe. Changes form.",
		name: "Unbind",
		isNonstandard: "Custom",
		gen: 8,
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onTryMove(pokemon, target, move) {
			this.attrLastMove('[still]');
			if (pokemon.species.baseSpecies === 'Hoopa') {
				return;
			}
			this.add('-fail', pokemon, 'move: Unbind');
			this.hint("Only a Pokemon whose form is Hoopa or Hoopa-Unbound can use this move.");
			return null;
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Hyperspace Hole', target);
			this.add('-anim', source, 'Hyperspace Fury', target);
		},
		onHit(target, pokemon, move) {
			if (pokemon.baseSpecies.baseSpecies === 'Hoopa') {
				const forme = pokemon.species.forme === 'Unbound' ? '' : '-Unbound';
				pokemon.formeChange(`Hoopa${forme}`, this.effect, false, '[msg]');
				this.boost({spe: 1}, pokemon, pokemon, move);
			}
		},
		onModifyType(move, pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Hoopa') return;
			move.type = pokemon.species.name === 'Hoopa-Unbound' ? 'Dark' : 'Psychic';
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
	},

	// Nolali
	madhacks: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Defense, Special Attack, and Special Defense by 1 stage.",
		shortDesc: "Raises the user's Defense, Sp. Atk, Sp. Def by 1.",
		name: "Mad Hacks",
		isNonstandard: "Custom",
		gen: 8,
		pp: 5,
		priority: 0,
		flags: {snatch: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Acupressure', source);
		},
		boosts: {
			def: 1,
			spa: 1,
			spd: 1,
		},
		secondary: null,
		target: "self",
		type: "Ghost",
	},

	// Notater517
	technotubertransmission: {
		accuracy: 90,
		basePower: 145,
		category: "Special",
		desc: "If this move is successful, the user must recharge on the following turn and cannot select a move.",
		shortDesc: "User cannot move next turn.",
		name: "Techno Tuber Transmission",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Techno Blast', target);
			this.add('-anim', source, 'Never-Ending Nightmare', target);
		},
		onHit() {
			this.add(`c|${getName('Notater517')}|For more phantasmic music, check out [[this link <https://www.youtube.com/watch?v=dQw4w9WgXcQ>]].`);
		},
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},

	// OM~!
	mechomnism: {
		accuracy: 95,
		basePower: 90,
		category: "Special",
		desc: "Heals 33% of damage dealt. 15% chance to raise Special Attack by 1 stage.",
		shortDesc: "Heals 33% of damage dealt. 15% chance to raise SpA by 1.",
		name: "MechOMnism",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 3],
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Mirror Shot', target);
			this.add('-anim', source, 'Refresh', source);
		},
		onHit() {
			this.add(`c|${getName('OM~!')}|Alley Oop`);
		},
		secondary: {
			chance: 15,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Steel",
	},

	// Overneat
	healingyou: {
		accuracy: 100,
		basePower: 117,
		category: "Physical",
		desc: "Heals foe 50% and eliminates any status problem but it lowers Defense and Special Defense stat by 1 stage, then proceeds to attack the foe.",
		shortDesc: "Heals foe and gets rid of their status but the foe's Def and SpD by 1, attacks the foe.",
		name: "Healing you?",
		isNonstandard: "Custom",
		gen: 8,
		pp: 5,
		priority: 0,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Heal Pulse', target);
			this.heal(Math.ceil(target.baseMaxhp * 0.5));
			target.cureStatus();
			this.boost({def: -1, spd: -1}, target);
			this.add('-anim', source, 'Close Combat', target);
		},
		flags: {mirror: 1, protect: 1},
		secondary: null,
		target: "normal",
		type: "Dark",
	},

	// Paradise
	rapidturn: {
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		desc: "Removes hazards then user switches out after dealing damage",
		shortDesc: "Removes hazards then switches out",
		name: "Rapid Turn",
		isNonstandard: "Custom",
		gen: 8,
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Rapid Spin', target);
			this.add('-anim', source, 'U-turn', target);
		},
		onAfterHit(target, pokemon) {
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'shiftingrocks', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Rapid Turn', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		onAfterSubDamage(damage, target, pokemon) {
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'shiftingrocks', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Rapid Turn', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Normal",
	},

	// Perish Song
	shiftingrocks: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Does damage to foes on switch in.",
		shortDesc: "Stealth Rock but even more complicated.",
		name: "Shifting Rocks",
		isNonstandard: "Custom",
		gen: 8,
		pp: 15,
		priority: 0,
		flags: {reflectable: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Stealth Rock', target);
			this.add('-anim', source, 'Stealth Rock', target);
		},
		sideCondition: 'shiftingrocks',
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'Shifting Rocks');
				this.effectData.damage = 7;
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('heavydutyboots')) return;
				if (this.effectData.damage >= 17) {
					const activeMove = {
						id: 'rocks' as ID,
						basePower: 80,
						type: 'Rock',
						category: 'Physical',
						willCrit: false,
					};
					const damage = this.getDamage(pokemon, pokemon, activeMove as ActiveMove);
					if (typeof damage !== 'number') throw new Error("Shifting Rocks damage not dealt");
					this.damage(damage);
					this.effectData.damage = 7;
					pokemon.side.removeSideCondition(`shiftingrocks`);
					return false;
				}
				this.damage(this.effectData.damage * pokemon.maxhp / 100);
				this.effectData.damage++;
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Rock",
	},

	// phiwings99
	ghostof1v1past: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Imprisons and traps the target, and then transforms into them.",
		shortDesc: "Imprison + Mean Look + Transform.",
		name: "Ghost of 1v1 Past",
		isNonstandard: "Custom",
		gen: 8,
		pp: 1,
		priority: 0,
		flags: {},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Imprison', source);
			this.add('-anim', source, 'Mean Look', target);
			this.add('-anim', source, 'Transform', target);
		},
		onHit(target, pokemon, move) {
			target.addVolatile('trapped', pokemon, move, 'trapper');
			pokemon.addVolatile('imprison', pokemon, move);
			if (!pokemon.transformInto(target)) {
				return false;
			}
		},
		isZ: "boatiumz",
		secondary: null,
		target: "normal",
		type: "Ghost",
	},

	// piloswine gripado
	iciclespirits: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		name: "Icicle Spirits",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Horn Leech', target);
		},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Ice",
	},

	// PiraTe Princess
	dungeonsdragons: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Prevents the target from switching out and adds Dragon to the target's type. Has a 5% chance to either confuse the user or guarantee that the next attack is a critical hit, 15% chance to raise the user's Attack, Defense, Special Attack, Special Defense, or Speed by 1 stage, and a 15% chance to raise user's Special Attack and Speed by 1 stage.",
		shortDesc: "Target: can't switch,+Dragon. Does other things.",
		name: "Dungeons & Dragons",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Imprison', target);
			this.add('-anim', source, 'Trick-or-Treat', target);
			this.add('-anim', source, 'Shell Smash', source);
		},
		onHit(target, source, move) {
			this.add(`c|${getName('PiraTe Princess')}|did someone say d&d?`);
			target.addVolatile('trapped', source, move, 'trapper');
			if (!target.hasType('Dragon') && target.addType('Dragon')) {
				this.add('-start', target, 'typeadd', 'Dragon', '[from] move: Dungeons & Dragons');
			}
			const result = this.random(21);
			if (result === 20) {
				source.addVolatile('laserfocus');
			} else if (result >= 2 && result <= 16) {
				const boost: SparseBoostsTable = {};
				const stats: BoostName[] = ['atk', 'def', 'spa', 'spd', 'spe'];
				boost[stats[this.random(5)]] = 1;
				this.boost(boost, source);
			} else if (result >= 17 && result <= 19) {
				this.boost({spa: 1, spe: 1}, source);
			} else {
				source.addVolatile('confusion');
			}
		},
		target: "normal",
		type: "Dragon",
	},

	// ptoad
	croak: {
		accuracy: 100,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return move.basePower + 20 * pokemon.positiveBoosts();
		},
		category: "Special",
		desc: "Randomly raises two stats (other than evasion and accuracy) by 1 before attacking. + 20 power for each of the user's stat boosts. Sound based move.",
		shortDesc: "Raises two stats 1 stage, then attacks. +20 power for every boost. Sound",
		name: "Croak",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source, move) {
			this.add('-anim', source, 'Splash', source);
			const stats: BoostName[] = [];
			let stat: BoostName;
			const exclude: string[] = ['accuracy', 'evasion'];
			for (stat in source.boosts) {
				if (source.boosts[stat] < 6 && !exclude.includes(stat)) {
					stats.push(stat);
				}
			}
			if (stats.length) {
				let randomStat = this.sample(stats);
				const boost: SparseBoostsTable = {};
				boost[randomStat] = 1;
				if (stats.length > 1) {
					stats.splice(stats.indexOf(randomStat), 1);
					randomStat = this.sample(stats);
					boost[randomStat] = 1;
				}
				this.boost(boost, source, source, move);
			}
			this.add('-anim', source, 'Hyper Voice', source);
		},
		secondary: null,
		target: "normal",
		type: "Water",
	},

	// used for ptoad's ability
	swampyterrain: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the terrain becomes Swampy Terrain. During the effect, the power of Electric-type, Grass-type, and Ice-type attacks made by grounded Pokemon are halved and Water and Ground types heal 1/16 at the end of each turn if grounded. Fails if the current terrain is Swampy Terrain.",
		shortDesc: "5 turns. Grounded: -Electric, -Grass and -Ice power, Water & Ground heal 1/16 each turn.",
		name: "Swampy Terrain",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'swampyterrain',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (['Electric', 'Grass', 'Ice'].includes(move.type) && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('swampy terrain weaken');
					return this.chainModify(0.5);
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Swampy Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Swampy Terrain');
				}
			},
			onResidualOrder: 5,
			onResidualSubOrder: 3,
			onResidual() {
				this.eachEvent('Terrain');
			},
			onTerrain(pokemon) {
				if ((pokemon.hasType('Water') || pokemon.hasType('Ground')) && pokemon.isGrounded() && !pokemon.isSemiInvulnerable()) {
					this.debug('Pokemon is grounded and a Water or Ground type, healing through Swampy Terrain.');
					this.heal(pokemon.baseMaxhp / 16, pokemon, pokemon);
				}
			},
			onEnd() {
				if (!this.effectData.duration) this.eachEvent('Terrain');
				this.add('-fieldend', 'move: Swampy Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Ground",
	},

	// quadrophenic
	extremeways: {
		accuracy: 100,
		basePower: 75,
		category: "Special",
		desc: "Super effective against pokemon that are supereffective against it. 20% chance do a random effect depending on user's type.",
		shortDesc: "20% chance to a different effect depending on type.",
		name: "Extreme Ways",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Spite', target);
		},
		onEffectiveness(typeMod, target, type) {
			if (!target) return;
			const source = target.side.foe.active[0];
			for (const foeType of target.types) {
				if (this.dex.getImmunity(foeType, source) && this.dex.getEffectiveness(foeType, source) > 0) {
					return 1;
				}
			}
		},
		secondary: {
			chance: 20,
			onHit(target, source) {
				switch (this.toID(source.types[0])) {
				case 'normal':
					const typeList = Object.keys(this.dex.data.TypeChart);
					const newType = this.sample(typeList);
					source.types = [newType];
					this.add('-start', source, 'typechange', newType);
					break;
				case 'fire':
					target.trySetStatus('brn', source);
					break;
				case 'water':
					source.addVolatile('aquaring', source);
					break;
				case 'grass':
					if (target.hasType('Grass')) break;
					target.addVolatile('leechseed', source);
					break;
				case 'electric':
					target.trySetStatus('par', source);
					break;
				case 'bug':
					target.side.addSideCondition('stickyweb');
					break;
				case 'ice':
					target.trySetStatus('frz', source);
					break;
				case 'poison':
					target.trySetStatus('tox', source);
					break;
				case 'dark':
					target.addVolatile('taunt', source);
					break;
				case 'ghost':
					target.trySetStatus('slp', source);
					break;
				case 'psychic':
					this.field.setTerrain('psychicterrain');
					break;
				case 'flying':
					source.side.addSideCondition('tailwind', source);
					break;
				case 'dragon':
					target.forceSwitchFlag = true;
					break;
				case 'steel':
					target.side.addSideCondition('gmaxsteelsurge');
					break;
				case 'rock':
					target.side.addSideCondition('stealthrock');
					break;
				case 'ground':
					target.side.addSideCondition('spikes');
					break;
				case 'fairy':
					this.field.setTerrain('mistyterrain');
					break;
				case 'fighting':
					source.addVolatile('focusenergy', source);
					break;
				}
			},
		},
		target: "normal",
		type: "???",
	},

	// Rabia
	psychodrive: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "Has a 30% chance to boost the user's Speed by 1 stage.",
		shortDesc: "30% chance to boost the user's Spe by 1.",
		name: "Psycho Drive",
		isNonstandard: "Custom",
		gen: 8,
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Genesis Supernova', target);
		},
		secondary: {
			chance: 30,
			self: {
				boosts: {spe: 1},
			},
		},
		target: "normal",
		type: "Psychic",
	},

	// Rach
	spindawheel: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user uses a random hazard-setting move; burns, badly poisons, or paralyzes the target, and then switches out.",
		shortDesc: "Sets random hazard; brn/tox/par; switches.",
		name: "Spinda Wheel",
		isNonstandard: "Custom",
		gen: 8,
		pp: 20,
		priority: 0,
		flags: {protect: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			target.m.spindaHazard = this.sample(['Sticky Web', 'Stealth Rock', 'Spikes', 'Toxic Spikes', 'G-Max Steelsurge']);
			target.m.spindaStatus = this.sample(['Thunder Wave', 'Toxic', 'Will-O-Wisp']);
			if (target.m.spindaHazard) {
				this.add('-anim', source, target.m.spindaHazard, target);
			}
			if (target.m.spindaStatus) {
				this.add('-anim', source, target.m.spindaStatus, target);
			}
		},
		onHit(target, source, move) {
			if (target) {
				if (target.m.spindaHazard) {
					target.side.addSideCondition(target.m.spindaHazard);
				}
				if (target.m.spindaStatus) {
					const s = target.m.spindaStatus;
					target.trySetStatus(s === 'Toxic' ? 'tox' : s === 'Thunder Wave' ? 'par' : 'brn');
				}
			}
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Normal",
	},

	// Rage
	shockedlapras: {
		accuracy: 100,
		basePower: 75,
		category: "Special",
		desc: "Has a 100% chance to paralyze the user.",
		shortDesc: "100% chance to paralyze the user.",
		name: ":shockedlapras:",
		isNonstandard: "Custom",
		gen: 8,
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Thunder', target);
			if (!source.status) this.add('-anim', source, 'Thunder Wave', source);
		},
		onHit() {
			this.add(`raw|<img src="https://cdn.discordapp.com/emojis/528403513894502440.png?v=1" />`);
		},
		secondary: {
			chance: 100,
			self: {
				status: 'par',
			},
		},
		target: "normal",
		type: "Electric",
	},

	// used for Rage's ability
	inversionterrain: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the terrain becomes Inversion Terrain. During the effect, the the type chart is inverted, and grounded, paralyzed Pokemon have their Speed doubled. Fails if the current terrain is Inversion Terrain.",
		shortDesc: "5 turns. Type chart inverted. Par: 2x Spe.",
		name: "Inversion Terrain",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {},
		terrain: 'inversionterrain',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onNegateImmunity: false,
			onEffectivenessPriority: 1,
			onEffectiveness(typeMod, target, type, move) {
				// The effectiveness of Freeze Dry on Water isn't reverted
				if (move && move.id === 'freezedry' && type === 'Water') return;
				if (move && !this.dex.getImmunity(move, type)) return 1;
				return -typeMod;
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Inversion Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Inversion Terrain');
				}
			},
			onResidualOrder: 5,
			onResidualSubOrder: 3,
			onResidual() {
				this.eachEvent('Terrain');
			},
			onEnd() {
				if (!this.effectData.duration) this.eachEvent('Terrain');
				this.add('-fieldend', 'move: Inversion Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Psychic",
	},

	// Raj.Shoot
	fanservice: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "The user gets its Attack and Speed raised by 1 stage before using this move. If the user is a Swampert in its base form, it will Mega Evolve.",
		shortDesc: "+1 Atk/Spe before moving. Mega evolves user.",
		name: "Fan Service",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source, move) {
			this.boost({atk: 1, spe: 1}, source, source, move);
			this.add('-anim', source, 'Sacred Fire', target);
		},
		onHit(target, source) {
			if (source.species.id === 'swampert') {
				this.runMegaEvo(source);
			}
		},
		secondary: null,
		target: "normal",
		type: "Fire",
	},

	// Ransei
	ripsei: {
		accuracy: 100,
		basePower: 0,
		damageCallback(pokemon) {
			const damage = pokemon.hp;
			return damage;
		},
		category: "Special",
		desc: "Deals damage to the target equal to the user's current HP. If this move is successful, the user faints.",
		shortDesc: "Does damage equal to the user's HP. User faints.",
		name: "ripsei",
		isNonstandard: "Custom",
		gen: 8,
		pp: 5,
		priority: 1,
		flags: {protect: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Final Gambit', target);
		},
		onAfterMove(pokemon, target, move) {
			if (pokemon.moveThisTurnResult === true) {
				pokemon.faint();
			}
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
	},

	// rb220
	quickhammer: {
		accuracy: 100,
		basePower: 40,
		category: "Special",
		desc: "",
		shortDesc: "+1 Prio. +2 SpA if KO, -1 Def/SpD if not.",
		name: "Quickhammer",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 1,
		flags: {protect: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Crabhammer', target);
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) {
				this.boost({spa: 2}, pokemon, pokemon, move);
			} else {
				this.boost({def: -1, spd: -1}, pokemon, pokemon, move);
			}
		},
		secondary: null,
		target: "normal",
		type: "Water",
	},

	// used for rb220's ability
	waveterrain: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the terrain becomes Wave Terrain. During the effect, the accuracy of Water type moves is multiplied by 1.2, even if the user is not grounded. Hazards and screens are removed and cannot be set while Wave Terrain is active. Fails if the current terrain is Inversion Terrain.",
		shortDesc: "5 turns. Removes hazards. Water move acc 1.2x.",
		name: "Wave Terrain",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {},
		terrain: 'waveterrain',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onModifyAccuracy(accuracy, target, source, move) {
				if (move.type === 'Water') {
					return this.chainModify(1.2);
				}
			},
			onStart(battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Wave Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Wave Terrain');
				}
				this.add('-message', 'The battlefield suddenly flooded!');
				const removeAll = [
					'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
				];
				for (const sideCondition of removeAll) {
					if (source.side.foe.removeSideCondition(sideCondition)) {
						this.add('-sideend', source.side.foe, this.dex.getEffect(sideCondition).name, '[from] move: Wave Terrain', '[of] ' + source);
					}
					if (source.side.removeSideCondition(sideCondition)) {
						this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: Wave Terrain', '[of] ' + source);
					}
				}
			},
			onResidualOrder: 5,
			onResidualSubOrder: 3,
			onResidual() {
				this.eachEvent('Terrain');
			},
			onEnd() {
				if (!this.effectData.duration) this.eachEvent('Terrain');
				this.add('-fieldend', 'move: Wave Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Water",
	},

	// Robb576
	integeroverflow: {
		accuracy: true,
		basePower: 200,
		category: "Special",
		desc: "This move becomes a physical attack if the user's Attack is greater than its Special Attack, including stat stage changes. This move and its effects ignore the Abilities of other Pokemon.",
		shortDesc: "Physical if user's Atk > Sp. Atk. Ignores Abilities.",
		name: "Integer Overflow",
		isNonstandard: "Custom",
		gen: 8,
		pp: 1,
		priority: 0,
		flags: {},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Light That Burns The Sky', target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		ignoreAbility: true,
		isZ: "modium6z",
		secondary: null,
		target: "normal",
		type: "Psychic",
	},

	mode5offensive: {
		accuracy: true,
		basePower: 30,
		category: "Special",
		desc: "This move hits three times. Every hit has a 20% chance to drop the target's SpD by 1 stage.", // long description
		shortDesc: "Hits three times. Every hit has a 20% chance to drop the target's SpD by 1 stage.",
		name: "Mode [5: Offensive]",
		isNonstandard: "Custom",
		gen: 8,
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Focus Blast', target);
			this.add('-anim', source, 'Zap Cannon', target);
		},
		secondary: {
			chance: 20,
			boosts: {
				spd: -1,
			},
		},
		multihit: 3,
		target: "normal",
		type: "Fighting",
	},

	mode7defensive: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "This move cures the user's party of all status conditions, and then forces the target to switch to a random ally.",
		shortDesc: "Cures the user's party of all status conditions; and then forces the target to switch to a random ally.",
		name: "Mode [7: Defensive]",
		isNonstandard: "Custom",
		gen: 8,
		pp: 15,
		priority: 0, // should be -6, waiting on QC
		flags: {sound: 1, distance: 1, authentic: 1},
		forceSwitch: true,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Heal Bell', source);
			this.add('-anim', source, 'Roar', source);
		},
		onHit(pokemon, source) {
			this.add('-activate', source, 'move: Mode [7: Defensive]');
			const side = source.side;
			let success = false;
			for (const ally of side.pokemon) {
				if (ally.hasAbility('soundproof')) continue;
				if (ally.cureStatus()) success = true;
			}
			return success;
		},
		target: "normal",
		type: "Normal",
	},

	// SectoniaServant
	homunculussvanity: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the Special Attack of the user, and either Defense or Special Defense randomly.",
		shortDesc: "Raises the Special Attack of the user, and either Defense or Special Defense randomly.",
		name: "Homunculus's Vanity",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Cosmic Power', source);
			this.add('-anim', source, 'Psychic', target);
		},
		boosts: {
			spa: 1,
		},
		self: {
			onHit(source) {
				const boost: {[k: string]: number} = {};
				boost[['def', 'spd'][this.random(2)]] = 1;
				this.boost(boost, source);
				this.add(`c|${getName('SectoniaServant')}|Jelly baby ;w;`);
			},
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		zMove: {boost: {atk: 1}},
	},

	// Segmr
	disconnect: {
		accuracy: 100,
		basePower: 150,
		category: "Special",
		desc: "Deals damage two turns after this move is used. At the end of that turn, the damage is calculated at that time and dealt to the Pokemon at the position the target had when the move was used. If the user is no longer active at the time, damage is calculated based on the user's natural Special Attack stat, types, and level, with no boosts from its held item or Ability. Fails if this move, Doom Desire, or Future Sight is already in effect for the target's position. Switches the user out.",
		shortDesc: "Hits 2 turns after use. User switches out.",
		name: "Disconnect",
		isNonstandard: "Custom",
		gen: 8,
		pp: 5,
		priority: 0,
		flags: {},
		isFutureMove: true,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Doom Desire', target);
		},
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) {
				source.switchFlag = 'disconnect' as ID;
				return false;
			} else {
				Object.assign(target.side.slotConditions[target.position]['futuremove'], {
					move: 'disconnect',
					source: source,
					moveData: {
						id: 'disconnect',
						name: "Disconnect",
						isNonstandard: "Custom",
						gen: 8,
						accuracy: 100,
						basePower: 150,
						category: "Special",
						priority: 0,
						flags: {},
						effectType: 'Move',
						isFutureMove: true,
						type: 'Fairy',
					},
				});
				this.add('-start', source, 'Disconnect');
				this.add(`c|${getName('Segmr')}|Lemme show you this`);
				source.switchFlag = 'disconnect' as ID;
				return null;
			}
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
	},

	// sejesensei
	badopinion: {
		accuracy: 90,
		basePower: 120,
		category: "Physical",
		desc: "Forces the opponent out. The user's Defense is raised by 1 stage upon hitting.",
		shortDesc: "Forces the opponent out. +1 Def.",
		name: "Bad Opinion",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: -6,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Hyper Voice', target);
			this.add('-anim', source, 'Sludge Bomb', target);
		},
		onHit() {
			this.add(`c|${getName('sejesensei')}|Please go read To Love-Ru I swear its really good, wait... don’t leave…`);
		},
		self: {
			boosts: {
				def: 1,
			},
		},
		forceSwitch: true,
		secondary: null,
		target: "normal",
		type: "Poison",
	},

	// Seso
	legendaryswordsman: {
		accuracy: 100,
		basePower: 0,
		basePowerCallback(source, target, move) {
			if (source.m.parriedPower) {
				return source.m.parriedPower;
			}
			return 0;
		},
		beforeTurnCallback(pokemon, target) {
			const willMove = this.queue.willMove(target);
			if (willMove) {
				const move = this.dex.getMove(willMove.move);
				if (move.category === "Status") {
					this.boost({def: -1}, pokemon, pokemon, this.dex.getActiveMove('legendaryswordsman'));
					this.add(`c|${getName('Seso')}|Irritating a better swordsman than yourself is always a good way to end up dead.`);
				} else {
					if (this.randomChance(85, 100)) {
						pokemon.addVolatile('parry');
						this.boost({spe: 2}, pokemon, pokemon, this.dex.getActiveMove('legendaryswordsman'));
						pokemon.m.parriedPower = move.basePower * 1.15;
						this.add(`c|${getName('Seso')}|Too slow!`);
					} else {
						target.addVolatile('failedparry');
						this.add(`c|${getName('Seso')}|Scars on the back are a swordsman's shame.`);
					}
				}
			} else if (this.queue.willSwitch(target)) {
				this.add(`c|${getName('Seso')}|COWARD!`);
				this.boost({spe: 1}, pokemon, pokemon, this.dex.getActiveMove('legendaryswordsman'));
			}
		},
		category: "Physical",
		desc: "This move has an 85% chance to parry the target's move. If the target uses a status move, the parry fails and the user's Defense is lowered 1 stage. If the target switches, the user gains +1 Speed. If the user successfully parries, this move's base power becomes the base power of the target's move multiplied by 1.15. If the parry fails and the target is using an attacking move, the target's move is guaranteed to hit.",
		shortDesc: "Various things. Hits Flying NVE.",
		name: "Legendary Swordsman",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 1,
		flags: {protect: 1},
		ignoreImmunity: {'Ground': true},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Flying') return -1;
		},
		onTryMove(source, target, move) {
			this.attrLastMove('[still]');
			if (!source.volatiles['parry']) {
				this.add('-fail', source, 'move: Legendary Swordsman');
				return null;
			}
		},
		onPrepareHit(target, source) {
			this.add(`c|${getName('Seso')}|FORWARD!`);
			if (source.volatiles['parry']) {
				this.add('-anim', source, 'Gear Grind', target);
				this.add('-anim', source, 'Thief', target);
			}
		},
		onAfterHit(source, target, move) {
			delete source.volatiles['parry'];
			delete source.m.parriedPower;
		},
		secondary: null,
		target: "normal",
		type: "Ground",
	},

	// Shadecession
	shadeuppercut: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "This move ignores type effectiveness, substitutes, opposing side's Reflect, Light Screen, Safeguard, Mist and Aurora Veil.",
		shortDesc: "Ignores type effectiveness, substitutes, opposing side's Reflect, Light Screen, Safeguard, Mist and Aurora Veil.",
		name: "Shade Uppercut",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Sky Uppercut', target);
			this.add('-anim', source, 'Shadow Sneak', target);
		},
		onEffectiveness(typeMod, target, type) {
			return 0;
		},
		infiltrates: true,
		secondary: null,
		target: "normal",
		type: "Dark",
	},

	// Soft Flex
	updraft: {
		accuracy: 75,
		basePower: 75,
		category: "Special",
		desc: "Doesn't miss in rain/tempest, changes target's secondary typing to Flying for 2-5 turns. Secondary effects fail if the target is Ground-type or affected by Ingrain.",
		shortDesc: "Temporarily adds Flying type to the target. Rain/Tempest: never misses.",
		name: "Updraft",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Twister', target);
		},
		onModifyMove(move, pokemon, target) {
			if (['raindance', 'primordialsea', 'tempest'].includes(target.effectiveWeather())) {
				move.accuracy = true;
			}
		},
		condition: {
			noCopy: true,
			duration: 5,
			durationCallback(target, source) {
				return this.random(5, 7);
			},
			onStart(target) {
				this.effectData.origTypes = target.getTypes(); // store original types
				if (target.getTypes().length === 1) { // single type mons
					if (!target.addType('Flying')) return false;
					this.add('-start', target, 'typeadd', 'Flying', '[from] move: Updraft');
				} else { // dual typed mons
					const primary = target.getTypes()[0]; // take the first type
					if (!target.setType([primary, 'Flying'])) return false;
					this.add('-start', target, 'typechange', primary + '/Flying', '[from] move: Updraft');
				}
			},
			onEnd(target) {
				if (!target.setType(this.effectData.origTypes)) return false; // reset the types
				this.add('-start', target, 'typechange', this.effectData.origTypes.join('/'), '[silent]');
			},
		},
		secondary: {
			chance: 100,
			onHit(target) {
				if (target.hasType(['Flying', 'Ground']) || target.volatiles['ingrain']) return false;
				target.addVolatile('Updraft');
			},
		},
		target: "normal",
		type: "Flying",
	},

	// used for Soft Flex's ability
	tempestterrain: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Basically Electric Terrain.",
		shortDesc: "Basically Electric Terrain.",
		name: "Tempest Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'tempestterrain',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('damprock')) {
					return 8;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (status.id === 'slp' && target.isGrounded() && !target.isSemiInvulnerable()) {
					if (effect.id === 'yawn' || (effect.effectType === 'Move' && !effect.secondaries)) {
						this.add('-activate', target, 'move: Tempest Terrain');
					}
					return false;
				}
			},
			onTryAddVolatile(status, target) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'yawn') {
					this.add('-activate', target, 'move: Tempest Terrain');
					return null;
				}
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Electric' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('tempest terrain boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Tempest Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Tempest Terrain');
				}
			},
			onUpdate() {
				if (!this.field.isWeather('tempest')) {
					this.field.clearTerrain();
				}
			},
			onResidualOrder: 5,
			onResidualSubOrder: 3,
			onResidual() {
				this.eachEvent('Terrain');
				if (!this.field.isWeather('tempest')) {
					this.field.clearTerrain();
				}
			},
			onEnd() {
				this.add('-fieldend', 'move: Tempest Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Electric",
		zMove: {boost: {spe: 1}},
		contestType: "Clever",
	},

	// Spandan
	imtoxicyoureslippinunder: {
		accuracy: true,
		basePower: 110,
		category: "Physical",
		desc: "This move uses opponent's Special Defense to calculate damage (Like Foul Play). Also affects Steel types (Normal Effect).",
		shortDesc: "Uses opponent's Special Defense to calculate damage (Like Foul Play). Also affects Steel types (Normal Effect).",
		name: "I'm Toxic You're Slippin' Under",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Sludge Bomb', target);
			this.add('-anim', source, 'Sludge Wave', target);
		},
		ignoreImmunity: {
			'Steel': true,
		},
		secondary: null,
		target: "normal",
		type: "Poison",
	},

	// Struchni
	veto: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "Struchni only. Move's base power and priority depends on effectiveness of previous move.",
		shortDesc: "Struchni: Move BP and prio depends on eff of prev move.",
		name: "Veto",
		isNonstandard: "Custom",
		gen: 8,
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		onTryMove(source) {
			this.attrLastMove('[still]');
			if (source.name !== 'Struchni') {
				this.add('-fail', source);
				this.hint("Only Struchni can use Veto.");
				return null;
			}
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Head Smash', target);
		},
		onModifyType(move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		onModifyPriority(priority, source, target, move) {
			if (source.m.typeEff) {
				if (source.m.typeEff < 0) {
					return priority + 1;
				} else if (source.m.typeEff >= 0) {
					return priority - 1;
				}
			}
		},
		basePowerCallback(pokemon, target, move) {
			if (pokemon.m.typeEff) {
				if (pokemon.m.typeEff < 0) {
					return move.basePower * 2;
				} else if (pokemon.m.typeEff >= 0) {
					return move.basePower / 2;
				}
			}
			return move.basePower;
		},
		onHit(target, source) {
			if (source.m.typeEff) {
				if (source.m.typeEff < 0) {
					this.add(`c|${getName('Struchni')}|**veto**`);
				} else if (source.m.typeEff >= 0) {
					this.add(`c|${getName('Struchni')}|** veto**`);
				}
			}
		},
		target: "normal",
		type: "Normal",
	},

	// Teclis
	ten: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP, rounded half up. Raises the user's Special Attack by 1 stage.",
		shortDesc: "Heals user by 50% and raises Sp. Atk 1 stage.",
		name: "Ten",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		onTryMove(target) {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Calm Mind', source);
			this.add('-anim', source, 'Recover', source);
		},
		boosts: {
			spa: 1,
		},
		secondary: null,
		target: "self",
		type: "Psychic",
	},

	// tennisace
	corgistampede: {
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		desc: "This attack always hits 4 times in a row. Hits Ground-type Pokemon super-effectively.",
		shortDesc: "Hits 4 times. Super effective on Ground.",
		name: "Corgi Stampede",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', target, 'Rollout', target);
			this.add('-anim', target, 'Thundershock', target);
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Ground') return 1;
		},
		ignoreImmunity: {Electric: true},
		multihit: 4,
		secondary: null,
		target: "normal",
		type: "Electric",
	},

	// Tenshi
	stonykibbles: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "For 5 turns, the weather becomes Sandstorm. At the end of each turn except the last, all active Pokemon lose 1/16 of their maximum HP, rounded down, unless they are a Ground, Rock, or Steel type, or have the Magic Guard, Overcoat, Sand Force, Sand Rush, or Sand Veil Abilities. During the effect, the Special Defense of Rock-type Pokemon is multiplied by 1.5 when taking damage from a special attack. Lasts for 8 turns if the user is holding Smooth Rock. Fails if the current weather is Sandstorm.",
		shortDesc: "For 5 turns, a sandstorm rages.",
		name: "Stony Kibbles",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Rock Slide', target);
			this.add('-anim', source, 'Crunch', target);
			this.add('-anim', source, 'Sandstorm', target);
		},
		weather: 'Sandstorm',
		target: "normal",
		type: "Normal",
	},

	// temp
	dropadraco: {
		accuracy: 90,
		basePower: 130,
		category: "Special",
		desc: "Lowers the user's Special Attack by 2 stages, then raises it by 1 stage.",
		shortDesc: "Lowers user's Sp. Atk by 2, then raises by 1.",
		name: "DROP A DRACO",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Draco Meteor', target);
		},
		self: {
			boosts: {
				spa: -2,
			},
		},
		onAfterMoveSecondarySelf(source, target) {
			this.boost({spa: 1}, target, target, this.dex.getActiveMove('dropadraco'));
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
	},

	// The Immortal
	wattup: {
		accuracy: 100,
		basePower: 73,
		category: "Special",
		desc: "Has a 100% chance to raise the user's Speed by 1 stage.",
		shortDesc: "+1 Speed if successful.",
		name: "Watt Up",
		isNonstandard: "Custom",
		gen: 8,
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Volt Switch', target);
			this.add('-anim', source, 'Nasty Plot', source);
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Electric",
	},

	// tiki
	rightoncue: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "25% chance of setting up a layer of spikes. 25% chance of using Heal Bell. 25% chance of using Leech Seed. 25% chance of using Tailwind. 25% chance of using Octolock.",
		shortDesc: "5 independent chances of rolling different effects.",
		name: "Right. On. Cue!",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {},
		onHit(target, source) {
			let effects = 0;
			if (this.randomChance(1, 4)) {
				this.useMove('Spikes', source, target);
				effects++;
			}
			if (this.randomChance(1, 4)) {
				this.useMove('Heal Bell', source);
				effects++;
			}
			if (this.randomChance(1, 4)) {
				this.useMove('Leech Seed', source, target);
				effects++;
			}
			if (this.randomChance(1, 4)) {
				this.useMove('Tailwind', source, target);
				effects++;
			}
			if (this.randomChance(1, 4)) {
				this.useMove('Octolock', source);
				effects++;
			}
			if (effects <= 0) {
				this.add(`c|${getName('tiki')}|truly a dumpster fire`);
			} else if (effects >= 3) {
				this.add(`c|${getName('tiki')}|whos ${source.side.foe.name}?`);
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},

	// trace
	herocreation: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user switches out and raises the incoming Pokémon attack and special attack stat by one stage.",
		shortDesc: "The user switches out and raises the incoming Pokémon attack and special attack stat by one stage.",
		name: "Hero Creation",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: -6,
		flags: {snatch: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Teleport', source);
			this.add('-anim', source, 'Work Up', source);
		},
		selfSwitch: true,
		sideCondition: 'herocreation',
		condition: {
			duration: 1,
			onStart(side, source) {
				this.debug('Hero Creation started on ' + side.name);
				this.effectData.positions = [];
				for (const i of side.active.keys()) {
					this.effectData.positions[i] = false;
				}
				this.effectData.positions[source.position] = true;
			},
			onRestart(side, source) {
				this.effectData.positions[source.position] = true;
			},
			onSwitchInPriority: 1,
			onSwitchIn(target) {
				this.add('-activate', target, 'move: Hero Creation');
				this.boost({atk: 1, spa: 1}, target, null, this.dex.getActiveMove('herocreation'));
			},
		},
		secondary: null,
		target: "self",
		type: "Psychic",
	},

	// Trickster
	soulshatteringstare: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Curses the opponent and blocks it from healing.",
		shortDesc: "Curses the opponent and blocks it from healing.",
		name: "Soul-Shattering Stare",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: -7,
		flags: {protect: 1, authentic: 1, reflectable: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Glare', target);
			this.add('-anim', source, 'Trick-or-Treat', source);
		},
		onHit(pokemon) {
			pokemon.addVolatile('healblock');
			pokemon.addVolatile('curse');
		},
		secondary: null,
		target: "randomNormal",
		type: "Ghost",
		contestType: "Tough",
	},

	// Vexen
	asteriusstrike: {
		accuracy: 85,
		basePower: 100,
		category: "Physical",
		desc: "Has a 25% chance to confuse the target.",
		shortDesc: "25% chance to confuse the target.",
		name: "Asterius Strike",
		isNonstandard: "Custom",
		gen: 8,
		pp: 5,
		priority: 0,
		flags: {protect: 1, contact: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Giga Impact', target);
		},
		secondary: {
			chance: 25,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Normal",
	},

	// vivalospride
	dripbayless: {
		accuracy: true,
		basePower: 85,
		category: "Special",
		desc: "This move's type effectiveness against Water is changed to be super effective no matter what this move's type is.",
		shortDesc: "Super effective on Water.",
		name: "DRIP BAYLESS",
		isNonstandard: "Custom",
		gen: 8,
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Lava Plume', target);
			this.add('-anim', source, 'Sunny Day', target);
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Water') return 1;
		},
		secondary: null,
		target: "normal",
		type: "Fire",
	},

	// vooper
	pandaexpress: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Lowers the target's Attack and Special Attack by 2 stage. If this move is successful, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if the target's Attack and Special Attack stat stages were both unchanged, or if there are no unfainted party members.",
		shortDesc: "Lowers target's Attack and Sp. Atk by 2. User switches.",
		name: "Panda Express",
		isNonstandard: "Custom",
		gen: 8,
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1, authentic: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Parting Shot', target);
		},
		onHit(target, source, move) {
			const success = this.boost({atk: -2, spa: -2}, target, source);
			if (!success && !target.hasAbility('mirrorarmor')) {
				delete move.selfSwitch;
			}
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Dark",
	},

	// xJoelituh
	burnbone: {
		accuracy: 90,
		basePower: 0,
		category: "Status",
		desc: "This pokemon heals 33% of their health if this move burns this pokemon.",
		shortDesc: "Heals 33% of their health if this move burns.",
		name: "Burn Bone",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 1,
		flags: {protect: 1, reflectable: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Will-O-Wisp', target);
			this.add('-anim', source, 'Shadow Bone', target);
		},
		onHit(target, source, move) {
			if (target.trySetStatus('brn', source, move)) {
				this.heal(source.baseMaxhp * 0.33, source);
				return;
			}
			return false;
		},
		secondary: null,
		target: "normal",
		type: "Fire",
	},

	// yuki
	classchange: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "If the user is a cosplay Pikachu forme, it randomly changes forme and effect.",
		shortDesc: "Pikachu: Random forme and effect.",
		name: "Class Change",
		isNonstandard: "Custom",
		gen: 8,
		pp: 6,
		noPPBoosts: true,
		priority: 0,
		flags: {protect: 1},
		onTryMove(source) {
			this.attrLastMove('[still]');
			if (source.name !== 'yuki') {
				this.add('-fail', source);
				this.hint("Only yuki can use Class Change.");
				return null;
			}
		},
		onPrepareHit(foe, source, move) {
			let animation: string;
			const formes = ['Cleric', 'Ninja', 'Dancer', 'Songstress', 'Jester'];
			source.m.yukiCosplayForme = this.sample(formes);
			switch (source.m.yukiCosplayForme) {
			case 'Cleric':
				animation = 'Strength Sap';
				break;
			case 'Ninja':
				animation = 'Confuse Ray';
				break;
			case 'Dancer':
				animation = 'Feather Dance';
				break;
			case 'Songstress':
				animation = 'Sing';
				break;
			case 'Jester':
				animation = 'Charm';
				break;
			default:
				animation = 'Tackle';
				break;
			}
			this.add('-anim', source, animation, foe);
		},
		onHit(target, source) {
			if (source.baseSpecies.baseSpecies !== 'Pikachu') return;
			let classChangeIndex = source.moveSlots.map(x => x.id).indexOf('classchange' as ID);
			if (classChangeIndex < 0) classChangeIndex = 1;
			switch (source.m.yukiCosplayForme) {
			case 'Cleric':
				if (target.boosts.atk === -6) return false;
				const atk = target.getStat('atk', false, true);
				const success = this.boost({atk: -1}, target, source, null, false, true);
				changeSet(this, source, ssbSets['yuki-Cleric']);
				this.add('-message', 'yuki patches up her wounds!');
				return !!(this.heal(atk, source, target) || success);
			case 'Ninja':
				target.addVolatile('confusion');
				changeSet(this, source, ssbSets['yuki-Ninja']);
				this.add('-message', `yuki's fast movements confuse ${target.name}!`);
				return;
			case 'Dancer':
				this.boost({atk: -2}, target, source, this.effect, false, true);
				changeSet(this, source, ssbSets['yuki-Dancer']);
				this.add('-message', `yuki dazzles ${target.name} with her moves!`);
				return;
			case 'Songstress':
				target.trySetStatus('slp');
				changeSet(this, source, ssbSets['yuki-Songstress']);
				this.add('-message', `yuki sang an entrancing melody!`);
				return;
			case 'Jester':
				this.boost({atk: -2}, target, source, this.effect, false, true);
				changeSet(this, source, ssbSets['yuki-Jester']);
				this.add('-message', `yuki tries her best to impress ${target.name}!`);
				return;
			default:
				return;
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},

	// Zalm
	ingredientforaging: {
		accuracy: 100,
		basePower: 70,
		category: "Special",
		desc: "Heals 50% if foe is holding an item. Removes item and enables Belch.",
		shortDesc: "If foe has item: Heal 50% and remove it.",
		name: "Ingredient Foraging",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onAfterHit(target, source) {
			if (source.hp) {
				const item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] stealeat', '[move] Ingredient Foraging', '[of] ' + source);
					this.heal(source.maxhp / 2, source);
					this.add(`c|${getName('Zalm')}|Yum`);
					source.ateBerry = true;
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Bug",
	},

	// Zarel
	relicdance: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "+1 Special Attack and transforms into Meloetta-P/A with their accompanying moveset regardless of the outcome of the move. The move becomes fighting if Meloetta-P uses the move.",
		shortDesc: "+1 Special Attack. Meloetta transforms. If Meloetta-Pirouette, type becomes Fighting.",
		name: "Relic Dance",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, dance: 1},
		secondary: null,
		onTryMove(pokemon, target, move) {
			this.attrLastMove('[still]');
			if (pokemon.species.baseSpecies === 'Meloetta') {
				return;
			}
			this.add('-fail', pokemon, 'move: Relic Dance');
			this.hint("Only a Pokemon whose form is Meloetta or Meloetta-Pirouette can use this move.");
			return null;
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Relic Song', target);
		},
		onAfterMove(source) {
			const formeMoves: {[key: string]: string[]} = {
				meloetta: ["Quiver Dance", "Feather Dance", "Lunar Dance", "Relic Dance"],
				meloettapirouette: ["Revelation Dance", "Fiery Dance", "Petal Dance", "Relic Dance"],
			};
			const forme = source.species.name === "Meloetta" ? "Meloetta-Pirouette" : "Meloetta";
			source.formeChange(forme, this.effect, true);
			const newMoves = formeMoves[this.toID(forme)];
			const carryOver = source.moveSlots.slice().map(m => {
				return m.pp / m.maxpp;
			});
			// Incase theres ever less than 4 moves
			while (carryOver.length < 4) {
				carryOver.push(1);
			}
			source.moveSlots = [];
			let slot = 0;
			for (const newMove of newMoves) {
				const moveData = source.battle.dex.getMove(this.toID(newMove));
				if (!moveData.id) continue;
				source.moveSlots.push({
					move: moveData.name,
					id: moveData.id,
					pp: ((moveData.noPPBoosts || moveData.isZ) ? Math.floor(moveData.pp * carryOver[slot]) : moveData.pp * 8 / 5),
					maxpp: ((moveData.noPPBoosts || moveData.isZ) ? moveData.pp : moveData.pp * 8 / 5),
					target: moveData.target,
					disabled: false,
					disabledSource: '',
					used: false,
				});
				slot++;
			}
			this.boost({spa: 1}, source);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.species.name === "Meloetta-Pirouette") move.type = "Fighting";
		},
		target: "allAdjacentFoes",
		type: "Psychic",
	},

	// Zodiax
	bigstormcoming: {
		accuracy: 100,
		basePower: 0,
		category: "Special",
		desc: "Uses Hurricane, Thunder, Blizzard, and Weather Ball at 30% power.",
		shortDesc: "30% power: Hurricane, Thunder, Blizzard, Weather Ball.",
		name: "Big Storm Coming",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit() {
			this.add(`c|${getName('Zodiax')}|There is a hail no storm okayyyyyy`);
		},
		onTry(pokemon, target) {
			pokemon.m.bigstormcoming = true;
			this.useMove("Hurricane", pokemon);
			this.useMove("Thunder", pokemon);
			this.useMove("Blizzard", pokemon);
			this.useMove("Weather Ball", pokemon);
			pokemon.m.bigstormcoming = false;
		},
		secondary: null,
		target: "normal",
		type: "Flying",
	},
	// Zyg
	luckofthedraw: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: " Boosts the users Speed, Attack and Defense by 1 stage",
		shortDesc: "Raises the user's Attack, Defense, Speed by 1",
		name: "Luck of the Draw",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Quiver Dance', source);
		},
		boosts: {
			atk: 1,
			def: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Psychic",
	},
	// These moves need modified to support Alpha's move
	auroraveil: {
		inherit: true,
		desc: "For 5 turns, the user and its party members take 0.5x damage from physical and special attacks, or 0.66x damage if in a Double Battle; does not reduce damage further with Reflect or Light Screen. Critical hits ignore this protection. It is removed from the user's side if the user or an ally is successfully hit by Brick Break, Psychic Fangs, or Defog. Brick Break and Psychic Fangs remove the effect before damage is calculated. Lasts for 8 turns if the user is holding Light Clay. Fails unless the weather is Heavy Hailstorm or Hail.",
		shortDesc: "For 5 turns, damage to allies is halved. Hail-like weather only.",
		onTryHitSide() {
			if (!this.field.isWeather(['heavyhailstorm', 'hail'])) return false;
		},
	},
	blizzard: {
		inherit: true,
		desc: "Has a 10% chance to freeze the target. If the weather is Heavy Hailstorm or Hail, this move does not check accuracy.",
		shortDesc: "10% freeze foe(s). Can't miss in Hail-like weather.",
		onModifyMove(move) {
			if (this.field.isWeather(['heavyhailstorm', 'hail'])) move.accuracy = true;
		},
	},
	dig: {
		inherit: true,
		condition: {
			duration: 2,
			onImmunity(type, pokemon) {
				if (['sandstorm', 'heavyhailstorm', 'hail'].includes(type)) return false;
			},
			onInvulnerability(target, source, move) {
				if (['earthquake', 'magnitude'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.id === 'earthquake' || move.id === 'magnitude') {
					return this.chainModify(2);
				}
			},
		},
	},
	dive: {
		inherit: true,
		condition: {
			duration: 2,
			onImmunity(type, pokemon) {
				if (['sandstorm', 'heavyhailstorm', 'hail'].includes(type)) return false;
			},
			onInvulnerability(target, source, move) {
				if (['surf', 'whirlpool'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.id === 'surf' || move.id === 'whirlpool') {
					return this.chainModify(2);
				}
			},
		},
	},
	moonlight: {
		inherit: true,
		desc: "The user restores 1/2 of its maximum HP if Delta Stream or no weather conditions are in effect or if the user is holding Utility Umbrella, 2/3 of its maximum HP if the weather is Desolate Land or Sunny Day, and 1/4 of its maximum HP if the weather is Heavy Hailstorm, Hail, Primordial Sea, Rain Dance, or Sandstorm, all rounded half down.",
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'heavyhailstorm':
			case 'hail':
				factor = 0.25;
				break;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
	},
	morningsun: {
		inherit: true,
		desc: "The user restores 1/2 of its maximum HP if Delta Stream or no weather conditions are in effect or if the user is holding Utility Umbrella, 2/3 of its maximum HP if the weather is Desolate Land or Sunny Day, and 1/4 of its maximum HP if the weather is Heavy Hailstorm, Hail, Primordial Sea, Rain Dance, or Sandstorm, all rounded half down.",
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'heavyhailstorm':
			case 'hail':
				factor = 0.25;
				break;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
	},
	solarbeam: {
		inherit: true,
		desc: "This attack charges on the first turn and executes on the second. Power is halved if the weather is Heavy Hailstorm, Hail, Primordial Sea, Rain Dance, or Sandstorm and the user is not holding Utility Umbrella. If the user is holding a Power Herb or the weather is Desolate Land or Sunny Day, the move completes in one turn. If the user is holding Utility Umbrella and the weather is Desolate Land or Sunny Day, the move still requires a turn to charge.",
		onBasePower(basePower, pokemon, target) {
			const weathers = ['raindance', 'primordialsea', 'sandstorm', 'heavyhailstorm', 'hail'];
			if (weathers.includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
	},
	solarblade: {
		inherit: true,
		desc: "This attack charges on the first turn and executes on the second. Power is halved if the weather is Heavy Hailstorm, Hail, Primordial Sea, Rain Dance, or Sandstorm and the user is not holding Utility Umbrella. If the user is holding a Power Herb or the weather is Desolate Land or Sunny Day, the move completes in one turn. If the user is holding Utility Umbrella and the weather is Desolate Land or Sunny Day, the move still requires a turn to charge.",
		onBasePower(basePower, pokemon, target) {
			const weathers = ['raindance', 'primordialsea', 'sandstorm', 'heavyhailstorm', 'hail'];
			if (weathers.includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
	},
	synthesis: {
		inherit: true,
		desc: "The user restores 1/2 of its maximum HP if Delta Stream or no weather conditions are in effect or if the user is holding Utility Umbrella, 2/3 of its maximum HP if the weather is Desolate Land or Sunny Day, and 1/4 of its maximum HP if the weather is Heavy Hailstorm, Hail, Primordial Sea, Rain Dance, or Sandstorm, all rounded half down.",
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'heavyhailstorm':
			case 'hail':
				factor = 0.25;
				break;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
	},
	weatherball: {
		inherit: true,
		desc: "Power doubles if a weather condition other than Delta Stream is active, and this move's type changes to match. Ice type during Heavy Hailstorm or Hail, Water type during Primordial Sea or Rain Dance, Rock type during Sandstorm, and Fire type during Desolate Land or Sunny Day. If the user is holding Utility Umbrella and uses Weather Ball during Primordial Sea, Rain Dance, Desolate Land, or Sunny Day, the move is still Normal-type and does not have a base power boost.",
		onModifyType(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.type = 'Fire';
				break;
			case 'raindance':
			case 'primordialsea':
				move.type = 'Water';
				break;
			case 'sandstorm':
				move.type = 'Rock';
				break;
			case 'heavyhailstorm':
			case 'hail':
				move.type = 'Ice';
				break;
			}
		},
		onModifyMove(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.basePower *= 2;
				break;
			case 'raindance':
			case 'primordialsea':
				move.basePower *= 2;
				break;
			case 'sandstorm':
				move.basePower *= 2;
				break;
			case 'heavyhailstorm':
			case 'hail':
				move.basePower *= 2;
				break;
			}
		},
	},
	// Modified move descriptions for support of Segmr's move
	doomdesire: {
		inherit: true,
		desc: "Deals damage two turns after this move is used. At the end of that turn, the damage is calculated at that time and dealt to the Pokemon at the position the target had when the move was used. If the user is no longer active at the time, damage is calculated based on the user's natural Special Attack stat, types, and level, with no boosts from its held item or Ability. Fails if this move, Disconnect, or Future Sight is already in effect for the target's position.",
	},
	futuresight: {
		inherit: true,
		desc: "Deals damage two turns after this move is used. At the end of that turn, the damage is calculated at that time and dealt to the Pokemon at the position the target had when the move was used. If the user is no longer active at the time, damage is calculated based on the user's natural Special Attack stat, types, and level, with no boosts from its held item or Ability. Fails if this move, Doom Desire, or Disconnect is already in effect for the target's position.",
	},
	// For shifting rocks compatibility
	defog: {
		inherit: true,
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'shiftingrocks', 'stickyweb', 'gmaxsteelsurge',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'shiftingrocks', 'stickyweb', 'gmaxsteelsurge',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.getEffect(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			this.field.clearTerrain();
			return success;
		},
	},
	rapidspin: {
		inherit: true,
		onAfterHit(target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'shiftingrocks', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		onAfterSubDamage(damage, target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'shiftingrocks', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
	},
	courtchange: {
		inherit: true,
		onHitField(target, source) {
			const sourceSide = source.side;
			const targetSide = source.side.foe;
			const sideConditions = [
				'mist', 'lightscreen', 'reflect', 'spikes', 'safeguard', 'tailwind', 'toxicspikes', 'stealthrock', 'shiftingrocks', 'waterpledge', 'firepledge', 'grasspledge', 'stickyweb', 'auroraveil', 'gmaxsteelsurge', 'gmaxcannonade', 'gmaxvinelash', 'gmaxwildfire',
			];
			let success = false;
			for (const id of sideConditions) {
				const effectName = this.dex.getEffect(id).name;
				if (sourceSide.sideConditions[id] && targetSide.sideConditions[id]) {
					[sourceSide.sideConditions[id], targetSide.sideConditions[id]] = [
						targetSide.sideConditions[id], sourceSide.sideConditions[id],
					];
					this.add('-sideend', sourceSide, effectName, '[silent]');
					this.add('-sideend', targetSide, effectName, '[silent]');
				} else if (sourceSide.sideConditions[id] && !targetSide.sideConditions[id]) {
					targetSide.sideConditions[id] = sourceSide.sideConditions[id];
					delete sourceSide.sideConditions[id];
					this.add('-sideend', sourceSide, effectName, '[silent]');
				} else if (targetSide.sideConditions[id] && !sourceSide.sideConditions[id]) {
					sourceSide.sideConditions[id] = targetSide.sideConditions[id];
					delete targetSide.sideConditions[id];
					this.add('-sideend', targetSide, effectName, '[silent]');
				} else {
					continue;
				}
				let sourceLayers = sourceSide.sideConditions[id] ? (sourceSide.sideConditions[id].layers || 1) : 0;
				let targetLayers = targetSide.sideConditions[id] ? (targetSide.sideConditions[id].layers || 1) : 0;
				for (; sourceLayers > 0; sourceLayers--) {
					this.add('-sidestart', sourceSide, effectName, '[silent]');
				}
				for (; targetLayers > 0; targetLayers--) {
					this.add('-sidestart', targetSide, effectName, '[silent]');
				}
				success = true;
			}
			if (!success) return false;
			this.add('-activate', source, 'move: Court Change');
		},
	},
	gmaxwindrage: {
		inherit: true,
		self: {
			onHit(source) {
				let success = false;
				const removeTarget = [
					'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'shiftingrocks', 'stickyweb', 'gmaxsteelsurge',
				];
				const removeAll = [
					'spikes', 'toxicspikes', 'stealthrock', 'shiftingrocks', 'stickyweb', 'gmaxsteelsurge',
				];
				for (const targetCondition of removeTarget) {
					if (source.side.foe.removeSideCondition(targetCondition)) {
						if (!removeAll.includes(targetCondition)) continue;
						this.add('-sideend', source.side.foe, this.dex.getEffect(targetCondition).name, '[from] move: G-Max Wind Rage', '[of] ' + source);
						success = true;
					}
				}
				for (const sideCondition of removeAll) {
					if (source.side.removeSideCondition(sideCondition)) {
						this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: G-Max Wind Rage', '[of] ' + source);
						success = true;
					}
				}
				this.field.clearTerrain();
				return success;
			},
		},
	},
};
