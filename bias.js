const csv = require('csv-parser');  
const fs = require('fs');

let samples = [];

function histogram(samples) {
    let freq = {};
    samples.forEach(s => {
        freq[s] = (freq[s] ? freq[s] : 0) + 1;
    });
    return freq;
}

// Pearson's chi squared test. This just returns the sum.
//https://en.wikipedia.org/wiki/Pearson%27s_chi-squared_test
function chiSquared(samples, sides) {
    let freq = histogram(samples);
    let sum = 0;
    const expected = samples.length / sides;
    for (let k in freq) {
        let diff = freq[k] - expected;
        sum += (diff*diff) / expected;
    }
    return sum;
}

fs.createReadStream('../10.csv')  
  .pipe(csv(['sample']))
  .on('data', (row) => {
    samples.push(row['sample']);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    let h = histogram(samples);
    console.log('histogram: ', h);
    console.log('chi squared: ' + chiSquared(samples, 10));
});
