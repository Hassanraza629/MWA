const jwt = require('jsonwebtoken');


function generateToken(username) {
    return jwt.sign({
        data: { username }
    }, process.env.HASH_KEY, { expiresIn: '24h' });

}

function validateToken(token) {
    try {
        let data = jwt.verify(token, process.env.HASH_KEY);
        return data.data.username;
    } catch (err) {
        return false;
    }
}

function protected(req, resp, next) {
    let username = validateToken(req.cookies['app-auth'])

    if (!username) {
        next("validation error");
        return resp.status(401).end();
    }
    req.username = username;
    next()
}



module.exports = { generateToken, protected }