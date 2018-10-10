

var prefix = "", _addEventListener, onwheel, support,addWheelListener;

// detect event model
if ( window.addEventListener ) {
    _addEventListener = "addEventListener";
} else {
    _addEventListener = "attachEvent";
    prefix = "on";
}

// detect available wheel event
support = "onwheel" in document.createElement("div") ? "wheel" : // 各个厂商的高版本浏览器都支持"wheel"
          document.onmousewheel !== undefined ? "mousewheel" : // Webkit 和 IE一定支持"mousewheel"
          "DOMMouseScroll"; // 低版本firefox

addWheelListener = function( elem, callback, useCapture ) {
    _addWheelListener( elem, support, callback, useCapture );

    // handle MozMousePixelScroll in older Firefox
    if( support == "DOMMouseScroll" ) {
        _addWheelListener( elem, "MozMousePixelScroll", callback, useCapture );
    }
};

function _addWheelListener( elem, eventName, callback, useCapture ) {
    elem[ _addEventListener ]( prefix + eventName, support == "wheel" ? callback : function( originalEvent ) {
        !originalEvent && ( originalEvent = window.event );

        // create a normalized event object
        var event = {
            // keep a ref to the original event object
            originalEvent: originalEvent,
            target: originalEvent.target || originalEvent.srcElement,
            type: "wheel",
            deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
            deltaX: 0,
            deltaZ: 0,
            preventDefault: function() {
                originalEvent.preventDefault ?
                    originalEvent.preventDefault() :
                    originalEvent.returnValue = false;
            }
        };
        
        // calculate deltaY (and deltaX) according to the event
        if ( support == "mousewheel" ) {
            event.deltaY = - 1/40 * originalEvent.wheelDelta;
            // Webkit also support wheelDeltaX
            originalEvent.wheelDeltaX && ( event.deltaX = - 1/40 * originalEvent.wheelDeltaX );
        } else {
            event.deltaY = originalEvent.detail;
        }

        // it's time to fire the callback
        return callback( event );

    }, useCapture || false );
}


/**
 * 滚动翻页
 *
 **/

function addWheel(el,opts){
    var throttle = generate_throttle(200)
    addWheelListener(el, function(e) {
        throttle(function() {
            if(e.deltaY>0){
                opts.next&&opts.next(el)
            }else{
               opts.next&&opts.pre(el)
            }
        })
    })
}

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



window.common={
    addWheel:addWheel,
    generate_throttle:generate_throttle
}


