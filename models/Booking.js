const mongoose = require("mongoose");


const BookingSchema = new mongoose.Schema({
 
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  checkInDate: {
    type: Date,
    required: true
  },
  checkOutDate: {
    type: Date,
    required: true
  },
  bookingNumber: {
    type: String,
  },
  pinCode: {
    type: String,
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  contactNo: {
    type: String,
    required: true
  },
  purpose: {
    type: Boolean,
    default: true
  },
  totalPrice: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Past', 'Cancelled'],
    default: 'Active',
  },
  
});


const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
