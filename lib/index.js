'use strict';
var async = require("async"),
	Readable = require("stream").Readable,
	readline = require("readline"),
	lineReader,
	stream;

function convert(fileData, callback) {
	if(typeof callback !== "function") {
		throw new Error("iCAL-PARSER: No callback provided. Aborting!!");
		return console.error("No callback provided. Aborting!!");
	}

	if(typeof fileData !== "string") {
		return callback(new Error("iCAL-PARSER: Invalid file data passed. Aborting!!"));
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

function prepare(lineReader, callback) {
	var _obj = {},
		startKeys = [],
		objArr = [],
		endKeys = [];

	// Read file line by line
	lineReader.on("line", function(line) {
		var keys = line.split(":"),
			key = keys[0],
			value = keys[1];

		switch(key) {
			case "BEGIN":
				if(startKeys.length) {
					objArr.push(_obj);
				}
				_obj = {};	
				startKeys.push(value);
				break;
			case "END":
				endKeys.push(value);
				break;
			default: 
				_obj[key] = value;
		}
	});

	lineReader.on("close", function () {
		if(startKeys.length) {
			objArr.push(_obj);
		}
		process(startKeys, endKeys, objArr, callback);
	});
}

function process(startKeys, endKeys, objArr, callback) {
	var result = {},
		len = startKeys.length,
		startIdx = -1,
		i = 0;	

		console.log("processing..");
	var iterator = function() {
		return i < len;
	};	

	var iteratee = function(cb) {		
		startIdx = startKeys.indexOf(endKeys[0]);
		if(startIdx > 0) {
			try {
				result = objArr[startIdx - 1];

				if(!result.hasOwnProperty(startKeys[startIdx])) {
					result[startKeys[startIdx]] = [];
				}

				result[startKeys[startIdx]].push(objArr[startIdx]);
				objArr.splice(startIdx, 1);
				objArr[startIdx - 1] = result;
				startKeys.splice(startIdx, 1);
				endKeys.shift();

			} catch(err) {
				cb(err);
			}
		}	
		i++;
		cb(null);			
	};

	var onComplete = function(err) {
		if(err) {
			return callback(err);
		}

		result = {};
		result[startKeys[0]] = [objArr[0]];

		console.info("iCAL-PARSER:", objArr[0].VEVENT.length, "events parsed");
		return callback(err, result);
	};

	async.whilst(iterator, iteratee, onComplete);	
}

module.exports = {
	convert: convert
}