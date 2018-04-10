'use strict';

exports.BattleMovedex = {
	// Acast
	arrowdance: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		shortDesc: "Raises user's attack by 1.",
		id: "arrowdance",
		isNonstandard: true,
		name: "Arrow Dance",
		pp: 5,
		priority: 0,
		flags: {protect: 1, dance: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Dance', source);
			this.add('-anim', source, 'Thousand Arrows', target);
		},
		self: {
			boosts: {atk: 1},
		},
		target: "normal",
		type: "Grass",
	},
	// Aelita
	energyfield: {
		accuracy: 90,
		basePower: 150,
		category: "Special",
		shortDesc: "Lowers user's Defense, Sp. Def, and Speed by 1. Cant miss in rain.",
		id: "energyfield",
		isNonstandard: true,
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
		self: {boosts: {spa: -1, spd: -1, spe: -1}},
		secondary: {
			chance: 40,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
	},
	// Akir
	allergy: {
		accuracy: 100,
		category: "Status",
		shortDesc: "Causes target to fall asleep, boosts all stats.",
		id: "allergy",
		isNonstandard: true,
		isViable: true,
		name: "Allergy",
		pp: 5,
		priority: 1,
		flags: {powder: 1, protect: 1, mirror: 1, snatch: 1, reflectable: 1},
		status: 'slp',
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
 			this.add('-anim', source, "Spore", target);
		},
		onHit: function (target, source) {
			this.boost({def: 1, spd: 1, atk: 1, spa: 1, spe: 1}, source, source, '[from] move: Allergy');
			this.add('c|%Akir|A Parasect is giving you trouble? Seriously?');
		},
		target: "normal",
		type: "Grass",
	},
	// Andy (AndrewGoncel)
	pilfer: {
		accuracy: true,
		basePower: 70,
		category: "Physical",
		shortDesc: "User steals certain support moves to use itself.",
		id: "pilfer",
		isNonstandard: true,
		name: "Pilfer",
		pp: 5,
		priority: 3,
		flags: {protect: 1, authentic: 1, mirror: 1},
		onTryHit: function (target, pokemon) {
			let decision = this.willMove(target);
			if (decision) {
				let noMeFirst = {
					mefirst: 1,
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
	// antemortem
	postmortem: {
		acc: 85,
		basePower: 110,
		category: "Special",
		shortDesc: "10% boost Spa, Spe.",
		id: "postmortem",
		isNonstandard: true,
		name: "Postmortem",
		pp: 10,
		noPPBoosts: true,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', target, 'Moonblast', source);
		},
		secondary: {
			chance: 10,
			self: {
				boosts: {
					spa: 1,
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Fairy",
	},
	// Articblast
	trashalance: {
		accuracy: 100,
		basePower: 20,
		basePowerCallBack: function (pokemon, target, move) {
			if (!move.boostCount) move.boostCount = 0;
			++move.boostCount;
			if (move.boostCount >= 4) move.boostCount = 4;
			if (move.boostCount) {
				return 20 + (move.boostCount * 40);
			}
		},
		category: "Physical",
		shortDesc: "Gains 40 BP every time the move is used.",
		desc: "Gains 40 BP every time this attack is used. Maxes at 180",
		id: "trashalance",
		isNonstandard: true,
		name: "Trashalanche",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: false,
		target: "normal",
		type: "Poison",
	},
	// ascriptmaster
	voltechburst: {
		accuracy: true,
		basePower: 100,
		category: "Special",
		shortDesc: "Always hits, ignores foes ability.",
		id: "voltechburst",
		isNonstandard: true,
		name: "Voltech Burst",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Shock Wave', target);
		},
		ignoreAbility: true,
		secondary: false,
		target: "normal",
		type: "Electric",
	},
	// Astara
	starboltdesperation: {
		accuracy: 75,
		basePower: 0,
		category: "Physical",
		shortDesc: "",
		id: "starboltdesperation",
		isNonstandard: true,
		name: 'Star Bolt Desperation',
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		typechart: [
			'Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting',
			'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice',
			'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water',
		],
		damageCallback: function (pokemon, target) {
			return target.hp * 0.5;
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
	// atomicllamas
	bitchycomment: {
		basePower: 100,
		accuracy: 100,
		category: "Special",
		desc: '50% chance to inflict burn.',
		shortDesc: '50% chance to burn.',
		name: 'Bitchy Comment',
		id: 'bitchycomment',
		flags: {protect: 1, mirror: 1, sound: 1},
		secondary: {
			chance: 50,
			status: 'brn',
		},
		pp: 5,
		target: "normal",
		type: "Psychic",
	},
	// Auzbat
	fatbat: {
		accuracy: true,
		category: "Status",
		desc: "Raises the user's Defense and Special Defense by 1 stage.",
		shortDesc: "Raises the user's Defense and Sp. Def by 1.",
		id: "fatbat",
		name: "Fat Bat",
		pp: 20,
		priority: 1,
		flags: {snatch: 1, mirror: 1},
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
	// cant say
	bladeofaesthetics: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		shortDesc: "Sets Grassy Terrain",
		id: "bladeofaesthetics",
		name: "blade of ~aesthetics~",
		isNonstandard: true,
		pp: 10,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sacred Sword", target);
			this.add('-anim', source, "Bloom Doom", target);
		},
		onHit: function (target, source) {
			this.setTerrain('grassyterrain', source);
		},
		flags: {protect: 1, mirror: 1, contact: 1},
		secondary: false,
		target: "normal",
		type: "Steel",
	},
	// Cerberax
	blimpcrash: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		id: "blimpcrash",
		isNonstandard: true,
		isViable: true,
		name: "Blimp Crash",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, nonsky: 1},
		volatileStatus: 'smackdown',
		recoil: [1, 2],
 		onPrepareHit: function (target, source) {
 			this.attrLastMove('[still]');
 			this.add('-anim', source, "Head Smash", target);
 		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Flying",
	},
	// Chloe
	addedpreservatives: {
		accuracy: 100,
		category: "Status",
		shortDesc: "Reflect + Light Screen + Safeguard + Memento; User faints.",
		id: "addedpreservatives",
		isNonstandard: true,
		name: "Added Preservatives",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Calm Mind", source);
			this.add('-anim', source, "Final Gambit", target);
		},
		onHit: function (target, source) {
			this.boost({atk: -2, spa: -2}, source.side.foe.active[0]);
			source.side.addSideCondition('Reflect', source);
			source.side.addSideCondition('Light Screen', source);
			source.side.addSideCondition('Safeguard', source);
		},
		selfdestruct: "ifHit",
		secondary: false,
		target: "self",
		type: "Normal",
	},
	// Ciran
	burnturn: {
		shortDesc: "User switches out after damaging and burning the target.",
		id: "burnturn",
		isViable: true,
		name: "bUrn-turn",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		selfSwitch: true,
		secondary: {
			chance: 100,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
	},
	// Duck
	holyduck: {
		accuracy: 100,
		basePower: 95,
		category: "Special",
		shortDesc: "Breaks screens.",
		id: "holyduck",
		isNonstandard: true,
		name: "Holy Duck!",
		pp: 20,
		priority: 2,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "False Swipe", target);
		},
		onTryHit: function (pokemon) {
			// will shatter screens through sub, before you hit
			if (pokemon.runImmunity('Normal')) {
				pokemon.side.removeSideCondition('reflect');
				pokemon.side.removeSideCondition('lightscreen');
				pokemon.side.removeSideCondition('auroraveil');
			}
		},
		secondary: false,
		target: "normal",
		type: "Normal",
	},
	// EV
	darkaggro: {
		accuracy: 100,
		basePower: 20,
		basePowerCallback: function (pokemon, target, move) {
			return move.basePower + 20 * pokemon.positiveBoosts();
		},
		category: "Physical",
		shortDesc: "Steals boosts, does damage. +20 power per boost.",
		id: "darkaggro",
		isNonstandard: true,
		name: "Dark Aggro",
		pp: 10,
		priority: -1,
		flags: {contact: 1, protect: 1, mirror: 1},
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
	// feliburn
	"clangoroussoulblaze": {
		num: 728,
		accuracy: true,
		basePower: 185,
		category: "Physical",
		desc: "Raises the user's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage.",
		shortDesc: "Raises the user's Atk/Def/SpAtk/SpDef/Spe by 1.",
		id: "clangoroussoulblaze",
		name: "Clangorous Soulblaze",
		noPPBoosts: true,
		pp: 1,
		priority: 0,
		flags: {sound: 1, authentic: 1},
		selfBoost: {
			boosts: {
				atk: 1,
				def: 1,
				spa: 1,
				spd: 1,
				spe: 1,
			},
		},
		secondary: false,
		target: "allAdjacentFoes",
		type: "Dragon",
		contestType: "Cool",
	},
	// grimAuxiliatrix
	chachaslide: {
		accuracy: 100,
		category: "Status",
		shortDesc: "Heal 1/3, Move hazards to foe's side",
		id: "chachaslide",
		isNonstandard: true,
		name: "Cha Cha Slide",
		pp: 10,
		flags: {mirror: 1, protect: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Double Team', source);
		},
		onHit: function (source) {
			for (let hazard in source.side.sideConditions) {
				if (source.side.sideConditions[hazard].layers) {
					for (let i = source.side.sideConditions[hazard].layers; i > 0; i--) source.side.foe.addSideCondition(hazard);
				} else {
					source.side.foe.addSideCondition(hazard);
				}
				source.side.removeSideCondition(hazard);
				this.add('-sideend', source.side, this.getEffect(hazard).name, '[from] move: Cha Cha Slide', '[of] ' + source);
			}
		},
		heal: [1, 3],
		target: "self",
		type: "Steel",
	},
	// HeaLnDeaL
	petrifychomp: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "User recovers 75% of the damage dealt.",
		id: "petrifychomp",
		isViable: true,
		name: "Petrify Chomp",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, heal: 1},
		drain: [3, 4],
		secondary: false,
		target: "normal",
		type: "Rock",
	},
	// Hippopotas
	beannoying: {
		accuracy: 100,
		category: "Status",
		pp: 20,
		shortDesc: "Sets 2 random hazards + roars.",
		id: "beannoying",
		name: "Be Annoying",
		flags: {reflectable: 1, mirror: 1, sound: 1, authentic: 1, mystery: 1},
		onHit: function (target, source) {
			let hazards = ['stealthrock', 'spikes', 'toxicspikes', 'stickyweb'];
			let hazard1 = hazards[this.random(4)];
			hazards.splice(hazards.indexOf(hazard1), 1);
			let hazard2 = hazards[this.random(3)];
			this.useMove(hazard1, source);
			this.useMove(hazard2, source);
			this.useMove("roar", source);
		},
		priority: -1,
		secondary: false,
		target: "normal",
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
		basePower: 70,
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
	// Imas's Z move
	boi: {
		accuracy: true,
		basePower: 180,
		category: "Physical",
		shortDesc: "Raises Atk by 1.",
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
			this.boost({atk: 1}, source);
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
		shortDesc: "User faints. lol.",
		id: "ragequit",
		isNonstandard: true,
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
	// Iyarito
	iyasrage: {
		accuracy: 100,
		basePower: 110,
		category: "Special",
		shortDesc: "Ignores Spd boosts.",
		id: "iyasrage",
		isNonstandard: true,
		name: "Iya's Rage",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Shadow Ball", target);
		},
		onFoeModifyBoost: function (boosts) {
			boosts['spd'] = 0;
		},
		secondary: false,
		target: "normal",
		type: "Ghost",
	},
	// Jasmine
	reversetransform: {
		accuracy: true,
		category: "Status",
		shortDesc: "Foe transforms into user.",
		id: "reversetransform",
		isNonstandard: true,
		name: "Reverse Transform",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {protect: 1, mirror: 1, authentic: 1},
		onHit: function (target, source) {
			if (!target.transformInto(source, target)) {
				return false;
			}
			target.canMegaEvo = false;
		},
		target: "normal",
		type: "Normal",
	},
	// Joim
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
		shortDesc: "Traps and damages the target for 5-7 turns.",
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
		shortDesc: "Final Gambit + Healing Wish.",
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
	// Level 51
	nextlevelstrats: {
		accuracy: true,
		category: "Status",
		shortDesc: "User gains 5 levels.",
		id: "nextlevelstrats",
		isNonstandard: true,
		name: "Next Level Strats",
		noPPBoosts: true,
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
	// LifeisDANK
	peentpeent: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		id: "peentpeent",
		isNonstandard: true,
		name: "Peent Peent",
		flags: {protect: 1, mirror: 1, sound: 1},
		pp: 5,
		priority: 0,
		secondary: {
			boosts: {
				spa: -1,
				spe: -1,
			},
		},
		target: "normal",
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
		shortDesc: "Drops all foe's stats, Traps foe, Torments foe.",
		id: "caraccident",
		isNonstandard: true,
		name: "Car Accident",
		pp: 5,
		priority: 1,
		selfdestruct: "ifHit",
		volatileStatus: 'torment',
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source, move) {
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
	// NOVED
	forthekids: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		shortDesc: "10% to paralyze, 10% to flinch, lowers own def, spd by 1.",
		id: "forthekids",
		isNonstandard: true,
		name: "For The Kids",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, nonsky: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Seismic Toss", target);
			this.add('-anim', source, "Seismic Toss", target);
		},
		secondaries: [
			{
				chance: 10,
				volatileStatus: 'flinch',
			},
			{
				chance: 10,
				volatileStatus: 'par',
			},
		],
		target: "normal",
		type: "Fighting",
	},
	// nv
	anappleaday: {
		accuracy: true,
		category: "Status",
		shortDesc: "Raises atk, def and spe by 1",
		id: "anappleaday",
		isNonstandard: true,
		name: "An Apple A Day",
		pp: 15,
		priority: 0,
		flags: {snatch: 1, mirror: 1},
		boosts: {
			atk: 1,
			def: 1,
			spe: 1,
		},
		target: "self",
		type: "Normal",
	},
	// panpawn
	lafireblaze420: {
		accuracy: 80,
		basePower: 0,
		damage: 150,
		category: "Physical",
		shortDesc: "Does 150 damage. 20% chance to burn the target.",
		id: "lafireblaze420",
		isNonstandard: true,
		name: "LaFireBlaze420",
		pp: 15,
		priority: 0,
		onPrepareHit: function (target, source, move) {
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
	// Paradise
	dizzyrock: {
		accuracy: true,
		category: "Status",
		shortDesc: "Hurts foes on switch-in. Factors Rock weakness. Confuses foe",
		id: "dizzyrock",
		isViable: true,
		name: "Dizzy Rock",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		sideCondition: 'dizzyrock',
		effect: {
			// this is a side condition
			onStart: function (side) {
				this.add('-sidestart', side, 'move: Dizzy Rock');
			},
			onSwitchIn: function (pokemon) {
				let typeMod = this.clampIntRange(pokemon.runEffectiveness('Rock'), -6, 6);
				pokemon.addVolatile('confusion');
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
		secondary: false,
		target: "foeSide",
		type: "Rock",
	},
	// Raseri
	hey: {
		accuracy: true,
		category: "Status",
		shortDesc: "Heals 50%, user gains Ground type.",
		id: "hey",
		isNonstandard: true,
		isViable: true,
		name: "hey",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		onPrepareHit: function (target, source) {
			if (source.hasType('Ground')) return false;
			if (!source.addType('Ground')) return false;
			this.add('-start', source, 'typeadd', 'Ground', '[from] move: hey');
		},
		target: "self",
		type: "Normal",
	},
	// Scotteh
	geomagneticstorm: {
		accuracy: 100,
		basePower: 140,
		category: "Special",
		shortDesc: "Hits adjacent Pokemon.",
		id: "geomagneticstorm",
		isViable: true,
		isNonstandard: true,
		name: "Geomagnetic Storm",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Discharge", target);
		},
		secondary: false,
		target: "allAdjacent",
		type: "Electric",
	},
	// Scyther NO Swiping
	"3strikeswipe": {
		accuracy: true,
		basePower: 40,
		category: "Physical",
		shortDesc: "Hits 1-3 times with inverse type chart. High crit.",
		id: "3strikeswipe",
		isNonstandard: true,
		name: "3 Strike Swipe",
		pp: 10,
		priority: 0,
		critRatio: 2,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBeforeMove: function (source, target, move) {
			move.hits = 0;
		},
		onTryHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "X-Scissor", target);
			move.hits++;
		},
		onAfterMoveSecondarySelf: function (source, target, move) {
			if (move.hits && move.hits === 3 && toId(source.name) === 'scythernoswiping') {
				this.add('c|@Scyther NO Swiping|Oh baby a triple!!!');
			}
		},
		onEffectiveness: function (typeMod) {
			return -typeMod;
		},
		multihit: [1, 3],
		hits: 0,
		target: "normal",
		type: "Bug",
	},
	// sirDonovan
	ladiesfirst: {
		accuracy: 100,
		basePower: 80,
		category: 'Special',
		shortDesc: 'Move second if foe is female, +1 speed.',
		id: 'ladiesfirst',
		isNonstandard: true,
		isViable: true,
		name: 'Ladies First',
		pp: 20,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sing", target);
		},
		beforeTurnCallback: function (pokemon, target) {
			let decision = this.willMove(pokemon);
			if (target.gender === 'F' && decision) {
				this.cancelMove(pokemon);
				for (let i = this.queue.length - 1; i >= 0; i--) {
					if (this.queue[i].choice === 'residual') {
						this.queue.splice(i, 0, decision);
						break;
					}
				}
				this.add('-activate', pokemon, 'move: Ladies First');
			}
		},
		self: {boosts: {spe: 1}},
		secondary: {
			chance: 60,
			onHit: function (target, source) {
				let result = this.random(4);
				if (result === 0) {
					target.trySetStatus('brn', source);
				} else if (result === 1) {
					target.trySetStatus('par', source);
				} else if (result === 2) {
					target.trySetStatus('frz', source);
				} else {
					target.trySetStatus('slp', source);
				}
			},
		},
		target: 'normal',
		type: 'Fairy',
	},
	// SpaceBass
	armyofmushrooms: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Boosts def, spd before attack.",
		id: "armyofmushrooms",
		isNonstandard: true,
		name: "Army of Mushrooms",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, protect: 1},
		beforeTurnCallback: function (pokemon) {
			this.boost({def: 1, spd: 1}, pokemon, pokemon, 'mushroom army');
		},
		onHit: function (pokemon) {
			this.useMove("sleeppowder", pokemon);
			this.useMove("leechseed", pokemon);
			this.useMove("powder", pokemon);
		},
		secondary: false,
		target: "self",
		type: "Grass",
	},
	// Team Pokepals
	finalkamehameha: {
		accuracy: 100,
		basePower: 200,
		category: "Special",
		id: "finalkamehameha",
		isNonstandard: true,
		name: "FINAL KAMEHAMEHA",
		pp: 5,
		flags: {protect: 1, mirror: 1},
		shortDesc: "Boosts spa by 2 before attack, has 1 hp left and spa goes down by 2 after",
		beforeTurnCallback: function (pokemon) {
			this.boost({spa: 2}, pokemon, pokemon, 'FINAL KAMEHAMEHA');
		},

		onHit: function (target, source) {
			this.damage(source.hp - 1, source, source, 'finalkamehameha');
		},
		priority: 0,
		secondary: false,
		self: {
			boosts: {
				spa: -2,
			},
		},
		target: "normal",
		type: "Fighting",
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
	// The Immortal
	sleepwalk: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "sleepwalk",
		isNonstandard: true,
		isViable: true,
		name: "Sleep Walk",
		pp: 10,
		priority: 0,
		flags: {},
		sleepUsable: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Healing Wish", target);
		},
		onHit: function (pokemon, source) {
			if (pokemon.status !== 'slp') {
				if (pokemon.hp >= pokemon.maxhp) return false;
				if (!pokemon.setStatus('slp')) return false;
				pokemon.statusData.time = 3;
				pokemon.statusData.startTime = 3;
				this.heal(pokemon.maxhp);
				this.add('-status', pokemon, 'slp', '[from] move: Rest');
			}
			let moves = [];
			for (let i = 0; i < pokemon.moveSlots.length; i++) {
				let move = pokemon.moveSlots[i].id;
				if (move && move !== 'sleepwalk') moves.push(move);
			}
			let move = '';
			if (moves.length) move = moves[this.random(moves.length)];
			if (!move) return false;
			this.useMove(move, pokemon);
			if (!pokemon.informed && source.name === 'The Immortal') {
				this.add('c|~The Immortal|I don\'t really sleep walk...');
				pokemon.informed = true;
			}
		},
		secondary: false,
		target: "self",
		type: "Normal",
	},
	// Tiksi
	devolutionwave: {
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		shortDesc: "Hits 5 times, random effect after each hit.",
		id: "devolutionwave",
		name: "Devolution Wave",
		isNonstandard: true,
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sludge Wave", target);
			this.add('-anim', source, "Rock Slide", target);
		},
		multihit: 5,
		onAfterHit: function (target, source, move) {
			if (!move.curHits) move.curHits = 1;
			let option = this.random(2);
			switch (move.curHits) {
			case 1:
				if (option) {
					this.boost({spe: -1}, target, source);
				} else {
					this.boost({def: -1}, target, source);
				}
				break;
			case 2:
				if (option) {
					target.trySetStatus('tox', source);
				} else {
					if (target.hasType('Grass')) {
						this.add('', target.name + ' would be seeded but is immune.');
					} else {
						target.addVolatile('leechseed', source);
					}
				}
				break;
			case 3:
				if (option) {
					this.setTerrain('electricterrain', source);
				} else {
					this.setTerrain('psychicterrain', source);
				}
				break;
			case 4:
				if (option) {
					this.boost({spd: 1}, source, source);
				} else {
					this.useMove('skillswap', source, target);
				}
				break;
			case 5:
				if (option) {
					target.side.addSideCondition('stealthrock');
				} else {
					target.side.addSideCondition('stickyweb');
				}
				break;
			}
			move.curHits++;
		},
		secondary: false,
		target: "normal",
		type: "Rock",
	},
	// Trickster
	eventhorizon: {
		accuracy: 100,
		basePower: 0,
		category: "Special",
		shortDesc: "More power the heavier the target. Sets Trick Room.",
		id: "eventhorizon",
		isNonstandard: true,
		name: "Event Horizon",
		pp: 10,
		priority: 0,
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
			this.add('-anim', source, "Spacial Rend", target);
		},
		onHit: function (target, source, effect) {
			this.addPseudoWeather('trickroom', source, effect, '[of] ' + source);
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
	// Yuki
	cutieescape: {
		accuracy: true,
		category: "Status",
		pp: 10,
		id: "cutieescape",
		isNonstandard: true,
		name: "Cutie Escape",
		onHit: function (target, pokemon, move) {
			if (target.lastDamage > 0 && pokemon.lastAttackedBy && pokemon.lastAttackedBy.thisTurn && pokemon.lastAttackedBy.pokemon === target) {
				target.addVolatile('attract');
				target.addVolatile('trapped');
			}
		},
		effect: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart: function (pokemon, source, effect) {
				if (!this.runEvent('Attract', pokemon, source)) {
					this.debug('Attract event failed');
					return false;
				}
				this.add('-start', pokemon, 'Attract');
			},
			onUpdate: function (pokemon) {
				if (this.effectData.source && !this.effectData.source.isActive && pokemon.volatiles['attract']) {
					this.debug('Removing Attract volatile on ' + pokemon);
					pokemon.removeVolatile('attract');
				}
			},
			onBeforeMovePriority: 2,
			onBeforeMove: function (pokemon, target, move) {
				this.add('-activate', pokemon, 'move: Attract', '[of] ' + this.effectData.source);
				if (this.random(2) === 0) {
					this.add('cant', pokemon, 'Attract');
					return false;
				}
			},
			onEnd: function (pokemon) {
				this.add('-end', pokemon, 'Attract', '[silent]');
			},
		},
		priority: -1,
		selfSwitch: true,
		secondary: false,
		zMoveEffect: 'heal',
		target: "normal",
		type: "Fairy",
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
						assist: 1, belch: 1, bestow: 1, bounce: 1, chatter: 1, cheerleadingsquad: 1, circlethrow: 1, copycat: 1, counter: 1, covet: 1, destinybond: 1, detect: 1, dig: 1, dive: 1, dragontail: 1, endure: 1, feint: 1, fly: 1, focuspunch: 1, followme: 1, glitzerpopping: 1, helpinghand: 1, kingsshield: 1, matblock: 1, mefirst: 1, metronome: 1, mimic: 1, mirrorcoat: 1, mirrormove: 1, naturepower: 1, phantomforce: 1, protect: 1, ragepowder: 1, roar: 1, shadowforce: 1, sketch: 1, skydrop: 1, sleeptalk: 1, snatch: 1, spikyshield: 1, struggle: 1, switcheroo: 1, thief: 1, transform: 1, trick: 1, whirlwind: 1,
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
