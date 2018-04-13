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
		zMovePower: 120,
	},
	// Aelita
	energyfield: {
		accuracy: 90,
		basePower: 150,
		category: "Special",
		shortDesc: "Lowers user's Defense, Sp. Def, and Speed by 1. Can't miss in rain.",
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
		zMovePower: 200,
	},
	// Akir
	allergy: {
		accuracy: 100,
		category: "Status",
		desc: "Causes the target to fall asleep. If this effect is successful, the user's Attack, Defense, and Special Defense are raised by one stage.",
		shortDesc: "Puts the target to sleep; raises the user's Atk/Def/SpD by 1 on hit.",
		id: "allergy",
		isNonstandard: true,
		name: "Allergy",
		pp: 5,
		priority: 0,
		flags: {powder: 1, protect: 1, reflectable: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Spore', target);
		},
		onHit: function (target, source, move) {
			if (target.trySetStatus('slp', target, move)) return this.boost({atk: 1, def: 1, spd: 1}, source);
			return false;
		},
		target: "normal",
		type: "Grass",
		zMoveEffect: 'clearnegativeboost',
	},
	// Amingo
	cactusale: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Attack by 2 stages and accuracy by 1 stage.",
		shortDesc: "Raises the user's Attack by 2 and accuracy by 1.",
		id: "cactusale",
		isNonstandard: true,
		name: "Cactus Ale",
		pp: 15,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			atk: 2,
			accuracy: 1,
		},
		secondary: false,
		target: "self",
		type: "Grass",
		zMoveEffect: 'clearnegativeboost',
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
		zMovePower: 140,
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
		flags: {contact: 1, protect: 1, mirror: 1},
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
		zMovePower: 185,
	},
	// Arrested
	jailshell: {
		accuracy: 100,
		basePower: 90,
		category: "Special", // Probably? Arrested didn't say either way
		desc: "The user prevents all of its foes from using any moves that the user also knows as long as the user remains active. 100% chance to trap and paralyze the foe.",
		shortDesc: "100% chance to trap, paralyze, imprison.",
		id: 'jailshell',
		isNonstandard: true,
		name: 'Jail Shell',
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1}, // Yes, it's contact
		volatileStatus: 'imprison',
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', target, 'Anchor Shot', source);
		},
		secondary: {
			chance: 100,
			status: 'par',
			onHit: function (target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "normal",
		type: "Normal",
		zMovePower: 175,
	},
	// Articblast
	trashalanche: {
		accuracy: 100,
		basePower: 20,
		basePowerCallback: function (pokemon, target, move) {
			if (!pokemon.volatiles.trashalanche) {
				pokemon.addVolatile('trashalanche');
			}
			return pokemon.volatiles.trashalanche.basePower;
		},
		category: "Physical",
		shortDesc: "Gains 40 BP every time the move is used.",
		desc: "Gains 40 BP every time this attack is used. Maxes at 180",
		id: "trashalanche",
		isNonstandard: true,
		name: "Trashalanche",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit: function (target, source) {
			source.addVolatile('trashalanche');
		},
		effect: {
			onStart: function () {
				this.effectData.basePower = 20;
			},
			onRestart: function () {
				if (this.effectData.basePower < 180) {
					this.effectData.basePower += 40;
				}
			},
		},
		secondary: false,
		target: "normal",
		type: "Poison",
		zMovePower: 100,
	},
	// Articuno
	legendaryfrost: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the weather becomes Legendary Frost. At the end of each turn except the last, all active Pokemon lose 1/16 of their maximum HP, rounded down, unless they are an Ice type, or have the Abilities Ice Body, Magic Guard, Overcoat, or Snow Cloak. Fails if the current weather is Legendary Frost.",
		shortDesc: "For 5 turns, hail, fire moves fail.",
		id: "legendaryfrost",
		isNonstandard: true,
		name: "Legendary Frost",
		pp: 10,
		priority: 0,
		flags: {},
		weather: 'legendaryfrost',
		secondary: false,
		target: "all",
		type: "Ice",
		zMoveBoost: {spe: 1},
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
		zMovePower: 180,
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
		recoil: [33, 100],
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
		zMovePower: 100,
	},
	// Astyanax
	calluponthetympoles: {
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		desc: "100% chance to badly poison the target. Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Ability Skill Link, this move will always hit five times. Sets one layer of Toxic Spikes on use.",
		shortDesc: "100% chance to badly poison; lays Toxic Spikes; hits 2-5 times.",
		id: "calluponthetympoles",
		isNonstandard: true,
		name: "Call Upon the Tympoles!",
		pp: 20,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		multihit: [2, 5],
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Barrage', target);
		},
		onAfterMove: function (pokemon, target, move) {
			target.side.addSideCondition('toxicspikes', pokemon, move);
		},
		secondary: {
			chance: 100,
			status: 'tox',
		},
		target: "normal",
		type: "Poison",
		zMovePower: 140,
	},
	// atomicllamas
	bitchycomment: {
		basePower: 100,
		accuracy: 100,
		category: "Special",
		desc: '50% chance to inflict burn.',
		shortDesc: '50% chance to burn.',
		name: 'Bitchy Comment',
		isNonstandard: true,
		id: 'bitchycomment',
		flags: {protect: 1, mirror: 1, sound: 1},
		secondary: {
			chance: 50,
			status: 'brn',
		},
		pp: 5,
		target: "normal",
		type: "Psychic",
		zMovePower: 180,
	},
	// Auzbat
	fatbat: {
		accuracy: true,
		category: "Status",
		desc: "Raises the user's Defense and Special Defense by 1 stage.",
		shortDesc: "Raises the user's Defense and Sp. Def by 1.",
		id: "fatbat",
		isNonstandard: true,
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
		zMoveBoost: {spd: 1},
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
		zMovePower: 180,
	},
	// biggie
	foodrush: {
		accuracy: 90,
		basePower: 100,
		category: "Physical",
		desc: "If both the user and the target have not fainted, the target is forced to switch out and be replaced with a random unfainted ally. This effect fails if the target used Ingrain previously, has the Ability Suction Cups, or this move hit a substitute.",
		shortDesc: "Forces the target to switch to a random ally.",
		id: "foodrush",
		isNonstandard: true,
		name: "Food Rush",
		pp: 10,
		priority: -6,
		flags: {contact: 1, protect: 1, mirror: 1},
		forceSwitch: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Tail', target);
		},
		target: "normal",
		type: "Normal",
		zMovePower: 180,
	},
	// Bondie
	sproutpowder: {
		accuracy: 100,
		category: "Status",
		desc: "Causes the target to fall asleep, and sets Grassy Terrain.",
		shortDesc: "Puts the target to sleep; sets grassy terrain.",
		id: "sproutpowder",
		isNonstandard: true,
		name: "Sprout Powder",
		pp: 10,
		priority: 0,
		flags: {powder: 1, protect: 1, reflectable: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Sleep Powder', target);
		},
		status: 'slp',
		terrain: 'grassyterrain',
		target: "normal",
		type: "Grass",
		zMoveBoost: {spe: 1},
	},
	// Brandon
	sirenssong: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		shortDesc: "Makes the target Water type and burns it.",
		id: "sirenssong",
		isNonstandard: true,
		name: "Siren's Song",
		pp: 10,
		priority: 1,
		flags: {protect: 1, reflectable: 1, sound: 1, authentic: 1, mirror: 1},
		status: 'brn',
		onHit: function (target) {
			if (!target.setType('Water')) return false;
			this.add('-start', target, 'typechange', 'Water');
		},
		target: "normal",
		type: "Water",
		zMoveBoost: {spa: 1},
	},
	// bumbadadabum
	freesoftware: {
		accuracy: 95,
		basePower: 110,
		category: "Special",
		shortDesc: "30% chance to paralyze the target.",
		id: "freesoftware",
		isNonstandard: true,
		isViable: true,
		name: "Free Software",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {chance: 30, status: 'par'},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Electro Ball", source);
		},
		onHit: function (target, source) {
			if (source.name === 'bumbadadabum') {
				this.add('c|&bumbadadabum|I\'d just like to interject for a moment. What you\'re referring to as Linux, is in fact, GNU/Linux, or as I\'ve recently taken to calling it, GNU plus Linux. Linux is not an operating system unto itself, but rather another free component of a fully functioning GNU system made useful by the GNU corelibs, shell utilities and vital system components comprising a full OS as defined by POSIX.');
				this.add('c|&bumbadadabum|Many computer users run a modified version of the GNU system every day, without realizing it. Through a peculiar turn of events, the version of GNU which is widely used today is often called Linux, and many of its users are not aware that it is basically the GNU system, developed by the GNU Project.');
				this.add('c|&bumbadadabum|There really is a Linux, and these people are using it, but it is just a part of the system they use. Linux is the kernel: the program in the system that allocates the machine\'s resources to the other programs that you run. The kernel is an essential part of an operating system, but useless by itself; it can only function in the context of a complete operating system. Linux is normally used in combination with the GNU operating system: the whole system is basically GNU with Linux added, or GNU/Linux. All the so-called Linux distributions are really distributions of GNU/Linux!');
			}
		},
		target: "normal",
		type: "Electric",
		zMovePower: 185,
	},
	// cant say
	bladeofaesthetics: {
		accuracy: 100,
		basePower: 100,
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
		zMovePower: 180,
	},
	// Ceteris Paribus
	bringerofdarkness: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Boosts the user's Special Attack and Speed by 1 stage, then calls Spikes and Dark Void.",
		shortDesc: "Boosts SpA/Spe, calls Spikes and Dark Void.",
		id: "bringerofdarkness",
		isNonstandard: true,
		name: "Bringer of Darkness",
		pp: 10,
		priority: 0,
		flags: {},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Nightmare", source);
		},
		onHit: function (target, source) {
			this.boost({spa: 1, spe: 1}, source, source);
			this.useMove("spikes", source);
			this.useMove("darkvoid", source);
		},
		secondary: false,
		target: "normal",
		type: "Dark",
		zMoveEffect: "clearnegativeboosts",
	},
	darkvoid: {
		inherit: true,
		onTryMove: function (pokemon, target, move) {
			if (pokemon.template.species === 'Darkrai' || move.hasBounced || move.sourceEffect.id === 'bringerofdarkness') {
				return;
			}
			this.add('-fail', pokemon, 'move: Dark Void');
			this.add('-hint', "Only a Pokemon whose form is Darkrai can use this move.");
			return null;
		},
	},
	// chaos
	forcewin: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Inflicts the effects of Taunt, Embargo, Torment, and Heal Block on the target, and confuses it.",
		shortDesc: "Inflicts Taunt, Embargo, Torment, Heal Block, and confusion.",
		id: "forcewin",
		isNonstandard: true,
		name: "Forcewin",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Taunt", source);
		},
		onHit: function (pokemon) {
			pokemon.addVolatile('taunt');
			pokemon.addVolatile('embargo');
			pokemon.addVolatile('torment');
			pokemon.addVolatile('healblock');
			pokemon.addVolatile('confusion');
		},
		secondary: false,
		target: "normal",
		type: "Dark",
		zMoveBoost: {spa: 2},
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
		zMoveEffect: 'healreplacement',
	},
	// Ciran
	burnturn: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "User switches out after damaging and burning the target.",
		id: "burnturn",
		isNonstandard: true,
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
		zMovePower: 140,
	},
	// Coronis
	blackhole: {
		accuracy: 70,
		basePower: 120,
		category: "Special",
		desc: "Has a 30% chance to raise the user's Special Attack, and a 30% chance to lower the target's Special Attack.",
		shortDesc: "30% chance to boost own SpA, lower target's.",
		id: "blackhole",
		isNonstandard: true,
		name: "Black Hole",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondaries: [
			{
				chance: 30,
				boosts: {spa: -1},
			}, {
				chance: 30,
				self: {
					boosts: {spa: 1},
				},
			},
		],
		target: "normal",
		type: "Dark",
		zMovePower: 190,
	},
	// DragonWhale
	earthsblessing: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Attack by 2 stages. For 5 turns, the evasiveness of all active Pokemon is multiplied by 0.6. At the time of use, Bounce, Fly, Magnet Rise, Sky Drop, and Telekinesis end immediately for all active Pokemon. During the effect, Bounce, Fly, Flying Press, High Jump Kick, Jump Kick, Magnet Rise, Sky Drop, Splash, and Telekinesis are prevented from being used by all active Pokemon. Ground-type attacks, Spikes, Toxic Spikes, Sticky Web, and the Ability Arena Trap can affect Flying types or Pokemon with the Ability Levitate.",
		shortDesc: "Raises the user's Atk by 2, sets Gravity.",
		id: "earthsblessing",
		isNonstandard: true,
		name: "Earth's Blessing",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			atk: 2,
		},
		target: "self",
		type: "Ground",
		zMoveEffect: "Sets Substitute, restores HP 50%",
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
		zMovePower: 175,
	},
	// eternally
	quackattack: {
		accuracy: 100,
		basePower: 40,
		category: "Special",
		desc: "Has a 100% chance to raise the user's Special Attack and Speed.",
		shortDesc: "100% chance to raise user's Spa, Spe.",
		id: "quackattack",
		isNonstandard: true,
		name: "Quack Attack",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hydro Vortex", target);
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Water",
		zMovePower: 100,
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
		zMovePower: 160,
	},
	// Eyan
	spectralthiefbutdragontype: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "The target's raised stat stages are stolen from it and applied to the user before dealing damage. This move's type effectiveness against Fairy is changed to be neutrally effective no matter what this move's type is.",
		shortDesc: "Steals target's boosts. Neutral vs. Fairy.",
		id: "spectralthiefbutdragontype",
		isNonstandard: true,
		name: "Spectral Thief but Dragon Type",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, authentic: 1},
		onEffectiveness: function (typeMod, type) {
			if (type === 'Fairy') return 0;
		},
		ignoreImmunity: {'Dragon': true},
		stealsBoosts: true,
		secondary: false,
		target: "normal",
		type: "Dragon",
		zMovePower: 175,
	},
	// false
	relentlessroseraid: {
		accuracy: true,
		basePower: 176,
		category: "Special",
		id: "relentlessroseraid",
		isViable: true,
		name: "Relentless Rose Raid",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Acid Downpour", target);
			this.add('-anim', source, "Bloom Doom", target);
		},
		isZ: "roseradiumz",
		secondary: false,
		target: "normal",
		type: "Poison",
	},
	// feliburn
	"clangoroussoulblaze": {
		inherit: true,
		cateogry: "Physical",
	},
	// Former Hope
	hopestrikesback: {
		accuracy: 100,
		basePower: 10,
		category: "Special",
		desc: "Has a 100% chance to raise the user's Defense and Special Defense by 1. Resets all of the target's stat stages to 0. Fails if the target is not poisoned.",
		shortDesc: "Target must be poisoned. Clears boosts.",
		id: "hopestrikesback",
		isNonstandard: true,
		name: "Hope Strikes Back",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove: function (pokemon, target) {
			if (target.status === 'psn' || target.status === 'tox') return;
			this.add('-fail', pokemon, 'move: Hope Strikes Back');
			return null;
		},
		onHit: function (target) {
			target.clearBoosts();
			this.add('-clearboost', target);
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {def: 1, spd: 1},
			},
		},
		target: "normal",
		type: "Water",
		zMovePower: 100,
	},
	// GoodMorningEspeon
	fridgeoff: {
		accuracy: 90,
		basePower: 110,
		category: "Special",
		defensiveCategory: "Physical",
		desc: "Deals damage to the target based on its Defense instead of Special Defense. 30% chance to confuse the target.",
		shortDesc: "Damages target based on Defense. 30% confusion.",
		id: "fridgeoff",
		isNonstandard: true,
		name: "FRIDGE OFF",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Avalanche", target);
		},
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Ice",
		zMovePower: 185,
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
		zMoveEffect: 'clearnegativeboosts',
	},
	// Haund
	psychokinesis: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "The target's raised stat stages are stolen from it and applied to the user after dealing damage.",
		shortDesc: "100% chance to steal target's boosts.",
		id: "psychokinesis",
		isNonstandard: true,
		name: "Psychokinesis",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Aura Sphere", target);
		},
		secondary: {
			chance: 100,
			onHit: function (target, source) {
				let stolen = false;
				for (let boost in target.boosts) {
					if (target.boosts[boost] > 0) {
						stolen = true;
						source.boosts[boost] += target.boosts[boost];
						if (source.boosts[boost] > 6) source.boosts[boost] = 6;
						target.boosts[boost] = 0;
						this.add('-setboost', source, boost, source.boosts[boost]);
						this.add('-setboost', target, boost, target.boosts[boost]);
					}
				}
				if (stolen) {
					this.add('-message', "Boosts were psychokinetically stolen!");
				}
			},
		},
		target: "normal",
		type: "Fighting",
		zMovePower: 175,
	},
	// HeaLnDeaL
	petrifychomp: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "User recovers 75% of the damage dealt.",
		id: "petrifychomp",
		isNonstandard: true,
		name: "Petrify Chomp",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, heal: 1},
		drain: [3, 4],
		secondary: false,
		target: "normal",
		type: "Rock",
		zMovePower: 160,
	},
	// Hippopotas
	beannoying: {
		accuracy: 100,
		category: "Status",
		pp: 20,
		shortDesc: "Sets 2 random hazards + roars.",
		id: "beannoying",
		isNonstandard: true,
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
		zMoveBoost: {def: 1},
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
			this.add('c|&HoeenHero|!evalbattle let p=p1.pokemon.find(p => p.speciesid===\'ludicolo\'); battle.boost({spa:1},p); battle.setWeather(\'raindance\', p); for(let i in p2.pokemon) if(p2.pokemon[i].isActive) { p2.pokemon[i].setStatus(\'confusion\'); break;}');
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
		zMoveBoost: {spe: 1},
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
		zMovePower: 140,
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
		zMoveEffect: 'heal', // lol.
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
		zMovePower: 185,
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
		zMoveEffect: 'heal',
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
		zMovePower: "100",
	},
	// Kalalokki
	maelstrm: {
		accuracy: 85,
		basePower: 100,
		category: "Special",
		shortDesc: "Traps and damages the target for 5-7 turns.",
		id: "maelstrm",
		isNonstandard: true,
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
		zMovePower: 180,
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
		zMovePower: 180,
	},
	// Kaori
	bigeruption: {
		accuracy: 100,
		basePower: 250,
		category: "Special",
		desc: "The user faints after using this move, even if this move fails for having no target. This move is prevented from executing if any active Pokemon has the Ability Damp.",
		shortDesc: "Hits adjacent Pokemon. The user faints.",
		id: "bigeruption",
		isNonstandard: true,
		name: "BIG ERUPTION",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		selfdestruct: "always",
		secondary: false,
		target: "allAdjacent",
		type: "Fire",
		zMovePower: 200,
	},
	// Kay
	specialkay: {
		accuracy: true,
		category: "Status",
		desc: "The user faints and the Pokemon brought out to replace it randomly has its either its Attack, Defense, Special Attack, Special Defense, and Speed raised by 1 stage, or its Attack, Special Attack, and Speed raised by 2 stages and its Defense and Special Defense lowered by 1 stage.",
		shortDesc: "User faints. Replacement's stats are boosted.",
		id: "specialkay",
		isNonstandard: true,
		name: "Special Kay",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Lunar Dance", target);
		},
		onTryHit: function (pokemon, target, move) {
			if (!this.canSwitch(pokemon.side)) {
				delete move.selfdestruct;
				return false;
			}
		},
		selfdestruct: "ifHit",
		sideCondition: 'specialkay',
		effect: {
			duration: 2,
			onStart: function (side, source) {
				this.debug('Special Kay started on ' + side.name);
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
				if (this.random(2)) {
					this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1});
				} else {
					this.boost({atk: 2, def: -1, spa: 2, spd: -1, spe: 2});
				}
				if (!this.effectData.positions.some(affected => affected === true)) {
					target.side.removeSideCondition('specialkay');
				}
			},
		},
		secondary: false,
		target: "self",
		type: "Psychic",
		zMoveEffect: 'healreplacement',
	},
	// KingSwordYT
	dragonwarriortouch: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Has a 100% chance to increase the user's Attack by 1. The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of damage dealt. Boosts Atk.",
		id: "dragonwarriortouch",
		isNonstandard: true,
		name: "Dragon Warrior Touch",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, heal: 1},
		drain: [1, 2],
		secondary: {
			chance: 100,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		target: "normal",
		type: "Fighting",
		zMovePower: 160,
	},
	// Level 51
	nextlevelstrats: {
		accuracy: true,
		category: "Status",
		shortDesc: "User gains 10 levels.",
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

			this.add('-message', `${pokemon.name} advanced 10 levels! It is now level ${pokemon.level}!`);
		},
		secondary: false,
		target: "self",
		type: "Normal",
		zMoveBoost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1},
	},
	// LifeisDANK
	peent: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		shortDesc: "Peent.",
		id: "peent",
		isNonstandard: true,
		name: "Peent",
		pp: 24,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1},
		onPrepareHit: function (target, source) {
			this.add('c|@LifeisDANK|https://youtu.be/CsEO3tNIVTE');
			this.attrLastMove('[still]');
			this.add('-anim', source, "Present", target);
		},
		onHit: function (pokemon, source) {
			let rand = this.random(10);
			if (rand < 2) {
				// 20% Dual screens
				this.useMove('reflect', source);
				this.useMove('lightscreen', source);
			} else if (rand < 6) {
				// 40% Sleep Powder
				this.useMove('sleeppowder', source, pokemon);
			} else if (rand < 9) {
				// 30% Recover
				this.useMove('recover', source);
			} else {
				// 10% Explosion
				this.useMove('explosion', source, pokemon);
			}
		},
		target: "normal",
		type: "Flying",
	},
	// MacChaeger
	naptime: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user falls asleep for the next turn and restores 50% of its HP, curing itself of any major status condition in the process. If the user falls asleep in this way, all other active Pokemon that are not asleep also try to use Nap Time. Fails if the user has full HP, is already asleep, or if another effect is preventing sleep.",
		shortDesc: "All active Pokemon sleep 1 turn, restore HP, status.",
		id: "naptime",
		isNonstandard: true,
		name: "Nap Time",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rest", target);
			this.add('-anim', source, "Aromatic Mist", target);
		},
		onHit: function (target, source, move) {
			if (target.hp >= target.maxhp && !move.originalUser) return false;
			if (!move.originalUser) {
				if (!target.setStatus('slp')) return false;
			} else {
				// Trigger sleep clause if not the original user
				target.setStatus('slp', move.originalUser, move);
			}
			target.statusData.time = 2;
			target.statusData.startTime = 2;
			this.heal(target.maxhp / 2); //Aeshetic only as the healing happens after you fall asleep in-game
			this.add('-status', target, 'slp', '[from] move: Rest');
			if (!move.originalUser) {
				move.originalUser = source;
				for (let i = 0; i < this.sides.length; i++) {
					for (let j = 0; j < this.sides[i].active.length; j++) {
						let curMon = this.sides[i].active[j];
						if (curMon === source) continue;
						if (curMon && curMon.hp && curMon.status !== 'frz') {
							this.add('-anim', source, "Yawn", curMon);
							this.useMove(move, curMon, curMon, move);
						}
					}
				}
			}
		},
		secondary: false,
		target: "self",
		type: "Fairy",
		zMoveEffect: 'clearnegativeboosts',
	},
	// Megazard
	dragonswrath: {
		accuracy: 100,
		basePower: 107,
		category: "Special",
		shortDesc: "Super effective on Fairy.",
		id: "dragonswrath",
		isNonstandard: true,
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
		zMovePower: 183,
	},
	// MochaMint
	caraccident: {
		accuracy: true,
		basePower: 0,
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
		zMoveEffect: 'healreplacement',
	},
	// NOVED
	forthekids: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		shortDesc: "10% to paralyze, 10% to flinch.",
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
		zMovePower: 120,
	},
	// nui
	sozinscomet: {
		accuracy: 90,
		basePower: 150,
		category: "Special",
		desc: "If this move is successful, the user must recharge on the following turn and cannot make a move, unless the opponent faints.",
		shortDesc: "User cannot move next turn unless target faints.",
		id: "sozinscomet",
		isNonstandard: true,
		name: "Sozin's Comet",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, protect: 1, mirror: 1},
		onAfterMoveSecondarySelf: function (pokemon, target, move) {
			if (target && !target.fainted && target.hp > 0) pokemon.addVolatile('mustrecharge');
		},
		secondary: false,
		target: "normal",
		type: "Fire",
		zMovePower: 200,
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
		zMoveEffect: 'clearnegativeboosts',
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
		zMovePower: 140,
	},
	// Paradise
	dizzyrock: {
		accuracy: true,
		category: "Status",
		shortDesc: "Hurts foes on switch-in. Factors Rock weakness. Confuses foe",
		id: "dizzyrock",
		isNonstandard: true,
		isViable: true,
		name: "Dizzy Rock",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		onPrepareHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Stealth Rock", target);
		},
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
		zMoveBoost: {spd: 1},
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
		zMovePower: 200,
	},
	// Scyther NO Swiping
	"3strikeswipe": {
		accuracy: true,
		basePower: 45,
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
		zMovePower: 190,
	},
	// Sigilyph
	gammarayburst: {
		accuracy: true,
		basePower: 350,
		category: "Special",
		id: "gammarayburst",
		isNonstandard: true,
		isViable: true,
		name: "Gamma Ray Burst",
		pp: 1,
		priority: 0,
		flags: {},
		ignoreImmunity: {'Psychic': true},
		onModifyMove: function (move, pokemon, target) {
			if (target.getStat('def', false, true) < target.getStat('spd', false, true)) move.defensiveCategory = 'Physical';
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Cosmic Power", source);
			this.add('-anim', source, "Explosion", source);
			this.add('-anim', source, "Light of Ruin", target);
		},
		isZ: "singularity",
		selfdestruct: "always",
		secondary: false,
		target: "allAdjacentFoes",
		type: "Psychic",
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
		pp: 5,
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
		zMovePower: 160,
	},
	// Soccer
	dragonforce: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "Neutrally affects all types, including Fairy. The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "Neutral vs. all types. Drains HP.",
		id: "dragonforce",
		isNonstandard: true,
		name: "Dragon Force",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sacred Fire", target);
			this.add('-anim', source, "Gravity", target);
		},
		onEffectiveness: 0,
		drain: [1, 2],
		ignoreImmunity: {'Dragon': true},
		secondary: false,
		target: "normal",
		type: "Dragon",
		zMovePower: 120,
	},
	// SpaceBass
	armyofmushrooms: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Boosts Defense and Special Defense by 1 stage at the start of the turn, then uses Sleep Powder, Leech Seed, and Powder against the target.",
		shortDesc: "Boosts Def, SpD before attack.",
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
		zMoveBoost: {spd: 1},
	},
	// Swirlyder
	meswirlsyou: {
		accuracy: true,
		basePower: 0,
		cateogry: "Status",
		desc: "Replaces the target's moves with random moves until it switches out.",
		shortDesc: "Randomizes the targets moves.",
		id: "meswirlsyou",
		name: "/me swirls you",
		isNonstandard: true,
		pp: 3,
		noPPBoosts: true,
		priority: 6,
		flags: {mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hurricane", target);
		},
		onHit: function (target) {
			let moves = [];
			for (let i = 0; i < target.moveSlots.length; i++) {
				let dexMoves = [];
				for (let j in exports.BattleMovedex) {
					let dexMove = exports.BattleMovedex[j];
					if (j !== dexMove.id) continue;
					if (this.getMove(i).gen > this.gen) continue;
					dexMoves.push(dexMove);
				}
				let randomMove = '';
				while (dexMoves.length && (!randomMove || moves.indexOf(randomMove) !== -1)) {
					dexMoves.sort((a, b) => a.num - b.num);
					randomMove = dexMoves[this.random(dexMoves.length)].id;
				}
				moves.push(randomMove);
				randomMove = this.getMove(randomMove);
				target.moveSlots[i] = {
					move: randomMove.name,
					id: randomMove.id,
					pp: randomMove.pp,
					maxpp: randomMove.pp,
					target: randomMove.target,
					disabled: false,
					used: false,
					virtual: true,
				};
			}
		},
		effect: {
			onDisableMove: function (pokemon) {
				pokemon.disableMove('meswirlsyou');
			},
		},
		self: {
			volatileStatus: 'meswirlsyou',
		},
		target: "normal",
		type: "Normal",
		zMoveBoost: {spd: 1},
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
		zMovePower: 200,
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
		zMovePower: 160,
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
		flags: {protect: 1, mirror: 1, authentic: 1},
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
		zMoveEffect: 'clearnegativeboosts',
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
		zMoveEffect: 'crit2',
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
		isZ: 'tiksiumz',
		secondary: false,
		target: "normal",
		type: "Rock",
	},
	// Timbuktu
	entrapment: {
		accuracy: 90,
		basePower: 60,
		category: "Physical",
		shortDesc: "Traps target for 5 turns, 50% chance of leech seeds.",
		id: "entrapment",
		isNonstandard: true,
		name: "Entrapment",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onTryHit: function (target, source, move) {
			this.attrLastMove(['still']);
			this.add('-anim', source, "Wrap", target);
		},
		onHit: function (target, source, move) {
			if (!target.volatiles['trapped'] && this.addVolatile('trapped')) {
				target.volatiles['trapped'].duration = 5;
			}
			if (this.random(2) && !target.hasType('Bug')) target.addVolatile('entrapment', source, move);
		},
		effect: {
			onStart: function (target) {
				this.add('-start', target, 'Eggs');
			},
			onResidualOrder: 8,
			onResidual: function (pokemon) {
				let target = this.effectData.source.side.active[this.effectData.sourcePosition];
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to leech into');
					return;
				}
				let eggs = {id: "eggs", fullName: "Eggs"};
				let damage = this.damage(pokemon.maxhp / 8, pokemon, target, eggs);
				if (damage) {
					this.heal(damage, target, pokemon, eggs);
				}
			},
		},
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
		zMovePower: 160,
	},
	// urkerab
	holyorders: {
		 accuracy: true,
		 basePower: 0,
		 category: "Status",
		 shortDesc: "Calls Heal Order, Defend Order and Attack Order.",
		 id: "holyorders",
		 isNonstandard: true,
		 isViable: true,
		 name: "Holy Orders",
		 pp: 10,
		 priority: 0,
		 flags: {},
		 onPrepareHit: function () {
			  this.attrLastMove('[still]');
		 },
		 onHit: function (target, source) {
			  this.useMove("healorder", source);
			  this.useMove("defendorder", source);
			  this.useMove("attackorder", source);
		 },
		 secondary: false,
		 target: "self",
		 type: "Fighting",
	},
	// Winry
	fighttothedeath: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Randomly calls one of Guillotine, Fissure, Sheer Cold, or Horn Drill, and modifies its accuracy to 55%. If the called move is unsuccessful, the user faints.",
		shortDesc: "OHKOes the target or the user faints.",
		id: "fighttothedeath",
		isNonstandard: true,
		isViable: true,
		name: "Fight to the Death",
		pp: 3,
		noPPBoosts: true,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function () {
			this.attrLastMove('[still]');
		},
		onHit: function (target, source) {
			let ohkoMove = this.getMoveCopy(['Guillotine', 'Fissure', 'Sheer Cold', 'Horn Drill'][this.random(4)]);
			source.addVolatile('fighttothedeath');
			if (!this.useMove(ohkoMove, source, target)) {
				this.attrLastMove('[still]');
				this.add('-anim', source, "Explosion", target);
				source.faint();
			}
		},
		effect: {
			onAccuracy: function (target, pokemon, move, accuracy) {
				pokemon.removeVolatile('fighttothedeath');
				if (['Guillotine', 'Fissure', 'Sheer Cold', 'Horn Drill'].contains(move.name)) return 55;
				return accuracy;
			},
		},
		secondary: false,
		target: "normal",
		type: "Fighting",
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
		desc: "The user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members. If the user was damaged by the target this turn, the target becomes infatuated and trapped. The target will become infatuated regardless of its gender or the gender of the user, and the infatuation and trapping effects will not wear off if the user of this move faints or is switched out.",
		shortDesc: "Infatuates, traps target. User switches out.",
		pp: 10,
		id: "cutieescape",
		isNonstandard: true,
		name: "Cutie Escape",
		onHit: function (target, pokemon, move) {
			if (target.lastDamage > 0 && pokemon.lastAttackedBy && pokemon.lastAttackedBy.thisTurn && pokemon.lastAttackedBy.pokemon === target) {
				target.addVolatile('cutieescape');
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
			/* onUpdate: function (pokemon) {
				if (this.effectData.source && !this.effectData.source.isActive && pokemon.volatiles['attract']) {
					this.debug('Removing Attract volatile on ' + pokemon);
					pokemon.removeVolatile('attract');
				}
			}, */ // Isn't removed when the user switches
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
		shortDesc: "Use random moves known by healthy allies.",
		desc: "For each unfainted Pokemon without a major status condition in the user's party, the user uses a random move known by that Pokemon.",
		id: "cheerleadingsquad",
		isNonstandard: true,
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
				for (let i = 0; i < pokemon.moveSlots.length; i++) {
					let move = pokemon.moveSlots[i].id;
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
				move = this.getMoveCopy(move);
				if (move.basePower) move.basePower = Math.floor(move.basePower / 2);
				this.useMove(move, target);
			}
		},
		target: "normal",
		type: "Fairy",
	},
};
