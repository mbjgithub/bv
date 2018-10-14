var render = require('modules/render')
var config = require('modules/config')

var renderChannelContent = require('modules/render-channel-content')

//获取文化数据
$.ajax({
    type: "GET",
    dataType: "jsonp",
    url: config.cgi + '/cgi/channel_list?type=2',
    success: function(data) {
        if (data && data.iErrCode === 0) {
            window.CULTURE = data
            var $inter = $('#case')
            var html = '<a href="javascript:;" data-id="{{_id}}" data-range="2">{{strName}}</a>'
            var all = ''

            data.vecChannel.forEach(function(channel) {
                all += render(html, channel)
            })
            $inter.append($(all))
            return
        }
        console.log("拉取数据失败", data)
    },
    fail: function(xml, errType, err) {
        console.log("拉取数据失败", errType, err)
    }
})

//频道左边channel名称点击事件
$('#case').on('click', 'a', function(e) {
    var id = e.target.dataset.id
    renderChannelContent(id, CULTURE, 2)
    $('.picCarsoule-box').addClass('picCarsouelFadeOut').addClass('js-ds-none')
    $('.left-nav .txt-box .txt .item a').removeClass('active')
    $(this).parent().siblings().removeClass('active')
    $(this).addClass('active').siblings().removeClass('active')
    $('.right-con .itemtype').addClass('fadeout').addClass('js-ds-none')
    $('.right-con .right-content-box').removeClass('js-ds-none').addClass('fadein')
    e.stopPropagation()
})


require('lib/picCarousel.js')
    //频道内容的某一项点击事件
var case_content_cached = {}
$("#case_detail").on('click', '.item', function(e) {
    var $this = $(this)
    var id = $this.data('contentid')
    if (case_content_cached[id]) {
        _append()
        return
    }
    var html = `<li class="poster-item {{isActive}}">
                <img src="{{strImg}}">
                <p class="txt">
                    {{strDesc}}
                </p>
            </li>`
    var all = ''
    CULTURE.vecChannel.some(channel => {
        channel.culture.forEach(inter => {
            if (inter._id == id) {
                var len = inter.vecMixed.length
                if (len && len % 2 == 0) {
                    inter.vecMixed.push(inter.vecMixed[0])
                }
                inter.vecMixed.forEach((mixed, i) => {
                    mixed.isActive = i ? "" : 'active'
                    all += render(html, mixed)
                })
                return true
            }
        })
    })
    case_content_cached[id] = all
    _append()

    function _append() {
        $('#case_content').html(case_content_cached[id])
        $('.picCarsoule-box').removeClass('js-ds-none').removeClass('picCarsouelFadeOut')
        var outer = $("#TagName").prop("outerHTML")
        $("#TagName").remove()
        $('.picCarsoule-con').prepend($(outer))
        let totalWidth = (window.innerWidth - 217) * 0.8
        let totalHeight = window.innerHeight * 0.6
        $("#TagName").PicCarousel({
            width: totalWidth,
            height: totalHeight,
            posterWidth: totalWidth * 0.7,
            posterHeight: totalHeight * 0.7,
            speed: 200
        });
        e.stopPropagation()
    }
})


//左边导航切换
$('.left-nav .txt-box .txt .item').on('click', function(e) {
    var type = e.target.dataset.type
    var range = e.target.dataset.range
    $('.picCarsoule-box').addClass('picCarsouelFadeOut').addClass('js-ds-none')
    $('.left-nav .txt-box .txt .item').removeClass('active')
    $('.left-nav .txt-box .txt .item a').removeClass('active')
    $(e.target).parent().removeClass('active')
    if (range == 1 && $(this).find('.son-title').length != 0) {
        var height = $(this).find('.son-title').height() + 28
        $(this).animate({
            height: height + 'px',
            overflow: 'visible'
        })
        $(this).find('a').removeClass('active').eq(0).addClass('active')
    } else if (range == 1 && $(this).find('.son-title').length == 0) {
        $(this).siblings().animate({
            height: '18px',
            overflow: 'hidden'
        })
        $(this).addClass('active')
    } else if (range == 2) {
        $(e.target).addClass('active').siblings().removeClass('active')
    }
    $('.right-con .itemtype').removeClass('fadeinInter').addClass('fadeout').addClass('js-ds-none')
    renderChannelContent(CULTURE.vecChannel[0] && CULTURE.vecChannel[0]._id, CULTURE, 2)
    $('.' + type).removeClass('js-ds-none').removeClass('fadeout').addClass('fadeinInter')
})


require('modules/visual-design')
require('modules/banner-interval')

//左边导航点击
$('.left-nav .txt-box .txt .item').on('click', function(e) {
    var type = e.target.dataset.type
    var range = e.target.dataset.range
    if (range == 1 && $(this).find('.son-title').length != 0) {
        var height = $(this).find('.son-title').height() + 28
        $(this).animate({
            height: height + 'px',
            overflow: 'visible'
        })
        $(this).siblings().removeClass('active')
        $(this).find('a').removeClass('active').eq(0).addClass('active')
    } else if (range == 1 && $(this).find('.son-title').length == 0) {
        $(this).siblings().animate({
            height: '18px',
            overflow: 'hidden'
        })
        $(this).siblings().removeClass('active')
        $(this).addClass('active')
    } else if (range == 2) {
        $(e.target).addClass('active').siblings().removeClass('active')
    }
    $('.right-con .itemtype').addClass('fadeout').addClass('js-ds-none')
    $('.' + type).removeClass('js-ds-none').addClass('fadein')
})
require('modules/cooperation')