'use strict';

/**@type {{[k: string]: ModdedItemData}} */
let BattleItems = {
	// Aeonic
	noseiumz: {
		id: "noseiumz",
		name: "Noseium Z",
		isNonstandard: "Custom",
		onTakeItem: false,
		zMove: "Shitpost",
		zMoveFrom: "Fissure",
		zMoveUser: ["Nosepass"],
		gen: 7,
		desc: "If held by a Nosepass with Fissure, it can use Shitpost.",
	},
	// E4 Flint
	magmarizer: {
		inherit: true,
		megaStone: "Steelix-Mega",
		megaEvolves: "Steelix",
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		fling: undefined, // Cannot be flung now since its a mega stone
		desc: "If held by a Steelix, this item allows it to Mega Evolve in battle.",
	},
	// FOMG
	astleyiumz: {
		id: "astleyiumz",
		name: "Astleyium Z",
		isNonstandard: "Custom",
		onTakeItem: false,
		zMove: "Rickrollout",
		zMoveFrom: "Rock Slide",
		zMoveUser: ["Golem"],
		gen: 7,
		desc: "If held by a Golem with Rock Slide, it can use Rickrollout.",
	},
	// Kris
	thunderstone: {
		inherit: true,
		// @ts-ignore
		megaStone: ["Rotom-Wash", "Rotom-Mow", "Rotom-Heat", "Rotom-Frost", "Rotom-Fan"],
		megaEvolves: "Rotom",
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		fling: undefined, // Cannot be flung now since its a mega stone
		desc: "If held by a Rotom, this item allows it to Mega Evolve in battle.",
	},
	// MajorBowman
	victiniumz: {
		id: "victiniumz",
		name: "Victinium Z",
		isNonstandard: "Custom",
		onTakeItem: false,
		zMove: "Blaze of Glory",
		zMoveFrom: "V-create",
		zMoveUser: ["Victini"],
		gen: 7,
		desc: "If held by a Victini with V-create, it can use Blaze of Glory.",
	},
	// Pohjis
	marowakiumz: {
		id: "marowakiumz",
		name: "Marowakium Z",
		isNonstandard: "Custom",
		onTakeItem: false,
		zMove: "Great Eqake",
		zMoveFrom: "Earthquake",
		zMoveUser: ["Marowak"],
		gen: 7,
		desc: "If held by a Marowak with Earthquake, it can use Great Eqake.",
	},
	// SamJo
	thicciniumz: {
		id: "thicciniumz",
		name: "Thiccinium Z",
		isNonstandard: "Custom",
		onTakeItem: false,
		zMove: "Extra T h i c c",
		zMoveFrom: "Thicc",
		zMoveUser: ["Mamoswine"],
		gen: 7,
		desc: "If held by a Mamoswine with Thicc, it can use Extra T h i c c.",
	},
	// Snaquaza
	fakeclaimiumz: {
		id: "fakeclaimiumz",
		name: "Fakeclaimium Z",
		isNonstandard: "Custom",
		onTakeItem: false,
		zMove: "Fake Claim",
		// @ts-ignore hack for Snaquaza's Z move.
		zMoveFrom: ["Brave Bird", "Superpower", "Sucker Punch", "Flamethrower", "Ice Beam", "Thunderbolt"],
		zMoveUser: ["Honchkrow"],
		gen: 7,
		desc: "If held by a Honchkrow, it can use Fake Claim.",
	},
	// SunGodVolcarona
	volcaroniumz: {
		id: "volcaroniumz",
		name: "Volcaronium Z",
		isNonstandard: "Custom",
		onTakeItem: false,
		zMove: "Scorching Global Vortex",
		zMoveFrom: "Fiery Dance",
		zMoveUser: ["Volcarona"],
		gen: 7,
		desc: "If held by a Volcarona with Fiery Dance, it can use Scorching Global Vortex.",
	},
	// The Immortal
	buzzniumz: {
		id: "buzzniumz",
		name: "Buzznium Z",
		isNonstandard: "Custom",
		onTakeItem: false,
		zMove: "Ultra Succ",
		zMoveFrom: "Drain Punch",
		zMoveUser: ["Buzzwole"],
		gen: 7,
		desc: "If held by a Buzzwole with Drain Punch, it can use Ultra Succ.",
	},
	// Teclis
	darkrainiumz: {
		id: "darkrainiumz",
		name: "Darkrainium Z",
		isNonstandard: "Custom",
		onTakeItem: false,
		zMove: "Absolute Configuration",
		zMoveFrom: "Dark Void",
		zMoveUser: ["Darkrai"],
		gen: 7,
		desc: "If held by a Darkrai with Dark Void, it can use Absolute Configuration.",
	},
	// XpRienzo
	"charcoal": {
		inherit: true,
		zMove: "Bleh Flame",
		zMoveFrom: "Blue Flare",
		zMoveUser: ["Reshiram"],
		desc: "Holder's Fire-type attacks have 1.2x power. If held by a Reshiram with Blue Flare, it can use Bleh Flame.",
	},
};

exports.BattleItems = BattleItems;
