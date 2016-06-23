'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/GetChallengeResult', 'model/LoginResult'], factory);
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/GetChallengeResult'), require('../model/LoginResult'));
  } else {
    // Browser globals (root is window)
    if (!root.VTigerCrm) {
      root.VTigerCrm = {};
    }
    root.VTigerCrm.DefaultApi = factory(root.VTigerCrm.ApiClient, root.VTigerCrm.GetChallengeResult, root.VTigerCrm.LoginResult);
  }
})(undefined, function (ApiClient, GetChallengeResult, LoginResult) {
  'use strict';

  /**
   * Default service.
   * @module api/DefaultApi
   * @version 0.0.2
   */

  /**
   * Constructs a new DefaultApi. 
   * @alias module:api/DefaultApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */

  var exports = function exports(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;

    /**
     * Callback function to receive the result of the operationcreatePost operation.
     * @callback module:api/DefaultApi~operationcreatePostCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} sessionName Session handle retrieved in login
     * @param {module:model/String} elementType The model of the instance to be addressed
     * @param {String} element An instance of a module (aka \&quot;elementType\&quot;) encoded as String
     * @param {module:api/DefaultApi~operationcreatePostCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.operationcreatePost = function (sessionName, elementType, element, callback) {
      var postBody = null;

      // verify the required parameter 'sessionName' is set
      if (sessionName == undefined || sessionName == null) {
        throw "Missing the required parameter 'sessionName' when calling operationcreatePost";
      }

      // verify the required parameter 'elementType' is set
      if (elementType == undefined || elementType == null) {
        throw "Missing the required parameter 'elementType' when calling operationcreatePost";
      }

      // verify the required parameter 'element' is set
      if (element == undefined || element == null) {
        throw "Missing the required parameter 'element' when calling operationcreatePost";
      }

      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {
        'sessionName': sessionName,
        'elementType': elementType,
        'element': element
      };

      var authNames = [];
      var contentTypes = ['application/x-www-form-urlencoded'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi('/?operation=create', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, callback);
    };

    /**
     * Callback function to receive the result of the operationdeletePost operation.
     * @callback module:api/DefaultApi~operationdeletePostCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} sessionName Session handle retrieved in login
     * @param {String} id Identifier of the vTiger object instance
     * @param {module:api/DefaultApi~operationdeletePostCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.operationdeletePost = function (sessionName, id, callback) {
      var postBody = null;

      // verify the required parameter 'sessionName' is set
      if (sessionName == undefined || sessionName == null) {
        throw "Missing the required parameter 'sessionName' when calling operationdeletePost";
      }

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw "Missing the required parameter 'id' when calling operationdeletePost";
      }

      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {
        'sessionName': sessionName,
        'id': id
      };

      var authNames = [];
      var contentTypes = ['application/x-www-form-urlencoded'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi('/?operation=delete', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, callback);
    };

    /**
     * Callback function to receive the result of the operationdescribeGet operation.
     * @callback module:api/DefaultApi~operationdescribeGetCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} sessionName Session handle retrieved in login
     * @param {module:api/DefaultApi~operationdescribeGetCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.operationdescribeGet = function (sessionName, callback) {
      var postBody = null;

      // verify the required parameter 'sessionName' is set
      if (sessionName == undefined || sessionName == null) {
        throw "Missing the required parameter 'sessionName' when calling operationdescribeGet";
      }

      var pathParams = {};
      var queryParams = {
        'sessionName': sessionName
      };
      var headerParams = {};
      var formParams = {};

      var authNames = [];
      var contentTypes = ['application/x-www-form-urlencoded'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi('/?operation=describe', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, callback);
    };

    /**
     * Callback function to receive the result of the operationgetchallengeGet operation.
     * @callback module:api/DefaultApi~operationgetchallengeGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetChallengeResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} username username used for the interaction
     * @param {module:api/DefaultApi~operationgetchallengeGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {module:model/GetChallengeResult}
     */
    this.operationgetchallengeGet = function (username, callback) {
      var postBody = null;

      // verify the required parameter 'username' is set
      if (username == undefined || username == null) {
        throw "Missing the required parameter 'username' when calling operationgetchallengeGet";
      }

      var pathParams = {};
      var queryParams = {
        'username': username
      };
      var headerParams = {};
      var formParams = {};

      var authNames = [];
      var contentTypes = ['application/x-www-form-urlencoded'];
      var accepts = ['application/json'];
      var returnType = GetChallengeResult;

      return this.apiClient.callApi('/?operation=getchallenge', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, callback);
    };

    /**
     * Callback function to receive the result of the operationlisttypesGet operation.
     * @callback module:api/DefaultApi~operationlisttypesGetCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} sessionName Session handle retrieved in login
     * @param {module:api/DefaultApi~operationlisttypesGetCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.operationlisttypesGet = function (sessionName, callback) {
      var postBody = null;

      // verify the required parameter 'sessionName' is set
      if (sessionName == undefined || sessionName == null) {
        throw "Missing the required parameter 'sessionName' when calling operationlisttypesGet";
      }

      var pathParams = {};
      var queryParams = {
        'sessionName': sessionName
      };
      var headerParams = {};
      var formParams = {};

      var authNames = [];
      var contentTypes = ['application/x-www-form-urlencoded'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi('/?operation=listtypes', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, callback);
    };

    /**
     * Callback function to receive the result of the operationloginPost operation.
     * @callback module:api/DefaultApi~operationloginPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/LoginResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} username username used for the interaction
     * @param {String} accessKey MD5 hash of concatenation &lt;challengeToken&gt;.&lt;userAccessKey&gt;
     * @param {module:api/DefaultApi~operationloginPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {module:model/LoginResult}
     */
    this.operationloginPost = function (username, accessKey, callback) {
      var postBody = null;

      // verify the required parameter 'username' is set
      if (username == undefined || username == null) {
        throw "Missing the required parameter 'username' when calling operationloginPost";
      }

      // verify the required parameter 'accessKey' is set
      if (accessKey == undefined || accessKey == null) {
        throw "Missing the required parameter 'accessKey' when calling operationloginPost";
      }

      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {
        'username': username,
        'accessKey': accessKey
      };

      var authNames = [];
      var contentTypes = ['application/x-www-form-urlencoded'];
      var accepts = ['application/json'];
      var returnType = LoginResult;

      return this.apiClient.callApi('/?operation=login', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, callback);
    };

    /**
     * Callback function to receive the result of the operationqueryGet operation.
     * @callback module:api/DefaultApi~operationqueryGetCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} sessionName Session handle retrieved in login
     * @param {String} query Query string \&quot;select * | &lt;column_list&gt; | &lt;count(*)&gt; from &lt;object&gt; [where &lt;conditionals&gt;] [order by &lt;column_list&gt;] [limit [&lt;m&gt;, ]&lt;n&gt;]\&quot;
     * @param {module:api/DefaultApi~operationqueryGetCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.operationqueryGet = function (sessionName, query, callback) {
      var postBody = null;

      // verify the required parameter 'sessionName' is set
      if (sessionName == undefined || sessionName == null) {
        throw "Missing the required parameter 'sessionName' when calling operationqueryGet";
      }

      // verify the required parameter 'query' is set
      if (query == undefined || query == null) {
        throw "Missing the required parameter 'query' when calling operationqueryGet";
      }

      var pathParams = {};
      var queryParams = {
        'sessionName': sessionName,
        'query': query
      };
      var headerParams = {};
      var formParams = {};

      var authNames = [];
      var contentTypes = ['application/x-www-form-urlencoded'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi('/?operation=query', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, callback);
    };

    /**
     * Callback function to receive the result of the operationretrieveGet operation.
     * @callback module:api/DefaultApi~operationretrieveGetCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} sessionName Session handle retrieved in login
     * @param {String} id Identifier of the vTiger object instance
     * @param {module:api/DefaultApi~operationretrieveGetCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.operationretrieveGet = function (sessionName, id, callback) {
      var postBody = null;

      // verify the required parameter 'sessionName' is set
      if (sessionName == undefined || sessionName == null) {
        throw "Missing the required parameter 'sessionName' when calling operationretrieveGet";
      }

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw "Missing the required parameter 'id' when calling operationretrieveGet";
      }

      var pathParams = {};
      var queryParams = {
        'sessionName': sessionName,
        'id': id
      };
      var headerParams = {};
      var formParams = {};

      var authNames = [];
      var contentTypes = ['application/x-www-form-urlencoded'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi('/?operation=retrieve', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, callback);
    };

    /**
     * Callback function to receive the result of the operationupdatePost operation.
     * @callback module:api/DefaultApi~operationupdatePostCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} sessionName Session handle retrieved in login
     * @param {String} element An instance of a module (aka \&quot;elementType\&quot;) encoded as String
     * @param {module:api/DefaultApi~operationupdatePostCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.operationupdatePost = function (sessionName, element, callback) {
      var postBody = null;

      // verify the required parameter 'sessionName' is set
      if (sessionName == undefined || sessionName == null) {
        throw "Missing the required parameter 'sessionName' when calling operationupdatePost";
      }

      // verify the required parameter 'element' is set
      if (element == undefined || element == null) {
        throw "Missing the required parameter 'element' when calling operationupdatePost";
      }

      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {
        'sessionName': sessionName,
        'element': element
      };

      var authNames = [];
      var contentTypes = ['application/x-www-form-urlencoded'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi('/?operation=update', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, callback);
    };
  };

  return exports;
});
//# sourceMappingURL=DefaultApi.js.map