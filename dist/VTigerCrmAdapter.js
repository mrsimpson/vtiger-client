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

var ELEMENT_TYPE_CONTACT = 'Contacts';

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

    // ------------------------------------------------ public methods ----------------------------------------------------

    function VTigerCrmAdapter(basePath, username, accesskey) {
        var logger = arguments.length <= 3 || arguments[3] === undefined ? console : arguments[3];

        _classCallCheck(this, VTigerCrmAdapter);

        this.username = username;
        this.accesskey = accesskey;
        this.sessionToken = '';
        this.assigned_user_id = "19x5";
        this.logger = logger;

        this.vTigerApi = new VTigerCrm.DefaultApi(); // Allocate the API class we're going to use.
        this.vTigerApi.apiClient.basePath = basePath;

        /*          We can't login in the constructor as a consumer might immediately issue a subsequent request.
         Thus, all the resolvers of the login-Promise need to buffer the result in order to take advantage of existing
         session tokens
           this._loginPromise(this.username, this.accessKey)
         .then((result)=>{
         this.sessionToken = result
         })
         .catch((err)=>{
         console.error(err.operation, err.message, err.previous.toString());
         throw err;
         });*/
    }

    _createClass(VTigerCrmAdapter, [{
        key: 'findContactsFulltextPromise',
        value: function findContactsFulltextPromise(text) {
            var contactSkeleton = {
                lastname: text,
                firstname: text,
                email: text
            };

            return this.findContactsBySkeletonPromise(contactSkeleton, 'OR');
        } //findContactsFulltextPromise

    }, {
        key: 'createContactPromise',
        value: function createContactPromise(contact) {
            var adapterInstance = this;
            contact.assigned_user_id = this.assigned_user_id;
            return adapterInstance._loginPromise().then(function (sessionToken) {
                return adapterInstance._createPromise(sessionToken, ELEMENT_TYPE_CONTACT, contact);
            });
        }
    }, {
        key: 'retrievePromise',
        value: function retrievePromise(contactId) {
            var adapterInstance = this;
            return adapterInstance._loginPromise().then(function (sessionToken) {
                return adapterInstance._retrievePromise(sessionToken, contactId);
            });
        }
    }, {
        key: 'updatePromise',
        value: function updatePromise(contact) {
            var adapterInstance = this;
            return adapterInstance._loginPromise().then(function (sessionToken) {
                return adapterInstance._updatePromise(sessionToken, contact);
            });
        }
    }, {
        key: 'deletePromise',
        value: function deletePromise(contactId) {
            var adapterInstance = this;
            return adapterInstance._loginPromise().then(function (sessionToken) {
                return adapterInstance._deletePromise(sessionToken, contactId);
            });
        }

        //-------------------------------------------------- private methods ---------------------------------------------------
        /**
         * All services offered by vTiger require authorization to be done prior to the webservice-call.
         * As everything is done asynchronously, the login-promise needs to be resolved before continuing resolving the
         * actual webservice-promise. Thus, the autorization-rensitive-methods (starting with _) are encapsulated again in a
         * public method which chains the execution.
         * Still, the login-method bufferss the result on resolution so that - although the promise is chained as pre-
         * decessor, the webservices used for authorization are not executed anymore.
         * It seems as if the sessionToken had an unlimited lifetime.
         * @returns {Promise}
         * @private
         */

    }, {
        key: '_loginPromise',
        value: function _loginPromise() {
            var _this2 = this;

            var adapterInstance = this;
            return new Promise(function (resolve, reject) {
                if (adapterInstance.sessionToken) {
                    resolve(adapterInstance.sessionToken);
                } else {
                    adapterInstance.vTigerApi.operationgetchallengeGet(adapterInstance.username, function (err, data, response) {
                        if (err) {
                            return reject(new VTigerCrmAdapterException('GET_CHALLENGE', 'Couldn\'t execute webservice:', err));
                        }
                        if (!response.body.success) {
                            return reject(new VTigerCrmAdapterException('GET_CHALLENGE', 'Couldn\'t receive challenge:', response.body.error.message));
                        }

                        var challengeToken = response.body.result.token;
                        _this2.logger.log('CHALLENGE_TOKEN', challengeToken);

                        adapterInstance.vTigerApi.operationloginPost(adapterInstance.username, CryptoJS.MD5(challengeToken + adapterInstance.accesskey).toString(), function (err, data, response) {
                            if (err) {
                                return reject(new VTigerCrmAdapterException('LOGIN', 'Couldn\'t execute webservice:', err));
                            }

                            if (!response.body.success) {
                                return reject(new VTigerCrmAdapterException('LOGIN', 'Couldn\'t log in:', response.body.error.message));
                            }

                            _this2.logger.log('SESSION_TOKEN', response.body.result.sessionName);
                            adapterInstance.sessionToken = response.body.result.sessionName;
                            resolve(response.body.result.sessionName);
                        }); //operationLoginPost
                    }); //operationChallengeGet
                }
            });
        } //_loginPromise

    }, {
        key: '_queryPromise',
        value: function _queryPromise(sessionToken, queryString) {
            /**
             * Promises a query result.
             * @type {VTigerCrmAdapter}
             */

            var adapterInstance = this;

            return new Promise(function (resolve, reject) {
                if (!sessionToken) reject(new VTigerCrmAdapterException('QUERY', 'No session token for query'));
                adapterInstance.vTigerApi.operationqueryGet(sessionToken, queryString, function (err, data, response) {
                    if (err) {
                        return reject(new VTigerCrmAdapterException('QUERY', 'Couldn\'t execute webservice:', err));
                    }

                    if (!response.body.success) {
                        return reject(new VTigerCrmAdapterException('QUERY', 'Couldn\'t execute query:', response.body.error.message));
                    }

                    resolve(response.body.result); //might be initial
                });
            });
        }
    }, {
        key: '_createPromise',
        value: function _createPromise(sessionToken, objectType, object) {
            var adapterInstance = this;
            return new Promise(function (resolve, reject) {
                if (!sessionToken) return reject(new VTigerCrmAdapterException('CREATE', 'No session token for creation'));
                adapterInstance.vTigerApi.operationcreatePost(sessionToken, objectType, JSON.stringify(object), function (err, data, response) {
                    if (err) {
                        return reject(new VTigerCrmAdapterException('CREATE', 'Couldn\'t execute webservice:', err));
                    }

                    if (!response.body.success) {
                        return reject(new VTigerCrmAdapterException('CREATE', 'Couldn\'t create:', response.body.error.message));
                    }

                    resolve(response.body.result); //might be initial
                });
            });
        } //_createPromise

    }, {
        key: '_retrievePromise',
        value: function _retrievePromise(sessionToken, id) {
            var adapterInstance = this;
            return new Promise(function (resolve, reject) {
                if (!sessionToken) return reject(new VTigerCrmAdapterException('RETRIEVE', 'No session token for retrieval'));
                adapterInstance.vTigerApi.operationretrieveGet(sessionToken, id, function (err, data, response) {
                    if (err) {
                        return reject(new VTigerCrmAdapterException('RETRIEVE', 'Couldn\'t execute webservice:', err));
                    }

                    if (!response.body.success) {
                        return reject(new VTigerCrmAdapterException('RETRIEVE', 'Couldn\'t retrieve:', response.body.error.message));
                    }

                    resolve(response.body.result); //might be initial
                });
            });
        } //_retrievePromise

    }, {
        key: '_updatePromise',
        value: function _updatePromise(sessionToken, object) {
            var adapterInstance = this;
            return new Promise(function (resolve, reject) {
                if (!sessionToken) return reject(new VTigerCrmAdapterException('UPDATE', 'No session token for update'));
                adapterInstance.vTigerApi.operationupdatePost(sessionToken, JSON.stringify(object), function (err, data, response) {
                    if (err) {
                        return reject(new VTigerCrmAdapterException('UPDATE', 'Couldn\'t execute webservice:', err));
                    }

                    if (!response.body.success) {
                        return reject(new VTigerCrmAdapterException('UPDATE', 'Couldn\'t update:', response.body.error.message));
                    }

                    resolve(response.body.result); //might be initial
                });
            });
        } //_updatePromise

    }, {
        key: '_deletePromise',
        value: function _deletePromise(sessionToken, id) {
            var adapterInstance = this;
            return new Promise(function (resolve, reject) {
                if (!sessionToken) return reject(new VTigerCrmAdapterException('DELETE', 'No session token for delete'));
                adapterInstance.vTigerApi.operationdeletePost(sessionToken, id, function (err, data, response) {
                    if (err) {
                        return reject(new VTigerCrmAdapterException('DELETE', 'Couldn\'t execute webservice:', err));
                    }

                    if (!response.body.success) {
                        return reject(new VTigerCrmAdapterException('DELETE', 'Couldn\'t delete:', response.body.error.message));
                    }

                    resolve(response.body.success); //might be initial
                });
            });
        } //_deletePromise

    }, {
        key: 'findContactsBySkeletonPromise',
        value: function findContactsBySkeletonPromise(contactSkeleton) {
            var operator = arguments.length <= 1 || arguments[1] === undefined ? 'AND' : arguments[1];

            /**
             * Operator defines how the properties of the contact skeleton are to be combined.
             * Possible values ['AND', 'OR']
             */
            var adapterInstance = this;
            var queryString = "select * from Contacts where " + VTigerCrmAdapter.contactSkeletonToWhere(contactSkeleton, operator) + ";";

            return adapterInstance._loginPromise().then(function (sessionToken) {
                return adapterInstance._queryPromise(sessionToken, queryString);
            });
        } //findContactsBySkeletonPromise

        // ------------------------------------------------- static helpers ----------------------------------------------------

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