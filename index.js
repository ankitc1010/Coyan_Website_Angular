 var express=require("express");
var mongoose=require("mongoose");
var dbName="coded_app";
var app=express();
var bodyParser = require('body-parser');
var multer  = require('multer');
var upload = multer({ dest: 'assets/images' });
var uploadhtml = multer({ dest: 'assets/partials/html' });
var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var User =require('./models/user');
app.use(require("express-session")({
	secret:"Awesomeness to be achieved",
	saveUninitialized: false,
	resave: false
}));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// mongoose.connect("mongodb://localhost/"+dbName);
mongoose.connect("mongodb://ankit:laptop@ds141098.mlab.com:41098/coyan");
var ArticleSchema = new mongoose.Schema({
	name:String,
	designation:String,
	profileimg:String,
	img:String,
	title:String,
	description:String,
	templateUrl:String

});
var Article=mongoose.model("article", ArticleSchema);


var path=require("path");
app.set('view engine','html');
app.use(express.static(path.join(__dirname)));
app.get("/", function(req,res){
	res.render("index");
});
app.get("/signup", function(req,res){
	res.send("<form action='/signup' method='POST'><input type='text' name='username'><input type='password' name='password'><input type='submit'></form>");
});
app.post("/signup", function(req,res){
	User.register(new User({username:req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.send("error");
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/");
		});
	})
});


app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json(req.user);
    });
  })(req, res, next);
});

app.get('/logout', function(req,res){
	req.logout();
	res.send("cool");
});

app.post('/update',function(req,res){
	var user=req.body;
	delete user._id;
	console.log(user);
	User.update({username:user.username},{$set:user},function(err,usero){
		if(err){
			console.log(err);
		}
		else{
			console.log(User.find({}));
			res.send(usero);
		}
	});
});



app.get("/api/articles", function(req,res){
	Article.find({}, function(err,article){
		if(err){
			console.log(err);
		}
		else
		{
		res.send(article);
		}
	});
	
	
});
app.get("/api/allusers", function(req,res){
	User.find({},function(err,user){
		if(err){
			console.log(err);
			res.send("");
		}
		else
		{
			res.send(user);
		}
	});
})
app.post("/api/articleget",function(req,res){
	console.log(req.body);
	Article.find({_id:req.body.id}, function(err, article){
		if(err)
		{
			console.log(err);
			res.send("404");
		}
		else
			res.send(article);
	})
});
app.post("/api/user", function(req,res){
	console.log(req.body);
	User.find({_id:req.body.id}, function(err, user){
		if(err)
		{
			console.log(err);
			res.send("404");
		}
		else
		{
			res.send(user);
			console.log(user);
		}
	})
});

app.post("/api/images",upload.any(), function(req,res){
	res.send(req.files[0].path);
});

app.post("/api/html",uploadhtml.any(), function(req,res){
	res.send(req.files[0].path);
})

app.post("/api/articles", function(req,res){
	Article.create(req.body,function(err,article){
		if(err){
			console.log(err);
		}
		else{
			console.log(article);
			res.send(true);
		}
	})
})
app.listen(3000, function(){
	console.log("server started");
})