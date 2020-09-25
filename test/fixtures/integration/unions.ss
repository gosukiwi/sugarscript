type Circle(radius: integer)
type Square(sides: integer)
type Shape(Circle, Square)

def area(shape: Shape): integer
  with shape
    when square: Square
      return square.sides * square.sides
    when circle: Circle
      return 3.14 * circle.radius * circle.radius
    else
      return 0
      
let shape: Shape
shape = { sides: 2 }: Square
let file = OpenToWrite('output.txt', 0)
WriteString(file, "Area is #{area(shape)}")
CloseFile(file)
