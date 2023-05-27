import string from "@utils/string";

declare global {
  interface Array<T = any> {
    toClasslist(): string;
    isNotEmpty(): boolean;
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

export {};
