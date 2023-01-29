const express = require('express');
const client = require('twilio')(accountSid, authToken)
const app = express()
const port = 3001

app.get('/', (req, res) => {
        res.send();
})

app.listen(port, () => {
        console.log("Example")
})