'use strict';

exports.BattleStatuses = {
	ev: {
		exists: true,
		onStart: function () {
			this.add('c|~EV|nice boosts');
		},
		onFaint: function () {
			this.add('c|~EV|muk off');
		},
	},
	kamikaze: {
		exists: true,
		onStart: function () {
			this.add('c|&kamikaze|Omae Wa Mou Shindeiru');
		},
		onFaint: function () {
			this.add('c|&kamikaze|NANI!');
		},
	},
	scotteh: {
		exists: true,
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
	beowulf: {
		exists: true,
		onSwitchIn: function () {
			this.add('c|@Beowulf|Grovel peasant, you are in the presence of the RNGesus');
		},
		onFaint: function () {
			this.add('c|@Beowulf|There is no need to be mad');
		},
	},
	trickster: {
		exists: true,
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
};