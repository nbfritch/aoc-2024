import std.conv;
import std.stdio;
import y2024.run;

void main(string[] args)
{
	if (args.length < 2)
	{
		writeln("Usage: adventofcode <day> <input_file>");
		return;
	}

	run(args[2], args[1].to!int);
}
