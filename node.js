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
    id:Number,
    item:Array,
    price:Number
  });
  
const Food=mongoose.model("Food",foodSchema);


app.post("/",function (req, res) {
    
    Food.deleteOne({id:req.body.id},function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log("deleted successfully");
      }
    })
    
    

    const food=new Food({
      id:req.body.id,
      item:req.body.item,
      price:req.body.price
    });
    food.save();


})

app.get("/delete/:ID",function(req,res){
  const itemid=req.params.ID;
  var priceCut=0;
  Food.findOneAndUpdate({}, { $pull: { item: { itemId:parseInt(itemid)} } },{multi:true,new:true}, function(err,foundFood){
  if(err)
  {
    console.log(err);
  }else{
   //changing the price in database
   foundFood.item.map((i)=>{
       priceCut+=parseInt(i.count)*parseInt(i.price);
      }
    );

    if(parseInt(itemid)<10){
    Food.updateOne({id:1},{price:priceCut},function(err){
      if(err){
        console.log(err);
      }
    });
  }}
});

  res.redirect("/");
})


app.get("/",function(req,res){

     Food.find({},function(err,foundFood){
         var arr=[];
         foundFood.forEach(function(food){
           arr.push(food);
           if(food.item.length===0)
           {
            Food.deleteOne({id:food.id},function(err){
              if(err){
                console.log(err);
              }
              else{
                console.log("deleted");
              }
            })
           }
         });
         foodItems=arr;
         res.json(foodItems);
});
})


  
const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));