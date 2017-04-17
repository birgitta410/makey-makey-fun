
var tileCounter = digitalCounter('#pump');

longKeyPress('space', 
  function onStart() {
  },
  tileCounter.increase, 
  function() {
    tileCounter.stop();
    playSound('kaching');
  }
);