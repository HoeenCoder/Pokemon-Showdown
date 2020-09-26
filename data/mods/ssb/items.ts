export const Items: {[k: string]: ModdedItemData} = {
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

	// A Quag To The Past
	quagniumz: {
		name: "Quagnium Z",
		isNonstandard: "Custom",
		onTakeItem: false,
		zMove: "Bounty Place",
		zMoveFrom: "Scorching Sands",
		itemUser: ["Quagsire"],
		gen: 8,
		desc: "If held by a Quagsire with Scorching Sands, it can use Bounty Place.",
	},

	// Kalalokki
	kalalokkiumz: {
		name: "Kalalokkium Z",
		isNonstandard: "Custom",
		onTakeItem: false,
		zMove: "Gaelstrom",
		zMoveFrom: "Blackbird",
		itemUser: ["Wingull"],
		gen: 8,
		desc: "If held by a Wingull with Blackbird, it can use Gaelstrom.",
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

	// Robb576
	modium6z: {
		name: "Modium-6 Z",
		isNonstandard: "Custom",
		onTakeItem: false,
		zMove: "Integer Overflow",
		zMoveFrom: "Photon Geyser",
		itemUser: ["Necrozma-Ultra"],
		gen: 8,
		desc: "If held by a Robb576 with Photon Geyser, it can use Integer Overflow.",
	},

	// xJoelituh
	rarebone: {
		inherit: true,
		onModifyAtkPriority: 2,
		onModifyAtk() {
			return this.chainModify(1.5);
		},
		onModifyDefPriority: 2,
		onModifyDef() {
			return this.chainModify(1.5);
		},
		onModifySpDPriority: 2,
		onModifySpD() {
			return this.chainModify(1.5);
		},
		desc: "1.5x to Attack, Defense, and Special Defense.",
	},
};
