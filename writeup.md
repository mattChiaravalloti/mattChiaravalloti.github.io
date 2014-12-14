# Final Project Write-up
## by Matthew Chiaravalloti

## Project: Sudoku
For my final project, I created a browser based game of Sudoku.

### Introduction
Here, I will discuss the different challenges I faced while working on this project, as well as how I got around them.  I also make direct comparisions to my proposal to show how I was successful in implementing my original plan--with some modifications.

### What I learned:
>##### Javascript
1.	I now better understand how to handle the state of an application when it has many different components.  In this project, I had one large parent component app (Game) to house all the sub-components.  Game held the state of all the variables, as well as functions to update them (such as the various *onClick* functions), and delegated the proper variables to the right subcomponents which called back to Game to perform updates.  Overall, this made it clear that there should be a single view of an app that displays all current information, and each component should *know* only the information relevant to its section.  If any subcomponent needed to update, it *told* the app to change the state and the view was re-rendered to display the change.
2.	Prior to this project, I did not have much experience styling with HTML/CSS.  After making this project, I feel much more comfortable editing the various properties of different html elements.

>##### General
1.	Unfortunately, my sudoku solving algorithm is not quite efficient.  I was able to generate a complete board, and then systematically take out cells to present a partial board of specified difficulty to the user.  However, my method of checking the *uniqueness* of this partial board was not efficient.  I spent about 5 hours researching and writing up the entire block of **isUnique**, **isSolution**, **isValid**, **getCol/Row/Box**, **isUniqueArr**, **nextEmpty**, and **hasNextEmpty**.  It was mostly time spent understanding concepts, with only a few bugs here and there.  For example, there was a period of about thirty minutes where my unique array method was not working since it was comparing *undefined* values. Then there was a bit where I was not returning anything from **isSolution** or **getRow/Col/Box**.  However, once I finally got **isUnique** to work with truly unique boards (which I checked for online), I could not efficiently create a truly unique partial board.  Additionally, my **isSolution** was quite slow, so I was unable to check all possible solutions when the "check each input" box was checked, but rather only the originally generated solution.  I think I am close to understanding better methods, but for this project, the only compromise made to game play is the "check each input" functionality; the user can ignore this option and play a whole game and find a solution different from mine and still "win", since my **isValid** works just fine (validating boards).
2.	Generating a randomized complete puzzle was the first challenge I faced for this project.  It was not as easy as it looks.  It actually took me quite some time to conceptually understand *how* to make such a valid board.  Then after finally making it, it took me a little more time to properly index each cell for updating purposes.  Presenting partial boards was already discussed, but one more note here was deciding how to differentiate between easy, medium, and hard.  In the end, I decided on a method that depended on number of givens and number of times each one appeared. (In real sudoku generators, the number of givens does not actually affect too dramatically the *assinged difficulty*; instead this is determined by methodology of solving--but since my uniqueness checker did not work, I was prevented from measuring difficulty any other way since I could have gotten an infinite (or near infinite) number of "solving strategies").  Overall, for these two learning goals, I'd say I learned the most basic way to generate a sudoku board.  With more practice and research, hopefully I can understand the more efficient algorithms.

### Goals Achieved

*	Generating random new boards based on difficulty setting -- check!
*	Checking correctness of each input -- semi-check! (only checked against my solution)
*	Creating solver -- check! (validation of user solutions, or just simply the generation of a legal complete board)

### Libraries Used
*	Underscore
*	React
*	jQuery

### Rough Breakdown of Time (in no specific order)
*	5 hours spent developing and testing the **isUnique** and related methods.
*	3 hours spent developing the random board generator, then indexing the cells and boxes correctly using React classes.
*	1 hour spent figuring out how to display partial boards
*	1.5 hours coloring givens and highlighting selected numbers correctly
*	.5 hours making sure "incorrect" highlight did not linger 
*	1 hour spent writing the different difficulty level partial board generators
*	.5 hours implementing timer and storing last time
*	2 hours spent throughout the assignment updating the CSS to format and stylize the project
*	.5 hours into choosing colors and fonts (I personally think they came out looking pretty nice)
*	1 hour fixing all *onClick* callbacks that threw silent errors
*	1 hour refactoring and abstracting (although the final product may not be as abstracted as possible)
*	(2 hours personally testing and playing the final product--doesn't count as development time, but it was fun and I figured I'd let you know about it!)


## Implementation and Interface Outline
In the end, I made a few changes to my original idea, but kept many core features:

*	There was no use of Backbone, so I did not have spcific BoardModel and BoardView classes.  Instead, I created the overall *Game* class using React.
	*	The Board itself was stored and updated using Cell and Box classes via React.
*	There were three options for game mode (based on difficulty) on the left side of the board.
	*	They were each stored in html table cells so they could be formatted nicely.
	*	Each one had a handleClick method that called back to Game to generate a new board based on the difficulty.
*	There was a solve button and a "check each input" checkbox option
	*	These, too, were stored in table cells for formatting purposes.
	*	Also, they each had handleClick functions which called back to Game to perform the appropriate update
*	There was a timer per game, as well as a stored value of the time it took to correctly complete the last puzzle.