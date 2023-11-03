/*
*
* Name: Danny Moczynski
* Date: 11/02/2023
* Description: This is referred to as Node.js in the instructions. This javascript file connects the backend to the frontend and allows the user to add puzzles by adding /addPuzzles to their url. This javascript keeps track of the puzzles and adds newly made puzzles to the original game. 
* Bugs: As far as I could check, there are no bugs in the program
* Reflection: I found this lab challenging because I had to write a lot of code to get the backend to work. I also did not understand javascript too well in class when it was explained. But after completing this lab, I feel much more confident in my understanding and find it interesting to see how different js applications can connect to each other. 
*
*/
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from a 'public' directory

// Define an array of game puzzles
const games = [
  {
    name: "Game1",
    acceptableWords: ["BARN", "LOAN", "BORN", "ROMAN", "NORM", "MANOR", "BRAN"],
    letters: ["L", "B", "R", "O", "M", "A"],
    centralLetter: "N",
  },
  {
    name: "Game2",
    acceptableWords: ["EGGING", "EGGY", "ENGINE", "EYEING", "GENE", "GENUINE", "GETTING", "IGNITE", "INGENUITY", "INNING", "NUGGET", "TINGE", "TYING"],
    letters: ["Y", "E", "U", "T", "I", "N"],
    centralLetter: "G",
  },
  {
    name: "Game3",
    acceptableWords: ["ACAI", "CLINICAL", "CLINIC", "COIL", "COIN"],
    letters: ["A", "C", "L", "N", "O", "Y"],
    centralLetter: "I",
  },
];

let shuffledOrder = shuffleOrder(games); // Shuffle the order to serve games

let gameIndex = 0; // Track the current game index

// Shuffle function to shuffle the order of games to be served
function shuffleOrder(order) {
  const shuffled = [...order];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Route to get the next game
app.get('/getGames', (req, res) => {
  if (gameIndex >= shuffledOrder.length) {
    gameIndex = 0; // Reset the index to repeat the cycle
    shuffledOrder = shuffleOrder(games); // Shuffle the order again
  }

  const game = shuffledOrder[gameIndex];
  gameIndex++;

  res.json(game);
});

// Serve the entire 'games' array as JSON
app.get('/allGames', (req, res) => {
  res.json(games);
});

app.get('/addPuzzle', (req, res) => {
  // Serve the 'addPuzzle' web page here
  res.sendFile(__dirname + '/public/addPuzzle.html');
});

app.post('/addPuzzle', (req, res) => {
  // Handle adding a new puzzle here
  const { centralLetter, peripheralLetters, acceptableWords } = req.body;

  // Validate and add the new puzzle to the 'games' array
  const newPuzzle = { // Splice the letters to get them individually
    centralLetter,
    letters: peripheralLetters.split(',').map(letter => letter.trim()),
    acceptableWords: acceptableWords.split(',').map(word => word.trim()),
  };

  games.push(newPuzzle); // Push the new puzzle into the 'games' array
  shuffledOrder = shuffleOrder(games); // Shuffle the order again to include the new puzzle


  // Redirect back to the original spelling bee page
  res.redirect('/index.html');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
