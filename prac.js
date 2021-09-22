const express = require("express")
const https = require("https")
const { Http2ServerRequest } = require("http2")

const app = express()



app.get("/", function(req, res) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Ghana&appid=34399e599e2348bb24c0ea33670c0242&units=metric"

    https.get(url, function(response) {
        response.on("data", function(data) {
            const weatherData = JSON.parse(data)
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const iconImageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            const temperature = weatherData.main.temp
            const location = weatherData.name

            console.log(weatherDescription);
            console.log(temperature);
            console.log(location);
            console.log(icon);

            res.send(`  The temperature in <h2> ${location} </h2> is <h2> ${temperature} Degree Celcius </h2> and it is <h2> ${weatherDescription} </h2> and the icon is ${"<img src=" + iconImageUrl + ">"}`)

        })
    })
})

const PORT = 3000 | process.env.PORT
app.listen(PORT, function(req, res) {
    console.log(`Server Started on port ${PORT}`);
})