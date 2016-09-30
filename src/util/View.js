"use strict";

var $events = require("../Events/foreign.js");


var empty = {};

function noop() {}


function View(f) {
  this.fn = f;
  this.listeners = $events.makeEvents();
  this.value = empty;
  this.stop = null;
}

exports.makeView = function (f) {
  return new View(f);
};


function Pure(value) {
  this.value = value;
}


function observe(view, push) {
  // TODO make this faster ?
  if (view instanceof Pure) {
    push(view.value);
    return noop;


  } else {
    var hasListeners = $events.hasListeners(view.listeners);

    var stop = $events.receive(view.listeners, push);


    // TODO verify that this is only called once ?
    if (!hasListeners) {
      // TODO what if it pushes after it's killed ?
      view.stop = view.fn(function (value) {
        if (view.value !== value) {
          view.value = value;
          return $events.send(view.listeners, value);
        }
      });

    } else if (view.value !== empty) {
      push(view.value);
    }


    var stopped = false;

    return function () {
      if (!stopped) {
        stopped = true;

        stop();

        if (!$events.hasListeners(view.listeners)) {
          var f = view.stop;

          view.value = empty;
          view.stop = null;

          return f();
        }
      }
    };
  }
}


exports.mapImpl = function (f, view) {
  return new View(function (push) {
    return observe(view, function (value) {
      return push(f(value));
    });
  });
};


// TODO test this
// TODO verify that this follows the Apply laws
exports.applyImpl = function (viewF, view) {
  return new View(function (push) {
    var valueF = empty;
    var value = empty;

    var stopF = observe(viewF, function (f) {
      valueF = f;

      if (value !== empty) {
        return push(valueF(value));
      }
    });

    var stop = observe(view, function (v) {
      value = v;

      if (valueF !== empty) {
        return push(valueF(value));
      }
    });

    return function () {
      stopF();
      return stop();
    };
  });
};


exports.pureImpl = function (a) {
  return new Pure(a);
};


exports.bindImpl = function (view, f) {
  return new View(function (push) {
    var inner = null;

    var outer = observe(view, function (value) {
      var old = inner;

      inner = observe(f(value), push);

      if (old !== null) {
        return old();
      }
    });

    return function () {
      outer();

      var old = inner;

      if (old !== null) {
        inner = null;
        return old();
      }
    };
  });
};


exports.observeImpl = function (view, push) {
  return function () {
    return observe(view, function (value) {
      return push(value)();
    });
  };
};
