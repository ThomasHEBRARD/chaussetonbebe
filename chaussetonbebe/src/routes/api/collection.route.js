const express = require("express");
const router = express.Router();

const collectionModule = require("../../models/collection.model");


router.get('/all', (req, res) => {
  collectionModule.model.find()
    .then(collections => {
      res.setHeader('Content-Type', 'application/json');
      res.json(collections);
    })
    .catch(error => {
      res.status(404).json({ success: "Collection not found!" })
    })
})

router.get('/:collectionId', function (req, res) {
  collectionModule.model.findOne({ _id: req.params.collectionId })
    .then(items => {
      res.setHeader('Content-Type', 'application/json');
      res.json(items);
    })
    .catch(error => {
      res.status(404).json({ success: "Collection not found!" })
    })
});


module.exports = router;