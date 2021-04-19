const express = require('express')
const { promisify } = require('util')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { generateToken } = require('../middleware/authenticator')
const User = require('../db/userSchema')
const EmailSender = require("../util/smtp")

const router = express.Router()
const hashPromise = promisify(bcrypt.hash)

router.post('/login', async (req, resp) => {
    let { username, password } = req.body;
    let user = await User.findOne({ username })
    if (!user) return resp.json({ success: 0, error: 400 })
    let success = false;
    await bcrypt.compare(password, user.password).then((result) => {
        if (!result) {
            if (user.onetimecode && user.onetimecode == password) {
                user.onetimecode = null;
                user.save()

            } else {
                return resp.json({ success: 0, error: 401 })
            }
        }

        let token = generateToken(username)
        resp.cookie('app-auth', token, { maxAge: 9000000, httpOnly: true });
        resp.json({ success: 1, username, firstName: user.firstName })
    });
})



router.post('/signup', async (req, resp) => {
    let { firstName, lastName, username, password } = req.body;
    let newUser;
    let existingUser = await User.findOne({ username })
    if (existingUser)
        return resp.json({ success: 0, error: "duplicated" })

    await hashPromise(password, saltRounds).then((hash) => {
        newUser = new User({ firstName, lastName, username, password: hash })
        newUser.save((err) => {
            if (!err) {
                let token = generateToken(username)
                resp.cookie('app-auth', token, { maxAge: 900000, httpOnly: true });
                return resp.json({ success: 1, username: username })
            }
            else
                return resp.json({ success: 0 })
        })
    });
})

router.post('/logout', async (req, resp) => {
    resp.cookie('app-auth', null, { maxAge: 0, httpOnly: true });
    return resp.json({ success: 1 })
})


router.post('/create-password', async (req, resp) => {
    let { username } = req.body;
    let user = await User.findOne({ username })
    if (!user) return resp.json({ success: 0, error: 400 })
    let code = Math.floor(Math.random() * 99999)
    user.onetimecode = code;
    await user.save();
    await EmailSender(username, code)
    return resp.json({ success: 1 })


})


module.exports = router