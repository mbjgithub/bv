<template>
  <div class="mod_manage_table">
    <table>
      <thead>
        <tr class="table_title">
          <th class="ta_center">序号</th>
          <th class="ta_center">频道名称</th>
          <th class="ta_center">包含内容</th> 
          <th class="ta_center">内容操作</th> 
          <th class="item_control">频道操作</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="channelInfo.vecChannel&&channelInfo.vecChannel.length">
          <tr v-for="(item,key) in channelInfo.vecChannel">
            <td class="ta_center"><span>{{key+1}}</span></td>
            <td class="ta_center"><span>{{item.strName}}</span></td>
            <td class="ta_center">
              <span>{{(item.international&&item.international.length || item.culture&&item.culture.length)}}</span>
            </td>
            <td class="ta_center">
              <a href="javascript:void(0);"
                  @click="toContent(item._id)">整理</a>
            </td>
            <td class="item_control">
              <a href="javascript:void(0);"
                  v-for="op in operate" 
                  @click="onDeal(op.opStr,item,key)">{{op.title}}</a>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td class="ta_center" colspan="5">暂时没有数据</td>
          </tr>
        </template>
      </tbody>
    </table>    
  </div>
</template>

<script>  
  import changeChannelOrderReq from 'models/change_channel_order'
  import delReq from '../fetchers/del-channel'
  export default {
    components:{},
    props:['channelInfo'],
    data(){
      return {
        operate:[
        {
          title:'编辑',
          opStr:'edit'
        },{
          title:'上移',
          opStr:'up'
        },{
          title:'下移',
          opStr:'down'
        },{
          title:'删除',
          opStr:'del'
        }]
      }
    },
    methods:{
      toContent(id){
        _router.to(`content.html?id=${id}`)
      },
      onDeal(name,item,key){
        this[name]&&this[name](item,key)
      },
      edit(item){
        this.$emit("edit",item)
      },
      async changeOrder(channelId1,channelId2,cb){
        var [err,data]=await to(changeChannelOrderReq({
          channelId1,
          channelId2
        }))
        if(err){
          bus.$emit("toast",{title:`改变位置失败-${err.iErrCode || 1}`})
          return
        }
        cb&cb()
      },
      up(item,key){
        if(!key) return
        var vecChannel=this.channelInfo.vecChannel
        var beforeItem=vecChannel[key-1]
        this.changeOrder(item._id,beforeItem._id,function(){
          vecChannel.splice(key-1,1,item)
          vecChannel.splice(key,1,beforeItem)
        })
      },
      down(item,key){
        var vecChannel=this.channelInfo.vecChannel
        var len=vecChannel.length
        if(key>=len-1) return      
        var afterItem=vecChannel[key+1]
        this.changeOrder(item._id,afterItem._id,function(){
          vecChannel.splice(key+1,1,item)
          vecChannel.splice(key,1,afterItem)
        })
      },
      async del(item,index){
        var [err,data]=await to(delReq({
          id:item._id
        }))
        if(err){
          bus.$emit("toast",{title:`删除失败-${err.iErrCode || 1}`})
          return
        }
        bus.$emit("toast",{title:`删除成功`})
        this.channelInfo.vecChannel.splice(index,1)
      }
    }
  }
</script>

