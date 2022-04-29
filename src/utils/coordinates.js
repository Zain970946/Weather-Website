const request = require("request")

const getCordinates = (address, callback) => {

    const geoURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiemFpbm11Z2hhbDEyMyIsImEiOiJjbDJhcnhnd3AwMGN3M2NtdnB3MTRvdXo2In0.LBJlMyR1XX07ae1WjpoAIQ&limit=1`


    request({ url: geoURL, json: true }, (error, { body } = {}) => {
        if (error) {
            console.log("*************************** unable **************************** ")
                // Calling a callback function
            callback("Unable to connect to location services", undefined)
        } else if (body.features.length == 0) {

            // Calling a call back function
            callback("unable to find location.Try another search", undefined)
        } else {

            // Calling a callback function
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = getCordinates