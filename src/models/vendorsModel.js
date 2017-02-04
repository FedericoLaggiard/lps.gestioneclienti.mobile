/**
 * Created by federicolaggiard on 14/08/15.
 */

'use strict';

import m from 'mithril';
import { urls, env } from '../config';
import request from '../libs/request';

function Vendors(data){
  this.id         = m.prop(data.id    || '');
  this.ragSociale = m.prop(data.key   || '');
  this.codAgente  = m.prop(data.value || '');
}

Vendors.fetch = function(callback){

  request({
    method: 'GET',
    url: urls[env].vendors,
    unwrapSuccess: function(response) {
      return response.rows;
    },
    type: Vendors,
    background: true
  }, (err, vendors) => {
    if(err) {
      app.showToast('Si è verificato un errore.');
      return callback(err, null);
    }
    app.state.vendors(vendors);
    callback(null,vendors);
  })


};

Vendors.filterByText = function(value){
  var regex = new RegExp(app.state.searchText(), 'gi');
  return value.ragSociale.search(regex) != -1;
};

export default Vendors;