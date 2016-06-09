const USER_ACCESS_KEY = 'JkDMwItdgLaQGQdI';
const USERNAME = 'reisebuddy';
const REISEBUDDY_USER_ID = '19x5';
const ELEMENT_TYPE_CONTACT = 'Contacts';

var VTigerCrm = require('./vtiger_consumer_swagger/src/index'); // See note below*.
var vTigerAdapter = new VTigerCrm.DefaultApi(); // Allocate the API class we're going to use.
const CryptoJS = require('crypto-js');

var challengeToken = '';
var sessionHandle = '';

var contactId = '';

vTigerAdapter.apiClient.basePath = 'http://localhost/vtigercrm/webservice.php';

function createContact(mobilePhoneNo) {
    const contact = {
        assigned_user_id: REISEBUDDY_USER_ID,
        mobile: mobilePhoneNo,
        lastname: mobilePhoneNo,
        email: mobilePhoneNo + "@sms.db.de"
    };
    vTigerAdapter.operationcreatePost(sessionHandle, ELEMENT_TYPE_CONTACT, JSON.stringify(contact), function (err, data, response) {
        if (err) {
            console.error('CREATE', err);
            return false;   //------------------>
        }
        if (!response.body.success) {
            console.error('Couldn\'t create contact:', response.body.error.message);
            return false;  //------------------>
        }

        contactId = response.body.result.id;
        console.log('CREATED_CONTACT_ID', contactId);
    })
}

vTigerAdapter.operationgetchallengeGet(USERNAME, function onGetChallenge(err, data, response) {
    if (err) {
        console.error('GET_CHALLENGE', err);
        return false;   //------------------>
    }
    if (!response.body.success) {
        console.error('Couldn\'t receive challenge:', response.body.error.message);
        return false;  //------------------>
    }

    challengeToken = response.body.result.token;
    console.log('CHALLENGE_TOKEN', challengeToken);

    vTigerAdapter.operationloginPost(USERNAME, CryptoJS.MD5(challengeToken + USER_ACCESS_KEY).toString(), function onLogin(err, data, response) {
        if (err) {
            console.log('LOGIN', err);
            return false; //------------------>
        }

        if (!response.body.success) {
            console.error('Couldn\'t log in:', response.body.error.message);
            return false;  //------------------>
        }

        sessionHandle = response.body.result.sessionName;
        console.log('SESSION_HANDLE', sessionHandle);

        const queryString = "select * from Contacts where email = '007@sms.db.de';";
        vTigerAdapter.operationqueryGet(sessionHandle, queryString, function onQuery(err, data, response) {
            if (err) {
                console.log('QUERY', err);
                return false; //------------------>
            }

            if (!response.body.success) {
                console.error('Couldn\'t execute query:', response.body.error.message);
                return false;  //------------------>
            }

            if (response.body.result[0]){
                // we found a contact matching the query
                contactId = response.body.result[0].id;
                console.log('QUERIED_CONTACT_ID', contactId);
            } else {
                // create a new one
                createContact('007');
            }
        });
    });
});
