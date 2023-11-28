const mongoose =require("mongoose")
const EventSchema=new mongoose.Schema({
    eventName: String,
    clubName: String,
    venue: String,
    capacity: Number,
    date: Date,
    time: String,
    image:String
  });
  
  const EventModel = mongoose.model('event', EventSchema);
  
  module.exports = EventModel;