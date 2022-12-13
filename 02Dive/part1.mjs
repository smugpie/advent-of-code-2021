import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
});

const position = {
    horizontal: 0,
    depth: 0
}

const functions = {
    forward: (num) => position.horizontal += num,
    up: (num) => position.depth -= num,
    down: (num) => position.depth += num,
}

file.on('line', (line) => {
    const [instruction, num] = line.split(' ')
    functions[instruction](+num)
})

file.on('close', () => {
    console.log('Part 1: Position calculation =', position.horizontal * position.depth)
})
