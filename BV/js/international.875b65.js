!function(t){var e={};function n(i){if(e[i])return e[i].exports;var s=e[i]={i:i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(i,s,function(e){return t[e]}.bind(null,s));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="js/",n(n.s=10)}([function(t,e,n){var i=n(3);t.exports=function(t,e){return t.replace(/{{([\w_]+)}}/g,function(t,n){return i.escape(e[n])})}},function(t,e,n){var i,s,a,o="";function r(t,e,n,a){t[i](o+e,"wheel"==s?n:function(t){!t&&(t=window.event);var e={originalEvent:t,target:t.target||t.srcElement,type:"wheel",deltaMode:"MozMousePixelScroll"==t.type?0:1,deltaX:0,deltaZ:0,preventDefault:function(){t.preventDefault?t.preventDefault():t.returnValue=!1}};return"mousewheel"==s?(e.deltaY=-.025*t.wheelDelta,t.wheelDeltaX&&(e.deltaX=-.025*t.wheelDeltaX)):e.deltaY=t.detail,n(e)},a||!1)}window.addEventListener?i="addEventListener":(i="attachEvent",o="on"),s="onwheel"in document.createElement("div")?"wheel":void 0!==document.onmousewheel?"mousewheel":"DOMMouseScroll",a=function(t,e,n){r(t,s,e,n),"DOMMouseScroll"==s&&r(t,"MozMousePixelScroll",e,n)};var c=n(7);t.exports=function(t,e){var n=c(200);a(t,function(i){n(function(){i.deltaY>0?e.next&&e.next(t):e.next&&e.pre(t)})})}},function(t,e,n){var i="http://193.112.82.136:1337";n(4).isTest&&(i="http://127.0.0.1:1337"),t.exports={cgi:i}},function(t,e){var n={type:function(t){if(null===t)return"null";if(t===undef)return"undefined";var e=/\[object (\w+)\]/.exec(Object.prototype.toString.call(t));return e?e[1].toLowerCase():""},formate:function(t){return t?(t=+t,new Date(t).toDateString()):""},escape:function(t){return(t=t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;").replace(/"/g,"&quot;")}};t.exports=n},function(t,e,n){t.exports={isTest:!1}},function(t,e,n){var i,s=n(0),a={};t.exports=function(t,e,n){if(t&&t!==i)if(i=t,a[t])c();else{var o=function(t){return 2==t?"culture":"international"}(n),r="";e.vecChannel.some(e=>{if(t==e._id)return!e[o].length||(e[o].forEach(t=>{r+=s('<li class="item" data-contentId="{{_id}}">\n        <img src="{{strCover}}">\n        <div class="title" title="{{strTitle}}">\n            {{strTitle}}\n        </div>\n        <div class="address">\n            <span class="en" title="{{strLocationEn}}">{{strLocationEn}}</span><br>\n            <span class="ch">{{strLocationZh}}</span>\n        </div>\n        <div class="date" style="padding-left:10px;">\n            {{strTime}}\n        </div>\n    </li>',t)}),!0)}),a[t]=r,c()}function c(){var e=$("#case_detail"),n=e.find(".change");e.html(a[t]),e.append(n)}}},function(t,e){!function(t){var e=function(){function e(e,n){this.settings=t.extend(!0,t.fn.PicCarousel.defaults,n||{}),this.element=e,this.init()}return e.prototype={init:function(){var t=this;t.poster=t.element,t.posterItemMain=t.poster.find("ul.poster-list"),t.nextBtn=t.poster.find("div.poster-next-btn"),t.prevBtn=t.poster.find("div.poster-prev-btn"),t.posterItems=t.poster.find("li.poster-item"),t.posterItems.length%2==0&&(t.posterItemMain.append(t.posterItems.eq(0).clone()),t.posterItems=t.posterItemMain.children),t.posterFirstItem=t.posterItems.first(),t.posterLastItem=t.posterItems.last(),t.rotateFlag=!0,t.setSettingValue(),t.setPosterPost(),t.nextBtn.click(function(){t.rotateFlag&&(t.rotateFlag=!1,t.carouseRotate("left"))}),t.prevBtn.click(function(){t.rotateFlag&&(t.rotateFlag=!1,t.carouseRotate("right"))}),t.settings.autoPlay&&(t.autoPlay(),t.poster.hover(function(){window.clearInterval(t.timer)},function(){t.autoPlay()}))},autoPlay:function(){var t=this;t.timer=window.setInterval(function(){t.nextBtn.click()},t.settings.delay)},carouseRotate:function(e){var n=this,i=[];"left"===e?(n.posterItems.each(function(){var e=t(this),s=e.prev().get(0)?e.prev():n.posterLastItem,a=s.width(),o=s.height(),r=s.css("zIndex"),c=s.css("opacity"),l=s.css("left"),h=s.css("top");i.push(r),e.animate({width:a,height:o,opacity:c,left:l,top:h},n.settings.speed,function(){n.rotateFlag=!0})}),n.posterItems.each(function(e){t(this).css("zIndex",i[e])})):"right"===e&&(n.posterItems.each(function(){var e=t(this),s=e.next().get(0)?e.next():n.posterFirstItem,a=s.width(),o=s.height(),r=s.css("zIndex"),c=s.css("opacity"),l=s.css("left"),h=s.css("top");i.push(r),e.animate({width:a,height:o,opacity:c,left:l,top:h},n.settings.speed,function(){n.rotateFlag=!0})}),n.posterItems.each(function(e){t(this).css("zIndex",i[e])}));var s,a=-8888;n.posterItems.each(function(t){a<+i[t]&&(a=+i[t],s=t)}),n.posterItems.each(function(e){var n=t(this);e==s?n.addClass("active"):n.removeClass("active")})},setPosterPost:function(){var e=this,n=e.posterItems.slice(1),i=n.length/2,s=n.slice(0,i),a=Math.floor(e.posterItems.length/2),o=n.slice(i),r=e.settings.posterWidth,c=e.settings.posterHeight,l=(e.settings.width-e.settings.posterWidth)/2/a,h=(e.settings.width-e.settings.posterWidth)/2+r;s.each(function(n){a--,r*=e.settings.scale,c*=e.settings.scale;var i=n;t(this).css({zIndex:a,width:r,height:c,opacity:1/++i,left:h+ ++n*l-r,top:e.setVertucalAlign(c)})});var u=s.last().width(),d=s.last().height(),p=Math.floor(e.posterItems.length/2);o.each(function(n){t(this).css({zIndex:n,width:u,height:d,opacity:1/p,left:n*l,top:e.setVertucalAlign(d)}),u/=e.settings.scale,d/=e.settings.scale,p--})},setVertucalAlign:function(t){var e=this.settings.verticalAlign;return"middle"===e?(this.settings.height-t)/2:"top"===e?0:"bottom"===e?this.settings.height-t:(this.settings.height-t)/2},setSettingValue:function(){var t=this;t.poster.css({width:t.settings.width,height:t.settings.height}),t.posterItemMain.css({width:t.settings.width,height:t.settings.height});var e=(t.settings.width-t.settings.posterWidth)/2;t.nextBtn.css({width:e,height:t.settings.height,zIndex:Math.ceil(t.posterItems.length/2)}),t.prevBtn.css({width:e,height:t.settings.height,zIndex:Math.ceil(t.posterItems.length/2)}),t.posterFirstItem.css({width:t.settings.posterWidth,height:t.settings.posterHeight,top:t.setVertucalAlign(t.settings.posterHeight),left:e,zIndex:Math.floor(t.posterItems.length/2)})}},e}();t.fn.PicCarousel=function(n){return this.each(function(){var i=t(this),s=i.data("PicCarousel");s||(s=new e(i,n),i.data("PicCarousel",s))})},t.fn.PicCarousel.defaults={width:1e3,height:300,posterWidth:520,posterHeight:300,scale:.9,speed:300,autoPlay:!1,delay:500,verticalAlign:"middle"}}(jQuery)},function(t,e){t.exports=function(t){var e;return function(n){var i=Array.prototype.slice.call(arguments,1);void 0!==e&&clearTimeout(e),e=setTimeout(function(){n.apply(null,i)},t)}}},function(t,e,n){n(1)($(".picCarsoule-box")[0],{pre(){$(".poster-prev-btn").trigger("click")},next(){$(".poster-next-btn").trigger("click")}})},function(t,e){$(".pagenation span").on("click",function(){var t=$(this).attr("data-type");0!=t||$(this).hasClass("active")?1!=t||$(this).hasClass("active")||$(".inter-two-pic-box .con-box").animate({left:"-100%"}):$(".inter-two-pic-box .con-box").animate({left:0}),$(this).addClass("active").siblings().removeClass("active"),$(".inter-two-pic-box .con-box").find(".animation-flag").addClass("fadeinInter")})},function(t,e,n){var i=n(0),s=n(2),a=n(5);$.ajax({type:"GET",dataType:"jsonp",url:s.cgi+"/cgi/channel_list?type=1",success:function(t){if(t&&0===t.iErrCode){window.INTERNATION=t;var e=$("#case"),n="";return t.vecChannel.forEach(function(t){n+=i('<a href="javascript:;" data-id="{{_id}}" data-range="2">{{strName}}</a>',t)}),void e.append($(n))}console.log("拉取数据失败",t)},fail:function(t,e,n){console.log("拉取数据失败",e,n)}}),$("#case").on("click","a",function(t){var e=t.target.dataset.id;a(e,INTERNATION,1),$(".picCarsoule-box").addClass("picCarsouelFadeOut").addClass("js-ds-none"),$(".left-nav .txt-box .txt .item a").removeClass("active"),$(this).parent().siblings().removeClass("active"),$(this).addClass("active").siblings().removeClass("active"),$(".right-con .itemtype").addClass("fadeout").addClass("js-ds-none"),$(".right-con .right-content-box").removeClass("js-ds-none").addClass("fadein"),t.stopPropagation()}),n(6);var o={};$("#case_detail").on("click",".item",function(t){var e=$(this).data("contentid");if(o[e])s();else{var n="";INTERNATION.vecChannel.some(t=>{t.international.forEach(t=>{if(t._id==e){var s=t.vecMixed.length;return s&&s%2==0&&t.vecMixed.push(t.vecMixed[0]),t.vecMixed.forEach((t,e)=>{t.isActive=e?"":"active",n+=i('<li class="poster-item {{isActive}}">\n                <img src="{{strImg}}">\n                <p class="txt">\n                    {{strDesc}}\n                </p>\n            </li>',t)}),!0}})}),o[e]=n,s()}function s(){$("#case_content").html(o[e]),$(".picCarsoule-box").removeClass("js-ds-none").removeClass("picCarsouelFadeOut");var n=$("#TagName").prop("outerHTML");$("#TagName").remove(),$(".picCarsoule-con").prepend($(n));let i=.8*(window.innerWidth-217),s=.6*window.innerHeight;$("#TagName").PicCarousel({width:i,height:s,posterWidth:.7*i,posterHeight:.7*s,speed:200}),t.stopPropagation()}}),$(".left-nav .txt-box .txt .item").on("click",function(t){var e=t.target.dataset.type,n=t.target.dataset.range;if($(".picCarsoule-box").addClass("picCarsouelFadeOut").addClass("js-ds-none"),$(".left-nav .txt-box .txt .item").removeClass("active"),$(".left-nav .txt-box .txt .item a").removeClass("active"),$(t.target).parent().removeClass("active"),1==n&&0!=$(this).find(".son-title").length){var i=$(this).find(".son-title").height()+28;$(this).animate({height:i+"px",overflow:"visible"}),$(this).find("a").removeClass("active").eq(0).addClass("active")}else 1==n&&0==$(this).find(".son-title").length?($(this).siblings().animate({height:"18px",overflow:"hidden"}),$(this).addClass("active")):2==n&&$(t.target).addClass("active").siblings().removeClass("active");$(".right-con .itemtype").removeClass("fadeinInter").addClass("fadeout").addClass("js-ds-none"),a(INTERNATION.vecChannel[0]&&INTERNATION.vecChannel[0]._id,INTERNATION,1),$("."+e).removeClass("js-ds-none").removeClass("fadeout").addClass("fadeinInter")});var r=n(1);r($(".show-photo")[0],{next(){$(".think-tank .pre").trigger("click")},pre(){$(".think-tank .next").trigger("click")}}),r($(".right-content-box")[0],{pre(){$(".business-hezuo .change img.pre").trigger("click")},next(){$(".business-hezuo .change img.next").trigger("click")}}),n(8),$(".business-hezuo .change img").on("click",function(t){var e=$(this).attr("data-type"),n=parseInt($(".business-hezuo ul li").length/8),i=Math.abs(parseInt($(".business-hezuo ul").css("top")))/494;"pre"==e&&0!=i?$(".business-hezuo ul").animate({top:"-"+494*(i-1)+"px"}):"next"==e&&i<n&&$(".business-hezuo ul").animate({top:"-"+494*(i+1)+"px"})}),$("#profession").on("click","li",function(){var t=$("#profession li.active"),e=$(this);if(e[0]!=t[0]){var n,i;$("#profession li").each(function(s){var a=$(this);a[0]==e[0]?n=s:a[0]==t[0]&&(i=s)});var s,a=Math.abs(n-i);for(s=n>i?function(){$(".think-tank .next").trigger("click")}:function(){$(".think-tank .pre").trigger("click")};a--;)s()}}),$(".think-tank .change img").on("click",function(t){var e=$(this).data("type"),n=$(".show-photo li"),i=[];n.each(function(){i.push($(this).html())}),"pre"==e?i.push(i.shift()):i.unshift(i.pop()),n.each(function(t){$(this).html(i[t])})}),n(9)}]);