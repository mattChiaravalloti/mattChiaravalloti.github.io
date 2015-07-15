$(document).ready(function () {
	// when the page initially loads, create a gameboard array to represent the 9 cells in the board
	var gameboard = [];
	for (var i = 0; i < 9; i++) {
		gameboard[i] = '';
	}

	var turn = 0;

	var playerToken;

	// This funciton returns true if all elements in the gameboard are non-empty strings
	var boardIsFull = function () {
		for (var i = 0; i < 9; i++) {
			if (gameboard[i] == '') {
				return false;
			}
		}
		return true;
	}

	// this function returns the single character string that represents the winner (X or O), or T for a tie, or empty string for no winner or tie
	// Since tic tac toe can, at any given turn, only have one possible winning set of three, this function will always returnt the correct value.
	var getWinner = function() {
		var winnerToken;
		if (boardIsFull()) {
			winnerToken = 'T';
		} else {
			winnerToken = '';
		}

		for (var row = 0; row < 3; row++) {
			var r = row * 3;
			if (gameboard[r] == '' || gameboard[r+1] == '' || gameboard[r+2] == '') {
				continue;
			}
			if (gameboard[r] == gameboard[r+1] && gameboard[r+1] == gameboard[r+2]) {
				winnerToken = gameboard[r];
			}
		}

		for (var col = 0; col < 3; col++) {
			if (gameboard[col] == '' || gameboard[col+3] == '' || gameboard[col+6] == '') {
				continue;
			}
			if (gameboard[col] == gameboard[col+3] && gameboard[col+3] == gameboard[col+6]) {
				winnerToken = gameboard[col];
			}
		}

		if ((gameboard[0] == gameboard[4] && gameboard[4] == gameboard[8]) ||
			(gameboard[6] == gameboard[4] && gameboard[4] == gameboard[2])) {
			winnerToken = gameboard[4];
		}

		return winnerToken;
	}

	$(".cell").on("click", function () {
		// cell id values are cell#, thus the 4th index is the actual number
		var cellNum = $(this).attr("id")[4];

		// if the cell is not empty, then it is not a valid option
		if ($(this).html() != '' || getWinner() != '') {
			return;
		}

		// even turn means it's X's turn, thus odd means O
		if (turn % 2 == 0) {
			playerToken = "X";
			$("#info").html("O's Turn!");
		} else {
			playerToken = "O";
			$("#info").html("X's Turn!");
		}

		// update the array
		gameboard[cellNum] = playerToken;

		// update the html
		$(this).html(playerToken);

		var winner = getWinner();
		if (winner != '') {
			if (winner == 'T') {
				$("#info").html("Tie! Classic ending. Click to reset.");
			} else if (winner == 'X') {
				$("#info").html("X is the winner! Click to reset.");
			} else {
				$("#info").html("O is the winner! Click to reset.");
			}
			$("#info").css("cursor", "pointer");
		}

		// increment the turn
		turn++;
	});

	$("#info").on("click", function () {
		if (getWinner() != '') {
			turn = 0;
			for (var i = 0; i < 9; i++) {
				gameboard[i] = '';
				$("#cell" + i).html("");
			}
			$("#info").css("cursor", "default");
			$("#info").html("X's Turn!");
		}
	});
});