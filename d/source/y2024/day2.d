module y2024.day2;

import std.algorithm;
import std.array;
import std.conv;
import std.file;
import std.math.algebraic;
import std.range;
import std.string;

int part1(string inputFile)
{
    return inputFile
        .readText
        .split("\n")
        .filter!(a => a.length > 0)
        .map!(a =>
            a.split(" ")
            .map!(b => b.to!int)
            .slide(2)
            .map!(c => c[0] - c[1])
            .array)
        .map!(a => a.all!(b => b.among(1,2,3)) || a.all!(b => b.among(-1,-2,-3)))
        .filter!(a => a)
        .count
        .to!int;
}

bool isValidWithoutDrop(int[] values)
{
    auto diffs = values.slide(2).map!(a => a[0] - a[1]);
    return diffs.all!(a => a.among(1,2,3)) || diffs.all!(a => a.among(-1,-2,-3));
}

bool isValidWithDrop(int[] values)
{
    if (values.isValidWithoutDrop)
    {
        return true;
    }

    for (auto i = 0; i < values.length; i++)
    {
        auto valuesWithoutI = values.dup;
        valuesWithoutI.remove(i);
        valuesWithoutI.length = values.length.to!int - 1;
        if (valuesWithoutI.isValidWithoutDrop)
        {
            return true;
        }
    }

    return false;
}

int part2(string inputFile)
{
    return inputFile
        .readText
        .split("\n")
        .filter!(a => a.length > 0)
        .map!(a => a.split(" ").map!(b => b.to!int))
        .map!(a => a.array.isValidWithDrop)
        .filter!(a => a)
        .count
        .to!int;
}

void both(string inputFile)
{
    import std.stdio;
    writeln("Day 2 Part 1: ", part1(inputFile));
    writeln("Day 2 Part 2: ", part2(inputFile));
}