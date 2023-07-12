const express = require("express");
const router = express.Router();



const { getrooms } = require("../controllers/roomController");


router.get("/hotels/:hotelId/rooms", getrooms );


module.exports = router;