import { describe, expect, test } from "bun:test"
import run from "./index"

describe("run", () => {
    test("should return the correct values", async () => {
        const input = `L68
        L30
        R48
        L5
        R60
        L55
        L1
        L99
        R14
        L82
        `
        const result = await run(input)
        const expected = { partA: 3, partB: 6 }
        expect(result).toEqual(expected)
    })

    // if the dial were pointing at 50,
    // R1000 would cause the dial to point at 0 ten times before returning back to 50!
    test("should return the correct values for multiple rotations", async () => {
        const result = await run("R1000")
        const expected = { partA: 0, partB: 10 }
        expect(result).toEqual(expected)
    })
})
