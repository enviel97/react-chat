type Key = "IMAGES" | "DOCS";
enum AttachmentsType {
  IMAGES = "jpg|jpeg|png|gif",
  DOCS = "pdf|docx|doc|xlsx|xls",
}

declare global {
  interface MessageAttachments {
    is: (type: Key) => boolean;
  }
}

/*eslint no-extend-native: ["error", { "exceptions": ["Object"] }]*/
Object.defineProperty(Object.prototype, "is", {
  value: function (type: Key) {
    const document: MessageAttachments = this;
    const regexp = new RegExp(`/${AttachmentsType[type]}/g`);
    return regexp.test(document.type);
  },
});

export {};
