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
		process(startKeysArr, endKeysArr, objArr, callback);
	});
}

function process(startKeysArr, endKeysArr, objArr, callback) {
	var result = {},
		currentObj = {},
		_obj = {},
		len = startKeysArr.length,
		startIdx = -1,
		i = 0;	

	for (i = 0; i < len; i++) {
		startIdx = startKeysArr.indexOf(endKeysArr[0]);
		if(startIdx > 0) {
			currentObj = objArr[startIdx - 1];

			if(!currentObj.hasOwnProperty(startKeysArr[startIdx])) {
				currentObj[startKeysArr[startIdx]] = [];
			}

			currentObj[startKeysArr[startIdx]].push(objArr[startIdx]);
			objArr.splice(startIdx, 1);
			objArr[startIdx - 1] = currentObj;
			startKeysArr.splice(startIdx, 1);
			endKeysArr.shift();
		}	
	}

	currentObj = {};
	currentObj[startKeysArr[0]] = [objArr[0]];

	console.info("iCAL-PARSER:", objArr[0].VEVENT.length, "events parsed");

	cb(null, currentObj);
}

module.exports = {
	convert: convert
}