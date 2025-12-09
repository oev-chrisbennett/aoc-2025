const solve = async (
    input: string,
): Promise<{ partA: number; partB: number }> => {
    const lines = input.split("\n")
    let sumA = 0
    let sumB = 0

    for (const bank of lines) {
        sumA += findLargest(bank, 2)
        sumB += findLargest(bank, 12)
    }

    return {
        partA: sumA,
        partB: sumB,
    }
}

const findLargest = (bank: string, size: number): number => {
    const n = bank.length
    if (size >= n) {
        return Number.parseInt(bank, 10)
    }

    let result = 0
    let startIdx = 0

    for (let i = 0; i < size; i++) {
        const remainingToSelect = size - i - 1
        const endIdx = n - remainingToSelect

        let maxDigit = -1
        let maxPos = startIdx

        for (let j = startIdx; j < endIdx; j++) {
            const digit = Number.parseInt(bank.charAt(j), 10)
            if (digit > maxDigit) {
                maxDigit = digit
                maxPos = j
            }
        }

        result = result * 10 + maxDigit
        startIdx = maxPos + 1
    }

    return result
}

export default solve
