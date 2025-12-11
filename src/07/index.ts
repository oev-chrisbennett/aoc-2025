const SPLIT = "^"
const START = "S"

interface Grid {
    lines: string[]
    width: number
    startCol: number
}

const solve = async (input: string) => {
    const grid = parseGrid(input)

    return {
        partA: partA(grid),
        partB: partB(grid),
    }
}

const partA = (grid: Grid) => {
    let activeColumns = new Set<number>([grid.startCol])
    let splitCount = 0

    for (let row = 1; row < grid.lines.length; row++) {
        const line = grid.lines[row]
        const nextColumns = new Set<number>()

        for (const col of activeColumns) {
            if (isSplit(line, col)) {
                splitCount++
                if (col > 0) nextColumns.add(col - 1)
                if (col < grid.width - 1) nextColumns.add(col + 1)
            } else {
                nextColumns.add(col)
            }
        }

        activeColumns = nextColumns
    }

    return splitCount
}

const partB = (grid: Grid) => {
    let columnCounts = new Map<number, number>([[grid.startCol, 1]])

    for (let row = 1; row < grid.lines.length; row++) {
        const line = grid.lines[row]
        const nextCounts = new Map<number, number>()

        for (const [col, count] of columnCounts) {
            if (isSplit(line, col)) {
                if (col > 0) addCount(nextCounts, col - 1, count)
                if (col < grid.width - 1) addCount(nextCounts, col + 1, count)
            } else {
                addCount(nextCounts, col, count)
            }
        }

        columnCounts = nextCounts
    }

    return [...columnCounts.values()].reduce((sum, count) => sum + count, 0)
}

const addCount = (map: Map<number, number>, col: number, count: number) => {
    map.set(col, (map.get(col) ?? 0) + count)
}

const parseGrid = (input: string): Grid => {
    const lines = input.split("\n")
    const firstLine = lines[0] ?? ""
    return {
        lines,
        width: firstLine.length,
        startCol: firstLine.indexOf(START),
    }
}

const isSplit = (line: string | undefined, col: number): boolean =>
    line?.[col] === SPLIT

export default solve
