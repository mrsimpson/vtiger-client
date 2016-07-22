'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/CreateContactResponseResultMessages', 'model/Element'], factory);
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./CreateContactResponseResultMessages'), require('./Element'));
  } else {
    // Browser globals (root is window)
    if (!root.CompactCrmDbDialog) {
      root.CompactCrmDbDialog = {};
    }
    root.CompactCrmDbDialog.CreateContactResponseResult = factory(root.CompactCrmDbDialog.ApiClient, root.CompactCrmDbDialog.CreateContactResponseResultMessages, root.CompactCrmDbDialog.Element);
  }
})(undefined, function (ApiClient, CreateContactResponseResultMessages, Element) {
  'use strict';

  /**
   * The CreateContactResponseResult model module.
   * @module model/CreateContactResponseResult
   * @version 0.1.1
   */

  /**
   * Constructs a new <code>CreateContactResponseResult</code>.
   * @alias module:model/CreateContactResponseResult
   * @class
   */

  var exports = function exports() {
    var _this = this;
  };

  /**
   * Constructs a <code>CreateContactResponseResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CreateContactResponseResult} obj Optional instance to populate.
   * @return {module:model/CreateContactResponseResult} The populated <code>CreateContactResponseResult</code> instance.
   */
  exports.constructFromObject = function (data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('contact')) {
        obj['contact'] = Element.constructFromObject(data['contact']);
      }
      if (data.hasOwnProperty('messages')) {
        obj['messages'] = ApiClient.convertToType(data['messages'], [CreateContactResponseResultMessages]);
      }
    }
    return obj;
  };

  /**
   * @member {module:model/Element} contact
   */
  exports.prototype['contact'] = undefined;
  /**
   * @member {Array.<module:model/CreateContactResponseResultMessages>} messages
   */
  exports.prototype['messages'] = undefined;

  return exports;
});
//# sourceMappingURL=CreateContactResponseResult.js.map