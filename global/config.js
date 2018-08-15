module.exports = {
	port     		:       3050,
	devHotPort      :       3051,
	logDir   		:       "logs",
	serverUrl 		: 		"http://127.0.0.1:3000",
	proxyPrefix  	: 		process.env.NODE_ENV === 'production' ? '' : '/api',//由于开发中构建时代理有用到这个变量，但是process.env.NODE_ENV此时还没定义，所以无论如何都取值到'/api'
	tokenObj		: 		{
        secret  	:   'guiqingBlog',
        exp     	:    1000*60*60*2
    }
}