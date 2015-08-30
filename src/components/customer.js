/**
 * Created by federicolaggiard on 14/08/15.
 */

'use strict';

import m from 'mithril';
import style from '../../styles/customer.less';

import Customer from '../models/customerModel';


export default {

  controller(){

    let isNew = m.route.param('id') === 'new';

    let cardFlipped = m.prop(app.state.customerEdit());
    let customer = new Customer(app.state.customer());

    let showEdit = m.prop(true);
    let showSave = m.prop(false);
    let showDelete = m.prop(false);

    if( !isNew && (!app.state.customer() || app.state.customer()._id !== m.route.param('id')) ){
      Customer.fetch( (err,cust) => {

        if(err) return console.log(err);

        customer = cust;

      })
    }

    if( isNew ){
      cardFlipped(true);
      if(app.state.customer() && app.state.customer()._id)
        app.state.customer(null);
    }

    function btnUpdate(){

      if(isNew){

        Customer.insert(customer, (err, success) => {

          if(err) return console.log(err);

          app.state.customers(null);
          app.state.customer(null);

          m.route('/customers');

        });

      }else{

        Customer.update(customer,(err, success) => {

          if(err) return console.log(err);

          customer = new Customer(app.state.customer());

          console.log(success);
        });

      }

    }

    function btnBack(){
      if(cardFlipped() && !isNew) {
        flipCard();
      }else{
        m.route('customers');
      }
    }

    function btnDelete(){

      Customer.remove(customer, (err, success) => {

        if(err) return console.log(err);

        app.state.customers(null);
        app.state.customer(null);

        m.route('/customers');

      })

    }

    function flipCard(){
      cardFlipped(app.state.customerEdit(!app.state.customerEdit()));
    }

    function getMenuStatus(){
      if(cardFlipped() && !isNew) {
        showEdit(false);
        showSave(true);
        showDelete(true);
      }else if(cardFlipped() && isNew){
        showEdit(false);
        showSave(true);
        showDelete(false);
      }else{

      }
    }

    return {
      customer,
      cardFlipped,
      btnBack,
      flipCard,
      showEdit,
      showSave,
      showDelete,
      getMenuStatus,
      btnDelete,
      btnUpdate
    }

  },

  view(ctrl){

    ctrl.getMenuStatus();

    return m('div', { className: 'mdl-layout mdl-js-layout' }, [
      m('main', { className: 'mdl-layout__container' },
        m('div', { className: 'bg' }),

        m('div', { className: 'nav'}, [
          //BACK
          m('button', {
              className: 'mdl-button mdl-js-button mdl-button--icon',
              id: 'btnBack',
              onclick: ctrl.btnBack
            },
            m('i', {className: 'material-icons' }, 'arrow_back')
          ),
          //DELETE
          m('button', {
              className: 'mdl-button mdl-js-button mdl-button--icon',
              style: { display: ctrl.showDelete() ? 'block' : 'none' },
              id: 'delete',
              onclick: ctrl.btnDelete
            },
            m('i', {
              className: 'material-icons'
            }, 'delete')
          ),
          //EDIT
          m('button', {
              className: 'mdl-button mdl-js-button mdl-button--icon',
              style: { display: ctrl.showEdit() ? 'block' : 'none' },
              id: 'edit',
              onclick: ctrl.flipCard
            },
            m('i', {
              className: 'material-icons'
            }, 'border_color')
          ),
          //SAVE
          m('button', {
              className: 'mdl-button mdl-js-button mdl-button--icon',
              style: { display: ctrl.showSave() ? 'block' : 'none' },
              id: 'save',
              onclick: ctrl.btnUpdate
            },
            m('i', {
              className: 'material-icons'
            }, 'check_circle')
          )
        ]),

        m('section', { className: 'container' },
          m('div', {
            className: 'page-content card' + (ctrl.cardFlipped() ? ' flipped' : ''),
            id: 'customerContainer'},[
            //FRONT
            m('div', { className: 'front'}, [

              m('section', { className: 'head'}, [
                m('h1', { className: 'name' }, ctrl.customer.ragioneSociale()),
                m('div', { className: 'leftInfo'}, [
                  m('span', { className: 'lblInfo'}, 'Cliente di:'),
                  m('span', { className: 'Info'}, ctrl.customer.codAgente() ? ctrl.customer.codAgente() : '')
                ]),
                m('div', { className: 'circular' }),
                m('div', { className: 'rightInfo'}, [
                  m('span', { className: 'lblInfo'}, 'Visitato il:'),
                  m('span', { className: 'Info'}, ctrl.customer.ultimaVisita() ? ctrl.customer.ultimaVisita() : '')
                ])
              ]),
              m('section', { className: 'contact' }, [
                m('a', { href: 'tel:' + ctrl.customer.telefono() },
                  m('h2', { className: 'tel' }, ctrl.customer.telefono() ? ctrl.customer.telefono() : '')
                ),
                m('a', { href: 'mailto:'+ ctrl.customer.email()},
                  m('h2', { className: 'mail' }, ctrl.customer.email() ? ctrl.customer.email() : '')
                )
              ]),
              m('a', {
                  href: 'https://www.google.it/maps/place/'+ ctrl.customer.indirizzo() +',+'+ ctrl.customer.citta() +',+'+ ctrl.customer.provincia(),
                  className: 'location',
                  target: '_blank'
                }, [
                  m('span', ctrl.customer.indirizzo()),
                  m('span', ctrl.customer.citta()),
                  m('span', ctrl.customer.provincia()),
                  m('i', { className: 'material-icons'}, 'location_on')
                ]
              ),
              m('section', { className: 'other' },
                m('ul', { id: 'lista_detail'},
                  [
                    m('li', { className: 'icona_detail' }, 'Attività'),
                    m('li', { className: 'descr_detail' }, ctrl.customer.attivita() ? ctrl.customer.attivita() : ''),
                    m('li', { className: 'icona_detail' }, 'Responsabile'),
                    m('li', { className: 'descr_detail' }, ctrl.customer.responsabile() ? ctrl.customer.responsabile() : '')
                  ])
              )

            ]),
            //BACK
            m('div', { className: 'back' },[
              m('div', { id: 'formContainer' },
                m('form', { id: 'formEdit' }, [
                  //RAG SOC
                  m('label', {
                    className: 'txtLabel'+ ( app.state.focusedField() === 'txtRagSoc' ? ' focus' : '' )
                  }, 'Ragione Sociale'),
                  m('input', {
                    className: 'textfield',
                    type: 'text',
                    id: 'txtRagSoc',
                    value: ctrl.customer.ragioneSociale(),
                    oninput: m.withAttr('value', function(value) {
                      ctrl.customer.ragioneSociale(value);
                      app.state.customer(ctrl.customer);
                    }),
                    onfocus: function() { app.state.focusedField('txtRagSoc'); },
                    onblur: function() { app.state.focusedField(''); }
                  }),
                  //TELEFONO
                  m('label', {
                    className: 'txtLabel' + ( app.state.focusedField() === 'txtTelefono' ? ' focus' : '' )
                  }, 'Telefono'),
                  m('input', {
                    className: 'textfield',
                    type: 'text',
                    id: 'txtTelefono',
                    value: ctrl.customer.telefono(),
                    oninput: m.withAttr('value', function(value) {
                      ctrl.customer.telefono(value);
                      app.state.customer(ctrl.customer);
                    }),
                    onfocus: function() { app.state.focusedField('txtTelefono'); },
                    onblur: function() { app.state.focusedField(''); }
                  }),
                  //EMAIL
                  m('label', {
                    className: 'txtLabel'+ ( app.state.focusedField() === 'txtEmail' ? ' focus' : '' )
                  }, 'E-mail'),
                  m('input', {
                    className: 'textfield',
                    type: 'text',
                    id: 'txtEmail',
                    value: ctrl.customer.email(),
                    oninput: m.withAttr('value', function(value) {
                      ctrl.customer.email(value);
                      app.state.customer(ctrl.customer);
                    }),
                    onfocus: function() { app.state.focusedField('txtEmail'); },
                    onblur: function() { app.state.focusedField(''); }
                  }),
                  //FAX
                  m('label', {
                    className: 'txtLabel'+ ( app.state.focusedField() === 'txtFax' ? ' focus' : '' )
                  }, 'Fax'),
                  m('input', {
                    className: 'textfield',
                    type: 'text',
                    id: 'txtFax',
                    value: ctrl.customer.fax(),
                    oninput: m.withAttr('value', function(value) {
                      ctrl.customer.fax(value);
                      app.state.customer(ctrl.customer);
                    }),
                    onfocus: function() { app.state.focusedField('txtFax'); },
                    onblur: function() { app.state.focusedField(''); }
                  }),
                  //INDIRIZZO
                  m('label', {
                    className: 'txtLabel'+ ( app.state.focusedField() === 'txtIndirizzo' ? ' focus' : '' )
                  }, 'Indirizzo'),
                  m('input', {
                    className: 'textfield',
                    type: 'text',
                    id: 'txtIndirizzo',
                    value: ctrl.customer.indirizzo(),
                    oninput: m.withAttr('value', function(value) {
                      ctrl.customer.indirizzo(value);
                      app.state.customer(ctrl.customer);
                    }),
                    onfocus: function() { app.state.focusedField('txtIndirizzo'); },
                    onblur: function() { app.state.focusedField(''); }
                  }),
                  //CITTA
                  m('label', {
                    className: 'txtLabel'+ ( app.state.focusedField() === 'txtCitta' ? ' focus' : '' )
                  }, 'Città'),
                  m('input', {
                    className: 'textfield',
                    type: 'text',
                    id: 'txtCitta',
                    value: ctrl.customer.citta(),
                    oninput: m.withAttr('value', function(value) {
                      ctrl.customer.citta(value);
                      app.state.customer(ctrl.customer);
                    }),
                    onfocus: function() { app.state.focusedField('txtCitta'); },
                    onblur: function() { app.state.focusedField(''); }
                  }),
                  //PROVINCIA
                  m('label', {
                    className: 'txtLabel'+ ( app.state.focusedField() === 'txtProvincia' ? ' focus' : '' )
                  }, 'Provincia'),
                  m('input', {
                    className: 'textfield',
                    type: 'text',
                    id: 'txtProvincia',
                    value: ctrl.customer.provincia(),
                    oninput: m.withAttr('value', function(value) {
                      ctrl.customer.provincia(value);
                      app.state.customer(ctrl.customer);
                    }),
                    onfocus: function() { app.state.focusedField('txtProvincia'); },
                    onblur: function() { app.state.focusedField(''); }
                  }),
                  //RESPONSABILE
                  m('label', {
                    className: 'txtLabel'+ ( app.state.focusedField() === 'txtResponsabile' ? ' focus' : '' )
                  }, 'Responsabile'),
                  m('input', {
                    className: 'textfield',
                    type: 'text',
                    id: 'txtResponsabile',
                    value: ctrl.customer.responsabile(),
                    oninput: m.withAttr('value', function(value) {
                      ctrl.customer.responsabile(value);
                      app.state.customer(ctrl.customer);
                    }),
                    onfocus: function() { app.state.focusedField('txtResponsabile'); },
                    onblur: function() { app.state.focusedField(''); }
                  }),
                  //ATTIVITA
                  m('label', {
                    className: 'txtLabel'+ ( app.state.focusedField() === 'txtAttivita' ? ' focus' : '' )
                  }, 'Attività'),
                  m('input', {
                    className: 'textfield',
                    type: 'text',
                    id: 'txtAttivita',
                    value: ctrl.customer.attivita(),
                    oninput: m.withAttr('value', function(value) {
                      ctrl.customer.attivita(value);
                      app.state.customer(ctrl.customer);
                    }),
                    onfocus: function() { app.state.focusedField('txtAttivita'); },
                    onblur: function() { app.state.focusedField(''); }
                  }),
                  //ULTIMA VISITA
                  m('label', {
                    className: 'txtLabel'+ ( app.state.focusedField() === 'txtUltima' ? ' focus' : '' )
                  }, 'Ultima visita'),
                  m('input', {
                    className: 'textfield',
                    type: 'text',
                    id: 'txtUltima',
                    value: ctrl.customer.ultimaVisita(),
                    oninput: m.withAttr('value', function(value) {
                      ctrl.customer.ultimaVisita(value);
                      app.state.customer(ctrl.customer);
                    }),
                    onfocus: function() { app.state.focusedField('txtUltima'); },
                    onblur: function() { app.state.focusedField(''); }
                  }),
                  //Agente
                  m('label', {
                    className: 'txtLabel'+ ( app.state.focusedField() === 'txtAgente' ? ' focus' : '' )
                  }, 'Agente'),
                  m('input', {
                    className: 'textfield',
                    type: 'text',
                    id: 'txtAgente',
                    value: ctrl.customer.codAgente(),
                    oninput: m.withAttr('value', function(value) {
                      ctrl.customer.codAgente(value);
                      app.state.customer(ctrl.customer);
                    }),
                    onfocus: function() { app.state.focusedField('txtAgente'); },
                    onblur: function() { app.state.focusedField(''); }
                  })
                ])
              )
            ])
          ])
        )
      )
    ]);
  }

}

