const solve = async (input: string) => {
    const lines = input
        .split("\n")
        .map((line) => line.trim())
        .map((line) => ({
            direction: line[0] as "L" | "R",
            distance: Number(line.slice(1)),
        }))

    const result = lines.reduce(
        (state, instruction) => {
            let { position, landedOnZero, totalZeroCrossings } = state
            let { direction, distance } = instruction

            // Convert left rotations to negative movement
            if (direction === "L") {
                distance *= -1

                // Track if we cross 0 (not counting where we start/end)
                const crossedZeroDuringMove =
                    ((position + distance) % 100 === 0 ? 1 : 0) -
                    (position % 100 === 0 ? 1 : 0)

                totalZeroCrossings += crossedZeroDuringMove
            }

            // Count how many times we pass through 0 due to wrapping
            const cyclesBefore = Math.floor(position / 100)
            position += distance
            const cyclesAfter = Math.floor(position / 100)
            const wrappingCrossings = Math.abs(cyclesBefore - cyclesAfter)

            totalZeroCrossings += wrappingCrossings

            if (position % 100 === 0) {
                landedOnZero++
            }

            return { position, landedOnZero, totalZeroCrossings }
        },
        {
            position: 50,
            landedOnZero: 0,
            totalZeroCrossings: 0,
        },
    )

    return {
        partA: result.landedOnZero,
        partB: result.totalZeroCrossings,
    }
}

export default solve
