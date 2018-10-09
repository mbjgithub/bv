var mongoose=require("mongoose");
var ChannelSchema=require("../schemas/channel");

var ChannelModel=mongoose.model("channel",ChannelSchema);

module.exports=ChannelModel;