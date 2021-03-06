var digitalCounter = function(selector, increment) {
  increment = increment || 10;
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
    var increased = _.padStart((currentNumber + increment) + '', digits.length, '0');
    _.each(digits, function(digitElement, i) {
      $(digitElement).text(increased[i]);
    });
  }

  return {
    increase: increase,
    stop: stop
  };
}
