import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
});

let sum = 0

const findSignalWithLength = function(signalDigits, length) {
    return signalDigits.find((signal) => signal.length === length)
}

const findSegmentThatAppearsXTimes = function(digits, num) {
    const result = []
    for (const seg of 'abcdefg'.split('')) {
        const arr = digits.filter((digit) => digit.includes(seg))
        if (arr.length === num) {
            result.push(seg)
        }
    }
    return result
}

const getMapping = function(signalDigits) {
    const mapping = Array(10).fill('');

    mapping[1] = findSignalWithLength(signalDigits, 2);
    mapping[4] = findSignalWithLength(signalDigits, 4);
    mapping[7] = findSignalWithLength(signalDigits, 3);
    mapping[8] = findSignalWithLength(signalDigits, 7);

    const [topSegment] = mapping[7].filter(seg => ! mapping[1].includes(seg))
    const [topLeftSegment] = findSegmentThatAppearsXTimes(signalDigits, 6)
    const [topRightSegment] = findSegmentThatAppearsXTimes(signalDigits, 8).filter(seg => mapping[1].includes(seg))
    const [bottomLeftSegment] = findSegmentThatAppearsXTimes(signalDigits, 4)
    const [bottomRightSegment] = findSegmentThatAppearsXTimes(signalDigits, 9)
    const [middleSegment] = findSegmentThatAppearsXTimes(signalDigits, 7).filter(seg => mapping[4].includes(seg))
    const [bottomSegment] = findSegmentThatAppearsXTimes(signalDigits, 7).filter(seg => !mapping[4].includes(seg))

    mapping[0] = [topSegment, topLeftSegment, topRightSegment, bottomLeftSegment, bottomRightSegment, bottomSegment].sort()
    mapping[2] = [topSegment, topRightSegment, middleSegment, bottomLeftSegment, bottomSegment].sort()
    mapping[3] = [topSegment, topRightSegment, middleSegment, bottomRightSegment, bottomSegment].sort()
    mapping[5] = [topSegment, topLeftSegment, middleSegment, bottomRightSegment, bottomSegment].sort()
    mapping[6] = [topSegment, topLeftSegment, middleSegment, bottomLeftSegment, bottomRightSegment, bottomSegment].sort()
    mapping[9] = [topSegment, topLeftSegment, topRightSegment, middleSegment, bottomRightSegment, bottomSegment].sort()

    return mapping.map((item) => item.join(''))
}

file.on('line', (line) => {
    const [signals, output] = line.split(' | ')
    const signalDigits = signals.split(' ').map((signal) => signal.split('').sort())
    const outputDigits = output.split(' ').map((digit) => digit.split('').sort().join(''))
    const mapping = getMapping(signalDigits)
    const reading = outputDigits.map((digit => mapping.indexOf(digit))).join('')
    sum += +reading
})

file.on('close', () => {
    console.log('Part 2 =', sum)
})
