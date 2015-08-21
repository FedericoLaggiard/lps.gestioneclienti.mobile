/**
 * Created by federicolaggiard on 14/08/15.
 */

'use strict';

import m from 'mithril';
import mh from '../libs/materialHelpers';

import Login from '../models/loginModel';

export default {

  controller(){

    return {

      login(){
        Login.fetch((err,login) => {
          if(err){
            return console.log(err);
          }

          m.route('/customers');
        })
      }

    }

  },

  view(ctrl){

    return m('section', {
      className: 'loginSection'
    },[
      m('div', {className: mh.cells[12] + ' mdl-cell--middle'}, [
        m('div', {className: mh.textField}, [
          m('input', {
            autocorrect: 'off',
            autocapitalize: 'off',
            autocomplete:'off',
            spellcheck: false,
            className: 'mdl-textfield__input',
            id:        'userName',
            type:      'text',
            value:     app.state.credentials.name(),
            onchange:  m.withAttr('value', app.state.credentials.name)
          }),
          m('label', {
            className: 'mdl-textfield__label',
            'for':     'userName'
          }, 'Username')
        ]),
        m('div', {className: mh.textField}, [
          m('input', {
            className: 'mdl-textfield__input',
            id:        'password',
            type:      'password',
            autocorrect: 'off',
            autocapitalize: 'off',
            autocomplete: 'off',
            spellcheck: false,
            value:     app.state.credentials.password(),
            onchange:  m.withAttr('value', app.state.credentials.password)
          }),
          m('label', {
            className: 'mdl-textfield__label',
            'for':     'password'
          }, 'Password')
        ]),
        m('button', {
          className: mh.buttonRipple,
          style:     {width: '100%'},
          onclick:   ctrl.login
        }, 'Login')
      ])

    ])

  }

}