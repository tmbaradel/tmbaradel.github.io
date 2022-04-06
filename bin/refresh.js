const reader = require('g-sheets-api');
const fs = require('fs');
var content = 'const points = [';

const readerOptions = {
    sheetId: "1JXrJ0FyimyhG7OJvW3qOVwvosAqfM-powfDNElZ9RqY",
    apiKey: 'AIzaSyBV2UuvISeE1_pH84CtBabFyz40rGofV5M',
    returnAllResults: true,
    filter: {
      "key to filter on": "value to match",
    },
};

process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});

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