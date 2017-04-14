
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

function tile(selector) {
  var element = $(selector);

  function makeGreen() {
    element.removeClass('red');
    element.addClass('green');
  }

  function makeRed() {
    element.removeClass('green');
    element.addClass('red');
  }

  function initialiseCounter() {
    if(isNaN(parseInt(element.text()))) {
      element.text('0');
    }
  }

  function increaseCounter() {
    var currentNumber = element.text();
    var increase = parseInt(currentNumber) + 1;
    element.text(increase);
  }

  return {
    makeGreen: makeGreen,
    makeRed: makeRed,
    initialiseCounter: initialiseCounter,
    increaseCounter: increaseCounter
  };

}

var spaceBarTile = tile('#on-space-bar');
spaceBarTile.makeGreen();
spaceBarTile.initialiseCounter();
longKeyPress('space', spaceBarTile.makeGreen, function() {
  spaceBarTile.makeRed();
  spaceBarTile.increaseCounter();
});