/**
 * Created by federicolaggiard on 14/08/15.
 */

'use strict';

import m from 'mithril';
import mh from '../libs/materialHelpers';
//import style from '../../styles/login.less';
import redrawMat from '../libs/redrawMaterial';

import Login from '../models/loginModel';

export default {

  controller(){

    let errors = m.prop(null);
    let name = m.prop('');
    let password = m.prop('');
    let isRemember= m.prop(localStorage.getItem("remember") ? true : false);

    if(app.state.login() && app.state.login().status == 401) {
      errors({error: "401"});
      app.state.login().status = "";
    }

    if(isRemember()){
      name(localStorage.getItem("name"));
      password(localStorage.getItem("password"));
    }


    function login(){
      this.errors(null);
      Login.fetch({name: this.name() ,password: this.password()}, (err,login) => {
        if(err){
          this.errors(err);
          app.m.redraw();
          return console.log(err);
        }

        if(isRemember){
          localStorage.setItem("name", name());
          localStorage.setItem("password", password());
          localStorage.setItem("remember", true);
        }

        m.route('/customers');
      })
    }
    function getErrorMessage(err){

      if(!err.error) return "Si è verificato un errore. Verificare la connessione o Riprovare più tardi.";
      switch (err.error){
        case "unauthorized":
          return 'Nome utente o password errati.';
        case "401":
          return "La sessione è scaduta. Effettuare nuovamente il log-in.";
        default:
          return err.reason;
      }

    }
    function remember(){
      isRemember(!isRemember());
      console.log(isRemember())
    }

    return {
      errors,
      name,
      password,
      isRemember,

      login,
      getErrorMessage,
      remember
    }

  },

  view(ctrl){
    return m('section', {
        className: 'loginSection',
        config: redrawMat
      }, m('div', {className: 'background' }, [
          m('div', { className: 'loader', style: { display: app.showLoader() ? 'block' : 'none'  } }),
          m('div', {className: 'head'}, [
            m('h1', "Let's get to work!"),
            m('span', 'Please log-in...')
          ]),
          m('form', {id: 'loginForm'}, [
            m('div', {className: mh.textField}, [
              m('input', {
                autocorrect: 'off',
                autocapitalize: 'off',
                autocomplete:'off',
                spellcheck: 'false',
                className: 'mdl-textfield__input',
                id:        'userName',
                type:      'text',
                value:     ctrl.name() || '',
                onchange:  m.withAttr('value', ctrl.name)
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
                spellcheck: 'false',
                value:     ctrl.password() || '',
                onchange:  m.withAttr('value', ctrl.password)
              }),
              m('label', {
                className: 'mdl-textfield__label',
                'for':     'password'
              }, 'Password')
            ]),
            m('label', {
              "for": "swRemember",
              className: "mdl-switch mdl-js-switch"
            }, [
              m('input', {
                type: "checkbox",
                id: "swRemember",
                className: "mdl-switch__input",
                onchange: ctrl.remember.bind(ctrl),
                checked: ctrl.isRemember()
              }),
              m('span', { className: "mdl-switch__label" }, "Ricordami")
            ])
          ]),
         m('span', { className: 'errors' }, ctrl.errors() ? ctrl.getErrorMessage(ctrl.errors()) : ''),
          m('button', {
            className: mh.buttonRipple,
            id: 'btnLogin',
            'tab-index': '3',
            onclick:   ctrl.login.bind(ctrl)
          }, 'Login')

        ])
      )
  }

}