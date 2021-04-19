const express = require('express')

const Hotel = require('../db/hotelSchema')

const router = express.Router()


router.post('/profile/reservations', async (req, resp) => {
    let currentUsername = req.username
    console.log(currentUsername)
    return await Hotel.aggregate([
        { $project: { _id: 0, hotel: { name: "$name", image: "$image" }, reservations: "$rooms.reservations", room : "$rooms.number" } },
        { $unwind: { path: "$reservations" } }])
        .unwind("reservations")
        .project({ hotel: "$hotel", reservation: "$reservations", username: "$reservations.User.username", room : "$room" })
        .match({ username: currentUsername })
        .then(data => resp.json(data))

})





module.exports = router