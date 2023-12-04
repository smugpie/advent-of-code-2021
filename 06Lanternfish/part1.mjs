import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
});

let fishAges

file.on('line', (line) => {
    fishAges = line.split(',').map(num => +num) 

})

file.on('close', () => {
    for (let i = 1; i <= 80; i += 1) {
        const newFish = []
        const nextFishAges = fishAges.map((age) => {
            if (age === 0) {
                newFish.push(8)
                return 6
            }
            return age - 1
        })
        fishAges = [...nextFishAges, ...newFish]
    }
    console.log('Part 1 =', fishAges.length)
})
