const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");

});
app.post("/", function(req, res){
  var query = req.body.cityname;
  const appid = "ad54a9ad8d07bc99a027f96287f7102f";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + unit;
  https.get(url, function(response){

      console.log(response.statusCode);
      response.on("data", function(data){
        const weatherUpdate = JSON.parse(data);
        const temp = weatherUpdate.main.temp;
        const description = weatherUpdate.weather[0].description;
        const icon = weatherUpdate.weather[0].icon;
        const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        console.log(temp, description, icon);
      res.write("<p>The wheather is curently " + description + "<p>");
        res.write("<h1> The temprature in " + query + " is " + temp + " degree celcius. </h1>");
        res.write("<img src =" + imageurl + ">");
       res.send();
      })
    })
console.log(query);
});











app.listen(3000, function(){
  console.log("server running on port 3000");
})
