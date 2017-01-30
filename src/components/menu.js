/**
 * Created by federicolaggiard on 29/01/17.
 */
'use strict';

import m from 'mithril';

export default {
  controller(){

  },

  view(){
    return m('div',{
      className: 'menu-container'
    }, [
      m('ul', {}, [
        m('li',{
          className: 'menu-item'
        }, 'clienti'),
        m('li', {
          className: 'menu-item'
        }, 'attività'),
        m('li',{
          className: 'menu-item'
        }, 'località'),
        m('li',{
          className: 'menu-item'
        }, 'statistiche'),
        m('li',{
          className: 'menu-item'
        }, 'mappa')
      ]),
      m('div', {
        className: 'menu-button'
      },[
        m('div', {
          className: 'cd-timeline-block add'
        }, [
          m('button', {
            className: 'mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-shadow--16dp button',
            onclick: function(){
              app.state.menuOpen(!app.state.menuOpen());
            }
          }, [
            app.state.menuOpen() ?
              m('i', {className: 'material-icons' }, 'clear')
              :
              m('i', {className: 'material-icons' }, 'menu')
          ])
        ])
      ])
    ])
  }
}