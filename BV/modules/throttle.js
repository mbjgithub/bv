function generate_throttle(_throttle) {
    var timer
    return function(target) {
        var args = Array.prototype.slice.call(arguments, 1)
        if (timer !== undefined) {
            clearTimeout(timer)
        }
        timer = setTimeout(function() {
            target.apply(null, args)
        }, _throttle)
    }
}


module.exports=generate_throttle