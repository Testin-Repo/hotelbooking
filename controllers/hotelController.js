const Hotel = require("../models/Hotel");
const Review = require("../models/Reviews");
const Rating = require("../models/Ratings");


exports.allhotels = async (req, res) => {
  try {
    const hotels = await Hotel.find()
        .populate('rooms reviews ratings');

    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};


exports.gethotel = async (req, res) => {

    const {hotelId} = req.params;

    try {
  
      const hotel = await Hotel.find({
         _id: hotelId
      })
  
      res.status(200).json(hotel);

    } catch (error) {

      res.status(500).json({ error: 'An error occurred' });
    }
  };


exports.addReview = async (req, res) => {
  try {
    const { rating, comment, userId, hotelId } = req.body;

    const newRating = new Rating({
      rating: rating,
      user: userId,
      hotel: hotelId
    });

    const newReview = new Review({
      comment: comment,
      user: userId
    });

    const savedRating = await newRating.save();
    const savedReview = await newReview.save();

    const hotel = await Hotel.findById(hotelId);
    hotel.ratings.push(savedRating._id);
    hotel.reviews.push(savedReview._id);

    const ratings = await Rating.find({ hotel: hotelId });
    const averageRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;

    hotel.averageRating = averageRating;
    await hotel.save();

    res.json({ rating: savedRating, review: savedReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};


