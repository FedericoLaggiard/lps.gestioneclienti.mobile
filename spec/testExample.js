/**
 * Created by federicolaggiard on 29/05/15.
 */
var m = require('mithril');
var mocha = require('mocha');
var chai = require('chai');
var should = chai.should();
var mock = require('./libs/mock').window;

m.deps(mock);

describe('test mithril', function(){

    beforeEach(function(done){
        mock.requestAnimationFrame.$resolve();
        done();
    });

    it('Should render the items provided on DOM', function(done){

        var items = [
            {text: 'one'},
            {text: 'two'},
            {text: 'three'},
            {text: 'four'},
            {text: 'five'}
        ];

        var root = mock.document.createElement("div");
        root.setAttribute('id','app');

        m.mount(root, m.component(app,items));

        var list = root.childNodes[0];
        list.childNodes.should.have.length(5);
        list.childNodes[2].childNodes[0].nodeValue.should.equal('three');

        done();
    });

});

var app = {
    controller: function (data) {
        // private, yeah!
        var items = data;

        return {
            /**
             * Gets all items
             * @returns {Array}
             * @example
             * var items = ctrl.getItems()
             */
            getItems: function () {
                return items;
            }

        }
    },

    view: function (ctrl) {
        return m('ul', ctrl.getItems().map(function(item){
                return m('li',item.text);
            })
        );
    }

};