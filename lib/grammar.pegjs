Program
  = _ expr:Expression+ _ { return expr }

Expression
  = Function_Definition
  / Assignment
  / List
  / Atom

Assignment
  = "(" _ "let" __ name:Identifier __ value:Expression _ ")"
  { return { type: 'LET', name: name.value, value } }

Function_Definition
  = "(" _ "def" _ name:Identifier _ params:List _ body:List* _ ")"
  { return { type: 'DEF', name, params, body } }

List
  = "(" _ atoms:AtomList? _ ")" { return { type: 'LIST', atoms: atoms || [] } }

AtomList
  = atom:Atom __ list:AtomList { return [atom].concat(list) }
  / atom:Atom { return [atom] }

// ATOMS
Atom
  = Number
  / Symbol
  / String
  / Identifier

Identifier
  // = (!Invalid_Identifiers [a-zA-Z][a-zA-Z0-9-_#$]*) { return { type: 'IDENTIFIER', value: text() } }
  = [a-zA-Z][a-zA-Z0-9-_?]* { return { type: 'IDENTIFIER', value: text() } }
  / [+*/%-=] { return { type: 'IDENTIFIER', value: text() } }

Symbol
  = ":" name:Identifier { return { type: 'SYMBOL', value: name.value } }

String
  = '""'                     { return { type: 'STRING', value: "" }    }
  / '"' chars:Characters '"' { return { type: 'STRING', value: chars } }

Characters
  = Characters:Single_Character+ { return Characters.join(""); }

Single_Character // any unicode character except " or \ or control character
  = [^"\\\0-\x1F\x7f]
  / '\\"'  { return '"';  }
  / "\\\\" { return "\\"; }
  / "\\/"  { return "/";  }
  / "\\b"  { return "\b"; }
  / "\\f"  { return "\f"; }
  / "\\n"  { return "\n"; }
  / "\n"   { return "\n"; }
  / "\\r"  { return "\r"; }
  / "\\t"  { return "\t"; }

Number
  = Float
  / Integer

Float
  = "." t:[0-9]+          { return { type: 'FLOAT', value: parseFloat('0.' + t.join('')) } }
  / h:[0-9]+ "." t:[0-9]+ { return { type: 'FLOAT', value: parseFloat(h.join('') + '.' + t.join('')) } }

Integer
  = Octal
  / Hexadecimal
  / Binary
  / [0-9]+ { return { type: 'INTEGER', value: parseInt(text(), 10) } }

Binary
  = "0b" num:[01]+ { return { type: 'BINARY_INTEGER', value: num.join('') } }

Octal
  = "0c" num:[0-7]+ { return { type: 'OCTAL_INTEGER', value: num.join('') } }

Hexadecimal
  = "0x" num:[0-9A-F]+ { return { type: 'HEXADECIMAL_INTEGER', value: num.join('') } }

_ "whitespace"
  = [ \t\n\r]* Comment _
  / [ \t\n\r]*

__ "mandatory whitespace"
  = [ \t\n\r] _

Comment
  = "/*" (!"*/" .)* "*/"                  { return { type: 'COMMENT' } }
  / "//" [^\n]*                           { return { type: 'COMMENT' } }
