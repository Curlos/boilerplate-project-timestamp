// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date?", function (req, res) {
  //res.json({greeting: 'hello API'});
  if(req.params.date == undefined) {
    res.json({
      unix: new Date(Date.now()).valueOf(),
        utc: new Date(Date.now()).toUTCString()
    });
  } else {
    const date = req.params.date;
    let isNum = date.match(/^[0-9]+$/)
    
    if(isNum != null) {
      res.json({
        unix: new Date(parseFloat(date)).valueOf(),
        utc: new Date(parseFloat(date)).toUTCString()
      });
    } else {
        if(new Date(date) == 'Invalid Date') {
          res.json({
            error: "Invalid Date"
          });
        } else {
          res.json({
            unix: new Date(date).valueOf(),
            utc: new Date(date).toUTCString()
          });
        }
    }
  }
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + 3000);
});

/*
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
*/
