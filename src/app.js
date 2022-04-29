const express = require("express");
const path = require("path");
const hbs = require("hbs");
const coordinates = require("./utils/coordinates")
const forecast = require("./utils/weather")


// Making express app 
const app = express();
const port = process.env.PORT || 3000;


// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views")
const partailsPath = path.join(__dirname, "../templates/partials")


// Register partials
hbs.registerPartials(partailsPath);

// Setup handlebars engine and views location
app.set("views", viewsPath);
app.set("view engine", "hbs");


// Serving up the static directory 
app.use(express.static(publicDirectoryPath))

app.get("/", (request, response) => {
    response.render("index", {
        title: "Use this site to get your weather!",
        name: "Zain Ul Abidin"
    })
});

app.get("/home", (request, response) => {
    response.render("home", {
        title: "Home Page",
        name: "Zain Ul Abidin"
    })
});

app.get("/about", (request, response) => {
    response.render("about", {
        title: "About Page ",
        name: "Zain Ul Abidin"
    })
});

app.get("/help", (request, response) => {
    response.render("help", {
        title: "Help Page ",
        helpText: "This is some helpful text.",
        name: "Zain Ul Abidin"
    })
});

// Rest api using weather stack and geo coordinates api
app.get("/weather", (request, response) => {
    if (!request.query.address) {
        response.send({ error: "You must provide an address" })
    } else {
        const address = request.query.address

        console.log("Yes it is checked")

        coordinates(address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                console.log("----------------------------------------")
                response.send({ error })
            } else {
                console.log("Latitude : ", latitude)
                console.log("Longitude : ", longitude)

                forecast(latitude, longitude, (error, { Temperature, Feels_like, Region, Description, Preciptiation }) => {
                    if (error) {
                        response.send({ error })
                    } else {
                        response.send({
                            location,
                            Feels_like,
                            temperature: Temperature,
                            region: Region,
                            creator: "Zain ul abidin",
                            Apis_Used: ["Weather stack", "Geo Cordinates"],
                            Description,
                            Preciptiation
                        })
                    }
                })
            }
        })
    }

})

app.get("/products", (request, response) => {
    if (!request.query.search) {
        response.send({
            Error: "You must provide a search term"
        })
    } else {

        response.send({
            products: []
        })
    }
})

app.get("/help/*", (request, response) => {
    response.render("404", {
        errorMessage: "Help article not found",
        name: "Zain Ul Abidin",
        title: "404"
    })
})

app.get("*", (request, response) => {
    response.render("404", {
        errorMessage: "Page not found",
        name: "Zain Ul Abidin",
        title: "404"
    })
})


app.listen(port, () => {
    console.log("Listening at port ", port)
});