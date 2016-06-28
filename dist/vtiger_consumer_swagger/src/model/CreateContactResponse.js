'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/CreateContactResponseResult', 'model/GetChallengeResultError'], factory);
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./CreateContactResponseResult'), require('./GetChallengeResultError'));
  } else {
    // Browser globals (root is window)
    if (!root.CompactCrmDbDialog) {
      root.CompactCrmDbDialog = {};
    }
    root.CompactCrmDbDialog.CreateContactResponse = factory(root.CompactCrmDbDialog.ApiClient, root.CompactCrmDbDialog.CreateContactResponseResult, root.CompactCrmDbDialog.GetChallengeResultError);
  }
})(undefined, function (ApiClient, CreateContactResponseResult, GetChallengeResultError) {
  'use strict';

  /**
   * The CreateContactResponse model module.
   * @module model/CreateContactResponse
   * @version 0.1.1
   */

  /**
   * Constructs a new <code>CreateContactResponse</code>.
   * @alias module:model/CreateContactResponse
   * @class
   */

  var exports = function exports() {
    var _this = this;
  };

  /**
   * Constructs a <code>CreateContactResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CreateContactResponse} obj Optional instance to populate.
   * @return {module:model/CreateContactResponse} The populated <code>CreateContactResponse</code> instance.
   */
  exports.constructFromObject = function (data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('success')) {
        obj['success'] = ApiClient.convertToType(data['success'], 'Boolean');
      }
      if (data.hasOwnProperty('error')) {
        obj['error'] = GetChallengeResultError.constructFromObject(data['error']);
      }
      if (data.hasOwnProperty('result')) {
        obj['result'] = CreateContactResponseResult.constructFromObject(data['result']);
      }
    }
    return obj;
  };

  /**
   * Indicates the webservice being processed successfully on the server
   * @member {Boolean} success
   */
  exports.prototype['success'] = undefined;
  /**
   * @member {module:model/GetChallengeResultError} error
   */
  exports.prototype['error'] = undefined;
  /**
   * @member {module:model/CreateContactResponseResult} result
   */
  exports.prototype['result'] = undefined;

  return exports;
});
//# sourceMappingURL=CreateContactResponse.js.map