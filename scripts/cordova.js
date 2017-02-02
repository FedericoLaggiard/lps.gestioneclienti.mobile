"use strict";

var sys = require('sys');
var exec = require('child_process').exec;


exec ("rm -R cordova/www/", function(error,stdout,stderr){
  sys.print("stdout: " + stdout);
  sys.print("stderr: " + stderr);
  if(error !== null) {
    console.log("exec error: " + error);
  } else {

    exec("cp -r dist/ cordova/www/", function(error, stdout, stderr) {
      sys.print("stdout: " + stdout);
      sys.print("stderr: " + stderr);
      if(error !== null) {
        console.log("exec error: " + error);
      } else {

        //exec('cordova build', {cwd: './cordova'} , function(error, stdout, stderr) {
        //  sys.print("stdout: " + stdout );
        //  sys.print("stderr: " + stderr );
        //  if(error !== null) {
        //    console.log("exec error: " + error);
        //  } else {

            console.log("CORDOVA COPIED!!!");

          //}
        //};


      }
    });

  }
});