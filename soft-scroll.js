(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  }
  else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  }
  else {
    root.softScroll = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  var scrollIntoView = function (duration, element) {
    var target;

    if (element instanceof Node) {
      target = element;
    } else if (element instanceof Event) {
      target = element.target;
    }

    var wrapper = target.parentNode;
    var parent = wrapper.parentNode;

    var parentBox = parent.getBoundingClientRect();
    var targetBox = target.getBoundingClientRect();

    var distance = targetBox.x - parentBox.x;

    parent.scrollLeft = parent.scrollLeft + distance;

    wrapper.style.transition = '';
    wrapper.style.transform = 'translateX(' + distance + 'px)';

    setTimeout(function () {
      wrapper.style.transition = 'transform ' + duration + 'ms ease-out';
      wrapper.style.transform = 'translateX(0)';
    }, 60);
  };

  return function () {
    switch (arguments.length) {
      case 1:
        var duration_1 = arguments[0];
        return function (element) { return scrollIntoView(duration_1, element); };
      case 2:
        var duration_2 = arguments[0];
        return scrollIntoView(duration_2, arguments[1]);
      default:
        throw new Error('scrollIntoView needs at least 1 argument; none was given.')
    }
  };
}));
