export const BattleItems: {[k: string]: ModdedItemData} = {
	// Alpha
	caioniumz: {
		name: "Caionium Z",
		isNonstandard: "Custom",
		onTakeItem: false,
		zMove: "Blistering Ice Age",
		zMoveFrom: "Blizzard",
		itemUser: ["Aurorus"],
		gen: 8,
		desc: "If held by an Aurorus with Blizzard, it can use Blistering Ice Age.",
	},

	// frostyicelad ❆
	icestone: {
		inherit: true,
		megaStone: "Frosmoth-Mega",
		megaEvolves: "Frosmoth",
		itemUser: ["Frosmoth"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		fling: undefined,
		shortDesc: "If held by an Frosmoth, this item allows it to Mega Evolve in battle.",
	},

	// phiwings99
	boatiumz: {
		name: "Boatium Z",
		isNonstandard: "Custom",
		onTakeItem: false,
		zMove: "Ghost of 1v1 Past",
		zMoveFrom: "Moongeist Beam",
		itemUser: ["Froslass"],
		gen: 8,
		desc: "If held by a Froslass with Moongeist Beam, it can use Ghost of 1v1 Past.",
	},
	// Custom support for Perish Song's ability (Snowstorm)
	safetygoggles: {
		inherit: true,
		onImmunity(type, pokemon) {
			if (['sandstorm', 'hail', 'snowstorm', 'powder'].includes(type)) return false;
		},
		desc: "Holder is immune to powder moves and damage from Sandstorm, Hail, and Snowstorm.",
	},
};
