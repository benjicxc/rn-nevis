/**
 * Copyright © 2023 Nevis Security AG. All rights reserved.
 */

import { FidoErrorCode } from './FidoErrorCode';
export class FidoErrorCodeConverter {
  static fromJson(json) {
    return new FidoErrorCode(json.type, json.description);
  }
}
//# sourceMappingURL=FidoErrorCodeConverter.js.map