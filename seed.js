var mongoose = require("mongoose");
var campground = require("./modules/campground");
var comments = require("./modules/comment");

data = [
	{
		location: "Nanital",
	         url:     "https://images.unsplash.com/photo-1495498004540-86af87a729be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    	   about:    "Nainital is a popular hill station in the Indian state of Uttarakhand. ",
	       more :    "Nainital is a Himalayan resort town in the Kumaon region of India’s Uttarakhand state, at an elevation of roughly 2,000m. Formerly a British hill station, it’s set around Nainital Lake, a popular boating site with Naina Devi Hindu Temple on its north shore. A cable car runs to Snow View observation point (at 2,270m), with vistas over the town and mountains including Nanda Devi, Uttarakhand’s highest peak."
		
	},
	{
		location: "Nanital",
	         url:     "https://images.unsplash.com/photo-1495498004540-86af87a729be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    	   about:    "Nainital is a popular hill station in the Indian state of Uttarakhand. ",
	       more :    "Nainital is a Himalayan resort town in the Kumaon region of India’s Uttarakhand state, at an elevation of roughly 2,000m. Formerly a British hill station, it’s set around Nainital Lake, a popular boating site with Naina Devi Hindu Temple on its north shore. A cable car runs to Snow View observation point (at 2,270m), with vistas over the town and mountains including Nanda Devi, Uttarakhand’s highest peak."
		
	},
	{
		location: "Nanital",
	         url:     "https://images.unsplash.com/photo-1495498004540-86af87a729be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    	   about:    "Nainital is a popular hill station in the Indian state of Uttarakhand. ",
	       more :    "Nainital is a Himalayan resort town in the Kumaon region of India’s Uttarakhand state, at an elevation of roughly 2,000m. Formerly a British hill station, it’s set around Nainital Lake, a popular boating site with Naina Devi Hindu Temple on its north shore. A cable car runs to Snow View observation point (at 2,270m), with vistas over the town and mountains including Nanda Devi, Uttarakhand’s highest peak."
		
	}
	
]

function seed(){
	campground.deleteMany({},function(err){
		if(err){
			console.log("erre");
		}
		
		data.forEach(function(camp){
		campground.create(camp,function(err,camp){
			if(err){
				console.log("error");
			}
			else{
				console.log("campground added");
				comments.create({
					text:"nice trip remember that trip with friends",
					author:"astream"
				},function(err,comment){
					camp.comments.push(comment);
					camp.save();
				});
			}
		});
	});
	});
	
	
}

module.exports = seed;