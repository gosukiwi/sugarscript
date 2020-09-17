// main.ss, line 4
function foo()
exitfunction 1
endfunction 0

// main.ss, line 6
function bar()
exitfunction foo()
endfunction 0

// helper.ss, line 1
function baz()
// helper.ss, line 2
a as integer
a = 1
endfunction

