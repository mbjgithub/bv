import fns from 'modules/fns'

module.exports = {
  get: function (key) {
    var cookies = this._get()
    if (key) {
      return cookies ? cookies[key] : null
    } else {
      return cookies
    }
  },
  remove: function (key, domain, path) {
    domain = domain || location.hostname
    document.cookie = encodeURIComponent(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + "; domain=" + domain + (path ? "; path=" + path : "");
    return true;
  },
  _get: function () {
    var cookies = {}
    var cookie = document.cookie;
    cookie = cookie.split(';')
    for (var i = 0, len = cookie.length; i < len; i++) {
      var pair = cookie[i].replace(/^\s+/, '').split('=')
      cookies[pair[0]] = pair[1]
    }
    return cookies
  },
  set: function (key, value, expire, domain, path) {
    var sExpires = "";
    switch (fns.type(expire)) {
      case 'number':
      case 'undefined':
        sExpires = expire === Infinity || expire === undefined ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + expire;
        break;
      case 'string':
        sExpires = "; expires=" + expire;
        break;
      case 'date':
        sExpires = "; expires=" + expire.toUTCString();
        break;
    }
    domain = domain || location.hostname
    path = path || '/'
    document.cookie = [key, '=', escape(value), sExpires, ';domain=', domain, ';path=', path].join('')
  }
}