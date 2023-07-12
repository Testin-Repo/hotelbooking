const mongoose = require("mongoose");


const HotelSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
  health: {
    type: String,
    required: true
  },
  policies: {
    type: String,
    required: true
  },
  facilities: {
    type: [String],
    required: true
  },
  info: {
    type: String,
    required: true
  },
  rooms: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Room',
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
    populate: true
  }],
  ratings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rating'
  }],
  averageRating: {
    type: Number,
    default: 0
  }
  
});


const Hotel = mongoose.model("Hotel", HotelSchema);

module.exports = Hotel;
