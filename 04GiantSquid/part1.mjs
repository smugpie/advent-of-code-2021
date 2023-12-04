import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
});

let bingoGrids = []
let matchedNumbers = []
let calledNumbers;
let currentGrid = 0;

file.on('line', (line) => {
    if (!calledNumbers && line !== '') {
        calledNumbers = line.split(',').map((num) => +num)
        return
    }
    if (line !== '') {
        if (!bingoGrids[currentGrid]) {
            bingoGrids[currentGrid] = []
            matchedNumbers[currentGrid] = []
        }
        bingoGrids[currentGrid].push(line.trim().replace(/[ ]+/g, ' ').split(' ').map((num) => +num))
        matchedNumbers[currentGrid].push(Array(5).fill(0))
    } else if (bingoGrids.length > 0) {
        currentGrid += 1
    }
})


const checkGrids = function () {
    let matchedGrid = -1
    bingoGrids.forEach((bingoGrid, gridNum) => {
        for (let i = 0; i < 5; i += 1) {
            let row = matchedNumbers[gridNum][i].join('')
            let col = ''
            for (let j = 0; j < 5; j += 1) {
                col = `${col}${matchedNumbers[gridNum][j][i]}`
            }
            if (col === '11111' || row == '11111') {
                matchedGrid = gridNum
            }
        }
    })
    return matchedGrid
}

const markGrids = function (calledNumber) {
    bingoGrids.forEach((bingoGrid, gridNum) => {
        bingoGrid.forEach((row, rowNum) => {
            const foundNum = row.indexOf(calledNumber)
            if (foundNum >= 0) {
                matchedNumbers[gridNum][rowNum][foundNum] = 1
            }
        })
    })
}

const calculateFinalSum = function(gridNum) {
    let sum = 0;
    const matchedGrid = bingoGrids[gridNum]
    const calledGrid = matchedNumbers[gridNum]
    for (let i = 0; i < matchedGrid.length; i += 1) {
        for(let j = 0; j < matchedGrid[0].length; j += 1) {
            if (calledGrid[i][j] === 0) {
                sum += matchedGrid[i][j]
            }
        }
    }
    return sum
}

file.on('close', () => {
    for (const calledNumber of calledNumbers) {
        markGrids(calledNumber)
        const isAMatch = checkGrids()
        if (isAMatch > -1) {
            const finalSum = calculateFinalSum(isAMatch)
            console.log('Part 1 =', finalSum * calledNumber)
            return
        }
    }
})
