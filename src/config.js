/**
 * Created by federicolaggiard on 14/08/15.
 */

'use strict';

export const env = 'prod';

const baseUrl = {

  prod: 'https://couchdb-0f2b48.smileupps.com',
  dev: 'http://0.0.0.0:5984'

};

export const urls = {

  prod: {
    login:        baseUrl[env] + '/_session',
    customer:     baseUrl[env] + '/lps_clienti',
    customers:    baseUrl[env] + '/lps_clienti/_design/listByRagSoc/_view/listByRagSoc'
  },

  dev: {
    login:        baseUrl[env] + '/_session',
    customer:     baseUrl[env] + '/lps_clienti',
    customers:    baseUrl[env] + '/lps_clienti/_design/listByRagSoc/_view/listByRagSoc'
  }

};

export let basicAuthHeaders = function() {

  return function (xhr) {
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader("Access-Control-Allow-Headers", "origin");
  }

};