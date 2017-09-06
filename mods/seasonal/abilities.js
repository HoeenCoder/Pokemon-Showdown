'use strict';

exports.BattleAbilities = {
	// kamikaze and imas
	flashfeather: {
		shortDesc: "This Pokemon's Flying-type moves have their priority increased by 1.",
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.type === 'Flying') return priority + 1;
		},
	},
	// Megazard
	insensible: {
		shortDesc: "This Pokemon ignores other Pokemon's stat stages when taking or doing damage, and receives 3/4th damage from super effective attacks.",
		id: "insensible",
		name: "Insensible",
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
	interdimensional:{
		shortDesc: "On switch-in, summons Gravity.",
		onStart: function () {
			this.addPseudoWeather('gravity');
		},
	},
	// Teremiare
	superprankster: {
		shortDesc: "This Pokemon's status moves have their priority increased by 3.",
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.category === 'Status') return priority + 3;
		},
	},
};
