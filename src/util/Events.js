"use strict";


function Events() {
  this.index = 0;
  this.length = 0;
  this.listeners = [];
}


exports.makeEvents = function () {
  return new Events();
};


exports.hasListeners = function (events) {
  return events.listeners.length !== 0;
};


function send(events, value) {
  var listeners = events.listeners;

  // This causes it to not trigger listeners which are added while sending a value
  events.length = listeners.length;

  // TODO remove this later
  if (events.index !== 0) {
    throw new Error("Invalid state");
  }

  // All of this extra code is needed when a listener is removed while sending a value
  for (;;) {
    var index = events.index;

    if (index < events.length) {
      listeners[index](value);

      ++events.index;

    } else {
      break;
    }
  }

  events.index = 0;
  events.length = 0;
}

exports.send = send;

exports.sendImpl = function (events, value) {
  return function () {
    return send(events, value);
  };
};


function receive(events, listener) {
  events.listeners.push(listener);

  var killed = false;

  return function () {
    if (!killed) {
      killed = true;

      var index = events.listeners.indexOf(listener);

      if (index !== -1) {
        events.listeners.splice(index, 1);

        // This is needed when a listener is removed while sending a value
        if (index < events.length) {
          --events.length;

          if (index <= events.index) {
            --events.index;
          }
        }
      }
    }
  };
}

exports.receive = receive;

exports.receiveImpl = function (events, listener) {
  return function () {
    return receive(events, function (value) {
      return listener(value)();
    });
  };
};
