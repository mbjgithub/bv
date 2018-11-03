var render = require('./render')

var case_detail_cached = {}
var lastId

// 渲染某一个频道内容
function renderChannelContent(id, DATA, type) {
    if (!id) return
    if (id === lastId) return
    lastId = id
    if (case_detail_cached[id]) {
        _append()
        return
    }
    var key = getKey(type)
    var html = `<li class="item" data-contentId="{{_id}}">
        <img src="{{strCover}}">
        <div class="title" title="{{strTitle}}">
            {{strTitle}}
        </div>
        <div class="address">
            <span class="en" title="{{strLocationEn}}">{{strLocationEn}}</span><br>
            <span class="ch">{{strLocationZh}}</span>
        </div>
        <div class="date" style="padding-left:10px;">
            {{strTime}}
        </div>
    </li>`
    var all = ''
    DATA.vecChannel.some(channel => {
        if (id == channel._id) {
            if (!channel[key].length) {
                //还没有配置数据
                return true
            }

            channel[key].forEach(inter => {
                // inter.strTimeFormate = formate(inter.strTime)
                all += render(html, inter)
            })
            return true
        }
    })
    case_detail_cached[id] = all
    _append()

    function _append() {
        var $case_detail = $("#case_detail")
        $case_detail.css('top', '0px') //初始化
        var $change = $case_detail.find('.change')
        $case_detail.html(case_detail_cached[id])
        $case_detail.append($change)
    }
}


function getKey(type) {
    return type == 2 ? 'culture' : 'international'
}

module.exports = renderChannelContent