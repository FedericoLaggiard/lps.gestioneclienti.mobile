/**
 * Created by federicolaggiard on 14/08/15.
 */

'use strict';

import m from 'mithril';
import style from '../../styles/customer.less';
import redrawMat from '../libs/redrawMaterial';

import Customer from '../models/customerModel';
import gMap from './gMap';
import Spinner from './spinner.js';

export default {

  controller(){

    let isNew = m.route.param('id') === 'new';

    let cardFlipped = m.prop(app.state.customerEdit());
    let customer = m.prop();

    let showEdit = m.prop(true);
    let showSave = m.prop(false);
    let showDelete = m.prop(false);

    if( !isNew /*&& (!app.state.customer() || app.state.customer()._id !== m.route.param('id'))*/ ){

      app.state.customer(null);
      Customer.fetch( (err,cust) => {

        if(err){
          app.state.customer(null);
          m.route('/customers');
          return console.log(err);
        }

        customer(new Customer(app.state.customer()));
        //customer = app.state.customer();
        m.redraw();

      })
    }

    if( isNew ){
      cardFlipped(true);
      customer(new Customer(null));
      customer().codAgente(app.state.user().key());
      if(app.state.customer() && app.state.customer()._id)
        app.state.customer(null);
    }

    function btnUpdate(){

      if(isNew){

        Customer.insert(customer, (err, success) => {

          if(err) return console.log(err);

          app.state.customers(null);
          app.state.customer(null);

          app.state.toast.buffer().push('Il cliente è stato salvato con successo.');

          m.route('/customers');

        });

      }else{

        Customer.update(customer,(err, success) => {

          if(err) return console.log(err);

          customer = new Customer(app.state.customer());

          app.showToast('Il cliente è stato salvato con successo.');
          console.log(success);
        });

      }

    }

    function btnBack(){
      if(cardFlipped() && !isNew) {
        flipCard();
      }else{
        m.route('/customers');
      }
    }

    function btnDelete(){

      Customer.remove(customer, (err, success) => {

        if(err) return console.log(err);

        app.state.customers(null);
        app.state.customer(null);

        app.state.toast.buffer().push('Il cliente è stato rimosso.');
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
      }else if(!cardFlipped() && !isNew) {
        showEdit(true);
        showSave(false);
        showDelete(false);
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
      btnUpdate,
      isNew
    }

  },

  view(ctrl){

    ctrl.getMenuStatus();

    return  m('div', { config: redrawMat.removeContainer },
        m('div', { className: 'bg' }),

        m('div', { className: 'nav'}, [
          //BACK
          m('button', {
              className: 'mdl-button mdl-js-button mdl-button--icon',
              id: 'btnBack',
              config: redrawMat,
              onclick: ctrl.btnBack
            },
            m('i', {className: 'material-icons' }, 'arrow_back')
          ),
          //DELETE
          m('button', {
              className: 'mdl-button mdl-js-button mdl-button--icon',
              style: { display: ctrl.showDelete() ? 'block' : 'none' },
              id: 'delete',
              config: redrawMat,
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
              config: redrawMat,
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
              config: redrawMat,
              onclick: ctrl.btnUpdate
            },
            m('i', {
              className: 'material-icons'
            }, 'check_circle')
          )
        ]),

        ctrl.customer() ?
          m('section', { className: 'container' },
            m('div', {
              className: 'page-content card' + (ctrl.cardFlipped() ? ' flipped' : ''),
              id: 'customerContainer'},[
              //FRONT
              m('div', { className: 'front'}, customerView(ctrl)),
              //BACK
              m('div', { className: 'back' }, editView(ctrl))
            ])
          )
        :
          m.component(Spinner)
      );
  }

}

function customerView(ctrl){


  return [
    m('section', { className: 'head mdl-shadow--4dp' }, [
      m('div', { className: 'circular' }),
      m('h2', { className: 'name' }, ctrl.customer().ragioneSociale()),
      m('div', { className: 'table' }, [
        m('div', { className: 'left'}, [
          m('span', { className: 'label' }, 'ULTIMA VISITA:'),
          m('span', { className: 'value' }, ctrl.customer().ultimaVisita() ? ctrl.customer().ultimaVisita() : 'n/d')
        ]),
        m('div', { className: 'right'}, [
          m('span', { className: 'label' }, 'AGENTE:'),
          m('span', { className: 'value' }, ctrl.customer().codAgente() ? ctrl.customer().codAgente() : 'n/d')
        ])
      ]),
      m('span', { className: 'line'}),
      m('button', {
        className: 'mdl-button mdl-js-button mdl-js-ripple-effect action',
        config: redrawMat,
        onclick: function() { m.route('/customers/'+ m.route.param('id') +'/reports') }
      }, [
        'Relazioni',
        m('i', {className: 'material-icons arrow'}, 'arrow_forward')
      ])
    ]),
    m('section', { className: 'contacts mdl-shadow--4dp'}, [
      m('span', { className: 'label' }, 'CONTATTI:'),
      m('a', {
          className: 'tel',
          href: 'tel:' + ctrl.customer().telefono()
        }, m('button', {
          className: 'mdl-button mdl-js-button mdl-js-ripple-effect phone',
          config: redrawMat
        }, [
          ctrl.customer().telefono()
          //m('i', {className: 'material-icons arrow'}, 'phone')
        ])),
      m('span', { className: 'line' }),
      m('a', {
        className: 'mail',
        href: 'mailto:' + ctrl.customer().email()
      }, m('button', {
        className: 'mdl-button mdl-js-button mdl-js-ripple-effect mail',
        config: redrawMat
      }, [
        ctrl.customer().email()
        //m('i', {className: 'material-icons arrow'}, 'email')
      ]))
    ]),
    m('section', { className: 'other mdl-shadow--4dp'}, [
      m('span', { className: 'label' }, 'INDIRIZZO:'),
      m('span', { className: 'value capitalize' }, ctrl.customer().indirizzo().toLowerCase()),
      m('span', { className: 'value' }, ctrl.customer().citta() + ' - ' + ctrl.customer().provincia()),
      m('span', { className: 'label' }, "ATTIVITA':"),
      m('span', { className: 'value' }, ctrl.customer().attivita() ? ctrl.customer().attivita() : 'n/d'),
      m('span', { className: 'label' }, "RESPONSABILE:"),
      m('span', { className: 'value' }, ctrl.customer().responsabile() ? ctrl.customer().responsabile() : 'n/d')
    ]),
    //GMAP
    m('section', { className: 'map mdl-shadow--4dp'}, [
      ctrl.isNew ? '' : m.component(gMap, { address: ctrl.customer().indirizzo() +',+'+ ctrl.customer().citta() +',+'+ ctrl.customer().provincia() }),
      //m.component(gMap, { address: 'Via Melchiorre Voli 31, torino' }),
      m('div', {className: 'btnHover'},
        m('button', {
          className: 'mdl-button mdl-js-button mdl-js-ripple-effect action',
          config: redrawMat,
          onclick: function() { window.open('https://www.google.it/maps/place/'+ ctrl.customer().indirizzo() +',+'+ ctrl.customer().citta() +',+'+ ctrl.customer().provincia(), '_blank') }
          //onclick: function() { window.open('https://www.google.it/maps/place/Via Melchiorre Voli 31,+torino', '_blank') }
        }, [
          "Indicazioni",
          m('i', {className: 'material-icons arrow'}, 'arrow_forward')
        ])
      )
    ]),

  ];

}

function editView(ctrl){
  return [
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
          value: ctrl.customer().ragioneSociale(),
          oninput: m.withAttr('value', function(value) {
            ctrl.customer().ragioneSociale(value);
            app.state.customer(ctrl.customer());
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
          value: ctrl.customer().telefono(),
          oninput: m.withAttr('value', function(value) {
            ctrl.customer().telefono(value);
            app.state.customer(ctrl.customer());
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
          value: ctrl.customer().email(),
          oninput: m.withAttr('value', function(value) {
            ctrl.customer().email(value);
            app.state.customer(ctrl.customer());
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
          value: ctrl.customer().fax(),
          oninput: m.withAttr('value', function(value) {
            ctrl.customer().fax(value);
            app.state.customer(ctrl.customer());
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
          value: ctrl.customer().indirizzo(),
          oninput: m.withAttr('value', function(value) {
            ctrl.customer().indirizzo(value);
            app.state.customer(ctrl.customer());
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
          value: ctrl.customer().citta(),
          oninput: m.withAttr('value', function(value) {
            ctrl.customer().citta(value);
            app.state.customer(ctrl.customer());
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
          value: ctrl.customer().provincia(),
          oninput: m.withAttr('value', function(value) {
            ctrl.customer().provincia(value);
            app.state.customer(ctrl.customer());
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
          value: ctrl.customer().responsabile(),
          oninput: m.withAttr('value', function(value) {
            ctrl.customer().responsabile(value);
            app.state.customer(ctrl.customer());
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
          value: ctrl.customer().attivita(),
          oninput: m.withAttr('value', function(value) {
            ctrl.customer().attivita(value);
            app.state.customer(ctrl.customer());
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
          value: ctrl.customer().ultimaVisita(),
          oninput: m.withAttr('value', function(value) {
            ctrl.customer().ultimaVisita(value);
            app.state.customer(ctrl.customer());
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
          value: ctrl.customer().codAgente(),
          oninput: m.withAttr('value', function(value) {
            ctrl.customer().codAgente(value);
            app.state.customer(ctrl.customer());
          }),
          onfocus: function() { app.state.focusedField('txtAgente'); },
          onblur: function() { app.state.focusedField(''); }
        })
      ])
    )
  ]
}
