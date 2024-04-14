const mongoose=require("mongoose");
const Chat=require("./models/chat.js");




main()
.then(( )=>{
    console.log("connection creat");
})
.catch((err)=> console.log(err)
);



async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatapp");
}


let chats=[
    {
    From:"Ajay",
    To:"jenish",
    msg:"send me your ",
    created_at:new Date(),
    },


    {
        From:"vijay",
        To:"haresh",
        msg:"hello ",
        created_at:new Date(),
        },
        {
            From:"abhay",
            To:"mitul",
            msg:"send me your ",
            created_at:new Date(),
            },
];
Chat.insertMany(chats);


