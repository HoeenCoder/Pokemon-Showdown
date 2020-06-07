export const BattlePokedex: {[k: string]: ModdedSpeciesData} = {
	/*
	// Example
	id: {
		inherit: true, // Always use this, makes the pokemon inherit its default values from the parent mod (gen7)
		baseStats: {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100}, // the base stats for the pokemon
	},
	*/

	// Frostyicelad
	frosmoth: {
		inherit: true,
		otherFormes: ["Frosmoth-Mega"],
		formeOrder: ["Frosmoth", "Frosmoth-Mega"],
	},
	frosmothmega: {
		num: 873,
		name: "Frosmoth-Mega",
		baseSpecies: "Frosmoth",
		forme: "Mega",
		types: ["Ice", "Bug"],
		baseStats: {hp: 70, atk: 75, def: 100, spa: 130, spd: 100, spe: 100},
		abilities: {0: "Punk Rock"},
		heightm: 1.3,
		weightkg: 42,
		color: "White",
		eggGroups: ["Bug"],
		requiredItem: "Ice Stone",
	},

	// Kris
	unown: {
		inherit: true,
		baseStats: {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100},
		// For reverting back to an Unown forme
		abilities: {0: 'Protean'},
	},
	// OM~!
	magneton: {
		inherit: true,
		types: ['Electric', 'Steel', 'Flying'],
	},
	// Overneat
	absolmega: {
		inherit: true,
		abilities: {0: 'Darkest Wings'},
		types: ['Dark', 'Fairy'],
	},
	// Perish Song
	mismagius: {
		inherit: true,
		types: ["Ghost", "Ice"],
	},
};
