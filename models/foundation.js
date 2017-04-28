var mongoose=require("mongoose");


var FoundationSchema = new mongoose.Schema({
	name: String,
  email:String,
  phone:Number,
	college: String
});

module.exports = mongoose.model("Foundation", FoundationSchema);
