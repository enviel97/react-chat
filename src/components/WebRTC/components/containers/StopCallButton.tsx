import useAppDispatch from "@hooks/useAppDispatch";
import { closeCallView } from "@store/slices/call";
import { memo, useCallback } from "react";
import IconButton from "../ui/IconButton";

const StopCallButton = () => {
  const dispatch = useAppDispatch();

  const handleReject = useCallback(async () => {
    dispatch(closeCallView());
  }, [dispatch]);
  return <IconButton type='PhoneOff' onClick={handleReject} />;
};

export default memo(StopCallButton);
