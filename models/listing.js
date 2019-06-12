mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    type: String,
    price: Number,
    fee: Number,
    active: Boolean,
    address: {
        street: String,
        zipcode: String,
        city: String,
        kommun: String,
        geo: {
            lat: {
                type: Number,
            },
            lng: {
                type: Number,
            }
        }
    }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;