/**
 * This is the Hangman class. When run, it will allow two people to play a 
 * basic version of the classic game Hangman.
 * 
 * Topics covered include:  arrays, methods, for loops, while loops, 
 * 			conditionals, variables, scope, and I/O with scanners and printing.
 * 
 * @author Matt Chiaravalloti
 */

import java.util.Scanner;

public class Hangman {

	// char array storing each letter of the secret word
	static char[] secretWord;
	
	// char array storing each correctly guessed letter from the user
	static char[] userGuess;
	
	// number of guesses the user gets-- up to you!
	static int numAttempts;
	
	// Scanner that will receive the user's input
	static Scanner userInput;
	
	public static void main(String[] args) {
		// initialize the scanner and number of guesses variables
		userInput = new Scanner(System.in);
		numAttempts = 10;
		
		// print a welcome message and ask the user if (s)he wants to play
		System.out.println("Welcome to Hangman!");
		
		System.out.println("Would you like to play the game?");
		System.out.println("Type 1 to start, or 2 to quit.");
		int startChoice = userInput.nextInt();
		
		// ensure the user types a valid option (1 || 2)
		while (startChoice != 1 && startChoice != 2) {
			System.out.println("Choose a valid menu option!");
			startChoice = userInput.nextInt();
		}
		
		// remember-- .nextInt() doesn't consume the 'enter' character
		userInput.nextLine();
		
		if (startChoice == 1) {
			runGame();
		} else {
			System.out.println("Maybe next time!");
			userInput.close();
			System.exit(0);
		}
	}
	
	/**
	 * The runGame method prompts player 1 to input a secret word, and then
	 * prompts player 2 to guess letters in that word until (s)he is out of
	 * guesses or guesses the word correctly.
	 */
	public static void runGame() {
		// propmt player 1 to enter a word and store that word as a char array
		System.out.println("Player one, enter a word now: ");
		secretWord = userInput.nextLine().toCharArray();
		
		// initialize another char array to be the same length as the secret word
		userGuess = new char[secretWord.length];
		
		// populate this array with '_'
		for (int i = 0; i < userGuess.length; i++) {
			userGuess[i] = '_';
		}
		
		// jump down many lines so that player 2 doesn't see player 1's input
		for (int i = 0; i < 25; i++) {
			System.out.println("*");
		}
		
		System.out.println("Player two, time to guess!");
		
		/* 
		 * ask player 2 for guesses until (s)he either wins or runs out of
		 * guesses.
		 */
		while (!guessedFullWord() && numAttempts > 0) {
			
			// tell the user how many guesses remain
			System.out.print("You have " + numAttempts);
			System.out.println(" guesses remaining.");
			
			/* 
			 * print out the current guess status by printing each element of
			 * the userGuess array
			 */
			System.out.println("Current secret word status: ");
			for (int i = 0; i < userGuess.length; i++) {
				System.out.print(userGuess[i] + " ");
			}
			System.out.println();
			
			// Prompt the user for a letter
			System.out.println("Guess a letter now:");
			/* 
			 * take the input as a string, change it to a char array, and get
			 *  the first element. Remember Scanner doesn't have a handy way to
			 *  receive char as input.
			 */
			char guessedLetter = userInput.nextLine().toCharArray()[0];
			
			/* 
			 * be sure to decrement the variable used in the condition of the
			 * while loop!
			 */
			numAttempts--;
			
			/*
			 * check if the letter is in the secret word. If so, update the 
			 * guess array and let the user know how many times the letter
			 * appears.
			 */
			int numAppearances = 0;
			for (int i = 0; i < userGuess.length; i++) {
				if (secretWord[i] == guessedLetter) {
					userGuess[i] = guessedLetter;
					numAppearances++;
				}
			}
			
			System.out.print(guessedLetter + " appeared " + numAppearances);
			System.out.println(" time(s).");
		}
		
		// this line will run when the user either runs out of guesses or
		// correctly guesses the word
		printEndStatus();
		userInput.close();
	}
	
	/**
	 * Determine whether or not the user's guessed word equals the secret word
	 * @return False if any of the letters in userGuess does not match the
	 * 		corresponding letter in secretWord, True if all letters match
	 */
	public static boolean guessedFullWord() {
		for (int i = 0; i < secretWord.length; i++) {
			if (userGuess[i] != secretWord[i]) {
				return false;
			}
		}
		
		return true;
	}
	
	/**
	 * At the end of numAttempts guesses, the user either won or lost. This
	 * method prints the result.
	 */
	public static void printEndStatus() {
		System.out.println();
		if (guessedFullWord()) {
			System.out.print("Secret word: ");
			// Print the contents of the array on a single line
			for (int i = 0; i < secretWord.length; i++) {
				System.out.print(secretWord[i] + " ");
			}
			System.out.println();
			
			// let the user know (s)he won
			System.out.println("Nice job! You guessed the word correctly.");
		} else if (numAttempts <= 0) {
			System.out.print("You are out of attempts.");
			System.out.println(" Better luck next time!");
		}
	}
}
