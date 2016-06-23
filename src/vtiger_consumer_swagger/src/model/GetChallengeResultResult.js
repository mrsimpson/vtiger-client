(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.VTigerCrm) {
      root.VTigerCrm = {};
    }
    root.VTigerCrm.GetChallengeResultResult = factory(root.VTigerCrm.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The GetChallengeResultResult model module.
   * @module model/GetChallengeResultResult
   * @version 0.0.2
   */

  /**
   * Constructs a new <code>GetChallengeResultResult</code>.
   * @alias module:model/GetChallengeResultResult
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>GetChallengeResultResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetChallengeResultResult} obj Optional instance to populate.
   * @return {module:model/GetChallengeResultResult} The populated <code>GetChallengeResultResult</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
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
  }

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
}));


