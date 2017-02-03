/**
 * Created by federicolaggiard on 28/01/17.
 */

'use strict';

import m from 'mithril';

import { urls, env } from '../config';
import request from '../libs/request';

function Search(data){

  data = data.doc;

  this._id                = m.prop(data._id               || null);
  this._rev               = m.prop(data._rev              || null);
  this.codCliente         = m.prop(data.codCliente        || '');
  this.ragioneSociale     = m.prop(data.ragioneSociale    || '');
  this.codAgente          = m.prop(data.codAgente         || '');
  this.indirizzo          = m.prop(data.indirizzo         || '');
  this.citta              = m.prop(data.citta             || '');
  this.provincia          = m.prop(data.provincia         || '');
  this.cap                = m.prop(data.cap               || '');
  this.telefono           = m.prop(data.telefono          || '');
  this.cellulare          = m.prop(data.cellulare         || '');
  this.fax                = m.prop(data.fax               || '');
  this.email              = m.prop(data.email             || '');
  this.web                = m.prop(data.web               || '');
  this.responsabile       = m.prop(data.responsabile      || '');
  this.attivita           = m.prop(data.attivita          || '');
  this.ultimaVisita       = m.prop(data.ultimaVisita      || '');
  this.relazioni          = m.prop(data.relazioni         || []);
  this.note               = m.prop(data.note              || '');
  this.dimensioniAzienda  = m.prop(data.dimensioniAzienda || '');
  this.isFornitore        = m.prop(data.isFornitore       || false);
}

Search.fields = [
  { key: "attivita",          label: "Attivit&agrave;" },
  { key: "codAgente",         label: "Agente" },
  { key: "codCliente",        label: "Codice Cliente" },
  { key: "citta",             label: "Citt&agrave;" },
  { key: "cap",               label: "Cap" },
  { key: "cellulare",         label: "Cellulare" },
  { key: "dimensioniAzienda", label: "Dimensioni" },
  { key: "email",             label: "E-mail" },
  { key: "fax",               label: "Fax" },
  { key: "indirizzo",         label: "Indirizzo" },
  { key: "provincia",         label: "Provincia" },
  { key: "ragioneSociale",    label: "Ragione Sociale" },
  { key: "web",               label: "Sito Web" },
  { key: "telefono",          label: "Telefono" }
];

Search.defaultSearchField = Search.fields[0];

Search.groupBy = function(data, field){

  var ret = [];
  var temp = data.map(function(doc){
    if(doc[field]()){
      return({ key: doc[field]().toLowerCase().trim(), value: 1 });
    }else{
      return({ key: 'zzz - mancante', value: 1 });
    }
  }).reduce(function(rv, x) {

    if(rv[x.key]) {
      rv[x.key] = rv[x.key] + 1
    }else{
      rv[x.key] = 1;
    }
    return rv;

  }, {});

  for( var key in temp ){
    if( temp.hasOwnProperty(key) )
      ret.push( { key: key, count: temp[key] })
  }

  return ret.sort(function(a,b){
    if (a.key < b.key) {
      return -1;
    }
    if (a.key > b.key) {
      return 1;
    }
    // keys must be equal
    return 0;
  });

};

Search.fetch = function(callback){

  request({
    method: 'GET',
    url: urls[env].search,
    unwrapSuccess: function(response) {
      return response.rows;
    },
    type: Search,
    background: true
  }, (err, customers) => {
    if(err) {
      app.showToast('Si è verificato un errore.');
      return callback(err, null);
    }

    app.state.fullCustomers(customers);
    app.state.searchField(app.state.searchField() || Search.defaultSearchField);
    let temp = Search.groupBy(customers, app.state.searchField().key);

    app.state.search(temp);
    callback(null,temp);
  })


};

Search.filterByText = function(value){
  var regex = new RegExp(app.state.searchText(), 'gi');
  return value.key.search(regex) != -1;
};

export default Search;