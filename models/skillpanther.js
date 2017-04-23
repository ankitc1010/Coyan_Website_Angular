var mongoose=require("mongoose");


var SkillPantherSchema = new mongoose.Schema({
	name: String,
  email:String,
  phone:Number,
	college: String
});

module.exports = mongoose.model("SkillPanther", SkillPantherSchema);
