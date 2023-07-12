const express = require("express");
const router = express.Router();


const verifyToken = require("../middlewares/verifyToken")
const { addBooking, getBooking, userBookings, cancelBooking } = require("../controllers/bookingController");


router.post("/bookings/create", verifyToken, addBooking );


router.get("/bookings/:bookingNumber/details", verifyToken, getBooking );


router.get("/bookings/:userId/mybookings", verifyToken, userBookings );


router.post("/bookings/:bookingId/cancel", verifyToken, cancelBooking );



module.exports = router;