/*
	library.js
	A demo on how multiple functions (methods) can be stored in a single object and called
	(c) Donald Leung.  All rights reserved.
*/

// Declaring variables
var consoleBannerStyle,
	consoleTitleStyle,
	consoleTextStyle,
	date,
	worker,
	seconds,
	minutes;

function init() {
	consoleBannerStyle = "font-size: 4em; font-family: 'Ubuntu Condensed', sans-serif; background-color: #5d93a2; color: #fff; padding: 5px; border-radius: 5px;";
	consoleTitleStyle = "font-size: 2em; font-family: 'Ubuntu Condensed', sans-serif; color: #5d93a2;";
	consoleTextStyle = "font-family: 'Ubuntu Condensed', sans-serif; color: #878e83;";
	console.log("%cMinimaxing",consoleBannerStyle);
	console.log("%cDeveloper's Console",consoleTitleStyle);
	console.log("%cThis console is meant for <company_name> developers only.  Please do not mess with the console.",consoleTextStyle);
	console.log("----------------------------------------------------------------------------------------------------------------------")
}

var library = {
	// Here is the collection of functions
	gpsNavigation: function() {
		navigator.geolocation.watchPosition(library.showPosition,library.showError);
	},
	showPosition: function(position) {
		// Show a map with user location
		document.getElementById("gpsMap").src = "http://maps.googleapis.com/maps/api/staticmap?center=" + position.coords.latitude + "," + position.coords.longitude + "&zoom=17&size=400x300&sensor=false";
	},
	showError: function(error) {
		switch (error.code) {
			case error.PERMISSION_DENIED:
			console.log("%cSorry, you denied permission for this website to use your location, so the map cannot be displayed.",consoleTextStyle);
			break;
			case error.POSITION_UNAVAILABLE:
			console.log("%cSorry, your position is currently unavailable.",consoleTextStyle);
			break;
			case error.TIMEOUT:
			console.log("%cSorry your position timed out.",consoleTextStyle);
			break;
			case error.UNKNOWN_ERROR:
			console.log("%cSorry, an unknown error occurred.",consoleTextStyle);
			break;
		}
	},
	clock: function() {
		date = new Date();
		document.getElementById("clock").innerHTML = date;
		setTimeout("library.clock()",1000);
	},
	imageSwitcher: {
		init: function() {
			document.getElementById("imageSwitcher").style.display = "block";
			library.imageSwitcher.firstPic();
		},
		firstPic: function() {
			setTimeout("document.getElementById('rotation01').style.display = 'block';",0);
			setTimeout("document.getElementById('pic01').style.opacity = '1';",1000);
			setTimeout("document.getElementById('pic01').style.opacity = '0';",11000);
			setTimeout("document.getElementById('rotation01').style.display = 'none';",13000);
			setTimeout("library.imageSwitcher.secondPic()",13000);
		},
		secondPic: function() {
			setTimeout("document.getElementById('rotation02').style.display = 'block';",0);
			setTimeout("document.getElementById('pic02').style.opacity = '1';",1000);
			setTimeout("document.getElementById('pic02').style.opacity = '0';",11000);
			setTimeout("document.getElementById('rotation02').style.display = 'none';",13000);
			setTimeout("library.imageSwitcher.firstPic()",13000);
		}
	},
	timer: function() {
		// Timer (Commercial Version)
		// Runs up to 1 hour only
		// Feel free to use it on your website!  Just don't forget to credit me (e.g. Timer designed by Donald Leung)! 
		worker = new Worker("worker.js");
		worker.onmessage = function(event) {
			seconds = event.data;
			minutes = 0;
			hours = 0;
			if (seconds < 60) {
				document.getElementById("timer").innerHTML = "Time Visited: " + seconds;
			} else if (seconds >= 60 && seconds < 3600) {
				for (i = 0; i < 60; i++) {
					if (seconds >= 60) {
						seconds -= 60;
						minutes++;
					}
				}
				document.getElementById("timer").innerHTML = "Time Visited: " + minutes + " minutes " + seconds + " seconds";
			} else {
				document.getElementById("timer").innerHTML = "TIme Visited: over an hour";
				worker.terminate();
			}
		}
	}
};