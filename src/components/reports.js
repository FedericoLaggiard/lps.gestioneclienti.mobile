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

export default {

  controller(){

    moment.locale("it-IT");

    let editId = app.state.editReportId;
    let reports = m.prop(app.state.reports());

    if(!app.state.reports()){
      Reports.fetch((err,r) => {
        if(err) return console.log(err);

        reports(r);
      })
    }

    function initBlur(element, isInit){
      if(!isInit) {
        document.getElementById('blur').style.height = document.getElementsByClassName('mdl-layout')[0].scrollHeight + 'px';
      }
    }

    function editItem(itemId){
      app.state.editReportId(itemId);
      editId(app.state.editReportId());
    }


    return {
      editId,
      initBlur,
      editItem,
      reports
    }
  },

  view(ctrl){

    return [
      m('div', {
        className: 'mdl-layout mdl-js-layout mdl-layout--fixed-header',
        config: redrawMat.removeContainer
      },[
        m.component(Header, 'RELAZIONI'),
        m('div',{
          className: ctrl.editId() === null ? '' : 'on',
          id:'blur',
          onclick:  ctrl.editItem.bind(ctrl,null),
          config: ctrl.initBlur
        }),
        m('section', {id: 'cd-timeline'},

          m('div', { className: 'cd-timeline-block add'}, [
            m('div', { className: 'cd-timeline-img'}, [
              m('img', { src: './img/add.svg'})
            ]),
            m('div', { className: 'cd-timeline-content'})
          ]),


          ctrl.reports().map(function(item, index){

            return m.component(Report, {index: item._id, data: item})

          })
        )
      ])
    ];

  }

}

