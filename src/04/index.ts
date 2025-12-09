const directions: [number, number][] = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
]

const solve = async (
    input: string,
): Promise<{ partA: number; partB: number }> => {
    const grid = parseGrid(input)
    let partA = 0

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < (grid[row]?.length ?? 0); col++) {
            if (
                grid[row]?.[col] === "@" &&
                checkNeighbourTotal(grid, row, col) < 4
            )
                partA++
        }
    }

    const partB = countRemovable(grid)

    return {
        partA,
        partB,
    }
}

/**
 * Parse input into 2D array of chars
 */
const parseGrid = (input: string) => {
    const lines = input.split("\n")
    return lines.map((line) => line.split(""))
}

/**
 * Total neighbours with '@' character
 */
const checkNeighbourTotal = (
    grid: string[][],
    row: number,
    col: number,
): number => {
    let count = 0
    for (const [dr, dc] of directions) {
        const r = row + dr
        const c = col + dc
        if (grid[r]?.[c] === "@") {
            count++
        }
    }
    return count
}

/**
 * Count total removable cells using BFS
 * When removed, neighbours may become removable
 */
const countRemovable = (grid: string[][]): number => {
    const queue: [number, number][] = []
    const queued = new Set<string>()

    // 1st iteration: find all initially accessible cells
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < (grid[row]?.length ?? 0); col++) {
            if (
                grid[row]?.[col] === "@" &&
                checkNeighbourTotal(grid, row, col) < 4
            ) {
                queue.push([row, col])
                queued.add(`${row},${col}`)
            }
        }
    }

    let totalRemoved = 0

    while (queue.length > 0) {
        const item = queue.shift()
        if (!item) continue
        const [row, col] = item

        if (grid[row]?.[col] !== "@") continue

        grid[row][col] = "."
        totalRemoved++

        for (const [dr, dc] of directions) {
            const r = row + dr
            const c = col + dc
            const key = `${r},${c}`

            if (
                grid[r]?.[c] === "@" &&
                !queued.has(key) &&
                checkNeighbourTotal(grid, r, c) < 4
            ) {
                queue.push([r, c])
                queued.add(key)
            }
        }
    }

    return totalRemoved
}

export default solve
