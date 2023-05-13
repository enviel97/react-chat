interface IFile {
  id: string;
  file: File;
}

type AttachmentState = IFile[];

type AttachmentAction =
  | "REMOVE_ATTACHMENT"
  | "ADD_ATTACHMENTS"
  | "CLEAR_ATTACHMENT";

type AttachmentContextValue = {
  state: AttachmentState;
};

type ActionAddAttachment = {
  files: File[];
  prefixId?: string;
};
