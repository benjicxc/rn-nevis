//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import Foundation

class JsonMapper {
	static func encode(_ value: some Encodable) throws -> [String: Any]? {
		let data = try JSONEncoder().encode(value)
		return try JSONSerialization.jsonObject(with: data) as? [String: Any]
	}

	static func decode<T>(_ type: T.Type, from value: Any) throws -> T where T: Decodable {
		let jsonData = try JSONSerialization.data(withJSONObject: value, options: .prettyPrinted)
		return try JSONDecoder().decode(type, from: jsonData)
	}
}
