/**
 * Created by federicolaggiard on 14/08/15.
 *
 * for development purpose only.
 *
 */

'use strict';

export const env = 'prod_google';
export const company = 'lps';

const baseUrl = {

  prod_google: 'http://35.234.115.169:5984',
  prod: 'https://couchdb-0f2b48.smileupps.com'

};

export const urls = {

  prod: {
    login:              baseUrl[env] + '/_session',
    users:              baseUrl[env] + '/_users',
    customer:           baseUrl[env] + '/'+ [company] +'_clienti',
    customers:          baseUrl[env] + '/'+ [company] +'_clienti/_design/listByRagSoc/_view/listByRagSoc', //'_clienti/_design/listByCustomer/_view/listByCustomer',
    report:             baseUrl[env] + '/'+ [company] +'_reports',
    reports:            baseUrl[env] + '/'+ [company] +'_reports/_design/reportsByCustomer/_view/reportsByCustomer',
    search:             baseUrl[env] + '/'+ [company] +'_clienti/_all_docs?include_docs=true',
    customerByActivity: baseUrl[env] + '/'+ [company] +'_clienti/_design/customer_by_activity/_view/customer_by_activity?key=',
    vendors:            baseUrl[env] + '/'+ [company] +'_clienti/_design/listByFornitore/_view/listByFornitore'
  },

  prod_google: {
    login:              baseUrl[env] + '/_session',
    users:              baseUrl[env] + '/_users',
    customer:           baseUrl[env] + '/'+ [company] +'_clienti',
    customers:          baseUrl[env] + '/'+ [company] +'_clienti/_design/listByRagSoc/_view/listByRagSoc', //'_clienti/_design/listByCustomer/_view/listByCustomer',
    report:             baseUrl[env] + '/'+ [company] +'_reports',
    reports:            baseUrl[env] + '/'+ [company] +'_reports/_design/reportsByCustomer/_view/reportsByCustomer',
    search:             baseUrl[env] + '/'+ [company] +'_clienti/_all_docs?include_docs=true',
    customerByActivity: baseUrl[env] + '/'+ [company] +'_clienti/_design/customer_by_activity/_view/customer_by_activity?key=',
    vendors:            baseUrl[env] + '/'+ [company] +'_clienti/_design/listByFornitore/_view/listByFornitore'
  },

  dev: {
    login:              baseUrl[env] + '/_session',
    users:              baseUrl[env] + '/_users',
    customer:           baseUrl[env] + '/lps_clienti',
    customers:          baseUrl[env] + '/lps_clienti/_design/listByCustomer/_view/listByCustomer',
    report:             baseUrl[env] + '/lps_reports',
    reports:            baseUrl[env] + '/lps_reports/_design/reportsByCustomer/_view/reportsByCustomer',
    search:             baseUrl[env] + '/'+ [company] +'_clienti/_all_docs?include_docs=true',
    customerByActivity: baseUrl[env] + '/'+ [company] +'_clienti/_design/customer_by_activity/_view/customer_by_activity?key=',
    vendors:            baseUrl[env] + '/'+ [company] +'_clienti/_design/listByFornitore/_view/listByFornitore'
  }

};

export let basicAuthHeaders = function() {

  return function (xhr) {
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader("Access-Control-Allow-Headers", "origin");
  }

};