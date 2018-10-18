var config=require('modules/config')

//获取国际首页数据
$.ajax({
    type: "GET",
    dataType: "jsonp",
    url: config.cgi + '/cgi/get_internation_img',
    success: function(data) {
        if (data && data.iErrCode === 0) {
            $('#firstImg').attr('src',data.strImg)
            return
        }
        console.log("拉取数据失败", data)
    },
    fail: function(xml, errType, err) {
        console.log("拉取数据失败", errType, err)
    }
})
