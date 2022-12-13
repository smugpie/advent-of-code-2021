import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
});

const grid = []

file.on('line', (line) => {
    grid.push(line.split(''))
})

const mostCommonDigit = function(str) {
    const strMinusZeros = str.replace(/0/g, '')
    return (strMinusZeros.length > (str.length / 2.0)) ? '1' : '0'
}

const getGammaRate = function(grid) {
    let finalNumber = ''
    for (let i = 0; i < grid[0].length; i += 1) {
        const column = grid.reduce((acc, cur) => acc + cur[i], '')
        finalNumber += mostCommonDigit(column)
    }
    return finalNumber
}

const getEpsilonRate = function(gammaRate) {
    return gammaRate.split('').reduce(
        (acc, cur) => acc + (cur === '1' ? '0' : '1'),
        ''
    )
}

file.on('close', () => {
    const gammaRate = getGammaRate(grid)
    const epsilonRate = getEpsilonRate(gammaRate)
    console.log(gammaRate, epsilonRate)

    console.log('Part 1: Position calculation =', parseInt(gammaRate, 2) * parseInt(epsilonRate, 2))
})
