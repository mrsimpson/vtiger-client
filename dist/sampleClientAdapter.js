'use strict';

var _VTigerCrmAdapter = require('./VTigerCrmAdapter.js');

var USER_ACCESS_KEY = 'JkDMwItdgLaQGQdI';
var USERNAME = 'reisebuddy';
var REISEBUDDY_USER_ID = '19x5';
var ELEMENT_TYPE_CONTACT = 'Contacts';

var adapter = new _VTigerCrmAdapter.VTigerCrmAdapter('http://localhost/vtigercrm/webservice.php', USERNAME, USER_ACCESS_KEY);

adapter.findContactsFulltextPromise('007@%').then(function (contacts) {
    console.log('CONTACTS', contacts ? contacts.map(function (contact) {
        return JSON.stringify(contact);
    }) : '<none />');

    /*        adapter.findContactsFulltextPromise('008@sms.db.de')
     .then((contacts)=> {
     console.log('CONTACTS', contacts.map(contact=>JSON.stringify(contact)));
     })
     .catch((err)=>{
     console.error(err);
     });
       */
    adapter.findContactById(contacts[0].id).then(function (contact) {
        console.log('CONTACT', JSON.stringify(contact));
    }).catch(function (err) {
        console.error(err);
    });
}).catch(function (err) {
    console.error(err);
});
//# sourceMappingURL=sampleClientAdapter.js.map