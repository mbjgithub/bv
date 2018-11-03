var fns={
    type: function(obj) {
        if (obj === null) return 'null'
        else if (obj === undef) return 'undefined'
        var m = /\[object (\w+)\]/.exec(Object.prototype.toString.call(obj))
        return m ? m[1].toLowerCase() : ''
    },
    formate:function(time) {
	    if (!time) return ''
	    time = +time
	    var date = new Date(time)
	    return date.toDateString()
	},
	escape:function(str) {
	    str = str || ''
	    return str.replace(/&/g, '&amp;')
	        .replace(/</g, '&lt;')
	        .replace(/>/g, '&gt;')
	        .replace(/'/g, '&#39;')
	        .replace(/"/g, '&quot;')
	}
}


module.exports=fns