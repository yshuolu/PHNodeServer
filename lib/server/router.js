var CONFIG_FILE_PATH = '../config/config.json'
var SERVICE_ROOT_DIR = '../../service/'

var url = require('url')
var fs = require('fs')
var path = require('path')

//read in config
var config = JSON.parse(fs.readFileSync(path.join(__dirname, CONFIG_FILE_PATH), encoding='utf8'))
//init services with config
var serviceMap = initAllServices(config)

//Add echo service as default service
var echo = require('./echo')

function route(request, response){
	var requestPath = decodeURIComponent(url.parse(request.url).pathname)

	var handler = serviceMap[requestPath]
	if (handler && 'handleRequest' in handler){
		handler.handleRequest(request, response)
	}else{
		echo.handleRequest(request, response)
	}

}

function initAllServices(config){
	var serviceMap = {}

	//Search if there is a corresponding service in config
	for (var servicePath in config){
		var serviceFilePath = path.join(__dirname, SERVICE_ROOT_DIR, config[servicePath])

		if (fs.existsSync(serviceFilePath)){
			var handler = require(path.join(SERVICE_ROOT_DIR, config[servicePath]))
			serviceMap[servicePath] = handler
		}
	}

	// 
	return serviceMap;
}

exports.route = route