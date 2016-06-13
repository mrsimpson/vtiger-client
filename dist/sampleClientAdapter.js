'use strict';

var _VTigerCrmAdapter = require('./VTigerCrmAdapter.js');

var USER_ACCESS_KEY = 'JkDMwItdgLaQGQdI';
var USERNAME = 'reisebuddy';
var REISEBUDDY_USER_ID = '19x5';
var ELEMENT_TYPE_CONTACT = 'Contacts';

var adapter = new _VTigerCrmAdapter.VTigerCrmAdapter('http://localhost/vtigercrm/webservice.php', USERNAME, USER_ACCESS_KEY);

adapter.findContactsFulltextPromise('007@%').then(function (contacts) {
    console.log('CONTACTS', contacts.map(function (contact) {
        return JSON.stringify(contact);
    }));

    adapter.findContactsFulltextPromise('008@sms.db.de').then(function (contacts) {
        console.log('CONTACTS', contacts.map(function (contact) {
            return JSON.stringify(contact);
        }));
    }).catch(function (err) {
        console.error(err);
    });
}).catch(function (err) {
    console.error(err);
});
//# sourceMappingURL=sampleClientAdapter.js.map