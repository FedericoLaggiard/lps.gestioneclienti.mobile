/**
 * Created by federicolaggiard on 27/09/15.
 */

'use strict';

import m from 'mithril';
import moment from 'moment';
import style from '../../styles/reports.less';
import redrawMat from '../libs/redrawMaterial';
import {InputMask, InputMaskDefaultMask} from '../libs/inputMask';
import Reports from '../models/reportsModel';

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

          return app.showToast('Elemento aggiunto con successo.');
        });

      }else{
        Reports.update(this.data(), (err, success) => {
          if(err) return app.showToast('Si è verificato un errore.');

          return app.showToast('Elemento modificato con successo.');
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

    return{
      editId,
      index,
      data,
      setData,
      editItem,
      switchImage,
      remove,
      save
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
      m('button', {
          className: 'mdl-button mdl-js-button mdl-button--icon mdl-button--colored delete',
          style: {
            display: item._id() === -1 ? 'none' : 'block'
          },
          onclick: ctrl.remove.bind(ctrl)
        },
        m('i', {
          className: 'material-icons'
        }, 'delete')
      ),
      m('h2', [
        moment(item.data()).fromNow()
      ]),
      m('input', {
          className: 'textfield dateExt',
          value: item.codAgente(),
          oninput: m.withAttr('value', item.codAgente)
        }
      ),
      m('textarea',{
          className: 'txtNote',
          value: item.note(),
          oninput: m.withAttr('value', item.note)
        }),
      m('input', {
          type: 'text',
          className: 'textfield dateMask',
          value: moment(item.data()).format('DD/MM/YYYY h:mm' ),
          onblur: m.withAttr('value', function(data) {item.data(moment(data, 'DD/MM/YYYY h:mm').toDate());}),
          config: function(element, isInit){
            if(!isInit){
              new InputMask().Initialize(document.querySelectorAll(".dateMask"), {
                mask: InputMaskDefaultMask.DateTimeShort,
                placeHolder: "Data: 01/01/2000 13:59"
              });
            }
          }
        }, moment(item.data()).format('DD/MM/YYYY h:mm' )),
      m('button', {
        className: 'mdl-button mdl-js-button mdl-button--raised mdl-button--colored salvaReport',
        config: redrawMat,
        onclick: ctrl.save.bind(ctrl)
      }, 'Salva')
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
      m('p', item.note()),
      m('span', {className: 'cd-date'}, moment(item.data()).format('D MMMM YYYY, h:mm' ))
    ])
  ]
}