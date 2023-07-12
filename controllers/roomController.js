const Room = require("../models/Room");


exports.getrooms = async (req, res) => {

    const {hotelId} = req.params;

    try {
      
      const rooms = await  Room.find({hotel:hotelId})
      .populate('amenities')
  
      res.status(200).json(rooms);

    } catch (error) {

      res.status(500).json({ error: 'An error occurred' });
    }
  };