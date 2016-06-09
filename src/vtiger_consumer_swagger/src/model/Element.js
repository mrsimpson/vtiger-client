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
    root.VTigerCrm.Element = factory(root.VTigerCrm.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Element model module.
   * @module model/Element
   * @version 0.0.1
   */

  /**
   * Constructs a new <code>Element</code>.
   * An instance of a module (aka \&quot;elementType\&quot;) encoded as String
   * @alias module:model/Element
   * @class
   */
  var exports = function() {
    var _this = this;

  };

  /**
   * Constructs a <code>Element</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Element} obj Optional instance to populate.
   * @return {module:model/Element} The populated <code>Element</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

    }
    return obj;
  }





  return exports;
}));


