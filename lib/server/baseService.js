function BaseService(){}

BaseService.prototype.handleRequest = function(request, response){

	var method = request.method.toLowerCase()

	if (this.hasOwnProperty(method)){
		method(request, response)	
	}else{
		response.writeHead(404, {'Content-Type': 'text/plain'})
		response.write('404 NOT FOUND!')
		response.end()
	}
	
}

module.exports = BaseService;