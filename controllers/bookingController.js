const Booking = require('../models/Booking');
const Room = require('../models/Room');
const availability = require('../models/Availability');
const {generateBookingNumber} = require('../utils/generateBookingNumber');
const {sendBookingConfirmationEmail} = require('../SendGrid-email-utility/bookingConfirmation');
const {sendBookingCancellationEmail} = require('../SendGrid-email-utility/bookingCancellation');


function generatePIN() {
  const pin = Math.floor(1000 + Math.random() * 9000);
  return pin.toString();
}

exports.addBooking = async (req, res) => {

  try {
    const { userId, hotelId, roomId, checkInDate, checkOutDate, email, 
            firstName, lastName, country, contactNo, purpose, totalPrice 
          } = req.body;

    const bookingNumber = generateBookingNumber();

    const pinCode = generatePIN();

    const booking = new Booking({
      userId, hotelId, roomId, checkInDate, checkOutDate, email,
      firstName, lastName, country, contactNo, purpose, totalPrice,
      bookingNumber, pinCode, status: 'Active'
    });

    await booking.save();

    const room = await Room.findById(roomId);
    if (room) {
      const availabe = new availability({
        room: roomId,
        checkin: checkInDate,
        checkout: checkOutDate,
        availabilityStatus: 'booked',
      });
      await availabe.save();
      room.bookedDates.push({
        checkin: checkInDate,
        checkout: checkOutDate,
      });
      await room.save();
    }

    await sendBookingConfirmationEmail(email, bookingNumber, pinCode)

    res.status(201).json({ booking });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


exports.getBooking = async (req, res) => {
  const bookingNumber = req.params.bookingNumber;

  try {
    const booking = await Booking.findOne({ bookingNumber: bookingNumber });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json(error);
  }
};




exports.userBookings =  async (req, res) => {
    const { userId } = req.params;
  
    try {
      const bookings = await Booking.find({ userId });
  
      res.json(bookings);
      
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving booking details' });
    }
};


  exports.cancelBooking =  async (req, res) => {
    const { bookingId } = req.params;
    const { bookingNumber, pinCode } = req.body;
  
    try {
      const booking = await Booking.findOne({ _id: bookingId, bookingNumber, pinCode });
  
      if (!booking) {
        return res.status(401).json({ error: 'Invalid booking number or PIN code' });
      }

      const { email } = booking;
  
      booking.status = 'Cancelled';
      await booking.save();

      sendBookingCancellationEmail(email, bookingNumber);
  
      res.json({ message: 'Booking cancelled successfully' });
    } catch (error) {
      res.status(500).json(error);
  }
  
};