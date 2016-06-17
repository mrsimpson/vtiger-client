'use strict';

var _VTigerCrmAdapter = require('./VTigerCrmAdapter.js');

var USER_ACCESS_KEY = 'JkDMwItdgLaQGQdI';
var USERNAME = 'reisebuddy';

var adapter = new _VTigerCrmAdapter.VTigerCrmAdapter('http://localhost/vtigercrm/webservice.php', USERNAME, USER_ACCESS_KEY);
var random = 'unittest_' + Math.floor(Math.random() * 100000);

function teardown() {
    "use strict";

    return adapter.findContactsBySkeletonPromise({ email: 'unittest_%' }).then(function (contacts) {
        Promise.all(contacts.map(function (contact) {
            return adapter.deletePromise(contact.id);
        }));
    });
}

teardown().then(function () {
    adapter.createContactPromise({ firstname: random, lastname: random, email: random }).then(function (createdContact) {
        console.log('CREATED_CONTACT', createdContact.id);
        adapter.retrievePromise(createdContact.id).then(function (contact) {
            console.log('RETRIEVED_CONTACT', JSON.stringify(contact));

            contact.firstname = 'James';
            contact.lastname = 'Bond';

            adapter.updatePromise(contact).then(function (updatedContact) {
                console.log('UPDATED_CONTACT', updatedContact);
                adapter.findContactsFulltextPromise('unittest_%').then(function (contacts) {
                    console.log('CONTACTS', contacts ? contacts.map(function (contact) {
                        return JSON.stringify(contact);
                    }) : '<none />');
                    if (contacts) {
                        // adapter.deletePromise(contacts[0].id)
                        //     .then(()=>console.log('DELETED_CONTACT'))
                        //     .catch((err)=>console.log(err));
                    }
                }).catch(function (err) {
                    return console.error(err);
                });
            }).catch(function (err) {
                return console.error(err);
            });
        }).catch(function (err) {
            return console.error(err);
        });
    }).catch(function (err) {
        return console.error(err);
    });
});
//# sourceMappingURL=sampleClientAdapter.js.map