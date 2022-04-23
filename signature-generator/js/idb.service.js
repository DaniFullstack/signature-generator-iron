'use strict';

/* Services */

signature.factory("IDB", [function() {
    /**
     * PRIVATE VARS
     */
    var dataStoreDirectory = []; // Used for caching of data stores which are opened



    /**
     * getStore sees if a dataStore has already been initialized, if it doe's it continues to the call back
     * And if not, it will initialize the dataStore and then continue to the callback
     */
    function getStore(dataStoreName, indexes, callback) {
        if (dataStoreDirectory[dataStoreName] && callback) {
            callback(dataStoreDirectory[dataStoreName]);
        } else {
            console.log('- idb, getStore ' + dataStoreName);

            dataStoreDirectory[dataStoreName] = new IDBStore({
                storeName: dataStoreName,
                keyPath: 'id',
                indexes: (indexes ? indexes : []),
                onStoreReady: function () {
                    if (callback) {
                        callback(dataStoreDirectory[dataStoreName]);
                    } else {
                        console.log('- idb, Store %s ready!', dataStoreName);
                    }
                }
            });
        }
    }

    /**
     * Get an object from a specific dataStore
     * @dataStore - name of the dataStore.
     * @objectID - Unique object identifier.
     * @callback - Callback function with result.
     */
    function get(table, objectID, callback) {
        console.log('- idb, get ' + table + ' ' + objectID);

        getStore(table, null, function (store) {
            store.get(objectID, function (result) {
                if (callback) {
                    callback(result);
                } else {
                    console.log('- idb, %s %o', objectID, result);
                }
            });
        });
    }

    /**
     * Get a list of all the objects in a specific data store
     * @table - name of the dataStore.
     * @callback - Callback function with result.
     */
    function getAll(table, callback) {
        console.log('- idb, getAll ' + table);

        callback = callback ? callback : $.noop;
        getStore(table, null, function (store) {
            store.getAll(function (result) {

                var obj = {};
                angular.forEach(result, function (object) {
                    obj[object.id] = object;
                });

                callback(obj);
            });
        });
    }

    /**
     *
     * @param table
     * @param objectData
     * @param callback
     */
    function add(table, objectData, callback) {
        console.log('- idb, add %s %o', table, objectData);

        callback = callback ? callback : $.noop;
        getStore(table, null, function (store) {


            store.put(objectData, function (result) {
                callback(result);
            }, function(e) {
                console.error('idb, add error %s %o', table, objectData);
                console.error(e);
                callback(null);
            });
        });
    }

    /**
     *
     * @param table
     * @param objectData
     * @param callback
     */
    function update(table, objectData, callback) {
        console.log('- idb, update ' + table + ' ' + objectData);

        callback = callback ? callback : $.noop;
        getStore(table, null, function (store) {
            store.put(objectData, function (result) {
                callback(result);
            }, function() {
                console.error('idb, add error %s %o', table, objectData);
                callback(null);
            });
        });
    }

    /**
     * Delete an item from a dataStore by it's objectID
     * @dataStore - name of the dataStore.
     * @objectID - Unique object identifier.
     * @callback - Callback function with result.
     */
    /**
     *
     */
    function remove(table, objectID, callback) {
        console.log('- idb, remove' + table + ' ' + objectID);
        callback = callback ? callback : $.noop;
        getStore(table, null, function (store) {
            store.remove(objectID, function (result) {
                callback(result);
            });
        });
    }

    /**
     *
     * @param table
     * @param callback
     */
    function clear(table, callback) {
        console.log('- idb, clear ' + table);

        callback = callback ? callback : $.noop;
        getStore(table, null, function (store) {
            store.clear(function () {
                callback();
            });
        });
    }

    /**
     *
     * @param table
     * @param filter_func
     * @param callback
     */
    function search(table, filter_func, callback) {
        callback = callback ? callback : $.noop;
        getAll(table, function (results) {
            var filteredResult = _.filter(results, filter_func);
            callback(filteredResult);
        });
    }

    /**
     *
     * @param table
     * @param key
     * @param value
     * @param callback
     */
    function getAllByKey(table, key, value, callback) {
        callback = callback ? callback : $.noop;
        getAll(table, function (results) {
            var result = _.filter(results, function (item) {
                return item[key] == value;
            });
            callback(result);
        });
    }

    /**
     *
     * @param table
     * @param key
     * @param value
     * @param callback
     */
    function getItemByKey(table, key, value, callback) {
        callback = callback ? callback : $.noop;
        getAll(table, function (results) {
            var result = _.find(results, function (item) {
                return item[key] == value;
            });
            callback(result);
        });
    }

    /**
     *
     * @param table
     * @param array
     * @param callback
     */
    function batch(table, array, callback) {
        console.log("idb, batch " + table + ' ' + array);

        callback = callback ? callback : $.noop;
        getStore(table, null, function (store) {
            store.batch(array, function () {
                callback(true);
            }, function () {
                console.error("idb, idb batch error!");
                callback(false);
            });
        });
    }


    /**
     * Generate a random UUID
     * format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
     */
    function getUUID() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();

        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
    }


    /**
     * PUBLIC METHODS
     */
    return {
        getStore: getStore,
        get: get,
        getAll: getAll,
        add: add,
        update: update,
        remove: remove,
        clear: clear,
        batch: batch,
        getUUID: getUUID,
        search: search,
        getAllByKey: getAllByKey,
        getItemByKey: getItemByKey
    };


}]);