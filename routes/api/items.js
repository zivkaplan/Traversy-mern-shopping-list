const express = require('express');

const router = express.Router();
const Item = require('../../models/Item');
const auth = require('../../middleware/auth');

// @route GET api/items
// @desc get all items
// @access Public
router.get('/', async (req, res) => {
    const items = await Item.find().sort({ date: -1 });
    res.json(items);
});

// @route POST api/items
// @desc create an item
// @access Private
router.post('/', auth, async (req, res) => {
    const newItem = new Item({ name: req.body.name });
    await newItem.save();
    res.send(newItem);
});

// @route DELETE api/items
// @desc delete an item
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        await item.remove();
        res.json({ success: true });
    } catch (e) {
        res.status(404).json({ success: false });
    }
});

module.exports = router;
