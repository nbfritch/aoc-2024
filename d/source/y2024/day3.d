module y2024.day3;

import std.algorithm;
import std.array;
import std.conv;
import std.file;
import std.format;
import std.regex;
import std.stdio;
import std.string;

auto part1Regex = ctRegex!(`mul\([0-9]+\,[0-9]+\)`);

int part1(string inputFile)
{
    return inputFile
        .readText
        .matchAll(part1Regex)
        .map!(a =>
            a.hit
                .replace("mul(", "")
                .replace(")", "")
                .replace(",", " ")
                .split(" ")
                .map!(b => b.to!int))
            .map!(a => a[0] * a[1])
            .sum;
}

auto part2Regex = ctRegex!(`mul\([0-9]+\,[0-9]+\)|don\'t\(\)|do\(\)`);

int part2(string inputFile)
{
    auto muls = inputFile
        .readText
        .matchAll(part2Regex)
        .map!(a => a.hit).array;
    auto sum = 0;
    auto enable = true;
    foreach (a; muls)
    {
        if (a == "do()")
        {
            enable = true;
            continue;
        }
        else if (a == "don't()")
        {
            enable = false;
            continue;
        }
        if (enable) {
            auto v = a.replace("mul(", "")
                .replace(")", "")
                .replace(",", " ")
                .split(" ")
                .map!(b => b.to!int);
            sum += v[0] * v[1];
        }
    }
    return sum;
}

void both(string inputFile)
{
    import std.stdio;
    writeln("Day 3 Part 1: ", part1(inputFile));
    writeln("Day 3 Part 2: ", part2(inputFile));
}
