/**
 * Created by federicolaggiard on 29/05/15.
 */

var app = require('../../src/root');

describe('App', function(){

    it('Should have toolbar and main view', function(done){

        var documentRoot = mock.document.createElement("div");
        documentRoot.setAttribute('id','app');

        m.mount(documentRoot, m.component(app));

        documentRoot.childNodes.should.have.length(2);
        documentRoot.childNodes[0].id.should.equal('toolbar');
        documentRoot.childNodes[1].id.should.equal('mainView');

        done()
    });

});