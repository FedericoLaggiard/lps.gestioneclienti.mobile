/**
 * Created by federicolaggiard on 17/07/15.
 */

'use strict';

import style from '../../styles/toast.less';
import m from 'mithril';

export default {

  controller(params) {

    let timeout = m.prop(1500);
    let message = params.message;
    let display = params.display;

    return {
      message,
      display,
      timeout
    }

  },

  view(ctrl){

    if(ctrl.display()){

      setTimeout(() => {
        ctrl.display(false);
        m.redraw();
      }, ctrl.timeout())

    }

    return m('div', {
          className: 'toast' + (ctrl.display() ? ' show' : '')
        },
      m('h4', ctrl.message())
    )

  }

}