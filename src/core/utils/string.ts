declare global {
  interface String {
    insert(newValue: string, offset: number): string;
  }
}
/*eslint no-extend-native: ["error", { "exceptions": ["String"] }]*/
Object.defineProperty(String.prototype, "insert", {
  value: function (newValue: string, offset: string) {
    return [this.slice(0, offset), newValue, this.slice(offset)].join("");
  },
});

export {};
