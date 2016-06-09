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

        this.loginPromise(this.username, this.accessKey)
            .then((result)=>{
                this.sessionToken = result
            })
            .catch((err)=>{
                console.error(err.operation, err.message, err.previous.toString());
                throw err;
            });
    }

    loginPromise(username, accesskey) {
        return new Promise((resolve, reject)=>{
            if (this.sessionToken){ resolve(this.sessionToken) } else {
                this.vTigerApi.operationgetchallengeGet(username, (err, data, response)=> {
                    if (err) {
                        throw new VTigerCrmAdapterException( 'GET_CHALLENGE', 'Couldn\'t execute webservice:', err );
                    }
                    if (!response.body.success) {
                        throw new VTigerCrmAdapterException( 'GET_CHALLENGE', 'Couldn\'t receive challenge:', response.body.error.message );
                    }

                    const challengeToken = response.body.result.token;
                    console.log('CHALLENGE_TOKEN', challengeToken);

                    this.vTigerApi.operationloginPost(username, CryptoJS.MD5(challengeToken + this.accesskey).toString(), (err, data, response)=> {
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

    findContactsByEMailPromise(emailAddress){
        return new Promise((resolve, reject)=>{
            this.loginPromise(this.username, this.accesskey)
                .then(()=>{
                    const queryString = "select * from Contacts where email = '" + emailAddress + "';";
                    console.log('SESSION_HANDLE_FOR_QUERY', this.sessionToken)
                    this.vTigerApi.operationqueryGet( this.sessionToken, queryString, (err, data, response)=>{
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
    } //findContactsByEMailPromise

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Public methods
    findContactsByEmail(emailAddress){
        this.findContactsByEMailPromise(emailAddress)
            .then((contacts)=>{
                return contacts;
            })
            .catch((err)=>{
                throw err; //propagate exception
            })

    }

    createContactForEMail(emailAddress){
        //stub

    }

    updateContact(contact){
        //stub
    }

}
