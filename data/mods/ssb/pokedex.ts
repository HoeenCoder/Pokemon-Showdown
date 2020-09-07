export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	/*
	// Example
	id: {
		inherit: true, // Always use this, makes the pokemon inherit its default values from the parent mod (gen7)
		baseStats: {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100}, // the base stats for the pokemon
	},
	*/
	// Aelita
	zygardecomplete: {
		inherit: true,
		abilities: {0: 'Scyphozoa'},
	},
	// aegii
	aegislash: {
		inherit: true,
		abilities: {0: 'New Stage'},
	},
	aegislashblade: {
		inherit: true,
		abilities: {0: 'New Stage'},
	},
	// Aeonic
	nosepass: {
		inherit: true,
		baseStats: {hp: 70, atk: 85, def: 135, spa: 45, spd: 90, spe: 70},
	},
	// Aethernum
	lotad: {
		inherit: true,
		baseStats: {hp: 40, atk: 70, def: 70, spa: 80, spd: 90, spe: 70},
	},
	// Annika
	mewtwomegay: {
		inherit: true,
		abilities: {0: "Overprotective"},
	},
	// A Quag To The Past
	quagsire: {
		inherit: true,
		baseStats: {hp: 95, atk: 65, def: 85, spa: 65, spd: 85, spe: 35},
	},
	// a random duck
	ducklett: {
		inherit: true,
		baseStats: {hp: 62, atk: 88, def: 100, spa: 44, spd: 100, spe: 110},
	},
	// Elgino
	celebi: {
		inherit: true,
		types: ['Grass', 'Fairy'],
	},
	// EpicNikolai
	garchompmega: {
		inherit: true,
		abilities: {0: "Dragon Heart"},
		types: ['Dragon', 'Fire'],
	},
	// Felucia
	uxie: {
		inherit: true,
		types: ["Psychic", "Normal"],
	},
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
	// GMars
	minior: {
		inherit: true,
		abilities: {0: "Capsule Armor"},
	},
	miniorviolet: {
		inherit: true,
		abilities: {0: "Capsule Armor"},
	},
	miniorindigo: {
		inherit: true,
		abilities: {0: "Capsule Armor"},
	},
	miniorblue: {
		inherit: true,
		abilities: {0: "Capsule Armor"},
	},
	miniorgreen: {
		inherit: true,
		abilities: {0: "Capsule Armor"},
	},
	minioryellow: {
		inherit: true,
		abilities: {0: "Capsule Armor"},
	},
	miniororange: {
		inherit: true,
		abilities: {0: "Capsule Armor"},
	},
	miniormeteor: {
		inherit: true,
		abilities: {0: "Capsule Armor"},
	},
	// Hydro
	pichu: {
		inherit: true,
		types: ["Electric", "Water"],
		baseStats: {hp: 20, atk: 80, def: 55, spa: 75, spd: 75, spe: 100},
	},
	// Kaiju Bunny
	lopunnymega: {
		inherit: true,
		abilities: {0: 'Second Wind'},
		types: ['Normal', 'Fairy'],
	},
	// Kris
	unown: {
		inherit: true,
		baseStats: {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100},
		// For reverting back to an Unown forme
		abilities: {0: 'Protean'},
	},
	// Lamp
	lampent: {
		inherit: true,
		baseStats: {hp: 60, atk: 80, def: 100, spa: 135, spd: 100, spe: 95},
	},
	// Morfent
	banette: {
		inherit: true,
		types: ["Ghost", "Normal"],
	},
	// Overneat
	absolmega: {
		inherit: true,
		abilities: {0: 'Darkest Wings'},
		types: ['Dark', 'Fairy'],
	},
	// quadrophenic
	porygon: {
		inherit: true,
		baseStats: {hp: 85, atk: 80, def: 90, spa: 105, spd: 95, spe: 60},
	},
	// Rach
	spinda: {
		inherit: true,
		baseStats: {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100},
	},
	// Raj.Shoot
	swampertmega: {
		inherit: true,
		abilities: {0: "Sap Sipper"},
	},
	// Robb576
	necrozmadawnwings: {
		inherit: true,
		abilities: {0: "The Numbers Game"},
	},
	necrozmaduskmane: {
		inherit: true,
		abilities: {0: "The Numbers Game"},
	},
	necrozmaultra: {
		inherit: true,
		abilities: {0: "The Numbers Game"},
	},
	// Strucni
	aggronmega: {
		inherit: true,
		abilities: {0: "Overasked Clause"},
	},
	// tennisace
	yamper: {
		inherit: true,
		baseStats: {hp: 69, atk: 125, def: 75, spa: 45, spd: 75, spe: 101},
	},
	// tIKsi
	alcremie: {
		inherit: true,
		abilities: {0: 'Fickle Decorator'},
	},
	alcremielemoncream: {
		inherit: true,
		abilities: {0: 'Winding Song'},
		baseStats: {hp: 65, atk: 60, def: 121, spa: 75, spd: 64, spe: 110},
		types: ['Fairy', 'Rock'],
	},
	alcremierubyswirl: {
		inherit: true,
		abilities: {0: 'Winding Song'},
		baseStats: {hp: 65, atk: 60, def: 64, spa: 110, spd: 75, spe: 121},
		types: ['Fairy', 'Fire'],
	},
	alcremiemintcream: {
		inherit: true,
		abilities: {0: 'Winding Song'},
		baseStats: {hp: 65, atk: 60, def: 75, spa: 110, spd: 121, spe: 64},
		types: ['Fairy', 'Water'],
	},
	// yuki
	pikachucosplay: {
		inherit: true,
		baseStats: {hp: 60, atk: 85, def: 50, spa: 95, spd: 85, spe: 110},
		abilities: {0: "Combat Training"},
	},
	pikachuphd: {
		inherit: true,
		baseStats: {hp: 60, atk: 85, def: 50, spa: 95, spd: 85, spe: 110},
		abilities: {0: "Triage"},
	},
	pikachulibre: {
		inherit: true,
		baseStats: {hp: 60, atk: 85, def: 50, spa: 95, spd: 85, spe: 110},
		abilities: {0: "White Smoke"},
	},
	pikachupopstar: {
		inherit: true,
		baseStats: {hp: 60, atk: 85, def: 50, spa: 95, spd: 85, spe: 110},
		abilities: {0: "Dancer"},
	},
	pikachurockstar: {
		inherit: true,
		baseStats: {hp: 60, atk: 85, def: 50, spa: 95, spd: 85, spe: 110},
		abilities: {0: "Punk Rock"},
	},
	pikachubelle: {
		inherit: true,
		baseStats: {hp: 60, atk: 85, def: 50, spa: 95, spd: 85, spe: 110},
		abilities: {0: "Tangled Feet"},
	},
	// Zalm
	weedle: {
		inherit: true,
		baseStats: {hp: 100, atk: 35, def: 100, spa: 90, spd: 90, spe: 100},
	},
	// Zarel
	meloetta: {
		inherit: true,
		abilities: {0: "Dancer"},
	},
	meloettapirouette: {
		inherit: true,
		abilities: {0: "Serene Grace"},
	},
};
