type Operator = "+" | "*"

const solve = async (input: string) => {
    const lines = input.split("\n")
    const operatorLine = lines.pop() ?? ""
    const operators = parseOperators(operatorLine)

    const partA = operators.reduce((acc, { index, operator }, idx) => {
        const end = operators[idx + 1]?.index ?? operatorLine.length
        const nums = extractColumnValues(lines, index, end)
        return acc + applyOperator(operator, nums)
    }, 0)

    const partB = solvePartB(lines, operatorLine)

    return { partA, partB }
}

const solvePartB = (dataLines: string[], operatorLine: string): number => {
    const width = Math.max(
        ...dataLines.map((l) => l.length),
        operatorLine.length,
    )
    const columns = classifyColumns(dataLines, operatorLine, width)
    const groups = groupColumns(columns)

    return groups.reduceRight((acc, group) => {
        const nums = group.numbers
        return acc + applyOperator(group.operator, nums)
    }, 0)
}

type ColumnType = "number" | "separator" | "operator"

interface Column {
    type: ColumnType
    char: string
}

const classifyColumns = (
    dataLines: string[],
    operatorLine: string,
    width: number,
): Column[] => {
    const columns: Column[] = []
    for (let x = 0; x < width; x++) {
        const opChar = operatorLine[x] ?? " "
        const hasDigit = dataLines.some((line) => /\d/.test(line[x] ?? " "))
        const isOperator = opChar === "+" || opChar === "*"

        if (isOperator) {
            columns.push({ type: "operator", char: opChar })
        }
        if (hasDigit) {
            columns.push({
                type: "number",
                char: getVerticalDigits(dataLines, x),
            })
        } else if (!isOperator) {
            columns.push({ type: "separator", char: " " })
        }
    }
    return columns
}

const getVerticalDigits = (lines: string[], x: number): string =>
    lines
        .map((line) => line[x] ?? " ")
        .filter((c) => /\d/.test(c))
        .join("")

interface Group {
    numbers: number[]
    operator: Operator
}

const groupColumns = (columns: Column[]): Group[] => {
    const groups: Group[] = []
    let currentNumbers: number[] = []
    let currentOperator: Operator | null = null

    for (const col of columns) {
        if (col.type === "operator") {
            if (currentOperator !== null) {
                groups.push({
                    numbers: currentNumbers,
                    operator: currentOperator,
                })
                currentNumbers = []
            }
            currentOperator = col.char as Operator
        } else if (col.type === "number") {
            currentNumbers.push(Number(col.char))
        }
    }

    if (currentOperator !== null && currentNumbers.length > 0) {
        groups.push({
            numbers: currentNumbers,
            operator: currentOperator,
        })
    }

    return groups
}

const parseOperators = (
    line: string,
): { index: number; operator: Operator }[] =>
    [...line.matchAll(/[+*]/g)].map((match) => ({
        index: match.index,
        operator: match[0] as Operator,
    }))

const extractColumnValues = (
    lines: string[],
    start: number,
    end: number,
): number[] => lines.map((line) => Number(line.slice(start, end).trim()))

const sum = (nums: number[]): number => nums.reduce((a, b) => a + b, 0)
const product = (nums: number[]): number => nums.reduce((a, b) => a * b, 1)

const applyOperator = (operator: Operator, nums: number[]): number =>
    operator === "+" ? sum(nums) : product(nums)

export default solve
