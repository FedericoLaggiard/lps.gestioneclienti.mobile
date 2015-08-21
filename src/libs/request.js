/** Created by Juan Manuel Ventura */

'use strict';

import m from 'mithril';
import app from '../app.js';

/**
 * Request with a Node style callback hiding promises
 * @param noAuth if true no Basic Auth header is sent
 * @param options
 * @param callback
 */

export default function (options, callback, noAuth = false) {

  if (!options) throw Error('options required');

  options.deserialize = function(data) {
    try{
      return JSON.parse(data);
    }catch(err){
      let ret = { wrapped: data };
      console.warn("API data doesn't comes in JSON format, wrapping it -> ", ret);
      return ret;
    }
  };


  if (noAuth == false) {
    options.config = function config(xhr) {
      //xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      //xhr.setRequestHeader("Access-Control-Allow-Headers", "origin");
    };

    options.extract = function (xhr, xhrOptions) {
      if (xhr.status === 403) {
        app.state.login({ status: 403 });
        m.route('/login');
        //throw new Error('logged out');
      }
      return xhr.responseText ? xhr.responseText : '{}'
    }
  }

  m.request(options).then((response) => {
        callback(null, response);
      }, (error) => {
        callback(error, null);
      }
  );

}