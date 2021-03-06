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
    if (!root.VTigerCrm) {
      root.VTigerCrm = {};
    }
    root.VTigerCrm.GetChallengeResultBodyResult = factory(root.VTigerCrm.ApiClient);
  }
})(undefined, function (ApiClient) {
  'use strict';

  /**
   * The GetChallengeResultBodyResult model module.
   * @module model/GetChallengeResultBodyResult
   * @version 0.0.2
   */

  /**
   * Constructs a new <code>GetChallengeResultBodyResult</code>.
   * @alias module:model/GetChallengeResultBodyResult
   * @class
   */

  var exports = function exports() {
    var _this = this;
  };

  /**
   * Constructs a <code>GetChallengeResultBodyResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetChallengeResultBodyResult} obj Optional instance to populate.
   * @return {module:model/GetChallengeResultBodyResult} The populated <code>GetChallengeResultBodyResult</code> instance.
   */
  exports.constructFromObject = function (data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('token')) {
        obj['token'] = ApiClient.convertToType(data['token'], 'String');
      }
      if (data.hasOwnProperty('serverTime')) {
        obj['serverTime'] = ApiClient.convertToType(data['serverTime'], 'String');
      }
      if (data.hasOwnProperty('expireTime')) {
        obj['expireTime'] = ApiClient.convertToType(data['expireTime'], 'String');
      }
    }
    return obj;
  };

  /**
   * Challenge token from the server
   * @member {String} token
   */
  exports.prototype['token'] = undefined;
  /**
   * The current server time
   * @member {String} serverTime
   */
  exports.prototype['serverTime'] = undefined;
  /**
   * The time when the token expires
   * @member {String} expireTime
   */
  exports.prototype['expireTime'] = undefined;

  return exports;
});
//# sourceMappingURL=GetChallengeResultBodyResult.js.map