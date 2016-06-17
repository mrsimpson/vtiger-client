import {VTigerCrmAdapter} from './VTigerCrmAdapter.js';

const USER_ACCESS_KEY = 'JkDMwItdgLaQGQdI';
const USERNAME = 'reisebuddy';

const adapter = new VTigerCrmAdapter('http://localhost/vtigercrm/webservice.php', USERNAME, USER_ACCESS_KEY);
const random = 'unittest_' + Math.floor(Math.random()*100000);

function teardown() {
    "use strict";
    return adapter.findContactsBySkeletonPromise({email: 'unittest_%'}).then((contacts)=> {
        Promise.all(contacts.map((contact)=>adapter.deletePromise(contact.id)));
    })
}

teardown()
    .then(()=> {
        adapter.createContactPromise({firstname: random, lastname: random, email: random})
            .then((createdContact)=> {
                console.log('CREATED_CONTACT', createdContact.id);
                adapter.retrievePromise(createdContact.id)
                    .then((contact)=> {
                        console.log('RETRIEVED_CONTACT', JSON.stringify(contact));

                        contact.firstname = 'James';
                        contact.lastname = 'Bond';

                        adapter.updatePromise(contact)
                            .then((updatedContact)=> {
                                console.log('UPDATED_CONTACT', updatedContact);
                                adapter.findContactsFulltextPromise('unittest_%')
                                    .then((contacts)=> {
                                        console.log('CONTACTS', contacts ? contacts.map(contact=>JSON.stringify(contact)) : '<none />');
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