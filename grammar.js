const CPP = require("tree-sitter-cpp/grammar")

module.exports = grammar(CPP, {
    name: 'cuda',

    externals: $ => [
        $.raw_string_literal
    ],
    conflicts: ($, original) => original.concat([
        [$.call_expression, $.delete_expression]
    ]),


    rules: {
        _top_level_item: (_, original) => original,

        function_definition: (_, original) => seq(
            seq(
                repeat(
                    choice(
                        '__device__',
                        '__host__',
                        prec(10, '__global__'),
                        '__forceinline__'
                    )
                ),
            ), original
        ),

        call_expression: ($, original) => choice(original, seq(
            field('function', $._expression),
            $.kernel_call_syntax,
            field('arguments', $.argument_list),
        )),

        kernel_call_syntax: $ => seq("<<<", $._expression, optional(seq(",", $._expression)), ">>>"),

        type_qualifier: (_, original) => choice(
            original,
            '__shared__',
            '__global__',
            '__local__',
            '__constant__',
        ),
    }
});
