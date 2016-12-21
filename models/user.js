var mongoose=require("mongoose");
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
	username:String,
	password:String,
	name:String,
	email:String,
	designation:String,
	birth:String,
	facebook:String,
	linkedin:String,
	twitter:String,
	number:Number,
	img:String,
	about:String,
	designationtwo:String
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);