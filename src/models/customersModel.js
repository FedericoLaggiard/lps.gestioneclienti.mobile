/**
 * Created by federicolaggiard on 14/08/15.
 */

'use strict';

import m from 'mithril';
import { urls, env } from '../config';
import request from '../libs/request';

function Customers(data){
  this.id         = m.prop(data.id    || '');
  this.ragSociale = m.prop(data.key   || '');
  this.codAgente  = m.prop(data.value || '');
}

Customers.fetch = function(callback){

  request({
    method: 'GET',
    url: urls[env].customers,
    unwrapSuccess: function(response) {
      return response.rows;
    },
    type: Customers,
    background: true
  }, (err, customers) => {
    if(err) {
      app.showToast('Si è verificato un errore.');
      return callback(err, null);
    }
    app.state.customers(customers);
    callback(null,customers);
  })


};

Customers.filterByText = function(value){
  var regex = new RegExp(app.state.searchText(), 'gi');
  return value.ragSociale.search(regex) != -1;
};

export default Customers;