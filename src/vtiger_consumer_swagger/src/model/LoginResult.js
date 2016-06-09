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
    root.VTigerCrm.LoginResult = factory(root.VTigerCrm.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The LoginResult model module.
   * @module model/LoginResult
   * @version 0.0.1
   */

  /**
   * Constructs a new <code>LoginResult</code>.
   * @alias module:model/LoginResult
   * @class
   */
  var exports = function() {
    var _this = this;





  };

  /**
   * Constructs a <code>LoginResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/LoginResult} obj Optional instance to populate.
   * @return {module:model/LoginResult} The populated <code>LoginResult</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('sessionId')) {
        obj['sessionId'] = ApiClient.convertToType(data['sessionId'], 'String');
      }
      if (data.hasOwnProperty('userId')) {
        obj['userId'] = ApiClient.convertToType(data['userId'], 'String');
      }
      if (data.hasOwnProperty('version')) {
        obj['version'] = ApiClient.convertToType(data['version'], 'String');
      }
      if (data.hasOwnProperty('vtigerVersion')) {
        obj['vtigerVersion'] = ApiClient.convertToType(data['vtigerVersion'], 'String');
      }
    }
    return obj;
  }

  /**
   * Unique Identifier for the session
   * @member {String} sessionId
   */
  exports.prototype['sessionId'] = undefined;
  /**
   * The vtiger id for the logged in user
   * @member {String} userId
   */
  exports.prototype['userId'] = undefined;
  /**
   * The version of the webservices api
   * @member {String} version
   */
  exports.prototype['version'] = undefined;
  /**
   * The version of the vtiger crm
   * @member {String} vtigerVersion
   */
  exports.prototype['vtigerVersion'] = undefined;




  return exports;
}));


