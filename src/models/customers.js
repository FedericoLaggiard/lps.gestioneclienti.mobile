/**
 * Created by federicolaggiard on 03/06/15.
 */

'use strict';

var Filter = require('../utils/filter');
var _ = require('underscore');

module.exports = function(){

    var customers = m.prop([]);
    var customersStrings = [];
    var totalRows = m.prop(0);
    var filterOptions = {
        case: false,
        mark: true,
        prefix: "<b>",
        suffix: "</b>",
        word: true
    };

    var getCustomers = function(url){
        return m.request({method: 'GET', url: url}).then(formatResponse)
    };

    var formatResponse = function(data){

        totalRows(data['total_rows']);
        customers(data['rows']);

        customers().map(function (item){

            customersStrings.push(item.key);
            item.visible = true;

        });

        return customers();

    };

    var filterCustomers = function(filter){

        var results = Filter(filter, customersStrings, filterOptions);

        _.each(customers(), function(item,index){

            item.key = item.key.replace(filterOptions.prefix,'').replace(filterOptions.suffix,'');
            item.visible = true;

            if(_.find(results.items, function(num) { return num === index }) !== undefined){
                item.visible = true;
                item.key = results.marks[results.items.indexOf(index)];
            }else{
                item.visible = false;
                item.key = item.key.replace(filterOptions.prefix,'').replace(filterOptions.suffix,'');

            }

        });

    };

    return {
        customers: customers,
        totalRows: totalRows,
        getCustomers: getCustomers,
        filterCustomers: filterCustomers
    }
}();