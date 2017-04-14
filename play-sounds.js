var context;
var sounds = {};

function initSounds() {
  window.AudioContext = window.AudioContext||window.webkitAudioContext;
  context = new AudioContext();

  function loadSound(key, url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
      context.decodeAudioData(request.response, function(buffer) {
        sounds[key] = buffer;
      }, function(err) {
        console.error("error occurred", err);
      });
    }
    request.send();
  }
  loadSound('kaching', 'sounds/kaching.mp3');
  loadSound('scanner', 'sounds/scanner.mp3');
}

function playSound(key) {
  var buffer = sounds[key];
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
}

window.addEventListener('load', initSounds, false);
