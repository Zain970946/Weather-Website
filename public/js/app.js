// const Url = "http://puzzle.mead.io/puzzle";

// fetch(Url).then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// Using fetch api to get data from our weather api

// const address = "pakistan"
// let apiUrl = `http://localhost:3000/weather?address=${address}`;

// fetch(apiUrl).then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log("Temperature : ", data.temperature)
//             console.log("Location : ", data.location)
//         }
//     })
// })

const form = document.querySelector("form")

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const search = document.querySelector("input")
    const location = search.value


    const P2 = document.getElementById("p2")
    P2.innerText = "Loading ... "

    let apiUrl = `http://localhost:3000/weather?address=${location}`;
    fetch(apiUrl).then((response) => {
        response.json().then((data) => {
            if (data.error) {

                const P2 = document.getElementById("p2")
                P2.innerText = data.error
                P2.style.color = "red";
                P2.style.fontSize = "18px";

            } else {
                let Result = `It is ${data.Description}.It is currently ${data.temperature} degree out there .There is ${data.Preciptiation} percent chance of rain.`

                const P2 = document.getElementById("p2")
                P2.innerText = Result
            }
        })
    })
})
console.log("Fetching data")
console.log("Asynchorous fetching")