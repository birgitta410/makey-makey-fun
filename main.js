
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
      if(timeSinceLastContact >= 500) {
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

  function increase() {
    var currentNumber = parseInt(_.map(digits, function(digitElement) {
      return $(digitElement).text();
    }).join(''));
    var increased = _.padStart((currentNumber + 10) + '', digits.length, '0');
    _.each(digits, function(digitElement, i) {
      $(digitElement).text(increased[i]);
    });
  }

  return {
    increase: increase
  };
}

function tile(selector) {
  var element = $(selector);
  var tileCounter = digitalCounter(selector);

  function makeGreen() {
    element.removeClass('red');
    element.addClass('green');
  }

  function makeRed() {
    element.removeClass('green');
    element.addClass('red');
  }

  function increaseCounter() {
    tileCounter.increase();
  }

  return {
    makeGreen: makeGreen,
    makeRed: makeRed,
    increaseCounter: increaseCounter
  };

}

var spaceBarTile = tile('#on-space-bar');
spaceBarTile.makeGreen();
longKeyPress('space', spaceBarTile.makeGreen, function() {
  spaceBarTile.makeRed();
  spaceBarTile.increaseCounter();
});