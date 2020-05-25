var player1 = window.prompt('Enter first player\'s name');
var player2 = window.prompt('Enter second player\'s name');

var scores, activePlayer, roundScore, gamePlay;

init();

var lastDice = 0;

document.querySelector('#name-0').textContent = player1;
document.querySelector('#name-1').textContent = player2;

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlay) {
        //Dice roll:
        var dice = Math.floor(Math.random() * 6) + 1;

        /*//Challenge 3 dice code
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;*/


        //Display the dice
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';


        /*//Challenge 3 dice code changes
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';*/

        /* //Challenge 3
         if (dice1 !== 1 && dice2 !== 1) {
             //Add the score to current round
             roundScore += dice1 + dice2;
             document.querySelector('#current-' + activePlayer).textContent = roundScore;
         } else {
             //Pass dice to next player
             nextPlayer();
         }*/


        //Challenge 1
        if (dice === 6 && lastDice === 6) {
            //Player looses all his score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();

            //Update the score for the round
        } else if (dice !== 1) {
            //Add the score to current round
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {
            //Pass dice to next player
            nextPlayer();
        }
        lastDice = dice;
    }
});


document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlay) {
        //add Current score to the player's overall score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //challenge Part 2
        var input = document.querySelector('.final-score').value;
        var winningScore;
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        //Check if current player won?
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!!!';

            document.querySelector('.dice').style.display = 'none';
            /*Challenge 3
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            */
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlay = false;

        } else {
            //Pass the dice to next player
            nextPlayer();
        }
    }
});


//Next Player function
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
    /*Challenge 3
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';*/
}


document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlay = true;

    document.querySelector('.dice').style.display = 'none';

    /*Challenge 3
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';*/


    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player-1';
    document.getElementById('name-1').textContent = 'Player-2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}
