var express = require("express");
var router = express.Router();

var ycampgrounds = require("../models/Ycampgrounds");
var Comment = require("../models/comment");
var User = require("../models/user");
var middlewareObj = require("../middleware/index");


router.get("/",function(req,res){

    
    ycampgrounds.find({},function(err,ycfind){
        if(err){
             console.log("something is very wrong");
             console.log(err);
        } else {
             res.render("campgrounds/campgrounds",{campgrounds:ycfind}) ;
        }
    });
});

router.post("/",middlewareObj.isLoggedIn,function(req,res){
    var name = req.body.name;
    var img = req.body.iurl;
    var desc = req.body.description;
    var price = req.body.price;
    var author = {
        id : req.user._id,
        username : req.user.username
    }
var newCamp = {name: name,price: price, image:img, description:desc , author:author};

    ycampgrounds.create(newCamp,function(err,ycadd){
        if(err){
            console.log(err);
        } else{
            
             res.redirect("/campgrounds");
        }
        
    });
   
});

router.get("/new",middlewareObj.isLoggedIn,function(req, res) {
    res.render("campgrounds/new");
});

router.get("/:id",function(req, res) {
    
    ycampgrounds.findById(req.params.id).populate("comments").exec(function(err ,foundcamp){
         if(err){
            console.log(err);
        } else{
              res.render("campgrounds/show" , {campgrounds: foundcamp});
        }
    });
   
});

router.get("/:id/edit",middlewareObj.checkOwnership,function(req, res){
    
      ycampgrounds.findById(req.params.id,function(err,foundcampground){
      res.render("campgrounds/edit" , {campgrounds: foundcampground } );
});
}); 

router.put("/:id",middlewareObj.checkOwnership,function(req,res){
    ycampgrounds.findByIdAndUpdate(req.params.id, req.body.campground, function(err,updatecampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

router.delete("/:id",middlewareObj.checkOwnership,function(req,res){
    ycampgrounds.findByIdAndRemove(req.params.id, function(err,delcamp){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    });
  
});

   
module.exports = router;