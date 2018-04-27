const express = require('express')

const app = express()

app.use('/', (req, res) => {
	res.send("Hello World v3")
})

app.listen(process.env.PORT || 3000, () => {
	console.log("SERVER STARTED http://localhost:3000")
})