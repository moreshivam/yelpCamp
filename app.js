
var express=require("express");
var app=express();

var bodyParser=require("body-parser");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var mongoose= require("mongoose");
var Campground=require("./models/campgrounds");
var Comment=require("./models/comment");
var User=require("./models/user");


var commentsRoutes=require("./routes/comments");
var campgroundsRoutes=require("./routes/campgrounds");
var authRoutes=require("./routes/index");


mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false });



app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public")); 


//PASSPORT CONFIG
app.use(require("express-session")({
  secret:"coding is life",
  resave:false,
  saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
  res.locals.currentUser=req.user;
  next();
})

app.use(authRoutes);
app.use(commentsRoutes);
app.use(campgroundsRoutes);



 

app.get("/",function(req,res){
 res.render("landing");
});









app.listen("3000",function(req,res){
 console.log("yelp camp server is started"); 
});