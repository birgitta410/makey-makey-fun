
// https://craig.is/killing/mice
// For modifier keys you can use shift, ctrl, alt, or meta.
// You can substitute option for alt and command for meta.
// Other special keys are backspace, tab, enter, return, capslock, esc, escape, space, pageup, pagedown, end, home, left, up, right, down, ins, del, and plus.

Mousetrap.bind('space', function() { 
  console.log('HIT SPACE');

  var spaceBarTile = $('#on-space-bar');
  var isGreen = spaceBarTile.hasClass('green');
  if(isGreen) {
    spaceBarTile.removeClass('green');
    spaceBarTile.addClass('red');
  } else {
    spaceBarTile.removeClass('red');
    spaceBarTile.addClass('green');
  }
  
});
