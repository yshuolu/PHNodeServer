var CONFIG_FILE_PATH = '../config/config.json'
var SERVICE_ROOT_DIR = '../../service'

var url = require('url')
var fs = require('fs')

//read in config
var config = JSON.parse(fs.readFileSync(CONFIG_FILE_PATH, encoding='utf8'))
//init services with config
var serviceMap = initAllServices(config)

//Add echo service as default service
var Echo = require('./echo')
var echoHandler = new Echo()

function route(request, response){
	var path = decodeURIComponent(url.parse(request.url).pathname)

	var handler = serviceMap[path]
	if (handler && 'handleRequest' in handler){
		handler.handleRequest(request, response)
	}else{
		echoHandler.handleRequest(request, response)
	}

}

function initAllServices(config){
	var serviceMap = {}

	//Search if there is a corresponding service in config
	
	for (var path in config){
		var serviceFilePath = SERVICE_ROOT_DIR + '/' + config[path]

		if (fs.existsSync(serviceFilePath)){
			var Service = require(serviceFilePath)
			var handler = new Service()
			serviceMap[path] = handler
		}
	}

	// 
	return serviceMap;
}

exports.route = route