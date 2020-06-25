var express = require("express"),
     app =       express(),
     bodyparser =require("body-parser"),
	 mongoose = require("mongoose"),
	 passport  = require("passport"),
	 passportlocal = require("passport-local"),
	methodoverride   = require("method-override"),
	flash        =    require('connect-flash'),
	
	 user            = require("./modules/user"),
	 campground = require("./modules/campground"),
	 seeddb     = require("./seed"),
	 comment    = require("./modules/comment");

var indexroute = require("./routes/indexroute"),
	commentroute  = require("./routes/commentroute"),
	registerroute = require("./routes/registerroute");
    
//seeddb(); seed the data base


app.use(flash());

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yellcamp", { useNewUrlParser: true });

app.use(require("express-session")({
	secret:"my name is something",
	resave:false,
	saveUninitialized:false
}));

passport.use(new passportlocal(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

app.use(methodoverride("_method"));
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success =req.flash("success");
	next();
});

app.use(indexroute);
app.use(commentroute);
app.use(registerroute);




app.listen(9091,function(){
	console.log("server started");
});