var http = require('http')

function start(route){
	http.createServer(onRequest).listen(8888)
	console.log('Server started!')

	function onRequest(request, response){
		route(request, response)
	}
}

exports.start = start