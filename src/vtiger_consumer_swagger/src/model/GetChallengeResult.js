(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/GetChallengeResultError', 'model/GetChallengeResultResult'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./GetChallengeResultError'), require('./GetChallengeResultResult'));
  } else {
    // Browser globals (root is window)
    if (!root.CompactCrmDbDialog) {
      root.CompactCrmDbDialog = {};
    }
    root.CompactCrmDbDialog.GetChallengeResult = factory(root.CompactCrmDbDialog.ApiClient, root.CompactCrmDbDialog.GetChallengeResultError, root.CompactCrmDbDialog.GetChallengeResultResult);
  }
}(this, function(ApiClient, GetChallengeResultError, GetChallengeResultResult) {
  'use strict';




  /**
   * The GetChallengeResult model module.
   * @module model/GetChallengeResult
   * @version 0.1.1
   */

  /**
   * Constructs a new <code>GetChallengeResult</code>.
   * @alias module:model/GetChallengeResult
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>GetChallengeResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetChallengeResult} obj Optional instance to populate.
   * @return {module:model/GetChallengeResult} The populated <code>GetChallengeResult</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('success')) {
        obj['success'] = ApiClient.convertToType(data['success'], 'Boolean');
      }
      if (data.hasOwnProperty('error')) {
        obj['error'] = GetChallengeResultError.constructFromObject(data['error']);
      }
      if (data.hasOwnProperty('result')) {
        obj['result'] = GetChallengeResultResult.constructFromObject(data['result']);
      }
    }
    return obj;
  }

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
   * @member {module:model/GetChallengeResultResult} result
   */
  exports.prototype['result'] = undefined;




  return exports;
}));


