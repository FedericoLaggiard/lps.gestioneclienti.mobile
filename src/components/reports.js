/**
 * Created by federicolaggiard on 23/09/15.
 */

'use strict';

import m from 'mithril';
import moment from 'moment';
import style from '../../styles/reports.less';
import redrawMat from '../libs/redrawMaterial';
import inputMask from '../libs/inputMask';

import Reports from '../models/reportsModel';
import Customer from '../models/customerModel';

import Header from './header';
import Report from './report';
import Spinner from './spinner.js';

export default {

  controller(){

    moment.locale("it-IT");

    let editId = app.state.editReportId;
    let reports = m.prop();

    app.state.reportsForCustomer({id: m.route.param('id')});
    Reports.fetch((err,r) => {
      if(err) return app.showToast('Si è verificato un errore.');

      reports(r);
      updateCustomerLastVisit();
      m.redraw();
    });

    function updateCustomerLastVisit(){
      if(reports().length > 0){
        var customer = app.state.customer();
        if(customer.ultimaVisita !== reports()[0].data()){
          customer.ultimaVisita = reports()[0].data();
          Customer.update(m.prop(new Customer(customer)), (err, resp) => {

            if(err) {
              app.showToast("Si è verificato un errore durante l'aggiornamento dell'ultima visita");
              return console.log(err);
            }

            return app.showToast("l'ultima visita è stata aggiornata.");

          })
        }
      }
    }

    function editItem(itemId){
      if (itemId === null && app.state.editReportId() === -1){
        var that = this;
        if(window.confirm('Annullare la creazione del nuovo elemento?')){
          that.editId(itemId);
          var t = that.reports();
          t.shift();
          //that.reports(t.map( (report) => {
          //  return new Reports({doc: report });
          //}));
          that.reports(t);
        }
      }else{
        app.state.editReportId(itemId);
        editId(app.state.editReportId());
      }
    }

    function newItem(){
      var t = app.state.reports().map( (report) => {
        return new Reports({doc: report });
      });

      var n = new Reports({
        doc: {
          _id: -1,
          data: moment().format('YYYY-MM-DDTHH:mm:ss'),
          idCliente: m.route.param('id'),
          tipoIncontro: 'T' ,
          codAgente: app.state.user().key()
        }
      });
      t.unshift(n);
      this.reports(t);
      app.state.editReportId(-1);
      this.editId(-1);
    }

    function refresh(){
      Reports.fetch((err,r) => {
        if(err) return app.showToast('Si è verificato un errore.');

        reports(r);
        //m.redraw();
      });
    }

    return {
      editId,
      editItem,
      newItem,
      reports,
      refresh,
      updateCustomerLastVisit
    }
  },

  view(ctrl){

    let that = ctrl;
    return [
      m('div', {
        className: 'mdl-layout mdl-js-layout mdl-layout--fixed-header',
        config: redrawMat.removeContainer
      },[

        m.component(Header, 'RELAZIONI'),

        ctrl.reports() ?
          m('main', { className: 'mdl-layout__content'}, [
          m('div',{
            className: ctrl.editId() === null ? '' : 'on',
            id:'blur',
            onclick:  ctrl.editItem.bind(ctrl,null)
          }),
          m('section', {id: 'cd-timeline'},

            m('div', { className: 'cd-timeline-block add'}, [
              m('div', {
                className: 'cd-timeline-img',
                onclick: ctrl.newItem.bind(ctrl)
              }, [
                m('img', { src: './img/add.svg'})
              ]),
              m('div', { className: 'cd-timeline-content'})
            ]),


            ctrl.reports().map(function(item){

              return m.component(Report, {index: item._id, data: item, _ref: that})

            })
          )
        ])
        :
          m.component(Spinner)
      ])
    ];

  }

}

