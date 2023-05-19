import { useCallback } from "react";

const useListenLeavedRoom = () => {
  const handleLeavedRoom = useCallback((payload: any) => {
    console.log({ payload, message: "Leaving room" });
  }, []);

  return handleLeavedRoom;
};

export default useListenLeavedRoom;
