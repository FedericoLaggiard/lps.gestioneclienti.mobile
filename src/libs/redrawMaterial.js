/** Created by roberta on 04/08/15 11:24. */

'use strict';


let redrawMat = function(element, isInit) {
  if(!isInit) {
    componentHandler.upgradeAllRegistered();
  }
};

redrawMat.removeContainer = function(element, isInit){
  if(!isInit){

    var containers = document.getElementsByClassName('mdl-layout__container');

    for (var i = 0; i<containers.length; i++){
      if(containers[i].childNodes.length == 0){
        containers[i].parentNode.removeChild(containers[i]);
      }
    }

  }

};


export default redrawMat;


/** WEBPACK FOOTER **
 ** ./lib/helpers/redrawMaterial.js
 **/