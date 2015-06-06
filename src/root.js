/**
 * Created by federicolaggiard on 29/05/15.
 */

m = require('mithril');
models = require('./models');
components = require('./components');

module.exports = {

    controller: function(){

        var baseUrl = 'http://192.168.1.101:5984/';

        var customersModel = models.customers;
        //customersModel.getCustomers('./spec/mockData/customers.json');
        customersModel.getCustomers(baseUrl + 'lps_clienti/_design/lps_clienti/_view/listByRagSoc');

        function getCustomers(){

            //return models.customers.getCustomers('./spec/mockData/customers.json');
            return customersModel.customers();

        }

        function setCustomers(_data){
            customers(_data);
            return customers();
        }

        var filterText = m.prop("");
        function setFilter(filter){

            filterText(filter);
            customersModel.filterCustomers(filterText());

            console.log(filterText());
        }

        var routes = {
            customersList : "cutstomersList",
            customer: "customer"
        };
        function getRoutes(){
            return routes;
        }

        var curRoute = m.prop(routes["customersList"]);
        function getCurrentRoute(){
            return curRoute();
        }

        return {
            getCustomers: getCustomers,
            setCustomers: setCustomers,
            setFilter: setFilter,
            getRoutes: getRoutes,
            getCurrentRoute: getCurrentRoute
        };

    },

    view: function(ctrl){
        return [

            m('div',{
                id: 'toolbar'
            }, m.component(components.toolbar, {
                setItems: ctrl.setCustomers,
                setFilter: ctrl.setFilter,
                currentRoute: ctrl.getCurrentRoute,
                routes: ctrl.getRoutes()
            })),

            m('div',{
                id: 'mainView',
                class: 'withTopBar'
            }, m.component(components.customersList, {
                items: ctrl.getCustomers(),
                getItems: ctrl.getCustomers
            }))

        ]
    }

};