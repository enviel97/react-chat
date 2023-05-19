import { safeLog } from "@core/api/utils/logger";
import { uniqueId } from "lodash";

export const AttachmentReducerInitState: AttachmentReducerState = {};

type ReducerAction =
  | { type: "ADD_ATTACHMENT"; payload: File[] }
  | { type: "REMOVE_ATTACHMENT"; payload: string }
  | { type: "CLEAR_ATTACHMENT" };

const AttachmentReducer = (
  state: AttachmentReducerState,
  actions: ReducerAction
): AttachmentReducerState => {
  switch (actions.type) {
    case "ADD_ATTACHMENT": {
      return {
        ...state,
        ...actions.payload.reduce((newState, currentFile) => {
          const uuid = uniqueId("Attachment");
          return { ...newState, [uuid]: currentFile };
        }, {}),
      };
    }
    case "REMOVE_ATTACHMENT": {
      const id = actions.payload;
      if (!state[id]) {
        safeLog("Attachment: Id not found");
        return state;
      }
      const { [id]: file, ...newState } = state;
      return newState;
    }
    case "CLEAR_ATTACHMENT": {
      return AttachmentReducerInitState;
    }
    default: {
      throw new Error("Method not implement");
    }
  }
};

export default AttachmentReducer;
