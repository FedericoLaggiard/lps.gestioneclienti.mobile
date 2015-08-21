/**
 * Created by federicolaggiard on 21/08/15.
 */

'use strict';

import m from 'mithril';
import { urls, env } from '../config';
import request from '../libs/request';

function Customer(data){

  this._id  =           m.prop(data._id || null);
  this._rev =           m.prop(data._rev || null);
  this.codCliente =     m.prop(data.codCliente || '-');
  this.ragioneSociale = m.prop(data.ragioneSociale || '-');
  this.codAgente =      m.prop(data.codAgente || '-');
  this.indirizzo =      m.prop(data.indirizzo || '');
  this.citta =          m.prop(data.citta || '');
  this.provincia =      m.prop(data.provincia || '');
  this.telefono =       m.prop(data.telefono || '-');
  this.fax =            m.prop(data.fax || '-');
  this.email =          m.prop(data.email || '-');
  this.responsabile =   m.prop(data.responsabile || '-');
  this.attivita =       m.prop(data.attivita || '-');
  this.ultimaVisita =   m.prop(data.ultimaVisita || '');

}


Customer.fetch = function(callback){

  request({
    method: 'GET',
    url: urls[env].customer + '/' + m.route.param('id'),
    type: Customer
  }, (err, customer) => {
    if(err) return callback(err, null);

    customer = cleanCustomer(customer);

    app.state.customer(customer);
    callback(null,customer);
  })


};

function cleanCustomer(customer){

  customer.ultimaVisita(customer.ultimaVisita() ? customer.ultimaVisita() : 'n/def');
  if(customer.telefono()) customer.telefono( customer.telefono().replace(new RegExp('\/','g'), ' ').replace(/\./g,' ').replace(/\\/g,' ') );

  return customer;
}

export default Customer;