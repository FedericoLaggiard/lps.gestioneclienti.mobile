/**
 *
 * Application entry point, implements app routing
 *
 * Created by federicolaggiard on 14/08/15.
 */

'use strict';

import m from 'mithril';
import materialStyle from '../node_modules/material-design-lite/material.min.css';

import app from './app';
import protect from './libs/protect';
import login from './components/login';
import customers from './components/customers';
import customer from './components/customer';
import toast from './components/toast';
import reports from './components/reports';
import search from './components/search';

m.route.mode = 'hash';
m.route(document.getElementById('app'), '/login', {
  '/login'                            : login,
  '/customers'                        : customers,
  '/customers/:id'                    : customer,
  '/customers/:id/reports'            : reports,
  '/search'                           : search,
  '/customersFiltered/:field/:value'  : customers,
  '/vendors'                          : customers
});
m.mount(document.getElementById('toast'), toast);