const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/verifyToken")
const { gethotel, allhotels, addReview } = require("../controllers/hotelController");
const { search } = require("../controllers/searhController");


router.get("/hotels", allhotels );


router.get("/hotels/:hotelId", gethotel );


router.post("/hotels/addReview", verifyToken, addReview );


router.get("/hotels/search", verifyToken, search );



module.exports = router;