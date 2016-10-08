var express = require("express");
var router = express.Router({mergeParams: true});

var ycampgrounds = require("../models/Ycampgrounds");
var Comment = require("../models/comment");
var middlewareObj = require("../middleware/index");

router.get("/new",middlewareObj.isLoggedIn,function(req, res) {
    
    ycampgrounds.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
             res.render("comments/new",{campground:campground});
        }
    })
   
});

router.post("/",middlewareObj.isLoggedIn,function(req,res){
    
    ycampgrounds.findById(req.params.id,function(err,campground){
        
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{

            
            Comment.create(req.body.commen,function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                 
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    res.redirect('/campgrounds/'+campground._id);
                }
            });
        }
    });
});

router.get("/:comment_id/edit",middlewareObj.checkcommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id,function(err, foundcomment) {
        if(err){
            res.render("back");
        }else{
           res.render("comments/edit",{campground_id : req.params.id, comment : foundcomment});  
        }
    })
   
})

router.put("/:comment_id",middlewareObj.checkcommentOwnership,function(req,res){
    
   
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.commen, function(err,updatecomment){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

router.delete("/:comment_id",middlewareObj.checkcommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err,deletecomment){
    if(err){
        res.redirect("back");
    }else{
        res.redirect("/campgrounds/"+req.params.id);
    }
});
});

module.exports = router;