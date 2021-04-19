require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
var cookieParser = require('cookie-parser')
const loginRoutes = require('./routes/login')


const hotelRoutes = require('./routes/hotel')
const { protected } = require('./middleware/authenticator')

const searchHotalRoutes = require('./routes/searchHotal')
const profileRoutes = require('./routes/profile')
const app = express()

mongoose.connect(process.env.DB_ATLAS, { useNewUrlParser: true, useUnifiedTopology: true })
const baseUrl = "/api"



app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(baseUrl, loginRoutes)
app.use(baseUrl, searchHotalRoutes)
app.use(baseUrl, hotelRoutes)
app.use(baseUrl, protected, profileRoutes)


app.use((err, req, resp, next) => {
    console.log("--error--", err)
})

app.listen(3000, () => console.log('listening on port 3000'))