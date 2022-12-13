import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
});

const grid = []

file.on('line', (line) => {
    grid.push(line.split(''))
})

const getDigitToKeep = function(str, keep) {
    const strMinusZeros = str.replace(/0/g, '')
    const oppositeOfKeep = keep === '1' ? '0' : '1'
    return (strMinusZeros.length >= (str.length / 2.0)) ? keep : oppositeOfKeep
}

const getRating = function(grid, keep) {
    let i = 0
    let workingCopyGrid = [...grid]
    while (i <= grid[0].length) {
        const column = workingCopyGrid.reduce((acc, cur) => acc + cur[i], '')
        const mostCommon = getDigitToKeep(column, keep)
        workingCopyGrid = workingCopyGrid.filter((row) => row[i] === mostCommon)
        if (workingCopyGrid.length === 1) {
            break
        }
        i += 1
    }
    return workingCopyGrid[0].join('')
}

file.on('close', () => {
    const oxygenRating = getRating(grid, '1')
    const co2Rating = getRating(grid, '0')
    console.log('Part 2: life support rating =', parseInt(oxygenRating, 2) * parseInt(co2Rating, 2))
})
