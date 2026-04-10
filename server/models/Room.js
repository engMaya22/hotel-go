import mongoose from "mongoose";




const roomSchema = new mongoose.Schema({
    hotel:{type : String , required:true , ref:"Hotel"},
    roomType : {type:String , required:true},
    pricePerNight : {type:Number , required:true},
    amenities : {type:Array , required:true},//array of any thing
    images : [{type:String}],//array of strings
    isAvailable : {type:Boolean , default:true},
     isFeatured : {type:Boolean , default:false}




}, {timestamps:true});

const Room = mongoose.model("Room" , roomSchema);
export default Room;