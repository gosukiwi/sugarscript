type Person(name: string, age: integer)

let p: Person
p.name = 'Federico'
p.age = 30

let file = OpenToWrite('output.txt', 0)
WriteString(file, "Person name is #{p.name}, age is #{p.age}")
CloseFile(file)
