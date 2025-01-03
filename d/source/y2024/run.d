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
        case 3:
            import y2024.day3;
            y2024.day3.both(inputFile);
            break;
        case 4:
            import y2024.day4;
            y2024.day4.both(inputFile);
            break;
        case 5:
            import y2024.day5;
            y2024.day5.both(inputFile);
            break;
        case 7:
            import y2024.day7;
            y2024.day7.both(inputFile);
            break;
        case 9:
            import y2024.day9;
            y2024.day9.both(inputFile);
            break;
        default:
            import std.stdio;
            writeln("Day ", day, " not implemented yet.");
    }
}