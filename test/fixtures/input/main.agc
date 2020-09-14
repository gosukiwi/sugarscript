type Person
name as string
age as integer
endtype
p as Person
p.name = 'Federico'
p.age = 30
__SSINTERNAL0 as string
__SSINTERNAL0 = 'output.txt'
__SSINTERNAL1 as integer
__SSINTERNAL1 = 0
file as integer
file = OpenToWrite(__SSINTERNAL0, __SSINTERNAL1)
__SSINTERNAL2 as integer
__SSINTERNAL2 = file
__SSINTERNAL3 as string
__SSINTERNAL3 = 'Person name is ' + p.name + ', age is #{p.age}'
WriteString(__SSINTERNAL2, __SSINTERNAL3)
__SSINTERNAL4 as integer
__SSINTERNAL4 = file
CloseFile(__SSINTERNAL4)
