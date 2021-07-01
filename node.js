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
    price:Number,
    totalPrice:Number
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
  var shopid=1;
  //finding shopid
  switch(Math.floor(itemid/10)){
    case 0:
      shopid=1;
      break;
    case 1:
      shopid=2;
      break;
    case 2:
      shopid=3;
      break;
    case 3:
      shopid=4;
      break;
    case 4:
      shopid=5;
      break;
    case 5:
      shopid=6;
      break;
    case 6:
      shopid=7;
      break;
    case 7:
      shopid=8;
      break;
    case 8:
      shopid=9;
      break;
    default:
      shopid=1;
      break;   
  }

  //removing an item when the delete icon is clicked
  Food.findOneAndUpdate({id:parseInt(shopid)}, { $pull: { item: { itemId:parseInt(itemid)} } },{multi:true,new:true}, function(err,foundFood){
  if(err)
  {
    console.log(err);
  }else{
   //changing the price in database
   foundFood.item.map((i)=>{
       priceCut+=parseInt(i.count)*parseInt(i.price);
      }
    );

    Food.updateOne({id:parseInt(shopid)},{price:priceCut},function(err){
      if(err){
        console.log(err);
      }
    });
  }
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