"use strict";

var $events = require("../Events/foreign.js");
var $view = require("../View/foreign.js");


function Mutable(value) {
  this.value = value;
  this.listeners = $events.makeEvents();
}


exports.makeMutable = function (value) {
  return function () {
    return new Mutable(value);
  };
};


exports.get = function (mutable) {
  return function () {
    return mutable.value;
  };
};


exports.setImpl = function (mutable, value) {
  return function () {
    if (mutable.value !== value) {
      mutable.value = value;

      return $events.send(mutable.listeners, value);
    }
  };
};


exports.viewImpl = function (mutable) {
  return $view.makeView(function (push) {
    var stop = $events.receive(mutable.listeners, push);

    push(mutable.value);

    return stop;
  });
};
