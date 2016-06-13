'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by OliverJaegle on 08.06.2016.
 */
var VTigerCrm = require('./vtiger_consumer_swagger/src/'); // See note below*.
var CryptoJS = require('crypto-js');

var VTigerCrmAdapterException = exports.VTigerCrmAdapterException = function (_Error) {
    _inherits(VTigerCrmAdapterException, _Error);

    function VTigerCrmAdapterException(operation, message, previous) {
        _classCallCheck(this, VTigerCrmAdapterException);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VTigerCrmAdapterException).call(this, message));

        _this.operation = operation;
        _this.previous = previous;
        return _this;
    }

    return VTigerCrmAdapterException;
}(Error);

var VTigerCrmAdapter = exports.VTigerCrmAdapter = function () {
    function VTigerCrmAdapter(basePath, username, accesskey) {
        _classCallCheck(this, VTigerCrmAdapter);

        this.username = username;
        this.accesskey = accesskey;
        this.sessionToken = '';

        this.vTigerApi = new VTigerCrm.DefaultApi(); // Allocate the API class we're going to use.
        this.vTigerApi.apiClient.basePath = basePath;

        /*          We can't login in the constructor as a consumer might immediately issue a subsequent request.
                    Thus, all the resolvers of the login-Promise need to buffer the result in order to take advantage of existing
                    session tokens
        
                    this.loginPromise(this.username, this.accessKey)
                    .then((result)=>{
                        this.sessionToken = result
                    })
                    .catch((err)=>{
                        console.error(err.operation, err.message, err.previous.toString());
                        throw err;
                    });*/
    }

    _createClass(VTigerCrmAdapter, [{
        key: 'loginPromise',
        value: function loginPromise() {
            var adapterInstance = this;
            return new Promise(function (resolve, reject) {
                if (adapterInstance.sessionToken) {
                    resolve(adapterInstance.sessionToken);
                } else {
                    adapterInstance.vTigerApi.operationgetchallengeGet(adapterInstance.username, function (err, data, response) {
                        if (err) {
                            throw new VTigerCrmAdapterException('GET_CHALLENGE', 'Couldn\'t execute webservice:', err);
                        }
                        if (!response.body.success) {
                            throw new VTigerCrmAdapterException('GET_CHALLENGE', 'Couldn\'t receive challenge:', response.body.error.message);
                        }

                        var challengeToken = response.body.result.token;
                        console.log('CHALLENGE_TOKEN', challengeToken);

                        adapterInstance.vTigerApi.operationloginPost(adapterInstance.username, CryptoJS.MD5(challengeToken + adapterInstance.accesskey).toString(), function (err, data, response) {
                            if (err) {
                                throw new VTigerCrmAdapterException('LOGIN', 'Couldn\'t execute webservice:', err);
                            }

                            if (!response.body.success) {
                                throw new VTigerCrmAdapterException('LOGIN', 'Couldn\'t log in:', response.body.error.message);
                            }

                            console.log('SESSION_TOKEN', response.body.result.sessionName);
                            resolve(response.body.result.sessionName);
                        }); //operationLoginPost
                    }); //operationChallengeGet
                }
            });
        } //loginPromise

    }, {
        key: 'findContactsBySkeletonPromise',
        value: function findContactsBySkeletonPromise(contactSkeleton, operator) {
            /**
             * Operator defines how the properties of the contact skeleton are to be combined.
             * Possible values ['AND', 'OR']
             */
            var adapterInstance = this;
            return new Promise(function (resolve, reject) {
                adapterInstance.loginPromise().then(function (sessionHandle) {
                    adapterInstance.sessionToken = sessionHandle;
                    var queryString = "select * from Contacts where " + adapterInstance.contactSkeletonToWhere(contactSkeleton, operator) + ";";
                    console.log('SESSION_HANDLE_FOR_QUERY', adapterInstance.sessionToken);
                    adapterInstance.vTigerApi.operationqueryGet(adapterInstance.sessionToken, queryString, function (err, data, response) {
                        if (err) {
                            throw new VTigerCrmAdapterException('QUERY', 'Couldn\'t execute webservice:', err);
                        }

                        if (!response.body.success) {
                            throw new VTigerCrmAdapterException('QUERY', 'Couldn\'t execute query:', response.body.error.message);
                        }

                        resolve(response.body.result); //might be initial
                    });
                }).catch(function (err) {
                    console.error(err.operation, err.message, err.previous.toString());
                    throw err;
                });
            });
        } //findContactsBySkeletonPromise

    }, {
        key: 'findContactsFulltextPromise',
        value: function findContactsFulltextPromise(text) {
            var contactSkeleton = {
                lastname: text,
                firstname: text,
                email: text
            };

            return this.findContactsBySkeletonPromise(contactSkeleton, 'OR');
        } //findContactsFulltextPromise

    }], [{
        key: 'contactSkeletonToWhere',
        value: function contactSkeletonToWhere(contact, operator) {
            var whereClause = '';
            for (var key in contact) {
                if (contact.hasOwnProperty(key)) {
                    if (whereClause) whereClause += ' ' + operator + ' ';
                    whereClause += key + " LIKE '" + contact[key] + "'";
                }
            }
            return whereClause;
        }
    }]);

    return VTigerCrmAdapter;
}();
//# sourceMappingURL=VTigerCrmAdapter.js.map