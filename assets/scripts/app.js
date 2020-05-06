const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

const enteredValue = prompt(
	'Maximum Chosen Life for you and a monster.',
	'100'
);

let chosenMaxLife = parseInt(enteredValue);
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];

if (isNaN(chosenMaxLife && chosenMaxLife <= 0)) {
	chosenMaxLife = 100;
}

adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, monsterHealth, playerHealth) {
	let logEntry;
	switch (ev) {
		case LOG_EVENT_PLAYER_ATTACK:
			logEntry = {
				event: ev,
				value: val,
				target: 'MONSTER',
				finalMonsterHealth: monsterHealth,
				finalPlayerHealth: playerHealth,
			};
			break;

		case LOG_EVENT_PLAYER_STRONG_ATTACK:
			logEntry = {
				event: ev,
				value: val,
				target: 'MONSTER',
				finalMonsterHealth: monsterHealth,
				finalPlayerHealth: playerHealth,
			};
			break;

		case LOG_EVENT_MONSTER_ATTACK:
			logEntry = {
				event: ev,
				value: val,
				target: 'PLAYER',
				finalMonsterHealth: monsterHealth,
				finalPlayerHealth: playerHealth,
			};
			break;

		case LOG_EVENT_PLAYER_HEAL:
			logEntry = {
				event: ev,
				value: val,
				target: 'PLAYER',
				finalMonsterHealth: monsterHealth,
				finalPlayerHealth: playerHealth,
			};
			break;

		case LOG_EVENT_GAME_OVER:
			logEntry = {
				event: ev,
				value: val,
				finalMonsterHealth: monsterHealth,
				finalPlayerHealth: playerHealth,
			};
			break;

		default:
			logEntry = {};
	}

	battleLog.push(logEntry);
}

function reset() {
	currentMonsterHealth = chosenMaxLife;
	currentPlayerHealth = chosenMaxLife;
	resetGame(chosenMaxLife);
}

function endRound() {
	const initialPlayerHealth = currentPlayerHealth;
	const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
	currentPlayerHealth -= playerDamage;

	writeToLog(
		LOG_EVENT_MONSTER_ATTACK,
		playerDamage,
		currentMonsterHealth,
		currentPlayerHealth
	);

	if (currentPlayerHealth <= 0 && hasBonusLife) {
		hasBonusLife = false;
		removeBonusLife();
		currentPlayerHealth = initialPlayerHealth;
		setPlayerHealth(initialPlayerHealth);
		alert('You will dead if BonuLife does not exist');
	}

	if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
		alert('YOU WON!');

		writeToLog(
			LOG_EVENT_GAME_OVER,
			'PLAYER WON!',
			currentMonsterHealth,
			currentPlayerHealth
		);

		reset();
	} else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
		alert('YOU LOSE!');

		writeToLog(
			LOG_EVENT_GAME_OVER,
			'PLAYER LOSE!',
			currentMonsterHealth,
			currentPlayerHealth
		);

		reset();
	} else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
		alert('YOU HAVE A DRAW. DRAW AGAIN!');

		writeToLog(
			LOG_EVENT_GAME_OVER,
			'A DRAw',
			currentMonsterHealth,
			currentPlayerHealth
		);

		reset();
	}
}

function attackMonster(mode) {
	const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
	const logEvent =
		mode === MODE_ATTACK
			? LOG_EVENT_PLAYER_ATTACK
			: LOG_EVENT_PLAYER_STRONG_ATTACK;

	const damage = dealMonsterDamage(maxDamage);
	currentMonsterHealth -= damage;

	writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);

	endRound();
}

function attackHandler() {
	attackMonster('ATTACK');
}

function strongAttackHandler() {
	attackMonster('STRONG_ATTACK');
}

function healPlayerHandler() {
	let healValue;
	if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
		alert(`You cannot exceed the chosen Max Life while healing...`);
		healValue = chosenMaxLife - currentPlayerHealth;
	} else {
		healValue = HEAL_VALUE;
	}

	increasePlayerHealth(HEAL_VALUE);
	currentPlayerHealth += healValue;

	writeToLog(
		LOG_EVENT_PLAYER_HEAL,
		healValue,
		currentMonsterHealth,
		currentPlayerHealth
	);

	endRound();
}

function printLogHandler() {
	console.log(battleLog);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);
