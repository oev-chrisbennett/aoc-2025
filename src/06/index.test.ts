import { describe, expect, test } from "bun:test"
import solve from "."

const exampleInput = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `

describe("Day 6", () => {
    test("part A - full example", async () => {
        const result = await solve(exampleInput)
        expect(result.partA).toBe(4277556)
    })

    test("part B - full example", async () => {
        const result = await solve(exampleInput)
        expect(result.partB).toBe(3263827)
    })
})
