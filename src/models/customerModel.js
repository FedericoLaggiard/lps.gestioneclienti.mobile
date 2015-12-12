/**
 * Created by federicolaggiard on 21/08/15.
 */

'use strict';

import m from 'mithril';
import { urls, env } from '../config';
import request from '../libs/request';

function Customer(data){

  if(data) {
    this._id            = m.prop(data._id             || null);
    this._rev           = m.prop(data._rev            || null);
    this.codCliente     = m.prop(data.codCliente      || '');
    this.ragioneSociale = m.prop(data.ragioneSociale  || '');
    this.codAgente      = m.prop(data.codAgente       || '');
    this.indirizzo      = m.prop(data.indirizzo       || '');
    this.citta          = m.prop(data.citta           || '');
    this.provincia      = m.prop(data.provincia       || '');
    this.telefono       = m.prop(data.telefono        || '');
    this.fax            = m.prop(data.fax             || '');
    this.email          = m.prop(data.email           || '');
    this.responsabile   = m.prop(data.responsabile    || '');
    this.attivita       = m.prop(data.attvita         || '');
    this.ultimaVisita   = m.prop(data.ultimaVisita    || '');
    this.relazioni      = m.prop(data.relazioni       || []);
  }else{
    this._id            = m.prop(null);
    this._rev           = m.prop(null);
    this.codCliente     = m.prop('');
    this.ragioneSociale = m.prop('');
    this.codAgente      = m.prop('');
    this.indirizzo      = m.prop('');
    this.citta          = m.prop('');
    this.provincia      = m.prop('');
    this.telefono       = m.prop('');
    this.fax            = m.prop('');
    this.email          = m.prop('');
    this.responsabile   = m.prop('');
    this.attivita       = m.prop('');
    this.ultimaVisita   = m.prop('');
    this.relazioni      = m.prop([]);
  }
}


Customer.fetch = function(callback){

  request({
    method: 'GET',
    url: urls[env].customer + '/' + m.route.param('id'),
    type: Customer,
    background: true
  }, (err, customer) => {
    if(err) {
      app.showToast('Si è verificato un errore.');
      return callback(err, null);
    }

    //customer = cleanCustomer(customer);

    app.state.customer(customer);
    callback(null,customer);
  })


};

Customer.update = function(data, callback){

  request({
    method: 'PUT',
    url: urls[env].customer + '/' + m.route.param('id'),
    data: data,
    background: true
  }, (err, success) => {

    if(err) {
      app.showToast('Si è verificato un errore.');
      return callback(err, null);
    }

    data()._rev(success.rev);

    app.state.customer(data());

    callback(null,success);
  })

};

Customer.insert = function(data, callback){

  if (data()._rev){
    delete data()._rev;
  }
  if(data()._id){
    delete data()._id;
  }

  request({
    method: 'POST',
    url: urls[env].customer,
    data: data,
    background: true
  }, (err, success) => {
    if(err) {
      app.showToast('Si è verificato un errore.');
      return callback(err,null);
    }

    callback(null,success);
  })

};

Customer.remove = function(data, callback){

  data = data._rev();

  request({
    method: 'delete',
    url: urls[env].customer + '/' + m.route.param('id') + '?rev=' + data,
    background: true
  }, (err, success) => {

    if(err) {
      app.showToast('Si è verificato un errore.');
      return callback(err, null);
    }

    callback(null,success);

  })

};


function cleanCustomer(customer){

  customer.ultimaVisita(customer.ultimaVisita() ? customer.ultimaVisita() : 'n/def');
  if(customer.telefono()) customer.telefono( customer.telefono().replace(new RegExp('\/','g'), ' ').replace(/\./g,' ').replace(/\\/g,' ') );

  return customer;
}

export default Customer;