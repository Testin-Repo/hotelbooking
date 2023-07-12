// const mongoose = require('mongoose');
// const Sequence = require('mongoose-sequence')(mongoose);

// const amenitySchema = new mongoose.Schema({
//   index: { type: Number, unique: true },
//   name: {
//     type: String,
//     required: true
//   }
// });

// amenitySchema.plugin(Sequence, {  
//   inc_field: 'index',
//   startAt: 1  
// });

// const Amenity = mongoose.model('Amenity', amenitySchema);

// module.exports = Amenity;


const mongoose = require('mongoose');

const amenitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});


const Amenity = mongoose.model('Amenity', amenitySchema);

module.exports = Amenity;
