
// https://craig.is/killing/mice
// For modifier keys you can use shift, ctrl, alt, or meta.
// You can substitute option for alt and command for meta.
// Other special keys are backspace, tab, enter, return, capslock, esc, escape, space, pageup, pagedown, end, home, left, up, right, down, ins, del, and plus.

function makeTileGreen() {
  var spaceBarTile = $('#on-space-bar');
  spaceBarTile.removeClass('red');
  spaceBarTile.addClass('green');
}

function makeTileRed() {
  var spaceBarTile = $('#on-space-bar');
  spaceBarTile.removeClass('green');
  spaceBarTile.addClass('red');
}

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

longKeyPress('space', makeTileGreen, makeTileRed);