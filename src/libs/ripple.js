"use strict";

//import Style from '../../styles/ripple.css';

let Ripple = function(_options) {

  var ripple_wrap,
      rippler,
      finish        = false,
      options      =  extend({
        rippleWrapClass : "wrapper",
        rippleClass     : "ripple",
        animationClass  : "goripple",
        onPause         : null,
        onFinish        : null
      }, _options)
  ;

  createRippleOnDom();

  function onEnd(){
      ripple_wrap.classList.remove('goripple');

      if(options.onFinish) options.onFinish();
  }
  function monitor(el){
        var computed      = window.getComputedStyle(el,null),
            borderWidth   = parseFloat(computed.getPropertyValue('border-left-width'))
        ;

        if(!finish && borderWidth >= 1500){
          el.style.animationPlayState = "paused";
          options.onPause ? options.onPause() : finish = true;
        }
        if(finish){
          el.style.animationPlayState = "running";
          if(options.onFinish) options.onFinish();
        } else {
          window.requestAnimationFrame(function(){
            monitor(el)
          });
        }
  }
  function createRippleOnDom(){
    if(document.querySelector(options.rippleWrapClass)) return;

    ripple_wrap = document.createElement("div");
    ripple_wrap.classList.add(options.rippleWrapClass);
    document.body.appendChild(ripple_wrap);

    rippler = document.createElement("div");
    rippler.classList.add(options.rippleClass);
    ripple_wrap.appendChild(rippler);
  }
  function extend( a, b ) {
    for( var key in b ) {
      if( b.hasOwnProperty( key ) ) {
        a[key] = b[key];
      }
    }
    return a;
  }

  return {
    start: function(event){
      rippler.addEventListener("animationend", onEnd);
      rippler.style.left = event.clientX + 'px';
      rippler.style.top = event.clientY +'px';
      finish = false;
      ripple_wrap.classList.add(options.animationClass);

      window.requestAnimationFrame(function(){
        monitor(rippler);
      });
    },
    resume: function(){
      finish = true;
    }
  }
};

export default Ripple;