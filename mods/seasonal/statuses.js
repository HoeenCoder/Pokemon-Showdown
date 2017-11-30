'use strict';

exports.BattleStatuses = {
	aelita: {
		exists: true,
		noCopy: true,
		onStart: function (target, source) {
			this.add('c|%Aelita|Transfer, Aelita. Scanner, Aelita. Virtualization!');
			this.boost({spe: 1}, source);
		},
		onFaint: function () {
			this.add('c|%Aelita|CODE: LYOKO. Tower deactivated...');
		},
	},
	andy: {
		exists: true,
		noCopy: true,
		onUpdate: function (pokemon) {
			let name = toId(pokemon.name);
			if (pokemon.template.isMega) {
				if (name === 'andy' && pokemon.getAbility().id === 'magicbounce') {
					pokemon.setAbility('Huge Power'); //change to adaptability if to strong
					this.add('-ability', pokemon, 'Huge Power'); //change to adaptability if to strong
				}
			}
		},
		onStart: function () {
			this.add('c|@AndrewGoncel >_>|AHAM!!!');
		},
		onFaint: function () {
			this.add('c|@AndrewGoncel >_>|>_>');
		},
		onSwitchOut: function () {
			this.add('c|@AndrewGoncel >_>|:<');
		},
	},
	antemortem: {
		exists: true,
		noCopy: true,
		onSwitchIn: function () {
			this.add('c|~antemortem|I Am Here To Oppress Users');
		},
		onFaint: function () {
			this.add('c|~antemortem|FUCKING CAMPAIGNERS');
		},
	},
	ascriptmaster: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|%Ascriptmaster|Here we go! Time to show you something shocking!');
		},
		onFaint: function () {
			this.add('c|%Ascriptmaster|In the end, the shocked one was me...');
		},
	},
	astara: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|%Ast☆arA|I\'d rather take a nap, I hope you won\'t be a petilil shit, Eat some rare candies and get on my level.');
		},
		onFaint: function () {
			let sentences = ['/me twerks into oblivion', 'good night ♥', 'Astara Vista Baby'];
			this.add('c|%Ast☆arA|' + sentences[this.random(3)]);
		},
	},
	auzbat: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|%AuzBat|Smith is better than Kohli');
		},
		onFaint: function () {
			this.add('c|%AuzBat|... at least Smith doesn\'t average less than 14 in England');
		},
	},
	beowulf: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|@Beowulf|Grovel peasant, you are in the presence of the RNGesus');
		},
		onFaint: function () {
			this.add('c|@Beowulf|There is no need to be mad');
		},
	},
	cantsay: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|&cant say|(´・ω・`)');
		},
		onSwitchOut: function () {
			this.add('c|&cant say|wow CTed lol');
		},
		onFaint: function () {
			this.add('c|&cant say|bg haxor :(');
		},
		onAfterMove: function (pokemon) {
			if (pokemon.template.forme !== 'Blade') return;
			if (pokemon.formeChange('Aegislash')) {
				this.add('-formechange', pokemon, 'Aegislash', '[from] ability: Stance Change');
			}
		},
	},
	ev: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|~EV|nice boosts');
		},
		onFaint: function () {
			this.add('c|~EV|muk off');
		},
	},
	grimauxiliatrix: {
		exists: true,
		noCopy: true,
		onUpdate: function (pokemon) {
			if (pokemon.template.isMega && pokemon.getAbility().id === 'filter') {
				pokemon.setAbility('chromefinish');
			}
		},
		onFaint: function () {
			this.add('c|@grimAuxiliatrix|∠( ᐛ 」∠)＿');
		},
	},
	hoeenhero: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|@HoeenHero|I have cheat codes!');
		},
		onFaint: function () {
			this.add('c|@HoeenHero|No! My cheats wern\'t enough ;-;');
		},
	},
	imas: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|%imas|hlo im flyboy220');
		},
		onFaint: function () {
			this.add('c|%imas|bg no re');
		},
		onSwitchOut: function () {
			this.add('c|%imas|ok');
		},
	},
	innovamania: {
		exists: true,
		noCopy: true,
		onStart: function (pokemon) {
			let sentences = ['Don\'t take this seriously', 'These Black Glasses sure look cool', 'Ready for some fun?( ͡° ͜ʖ ͡°)', '( ͡° ͜ʖ ͡°'];
			this.add('c|@innovamania|' + sentences[this.random(4)]);
			this.boost({atk: 6, def: 6, spa: 6, spd: 6, spe: 6, accuracy: 6}, pokemon);
		},
		onFaint: function () {
			let sentences = ['Did you rage quit?', 'How\'d you lose with this set?'];
			this.add('c|@innovamania|' + sentences[this.random(2)]);
		},
	},
	kalalokki: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|%kalalokki|(•_•)');
			this.add('c|%Kalalokki|( •_•)>⌐■-■');
			this.add('c|%Kalalokki|(⌐■_■)');
			this.setWeather('raindance');
		},
		onFaint: function () {
			this.add('c|%kalalokki|(•_•)');
			this.add('c|%Kalalokki|( •_•)>⌐■-■');
			this.add('c|%Kalalokki|(x_x)');
		},
	},
	kamikaze: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|&kamikaze|Omae Wa Mou Shindeiru');
		},
		onFaint: function () {
			this.add('c|&kamikaze|NANI!');
		},
	},
	level51: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|@Level 51|Calculating chance of victory!');
		},
		onFaint: function () {
			this.add('c|@Level 51|IndexError: list index out of range');
		},
	},
	megazard: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|%Megazard|Thank you for choosing Drampa™');
		},
		onFaint: function () {
			this.add('c|%Megazard|Please send any feedback to your local Drampa™ distributor.');
		},
		onSwitchOut: function () {
			this.add('c|%Megazard|The Drampa™ product is not under warranty.');
		},
	},
	panpawn: {
		exists: true,
		noCopy: true,
		effectType: 'Ability',
		onStart: function (source) {
			this.add('c|%panpawn|hello darkness my old friend,,,');
			for (let i = 0; i < this.queue.length; i++) {
				if (this.queue[i].choice === 'runPrimal' && this.queue[i].pokemon === source && source.template.speciesid === 'groudon') return;
				if (this.queue[i].choice !== 'runSwitch' && this.queue[i].choice !== 'runPrimal') break;
			}
			this.setWeather('sunnyday');
		},
		onFaint: function () {
			this.add('c|%panpawn|how RUDE ;_;7');
		},
		onSwitchOut: function () {
			this.add('c|%panpawn|... >:^(');
		},
	},
	scotteh: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|&Scotteh|─────▄▄████▀█▄');
			this.add('c|&Scotteh|───▄██████████████████▄');
			this.add('c|&Scotteh|─▄█████.▼.▼.▼.▼.▼.▼.▼');
		},
		onFaint: function () {
			this.add('-message', '▄███████▄.▲.▲.▲.▲.▲.▲');
			this.add('-message', '█████████████████████▀▀');
		},
	},
	scythernoswiping: {
		exists: true,
		noCopy: true,
		effectType: 'Ability',
		onDamage: function (damage, target, source, effect) {
			if (effect && effect.id === 'stealthrock') {
				return false;
			}
		},
		onTryHit: function (target, source, move) {
			if (move.type === 'Rock' && !target.activeTurns) {
				this.add('-immune', target, '[msg]', '[from] ability: Mountaineer');
				return null;
			}
		},
		onStart: function () {
			this.add('c|@Scyther NO Swiping|/me prepares to swipe victory');
		},
		onFaint: function () {
			this.add('c|@Scyther NO Swiping|Aww man');
		},
	},
	sirdonovan: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|~sirDonovan|Oh, a battle? Let me finish my tea and crumpets');
		},
		onFaint: function () {
			this.add('-message', 'RIP sirDonovan');
		},
	},
	spacebass: {
		exists: true,
		noCopy: true,
		effectType: 'Ability',
		/*onStart: function () {
			this.add('c|@SpaceBass|');
		},*/
		onSwitchOut: function (pokemon) {
			pokemon.heal(this.modify(pokemon.maxhp, 0.4));
		},
		/*onFaint: function () {
			this.add('c|@SpaceBass|');
		},*/
	},
	teremiare: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|@Teremiare|(>\'o\')>');
		},
		onFaint: function () {
			this.add('c|@Teremiare|<(\'o\'<)');
		},
	},
	tiksi: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|@Tiksi|Hakkaa päälle!');
		},
		onSwitchOut: function () {
			this.add('c|@Tiksi|TI rigged this ok');
		},
		onFaint: function (pokemon) {
			this.add('c|@Tiksi|You rotten ' + pokemon.side.foe.name + '! I\'ll send you to the Tiksi branch!');
		},
	},
	trickster: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|@Trickster|(◕‿◕✿)');
		},
		onFaint: function () {
			this.add('c|@Trickster|(✖﹏✖✿)');
		},
		onSwitchOut: function () {
			this.add('c|@Trickster|(◠﹏◠✿)');
		},
	},
	xfix: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|@xfix|apparently pomeg berry can be used as sturdy if you hold down+B');
		},
		onFaint: function (pokemon) {
			if (pokemon.pomegBerryTriggered) {
				this.add('c|@xfix|shouldn\'t pomeg berry protect from **all** hits... cheater');
			} else {
				this.add('c|@xfix|or was it about Pokemon capture... i get confused sometimes, next time i will be more prepared');
			}
		},
		onDamagePriority: -100,
		onDamage: function (damage, target, source, effect) {
			if (target.item === 'pomegberry' && target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				target.pomegBerryTriggered = true;
				this.add('-item', target, 'Pomeg Berry');
				return target.hp - 1;
			}
		},
		onTryHit: function (pokemon, target, move) {
			if (pokemon.item === 'pomegberry' && move.ohko) {
				pokemon.pomegBerryTriggered = true;
				this.add('-immune', pokemon, '[msg]', '[from] item: Pomeg Berry');
				return null;
			}
		},
	},
	zod: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|%Zod|Get ready to go full out!');
		},
		onFaint: function (pokemon) {
			this.add(`c|%Zod|I'm sorry ${pokemon.side.foe.name}, but you're off the team for the rest of the season.`);
		},
		onSwitchOut: function () {
			this.add('c|%Zod|Pause the music I need some water');
		},
	},
};
