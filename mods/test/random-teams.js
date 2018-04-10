'use strict';

const RandomTeams = require('../../data/random-teams');

class RandomStaffBrosTestTeams extends RandomTeams {
	randomStaffBrosTestTeam() {
		let team = [];
		let variant = (this.random(2) === 1);
		let sets = {
			/*
			'template': {
				species: 'Unown', ability: 'Levitate', item: 'Choice Specs', gender: 'N',
				moves: ['', '', '', ''],
				signatureMove: '',
				evs: {spa: 252, spd: 4, spe: 252}, nature: 'Serious',
			},
			*/
		};

		// Generate the team randomly.
		let pool = Object.keys(sets);
		while (team.length < 6 && pool.length) {
			let name = this.sampleNoReplace(pool);
			let set = sets[name];
			set.level = 100;
			set.name = name;
			if (!set.ivs) {
				set.ivs = {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31};
			} else {
				for (let iv in {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31}) {
					set.ivs[iv] = iv in set.ivs ? set.ivs[iv] : 31;
				}
			}
			// Assuming the hardcoded set evs are all legal.
			if (!set.evs) set.evs = {hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84};
			set.moves = [this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves)].concat(set.signatureMove);
			if (name === 'Ascriptmaster') {
				// item hack
				let type = [this.getMove(set.moves[0]).type, this.getMove(set.moves[1]).type, this.getMove(set.moves[2]).type][this.random(3)];
				set.item = {'Grass': 'Grassium Z', 'Fire': 'Firium Z', 'Water': 'Waterium Z', 'Ice': 'Icium Z', 'Flying': 'Flyinium Z'}[type];
			}
			team.push(set);
		}
		return team;
	}
}

module.exports = RandomStaffBrosTestTeams;
