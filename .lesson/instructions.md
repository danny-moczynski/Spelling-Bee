# Lab 7: Hello, Node.js

## Objective: 
To gain experience working with Node.js, practice refactoring code, as you enhance Spelling Bee.

## Pre-lab Preview: 
Review your notes on Node.js

## Overview: 
Our current incarnation of Spelling Bee has one fatal flaw - the user could simply inspect the JavaScript to see all the puzzles, including acceptable words. In this lab we will remedy that.

## Instructions:
1. Migrate your website from Lab 6 to the Node.js environment (a single drag-and-drop operation into this lab's repl 😍) 
2. Modify Node.js to send out a randomly chosen puzzle when requested. It should not repeat any puzzles until all puzzles have been distributed -- and once all puzzles have been distributed, the order in the next cycle should be decided, again, randomly.
3. Add a second web page, that can be reached as ... /addPuzzle. This page will allow the user to dynamically add a new puzzle to the Node.js application. You may design the page however you see fit, with the goal of making it relatively easy for the user to enter a central letter, a set of peripheral letters, and a set of acceptable words.


## Delivery:
1. Submit your replit (this is part of the Lab7 project) on replit.com
2. Upload a screenshot of your second web page to Canvas (unzipped, as a .png, .jpg or .gif, not a .heic)
