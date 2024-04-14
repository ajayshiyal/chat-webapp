const mongoose=require("mongoose");
const  chatSchema=new mongoose.Schema(
    {
        From:{
            type:String,
            require:true
        },
        To:{
            type:String,
            require:true
        },
        msg:{
            type:String
        },
        created_at:{
            type:Date
        },
    }
);
const Chat=mongoose.model("Chat",chatSchema);
module.exports=Chat;