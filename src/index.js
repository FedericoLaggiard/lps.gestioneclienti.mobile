/**
 * Created by federicolaggiard on 29/05/15.
 */

'use strict';

var m = require('mithril');
var Root = require('./root');

if(!!window.cordova) {
    window.app = m.mount(document.getElementById('app'), m.component(Root));
}else{
    document.onreadystatechange = function () {
        if (document.readyState === 'complete') {
            window.app = m.mount(document.getElementById('app'), m.component(Root));
        }
    }
}