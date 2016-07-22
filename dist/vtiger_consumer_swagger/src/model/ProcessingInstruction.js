'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.CompactCrmDbDialog) {
      root.CompactCrmDbDialog = {};
    }
    root.CompactCrmDbDialog.ProcessingInstruction = factory(root.CompactCrmDbDialog.ApiClient);
  }
})(undefined, function (ApiClient) {
  'use strict';

  /**
   * Enum class ProcessingInstruction.
   * @enum {}
   * @readonly
   */

  var exports = {
    /**
     * value: 0 Automatic processing
     * @const
     */
    "0 Automatic processing": 0,
    /**
     * value: 1 Manual interaction required
     * @const
     */
    "1 Manual interaction required": 1,
    /**
     * value: 2 Propagated error
     * @const
     */
    "2 Propagated error": 2 };

  return exports;
});
//# sourceMappingURL=ProcessingInstruction.js.map