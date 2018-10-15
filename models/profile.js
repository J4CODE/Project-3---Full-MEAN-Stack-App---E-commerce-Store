const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;


const profileSchema  = new Schema({
  username: String,
  password: String},
  {timestamps: true}
);

const User = mongoose.model("Profile", userSchema);


module.exports = Profile;
