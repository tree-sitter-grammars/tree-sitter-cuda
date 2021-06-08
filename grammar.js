const CPP = require("tree-sitter-cpp/grammar")

module.exports = grammar(CPP, {
    name: 'cuda',

    externals: $ => [
        $.raw_string_literal
    ],

    rules: {
        _top_level_item: (_, original) => original,

        function_definition: (_, original) => seq(
            seq(
                repeat(
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
    }
});
