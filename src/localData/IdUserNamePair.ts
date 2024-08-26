/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

/**
 * The {@link DeviceInformation} represents a set of dispatch targets on the backend
 * side. For each account there is a dispatch target entry in the backend. This object
 * exposes the ID of the dispatch target for each account.
 *
 * The {@link DeviceInformation} stores a set of generic credentials representing
 * dispatch targets in nevisIDM. For each account there is a generic credential
 * in nevisIDM. This object exposes the value of the `Identification` attribute
 * of each of the generic credentials for each account.
 */
export abstract class IdUserNamePair {
	/**
	 * The ID of the generic credential containing the dispatch target information
	 * (the `dispatch_target_` prefix is removed). This is presented as `Identification`
	 * of the generic credential in the nevisIDM administration web interface.
	 */
	abstract identifier: string;

	/**
	 * The username of the account.
	 */
	abstract username: string;

	/**
	 * Default constructor for {@link IdUserNamePair}.
	 *
	 * @param identifier the ID of the generic credential containing the dispatch target information
	 * @param username the username of the account.
	 * @returns an {@link IdUserNamePair} instance.
	 */
	static create(identifier: string, username: string): IdUserNamePair {
		return new IdUserNamePairImpl(identifier, username);
	}

	/**
	 * Alternate constructor that creates an {@link IdUserNamePair} from a json.
	 *
	 * @param json contains the source for instance creation.
	 * @returns an {@link IdUserNamePair} instance.
	 */
	static fromJson(json: any): IdUserNamePair {
		return IdUserNamePairImpl.fromJson(json);
	}
}

export class IdUserNamePairImpl extends IdUserNamePair {
	identifier: string;
	username: string;

	constructor(identifier: string, username: string) {
		super();
		this.identifier = identifier;
		this.username = username;
	}

	static fromJson(json: any): IdUserNamePairImpl {
		return new IdUserNamePairImpl(json.identifier, json.username);
	}
}
