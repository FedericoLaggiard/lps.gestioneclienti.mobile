/**
 * Created by federicolaggiard on 19/08/15.
 */

'use strict';

import m from 'mithril';
import style from '../../styles/header.less';

export default {

  controller(title){

    return{

      title,

      refreshMaterial: function()
      {
        componentHandler.upgradeElement(document.getElementsByClassName('mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header')[0]);
        componentHandler.upgradeElement(document.getElementsByClassName('mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right')[0]);
      }
    }

  },

  view(ctrl){

    return m('header', {
      className: 'mdl-layout__header',
      config: ctrl.refreshMaterial
    }, [
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
    ]);

  }

}