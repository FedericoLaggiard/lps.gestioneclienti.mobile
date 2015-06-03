/**
 * Created by federicolaggiard on 29/05/15.
 */

'use strict';

var m = require('mithril');
var Root = require('./root');

window.app = m.mount(document.getElementById('app'), m.component(Root));