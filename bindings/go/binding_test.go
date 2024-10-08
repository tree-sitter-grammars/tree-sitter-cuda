package tree_sitter_cuda_test

import (
	"testing"

	tree_sitter "github.com/smacker/go-tree-sitter"
	"github.com/tree-sitter/tree-sitter-cuda"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_cuda.Language())
	if language == nil {
		t.Errorf("Error loading Cuda grammar")
	}
}
