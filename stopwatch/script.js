
	var seconds = 00;
	var tens = 00;
	var appendTens = document.getElementById("tens");
	var appendsSeconds = document.getElementById("seconds");
	var buttonStart = document.getElementById("button_start");
	var buttonStop = document.getElementById("button_stop");
	var buttonReset = document.getElementById("button_reset");
	var interval;



	function startTimer()
	{
		tens++;

		if (tens < 9)
		{
			appendTens.innerHTML = "0" + tens;
		}
		if (tens > 9)
		{
			appendTens.innerHTML = tens;
		}
		if (tens > 99)
		{
			// console.log("seconds");
			seconds++;
			appendsSeconds.innerHTML = "0" + seconds;
			tens = 0;
			appendTens.innerHTML = "0" + 0;
		}
		if (seconds > 9)
		{
			appendsSeconds.innerHTML = seconds;
		}
	}

	buttonStart.onclick = function()
	{
		interval = setInterval(startTimer, 10);
	}

	buttonStop.onclick = function()
	{
		clearInterval(interval);
	}

	buttonReset.onclick = function()
	{
		clearInterval(interval);
		tens = "00";
		seconds = "00";
		appendTens.innerHTML = tens;
		appendsSeconds.innerHTML = seconds;
	}
