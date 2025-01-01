module y2024.day9;

import std.algorithm;
import std.array;
import std.conv;
import std.file;
import std.math.algebraic;
import std.range;
import std.stdio;

struct FileBlock
{
    bool isEmpty;
    int id;
}

int part1(string inputFile)
{
    auto puzzle = inputFile.readText;
    FileBlock[] disk;
    auto diskPointer = 0;
    auto idPtr = 0;
    for (auto i = 0; i < puzzle.length; i++)
    {
        auto ichar = puzzle[i];
        auto size = ichar.to!string.to!int;
        // writefln("Size: %d", size);
        if (i % 2 == 0)
        {
            for (auto j = 0; j < size; j++)
            {
                auto f = FileBlock();
                f.isEmpty = false;
                f.id = idPtr;
                disk ~= f;
                diskPointer++;
            }
            idPtr++;
        }
        else
        {
            for (auto j = 0; j < size; j++)
            {
                auto f = FileBlock();
                f.isEmpty = true;
                disk ~= f;
                diskPointer++;
            }
        }
    }

    auto lastFilledIdx = 0;
    for (auto i = disk.length.to!int - 1; i >= 0; i--)
    {
        FileBlock* block = &disk[i];
        for (auto j = lastFilledIdx; j < i; j++)
        {
            if (disk[j].isEmpty)
            {
                FileBlock* swappedBlock = &disk[j];
                disk[i] = *swappedBlock;
                disk[j] = *block;
                lastFilledIdx = j;
            }
        }
    }

    for (auto i = 0; i < disk.length; i++)
    {
        if (disk[i].isEmpty) {
            writef(".");
        } else {
            writef("%d", disk[i].id);
        }
    }

    writefln("File count %d", idPtr);
    writefln("Disk size %d", diskPointer);
    return 0;
}

int part2(string inputFile)
{
    return 0;
}

void both(string inputFile)
{
    import std.stdio;
    writeln("Day 9 Part 1: ", part1(inputFile));
    writeln("Day 9 Part 2: ", part2(inputFile));
}