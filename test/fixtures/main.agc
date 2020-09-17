// in-memory://, line 4
function foo()
exitfunction 1
endfunction 0

// in-memory://, line 6
function bar()
exitfunction foo()
endfunction 0

// in-memory://, line 1
function baz()
// in-memory://, line 2
a as integer
a = 1
endfunction

