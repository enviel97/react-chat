import string from "@utils/string";

declare global {
  interface UserProfile {
    getProfileUserName: () => string;
  }
}

/*eslint no-extend-native: ["error", { "exceptions": ["Object"] }]*/
Object.defineProperty(Object.prototype, "getProfileUserName", {
  value: function () {
    if (!this?.displayName) {
      return this.displayName;
    }
    if (typeof this.user === "string") {
      const idAccount = `${this.user}`.slice(-6);
      return `@Chat-${idAccount}`;
    }
    return string.getFullName(this.user);
  },
});

export {};
