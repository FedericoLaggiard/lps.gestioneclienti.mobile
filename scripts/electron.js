/**
 * Created by federicolaggiard on 07/01/16.
 */
"use strict";

var sys = require('sys');
var exec = require('child_process').exec;


exec ("rm -R electron/www/", function(error,stdout,stderr){
  sys.print("stdout: " + stdout);
  sys.print("stderr: " + stderr);
  if(error !== null) {
    console.log("exec error: " + error);
  } else {

    exec("cp -r dist/ electron/www/", function(error, stdout, stderr) {
      sys.print("stdout: " + stdout);
      sys.print("stderr: " + stderr);
      if(error !== null) {
        console.log("exec error: " + error);
      } else {
        console.log("ELECTRON BUILDED!!!");
      }
    });

  }
});