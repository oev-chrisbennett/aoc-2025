import { describe, expect, test } from "bun:test"
import solve from "./index"

describe("day 05", () => {
    const exampleInput = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`

    test("should count fresh ingredients", async () => {
        const result = await solve(exampleInput)
        expect(result.partA).toBe(3)
    })

    test("ingredient 1 is spoiled (not in any range)", async () => {
        const input = `3-5

1`
        const result = await solve(input)
        expect(result.partA).toBe(0)
    })

    test("ingredient 5 is fresh (falls into range 3-5)", async () => {
        const input = `3-5

5`
        const result = await solve(input)
        expect(result.partA).toBe(1)
    })

    test("ingredient 11 is fresh (falls into range 10-14)", async () => {
        const input = `10-14

11`
        const result = await solve(input)
        expect(result.partA).toBe(1)
    })

    test("ingredient 17 is fresh (falls into multiple ranges 16-20 and 12-18)", async () => {
        const input = `16-20
12-18

17`
        const result = await solve(input)
        expect(result.partA).toBe(1)
    })

    test("part a - full example", async () => {
        const input = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`
        const result = await solve(input)
        expect(result.partA).toBe(3)
    })

    test("part b - full example", async () => {
        const input = `3-5
10-14
16-20
12-18`
        const result = await solve(input)
        expect(result.partB).toBe(14)
    })
})
