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
			if (!this.activeTarget) return;
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
		shortDesc: "Solid Rock + Dry Skin.",
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[msg]', '[from] ability: Mushroom Wall');
				}
				return null;
			}
		},
		onBasePowerPriority: 7,
		onFoeBasePower: function (basePower, attacker, defender, move) {
			if (this.effectData.target !== defender) return;
			if (move.type === 'Fire') {
				return this.chainModify(1.25);
			}
		},
		onWeather: function (target, source, effect) {
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.maxhp / 8);
			} else if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.damage(target.maxhp / 8, target, target);
			}
		},
		onSourceModifyDamage: function (damage, source, target, move) {
			if (move.typeMod > 0) {
				this.debug('Solid Rock neutralize');
				return this.chainModify(0.75);
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
	// nv
	aridplateau: {
		id: "aridplateau",
		name: "Arid Plateau",
		shortDesc: "Summons dust storm and gets rid of all Rock Type's weaknesses.",
		onStart: function (source) {
			this.setWeather('duststorm');
		},
		onAnySetWeather: function (target, source, weather) {
			if (this.getWeather().id === 'duststorm' && !['desolateland', 'primordialsea', 'deltastream', 'aridplateau'].includes(weather.id)) return false;
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
};
