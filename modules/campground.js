var mongoose = require("mongoose");


var campSchema = new mongoose.Schema({
	location: String,
	url:      String,
	about:    String,
	more :    String,
	author:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"user"
		},
		username:String
	},
	comments:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"comment"
		}
	]
});

module.exports=  mongoose.model("campground",campSchema);