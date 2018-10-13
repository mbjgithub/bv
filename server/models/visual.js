var mongoose=require("mongoose");
var VisualSchema=require("../schemas/visual");
var VisualModel=mongoose.model("visual",VisualSchema);

module.exports=VisualModel;