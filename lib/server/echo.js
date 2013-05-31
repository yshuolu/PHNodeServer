var PUBLIC_DIR = '../../public'

//Inheritance
function Echo(){}
var BaseService = require('./baseService')
Echo.prototype = new BaseService()

//
Echo.prototype.get = get

//
var mime = require('mime')
var url = require('url')

//implement
function get(request, response){
	console.log('echo')
}

module.exports = Echo