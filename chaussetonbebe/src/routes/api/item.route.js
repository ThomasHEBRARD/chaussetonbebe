const express = require("express");
const router = express.Router();

const itemModule = require("../../models/item.model");


router.get('/all', (req, res) => {
    itemModule.model.find()
        .then(items => {
            res.setHeader('Content-Type', 'application/json');
            res.json(items);
        })
        .catch(error => {
            res.status(404).json({ success: "Collection not found!" })
        })
})


router.get('/:itemId', function (req, res) {
    itemModule.model.findOne({ _id: req.params.itemId })
        .then(items => {
            res.setHeader('Content-Type', 'application/json');
            res.json(items);
        })
        .catch(error => {
            res.status(404).json({ success: "Collection not found!" })
        })
});


module.exports = router;
