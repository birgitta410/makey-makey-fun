
// https://craig.is/killing/mice
// For modifier keys you can use shift, ctrl, alt, or meta.
// You can substitute option for alt and command for meta.
// Other special keys are backspace, tab, enter, return, capslock, esc, escape, space, pageup, pagedown, end, home, left, up, right, down, ins, del, and plus.

function longKeyPress(key, onContactStop, onContactStart) {

  var lastContactAt = undefined;
  var contactWatcher = undefined;

  function checkForContact() {
    if(lastContactAt !== undefined) {
      var timeSinceLastContact = Date.now() - lastContactAt;
      if(timeSinceLastContact >= 100) {
        stopContact();
        onContactStop();
      } else {
        onContactStart();
      }
    }
  }

  function stopContact() {
    if(contactWatcher !== undefined) {
      console.log('STOPPED CONTACT');
      clearInterval(contactWatcher);
      contactWatcher = undefined;
    }
  }

  Mousetrap.bind(key, function() { 
    console.log('HIT KEY', key);
    lastContactAt = Date.now();
    if(contactWatcher === undefined) {
      console.log('STARTED CONTACT');
      contactWatcher = setInterval(checkForContact, 100);
    }
  });

}

var digitalCounter = function(selector) {
  var counterElement = $(selector);
  var digits = counterElement.find('.digit');

  function activate() {
    digits.removeClass('white');
    digits.addClass('red');
  }

  function stop() {
    digits.removeClass('red');
    digits.addClass('white');
  }

  function increase() {
    activate();
    var currentNumber = parseInt(_.map(digits, function(digitElement) {
      return $(digitElement).text();
    }).join(''));
    var increased = _.padStart((currentNumber + 10) + '', digits.length, '0');
    _.each(digits, function(digitElement, i) {
      $(digitElement).text(increased[i]);
    });
  }

  return {
    increase: increase,
    stop: stop
  };
}

var tileCounter = digitalCounter('#pump');

longKeyPress('space', tileCounter.stop, tileCounter.increase);