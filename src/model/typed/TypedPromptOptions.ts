/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { TypedData } from './TypedData';
import { BiometricPromptOptions } from '../../operations/userverification/BiometricPromptOptions';
import { DevicePasscodePromptOptions } from '../../operations/userverification/DevicePasscodePromptOptions';

class PromptOptionsData {
	title?: string;
	description?: string;
	cancelButtonText?: string;

	constructor(title?: string, description?: string, cancelButtonText?: string) {
		this.title = title;
		this.description = description;
		this.cancelButtonText = cancelButtonText;
	}
}

export abstract class TypedPromptOptions extends TypedData<PromptOptionsData> {
	abstract data: PromptOptionsData;
}

export class TypedBiometricPromptOptions extends TypedPromptOptions {
	type = 'BiometricPromptOptions';
	data: PromptOptionsData;

	constructor(wrapped?: BiometricPromptOptions) {
		super();
		this.data = new PromptOptionsData(
			wrapped?.title,
			wrapped?.description,
			wrapped?.cancelButtonText
		);
	}
}

export class TypedDevicePasscodePromptOptions extends TypedPromptOptions {
	type = 'DevicePasscodePromptOptions';
	data: PromptOptionsData;

	constructor(wrapped?: DevicePasscodePromptOptions) {
		super();
		this.data = new PromptOptionsData(wrapped?.title, wrapped?.description);
	}
}
