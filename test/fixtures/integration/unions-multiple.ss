type Circle(area: integer)
type Square(area: integer)
type Shape(Circle | Square)

let shape: Shape
shape = { area: 2 }: Square
let file = OpenToWrite('output.txt', 0)
with shape
  when s: (Circle | Square)
    WriteString(file, "Area is #{s.area}")
  else
    WriteString(file, "Invalid")
CloseFile(file)
