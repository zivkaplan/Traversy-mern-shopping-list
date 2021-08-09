const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';

// @route POST api/users
// @desc register new user
// @access Public
router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //basic validation
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ message: 'Please fill all required fileds' });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = { name, email };

        // create salt & hash password
        async function hashPassword(password) {
            const hashedPassword = await new Promise((resolve, reject) => {
                bcrypt.genSalt(12, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                        if (err) reject(err);
                        resolve(hash);
                    });
                });
            });
            return hashedPassword;
        }

        newUser.password = await hashPassword(password);

        const savedUser = new User({ ...newUser });
        await savedUser.save();

        // JWT
        jwt.sign(
            { id: savedUser._id },
            jwtSecret,
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {
                        id: savedUser._id,
                        name: savedUser.name,
                        email: savedUser.email,
                    },
                });
            }
        );
    } catch (e) {
        res.send(e.message);
    }
});

// // @route POST api/users
// // @desc create an item
// // @access Public
// router.post('/', async (req, res) => {
//     const newItem = new Item({ name: req.body.name });
//     await newItem.save();
//     res.send(newItem);
// });

// // @route DELETE api/items
// // @desc delete an item
// // @access Public
// router.delete('/:id', async (req, res) => {
//     try {
//         const item = await Item.findById(req.params.id);
//         await item.remove();
//         res.json({ success: true });
//     } catch (e) {
//         res.status(404).json({ success: false });
//     }
// });

module.exports = router;
