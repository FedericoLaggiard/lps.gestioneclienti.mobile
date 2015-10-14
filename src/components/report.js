/**
 * Created by federicolaggiard on 27/09/15.
 */

'use strict';

import m from 'mithril';
import moment from 'moment';
import style from '../../styles/reports.less';
import redrawMat from '../libs/redrawMaterial';
import {InputMask, InputMaskDefaultMask} from '../libs/inputMask';

moment.locale("it-IT");

let editedReport = m.prop(null);

export default {

  controller(params) {

    let index = m.prop(params.index);
    let editId = app.state.editReportId;
    let data = m.prop(params.data);

    function editItem(itemId){
      app.state.editReportId(itemId);
      editId(app.state.editReportId());
    }

    function setCodAgente(val){
      editedReport().codAgente = val;
    }

    function setNote(val){
      editedReport().note = val;
    }

    function setData(val){
      editedReport().data = moment(val, "DD/MM/YYYY h:mm");
    }

    function save(){
      let temp = app.state.customer();
      temp.relazioni[editId()] = editedReport();
      app.state.customer(temp);

      app.state.editReportId(null);
    }

    function switchImage(item){

      switch (item.tipoIncontro){
        case "V":
          item.tipoIncontro = "T";
          break;
        case "T":
          item.tipoIncontro = "V";
          break;
      }

      editedReport(item);
    }

    return{
      editId,
      index,
      data,
      editItem,
      switchImage,
      setCodAgente,
      setNote,
      setData,
      save
    }
  },

  view(ctrl){

    if(ctrl.editId() !== null && editedReport() === null){
      editedReport(ctrl.data());
    }
    if(ctrl.editId() === null){
      editedReport(null);
    }

    return m('div', {
        className: 'cd-timeline-block' + ( ctrl.editId() === ctrl.index() ? ' edit' : '' ),
        id: ctrl.index()
      },
      ctrl.editId() === ctrl.index() ?
        viewEdit(ctrl, editedReport(), ctrl.index())
        :
        viewStandard(ctrl, ctrl.data(), ctrl.index())
    )

  }

}

function viewEdit(ctrl, item, index){
  return [
    m('div', { className: 'cd-timeline-img'}, [
      m('img', {
        src: item.tipoIncontro === 'V' ? './img/person.svg' : './img/call.svg',
        onclick: ctrl.switchImage.bind(ctrl, item)
      })
    ]),

    m('div', {
      className: 'cd-timeline-content',
      onclick: ctrl.editItem.bind(ctrl,index)
    }, [
      m('h2', [
        moment(item.data).fromNow(),
        m('input', {
            className: 'textfield dateExt',
            value: item.codAgente,
            oninput: m.withAttr('value', ctrl.setCodAgente)
          }
        )
      ]),
      m('textarea',{
          className: 'txtNote',
          value: item.note,
          oninput: m.withAttr('value', ctrl.setNote)
        }),
      m('input', {
          type: 'text',
          className: 'textfield dateMask',
          value: moment(item.data).format('DD/MM/YYYY h:mm' ),
          onblur: m.withAttr('value', ctrl.setData),
          config: function(element, isInit){
            if(!isInit){
              new InputMask().Initialize(document.querySelectorAll(".dateMask"), {
                mask: InputMaskDefaultMask.DateTimeShort,
                placeHolder: "Data: 01/01/2000 13:59"
              });
            }
          }
        }, moment(item.data).format('DD/MM/YYYY h:mm' )),
      m('button', {
        className: 'mdl-button mdl-js-button mdl-button--raised mdl-button--colored salvaReport',
        config: redrawMat,
        onclick: ctrl.save
      }, 'Salva')
    ])
  ]
}

function viewStandard(ctrl, item, index){
  return [
    m('div', { className: 'cd-timeline-img'}, [
      m('img', { src: item.tipoIncontro === 'V' ? './img/person.svg' : './img/call.svg'})
    ]),

    m('div', {
      className: 'cd-timeline-content',
      onclick: ctrl.editItem.bind(ctrl,index)
    }, [
      m('h2', [
        moment(item.data).fromNow(),
        m('span', {className: 'dateExt'}, item.codAgente)
      ]),
      m('p', item.note),
      m('span', {className: 'cd-date'}, moment(item.data).format('D MMMM YYYY, h:mm' ))
    ])
  ]
}