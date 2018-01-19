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
	// Megazard
	insensible: {
		id: "insensible",
		name: "Insensible",
		shortDesc: "This Pokemon ignores other Pokemon's stat stages when taking or doing damage, and receives 3/4th damage from super effective attacks.",
		onAnyModifyBoost: function (boosts, target) {
			let source = this.effectData.target;
			if (source === target) return;
			if (source === this.activePokemon && target === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (target === this.activePokemon && source === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		onSourceModifyDamage: function (damage, source, target, move) {
			if (move.typeMod > 0) {
				this.debug('Insensible neutralize');
				return this.chainModify(0.75);
			}
		},
	},
	// Trickster
	interdimensional:{
		id: "interdimensional",
		name: "Interdimensional",
		shortDesc: "On switch-in, summons Gravity.",
		onStart: function () {
			this.addPseudoWeather('gravity');
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
};
