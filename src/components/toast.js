/**
 * Created by federicolaggiard on 17/07/15.
 */

'use strict';

import style from '../../styles/toast.less';
import m from 'mithril';

export default  {

  controller() {

    let timeout = m.prop(3000);
    let message = app.state.toast.message;
    let display = app.state.toast.visible;

    return {
      message,
      display,
      timeout
    }

  },

  view(ctrl){

    if(app.state.toast.buffer().length > 0) {
      ctrl.message(app.state.toast.buffer()[0]);
      ctrl.display(true);
      app.state.toast.buffer().splice(0, 1);
    }

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

};
