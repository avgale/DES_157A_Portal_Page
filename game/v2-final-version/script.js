(function(){
	
	"use strict";
	
	const startGame = document.getElementById('startgame');
	const gameControl = document.getElementById('center');
	const player1Points = document.getElementById('points1');
	const player2Points = document.getElementById('points2');

	const gameData = {
		dice: ['images/dice1.jpg', 'images/dice2.jpg', 'images/dice3.jpg', 
			   'images/dice4.jpg', 'images/dice5.jpg', 'images/dice6.jpg'],
		score: [0, 0],
		roll1: 0,
		roll2: 0,
		rollSum: 0,
		index: 0,
		gameWin: 25,
		gameEnd: 30
	};

	startGame.addEventListener('click', function () {
		gameData.index = Math.round(Math.random());
		console.log(gameData.index);

		gameControl.style.height = '50vh';
		gameControl.innerHTML = `<p>Player ${(gameData.index)+1}'s turn</p>`;
		setUpTurn();
	});

	function setUpTurn() {
		gameControl.innerHTML += `<div id="dice">
							<img id="roll1" src="images/dice1.jpg" alt="dice face">
							<img id="roll2" src="images/dice3.jpg" alt="dice face">
							</div>`;
		gameControl.innerHTML += '<a id="roll" href="#">Roll dice</a>';
		gameControl.innerHTML += '<a id="pass" href="#">Pass</a>';
		document.getElementById('roll').addEventListener('click', function(){
			throwDice();
		});
		document.getElementById('pass').addEventListener('click', function () {
			gameData.index ? (gameData.index = 0) : (gameData.index = 1);
			gameControl.innerHTML = `<p>Player ${(gameData.index)+1}'s turn</p>`;
			setUpTurn();
		});
	}

	function throwDice(){
		gameData.roll1 = Math.floor(Math.random() * 6) + 1; //using ceil could result in a zero
		gameData.roll2 = Math.floor(Math.random() * 6) + 1;
		gameControl.innerHTML = `<p>Player ${(gameData.index)+1}'s turn</p>`;
		gameControl.innerHTML += `<div id="dice">
							<img id="roll1" src="${gameData.dice[gameData.roll1-1]}" alt="dice face">
							<img id="roll2" src="${gameData.dice[gameData.roll2-1]}" alt="dice face">
							</div>`;
		gameControl.innerHTML += '<a id="roll" href="#">Roll dice</a>';
		gameControl.innerHTML += '<a id="pass" href="#">Pass</a>';
		gameData.rollSum = gameData.roll1 + gameData.roll2;

		gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
		if (gameData.index == 0) {
			player1Points.innerHTML = `${gameData.score[0]} points`;
			updateSlider(1);
			updateToast(1);
		} else {
			player2Points.innerHTML = `${gameData.score[1]} points`;
			updateSlider(2);
			updateToast(2);
		}

		checkCondition();

	}

	function checkCondition() {
		if ((gameData.score[gameData.index] >= gameData.gameWin) && (gameData.score[gameData.index] <= gameData.gameEnd)) {
			gameControl.innerHTML = `<p>Player ${(gameData.index)+1} wins!</p>
            <p>The toast is<br>perfectly<br>crunchy.</p>
            <a id="restart" href="#">Restart</a>`;

			document.getElementById('restart').addEventListener('click', function () {
				location.reload();
			});
		} else if (gameData.score[gameData.index] > gameData.gameEnd) {
			let otherPlayer;
			if ((gameData.index) == 0) {
				otherPlayer = 2;
			} else {
				otherPlayer = 1;
			}
			
			gameControl.innerHTML = `<p>Oh no!</p>
            <p>Player ${(gameData.index)+1} <br>burned their<br>toast.</p>
            <p>Player ${otherPlayer} wins!</p>
            <a id="restart" href="#">Restart</a>`;

			document.getElementById('restart').addEventListener('click', function () {
				location.reload();
			});
		} else {
			document.getElementById('roll').addEventListener('click', function(){
				throwDice();
			});

			document.getElementById('pass').addEventListener('click', function () {
				gameData.index ? (gameData.index = 0) : (gameData.index = 1);
				gameControl.innerHTML = `<p>Player ${(gameData.index)+1}'s turn</p>`;
				setUpTurn();
			});
		}
	}

	function updateSlider(player) {
		const arrow = document.getElementById(`arrow${player}`);
		arrow.style.left = `calc(${((gameData.score[player-1])/40)*100}% - 10px)`;
	}

	function updateToast(player) {
		const toast = document.getElementById(`toast${player}`);
		const score = gameData.score[player-1];
		if ((score > 0) && (score <= 10)) {
			toast.src = 'images/raw.svg';
		} else if ((score > 10) && (score <= 25)) {
			toast.src = 'images/light.svg';
		} else if ((score > 25) && (score <= 30)) {
			toast.src = 'images/perfect.svg';
		} else {
			toast.src = 'images/burnt.svg';
		}
	}
}());