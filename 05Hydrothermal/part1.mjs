import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
});

const coordList = {}

const keepCountOfCoords = function (x, y) {
    const key = `${x},${y}`
    if (!coordList[key]) {
       coordList[key] = 0
    }
    coordList[key] += 1 
}

file.on('line', (line) => {
    const [from, to] = line.split(' -> ')
    const [xFrom, yFrom] = from.split(',').map(num => +num)
    const [xTo, yTo] = to.split(',').map(num => +num)

    if ((xFrom === xTo) || (yFrom === yTo)) {
        let x = xFrom
        let y = yFrom
        keepCountOfCoords(x, y)
        while (y !== yTo || x !== xTo) {
            x += Math.sign(xTo - xFrom)
            y += Math.sign(yTo - yFrom)
            keepCountOfCoords(x, y)
        }
    }
})

file.on('close', () => {
    const intersects = Object.values(coordList).filter(ct => ct > 1)
    console.log('Part 1 =', intersects.length)
})
