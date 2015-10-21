/**
 * Created by federicolaggiard on 19/10/15.
 *
 *
 * <script type="text/javascript" src="https://www.google.com/jsapi"></script>
 *
 */

'use strict';

import m from 'mithril';
import request from '../libs/request';

import style from '../../styles/gMap.less';

const API_KEY="AIzaSyD_rcypgYydqbK5M8ItAtpb16AKcS3yvqI";
let map;
let marker;
let location;
let lat = 45.0734673;
let long = 7.6055664;

export default {

  controller(data){

    function gMapConfig(element, isInit){

      if(typeof google !== 'undefined' && !isInit) {

        window.that = this;
        google.load("maps", "3", {other_params:'sensor=false&key=' + API_KEY, callback: function(){

          geoCode(data.address, (err, success) => {

            location = success;

            switch (success.status) {
              case "OK":

                lat = success.results[0].geometry.location.lat;
                long = success.results[0].geometry.location.lng;

                _showMap();

                break;
              case "ZERO_RESULTS":

                break;
              case "OVER_QUERY_LIMIT":

                break;
              default: //REQUEST_DENIED, INVALID_REQUEST, UNKNOWN_ERROR

                break;
            }

          });

        }});


      }

    }

    function _showMap(){

      let myLatlng = new google.maps.LatLng(lat,long);
      let mapOptions = {
        zoom: 15,
        disableDefaultUI: true,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementsByClassName("gMap")[0], mapOptions);

      marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Hello World!'
      });

      marker.setMap(map);
    }

    function geoCode(address, callback){

      request({
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address +'&key=' + API_KEY
      }, (err, success) => {

        if(err){
          app.showToast('Si è verificato un errore durante la geolocalizzazione.');
          return callback(err, null);
        }

        console.log(success);
        return callback(null,success);

      })

    }

    return {
      gMapConfig,
      geoCode
    }
  },

  view(ctrl){

    return m('div', {
      className: 'gMap',
      config: ctrl.gMapConfig
    }, getContent(ctrl));

    function getContent(ctrl){

      if (location){
        switch (location.status){

          case 'OK':
            return null; //return nothing, the map will render here
            break;
          case 'ZERO_RESULTS':
            return [
              m('i', {className: 'material-icons mapErrorIcon'}, 'gps_off'),
              m('h3', {className: 'mapErrorText'}, "L'indirizzo non è stato trovato." )
            ];
            break;
          case 'OVER_QUERY_LIMIT':
            return [
              m('i', {className: 'material-icons mapErrorIcon'}, 'report_problem'),
              m('h3', {className: 'mapErrorText'}, 'Troppe Richieste a Google Maps per oggi.' )
            ];
            break;
          default:
            return [
              m('i', {className: 'material-icons mapErrorIcon'}, 'error'),
              m('h3', {className: 'mapErrorText'}, 'Errore sconosciuto. Probabilmente Google è in vacanza.' )
            ];
            break;
        }
      }



    }

  }

}