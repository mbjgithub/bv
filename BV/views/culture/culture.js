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
            var html = '<a href="javascript:;" data-id="{{_id}}" data-range="2">{{strName}}</a><br>'
            var all = ''

            data.vecChannel.forEach(function(channel) {
                all += render(html, channel)
            })
            $inter.append($(all))
            $('.part-eight .left-nav .txt-box a').on('mouseover', function(e) {
                if ($(this).hasClass('active')) return
                $(this).addClass('overin').removeClass('overout').siblings().removeClass('overin')
                e.stopPropagation()
            })
            $('.part-eight .left-nav .txt-box a').on('mouseout', function(e) {
                if ($(this).hasClass('active')) return
                $(this).addClass('overout').removeClass('overin').siblings().removeClass('overout')
                e.stopPropagation()
            })
            setTimeout(function() {
                data.vecChannel.forEach(function(channel) {
                    channel.culture.forEach(function(vecMixed) {
                        vecMixed.vecMixed.forEach(function(item) {
                            var imgItem = new Image()
                            imgItem.src = item.strImg
                            imgItem.onload = function() {
                                console.log('预加载图片')
                            }
                        })
                    })
                })
            }, 0)
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
    $(this).removeClass('overin').removeClass('overout')
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
    CULTURE.vecChannel.some(channel => {
        channel.culture.forEach(inter => {
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
            overflow: 'visible',
            marginBottom: 0
        })
        $(this).find('a').removeClass('active').eq(0).addClass('active')
    } else if (range == 1 && $(this).find('.son-title').length == 0) {
        $(this).siblings().animate({
            height: '18px',
            overflow: 'hidden',
            marginBottom: '10px'
        })
        $(this).addClass('active')
    } else if (range == 2) {
        $(e.target).addClass('active').siblings().removeClass('active')
    }
    $('.left-nav .txt-box .txt .item.active .oneLevelTile').removeClass('overin').removeClass('overout')
    $('.left-nav .txt-box .txt .item a.active').removeClass('overin').removeClass('overout')
    headerRange()
    $('.right-con .itemtype').removeClass('fadeinInter').addClass('fadeout').addClass('js-ds-none')
    renderChannelContent(CULTURE.vecChannel[0] && CULTURE.vecChannel[0]._id, CULTURE, 2)
    $('.' + type).removeClass('js-ds-none').removeClass('fadeout').addClass('fadeinInter')
})


require('modules/visual-design')
require('modules/banner-interval')

//左边导航点击
// $('.left-nav .txt-box .txt .item').on('click', function(e) {
//     var type = e.target.dataset.type
//     var range = e.target.dataset.range
//     if (range == 1 && $(this).find('.son-title').length != 0) {
//         var height = $(this).find('.son-title').height() + 28
//         $(this).animate({
//             height: height + 'px',
//             overflow: 'visible'
//         })
//         $(this).siblings().removeClass('active')
//         $(this).find('a').removeClass('active').eq(0).addClass('active')
//     } else if (range == 1 && $(this).find('.son-title').length == 0) {
//         $(this).siblings().animate({
//             height: '18px',
//             overflow: 'hidden'
//         })
//         $(this).siblings().removeClass('active')
//         $(this).addClass('active')
//     } else if (range == 2) {
//         $(e.target).addClass('active').siblings().removeClass('active')
//     }
//     $('.right-con .itemtype').addClass('fadeout').addClass('js-ds-none')
//     $('.' + type).removeClass('js-ds-none').addClass('fadein')
// })
require('modules/cooperation')

var addWheel = require('modules/wheel')
    //合作案例滚动
addWheel($('.right-content-box')[0], {
    pre() {
        console.log(1111)
        $('.business-hezuo .change img.pre').trigger('click')
    },
    next() {
        $('.business-hezuo .change img.next').trigger('click')
    }
})

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
    var liWidth = Number($('.picCarsoule-box .poster-list li').css('width').slice(0, -2))
    var liLength = li.length
    var $lastLi
    if (type == 'pre') {
        $lastLi = $($('.picCarsoule-box .poster-list li')[liLength - 1]).detach()
        $lastLi.css('marginLeft', '-' + liWidth + 'px')
        $(".picCarsoule-box .poster-list ul").prepend($lastLi)
        var selected = $('.picCarsoule-box .poster-list li.active')
        selected.removeClass('active').addClass('shrinkPosterImg').siblings().removeClass('shrinkPosterImg')
        selected.prev().removeClass('shrinkPosterImg').addClass('active')
        $lastLi.animate({
            marginLeft: '0'
        }, 1000)
    } else {
        $lastLi = $($('.picCarsoule-box .poster-list li')[0]).detach()
        var $firstLi = $($('.picCarsoule-box .poster-list li')[0])
        $firstLi.css('marginLeft', liWidth + 'px')
        $(".picCarsoule-box .poster-list ul").append($lastLi)
        var selected = $('.picCarsoule-box .poster-list li.active')
        selected.removeClass('active').addClass('shrinkPosterImg').siblings().removeClass('shrinkPosterImg')
        selected.next().removeClass('shrinkPosterImg').addClass('active')
        $firstLi.animate({
            marginLeft: '0'
        }, 1000)
    }
})

//左边导航动画
$('.part-eight .left-nav .txt-box .oneLevelTile,.part-eight .left-nav .txt-box a').on('mouseover', function(e) {
    if ($(this).hasClass('active') || $(this).parent('.item').hasClass('active')) return
    $(this).addClass('overin').removeClass('overout').siblings().removeClass('overin')
    e.stopPropagation()
})
$('.part-eight .left-nav .txt-box .oneLevelTile,.part-eight .left-nav .txt-box a').on('mouseout', function(e) {
    if ($(this).hasClass('active') || $(this).parent('.item').hasClass('active')) return
    $(this).addClass('overout').removeClass('overin').siblings().removeClass('overout')
    e.stopPropagation()
})