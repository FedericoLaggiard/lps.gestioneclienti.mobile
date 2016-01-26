/**
 * Created by federicolaggiard on 14/08/15.
 */

'use strict';

import m from 'mithril';
import { urls, env } from '../config';
import request from '../libs/request';

function Login(data){
  this._id      = m.prop(data._id);
  this._rev     = m.prop(data._rev);
  this.key      = m.prop(data.key   || '');
  this.name     = m.prop(data.name  || '');
  this.roles    = m.prop(data.roles || []);
  this.type     = m.prop(data.type  || '');
}

Login.fetch = function(credentials, callback){

  request({
    method: 'POST',
    url: urls[env].login,
    data: credentials,
    background: true
  }, (err, login) => {
    if(err) {
      return callback(err,null);
    }

    request({
      method: 'GET',
      type: Login,
      url: urls[env].users + '/org.couchdb.user:' + login.name,
      background: true
    }, (err, user) => {
      if(err) return callback(err,null);

      app.state.user(user);
      callback(null,user);
    },false);

    //app.state.login(login);
    //callback(null,login);
  }, true, true)

};

export default Login;

