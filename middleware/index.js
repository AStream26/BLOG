var campground = require("../modules/campground");
var comment    = require("../modules/comment");

moduleobj = {};

moduleobj.cmtautharization = (req,res,next) =>{
	if(req.isAuthenticated()){
		comment.findById(req.params.commentid,function(err,comments){
		if(err){
			return res.redirect("back");
		}
		else{
			if(comments.author.id.equals(req.user._id)){
				next();
			}
			else{
				res.redirect("back");
			}
			
			
		}
	});
		
	}
	else{
		res.redirect("back");
	}
	
}

moduleobj.isLoggedin = (req,res,next) =>{
	if(req.isAuthenticated())
	return next();
	
	req.flash('error','please login');
	res.redirect("/login");
}






module.exports = moduleobj;









