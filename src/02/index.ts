const REPEATING_DIGIT_REGEX_TWICE_ONLY = /^(\d+)\1$/
const REPEATING_DIGIT_REGEX_TWICE_OR_MORE = /^(\d+)\1+$/

const solve = async (input: string) => {
    let partA = 0
    let partB = 0
    for (const entry of input.split(",")) {
        const [start, end] = entry.trim().split("-") as [string, string]
        const startNum = parseInt(start, 10)
        const endNum = parseInt(end, 10)

        for (let j = startNum; j <= endNum; j++) {
            if (isInvalidIdPartA(j)) {
                partA += j
            }
            if (isInvalidIdPartB(j)) {
                partB += j
            }
        }
    }

    return {
        partA: partA,
        partB: partB,
    }
}

const isInvalidIdPartA = (n: number): boolean => {
    const str = n.toString()
    return str.length % 2 === 0 && REPEATING_DIGIT_REGEX_TWICE_ONLY.test(str)
}
const isInvalidIdPartB = (n: number): boolean => {
    const str = n.toString()
    return REPEATING_DIGIT_REGEX_TWICE_OR_MORE.test(str)
}

export default solve
