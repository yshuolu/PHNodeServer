var CONFIG_FILE_PATH = '../config/config.json'
var SERVICE_ROOT_DIR = '../../service/'

var url = require('url')
var fs = require('fs')

var BaseService = require('./baseService')

//read in config
var config = JSON.parse(fs.readFileSync(CONFIG_FILE_PATH, encoding='utf8'))
//init services with config
var serviceMap = initAllServices(config)

function route(request, response){
	var path = url.parse(request.url).pathname

	var handler = serviceMap[path]
	if (handler){
		handler.handleRequest(request, response)
	}

	//response.writeHead(200, {'Content-Type': 'text/plain'})
	//response.write(path)
	//response.end()
}

function initAllServices(config){
	var serviceMap = {}

	//Search if there is a corresponding service in config
	for (var path in config){
		if (fs.existsSync(SERVICE_ROOT_DIR + path)){
			var Service = require(SERVICE_ROOT_DIR + path)
			var handler = new Service()
			serviceMap[path] = handler
		}
	}

	//Add echo service as default service
	var Echo = require('./echo')
	var echoHandler = new Echo()
	serviceMap['/'] = echoHandler

	// 
	return serviceMap;
}

exports.route = route