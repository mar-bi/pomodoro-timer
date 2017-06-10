$(document).ready(function(){
	var sessionDuration = 25;
	var breakDuration = 5;
	var timer;
	var timerbreak;
	var isSession;
	var rest = 0;
	var getPaused;
	var timerWorking;
	$('span#bval').text(breakDuration);
	$('span#sval').text(sessionDuration);

	
//Start timer
$('div.start').on('click', function(){
	//console.log(rest);
	if (!timerWorking) {
		if (rest === 0) {
			$(this).removeClass('start shape-animation-alternate');
			$(this).addClass('shape-animation');
			$('#on-button').hide();
			$('div.extra-controls').removeClass('hidden');
			sessionTimer(sessionDuration);	
		} else {
			getPaused = false;
			sessionTimer(rest);
		}
	}
});


//Adjust break and session lengths
//Break
$('span#bminus').on('click', function(){
	if (breakDuration > 0) {
		breakDuration--;
		$('span#bval').text(breakDuration);
	}
});

$('span#bplus').on('click', function(){
	if (breakDuration < 10) {
		breakDuration++;
		$('span#bval').text(breakDuration);
	}
});

//Session
$('span#sminus').on('click', function(){
	if (sessionDuration > 10) {
		sessionDuration--;
		$('span#sval').text(sessionDuration);
	}
});

$('span#splus').on('click', function(){
	if (sessionDuration < 45) {
		sessionDuration++;
		$('span#sval').text(sessionDuration);
	}
});


//Pause and Reset Buttons
//Pause
$('img#pause').on('click', function() {
	paused();
});

//Reset
$('img#reset').on('click', function() {
	clearInterval(timer);
	clearInterval(timerbreak);
	timerWorking = false;
	getPaused = false;
	rest = 0;
	isSession = false;
	$('div.timer-container').addClass('start');
	$('div.timer-container').removeClass('shape-animation');
	$('div.timer-container').addClass('shape-animation-alternate');
	$('#timer-text').text('Press to Start!');
	$('#on-button').show();
	$('p#timer-status').empty();
	$('div.extra-controls').addClass('hidden');
});   


//helpers
// timer function for session
function sessionTimer(endtime) {
	$('#timer-text').text('session');
	isSession = true;
	rest = 0;
	timerWorking = true;
	var end = new Date().getTime() + minutesToMiliseconds(endtime);
	
	//Session timer
	timer = setInterval(function(){
		var timeNow = new Date().getTime();
		var distance = end - timeNow;
		var minutes = checkTimeFormat(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
	  	var seconds = checkTimeFormat(Math.floor((distance % (1000 * 60)) / 1000));
				
		$('p#timer-status').text(minutes + ':' + seconds);	

		if (distance < 0) {
			clearInterval(timer);
			$('p#timer-status').text('00:00');
			breakTimer();	
		}
	}, 500);
}

//timer function for break
function breakTimer() {
	$('#timer-text').text('break');
	isSession = false;
	var end = new Date().getTime() + minutesToMiliseconds(breakDuration);
	
	//Break timer
	timerbreak = setInterval(function(){
		var timeNow = new Date().getTime();
		var distance = end - timeNow;
		var minutes = checkTimeFormat(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
	  	var seconds = checkTimeFormat(Math.floor((distance % (1000 * 60)) / 1000));

		$('p#timer-status').text(minutes + ':' + seconds);	

		if (distance < 0) {
			clearInterval(timerbreak);
			$('p#timer-status').text('00:00');
			sessionTimer(sessionDuration);	
		}
	}, 500);
}

//function for pause
function paused(){
	//console.log('Session: ', isSession);
	if (isSession && !getPaused) {
		clearInterval(timer);
		clearInterval(timerbreak);
		var str = $('p#timer-status').text();
		rest = Number(str.substring(0,2)) + Number(str.substring(3))/60;
		getPaused = true;
		timerWorking = false;
		//console.log('Minutes:', rest);

		$('#timer-text').text('pause');
		$('p#timer-status').html(str + '<br> click to resume');
	}
}

function checkTimeFormat(val) {
    if (val < 10){val = "0" + val};  // add zero in front of numbers < 10
    return val;
}

function minutesToMiliseconds(num){
	return (num*60*1000);            // convert minutes to miliseconds
}

});
