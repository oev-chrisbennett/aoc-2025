type Point = [x: number, y: number, z: number]
type Edge = [pointA: number, pointB: number, squaredDistance: number]

const solve = async (input: string) => {
    const points = parsePoints(input)
    const edges = calculateEdges(points)
    const numConnections = points.length === 20 ? 10 : 1000

    return {
        partA: partA(edges, points.length, numConnections),
        partB: partB(edges, points),
    }
}

const parsePoints = (input: string): Point[] =>
    input
        .split("\n")
        .filter((line) => line.trim())
        .map((line) => line.split(",").map((x) => parseInt(x, 10)))
        .filter(
            (coords): coords is Point =>
                coords.length === 3 && coords.every((x) => !Number.isNaN(x)),
        )

const calculateEdges = (points: Point[]): Edge[] => {
    const edges: Edge[] = []

    for (let i = 0; i < points.length; i++) {
        const p1 = points[i]
        if (!p1) continue

        for (let j = i + 1; j < points.length; j++) {
            const p2 = points[j]
            if (!p2) continue

            const dx = p1[0] - p2[0]
            const dy = p1[1] - p2[1]
            const dz = p1[2] - p2[2]
            edges.push([i, j, dx * dx + dy * dy + dz * dz])
        }
    }

    return edges.sort((a, b) => a[2] - b[2])
}

const createUnionFind = (size: number) => {
    const parent: number[] = Array.from({ length: size }, (_, i) => i)

    const find = (x: number): number => {
        const p = parent[x]
        if (p === undefined || p === x) return x
        parent[x] = find(p)
        return parent[x] ?? x
    }

    const union = (x: number, y: number): boolean => {
        const rootX = find(x)
        const rootY = find(y)
        if (rootX === rootY) return false
        parent[rootY] = rootX
        return true
    }

    return { find, union }
}

const partA = (
    edges: Edge[],
    numPoints: number,
    numConnections: number,
): number => {
    const { find, union } = createUnionFind(numPoints)
    const limit = Math.min(edges.length, numConnections)

    for (let i = 0; i < limit; i++) {
        const edge = edges[i]
        if (edge) union(edge[0], edge[1])
    }

    const sizes = new Map<number, number>()
    for (let i = 0; i < numPoints; i++) {
        const root = find(i)
        sizes.set(root, (sizes.get(root) ?? 0) + 1)
    }

    const sorted = Array.from(sizes.values()).sort((a, b) => b - a)
    return (sorted[0] ?? 0) * (sorted[1] ?? 0) * (sorted[2] ?? 0)
}

const partB = (edges: Edge[], points: Point[]): number => {
    const { union } = createUnionFind(points.length)
    let circuitCount = points.length

    for (const edge of edges) {
        if (union(edge[0], edge[1])) {
            circuitCount--
            if (circuitCount === 1) {
                const pointA = points[edge[0]]
                const pointB = points[edge[1]]
                if (pointA && pointB) return pointA[0] * pointB[0]
            }
        }
    }

    return 0
}

export default solve
