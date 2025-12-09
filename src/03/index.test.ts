import { describe, expect, test } from "vitest"
import solve from "./index"

describe("day 03", () => {
    test("example", async () => {
        const result = await solve("example input")
        expect(result).toEqual({ partA: 0, partB: 0 })
        expect(1).toBe(1)
    })
})
