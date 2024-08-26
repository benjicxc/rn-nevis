//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

struct MethodChannelData {
	let resolver: RCTPromiseResolveBlock
	let rejecter: RCTPromiseRejectBlock
}

class MethodChannelHandler {
	enum Constants: String {
		case errorCode = "NMA_SDK"
	}
	
	static let shared = MethodChannelHandler()

	// MARK: Properties

	var channelData: [ReactMethod: MethodChannelData] = [:]

	// MARK: Initialization

	private init() {}

	// MARK: Public Interface

	func resolve(method: ReactMethod, message: ChannelOutMessage?) {
		do {
			if let data = channelData.removeValue(forKey: method) {
				if let message {
					let arguments = try JsonMapper.encode(message)
					data.resolver(arguments)
				} else {
					data.resolver(nil)
				}
			}
		}
		catch {
			if let message {
				OperationCache.shared.delete(by: message.operationId)
			}
			print(error.localizedDescription)
		}
	}

	func reject(method: ReactMethod, message: ChannelOutMessage) {
		do {
			if let data = channelData.removeValue(forKey: method) {
				let arguments = try JsonMapper.encode(message)
				let error = NSError(domain: Constants.errorCode.rawValue, code: 0, userInfo: arguments)
				data.rejecter(Constants.errorCode.rawValue, message.operationId, error)
			}
		}
		catch {
			print(error.localizedDescription)
		}

		OperationCache.shared.delete(by: message.operationId)
	}
}
