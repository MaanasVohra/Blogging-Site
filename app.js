var express              = require("express"),
    bodyParser           = require("body-parser"),
    request              = require("request"),
    http                 = require("http"),
    mongoose             = require("mongoose"),
    User                 = require("./models/user.js"),
    Post                 = require("./models/post.js");

// mongoose connection to database
mongoose.connect('mongodb://localhost/blog');

// app initialisation
var app                  = express();

var alex = new User({
    name: "Alex",
    password: "Alex"
});

var joe = new User({
    name: "Joe",
    password: "Joe"
})

alex.save();
joe.save();

var post = new Post({
    title: "Hello World",
    postedBy: alex._id,
    comments: [{
        text: "Nice post!",
        postedBy: joe._id
    }, {
        text: "Thanks :)",
        postedBy: alex._id
    }]
})

post.save(function(error) {
    if (!error) {
        Post.find({})
            .populate('postedBy')
            .populate('comments.postedBy')
            .exec(function(error, posts) {
            })
    }
});

app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("homepage.ejs");
});

// listen the request
app.listen(3000, function(){
    console.log("Server initialised!");
});
