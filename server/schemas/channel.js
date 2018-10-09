var mongoose=require("mongoose");

var Schema=mongoose.Schema;

var MixedSchema=new Schema({
	strImg:String,
	strDesc:String,
	order:Number,
	isDel:Boolean
});

var InternationalSchema=new Schema({
	strTitle:String,
	strLocationEn:String,
	strLocationZh:String,
	strTime:String,
    strCover:String,
    order:Number,
	vecMixed:[MixedSchema],
	isDel:Boolean
});

var CultureSchema=new Schema({
	strTitle:String,
	strImg:String,
	strDesc:String,
	isDel:Boolean,
	order:Number
});

var ChannelSchema=new Schema({
	isDel:Boolean,
	strName:String,
	order:Number,
	type:String,       //类型1为国际，2为文化
	international:[InternationalSchema],   //国际
	culture:[CultureSchema]   //文化
});

ChannelSchema.pre("save",function(next){
   //do something before save
   // this.createDate=this.fixDate=Date.now();
   // this.praiseNum=this.praiseNum?this.praiseNum:0;
   // this.opposeNum=this.opposeNum?this.opposeNum:0;
   // this.visitedNum=this.visitedNum?this.visitedNum:0;
   next();
});
module.exports=ChannelSchema;