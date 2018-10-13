var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var VisualSchema=new Schema({
    strName:String,
	strImg:String,
	strDesc:String,
	isDel:Boolean,
	order:Number
});

module.exports=VisualSchema;