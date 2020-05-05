const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;
const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const enteredValue = prompt(
	'Maximum Chosen Life for you and a monster.',
	'100'
);

let chosenMaxLife = parseInt(enteredValue);
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

if (isNaN(chosenMaxLife && chosenMaxLife <= 0)) {
	chosenMaxLife = 100;
}

adjustHealthBars(chosenMaxLife);

function reset() {
	currentMonsterHealth = chosenMaxLife;
	currentPlayerHealth = chosenMaxLife;
	resetGame(chosenMaxLife);
}

function endRound() {
	const initialPlayerHealth = currentPlayerHealth;
	const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
	currentPlayerHealth -= playerDamage;

	if (currentPlayerHealth <= 0 && hasBonusLife) {
		hasBonusLife = false;
		removeBonusLife();
		currentPlayerHealth = initialPlayerHealth;
		setPlayerHealth(initialPlayerHealth);
		alert('You will dead if BonuLife does not exist');
	}

	if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
		alert('YOU WON!');
		reset();
	} else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
		alert('YOU LOSE!');
		reset();
	} else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
		alert('YOU HAVE A DRAW. DRAW AGAIN!');
		reset();
	}
}

function attackMonster(mode) {
	let maxDamage;

	if (mode === MODE_ATTACK) {
		maxDamage = ATTACK_VALUE;
	} else if (mode === MODE_STRONG_ATTACK) {
		maxDamage = STRONG_ATTACK_VALUE;
	}

	const damage = dealMonsterDamage(maxDamage);
	currentMonsterHealth -= damage;

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
	endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
