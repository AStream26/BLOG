var mongoose = require("mongoose");
var passportlocalmongoose = require("passport-local-mongoose");

var userschema = mongoose.Schema({
	username:String,
	password:String
});
userschema.plugin(passportlocalmongoose);

module.exports = mongoose.model("user",userschema);