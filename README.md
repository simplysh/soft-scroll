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

## Usage

**soft-scroll** needs a wrapper element within the scrollable container to work:

```
container
└── wrapper
    ├── element 1
    ├── element 2
    ├── element 3
    └── ..element n
```

Using this structure, **soft-scroll** only needs the duration and element to be scrolled into view:

```javascript
softScroll(500, document.getElementById('target'));
```

The target element may be omitted, in which case **soft-scroll** will return a function that accepts it:

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

In the case where an event is passed in, **soft-scroll** will detect and use the `target` property.

## Limitations

**soft-scroll** currently only works with horizontal scrolling.

## License

[MIT](LICENSE)


