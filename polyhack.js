/* LETS get some news data */
var section = "politics";
var API_KEY = "c2578a153581121ab6e1a4c1a39874b5:19:70154108";

var API = "http://api.nytimes.com/svc/topstories/v1/" + section + ".json?api-key=" + API_KEY;


function run() {

//asking server for data
$.get(API, function(response) {

	if (response.status == "OK") {
		parseData(response.results);

		//console.log(result);

	} else {
		console.log("Could not get data", result.status);
	}
	

});

}

function parseData(results) {
		
		var news_array = ["Goodmorning! Here are the top stories for today"]
		//console.log(news_array);
		for (count = 1; count < results.length; count++) {
			news_array[count] = results[count-1].abstract;
			console.log(news_array);
		}
		console.log(results);

}
















