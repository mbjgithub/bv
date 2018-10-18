var env=require('modules/env')

var domain="193.112.82.136:1337"
if(env.isTest){
	domain="127.0.0.1:1337"
}

//频道操作
const modify_channel=`//${domain}/cgi/modify_channel`
const del_channel=`//${domain}/cgi/del_channel`
const channel_list=`//${domain}/cgi/channel_list`
const change_channel_order=`//${domain}/cgi/change_channel_order`

//频道内容操作
const modify_content=`//${domain}/cgi/modify_content`
const del_content=`//${domain}/cgi/del_content`
const conten_list=`//${domain}/cgi/conten_list`
const get_content_by_id=`//${domain}/cgi/get_content_by_id`
const change_content_order=`//${domain}/cgi/change_content_order`


//视觉内容操作
const modify_visual=`//${domain}/cgi/modify_visual`
const del_visual=`//${domain}/cgi/del_visual`
const visual_list=`//${domain}/cgi/visual_list`
const change_visual_order=`//${domain}/cgi/change_visual_order`
const get_visual_by_id=`//${domain}/cgi/get_visual_by_id`

//登陆校验
const login_judge=`//${domain}/login_judge`

//图片上传
const upload_img=`//${domain}/cgi/upload_img`

//国际首页图片
const modify_internation_img=`//${domain}/cgi/modify_internation_img`
const get_internation_img=`//${domain}/cgi/get_internation_img`

export default {
  	modify_channel,
	del_channel,
	channel_list,
	modify_content,
	conten_list,
	del_content,
	get_content_by_id,
	login_judge,
	upload_img,
	change_channel_order,
	change_content_order,
	modify_visual,
	del_visual,
	visual_list,
	change_visual_order,
	get_visual_by_id,
	modify_internation_img,
    get_internation_img
}