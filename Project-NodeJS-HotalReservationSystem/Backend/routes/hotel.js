const express = require('express')
const Hotel = require('../db/hotelSchema');
const { protected } = require('../middleware/authenticator');
const router = require('./login');
const mongoose = require('mongoose');

router.get('/hotel', async (req, res) => {
    let { name, fromDate, ToDate } = req.query;

    let hotel = await Hotel.findOne({
        'name': name,
        'rooms': {
            $elemMatch: {
                "reservations.fromDate": { $not: { $gt: new Date(fromDate), $lt: new Date(ToDate) } },
                "reservations.ToDate": { $not: { $gt: new Date(fromDate), $lt: new Date(ToDate) } }
            }
        }
    });
    
    if (!hotel) return res.json({ success: 0, error: 400 })
    else res.json({ success: 1, hotel })
})

router.delete('/reservation/:reservation_id', protected, async (req, res) => {
    await Hotel.updateMany(
        {
        },
        {
            $pull: {
                "rooms.$[].reservations": {
                    _id: mongoose.Types.ObjectId(req.params.reservation_id)
                }
            }
        }
    )
    res.json({ success: 1 })
})

router.post('/hotel/:name/:room', protected, async (req, res) => {
    await Hotel.updateOne(
        {
            name: req.params.name,
            rooms: {
                $elemMatch: {
                    number: parseInt(req.params.room)
                }
            }
        },
        {
            $addToSet: {
                "rooms.$.reservations": req.body
            }
        }
    )
    res.json({ success: 1 })
})



module.exports = router
