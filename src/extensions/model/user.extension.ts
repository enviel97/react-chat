declare global {
  interface User {
    getFullName: () => string;
  }
}

/*eslint no-extend-native: ["error", { "exceptions": ["Object"] }]*/
Object.defineProperty(Object.prototype, "getFullName", {
  value: function () {
    return `${this.lastName} ${this.firstName}`;
  },
});

export {};
