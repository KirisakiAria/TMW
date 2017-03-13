function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

var isSafari = /constructor/i.test(window.HTMLElement);
var isFF = !!navigator.userAgent.match(/firefox/i);

if (isSafari) {
  document.getElementsByTagName('html')[0].classList.add('safari');
}

// Remove click on button for demo purpose
Array.prototype.slice.call(document.querySelectorAll('.button'), 0).forEach(function(bt) {
  bt.addEventListener('click', function(e) {
    e.preventDefault();
  });
});
initBt8();

// Button 8
function initBt8() {
  var bt = document.querySelectorAll('#component-8')[0];
  var turb = document.querySelectorAll('#myfilter feImage')[0];
  var dm = document.querySelectorAll('#myfilter feDisplacementMap')[0];

  bt.addEventListener('click', function(e) {
    TweenLite.set(turb, {
      attr: {
        x: isFF ? e.offsetX : e.offsetX + 10,
        y: isFF ? e.offsetY : e.offsetY + 10,
        width: 0,
        height: 0
      }
    });
    TweenLite.to(turb, 3, {
      attr: {
        x: '-=300',
        y: '-=300',
        width: 600,
        height: 600
      }
    });
    TweenLite.fromTo(dm, 2, {
      attr: {
        scale: 30
      }
    }, {
      attr: {
        scale: 0
      }
    });
  });
}