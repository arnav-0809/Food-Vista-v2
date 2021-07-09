//comment out this for heroku
require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path"); 
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
  res.setHeader('Access-Control-Allow-Credentials','true');
  next();
});

//creating a session
app.use(session({
  secret: "Hello.",
  resave: false,
  saveUninitialized: false
}));



app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.set('useCreateIndex', true);

var db = mongoose.connection;

let foodItems = [];
let orderItems=[];
//Id for the entire session
var userid = "";

//Food Schema declared
const foodSchema = new mongoose.Schema({
  username:String,
  id: Number,
  item: Array,
  price: Number
});

const reviewSchema = new mongoose.Schema({
  username:String,
  reviewid: String,
  title: String,
  content: String
})

const addressSchema=new mongoose.Schema({
  address:String,
  city:String,
  state:String,
  pin:Number
})

//User Schema declared with array of foodSchema named as Order Details
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  orderDetails: {
    type: [foodSchema]
  },
  address: {
    type: addressSchema,
  },
  phone: {
    type: Number,
  },
  reviews: {
    type: [reviewSchema]
  },
  totalPrice: {
    type:Number
  },
  orderStatus:{
    type:String,
    default:"not placed"
  }
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);
const Review = mongoose.model("Review", reviewSchema);
const Food = mongoose.model("Food", foodSchema);
const Address=mongoose.model("Address",addressSchema);

passport.use(User.createStrategy());
//Creating cookie of the session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
//Destroying cookie of the session
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.get("/user",function(req,res){
  res.json({username:userid});
})

app.get("/logout", function (req, res) {
  req.logout(function(err){
    console.log(err);
  });
  res.json({success:true});
  userid="";
})

//Signing up the user 
app.post("/register", function (req, res) {
  User.register({ username: req.body.username }, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      console.log("successfull")
      passport.authenticate("local")(req, res, function () {
        userid = req.body.username;
        console.log(userid);
      });
    }
  });
});

//Fetching User Collection and displaying it on this route
app.get("/register", function (req, res) {
  User.find({}, function (err, foundUser) {
    var arr = [];
    foundUser.forEach(function (user) {
      arr.push(user);
    });
    res.json(arr);
  })
})

//Logging in(for signed up users)
app.post("/login", function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function (err) {
    if (err) {
      console.log(err);
      res.json({ success: false });
    }
    else {
      passport.authenticate("local")(req, res, function () {
        res.json({ success: true });
        userid = req.body.username;
        console.log(userid);
      });
    }

  });
});



//Posting users and food items to database 
app.post("/food", function (req, res) {
  // Deleting food from the food collection of the database
  Food.deleteOne({username:userid, id: req.body.id }, function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("deleted successfully");
    }
  })

  //Fetching food item details from the frontend
  const food = new Food({
    username:userid,
    id: req.body.id,
    item: req.body.item,
    price: req.body.price
  });
  console.log(userid);
  User.findOne({ username: userid }, function (err, foundUser) {
    if (err) {
      console.log(err)
    }
    else {
      //Deleting the previous record of the existing food items of a particuar shop
      User.findOneAndUpdate({ username: userid }, { $pull: { orderDetails: { id: parseInt(food.id) } } }, { multi: true,new:true }, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          //Adding the renewed record of that particular shop if it exists by fetching from the frontend
          foundUser.orderDetails.push(food);
          foundUser.save();
          console.log("changes");
        }
      })
    }

  })
  food.save();
})


//Triggers when delete icon is clicked
app.get("/delete/:ID", function (req, res) {
  const itemid = req.params.ID;
  var priceCut = 0;
  var shopid = 1;
  //finding shopid
  switch (Math.floor(itemid / 10)) {
    case 0:
      shopid = 1;
      break;
    case 1:
      shopid = 2;
      break;
    case 2:
      shopid = 3;
      break;
    case 3:
      shopid = 4;
      break;
    case 4:
      shopid = 5;
      break;
    case 5:
      shopid = 6;
      break;
    case 6:
      shopid = 7;
      break;
    case 7:
      shopid = 8;
      break;
    case 8:
      shopid = 9;
      break;
    default:
      shopid = 1;
      break;
  }

  //removing an item when the delete icon is clicked
  Food.findOneAndUpdate({ username:userid,id: parseInt(shopid)}, { $pull: { item: { itemId: parseInt(itemid) } } }, { multi: true, new: true }, function (err, foundFood) {
    if (err) {
      console.log(err);
    } else {
      //changing the price in database
      foundFood.item.map((i) => {
        priceCut += parseInt(i.count) * parseInt(i.price);
      }
      );

      Food.updateOne({ username:userid }, { price: priceCut }, function (err) {
        if (err) {
          console.log(err);
        }
      });
    }
  });

  //removing a food item when the delete icon is clicked
  User.findOneAndUpdate({ username: userid}, { $pull: { orderDetails: { id: parseInt(shopid) } } }, { multi: true, new: true }, function (err, foundFood) {
    if (err) {
      console.log(err);
    } else {
      Food.findOne({ id: parseInt(shopid) }, function (err, foundFood) {
        if (err) {
          console.log(err);
        }
        else {
          console.log("added");
          if (foundFood !== null) {
            User.findOne({ username: userid }, function (err, foundUser) {
              foundFood.price = priceCut;
              foundUser.orderDetails.push(foundFood);
              foundUser.save();
            })
          }
        }
      });
    }
  });

  User.findOne({username:userid},function(err,foundUser){
    if(err){
      console.log(err);
    }else{
      foundUser.orderDetails.map((i)=>{
        if(i.item.length===0){
          User.findOneAndUpdate({username:userid},{$pull:{orderDetails:{id:parseInt(i.id)}}},function(err){
            if(err){
              console.log(err);
            }else{
              console.log("length 0 deleted");
            }
          })
        }
      })
    }
  })

})

//Fetching food Collection and displaying it on this route
app.get("/food", function (req, res) {

  Food.find({}, function (err, foundFood) {
    var arr = [];
    foundFood.forEach(function (food) {
      arr.push(food);
      if (food.item.length === 0) {
        Food.deleteOne({ id: food.id }, function (err) {
          if (err) {
            console.log(err);
          }
          else {
            console.log("deleted");
          }
        })
      }
    });
    foodItems = arr;
    res.json(foodItems);
  });

})

app.get("/cart",function(req,res){
  if(userid!==""){
  User.findOne({username:userid},function(err,foundUser){
    if(foundUser.orderDetails.length===0)
    {
      orderItems=[];
    }else{
      var orderPrice=0;
      foundUser.orderDetails.map((i)=>orderPrice+=parseInt(i.price));
      foundUser.totalPrice=orderPrice;
      foundUser.save();
      orderItems=foundUser.orderDetails;
    }
    res.json(foundUser);
  })}else{
    orderItems=[];
    res.json(orderItems);
  }

  User.findOne({username:userid},function(err,foundUser){
    if(err){
      console.log(err);
    }else{
      if(foundUser){
      foundUser.orderDetails.map((i)=>{
        if(i.item.length===0){
          User.findOneAndUpdate({username:userid},{$pull:{orderDetails:{id:parseInt(i.id)}}},function(err){
            if(err){
              console.log(err);
            }else{
              console.log("length 0 deleted");
            }
          })
        }
      })
    }
    }
  })
})

//------------------Reviews--------

//Generating review id
  function getReviewId(){
  var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var result = '';
  for (var i = 0; i < 6; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}

app.post("/review",function (req, res) {
  const review = new Review({
    username:userid,
    reviewid: getReviewId(),
    title: req.body.title,
    content: req.body.content
  })
  User.findOne({ username: userid },function (err, foundUser) {
    if (err) {
      console.log(err)
    } else {
      foundUser.reviews.push(review);
      foundUser.save();
    }
  })
  review.save();
})


app.get("/review", function (req, res) {
  Review.find({}, function (err, foundReview) {
    var arr = [];
    foundReview.forEach(function (review) {
      arr.push(review);
    })
    res.json(arr);
  })
})


app.get("/review/:id",function(req,res){
  const ID=req.params.id;
  Review.deleteOne({username: userid},{reviewid:ID},function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log("review deleted");
    }
  })
  User.findOneAndUpdate({ username: userid }, { $pull: { reviews: { reviewid: ID } } }, { new:true}, function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("deleted from userschema");
    }
  })
})

app.get("/reviewdelete",function(req,res){
  res.json({username:userid});
})

app.post("/details",function(req,res){
  const phone=req.body.phone;
  const name=req.body.name;
  const address=new Address({
    address:req.body.address.address,
    city:req.body.address.city,
    state:req.body.address.state,
    pin:req.body.address.pin
  });

  User.updateMany({username:userid},{address:address,phone:phone,name:name,orderStatus:"placed"},function(err){
    if(err){
      console.log(err);
    }
  });

  User.findOne({username:userid},function(err,foundUser){
    if(err){
      console.log(err);
    }else{
      if(foundUser.orderStatus==="placed")
      {
        foundUser.orderDetails=[];
        foundUser.orderStatus="not placed";
        foundUser.totalPrice=0;
        foundUser.save();
      }
    }
  })

  Food.deleteMany({username:userid},function(err){
    if(err)
    {
      console.log(err);
    }
  })

});


//used for pushing on heroku
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));