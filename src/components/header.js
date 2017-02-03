/**
 * Created by federicolaggiard on 19/08/15.
 */

'use strict';

import m from 'mithril';
//import style from '../../styles/header.less';
import redrawMat from '../libs/redrawMaterial';

import Search from '../models/searchModel';

export default {

  controller(title, options){

    let isSearching = m.prop(false);
    let route = m.route();

    return{

      isSearching,

      onunload: function() {
        app.state.searchText('');
        app.state.menuOpen(false);
      },

      btnAdd: function(){

        if(isSearching()) {
          app.state.searchText('');
          isSearching(false);
        }else{
          m.route('/customers/new');
        }

      },

      titleClicked: function(){
        app.state.showDropDown(!app.state.showDropDown());
      },

      dropDownItemClick: function(searched){
        app.state.searchField(Search.fields.find(function(item) { return item.key === searched.key;  }))
      },

      btnBack: function(){

        switch (this.title){
          default:
            window.history.back()
        }

      },
      route,
      title,
      options
    }

  },

  view(ctrl){


    switch(ctrl.route){
      case '/customers':
        return m('header', {
            className: 'mdl-layout__header',
            config: redrawMat
          },
          subViewCustomers(ctrl)
        );
        break;
      case '/customers/' + m.route.param('id') + '/reports':
        return subViewReports(ctrl);
        break;
      case '/search':
        return subViewSearch(ctrl);
        break;
      case `/customersFiltered/${ m.route.param('field') }/${ m.route.param('value') }`:
        return subViewCustomersFiltered(ctrl);
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
        'CLIENTI'
      ])
    ]),
    m('button', {
      className: 'mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab ' +
      'mdl-js-ripple-effect mdl-button--colored mdl-shadow--16dp add' +
      (app.state.menuOpen() ? ' off' : ''),
      onclick: ctrl.btnAdd.bind(ctrl)
    }, [
      m('i', {className: 'material-icons' }, 'add')
    ]),
    buttonSearch(ctrl),
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

function subViewSearch(ctrl){
  return m('header', { className: 'mdl-layout__header', id: 'activities-header' }, [
    //Loader
    m('div', { className: 'loader', style: { display: app.showLoader() ? 'block' : 'none'  } }),
    //BACK
    m('button', {
        className: 'mdl-button mdl-js-button mdl-button--icon',
        id: 'btnBack',
        config: redrawMat,
        onclick: ctrl.btnBack.bind(ctrl)
      },
      m('i', {className: 'material-icons' }, 'arrow_back')
    ),
    m('div', {
      className: 'mdl-layout__header-row',
      onclick: ctrl.titleClicked.bind(ctrl)
    }, [
      m('span', {className: 'mdl-layout-title headerTitle' },[
        m('i', '(' + app.state.search().length + ')'),
        app.state.searchField() ? m.trust(app.state.searchField().label) : ''
      ]),
      m('div', {
        className: 'toggle-filters'
      },[
        !app.state.showDropDown() ?
          m('i', {className: 'material-icons' }, 'keyboard_arrow_down')
        :
          m('i', {className: 'material-icons' }, 'keyboard_arrow_up')
      ])
    ]),
    buttonSearch(ctrl),
    m('div', {
        className: 'txtSearchContainer'+ (ctrl.isSearching() ? ' on' : '')
      }, m('input', {
        className: 'txtSearch'+ (ctrl.isSearching() ? ' on' : ''),
        type: 'text',
        id: 'txtSearch',
        oninput: m.withAttr('value', app.state.searchText),
        value: app.state.searchText()
      })
    ),
    m('div', {
      className: 'search-drop-down' + (app.state.showDropDown() ? ' show' : '')
    }, [
      m('h2',{
        className: 'filter-by-lbl'
      }, 'Filtra per:'),
      m('div',{ className: 'scroller' }, [
        m('ul',{},
          Search.fields.map(function(item){
            return m('li', {
              className: 'menu-item' + (app.state.searchField().key === item.key ? ' current' : ''),
              id: item.key,
              key: item.key,
              onclick: ctrl.dropDownItemClick.bind(ctrl, item)
            },[
              m('span',{}, m.trust(item.label))
            ])
          })
        )
      ])
    ])
  ]);
}

function subViewCustomersFiltered(ctrl){

  let showTitle = m.prop(!ctrl.isSearching());

  return m('header', { className: 'mdl-layout__header', id: 'activity-header' }, [
    //Loader
    m('div', { className: 'loader', style: { display: app.showLoader() ? 'block' : 'none'  } }),
    //BACK
    m('button', {
        className: 'mdl-button mdl-js-button mdl-button--icon',
        id: 'btnBack',
        config: redrawMat,
        onclick: ctrl.btnBack.bind(ctrl)
      },
      m('i', {className: 'material-icons' }, 'arrow_back')
    ),
    m('div', { className: 'mdl-layout__header-row' }, [
      m('span', {
        className: 'mdl-layout-title headerTitle',
        style: {
          display: showTitle() ? 'block' : 'none'
        }
      },[
        m('i', '(' + app.state.customersFiltered().length + ')'),
        'CLIENTI per ' + m.route.param('value').replace('+',' ')
      ])
    ]),
    //m('button', {
    //  className: 'mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored add' + (ctrl.isSearching() ? ' undo' : ''),
    //  onclick: ctrl.btnAdd.bind(ctrl)
    //}, [
    //  m('i', {className: 'material-icons' }, 'add')
    //]),
    buttonSearch(ctrl),
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
  ]);
}

function buttonSearch(ctrl){
  return m('button', {
    className: 'mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored search'
    + (ctrl.isSearching() ? ' on' : '')
    + (app.state.menuOpen() || app.state.showDropDown() ? ' off' : ''),
    onclick: function(){
      ctrl.isSearching(!ctrl.isSearching());

      if(!ctrl.isSearching()) document.activeElement.blur(); //remove focus from input on close

      document.getElementById('txtSearch').focus();
    }
  }, [
    ctrl.isSearching() ?
      m('i', {className: 'material-icons' }, 'clear')
      :
      m('i', {className: 'material-icons' }, 'search')
  ])
}