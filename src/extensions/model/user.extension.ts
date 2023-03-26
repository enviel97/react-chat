import string from "@utils/string";

declare global {
  interface User {
    getFullName: () => string;
  }
}

/*eslint no-extend-native: ["error", { "exceptions": ["Object"] }]*/
Object.defineProperty(Object.prototype, "getFullName", {
  value: function () {
    return string.getFullName(this);
  },
});

export {};
