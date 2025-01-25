import XCTest
import SwiftTreeSitter
import TreeSitterCuda

final class TreeSitterCudaTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_cuda())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading CUDA grammar")
    }
}
