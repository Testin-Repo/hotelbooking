const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/verifyToken")
const { authenticate, deleteUser, getProfile, resetPassword, editProfile } = require("../controllers/userController");
const { myprofile, } = require("../controllers/userController");
const { mylogin } = require("../SendGrid-email-utility/loginLinks");



router.post("/login", authenticate );


router.put("/addProfile", verifyToken, myprofile);


router.patch("/editProfile", verifyToken, editProfile);


router.get("/userProfile/:id", verifyToken, getProfile);


router.delete("/deleteAccount/:id/:password", verifyToken, deleteUser );


router.post("/resetPassword/:email", resetPassword);


router.post("/loginlink/:email", verifyToken, mylogin);


module.exports = router;