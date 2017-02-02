/**
 * Created by federicolaggiard on 28/01/17.
 */

'use strict';

import m from 'mithril';

import redrawMat from '../libs/redrawMaterial';

import Header from './header';
import Activities from '../models/activitiesModel';
import Spinner from './spinner.js';
import Menu from './menu';

export default {

  controller(){

    let activities = m.prop(app.state.activities());

    //if(!app.state.customers()){
      Activities.fetch( (err,cust) => {
        if(err) return console.log(err);

        activities(app.state.activities());
        m.redraw();
      });
    //}

    function checkSearch(){
      if(app.state.searchText().length > 0){
      //  if(customers()){
          activities(app.state.activities().filter(Activities.filterByText));
        //}else{
        //  app.state.searchText('')
        //}
      }else{
        activities(app.state.activities())
      }
    }

    return {
      activities,
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
              ctrl.activities() ?
                ctrl.activities().map((activity, index) => {
                  return m('li',{
                    key: index,
                    id: index,
                    className: 'activityItem',
                    onclick: function() { m.route('/customersByActivities/' + activity.name) }
                  },[
                    m('div', {
                      className: 'activity-count'
                    }, activity.count),
                    m('span',activity.name)
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