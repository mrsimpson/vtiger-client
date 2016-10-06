'use strict';

var _VTigerCrmAdapter = require('./VTigerCrmAdapter.js');

var USER_ACCESS_KEY = 'XMvugt2SH21gjEhG';
var USERNAME = 'reisebuddy';
var ASSIGNED_USER_ID = '19x78';

var adapter = new _VTigerCrmAdapter.VTigerCrmAdapter('http://localhost/vtigercrm_dbd/webservice.php', USERNAME, USER_ACCESS_KEY, ASSIGNED_USER_ID);

var random = 'unittest_' + Math.floor(Math.random() * 100000);

function teardown() {
    "use strict";

    return adapter.findContactsBySkeletonPromise({ mobile: undefined, email: 'unittest%' }, 'OR').then(function (contacts) {
        if (Object.prototype.toString.call(contacts) === '[object Array]') {
            Promise.all(contacts.map(function (contact) {
                return adapter.deletePromise(contact.id);
            }));
        }
    }).catch(function (err) {
        console.error(err);
    });
}

teardown() //start from scratch
.then(function () {
    adapter.createContactWithMessagePromise({ firstname: random, lastname: random, email: random }, "Kampagnenname").then(function (result) {
        console.log('CREATED_CONTACT', result.createdContact.id);
        console.log('MESSAGES FROM CRM', JSON.stringify(result.messages));
        adapter.retrievePromise(result.createdContact.id).then(function (contact) {
            console.log('RETRIEVED_CONTACT', JSON.stringify(contact));

            contact.firstname = 'James';
            contact.lastname = 'Bond';

            adapter.updatePromise(contact).then(function (updatedContact) {
                console.log('UPDATED_CONTACT', updatedContact);
                adapter.findContactsFulltextPromise('unittest_%', 10).then(function (contacts) {
                    console.log('CONTACTS', contacts ? contacts.map(function (contact) {
                        return JSON.stringify(contact, " ", 2);
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