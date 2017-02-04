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
          className: 'menu-item',
          onclick: function(){ m.route('/customers') }
        }, [
          m('i', {className: 'material-icons arrow'}, 'assignment_ind'),
          m('span',{},'clienti')
        ]),
        m('li',{
          className: 'menu-item',
          onclick: function(){ m.route('/vendors') }
        }, [
          m('i', {className: 'material-icons arrow'}, 'local_shipping'),
          m('span',{},'fornitori')
        ]),
        m('li', {
          className: 'menu-item',
          onclick: function(){ m.route('/search') }
        }, [
          m('i', {className: 'material-icons arrow'}, 'zoom_in'),
          m('span',{},'ricerche avanzate')
        ]),
        m('li',{
          className: 'menu-item disabled'
        }, [
          m('i', {className: 'material-icons arrow'}, 'person_pin_circle'),
          m('span',{},'mappa')
        ]),
        m('li',{
          className: 'menu-item disabled'
        }, [
          m('i', {className: 'material-icons arrow'}, 'pie_chart'),
          m('span',{},'statistiche')
        ])
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