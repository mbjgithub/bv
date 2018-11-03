// 博闻伟达国际 banner轮播
$('.pagenation span').on('click', function() {
    var type = $(this).attr('data-type')
    if (type == 0 && !$(this).hasClass('active')) {
        $('.inter-two-pic-box .con-box').animate({
            left: 0
        })
    } else if (type == 1 && !$(this).hasClass('active')) {
        $('.inter-two-pic-box .con-box').animate({
            left: '-100%'
        })
    }
    $(this).addClass('active').siblings().removeClass('active')
    $('.inter-two-pic-box .con-box').find('.animation-flag').addClass('fadeinInter')
})