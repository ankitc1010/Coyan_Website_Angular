var mongoose=require("mongoose");


var TechArthaSchema = new mongoose.Schema({
	firstName: String,
  secondName: String,
  email:String,
  phoneNumber:Number,
  id: String,
	college: String
});

module.exports = mongoose.model("TechArtha", TechArthaSchema);
