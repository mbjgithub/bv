var mongoose=require("mongoose");
var ImgSchema=require("../schemas/internation-img");
var ImgModel=mongoose.model("img",ImgSchema);

module.exports=ImgModel;