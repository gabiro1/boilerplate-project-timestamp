// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();


var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  

// serve static files
app.use(express.static('public'));

// serve the index page
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// simple test endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Timestamp Microservice Endpoint
app.get("/api/:date?", function (req, res) {
  let dateInput = req.params.date;
  let date;

  // If no date parameter is provided, use current date
  if (!dateInput) {
    date = new Date();
  } else {

    if (!isNaN(dateInput)) {
      date = new Date(parseInt(dateInput));
    } else {
      date = new Date(dateInput);
    }
  }

  // Check if the date is valid
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }


  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// start server
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port http://localhost:' + listener.address().port);
});
