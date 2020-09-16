
var express=require("express");
var router=express.Router();

var Campground=require("../models/campgrounds");
var Comment=require("../models/comment");

//====================
//COMMENTS ROUTES
//====================
router.get("/campgrounds/:id/comments/new",function(req,res){
    Campground.findById(req.params.id,function(err,campground){
    if(err){
      console.log(err);
    }else{
     res.render("comments/new",{campground:campground});
    }
    });
  
 });
 router.post("/campgrounds/:id/comments",function(req,res){
   Campground.findById(req.params.id,function(err,campground){
  if(err){
    console.log(err)
  }else{
    Comment.create(req.body.comment,function(err,comment){
      if(err){
        console.log(err);
      } else{
        campground.comments.push(comment);
        campground.save();
        res.redirect("/campgrounds/"+campground._id);
      }
    })
  }
   });
 });

 module.exports=router;