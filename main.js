
// deals with a key being pressed for a longer time, or lots of times quickly in a row
// (which is what basically happens when you put two things together for longer in makey makey setup)
function longKeyPress(key, onContactStart, duringContact, onContactStop, reactionDelay) {
  reactionDelay = reactionDelay || 500;
  var lastContactAt = undefined;
  var contactWatcher = undefined;
  var inContact = false;

  function checkForContact() {
    if(lastContactAt !== undefined) {
      var timeSinceLastContact = Date.now() - lastContactAt;
      if(timeSinceLastContact >= 500) {
        stopContact();
        inContact = false;
        onContactStop();
      } else {
        if(inContact === false && onContactStart !== undefined) {
          onContactStart();
        }
        inContact = true;
        duringContact();
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
