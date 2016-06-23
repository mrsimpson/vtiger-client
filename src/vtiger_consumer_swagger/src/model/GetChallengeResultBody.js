(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/GetChallengeResultBodyError', 'model/GetChallengeResultBodyResult'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./GetChallengeResultBodyError'), require('./GetChallengeResultBodyResult'));
  } else {
    // Browser globals (root is window)
    if (!root.VTigerCrm) {
      root.VTigerCrm = {};
    }
    root.VTigerCrm.GetChallengeResultBody = factory(root.VTigerCrm.ApiClient, root.VTigerCrm.GetChallengeResultBodyError, root.VTigerCrm.GetChallengeResultBodyResult);
  }
}(this, function(ApiClient, GetChallengeResultBodyError, GetChallengeResultBodyResult) {
  'use strict';




  /**
   * The GetChallengeResultBody model module.
   * @module model/GetChallengeResultBody
   * @version 0.0.2
   */

  /**
   * Constructs a new <code>GetChallengeResultBody</code>.
   * @alias module:model/GetChallengeResultBody
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>GetChallengeResultBody</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetChallengeResultBody} obj Optional instance to populate.
   * @return {module:model/GetChallengeResultBody} The populated <code>GetChallengeResultBody</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('success')) {
        obj['success'] = ApiClient.convertToType(data['success'], 'Boolean');
      }
      if (data.hasOwnProperty('error')) {
        obj['error'] = GetChallengeResultBodyError.constructFromObject(data['error']);
      }
      if (data.hasOwnProperty('result')) {
        obj['result'] = GetChallengeResultBodyResult.constructFromObject(data['result']);
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
   * @member {module:model/GetChallengeResultBodyError} error
   */
  exports.prototype['error'] = undefined;
  /**
   * @member {module:model/GetChallengeResultBodyResult} result
   */
  exports.prototype['result'] = undefined;




  return exports;
}));


