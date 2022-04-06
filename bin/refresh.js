const reader = require('g-sheets-api');
const fs = require('fs');
var content = 'const points = [';

const readerOptions = {
    sheetId: "1JXrJ0FyimyhG7OJvW3qOVwvosAqfM-powfDNElZ9RqY",
    apiKey: process.argv[2],
    returnAllResults: true,
    filter: {
      "key to filter on": "value to match",
    },
};

console.log(process.argv[2]);

// process.argv.forEach(function (val, index, array) {
//     console.log("Here: " + val);    
//     console.log(index + ': ' + val);
// });

reader(readerOptions, (results, error) => {
    if (error) {
        console.error('problem retreaving points', error);
    }
    results.forEach(element => {
        content += '{ name: "' + element.name + '", ring: "'+ element.ring +'",quadrant: "' + element.quadrant +'" },\n';
    });
    content += ']';
    fs.writeFile('../points.js', content, err => {
        if (err) {
            console.error(err)
            return
        }
        console.log("done");
    });
});