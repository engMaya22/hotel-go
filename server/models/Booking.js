import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  user:{type:String, required:true , ref:"User"},
  room:{type:String, required:true , ref:"Room"}, 
  hotel:{type:String, required:true , ref:"Hotel"},

  checkInDate:{type:Date, required:true },
  checkOutDate:{type:Date, required:true },
  totalPrice:{ type:Number , required:true},
  guests:{type:Number, required:true },
  status : {
    type:String ,
    enum:["pending" , "confirmed","canceled"],
    default:"pending"
  },
  paymentMethod:{
    type:String ,
    required:true,
    default:"Pay at hotel"
  },
  isPaid:{
    type:Boolean ,
    default:false
  }



}, {timestamps:true});

const Book = mongoose.model("Book" , bookSchema);
export default Book;