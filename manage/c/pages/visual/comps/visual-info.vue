<template>
  <div class="mod_manage_table">
    <table>
      <thead>
        <tr class="table_title">
          <th class="ta_center">序号</th>
          <th class="ta_center">标题</th>
          <th class="item_control">内容操作</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="visualInfo.vecVisual&&visualInfo.vecVisual.length">
          <tr v-for="(item,key) in visualInfo.vecVisual">
            <td class="ta_center"><span>{{key+1}}</span></td>
            <td class="ta_center"><span>{{item.strName}}</span></td>
            <td class="item_control">
              <a href="javascript:void(0);"
                  v-for="op in operate"   
                  @click="onDeal(op.opStr,item,key)">{{op.title}}</a>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td class="ta_center" colspan="3">暂时没有数据</td>
          </tr>
        </template>
      </tbody>
    </table>  
                 
  </div>
</template>

<script>  
  import changeVisualOrderReq from 'models/change_visual_order'
  import delReq from '../fetchers/del-visual'
  export default {
    props:['visualInfo'],
    data(){
      return {
        isShow:false,
        info:'',
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
      onDeal(name,item,key){
        this[name]&&this[name](item,key)
      },
      edit(item,key){
        this.$emit("edit",item,key)
      },
      async changeOrder(visualId1,visualId2,cb){
        var [err,data]=await to(changeVisualOrderReq({
          visualId1,
          visualId2
        }))
        if(err){
          bus.$emit("toast",{title:`改变位置失败-${err.iErrCode || 1}`})
          return
        }
        cb&cb()
      },
      up(item,key){
        if(!key) return
        var vecVisual=this.visualInfo.vecVisual
        var beforeItem=vecVisual[key-1]
        this.changeOrder(item._id,beforeItem._id,function(){
          vecVisual.splice(key-1,1,item)
          vecVisual.splice(key,1,beforeItem)
        })
      },
      down(item,key){
        var vecVisual=this.visualInfo.vecVisual
        var len=vecVisual.length
        if(key>=len-1) return      
        var afterItem=vecVisual[key+1]
        this.changeOrder(item._id,afterItem._id,function(){
          vecVisual.splice(key+1,1,item)
          vecVisual.splice(key,1,afterItem)
        })
      },
      async del(item,index){
        var vecVisual=this.visualInfo.vecVisual
        if(vecVisual.length<=1){
          bus.$emit("toast",{title:'至少要有一条内容'})
          return
        }
        var [err,data]=await to(delReq({
          id:item._id
        }))
        if(err){
          bus.$emit('toast',{title:`删除失败-${err.iErrCode || 1}`})
          return
        }
        bus.$emit('toast',{title:`删除成功`})
        vecVisual.splice(index,1)
      },

    }
  }
</script>