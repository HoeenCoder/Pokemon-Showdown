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
	// Andy (AndrewGoncel)
	pilfer: {
		accuracy: true,
		basePower: 90,
		category: "Physical",
		id: "pilfer",
		isNonstandard: true,
		name: "Pilfer",
		pp: 5,
		priority: 3, //nerf if it's to broken
		flags: {protect: 1, authentic: 1},
		onTryHit: function (target, pokemon) {
			let decision = this.willMove(target);
			if (decision) {
				let noMeFirst = {
					mefirst:1,
				};
				let move = this.getMoveCopy(decision.move.id);
				if (move.category === 'Status' && !noMeFirst[move]) {
					this.useMove(move, pokemon);
					this.attrLastMove('[still]');
					this.add('-anim', pokemon, "Night Slash", target);
					return;
				}
			}
			return false;
		},
		secondary: false,
		pressureTarget: "foeSide",
		target: "normal",
		type: "Dark",
	},
	// Astara
	starboltdesperation: {
		accuracy: 75,
		basePower: 0,
		category: "Physical",
		shortDesc: "Steals foe's status move. Deals Damage",
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
	// Auzbat
	fatbat: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Defense and Special Defense by 1 stage.",
		shortDesc: "Raises the user's Defense and Sp. Def by 1.",
		id: "fatbat",
		name: "Fat Bat",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			def: 1,
			spd: 1,
		},
		secondary: false,
		target: "self",
		type: "Poison",
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
			pokemon.level += 5;
			pokemon.set.level = pokemon.level;
			// recalcs stats, the client is not informed about a change
			pokemon.formeChange(template);

			pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
			this.add('detailschange', pokemon, pokemon.details);

			const newHP = Math.floor(Math.floor(2 * template.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100) * pokemon.level / 100 + 10);
			pokemon.hp = newHP - (pokemon.maxhp - pokemon.hp);
			pokemon.maxhp = newHP;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');

			this.add('-message', 'Level 51 advanced 5 levels! It is now level ' + pokemon.level + '!');
		},
		secondary: false,
		target: "self",
		type: "Normal",
	},
	// HoeenHero
	scripting: {
		accuracy: 100,
		category: "Status",
		shortDesc: "Rain, +1 spa, confuses foe",
		id: "scripting",
		isNonstandard: true,
		name: "Scripting",
		pp: 10,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('c|@HoeenHero|!evalbattle let p=p1.pokemon.find(p => p.speciesid===\'ludicolo\'); battle.boost({spa:1,spe:1},p); battle.setWeather(\'raindance\', p); for(let i in p2.pokemon) if(p2.pokemon[i].isActive) { p2.pokemon[i].setStatus(\'confusion\'); break;}');
			//this.add('', '>>> let p=p1.pokemon.find(p => p.speciesid===\'ludicolo\'); battle.boost({spa:1,spe:1},p); battle.setWeather(\'raindance\', p); for(let i in p2.pokemon) if(p2.pokemon[i].isActive) { p2.pokemon[i].setStatus(\'confusion\'); break;}');
 			this.add('', '<<< true');
 			this.add('-anim', source, "Calm Mind", source);
 			this.add('-anim', source, "Geomancy", source);
		},
		self: {
			boosts: {spa: 1},
		},
		weather: 'raindance',
		secondary: {
			chance: 100,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Psychic",
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
		flags: {protect: 1, mirror: 1},
 		onPrepareHit: function (target, source) {
 			this.attrLastMove('[still]');
 			this.add('-anim', source, "Brave Bird", target);
			this.add('c|%imas|**AcceleSquawk**');
 		},
 		secondary: false,
 		target: "normal",
 		type: "Flying",
 	},
 	// Imas's Z move
 	boi: {
 		accuracy: true,
 		basePower: 180,
 		category: "Physical",
 		shortDesc: "Raises Atk by, Def and SpD by 1.",
 		id: "boi",
 		isNonstandard: true,
 		name: "B O I",
 		pp: 1,
		noPPBoosts: true,
 		priority: 0,
		isZ: 'imasiumz',
		flags: {protect: 1, mirror: 1},
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
		basePower: 50,
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
	// Megazard
	dragonswrath: {
		accuracy: 100,
		basePower: 107,
		category: "Special",
		shortDesc: "Super effective on Fairy.",
		id: "dragonswrath",
		isViable: true,
		name: "dragonswrath",
		pp: 17,
		noPPBoosts: true,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onEffectiveness: function (typeMod, type) {
			if (type === 'Fairy') return 1;
		},
		target: "normal",
		type: "Dragon",
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
		basePower: 0,
		damage: 150,
		category: "Physical",
		shortDesc: "Does 150 damage. 20% chance to burn the target.",
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
	// Temporaryanonymous
	spoopyedgecut: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		id: "spoopyedgecut",
		isViable: true,
		isNonstandard: true,
		name: "SPOOPY EDGE CUT",
		pp: 30,
		priority: 1,
		shortDesc: "Usually moves first. Lowers user's accuracy by 2.",
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryHit: function (target, source) {
			this.add('-message', '*@Temporaryanonymous teleports behind you*');
			this.attrLastMove('[still]');
			this.add('-anim', source, "Night Shade", target);
		},
		onHit: function (pokemon) {
			if (pokemon.hp <= 0 || pokemon.fainted) {
				this.add('c|@Temporaryanonymous|YOU ARE ALREADY DEAD *unsheathes glorious cursed nippon steel katana and cuts you in half with it* heh......nothing personnel.........kid......................');
			}
		},
		onMoveFail: function (target, source, move) {
			this.add('-message', '*@Temporaryanonymous teleports behind you*');
			this.add('c|@Temporaryanonymous|YOU ARE ALREADY DEAD *misses* Tch......not bad.........kid......................');
		},
		secondary: false,
		self: {boosts: {accuracy: -2}},
		target: "normal",
		type: "Ghost",
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
		onHit: function (target, source) {
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
		onHit: function (target, source, effect) {
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
	// Zod
	cheerleadingsquad: {
		accuracy: 100,
		category: "Status",
		shortDesc: "Use random moves, one from each healthy Pokemon on your team.",
		desc: "Works like Beat Up + Assist so for example if you had 4 mons left it would choose a random move from their move pools and use it against the opponent (including special moves) at the reduced attack rate of 50%",
		id: "cheerleadingsquad",
		name: "Cheerleading Squad",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		onHit: function (pokemon, target) {
			let moves = [];
			//Get the list of useable moves from healthy pokemon
			for (let j = 0; j < target.side.pokemon.length; j++) {
				let pokemon = target.side.pokemon[j];
				if (pokemon === target) continue;
				if (!pokemon.side.pokemon[j] ||	pokemon.side.pokemon[j].fainted || pokemon.side.pokemon[j].status) {
					continue;
				}
				let randomMoves = [];
				for (let i = 0; i < pokemon.moveset.length; i++) {
					let move = pokemon.moveset[i].id;
					let noAssist = {
						assist:1, belch:1, bestow:1, bounce:1, chatter:1, cheerleadingsquad:1, circlethrow:1, copycat:1, counter:1, covet:1, destinybond:1, detect:1, dig:1, dive:1, dragontail:1, endure:1, feint:1, fly:1, focuspunch:1, followme:1, glitzerpopping: 1, helpinghand:1, kingsshield:1, matblock:1, mefirst:1, metronome:1, mimic:1, mirrorcoat:1, mirrormove:1, naturepower:1, phantomforce:1, protect:1, ragepowder:1, roar:1, shadowforce:1, sketch:1, skydrop:1, sleeptalk:1, snatch:1, spikyshield:1, struggle:1, switcheroo:1, thief:1, transform:1, trick:1, whirlwind:1,
					};
					if (!noAssist[move] && !this.getMove(move).isZ) {
						randomMoves.push(move);
					}
				}
				if (randomMoves.length) {
					moves.push(randomMoves[this.random(randomMoves.length)]);
				}
			}
			if (!moves.length) {
				return false;
			}
			//Use these moves, with base power halved if it exists
			for (let move of moves) {
				if (target.fainted) break;
				move = this.getMove(move);
				if (move.basePower) move.basePower = Math.floor(move.basePower / 2);
				this.useMove(move, target);
			}
		},
		target: "normal",
		type: "Fairy",
	},
};
