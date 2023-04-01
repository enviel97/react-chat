import string from "@utils/string";

declare global {
  interface UserProfile {
    getProfileUserName: () => string;
  }
}

/*eslint no-extend-native: ["error", { "exceptions": ["Object"] }]*/
Object.defineProperty(Object.prototype, "getProfileUserName", {
  value: function () {
    return string.getFullName(this.user as any);
  },
});

export {};
