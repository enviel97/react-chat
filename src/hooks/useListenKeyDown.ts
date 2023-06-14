import { safeLog } from "@core/api/utils/logger";
import { useCallback, useEffect, useMemo } from "react";
type ListenKeyDownNativeFunction = (event: KeyboardEvent) => void;

type Key = "enter" | "escape";

interface ListenKeyDownProps {
  key: Key;
  readonly listener: ListenKeyDownNativeFunction;
}

const useListenKeyDown = (...listenerMap: ListenKeyDownProps[]) => {
  const callbackWrapper = useCallback(
    (callback: ListenKeyDownNativeFunction) => {
      return (event: KeyboardEvent) => {
        event.preventDefault();
        if (event.repeat) return;
        callback(event);
      };
    },
    []
  );

  const keyMap = useMemo(() => {
    return new Map<string, ListenKeyDownNativeFunction>(
      listenerMap.map(({ key, listener }) => [key, callbackWrapper(listener)])
    );
  }, [listenerMap, callbackWrapper]);

  const errorNotification = useCallback(() => {
    safeLog("[Listen keydown]: target error");
  }, []);

  useEffect(() => {
    const listenTrigger = (event: KeyboardEvent) => {
      const callback = keyMap.get(event.key.toLowerCase());
      if (!callback) return;
      callback(event);
    };

    document.addEventListener("keydown", listenTrigger);
    return () => document.removeEventListener("keydown", listenTrigger);
  }, [errorNotification, keyMap]);
};

export default useListenKeyDown;
