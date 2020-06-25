var express = require("express");
var router = express.Router();
var campground = require("../modules/campground");
var comment    = require("../modules/comment");
var passport  = require("passport");
var middleware = require("../middleware");


router.get("/",function(req,res){
	res.render("homes.ejs");
	
});
	

router.get("/landpage",function(req,res){
	console.log(req.user);
	
	campground.find({},function(err,camp){
		     if(err)
				 {
					 console.log("Something went wrong");
					 
				 }
		else{
				res.render("index.ejs",{ info:camp});
			
		    }
});
	
});

	

router.post("/landpage",function(req,res){  //get data from form and put it into array and redirect to landpage
	
	
	

	campground.create(
	 req.body.camp
		
	,function(err,camp){
		if(err){
			console.log("Something went wrong");
		}
		else{
			camp.author.id = req.user._id;
			camp.author.username = req.user.username;
			camp.save();
			console.log(req.user);
		}
	});
	 res.redirect("/landpage");//by default goes to get if(same /landpage)
	
	
});

router.get("/landpage/newlandpage",middleware.isLoggedin,function(req,res){
	
	res.render("new.ejs");
	
});



router.get("/landpage/:id",function(req,res){
	
	
	
	campground.findById(req.params.id).populate("comments").exec(function(err,camp){
		if(err){
			console.log("oops something went weong");
			
		}
		else{console.log(camp);
			
			res.render("show.ejs",{camp:camp}); 
			
		}
	});
	
	
});

router.get("/landpage/:id/edit",middleware.cmtautharization,function(req,res){
	
		campground.findById(req.params.id,function(err,camp){
	
				res.render("edit.ejs",{campground:camp});
			
	});
	
	
});

router.put("/landpage/:id",middleware.cmtautharization,function(req,res){
	campground.findByIdAndUpdate(req.params.id,req.body.camp,function(err,camp){
		if(err){
			return res.redirect("/landpage");
		}
		else{
			res.redirect("/landpage/"+req.params.id);
		}
	});
	
});

router.delete("/landpage/:id",middleware.cmtautharization,function(req,res){
	campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			return res.redirect("/landpage");
			
		}
		else{
			res.redirect("/landpage");
		}
	});
});


module.exports = router;