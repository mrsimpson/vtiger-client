# vtiger-client
Javascript client for vTiger CRM

## Technological foundation
Client generated based on swagger schema definition. YAML-file included.
Due to the nature of the vtiger-webservice-API, a manual enhancement needs to be done to the generated code.

## Limitations
As of Swagger Version 2.10.1, the generated javascript doesn't properly generate the mapping of the respone to the data for objects with additionalProperties.
This is necessary as all CRUD-operations are agnostic with respect to the entity (element-type). 
Consequently, `data` cannot be consumed, but `resonse.body` needs to be adressed.
 
