/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { Account } from './Account';

/**
 * The object containing the user enrollment information. Depending on the
 * nature of the authenticator, this object will be either a {@link OsUserEnrollment}
 * or an {@link SdkUserEnrollment}.
 */
export abstract class UserEnrollment {
	/**
	 * Tells whether a given user is enrolled or not.
	 *
	 * @param username the username.
	 * @returns true if the user is enrolled, false otherwise.
	 */
	abstract isEnrolled(username: string): boolean;

	/**
	 * Alternate constructor that creates a {@link UserEnrollment} from a json.
	 *
	 * @param json contains the source for instance creation.
	 * @returns a {@link UserEnrollment} instance.
	 */
	static fromJson(json: any): UserEnrollment {
		const type = json.type;
		const data = json.data;
		if (type === 'OsUserEnrollment') {
			return OsUserEnrollment.fromJson(data);
		} else if (type === 'SdkUserEnrollment') {
			return SdkUserEnrollment.fromJson(data);
		}

		throw new Error(`Unknown user enrollment (${type}).`);
	}
}

/**
 * The object containing the user enrollment information for an authenticator
 * whose credentials are managed by the operating system (like the fingerprint
 * authenticator). In this case, there is no notion of {@link Account}:
 * either the authenticator is enrolled at the operating system level (for all
 * users) or not.
 */
export abstract class OsUserEnrollment extends UserEnrollment {
	/**
	 * Returns true if the user is enrolled to the OS based authenticator, false otherwise.
	 */
	abstract isOSEnrolled: boolean;

	/**
	 * For the biometric authenticator, returns true if the user is enrolled in the OS with at least
	 * one [Class 2 (formerly weak) or Class 3 (formerly strong)](https://source.android.com/docs/security/features/biometric/measure#biometric-classes)
	 * biometric sensor, false otherwise.
	 *
	 * For the PIN and fingerprint authenticators, it returns the same value as {@link isEnrolled}.
	 *
	 * **IMPORTANT** \
	 * This property is Android specific and will be ignored by iOS native plugin.
	 *
	 * This method must be used on Android instead of {@link isEnrolled} if Class 2 biometric sensors
	 * were allowed during registration of a biometric authenticator. If no Class 2 biometric sensor
	 * is allowed, this method will return the same value as {@link isEnrolled}.
	 */
	abstract isEnrolledWithClass2OrClass3Sensor: boolean;

	/**
	 * Alternate constructor that creates a {@link OsUserEnrollment} from a json.
	 *
	 * @param json contains the source for instance creation.
	 * @returns a {@link OsUserEnrollment} instance.
	 */
	static fromJson(json: any): OsUserEnrollment {
		return OsUserEnrollmentImpl.fromJson(json);
	}
}

class OsUserEnrollmentImpl extends OsUserEnrollment {
	isOSEnrolled: boolean;
	isEnrolledWithClass2OrClass3Sensor: boolean;

	private constructor(isOSEnrolled: boolean, isEnrolledWithClass2OrClass3Sensor: boolean) {
		super();
		this.isOSEnrolled = isOSEnrolled;
		this.isEnrolledWithClass2OrClass3Sensor = isEnrolledWithClass2OrClass3Sensor;
	}

	static fromJson(json: any): OsUserEnrollmentImpl {
		const isEnrolled = json.isEnrolled;
		const isEnrolledWithClass2OrClass3Sensor = json.isEnrolledWithClass2OrClass3Sensor;
		return new OsUserEnrollmentImpl(isEnrolled, isEnrolledWithClass2OrClass3Sensor);
	}

	// eslint-disable-next-line  @typescript-eslint/no-unused-vars
	isEnrolled(_username: string): boolean {
		return this.isOSEnrolled;
	}
}

/**
 * The object containing the user enrollment information for an authenticator whose
 * credentials are managed by the SDK (like the PIN authenticator).
 */
export abstract class SdkUserEnrollment extends UserEnrollment {
	/**
	 * Returns the objects representing the accounts that are enrolled with this authenticator.
	 */
	abstract enrolledAccounts: Array<Account>;

	/**
	 * Alternate constructor that creates an {@link SdkUserEnrollment} from a json.
	 *
	 * @param json contains the source for instance creation.
	 * @returns an {@link SdkUserEnrollment} instance.
	 */
	static fromJson(json: any): SdkUserEnrollment {
		return SdkUserEnrollmentImpl.fromJson(json);
	}
}

class SdkUserEnrollmentImpl extends SdkUserEnrollment {
	enrolledAccounts: Array<Account>;

	private constructor(enrolledAccounts: Array<Account>) {
		super();
		this.enrolledAccounts = enrolledAccounts;
	}

	static fromJson(json: any): SdkUserEnrollmentImpl {
		const enrolledAccountsData = json.enrolledAccounts;
		const accounts = enrolledAccountsData.map((element: any) => Account.fromJson(element));

		return new SdkUserEnrollmentImpl(accounts);
	}

	isEnrolled(username: string): boolean {
		return (
			this.enrolledAccounts.filter((account) => {
				return account.username === username;
			}).length > 0
		);
	}
}
