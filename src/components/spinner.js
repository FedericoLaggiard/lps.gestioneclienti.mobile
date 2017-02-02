/**
 * Created by federicolaggiard on 02/11/15.
 */

"use strict";

import m from 'mithril';
import style from '../../styles/spinner.less';

let Spinner = {
  visible: m.prop(true)
};

Spinner.controller = function() {

};

Spinner.view = function(ctrl) {

  if (this.visible()) {
    return m('svg', {
        className: 'spinner',
        viewBox: "0 0 66 66",
        xmlns: "http://www.w3.org/2000/svg"
      }, m('circle', {
        className: 'circle',
        fill: 'none',
        "stroke-width": "6",
        "stroke-linecap": "round",
        cx: "33",
        cy: "33",
        r: "30"
      })
    )
  }

  return '';

};

export default Spinner;