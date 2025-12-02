import { readdir } from "node:fs/promises"

const srcDir = `${import.meta.dir}/src`

const days = (await readdir(srcDir)).filter((dir) => /^\d+$/.test(dir)).sort()

type Result = { partA: string | number; partB: string | number }

const results: { day: string; partA: string; partB: string }[] = []

for (const day of days) {
    try {
        const modulePath = `${srcDir}/${day}/index.ts`
        const inputPath = `${srcDir}/${day}/input.txt`
        const input = await Bun.file(inputPath).text()
        const module = await import(modulePath)

        if (typeof module.default === "function") {
            const result: Result = await module.default(input)
            results.push({
                day,
                partA: String(result?.partA ?? "N/A"),
                partB: String(result?.partB ?? "N/A"),
            })
        } else {
            results.push({ day, partA: "-", partB: "-" })
        }
    } catch (error) {
        results.push({
            day,
            partA: "Error",
            partB: error instanceof Error ? error.message : String(error),
        })
    }
}

const colWidths = {
    day: Math.max(3, ...results.map((r) => r.day.length)),
    partA: Math.max(6, ...results.map((r) => r.partA.length)),
    partB: Math.max(6, ...results.map((r) => r.partB.length)),
}

const pad = (str: string, len: number) => str.padEnd(len)

console.log(
    `| ${pad("Day", colWidths.day)} | ${pad("Part A", colWidths.partA)} | ${pad("Part B", colWidths.partB)} |`,
)
console.log(
    `| ${"-".repeat(colWidths.day)} | ${"-".repeat(colWidths.partA)} | ${"-".repeat(colWidths.partB)} |`,
)

for (const { day, partA, partB } of results) {
    console.log(
        `| ${pad(day, colWidths.day)} | ${pad(partA, colWidths.partA)} | ${pad(partB, colWidths.partB)} |`,
    )
}
