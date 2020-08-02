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
		name: "Rare Bone",
		onModifyAtk(atk, source) {
			return this.chainModify(1.5);
		},
		onModifyDef(def, source) {
			return this.chainModify(1.5);
		},
		onModifySpd(spd, source) {
			return this.chainModify(1.5);
		}
	},
};
