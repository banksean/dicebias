export function histogram(samples) {
    let freq = {};
    samples.forEach(s => {
        freq[s] = (freq[s] ? freq[s] : 0) + 1;
    });
    return freq;
}

// Pearson's chi squared test. This just returns the sum.
//https://en.wikipedia.org/wiki/Pearson%27s_chi-squared_test
export function chiSquared(samples, sides) {
    let freq = histogram(samples);
    let sum = 0;
    const expected = samples.length / sides;
    for (let k in freq) {
        let diff = freq[k] - expected;
        sum += (diff*diff) / expected;
    }
    return sum;
}
