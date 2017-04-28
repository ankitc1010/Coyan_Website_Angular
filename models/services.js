var mongoose=require("mongoose");


var CoyanServicesSchema = new mongoose.Schema({
	name: String,
  email:String,
  phone:Number,
	college: String
});

module.exports = mongoose.model("CoyanService", CoyanServicesSchema);
