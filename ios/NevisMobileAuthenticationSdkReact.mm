//
// Copyright © 2023 Nevis Security AG. All rights reserved.
//

#import <React/RCTBridgeModule.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNNevisMobileAuthenticationSdkReactSpec.h"
@interface RCT_EXTERN_MODULE(NevisMobileAuthenticationSdkReact, NSObject<NativeNevisMobileAuthenticationSdkReactSpec>)
#else
@interface RCT_EXTERN_MODULE(NevisMobileAuthenticationSdkReact, NSObject<RCTBridgeModule>)
#endif

+ (BOOL)requiresMainQueueSetup { return NO; }

// MARK: - Basic SDK Incovations

RCT_EXTERN_METHOD(initClient:(NSDictionary *)message
				  resolver:(RCTPromiseResolveBlock)resolve
				  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(payloadDecode:(NSDictionary *)message
				  resolver:(RCTPromiseResolveBlock)resolve
				  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(oobOperation:(NSDictionary *)message
				  resolver:(RCTPromiseResolveBlock)resolve
				  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(oobRegister:(NSDictionary *)message
				  resolver:(RCTPromiseResolveBlock)resolve
				  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(oobAuthenticate:(NSDictionary *)message
				  resolver:(RCTPromiseResolveBlock)resolve
				  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(inBandRegister:(NSDictionary *)message
				  resolver:(RCTPromiseResolveBlock)resolve
				  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(authCloudApiRegister:(NSDictionary *)message
				  resolver:(RCTPromiseResolveBlock)resolve
				  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(authenticate:(NSDictionary *)message
				  resolver:(RCTPromiseResolveBlock)resolve
				  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(deregister:(NSDictionary *)message
				  resolver:(RCTPromiseResolveBlock)resolve
				  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(deviceInformationChange:(NSDictionary *)message
				  resolver:(RCTPromiseResolveBlock)resolve
				  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(pinChange:(NSDictionary *)message
				  resolver:(RCTPromiseResolveBlock)resolve
				  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(localAccounts:(NSDictionary *)message
				  resolver:(RCTPromiseResolveBlock)resolve
				  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(localDeleteAuthenticator:(NSDictionary *)message
				  resolver:(RCTPromiseResolveBlock)resolve
				  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(localAuthenticators:(NSDictionary *)message
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(localDeviceInformation:(NSDictionary *)message
				  resolver:(RCTPromiseResolveBlock)resolve
				  rejecter:(RCTPromiseRejectBlock)reject)


// MARK: - Auxiliary SDK invocations

RCT_EXTERN_METHOD(authenticatorAaid:(NSDictionary *)message
				  resolver:(RCTPromiseResolveBlock)resolve
				  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(pinEnroll:(NSDictionary *)message
				  resolver:(RCTPromiseResolveBlock)resolve
				  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(pinsChange:(NSDictionary *)message
				  resolver:(RCTPromiseResolveBlock)resolve
				  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(pinVerify:(NSDictionary *)message
				  resolver:(RCTPromiseResolveBlock)resolve
				  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(accountUsername:(NSDictionary *)message
				  resolver:(RCTPromiseResolveBlock)resolve
				  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(cancel:(NSDictionary *)message
				  resolver:(RCTPromiseResolveBlock)resolve
				  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(isPolicyCompliant:(NSDictionary *)message
				  resolver:(RCTPromiseResolveBlock)resolve
				  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(listenForOsCredentials:(NSDictionary *)message
				  resolver:(RCTPromiseResolveBlock)resolve
				  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(cancelAuthentication:(NSDictionary *)message
				  resolver:(RCTPromiseResolveBlock)resolve
				  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(pauseListening:(NSDictionary *)message
				  resolver:(RCTPromiseResolveBlock)resolve
				  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(resumeListening:(NSDictionary *)message
				  resolver:(RCTPromiseResolveBlock)resolve
				  rejecter:(RCTPromiseRejectBlock)reject)

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeNevisMobileAuthenticationSdkReactSpecJSI>(params);
}
#endif

@end
