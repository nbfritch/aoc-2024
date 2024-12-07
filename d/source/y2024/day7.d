module y2024.day7;

import std.algorithm;
import std.array;
import std.conv;
import std.file;
import std.format;
import std.math.algebraic;
import std.range;

bool canCreate(long target, long value, long[] otherValues)
{
    if (value > target) return false;
    if (otherValues.length == 0)
    {
        return target == value;
    }

    auto nextOtherValues = otherValues.dup;
    auto nextValue = nextOtherValues[0];
    nextOtherValues.popFrontN(1);
    if (canCreate(target, value + nextValue, nextOtherValues)) return true;
    if (canCreate(target, value * nextValue, nextOtherValues)) return true;

    return false;
}

long part1(string inputFile)
{
    return inputFile.readText.split("\n").filter!(a => a.length > 0).map!((line) {
        auto lineParts = line.split(": ");
        auto target = lineParts[0].to!long;
        auto values = lineParts[1].split(" ").map!(p => p.to!long).array;
        if (canCreate(target, 0, values))
        {
            return target;
        }
        return 0;
    })
    .sum;
}

pragma(inline):
long concatenate(long n1, long n2)
{
    return format("%d%d", n1, n2).to!long;
}

bool canCreateWithConcat(long target, long value, long[] otherValues)
{
    if (value > target) return false;

    if (otherValues.length == 0)
    {
        return target == value;
    }

    auto nextValue = otherValues[0];
    otherValues.popFrontN(1);
    if (canCreateWithConcat(target, value + nextValue, otherValues)) return true;
    if (canCreateWithConcat(target, value * nextValue, otherValues)) return true;
    if (canCreateWithConcat(target, concatenate(value, nextValue), otherValues)) return true;

    return false;
}

long part2(string inputFile)
{
    return inputFile.readText.split("\n").filter!(a => a.length > 0).map!((line) {
        auto lineParts = line.split(": ");
        auto target = lineParts[0].to!long;
        auto values = lineParts[1].split(" ").map!(p => p.to!long).array;
        if (canCreate(target, 0, values))
        {
            return target;
        }
        else if (canCreateWithConcat(target, 0, values))
        {
            return target;
        }
        return 0;
    })
    .sum;
}

void both(string inputFile)
{
    import std.stdio;
    writeln("Day 7 Part 1: ", part1(inputFile));
    writeln("Day 7 Part 2: ", part2(inputFile));
}