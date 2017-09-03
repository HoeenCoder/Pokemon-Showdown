'use strict';

exports.BattleMovedex = {
	// Aelita
	energyfield: {
		accuracy: 90,
		basePower: 150,
		category: "Special",
		id: "energyfield",
		isNonstandard: true,
		isViable: true,
		name: "Energy Field",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove: function (move) {
			if (this.isWeather(['raindance', 'primordialsea'])) {
				move.accuracy = true;
			} else if (this.isWeather(['sunnyday', 'desolateland'])) {
				move.accuracy = 50;
			}
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Parabolic Charge", source);
			this.add('-anim', source, "Parabolic Charge", source);
			this.add('-anim', source, "Ion Deluge", target);
		},
		self: {boosts:{spa:-1, spd:-1, spe:-1}},
		secondary: {
			chance: 40,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
	},
	// Astara
	starboltdesperation: {
		accuracy: 75,
		basePower: 0,
		category: "Physical",
		id: "starboltdesperation",
		isViable: true,
		isNonstandard: true,
		name: 'Star Bolt Desperation',
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1},
		typechart: [
			'Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting',
			'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice',
			'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water',
		],
		damageCallback: function (pokemon, target) {
			return target.hp * 0.75;
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Grudge", target);
			this.add('-anim', source, "Dragon Ascent", target);
		},
		onHit: function (target, source) {
			const boosts = {};
			const stats = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy'];
			const increase = stats[this.random(6)];
			const decrease = stats[this.random(6)];
			boosts[increase] = 1;
			boosts[decrease] = -1;
			this.boost(boosts, source, source);
		},
		onModifyMove: function (move) {
			move.type = move.typechart[this.random(18)];
		},
		secondary: {
			chance: 100,
			onHit: function (target) {
				if (this.random(2) === 1) {
					const status = ['par', 'brn', 'frz', 'psn', 'tox', 'slp'][this.random(6)];
					if (status === 'frz') {
						let freeze = true;
						for (let i = 0; i < target.side.pokemon.length; i++) {
							const pokemon = target.side.pokemon[i];
							if (pokemon.status === 'frz') freeze = false;
						}
						if (freeze) target.trySetStatus('frz');
					} else {
						target.trySetStatus(status);
					}
				}
				if (this.random(2) === 1) target.addVolatile('confusion');
			},
		},
		target: "normal",
		type: "Normal",
	},
	// Beowulf
	buzzingofthestorm: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		shortDesc: "20% chance to flinch the target.",
		id: "buzzingofthestorm",
		isViable: true,
		isNonstandard: true,
		name: "Buzzing of the Storm",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		onTryHit: function (target, source, move) {
			this.attrLastMove(['still']);
			this.add('-anim', source, "Bug Buzz", target);
		},
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		target: "any",
		type: "Bug",
	},
	// EV
	darkaggro: {
		accuracy: 100,
		basePower: 40,
		basePowerCallback: function (pokemon, target, move) {
			return move.basePower + 20 * pokemon.positiveBoosts();
		},
		category: "Physical",
		shortDesc: "Steals target's boosts before dealing damage. + 20 power for each of the user's stat boosts.",
		id: "darkaggro",
		isNonstandard: true,
		name: "Dark Aggro",
		pp: 10,
		priority: 0,
		flags: {contact:1, protect: 1, mirror: 1},
		stealsBoosts: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Spectral Thief", target);
		},
		onHit: function () {
			this.add('c|~EV|MINE!!!');
		},
		secondary: false,
		target: "normal",
		type: "Dark",
	},
	// Level 51
	nextlevelstrats: {
		accuracy: true,
		category: "Status",
		id: "nextlevelstrats",
		isNonstandard: true,
		name: "Next Level Strats",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, snatch: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Follow Me", target);
		},
		onHit: function (pokemon) {
			const template = pokemon.template;
			pokemon.level += 10;
			pokemon.set.level = pokemon.level;
			// recalcs stats, the client is not informed about a change
			pokemon.formeChange(template);

			pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
			this.add('detailschange', pokemon, pokemon.details);

			const newHP = Math.floor(Math.floor(2 * template.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100) * pokemon.level / 100 + 10);
			pokemon.hp = newHP - (pokemon.maxhp - pokemon.hp);
			pokemon.maxhp = newHP;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');

			this.add('-message', 'Level 51 advanced 10 levels! It is now level ' + pokemon.level + '!');
		},
		secondary: false,
		target: "self",
		type: "Normal",
	},
	//Imas
 	accelesquawk: {
 		accuracy: 100,
 		basePower: 90,
 		category: "Physical",
 		shortDesc: "Ignores the Abilities of other Pokemon.",
 		id: "accelesquawk",
 		isNonstandard: true,
 		name: "Accele Squawk",
 		pp: 10,
 		priority: 0,
		flags: {protect: 1, mirror: 1},
		ignoreAbility: true,
 		onPrepareHit: function (target, source) {
 			this.attrLastMove('[still]');
 			this.add('-anim', source, "Brave Bird", target);
			this.add('c|%imas|**AcceleSquawk**');
 		},
 		secondary: false,
 		target: "normal",
 		type: "Flying",
 	},
 	boi: {
 		accuracy: true,
 		basePower: 180,
 		category: "Physical",
 		shortDesc: "No additional effect.",
 		id: "boi",
 		isNonstandard: true,
 		name: "B O I",
 		pp: 1,
 		priority: 0,
		isZ: 'imasiumz',
 		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
 			this.add('-anim', source, "Supersonic Skystrike", target);
			this.boost({atk: 3, def: 1, spd: 1}, source);
 		},
 		secondary: false,
 		target: "normal",
 		type: "Flying",
 	},
	// Innovamania
	ragequit: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "ragequit",
		name: "Rage Quit",
		pp: 40,
		priority: 0,
		flags: {gravity: 1},
		onHit: function (pokemon) {
			pokemon.faint();
		},
		secondary: false,
		target: "self",
		type: "Normal",
	},
	//joim
	retirement: {
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "-1 def, spd on foe, +1 atk, spa on replacement",
		id: "retirement",
		isNonstandard: true,
		name: "Retirement",
		pp: 20,
		priority: 2,
		flags: {protect: 1, mirror: 1},
		selfSwitch: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Volt Switch", target);
		},
		onAfterMove: function (pokemon, target, move) {
			pokemon.side.addSideCondition("retirement", pokemon, move);
		},
		effect: {
			duration: 2,
			onStart: function (side, source) {
				//side = side.foe;
				this.debug('Retirement started on ' + side.name);
				this.effectData.positions = [];
				for (let i = 0; i < side.active.length; i++) {
					this.effectData.positions[i] = false;
				}
				this.effectData.positions[source.position] = true;
			},
			onRestart: function (side, source) {
				this.effectData.positions[source.position] = true;
			},
			onSwitchInPriority: 1,
			onSwitchIn: function (target) {
				if (!this.effectData.positions[target.position]) {
					return;
				}
				if (!target.fainted) {
					this.boost({atk: 1, spa: 1}, target);
					//this.add('-boost', target, target.getHealth, '[from] move: Kamikaze Rebirth');
					this.effectData.positions[target.position] = false;
				}
				if (!this.effectData.positions.some(affected => affected === true)) {
					target.side.removeSideCondition('retirement');
				}
			},
		},
		boosts: {def: -1, spd: -1},
		secondary: false,
		target: "normal",
		type: "Electric",
	},
	// Kalalokki
	maelstrm: {
		accuracy: 85,
		basePower: 100,
		category: "Special",
		id: "maelstrm",
		name: "Maelström",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Surf", target);
			this.add('-anim', source, "Dark Void", target);
		},
		onHit: function (target, source) {
			target.addVolatile('maelstrm', source);
		},
		effect: {
			duration: 5,
			durationCallback: function (target, source) {
				if (source.hasItem('gripclaw')) return 8;
				return this.random(5, 7);
			},
			onStart: function () {
				this.add('message', 'It became trapped in an enormous maelström!');
			},
			onResidualOrder: 11,
			onResidual: function (pokemon) {
				if (this.effectData.source.hasItem('bindingband')) {
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
		secondary: false,
		target: "normal",
		type: "Water",
	},
	// kamikaze
	kamikazerebirth: {
		accuracy: 100,
		basePower: 0,
		category: "Physical",
		shortDesc: "Final Gambit + Healing Wish",
		id: "kamikazerebirth",
		isNonstandard: true,
		name: "Kamikaze Rebirth",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Final Gambit", source.side.foe.active);
			this.add('-anim', source, "Healing Wish", source);
		},
		onTryHit: function (pokemon, target, move) {
			if (!this.canSwitch(pokemon.side)) {
				return false;
			}
		},
		onHit: function (target, source) {
			target = target.side.foe.pokemon[0];
			target.damage(source.hp);
			this.add('-damage', target, target.getHealth);
			source.faint();
		},
		sideCondition: 'kamikazerebirth',
		effect: {
			duration: 2,
			onStart: function (side, source) {
				this.debug('Kamikaze Rebirth started on ' + side.name);
				this.effectData.positions = [];
				for (let i = 0; i < side.active.length; i++) {
					this.effectData.positions[i] = false;
				}
				this.effectData.positions[source.position] = true;
			},
			onRestart: function (side, source) {
				this.effectData.positions[source.position] = true;
			},
			onSwitchInPriority: 1,
			onSwitchIn: function (target) {
				if (!this.effectData.positions[target.position]) {
					return;
				}
				if (!target.fainted) {
					target.heal(target.maxhp);
					target.setStatus('');
					this.add('-heal', target, target.getHealth, '[from] move: Kamikaze Rebirth');
					this.effectData.positions[target.position] = false;
				}
				if (!this.effectData.positions.some(affected => affected === true)) {
					target.side.removeSideCondition('kamikazerebirth');
				}
			},
		},
		secondary: false,
		target: "self",
		type: "Flying",
	},
	// MochaMint
	caraccident: {
		accuracy: true,
		basepower: 0,
		category: "status",
		shortDesc: "Drops all foe's stats. Traps foe. Torments foe",
		id: "caraccident",
		isNonstandard: true,
		name: "Car Accident",
		pp: 5,
		priority: 1,
		selfdestruct: "ifHit",
		volatileStatus: 'torment',
		flags: {protect: 1, mirror: 1},
		onTryHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', target, "Double Edge", source);
			this.add('-anim', source, "Memento", target);
		},
		onHit: function (target, source, move) {
			if (!target.addVolatile('trapped', source, move, 'trapper')) {
				this.add('-fail', target);
			}
		},
		boosts: {
			atk: -1,
			def: -1,
			spa: -1,
			spd: -1,
			spe: -1,
			evasion: -1,
			accuracy: -1,
		},
		effect: {
			noCopy: true,
			onStart: function (pokemon) {
				this.add('-start', pokemon, 'Torment');
			},
			onEnd: function (pokemon) {
				this.add('-end', pokemon, 'Torment');
			},
			onDisableMove: function (pokemon) {
				if (pokemon.lastMove !== 'struggle') pokemon.disableMove(pokemon.lastMove);
			},
		},
		secondary: false,
		target: "normal",
		type: "Normal",
	},	
	// panpawn
	lafireblaze420: {
		accuracy: 75,
		basePower: 150,
		category: "Physical",
		shortDesc: "20% chance to burn the target.",
		id: "lafireblaze420",
		isNonstandard: true,
		name: "LaFireBlaze420",
		pp: 15,
		priority: 0,
		onTryHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fire Blast", target);
		},
		secondary: {
			chance: 20,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
	},
	// Scotteh
	geomagneticstorm: {
		accuracy: 100,
		basePower: 140,
		category: "Special",
		shortDesc: "No additional effect. Hits adjacent Pokemon.",
		id: "geomagneticstorm",
		isViable: true,
		isNonstandard: true,
		name: "Geomagnetic Storm",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Discharge", target);
		},
		secondary: false,
		target: "allAdjacent",
		type: "Electric",
	},
	// Teremiare
	batonthief: {
		accuracy: true,
		category: "Status",
		shortDesc: "Steals target's boosts and then Baton Passes them out.",
		id: "batonthief",
		isNonstandard: true,
		name: "Baton Thief",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		stealsBoosts: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Spectral Thief", target);
		},
		onAfterMoveSecondarySelf: function (source) {
			this.useMove('batonpass', source);
		},
		secondary: false,
		target: "normal",
		type: "Dark",
	},
	// Trickster, haven't completely tested this yet
	eventhorizon: {
		accuracy: 100,
		basePower: 0,
		pp: 10,
		priority: 0,
		category: "Special",
		shortDesc: "For 5 turns, negates all Ground immunities. More power the heavier the target.",
		id: "eventhorizon",
		isViable: true,
		isNonstandard: true,
		name: "Event Horizon",
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
		onTryHit: function (target, source, move) {
			this.attrLastMove(['still']);
			this.add('-anim', source, "Spacial Rend", target); // confirmed with Trickster
		},
		onHitField: function (target, source, effect) {
			this.addPseudoWeather('trickroom', source, effect, '[of] ' + source);
		},
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasAbility('persistent')) {
					return 7;
				}
				return 5;
			},
			onStart: function (target, source) {
				this.add('-fieldstart', 'move: Trick Room', '[of] ' + source);
			},
			// Speed modification is changed in Pokemon.getDecisionSpeed() in sim/pokemon.js
			onResidualOrder: 23,
			onEnd: function () {
				this.add('-fieldend', 'move: Trick Room');
			},
		},
		target: "normal",
		type: "Psychic",
	},
	// xfix
	glitzerpopping: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Picks a random move 2-5 times in one turn.",
		id: 'glitzerpopping',
		isNonstandard: true,
		name: "glitzer popping",
		pp: 3.14,
		noPPBoosts: true,
		priority: 0,
		flags: {},
		onHit: function (target, source, effect) {
			const moves = [];
			for (const i in exports.BattleMovedex) {
				const move = exports.BattleMovedex[i];
				if (i !== move.id) continue;
				// Calling 1 BP move is somewhat lame and disappointing. However,
				// signature Z moves are fine, as they actually have a base power.
				if (move.isZ && move.basePower === 1) continue;
				moves.push(move);
			}
			const randomMove = moves[this.random(moves.length)].id;
			this.useMove(randomMove, target);
		},
		onAfterMove: function (pokemon) {
			const moveData = pokemon.getMoveData('glitzerpopping');
			if (!moveData) return;
			// Lost 1 PP due to move usage, restore 0.9 PP to make it so that only 0.1 PP
			// would be used.
			moveData.pp = (Math.round(moveData.pp * 100) + 90) / 100;
		},
		multihit: [2, 5],
		secondary: false,
		target: "self",
		type: "???",
	},
};
