const mongoose=require("mongoose");
const {Schema}=mongoose;
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
    console.log("MongoDB connected");

    await getData();

    await mongoose.connection.close();
}
const userSchema=new Schema({
    name:String,
    email:String
    
})
const postSchema=new Schema({
    context:String,
    like:Number,
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

})
const Post=mongoose.model("Post",postSchema);
const User=mongoose.model("User",userSchema);
// const addData=async()=>{
//     // let user1=new User({
//     //     name:"Vinay",
//     //     email:"Vinay@mail.com"
//     // })
//     let user2=await User.findOne({username:"Nani"});
//     // let post1=new Post({
//     //     context:"Hello",
//     //     like:8
//     // })
//     let post2=new Post({
//         context:"Where are you",
//         like:108
//     })
//     post2.user=user2;
//     // post1.user=user1;
//     await post2.save();
//     // await user1.save();
// }
let getData=async()=>{
    let res=await Post.find({}).populate("user");
    console.log(res);
}

main().catch(err => console.log(err));
