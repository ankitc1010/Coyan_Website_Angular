var mongoose=require("mongoose");


var TechArthaSchema = new mongoose.Schema({
	firstName: String,
  lastName: String,
  email:String,
  phoneNumber:Number,
  id: String
});

module.exports = mongoose.model("TechArtha", TechArthaSchema);
