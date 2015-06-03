/**
 * Created by federicolaggiard on 29/05/15.
 */

models = require('./models');
components = require('./components');

module.exports = {

    controller: function(){

        var customersModel = models.customers;
        customersModel.getCustomers('./spec/mockData/customers.json');

        function getCustomers(){

            //return models.customers.getCustomers('./spec/mockData/customers.json');
            return customersModel.customers();

        }

        function setCustomers(_data){
            customers(_data);
            return customers();
        }

        return {
            getCustomers: getCustomers,
            setCustomers: setCustomers
        };

    },

    view: function(ctrl){
        return [

            m('div',{
                id: 'toolbar'
            }, m.component(components.toolbar, {setItems: ctrl.setCustomers})),

            m('div',{
                id: 'mainView',
                class: 'withTopBar'
            }, m.component(components.customersList, {items: ctrl.getCustomers(), getItems: ctrl.getCustomers}))

        ]
    }

};