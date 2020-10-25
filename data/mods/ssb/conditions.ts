import {FS} from '../../../lib/fs';
import {toID} from '../../../sim/dex-data';

// Used in many abilities, placed here to reduce the number of updates needed and to reduce the chance of errors
const STRONG_WEATHERS = ['desolateland', 'primordialsea', 'deltastream', 'heavyhailstorm', 'winterhail'];

// Similar to User.usergroups. Cannot import here due to users.ts requiring Chat
// This also acts as a cache, meaning ranks will only update when a hotpatch/restart occurs
const usergroups: {[userid: string]: string} = {};
const usergroupData = FS('config/usergroups.csv').readIfExistsSync().split('\n');
for (const row of usergroupData) {
	if (!toID(row)) continue;

	const cells = row.split(',');
	usergroups[toID(cells[0])] = cells[1] || ' ';
}

export function getName(name: string): string {
	const userid = toID(name);
	if (!userid) throw new Error('No/Invalid name passed to getSymbol');

	const group = usergroups[userid] || ' ';
	return group + name;
}

export const Conditions: {[k: string]: ModdedConditionData} = {
	/*
	// Example:
	userid: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Username')}|Switch In Message`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Username')}|Switch Out Message`);
		},
		onFaint() {
			this.add(`c|${getName('Username')}|Faint Message`);
		},
		// Innate effects go here
	},
	IMPORTANT: Obtain the username from getName
	*/
	// Please keep statuses organized alphabetically based on staff member name!
	abdelrahman: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Abdelrahman')}|good morning, i'm town`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Abdelrahman')}|brb gonna go lynch scum`);
		},
		onFaint() {
			this.add(`c|${getName('Abdelrahman')}|I CC COP TOWN FAILED`);
		},
	},
	adri: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Adri')}|This time will definitely be the one !`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Adri')}|//afk`);
		},
		onFaint() {
			this.add(`c|${getName('Adri')}|Until next time...`);
		},
	},
	aelita: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Aelita')}|The Scyphozoa's absorbing Aelita's memories!`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Aelita')}|We scared it away but it will be back. We can't let it get ahold of Aelita's memories.`);
		},
		onFaint() {
			this.add(`c|${getName('Aelita')}|X.A.N.A. is finally finished for good.`);
		},
	},
	aegii: {
		noCopy: true,
		onStart(source) {
			this.add(`c|${getName('aegii')}|${[`stream fiesta!!! https://youtu.be/eDEFolvLn0A`, `stream more&more!!! https://youtu.be/mH0_XpSHkZo`, `stream wannabe!!! https://youtu.be/fE2h3lGlOsk`, `stream love bomb!!! https://youtu.be/-SK6cvkK4c0`][this.random(4)]}`);
			source.m.swapSets = function (random: boolean) {
				const sets = [["Shadow Ball", "Flash Cannon", "Shadow Sneak", "Reset"],
					["Shadow Claw", "Iron Head", "Shadow Sneak", "Reset"]];
				const pp = source.moveSlots.map(move => {
					return move.pp / move.maxpp;
				});
				let num = 0;
				if (random) {
					num = source.battle.random(2); // randomize
				} else if (source.m.curSet === "Special") {
					num = 1; // change to Physical
				}
				source.moveSlots = [];
				let u = 0;
				for (const newMove of sets[num]) {
					const move = source.battle.dex.getMove(source.battle.toID(newMove));
					source.moveSlots.push({
						move: move.name,
						id: move.id,
						pp: Math.floor(move.pp * pp[u] * 1.6),
						maxpp: move.pp * 1.6,
						target: move.target,
						disabled: false,
						disabledSource: '',
						used: false,
					});
					u++;
				}
				if (num) {
					source.m.curSet = "Physical";
				} else {
					source.m.curSet = "Special";
				}
				source.battle.add('-message', `${source.side.name}'s aegii currently has a ${source.m.curSet} attacking set.`);
			};
		},
		onSwitchOut() {
			this.add(`c|${getName('aegii')}|${[`brb, buying albums`, `brb, buying albums`, `brb, streaming mvs`, `brb, learning choreos`][this.random(4)]}`);
		},
		onFaint() {
			this.add(`c|${getName('aegii')}|i forgot to stan loona...`);
		},
	},
	aeonic: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Aeonic')}|What's bonkin?`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Aeonic')}|I am thou, thou art I`);
		},
		onFaint() {
			this.add(`c|${getName('Aeonic')}|Guys the emoji movie wasn't __that bad__`);
		},
	},
	aethernum: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Aethernum')}|Hlelo ^_^ Lotad is so cute, don't you think? But don't underestimate him!`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Aethernum')}|Sinking in this sea of possibilities for now...but i'll float back once again!`);
		},
		onFaint() {
			this.add(`c|${getName('Aethernum')}|Ok, ok, i have procrastinated enough here, time to go ^_^' See ya around!`);
		},
	},
	akir: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Akir')}|hey whats up`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Akir')}|let me get back to you`);
		},
		onFaint() {
			this.add(`c|${getName('Akir')}|ah well maybe next time`);
		},
	},
	alpha: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Alpha')}|eccomi dimmi`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Alpha')}|FRATM FACI FRIDDU`);
		},
		onFaint() {
			this.add(`c|${getName('Alpha')}|caio`);
		},
	},
	andrew: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Andrew')}|SQUAD IN`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Andrew')}|SQUAD OUT`);
		},
		onFaint() {
			this.add(`c|${getName('Andrew')}|Dormammu I've come to bargain`);
		},
	},
	annika: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Annika')}|The circumstances of one's birth are irrelevant; it is what you do with the gift of life that determines who you are.`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Annika')}|I'll be stronger when I'm back ^_^`);
		},
		onFaint() {
			this.add(`c|${getName('Annika')}|oh, I crashed the server again...`);
		},
	},
	aquagtothepast: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('A Quag To The Past')}|Whatever happens, happens.`);
		},
		onSwitchOut() {
			this.add(`c|${getName('A Quag To The Past')}|See you space cowboy...`);
		},
		onFaint() {
			this.add(`c|${getName('A Quag To The Past')}|You're gonna carry that weight.`);
		},
	},
	arandomduck: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('a random duck')}|Hey! Got any grapes??`);
		},
		onFaint() {
			this.add(`c|${getName('a random duck')}|and he waddled away... bum bum bum`);
		},
	},
	archastl: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('ArchasTL')}|Ready the main batteries, gentlemen! Hit ‘em hard and fast!`);
		},
		onSwitchOut() {
			this.add(`c|${getName('ArchasTL')}|Helmsman, full reverse at speed!`);
		},
		onFaint() {
			this.add(`c|${getName('ArchasTL')}|They say the captain always goes down with the ship...`);
		},
		onSwitchIn(pokemon) {
			if (pokemon.illusion) return;
			if (!pokemon.m.indomitableActivated) pokemon.m.indomitableActivated = false;
		},
	},
	arcticblast: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Arcticblast')}|words are difficult`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Arcticblast')}|oh no`);
		},
		onFaint() {
			if (this.randomChance(1, 100)) {
				this.add(`c|${getName('Arcticblast')}|get **mished** kid`);
			} else {
				this.add(`c|${getName('Arcticblast')}|single battles are bad anyway, why am I here?`);
			}
		},
	},
	averardo: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Averardo')}|o bella`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Averardo')}|Condivido schermo cosi' guardiamo i tre porcellini?`);
		},
		onFaint() {
			this.add(`c|${getName('Averardo')}|BE... Ok mejo chiudere gioco... vedo documentario su Bibbia`);
		},
	},
	awauser: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('awa!')}|awa!`);
		},
		onSwitchOut() {
			this.add(`c|${getName('awa!')}|well, at least i didn't lose the game`);
			this.add(`c|${getName('awa!')}|or did i?`);
		},
		onFaint() {
			this.add(`c|${getName('awa!')}|awawa?! awa awawawa awawa >:(`);
		},
	},
	beowulf: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Beowulf')}|:^)`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Beowulf')}|/me buzzes`);
		},
		onFaint() {
			this.add(`c|${getName('Beowulf')}|time for my own isekai`);
		},
		onSourceFaint() {
			this.add(`c|${getName('Beowulf')}|another one reincarnating into an isekai`);
		},
	},
	biggie: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('biggie')}|gonna take you for a ride`);
		},
		onSwitchOut() {
			this.add(`c|${getName('biggie')}|mahvel baybee!`);
		},
		onFaint() {
			this.add(`c|${getName('biggie')}|it was all a dream`);
		},
	},
	blaz: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Blaz')}|Give me, give me, give me the truth now oh oh oh oh`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Blaz')}|Tell me... why? Please tell me why do we worry? Why? Why do we worry at all?`);
		},
		onFaint() {
			this.add(`c|${getName('Blaz')}|the game (lol u lost)`);
		},
	},
	brandon: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Brandon')}|I didn't come here to play. I came here to slay!`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Brandon')}|${[`I need to catch my breath`, `brb getting a snack`][this.random(2)]}`);
		},
		onFaint(target) {
			const foeName = target.side.foe.active[0].illusion ?
				target.side.foe.active[0].illusion.name : target.side.foe.active[0].name;
			this.add(`c|${getName('Brandon')}|${[`This battle was rigga morris!`, `At least I'll snag Miss Congeniality...`, `This battle was rigged for ${foeName} anyway >:(`][this.random(3)]}`);
		},
	},
	brouha: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('brouha')}|lmf`);
		},
		onSwitchOut() {
			this.add(`c|${getName('brouha')}|....`);
		},
		onFaint() {
			this.add(`c|${getName('brouha')}|sobL`);
		},
	},
	cake: {
		noCopy: true,
		onStart(target, pokemon) {
			this.add(`c|${getName('Cake')}|AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`);
			// h innate
			if (pokemon.illusion) return;
			const typeList = Object.keys(this.dex.data.TypeChart);
			this.prng.shuffle(typeList);
			const firstType = typeList[0];
			this.prng.shuffle(typeList);
			const secondType = typeList[0];
			let newTypes = [];
			if (firstType === secondType) {
				newTypes = [firstType];
			} else {
				newTypes = [firstType, secondType];
			}
			this.add('html|<b>h</b>');
			this.add('-start', pokemon, 'typechange', newTypes.join('/'), '[silent]');
			pokemon.setType(newTypes);
		},
		onSwitchOut(pokemon) {
			this.add(`c|${getName('Cake')}|${pokemon.side.name} is a nerd`);
		},
		onFaint() {
			this.add(`c|${getName('Cake')}|Chowder was a good show`);
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.illusion) return;
			if (pokemon.activeTurns) {
				const typeList = Object.keys(this.dex.data.TypeChart);
				this.prng.shuffle(typeList);
				const firstType = typeList[0];
				this.prng.shuffle(typeList);
				const secondType = typeList[0];
				let newTypes = [];
				if (firstType === secondType) {
					newTypes = [firstType];
				} else {
					newTypes = [firstType, secondType];
				}
				this.add('html|<b>h</b>');
				this.add('-start', pokemon, 'typechange', newTypes.join('/'), '[silent]');
				pokemon.setType(newTypes);
			}
		},
	},
	cantsay: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('cant say')}|haha volc go brrrr`);
		},
		onSwitchOut() {
			this.add(`c|${getName('cant say')}|lol CTed`);
		},
		onFaint() {
			this.add(`c|${getName('cant say')}|${['imagine taking pokemon seriously when you can just get haxed', '/me plays curb your enthusiasm theme', 'bad players always get lucky'][this.random(3)]}`);
		},
		// Magic Guard Innate
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
	},
	celestial: {
		noCopy: true,
		// No quotes requested
	},
	celine: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Celine')}|Support has arrived!`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Celine')}|Brb writing`);
		},
		onFaint() {
			this.add(`c|${getName('Celine')}|'Tis only a flesh wound!`);
		},
	},
	ckilgannon: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('c.kilgannon')}|Take a look to the sky just before you die`);
		},
		onSwitchOut() {
			this.add(`c|${getName('c.kilgannon')}|Death does wait; there's no debate.`);
		},
		onFaint() {
			this.add(`c|${getName('c.kilgannon')}|Memento mori.`);
		},
	},
	coconut: {
		noCopy: true,
		// no quotes
	},
	drampasgrandpa: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('drampa\'s grandpa')}|Where are my glasses?`);
		},
		onSwitchOut() {
			this.add(`c|${getName('drampa\'s grandpa')}|Darn kids...`);
		},
		onFaint() {
			this.add(`c|${getName('drampa\'s grandpa')}|Bah humbug!`);
		},
	},
	dream: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('dream')}|It's Prime Time`);
		},
		onSwitchOut() {
			this.add(`c|${getName('dream')}|oh no please god tell me we're dreaming`);
		},
		onFaint() {
			this.add(`c|${getName('dream')}|perdemos`);
		},
	},
	elgino: {
		noCopy: true,
		onStart(target, pokemon) {
			this.add(`c|${getName('Elgino')}|Time to save Hyrule!`);
			if (pokemon.illusion) return;
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
		onSwitchOut() {
			this.add(`c|${getName('Elgino')}|Hold on I need to stock up on ${this.sample(['Bombs', 'Arrows', 'Magic', 'Seeds'])}`);
		},
		onFaint() {
			this.add(`c|${getName('Elgino')}|I'm out of fairies D:!`);
		},
	},
	emeri: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Emeri')}|hey !`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Emeri')}|//busy`);
		},
		onFaint() {
			this.add(`c|${getName('Emeri')}|don't forget to chall SFG or Agarica in gen8ou`);
		},
	},
	epicnikolai: {
		noCopy: true,
		onStart(source) {
			this.add(`c|${getName('EpicNikolai')}|I never give up until I get something right, which means destroying you ☜(ﾟヮﾟ☜)`);
			if (source.species.id !== 'garchompmega' || source.illusion) return;
			this.add('-start', source, 'typechange', source.types.join('/'), '[silent]');
		},
		onSwitchOut() {
			this.add(`c|${getName('EpicNikolai')}|This wasn't as fun as I thought it would be, I'm out ¯_( ͡~ ͜ʖ ͡°)_/¯`); // eslint-disable-line no-irregular-whitespace
		},
		onFaint() {
			this.add(`c|${getName('EpicNikolai')}|I like to keep a positive attitude even though it is hard sometimes <('o'<)~*/`);
		},
	},
	estarossa: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('estarossa')}|honestly best pairing for hazard coverage wtih molt is like molt + tsareena/dhelmise`);
		},
		onSwitchOut() {
			this.add(`c|${getName('estarossa')}|sand balance <333`);
		},
		onFaint() {
			this.add(`c|${getName('estarossa')}|*eurgh*`);
		},
	},
	explodingdaisies: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('explodingdaisies')}|Turn and run now, and I will mercifully pretend this never happened.`);
		},
		onSwitchOut() {
			this.add(`c|${getName('explodingdaisies')}|You are beneath me, and it shows.`);
		},
		onFaint() {
			this.add(`c|${getName('explodingdaisies')}|Unacceptable!`);
		},
	},
	fart: {
		noCopy: true,
		onStart(source) {
			let activeMon;
			activeMon = source.side.foe.active[0];
			activeMon = activeMon.illusion ? activeMon.illusion.name : activeMon.name;
			const family = ['aethernum', 'trickster', 'celestial', 'gimmick', 'zalm', 'aelita', 'biggie'];
			if (this.toID(activeMon) === 'hoeenhero') {
				this.add(`c|${getName('fart')}|🎵 it's friday, friday, gotta get down on friday 🎵`);
			} else if (this.toID(activeMon) === 'grimauxiliatrix') {
				this.add(`c|${getName('fart')}|howdy ho, neighbor`);
			} else if (this.toID(activeMon) === 'fart') {
				this.add(`c|${getName('fart')}|How Can Mirrors Be Real If Our Eyes Aren't Real`);
			} else if (family.includes(this.toID(activeMon))) {
				this.add(`c|${getName('fart')}|hey, hey, hey. ${activeMon} is OK`);
			} else {
				this.add(`c|${getName('fart')}|rats, rats, we are the rats`);
			}
		},
		onSwitchOut() {
			this.add(`c|${getName('fart')}|if I can't win this game, then I'll make it boring for everyone.`);
		},
		onFaint(pokemon) {
			let activeMon;
			activeMon = pokemon.side.foe.active[0];
			activeMon = this.toID(activeMon.illusion ? activeMon.illusion.name : activeMon.name);
			const family = ['aethernum', 'trickster', 'celestial', 'gimmick', 'zalm', 'aelita', 'biggie'];
			if (family.includes(activeMon)) {
				this.add(`c|${getName('fart')}|at least I wasn't boring, right?`);
			} else {
				this.add(`c|${getName('fart')}|oy, I die`);
			}
		},
	},
	felucia: {
		noCopy: true,
		onStart(source) {
			this.add(`c|${getName('Felucia')}|battlesignup! I dropped my dice somewhere and now all I can do is make you play with them (join using %join one)`);
			if (source.illusion) return;
			this.add('-start', source, 'typechange', source.types.join('/'), '[silent]');
		},
		onSwitchOut() {
			this.add(`c|${getName('Felucia')}|battlesignup: I lost connection to a player so I guess I'll get a new one (/me in to sub)`);
		},
		onFaint() {
			this.add(`c|${getName('Felucia')}|%remp Felucia`);
		},
	},
	finland: {
		noCopy: true,
		onStart(pokemon) {
			const roll = this.random(20);
			let message: string;
			if (roll >= 0 && roll < 14) {
				message = 'pog';
			} else if (roll >= 14 && roll < 16) {
				message = 'very pog';
			} else if (roll >= 16 && roll < 18) {
				message = 'poggaroo';
			} else if (roll === 18) {
				message = 'PogU';
			} else {
				message = 'poog';
			}
			this.add(`c|${getName('Finland')}|${message}`);
			// to avoid writing this function everywhere, im just gonna write it here and call it from wherever i want like the move or ability
			pokemon.m.formes = [
				{
					name: 'Alcremie',
					species: 'Alcremie',
					movepool: ['Shore Up', 'Moonblast', ['Infestation', 'Whirlwind'], 'Cradily Chaos'],
				},
				{
					name: 'Alcremie-Tsikhe',
					species: 'Alcremie-Lemon-Cream',
					movepool: ['Shore Up', 'Spiky Shield', ['Reflect', 'Light Screen'], 'Cradily Chaos'],
				},
				{
					name: 'Alcremie-Nezavisa',
					species: 'Alcremie-Ruby-Swirl',
					movepool: ['Lava Plume', 'Scorching Sands', ['Refresh', 'Destiny Bond'], 'Cradily Chaos'],
				},
				{
					name: 'Alcremie-Järvilaulu',
					species: 'Alcremie-Mind-Cream',
					movepool: ['Sticky Web', 'Parting Shot', ['Light of Ruin', 'Sparkling Aria'], 'Cradily Chaos'],
				},
			],
			pokemon.m.changeForme = (context: Battle, formeNumber: number) => {
				const forme = Object.assign({}, pokemon.m.formes[formeNumber]);
				forme.movepool[2] = Object.assign([], forme.movepool[2])[this.random(2)];
				pokemon.formeChange(forme.species, context.effect);
				pokemon.m.formeNumber = formeNumber;
				pokemon.battle.add('-message', `Alcremie changes its forme to ${forme.name}`);
				const newMoves = forme.movepool;
				const carryOver = pokemon.moveSlots.slice().map(m => {
					return m.pp / m.maxpp;
				});
				// Incase theres ever less than 4 moves
				while (carryOver.length < 4) {
					carryOver.push(1);
				}
				pokemon.moveSlots = [];
				let slot = 0;
				for (const newMove of newMoves) {
					const moveData = pokemon.battle.dex.getMove(context.toID(newMove));
					if (!moveData.id) continue;
					pokemon.moveSlots.push({
						move: moveData.name,
						id: moveData.id,
						pp: ((moveData.noPPBoosts || moveData.isZ) ? Math.floor(moveData.pp * carryOver[slot]) : moveData.pp * 8 / 5),
						maxpp: ((moveData.noPPBoosts || moveData.isZ) ? moveData.pp : moveData.pp * 8 / 5),
						target: moveData.target,
						disabled: false,
						disabledSource: '',
						used: false,
					});
					slot++;
				}
			};
		},
		onSwitchOut() {
			this.add(`c|${getName('Finland')}|i hope running away is safe on shield?`);
		},
		onFaint() {
			if (this.random(100) < 99) {
				this.add(`c|${getName('Finland')}|FINLAND!!!`);
			} else {
				// personally i like young link from oot3d and mm3d - sp
				this.add(`c|${getName('Finland')}|i hate young link. i hate you i hate you i hate you. i hate you. young link i hate you. i despise you. i loathe you. your existence is an affront to my person. to my own existence. it's an offense. a despicable crime. a wretched abomination. even worse than mega man. a cruel barbarity. an awful curse from capricious, pernicious fate. oh do i hate young link. i scorn you. i cast you away to ignominy and hatred even worse than mega man. you are shameful young link, and you should never show your face again`);
			}
		},
	},
	frostyicelad: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('frostyicelad ❆')}|Oh i guess its my turn now! Time to sweep!`);
		},
		onSwitchOut(source) {
			this.add(`c|${getName('frostyicelad ❆')}|Hey! ${source.side.name} why dont you keep me in and let me sweep? Mean.`);
		},
		onFaint() {
			this.add(`c|${getName('frostyicelad ❆')}|So c-c-cold`);
		},
	},
	gallantspear: {
		noCopy: true,
		onStart(source) {
			this.add(`c|${getName('gallant\'s pear')}|**Rejoice! The one to inherit all Rider powers, the time king who will rule over the past and the future.**`);
		},
		onSwitchOut(source) {
			this.add(`c|${getName('gallant\'s pear')}|My Overlord..`);
		},
		onFaint() {
			this.add(`c|${getName('gallant\'s pear')}|Damn you, Decade!!!`);
		},
	},
	gimmick: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Gimmick')}|Mama, they say I’m a TRRST`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Gimmick')}|Ic3peak to you later`);
		},
		onFaint() {
			this.add(`c|${getName('Gimmick')}|I did nothing wrong (but I got on the blacklist)`);
		},
	},
	gmars: {
		noCopy: true,
		onStart(pokemon) {
			this.add(`c|${getName('GMars')}|It's ya boy GEEEEEEEEMARS`);
		},
		onSwitchOut(source) {
			this.add(`c|${getName('GMars')}|Who switches out a Minior in prime position?`);
		},
		onFaint() {
			this.add(`c|${getName('GMars')}|Follow me on bandcamp`);
		},
		// Special Forme Effects
		onBeforeMove(pokemon) {
			if (pokemon.species.id === "miniorviolet") {
				this.add(`${getName("GMars")} is thinking...`);
				if (this.random(3) === 2) {
					this.add('cant', pokemon, 'ability: Truant');
					return false;
				}
			}
		},
		onSwitchIn(pokemon) {
			if (pokemon.species.id === 'miniorindigo') {
				this.boost({atk: 1, spa: 1}, pokemon.side.foe.active[0]);
			} else if (pokemon.species.id === 'miniorgreen') {
				this.boost({atk: 1}, pokemon);
			}
		},
		onBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (target.species.id !== 'miniorblue') return;
			let showMsg = false;
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: Minior-Blue", "[of] " + target);
			}
		},
		onFoeTryMove(target, source, move) {
			if (move.id === 'haze' && target.species.id === 'miniorblue') {
				move.onHitField = function (this: Battle) {
					this.add('-clearallboost');
					for (const pokemon of this.getAllActive()) {
						if (pokemon.species.id === 'miniorblue') continue;
						pokemon.clearBoosts();
					}
				}.bind(this);
				return;
			}
			if (!target.set.shiny && target.species.id !== 'minior') return;
			const targetAllExceptions = ['perishsong', 'flowershield', 'rototiller'];
			if (move.target === 'foeSide' || (move.target === 'all' && !targetAllExceptions.includes(move.id))) {
				return;
			}

			const dazzlingHolder = this.effectData.target;
			if ((source.side === dazzlingHolder.side || move.target === 'all') && move.priority > 0.1) {
				this.attrLastMove('[still]');
				this.add('cant', dazzlingHolder, 'ability: Minior-Shiny', move, '[of] ' + target);
				return false;
			}
		},
	},
	grimauxiliatrix: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('grimAuxiliatrix')}|${['THE JUICE IS LOOSE', 'TOOTHPASTE\'S OUT OF THE TUBE', 'PREPARE TO DISCORPORATE'][this.random(3)]}`);
		},
		onFaint() {
			this.add(`c|${getName('grimAuxiliatrix')}|${['NOT LIKE THIS', 'HALT - MODULE CORE HEMORRHAGE', 'AAAAAAAAAAAAAAAAAAA'][this.random(3)]}`);
		},
	},
	hoeenhero: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('HoeenHero')}|A storm is brewing...`);
		},
		onSwitchOut() {
			this.add(`c|${getName('HoeenHero')}|The eye of the hurricane provides a brief respite from the storm.`);
		},
		onFaint() {
			this.add(`c|${getName('HoeenHero')}|All storms eventually disipate.`);
		},
	},
	hubriz: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Hubriz')}|Free hugs!`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Hubriz')}|The soil's pH level is too high. I'm out!`);
		},
		onFaint() {
			this.add(`c|${getName('Hubriz')}|Delicate Flower Quest failed...`);
		},
	},
	hydro: {
		noCopy: true,
		onStart(pokemon) {
			this.add(`c|${getName('Hydro')}|Person reading this is a qt nerd and there is absolutely NOTHING u can do about it :)`);
			if (pokemon.illusion) return;
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
		onSwitchOut() {
			this.add(`c|${getName('Hydro')}|brb, taking a break from ur nerdiness`);
		},
		onFaint() {
			this.add(`c|${getName('Hydro')}|RUUUUUDEEE`);
		},
	},
	inactive: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Inactive')}|Are you my nightmare? Or am I yours?`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Inactive')}|This is not the end...`);
		},
		onFaint() {
			this.add(`c|${getName('Inactive')}|/me turns to stone and crumbles`);
		},
	},
	instructuser: {
		noCopy: true,
		onStart(pokemon) {
			pokemon.m.quote = this.random(5);
			switch (pokemon.m.quote) {
			case 0:
				this.add(`c|${getName('Instruct')}|My grandmomma had high hopes, I don't want to die bro`);
				break;
			case 1:
				this.add(`c|${getName('Instruct')}|One time just a little bit, I`);
				break;
			case 2:
				this.add(`c|${getName('Instruct')}|It's just me and this guitar, playing this song`);
				break;
			case 3:
				this.add(`c|${getName('Instruct')}|Did I really just forget that melody?`);
				break;
			default:
				this.add(`c|${getName('Instruct')}|Yeah, all you self-promoters are janky`);
				break;
			}
		},
		onSwitchOut(pokemon) {
			switch (pokemon.m.quote) {
			case 0:
				this.add(`c|${getName('Instruct')}|My demons keep me up, swear to God, I cannot get any sleep`);
				break;
			case 1:
				this.add(`c|${getName('Instruct')}|I haven't been the same since I lost my bro`);
				break;
			case 2:
				this.add(`c|${getName('Instruct')}|You can try stealing my heart, it's already gone`);
				break;
			case 3:
				this.add(`c|${getName('Instruct')}|I shine my wrist, it go like shashasha, shashasha`);
				break;
			default:
				this.add(`c|${getName('Instruct')}|No way out 'cause I'm already in it`);
				break;
			}
		},
		onFaint(pokemon) {
			switch (pokemon.m.quote) {
			case 0:
				this.add(`c|${getName('Instruct')}|Don't gamble with your life like a semi-game parlay`);
				break;
			case 1:
				this.add(`c|${getName('Instruct')}|I say I'm gonna change when I know I won't`);
				break;
			case 2:
				this.add(`c|${getName('Instruct')}|I don't even know where to start, I'm just done`);
				break;
			case 3:
				this.add(`c|${getName('Instruct')}|How I stride like that`);
				break;
			default:
				this.add(`c|${getName('Instruct')}|Costa Careyes, I got her kidnapped. She ain't sorry and I ain't sorry, it's too late for sorry.`);
				break;
			}
		},
		//  Innate
		onSourceHit(target, source, move) {
			if (source.illusion) return;
			if (!move || !target) return;
			if (target !== source && move.category !== 'Status') {
				if (move.flags['contact']) {
					if (!target.m.marked) this.add('-message', `${target.name} is afflicted with dread!`);
					target.m.marked = true;
				}
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (target.illusion) return;
			if (move.flags['contact']) {
				if (!source.m.marked) this.add('-message', `${source.name} is afflicted with dread!`);
				source.m.marked = true;
			}
			if (!target.hp) {
				this.add('-activate', target, 'ability: Enterfearence');
				for (const foe of source.side.pokemon) {
					if (foe.fainted || !foe.hp) continue;
					if (!foe.m.marked) continue;
					this.directDamage(this.clampIntRange(foe.hp / 2, 1), foe);
				}
			}
		},
	},
	iyarito: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Iyarito')}|Madre de Dios, ¡es el Pollo Diablo!`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Iyarito')}|Well, you're not taking me without a fight!`);
		},
		onFaint() {
			this.add(`c|${getName('Iyarito')}|RIP Patrona`);
		},
	},
	jett: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Jett')}|It's a good day for a hunt.`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Jett')}|I'll be back for more.`);
		},
		onFaint() {
			this.add(`c|${getName('Jett')}|They got lucky.`);
		},
	},
	jho: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Jho')}|Hey there party people`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Jho')}|The Terminator(1984), 00:57:10`);
		},
		onFaint() {
			this.add(`c|${getName('Jho')}|Unfortunately, CAP no longer accepts custom elements`);
		},
	},
	jordy: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Jordy')}|I heard there's a badge here. Please give it to me immediately.`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Jordy')}|Au Revoir. Was that right?`);
		},
		onFaint() {
			this.add(`c|${getName('Jordy')}|hjb`);
		},
	},
	kaijubunny: {
		noCopy: true,
		onStart(source) {
			this.add(`c|${getName('Kaiju Bunny')}|I heard SOMEONE wasn't getting enough affection! ￣( ÒㅅÓ)￣`);
			if (source.species.id !== 'lopunnymega' || source.illusion) return;
			this.add('-start', source, 'typechange', source.types.join('/'), '[silent]');
		},
		onSwitchOut() {
			this.add(`c|${getName('Kaiju Bunny')}|Brb, need more coffee ￣( =ㅅ=)￣`);
		},
		onFaint() {
			this.add(`c|${getName('Kaiju Bunny')}|Wow, okay, r00d ￣(ಥㅅಥ)￣`);
		},
	},
	kalalokki: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Kalalokki')}|(•_•)`);
			this.add(`c|${getName('Kalalokki')}|( •_•)>⌐■-■`);
			this.add(`c|${getName('Kalalokki')}|(⌐■_■)`);
		},
		onFaint() {
			this.add(`c|${getName('Kalalokki')}|(⌐■_■)`);
			this.add(`c|${getName('Kalalokki')}|( •_•)>⌐■-■`);
			this.add(`c|${getName('Kalalokki')}|(x_x)`);
		},
		onTryHit(pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[from] ability: Sturdy');
				return null;
			}
		},
		onDamagePriority: -100,
		onDamage(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Sturdy');
				return target.hp - 1;
			}
		},
	},
	kennedy: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Kennedy')}|up the reds`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Kennedy')}|brb Jayi is PMing me (again) -_-`);
		},
		onFaint() {
			this.add(`c|${getName('Kennedy')}|I'm not meant to score goals anyway, I'm a defensive striker.`);
		},
	},
	kev: {
		noCopy: true,
		onStart() {
			// this.add(`c|${getName('Kev')}|`);
		},
		onSwitchOut() {
			// this.add(`c|${getName('Kev')}|`);
		},
		onFaint() {
			// this.add(`c|${getName('Kev')}|`);
		},
	},
	kingbaruk: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Kingbaruk')}|:cute:`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Kingbaruk')}|//none`);
		},
		onFaint() {
			this.add(`c|${getName('Kingbaruk')}|Fijne avond nog`);
		},
	},
	kingswordyt: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('KingSwordYT')}|Mucho texto`);
		},
		onSwitchOut() {
			this.add(`c|${getName('KingSwordYT')}|Hasta la próximaaaa`);
		},
		onFaint() {
			this.add(`c|${getName('KingSwordYT')}|**__Se anula el host__**`);
		},
	},
	kipkluif: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Kipkluif')}|Please play LCUU, it's fun`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Kipkluif')}| /teleport`);
		},
		onFaint() {
			this.add(`c|${getName('Kipkluif')}|I've failed you.. I pray you hurry.. with those reinforcments.. you promised..`);
		},
	},
	kris: {
		name: "phuck",
		shortDesc: "Changes this Pokemon into another Unown forme at the end of every turn.",
		noCopy: true,
		onStart(source) {
			const foeName = source.side.foe.active[0].illusion ?
				source.side.foe.active[0].illusion.name : source.side.foe.active[0].name;
			if (foeName === 'Aeonic' || source.side.foe.name === 'Aeonic') {
				this.add(`c|${getName('Kris')}|HAPPY BIRTHDAY AEONIC!!!!`);
			} else {
				this.add(`c|${getName('Kris')}|hi ${foeName}`);
			}
		},
		onSwitchOut(source) {
			const foeName = source.side.foe.active[0].illusion ?
				source.side.foe.active[0].illusion.name : source.side.foe.active[0].name;
			if (foeName === 'Aeonic' || source.side.foe.name === 'Aeonic') {
				this.add(`c|${getName('Kris')}|HAPPY BIRTHDAY AEONIC!!!!`);
			} else {
				this.add(`c|${getName('Kris')}|hi ${foeName}`);
			}
		},
		onFaint(target) {
			const foeName = target.illusion ?
				target.illusion.name : target.name;
			if (foeName === 'Aeonic' || target.side.name === 'Aeonic') {
				this.add(`c|${getName('Kris')}|HAPPY BIRTHDAY AEONIC!!!!`);
			} else {
				this.add(`c|${getName('Kris')}|Fortnite Battle Royale`);
			}
		},
		// phuck innate
		onDamage(damage, target, source, effect) { // Magic Guard
			if (effect.id === 'heavyhailstorm') return;
			if (target.illusion) return;
			if (!target.species.id.includes('unown')) return;
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		onResidual(pokemon) {
			if (pokemon.illusion) return;
			if (!pokemon.species.id.includes('unown')) return;
			// So this doesn't activate upon switching in
			if (pokemon.activeTurns < 1) return;
			const unownLetters = 'abcdefghijklmnopgrstuvwxyz'.split('');
			const currentFormeID = this.toID(pokemon.set.species);
			const currentLetter = currentFormeID.charAt(5) || 'a';
			const chosenLetter = this.sample(unownLetters.filter(letter => {
				return letter !== currentLetter;
			}));
			// Change is permanent so when you switch out you keep the letter
			this.add(`c|${getName('Kris')}|watch this`);
			if (chosenLetter === 'w') {
				this.add('-activate', pokemon, 'ability: phuck');
				pokemon.formeChange(`unownw`, this.effect, true);
				this.add(`c|${getName('Kris')}|W? More like L`);
				this.add('-activate', pokemon, 'ability: phuck');
				pokemon.formeChange(`unownl`, this.effect, true);
				this.hint(`There are no W Pokemon that work with Kris's signature move, so we're counting this as a loss`);
			} else if (chosenLetter === 'u') {
				this.add('-activate', pokemon, 'ability: phuck');
				pokemon.formeChange(`unownu`, this.effect, true);
				this.add(`c|${getName('Kris')}|U? I'm already an Unown, no`);
				this.add('-activate', pokemon, 'ability: phuck');
				const chosenLetter2 = this.sample(unownLetters.filter(letter => {
					return letter !== 'u' && letter !== 'w';
				}));
				pokemon.formeChange(`unown${chosenLetter2}`, this.effect, true);
				this.hint(`There are no U Pokemon that work with Kris's signature move, so we're counting this as a loss`);
			} else {
				this.add('-activate', pokemon, 'ability: phuck');
				pokemon.formeChange(`unown${chosenLetter === 'a' ? '' : chosenLetter}`, this.effect, true);
			}
		},
	},
	lamp: {
		noCopy: true,
		onStart(pokemon) {
			this.add(`c|${getName('Lamp')}|DUDE HI ${pokemon.side.foe.name} (:`);
		},
		onSwitchOut(pokemon) {
			this.add(`c|${getName('Lamp')}|bye ${pokemon.side.foe.name} :)`);
		},
		onFaint() {
			this.add(`c|${getName('Lamp')}|no u`);
		},
	},
	level51: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Level 51')}|okay one last tournament`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Level 51')}|i hate this game`);
		},
		onFaint() {
			this.add(`c|${getName('Level 51')}|pokemon peaked in gen 6`);
		},
		// Burnout "innate" is here for ease of Wonder Guard limitation check
		onResidualOrder: 25,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.illusion) return;
			if (pokemon.activeTurns) {
				this.add('-message', `Level 51 is burnt out from Pokemon!`);
				pokemon.faint();
			}
		},
	},
	lionyx: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Lionyx')}|Hi, this is ps-chan, how may I help you, user-kun? (｡◕‿‿◕｡)`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Lionyx')}|Teclis au secours`);
		},
		onFaint() {
			this.add(`c|${getName('Lionyx')}|The cold never bothered me anyway...`);
		},
	},
	litteleven: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Litt♥Eleven')}|The coin is flipped, what follows is destiny alone.`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Litt♥Eleven')}|Looks like my business is finished here... for now.`);
		},
		onFaint() {
			this.add(`c|${getName('Litt♥Eleven')}|Perhaps, coin tossing isn't the optimal way to win a war...`);
		},
	},
	madmonty: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Mad Monty ¾°')}|Ah, the sweet smell of rain... Oh! Hi there!`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Mad Monty ¾°')}|Hey, I was enjoying the weather! Awww...`);
		},
		onFaint() {
			this.add(`c|${getName('Mad Monty ¾°')}|Nooo, if I go, who will stop the llamas?`);
		},
	},
	majorbowman: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('MajorBowman')}|Aaaand Cracktion!`);
		},
		onSwitchOut() {
			this.add(`c|${getName('MajorBowman')}|This isn't Maury Povich!`);
		},
		onFaint() {
			this.add(`c|${getName('MajorBowman')}|Never loved ya.`);
		},
	},
	marshmallon: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Marshmallon')}|I'm hungry. Are you edible? c:`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Marshmallon')}|RAWWWR`);
		},
		onFaint() {
			this.add(`c|${getName('Marshmallon')}|I'm still hungry. rawr. :c`);
		},
	},
	meicoo: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Meicoo')}|cool quiz`);
		},
		onSwitchOut(source) {
			this.add(`c|${getName('Meicoo')}|/leavehunt`);
		},
		onFaint() {
			this.add(`c|${getName('Meicoo')}|/endhunt`);
		},
	},
	mitsuki: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Mitsuki')}|alguem quer batalha?????`);
		},
		onSwitchOut(source) {
			this.add(`c|${getName('Mitsuki')}|You're weak, ${source.side.foe.name}. Why? Because you lack... hatred.`);
		},
		onFaint() {
			this.add(`c|${getName('Mitsuki')}|THIS WORLD SHALL KNOW P A I N`);
		},
	},
	morfent: {
		noCopy: true,
		onStart(target, source) {
			this.add(`c|${getName('Morfent ( _̀> ̀)')}|le le 9gag army has arrived`);
			if (source.illusion) return;
			this.add('-start', source, 'typechange', source.types.join('/'), '[silent]');
		},
		onFaint(source) {
			this.add(`c|${getName('Morfent ( _̀> ̀)')}|mods pls ban ${source.side.foe.name}!!! they're hacking into ${source.side.name}'s account and making awful plays`);
		},
		// Prankster innate
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.category === 'Status') {
				move.pranksterBoosted = true;
				return priority + 1;
			}
		},
	},
	n10sit: {
		noCopy: true,
		onStart(source) {
			this.add(`c|${getName('n10siT')}|Heheheh... were you surprised?`);
		},
		onSwitchOut() {
			this.add(`c|${getName('n10siT')}|Heheheh... did I scare you?`);
		},
		onFaint() {
			this.add(`c|${getName('n10siT')}|Hoopa never saw one of those!`);
		},
	},
	naziel: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Naziel')}|ay ola soy nasieeeeeeel`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Naziel')}|YAY, I WILL NOT DIE THIS TIME`);
		},
		onFaint() {
			this.add(`c|${getName('Naziel')}|Toy xikito no puedo ;-;`);
		},
	},
	nolali: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Nolali')}|What's up nerds`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Nolali')}|cya nerds later`);
		},
		onFaint() {
			this.add(`c|${getName('Nolali')}|nerd`);
		},
		// Innate Prankster and Eviolite
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.category === 'Status') {
				move.pranksterBoosted = true;
				return priority + 1;
			}
		},
		onModifyDefPriority: 2,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.nfe) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 2,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.nfe) {
				return this.chainModify(1.5);
			}
		},
	},
	notater517: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Notater517')}|nyaa~... I mean, 'tis a swell day to twirl one's mustache, isn't it?!`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Notater517')}|TBD`);
		},
		onFaint() {
			this.add(`c|${getName('Notater517')}|This is probably a good time to fix my sleep schedule`);
		},
	},
	nui: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('nui')}|Poggaroo`);
		},
		onSwitchOut() {
			this.add(`c|${getName('nui')}|Pog pepe`);
		},
		onFaint() {
			this.add(`c|${getName('nui')}|just a sad pepe`);
		},
	},
	overneat: {
		noCopy: true,
		onStart(source) {
			this.add(`c|${getName('Overneat')}|Lets end this ${source.side.foe.name}!!`);
			if (source.species.id !== 'absolmega' || source.illusion) return;
			this.add('-start', source, 'typechange', source.types.join('/'), '[silent]');
		},
		onSwitchOut() {
			this.add(`c|${getName('Overneat')}|I can do better!`);
		},
		onFaint() {
			this.add(`c|${getName('Overneat')}|I was to cocky...`);
		},
	},
	om: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('OM~!')}|What's up gamers?`);
		},
		onSwitchOut() {
			this.add(`c|${getName('OM~!')}|Let me just ${['host murder for the 100th time', 'clean out scum zzz', 'ladder mnm rq'][this.random(3)]}`);
		},
		onFaint() {
			this.add(`c|${getName('OM~!')}|ugh, I ${['rolled a 1, damnit.', 'got killed night 1, seriously?', 'got critfroze by ice beam asfgegkhalfewgihons'][this.random(3)]}`);
		},
	},
	pants: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('pants')}|neat`);
		},
		onSwitchOut(source) {
			if (source.side.slotConditions) {
				this.add(`c|${getName('pants')}|brb contemplating things`);
			} else {
				this.add(`c|${getName('pants')}|brb dying a little`);
			}
		},
		onFaint() {
			this.add(`c|${getName('pants')}|how do you even knock out something that's already dead? i call bs`);
		},
	},
	paradise: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Paradise ╱╲☼')}|You ever notice that the first thing a PS tryhard does is put their PS auth in their smogon signature?`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Paradise ╱╲☼')}|Pokemon Showdown copypastas have to be among the worst I've seen on any website. People spam garbage over and over until eventually the mods get fed up and clamp down on spam. I don't blame them for it. Have you ever seen a copypasta fail as hard as the dead memes on this website? There are mods on here who still think that "Harambe" and "Damn Daniel" are the peak of comedy. Not to mention that there are rooms on here that don't even talk about pokemon lol. Yeah, I don't see this website lasting more than 2 years, I'd suggest becoming a mod somewhere else.`);
		},
		onFaint(pokemon) {
			this.add(`c|${getName('Paradise ╱╲☼')}|Paradise has been kicked, not banned, therefore you could still potentially invite them back. However, do not do this @${pokemon.side.name}, unless of course, you want to be banned too, because if you invite them back you and Paradise will both be banned.`);
		},
	},
	peapodc: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('peapod c')}|/me sprints into the room`);
		},
		onSwitchOut() {
			this.add(`c|${getName('peapod c')}|Must maintain m o m e n t u m`);
		},
		onFaint() {
			this.add(`c|${getName('peapod c')}|They say sleep is the cousin of death — but even ghosts need to sleep!`);
		},
	},
	perishsonguser: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Perish Song')}|(╯°□°）╯︵ ┻━┻`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Perish Song')}|┬──┬◡ﾉ(° -°ﾉ)`);
		},
		onFaint() {
			this.add(`c|${getName('Perish Song')}|Thanks for coming to my TED talk.`);
		},
	},
	phiwings99: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('phiwings99')}|Pick.`);
		},
		onSwitchOut() {
			this.add(`c|${getName('phiwings99')}|The fact you're switching this out means you probably didn't use the Z-Move right.`);
		},
		onFaint() {
			this.add(`c|${getName('phiwings99')}|I'm boated.`);
		},
	},
	piloswinegripado: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('piloswine gripado')}|Suave?`);
		},
		onSwitchOut() {
			this.add(`c|${getName('piloswine gripado')}|cya frend :)`);
		},
		onFaint() {
			this.add(`c|${getName('piloswine gripado')}|This was lame :/`);
		},
	},
	pirateprincess: {
		noCopy: true,
		onStart(source) {
			this.add(`c|${getName('PiraTe Princess')}|Ahoy! o/`);

			// Easter Egg
			const activeMon = this.toID(
				source.side.foe.active[0].illusion ? source.side.foe.active[0].illusion.name : source.side.foe.active[0].name
			);
			if (activeMon === 'kaijubunny') {
				this.add(`c|${getName('PiraTe Princess')}|~shame`);
				this.add(`raw|<img src="https://i.imgur.com/pxsDOuK.gif" height="165" width="220">`);
				this.add(`c|${getName('Kaiju Bunny')}|WHY MUST YOU DO THIS TO ME`);
			}
		},
		onSwitchOut() {
			this.add(`c|${getName('PiraTe Princess')}|brb making tea`);
		},
		onFaint() {
			this.add(`c|${getName('PiraTe Princess')}|I failed my death save`);
		},
		onHit(target, source, move) {
			if (move?.effectType === 'Move' && target.getMoveHitData(move).crit) {
				this.add(`c|${getName('PiraTe Princess')}|NATURAL 20!!!`);
			}
		},
	},
	psynergy: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Psynergy')}|Will you survive?`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Psynergy')}|yadon moment`);
		},
		onFaint() {
			this.add(`c|${getName('Psynergy')}|oh`);
		},
	},
	ptoad: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('ptoad')}|I'm ptoad.`);
		},
		onSwitchOut() {
			this.add(`c|${getName('ptoad')}|Bye, ribbitch!`);
		},
		onFaint() {
			this.add(`c|${getName('ptoad')}|OKKKK DUUUDE`);
		},
		onTakeItem(item, pokemon, source) {
			if (this.suppressingAttackEvents(pokemon) || !pokemon.hp || pokemon.item === 'stickybarb') return;
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if ((source && source !== pokemon) || this.activeMove.id === 'knockoff') {
				this.add('-activate', pokemon, 'ability: Sticky Hold');
				return false;
			}
		},
	},
	quadrophenic: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('quadrophenic')}|Did you ever like it then?`);
		},
		onFaint() {
			this.add(`c|${getName('quadrophenic')}|It fell apart.`);
		},
	},
	rabia: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Rabia')}|eternally`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Rabia')}|rabia`);
		},
		onFaint() {
			this.add(`c|${getName('Rabia')}|im top 500 in relevant tiers and lead gp, i have 8 badges, im fine, gg`);
		},
	},
	rach: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Rach')}|Hel-lo`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Rach')}|I was doing better alone`);
		},
		onFaint() {
			this.add(`c|${getName('Rach')}|I'm all good already, so moved on, it's scary`);
		},
	},
	rageuser: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Rage')}|Hello there`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Rage')}|im off, cya lads`);
		},
		onFaint() {
			this.add(`c|${getName('Rage')}|/me quits`);
		},
	},
	rajshoot: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Raj.Shoot')}|Plaza Power!`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Raj.Shoot')}|We'll be back!`);
		},
		onFaint() {
			this.add(`c|${getName('Raj.Shoot')}|You'll join me in the shadow realm soon....`);
		},
	},
	ransei: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Ransei')}|Sup! This is Gen 8 so imma run an Eternamax set. Best of luck. You’ll need it :^)`);
		},
		onFaint(pokemon) {
			const target = pokemon.side.foe.active[0];
			if (!target || target.fainted || target.hp <= 0) {
				this.add(`c|${getName('Ransei')}|Ahah yes you got rekt! Welcome to Hackmons! gg m8!`);
			} else {
				this.add(`c|${getName('Ransei')}|ripsei... Ok look you might’ve won this time but I kid you not you’re losing next game!`);
			}
		},
	},
	rb220: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('rb220')}|Time to win this :)`);
		},
		onSwitchOut() {
			this.add(`c|${getName('rb220')}|MSU need a sub`);
		},
		onFaint() {
			this.add(`c|${getName('rb220')}|Authhate is real.`);
		},
	},
	robb576: {
		noCopy: true,
		onStart(target, pokemon) {
			if (pokemon.side.pokemonLeft === 1) {
				this.add(`c|${getName('Robb576')}|This is our last stand. Give it everything you got ${pokemon.side.name}!`);
			} else {
				this.add(`c|${getName('Robb576')}|1, 2, 3, 4, dunno how to count no more!`);
			}
		},
		onSwitchOut(pokemon) {
			if (pokemon.side.pokemonLeft === 1) { // pls contacc
				this.add(`c|${getName('Robb576')}|Something went wrong. Please contact HoeenHero to fix this`);
			} else {
				this.add(`c|${getName('Robb576')}|5, 7, 6, I will be right back into the mix!`);
			}
		},
		onFaint(pokemon) {
			if (pokemon.species.name === "Necrozma-Ultra") {
				this.add(`c|${getName('Robb576')}|gg better luck next time. Sorry I couldn't handle them all :^(`);
			} else {
				this.add(`c|${getName('Robb576')}|8, 9, 10, it has been a pleasure man!`);
			}
		},
	},
	sectoniaservant: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('SectoniaServant')}|I love one (1) queen bee`);
		},
		onSwitchOut(pokemon) {
			this.add(`c|${getName('SectoniaServant')}|My search for my lost queen continues....`);
		},
		onFaint(pokemon) {
			this.add(`c|${getName('SectoniaServant')}|NOOOOOO NOT THE JELLY BABY`);
		},
	},
	segmr: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Segmr')}|*awakens conquerors haki* Greetings.`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Segmr')}|Lemme show you this`);
			this.add(`l|Segmr`);
		},
		onFaint(pokemon) {
			const name = pokemon.side.foe.active[0].illusion ?
				pokemon.side.foe.active[0].illusion.name : pokemon.side.foe.active[0].name;
			this.add(`c|${getName('Segmr')}|I'm sorry ${name} but could you please stop talking to me?`);
		},
	},
	sejesensei: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('sejesensei')}|yoyo, what’ve you been reading lately`);
		},
		onSwitchOut() {
			this.add(`c|${getName('sejesensei')}|bbl, gonna go read some manga`);
		},
		onFaint() {
			this.add(`c|${getName('sejesensei')}|B-but, this didn’t happen in the manga…`);
		},
	},
	seso: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Seso')}|I have good spacial awareness, and I'm pretty comfortable with a sword.`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Seso')}|In the blink of an eye.`);
		},
		onFaint() {
			this.add(`c|${getName('Seso')}|I feel just, you know, defeated.`);
		},
	},
	shadecession: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Shadecession')}|Better put on my Shadecessions`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Shadecession')}|⌐■_■`);
		},
		onFaint() {
			this.add(`c|${getName('Shadecession')}|ah, gg fam`);
		},
	},
	softflex: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Soft Flex')}|:]`);
		},
		onFaint() {
			this.add(`c|${getName('Soft Flex')}|:[`);
		},
	},
	spandan: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Spandan')}|Mareanie!`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Spandan')}|You can't end this toxic relationship just like that!`);
		},
		onFaint() {
			this.add(`c|${getName('Spandan')}|You didnt do shit. I coded myself to faint.`);
		},
	},
	struchni: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Struchni')}|~tt newgame`);
		},
		onSwitchOut(source) {
			this.add(`c|${getName('Struchni')}|~tt endgame`);
			if (source.m.typeEff) delete source.m.typeEff;
		},
		onFaint() {
			this.add(`c|${getName('Struchni')}|**selfveto**`);
		},
		// Needed for Veto move
		onHit(target, source, move) {
			target.m.typeEff = target.getMoveHitData(move).typeMod;
		},
	},
	teclis: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Teclis')}|A little magic can go a long way.`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Teclis')}|But magic can sometimes just be an illusion.`);
		},
		onFaint() {
			this.add(`c|${getName('Teclis')}|Magic never dies. It merely fades away.`);
		},
	},
	tenshi: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Tenshi')}|Hi gm`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Tenshi')}|Ight Imma head out`);
		},
		onFaint() {
			this.add(`c|${getName('Tenshi')}|Grr bork bork :(`);
		},
	},
	temp: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('temp')}|hi, i'm here to drop dracos`);
		},
		onSwitchOut() {
			this.add(`c|${getName('temp')}|how did I not win yet`);
		},
		onFaint() {
			this.add(`c|${getName('temp')}|oh I died`);
		},
	},
	tiki: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('tiki')}|just tiki.`);
		},
		onSwitchOut() {
			this.add(`c|${getName('tiki')}|`);
			this.add(`raw|<img src="https://www.smogon.com/forums/attachments/cat-custom-png.254830/" />`);
		},
		onFaint() {
			this.add(`c|${getName('tiki')}|aksfgkjag o k`);
		},
	},
	trace: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('trace')}|Daishouri!`);
		},
		onSwitchOut() {
			this.add(`c|${getName('trace')}|¯\\_(ツ)_/¯`);
		},
		onFaint() {
			this.add(`c|${getName('trace')}|sucks to sucks`);
		},
	},
	trickster: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Trickster')}|(¤﹏¤).`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Trickster')}|(︶︹︺)`);
		},
		onFaint() {
			this.add(`c|${getName('Trickster')}|(ಥ﹏ಥ)`);
		},
	},
	vexen: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Vexen')}|Most unlucky for you!`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Vexen')}|brb reading Bleach`);
		},
		onFaint() {
			this.add(`c|${getName('Vexen')}|Wait this wasn't supposed to happen`);
		},
	},
	vivalospride: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('vivalospride')}|hola mi amore`);
		},
		onSwitchOut() {
			this.add(`c|${getName('vivalospride')}|no hablo español`);
		},
		onFaint() {
			this.add(`c|${getName('vivalospride')}|classic honestly`);
		},
	},
	volco: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Volco')}|/me loud controller noises`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Volco')}|/me controller clicking fades`);
		},
		onFaint(source, target, effect) {
			if (effect.id === 'glitchexploiting') {
				this.add(`c|${getName('Volco')}|Dammit, time for a reset.`);
				return;
			}
			this.add(`c|${getName('Volco')}|Looks like the game fro-`);
			this.add(`raw|<div class="broadcast-red"><strong>This Pokemon Showdown battle has frozen!</strong><br />Don't worry, we're working on fixing it, so just carry on like you never saw this.<br /><small>(Do not report this, this is intended.)</small></div>`);
		},
	},
	vooper: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('vooper')}|${['Paws out, claws out!', 'Ready for the prowl!'][this.random(2)]}`);
		},
		onSwitchOut() {
			this.add(`c|${getName('vooper')}|Must... eat... bamboo...`);
		},
		onFaint() {
			this.add(`c|${getName('vooper')}|I guess Kung Fu isn't for everyone...`);
		},
	},
	xjoelituh: {
		noCopy: true,
		onStart(source) {
			this.add(`c|${getName('xJoelituh')}|Hey, how can I help you?`);
		},
		onSwitchOut() {
			this.add(`c|${getName('xJoelituh')}|Hold on, I need a second opinion.`);
		},
		onFaint() {
			let str = '';
			for (let x = 0; x < 10; x++) str += String.fromCharCode(48 + this.random(79));
			this.add(`c|${getName('xJoelituh')}|${str} ok`);
		},
	},
	yuki: {
		noCopy: true,
		onStart(target, pokemon) {
			let bst = 0;
			for (const stat of Object.values(pokemon.species.baseStats)) {
				bst += stat;
			}
			let targetBst = 0;
			for (const stat of Object.values(target.species.baseStats)) {
				targetBst += stat;
			}
			let message: string;
			if (bst > targetBst) {
				message = 'You dare challenge me!?';
			} else {
				message = 'Sometimes, you go for it';
			}
			this.add(`c|${getName('yuki')}|${message}`);
		},
		onSwitchOut() {
			this.add(`c|${getName('yuki')}|Catch me if you can!`);
		},
		onFaint() {
			this.add(`c|${getName('yuki')}|You'll never extinguish our hopes!`);
		},
	},
	zalm: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Zalm')}|<(:O)000>`);
		},
		onSwitchOut(pokemon) {
			this.add(`c|${getName('Zalm')}|Run for the hills!`);
		},
		onFaint(pokemon) {
			this.add(`c|${getName('Zalm')}|Woah`);
		},
	},
	zarel: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Zarel')}|the melo-p represents PS's battles, and the melo-a represents PS's chatrooms`);
			this.add(`c|${getName('Zarel')}|THIS melo-a represents kicking your ass, though`);
		},
	},
	zodiax: {
		noCopy: true,
		onStart(source) {
			this.add(`c|${getName('Zodiax')}|Zodiax is here to Zodihax`);

			// Easter Egg
			const activeMon = this.toID(
				source.side.foe.active[0].illusion ? source.side.foe.active[0].illusion.name : source.side.foe.active[0].name
			);
			if (activeMon === 'aeonic') {
				this.add(`c|${getName('Zodiax')}|Happy Birthday Aeonic`);
				this.add(`c|${getName('Aeonic')}|THIS JOKE IS AS BORING AS YOU ARE`);
			}
		},
		onSwitchOut() {
			this.add(`c|${getName('Zodiax')}|Don't worry I'll be back again`);
		},
		onFaint(pokemon) {
			const name = pokemon.side.foe.name;
			this.add(`c|${getName('Zodiax')}|${name}, Why would you hurt this poor little pompombirb :(`);
		},
		// Big Storm Coming base power reduction effect
		onBasePower(basePower, pokemon, target, move) {
			if (pokemon.m.bigstormcoming) {
				return this.chainModify([0x4CC, 0x1000]);
			}
		},
	},
	zyguser: {
		noCopy: true,
		onStart() {
			this.add(`c|${getName('Zyg')}|Free Swirlyder.`);
		},
		onSwitchOut() {
			this.add(`c|${getName('Zyg')}|/me sighs... what is there to say?`);
		},
		onFaint() {
			this.add(`c|${getName('Zyg')}|At least I have a tier.`);
		},
	},
	// Heavy Hailstorm status support for Alpha
	heavyhailstorm: {
		name: 'HeavyHailstorm',
		effectType: 'Weather',
		duration: 3,
		onTryMovePriority: 1,
		onTryMove(attacker, defender, move) {
			if (move.type === 'Steel' && move.category !== 'Status') {
				this.debug('Heavy Hailstorm Steel suppress');
				this.add('-fail', attacker, move, '[from] Heavy Hailstorm');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.type === 'Ice') {
				this.debug('Heavy Hailstorm ice boost');
				return this.chainModify(1.5);
			}
		},
		onStart(battle, source, effect) {
			this.add('-weather', 'Hail');
			this.effectData.source = source;
		},
		onModifyMove(move, pokemon, target) {
			if (!this.field.isWeather('heavyhailstorm')) return;
			if (move.category !== "Status") {
				this.debug('Adding Heavy Hailstorm freeze');
				if (!move.secondaries) move.secondaries = [];
				for (const secondary of move.secondaries) {
					if (secondary.status === 'frz') return;
				}
				move.secondaries.push({
					chance: 10,
					status: 'frz',
				});
			}
		},
		onAnySetWeather(target, source, weather) {
			if (this.field.getWeather().id === 'heavyhailstorm' && !STRONG_WEATHERS.includes(weather.id)) return false;
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'Hail', '[upkeep]');
			if (this.field.isWeather('heavyhailstorm')) this.eachEvent('Weather');
		},
		onWeather(target, source, effect) {
			if (target.side === this.effectData.source.side) return;
			// Hail is stronger from Heavy Hailstorm
			if (!target.hasType('Ice')) this.damage(target.baseMaxhp / 8);
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},
	// Forever Winter Hail support for piloswine gripado
	winterhail: {
		name: 'Winter Hail',
		effectType: 'Weather',
		duration: 0,
		onStart(battle, source, effect) {
			if (effect?.effectType === 'Ability') {
				this.add('-weather', 'Hail', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'Hail');
			}
		},
		onModifySpe(spe, pokemon) {
			if (!pokemon.hasType('Ice')) return this.chainModify(0.5);
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'Hail', '[upkeep]');
			if (this.field.isWeather('winterhail')) this.eachEvent('Weather');
		},
		onWeather(target) {
			if (target.hasType('Ice')) return;
			this.damage(target.baseMaxhp / 8);
		},
		onEnd() {
			this.add('-end', 'hail');
		},
	},
	raindrop: {
		name: 'Raindrop',
		noCopy: true,
		onStart(target) {
			if (target.activeTurns < 1) return;
			this.effectData.layers = 1;
			this.effectData.def = 0;
			this.effectData.spd = 0;
			this.add('-start', target, 'Raindrop');
			const [curDef, curSpD] = [target.boosts.def, target.boosts.spd];
			this.boost({def: 1, spd: 1}, target, target);
			if (curDef !== target.boosts.def) this.effectData.def--;
			if (curSpD !== target.boosts.spd) this.effectData.spd--;
		},
		onResidual(target) {
			if (this.effectData.def >= 6 && this.effectData.spd >= 6) return false;
			if (target.activeTurns < 1) return;
			this.effectData.layers++;
			this.add('-start', target, 'Raindrop');
			const curDef = target.boosts.def;
			const curSpD = target.boosts.spd;
			this.boost({def: 1, spd: 1}, target, target);
			if (curDef !== target.boosts.def) this.effectData.def--;
			if (curSpD !== target.boosts.spd) this.effectData.spd--;
		},
		onEnd(target) {
			if (this.effectData.def || this.effectData.spd) {
				const boosts: SparseBoostsTable = {};
				if (this.effectData.def) boosts.def = this.effectData.def;
				if (this.effectData.spd) boosts.spd = this.effectData.spd;
				this.boost(boosts, target, target);
			}
			this.add('-end', target, 'Raindrop');
			if (this.effectData.def !== this.effectData.layers * -1 || this.effectData.spd !== this.effectData.layers * -1) {
				this.hint("Raindrop keeps track of how many times it successfully altered each stat individually.");
			}
		},
	},
	// Custom status for A Quag To The Past's signature move
	bounty: {
		name: 'bounty',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect.effectType === 'Ability') {
				this.add('-start', target, 'bounty', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-start', target, 'bounty');
			}
			// this.add('-start', target, 'bounty', '[silent]');
		},
		onSwitchIn(pokemon) {
			if (pokemon.status === 'bounty') {
				this.add('-start', pokemon, 'bounty');
			}
		},
		onFaint(target, source, effect) {
			if (effect.effectType !== 'Move') return;
			if (source) {
				this.add('-activate', target, 'ability: Bounty');
				this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1}, source, target, effect);
			}
		},
	},
	// Brilliant Condition for Arcticblast
	brilliant: {
		name: 'Brilliant',
		duration: 5,
		onStart(pokemon) {
			this.add('-start', pokemon, 'Brilliant');
		},
		onModifyAtk(atk, pokemon) {
			return this.chainModify(1.5);
		},
		onModifyDef(def, pokemon) {
			return this.chainModify(1.5);
		},
		onModifySpA(spa, pokemon) {
			return this.chainModify(1.5);
		},
		onModifySpD(spd, pokemon) {
			return this.chainModify(1.5);
		},
		onModifySpe(spe, pokemon) {
			return this.chainModify(1.5);
		},
		onUpdate(pokemon) {
			if (pokemon.volatiles['perishsong']) pokemon.removeVolatile('perishsong');
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'perishsong') return null;
			if (this.dex.getEffect(status.id).onDisableMove) return null;
		},
		onResidualOrder: 7,
		onResidual(pokemon) {
			this.heal(pokemon.baseMaxhp / 16);
		},
		onTrapPokemon(pokemon) {
			pokemon.tryTrap();
		},
		onDragOut(pokemon) {
			this.add('-activate', pokemon, 'move: Ingrain');
			return null;
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Brilliant');
		},
	},
	// Custom status for HoeenHero's move
	stormsurge: {
		name: "Storm Surge",
		duration: 2,
		durationCallback(target, source, effect) {
			const windSpeeds = [65, 85, 95, 115, 140];
			return windSpeeds.indexOf((effect as ActiveMove).basePower) + 2;
		},
		onStart(targetSide) {
			this.add('-sidestart', targetSide, 'Storm Surge');
			this.add('-message', `Storm Surge flooded the afflicted side of the battlefield!`);
		},
		onEnd(targetSide) {
			this.add('-sideend', targetSide, 'Storm Surge');
			this.add('-message', 'The Storm Surge receded.');
		},
		onModifySpe(spe, pokemon) {
			return this.chainModify(0.25);
		},
	},
	// boost for LittEleven's move
	nexthuntcheck: {
		duration: 1,
		onStart(pokemon) {
			this.add('-singleturn', pokemon, 'move: /nexthunt');
		},
		onHit(pokemon, source, move) {
			if (move.category !== 'Status') {
				pokemon.volatiles['nexthuntcheck'].lostFocus = true;
			}
		},
	},
	// modified paralysis for Inversion Terrain
	par: {
		name: 'par',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'par', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'par');
			}
		},
		onModifySpe(spe, pokemon) {
			if (pokemon.hasAbility('quickfeet')) return;
			if (this.field.isTerrain('inversionterrain') && pokemon.isGrounded()) {
				return this.chainModify(2);
			}
			return this.chainModify(0.5);
		},
		onBeforeMovePriority: 1,
		onBeforeMove(pokemon) {
			if (this.randomChance(1, 4)) {
				this.add('cant', pokemon, 'par');
				return false;
			}
		},
	},
	failedparry: {
		name: "Failed Parry",
		duration: 1,
		onModifyMove(move, source, target) {
			if (source.volatiles['failedparry']) {
				move.accuracy = true;
			}
		},
	},
	tempest: {
		name: 'Tempest',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('damprock')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Water') {
				this.debug('rain water boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Fire') {
				this.debug('rain fire suppress');
				return this.chainModify(0.5);
			}
		},
		onStart(battle, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectData.duration = 0;
				this.add('-weather', 'RainDance', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'RainDance');
			}
		},
		onUpdate() {
			if (!this.field.isTerrain('tempestterrain')) {
				this.add('-end', 'RainDance');
			}
		},
		onResidualOrder: 1,
		onResidual() {
			if (!this.field.isTerrain('tempestterrain')) {
				this.add('-end', 'RainDance');
			}
			this.add('-weather', 'RainDance', '[upkeep]');
			this.eachEvent('Weather');
		},
		onWeather(target) {
			if (target.hasType('Ground')) return;
			if (target.hasType('Electric')) {
				this.heal(target.baseMaxhp / 16);
				return;
			}
			if (!target.hasType('Electric') && target.hasType(['Flying', 'Steel'])) {
				this.damage(target.baseMaxhp / 8);
			}
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},

	// condition used for brouha's ability
	turbulence: {
		name: 'Turbulence',
		effectType: 'Weather',
		duration: 0,
		onModifyDefPriority: 10,
		onModifyDef(def, pokemon) {
			if (pokemon.hasType('Flying') && this.field.isWeather('turbulence')) {
				return this.modify(def, 1.5);
			}
		},
		onStart(battle, source, effect) {
			this.add('-weather', 'DeltaStream', '[from] ability: ' + effect, '[of] ' + source);
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'DeltaStream', '[upkeep]');
			this.eachEvent('Weather');
		},
		onWeather(target) {
			if (!target.hasType('Flying')) this.damage(target.baseMaxhp * 0.06);
			if (this.sides.some(side => Object.keys(side.sideConditions).length)) {
				this.add(`-message`, 'The Turbulence blew away the hazards on both sides!');
			}
			if (this.field.terrain) {
				this.add(`-message`, 'The Turbulence blew away the terrain!');
			}
			for (const side of this.sides) {
				const keys = Object.keys(side.sideConditions);
				for (const key of keys) {
					side.removeSideCondition(key);
					this.add('-sideend', target.side, this.dex.getEffect(key).name, '[from] ability: Turbulence');
				}
			}
			this.field.clearTerrain();
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},
	// Modded hazard moves to fail when Wave terrain is active
	auroraveil: {
		name: "Aurora Veil",
		duration: 5,
		durationCallback(target, source, effect) {
			if (source?.hasItem('lightclay')) {
				return 8;
			}
			return 5;
		},
		onAnyModifyDamage(damage, source, target, move) {
			if (target !== source && target.side === this.effectData.target) {
				if ((target.side.getSideCondition('reflect') && this.getCategory(move) === 'Physical') ||
						(target.side.getSideCondition('lightscreen') && this.getCategory(move) === 'Special')) {
					return;
				}
				if (!target.getMoveHitData(move).crit && !move.infiltrates) {
					this.debug('Aurora Veil weaken');
					if (target.side.active.length > 1) return this.chainModify([0xAAC, 0x1000]);
					return this.chainModify(0.5);
				}
			}
		},
		onStart(side) {
			if (this.field.isTerrain('waveterrain')) {
				this.add('-message', `Wave Terrain prevented Aurora Veil from starting!`);
				return null;
			}
			this.add('-sidestart', side, 'move: Aurora Veil');
		},
		onResidualOrder: 21,
		onResidualSubOrder: 1,
		onEnd(side) {
			this.add('-sideend', side, 'move: Aurora Veil');
		},
	},
	lightscreen: {
		name: "Light Screen",
		duration: 5,
		durationCallback(target, source, effect) {
			if (source?.hasItem('lightclay')) {
				return 8;
			}
			return 5;
		},
		onAnyModifyDamage(damage, source, target, move) {
			if (target !== source && target.side === this.effectData.target && this.getCategory(move) === 'Special') {
				if (!target.getMoveHitData(move).crit && !move.infiltrates) {
					this.debug('Light Screen weaken');
					if (target.side.active.length > 1) return this.chainModify([0xAAC, 0x1000]);
					return this.chainModify(0.5);
				}
			}
		},
		onStart(side) {
			if (this.field.isTerrain('waveterrain')) {
				this.add('-message', `Wave Terrain prevented Light Screen from starting!`);
				return null;
			}
			this.add('-sidestart', side, 'move: Light Screen');
		},
		onResidualOrder: 21,
		onResidualSubOrder: 1,
		onEnd(side) {
			this.add('-sideend', side, 'move: Light Screen');
		},
	},
	mist: {
		name: "Mist",
		duration: 5,
		onBoost(boost, target, source, effect) {
			if (effect.effectType === 'Move' && effect.infiltrates && target.side !== source.side) return;
			if (source && target !== source) {
				let showMsg = false;
				let i: BoostName;
				for (i in boost) {
					if (boost[i]! < 0) {
						delete boost[i];
						showMsg = true;
					}
				}
				if (showMsg && !(effect as ActiveMove).secondaries) {
					this.add('-activate', target, 'move: Mist');
				}
			}
		},
		onStart(side) {
			if (this.field.isTerrain('waveterrain')) {
				this.add('-message', `Wave Terrain prevented Mist from starting!`);
				return null;
			}
			this.add('-sidestart', side, 'move: Mist');
		},
		onResidualOrder: 21,
		onResidualSubOrder: 3,
		onEnd(side) {
			this.add('-sideend', side, 'Mist');
		},
	},
	reflect: {
		name: "Reflect",
		duration: 5,
		durationCallback(target, source, effect) {
			if (source?.hasItem('lightclay')) {
				return 8;
			}
			return 5;
		},
		onAnyModifyDamage(damage, source, target, move) {
			if (target !== source && target.side === this.effectData.target && this.getCategory(move) === 'Physical') {
				if (!target.getMoveHitData(move).crit && !move.infiltrates) {
					this.debug('Reflect weaken');
					if (target.side.active.length > 1) return this.chainModify([0xAAC, 0x1000]);
					return this.chainModify(0.5);
				}
			}
		},
		onStart(side) {
			if (this.field.isTerrain('waveterrain')) {
				this.add('-message', `Wave Terrain prevented Reflect from starting!`);
				return null;
			}
			this.add('-sidestart', side, 'Reflect');
		},
		onResidualOrder: 21,
		onEnd(side) {
			this.add('-sideend', side, 'Reflect');
		},
	},
	safeguard: {
		name: "Safeguard",
		duration: 5,
		durationCallback(target, source, effect) {
			if (source?.hasAbility('persistent')) {
				this.add('-activate', source, 'ability: Persistent', effect);
				return 7;
			}
			return 5;
		},
		onSetStatus(status, target, source, effect) {
			if (!effect || !source) return;
			if (effect.effectType === 'Move' && effect.infiltrates && target.side !== source.side) return;
			if (target !== source) {
				this.debug('interrupting setStatus');
				if (effect.id === 'synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
					this.add('-activate', target, 'move: Safeguard');
				}
				return null;
			}
		},
		onTryAddVolatile(status, target, source, effect) {
			if (!effect || !source) return;
			if (effect.effectType === 'Move' && effect.infiltrates && target.side !== source.side) return;
			if ((status.id === 'confusion' || status.id === 'yawn') && target !== source) {
				if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Safeguard');
				return null;
			}
		},
		onStart(side) {
			if (this.field.isTerrain('waveterrain')) {
				this.add('-message', `Wave Terrain prevented Safeguard from starting!`);
				return null;
			}
			this.add('-sidestart', side, 'move: Safeguard');
		},
		onResidualOrder: 21,
		onResidualSubOrder: 2,
		onEnd(side) {
			this.add('-sideend', side, 'Safeguard');
		},
	},
	gmaxsteelsurge: {
		onStart(side) {
			if (this.field.isTerrain('waveterrain')) {
				this.add('-message', `Wave Terrain prevented Steel Spikes from starting!`);
				return null;
			}
			this.add('-sidestart', side, 'move: G-Max Steelsurge');
		},
		onSwitchIn(pokemon) {
			if (pokemon.hasItem('heavydutyboots')) return;
			// Ice Face and Disguise correctly get typed damage from Stealth Rock
			// because Stealth Rock bypasses Substitute.
			// They don't get typed damage from Steelsurge because Steelsurge doesn't,
			// so we're going to test the damage of a Steel-type Stealth Rock instead.
			const steelHazard = this.dex.getActiveMove('Stealth Rock');
			steelHazard.type = 'Steel';
			const typeMod = this.clampIntRange(pokemon.runEffectiveness(steelHazard), -6, 6);
			this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
		},
	},
	spikes: {
		name: "Spikes",
		onStart(side) {
			if (this.field.isTerrain('waveterrain')) {
				this.add('-message', `Wave Terrain prevented Spikes from starting!`);
				return null;
			}
			this.effectData.layers = 1;
			this.add('-sidestart', side, 'move: Spikes');
		},
		onRestart(side) {
			if (this.effectData.layers >= 3) return false;
			this.add('-sidestart', side, 'Spikes');
			this.effectData.layers++;
		},
		onSwitchIn(pokemon) {
			if (!pokemon.isGrounded()) return;
			if (pokemon.hasItem('heavydutyboots')) return;
			const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
			this.damage(damageAmounts[this.effectData.layers] * pokemon.maxhp / 24);
		},
	},
	stealthrock: {
		name: "Stealth Rock",
		onStart(side) {
			if (this.field.isTerrain('waveterrain')) {
				this.add('-message', `Wave Terrain prevented Stealth Rock from starting!`);
				return null;
			}
			this.add('-sidestart', side, 'move: Stealth Rock');
		},
		onSwitchIn(pokemon) {
			if (pokemon.hasItem('heavydutyboots')) return;
			const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
			this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
		},
	},
	stickyweb: {
		name: "Sticky Web",
		onStart(side) {
			if (this.field.isTerrain('waveterrain')) {
				this.add('-message', `Wave Terrain prevented Sticky Web from starting!`);
				return null;
			}
			this.add('-sidestart', side, 'move: Sticky Web');
		},
		onSwitchIn(pokemon) {
			if (!pokemon.isGrounded()) return;
			if (pokemon.hasItem('heavydutyboots')) return;
			this.add('-activate', pokemon, 'move: Sticky Web');
			this.boost({spe: -1}, pokemon, pokemon.side.foe.active[0], this.dex.getActiveMove('stickyweb'));
		},
	},
	toxicspikes: {
		name: "Toxic Spikes",
		onStart(side) {
			if (this.field.isTerrain('waveterrain')) {
				this.add('-message', `Wave Terrain prevented Toxic Spikes from starting!`);
				return null;
			}
			this.add('-sidestart', side, 'move: Toxic Spikes');
			this.effectData.layers = 1;
		},
		onRestart(side) {
			if (this.effectData.layers >= 2) return false;
			this.add('-sidestart', side, 'move: Toxic Spikes');
			this.effectData.layers++;
		},
		onSwitchIn(pokemon) {
			if (!pokemon.isGrounded()) return;
			if (pokemon.hasType('Poison')) {
				this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
				pokemon.side.removeSideCondition('toxicspikes');
			} else if (pokemon.hasType('Steel') || pokemon.hasItem('heavydutyboots')) {
				return;
			} else if (this.effectData.layers >= 2) {
				pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
			} else {
				pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
			}
		},
	},
};
