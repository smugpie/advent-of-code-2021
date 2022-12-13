import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
});

const position = {
    horizontal: 0,
    depth: 0,
    aim: 0
}

const functions = {
    forward: (num) => {
        position.horizontal += num
        position.depth += position.aim * num
    },
    up: (num) => position.aim -= num,
    down: (num) => position.aim += num,
}

file.on('line', (line) => {
    const [instruction, num] = line.split(' ')
    functions[instruction](+num)
})

file.on('close', () => {
    console.log('Part 2: Position calculation =', position.horizontal * position.depth)
})
