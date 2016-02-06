/** Created by Juan Manuel Ventura */

'use strict';

import m from 'mithril';
import app from '../app.js';

/**
 * Request with a Node style callback hiding promises
 * @param isAuth if true is a login action
 * @param options
 * @param callback
 */

export default function (options, callback, isAuth = false, noCredentials = false) {

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


  if (isAuth) {
    options.serialize = function(data){
      return m.route.buildQueryString(data)
    };
    options.config = function(xhr){
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.withCredentials = true;
    };
    options.extract = function (xhr, xhrOptions) {
      if (xhr.status === 401) {
        app.state.login({ status: 401 });
        m.route('/login');
      }
      return xhr.responseText ? xhr.responseText : '{}'
    }
  }else{
    options.config = function config(xhr) {
      if(!noCredentials)
        xhr.withCredentials = true;
    };

    options.extract = function (xhr, xhrOptions) {
      if (xhr.status === 401) {
        app.state.login({ status: 401 });
        m.route('/login');
      }
      return xhr.responseText ? xhr.responseText : '{}'
    }
  }

  app.showLoader(true);
  m.redraw();

  m.request(options).then((response) => {


      setTimeout(() => {
        app.showLoader(false);
        m.redraw();
        callback(null, response);
      },1500);

      }, (error) => {
        app.showLoader(false);
        m.redraw();

        callback(error, null);
      }
  );

}