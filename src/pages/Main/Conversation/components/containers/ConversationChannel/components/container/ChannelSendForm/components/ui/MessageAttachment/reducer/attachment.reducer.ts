import { uniqueId } from "lodash";

export const initState: AttachmentState = [];

export type AttachmentAction =
  | { type: "ADD_ATTACHMENT"; payload: ActionAddAttachment }
  | { type: "REMOVE_ATTACHMENT"; payload: string }
  | { type: "CLEAR_ATTACHMENT" };

export const AttachmentReducer = (
  state: AttachmentState,
  action: AttachmentAction
) => {
  switch (action.type) {
    case "ADD_ATTACHMENT": {
      const { prefixId = "Attachment__", files } = action.payload;

      return [
        ...state,
        ...files.map((file) => {
          const uuid = uniqueId(prefixId);
          return { id: uuid, file };
        }),
      ];
    }
    case "REMOVE_ATTACHMENT": {
      const payload = action.payload;
      return [...state.filter((entity) => entity.id !== payload)];
    }
    case "CLEAR_ATTACHMENT": {
      return initState;
    }
  }
};
