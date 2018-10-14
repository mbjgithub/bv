var fns=require('./fns')

function render(str, data) {
    return str.replace(/{{([\w_]+)}}/g, function(all, key) {
        return fns.escape(data[key])
    })
}

module.exports=render