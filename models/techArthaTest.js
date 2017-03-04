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
  question7: String,
	question8: String,
	question9: String,
	question10: String,
	question11: String,
	question12: String,
	question13: String,
	question14: String,
	question15: String,
	question16: String,
	question17: String,
	question18: String,
	question19: String,
	question20: String,
	question21: String,
	question22: String,
	question23: String,
	question24: String,
	question25: String,
	question26: String,
	question27: String,
	question28: String,
	question29: String,
	question30: String,
	question31: String,
	question32: String,
	question33: String




});

module.exports = mongoose.model("TechArthaTest", TechArthaTestSchema);
