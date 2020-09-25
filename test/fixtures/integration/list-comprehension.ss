let result = [i for i in [1, 2, 3, 4] when i % 2 is 0]
let file = OpenToWrite('output.txt', 0)
WriteString(file, "Numbers are #{result[0]} and #{result[1]}, the length is #{array_length(result)}")
CloseFile(file)
