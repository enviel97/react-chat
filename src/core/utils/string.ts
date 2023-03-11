declare global {
  interface String {
    insert(newValue: string, offset: number): string;
  }
}

String.prototype.insert = function (newValue, offset) {
  return [this.slice(0, offset), newValue, this.slice(offset)].join("");
};

export {};
