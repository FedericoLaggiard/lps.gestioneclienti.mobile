/**
 * Created by federicolaggiard on 14/08/15.
 */

'use strict';

import m from 'mithril';

import moment from 'moment';

import style from '../styles/lps/main.less';

import Toast from './components/toast';
import storage from './libs/store';

import _Ripple from './libs/ripple';

let app = {

  state: {

    login: m.prop(),
    user: m.prop(),
    customers: storage('customers'),
    customer: storage('customer'),
    reportsForCustomer: storage('reportsForCustomer'),
    reports: storage('reports'),
    search: storage('search'),
    customersByActivities: storage('customersByActivities'),

    searchText: m.prop(''),
    searchField: m.prop(''),
    fullCustomers: m.prop(null),

    customerEdit: m.prop(false),
    editReportId: m.prop(null),

    focusedField: m.prop(''),

    menuOpen: m.prop(false),
    showDropDown: m.prop(false),

    toast: {
      buffer: m.prop([]),
      message: m.prop(''),
      visible: m.prop('')
    }
  },

  showLoader: m.prop(false),
  showRippleContent: m.prop(false),
  Ripple : new _Ripple({ onPause: () => {

  } }),


  showToast: function(message){
    this.state.toast.message(message);
    this.state.toast.visible(true);
    m.redraw();
  },

  m,
  moment
};

window.app = app;
export default app;