var express     = require("express");
var mongoose    = require("mongoose");
var app         = express();
var passport    = require("passport"),
    LocalStrategy   = require("passport-local");
var bodyParser  = require("body-parser");
var ycampgrounds = require("./models/Ycampgrounds");
var flash = require("connect-flash");
var User    = require("./models/user");
var seedDB = require("./seed");
var methodOverride = require("method-override");
var Comment = require("./models/comment");

var camproutes = require("./routes/campgrounds"),
    commentroutes = require("./routes/comments"),
    indexroutes  = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
 
// seedDB(); seed the comment data


app.use(require("express-session")({
    secret : "I am an FBI agent now!!!",
    resave : false,
    saveUninitialized : false
    
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(flash());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));




app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});


app.use("/",indexroutes);
app.use("/campgrounds",camproutes);
app.use("/campgrounds/:id/comments",commentroutes);


app.listen(process.env.PORT, process.env.ID, function(){
   console.log("Yelpcamp Server is Running") 
});