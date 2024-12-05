module y2024.day1;

import std.algorithm;
import std.array;
import std.conv;
import std.file;
import std.math.algebraic;
import std.range;

int part1(string inputFile)
{
    auto numbers = inputFile.slurp!(int, int)("%d   %d").array;
    auto left = numbers.map!(a => a[0]).array.sort;
    auto right = numbers.map!(a => a[1]).array.sort;
    return zip(left, right).map!(a => abs(a[0] - a[1])).sum;
}

int part2(string inputFile)
{
    auto numbers = inputFile.slurp!(int, int)("%d   %d").array;
    auto left = numbers.map!(a => a[0]).array.sort;
    auto right = numbers.map!(a => a[1]).array.sort;
    return left.map!(a => a * right.count!(b => a == b).to!int).sum;
}

void both(string inputFile)
{
    import std.stdio;
    writeln("Day 1 Part 1: ", part1(inputFile));
    writeln("Day 1 Part 2: ", part2(inputFile));
}