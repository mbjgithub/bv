var addWheel=require('./wheel')

//合作案例蒙层滚动
addWheel($('.picCarsoule-box')[0], {
    pre() {
        $(".poster-prev-btn").trigger('click')
    },
    next() {
        $(".poster-next-btn").trigger('click')
    }
})