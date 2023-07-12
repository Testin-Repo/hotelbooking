const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const Hotel = require('../models/Hotel');
const Amenity = require('../models/Amenity');

router.post("/hotels", async (req, res) => {
  try {
    const hotelData = req.body;
    const hotel = await Hotel.create(hotelData);
    res.status(201).json(hotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add hotel" });
  }
});

router.post("/hotels/:hotelId/rooms", async (req, res) => {
  try {
    const { hotelId } = req.params;
    const roomData = req.body;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    const room = await Room.create(roomData);
    hotel.rooms.push(room._id);
    await hotel.save();
    res.status(201).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add room" });
  }
});


router.post('/amenities', async (req, res) => {
    try {
      const amenities = req.body.map(amenity => ({
        name: amenity.name  
      }));
      
      for (let amenity of amenities) {
        const newAmenity = new Amenity(amenity);  
        await newAmenity.save();
      }
      
      res.send('Amenities saved');  
    } catch (error) {
      res.status(500).send(error);  
    }
  })
  

module.exports = router;