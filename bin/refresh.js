const reader = require('g-sheets-api');
const fs = require('fs');
var content = 'const points = [';

const readerOptions = {
    sheetId: "1JXrJ0FyimyhG7OJvW3qOVwvosAqfM-powfDNElZ9RqY",
    apiKey: process.env.GOOGLE_KEY,
    returnAllResults: true,
    filter: {
      "key to filter on": "value to match",
    },
};

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