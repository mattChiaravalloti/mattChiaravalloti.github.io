#include <iostream>
#include <string>
#include "stdlib.h"
using namespace std;

void printBoard();
bool boardIsFull();
char getWinner();

char gameBoard[3][3] = {
						{ '_', '_', '_' },
						{ '_', '_', '_' },
						{ '_', '_', '_' }
};

int main() {
	cout << "Welcome to Tic Tac Toe" << endl;

	printBoard();

	for (int i = 0; i < 9; i++) {
		cout << endl;

		char userToken;
		if (i % 2 == 0) {
			cout << "X's turn!" << endl;
			userToken = 'X';
		}
		else {
			cout << "O's turn!" << endl;
			userToken = 'O';
		}

		int row, col;
		cout << "Choose a row." << endl;
		cin >> row;

		cout << "Choose a column." << endl;
		cin >> col;

		while (gameBoard[row][col] != '_' || row < 0 || row > 2 || col < 0 || col > 2) {
			cout << "Invalid row/column choice. Please try again." << endl;
			
			cout << "Choose a row." << endl;
			cin >> row;

			cout << "Choose a column." << endl;
			cin >> col;
		}

		gameBoard[row][col] = userToken;

		printBoard();
		
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
			return 0;
		}
	}

	return 0;
}

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

char getWinner() {
	char winnerToken;
	if (boardIsFull()) {
		winnerToken = 'T';
	}
	else {
		winnerToken = '_';
	}

	for (int row = 0; row < 3; row++) {
		if (gameBoard[row][0] == '_' || gameBoard[row][1] == '_' || gameBoard[row][2] == '_') {
			continue;
		}
		if (gameBoard[row][0] == gameBoard[row][1] && gameBoard[row][1] == gameBoard[row][2]) {
			winnerToken = gameBoard[row][0];
		}
	}

	for (int col = 0; col < 3; col++) {
		if (gameBoard[0][col] == '_' || gameBoard[1][col] == '_' || gameBoard[2][col] == '_') {
			continue;
		}
		if (gameBoard[0][col] == gameBoard[1][col] && gameBoard[1][col] == gameBoard[2][col]) {
			winnerToken = gameBoard[0][col];
		}
	}

	if ((gameBoard[0][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][2]) ||
		(gameBoard[2][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[0][2])) {
		winnerToken = gameBoard[1][1];
	}

	return winnerToken;
}