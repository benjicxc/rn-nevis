//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct OutOfBandPayloadDecodeMethodHandler: MethodHandler {
	func execute(using client: MobileAuthenticationClient, with message: ChannelInMessage) throws {
		let message: OutOfBandPayloadDecodeMessage = try validate(message: message)
		let operation = OutOfBandPayloadDecodeOperation(operationId: message.operationId)
		OperationCache.shared.put(operation, using: message.operationId)

		let outOfBandPayloadDecode = client.operations.outOfBandPayloadDecode
		if let json = message.json {
			outOfBandPayloadDecode.json(json)
		}

		if let base64UrlEncoded = message.base64UrlEncoded {
			outOfBandPayloadDecode.base64UrlEncoded(base64UrlEncoded)
		}

		if message.onSuccessProvided {
			outOfBandPayloadDecode.onSuccess { operation.onSuccess($0) }
		}

		if message.onErrorProvided {
			outOfBandPayloadDecode.onError(operation.onError)
		}

		outOfBandPayloadDecode.execute()
	}
}
