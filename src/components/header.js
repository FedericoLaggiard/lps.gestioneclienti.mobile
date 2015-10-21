/**
 * Created by federicolaggiard on 19/08/15.
 */

'use strict';

import m from 'mithril';
import style from '../../styles/header.less';
import redrawMat from '../libs/redrawMaterial';

export default {

  controller(title){

    return{

      btnBack: function(){

        switch (this.title){
          default:
            window.history.back()
        }

      },

      title
    }

  },

  view(ctrl){

    return m('header', {
      className: 'mdl-layout__header',
      config: redrawMat
      },
        ctrl.title === 'CLIENTI' ? subViewCustomers(ctrl) : '',
        ctrl.title === 'RELAZIONI' ? subViewReports(ctrl) : ''
    );

  }
}

function subViewCustomers(ctrl){
  return [
    m('div', { className: 'mdl-layout__header-row' }, [
      m('div', { className: 'mdl-layout-spacer'}),
      m('div', { className: 'mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right'}, [
        m('label', { className: 'mdl-button mdl-js-button mdl-button--icon', 'for': 'txtSearch'},
          m('i', { className: 'material-icons' }, 'search')
        ),
        m('div', { className: 'mdl-textfield__expandable-holder'}, [
          m('input', {
            className: 'mdl-textfield__input',
            type: 'text',
            id: 'txtSearch',
            oninput: m.withAttr('value', app.state.searchText),
            value: app.state.searchText()
          })
        ])
      ])
    ]),
    m('div', { className: 'mdl-layout__header-row' }, [
      m('span', {className: 'mdl-layout-title headerTitle' }, ctrl.title)
    ])
  ]
}

function subViewReports(ctrl){
  return [
    m('div', { className: 'mdl-layout__header-row noPadding' }, [
      //BACK
      m('button', {
          className: 'mdl-button mdl-js-button mdl-button--icon',
          id: 'btnBack',
          config: redrawMat,
          onclick: ctrl.btnBack.bind(ctrl)
        },
        m('i', {className: 'material-icons' }, 'arrow_back')
      ),
      m('span', {className: 'navTitle' }, ctrl.title)
    ]),
    m('div', { className: 'mdl-layout__header-row'}, [
      m('span', {className: 'mdl-layout-title headerTitle'}, app.state.customer().ragioneSociale)
    ])
  ]
}