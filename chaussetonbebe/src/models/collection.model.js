const itemModule = require("./item.model");

const mongoose = require('mongoose');

const CollectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  items: [itemModule.schema]
}, { collection: 'collection', versionKey: false });

const Collection = mongoose.model('collection', CollectionSchema);
module.exports = Collection;
