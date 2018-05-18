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

    // if there's an animation currently in progress, stop it first
    if (wrapper.style.transform !== '') {
      var matrix = window.getComputedStyle(wrapper).transform;
      var translation = parseFloat(matrix.replace(/matrix\(\d+,\s\d+,\s\d+,\s\d+,\s([\d\.]+),\s\d+\)/, '$1'))

      wrapper.style.transform = '';
      wrapper.style.transition = '';

      // move the scroll container back the remaining amount
      parent.scrollLeft = parent.scrollLeft - translation;
    }

    var parentBox = parent.getBoundingClientRect();
    var targetBox = target.getBoundingClientRect();

    var distance = targetBox.x - parentBox.x;

    // limit the distance by how much scrollable area we have left
    var remainingScroll = parent.scrollWidth - parent.scrollLeft - parent.offsetWidth;
    var effectiveDistance = remainingScroll < distance ? remainingScroll : distance;

    parent.scrollLeft = parent.scrollLeft + effectiveDistance;

    wrapper.style.transition = '';
    wrapper.style.transform = 'translateX(' + effectiveDistance + 'px)';

    var effectiveDuration = typeof duration === 'function' ? duration(Math.abs(effectiveDistance)) : duration;

    setTimeout(function () {
      wrapper.style.transition = 'transform ' + effectiveDuration + 'ms ease-in-out';
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
        throw new Error('softScroll needs at least 1 argument; none was given.')
    }
  };
}));
