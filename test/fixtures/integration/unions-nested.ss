type Circle(area: integer)
type Square(area: integer)
type Triangle(area: integer)
type Polygon(Triangle, Square)
type Shape(Circle, Polygon)

let shape: Shape
let triangle: Polygon
triangle = { area: 3 }: Triangle
shape = triangle
let file = OpenToWrite('output.txt', 0)
with shape
  when polygon: Polygon
    with polygon
      when t: Triangle
        WriteString(file, "Area is #{t.area}")
      else
        WriteString(file, "Invalid")
  else
    WriteString(file, "Invalid")
CloseFile(file)
