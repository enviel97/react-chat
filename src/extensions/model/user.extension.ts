declare global {
  interface User {
    getFullName: () => string;
  }
}

/*eslint no-extend-native: ["error", { "exceptions": ["Object"] }]*/
Object.defineProperty(Object.prototype, "getFullName", {
  value: function () {
    const user = this as User;
    if (user?.profile?.displayName) {
      return user.profile.displayName;
    }
    return `${this.lastName} ${this.firstName}`.trim();
  },
});

export {};
