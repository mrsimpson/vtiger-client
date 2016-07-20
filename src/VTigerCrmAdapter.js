/**
 * Created by OliverJaegle on 08.06.2016.
 */
const VTigerCrm = require('./vtiger_consumer_swagger/src/'); // See note below*.
const CryptoJS = require('crypto-js');

const ELEMENT_TYPE_CONTACT = 'Contacts';

export class VTigerCrmAdapterException extends Error {
    constructor(operation, message, previous) {
        super(message);
        this.operation = operation;
        this.previous = previous;
    }
}

export class VTigerCrmAdapter {

// ------------------------------------------------ public methods ----------------------------------------------------
    constructor(basePath, username, accesskey, assigned_user_id, logger = console) {

        this.username = username;
        this.accesskey = accesskey;
        this.sessionToken = '';
        this.assigned_user_id = assigned_user_id;
        this.logger = logger;

        this.vTigerApi = new VTigerCrm.DefaultApi(); // Allocate the API class we're going to use.
        this.vTigerApi.apiClient.basePath = basePath;

        /*          We can't login in the constructor as a consumer might immediately issue a subsequent request.
         Thus, all the resolvers of the login-Promise need to buffer the result in order to take advantage of existing
         session tokens

         this._loginPromise(this.username, this.accessKey)
         .then((result)=>{
         this.sessionToken = result
         })
         .catch((err)=>{
         console.error(err.operation, err.message, err.previous.toString());
         throw err;
         });*/
    }

    findContactsFulltextPromise(text, limit) {
        const contactSkeleton = {
            lastname: text,
            firstname: text,
            email: text
        };

        return this.findContactsBySkeletonPromise(contactSkeleton, 'OR', limit);
    } //findContactsFulltextPromise

    createContactPromise(contact) {
        const adapterInstance = this;
        contact.assigned_user_id = this.assigned_user_id;
        return adapterInstance._loginPromise().then((sessionToken)=>adapterInstance._createPromise(sessionToken, ELEMENT_TYPE_CONTACT, contact));
    }

    createContactWithMessagePromise(contact, message) {
        const adapterInstance = this;
        contact.assigned_user_id = this.assigned_user_id;
        return adapterInstance._loginPromise().then((sessionToken)=>adapterInstance._createContactWithMessagePromise(sessionToken, contact, message));
    }

    retrievePromise(id) {
        const adapterInstance = this;
        return adapterInstance._loginPromise().then((sessionToken)=>adapterInstance._retrievePromise(sessionToken, id));
    }

    updatePromise(element) {
        const adapterInstance = this;
        return adapterInstance._loginPromise().then((sessionToken)=>adapterInstance._updatePromise(sessionToken, element));
    }

    deletePromise(id) {
        const adapterInstance = this;
        return adapterInstance._loginPromise().then((sessionToken)=>adapterInstance._deletePromise(sessionToken, id));
    }

//-------------------------------------------------- private methods ---------------------------------------------------
    /**
     * All services offered by vTiger require authorization to be done prior to the webservice-call.
     * As everything is done asynchronously, the login-promise needs to be resolved before continuing resolving the
     * actual webservice-promise. Thus, the autorization-rensitive-methods (starting with _) are encapsulated again in a
     * public method which chains the execution.
     * Still, the login-method bufferss the result on resolution so that - although the promise is chained as pre-
     * decessor, the webservices used for authorization are not executed anymore.
     * It seems as if the sessionToken had an unlimited lifetime.
     * @returns {Promise}
     * @private
     */
    _loginPromise() {
        const adapterInstance = this;
        return new Promise((resolve, reject)=> {
            if (adapterInstance.sessionToken) {
                resolve(adapterInstance.sessionToken)
            }
            else {
                adapterInstance.vTigerApi.operationgetchallengeGet(adapterInstance.username, (err, data, response)=> {
                    if (err) {
                        return reject(new VTigerCrmAdapterException('GET_CHALLENGE', "Couldn't execute webservice:", err));
                    }
                    if (!response.body.success) {
                        return reject(new VTigerCrmAdapterException('GET_CHALLENGE', "Couldn't receive challenge - possibly wrong server configuration"));
                    }

                    const challengeToken = response.body.result.token;

                    adapterInstance.vTigerApi.operationloginPost(adapterInstance.username, CryptoJS.MD5(challengeToken + adapterInstance.accesskey).toString(), (err, data, response)=> {
                        if (err) {
                            return reject(new VTigerCrmAdapterException('LOGIN', "Couldn't execute webservice:", err));
                        }

                        if (!response.body.success) {
                            return reject(new VTigerCrmAdapterException('LOGIN', "Couldn't log in:", JSON.stringify(response)));
                        }

                        adapterInstance.sessionToken = response.body.result.sessionName;
                        resolve(response.body.result.sessionName);

                    }); //operationLoginPost
                }); //operationChallengeGet
            }
        })
    }//_loginPromise

    /**
     * Promises a query result
     *
     * @param sessionToken
     * @param queryString
     * @returns {Promise}
     * @private
     */
    _queryPromise(sessionToken, queryString) {

        const adapterInstance = this;

        return new Promise((resolve, reject)=> {
            if (!sessionToken) reject(new VTigerCrmAdapterException('QUERY', 'No session token for query'));
            adapterInstance.vTigerApi.operationqueryGet(sessionToken, queryString, (err, data, response)=> {
                if (err) {
                    return reject(new VTigerCrmAdapterException('QUERY', "Couldn't execute webservice:", err));
                }

                if (!response.body.success) {
                    return reject(new VTigerCrmAdapterException('QUERY', "Couldn't execute query:", JSON.stringify(response)));
                }

                resolve(response.body.result); //might be initial
            })
        })
    }

    _createPromise(sessionToken, objectType, object) {
        const adapterInstance = this;
        return new Promise((resolve, reject)=> {
            if (!sessionToken) return reject(new VTigerCrmAdapterException('CREATE', 'No session token for creation'));
            adapterInstance.vTigerApi.operationcreatePost(sessionToken, objectType, JSON.stringify(object), (err, data, response)=> {
                if (err) {
                    return reject(new VTigerCrmAdapterException('CREATE', "Couldn't execute webservice:", err));
                }

                if (!response.body.success) {
                    return reject(new VTigerCrmAdapterException('CREATE', "Couldn't create:", JSON.stringify(response)));
                }

                resolve(response.body.result); //might be initial
            })
        })
    } //_createPromise

    _createContactWithMessagePromise(sessionToken, contact, message) {
        const adapterInstance = this;
        return new Promise((resolve, reject)=> {
            if (!sessionToken) return reject(new VTigerCrmAdapterException('CREATE', 'No session token for creation'));
            adapterInstance.vTigerApi.operationcreateContactPost(sessionToken, JSON.stringify(contact), message, (err, data, response)=> {
                if (err) {
                    return reject(new VTigerCrmAdapterException('CREATE CONTACT WITH MESSAGE', "Couldn't execute webservice:", err));
                }

                if (!response.body.success) {
                    return reject(new VTigerCrmAdapterException('CREATE CONTACT WITH MESSAGE', "Couldn't create:", response.body.error.message));
                }

                resolve({ createdContact: JSON.parse(response.body.result.contact), messages: response.body.result.messages }); //might be initial
            })
        })
    } //_createPromise

    _retrievePromise(sessionToken, id) {
        const adapterInstance = this;
        return new Promise((resolve, reject)=> {
            if (!sessionToken) return reject(new VTigerCrmAdapterException('RETRIEVE', 'No session token for retrieval'));
            adapterInstance.vTigerApi.operationretrieveGet(sessionToken, id, (err, data, response)=> {
                if (err) {
                    return reject(new VTigerCrmAdapterException('RETRIEVE', "Couldn't execute webservice:", err));
                }

                if (!response.body.success) {
                    return reject(new VTigerCrmAdapterException('RETRIEVE', "Couldn't retrieve:", JSON.stringify(response)));
                }

                resolve(response.body.result); //might be initial
            })
        })
    } //_retrievePromise

    _updatePromise(sessionToken, object) {
        const adapterInstance = this;
        return new Promise((resolve, reject)=> {
            if (!sessionToken) return reject(new VTigerCrmAdapterException('UPDATE', 'No session token for update'));
            adapterInstance.vTigerApi.operationupdatePost(sessionToken, JSON.stringify(object), (err, data, response)=> {
                if (err) {
                    return reject(new VTigerCrmAdapterException('UPDATE', "Couldn't execute webservice:", err));
                }

                if (!response.body.success) {
                    return reject(new VTigerCrmAdapterException('UPDATE', "Couldn't update:", JSON.stringify(response)));
                }

                resolve(response.body.result); //might be initial
            })
        })
    } //_updatePromise

    _deletePromise(sessionToken, id) {
        const adapterInstance = this;
        return new Promise((resolve, reject)=> {
            if (!sessionToken) return reject(new VTigerCrmAdapterException('DELETE', 'No session token for delete'));
            adapterInstance.vTigerApi.operationdeletePost(sessionToken, id, (err, data, response)=> {
                if (err) {
                    return reject(new VTigerCrmAdapterException('DELETE', "Couldn't execute webservice:", err));
                }

                if (!response.body.success) {
                    return reject(new VTigerCrmAdapterException('DELETE', "Couldn't delete:", JSON.stringify(response)));
                }

                resolve(response.body.success); //might be initial
            })
        })
    } //_deletePromise


    findContactsBySkeletonPromise(contactSkeleton, operator = 'AND', limit=100) {
        /**
         * Operator defines how the properties of the contact skeleton are to be combined.
         * Possible values ['AND', 'OR']
         */
        const adapterInstance = this;
        const queryString = "select * from Contacts where " + VTigerCrmAdapter.contactSkeletonToWhere(contactSkeleton, operator) + " LIMIT " + limit + ";";

        return adapterInstance._loginPromise().then((sessionToken)=>adapterInstance._queryPromise(sessionToken, queryString));
    } //findContactsBySkeletonPromise

// ------------------------------------------------- static helpers ----------------------------------------------------
    static contactSkeletonToWhere(contact, operator) {
        let whereClause = '';
        for (let key in contact) {
            if (contact.hasOwnProperty(key)) {
                if (whereClause) whereClause += ' ' + operator + ' ';
                whereClause += key + " LIKE '" + contact[key] + "'";
            }
        }
        return whereClause;
    }
}
