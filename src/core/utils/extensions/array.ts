import string from "@utils/string";

declare global {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  interface Array<T = any> {
    toClasslist(): string;
    isNotEmpty(): boolean;
    isEmpty(): boolean;
  }
}

/*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/
Object.defineProperty(Array.prototype, "toClasslist", {
  value: function (this) {
    return string.classList(...this);
  },
});

/*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/
Object.defineProperty(Array.prototype, "isNotEmpty", {
  value: function (this) {
    return (this?.length ?? 0) !== 0;
  },
});

/*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/
Object.defineProperty(Array.prototype, "isEmpty", {
  value: function (this) {
    return (this?.length ?? 0) === 0;
  },
});

export {};
