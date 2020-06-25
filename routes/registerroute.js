var express = require("express");
var router = express.Router();
var campground = require("../modules/campground");
var comment    = require("../modules/comment");
var passport = require("passport");
var user = require("../modules/user");
var middleware = require("../middleware");


router.get("/register",function(req,res){
	res.render("register.ejs");
});


router.post("/register",function(req,res){
	var newuser = new user({username:req.body.username});
	user.register(newuser,req.body.password,function(err,user){
		if(err){
			console.log("error");
			return res.redirect("/register");
			
		}
		
		passport.authenticate("local")(req,res,function(){
			res.redirect("/landpage");
		});
	});
});

router.get("/login",function(req,res){
	res.render("login.ejs");
});



router.post("/login",passport.authenticate("local",{
	successRedirect:"/landpage",
	failureRidirect:"/register"
}),function(req,res){
	
});

router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Logged out");
	res.redirect("/");
});



module.exports = router;