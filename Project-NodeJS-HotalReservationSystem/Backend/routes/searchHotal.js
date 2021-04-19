// dep . sections
const express = require('express')
const hotel = require('../db/hotelSchema')
// initialization section
const router = express.Router()
// Configuration Section

//routes section
router.get('/search', async (req, res) => {
    
    let { name, fromDate, ToDate } = req.query;
    
    

    var Projection = { 'name': 1, 'rooms': 1 ,'image':1,'rating':1,'contact':1,'address':1,'email':1};
     let query = {
        $text: { $search: name },
        'rooms': {
            $elemMatch: {
                "reservations.fromDate": { $not: { $gt: new Date(fromDate), $lt: new Date(ToDate) } },
                "reservations.ToDate":{ $not: { $gt: new Date(fromDate), $lt: new Date(ToDate) } }
                        }
                }
    }
    if (name == "") {
        query = {
            'rooms': {
                $elemMatch: {
                    "reservations.fromDate": { $not: { $gt: new Date(fromDate), $lt: new Date(ToDate) } },
                    "reservations.ToDate": { $not: { $gt: new Date(fromDate), $lt: new Date(ToDate) } }
                }
            }
        }
    }
    let hotelsName = await hotel.find(query).select(Projection)
    
    res.json(hotelsName);

})




module.exports = router;

