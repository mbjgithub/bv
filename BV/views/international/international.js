var render = require('modules/render')
var config = require('modules/config')

var renderChannelContent = require('modules/render-channel-content')

//获取国际数据
$.ajax({
    type: "GET",
    dataType: "jsonp",
    url: config.cgi + '/cgi/channel_list?type=1',
    success: function(data) {
        if (data && data.iErrCode === 0) {
            window.INTERNATION = data
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
    renderChannelContent(id, INTERNATION, 1)
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
    var html = `<li class="{{isActive}}">
                <img src="{{strImg}}">
                <p class="txt">
                    {{strDesc}}
                </p>
            </li>`
    var all = ''
    INTERNATION.vecChannel.some(channel => {
        channel.international.forEach(inter => {
            if (inter._id == id) {
                inter.vecMixed.forEach((mixed, i) => {
                    mixed.isActive = (i === 1 ? 'active' : '')
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
        var picCarTotalWidth = parseInt($('.picCarsoule-box .poster-list').css('width')) * 0.744
            //计算图片轮播图片的宽度
        $('.picCarsoule-box .poster-list li').css('width', picCarTotalWidth + 'px')
            // 计算图片轮播ul的向左偏移量
        console.log(picCarTotalWidth)
        $('.picCarsoule-box .poster-list ul').css('left', '-' + picCarTotalWidth / 6 * 5 + 'px')
        $('#js-header').css('z-index', 'auto')
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
    headerRange()
    $('.right-con .itemtype').removeClass('fadeinInter').addClass('fadeout').addClass('js-ds-none')
    renderChannelContent(INTERNATION.vecChannel[0] && INTERNATION.vecChannel[0]._id, INTERNATION, 1)
    $('.' + type).removeClass('js-ds-none').removeClass('fadeout').addClass('fadeinInter')
})

var addWheel = require('modules/wheel')

//专家智库滚动
addWheel($('.show-photo')[0], {
    next() {
        $(".think-tank .pre").trigger('click')
    },
    pre() {
        $(".think-tank .next").trigger('click')
    }
})

//合作案例滚动
addWheel($('.right-content-box')[0], {
    pre() {
        $('.business-hezuo .change img.pre').trigger('click')
    },
    next() {
        $('.business-hezuo .change img.next').trigger('click')
    }
})

require('modules/cooperation')

//频道内容翻页
$('.business-hezuo .change img').on('click', function(e) {
    var type = $(this).attr('data-type')
    var num = parseInt($('.business-hezuo ul li').length / 8)
    var topNum = parseInt(Math.abs(parseInt($('.business-hezuo ul').css('top'))) / 494)
    if (type == 'pre' && topNum != 0) {
        $('.business-hezuo ul').animate({
            top: '-' + (494 + 30) * (topNum - 1) + 'px'
        })
    } else if (type == 'next' && topNum < num && parseInt($('.business-hezuo ul li').length) != 8) {
        $('.business-hezuo ul').animate({
            top: '-' + (494 + 30) * (topNum + 1) + 'px'
        })
    }
})

//专家智库图片点击
$('#profession').on("click", 'li', function() {
    var active = $('#profession li.active')
    var $this = $(this)
    if ($this[0] == active[0]) return
    var $tarIndex, $activeIndex
    var li = $('#profession li')
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
            $(".think-tank .next").trigger('click')
        }
    } else {
        _cb = function() {
            $(".think-tank .pre").trigger('click')
        }
    }
    while (inteval--) {
        _cb()
    }
})

/**
 * 专家智库翻页
 */
$('.think-tank .change img').on('click', function(e) {
    var type = $(this).data('type')
    var li = $('.show-photo li')
    var liLength = li.length
    var $lastLi
        // var originArr = []
        // li.each(function() {
        //     originArr.push($(this).html())
        // })
    if (type == 'pre') {
        // originArr.push(originArr.shift())
        console.log(2222)
        $lastLi = $($('.show-photo li')[0]).detach()
        li.css('marginTop', 0)
        $lastLi.css('marginTop', '182px')
        $(".show-photo ul").append($lastLi)
        var selected = $('.show-photo li.active')
        selected.removeClass('active')
        selected.next().addClass('active')
        $lastLi.animate({
            marginTop: '0'
        }, 1000)
    } else {
        // originArr.unshift(originArr.pop())
        console.log(333)
        $lastLi = $($('.show-photo li')[liLength - 1]).detach()
        li.css('marginTop', 0)
        $lastLi.css('marginTop', '-182px')
        $(".show-photo ul").prepend($lastLi)
        var selected = $('.show-photo li.active')
        selected.removeClass('active')
        selected.prev().addClass('active')
        $lastLi.animate({
            marginTop: '-35px'
        }, 1000)
    }

    // li.each(function(i) {
    //     $(this).html(originArr[i])
    // })
})

//合作案例-图片轮播滚动
addWheel($('.picCarsoule-box .poster-list')[0], {
    pre() {
        $('.picCarsoule-box .poster-btn.poster-prev-btn').trigger('click')
    },
    next() {
        $('.picCarsoule-box .poster-btn.poster-next-btn').trigger('click')
    }
})

/**
 * 图片轮播翻页
 */
$('.picCarsoule-box .poster-btn').on('click', function(e) {
    var type = $(this).data('type')
    var li = $('.picCarsoule-box .poster-list li')
    var originArr = []
    li.each(function() {
        originArr.push($(this).html())
    })
    if (type == 'pre') {
        originArr.unshift(originArr.pop())
    } else {
        originArr.push(originArr.shift())
    }
    li.each(function(i) {
        $(this).html(originArr[i])
    })
})
require('modules/banner-interval')