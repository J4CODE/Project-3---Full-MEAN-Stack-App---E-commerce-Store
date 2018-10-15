const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;



const FeedbackSchema = new Schema({
  comment: String,
  author: String
})


const Feedback = mongoose.model("Feedback", FeedbackSchema);


module.exports  = Feedback;
