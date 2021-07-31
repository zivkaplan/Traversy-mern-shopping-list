const express = require('express');

const router = express.Router();
const Item = require('../../models/Item');

// @route GET api/items
// @desc get all items
// @access Public
router.get('/', async (req, res) => {
    const items = await Item.find().sort({ date: -1 });
    res.json(items);
});

// @route POST api/items
// @desc create an item
// @access Public
router.post('/', async (req, res) => {
    console.log(req.body);
    const newItem = new Item({ name: req.body.name });
    await newItem.save();
    res.send(newItem);
});

// @route DELETE api/items
// @desc delete an item
// @access Public
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        await item.remove();
        res.json({ success: true });
    } catch (e) {
        res.status(404).json({ success: false });
    }
});

module.exports = router;
