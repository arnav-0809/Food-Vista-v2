const express = require("express");
const mongoose=require("mongoose");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');

    next();
});

mongoose.connect("mongodb+srv://admin-arnav:Test123@cluster0.148tt.mongodb.net/foodDB",{ useNewUrlParser: true ,useUnifiedTopology: true ,useFindAndModify: false});

let foodItems=[];

const foodSchema=new mongoose.Schema({
    item:Array,
    price:Number
  });
  
const Food=mongoose.model("Food",foodSchema);


app.post("/",function (req, res) {
    const food=new Food({
        item:req.body.item,
        price:req.body.price
    });
    food.save();
});

app.get("/",function(req,res){
    Food.find({},function(err,foundFood){
         var arr=[];
         foundFood.forEach(function(food){
           arr.push(food);
         });
         foodItems=arr;
         res.json(foodItems);
})
})


  
const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));