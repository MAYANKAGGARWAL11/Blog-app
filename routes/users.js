const  mongoose = require("mongoose") ;
mongoose.connect("mongodb://127.0.0.1:27017/blog");
const userSchema = mongoose.Schema({
  username:{
    type:String,
    unique:true,
    required:true 
  },
  title:{
    type:String,
    required:true 
  },
  content:String,
  image:{
    type:String,
    imagePath:String
  }
}) ;
module.exports = mongoose.model("user",userSchema) ;