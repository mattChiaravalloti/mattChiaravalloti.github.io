/**
 * This is the Calculator class. When run, it will allow a user to perform
 * four simple binary operations on two numbers of their choosing.
 * 
 * Topics covered include:  methods, while loops, switch statements, 
 * 			conditionals, variables, arithmetic operations, and
 * 			I/O with scanners and printing. 	
 * 
 * @author Matt Chiaravalloti
 */

import java.util.Scanner;

public class Calculator {

	public static void main(String[] args) {
		// declare and initialize a scanner to receive user input
		Scanner userInput = new Scanner(System.in);
		
		// print a welcome message
		System.out.println("Welcome to the super cool calculator!");
		
		// run the calculator until the user chooses to quit
		while (true) {
			// call the method that prints the menu
			showMenu();
			
			// receive the user's operation choice
			char operation = userInput.nextLine().toCharArray()[0];
			
			// if the user chose to quit, end the program
			if (operation == 'q') {
				System.out.println("Goodbye.");
				userInput.close();
				System.exit(0);
			}
			
			// Ask the user for the two numbers, store them as doubles
			System.out.println("What is the first number?");
			double firstNum = userInput.nextDouble();
			
			System.out.println("What is the second number?");
			double secondNum = userInput.nextDouble();
			
			// declare the result variable
			double result;
			
			/* switch on the operation choice which you received earlier.
			 * Have cases for each operation and, depending on the choice,
			 * set result to be the appropriate value
			 */
			switch (operation) {
			case 'a':
				result = add(firstNum, secondNum);
				break;
			case 's':
				result = sub(firstNum, secondNum);
				break;
			case 'm':
				result = mul(firstNum, secondNum);
				break;
			case 'd':
				result = div(firstNum, secondNum);
				break;
			default:
				// if the user didn't pick a valid menu option
				System.out.println("Invalid menu option. Result set to -1.");
				result = -1.0;
			}
			
			// print the result
			System.out.println("Result: " + result);
			
			// Remember-- .nextDouble() doesn't consume the 'enter' character
			userInput.nextLine();
		}
	}
	
	/* 
	 * The following 4 methods are not necessary and in fact it would have
	 * been simpler to write the operations directly in the switch statement,
	 * but we write these to get practice with methods!
	 */
	
	/**
	 * Add two numbers
	 * @param x First number
	 * @param y Second number
	 * @return Sum of x and y
	 */
	public static double add(double x, double y) {
		double result = x + y;
		return result;
	}
	
	/**
	 * Subtract two numbers
	 * @param x First number
	 * @param y Second number
	 * @return Result of x minus y
	 */
	public static double sub(double x, double y) {
		double result = x - y;
		return result;
	}
	
	/**
	 * Multiply two numbers
	 * @param x First number
	 * @param y Second number
	 * @return Result of x times y
	 */
	public static double mul(double x, double y) {
		double result = x * y;
		return result;
	}
	
	/**
	 * Divide two numbers
	 * @param x First number
	 * @param y Second number
	 * @return Result of x divided by y
	 */
	public static double div(double x, double y) {
		double result = x / y;
		return result;
	}
	
	/**
	 * Print the menu of options for the user to see
	 */
	public static void showMenu() {
		System.out.println("Main menu: ");
		System.out.println("Press 'a' for addition, 's' for subtraction, "
				+ "'m' for multiplication, 'd' for division, or 'q' to "
				+ "quit.");
	}

}
