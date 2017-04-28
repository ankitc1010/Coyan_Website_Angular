var mongoose=require("mongoose");


var ServicesSchema = new mongoose.Schema({
	name: String,
  email:String,
  phone:Number,
	description: String,
	web: Boolean,
	marketing: Boolean,
	anon: Boolean
});

module.exports = mongoose.model("Service", ServicesSchema);
