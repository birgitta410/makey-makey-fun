
var defaultPic = 'img/tile_blank.gif';

var imageTags = _.map($('.tile'), function(tileElement) {
  var img = $(tileElement).find('img');
  img.attr('height', '300px');
  return img;
});

longKeyPress('up',
  function onStart() { playSound('scanner'); },
  function duringContact() {
    imageTags[0].attr('src', 'img/skorpion.jpg');
    imageTags[0].attr('height', '300px');
  },
  function stop() {
    imageTags[0].attr('src', defaultPic);
  });

longKeyPress('down', 
  function onStart() { playSound('scanner'); },
  function duringContact() {
    imageTags[1].attr('src', 'img/flugzeug.jpg');
    imageTags[1].attr('height', '300px');
  },
  function stop() {
    imageTags[1].attr('src', defaultPic);
  });

longKeyPress('right',
  function onStart() { playSound('kaching'); },
  function duringContact() {
    imageTags[2].attr('src', 'img/skorpion2.jpeg');
    imageTags[2].attr('height', '300px');
  }, function stop() {
    imageTags[2].attr('src', defaultPic);
  }
);

longKeyPress('space',
  function onStart() { playSound('scanner'); },
  function duringContact() {
    imageTags[3].attr('src', 'img/diesel_zapfsaeule.jpg');
    imageTags[3].attr('height', '300px');
  }, function stop() {
    imageTags[3].attr('src', defaultPic);
  }
);

