/**
 * Created by OliverJaegle on 08.06.2016.
 */
const VTigerCrm = require('./vtiger_consumer_swagger/src/'); // See note below*.
const CryptoJS = require('crypto-js');

export class VTigerCrmAdapterException extends Error{
    constructor(operation, message, previous){
        super(message);
        this.operation = operation;
        this.previous = previous;
    }
}

export class VTigerCrmAdapter {

    constructor(basePath, username, accesskey) {

        this.username = username;
        this.accesskey = accesskey;
        this.sessionToken = '';

        this.vTigerApi = new VTigerCrm.DefaultApi(); // Allocate the API class we're going to use.
        this.vTigerApi.apiClient.basePath = basePath;

/*          We can't login in the constructor as a consumer might immediately issue a subsequent request.
            Thus, all the resolvers of the login-Promise need to buffer the result in order to take advantage of existing
            session tokens

            this.loginPromise(this.username, this.accessKey)
            .then((result)=>{
                this.sessionToken = result
            })
            .catch((err)=>{
                console.error(err.operation, err.message, err.previous.toString());
                throw err;
            });*/
    }

    loginPromise() {
        const adapterInstance = this;
        return new Promise((resolve, reject)=>{
            if (adapterInstance.sessionToken){ resolve(adapterInstance.sessionToken) } else {
                adapterInstance.vTigerApi.operationgetchallengeGet(adapterInstance.username, (err, data, response)=> {
                    if (err) {
                        throw new VTigerCrmAdapterException( 'GET_CHALLENGE', 'Couldn\'t execute webservice:', err );
                    }
                    if (!response.body.success) {
                        throw new VTigerCrmAdapterException( 'GET_CHALLENGE', 'Couldn\'t receive challenge:', response.body.error.message );
                    }

                    const challengeToken = response.body.result.token;
                    console.log('CHALLENGE_TOKEN', challengeToken);

                    adapterInstance.vTigerApi.operationloginPost(adapterInstance.username, CryptoJS.MD5(challengeToken + adapterInstance.accesskey).toString(), (err, data, response)=> {
                        if (err) {
                            throw new VTigerCrmAdapterException( 'LOGIN', 'Couldn\'t execute webservice:', err );
                        }

                        if (!response.body.success) {
                            throw new VTigerCrmAdapterException( 'LOGIN', 'Couldn\'t log in:', response.body.error.message);
                        }

                        console.log('SESSION_TOKEN', response.body.result.sessionName);
                        resolve(response.body.result.sessionName);

                    }); //operationLoginPost
                }); //operationChallengeGet
            }})
    }//loginPromise

    static contactSkeletonToWhere(contact, operator){
        let whereClause = '';
        for(let key in contact){
            if (contact.hasOwnProperty(key)){
                if (whereClause) whereClause += ' ' + operator + ' ';
                whereClause += key + " LIKE '" + contact[key] + "'";
            }
        }
        return whereClause;
    }

    findContactsBySkeletonPromise(contactSkeleton, operator){
        /**
         * Operator defines how the properties of the contact skeleton are to be combined.
         * Possible values ['AND', 'OR']
         */
        const adapterInstance = this;
        return new Promise((resolve, reject)=>{
            adapterInstance.loginPromise()
                .then((sessionHandle)=>{
                    adapterInstance.sessionToken = sessionHandle;
                    const queryString = "select * from Contacts where " + adapterInstance.contactSkeletonToWhere(contactSkeleton, operator) + ";";
                    console.log('SESSION_HANDLE_FOR_QUERY', adapterInstance.sessionToken);
                    adapterInstance.vTigerApi.operationqueryGet( adapterInstance.sessionToken, queryString, (err, data, response)=>{
                        if (err) {
                            throw new VTigerCrmAdapterException( 'QUERY', 'Couldn\'t execute webservice:', err );
                        }

                        if (!response.body.success) {
                            throw new VTigerCrmAdapterException( 'QUERY', 'Couldn\'t execute query:', response.body.error.message);
                        }

                        resolve(response.body.result); //might be initial
                    })
                })
                .catch((err)=>{
                    console.error(err.operation, err.message, err.previous.toString());
                    throw err;
                });
        })
    } //findContactsBySkeletonPromise

    findContactsFulltextPromise(text){
        const contactSkeleton = {
            lastname: text,
            firstname: text,
            email: text
        };

       return this.findContactsBySkeletonPromise(contactSkeleton, 'OR');
    } //findContactsFulltextPromise
}
