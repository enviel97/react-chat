declare global {
  interface Number {
    toEm: () => string;
    toPx: () => string;
    toVh: () => string;
    toVw: () => string;
  }
}
/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
Object.defineProperty(Number.prototype, "toEm", {
  value: function () {
    return `${this / 16}em`;
  },
});

/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
Object.defineProperty(Number.prototype, "toPx", {
  value: function () {
    return `${this}px`;
  },
});

/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
Object.defineProperty(Number.prototype, "toVh", {
  value: function () {
    if (this === 0) return `0`;
    const h = window.innerHeight;
    return `${(100 * this) / h}svh`;
  },
});

/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
Object.defineProperty(Number.prototype, "toVw", {
  value: function () {
    if (this === 0) return `0`;
    const w = window.innerWidth;
    return `${(100 * this) / w}svw`;
  },
});
export {};
