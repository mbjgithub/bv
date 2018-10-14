require('lib/fullPage')

$(document).ready(function() {
    var double = localStorage.getItem("double")
        // 红色背景
    var red = `<div class="part-one">
        <div class="animate1">
            <img src="./images/animate/bg-red.png" />
        </div>
        <div class="animate2">
            <img src="./images/animate/banner-red.png" />
        </div>
        <div class="animatetxt">
            <div class="txt1">
                <img src="./images/animate/animation-txt1.png" />
            </div>
            <div class="txt2">
                <img src="./images/animate/animation-txt2.png" />
            </div>

        </div>
        <div class="next-page" onclick="$.fn.fullpage.moveTo('page2')">
            <img src="./images/icon/icon-arrow-white.png">
        </div>
    </div>`
        // 黑色背景
    var black = `
    <div class="part-one">
        <div class="animate1">
            <img src="./images/animate/bg-black.png" />
        </div>
        <div class="animate2">
            <img src="./images/animate/banner-black.png" />
        </div>
        <div class="animatetxt">
            <div class="txt1">
                <img src="./images/animate/animation-txt1.png" />
            </div>
            <div class="txt2">
                <img src="./images/animate/animation-txt2.png" />
            </div>

        </div>
        <div class="next-page" onclick="$.fn.fullpage.moveTo('page2')">
            <img src="./images/icon/icon-arrow-white.png">
        </div>
    </div>`
    var converse
    var inner
    if (double == 2) {
        converse = 1
        inner = black
    } else {
        converse = 2
        inner = red
    }
    console.log("1111111",double,converse)
    localStorage.setItem("double", converse)
    document.getElementById("first_page").innerHTML = inner
    $("#fullpage").css('visibility', "visible")
    $('#fullpage').fullpage({
        anchors: ['page1', 'page2', 'page3'],
        loopHorizontal: false,
        controlArrows: false,
        afterLoad: function(anchorLink) {
            $('.section.active').removeClass('fadeout')
            console.log(22222,anchorLink)
            if (anchorLink !== 'page1') {
                $('#js-header').removeClass('header-animate')
                $('.nav-icon img').eq(0).addClass('js-ds-none')
                $('.nav-icon img').eq(1).removeClass('js-ds-none')
                $('.lang').css('color', '#000')
            } else {
                $('#js-header').addClass('header-animate')
                $('.nav-icon img').eq(0).removeClass('js-ds-none')
                $('.nav-icon img').eq(1).addClass('js-ds-none')
                $('.lang').css('color', '#ececec')
            }
        }
    })

    // 核心团队图片点击翻页
    $('#core_leader_list').on("click", "li", function() {
        console.log("CLICK")
        var active = $('#core_leader_list li.active')
        var $this = $(this)
        if ($this[0] == active[0]) return
        var $tarIndex, $activeIndex
        var li = $('#core_leader_list li')
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
                $("#core_leader .pre").trigger('click')
            }
        } else {
            _cb = function() {
                $("#core_leader .next").trigger('click')
            }
        }
        while (inteval--) {
            _cb()
        }
    })

    //核心团队左右箭头点击翻页
    $("#core_leader img").on("click", function(e) {
        var $this = $(this)
        var type = $this.data('type')
        var li = $('#core_leader_list li')
        var active = $('#core_leader_list li.active')
        var srcArr = []
        li.each(function() {
            srcArr.push($(this).html())
        })
        if (type == 'pre') {
            srcArr.push(srcArr.shift())
        } else {
            srcArr.unshift(srcArr.pop())
        }

        li.each(function(i) {
            $(this).html(srcArr[i])
        })
    })
});

$('.nav-ul').on('click', 'a', function() {
    var type = $(this).attr('data-type')
    $.fn.fullpage.moveTo('page2', Number(type))
    $(this).addClass('active').siblings().removeClass('active')
})