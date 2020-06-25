var express = require("express");
var router = express.Router();
var campground = require("../modules/campground");
var comment    = require("../modules/comment");
var middleware = require("../middleware");






router.get("/landpage/:id/comments/new",middleware.isLoggedin,function(req,res){
	campground.findById(req.params.id,function(err,camp){
		if(err){
			console.log("campground not found");
		}
		else{
			res.render("comments/show.ejs",{ camp:camp});
			
		}
	});
	
});

router.post("/landpage/:id/comments",middleware.isLoggedin,function(req,res){
	campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log("error1");
		}
		else{
			comment.create(req.body.comment,function(err,res1){
				if(err){
					console.log("error11");
				}
				else{
					//console.log(req.user);
					res1.author.id = req.user._id;
					res1.author.username = req.user.username;
					res1.save();
					campground.comments.push(res1);
					campground.save();
					res.redirect("/landpage/"+req.params.id);
				}
			});
		}
	});
	
});

router.get("/landpage/:id/comments/:commentid/edit",middleware.cmtautharization,function(req,res){
   comment.findById(req.params.commentid,function(err,comment){
	   if(err)
		   return res.redirect("back");
	   else{
		   res.render("comments/edit.ejs",{camp:req.params.id,comment:comment});
	   }
	   
   });
});

router.put("/landpage/:id/comments/:commentid",middleware.cmtautharization,function(req,res){
	comment.findByIdAndUpdate(req.params.commentid,req.body.comment,function(err,comment){
		if(err)
			res.redirect("/landpage");
		else{
			res.redirect("/landpage");
		}
	})
});

router.delete("/landpage/:id/comments/:commentid",middleware.cmtautharization,function(req,res){
	comment.findByIdAndRemove(req.params.commentid,function(err){
		if(err){
			console.log("failed");
		}
		else{
			res.redirect("/landpage/"+req.params.id);
		}
	});
});

module.exports = router;