(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.CompactCrmDbDialog) {
      root.CompactCrmDbDialog = {};
    }
    root.CompactCrmDbDialog.GetChallengeResultError = factory(root.CompactCrmDbDialog.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The GetChallengeResultError model module.
   * @module model/GetChallengeResultError
   * @version 0.1.1
   */

  /**
   * Constructs a new <code>GetChallengeResultError</code>.
   * @alias module:model/GetChallengeResultError
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>GetChallengeResultError</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetChallengeResultError} obj Optional instance to populate.
   * @return {module:model/GetChallengeResultError} The populated <code>GetChallengeResultError</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('code')) {
        obj['code'] = ApiClient.convertToType(data['code'], 'String');
      }
      if (data.hasOwnProperty('message')) {
        obj['message'] = ApiClient.convertToType(data['message'], 'String');
      }
    }
    return obj;
  }

  /**
   * A technical language-independent expression of the error
   * @member {String} code
   */
  exports.prototype['code'] = undefined;
  /**
   * A human-readable description of the error to be propagated to a UI
   * @member {String} message
   */
  exports.prototype['message'] = undefined;




  return exports;
}));


