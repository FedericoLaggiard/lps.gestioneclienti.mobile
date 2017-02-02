/**
 * Created by federicolaggiard on 27/01/16.
 */


'use strict';

import Style from '../../styles/calendar.less';

import m from 'mithril';
import moment from 'moment';

const defaults = {
  daysOfWeek    : ["lun","mar","mer","gio","ven","sab","dom"],
  inputFormat   : 'D MMMM YYYY, h:mm',
  callback      : null
};

export default {

  controller(date, options = {}){
    options = Object.assign(defaults,options);
    date = m.prop(moment(date, options.inputFormat));

    let now = m.prop(moment());
    let days = m.prop([]);
    let tempDate = moment([date().year(),date().month(),1]);
    tempDate.subtract(tempDate.day() - 1 ,'d');
    drawMonth();

    function drawMonth(){
      days([]);
      tempDate = moment([date().year(),date().month(),1]);
      tempDate.subtract(tempDate.day() - 1 ,'d');
      for (let i=0; i<35; i++){
        let d = tempDate.date();
        let mo = tempDate.month();
        let y = tempDate.year();

        days().push({value: d, date: moment([y,mo,d])});
        tempDate.add(1,'d');
      }
    }

    function nextYear(){
      date().add(1,'y');
      drawMonth();
    }
    function prevYear(){
      date().subtract(1,'y');
      drawMonth();
    }
    function nextMonth(){
      date().add(1,'M');
      drawMonth();
    }
    function prevMonth(){
      date().subtract(1,'M');
      drawMonth();
    }

    function selectDate(value){
      date().date(value);
    }

    function back(){
      if(options.callback) options.callback();
    }

    function save(){
      date().hour(now().hour());
      date().minutes(now().minutes());
      date().seconds(now().seconds());
      if(options.callback) options.callback(date());
    }

    return {
      options,
      date,
      now,
      days,
      selectDate,
      nextYear,
      prevYear,
      nextMonth,
      prevMonth,
      back,
      save
    }
  },

  view(ctrl){
    return m('section', {
      className: 'calendar-panel' + (app.showRippleContent() ? ' on' : '' )
    }, [
      m('div', { className: 'calendar-month' },[
        m('i', {
          className: 'material-icons left',
          onclick: ctrl.prevMonth.bind(ctrl)
        }, m.trust("&#xE314;")),
        m('h2', ctrl.date().format('MMMM')),
        m('i', {
          className: 'material-icons right',
          onclick: ctrl.nextMonth.bind(ctrl)
        }, m.trust("&#xE315;"))
      ]),
      m('div', {className: 'calendar-year'}, [
        m('i', {
          className: 'material-icons left',
          onclick: ctrl.prevYear.bind(ctrl)
        }, m.trust("&#xE314;")),
        m('h2', ctrl.date().format('YYYY')),
        m('i', {
          className: 'material-icons right',
          onclick: ctrl.nextYear.bind(ctrl)
        }, m.trust("&#xE315;"))
      ]),
      m('div', { className: 'box-content div-table'}, [
        m('div', {className: 'table-header div-row'},
          ctrl.options.daysOfWeek.map(header => m('div', {className: 'div-cell'}, header))
        ),
        ["","","","",""].map((item,i) => {
          return m('div', {className: 'div-row'},
            ctrl.days().slice(i * 7, (i * 7) + 7).map(item => {
              return m('div', {
                className: getClass(item.date,ctrl.date(), moment()),
                value: item.value,
                onclick: ctrl.selectDate.bind(ctrl, item.value)
              }, item.value)
            })
          )
        })
      ]),
      m('div', {className: 'selected-date'},[
        m('h2', moment([ctrl.date().year(), ctrl.date().month(), ctrl.date().date()]).format("DD  MMMM  YYYY")),
        m('p', moment([ctrl.date().year(), ctrl.date().month(), ctrl.date().date(), ctrl.now().hour(), ctrl.now().minutes(), ctrl.now().seconds()]).fromNow())
      ]),
      m('div', {className: 'buttons'}, [
        m('button', {
          id: 'back',
          className: 'mdl-button mdl-js-button mdl-js-ripple-effect',
          onclick: ctrl.back.bind(ctrl)
        }, 'Indietro'),
        m('button', {
          id: 'save',
          className: 'mdl-button mdl-js-button mdl-js-ripple-effect',
          onclick: ctrl.save.bind(ctrl)
        }, 'Salva')
      ])
    ]);

    function getClass(itemDate, curDate, nowDate){
      let d = itemDate.date();
      let mo = itemDate.month();
      let y = itemDate.year();
      let className = "div-cell";

      if(mo < curDate.month() || y < curDate.year()) className += " old-month";
      if(mo > curDate.month() || y > curDate.year()) className += " new-month";
      if(d == nowDate.date() && mo == nowDate.month() && y == nowDate.year()) className += " today";
      if(d == curDate.date() && mo == curDate.month() && y == curDate.year()) className += " selected";

      return className;
    }
  }

};