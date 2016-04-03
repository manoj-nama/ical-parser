# ical-parser
A Simple non-blocking `ical` to `JSON` parser

## Getting started
Download and install from npm
```
npm install ical-parser --save
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

Sample output
```
{
  "VCALENDAR": [
    {
      "PRODID": "-//Google Inc//Google Calendar 70.9054//EN",
      "VERSION": "2.0",
      "CALSCALE": "GREGORIAN",
      "METHOD": "PUBLISH",
      "X-WR-CALNAME": "TPT",
      "X-WR-TIMEZONE": "Australia/Perth",
      "X-WR-CALDESC": "Calendar for members of 10 TPT SQN",
      "VTIMEZONE": [
        {
          "TZID": "Australia/Perth",
          "X-LIC-LOCATION": "Australia/Perth",
          "STANDARD": [
            {
              "TZOFFSETFROM": "+0800",
              "TZOFFSETTO": "+0800",
              "TZNAME": "AWST",
              "DTSTART": "19700101T000000"
            }
          ]
        }
      ],
      "VEVENT": [
        {
          "DTSTART;VALUE=DATE": "20160801",
          "DTEND;VALUE=DATE": "20160802",
          "RRULE": "FREQ=YEARLY",
          "DTSTAMP": "20160331T115151Z",
          "UID": "vbf1uorqh5h1uo4f0ak7tdu69k@google.com",
          "CREATED": "20160320T111440Z",
          "DESCRIPTION": "",
          "LAST-MODIFIED": "20160320T111543Z",
          "LOCATION": "",
          "SEQUENCE": "0",
          "STATUS": "CONFIRMED",
          "SUMMARY": "WO2 PARS Report DATE",
          "TRANSP": "TRANSPARENT"
        },
        {
          "DTSTART;VALUE=DATE": "20160814",
          "DTEND;VALUE=DATE": "20160815",
          "RRULE": "FREQ=YEARLY",
          "DTSTAMP": "20160331T115151Z",
          "UID": "rpjlesq0gc3e86iekqirgh6bp0@google.com",
          "CREATED": "20160320T111440Z",
          "DESCRIPTION": "",
          "LAST-MODIFIED": "20160320T111543Z",
          "LOCATION": "DSCMA/DRSCMA",
          "SEQUENCE": "0",
          "STATUS": "CONFIRMED",
          "SUMMARY": "WO2 PARs due at DSCMA/DRSCMA",
          "TRANSP": "TRANSPARENT"
        }
      ]
    }
  ]
}    
```

Author and license
---
Manoj Nama and license under MIT