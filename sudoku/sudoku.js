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

var makePartialBoard = function(board, difficulty) {
	//number of values that will be given
	var numGivens = 0;
	if (difficulty === 'Easy') {
		numGivens = _.random(36, 45);
	} else if (difficulty === 'Medium') {
		numGivens = _.random(30,35);
	} else {
		numGivens = _.random(25,29);
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

var hasNextEmpty = function(board) {
	return _.contains(board, 0);
}

var nextEmpty = function(board) {
	for (var i = 0; i < 81; i++) {
		if (board[i] === 0) return i;
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
		if (this.props.val != 0) {
			return (
				<td className='cell' id={idNum} onClick={this.handleClick}>
					{this.props.val}
				</td>
			);
		} else {
			return (
				<td className='cell' id={idNum} onClick={this.handleClick}>
				</td>
			);
		}
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
		var time = (localStorage["best_time"]) ? localStorage["best_time"] : 0;
		return {solution:[], gameBoard:[], selectedNum:0, lastWrong:null, check:false, 
			secondsElapsed:0, lastCompletedTime:0, curDifficulty: "", bestTime:time};
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
		var board = genBoard();
		this.setState({solution: board});

		var gBoard = makePartialBoard(board, difficulty);

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
					if (board[i] === 0) {
						done = false;
						break;
					}
				}
				if (done) {
					var t = this.state.secondsElapsed;
					if (t < this.state.bestTime || this.state.bestTime === 0) {
						localStorage["best_time"] = t;
						this.setState({bestTime: t});
					}
					this.setState({lastCompletedTime: t});
				}
			} else {
				var board = this.state.gameBoard;
				var origin = this.state.original;
				var cellID = "#cell" + cell.props.idNum;
				if (origin[cell.props.idNum] === 0) {
					board[cell.props.idNum] = this.state.selectedNum;
					this.setState({gameBoard: board});
				}

				var done = true;
				for (var i = 0; i < 81; i++) {
					if (board[i] === 0) {
						done = false;
						break;
					}
				}
				if (done && isValid(board)) {
					var t = this.state.secondsElapsed;
					if (t < this.state.bestTime || this.state.bestTime === 0) {
						localStorage["best_time"] = t;
						this.setState({bestTime: t});
					}
					this.setState({lastCompletedTime: t});
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
		if (difficulty.props.difficulty === "Hard") {
			alert("This may take a moment to load.  If you wait over 10 seconds, refresh the page.\nFeel free to close this window.");
		}
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
				cur[i] = 0;

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
						<tr><td className="bestTime">Best Time: {this.state.bestTime}</td></tr>
					</table></td>
				</table>
			</div>
		);
	}
	

});

React.render(
	<Game />, document.getElementById('content')
);
