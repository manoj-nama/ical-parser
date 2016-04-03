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

}

function process(startKeysArr, endKeysArr, objArr, callback) {

}

module.exports = {
	convert: convert
}