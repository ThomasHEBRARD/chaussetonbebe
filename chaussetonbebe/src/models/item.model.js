const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
}, { collection: 'item', versionKey: false });


const Item = mongoose.model('item', ItemSchema);
module.exports = { model: Item, schema: ItemSchema };
