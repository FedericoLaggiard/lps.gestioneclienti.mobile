/**
 * Created by federicolaggiard on 21/08/15.
 */

'use strict';

import m from 'mithril';

export default {

  controller(){


  },

  view(ctrl){

    return m('div', { className: 'mdl-layout__drawer' }, [
      m('span', { className: 'mdl-layout-title'}, 'Menu'),
      m('nav',{ className: 'mdl-navigation'}, [
        m('a', { className: 'mdl-navigation__link' }, 'Nuovo cliente')
      ])
    ]);

  }

}