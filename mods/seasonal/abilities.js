'use strict';

exports.BattleAbilities = {
	// Acast
	stealth: {
		id: "stealth",
		name: "Stealth",
		shortDesc: "If hit on the first turn out, takes 0 neutral damage.",
		onDamage: function (damage, target, source, effect) {
			if (effect && effect.effectType === 'Move' && target.activeTurns < 2 && !this.effectData.busted) {
				this.add('-activate', target, 'ability: Stealth');
				this.effectData.busted = true;
				return 0;
			}
		},
		onEffectiveness: function (typeMod, target, type, move) {
			if (!this.activeTarget || this.effectData.busted) return;
			let pokemon = this.activeTarget;
			if (pokemon.volatiles['substitute'] && !(move.flags['authentic'] || move.infiltrates)) return;
			if (!pokemon.runImmunity(move.type)) return;
			return 0;
		},
	},
	// Akir
	mushroomwall: {
		id: "mushroomwall",
		name: "Mushroom Wall",
		shortDesc: "Healed 1/4 by water, 1/8 by rain; takes 3/4 damage from supereffective attacks.",
		onSourceModifyDamage: function (damage, source, target, move) {
			if (move.typeMod > 0) {
				this.debug('Mushroom Wall neutralize');
				return this.chainModify(0.75);
			}
		},
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[msg]', '[from] ability: Mushroom Wall');
				}
				return null;
			}
		},
		onWeather: function (target, source, effect) {
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.maxhp / 8);
			} else if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.damage(target.maxhp / 8, target, target);
			}
		},
	},
	// Amingo
	disguise: {
		inherit: true,
		shortDesc: "The first hit this Pokemon takes in battle deals 0 neutral damage.",
		onDamage: function (damage, target, source, effect) {
			if (effect && effect.effectType === 'Move' && !this.effectData.busted) {
				this.add('-activate', target, 'ability: Stealth');
				this.effectData.busted = true;
				return 0;
			}
		},
		onEffectiveness: function (typeMod, target, type, move) {
			if (!this.activeTarget || this.effectData.busted) return;
			let pokemon = this.activeTarget;
			if (pokemon.volatiles['substitute'] && !(move.flags['authentic'] || move.infiltrates)) return;
			if (!pokemon.runImmunity(move.type)) return;
			return 0;
		},
	},
	// ant
	truant: {
		inherit: true,
		name: "TRU ANT",
		onStart: function (pokemon) {
			if (this.activeMove && this.activeMove.id === 'skillswap') return;
			let target = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position];
			if (target) {
				this.useMove('skillswap', pokemon, target, this.getAbility('truant'));
			}
		},
	},
	// Arrested
	shellshocker: {
		id: "shellshocker",
		name: "Shell Shocker",
		shortDesc: "This Pokemon's Normal type moves -> Electric; absorbs Electric moves.",
		onModifyMovePriority: -1,
		onModifyMove: function (move, pokemon) {
			if (move.type === 'Normal' && !['judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'weatherball'].includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Electric';
				move.galvanizeBoosted = true;
			}
		},
		onBasePowerPriority: 8,
		onBasePower: function (basePower, pokemon, target, move) {
			if (move.galvanizeBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[msg]', '[from] ability: Shell Shocker');
				}
				return null;
			}
		},
	},
	// Articuno
	icydown: {
		id: "icydown",
		name: "Icy Down",
		shortDesc: "Takes only direct damage. -1 speed on contact.",
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		onAfterDamage: function (damage, target, source, effect) {
			if (effect && effect.flags['contact']) {
				this.add('-ability', target, 'Icy Down');
				this.boost({spe: -1}, source, target, null, true);
			}
		},
	},
	// Ascriptmaster
	appliancechange: {
		id: "appliancechange",
		name: "Appliance Change",
		shortDesc: "+1 speed on switch in, changes forme based on type of move used.",
		onSwitchIn: function () {
			this.boost({spe: 1});
		},
		onBeforeMovePriority: 0.5,
		onBeforeMove: function (attacker, defender, move) {
			if (attacker.template.baseSpecies !== 'Rotom' || attacker.transformed) return;
			let formes = {'Grass': 'Rotom-Mow', 'Fire': 'Rotom-Heat', 'Water': 'Rotom-Wash', 'Ice': 'Rotom-Frost', 'Flying': 'Rotom-Fan'};
			let targetSpecies = formes[move.type];
			if (!targetSpecies) targetSpecies = formes[Object.keys(formes)[this.random(5)]];
			if (!targetSpecies) return; // Should never happen
			if (attacker.template.species !== targetSpecies && attacker.formeChange(targetSpecies)) {
				this.add('-formechange', attacker, targetSpecies, '[from] ability: Appliance Change');
			}
		},
		onAfterMove: function (pokemon) {
			if (pokemon.template.baseSpecies !== 'Rotom' || !pokemon.template.forme) return;
			if (pokemon.formeChange('Rotom')) {
				this.add('-formechange', pokemon, 'Rotom', '[from] ability: Appliance Change');
			}
		},
	},
	// Astyanax
	frogskin: {
		id: "frogskin",
		name: "Frogskin",
		shortDesc: "Heal 1/8 of max HP each turn while poisoned; poisoned targets take critical hits.",
		onDamage: function (damage, target, source, effect) {
			if (effect.id === 'psn' || effect.id === 'tox') {
				this.heal(target.maxhp / 8);
				return false;
			}
		},
		onModifyCritRatio: function (critRatio, source, target) {
			if (target && ['psn', 'tox'].includes(target.status)) return 5;
		},
	},
	// Bondie
	solarsurge: {
		id: "solarsurge",
		name: "Solar Surge",
		shortDesc: "Sets extremely harsh sunlight; doubles speed and boosts SpA by 1 each turn.",
		onStart: function (source) {
			this.setWeather('desolateland');
		},
		onAnySetWeather: function (target, source, weather) {
			if (this.getWeather().id === 'desolateland' && !['desolateland', 'primordialsea', 'deltastream', 'aridplateau'].includes(weather.id)) return false;
		},
		onModifySpe: function (spe) {
			if (this.isWeather(['sunnyday', 'desolateland'])) return this.chainModify(2);
		},
		onWeather: function (target, source, effect) {
			if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.boost({spa: 1});
			}
		},
		onEnd: function (pokemon) {
			if (this.weatherData.source !== pokemon) return;
			for (let i = 0; i < this.sides.length; i++) {
				for (let j = 0; j < this.sides[i].active.length; j++) {
					let target = this.sides[i].active[j];
					if (target === pokemon) continue;
					if (target && target.hp && (target.hasAbility('desolateland') || target.hasAbility('solarsurge'))) {
						this.weatherData.source = target;
						return;
					}
				}
			}
			this.clearWeather();
		},
	},
	// Brandon
	thickskin: {
		id: "thickskin",
		name: "Thick Skin",
		shortDesc: "Shed Skin + Thick Fat + Stamina.",
		onResidualOrder: 5,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.hp && pokemon.status && this.random(3) === 0) {
				this.debug('thick skin');
				this.add('-activate', pokemon, 'ability: Thick Skin');
				pokemon.cureStatus();
			}
		},
		onModifyAtkPriority: 6,
		onSourceModifyAtk: function (atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Thick Skin weaken');
				return this.chainModify(0.5);
			}
		},
		onModifySpAPriority: 5,
		onSourceModifySpA: function (atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Thick Skin weaken');
				return this.chainModify(0.5);
			}
		},
		onAfterDamage: function (damage, target, source, effect) {
			if (effect && effect.effectType === 'Move' && effect.id !== 'confused') {
				this.boost({def: 1});
			}
		},
	},
	// eternally
	duckseason: {
		id: "duckseason",
		name: "Duck Season",
		shortDesc: "Sets heavy rain on switch-in, STAB becomes 2 instead of 1.5.",
		onStart: function (source) {
			this.setWeather('primordialsea');
		},
		onModifyMove: function (move) {
			move.stab = 2;
		},
		onAnySetWeather: function (target, source, weather) {
			if (this.getWeather().id === 'primordialsea' && !['desolateland', 'primordialsea', 'deltastream'].includes(weather.id)) return false;
		},
		onEnd: function (pokemon) {
			if (this.weatherData.source !== pokemon) return;
			for (let i = 0; i < this.sides.length; i++) {
				for (let j = 0; j < this.sides[i].active.length; j++) {
					let target = this.sides[i].active[j];
					if (target === pokemon) continue;
					if (target && target.hp && (target.hasAbility('primordialsea') || target.hasAbility('duckseason'))) {
						this.weatherData.source = target;
						return;
					}
				}
			}
			this.clearWeather();
		},
	},
	// false
	nitricacid: {
		id: "nitricacid",
		name: "Nitric Acid",
		shortDesc: "This Pokemon can hit Steel types with Poison-type moves.",
		onModifyMovePriority: -5,
		onModifyMove: function (move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Poison'] = true;
			}
		},
	},
	// grimAuxiliatrix
	chromefinish: {
		id: "chromefinish",
		name: "Chrome Finish",
		shortDesc: "Halves damage from special moves",
		onFoeBasePower: function (basePower, attacker, defender, move) {
			if (this.effectData.target !== defender) return;
			if (move.category === 'Special') {
				return this.chainModify(0.5);
			}
		},
	},
	// kamikaze and imas
	flashfeather: {
		id: "flashfeather",
		name: "Flash Feather",
		shortDesc: "This Pokemon's Flying-type moves have their priority increased by 1.",
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.type === 'Flying') return priority + 1;
		},
	},
	// KingSwordYT
	kungfupanda: {
		id: "kungfupanda",
		name: "Kung Fu Panda",
		shortDesc: "Immunity to Fighting. Boosts speed when hit. Boosts punch moves.",
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Fighting') {
				this.add('-immune', target, '[msg]', '[from] ability: Kung Fu Panda');
				return null;
			}
		},
		onAfterDamage: function (damage, target, source, effect) {
			if (effect && effect.effectType === 'Move' && effect.id !== 'confused') {
				this.boost({spe: 1});
			}
		},
	},
	// LifeisDANK
	birb: {
		id: "birb",
		name: "Birb",
		shortDesc: "On switch-in, foe becomes a delibird, user's ability is then Refrigerate.",
		onStart: function (pokemon) {
			if (this.activeMove && this.activeMove.id === 'skillswap') return;
			let target = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position];
			if (pokemon) {
				target.transformInto(pokemon, target, this.getAbility('birb'));
				target.setAbility('Refrigerate');
			}
		},
	},
	// MacChaeger
	'350cups': {
		id: "350cups",
		name: "350 Cups",
		shortDesc: "If Mantyke, doubles base stats.",
		// Implemented in mods/seasonal/pokedex.js
	},
	// nv
	aridplateau: {
		id: "aridplateau",
		name: "Arid Plateau",
		shortDesc: "Summons dust storm and gets rid of all Rock Type's weaknesses.",
		onStart: function (source) {
			this.setWeather('aridplateau');
		},
		onAnySetWeather: function (target, source, weather) {
			if (this.getWeather().id === 'aridplateau' && !['desolateland', 'primordialsea', 'deltastream', 'aridplateau'].includes(weather.id)) return false;
		},
		onEnd: function (pokemon) {
			if (this.weatherData.source !== pokemon) return;
			for (let i = 0; i < this.sides.length; i++) {
				for (let j = 0; j < this.sides[i].active.length; j++) {
					let target = this.sides[i].active[j];
					if (target === pokemon) continue;
					if (target && target.hp && target.hasAbility('aridplateau')) {
						this.weatherData.source = target;
						return;
					}
				}
			}
			this.clearWeather();
		},
	},
	// Paradise
	toxicuser: {
		id: "toxicuser",
		name: "Toxic User",
		onSetStatus: function (status, target, source, effect) {
			if (['Poison', 'Steel'].includes(target.type) && ['psn', 'tox'].includes(status.id)) return true;
		},
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.flags['heal']) return priority + 3;
		},
		shortDesc: "Can posion or badly poison foe regardless of type, healing moves boost their priority by 3.",
	},
	// Team Pokepals
	aurasense: {
		id: "aurasense",
		name: "Aura Sense",
		shortDesc: "Aura Sphere's power is 100 BP, Fighting type moves hit Ghost types.",
		onNegateImmunity: function (pokemon, type) {
			if (pokemon.hasType('Ghost') && type === 'Fighting') return false;
		},
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.id === 'aurasphere') {
				return this.chainModify(1.25);
			}
		},
	},
	// Teremiare
	superprankster: {
		id: "superprankster",
		name: "Super Prankster",
		shortDesc: "This Pokemon's status moves have their priority increased by 3.",
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.category === 'Status') return priority + 3;
		},
	},
	// Trickster
	interdimensional: {
		id: "interdimensional",
		name: "Interdimensional",
		shortDesc: "On switch-in, summons Gravity.",
		onStart: function () {
			this.addPseudoWeather('gravity');
		},
	},

	// Normal abilities modified to account for new effects
	desolateland: {
		inherit: true,
		onAnySetWeather: function (target, source, weather) {
			if (this.getWeather().id === 'desolateland' && !['desolateland', 'primordialsea', 'deltastream', 'aridplateau'].includes(weather.id)) return false;
		},
		onEnd: function (pokemon) {
			if (this.weatherData.source !== pokemon) return;
			for (let i = 0; i < this.sides.length; i++) {
				for (let j = 0; j < this.sides[i].active.length; j++) {
					let target = this.sides[i].active[j];
					if (target === pokemon) continue;
					if (target && target.hp && (target.hasAbility('desolateland') || target.hasAbility('solarsurge'))) {
						this.weatherData.source = target;
						return;
					}
				}
			}
			this.clearWeather();
		},
	},
	primordialsea: {
		inherit: true,
		onAnySetWeather: function (target, source, weather) {
			if (this.getWeather().id === 'primordialsea' && !['desolateland', 'primordialsea', 'deltastream', 'aridplateau'].includes(weather.id)) return false;
		},
		onEnd: function (pokemon) {
			if (this.weatherData.source !== pokemon) return;
			for (let i = 0; i < this.sides.length; i++) {
				for (let j = 0; j < this.sides[i].active.length; j++) {
					let target = this.sides[i].active[j];
					if (target === pokemon) continue;
					if (target && target.hp && (target.hasAbility('primordialsea') || target.hasAbility('duckseason'))) {
						this.weatherData.source = target;
						return;
					}
				}
			}
			this.clearWeather();
		},
	},
};
