/* Change this to your Slack bot's OAuth token, 
* found in the Integrations tab */
var SLACK_TOKEN = "";

var https = require('https');
var  _ws = require('ws');
var counter = 1;
var ws;
var num = Math.floor((Math.random() * 100000000) + 1);

https.get("https://slack.com/api/rtm.start?token=" + SLACK_TOKEN, function(res) {
	console.log("Connecting to Slack API...");
	var data = "";
	res.on('data', function(chunk) {
		data += chunk;
	}).on('error', function(err) {
	console.log("Failed to connect to Slack. "
		+ "Did you put in your Slack bot's token in app.js?");
	}).on('end', function() {
		var rtm = JSON.parse(data);
		ws = new _ws(rtm.url);
		console.log("Logging into " + rtm.team.name + "'s Slack...");
		ws.on('open', function() {
			goTrump(rtm.team.name, rtm.team.prefs.default_channels[0]);
		});
	})
});

function goTrump(teamName, channelID) {
	console.log("Donald Trump has joined " + teamName + "!");
	ws.send(JSON.stringify({
		"id": counter,
		"type": "message",
		"channel": channelID,
		"text": "LET'S MAKE " + teamName.toUpperCase() + " GREAT AGAIN."
	}));
	counter++;

	console.log("Listening for new messages...");
	ws.on('message', function(data) {
		var event = JSON.parse(data);
		if(event.type === "message") {
			ws.send(JSON.stringify({
				"id": counter,
				"type": "message",
				"channel": channelID,
				"text": getResponse(event.text)
			}))
		}
		counter++;
	});
}

var r = [
	{
		"keywords": ["america", "usa", "united states"],
		"messages": [
			"When was the last time anybody saw us beating, let’s say, " 
			+ "China in a trade deal? They kill us. I beat China all the time."
		]
	},
	{
		"keywords": ["mexico", "mexican", "latino"],
		"messages": [
			"When Mexico sends its people, they’re not sending their best. " 
			+ "They’re sending people that have lots of problems.",
			"I will build a great wall — and nobody builds walls better than me, " 
			+ "believe me —and I’ll build them very inexpensively. I will build, " 
			+ "a great, great wall on our southern border, and I will make Mexico " 
			+ "pay for that wall. Mark my words."
		]
	},
	{
		"keywords": ["money", "cash", "success"],
		"messages": [
			"I have $",
			+ num + " in my checking account right now." 
			
		]
	},
	{
		"keywords": ["china", "asia", "japan", "korea"],
		"messages": [
			"When did we beat Japan at anything? They send their cars over " 
			+ "here by the millions, and what do we do? When was the last time " 
			+ "you saw a Chevrolet in Tokyo? It doesn't exist, folks."
		]
	}
];

function getResponse(message) {
	console.log("looking for " + message);
	for(var i = 0; i < r.length; i++) {
		for(var j = 0; j < r[i].keywords.length; j++) {
			if(message.toLowerCase().indexOf(r[i].keywords[j]) != -1) {
				console.log("true");
				return r[i].messages[Math.floor(Math.random() * r[i].messages.length)];
			}
		}
	}
}
