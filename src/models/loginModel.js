/**
 * Created by federicolaggiard on 14/08/15.
 */

'use strict';

import m from 'mithril';
import { urls, env } from '../config';
import request from '../libs/request';

function Login(data){
  this.ok     = m.prop(data.ok || false);
  this.name   = m.prop(data.name || '');
  this.roles  = m.prop(data.roles || []);
}

Login.fetch = function(callback){

  request({
    method: 'POST',
    url: urls[env].login,
    data: app.state.credentials,
    type: Login
  }, (err, login) => {
    if(err) {
      app.showToast('Si è verificato un errore.');
      return callback(err,null);
    }
    app.state.login(login);
    callback(null,login);
  })

};

export default Login;

