/**
 * Created by federicolaggiard on 03/06/15.
 */

'use strict';

var customersList = require('../../../src/components/customersList');

var testData = [
    {
        "id": "4615134a396fd24d545fb55967386f6a",
        "key": "VISCONTI S.R.L.",
        "value": "4615134a396fd24d545fb55967386f6a"
    },
    {
        "id": "4615134a396fd24d545fb55967387681",
        "key": "VIVIANO F.LLI s.n.c. Salumificio",
        "value": "4615134a396fd24d545fb55967387681"
    },
    {
        "id": "4615134a396fd24d545fb55967387f5d",
        "key": "VOGLIAZZI S.P.A.",
        "value": "4615134a396fd24d545fb55967387f5d"
    }
];

function getCustomers(){
    return testData;
}

describe('Customers List', function(){

    beforeEach(function(done){
        mock.requestAnimationFrame.$resolve();
        done();
    });

    it('Should render a list of input element', function(done){

       var documentRoot = mock.document.createElement("div");
       documentRoot.setAttribute('id','customerList');

       m.mount(documentRoot, m.component(customersList, {items: getCustomers(), getItems: getCustomers}));

       documentRoot.childNodes.should.have.length(1);

       var containerDiv = documentRoot.childNodes[0];
       containerDiv.class.should.equal('containerScroll customersList');
       containerDiv.childNodes.should.have.length(1);

       var ul = containerDiv.childNodes[0];
       ul.childNodes.should.have.length(testData.length);

       var li0 = ul.childNodes[0];
       li0.id.should.equal(testData[0].id);
       li0.childNodes.should.have.length(2);

       var p = li0.childNodes[1];
       p.childNodes[0].nodeValue.should.equal(testData[0].key);

       done();

    });



});