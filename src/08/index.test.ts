import { describe, expect, test } from "bun:test"
import solve from "./index"

const exampleInput = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`

describe("day 8", () => {
    test("part A - full example", async () => {
        const result = await solve(exampleInput)
        expect(result.partA).toBe(40)
    })

    test("part B - full example", async () => {
        const result = await solve(exampleInput)
        expect(result.partB).toBe(25272)
    })
})
