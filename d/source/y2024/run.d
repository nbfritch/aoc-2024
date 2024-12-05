module y2024.run;

void run(string inputFile, int day)
{
    switch (day)
    {
        case 1:
            import y2024.day1;
            y2024.day1.both(inputFile);
            break;
        case 2:
            import y2024.day2;
            y2024.day2.both(inputFile);
            break;
        default:
            import std.stdio;
            writeln("Day ", day, " not implemented yet.");
    }
}