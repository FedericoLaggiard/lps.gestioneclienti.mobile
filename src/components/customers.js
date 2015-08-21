/**
 * Created by federicolaggiard on 14/08/15.
 */

'use strict';

import m from 'mithril';

import style from '../../styles/customersList.less';

import Header from './header';
import Drawer from './drawer';
import Customers from '../models/customersModel';

export default {

  controller(){

    let customers = m.prop(app.state.customers());

    if(!app.state.customers()){
      Customers.fetch( (err,cust) => {
        if(err) return console.log(err);

        customers(cust);
      })
    }

    if(app.state.searchText().length > 0){
      customers(customers().filter(Customers.filterByText));
    }

    return {
      customers
    };

  },

  view(ctrl){
    return m('div', {
      className: 'mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header'
    },[
      m.component(Header, 'CLIENTI'),
      m.component(Drawer),
      m('main', { className: 'mdl-layout__content' },
        m('div', { className: 'page-content'},
          m('ul',{ className: 'customersList' },
              ctrl.customers().map((customer) => {
                return m('li',{
                  id: customer.id,
                  className: 'customerItem',
                  onclick: function() { m.route('/customers/' + customer.id) }
                },[
                  m('span',customer.ragSociale)
                ])
              })
          )
        )
      )
    ]);
  }

}