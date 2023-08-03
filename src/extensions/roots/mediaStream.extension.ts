declare global {
  interface MediaStream {
    close: () => Promise<void>;
  }
}
/*eslint no-extend-native: ["error", { "exceptions": ["Object"] }]*/
Object.defineProperty(MediaStream.prototype, "close", {
  value: function () {
    const stream = this as MediaStream;
    const tracks = stream.getTracks();
    if (tracks.length === 0) return;
    tracks.forEach((track) => track.stop());
  },
});

export {};
