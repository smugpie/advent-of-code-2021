import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
});

let currentDepth = Infinity
let numberOfIncreases = 0

file.on('line', (depth) => {
    if (+depth > currentDepth) {
        numberOfIncreases += 1
    }
    currentDepth = +depth
})

file.on('close', () => {
    console.log('Part 1: Number of increases =', numberOfIncreases)
})
