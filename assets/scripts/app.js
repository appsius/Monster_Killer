const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackHandler() {
	const damage = dealMonsterDamage(ATTACK_VALUE);
	currentMonsterHealth -= damage;

	const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
	currentPlayerHealth -= playerDamage;

	if (currentMonsterHealth <= 0 && currentPlayerHealth >= 0) {
		alert('YOU WON!');
	} else if (currentPlayerHealth <= 0 && currentMonsterHealth >= 0) {
		alert('YOU LOSE!');
	} else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
		alert('YOU HAVE A DRAW. DRAW AGAIN!');
	}
}

attackBtn.addEventListener('click', attackHandler);
