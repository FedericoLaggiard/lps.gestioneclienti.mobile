/**
 * Created by federicolaggiard on 19/08/15.
 */

'use strict';

import m from 'mithril';
import style from '../../styles/header.less';
import redrawMat from '../libs/redrawMaterial';

export default {

  controller(title, options){

    let isSearching = m.prop(false);

    return{

      isSearching,

      btnAdd: function(){

        if(isSearching()) {
          app.state.searchText('');
          isSearching(false);
        }else{
          m.route('/customers/new');
        }

      },

      btnBack: function(){

        switch (this.title){
          default:
            window.history.back()
        }

      },

      title,
      options
    }

  },

  view(ctrl){


    switch(ctrl.title){
      case 'CLIENTI':
        return m('header', {
            className: 'mdl-layout__header',
            config: redrawMat
          },
          subViewCustomers(ctrl)
        );
        break;
      case 'RELAZIONI':
        return subViewReports(ctrl);
        break;
    }



  }
}

function subViewCustomers(ctrl){
  return [
    //Loader
    m('div', { className: 'loader', style: { display: app.showLoader() ? 'block' : 'none'  } }),
    m('div', { className: 'mdl-layout__header-row' }, [
      m('span', {className: 'mdl-layout-title headerTitle' },[
        m('i', '(' + app.state.customers().length + ')'),
        ctrl.title
      ])
    ]),
    m('button', {
      className: 'mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored add' + (ctrl.isSearching() ? ' undo' : ''),
      onclick: ctrl.btnAdd.bind(ctrl)
    }, [
      m('i', {className: 'material-icons' }, 'add')
    ]),
    m('button', {
      className: 'mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored search' + (ctrl.isSearching() ? ' on' : ''),
      onclick: function(){
        ctrl.isSearching(!ctrl.isSearching());
        document.getElementById('txtSearch').focus();
      }
    }, [
      m('i', {className: 'material-icons' }, 'search')
    ]),
    m('div', {
      className: 'txtSearchContainer'+ (ctrl.isSearching() ? ' on' : '')
    }, m('input', {
        className: 'txtSearch'+ (ctrl.isSearching() ? ' on' : ''),
        type: 'text',
        id: 'txtSearch',
        oninput: m.withAttr('value', app.state.searchText),
        value: app.state.searchText()
      })
    )
  ]
}

function subViewReports(ctrl){
  return m('header', { className: 'mdl-layout__header', id: 'reports-header' }, [
    //Loader
    m('div', { className: 'loader', style: { display: app.showLoader() ? 'block' : 'none'  } }),
    m('div', { className: 'mdl-layout__header-row noPadding'}, [
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
    m('div', { className: 'mdl-layout__header-row noPadding'}, [
      m('span', {className: 'mdl-layout-title headerTitle'},
        app.state.customer().ragioneSociale
      )
    ]),
    //Add
    m('div', {
      className: 'cd-timeline-block add' + ( app.state.editReportId() !== null ? ' disabled' : '' )
    }, [
      m('div', {
        className: 'cd-timeline-img',
        onclick: app.state.editReportId() === null ? ctrl.options.newItem.bind(ctrl.options.ctrl) : ''
      }, [
        m('img', { src: './img/add.svg'})
      ]),
      m('div', { className: 'cd-timeline-content'})
    ])
  ]);
}