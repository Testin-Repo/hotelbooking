const Hotel = require("../models/Hotel");
const Room = require("../models/Room");


exports.search = async (req, res) => {
  try {
    const { checkin, checkout, location, facilities, minRating, minPrice, maxPrice, personCount } = req.query;

    if (!checkin || !checkout || !location || !personCount) {
      return res.status(400).json({ message: "Please provide check-in date, check-out date, personCount and location" });
    }

    const hotelFilters = {
      address: location,
    };

    if (facilities) {
      hotelFilters.facilities = { $in: facilities.split(",") };
    }
    if (minRating) {
      hotelFilters.averageRating = { $gte: Number(minRating) };
    }

    const hotels = await Hotel.find(hotelFilters);

    for (let i in hotels) {
      const roomFilters = {
        hotel: hotels[i]._id,
        price: { $gte: Number(minPrice) || 0, $lte: Number(maxPrice) || Infinity },
        capacity: { $gte: Number(personCount) || 1 },
        bookedDates: {
          $not: {
            $elemMatch: {
              $or: [
                { checkin: { $lt: new Date(checkout) }, checkout: { $gt: new Date(checkin) } },
                { checkin: { $gte: new Date(checkin), $lt: new Date(checkout) } },
                { checkout: { $gt: new Date(checkin), $lte: new Date(checkout) } },
              ],
            },
          },
        },
      };

      const availableRooms = await Room.find(roomFilters);
      hotels[i].rooms = availableRooms;
    }

    return res.status(200).json({ hotels: hotels });
  } catch (error) {
    console.error("Error fetching available rooms:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};