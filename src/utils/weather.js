const request = require("request")

const getWeather = (latitude, longitude, callback) => {

    const weatherstackURL = `http://api.weatherstack.com/current?access_key=a774d21d4e4e0f4190d2d33e500f22cb&query=${latitude},${longitude}`;
    console.log(weatherstackURL)


    request({ url: weatherstackURL, json: true }, (error, { body }) => {

        if (error) {
            callback("Unable to connect to weather services", undefined)
        } else if (body.error) {
            callback("Unable to find direction", undefined)
        } else {

            callback(undefined, {
                Temperature: body.current.temperature,
                Feels_like: body.current.feelslike,
                Region: body.location.region,
                Preciptiation: body.current.precip,
                Description: body.current.weather_descriptions[0]
            })
        }

    })
}

module.exports = getWeather