const mongoose = require("mongoose");


const availabilitySchema = new mongoose.Schema({

    room: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'Room' 
    },
    checkin: { 
        type: Date, 
        required: true 
    },
    checkout: { 
        type: Date, 
        required: true 
    },
    availabilityStatus: {
        type: String,
        enum: ['available', 'booked', 'unavailable'],
        default: 'available',
    },
});


const Available = mongoose.model("Available", availabilitySchema);

module.exports = Available;  