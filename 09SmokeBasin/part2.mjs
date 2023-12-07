import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
});

let basins = []
let map = []

const findBasinSize = function (basinCoords, y, x) {
    const testAdjacentCoords = function (y, x) {
        if (+map[y][x] !== 9 && !basinCoords.includes(`${y},${x}`)) {
            basinCoords.push(`${y},${x}`)
            findBasinSize(basinCoords, y, x)
        }
    }
    testAdjacentCoords(y - 1, x)
    testAdjacentCoords(y + 1, x)
    testAdjacentCoords(y, x - 1)
    testAdjacentCoords(y, x + 1)
    return basinCoords
}

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
                basins.push(findBasinSize([`${y},${x}`], y, x).length)
            }
        }
    }
    basins.sort((a, b) => b - a).splice(3)
    console.log('Part 2 =', basins.reduce((acc, cur) => acc * cur, 1))
})
