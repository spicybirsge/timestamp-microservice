const express = require("express");
const app = express()
const cors = require("cors")
app.use(cors())

app.get("/", async(req, res) => {

    res.send(`<h1>Timestamp microservice</h1>Example usage:<br><a href='/api/2015-12-25' target="_blank">/api/2015-12-25</a>
        
        <br><a href='/api/1451001600000' target='_blank'>/api/1451001600000</a>`)
})

app.get('/api', async(req, res) => {
    const unix = Date.now()
    let utc = new Date().toUTCString()
    return res.status(200).json({unix, utc})
})

app.get("/api/:date", async (req, res) => {
    const date = req.params.date;
   

    let handledDate = new Date(date)

    let unix = handledDate.getTime()
    let utc = handledDate.toUTCString()

    if (!isNaN(unix)) {
        return res.status(200).json({ unix: unix, utc: utc })
    }


    if (isNaN(date)) {
        return res.status(400).json({ error: "Invalid Date" })
    }

    let unixToUTC = new Date(date*1).toUTCString()
    return res.status(200).json({"unix": date*1, utc: unixToUTC})


})

app.all("*", async(req, res) => {
    res.sendStatus(404)
})

const PORT = process.env.PORT || 6060
app.listen(PORT, () => {
    console.log(`[^] Server started on ${PORT}`)
})