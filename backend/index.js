// app.js
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.get('/', (req, res) => {
    res.json({success: true, message: 'welcome to the api'})
})
app.listen(3000, () => {console.log('API Running on http://localhost:3000')})