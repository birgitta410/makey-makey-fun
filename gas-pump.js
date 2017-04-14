
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