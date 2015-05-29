/**
 * Created by federicolaggiard on 29/05/15.
 */

m = require('mithril');

module.exports = {

    controller: function(data){

    },

    view: function(ctrl){
        return [

            m('div',{
                id: 'toolbar'
            }, 'toolbar'),

            m('div',{
                id: 'mainView',
                class: 'withTopBar'
            }, 'mainView')

        ]
    }

};