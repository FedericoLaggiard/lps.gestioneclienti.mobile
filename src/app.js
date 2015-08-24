/**
 * Created by federicolaggiard on 14/08/15.
 */

'use strict';

import m from 'mithril';

import style from '../styles/main.less';

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
    customerEdit: m.prop(false),
    searchText: m.prop('')

  }

};

window.app = app;
export default app;