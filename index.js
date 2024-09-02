const express = require("express");
const app = express()

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

const PORT = process.env.PORT || 6060
app.listen(PORT, () => {
    console.log(`[^] Server started on ${PORT}`)
})