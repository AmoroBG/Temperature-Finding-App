const express = require("express")
const https = require("https")
const path = require("path")

const app = express()

// body-parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.post("/", function(req, res) {
    const locationName = req.body.locationName
    const unit = req.body.unit
    apiKey = "34399e599e2348bb24c0ea33670c0242"


    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + locationName + "&appid=" + apiKey + "&units=" + unit


    https.get(url, function(response) {
            response.on("data", function(data) {
                const weatherData = JSON.parse(data)

                const temperature = weatherData.main.temp
                const location = weatherData.name
                const weatherDescription = weatherData.weather[0].description
                const icon = weatherData.weather[0].icon

                const iconImageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

                console.log(temperature);
                console.log(weatherDescription);
                console.log(icon);
                console.log(location);
                console.log(iconImageUrl);

                // res.write(`The temperature in ${location} is ${temperature} Degree Celcius`)
                // res.write(` and the weather is ${weatherDescription} `)
                // res.write("<img src=" + iconImageUrl + ">")

                // res.send()
                // res.send("<img src=" + iconImageUrl + ">")

                res.send(`  The temperature in <h2> ${location} </h2> is <h2> ${temperature} Degree Celcius </h2> and it is <h2> ${weatherDescription} </h2> and the icon is ${"<img src=" + iconImageUrl + ">"}`)

            })
        })
        // res.send("hello")
})


const PORT = 3000 | process.env.PORT
app.listen(PORT, function() {
    console.log(`Server Started on port ${PORT}`);
})