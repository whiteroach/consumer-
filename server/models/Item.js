const mongoose = require('mongoose');
const schema = mongoose.Schema;

const newItem = new schema({
    item:String,
    priority:Number,
})

const Item = mongoose.model('Item', newItem)

module.exports = Item;