# trump-slackbot

![](http://cl.ly/image/3k43172v393p/Screen%20Shot%202015-08-06%20at%2011.59.29%20PM.png)
Slack team conversations getting a little dull? Spice it up by adding Donald Trump to your #general channel. This should be fun.

##Setup
To use Donald Trump with your Slack, visit [your Slack's Integrations page](http://my.slack.com/services/new/bot) and add a new bot called donald_trump. You can also add a profile picture, and we recommend [this one](http://www.liberationnews.org/wp-content/uploads/2015/07/donaldtrump61815.jpg), but that doesn't really matter. The important bit here is to grab the OAuth token for your bot and save this for later. 

Next, clone this project or [download it as a ZIP](https://github.com/kushaltirumala/trump-slackbot/archive/master.zip) and open up `app.js`. Change `SLACK_TOKEN` to the token of your bot (you can put this in a separate config.js file if you wish to contribute to this repo).

Finally, run `npm install` and `npm start` in the project and you've added Trump!

##License
The MIT License (MIT)

Copyright (c) 2015, Ethan Lee and Kushal Tirumala

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
