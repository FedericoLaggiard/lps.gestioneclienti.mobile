/**
 * Created by federicolaggiard on 29/05/15.
 */

global.m = require('mithril');
global.mocha = require('mocha');
global.chai = require('chai');
global.should = chai.should();
global.mock = require('./libs/mock').window;

m.deps(mock);