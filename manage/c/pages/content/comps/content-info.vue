<template>
  <div class="mod_manage_table">
    <table>
      <thead>
        <tr class="table_title">
          <th class="ta_center">序号</th>
          <th class="ta_center">内容名称</th>
          <th class="ta_center">所属频道</th> 
          <th class="ta_center">包含图片</th> 
          <th class="item_control">内容操作</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="contentInfo.vecContent&&contentInfo.vecContent.length">
          <tr v-for="(item,key) in contentInfo.vecContent">
            <td class="ta_center"><span>{{key+1}}</span></td>
            <td class="ta_center"><span>{{item.strTitle}}</span></td>
            <td class="ta_center"><span>{{contentInfo.strName}}</span></td>
            <td class="ta_center"><span>{{(item.vecMixed ||[]).length}}</span></td>
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
  import changeContentOrderReq from 'models/change_content_order'
  import delReq from '../fetchers/del-content'
  export default {
    props:['contentInfo'],
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
      async changeOrder(contentId1,contentId2,cb){
        var [err,data]=await to(changeContentOrderReq({
          contentId1,
          contentId2
        }))
        if(err){
          bus.$emit("toast",{title:`改变位置失败-${err.iErrCode || 1}`})
          return
        }
        cb&cb()
      },
      up(item,key){
        if(!key) return
        var vecContent=this.contentInfo.vecContent
        var beforeItem=vecContent[key-1]
        this.changeOrder(item._id,beforeItem._id,function(){
          vecContent.splice(key-1,1,item)
          vecContent.splice(key,1,beforeItem)
        })
      },
      down(item,key){
        var vecContent=this.contentInfo.vecContent
        var len=vecContent.length
        if(key>=len-1) return      
        var afterItem=vecContent[key+1]
        this.changeOrder(item._id,afterItem._id,function(){
          vecContent.splice(key+1,1,item)
          vecContent.splice(key,1,afterItem)
        })
      },
      async del(item,index){
        var vecContent=this.contentInfo.vecContent
        if(vecContent.length<=1){
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
        vecContent.splice(index,1)
      },

    }
  }
</script>