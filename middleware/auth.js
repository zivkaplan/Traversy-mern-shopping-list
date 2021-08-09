const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';

module.exports = auth = (req, res, next) => {
    const token = req.header('x-auth-token');

    //check for token
    if (!token) {
        return res.status(401).json({ message: 'Authorization denied' });
    }
    try {
        //verify token
        const decodedToken = jwt.verify(token, jwtSecret);
        //add user from token's payload
        req.user = decodedToken;
        next();
    } catch (e) {
        res.status(400).json({ message: 'Token is not valid' });
    }
};
