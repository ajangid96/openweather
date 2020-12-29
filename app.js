const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const ejs = require("ejs");



const app = express();

app.use(express.static("public"));


app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}))

app.get("/", function(req, res){
  res.render("index");
});


// app.get("/", function(req, res) {
//     res.sendFile(__dirname + "/index.html")

   
// })


app.post("/", function(req,res){
    
    const appid = "729742bf9ead60af8c665015d96561ea"
    const city = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+appid;
    https.get(url, function(response){
    console.log(response.statusCode);


    response.on("data", function(data){
        

    const weatherdata = JSON.parse(data);

    const temprature = weatherdata.main.temp;

    res.render("Weather", {weather: temprature, city: city});
        

    // res.send("<h1>The temperature is"+temp+"degree Celcius")

    })
})



})





app.listen(3000,function() {
    console.log("Server Started");
})