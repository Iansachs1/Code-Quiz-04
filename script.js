var timeDisplay = document.querySelector("#timeDisplay");
var titleText = document.querySelector("#titleText");
var bodyText = document.querySelector("#bodyText");
var viewScores = document.querySelector("#viewScores");
var beginBtn = document.querySelector("#beginBtn");
var responseArea = document.querySelector("#response-area");

var totalSeconds = 90;
var secondsElapsed = 0;
var interval;
var remainingTime;

var Questions = [
    {
        Qtext: 'Which of the following methods would correctly select an element based on id',
        Atext: ["getHTMLByID()", "IDSelector()", "getElementByID()", "element.ID()"],
        AData: ["incorrect", "incorrect", "correct", "incorrect"]
    },
    {
        Qtext: 'Which of the following declares a variable',
        Atext: ["variable", "var", "X", "None of the above"],
        AData: ["incorrect", "correct", "incorrect", "incorrect"]
    },
    {
        Qtext: 'What would console.log("2" + 2 - 2); return in the console',
        Atext: ["2", "22", "20", "None of the above"],
        AData: ["incorrect", "incorrect", "correct", "incorrect"]
    },
    {
        Qtext: 'What is the default data type of information returned from a prompt',
        Atext: ["String", "Integer", "It depends on what is entered in the prompt", "Boolean"],
        AData: ["correct", "incorrect", "incorrect", "incorrect"]
    },
    {
        Qtext: 'What is the difference between a while and a do while loop',
        Atext: ["A while loop runs while a certain criteria is true a do while loop runs the first time regardless of criteria", "There is no significant difference, do while is just more fun to say", "Do while loops aren't an actual type of loop", "A do while loop is the modern standard to use over while loops"],
        AData: ["correct", "incorrect", "incorrect", "incorrect"]
    },
    {
        Qtext: 'How do you write an increment operator',
        Atext: ["+", "++", "&+", "None of the above"],
        AData: ["incorrect", "correct", "incorrect", "incorrect"]
    },

];
var questionIndex = 0;

var scoreCount = 0;

var highScore = [];

function setTime() {
    totalSeconds = 90;
    secondsElapsed = 0;
    clearInterval(interval);
}
function displayTime() {
    if (totalSeconds >= secondsElapsed) {
        remainingTime = totalSeconds - secondsElapsed;
        timeDisplay.textContent = "Time: " + remainingTime;
    } else {
        stopTimer();
        remainingTime = 0;
        timeDisplay.textContent = "Time: " + remainingTime;
        displayEndScreen();
    }
}

function stopTimer() {
    clearInterval(interval);
  }

function startTimer() {
    setTime();

    interval = setInterval(function () {
        secondsElapsed++;
        displayTime();
        }, 1000);
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function emptyElement(HTMLElement) {
    while (HTMLElement.firstChild) {
        HTMLElement.removeChild(HTMLElement.firstChild);
    }
}

function displayNewQuestion() {
    titleText.innerText = Questions[questionIndex].Qtext;

    emptyElement(bodyText);

    for (let i = 0; i < 4; i++) {
        var addButton = document.createElement("button");
        addButton.innerText = Questions[questionIndex].Atext[i];
        addButton.setAttribute("data-correct", Questions[questionIndex].AData[i]);
        addButton.setAttribute("class", "btn btn-primary button");
        bodyText.appendChild(addButton);
    }

}

function displayEndScreen() {
    titleText.innerText = "End of Quiz!"
    emptyElement(bodyText);
    scoreCount = scoreCount + remainingTime

    var scoreDisplay = document.createElement("div");
    scoreDisplay.innerText = "You ended with a score of: " + scoreCount;
    bodyText.appendChild(scoreDisplay);

    var infoForm = document.createElement("form");
    bodyText.appendChild(infoForm);

    var infoLabel = document.createElement("label");
    infoLabel.innerText = "Enter your info to save your score.";
    infoForm.appendChild(infoLabel);
    
    var infoInput = document.createElement("input");
    infoInput.setAttribute("type", "text");
    infoInput.setAttribute("placeholder", "Your Name");
    infoInput.setAttribute("id", "input-text");
    infoForm.appendChild(infoInput);

    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("class", "btn btn-primary submit");
    submitBtn.setAttribute("data", "submit");
    submitBtn.innerText = "Submit";
    bodyText.appendChild(submitBtn);
}

function storeScore() {
    localStorage.setItem("highScores", JSON.stringify(highScore));
}

bodyText.addEventListener("click", function(event) {
    var submitData = event.target.getAttribute("data");
    if (submitData === "submit") {
        var inputFormElement = document.querySelector("#input-text");
        var inputText = inputFormElement.value.trim();
        
        if (inputText === "") {
            return;
        } else {
            highScore.push(inputText + " - " + scoreCount);
            storeScore();
            displayScoresScreen();
        }
    }

    var scoreBtnId = event.target.getAttribute("id");
    if (scoreBtnId === "clear-scores") {
        highScores = [];
        storeScore();

    } else if (scoreBtnId === "main-menu") {
        displayMain();
    }

    var startBtn = event.target.getAttribute("id");
    if (startBtn === "beginBtn") {
        questionIndex = 0;
        startTimer();
        shuffle(Questions);
        displayNewQuestion();
    }
});

viewScores.addEventListener("click", function() {
    displayScoresScreen();
});

function displayMain() {
    titleText.innerText = "Coding Quiz Challenge"

    emptyElement(bodyText);

    var firstP = document.createElement("p");
    firstP.innerText = "This is a timed quiz to test your knowledge of javascript. Once you begin the quiz, you will have one minute and thirty seconds to answer as many questions as you can.";
    bodyText.appendChild(firstP);

    var secondP = document.createElement("p");
    secondP.innerText = " You gain 10 points for every correct answer, and one point for every second left on the clock after answering all questions.";
    bodyText.appendChild(secondP);

    var thirdP = document.createElement("p");
    thirdP.innerText = "For every incorrect answer, 20 seconds will be subtracted from the remaining time.";
    bodyText.appendChild(thirdP);

    var startBtn = document.createElement("button");
    startBtn.innerText = "Begin Quiz!"
    startBtn.setAttribute("id", "beginBtn");
    startBtn.setAttribute("class", "btn btn-primary");
    bodyText.appendChild(startBtn);

}

function displayScoresScreen () {
    titleText.innerText = "High Scores"

    emptyElement(bodyText);

    var orderedListElement = document.createElement("ol");
    bodyText.appendChild(orderedListElement);
    
    highScores = JSON.parse(localStorage.getItem("highScores"));

    for (var i = 0; i < highScores.length; i++) {
        var highScore = highScores[i];
    
        var li = document.createElement("li");
        li.textContent = highScore;
        orderedListElement.appendChild(li);
      }

    var mainBtn = document.createElement("button");
    mainBtn.innerText = "Go Back";
    mainBtn.setAttribute("id", "main-menu");
    mainBtn.setAttribute("class", "btn btn-primary");
    bodyText.appendChild(mainBtn);

    var clearBtn = document.createElement("button");
    clearBtn.innerText = "Clear Scores";
    clearBtn.setAttribute("id", "clear-scores");
    clearBtn.setAttribute("class", "btn btn-primary");
    bodyText.appendChild(clearBtn);

}


beginBtn.addEventListener("click", function () {
    startTimer();
    shuffle(Questions);
    displayNewQuestion();
});

function displayCorrect () {
    var correctResponse = document.createElement("div");
    correctResponse.innerText = "Correct!";
    correctResponse.setAttribute("class", "response");
    responseArea.appendChild(correctResponse);
    setTimeout(function() {
        emptyElement(responseArea);
    }, 1000);
}

function displayIncorrect() {
    var incorrectResponse = document.createElement("div");
    incorrectResponse.innerText = "Incorrect!";
    incorrectResponse.setAttribute("class", "response");
    responseArea.appendChild(incorrectResponse);
        setTimeout(function() {
        emptyElement(responseArea);
        }, 1000);
}

function responseValitityHandler() {
    if (buttonData === "correct") {
        displayCorrect();
        scoreCount = scoreCount + 10;
    } else if (buttonData === "incorrect") {
        displayIncorrect();
        secondsElapsed = secondsElapsed + 20;
    }
}

bodyText.addEventListener("click", function (event) {
    buttonData = event.target.getAttribute("data-correct");
    if (event.target.tagName.toLowerCase() === "button" && buttonData === "correct" || buttonData === "incorrect") {
        questionIndex++;
        if(questionIndex < Questions.length) {
            responseValitityHandler();
            displayNewQuestion();
        } else {
            stopTimer();
            displayEndScreen();
        }
    }
})

