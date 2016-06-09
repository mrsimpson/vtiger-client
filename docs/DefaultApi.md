# VTigerCrm.DefaultApi

All URIs are relative to *http://localhost/vtigercrm_dbd/webservice.php*

Method | HTTP request | Description
------------- | ------------- | -------------
[**operationcreatePost**](DefaultApi.md#operationcreatePost) | **POST** /?operation&#x3D;create | 
[**operationdeletePost**](DefaultApi.md#operationdeletePost) | **POST** /?operation&#x3D;delete | 
[**operationdescribeGet**](DefaultApi.md#operationdescribeGet) | **GET** /?operation&#x3D;describe | 
[**operationgetchallengeGet**](DefaultApi.md#operationgetchallengeGet) | **GET** /?operation&#x3D;getchallenge | 
[**operationlisttypesGet**](DefaultApi.md#operationlisttypesGet) | **GET** /?operation&#x3D;listtypes | 
[**operationloginPost**](DefaultApi.md#operationloginPost) | **POST** /?operation&#x3D;login | 
[**operationqueryGet**](DefaultApi.md#operationqueryGet) | **GET** /?operation&#x3D;query | 
[**operationretrieveGet**](DefaultApi.md#operationretrieveGet) | **GET** /?operation&#x3D;retrieve | 
[**operationupdatePost**](DefaultApi.md#operationupdatePost) | **POST** /?operation&#x3D;update | 


<a name="operationcreatePost"></a>
# **operationcreatePost**
> CRUDResponse operationcreatePost(sessionName, elementType, element)



### Example
```javascript
var VTigerCrm = require('v-tiger-crm');

var apiInstance = new VTigerCrm.DefaultApi();

var sessionName = "sessionName_example"; // String | SessionID retrieved in login

var elementType = "elementType_example"; // String | The model of the instance to be addressed

var element = "element_example"; // String | An instance of a module (aka \"elementType\") encoded as String


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.operationcreatePost(sessionName, elementType, element, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **sessionName** | **String**| SessionID retrieved in login | 
 **elementType** | **String**| The model of the instance to be addressed | 
 **element** | **String**| An instance of a module (aka \&quot;elementType\&quot;) encoded as String | 

### Return type

[**CRUDResponse**](CRUDResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="operationdeletePost"></a>
# **operationdeletePost**
> CRUDResponse operationdeletePost(sessionName, id)



### Example
```javascript
var VTigerCrm = require('v-tiger-crm');

var apiInstance = new VTigerCrm.DefaultApi();

var sessionName = "sessionName_example"; // String | SessionID retrieved in login

var id = "id_example"; // String | Identifier of the vTiger object instance


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.operationdeletePost(sessionName, id, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **sessionName** | **String**| SessionID retrieved in login | 
 **id** | **String**| Identifier of the vTiger object instance | 

### Return type

[**CRUDResponse**](CRUDResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="operationdescribeGet"></a>
# **operationdescribeGet**
> operationdescribeGet(sessionName, )



### Example
```javascript
var VTigerCrm = require('v-tiger-crm');

var apiInstance = new VTigerCrm.DefaultApi();

var sessionName = "sessionName_example"; // String | SessionID retrieved in login


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.operationdescribeGet(sessionName, , callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **sessionName** | **String**| SessionID retrieved in login | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="operationgetchallengeGet"></a>
# **operationgetchallengeGet**
> GetChallengeResult operationgetchallengeGet(username)



### Example
```javascript
var VTigerCrm = require('v-tiger-crm');

var apiInstance = new VTigerCrm.DefaultApi();

var username = "username_example"; // String | username used for the interaction


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.operationgetchallengeGet(username, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **username** | **String**| username used for the interaction | 

### Return type

[**GetChallengeResult**](GetChallengeResult.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="operationlisttypesGet"></a>
# **operationlisttypesGet**
> operationlisttypesGet(sessionName, )



### Example
```javascript
var VTigerCrm = require('v-tiger-crm');

var apiInstance = new VTigerCrm.DefaultApi();

var sessionName = "sessionName_example"; // String | SessionID retrieved in login


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.operationlisttypesGet(sessionName, , callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **sessionName** | **String**| SessionID retrieved in login | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="operationloginPost"></a>
# **operationloginPost**
> LoginResult operationloginPost(username, accessKey)



### Example
```javascript
var VTigerCrm = require('v-tiger-crm');

var apiInstance = new VTigerCrm.DefaultApi();

var username = "username_example"; // String | username used for the interaction

var accessKey = "accessKey_example"; // String | MD5 hash of concatenation <challengeToken>.<userAccessKey>


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.operationloginPost(username, accessKey, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **username** | **String**| username used for the interaction | 
 **accessKey** | **String**| MD5 hash of concatenation &lt;challengeToken&gt;.&lt;userAccessKey&gt; | 

### Return type

[**LoginResult**](LoginResult.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="operationqueryGet"></a>
# **operationqueryGet**
> operationqueryGet(sessionName, query)



### Example
```javascript
var VTigerCrm = require('v-tiger-crm');

var apiInstance = new VTigerCrm.DefaultApi();

var sessionName = "sessionName_example"; // String | SessionID retrieved in login

var query = "query_example"; // String | Query string \"select * | <column_list> | <count(*)> from <object> [where <conditionals>] [order by <column_list>] [limit [<m>, ]<n>]\"


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.operationqueryGet(sessionName, query, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **sessionName** | **String**| SessionID retrieved in login | 
 **query** | **String**| Query string \&quot;select * | &lt;column_list&gt; | &lt;count(*)&gt; from &lt;object&gt; [where &lt;conditionals&gt;] [order by &lt;column_list&gt;] [limit [&lt;m&gt;, ]&lt;n&gt;]\&quot; | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="operationretrieveGet"></a>
# **operationretrieveGet**
> operationretrieveGet(sessionName, id)



### Example
```javascript
var VTigerCrm = require('v-tiger-crm');

var apiInstance = new VTigerCrm.DefaultApi();

var sessionName = "sessionName_example"; // String | SessionID retrieved in login

var id = "id_example"; // String | Identifier of the vTiger object instance


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.operationretrieveGet(sessionName, id, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **sessionName** | **String**| SessionID retrieved in login | 
 **id** | **String**| Identifier of the vTiger object instance | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="operationupdatePost"></a>
# **operationupdatePost**
> CRUDResponse operationupdatePost(sessionName, element)



### Example
```javascript
var VTigerCrm = require('v-tiger-crm');

var apiInstance = new VTigerCrm.DefaultApi();

var sessionName = "sessionName_example"; // String | SessionID retrieved in login

var element = "element_example"; // String | An instance of a module (aka \"elementType\") encoded as String


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.operationupdatePost(sessionName, element, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **sessionName** | **String**| SessionID retrieved in login | 
 **element** | **String**| An instance of a module (aka \&quot;elementType\&quot;) encoded as String | 

### Return type

[**CRUDResponse**](CRUDResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

