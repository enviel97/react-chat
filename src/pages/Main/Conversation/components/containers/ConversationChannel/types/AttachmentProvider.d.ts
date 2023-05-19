interface AttachmentContextProps {
  files: [string, File][];
  quantity: number;
  open: () => void;
  clear: () => void;
  remove: (id: string) => void;
}

type AttachmentReducerState = { [id: string]: File };

type AttachmentReducerActionType =
  | "ADD_ATTACHMENT"
  | "REMOVE_ATTACHMENT"
  | "CLEAR_ATTACHMENT";
