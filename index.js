const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path =require("path");
const methodeOverride=require("method-override");

app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");
const Chat=require("./models/chat.js");
app.use('/public',express.static('public'));
app.use(express.urlencoded({extended:true}));


app.use(methodeOverride("_method"));


main()
.then(( )=>{
    console.log("connection creat");
})
.catch((err)=> console.log(err)
);


//destroy rout
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let deletechat = await Chat.findByIdAndDelete(id);
     console.log(deletechat);

    res.redirect("/chats");
});


//update rout
app.put("/chats/:id", async (req, res) => {
    let { id }=req.params;
    let { msg: newMsg }=req.body;
     console.log(newMsg);
    let updatedchat=await Chat.findByIdAndUpdate( id,
        
              {  msg:newMsg },
              {runvalidater:true,new:true}
    );
    console.log(updatedchat);
  
    res.redirect("/chats");
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatapp");
}
app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{ chat });
});
app.post("/chats",(req,res)=>{
    let {From,To,msg}=req.body;
    let newchat= new Chat({
    From:From,
    To:To,
    msg:msg,
    created_at:new Date(),
    });

newchat
.save()
.then((res)=>{
    console.log("chats was created");
})
.catch((err)=>{
    console.log(err);

});
res.redirect("/chats");
});
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});


app.get("/chats",async(req,res)=>{
    let Chats=await(Chat.find());


   
    res.render("indx.ejs",{Chats});
});
app.get("/",(req,res)=>{
    res.send("express working");
});
port=8005;
app.listen(port,()=>{
    console.log(`express avaible on port${port}`);
});



