'use strict';

/**@type {{[k: string]: ModdedEffectData}} */
let BattleStatuses = {
	/*
	// Example:
	userid: {
		noCopy: true,
		onStart: function () {
			this.add(`c|+Username|Switch In Message`);
		},
		onSwitchOut: function () {
			this.add(`c|+Username|Switch Out Message`);
		},
		onFaint: function () {
			this.add(`c|+Username|Faint Message`);
		},
		// Innate effects go here
	},
	*/
	// Please keep statuses organized alphabetically based on staff member name!
	aelita: {
		noCopy: true,
		onStart: function () {
			this.add(`c|@Aelita|Transfer, Aelita! Scanner, Aelita! Virtualization!`);
		},
		onSwitchOut: function () {
			this.add(`c|@Aelita|I have a tower to deactivate. See ya!`);
		},
		onFaint: function () {
			this.add(`c|@Aelita|CODE: LYOKO . Tower deactivated... Return to the past, now!`);
		},
	},
	beowulf: {
		noCopy: true,
		onStart: function () {
			this.add(`c|@Beowulf|/me BUZZES LOUDLY`);
		},
		onSwitchOut: function () {
			this.add(`c|@Beowulf|/me BUZZES LOUDLY`);
		},
		onFaint: function () {
			this.add(`c|@Beowulf|BUZZ BUZZ BUZZ BUZZ`);
		},
	},
	cc: {
		noCopy: true,
		onStart: function () {
			this.add(`c|%cc|Yo guys! :]`);
		},
		onSwitchOut: function () {
			this.add(`c|%cc|Gotta go brb`);
		},
		onFaint: function () {
			this.add(`c|%cc|Unfort`);
		},
	},
	eternally: {
		noCopy: true,
		onStart: function () {
			this.add(`c|@eternally|quack`);
		},
		onFaint: function () {
			this.add(`c|@eternally|quack`);
		},
	},
	kalalokki: {
		noCopy: true,
		onStart: function () {
			this.add(`c|@Kalalokki|(•_•)`);
			this.add(`c|@Kalalokki|( •_•)>⌐■-■`);
			this.add(`c|@Kalalokki|(⌐■_■)`);
			this.setWeather('raindance');
		},
		onFaint: function () {
			this.add(`c|@Kalalokki|(⌐■_■)`);
			this.add(`c|@Kalalokki|( •_•)>⌐■-■`);
			this.add(`c|@Kalalokki|(x_x)`);
		},
	},
	hippopotas: {
		noCopy: true,
		onStart: function () {
			this.add(`c|@Hippopotas|Something broke. If you're seeing this message, please PM a staff member about it.`);
		},
		onSwitchOut: function () {
			this.add(`c|@Hippopotas|Something broke. If you're seeing this message, please PM a staff member about it.`);
		},
		onFaint: function () {
			this.add(`c|@Hippopotas|Something broke. If you're seeing this message, please PM a staff member about it.`);
		},
	},
	hoeenhero: {
		noCopy: true,
		onStart: function () {
			this.add(`c|&HoeenHero|I'll script my way to victory!`);
		},
		onSwitchOut: function () {
			this.add(`c|&HoeenHero|I need to look something up, hold on...`);
		},
		onFaint: function () {
			this.add(`c|&HoeenHero|NO! There must of been a bug in my script ;-;`);
		},
	},
	iyarito: {
		noCopy: true,
		onStart: function () {
			this.add(`c|@Iyarito|Iyarito is always right`);
		},
		onSwitchOut: function () {
			this.add(`c|@Iyarito|It's all Iyarito's fault`);
		},
		onFaint: function () {
			this.add(`c|@Iyarito|RIP Patrona`);
		},
	},
	kingswordyt: {
		noCopy: true,
		onStart: function () {
			this.add(`c|@KingSwordYT|You're the master of your destiny, take destiny by the horns and have fun!`);
		},
		onSwitchOut: function () {
			this.add(`c|@KingSwordYT|I eat when im upset, and i gotta eat`);
		},
		onFaint: function () {
			this.add(`c|@KingSwordYT|BUAAAAAA IYA AYÚDAME :(`);
		},
	},
	macchaeger: {
		noCopy: true,
		onStart: function () {
			this.add(`c|@MacChaeger|What are you gonna do with that big bat? Gonna hit me? Better make it count. Better make it hurt. Better kill me in one shot.`);
		},
		onFaint: function () {
			this.add(`c|@MacChaeger|im gonna pyuk`);
		},
	},
	megazard: {
		noCopy: true,
		onStart: function () {
			this.add(`c|@Megazard|Almond top of the world!`);
		},
		onSwitchOut: function () {
			this.add(`c|@Megazard|Change of plants`);
		},
		onFaint: function () {
			this.add(`c|@Megazard|Better luck next thyme`);
		},
	},
	moo: {
		noCopy: true,
		onStart: function () {
			this.add(`c|@moo|/me moo`);
		},
		onSwitchOut: function () {
			this.add(`c|@moo|/me moo`);
		},
		onFaint: function () {
			this.add(`c|@moo|/me moo`);
		},
	},
	torkool: {
		noCopy: true,
		onStart: function () {
			this.add(`c|%torkool|:peepodetective:`);
		},
		onSwitchOut: function () {
			this.add(`c|%torkool|i cba`);
		},
		onFaint: function () {
			this.add(`c|%torkool|I don't deserve this...`);
		},
	},
};

exports.BattleStatuses = BattleStatuses;
