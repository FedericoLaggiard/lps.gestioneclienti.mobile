/** Created by Juan Manuel Ventura */

'use strict';

import m from 'mithril';

/**
 * Private methods. protect the selected route behind authentication
 * @param component
 * @returns {*} login route if the user is not authenticated, selected route otherwise
 */
export default function (component) {
  if (!component.controller || !component.view) throw Error('The component must implement both controller and view');

  return {
    controller(){
      // the actual check to see if there's a valid user
      if (!app.state.login()) return m.route('/login');

      // in mithril the controller behaves as factory AND as a constructor depending on how it is called,
      // as we are using it as a factory project wide we must invoke it
      return component.controller();
    },
    view() {
      // same here, the view is called internally passing the controller output (factory fashion)
      // so we must invoke both the view and the controller
      return component.view(component.controller())
    }
  }
}