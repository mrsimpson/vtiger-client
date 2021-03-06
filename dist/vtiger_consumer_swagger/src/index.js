'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/CRUDResponse', 'model/Element', 'model/GetChallengeResult', 'model/GetChallengeResultError', 'model/GetChallengeResultResult', 'model/LoginResult', 'model/LoginResultResult', 'model/QueryResponse', 'api/DefaultApi'], factory);
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('./ApiClient'), require('./model/CRUDResponse'), require('./model/Element'), require('./model/GetChallengeResult'), require('./model/GetChallengeResultError'), require('./model/GetChallengeResultResult'), require('./model/LoginResult'), require('./model/LoginResultResult'), require('./model/QueryResponse'), require('./api/DefaultApi'));
  }
})(function (ApiClient, CRUDResponse, Element, GetChallengeResult, GetChallengeResultError, GetChallengeResultResult, LoginResult, LoginResultResult, QueryResponse, DefaultApi) {
  'use strict';

  /**
   * Interaction with customer master-data .<br>
   * The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
   * <p>
   * An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
   * <pre>
   * var VTigerCrm = require('index'); // See note below*.
   * var xxxSvc = new VTigerCrm.XxxApi(); // Allocate the API class we're going to use.
   * var yyyModel = new VTigerCrm.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
   * and put the application logic within the callback function.</em>
   * </p>
   * <p>
   * A non-AMD browser application (discouraged) might do something like this:
   * <pre>
   * var xxxSvc = new VTigerCrm.XxxApi(); // Allocate the API class we're going to use.
   * var yyy = new VTigerCrm.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * </p>
   * @module index
   * @version 0.0.2
   */

  var exports = {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient: ApiClient,
    /**
     * The CRUDResponse model constructor.
     * @property {module:model/CRUDResponse}
     */
    CRUDResponse: CRUDResponse,
    /**
     * The Element model constructor.
     * @property {module:model/Element}
     */
    Element: Element,
    /**
     * The GetChallengeResult model constructor.
     * @property {module:model/GetChallengeResult}
     */
    GetChallengeResult: GetChallengeResult,
    /**
     * The GetChallengeResultError model constructor.
     * @property {module:model/GetChallengeResultError}
     */
    GetChallengeResultError: GetChallengeResultError,
    /**
     * The GetChallengeResultResult model constructor.
     * @property {module:model/GetChallengeResultResult}
     */
    GetChallengeResultResult: GetChallengeResultResult,
    /**
     * The LoginResult model constructor.
     * @property {module:model/LoginResult}
     */
    LoginResult: LoginResult,
    /**
     * The LoginResultResult model constructor.
     * @property {module:model/LoginResultResult}
     */
    LoginResultResult: LoginResultResult,
    /**
     * The QueryResponse model constructor.
     * @property {module:model/QueryResponse}
     */
    QueryResponse: QueryResponse,
    /**
     * The DefaultApi service constructor.
     * @property {module:api/DefaultApi}
     */
    DefaultApi: DefaultApi
  };

  return exports;
});
//# sourceMappingURL=index.js.map