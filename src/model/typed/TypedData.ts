/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

export abstract class TypedData<T> {
	abstract type: string;
	abstract data: T;
}
