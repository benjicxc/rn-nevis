//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import Foundation

extension String {
	mutating func snakeUpperCased() {
		self = snakeUpperCase()
	}

	func snakeUpperCase() -> String {
		var result = ""
		var previousCharWasUppercased = false

		for (index, char) in enumerated() {
			var charStr = String(char)

			// remove (ignore) non-alphas
			if !charStr.isAlpha { continue }

			// If uppercase is found...
			if charStr == charStr.uppercased() {
				// If it's not the first letter, nor follows another lowercased letter, prepend an underscore
				// (If it followed another operated-on letter, we'd get "JSON" -> "j_s_o_n" instead of "json")
				if
					index != 0,
					!previousCharWasUppercased
				{
					charStr = "_" + charStr
				}
				previousCharWasUppercased = true
			}
			// If capital is not found, mark it for the next cycle, and move on.
			else { previousCharWasUppercased = false }
			result += charStr.uppercased()
		}
		return result
	}

	var isAlpha: Bool {
		let alphaSet = CharacterSet.uppercaseLetters.union(.lowercaseLetters).union(.whitespacesAndNewlines)
		return rangeOfCharacter(from: alphaSet.inverted) == nil
	}
}
