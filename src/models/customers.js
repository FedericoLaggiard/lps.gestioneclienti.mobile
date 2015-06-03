/**
 * Created by federicolaggiard on 03/06/15.
 */

'use strict';

module.exports = function(){

    var customers = m.prop([]);
    var totalRows = m.prop(0);

    var getCustomers = function(url){
        return m.request({method: 'GET', url: url}).then(formatResponse)
    };

    var formatResponse = function(data){

        totalRows(data['total_rows']);
        return customers(data['rows']);

    };

    return {
        customers: customers,
        totalRows: totalRows,
        getCustomers: getCustomers
    }
}();