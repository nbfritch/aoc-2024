module y2024.day5;

import std.algorithm;
import std.array;
import std.conv;
import std.file;
import std.math.algebraic;
import std.range;
import std.stdio;
import std.string;

int part1(string inputFile)
{
    auto parts = inputFile.readText.split("\n\n");
    auto rules = parts[0].split("\n").filter!(a => a.length > 0).map!(a => a.split("|").map!(b => b.to!int));
    auto updates = parts[1].split("\n").filter!(a => a.length > 0).map!(a => a.split(",").map!(b => b.to!int));
    return updates
        .filter!(update =>
            rules
                .filter!(rule =>
                    update.canFind!(u => u == rule[0]) &&
                    update.canFind!(u => u == rule[1]))
                .all!(rule =>
                    update.countUntil!(u => u == rule[0]) < update.countUntil!(u => u == rule[1])
                ))
        .map!(update => update[update.length / 2])
        .array
        .sum;
}

int part2(string inputFile)
{
    return 0;
}

void both(string inputFile)
{
    import std.stdio;
    writeln("Day 5 Part 1: ", part1(inputFile));
    writeln("Day 5 Part 2: ", part2(inputFile));
}