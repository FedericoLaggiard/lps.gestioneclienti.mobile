/**
 * Created by federicolaggiard on 27/09/15.
 */

'use strict';

import m from 'mithril';
import moment from 'moment';
//import style from '../../styles/reports.less';
import redrawMat from '../libs/redrawMaterial';
import {InputMask, InputMaskDefaultMask} from '../libs/inputMask';
import Reports from '../models/reportsModel';
import Calendar from './calendar';

moment.locale("it-IT");

//let editedReport = m.prop(null);

export default {

  controller(params) {

    let index = params.index;
    let editId = app.state.editReportId;
    let data = m.prop(params.data);

    function editItem(itemId){
      app.state.editReportId(itemId);
      editId(app.state.editReportId());
    }

    function save(){
      event.stopPropagation();


      if(this.data()._id() === -1){

        let that = this;
        Reports.add(JSON.parse(JSON.stringify(this.data())), (err,success) => {

          if(err) return app.showToast('Si è verificato un errore.');

          var items = params._ref.reports();
          var item = items[0];
          item._rev(success.rev);
          item._id(success.id);
          items[0] = item;
          params._ref.reports(items);
          app.showToast('Elemento aggiunto con successo.');
          params._ref.updateCustomerLastVisit();

          return true;
        });

      }else{
        Reports.update(this.data(), (err, success) => {
          if(err) return app.showToast('Si è verificato un errore.');

          params._ref.updateCustomerLastVisit();
          app.showToast('Elemento modificato con successo.');

          return true;
        });
      }
      app.state.editReportId(null);
    }

    function remove(){

      if(window.confirm('Eliminare questo elemento?')) {
        Reports.remove(this.data(), (err, success) => {

          if(err) return app.showToast('Si è verificato un errore.');

          if (success) {
            app.showToast('Elemento eliminato con successo.');
            app.state.editReportId(null);
            params._ref.refresh();
          }
        })
      }

    }

    function switchImage(item){

      switch (item.tipoIncontro()){
        case "V":
          item.tipoIncontro("T");
          break;
        case "T":
          item.tipoIncontro("V");
          break;
      }

      data(item);
    }

    function setData(val){
      data().data(moment(val, "DD/MM/YYYY h:mm"));
    }

    function showCalendar(e, ctrl){

      app.showRippleContent(true);
      app.Ripple.start(e);

      var that = this;
      setTimeout(() =>{
        window.requestAnimationFrame(()=>{

          let el = "";

          if(document.querySelector("#calendar-wrapper")){
            el = document.querySelector("#calendar-wrapper");
          } else {
            el = document.createElement("div");
            el.id="calendar-wrapper";
            document.body.appendChild(el);
          }
          let component = m.component(Calendar, this.data().data(),
            {
              inputFormat: "YYYY-MM-DDTHH:mm:SS",
              callback: hideCalendar.bind(that)
            });
          let c = new component.controller();
          m.mount( el, { controller: () => c, view: component.view } );

          m.redraw();
        });
      }, 150);


    }

    function hideCalendar(value){
      document.body.removeChild(document.querySelector("#calendar-wrapper"));
      app.showRippleContent(false);
      app.Ripple.resume();

      if(value) this.data().data(value.format('YYYY-MM-DDTHH:mm:SS'));
    }

    return{
      editId,
      index,
      data,
      setData,
      editItem,
      switchImage,
      remove,
      save,
      showCalendar
    }
  },

  view(ctrl){

    return m('div', {
        className: 'cd-timeline-block' + ( ctrl.editId() === ctrl.index() ? ' edit' : '' ),
        id: ctrl.index(),
        key: ctrl.index()
      },
      ctrl.editId() === ctrl.index() ?
        viewEdit(ctrl, ctrl.data(), ctrl.index())
        :
        viewStandard(ctrl, ctrl.data(), ctrl.index())
    )

  }

}

function viewEdit(ctrl, item, index){
  return [
    m('div', { className: 'cd-timeline-img'}, [
      m('img', {
        src: item.tipoIncontro() === 'V' ? './img/person.svg' : './img/call.svg',
        onclick: ctrl.switchImage.bind(ctrl, item)
      })
    ]),

    m('div', {
      className: 'cd-timeline-content',
      onclick: ctrl.editItem.bind(ctrl,index)
    }, [
      m('h2', [
        moment(item.data()).fromNow()
      ]),
      m('input', {
          className: 'textfield dateExt',
          value: item.codAgente(),
          oninput: m.withAttr('value', item.codAgente)
        }
      ),
      m('div', { className: 'reportedTo'},
        m('span', { className: 'lbl' }, 'Parlato con:'),
        m('input', {
            className: 'textfield',
            value: item.reportedTo(),
            oninput: m.withAttr('value', item.reportedTo)
          }
        )
      ),
      m('textarea',{
          className: 'txtNote',
          value: item.note(),
          oninput: m.withAttr('value', item.note)
        }),
      m('div', {
        className: 'row'
      },[
        m('input', {
          type: 'text',
          className: 'textfield dateMask',
          value: moment(item.data()).format('DD/MM/YYYY' ),
          onclick: ctrl.showCalendar.bind(ctrl)
        }, moment(item.data()).format('DD/MM/YYYY' )),
        m('button', {
          className: 'mdl-button mdl-js-button mdl-button--raised mdl-button--colored salvaReport',
          config: redrawMat,
          onclick: ctrl.save.bind(ctrl)
        }, 'Salva'),
        m('button', {
          className: 'mdl-button mdl-js-button mdl-button--raised mdl-button--accent delete',
          style: {
            display: item._id() === -1 ? 'none' : 'block'
          },
          onclick: ctrl.remove.bind(ctrl)
        }, 'Elimina')
      ])
    ])
  ]
}

function viewStandard(ctrl, item, index){
  return [
    m('div', { className: 'cd-timeline-img'}, [
      m('img', { src: item.tipoIncontro() === 'V' ? './img/person.svg' : './img/call.svg'})
    ]),

    m('div', {
      className: 'cd-timeline-content',
      onclick: ctrl.editItem.bind(ctrl,index)
    }, [
      m('h2', [
        moment(item.data()).fromNow(),
        m('span', {className: 'dateExt'}, item.codAgente())
      ]),
      m('div', { className: 'reportedTo'},
        //m('span', { className: 'lbl' }, 'Parlato con:'),
        m('span', item.reportedTo())
      ),
      m('p', item.note()),
      m('span', {className: 'cd-date'}, moment(item.data()).format('D MMMM YYYY' ))
    ])
  ]
}