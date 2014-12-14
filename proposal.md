# Final Project Proposal
## by Matthew Chiaravalloti

## Project: Sudoku
For my final project, I will create a browser based game of Sudoku.

### Introduction
My inspiration for this project comes from countless hours, days, and years spent
playing this game.  Using several books and apps, I've gotten my *expert* puzzle time
down to as quick as 4:54 on some platforms.  I really enjoy solving thes puzzles and
will hopefully really enjoy making an app of my own for this game.

### What I hope to learn:
>##### JavaScript
1.  Stronger MV\* design principles
2.  Styling a webpage

>##### General
1.  Efficient Sudoku solving algorithm
2.  Generation of complete puzzles, then presentation of partial puzzles for users to solve

### Goals

*  Generating random new boards based on difficulty setting
*  Checking correctness of each input
*  Creating the solver

These goals are not strictly related to the JavaScript language, but are rather larger goals that are
independent of the language used to implement this game.  Reaching these goals will, however,
indicate my level of understanding of language-dependent concepts (which in this case will be MV\* design).

### Libraries
*  Lodash (better for each implementation which supports breaking early)
*  Backbone (for Model and View)
*  Mousetrap (for binding key presses)
*  jQuery

### Design Pattern
MV\*

### Interface
The interface will be simple!  However, it will not be a *boring* simple, but rather a
sleek, simple-by-design type of simple.  Although I did not mention **Bootstrap** in the
**Libraries** section, I may incorporate styles from this library to give a more polished
feeling to the final project.

In terms of how it will actually look, I envision a 9x9 grid board cenetered on the page with
some options along the sides.  On the left side of the board, there will the four difficulty
settings (Easy, Medium, Hard, Confusing).  On the right side, there will be a check box to 
toggle the option of checking each input, a solve button, and a settings menu to choose the color
scheme of the board.  On the bottom right, there will be a timer.

## Rough Implementation Outline
Some details about my plan for implementing this:

*  BoardModel:
	*  generate board (based on difficulty)
	*  update tile (based on user input)
	*  solve board
	*  set board color (based on user choice or default)
*  BoardView:
	*  events:  click (select tile), keydown (input number)
	*  update tile
	*  (maybe check if updated tile is correct here, or maybe allocate that work
	exclusively to the model)
*  Simple jQuery/HTML objects such as:
	*  list/menu of difficulties
	*  checkbox for checking per input
	*  menu for setting color
	*  area for a timer
	*  buttons for solving/starting new game