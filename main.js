
// https://craig.is/killing/mice
// For modifier keys you can use shift, ctrl, alt, or meta.
// You can substitute option for alt and command for meta.
// Other special keys are backspace, tab, enter, return, capslock, esc, escape, space, pageup, pagedown, end, home, left, up, right, down, ins, del, and plus.

var spaceBarLastPressed = undefined;
var spaceBarWatcher = undefined;

function watchSpaceBar() {
  if(spaceBarLastPressed !== undefined) {
    var timeSinceLastPress = Date.now() - spaceBarLastPressed;
    if(timeSinceLastPress >= 500) {
      stopToWatchSpaceBar();
      makeTileGreen();
    } else {
      makeTileRed();
    }
  }
}

function stopToWatchSpaceBar() {
  if(spaceBarWatcher !== undefined) {
    console.log('STOPPED TO PRESS SPACE BAR');
    clearInterval(spaceBarWatcher);
    spaceBarWatcher = undefined;
  }
}

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

Mousetrap.bind('space', function() { 
  console.log('HIT SPACE');
  spaceBarLastPressed = Date.now();
  if(spaceBarWatcher === undefined) {
    console.log('STARTING TO PRESS SPACE BAR');
    spaceBarWatcher = setInterval(watchSpaceBar, 100);
  }
});
