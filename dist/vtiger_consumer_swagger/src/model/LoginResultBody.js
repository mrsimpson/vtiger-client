'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/LoginResultBodyResult'], factory);
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./LoginResultBodyResult'));
  } else {
    // Browser globals (root is window)
    if (!root.VTigerCrm) {
      root.VTigerCrm = {};
    }
    root.VTigerCrm.LoginResultBody = factory(root.VTigerCrm.ApiClient, root.VTigerCrm.LoginResultBodyResult);
  }
})(undefined, function (ApiClient, LoginResultBodyResult) {
  'use strict';

  /**
   * The LoginResultBody model module.
   * @module model/LoginResultBody
   * @version 0.0.2
   */

  /**
   * Constructs a new <code>LoginResultBody</code>.
   * @alias module:model/LoginResultBody
   * @class
   */

  var exports = function exports() {
    var _this = this;
  };

  /**
   * Constructs a <code>LoginResultBody</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/LoginResultBody} obj Optional instance to populate.
   * @return {module:model/LoginResultBody} The populated <code>LoginResultBody</code> instance.
   */
  exports.constructFromObject = function (data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('result')) {
        obj['result'] = LoginResultBodyResult.constructFromObject(data['result']);
      }
    }
    return obj;
  };

  /**
   * @member {module:model/LoginResultBodyResult} result
   */
  exports.prototype['result'] = undefined;

  return exports;
});
//# sourceMappingURL=LoginResultBody.js.map