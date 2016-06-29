# vtiger-client
Javascript client for vTiger CRM

## Technological foundation
Client generated based on swagger schema definition. YAML-file included.

## Manual adaptations to generated code
- Due to the nature of the vtiger-webservice-API, a [manual enhancement](https://github.com/mrsimpson/vtiger-client/blob/master/src/vtiger_consumer_swagger/src/ApiClient.js#L335-L361) needs to be done to the generated code.
- Generation does not seem to respect the parameter being part of the formData: In the generated `DefaultApi.js`, `contentTypes = ['application/json'];` needs to be replaced with `contentTypes = ['application/x-www-form-urlencoded']`

## Limitations
As of Swagger Version 2.10.1, the generated javascript doesn't properly generate the mapping of the respone to the data for objects with additionalProperties.
This is necessary as all CRUD-operations are agnostic with respect to the entity (element-type). 
Consequently, `data` cannot be consumed, but `resonse.body` needs to be adressed.
 
