$(document).ready(function () {
	var turn = 0;
	var token = 'X';

	$(".box").on("click", function() {
		var clickedBox = $(this).attr('id');

		var boxText = $("#" + clickedBox).html();

		if (boxText != "") {
			return;
		}

		if (turn % 2 == 0) {
			token = 'X';
		} else {
			token = 'O';
		}

		$("#" + clickedBox).html(token);

		turn++;

	});

	var otherTurn = 0;
	var color = "blue";

	$(".cell").on("click", function() {
		var clickedBox = $(this).attr('id');

		var boxText = $("#" + clickedBox).html();

		if (boxText != "") {
			return;
		}

		if (otherTurn % 2 == 0) {
			color = "blue";
		} else {
			color = "red";
		}

		$("#" + clickedBox).css('background-color', color);

		otherTurn++;

	});
});