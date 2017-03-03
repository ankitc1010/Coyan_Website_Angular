var mongoose=require("mongoose");


var TechArthaTestSchema = new mongoose.Schema({
	name: String,
  id: String,
  question1: String,
  question2: String,
  question3: String,
  question4: String,
  question5: String,
  question6: String,
  question7: String

});

module.exports = mongoose.model("TechArthaTest", TechArthaTestSchema);
