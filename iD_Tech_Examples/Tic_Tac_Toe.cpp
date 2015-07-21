#include <iostream>
using namespace std;

// declare methods here
void printBoard();
bool boardIsFull();
char getWinner();

// we'll use a 3x3 2D array to represent the tic tac toe board
char gameBoard[3][3] = {
						{ '_', '_', '_' },
						{ '_', '_', '_' },
						{ '_', '_', '_' }
};

int main() {
	cout << "Welcome to Tic Tac Toe" << endl;

	// print the initial, empty board
	printBoard();

	// at most, tic tac toe can have 9 turns, so we'll run a for loop for 9 iterations
	for (int i = 0; i < 9; i++) {
		cout << endl;

		// determine the character to use by figuring out if the iteration/turn number is even or odd
		char userToken;
		if (i % 2 == 0) {
			cout << "X's turn!" << endl;
			userToken = 'X';
		}
		else {
			cout << "O's turn!" << endl;
			userToken = 'O';
		}

		// Prompt the user to choose a 0 indexed row and column
		int row, col;
		cout << "Choose a row." << endl;
		cin >> row;

		cout << "Choose a column." << endl;
		cin >> col;

		// ensure that the choices are valid
		while (gameBoard[row][col] != '_' || row < 0 || row > 2 || col < 0 || col > 2) {
			cout << "Invalid row/column choice. Please try again." << endl;
			
			cout << "Choose a row." << endl;
			cin >> row;

			cout << "Choose a column." << endl;
			cin >> col;
		}

		// update the game board with the user's choice and print the board again
		gameBoard[row][col] = userToken;

		printBoard();
		
		// check if there is a winner, a tie, or neither
		char winner = getWinner();
		if (winner != '_') {
			switch (winner)
			{
			case 'T':
				cout << "Tie! Classic tic-tac-toe ending." << endl;
				break;
			case 'X':
				cout << "X is the winner!" << endl;
				break;
			case 'O':
				cout << "O is the winner!" << endl;
				break;
			default:
				break;
			}

			// in any of these cases, end the program
			return 0;
		}
	}

	return 0;
}

// iterate through the 2D game board array to print each element
void printBoard() {
	cout << endl << "Current board:" << endl;
	for (int row = 0; row < 3; row++) {
		for (int col = 0; col < 3; col++) {
			cout << gameBoard[row][col];
			if (col < 2) {
				cout << " | ";
			}
		}
		cout << endl;
	}
}

// check each element in the 2D game board array to see if any '_' remain
// once we see one, we know the board is not full and can cut short and return false
bool boardIsFull() {
	for (int row = 0; row < 3; row++) {
		for (int col = 0; col < 3; col++) {
			if (gameBoard[row][col] == '_') {
				return false;
			}
		}
	}

	return true;
}

// return one of four characters to represent the winner: X, O, T (tie), or _ (no winner/tie)
char getWinner() {
	// if the board is full, initially assume there is a tie
	char winnerToken;
	if (boardIsFull()) {
		winnerToken = 'T';
	}
	// otherwise, initially assume there is no winner
	else {
		winnerToken = '_';
	}

	// check each row to see if there are three of the same non-_ chars together
	for (int row = 0; row < 3; row++) {
		if (gameBoard[row][0] == '_' || gameBoard[row][1] == '_' || gameBoard[row][2] == '_') {
			continue;
		}
		if (gameBoard[row][0] == gameBoard[row][1] && gameBoard[row][1] == gameBoard[row][2]) {
			winnerToken = gameBoard[row][0];
		}
	}

	// check each column to see if there are three of the same non-_ chars together
	for (int col = 0; col < 3; col++) {
		if (gameBoard[0][col] == '_' || gameBoard[1][col] == '_' || gameBoard[2][col] == '_') {
			continue;
		}
		if (gameBoard[0][col] == gameBoard[1][col] && gameBoard[1][col] == gameBoard[2][col]) {
			winnerToken = gameBoard[0][col];
		}
	}

	// check the diagonals
	if ((gameBoard[0][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][2]) ||
		(gameBoard[2][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[0][2])) {
		winnerToken = gameBoard[1][1];
	}

	return winnerToken;
}