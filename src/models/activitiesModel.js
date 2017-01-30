/**
 * Created by federicolaggiard on 28/01/17.
 */

'use strict';

import m from 'mithril';
import { urls, env } from '../config';
import request from '../libs/request';

function Activity(data){
  this.name       = m.prop(data.key   || '');
  this.count      = m.prop(data.value || '');
}

Activity.fetch = function(callback){

  request({
    method: 'GET',
    url: urls[env].activity,
    unwrapSuccess: function(response) {
      return response.rows;
    },
    type: Activity,
    background: true
  }, (err, activities) => {
    if(err) {
      app.showToast('Si è verificato un errore.');
      return callback(err, null);
    }
    app.state.activities(activities);
    callback(null,activities);
  })


};

Activity.filterByText = function(value){
  var regex = new RegExp(app.state.searchText(), 'gi');
  return value.name.search(regex) != -1;
};

export default Activity;