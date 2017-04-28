var mongoose=require("mongoose");


var StafeSchema = new mongoose.Schema({
	name: String,
  email:String,
  phone:Number,
	college: String
});

module.exports = mongoose.model("Stafe", StafeSchema);
