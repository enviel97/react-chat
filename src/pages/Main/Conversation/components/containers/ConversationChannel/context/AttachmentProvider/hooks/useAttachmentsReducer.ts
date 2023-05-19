import { useCallback, useMemo, useReducer } from "react";
import AttachmentReducer, {
  AttachmentReducerInitState,
} from "../reducers/AttachmentsReducer";

const useAttachmentReducer = () => {
  const [state, dispatch] = useReducer(
    AttachmentReducer,
    AttachmentReducerInitState
  );

  const getSelector = useCallback(() => {
    return {
      selectAttachments: Object.entries(state),
      selectAttachmentsQuantity: Object.keys(state).length,
    };
  }, [state]);

  const addAttachments = useCallback((files: File[]) => {
    dispatch({ type: "ADD_ATTACHMENT", payload: files });
  }, []);

  const removeAttachments = useCallback((id: string) => {
    dispatch({ type: "REMOVE_ATTACHMENT", payload: id });
  }, []);

  const clearAttachments = useCallback(() => {
    dispatch({ type: "CLEAR_ATTACHMENT" });
  }, []);

  const reducerMethod = useMemo(() => {
    return { getSelector, addAttachments, removeAttachments, clearAttachments };
  }, [getSelector, addAttachments, removeAttachments, clearAttachments]);

  return reducerMethod;
};

export default useAttachmentReducer;
