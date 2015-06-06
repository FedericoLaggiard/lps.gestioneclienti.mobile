/**
 * Created by federicolaggiard on 29/05/15.
 */

module.exports = {

    //controller: function(data){
    //
    //    //var customers = m.prop();
    //
    //    return {
    //        customers: data.items
    //    };
    //},

    view: function(ctrl, data){

        return m('div', {
            class: "containerScroll customersList"
        }, m('ul', data.items.map(function(item,index){
            if(item.visible) {
                return m('li', {
                    id: item.id,
                    key: item.id
                }, [
                    m('div', {
                        class: 'checkContainer'
                    }),
                    m('p', {}, m.trust(item.key))
                ])
            }
        })))

    }

};