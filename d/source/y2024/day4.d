module y2024.day4;

import std.algorithm;
import std.array;
import std.conv;
import std.file;
import std.stdio;
import std.string;

const xmas = "XMAS";

bool findXmas(string[] search, ulong x, ulong y, int dx, int dy)
{
    auto xx = x;
    auto yy = y;
    for (auto i = 0; i < xmas.length; i++)
    {
        if (search[yy][xx] != xmas[i])
        {
            return false;
        }

        xx += dx;
        yy += dy;
        if (yy < 0 || yy >= search.length || xx < 0 || xx >= search[yy].length)
        {
            return false;
        }
    }
    return true;
}

int part1(string inputFile)
{
    auto search = inputFile.readText.split("\n").filter!(a => a.length > 0).array;
    auto c = 0;
    foreach (y, row; search)
    {
        foreach (x, col; row)
        {
            if (col == 'X')
            {
                for(auto dx = -1; dx <= 1; dx++)
                {
                    for(auto dy = -1; dy <= 1; dy++)
                    {
                        if (dx == 0 && dy == 0)
                        {
                            continue;
                        }
                        if (findXmas(search, x, y, dx, dy))
                        {
                            c++;
                        }
                    }
                }
            }
        }
    }
    return c;
}

int part2(string inputFile)
{
    auto search = inputFile.readText.split("\n").filter!(a => a.length > 0).array;
    auto c = 0;
    foreach (y, row; search)
    {
        foreach (x, col; row)
        {
            if (col == 'A')
            {
                if (y == 0 || y == search.length.to!int - 1 || x == 0 || x == row.length.to!int - 1)
                {
                    continue;
                }
                int[][] corners = [[1, -1], [1, 1], [-1, 1], [-1, -1]];
                auto adjacentChars = corners.map!(a => search[y + a[1]][x + a[0]]);
                auto f = format("%s%s%s%s", adjacentChars[0], adjacentChars[1], adjacentChars[2], adjacentChars[3]);
                if (f == "SSMM" || f == "MMSS" || f == "SMMS" || f == "MSSM")
                {
                    c++;
                }
            }
        }
    }
    return c;
}

void both(string inputFile)
{
    import std.stdio;
    writeln("Day 4 Part 1: ", part1(inputFile));
    writeln("Day 4 Part 2: ", part2(inputFile));
}
