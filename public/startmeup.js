/**
 * Name: Danny Moczynski
 * Date: 11/02/2023
 * Description: This javascript code fetches multiple game puzzles from the server and also has the functionality to check for different invalid answers. 
 * Bugs: no bugs
 * Reflection: I didn't know what fetch was and felt it was only briefly covered in class for this lab, but found out how the method works after asking chat gpt. It is much more similar than I anticipated since it is doing that same thing as calling any other method. Instead it fetches the puzzles from the server and then displays them on the page.
 */

// Declare variables to store game state
let currentGame = null;
let centralElement = null;
let grid = null;
let currentWord = '';
let foundWords = new Set();
let score = 0;

// Function to fetch all games, including user-added ones
async function fetchAllGames() {
  try {
    const response = await fetch('/allGames');
    if (response.ok) {
      const games = await response.json();
      // Process the fetched games as needed 
      console.log(games); // Log the games to the console
    } else {
      console.error('Failed to fetch games');
    }
  } catch (error) {
    console.error('Error while fetching games:', error);
  }
}

// Function to get the next puzzle
function getNextPuzzle() {
  // Fetch the next puzzle from the server
  return fetch('/getGames')
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching next puzzle:', error);
    });
}

// Function to start the game by setting up the initial puzzle
function startGame() {
  centralElement = document.querySelector('.cell.yellow');
  grid = document.getElementById('grid');

  getNextPuzzle()
    .then(data => {
      // Process the fetched puzzle and update the game state
      currentGame = data;
      centralLetter = currentGame.centralLetter;
      centralElement.textContent = centralLetter; 
      // Process the letters to put into the grid
      let peripheralButtons = Array.from(grid.getElementsByClassName('peripheral'));

      for (let i = 0; i <= 6; i++) {
        peripheralButtons[i].textContent = currentGame.letters[i];
      }
    })
    .catch(error => {
      console.error('Error fetching next puzzle:', error);
    });
}

// Call fetchAllGames when the page loads
window.onload = () => {
  fetchAllGames();
  startGame(); // Start the game after fetching the initial puzzle
}
// Event listener for when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById('grid');
  const textDisplay = document.getElementById('text-display');
  const yourWordsList = document.getElementById('your-words-list');
  const foundWords = new Set();
  const centralElement = document.querySelector('.cell.yellow');
  let centralLetter;
  let currentWord = '';
  let score = 0;

  // Function to start the game by setting up the initial puzzle
  function startGame() {
    currentGame = getNextPuzzle();
    let peripheralButtons = Array.from(grid.getElementsByClassName('peripheral'));
    let shuffleableLetters = peripheralButtons.slice(0, 6);

    // shuffleableLetters.forEach((peripheralButton, index) => {
    //   peripheralButton.textContent = currentGame.letters[index];
    // });

    centralLetter = currentGame.centralLetter;
    centralElement.textContent = centralLetter;
  }

  window.addEventListener('load', startGame);

  // Event listener for grid clicks
  grid.addEventListener('click', (event) => {
    if (event.target.classList.contains('cell')) {
      const letter = event.target.textContent;

      if (event.target.classList.contains('delete-letter')) {
        currentWord = currentWord.slice(0, -1);
      } else if (event.target.classList.contains('shuffle-letters')) {
        shuffleLetters();
      } else if (event.target.classList.contains('check-word')) {
        if (isWordValid(currentWord)) {
          foundWords.add(currentWord);
          const wordItem = document.createElement('li');
          wordItem.textContent = currentWord;
          yourWordsList.appendChild(wordItem);
        }
        document.getElementById('score-value').textContent = score;

        currentWord = '';
      } else {
        currentWord += letter;
      }
      textDisplay.value = currentWord;
    }
  });

  // Function to check if a word is valid and update the score
  function isWordValid(word) {
    if (word.length < 4) {
      alert("Too short, it must be at least 4 letters long");
      return false;
    } else if (!word.includes(currentGame.centralLetter)) {
      alert("Must include the central character");
      return false;
    } else if (foundWords.has(word)) {
      alert("Word already found");
      return false;
    } else if (!currentGame.acceptableWords.includes(word)) {
      alert("Not a valid word");
      return false;
    } else {
      const wordLength = word.length;
      score += wordLength;
      return true;
    }
  }

  // Function to shuffle letters in the peripheral buttons
  function shuffleLetters() {
    const letterButtons = Array.from(grid.getElementsByClassName('peripheral'));
    const shuffleableLetters = letterButtons.slice(0, 6);

    for (let i = shuffleableLetters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffleableLetters[i].textContent, shuffleableLetters[j].textContent] =
        [shuffleableLetters[j].textContent, shuffleableLetters[i].textContent];
    }
  }
});
