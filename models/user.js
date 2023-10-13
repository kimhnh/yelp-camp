const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);

// const CampgroundSchema = new Schema({
//     title: String,
//     image: String,
//     price: Number,
//     description: String,
//     location: String,
//     reviews: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: 'Review',
//       },
//     ],
//   });
