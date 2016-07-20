import {VTigerCrmAdapter} from './VTigerCrmAdapter.js';
const USER_ACCESS_KEY = 'XMvugt2SH21gjEhG';
const USERNAME = 'reisebuddy';
const ASSIGNED_USER_ID = '19x78';

const adapter = new VTigerCrmAdapter('http://localhost/vtigercrm_dbd/webservice.php', USERNAME, USER_ACCESS_KEY, ASSIGNED_USER_ID);
/**/
const random = 'unittest_' + Math.floor(Math.random() * 100000);

function teardown() {
    "use strict";
    return adapter.findContactsBySkeletonPromise({email: 'unittest%'})
        .then((contacts)=> {
            if (Object.prototype.toString.call(contacts) === '[object Array]') {
                Promise.all(contacts.map((contact)=>adapter.deletePromise(contact.id)));
            }
        })
        .catch((err)=> {
            console.error(err)
        });
}

teardown() //start from scratch
    .then(()=> {
        adapter.createContactWithMessagePromise({firstname: random, lastname: random, email: random}, "Kampagnenname")
            .then((result)=> {
                console.log('CREATED_CONTACT', result.createdContact.id);
                console.log('MESSAGES FROM CRM', JSON.stringify(result.messages));
                adapter.retrievePromise(createdContact.id)
                    .then((contact)=> {
                        console.log('RETRIEVED_CONTACT', JSON.stringify(contact));

                        contact.firstname = 'James';
                        contact.lastname = 'Bond';

                        adapter.updatePromise(contact)
                            .then((updatedContact)=> {
                                console.log('UPDATED_CONTACT', updatedContact);
                                adapter.findContactsFulltextPromise('unittest_%', 10)
                                    .then((contacts)=> {
                                        console.log('CONTACTS', contacts ? contacts.map(contact=>JSON.stringify(contact, " ", 2)) : '<none />');
                                        if (contacts) {
                                            // adapter.deletePromise(contacts[0].id)
                                            //     .then(()=>console.log('DELETED_CONTACT'))
                                            //     .catch((err)=>console.log(err));
                                        }
                                    })
                                    .catch((err)=> console.error(err));
                            })
                            .catch((err)=> console.error(err));

                    })
                    .catch((err)=> console.error(err));
            })
            .catch((err)=> console.error(err));
    });