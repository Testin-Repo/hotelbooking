const mongoose = require("mongoose");


const roomSchema = new mongoose.Schema({

    hotel: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'Hotel' 
    },
    name: { 
        type: String, 
        required: true 
    },
    capacity: { 
        type: String, 
        required: true 
    },
    price: { 
        type: String, 
        required: true 
    },
    meals: { 
        type: String, 
        required: true 
    },
    size: { 
        type: String, 
        required: true 
    },
    description: {
        type: String,
        required: true 
    },
    bedType: {
        type: String, 
        required: true 
    },
    bookedDates: [
        {
            checkin: {
                type: Date,
                required: true
            },
            checkout: {
                type: Date,
                required: true
            }
        }
    ],

    amenities: [{ type: String, 
    }],

});


const Room = mongoose.model("Room", roomSchema);

module.exports = Room;  