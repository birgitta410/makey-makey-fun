
// deals with a key being pressed for a longer time, or lots of times quickly in a row
// (which is what basically happens when you put two things together for longer in makey makey setup)
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
