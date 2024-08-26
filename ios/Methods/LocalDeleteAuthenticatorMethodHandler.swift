//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

import NevisMobileAuthentication

struct LocalDeleteAuthenticatorMethodHandler: MethodHandler {
    func execute(using client: MobileAuthenticationClient, with message: ChannelInMessage) throws {
        let message: LocalDeleteAuthenticatorMessage = try validate(message: message)
        
        DispatchQueue.global().async {
            do {
                // This method must not be called on DispatchQueue.main thread.
                try client.localData.deleteAuthenticator(username: message.username,
                                                         aaid: message.aaid)
                DispatchQueue.main.async {
                    MethodChannelHandler.shared.resolve(method: .localDeleteAuthenticator, message: nil)
                }
            } catch {
                DispatchQueue.main.async {
                    let message = ErrorMessage(operationId: message.operationId, error: error)
                    MethodChannelHandler.shared.reject(method: .localDeleteAuthenticator, message: message)
                }
            }
        }
    }
}
