var SERVER_WIDGET_PATH = '../lib/server/'
//Inheritance
function Index(){}
var BaseService = require(SERVER_WIDGET_PATH + 'baseService')
Index.prototype = new BaseService()
Index.prototype.constructor = Index

//@interface
Index.prototype.get = get

//@implement
var PUBLIC_DIR = '../../public/'
var fs = require('fs')
var util500 = require(SERVER_WIDGET_PATH + '500')

function get(request, response){
	
	var htmlPagePath = PUBLIC_DIR + 'index.html'

	fs.exists(htmlPagePath, function(exists){
		if (exists === true){
			//just output index.html
			response.writeHead(200, {'Content-Type': 'text/html'})
			var stream = fs.createReadStream(htmlPagePath)
			stream.pipe(response, {end: false})
			stream.on('end', function(){
				response.end()
			})
		}else{
			//500 server error
			util500.write500(response)
		}
	})

}

module.exports = Index