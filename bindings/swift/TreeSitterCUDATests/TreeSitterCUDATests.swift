import XCTest
import SwiftTreeSitter
import TreeSitterCUDA

final class TreeSitterCUDATests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_cuda())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading CUDA grammar")
    }
}
