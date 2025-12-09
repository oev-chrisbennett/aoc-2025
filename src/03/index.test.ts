import { describe, expect, test } from "vitest"
import solve from "./index"

describe("day 03", () => {
    const testCasesPartA: [string, number][] = [
        ["987654321111111", 98],
        ["811111111111119", 89],
        ["234234234234278", 78],
        ["818181911112111", 92],
    ]

    test.each(testCasesPartA)("partA: %s => %d", async (input, expected) => {
        const result = await solve(input)
        expect(result.partA).toEqual(expected)
    })

    test("partA: full example", async () => {
        const input = `987654321111111
811111111111119
234234234234278
818181911112111`
        const result = await solve(input)
        expect(result.partA).toEqual(357)
    })

    const testCasesPartB: [string, number][] = [
        ["987654321111111", 987654321111],
        ["811111111111119", 811111111119],
        ["234234234234278", 434234234278],
        ["818181911112111", 888911112111],
    ]

    test.each(testCasesPartB)("partB: %s => %d", async (input, expected) => {
        const result = await solve(input)
        expect(result.partB).toEqual(expected)
    })

    test("partB: full example", async () => {
        const input = `987654321111111
811111111111119
234234234234278
818181911112111`
        const result = await solve(input)
        expect(result.partB).toEqual(3121910778619)
    })
})
