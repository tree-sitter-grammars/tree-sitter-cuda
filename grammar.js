const CPP = require("tree-sitter-cpp/grammar")

module.exports = grammar(CPP, {
    name: 'cuda',

    rules: {
        _top_level_item: (_, original) => original,

        _declaration_modifiers: ($, original) =>
            choice(
                $.launch_bounds,
                '__device__',
                '__host__',
                prec(10, '__global__'),
                '__forceinline__',
                '__noinline__',
                original
            ),

        delete_expression: (_, original) => prec.left(original),

        _expression: ($, original) => choice(
            original,
            alias(prec(10, $.kernel_call_expression), $.call_expression),
        ),

        kernel_call_expression: ($) => seq(
            field('function', $._expression),
            $.kernel_call_syntax,
            field('arguments', $.argument_list),
        ),

        kernel_call_syntax: $ => seq(alias(rep3('<'), '<<<'), $._expression, repeat(seq(",", $._expression)), alias(rep3('>'), '>>>')),

        type_qualifier: (_, original) => choice(
            original,
            '__shared__',
            '__global__',
            '__local__',
            '__constant__',
            '__restrict__',
            '__grid_constant__',
        ),

        launch_bounds: $ => seq("__launch_bounds__", "(", $._expression, optional(seq(",", $._expression),), ")"),
    }
});

function rep3(obj) {
    return token(seq(obj, /\s*/, obj, /\s*/, obj));
}
