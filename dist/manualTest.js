'use strict';

var _VTigerCrmAdapter = require('./VTigerCrmAdapter.js');

var USER_ACCESS_KEY = 'XMvugt2SH21gjEhG';
var USERNAME = 'reisebuddy';
var ASSIGNED_USER_ID = '19x78';

var adapter = new _VTigerCrmAdapter.VTigerCrmAdapter('http://localhost/vtigercrm_dbd/webservice.php', USERNAME, USER_ACCESS_KEY, ASSIGNED_USER_ID);

var contactSkeleton = {
    mobile: undefined,
    email: '01774119810@sms.db.de'
};

adapter.findContactsBySkeletonPromise(contactSkeleton, 'OR', 2).then(function (data, err) {
    console.log(data);
}).catch(function (err) {
    console.error(err);
});
//# sourceMappingURL=manualTest.js.map