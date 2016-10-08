var  express        = require("express"),
     mongoose       = require("mongoose"),
     app            = express(),
     passport       = require("passport"),
    LocalStrategy   = require("passport-local"),
     bodyParser     = require("body-parser"),
     ycampgrounds   = require("./models/Ycampgrounds"),
     flash          = require("connect-flash"),
     User           = require("./models/user"),
     seedDB         = require("./seed"),
     methodOverride = require("method-override"),
     Comment        = require("./models/comment");
     
    // Routes  
var camproutes = require("./routes/campgrounds"),
    commentroutes = require("./routes/comments"),
    indexroutes  = require("./routes/index");

//database connection
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";
mongoose.connect(url);

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

app.use(function(req, res, next) {
  res.locals.current_path = req.path;
  next();
});


app.use("/",indexroutes);
app.use("/campgrounds",camproutes);
app.use("/campgrounds/:id/comments",commentroutes);


app.listen(process.env.PORT, process.env.ID, function(){
   console.log("The Yelpcamp Server is Running..") 
});