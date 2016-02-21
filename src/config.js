/**
 * Created by federicolaggiard on 14/08/15.
 */

'use strict';

export const env = 'dev';

const baseUrl = {

  prod: 'https://couchdb-0f2b48.smileupps.com',
  dev: 'http://192.168.1.103:5984'

};

export const urls = {

  prod: {
    login:        baseUrl[env] + '/_session',
    users:        baseUrl[env] + '/_users',
    customer:     baseUrl[env] + '/lps_clienti',
    customers:    baseUrl[env] + '/lps_clienti/_design/listByRagSoc/_view/listByRagSoc',
    report:       baseUrl[env] + '/lps_reports',
    reports:      baseUrl[env] + '/lps_reports/_design/reportsByCustomer/_view/reportsByCustomer'
  },

  dev: {
    login:        baseUrl[env] + '/_session',
    users:        baseUrl[env] + '/_users',
    customer:     baseUrl[env] + '/lps_clienti',
    customers:    baseUrl[env] + '/lps_clienti/_design/listByRagSoc/_view/listByRagSoc',
    report:       baseUrl[env] + '/lps_reports',
    reports:      baseUrl[env] + '/lps_reports/_design/reportsByCustomer/_view/reportsByCustomer'
  }

};

export let basicAuthHeaders = function() {

  return function (xhr) {
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader("Access-Control-Allow-Headers", "origin");
  }

};