var buttonColours = ['red', 'blue', 'green', 'yellow']

var gamePattern = []
var userClickedPattern = []
var started = false
var level = 0

// Listen keyboard press event to start the game
$(document).keydown(function () {
    if (!started) {
        $('#level-title').text('Level ' + level)
        nextSequence()
        started = true
    }
})

// Listen mouse click event to trigger a function that gets the player's button choice and check if its correct
$('.btn').click(function () {

    var userChosenColour = $(this).attr('id')
    userClickedPattern.push(userChosenColour)

    playsound(userChosenColour)

    animatePress(userChosenColour)

    checkAnswer(userClickedPattern.length-1)
})

// Function that creates a random number and pushes an element in player's array as player sequence
function nextSequence() {
    userClickedPattern = []
    level++

    $('#level-title').text('Level ' + level)

    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)

    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)

    playsound(randomChosenColour)
}

// Function that plays a sound based on which button the player clicked
function playsound(name) {
    var audio = new Audio('sounds/' + name + '.mp3')
    audio.play()
}

// Function that animates the clicked button
function animatePress(currentColor) {
    $('#' + currentColor).addClass('pressed')

    setTimeout(function () {
        $('#' + currentColor).removeClass('pressed')
    }, 100)
}

// Function that checks if the player's sequence is equal to the gamePattern
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence()
            }, 1000)
        }
    } else {
        playsound("wrong")

        $('body').addClass('game-over')

        $('#level-title').text('Game Over, Press Any Key to Restart')

        setTimeout(function () {
        $('body').removeClass('game-over')
        }, 200)


        startOver()
    }
}

// Function that resets the game if the player sequence is diferent of the gamePattern
function startOver() {
    
    level = 0
    gamePattern = []
    started = false
}