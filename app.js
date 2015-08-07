/*
 *  Made by Ethan Lee (@ethanlee16) and Kushal Tirumala (@kushaltirumala)
 *  Licensed under the MIT License.
 */

/* Change this to your Slack bot's OAuth token,
* found in the Integrations tab */
var SLACK_TOKEN = require('./config').slackToken;

var https = require('https');
var  _ws = require('ws');
var r = require('./responses');

var counter = 1;
var ws, slackID;

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
        slackId = rtm.self.id;
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
        // debug
        // console.log(JSON.stringify(event));
        if(event.type === "message" && event.user !== slackID) {
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

function getResponse(message) {
    for(var i = 0; i < r.length; i++) {
        for(var j = 0; j < r[i].keywords.length; j++) {
            if(message.toLowerCase().indexOf(r[i].keywords[j]) != -1) {
                console.log("Responding to message: " + message);
                return r[i].messages[Math.floor(Math.random() * r[i].messages.length)];
            }
        }
    }
}

