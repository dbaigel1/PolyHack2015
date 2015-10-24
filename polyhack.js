/* LETS get some news data */
var section = "politics";
var NEWS_API_KEY = "c2578a153581121ab6e1a4c1a39874b5:19:70154108";
var WEATHER_API_KEY = "880dc535d1197dd2e77735d503a4185e";
var BECKY_API = "https://pacific-lake-4279.herokuapp.com";
var CITY = "524901";

var NEWS_API = "http://api.nytimes.com/svc/topstories/v1/" + section + ".json?api-key=" + NEWS_API_KEY;
var WEATHER_API = "http://api.openweathermap.org/data/2.5/weather?id=" + CITY + "&APPID=" + WEATHER_API_KEY;

/* SPEECH VARIABLES */
var INTRO = "Good morning! ";
var news_array = [];
var weather = {};

/*run the news API data!*/
function run() {
var count;

//URL CALL TO CARLA
$.get(BECKY_API + "/", function(response) {
	count = 0;
});

setInterval(function() {

	var path = BECKY_API + "/pressed?count=" + count;

	$.get(path, function (response) {

		var r = JSON.parse(response);

		if (r.pressed == true) {
			console.log("button was pressed");
			var speech = generateSpeech();
			count++;
			responsiveVoice.speak(speech);
		}
		else
			console.log("waiting");

	});

}, 1000);

//asking server for data
$.get(NEWS_API, function(response) {
	if (response.status == "OK") {
		news_array = parseNews(response.results);
	} else {
		console.log("Could not get data", result.status);
	}
});

//asking server for data
$.get(WEATHER_API, function(res) {

	//var res = JSON.parse(response);

	var n = res.name;
	var d = res.weather[0].description;
	var t = fah(res.main.temp);

	var w = {
		name: n,
		desc: d,
		temp: t
	}

	console.log(w);

	weather = w;

});

}

/*parses the news data*/
function parseNews(results) {
		
		var news_array = []
		//console.log(news_array);
		var length;

		if(results.length > 3)
			length = 3;
		else
			length = results.length;

		for (count = 0; count < length; count++) {
			news_array[count] = results[count].abstract;
		}

		return news_array;
}

function generateSpeech() {

	var speech = "";

	speech += INTRO;
	speech += "Here is " + weather.name + "'s weather forecast for today!";

	if (weather.temp > 75) {
		speech += "Head to the beach! ";
	} else if (weather.temp < 40) {
		speech += "Grab a jacket and your mittens! ";
	} else {
		speech += "Looks like a beautiful day ";
	}

	speech += "It's " + weather.temp + " degrees fahrenheit! ";
	speech += "Expect " + weather.desc + "! ";

	speech += "Here are the top " + news_array.length + " news stories for today! "

	for (var i = 0; i < news_array.length; i++) {
		speech += "Number " + (i + 1) + " . ";
		speech += news_array[i];
	}

	return speech;
}

function fah(kelvin) {
	return (Math.floor((((kelvin - 273.15) * (9/5)) + 32)));
}










