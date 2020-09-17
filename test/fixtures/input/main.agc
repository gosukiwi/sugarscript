// types.ss, line ~2
type Person
name as string
age as integer
endtype
// types.ss, line 3
p as Person
// types.ss, line 4
p.name = 'Federico'
// types.ss, line 5
p.age = 30
__SSINTERNAL0 as string
__SSINTERNAL0 = 'output.txt'
__SSINTERNAL1 as integer
__SSINTERNAL1 = 0
// types.ss, line 7
file as integer
file = OpenToWrite(__SSINTERNAL0, __SSINTERNAL1)
__SSINTERNAL2 as integer
__SSINTERNAL2 = file
__SSINTERNAL3 as string
__SSINTERNAL3 = 'Person name is ' + p.name + ', age is ' + Str(p.age) + ''
// types.ss, line 8
WriteString(__SSINTERNAL2, __SSINTERNAL3)
__SSINTERNAL4 as integer
__SSINTERNAL4 = file
// types.ss, line 9
CloseFile(__SSINTERNAL4)
