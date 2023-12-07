import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
});

let sum = 0

let map = []

file.on('line', (line) => {
    map.push(`9${line}9`)
})

file.on('close', () => {
    const pad = Array(map[0].length).fill('9').join('')
    map = [pad, ...map, pad]
    for (let y = 1; y < map.length - 1; y += 1) {
        for (let x = 1; x < map[y].length - 1; x += 1) {
            const point = +map[y][x]
            if (point < +map[y - 1][x] &&
                point < +map[y + 1][x] &&
                point < +map[y][x + 1] &&
                point < +map[y][x - 1]) {
                sum += point + 1
            }
        }
    }
    console.log('Part 1 =', sum)
})
