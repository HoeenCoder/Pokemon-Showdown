'use strict';

exports.BattleScripts = {
	useMoveInner: function (move, pokemon, target, sourceEffect, zMove) {
		if (!sourceEffect && this.effect.id) sourceEffect = this.effect;
		move = this.getMoveCopy(move);
		if (zMove && move.id === 'weatherball') {
			let baseMove = move;
			this.singleEvent('ModifyMove', move, null, pokemon, target, move, move);
			move = this.getZMoveCopy(move, pokemon);
			if (move.type !== 'Normal') sourceEffect = baseMove;
		} else if (zMove || (move.category !== 'Status' && sourceEffect && sourceEffect.isZ && sourceEffect.id !== 'instruct')) {
			move = this.getZMoveCopy(move, pokemon);
		}
		if (this.activeMove) {
			move.priority = this.activeMove.priority;
			move.pranksterBoosted = move.hasBounced ? false : this.activeMove.pranksterBoosted;
		}
		let baseTarget = move.target;
		if (!target && target !== false) target = this.resolveTarget(pokemon, move);
		if (move.target === 'self' || move.target === 'allies') {
			target = pokemon;
		}
		if (sourceEffect) move.sourceEffect = sourceEffect.id;
		let moveResult = false;

		this.setActiveMove(move, pokemon, target);

		this.singleEvent('ModifyMove', move, null, pokemon, target, move, move);
		if (baseTarget !== move.target) {
			// Target changed in ModifyMove, so we must adjust it here
			// Adjust before the next event so the correct target is passed to the
			// event
			target = this.resolveTarget(pokemon, move);
		}
		move = this.runEvent('ModifyMove', pokemon, target, move, move);
		if (baseTarget !== move.target) {
			// Adjust again
			target = this.resolveTarget(pokemon, move);
		}
		if (!move || pokemon.fainted) {
			return false;
		}

		let attrs = '';

		if (move.flags['charge'] && !pokemon.volatiles[move.id]) {
			attrs = '|[still]'; // suppress the default move animation
		}

		let movename = move.name;
		if (move.id === 'hiddenpower') movename = 'Hidden Power';
		if (sourceEffect) attrs += '|[from]' + this.getEffect(sourceEffect);
		if (zMove && move.isZ === true) {
			attrs = '|[anim]' + movename + attrs;
			movename = 'Z-' + movename;
		}
		this.addMove('move', pokemon, movename, target + attrs);

		if (zMove && move.category !== 'Status') {
			this.attrLastMove('[zeffect]');
		} else if (zMove && move.zMoveBoost) {
			this.boost(move.zMoveBoost, pokemon, pokemon, {id: 'zpower'});
		} else if (zMove && move.zMoveEffect === 'heal') {
			this.heal(pokemon.maxhp, pokemon, pokemon, {id: 'zpower'});
		} else if (zMove && move.zMoveEffect === 'healreplacement') {
			move.self = {sideCondition: 'healreplacement'};
		} else if (zMove && move.zMoveEffect === 'clearnegativeboost') {
			let boosts = {};
			for (let i in pokemon.boosts) {
				if (pokemon.boosts[i] < 0) {
					boosts[i] = 0;
				}
			}
			pokemon.setBoost(boosts);
			this.add('-clearnegativeboost', pokemon, '[zeffect]');
		} else if (zMove && move.zMoveEffect === 'redirect') {
			pokemon.addVolatile('followme', pokemon, {id: 'zpower'});
		} else if (zMove && move.zMoveEffect === 'crit2') {
			pokemon.addVolatile('focusenergy', pokemon, {id: 'zpower'});
		} else if (zMove && move.zMoveEffect === 'curse') {
			if (pokemon.hasType('Ghost')) {
				this.heal(pokemon.maxhp, pokemon, pokemon, {id: 'zpower'});
			} else {
				this.boost({atk: 1}, pokemon, pokemon, {id: 'zpower'});
			}
		} else if (zMove && move.zMoveEffect === "Sets Substitute, restores HP 50%") {
			// DragonWhale modded Z Move behavior
			pokemon.addVolatile('substitute', pokemon, {id: 'zpower'});
			this.heal(pokemon.maxhp / 2, pokemon, pokemon, {id: 'zpower'});
		}

		if (target === false) {
			this.attrLastMove('[notarget]');
			this.add('-notarget');
			if (move.target === 'normal') pokemon.isStaleCon = 0;
			return false;
		}

		let targets = pokemon.getMoveTargets(move, target);

		if (!sourceEffect || sourceEffect.id === 'pursuit') {
			let extraPP = 0;
			for (let i = 0; i < targets.length; i++) {
				let ppDrop = this.singleEvent('DeductPP', targets[i].getAbility(), targets[i].abilityData, targets[i], pokemon, move);
				if (ppDrop !== true) {
					extraPP += ppDrop || 0;
				}
			}
			if (extraPP > 0) {
				pokemon.deductPP(move, extraPP);
			}
		}

		if (!this.singleEvent('TryMove', move, null, pokemon, target, move) ||
			!this.runEvent('TryMove', pokemon, target, move)) {
			move.mindBlownRecoil = false;
			return false;
		}

		this.singleEvent('UseMoveMessage', move, null, pokemon, target, move);

		if (move.ignoreImmunity === undefined) {
			move.ignoreImmunity = (move.category === 'Status');
		}

		if (move.selfdestruct === 'always') {
			this.faint(pokemon, pokemon, move);
		}

		let damage = false;
		if (move.target === 'all' || move.target === 'foeSide' || move.target === 'allySide' || move.target === 'allyTeam') {
			damage = this.tryMoveHit(target, pokemon, move);
			if (damage || damage === 0 || damage === undefined) moveResult = true;
		} else if (move.target === 'allAdjacent' || move.target === 'allAdjacentFoes') {
			if (!targets.length) {
				this.attrLastMove('[notarget]');
				this.add('-notarget');
				return false;
			}
			if (targets.length > 1) move.spreadHit = true;
			let hitTargets = [];
			for (let i = 0; i < targets.length; i++) {
				let hitResult = this.tryMoveHit(targets[i], pokemon, move);
				if (hitResult || hitResult === 0 || hitResult === undefined) {
					moveResult = true;
					hitTargets.push(targets[i].toString().substr(0, 3));
				}
				if (damage !== false) {
					damage += hitResult || 0;
				} else {
					damage = hitResult;
				}
			}
			if (move.spreadHit) this.attrLastMove('[spread] ' + hitTargets.join(','));
		} else {
			target = targets[0];
			let lacksTarget = target.fainted;
			if (!lacksTarget) {
				if (move.target === 'adjacentFoe' || move.target === 'adjacentAlly' || move.target === 'normal' || move.target === 'randomNormal') {
					lacksTarget = !this.isAdjacent(target, pokemon);
				}
			}
			if (lacksTarget && (!move.flags['charge'] || pokemon.volatiles['twoturnmove'])) {
				this.attrLastMove('[notarget]');
				this.add('-notarget');
				if (move.target === 'normal') pokemon.isStaleCon = 0;
				return false;
			}
			damage = this.tryMoveHit(target, pokemon, move);
			if (damage || damage === 0 || damage === undefined) moveResult = true;
		}
		if (move.selfBoost && moveResult) this.moveHit(pokemon, pokemon, move, move.selfBoost, false, true);
		if (!pokemon.hp) {
			this.faint(pokemon, pokemon, move);
		}

		if (!moveResult) {
			this.singleEvent('MoveFail', move, null, target, pokemon, move);
			return false;
		}

		if (!move.negateSecondary && !(move.hasSheerForce && pokemon.hasAbility('sheerforce'))) {
			this.singleEvent('AfterMoveSecondarySelf', move, null, pokemon, target, move);
			this.runEvent('AfterMoveSecondarySelf', pokemon, target, move);
		}
		return true;
	},
	effectiveWeather: function () {
		if (this.suppressingWeather()) return '';
		let weatherClones = {
			desolateland: 'sunnyday',
			primordialsea: 'raindance',
			legendaryfrost: 'hail',
			aridplateau: 'sandstorm',
		};
		return weatherClones[this.weather] || this.weather;
	},
};
