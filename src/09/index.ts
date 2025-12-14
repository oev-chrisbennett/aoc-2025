type Point = [x: number, y: number]

const solve = async (input: string) => {
    const points = parsePoints(input)

    return {
        partA: getLargestRectangle(points),
        partB: 0,
    }
}

const parsePoints = (input: string): Point[] =>
    input.split("\n").map((line) => line.split(",").map(Number) as Point)

const area = ([x1, y1]: Point, [x2, y2]: Point): number =>
    (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1)

const getLargestRectangle = (points: Point[]): number => {
    let maxArea = 0
    for (const [i, p1] of points.entries()) {
        for (const p2 of points.slice(i + 1)) {
            maxArea = Math.max(maxArea, area(p1, p2))
        }
    }
    return maxArea
}

export default solve
