var config = require('./config')
var render = require('./render')
var addWheel = require('./wheel')

var mainPic={
    strImg:'images/visual-design.jpg',
    strName:""
}

// 视觉设计
$.ajax({
    type: "GET",
    dataType: "jsonp",
    url: config.cgi + '/cgi/visual_list',
    success: function(data) {
        if (data && data.iErrCode === 0) {
            var html = `<li class="item {{active}}">
                        <img src="{{strImg}}">
                        <div class="txt-box">
                            <div class="txt">
                                <div class="txt-title">
                                    {{strName}}
                                </div>
                                <div class="txt-con">
                                </div>
                            </div>
                        </div>
                    </li>`
            var all = ""
            var vecVisual = data.vecVisual || []
            vecVisual.splice(1, 0, mainPic)
            vecVisual.forEach((visual, i) => {
                visual.active = i == 1 ? 'active' : ''
                all += render(html, visual)
            })
            $('#visual-design-container').html(all)
                //计算视觉设计内图片的宽度
            var visualImgWidth = (window.innerWidth - 217) * 0.587
            console.log(visualImgWidth)
            $('.visual-design ul li.item').css('width', visualImgWidth + 'px')
            return
        }
        console.log("拉取数据失败", data)
    },
    fail: function(xml, errType, err) {
        console.log("拉取数据失败", errType, err)
    }
})
$(".visual-design").on("click", "li", function() {
    var active = $('.visual-design li.active')
    var $this = $(this)
    if ($this[0] == active[0]) return
    var $tarIndex, $activeIndex
    var li = $('.visual-design li')
    li.each(function(i) {
            var $tar = $(this)
            if ($tar[0] == $this[0]) {
                $tarIndex = i
            } else if ($tar[0] == active[0]) {
                $activeIndex = i
            }
        })
        //在右边
    var inteval = Math.abs($tarIndex - $activeIndex)
    var _cb
    if ($tarIndex > $activeIndex) {
        _cb = function() {
            $(".pre.change").trigger('click')
        }
    } else {
        _cb = function() {
            $(".next.change").trigger('click')
        }
    }
    while (inteval--) {
        _cb()
    }
})
$('.visual-design').on('click', ".change", function() {
    var type = $(this).data('type')
    var li = $(".visual-design li")
    var originSrc = []
    li.each(function() {
        originSrc.push($(this).html())
    })
    if (type == 'pre') {
        originSrc.push(originSrc.shift())
    } else {
        originSrc.unshift(originSrc.pop())
    }
    li.each(function(i) {
        $(this).html(originSrc[i])
    })
})

addWheel($('.visual-design')[0], {
    pre() {
        $(".visual-design .next").trigger('click')
    },
    next() {
        $(".visual-design .pre").trigger('click')
    }
})