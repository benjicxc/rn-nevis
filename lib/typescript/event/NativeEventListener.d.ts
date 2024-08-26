/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */
export declare class NativeEventListener {
    private static instance;
    private _eventEmitter;
    private _selectAccount?;
    private _selectAuthenticator?;
    private _enrollPin?;
    private _changePin?;
    private _verifyUser?;
    private _onValidCredentialsProvided?;
    private _onOperationType?;
    private constructor();
    static getInstance(): NativeEventListener;
    start(): void;
    stop(): void;
    listenToSelectAccount(): void;
    listenToSelectAuthenticator(): void;
    listenToEnrollPin(): void;
    listenToChangePin(): void;
    listenToVerifyUser(): void;
    listenToOnValidCredentialsProvided(): void;
    listenToOnOperationType(): void;
}
//# sourceMappingURL=NativeEventListener.d.ts.map