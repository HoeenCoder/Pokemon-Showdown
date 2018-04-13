'use strict';

exports.BattleStatuses = {
	acast: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|%Acast|Are you watching, Gamefreak? THIS IS WHAT DECIDUEYE COULD HAVE BEEN');
		},
		onSwitchOut: function () {
			this.add('c|%Acast|I\'ll be back when Monotype is official.');
		},
		onFaint: function () {
			this.add('c|%Acast|Gamefreak didn\'t love me enough ;-;');
		},
	},
	aelita: {
		exists: true,
		noCopy: true,
		onStart: function (target, source) {
			this.add('c|%Aelita|Transfer, Aelita. Scanner, Aelita. Virtualization!');
		},
		onFaint: function () {
			this.add('c|%Aelita|CODE: LYOKO. Tower deactivated...');
		},
	},
	akir: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add("c|%Akir|Yeah yeah...I'm awake. What do you need?");
		},
		onSwitchOut: function () {
			this.add("c|%Akir|I'm busy, can't play.");
		},
		onFaint: function () {
			this.add("c|%Akir|Going to bed, goodbye");
		},
	},
	amingo: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add("c|+Amingo|I'm too sober for this.");
		},
		onSwitchOut: function () {
			this.add("c|+Amingo|Time to grab a whisky.");
		},
		onFaint: function () {
			this.add("c|+Amingo|That was some questionable decisions dude.");
		},
		// This should be applied directly to the stat as opposed to chaining witht he others
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.modify(atk, 1.5);
		},
		onModifyMove: function (move) {
			if (move.category === 'Physical' && typeof move.accuracy === 'number') {
				move.accuracy *= 0.8;
			}
		},
		onImmunity: function (type, pokemon) {
			if (type === 'sandstorm' || type === 'hail' || type === 'powder') return false;
		},
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (move.flags['powder'] && target !== source && this.getImmunity('powder', target)) {
				this.add('-immune', target, '[msg]', '[from] ability: Overcoat');
				return null;
			}
		},
	},
	andy: {
		exists: true,
		noCopy: true,
		onUpdate: function (pokemon) {
			let name = toId(pokemon.name);
			if (pokemon.template.isMega) {
				if (name === 'andy' && pokemon.getAbility().id === 'magicbounce') {
					pokemon.setAbility('Adaptability');
					this.add('-ability', pokemon, 'Adaptability');
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
	ant: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add("c|&ant|the superior ant is here");
		},
		onSwitchOut: function () {
			this.add("c|&ant|hasta la vista baby");
		},
		onFaint: function () {
			this.add("c|&ant|I'M NOT ANTEMORTEM");
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
	arrested: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add("c|%Arrested|Let's get this party started.");
		},
		onSwitchOut: function () {
			this.add("c|%Arrested|I need a break, this is tiring.");
		},
		onFaint: function () {
			this.add("c|%Arrested|It's cool, I didn't wanna battle anyway.");
		},
	},
	articuno: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|%articuno|/me teleports behind you "hehe..."');
		},
		onSwitchOut: function () {
			this.add("c|%articuno|You haven't seen the last of these tail feathers...");
		},
		onFaint: function () {
			this.add("c|%articuno|Stall is a viable strat...!");
		},
	},
	legendaryfrost: {
		effectType: 'Weather',
		duration: 5,
		onStart: function (battle, source, effect) {
			this.add('-weather', 'Legendary Frost');
		},
		onTryMove: function (target, source, effect) {
			if (effect.type === 'Fire') {
				this.debug('Legendary Frost fire suppress');
				this.add('-message', 'But it was too cold to use the move!');
				return null;
			}
		},
		onResidualOrder: 1,
		onResidual: function () {
			this.add('-weather', 'Legendary Frost', '[upkeep]');
			this.add('html|<div><small>The hail is crashing down.</small></div>');
			if (this.isWeather('legendaryfrost')) this.eachEvent('Weather');
		},
		onWeather: function (target) {
			this.damage(target.maxhp / 16, null, null, 'hail');
		},
		onEnd: function () {
			this.add('-weather', 'none');
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
	asty: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|#Asty|Once upon a time, there was a user called Asty. Asty said "Hello" in the Spanish chat room. After he said this, a user came and complained about staff corruption and injustice because of what Asty said.');
			this.add("c|#Asty|The end :V");
		},
		onSwitchOut: function () {
			this.add("c|#Asty|Eventos was a mistake :\\/");
		},
		onFaint: function () {
			this.add("c|#Asty|VISCA CATALUNYA INDEPENDENT ll*ll :\u29F9\u29F8");
		},
	},
	atomicllamas: {
		exists: true,
		noCopy: true,
		onStart: function (pokemon) {
			/*pokemon.setAbility('Bad Dreams');
			this.add('-ability', pokemon, 'Bad Dreams');*/
			this.add('c| atomicllamas|:blobwave:');
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (!pokemon.hp) return;
			for (let i = 0; i < pokemon.side.foe.active.length; i++) {
				let target = pokemon.side.foe.active[i];
				if (!target || !target.hp) continue;
				if (target.status === 'slp' || target.hasAbility('comatose')) {
					this.damage(target.maxhp / 8, target, pokemon);
				}
			}
		},
		onFaint: function () {
			this.add('c| atomicllamas|Same.');
		},
		onSwitchOut: function () {
			this.add('c| atomicllamas|:blobwavereverse:');
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
	biggie: {
		exists: true,
		noCopy: true,
		onStart: function () {
			let sentences = ["Now I'm in the limelight cause I rhyme tight", "HAPPY FEET! WOMBO COMBO!", "You finna mess around and get dunked on"];
			this.add('c|@biggie|' + sentences[this.random(3)]);
		},
		onFaint: function () {
			let sentences = ['It was all a dream', 'It\'s gotta be the shoes', 'ヽ༼ຈل͜ຈ༽ﾉ RIOT ヽ༼ຈل͜ຈ༽ﾉ'];
			this.add('c|@biggie|' + sentences[this.random(3)]);
		},
	},
	bondie: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add("c|+Bondie|Have you tried the toast sandwich?");
		},
		onSwitchOut: function () {
			this.add("c|+Bondie|It's just bread, toast, and bread");
		},
		onFaint: function () {
			this.add("c|+Bondie|NEVER go toast, bread, toast");
		},
	},
	brandon: {
		exists: true,
		noCopy: true,
		onStart: function () {
			let sentences = ["My milkshake brings all the boys to the yard", "I'm just here to hax Astara", "On good days, I am charming as fuck"];
			this.add('c|%Brandon~|' + sentences[this.random(3)]);
		},
		onSwitchOut: function () {
			let sentences = ["Up out my face boy", "I just wanna be part of your symphony", "I'm out"];
			this.add('c|%Brandon~|' + sentences[this.random(3)]);
		},
		onFaint: function () {
			let sentences = ["Let's go to perfect places", "Phew! I'm gonna need to take a break", "Maybe one day, I'll find my Brooklyn baby..."];
			this.add('c|%Brandon~|' + sentences[this.random(3)]);
		},
	},
	bumbadadabum: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add("c|&bumbadadabum|The light shall burn you!");
			// if (pokemon.side.foe.active.length && pokemon.side.foe.active[0].name === 'Scotteh') this.add('c|&bumbadadabum|Also, fuck you Scotteh');
		},
		onFaint: function () {
			this.add("c|&bumbadadabum|Find another planet make the same mistakes.");
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
		// incase i'm wrong in removing this just comment it out for now
		/*onAfterMove: function (pokemon) {
			if (pokemon.template.forme !== 'Blade') return;
			if (pokemon.formeChange('Aegislash')) {
				this.add('-formechange', pokemon, 'Aegislash', '[from] ability: Stance Change');
			}
		},*/
	},
	ceterisparibus: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add("c|%Ceteris Paribus|Your loss is inevitable, you best forfeit the battle if you know what's good for you. \u2570(\u21C0\uFE3F\u21C0)\u3064-]\u2550\u2500\u2500\u2500");
		},
		onSwitchOut: function (pokemon) {
			this.add(`c|%Ceteris Paribus|Saving the best for last, ${pokemon.side.name}, a wise choice my friend.`);
		},
		onFaint: function () {
			this.add('c|%Ceteris Paribus|IMPOSSIBLE!! THIS IS AN OUTRAGE!! I WILL EXACT MY REVENGE ON YOU ONE DAY (\u25E3_\u25E2)');
		},
	},
	chloe: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|%Chloe|hallo');
		},
		onSwitchOut: function () {
			this.add('c|%Chloe|brb');
		},
		onFaint: function () {
			this.add('c|%Chloe|/me (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧');
		},
	},
	dragonwhale: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|@DragonWhale|gg lol');
		},
		onSwitchOut: function () {
			this.add('c|@DragonWhale|gg lol');
		},
		onFaint: function () {
			this.add('c|@DragonWhale|gg lol');
		},
	},
	duck: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|@Duck|Yes, I\'m actually a duck. I know.');
		},
		onSwitchOut: function () {
			this.add('c|@Duck|**waddles away**');
		},
		onFaint: function () {
			this.add('c|@Duck|Duck you! That move was too op anyway....');
		},
		onModifyCritRatio: function (critRatio) {
			return critRatio + 1;
		},
	},
	eternally: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|%eternally|quack');
		},
		onSwitchOut: function () {
			this.add('c|%eternally|ducklett lol');
		},
		onFaint: function () {
			this.add('c|%eternally|quack');
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
	eyan: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|@Eyan|WHAT DO YOU WANT??');
		},
		onSwitchOut: function () {
			this.add('c|@Eyan|the wings of steel will return');
		},
		onFaint: function () {
			this.add("c|@Eyan|I suck more than hikari's internet");
		},
	},
	false: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|@false|\u0669(\u2022\u0324\u0300\u1D55\u2022\u0324\u0301\u0E51)\u1D52\u1D4F\u1D4E\u1D4E\u1D4E\u1D4E');
		},
		onSwitchOut: function () {
			this.add('c|@false|\u0669(\u0E51\u2022\u25E1-\u0E51)\u06F6\u24BD\u24E4\u24BC\u2764');
		},
		onFaint: function () {
			this.add("c|@false|\u0262\u221E\u05E4\u22C6\u1599\u1D52\u1D5D \u0669\uA4B0\u201D\u032E*\u0942\uA4B1");
		},
	},
	formerhope: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|+Former Hope|A new Hope');
		},
		onModifyMove: function (move) {
			move.infiltrates = true;
		},
		onSwitchOut: function () {
			this.add('c|+Former Hope|Return of the Hope');
		},
		onFaint: function (pokemon) {
			this.add(`c|+Former Hope|Help me ${pokemon.side.name} you're my only hope`);
		},
	},
	goodmorningespeon: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|%GoodMorningEspeon|type /part to continue participating in this battle :)');
		},
		onFaint: function () {
			this.add('c|%GoodMorningEspeon|it\'s 5 am and i haven\'t slept yet wtf');
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
	haund: {
		exists: true,
		noCopy: true,
		onStart: function (pokemon) {
			this.add('-ability', pokemon, 'Prodigy');
			this.addPseudoWeather('prodigyweather', pokemon, "Prodigy");
			this.add('c|%Haund|le balanced normal flying bird has arrived');
		},
		onSwitchOut: function (pokemon) {
			const foes = pokemon.side.foe.active;
			if (this.pseudoWeather['prodigyweather'] && !(foes.length && foes[0].volatiles['prodigy'])) {
				this.removePseudoWeather('prodigyweather', pokemon);
			}
		},
		onFaint: function (pokemon) {
			const foes = pokemon.side.foe.active;
			if (this.pseudoWeather['prodigyweather'] && !(foes.length && foes[0].volatiles['prodigy'])) {
				this.removePseudoWeather('prodigyweather', pokemon);
			}
			this.add('c|%Haund|omg noob team report');
		},
	},
	prodigyweather: {
		effectType: 'Pseudoweather',
		duration: 0,
		onStart: function () {
			this.add('message', "Physical and special move categories on the battlefield have become inverted!");
		},
		onModifyMove: function (move) {
			if (move.category === 'Physical') {
				move.category = 'Special';
			} else if (move.category === 'Special') {
				move.category = 'Physical';
			}
		},
		onEnd: function () {
			this.add('message', "Physical and special move categories on the battlefield have returned to normal!");
		},
	},
	healndeal: {
		exists: true,
		noCopy: true,
		onModifyMove: function (move) {
			if (move.secondaries) {
				this.debug('double secondary chance');
				for (let i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance *= 2;
				}
			}
		},
	},
	hippopotas: {
		exists: true,
		noCopy: true,
		onModifyDefPriority: 6,
		onModifyDef: function (def) {
			return this.chainModify(1.5);
		},
		onModifySpDPriority: 6,
		onModifySpD: function (spd) {
			return this.chainModify(1.5);
		},
		onAfterUseItem: function (item, pokemon) {
			if (pokemon.item) return;
			this.useMove('recycle', pokemon);
		},
	},
	hoeenhero: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|&HoeenHero|I have cheat codes!');
		},
		onFaint: function () {
			this.add('c|&HoeenHero|No! My cheats wern\'t enough ;-;');
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
		onFaint: function (pokemon) {
			pokemon.side.addSideCondition('healingwish', pokemon, this);
			let sentences = ['Did you rage quit?', 'How\'d you lose with this set?'];
			this.add('c|@innovamania|' + sentences[this.random(2)]);
		},
	},
	iyarito: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|@Iyarito|Iyarito is always right');
		},
		onSwitchOut: function () {
			this.add('c|@Iyarito|It\'s all Iyarito\'s fault');
		},
		onFaint: function () {
			this.add('c|~Zarel|Iyarito you did it wrong ;_;');
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
	kaori: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|%Kaori|Hello there.');
		},
		onSwitchOut: function () {
			this.add('c|%Kaori|A surprise to be sure, but a welcome one.');
		},
		onFaint: function () {
			this.add('c|%Kaori|Another happy landing.');
		},
	},
	kay: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|%Kay|Every kiss begins with kay');
		},
		onSwitchOut: function () {
			this.add('c|%Kay|\u304F\u30B3:\u5F61');
		},
		onFaint: function () {
			this.add('c|%Kay|\u304F\u30B3:\u5F61');
		},
	},
	kingswordyt: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add("c|%KingSwordYT|You're the master of your destiny, take destiny by the horns and have fun!");
		},
		onSwitchOut: function () {
			this.add('c|%KingSwordYT|I eat when im upset, and i gotta eat');
		},
		onFaint: function () {
			this.add('c|%KingSwordYT|BUAAAAAA IYA AY\u00DADAME :(');
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
	lifeisdank: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|@LifeisDANK|(\u2070\u2296\u2070)Peent');
		},
		onFaint: function () {
			this.add('c|@LifeisDANK|(\u2022\u0348\u2314\u2022\u0348 ) ...peent');
		},
	},
	macchaeger: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add("c|%MacChaeger|What are you gonna do with that big bat? Gonna hit me? Better make it count. Better make it hurt. Better kill me in one shot.");
		},
		onFaint: function () {
			this.add("c|%MacChaeger|i'm gonna pyuk");
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
	noved: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|%NOVED|follow me on twitch /novedpoke');
		},
		onFaint: function () {
			this.add('c|%NOVED|follow me on twitter too @novedpoke');
		},
	},
	// nv
	aridplateau: {
		effectType: 'Weather',
		duration: 0,
		onEffectiveness: function (typeMod, target, type, move) {
			if (move && move.effectType === 'Move' && type === 'Rock' && typeMod > 0) {
				this.add('-activate', target, 'Arid Plateau');
				return 0;
			}
		},
		onModifySpDPriority: 10,
		onModifySpD: function (spd, pokemon) {
			if (pokemon.hasType('Rock') && this.isWeather('aridplateau')) {
				return this.modify(spd, 1.5);
			}
		},
		onStart: function (battle, source, effect) {
			this.add('-weather', 'Arid Plateau', '[from] ability: ' + effect, '[of] ' + source);
		},
		onResidualOrder: 1,
		onResidual: function () {
			this.add('-weather', 'Arid Plateau', '[upkeep]');
			this.add('html|<div><small>The dust storm is raging.</small></div>');
			this.eachEvent('Weather');
		},
		onWeather: function (target) {
			this.damage(target.maxhp / 16, null, null, 'sandstorm');
		},
		onEnd: function () {
			this.add('-weather', 'none');
		},
	},
	nui: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|@nui|**Omae wa mou Shinderu \u0CA0_\u0CA0**');
		},
		onSwitchOut: function () {
			this.add('c|@nui|See ya! \u2727__ \u2727__\uFF9F\u30FB: *__\u30FD__(\u25D5\u30EE__\u25D5\u30FD__)');
		},
		onFaint: function () {
			this.add('c|@nui|(\u25D5\uFE3F\u25D5\u273F)');
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
			// if (pokemon.side.foe.active.length && pokemon.side.foe.active[0].name === 'bumbadadabum') this.add('c|&bumbadadabum|Fuck you Scotteh');
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
	sigilyph: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|@Sigilyph|Perpare for the Soog');
		},
		onModifyMovePriority: -5,
		onModifyMove: function (move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Psychic'] = true;
			}
		},
		onModifySpe: function (spe) {
			return this.chainModify(1.1);
		},
		onSwitchOut: function () {
			this.add('c|@Sigilyph|Swerve lmao');
		},
		onFaint: function () {
			this.add('c|@Sigilyph|**SOOGOOLOOPH**');
		},
	},
	soccer: {
		exists: true,
		noCopy: true,
		onStart: function (pokemon) {
			this.add('j|@Soccer');
			pokemon.side.addSideCondition('soccergreeting', pokemon);
		},
		onSwitchOut: function (pokemon) {
			this.add("c|@Soccer|I'll come back when you switch me in");
			this.add('l|@Soccer');
			pokemon.side.removeSideCondition('soccergreeting');
		},
		onFaint: function (pokemon) {
			this.add("c|@Soccer|I was only here to see myself in action");
			this.add('l|@Soccer');
			pokemon.side.removeSideCondition('soccergreeting');
		},
	},
	soccergreeting: {
		duration: 2,
		onEnd: function () {
			if (this.effectData.duration !== 0) return;
			this.add(`c|@Soccer|Yo ${this.p1.name}, ${this.p2.name}`);
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
	swirlyder: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|%Swirlyder|/me swirls');
		},
		onSwitchOut: function () {
			this.add('c|%Swirlyder|/me swirls on');
		},
		onFaint: function () {
			this.add('c|%Swirlyder|/me sad swirls :(');
		},
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
	theimmortal: {
		exists: true,
		noCopy: true,
		onUpdate: function (pokemon) {
			let name = toId(pokemon.name);
			if (pokemon.template.isMega && pokemon.getAbility().id === 'megalauncher') {
				if (name === 'theimmortal') {
					pokemon.setAbility('Cloud Nine');
					this.add('-ability', pokemon, 'Cloud Nine');
				}
			}
		},
		/*onStart: function () {

		},
		onSwitchOut: function () {

		},
		onFaint: function () {

		},*/
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
	timbuktu: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|%Timbuktu|Would you like to join the Revival Party?');
		},
		onFaint: function () {
			this.add('c|%Timbuktu|Would you like to join the Revival Party?');
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
	urkerab: {
		exists: true,
		noCopy: true,
		onStart: function (pokemon) {
			pokemon.addVolatile('focusenergy', pokemon);
			this.add('j|@urkerab');
		},
		onFaint: function () {
			this.add('l|@urkerab');
		},
		/* onSwitchOut: function () {
			this.add('l|@urkerab');
		}, */
	},
	winry: {
		exists: true,
		noCopy: true,
		onStart: function () {
			this.add('c|%winry|fight me irl');
		},
		onFaint: function () {
			this.add('c|%winry|I AM NOT A WEEB');
		},
		onModifyDef: function () {
			return this.chainModify(3.2);
		},
		onModifySpD: function () {
			return this.chainModify(3.2);
		},
		onModifyAtk: function () {
			return this.chainModify(1.7);
		},
		onModifySpA: function () {
			return this.chainModify(1.7);
		},
		onAfterDamage: function (damage, target, source, effect) {
			if (effect && effect.category && effect.category !== 'Status' && source && source.hp) {
				this.add('-ability', target, 'Hella Cute');
				this.boost({def: -1, spd: -1}, source, target, effect);
			}
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
