const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function (req,res) {
  res.sendFile(__dirname +"/index.html");

  // res.send("server is up and running");
})

app.post("/",function (req,res) {
  const query = req.body.cityName;
  const apiKEY = "e3007d76a78694f896339a341026a8e9";
  const unit = "metric";
  const URL = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&APPID=" + apiKEY +"&units=" +unit;

  https.get(URL,function (response) {
    console.log(response.statusCode);

    response.on("data",function(data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDesvription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageUrl = "http://openweatherapp.org/img/wn" +  icon +"@2x.png"
      console.log(weatherDesvription);
      res.write("<h1>temp in jaipur is </h1>"+ temp)
      res.write("<h1>tujse naaraj nhi jandagi </h1>")
      res.write("<img src=" + imageUrl +">");
      res.send()
    })
  })

})










app.listen(3000,function () {
  console.log("server is running on port 3000")
})
