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

m.route.mode = 'hash';
m.route(document.body, '/customers', {
  '/login':                 login,
  '/customers':             protect(customers),
  '/customers/:id':         protect(customer)
});