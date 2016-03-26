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

var genBoard = function() {
	var brd = [];

	// 2D arrays, storing Rows, Columns, and Boxes, respectively
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
		var box = getBoxNumber(i);
		
		// get a random number from 1 to 9
		// this will represent the number that appears at this (row,col) position
		var random = _.random(1,9);

		var ranArr = [];

		while (_.contains(rowArr[row], random) ||
			   _.contains(colArr[col], random) ||
			   _.contains(boxArr[box], random)) {
			
			if (!_.contains(ranArr, random)) {
				ranArr.push(random);
			}

			// if you tried every number, break
			if (ranArr.length == 9) break;

			random = _.random(1,9);
		}

		// if you tried every number, break
		if (ranArr.length == 9) break;

		rowArr[row].push(random);
		colArr[col].push(random);
		boxArr[box].push(random);
		brd[i] = random;
	}

	// continue to attempt generating a board until the brd array has 81 elements
	while (brd.length != 81) {
		brd = genBoard();
	}

	return brd;
}

var makePartialBoard = function(board, difficulty) {
	//number of values that will be given
	var numGivens = 0;
	if (difficulty === 'Easy') {
		numGivens = _.random(36, 45);
	} else if (difficulty === 'Medium') {
		numGivens = _.random(30,35);
	} else {
		numGivens = _.random(27,29);
	}

	var numRemoved = 81 - numGivens;

	//create copy to manipulate and return
	var copy = [];
	for (var i = 0; i < 81; i++) {
		copy[i] = board[i];
	}

	//array of indices removed
	var removed = [];

	for (var i = 0; i < numRemoved; i++) {
		//get a random index to remove
		var random = _.random(0,80);
		while (_.contains(removed, random)) {
			random = _.random(0,80);
		}

		//remove that number and check that the partial solution is still unique
		var temp = copy[random];
		copy[random] = 0;
		//while it's not unique, choose a dif index
		while (!isUnique(copy, random)) {
			console.log(i);
			removed.push(random);

			copy[random] = temp;
			while (_.contains(removed, random)) {
				random = _.random(0,80);
			}
			temp = copy[random];
			copy[random] = 0;
		}

		removed.push(random);
	}

	return copy;
}

// 0 was placed into the board as a placeholder to represent an open space
// Therefore, if the board contains a 0, then there is an open space
var hasNextEmpty = function(board) {
	return _.contains(board, 0);
}

// return the index of the first 0 to appear in the board array
var nextEmpty = function(board) {
	for (var i = 0; i < 81; i++) {
		if (board[i] === 0) return i;
	}
}

// Get the array that represents the 9 elements in row #i
var getRow = function(board, i) {
	var ret = [];
	var cur = i * 9;
	for (var j = 0; j < 9; j++) {
		ret.push(board[cur+j]);
	}
	return ret;
}


// Get the array that represents the 9 elements in column #i
var getCol = function(board, i) {
	var ret = [];
	for (var j = 0; j < 9; j++) {
		ret.push(board[i+(j*9)]);
	}
	return ret;
}

// Get the array that represents the 9 elements in box #i
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

/**
 * Check if each element in the array is a unique, non-zero number
 */
var isUniqueArr = function(arr) {
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr.length; j++) {
			if (i != j) {
				if (arr[i] === 0 || arr[j] === 0) {
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

/**
 * Check if this is a valid board by checking if each of the 9 rows, 9 columns, and
 * 9 boxes are unique
 */
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

/**
 * Determine if the partial board is solvable by checking if inserting numbers into 
 * the board leads not only to a valid board, but also a solvable board (#recursion)
 */
var isSolvable = function(board) {
	var copy = [];
	for (var i = 0; i < 81; i++) {
		copy[i] = board[i];
	}
	if (hasNextEmpty(board)) {
		var index = nextEmpty(board);
		for (var i = 1; i < 10; i++) {
			copy[index] = i;
			if (isValid(copy)) {
				if (isSolvable(copy)) {
					return true;
				}
			}
		}
		return false;
	} else {
		return true;
	}
}

// Check if the argued board is unique by seeing if only ONE number can be validly placed
// into the board at the argued index
var isUnique = function(board, index) {
	var numSolutions = 0;

	var copy = [];
	for (var i = 0; i < 81; i++) {
		copy[i] = board[i];
	}

	for (var i = 1; i < 10; i++) {
		copy[index] = i;
		if (isValid(copy)) {
			if (isSolvable(copy)) {
				numSolutions++;
				if (numSolutions > 1) {
					return false;
				}
			}
		}
	}

	return numSolutions === 1;
}

boardFunctions = {
	isValid: isValid
}

module.exports = boardFunctions;

// Uncomment one of the following sections at a time-- run to generate JSON file
// that contains partial boards and their completed counterparts

/*
var fs = require('fs');

var easyBoards = {};

for (var i = 0; i < 500; i++) {
	var board = genBoard();
	var partBoard = makePartialBoard(board, "Easy");
	easyBoards[i + "full"] = board;
	easyBoards[i] = partBoard;
	console.log("Made easy board " + i);
}

var outputFilename = 'easyBoards.json';

fs.writeFile(outputFilename, JSON.stringify(easyBoards, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFilename);
    }
}); 

var mediumBoards = {};

for (var i = 0; i < 250; i++) {
	var board = genBoard();
	var partBoard = makePartialBoard(board, "Medium");
	mediumBoards[i + "full"] = board;
	mediumBoards[i] = partBoard;
	console.log("Made medium board " + i);
}

var outputFilename2 = 'mediumBoards.json';

fs.writeFile(outputFilename2, JSON.stringify(mediumBoards, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFilename2);
    }
});

var hardBoards = {};

for (var i = 0; i < 100; i++) {
	var board = genBoard();
	var partBoard = makePartialBoard(board, "Hard");
	hardBoards[i + "full"] = board;
	hardBoards[i] = partBoard;
	console.log("Made hard board " + i);
}

var outputFilename = 'hardBoards.json';

fs.writeFile(outputFilename, JSON.stringify(hardBoards, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFilename);
    }
});*/