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
      m.redraw();
    });

    function editItem(itemId){
      if (itemId === null && app.state.editReportId() === -1){
        var that = this;
        if(window.confirm('Annullare la creazione del nuovo elemento?')){
          that.editId(itemId);
          var t = that.reports();
          t.shift();
          that.reports(t);
        }
      }else{
        app.state.editReportId(itemId);
        editId(app.state.editReportId());
      }
    }

    function newItem(){
      var t = app.state.reports();
      var n = new Reports({doc: {_id: -1, data: moment().format('YYYY-MM-DDTHH:mm:ss'), idCliente: m.route.param('id'), tipoIncontro: 'T' } });
      t.unshift(n);
      this.reports(t);
      this.editId(app.state.editReportId(-1));
    }

    function refresh(){
      this.reports(app.state.reports());
    }

    return {
      editId,
      editItem,
      newItem,
      reports,
      refresh
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


            ctrl.reports().map(function(item, index){

              return m.component(Report, {index: item._id, data: item, refresh: that.refresh()})

            })
          )
        ])
        :
          m.component(Spinner)
      ])
    ];

  }

}

