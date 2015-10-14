/**
 * Created by federicolaggiard on 29/09/15.
 */

'use strict';

import m from 'mithril';
import { urls, env } from '../config';
import request from '../libs/request';

function Reports(data){

  this._id =          m.prop(data.doc._id           ||  '');
  this._rev =         m.prop(data.doc._rev          ||  '');
  this.idCliente =    m.prop(data.doc.idCliente     ||  '');
  this.codAgente =    m.prop(data.doc.codAgente     ||  '');
  this.codCliente =   m.prop(data.doc.codCliente    ||  '');
  this.data =         m.prop(data.doc.data          ||  '');
  this.tipoIncontro = m.prop(data.doc.tipoIncontro  ||  '');
  this.note =         m.prop(data.doc.note          ||  '');

}

Reports.fetch = function(callback){

  request({
    method: 'GET',
    url: urls[env].reports + '?include_docs=true&key="' + m.route.param('id') +'"',
    unwrapSuccess: function(response) {
      return response.rows;
    },
    type: Reports
  }, (err, reports) => {
    if(err) {
      app.showToast('Si è verificato un errore.');
      return callback(err, null);
    }

    let orderedRep = orderByDate(reports);

    app.state.reports(orderedRep);
    callback(null,orderedRep);
  })

};

export default Reports;

function orderByDate(reports){

  reports.sort(function(a, b) {
    a = new Date(a.data());
    b = new Date(b.data());
    return a>b ? -1 : a<b ? 1 : 0;
  });

  return reports;
}