/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { FidoErrorCode } from './FidoErrorCode';

export class FidoErrorCodeConverter {
	static fromJson(json: any): FidoErrorCode {
		return new FidoErrorCode(json.type, json.description);
	}
}
