import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
    input: fs.createReadStream('./testinput2.txt')
});

let ct = 0

file.on('line', (line) => {
    const [, output] = line.split(' | ')
    const outputDigits = output.split(' ')
    for (const digit of outputDigits) {
        if (digit.length === 2 || digit.length === 3 || digit.length === 4 || digit.length === 7) {
            ct += 1
        }
    }
})

file.on('close', () => {
    console.log('Part 1 =', ct)
})
