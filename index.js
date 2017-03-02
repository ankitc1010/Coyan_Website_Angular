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
var postmark = require("postmark");
var expressStaticGzip = require("express-static-gzip");
app.use("/", expressStaticGzip("src"));

// Example request
var client = new postmark.Client("62efbc5a-6c0d-4652-a548-c7caca61b03b");
var User =require('./models/user');
var TechArtha = require('./models/techartha');
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
	templateUrl:String,
  subtitle: String,
  created: Number

});
var FellowSchema = new mongoose.Schema({
  name:String,
  email:String,
  phoneNumber: String,
  age: String
});
var Fellow =  mongoose.model("fellow", FellowSchema);
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

app.post('/contactUs', function(req,res){

console.log(req.body);

client.sendEmail({
    "From": "contact@coyan.in",
    "To": "amanalok@coyan.in",
    "Subject": "Mail up",
    "HtmlBody": `Dear ${req.body.name},${req.body.email},  <br>
                ${req.body.text}<br>

                <strong>TEAM COYAN</strong>`
});
res.send(true);
});


app.post('/api/techIdCheck', function(req,res) {
  console.log(req.body);
  TechArtha.findOne({id: req.body.id}, function(err, obj) {
    if(err){
      return res.send(false);
    } else {
      if(obj === null) {
      return  res.send(false);
      } else {
        return res.send(true);
      }
    }
  })

});





app.post('/techArthaRegister', function(req,res){
  console.log(req.body);

  var id = Math.floor(Math.random() * (10000000) + 100000);
  req.body.id = id;

  client.sendEmail({
      "From": "registrations@coyan.in",
      "To": req.body.email,
      "Subject": "TECH ARTHA Registration",
      "HtmlBody": `Dear ${req.body.firstName} ${req.body.secondName},<br>
                  Welcome to Coyan Family!<br>
                  We are happy to receive your registration for our event TechArtha. Your Coyan id is CO010-${id}, keep a hold of it. We will be contacting you shortly for the process ahead.<br>
                  Regards,<br>
                  <strong>TEAM COYAN</strong>`
  });
  TechArtha.create(req.body,function(err,techartha){
		if(err){
			console.log(err);
		}
		else{
			console.log(techartha);

		}
	})
  res.send(true);
})


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

app.get("/showdbtechartha", function(req,res) {
  TechArtha.find({}, function(err, techartha) {
    if(err)
        res.send("Error fetching");
        else {
            res.send(techartha);
        }

  })
})


app.post('/checkemailtechartha', function(req,res) {
  console.log(req.body.email);
  TechArtha.findOne({'email': req.body.email}, function(err, tech) {
    if(err) {
      res.send(true)
    } else {
      if(tech===null)
      res.send(true);
      else
      res.send(false);
    }
  })
})

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
app.post('/api/fellows', function(req,res){
  Fellow.create(req.body, function(err, fellow) {
    if(err) {
      console.log(err);
    } else {
      console.log(fellow);
      res.send(true);
    }
  });
});
app.post("/api/articles", function(req,res){
	Article.create(req.body,function(err,article){
		if(err){
			console.log(err);
		}
		else{
			console.log(article);
			res.json({status: true});
		}
	})
});

app.post('/sendmail', function(req,res) {



  console.log(req.body.email);
  var object = req.body.email;
  var otp = Math.floor(Math.random() * (10000 - 1000) + 1000);


  client.sendEmail({
      "From": "registrations@coyan.in",
      "To": req.body.email,
      "Subject": "Coyan Registration",
      "TextBody": `Your otp is ${otp}.`
  });

res.json({otp: otp});

});


app.listen(process.env.PORT || '3000' ,process.env.IP, function(){
	console.log("server started");
})
// app.listen('3000', function(){
// 	console.log("server started");
// })
