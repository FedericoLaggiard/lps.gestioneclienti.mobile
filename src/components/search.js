/**
 * Created by federicolaggiard on 28/01/17.
 */

'use strict';

import m from 'mithril';

import redrawMat from '../libs/redrawMaterial';

import Header from './header';
import Search from '../models/searchModel';
import Spinner from './spinner.js';
import Menu from './menu';

export default {

  controller(){

    let search = m.prop(app.state.search());
    let searchField = m.prop(null);

    Search.fetch( (err, cust) => {
      if(err) return console.log(err);

      search(app.state.search());
      searchField(app.state.searchField());
      m.redraw();
    });

    function checkSearch(){
      // Search text
      if(app.state.searchText().length > 0){
        search(app.state.search().filter(Search.filterByText));
      }else{
        search(app.state.search())
      }
      //Search field
      if(searchField() && searchField().key !== app.state.searchField().key){
        console.log('searchField changed');

        m.startComputation();

        setTimeout(function(){
          app.state.search(Search.groupBy(app.state.fullCustomers(),app.state.searchField().key));
          searchField(app.state.searchField());
          app.state.showDropDown(false);

          m.endComputation();
        },100);

      }
    }

    return {
      search,
      checkSearch
    };

  },

  view(ctrl){

    ctrl.checkSearch();

    return m('div', {
      className: 'mdl-layout mdl-js-layout mdl-layout--fixed-header',
      config: redrawMat.removeContainer
    },[
      m.component(Header, 'ACTIVITIES'),
      m.component(Menu),
      m('main', {
          className: 'mdl-layout__content' + (app.state.menuOpen() ? ' hide' : '')
        },
        m('div', { className: 'page-content'},
          m('ul',{ className: 'activityList' },
              ctrl.search() ?
                ctrl.search().map((customer, index) => {
                  return m('li',{
                    key: index,
                    id: index,
                    className: 'activityItem',
                    onclick: function() { m.route('/customersByActivities/' + customer.key) }
                  },[
                    m('div', {
                      className: 'activity-count'
                    }, customer.count),
                    m('span',customer.key)
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