const mongoose = require('mongoose')

const hotelSchema = new mongoose.Schema({
    name: String,
    image: String,
    rating: Number,
    address: String,
    contact: String,
    email : String,
    rooms: [
        {
            number: Number, status: Number, available: Boolean, image: String,
            reservations: [{
                id: Number,
                fromDate: Date,
                toDate: Date,
                User: { username: String, Name: String }
            }]
        }]
})


module.exports = mongoose.model('Hotel', hotelSchema)