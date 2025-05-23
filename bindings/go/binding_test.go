package tree_sitter_cuda_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_cuda "github.com/tree-sitter-grammars/tree-sitter-cuda/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_cuda.Language())
	if language == nil {
		t.Errorf("Error loading CUDA grammar")
	}
}
