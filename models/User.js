const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,  
  },
  avatar: {
    type: String
  },
  displayName: {
    type: String
  },
  dob: {
    type: String
  },
  location: {
    type: String
  },
  title: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  mobilePhone: {
    type: String
  },
  gender: {
    type: String
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  country: {
    type: String
  },
  postCode: {
    type: String
  },
  smokingPreffered: {
    type: String,
  },
  businessTraveller: {
    type: String
  },
  emailConfirmed: {
    type: String
  }
  
});


const User = mongoose.model("User", UserSchema);

module.exports = User;
