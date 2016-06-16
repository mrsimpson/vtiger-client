import {VTigerCrmAdapter} from './VTigerCrmAdapter.js';


const USER_ACCESS_KEY = 'JkDMwItdgLaQGQdI';
const USERNAME = 'reisebuddy';
const REISEBUDDY_USER_ID = '19x5';
const ELEMENT_TYPE_CONTACT = 'Contacts';

const adapter = new VTigerCrmAdapter('http://localhost/vtigercrm/webservice.php', USERNAME, USER_ACCESS_KEY);

adapter.findContactsFulltextPromise('007@%')
    .then((contacts)=> {
        console.log('CONTACTS', contacts ? contacts.map(contact=>JSON.stringify(contact)) : '<none />');

        /*        adapter.findContactsFulltextPromise('008@sms.db.de')
         .then((contacts)=> {
         console.log('CONTACTS', contacts.map(contact=>JSON.stringify(contact)));
         })
         .catch((err)=>{
         console.error(err);
         });

         */
        adapter.findContactById(contacts[0].id)
            .then((contact)=> {
                console.log('CONTACT', JSON.stringify(contact));
            })
            .catch((err)=> {
                console.error(err);
            });
    })
    .catch((err)=> {
        console.error(err);
    });