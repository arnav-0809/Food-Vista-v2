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

    //  Food.findOneAndUpdate({item:req.body.item},{count:req.body.count},function(err){
    //   if(err){
    //     console.log(err);
    //   }
    //   else{
    //     console.log("successfully updated");
    //   }
    //   });

      // Food.findOne({item:req.body.item},function(err,foundFood){
      //   if(err){
      //     console.log(err);
      //   }
      //   if(!foundFood)
      //   {
      //     food.save();
      //     console.log("saved");
      //   }
      // })

})

// app.post("/delete/req.body.id",function(req,res){
//   Food.deleteOne({id:req.body.id},function(err){
//     if(err){
//       console.log(err);
//     }
//   })
//   res.redirect("/");
// })

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