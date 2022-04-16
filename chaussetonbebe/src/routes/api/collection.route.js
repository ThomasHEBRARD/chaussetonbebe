const express = require("express");
const router = express.Router();

const Collection = require("../../models/collection.model");


router.get('/collection', (req, res) => {
  Collection.find()
    .then(collections => {
      res.setHeader('Content-Type', 'application/json');
      res.json(collections);
    })
    .catch(error => {
      res.status(404).json({ success: "Collection not found!" })
    })
})

router.get('./collection/:collectionId')


module.exports = router;