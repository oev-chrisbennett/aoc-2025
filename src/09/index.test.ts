import { describe, expect, test } from "bun:test"
import run from "./index"

describe("day 9", () => {
    test("part A - full example", async () => {
        const input = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`
        const result = await run(input)
        const expected = { partA: 50, partB: 0 }
        expect(result).toEqual(expected)
    })
})
