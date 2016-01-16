/**
 * Created by federicolaggiard on 14/08/15.
 */

'use strict';

import m from 'mithril';

import style from '../../styles/customersList.less';
import redrawMat from '../libs/redrawMaterial';

import Header from './header';
import Drawer from './drawer';
import Customers from '../models/customersModel';
import Spinner from './spinner.js';

export default {

  controller(){

    let customers = m.prop(app.state.customers());

    //if(!app.state.customers()){
      Customers.fetch( (err,cust) => {
        if(err) return console.log(err);

        customers(app.state.customers());
        m.redraw();
      });
    //}

    function checkSearch(){
      if(app.state.searchText().length > 0){
      //  if(customers()){
          customers(app.state.customers().filter(Customers.filterByText));
        //}else{
        //  app.state.searchText('')
        //}
      }else{
        customers(app.state.customers())
      }
    }

    return {
      customers,
      checkSearch
    };

  },

  view(ctrl){

    ctrl.checkSearch();

    return m('div', {
      className: 'mdl-layout mdl-js-layout mdl-layout--fixed-header',
      config: redrawMat.removeContainer
    },[
      m.component(Header, 'CLIENTI'),
      m('main', {
          className: 'mdl-layout__content'
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

}