/**
 * Created by federicolaggiard on 14/08/15.
 */

'use strict';

import m from 'mithril';
import style from '../../styles/customer.less';

import Customer from '../models/customerModel';


export default {

  controller(){

    let cardFlipped = m.prop(app.state.customerEdit());
    let customer = m.prop(app.state.customer());

    if(!app.state.customer() || app.state.customer()._id !== m.route.param('id')){
      Customer.fetch( (err,cust) => {

        if(err) return console.log(err);

        customer(cust);

      })
    }

    function flipCard(){
      cardFlipped(app.state.customerEdit(!app.state.customerEdit()));
      m.startComputation();
      componentHandler.upgradeDom();
      m.endComputation();
    }

    function refreshForm(element, isInitialized){

      if (!isInitialized) {
        //m.startComputation();
        //componentHandler.upgradeDom();
        //m.endComputation();
        //let nodeList = document.getElementsByClassName('mdl-textfield__input');
        //
        //for (var i = 0; i < nodeList.length; ++i) {
        //  var item = nodeList[i];
        //  componentHandler.upgradeElement(item);
        //}
      }


    }

    return {
      customer,
      cardFlipped,
      refreshForm,
      flipCard
    }

  },

  view(ctrl){

    return m('div', { className: 'mdl-layout mdl-js-layout' }, [
      m('main', { className: 'mdl-layout__container' },
        m('div', { className: 'bg' }),
        m('div', { className: 'nav'}, [
          m('button', {
              className: 'mdl-button mdl-js-button mdl-button--icon',
              onclick: function() { m.route('customers') }
            },
            m('i', {className: 'material-icons' }, 'arrow_back')
          ),
          m('button', {
              className: 'mdl-button mdl-js-button mdl-button--icon',
              id: 'edit',
              onclick: ctrl.flipCard
            },
            m('i', {
              className: 'material-icons'
            }, 'border_color')
          )
        ]),

        m('section', { className: 'container' },
          m('div', {
            className: 'page-content card' + (ctrl.cardFlipped() ? ' flipped' : ''),
            id: 'customerContainer'},[
            //FRONT
            m('figure', { className: 'front'}, [

              m('section', { className: 'head'}, [
                m('h1', { className: 'name' }, ctrl.customer().ragioneSociale),
                m('div', { className: 'leftInfo'}, [
                  m('span', { className: 'lblInfo'}, 'Cliente di:'),
                  m('span', { className: 'Info'}, ctrl.customer().codAgente)
                ]),
                m('div', { className: 'circular' }),
                m('div', { className: 'rightInfo'}, [
                  m('span', { className: 'lblInfo'}, 'Visitato il:'),
                  m('span', { className: 'Info'}, ctrl.customer().ultimaVisita)
                ])
              ]),
              m('section', { className: 'contact' }, [
                m('a', { href: 'tel:' + ctrl.customer().telefono },
                  m('h2', { className: 'tel' }, ctrl.customer().telefono)
                ),
                m('a', { href: 'mailto:'+ ctrl.customer().email},
                  m('h2', { className: 'mail' }, ctrl.customer().email)
                )
              ]),
              m('a', {
                  href: 'https://www.google.it/maps/place/'+ ctrl.customer().indirizzo +',+'+ ctrl.customer().citta +',+'+ ctrl.customer().provincia,
                  className: 'location',
                  target: '_blank'
                }, [
                  m('span', ctrl.customer().indirizzo),
                  m('span', ctrl.customer().citta),
                  m('span', ctrl.customer().provincia),
                  m('i', { className: 'material-icons'}, 'location_on')
                ]
              ),
              m('section', { className: 'other' },
                m('ul', { id: 'lista_detail'},
                  [
                    m('li', { className: 'icona_detail' }, 'Attività'),
                    m('li', { className: 'descr_detail' }, ctrl.customer().attivita),
                    m('li', { className: 'icona_detail' }, 'Responsabile'),
                    m('li', { className: 'descr_detail' }, ctrl.customer().responsabile)
                  ])
              )

            ]),
            //BACK
            m('figure', { className: 'back', config: ctrl.refreshForm },
              m('div', { id: 'formContainer' },
                m('form', { id: 'formEdit' }, [
                  //RAG SOC
                  m('div', {
                    className: 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label',
                  }, [
                    m('input', {
                      className: 'mdl-textfield__input',
                      type: 'text',
                      id: 'txtRagSoc',
                      value: ctrl.customer().ragioneSociale
                    }),
                    m('label', {
                      className: 'mdl-textfield__label',
                      'for': 'txtRagSoc'
                    }, 'Ragione Sociale')
                  ]),
                  //TELEFONO
                  m('div', {
                    className: 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label'
                  }, [
                    m('input', {
                      className: 'mdl-textfield__input',
                      type: 'text',
                      id: 'txtTelefono',
                      value: ctrl.customer().telefono
                    }),
                    m('label', {
                      className: 'mdl-textfield__label',
                      'for': 'txtTelefono'
                    }, 'Telefono'),
                    m('span', { className: 'mdl-textfield__error' }, 'Sono ammessi solo numeri.')
                  ])
                ])
              )
            )
          ])
        )
      )
    ]);
  }

}

