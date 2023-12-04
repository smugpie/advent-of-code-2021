import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
});

let fishAgeCounts = Array(9).fill(0)

file.on('line', (line) => {
    const fishAges = line.split(',').map(num => +num) 
    fishAges.forEach(num => fishAgeCounts[num] += 1)
})

file.on('close', () => {
    for (let i = 1; i <= 256; i += 1) {
        fishAgeCounts = [
            fishAgeCounts[1],
            fishAgeCounts[2],
            fishAgeCounts[3],
            fishAgeCounts[4],
            fishAgeCounts[5],
            fishAgeCounts[6],
            fishAgeCounts[7] + fishAgeCounts[0],
            fishAgeCounts[8],
            fishAgeCounts[0]
        ]
    }
    const fishTotal = fishAgeCounts.reduce((acc, cur) => acc + cur, 0)
    console.log('Part 2 =', fishTotal)
})
