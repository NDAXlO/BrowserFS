## AlphaPoint fork notes

### usage
BrowserFS is packaged as a UMD module and is used to emulate the [Node JS file system API](https://nodejs.org/api/fs.html)

We are currently using this module in a `<script>` block in sim.html when the simulator is launched.
The system is then configured and initialized in the same html file and the application can utilize the
module like so:
```javascript
var fs = require('fs');

fs.writeFile('test.txt', 'This is example text being persisted from the browser', function (err) {
    alert("wrote");
    fs.readFile('test.txt', function (err, contents) {
        alert(contents.toString());
    });
});

console.log("after configure");
```

### building
* install node.js on windows
* clone this repo
* run `npm install`
* output file found in `dist/browserfs.min.js`

### change log
* edited .gitattributes to properly handle LF / CRLF
* edited src/core/backends.ts to only include `IndexedDB`
* added this document
