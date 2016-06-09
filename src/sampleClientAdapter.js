import {VTigerCrmAdapter} from './VTigerCrmAdapter.js';


const USER_ACCESS_KEY = 'JkDMwItdgLaQGQdI';
const USERNAME = 'reisebuddy';
const REISEBUDDY_USER_ID = '19x5';
const ELEMENT_TYPE_CONTACT = 'Contacts';

const adapter = new VTigerCrmAdapter('http://localhost/vtigercrm/webservice.php', USERNAME, USER_ACCESS_KEY);

try {
    console.log('CONTACTS', adapter.findContactsByEMail('007@sms.db.de').map(contact=>JSON.stringify(contact)))
}
catch (err) {
    console.error(err);
}