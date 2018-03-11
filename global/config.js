module.exports = {
	port     		:       3050,
	devHotPort      :       3051,
	logDir   		:       "logs",
	serverUrl 		: 		"http://127.0.0.1:3000",
	proxyPrefix  	: 		"/api",
	tokenObj		: 		{
        secret  	:   'guiqingBlog',
        exp     	:    1000*60*60*2
    }
}