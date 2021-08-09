const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';
const auth = require('../../middleware/auth');

// @route GET api/auth/user
// @desc get user data
// @access Private
router.get('/user', auth, async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
});

// @route POST api/auth
// @desc auth user
// @access Public
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        //basic validation
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: 'Please fill all required fileds' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exists' });
        }

        // Load hash from your password DB.
        bcrypt.compare(password, user.password, function (err, match) {
            if (err) throw err;
            if (!match) {
                return res.status(400).json({ message: 'Invalid password' });
            }
            jwt.sign(
                { id: user._id },
                jwtSecret,
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                        },
                    });
                }
            );
        });

        // JWT
    } catch (e) {
        res.send(e.message);
    }
});

module.exports = router;
