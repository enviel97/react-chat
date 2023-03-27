import string from "@utils/string";

declare global {
  interface array {
    toClasslist(): string;
  }
}

/*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/
Object.defineProperty(Array.prototype, "toClasslist", {
  value: function (this) {
    return string.classList(...this);
  },
});

export {};
