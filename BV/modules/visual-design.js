var config = require('./config')
var render = require('./render')
var addWheel = require('./wheel')

var mainPic = {
    strImg: 'images/visual-design.jpg',
    strName: ""
}
var visualImgWidth
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
            visualImgWidth = (window.innerWidth - 217) * 0.587
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
    var liWidth = Number($('.visual-design li').css('width').slice(0, -2))
    var $lastLi
    if (type == 'pre') {
        var liHtml = '<li class="item" style="margin-left:-' + (liWidth + 90) + 'px;width:' + visualImgWidth + 'px">' + $('.visual-design li').last().html() + '</li>'
        $(".visual-design ul").prepend(liHtml)
        $lastLi = $('.visual-design li').first()
        $lastLi.animate({
            marginLeft: '0'
        }, 1000)
        var selected = $('.visual-design li.active')
        selected.removeClass('active').addClass('shrinkVisuImg').addClass('changeColorTrans').siblings().removeClass('shrinkVisuImg').removeClass('changeColorTrans')
        selected.prev().removeClass('shrinkVisuImg').removeClass('changeColorTrans').addClass('active')
        $('.visual-design li').last().remove()
    } else {
        $lastLi = $('.visual-design li').first()
        var liHtml = '<li class="item" style="width:' + visualImgWidth + 'px">' + $('.visual-design li').first().html() + '</li>'
        $(".visual-design ul").append(liHtml)
        $lastLi.animate({
            marginLeft: '-' + (liWidth + 90) + 'px'
        }, 1000)
        var selected = $('.visual-design li.active')
        selected.removeClass('active').addClass('shrinkVisuImg').addClass('changeColorTrans').siblings().removeClass('shrinkVisuImg').removeClass('changeColorTrans')
        selected.next().removeClass('shrinkVisuImg').removeClass('changeColorTrans').addClass('active')
        setTimeout(function() {
            $lastLi.remove()
        }, 1000)
    }
})

addWheel($('.visual-design')[0], {
    pre() {
        $(".visual-design .next").trigger('click')
    },
    next() {
        $(".visual-design .pre").trigger('click')
    }
})