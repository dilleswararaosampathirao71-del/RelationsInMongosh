const mongoose=require("mongoose");
const {Schema}=mongoose;
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
    console.log("MongoDB connected");

    // await addOrder();
     await addCustomer();

    await mongoose.connection.close();
};
const orderSchema=new Schema({
    item:String,
    price:Number
})
const Order=mongoose.model("Order",orderSchema);
const coustomerSchema=new Schema({
    name:String,
    orders:[
        {
            type:Schema.Types.ObjectId,
            ref:"Order"
        }
    ]
})
const Customer=mongoose.model("Customer",coustomerSchema);
// const addOrder=async()=>{
//     let res=await Order.insertMany([
//     {item:"Samsung 4K TV True RGB",price:1_99_999},
//     {item:"Iphone 19 Pro",price:1_99_999},
//     {item:"Royal And Field Himalaya",price:2_55_999}])
//     console.log(res)
// }
const addCustomer= async ()=>{
    let customer1= new Customer(
        {name:"Viany"})
    let order1=await Order.findOne({item:"Samsung 4K TV True RGB"});
    let order2=await Order.findOne({item:"Iphone 19 Pro"});
    let order3=await Order.findOne({item:"Royal And Field Himalaya"});
    customer1.orders.push(order1);
    customer1.orders.push(order2);
    customer1.orders.push(order3);
    let res=await customer1.save();
    console.log(res);




}
main().catch(err => console.log(err));