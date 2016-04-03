'use strict';
var async = require("async"),
	Readable = require("stream").Readable,
	readline = require("readline"),
	lineReader,
	stream;

function convert(fileData, callback) {
	if(typeof fileData !== "string") {
		return console.error("Invalid file data passed. Aborting!!");
	}
	if(typeof callback !== "function") {
		return console.error("No callback provided. Aborting!!");
	}

	stream = new Readable();
	stream._read = function noop() {};

	lineReader = readline.createInterface({
		input: stream
	});

	stream.push(fileData);
	stream.push(null);

	prepare(lineReader, callback);

}

function prepare(fileData, callback) {
	var _obj = {},
		startKeysArr = [],
		objArr = [],
		endKeysArr = [];

	// Read file line by line
	lineReader.on("line", function(line) {
		var keys = line.split(":"),
			key = keys[0],
			value = keys[1];

		switch(key) {
			case "BEGIN":
				if(startKeysArr.length) {
					objArr.push(_obj);
				}
				_obj = {};	
				startKeysArr.push(value);
				break;
			case "END":
				endKeysArr.push(value);
				break;
			default: 
				_obj[key] = value;
		}
	});

	lineReader.on("close", function () {
		if(startKeysArr.length) {
			objArr.push(_obj);
		}
		//process(startKeysArr, endKeysArr, objArr, cb);
	});
}

function process(startKeysArr, endKeysArr, objArr, callback) {

}

module.exports = {
	convert: convert
}