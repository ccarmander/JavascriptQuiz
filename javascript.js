var triviaQuestions = [{
	question: "Which type does not belong in an array",
	answerChoices: ["Boolean", "Speed", "Number", "String"],
	answer: 1
}, {
	question: "The condition in an if/else statement is enclosed within ___.",
	answerChoices: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],
	answer: 1
}, {
	question: "What does DOM stand for?",
	answerChoices: ["Document On Model", "Document Original Mode", "Document Operating Model", "Document Object Model"],
	answer: 3
}, {
	question: "Inside which HTML element do we put the Javascript?",
	answerChoices: ["<scripting>", "<script>", "<javascript>", "<js>"],
	answer: 1
}, {
	question: "How do you write ''Hello World'' in an alert box?",
	answerChoices: ["msg(''Hello World'');", "alert(''Hello World'')", "alertBox(''Hello World'');", "msgBox(''Hello World'');"],
	answer: 1
}, {
	question: "Javascript is the same as Java.",
	answerChoices: ["True", "False"],
	answer: 1
}];

var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelect;

var messages = {
	correct: "RIGHT!",
	incorrect: "WRONG!",
	endTime: "TIME GO BYE BYE!",
	finished: "I have a good feeling about this, let's check thee score!"
}

$('#startButton').on('click', function () {
	$(this).hide();
	newGame();
});

$('#startOverButton').on('click', function () {
	$(this).hide();
	newGame();
});

function newGame() {
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}
	//clears out the page for the new question
function newQuestion() {
	$('#message').empty();
	$('#correctedAnswer').empty();
	answered = true;

	//sets up new questions & answerChoices
	$('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' + triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for (var i = 0; i < 4; i++) {
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerChoices[i]);
		choices.attr({ 'data-index': i });
		choices.addClass('thisChoice');
		$('.answerChoices').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click', function () {
		userSelect = $(this).data('index');
		// clearInterval(time);
		answerPage();
	});
}

// function countdown() {
// 	seconds = 100;
// 	$('#timeRemaining').html('<h3>Time Remaining: ' + seconds + '</h3>');
// 	answered = true;
// 	//sets timer to go down
// 	time = setInterval(showCountdown, 1000);
// }


function countdown () {
	var sec = 60;
	function startTimer() {
		console.log('Timer Start and Dont Stop!')
		var timer = setInterval(function () {
			sec--;
			document.getElementById('timeRemaining').innerHTML = '00:' + sec;
			if (sec < 0) {
				clearInterval(timer);
				alert("Time is up!")
			}
		}, 1000);
	}
	document.getElementById('incorrectAnswers').addEventListener('click', function () {
		sec -= 5;
		document.getElementById('timeRemaining').innerHTML = '00:' + sec;
	});
	startTimer();
}

function showCountdown() {
	seconds--;
	$('#timeRemaining').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if (seconds < 1) {
		// clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage() {
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerChoices[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	//checks to see correct, incorrect, or unanswered
	if ((userSelect == rightAnswerIndex) && (answered == true)) {
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if ((userSelect != rightAnswerIndex) && (answered == true)) {
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else {
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}

	//timer inbetween the questions
	if (currentQuestion == (triviaQuestions.length - 1)) {
		setTimeout(scoreboard, 2000)
	} else {
		currentQuestion++;
		setTimeout(newQuestion, 2000);
	}
}

function scoreboard() {
	$('#timeRemaining').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverButton').addClass('reset');
	$('#startOverButton').show();
	$('#startOverButton').html('Start Over?');
}