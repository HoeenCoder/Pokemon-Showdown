'use strict';

exports.BattleAbilities = {
	// kamikaze
	flashfeather: {
		shortDesc: "This Pokemon's Flying-type moves have their priority increased by 1.",
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.type === 'Flying') return priority + 1;
		},
	},
	interdimensional:{
		shortDesc: "On switch-in, summons Gravity.",
		onHitField: function (target, source, effect) {
			this.addPseudoWeather('gravity', source, effect, '[of] ' + source);
		},
	},
};
