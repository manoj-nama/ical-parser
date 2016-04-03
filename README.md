# ical-parser
A Simple non-blocking `ical` to `JSON` parser

===
A simple node package to convert iCal data (.ics file) to JSON format

## Getting started
Download and install from npm
```
npm install -g ical-parser
```

Usage
```
var parser = require("ical-parser");

ical2json.convert(icalFileData, function(err, parsedResponse) {
	if(err) {
		console.log("Error occurred parsing ical data", err);
	}	else {
		//parsedResponse is the parsed javascript JSON object
	}
});
```

Author and license
---
Manoj Nama and license under MIT