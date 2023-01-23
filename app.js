const express = require('express');
const app = express();
const mongoose=require("mongoose");
app.use(express.json());

mongoose.set("strictQuery", false);


mongoose.connect("mongodb://localhost:27017/mynewdb",{
    useNewUrlParser: true,
 useUnifiedTopology: true 
},(err)=>{
    if(!err)
    {
        console.log("connected to db")

    }else{
        console.log("error")

    }
})
const sch={
    name:String,
    email:String,
    id :Number

}

const monmodel=mongoose.model("NEWCOL",sch);

//post

app.post("/post",async(req,res)=>{
    console.log("inside post function");
    const data =new monmodel({
        name:req.body.name,
        email:req.body.email,
        id:req.body.id
  });

    const val=await data.save();
    res.send("posted");
})

//put

app.put("/update/:id",async(req,res)=>{
   let upid=req.params.id;
    let upname=req.body.name;
   let upemail=req.body.email;

    monmodel.findOneAndUpdate({id:upid},{$set:{name:upname,email:upemail}},
        {new:true},(err,data)=>{
            if(data==null)
            {
               res.send("nothing found")
          }else{
                res.send(data)
            }


    })
})


app.listen(3000,()=>{
    console.log("on port 3000")
})