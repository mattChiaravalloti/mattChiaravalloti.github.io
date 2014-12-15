//Sudoku

/*

[] = cell

[ [] [] [] 
  [] [] [] 
  [] [] [] ] = box

[ [ [] [] []   [ [] [] []   [ [] [] []
    [] [] []     [] [] []     [] [] []
    [] [] [] ]   [] [] [] ]   [] [] [] ]

  [ [] [] []   [ [] [] []   [ [] [] []
    [] [] []     [] [] []     [] [] []
    [] [] [] ]   [] [] [] ]   [] [] [] ]

  [ [] [] []   [ [] [] []   [ [] [] []
    [] [] []     [] [] []     [] [] []
    [] [] [] ]   [] [] [] ]   [] [] [] ] ]= grid


this breakdown will allow me to create dif DOM elts with proper classes/ids for formatting

*/

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
	console.log('here');
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

/* This leads to 9 ^ n runtime...which is way too long, so unfortunately I can't produce Unique partial boards
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
*/

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

var makeMedBoard = function(fullBoard) {
	//number of values that will be given
	var numGivens = _.random(25,30);

	// an array to count number of occurences of each number,
	//the index number corresponds to the actual num on the board
	var numOfOccurs = [[]];

	//each one occurs min of 2 times
	for (var i = 1; i < 10; i++) {
		//each b is a random box in which this number will be given
		var b1 = _.random(0,8);
		var b2 = _.random(0,8);
		while (b1 === b2) {
			b2 = _.random(0,8);
		}
		numOfOccurs[i] = [b1, b2];
	}

	//the difference between the number of givens and the definite 3 occurences of each num 
	var dif = numGivens - 18;

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

var makeHardBoard = function(fullBoard) {
	//number of vals to be given
	var numGivens = _.random(20,24)

	// an array to count number of occurences of each number,
	//the index number corresponds to the actual num on the board
	var numOfOccurs = [[]];

	//one number does not appear
	var willNotAppear = _.random(1,9);

	//one appears only once
	var willAppearOnce = _.random(1,9);

	while (willAppearOnce === willNotAppear) {
		willAppearOnce = _.random(1,9);
	}

	//the rest appear at least 2 times
	for (var i = 1; i < 10; i++) {
		if (i === willNotAppear) continue;
		if (i === willAppearOnce) {
			var b1 = _.random(0,8);
			numOfOccurs[i] = [b1];
		} else {
			//each b is a random box in which this number will be given
			var b1 = _.random(0,8);
			var b2 = _.random(0,8);
			while (b1 === b2) {
				b2 = _.random(0,8);
			}
			numOfOccurs[i] = [b1, b2];
		}
	}

	//the difference between the number of givens and the definite 3 occurences of each num 
	var dif = numGivens - 15;

	//generate another random box for any of the numbers to appear until the difference is gapped
	for (var i = 0; i < dif; i++) {
		var r = _.random(1,9);
		while (r === willAppearOnce || r === willNotAppear) {
			r = _.random(1,9);
		}
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

var HintCheckBox = React.createClass({
	handleClick: function() {
		this.props.onClick();
	},
	render: function() {
		return (
			<tr><td className="hintBox">
				<input type="checkbox" onClick={this.handleClick}>Check Each Input</input>
			</td></tr>
		);
	}
});

var SolverButton = React.createClass({
	handleClick: function() {
		this.props.onClick();
	},
	render: function() {
		return (
			<tr onClick={this.handleClick}>
				<td className="solveButton">
					Solve
				</td>
			</tr>
		);
	}
});

var SolveBar = React.createClass({
	render: function() {
		return (
			<table className="solveBar" cellSpacing="20">
				<SolverButton onClick={this.props.onClick} />
				<HintCheckBox onClick={this.props.onCheck} />
			</table>
		);
	}
});

var SideOption = React.createClass({
	handleClick: function() {
		this.props.onClick(this);
	},
	render: function() {
		return (
			<tr onClick={this.handleClick}>
				<td className={this.props.difficulty}>
					{this.props.difficulty}
				</td>
			</tr>
		);
	}
});

var SideBar = React.createClass({
	render: function() {
		var that = this;
		var arr = ["Easy", "Medium", "Hard"];
		var options = arr.map(function(elt) {
			return <SideOption difficulty={elt} onClick={that.props.onClick} />
		});
		return (
			<table className="sideBar" cellSpacing="20">
				{options}
			</table>
		)
	}
});

var NumberBar = React.createClass({
	handleClick: function() {
		this.props.onClick(this);
	},
	render: function() {
		var id = "option" + this.props.num;
		return (
			<td className="selectable" id={id} onClick={this.handleClick}>{this.props.num}</td>
		)
	}
});

/* ADAPTED FROM REACT.js WEBSITE */
var Timer = React.createClass({
  
  render: function() {
    return (
      <div>Seconds Elapsed: {this.props.secondsElapsed}</div>
    );
  }
});
/* (end adaptation) */

var Cell = React.createClass({
	handleClick: function() {
		this.props.onClick(this);
	},
	render: function() {
		var idNum = "cell" + this.props.idNum;
		return (
			<td className='cell' id={idNum} onClick={this.handleClick}>
				{this.props.val}
			</td>
		);
	}
});


var Box = React.createClass({
	render: function() {
		var that = this;

		//get the cells in order of row
		var rowArr = (function() {
			var arr = [];
			for (var i = 0; i < 3; i++) {
				var temp = [];
				var fst = i * 3;
				var multiplier = 0;
				if (that.props.idNum > 5) {
					multiplier = 4;
				} else if (that.props.idNum > 2) {
					multiplier = 2;
				}
				var id = (3 * that.props.idNum) + (9 * (i + multiplier));
				temp.push(<Cell val={that.props.boxArr[fst]} idNum={id} onClick={that.props.onClick} />);
				temp.push(<Cell val={that.props.boxArr[fst+1]} idNum={id+1} onClick={that.props.onClick} />);
				temp.push(<Cell val={that.props.boxArr[fst+2]} idNum={id+2} onClick={that.props.onClick} />);
				arr.push(temp);
			}
			return arr;
		})();

		//set up the dif rows so they will format as a box
		var box = rowArr.map(function(elt) {
			var fst = elt[0];
			var snd = elt[1];
			var thd = elt[2];
			return (
				<tr>
					<td>
						{fst}
					</td>
					<td>
						{snd}
					</td>
					<td>
						{thd}
					</td>
				</tr>
			);
		});
		//return the table that is the box
		return (
			<table className="box" id={this.props.idNum} cellSpacing="0">
				{box}
			</table>
		);
	}
});

var Game = React.createClass({
	getInitialState: function() {
		return {solution:[], gameBoard:[], selectedNum:0, lastWrong:null, check:false, 
			secondsElapsed:0, lastCompletedTime:0, curDifficulty: ""};
	},
	/* ADAPTED FROM REACT.js WEBSITE! */
	tick: function() {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  /* (end adaptation) */
	createBoard: function(difficulty) {
		//helper function to generate complete board
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
				var box = getBoxNumber(i);

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
		this.setState({solution: board});

		var gBoard = [];
		if (difficulty === "Easy") {
			gBoard = makeEasyBoard(board);
		} else if (difficulty === "Medium") {
			gBoard = makeMedBoard(board);
		} else {
			gBoard = makeHardBoard(board);
		}

		var copy = [];
		for (var i = 0; i < 81; i++) {
			copy[i] = gBoard[i];
		}

		this.setState({gameBoard: gBoard, original: copy});

		if (this.state.lastWrong != null) {
				$(this.state.lastWrong).removeClass("wrong");
		}

		//works every time except first time...
		for (var i = 0; i < 81; i++) {
			var cell = "#cell" + i;
			$(cell).removeClass("selected");
			$(cell).removeClass("given");
			if (!!gBoard[i]) {
				$(cell).addClass("given");
			}
			if (gBoard[i] === this.state.selectedNum) {
				$(cell).addClass("selected");
			}
		}
	},
	onCellClick: function(cell) {
		if (this.state.lastWrong != null) {
			$(this.state.lastWrong).removeClass("wrong");
		}
		for (var i = 0; i < 81; i++) {
			var cellID = "#cell" + i;
			$(cellID).removeClass('wrong');
		}
		if (this.state.selectedNum > 0) {
			if (this.state.check) {

				var board = this.state.gameBoard;
				var cellID = "#cell" + cell.props.idNum;

				if (this.state.solution[cell.props.idNum] == this.state.selectedNum) {
					board[cell.props.idNum] = this.state.selectedNum;
					this.setState({gameBoard: board});

					$(cellID).addClass('selected');
				} else {
					$(cellID).addClass("wrong");
					this.setState({lastWrong: cellID});
				}
				var done = true;
				for (var i = 0; i < 81; i++) {
					if (board[i] === undefined) {
						done = false;
						break;
					}
				}
				if (done) {
					this.setState({lastCompletedTime: this.state.secondsElapsed});
				}
			} else {
				var board = this.state.gameBoard;
				var origin = this.state.original;
				var cellID = "#cell" + cell.props.idNum;
				if (origin[cell.props.idNum] === undefined) {
					board[cell.props.idNum] = this.state.selectedNum;
					this.setState({gameBoard: board});
				}

				var done = true;
				for (var i = 0; i < 81; i++) {
					if (board[i] === undefined) {
						done = false;
						break;
					}
				}
				if (done && isValid(board)) {
					this.setState({lastCompletedTime: this.state.secondsElapsed});
				} else if (done) {
					$(this.state.lastWrong).addClass('wrong');
				}

				if (this.state.solution[cell.props.idNum] != this.state.selectedNum) {
					this.setState({lastWrong: cellID});
				}

				$(cellID).addClass('selected');
			}
		}

	},
	onOptionClick: function(option) {
		var curID = "#option" + this.state.selectedNum;
		var newID = "#option" + option.props.num
		if (option.props.num != this.state.selectedNum) {
			$(curID).removeClass("selected");
		}

		this.setState({selectedNum:option.props.num});

		var board = this.state.gameBoard;
		var origin = this.state.original;

		for (var i = 0; i < 81; i++) {
			var cell = "#cell" + i;
			$(cell).removeClass("selected");
			if (board[i] === option.props.num) {
				$(cell).removeClass("given");
				$(cell).addClass("selected");
			} else if (!!origin[i]) {
				$(cell).addClass("given");
			}
		}

		$(newID).addClass("selected");
	},
	onDifClick: function(difficulty) {
		var dif = "-" + difficulty.props.difficulty + "-";
		this.setState({secondsElapsed: 0, curDifficulty: dif});
		this.createBoard(difficulty.props.difficulty);
	},
	onSolveClick: function() {
		var sol = this.state.solution;
		var cur = this.state.gameBoard;
		for (var i = 0; i < 81; i++) {
			cur[i] = sol[i];
		}
		this.setState({gameBoard: cur});
	},
	onHintCheck: function() {
		var sol = this.state.solution;
		var cur = this.state.gameBoard;

		for (var i = 0; i < 81; i++) {
			if (!!cur[i] && cur[i] != sol[i]) {
				var cellID = "#cell" + i;
				cur[i] = undefined;

				$(cellID).addClass('wrong');
			}
		}

		var prev = this.state.check;
		this.setState({check: !prev, gameBoard: cur});
	},
	render: function() {
		var that = this;
		var boxArr = [];
		var board = [];
		if (this.state.solution.length > 0) {
			for (var i = 0; i < 9; i++) {
				boxArr[i] = [];
			}

			//make board
			for (var i = 0; i < 81; i++) {
				var box = getBoxNumber(i);
				boxArr[box].push(that.state.gameBoard[i]);
			}

			board = (
				<table cellSpacing="0">
					<tr>
						<td>
							<Box boxArr={boxArr[0]} idNum={0} onClick={that.onCellClick} />
						</td>
						<td>
							<Box boxArr={boxArr[1]} idNum={1} onClick={that.onCellClick} />
						</td>
						<td>
							<Box boxArr={boxArr[2]} idNum={2} onClick={that.onCellClick} />
						</td>
					</tr>
					<tr>
						<td>
							<Box boxArr={boxArr[3]} idNum={3} onClick={that.onCellClick} />
						</td>
						<td>
							<Box boxArr={boxArr[4]} idNum={4} onClick={that.onCellClick} />
						</td>
						<td>
							<Box boxArr={boxArr[5]} idNum={5} onClick={that.onCellClick} />
						</td>
					</tr>
					<tr>
						<td>
							<Box boxArr={boxArr[6]} idNum={6} onClick={that.onCellClick} />
						</td>
						<td>
							<Box boxArr={boxArr[7]} idNum={7} onClick={that.onCellClick} />
						</td>
						<td>
							<Box boxArr={boxArr[8]} idNum={8} onClick={that.onCellClick} />
						</td>
					</tr>
				</table>
			)
		}

		var numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		var options = numArr.map(function(elt) {
			return (
				<NumberBar num={elt} onClick={that.onOptionClick} />
			)
		});

		var side = (<SideBar onClick={this.onDifClick} />);
		var solver = (<SolveBar onClick={this.onSolveClick} onCheck={this.onHintCheck} />);
		var timer = (<Timer secondsElapsed={this.state.secondsElapsed} />);

		return (
			<div className="playArea">
				<p className="sudokuTitle">Sudoku <small>{this.state.curDifficulty}</small></p>
				<table>
					<td className="side">{side}</td>
					<td><table>
						<tr><td className="grid">{board}</td></tr>
						<tr><td><table className="options" cellSpacing="10">{options}</table></td></tr>
					</table></td>
					<td className="solve">{solver}</td>
					<td><table cellSpacing="20">
						<tr><td className="timer">{timer}</td></tr>
						<tr><td className="time">Time to Complete Last Puzzle: {this.state.lastCompletedTime}</td></tr>
					</table></td>
				</table>
			</div>
		);
	}
	

});

React.render(
	<Game />, document.getElementById('content')
);
