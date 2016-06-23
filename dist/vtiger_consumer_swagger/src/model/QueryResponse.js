'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Element', 'model/GetChallengeResultError'], factory);
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Element'), require('./GetChallengeResultError'));
  } else {
    // Browser globals (root is window)
    if (!root.VTigerCrm) {
      root.VTigerCrm = {};
    }
    root.VTigerCrm.QueryResponse = factory(root.VTigerCrm.ApiClient, root.VTigerCrm.Element, root.VTigerCrm.GetChallengeResultError);
  }
})(undefined, function (ApiClient, Element, GetChallengeResultError) {
  'use strict';

  /**
   * The QueryResponse model module.
   * @module model/QueryResponse
   * @version 0.0.2
   */

  /**
   * Constructs a new <code>QueryResponse</code>.
   * @alias module:model/QueryResponse
   * @class
   */

  var exports = function exports() {
    var _this = this;
  };

  /**
   * Constructs a <code>QueryResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/QueryResponse} obj Optional instance to populate.
   * @return {module:model/QueryResponse} The populated <code>QueryResponse</code> instance.
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
        obj['result'] = ApiClient.convertToType(data['result'], [Element]);
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
   * @member {Array.<module:model/Element>} result
   */
  exports.prototype['result'] = undefined;

  return exports;
});
//# sourceMappingURL=QueryResponse.js.map