/**
 * Created by federicolaggiard on 14/08/15.
 */

'use strict';

import m from 'mithril';

//import style from '../../styles/customersList.less';
import redrawMat from '../libs/redrawMaterial';

import Header from './header';
import Customers from '../models/customersModel';
import CustomersFiltered from '../models/customersFilteredModel';
import Spinner from './spinner.js';
import Menu from './menu.js';

export default {

  controller(){

    let isCustomersFiltered = m.route().indexOf('customersFiltered') > -1;
    let field;
    let filterValue;

    let customers = isCustomersFiltered ? m.prop(app.state.customersFiltered()) : m.prop(app.state.customers());

    if(isCustomersFiltered) {
      field = m.route.param('field').replace('+', ' ');
      filterValue = m.route.param('value').replace('+', ' ');
      CustomersFiltered.fetch( field,filterValue, (err, cust) => {
        if(err) return console.log(err);

        customers(app.state.customersFiltered());
        m.redraw();
      });
    }else{
      Customers.fetch( (err,cust) => {
        if(err) return console.log(err);

        customers(app.state.customers());
        m.redraw();
      });
    }

    function checkSearch(){
      if(app.state.searchText().length > 0){
        if(isCustomersFiltered){
          customers(app.state.customersFiltered().filter(CustomersFiltered.filterByText));
        }else {
          customers(app.state.customers().filter(Customers.filterByText));
        }
      }else{
        if(isCustomersFiltered) {
          customers(app.state.customersFiltered());
        }else{
          customers(app.state.customers());
        }
      }
    }

    return {
      customers,
      checkSearch,
      isCustomersFiltered,
      field,
      filterValue
    };

  },

  view(ctrl){

    ctrl.checkSearch();

    if(ctrl.isCustomersFiltered){
      return viewCustomersFiltered(ctrl);
    }else{
      return viewCustomers(ctrl);
    }
  }

}

function viewCustomers(ctrl){
  return m('div', {
    className: 'mdl-layout mdl-js-layout mdl-layout--fixed-header',
    config: redrawMat.removeContainer
  },[
    m.component(Header, 'CLIENTI'),
    m.component(Menu),
    m('main', {
        className: 'mdl-layout__content' + (app.state.menuOpen() ? ' hide' : '')
      },
      m('div', { className: 'page-content'},
        m('ul',{ className: 'customersList' },
          ctrl.customers() ?
            ctrl.customers().map((customer) => {
              return m('li',{
                key: customer.id,
                id: customer.id,
                className: 'customerItem',
                onclick: function() { m.route('/customers/' + customer.id) }
              },[
                m('span',customer.ragSociale)
                //m('i', {className: 'material-icons arrow'}, 'arrow_forward')
              ])
            })
          :
            m.component(Spinner)
        )
      )
    )
  ]);
}

function viewCustomersFiltered(ctrl){
  return m('div', {
    className: 'mdl-layout mdl-js-layout mdl-layout--fixed-header',
    config: redrawMat.removeContainer
  },[
    m.component(Header, 'ACTIVITY'),
    m.component(Menu),
    m('main', {
        className: 'mdl-layout__content' + (app.state.menuOpen() ? ' hide' : '')
      },
      m('div', { className: 'page-content'},
        m('ul',{ className: 'customersList' },
          ctrl.customers() ?
            ctrl.customers().map((customer) => {
              return m('li',{
                key: customer.id,
                id: customer.id,
                className: 'customerItem',
                onclick: function() { m.route('/customers/' + customer.id) }
              },[
                m('span',customer.ragSociale)
                //m('i', {className: 'material-icons arrow'}, 'arrow_forward')
              ])
            })
          :
            m.component(Spinner)
        )
      )
    )
  ]);
}