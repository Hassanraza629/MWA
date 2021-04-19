const express = require('express')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const router = express.Router()


router.post('/protected', (req, resp) => {
    resp.json("OK")
})


module.exports = router