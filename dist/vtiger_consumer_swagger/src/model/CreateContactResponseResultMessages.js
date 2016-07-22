'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ProcessingInstruction'], factory);
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ProcessingInstruction'));
  } else {
    // Browser globals (root is window)
    if (!root.CompactCrmDbDialog) {
      root.CompactCrmDbDialog = {};
    }
    root.CompactCrmDbDialog.CreateContactResponseResultMessages = factory(root.CompactCrmDbDialog.ApiClient, root.CompactCrmDbDialog.ProcessingInstruction);
  }
})(undefined, function (ApiClient, ProcessingInstruction) {
  'use strict';

  /**
   * The CreateContactResponseResultMessages model module.
   * @module model/CreateContactResponseResultMessages
   * @version 0.1.1
   */

  /**
   * Constructs a new <code>CreateContactResponseResultMessages</code>.
   * @alias module:model/CreateContactResponseResultMessages
   * @class
   */

  var exports = function exports() {
    var _this = this;
  };

  /**
   * Constructs a <code>CreateContactResponseResultMessages</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CreateContactResponseResultMessages} obj Optional instance to populate.
   * @return {module:model/CreateContactResponseResultMessages} The populated <code>CreateContactResponseResultMessages</code> instance.
   */
  exports.constructFromObject = function (data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('processInstruction')) {
        obj['processInstruction'] = ProcessingInstruction.constructFromObject(data['processInstruction']);
      }
      if (data.hasOwnProperty('text')) {
        obj['text'] = ApiClient.convertToType(data['text'], 'String');
      }
      if (data.hasOwnProperty('AgentInformation')) {
        obj['AgentInformation'] = ApiClient.convertToType(data['AgentInformation'], 'String');
      }
    }
    return obj;
  };

  /**
   * @member {module:model/ProcessingInstruction} processInstruction
   */
  exports.prototype['processInstruction'] = undefined;
  /**
   * The message text potentially propagated to the created contact
   * @member {String} text
   */
  exports.prototype['text'] = undefined;
  /**
   * Additional context information for the agent who responds to the contact
   * @member {String} AgentInformation
   */
  exports.prototype['AgentInformation'] = undefined;

  return exports;
});
//# sourceMappingURL=CreateContactResponseResultMessages.js.map