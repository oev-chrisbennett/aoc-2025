import { describe, expect, test } from "bun:test"
import solve from "./index"

describe("day 02", () => {
    const testCasesPartA: [string, number][] = [
        ["11-22", 11 + 22],
        ["95-115", 99],
        ["998-1012", 1010],
        ["1188511880-1188511890", 1188511885],
        ["222220-222224", 222222],
        ["1698522-1698528", 0],
        ["446443-446449", 446446],
        ["38593856-38593862", 38593859],
        ["565653-565659", 0],
        ["824824821-824824827", 0],
        ["2121212118-2121212124", 0],
    ]

    const testCasesPartB: [string, number][] = [
        ["11-22", 11 + 22],
        ["95-115", 99 + 111],
        ["998-1012", 999 + 1010],
        ["1188511880-1188511890", 1188511885],
        ["222220-222224", 222222],
        ["1698522-1698528", 0],
        ["446443-446449", 446446],
        ["38593856-38593862", 38593859],
        ["565653-565659", 565656],
        ["824824821-824824827", 824824824],
        ["2121212118-2121212124", 2121212121],
    ]

    test.each(testCasesPartA)("partA: %s => %d", async (input, expected) => {
        const result = await solve(input)
        expect(result.partA).toEqual(expected)
    })

    test.each(testCasesPartB)("partB: %s => %d", async (input, expected) => {
        const result = await solve(input)
        expect(result.partB).toEqual(expected)
    })

    test("full input partA", async () => {
        const input = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`
        const result = await solve(input)
        expect(result.partA).toEqual(1227775554)
    })

    test("full input partB", async () => {
        const input = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`
        const result = await solve(input)
        expect(result.partB).toEqual(4174379265)
    })
})
