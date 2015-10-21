/**
 * Created by federicolaggiard on 14/08/15.
 */

'use strict';

import m from 'mithril';

import moment from 'moment';

import style from '../styles/main.less';
import Toast from './components/toast';
import storage from './libs/store';

let app = {

  state: {

    credentials: {
      name: m.prop(''),
      password: m.prop('')
    },

    login: storage('login'),
    customers: storage('customers'),
    customer: storage('customer'),
    reportsForCustomer: storage('reportsForCustomer'),
    reports: storage('reports'),

    searchText: m.prop(''),

    customerEdit: m.prop(false),
    editReportId: m.prop(null),

    focusedField: m.prop(''),

    toast: {
      buffer: m.prop([]),
      message: m.prop(''),
      visible: m.prop('')
    }
  },

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