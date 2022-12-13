import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
});

let currentDepth = []
let numberOfIncreases = 0

file.on('line', (depth) => {
    if (currentDepth.length === 3) {
        const currentSum = currentDepth[0] + currentDepth[1] + currentDepth[2] 
        const newDepth = currentDepth[1] + currentDepth[2] + (+depth)
        if (newDepth > currentSum) {
            numberOfIncreases += 1
        }
        currentDepth.shift()
    }
    currentDepth.push(+depth) 
})

file.on('close', () => {
    console.log('Part 2: Number of increases =', numberOfIncreases)
})
