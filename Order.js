const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    items: [
        {
            name: String,
            price: Number,
            quantity: Number
        }
    ],
    totalAmount: { type: Number, required: true},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Order', OrderSchema);