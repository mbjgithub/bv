1、BV C端,纯静态
2、manage 管理台
	本地调试：
		cd manage
		npm i
		npm run d
	发布：
		npm run r
		将生成的dist文件夹下的js和html放到server的public下
		手动将修改同步到服务器上 
3、服务端

	环境准备：Node，数据库mongodb
	本地调试：
			npm i
			node app.js