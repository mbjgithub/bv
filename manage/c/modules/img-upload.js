/**
 *图片上传功能
 */
import cgi from 'modules/interface'
var url=cgi.upload_img
var defType=['jpg','jpeg','png','gif']
var defSize=2
function noop(){}  

var handler={
  handlerFile: function(file,options) {
        options.success=options.success||noop
        options.showTip=options.showTip||noop
        options.progress=options.progress||noop
        options.type=options.type||defType
        options.size=options.size||defSize        //默认2M
        var picSize=options.size&&options.size*1024
        var __picture={}
        var reader = new FileReader()
        if(!file) return
        if (file.type.match(new RegExp(`image+/(${options.type.join('|')})$`),'i')) {
            var size = file.size / 1024   //kb
            if (size && size <= picSize) {
                reader.onload = function(e) {
                    var width, height
                    var data = e.target.result
                    //加载图片获取图片真实宽度和高度
                    var image = new Image()
                    image.src = data
                    image.onload = function() {
                        __picture.width = image.width
                        __picture.height = image.height || 88
                    }
                }
                reader.readAsDataURL(file)
                handler.fileSumbit(file, options,function(err,data) {
                    if(data&&data.iErrCode==0){
                      __picture.url=data.url
                      options.success(null,__picture)
                    }else{
                      options.fail({errCode:3,msg:"可能网络出了点问题"})       //后台返回失败
                    }
                })
            } else {
                options.showTip({errCode:1,msg:`图片大小必须小于${options.size}M`}, true)
            }
        } else {
          var typeTips= options.type.map(type=>{
                  return `.${type}`
                }).join('/')
            options.showTip({errCode:2,msg:`图片类型必须是${typeTips}`}, true)   //'图片类型必须是.gif/.jpg/.png/.jpeg'
        }
    },
    fileSumbit: function(file, options,cb) {
        var xhr
        var formdata = new FormData()
        // formdata.append('bzid', 'vmall')    //正式环境
        // formdata.append('bzid', 'imongo')    //测试环境
        formdata.append('vb', file)
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest()
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP")
        }
        xhr.withCredentials = true
        xhr.open('post', url)
        xhr.upload.onprogress = function(event) {
            if (event.lengthComputable) {
                options.progress(event.loaded,event.total)
                // complete = (event.loaded / event.total * 100 | 0)
                // $('#img_item').find('span').css('width', complete + '%').text('上传中...')
                // $('#write_picture').attr('disabled', true)
                // $('.icon_plus').hide()
            }
        }
        xhr.onreadystatechange = function() {　　　　
            if (xhr.readyState == 4) {
                //当响应完成时初始化进度
                // handler.completeInit()
                if (xhr.status == 200 && xhr.responseText) {
                    var text = xhr.responseText || ''
                    try{
                        var data=JSON.parse(text)
                        cb&&cb(null,data)
                    }catch(err){
                        cb && cb("data retur error")
                    }
                } else {
                    cb && cb("upload error")
                }
            }　　　　
        }
        xhr.send(formdata)
    }
}


export default handler