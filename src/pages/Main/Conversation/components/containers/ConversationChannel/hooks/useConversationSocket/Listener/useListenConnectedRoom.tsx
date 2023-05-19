import { useCallback } from "react";

const useListenConnectedRoom = () => {
  const handleConnectedRoom = useCallback((payload: any) => {
    console.log({ payload, message: "Connected Room" });
  }, []);

  return handleConnectedRoom;
};

export default useListenConnectedRoom;
