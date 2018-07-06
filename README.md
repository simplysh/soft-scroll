# soft-scroll

## [Online demo!](https://simplysh.github.io/soft-scroll/)

## Introduction

**soft-scroll** is a small library for animating scrollable viewports using CSS.

## Installation

```
npm install soft-scroll
```

Alternatively, just download and include [soft-scroll.js](./soft-scroll.js)

```html
<script src="soft-scroll.js"></script>
```

## Prerequisites

**soft-scroll** needs a wrapper element within the scrollable container to work:

```
container
└── wrapper
    ├── element 1
    ├── element 2
    ├── element 3
    └── ..element n
```

## Usage

```
function softScroll(
  duration: number | ((distance: number) => number),
  element?: Node | Event
): void { }
```

**soft-scroll** requires the animation duration and element to be scrolled into view:

```javascript
softScroll(500, document.getElementById('target'));
```

## Advanced usage

### Currying

The target element may be omitted, in which case **soft-scroll** will return a function which accepts it:

```javascript
const quickScroll = softScroll(500);

quickScroll(document.getElementById('target'));
```

This is especially is useful for binding event listeners:

```javascript
document
  .getElementById('target')
  .addEventListener('click', softScroll(500));
```

In the case where an event is passed in as the second argument, **soft-scroll** will detect and use the `target` property.

### Relative duration

If the duration is a function, **soft-scroll** will call it and use the result. This function will receive the distance the container would travel as its first and only argument.

This is useful for making the container move at constant speed regardless of the distance traveled

```javascript
const double = num => num * 2;

softScroll(double, document.getElementById('target'));
```

## Limitations

**soft-scroll** currently only works with horizontal scrolling.

## License

[MIT](LICENSE)


