type Range = [number, number]

const solve = async (input: string) => {
    const [rangesSection, idsSection] = input.split("\n\n")
    if (!rangesSection) throw new Error("Invalid input")

    const ranges = parseRanges(rangesSection)
    const mergedRanges = mergeRanges(ranges)
    const ids = idsSection?.split("\n").map(Number)

    const partACount =
        ids?.filter((id) => isInAnyRange(id, mergedRanges)).length ?? 0
    const partBCount = countUniqueIds(mergedRanges)

    return {
        partA: partACount,
        partB: partBCount,
    }
}

const parseRanges = (section: string): Range[] =>
    section.split("\n").map((line) => {
        const [start, end] = line.split("-").map(Number) as [number, number]
        return [start, end]
    })

const isInAnyRange = (value: number, ranges: Range[]): boolean =>
    ranges.some(([start, end]) => value >= start && value <= end)

const countUniqueIds = (ranges: Range[]): number =>
    ranges.reduce((sum, [start, end]) => sum + (end - start + 1), 0)

const mergeRanges = (ranges: Range[]): Range[] => {
    const sorted = [...ranges].sort((a, b) => a[0] - b[0])

    return sorted.reduce<Range[]>((merged, current) => {
        const last = merged[merged.length - 1]

        if (!last || current[0] > last[1] + 1) {
            merged.push(current)
        } else {
            last[1] = Math.max(last[1], current[1])
        }

        return merged
    }, [])
}

export default solve
