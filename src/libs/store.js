/**
 * Created by federicolaggiard on 09/07/15.
 */

'use strict';

/***
 * Utility to manage local storage
 * @param key the key of the value in the local storage to retrieve. pass null
 * @returns {Function} returns an m.prop like property
 */
export default function (key) {

  return function () {
    //if this function has an input value then it's a set request
    if (arguments.length) {
      // allow only object to be stored
      if (typeof arguments[0] !== 'object') throw TypeError('Only objects can be stored');

      //if first argument (the value of the prop) is null remove the item from the storage
      if (arguments[0] === null) return localStorage.removeItem(key);
      //if the argument is not a string but an object stringify it as JSON (only strings allowed in local storage)
      localStorage[key] = JSON.stringify(arguments[0]);
    }
    //it is a get, so retrieve the value
    return JSON.parse(localStorage[key] ? localStorage[key] : null);
  }

}