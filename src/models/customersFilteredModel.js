/**
 * Created by federicolaggiard on 28/01/17.
 */

'use strict';

import m from 'mithril';
import { urls, env } from '../config';
import request from '../libs/request';

function CustomersFiltered(data){
  this.ragSociale  = m.prop(data.ragioneSociale() || '');
  this.id          = m.prop(data._id() || '');
}

CustomersFiltered.fetch = function(field, value, callback){

  try{

    let ret = [];
    if(!app.state.fullCustomers()) return ret;

    app.state.fullCustomers().map((customer) =>{
      if(!customer.hasOwnProperty(field)) throw "field " + field + " not found on object "+ JSON.stringify(customer);

      if(customer[field]().toLowerCase() === value.toLowerCase()) ret.push(new CustomersFiltered(customer));
    });

    ret = ret.sort(function(a,b){
      if (a.ragSociale() < b.ragSociale()) {
        return -1;
      }
      if (a.ragSociale() > b.ragSociale()) {
        return 1;
      }
      // keys must be equal
      return 0;
    });

    app.state.customersFiltered(ret);
    callback(null,ret);

  }catch(ex){
    callback(ex,null);
  }


};

CustomersFiltered.filterByText = function(value){
  var regex = new RegExp(app.state.searchText(), 'gi');
  return value.ragSociale.search(regex) != -1;
};

export default CustomersFiltered;