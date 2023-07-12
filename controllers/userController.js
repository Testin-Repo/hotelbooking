const bcrypt = require("bcrypt");
const User = require("../models/User");
const Joi = require('@hapi/joi');
const jwt = require("jsonwebtoken");
const { registerSchema, loginSchema } = require('../middlewares/userValidation');
const { generateRandomPassword } = require("../SendGrid-email-utility/passwordReset");
const { sendPasswordResetEmail } = require('../SendGrid-email-utility/passwordReset');
const { assignToken } = require("../utils/assignToken");
const multer = require('multer');
const path = require('path');
require("dotenv").config;



exports.authenticate = async (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {

    if (user) {
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(400).json("Incorrect password, please try again");
        }

        const token = assignToken({ id: user._id });

        res.status(200).json({ user, token });
      });
    } else {

      bcrypt.genSalt(12, (err, salt) =>
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;

          const newUser = new User({
            email,
            password: hash
          });

          newUser.save();

          const token = assignToken({ id: newUser._id });

          res.status(200).send({ newUser, token });
        })
      );
    }
  });
};



exports.deleteUser =  async (req, res) => {

  const { id, password } = req.params;

  User.findOne({_id:id}).then( (user)=> {

    try {
      
      bcrypt.compare(password, user.password).then((isMatch) => {
        
        if (!isMatch) 
        {
        return res.status(400).json("Incorrect password please try again");
        } else {
          User.findByIdAndDelete({_id:id}).then ( () => { 
                     res.status(200).json("User deleted")
        })
        }
    });

    } catch (error) {
      res.status(500).json("Server error")
    }

  })
}


exports.getProfile = async (req, res) => {
  try {
    const userProfile = await User.findById({ _id: req.params.id });

  if (!userProfile) {
    return res.status(404).json({ message: "User profile not found" });
  }

  // const avatarPath = userProfile.avatar ? userProfile.avatar.replace(/\\/g, "/") : null;

  res.status(200).json(userProfile);
  } catch (error) {

    res.status(500).json({ error: 'An error occurred' });
  }
};


exports.resetPassword = async (req, res) => {

  const email = req.params.email;
  const newPassword = generateRandomPassword();

  try {

    await sendPasswordResetEmail(email, newPassword);

    res.json({ message: 'Password reset email sent successfully' });
  } catch (error) {

    console.error('Error sending password reset email:', error);
    res.status(500).json({ error: 'Failed to send password reset email' });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profile/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileName = req.body._id + ext;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, JPG, and PNG file formats are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

exports.myprofile = async (req, res) => {
  upload.single("avatar")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);

    } else if (err) {
      return res.status(500).json(err);
    }
        
    const { _id, displayName, dob, location, title, firstName, lastName, 
      mobilePhone, gender, address, city, country, postCode
    } = req.body;
  
    const avatar = req.file ? req.file.path : undefined;
  
    User.findOneAndUpdate({_id}, {
      displayName, dob, location, title, firstName, lastName, 
      avatar, mobilePhone, gender, address, city, country, postCode
    }, { new: true })
    
      .then((updatedUser) => {
        res.status(201).json({ user: updatedUser });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  });
};


exports.editProfile = async (req, res) => {
  upload.single("avatar")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    const { _id } = req.body;

    const updatedFields = {...req.body};

    if (req.file) {
      updatedFields.avatar = req.file.path;
    }

    User.findOneAndUpdate({ _id }, { $set: updatedFields }, { new: true })
      .then((updatedUser) => {
        res.status(200).json({ user: updatedUser });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  });
};
