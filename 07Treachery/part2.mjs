import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
});

let crabPositions

file.on('line', (line) => {
    crabPositions = line.split(',').map(num => +num) 
})

const getFuelConsumption = function(units) {
    if (units === 0) return 0
    let total = 0;
    for (let i = 1; i <= units; i += 1) {
        total += i
    }
    return total
}

file.on('close', () => {
    const minPosition = crabPositions.reduce((acc, cur) => Math.min(acc, cur), 999)
    const maxPosition = crabPositions.reduce((acc, cur) => Math.max(acc, cur), -1)

    let smallestFuel = Infinity
    for (let i = minPosition; i <= maxPosition; i += 1) {
        const fuel = crabPositions.reduce((acc, cur) => acc + getFuelConsumption(Math.abs(cur - i)), 0)
        smallestFuel = Math.min(smallestFuel, fuel)
    }
    console.log('Part 1 =', smallestFuel)
})
