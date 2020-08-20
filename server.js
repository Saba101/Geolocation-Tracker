var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

var express = require("express");
const bodyParser = require('body-parser');
var app = express();
var port = 3000;

app.use(express.json());
app.listen(port, () => {
    console.log("Server listening on port " + port);
});
app.use(express.static('public'));  //runs index.html

//read to console whatever is recieved..
app.post('/track', (req, res) => {
    console.log("request from client received..")
    console.log(req.body);
    res.json({
        status: "success",
        latitude: req.body.lat,
        longitude: req.body.long
    })
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = req.body;
        dbo.collection("customers").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("Data Saved Successfully!");
          db.close();
        });
      });
    res.end();
});


//Now storing data to database


