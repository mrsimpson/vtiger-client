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
    root.VTigerCrm.LoginResultResult = factory(root.VTigerCrm.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The LoginResultResult model module.
   * @module model/LoginResultResult
   * @version 0.0.2
   */

  /**
   * Constructs a new <code>LoginResultResult</code>.
   * @alias module:model/LoginResultResult
   * @class
   */
  var exports = function() {
    var _this = this;





  };

  /**
   * Constructs a <code>LoginResultResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/LoginResultResult} obj Optional instance to populate.
   * @return {module:model/LoginResultResult} The populated <code>LoginResultResult</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('sessionName')) {
        obj['sessionName'] = ApiClient.convertToType(data['sessionName'], 'String');
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
   * @member {String} sessionName
   */
  exports.prototype['sessionName'] = undefined;
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


