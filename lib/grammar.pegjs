{
  const INDENT_STEP = 2;
  var indentLevel = 0;
}

Start
  = Statements

Statements
  = Statement*

Statement
  = Samedent stmt:Assignment { return stmt; }
  / Samedent stmt:If_Statement { return stmt; }
  / Samedent stmt:Function_Definition_Statement { return stmt; }
  / Samedent stmt:Function_Call _ EOS { return stmt; }
  / Samedent stmt:Return { return stmt; }
  / _ EOL { return { type: 'EMPTY_LINE' } }

// FUNCTION DEFINITION
// =====================================================================================================================
Parameter_Array_Braces
  = _ braces:"[]"+ { return braces.length }

Parameter
  = name:Identifier ref:(_ ":" _ "ref")? _ ":" _ as:Identifier array:Parameter_Array_Braces?
    { return { type: 'PARAMETER', name: name.value, as: as.value, ref: !!ref, array: +array } }

Parameter_List
  = param:Parameter _ "," _ list:Parameter_List { return { type: 'PARAMETER_LIST', params: [param].concat(list.params) } }
  / param:Parameter                             { return { type: 'PARAMETER_LIST', params: [param] } }

Type_Definition
  = ":" _ type:Identifier { return type }

Function_Definition_Statement "def"
  = "def" __ name:Identifier _ "(" _ args:Parameter_List? _ ")" _ type:Type_Definition? _ Indent body:Statements Dedent
    { return { type: 'FUNCTION_DEFINITION', name: name.value, args, body, returnType: type ? type.value : 'VOID' } }

// IF
// =====================================================================================================================
If_Statement "if"
  = "if" __ condition:Expression EOL Indent stmts:Statements Dedent
  { return { type: 'IF', condition, stmts } }

// ASSIGNMENT
// =====================================================================================================================
Assignment "assignment"
  = lhs:Identifier _ "=" _ rhs:Expression _ EOS
  { return { type: 'ASSIGNMENT', lhs, rhs } }

// RETURN
// =====================================================================================================================
Return "return"
  = "return" __ expr:Expression _ EOS { return { type: 'RETURN', value: expr } }

// EXPRESSIONS
// =====================================================================================================================
Expression
  = Binop_Boolean

Binop_Boolean
  = lhs:Binop_Comparison _ "and" _ rhs:Binop_Boolean    { return { type: 'BINOP', operator: 'AND', lhs, rhs } }
  / lhs:Binop_Comparison _ "or" _ rhs:Binop_Boolean     { return { type: 'BINOP', operator: 'OR', lhs, rhs } }
  / Binop_Comparison

Binop_Comparison
  = lhs:Binop_Addition _ "<>" _ rhs:Binop_Comparison     { return { type: 'BINOP', operator: 'NEQ', lhs, rhs } }
  / lhs:Binop_Addition _ "isnt" _ rhs:Binop_Comparison   { return { type: 'BINOP', operator: 'NEQ', lhs, rhs } }
  / lhs:Binop_Addition _ "==" _ rhs:Binop_Comparison { return { type: 'BINOP', operator: 'EQ', lhs, rhs } }
  / lhs:Binop_Addition _ "is" _ rhs:Binop_Comparison     { return { type: 'BINOP', operator: 'EQ', lhs, rhs } }
  / lhs:Binop_Addition _ ">=" _ rhs:Binop_Comparison     { return { type: 'BINOP', operator: 'GTEQ', lhs, rhs } }
  / lhs:Binop_Addition _ "<=" _ rhs:Binop_Comparison     { return { type: 'BINOP', operator: 'LTEQ', lhs, rhs } }
  / lhs:Binop_Addition _ ">" _ rhs:Binop_Comparison      { return { type: 'BINOP', operator: 'GT', lhs, rhs } }
  / lhs:Binop_Addition _ "<" _ rhs:Binop_Comparison      { return { type: 'BINOP', operator: 'LT', lhs, rhs } }
  / Binop_Addition

Binop_Addition
  = lhs:Binop_Mult _ "-" _ rhs:Binop_Addition { return { type: 'BINOP', operation: 'MINUS', lhs, rhs } }
  / lhs:Binop_Mult _ "+" _ rhs:Binop_Addition { return { type: 'BINOP', operation: 'PLUS', lhs, rhs } }
  / Binop_Mult

Binop_Mult
  = lhs:Unary_Expression  _ "*" _ rhs:Binop_Mult { return { type: 'BINOP', operation: 'TIMES', lhs, rhs } }
  / lhs:Unary_Expression  _ "/" _ rhs:Binop_Mult { return { type: 'BINOP', operation: 'DIV', lhs, rhs } }
  / lhs:Unary_Expression  _ "%" _ rhs:Binop_Mult { return { type: 'BINOP', operation: 'MOD', lhs, rhs } }
  / Unary_Expression

Unary_Expression
  = 'not' _ expr:Expression { return { type: 'UNARY', operator: 'NOT', value: expr } }
  / '-' _ expr:Expression { return { type: 'UNARY', operator: 'MINUS', value: expr } }
  / Inline_Array

// INLINE ARRAY
// =====================================================================================================================
Inline_Array_Items_Tail
  = _ "," _ item:Literal { return item }

Inline_Array_Items
  = item:Literal tail:Inline_Array_Items_Tail* { return [item].concat(tail) }

Inline_Array
  = "[" _ items:Inline_Array_Items _ "]" { return { type: 'INLINE_ARRAY', items } }
  / Literal

// LITERALS
// =====================================================================================================================
Literal
  = "(" _ expr:Expression _ ")" { return expr }
  / Function_Call
  / String
  / Number
  / Boolean
  / Dot_Access

// FUNCTION CALL
// =====================================================================================================================
Argument_List
  = arg:Expression _ "," _ list:Argument_List { return { type: 'ARGUMENT_LIST', args: [arg].concat(list.args) } }
  / arg:Expression                            { return { type: 'ARGUMENT_LIST', args: [arg] } }

Function_Call "function call"
  = name:Identifier _ "(" _ args:Argument_List? _ ")"
  { return { type: 'FUNCTION_CALL', name: name.value, args: args } }
  / name:Dot_Access _ "(" _ args:Argument_List? _ ")"
  { return { type: 'DOT_CALL', receiver: name.receiver, property: name.property, args: args } }

// DOT ACCESS
// =====================================================================================================================
Dot_Access
  = receiver:Array_Identifier _ "." _ prop:Dot_Access { return { type: 'DOT_PROPERTY', receiver, prop } }
  / Array_Identifier

// ARRAY IDENTIFIER
// =====================================================================================================================
ArrayIdentifier_Array_Numbers
  = index:Expression _ "," _ indeces:ArrayIdentifier_Array_Numbers { return [index].concat(indeces) }
  / index:Expression { return [index] }

ArrayIdentifier_Braces
  = _ "[" _ nums:ArrayIdentifier_Array_Numbers _ "]" { return [].concat(nums) }

Array_Identifier
  = identifier:Identifier index:ArrayIdentifier_Braces { return { type: 'ARRAY_ACCESS', identifier, index } }
  / Identifier

// IDENTIFIER
// =====================================================================================================================
Invalid_Identifiers
  = "def"
  / "if"

Identifier
  = (!Invalid_Identifiers [a-zA-Z][a-zA-Z0-9-_#$]*) { return { type: 'IDENTIFIER', value: text() } }

// REMAINING LITERALS
// =====================================================================================================================
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

Boolean
  = "true"i  { return { type: 'BOOLEAN', value: true } }
  / "yes"i   { return { type: 'BOOLEAN', value: true } }
  / "on"i    { return { type: 'BOOLEAN', value: true } }
  / "false"i { return { type: 'BOOLEAN', value: false } }
  / "no"i    { return { type: 'BOOLEAN', value: false } }
  / "off"i   { return { type: 'BOOLEAN', value: false } }

Samedent "correct indentation"
  = spaces:" "* &{ return spaces.length === indentLevel * INDENT_STEP }

Indent
  = &{ indentLevel++; return true; }

Dedent
  = &{ indentLevel--; return true; }

Comment
  = "#" [^\n]* { return { type: 'COMMENT' } }

_ "whitespace"
  = [ \t\r]* Comment _
  / [ \t\r]*

__ "mandatory whitespace"
  = [ \t\r] _

EOS
  = EOL
  / EOF

EOL
  = "\n"

EOF
  = !.
