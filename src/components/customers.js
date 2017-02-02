/**
 * Created by federicolaggiard on 14/08/15.
 */

'use strict';

import m from 'mithril';

//import style from '../../styles/customersList.less';
import redrawMat from '../libs/redrawMaterial';

import Header from './header';
import Customers from '../models/customersModel';
import CustomersByActivity from '../models/customersByActivityModel';
import Spinner from './spinner.js';
import Menu from './menu.js';

export default {

  controller(){

    let isCustomersByActivity = m.route().indexOf('customersByActivities') > -1;
    let activity;

    let customers = isCustomersByActivity ? m.prop(app.state.customersByActivities()) : m.prop(app.state.customers());

    if(isCustomersByActivity) {
      activity = m.route.param('activity');
      CustomersByActivity.fetch( activity, (err,cust) => {
        if(err) return console.log(err);

        customers(app.state.customersByActivities());
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
        if(isCustomersByActivity){
          customers(app.state.customersByActivities().filter(CustomersByActivity.filterByText));
        }else {
          customers(app.state.customers().filter(Customers.filterByText));
        }
      }else{
        if(isCustomersByActivity) {
          customers(app.state.customersByActivities());
        }else{
          customers(app.state.customers());
        }
      }
    }

    return {
      customers,
      checkSearch,
      isCustomersByActivity,
      activity
    };

  },

  view(ctrl){

    ctrl.checkSearch();

    if(ctrl.isCustomersByActivity){
      return viewCustomersByActivities(ctrl);
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

function viewCustomersByActivities(ctrl){
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