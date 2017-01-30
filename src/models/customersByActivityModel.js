/**
 * Created by federicolaggiard on 28/01/17.
 */

'use strict';

import m from 'mithril';
import { urls, env } from '../config';
import request from '../libs/request';

function CustomerByActivity(data){
  this.ragSociale  = m.prop(data.value || '');
  this.activity    = m.prop(data.key || '');
  this.id          = m.prop(data.id || '');
}

CustomerByActivity.fetch = function(activity, callback){

  request({
    method: 'GET',
    url: urls[env].customerByActivity + '"' + activity + '"',
    unwrapSuccess: function(response) {
      return response.rows;
    },
    type: CustomerByActivity,
    background: true
  }, (err, customers) => {
    if(err) {
      app.showToast('Si è verificato un errore.');
      return callback(err, null);
    }
    app.state.customersByActivities(customers);
    callback(null,customers);
  })


};

CustomerByActivity.filterByText = function(value){
  var regex = new RegExp(app.state.searchText(), 'gi');
  return value.ragSociale.search(regex) != -1;
};

export default CustomerByActivity;