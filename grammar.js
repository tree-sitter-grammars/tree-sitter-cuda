const CPP = require("tree-sitter-cpp/grammar")

module.exports = grammar(CPP, {
    name: 'cuda',

    externals: $ => [
        $.raw_string_literal
    ],

    function_definition: ($, original) => seq(
        seq(
            rep(
                choice(
                    '__device__',
                    '__host__',
                    '__forceinline__'
                )
            ),
        ), original
    ),


    type_qualifier: (_, original) => choice(
        original,
        '__shared__',
        '__global__',
        '__local__',
        '__constant__',
    ),
});
