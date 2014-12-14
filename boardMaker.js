//boardMaker.js

/***************************
THIS WAS SOLELY A TEST FILE
***************************/

var _ = require('underscore');

var genBoard = function() {
	var brd = [];

	var rowArr = [];
	var colArr = [];
	var boxArr = [];

	for (var i = 0; i < 9; i++) {
		rowArr[i] = [];
		colArr[i] = [];
		boxArr[i] = [];
	}

	for (var i = 0; i < 81; i++) {
		//get the row
		var row = Math.floor(i / 9);

		//get the column
		var col = i % 9;

		//get the box
		var box = 0;
		if (row > 5) {
			if (col > 5)
				box = 8;
			else if (col > 2)
				box = 7;
			else
				box = 6;
		} else if (row > 2) {
			if (col > 5)
				box = 5;
			else if (col > 2)
				box = 4;
			else
				box = 3;
		} else {
			if (col > 5)
				box = 2;
			else if (col > 2)
				box = 1;
			else
				box = 0;
		}

		var random = _.random(1,9);

		var ranArr = [];

		while (_.contains(rowArr[row], random) ||
			   _.contains(colArr[col], random) ||
			   _.contains(boxArr[box], random)) {
			
			if (!_.contains(ranArr, random)) {
				ranArr.push(random);
			}

			if (ranArr.length == 9) break;

			random = _.random(1,9);
		}

		if (ranArr.length == 9) break;

		rowArr[row].push(random);
		colArr[col].push(random);
		boxArr[box].push(random);
		brd[i] = random;
	}

	while (brd.length != 81) {
		brd = genBoard();
	}

	return brd;
}

var board = genBoard();
//while (board.length != 81) {
	//board = genBoard();
//}

/*
var arr = [];
for (var i = 0; i < 9; i++) {
	arr[i] = [];
}

for (var i = 0; i < 81; i++) {
	arr[Math.floor(i / 9)].push(board[i]);
}

console.log(arr);
*/


var hasNextEmpty = function(board) {
	for (var i = 0; i < 81; i++) {
		if (!board[i]) return true;
	}
	return false;
}

var nextEmpty = function(board) {
	for (var i = 0; i < 81; i++) {
		if (!board[i]) return i;
	}
}

var getRow = function(board, i) {
	var ret = [];
	var cur = i * 9;
	for (var j = 0; j < 9; j++) {
		ret.push(board[cur+j]);
	}
	return ret;
}

var getCol = function(board, i) {
	var ret = [];
	for (var j = 0; j < 9; j++) {
		ret.push(board[i+(j*9)]);
	}
	return ret;
}

var getBox = function(board, i) {
	var ret = [];
	for (var j = 0; j < 3; j++) {
		var multiplier = 0;
		if (i > 5) {
			multiplier = 4;
		} else if (i > 2) {
			multiplier = 2;
		}
		var id = (3 * i) + (9 * (j + multiplier));
		ret.push(board[id]);
		ret.push(board[id+1]);
		ret.push(board[id+2]);
	}
	return ret;
}

var isUniqueArr = function(arr) {
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr.length; j++) {
			if (i != j) {
				if (arr[i] === undefined || arr[j] === undefined) {
					continue;
				}
				else if (arr[i] === arr[j]) {
					return false;
				}
			}
		}
	}
	return true;
}

var isValid = function(board) {
	for (var i = 0; i < 9; i++) {
		var row = getRow(board, i);
		var col = getCol(board, i);
		var box = getBox(board, i);
		if (!(isUniqueArr(row) && isUniqueArr(col) && isUniqueArr(box))) {
			return false;
		}
	}
	return true;
}

var isSolution = function(board) {
	var copy = [];
	for (var i = 0; i < 81; i++) {
		copy[i] = board[i];
	}
	if (hasNextEmpty(copy)) {
		var index = nextEmpty(copy);
		for (var i = 1; i < 10; i++) {
			copy[index] = i;
			if (isValid(copy)) {
				if (isSolution(copy)) return true;
			}
		}
		return false;
	} else {
		return true;
	}
}

var isUnique = function (partialBoard) {
	var numSol = 0;
	var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	var potentials = [];
	for (var i = 0; i < 81; i++) {
		if (!partialBoard[i]) {
			potentials[i] = nums;
		}
	}

	var copy = [];
	for (var i = 0; i < 81; i++) {
		copy[i] = partialBoard[i];
	}

	for (var i = 0; i < 81; i++) {
		if (!copy[i]) {
			var temp = copy[i];
			while (potentials[i].length > 0) {
				var nextPotential = potentials[i].pop();
				copy[i] = nextPotential;
				if (isSolution(copy)) {
					numSol++;
					if (numSol > 1) {
						return false;
					}
				}
			}
			copy[i] = temp;
		}
	}
	return true;
}

var makeEasyBoard = function(fullBoard) {
	//number of values that will be given
	var numGivens = _.random(36,45);

	// an array to count number of occurences of each number,
	//the index number corresponds to the actual num on the board
	var numOfOccurs = [[]];

	//each one occurs min of 3 times
	for (var i = 1; i < 10; i++) {
		//each b is a random box in which this number will be given
		var b1 = _.random(0,8);
		var b2 = _.random(0,8);
		while (b1 === b2) {
			b2 = _.random(0,8);
		}
		var b3 = _.random(0,8);
		while (b1 === b3 || b2 === b3) {
			b3 = _.random(0,8);
		}
		numOfOccurs[i] = [b1, b2, b3];
	}

	//the difference between the number of givens and the definite 3 occurences of each num 
	var dif = numGivens - 27;

	//generate another random box for any of the numbers to appear until the difference is gapped
	for (var i = 0; i < dif; i++) {
		var r = _.random(1,9);
		var b = _.random(0,8);
		while (_.contains(numOfOccurs[r], b)) {
			b = _.random(0,8);
		}
		numOfOccurs[r].push(b);
	}

	//array to be returned
	var ret = [];
	for (var i = 0; i < 81; i++) {
		var box = getBoxNumber(i);
		var cur = fullBoard[i];

		if (_.contains(numOfOccurs[cur], box)) {
			ret[i] = cur;
		}
	}
	return ret;
}

var getBoxNumber = function(i) {
	//get the row
	var row = Math.floor(i / 9);
	
	//get the column
	var col = i % 9;
	
	//get the box
	var box = 0;
	if (row > 5) {
		if (col > 5)
			box = 8;
		else if (col > 2)
			box = 7;
		else
			box = 6;
	} else if (row > 2) {
		if (col > 5)
			box = 5;
		else if (col > 2)
			box = 4;
		else
			box = 3;
	} else {
		if (col > 5)
			box = 2;
		else if (col > 2)
			box = 1;
		else
			box = 0;
	}
	return box;
}

var partBoard = makeEasyBoard(board);

/*
if (!isUnique(partBoard)) {
	console.log(false);
	partBoard = makeEasyBoard(board);
}
if (!isUnique(partBoard)) {
	console.log(false);
	partBoard = makeEasyBoard(board);
} else {
	console.log(true);
}
*/
//console.log(isSolution(partBoard));

var exampleBoard = [ , , 7, , , 5, , , , , 8, , , , 6, , , , 5, , 6, 2, 1, , , , 4, 1, , , , , , , , , , 6, , 1, , 7, , 8, , , , , , , , , , 3, 9, , , , 3, 2, 4, , 5, , , , 4, , , , 2, , , , , 9, , , 3,undefined,undefined ];
//console.log(isSolution(exampleBoard));
//if (exampleBoard.length === 81) { console.log(isUnique(exampleBoard)); }

var x = [1, 2, , 3];
console.log(_.size(x));

//console.log(isUnique(exampleBoard));
