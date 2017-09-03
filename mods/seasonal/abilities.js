'use strict';

exports.BattleAbilities = {
	// kamikaze and imas
	flashfeather: {
		shortDesc: "This Pokemon's Flying-type moves have their priority increased by 1.",
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.type === 'Flying') return priority + 1;
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
