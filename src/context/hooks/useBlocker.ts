import { RouterContext } from "@context/provider/RouterProvider";
import { safeLog } from "@core/api/utils/logger";
import { useCallback, useContext, useMemo } from "react";
import { createBrowserRouter, useBeforeUnload } from "react-router-dom";
const BLOCKER = "1";

const useBlocker = (when: (() => boolean) | boolean) => {
  const router = useContext(RouterContext) as ReturnType<
    typeof createBrowserRouter
  >;

  const beforeUnload = useCallback(
    (e: BeforeUnloadEvent) => {
      // Default notification off browser
      const shouldBlock = typeof when === "boolean" ? when : when();
      if (shouldBlock) {
        // Cancel the event.
        e.preventDefault();
        // Chrome (and legacy IE) requires returnValue to be set.
        e.returnValue = "";
        return;
      }
    },
    [when]
  );

  useBeforeUnload(beforeUnload, { capture: true });

  const blocker = useMemo(() => {
    return router.getBlocker(
      BLOCKER,
      ({ currentLocation, nextLocation, historyAction }) => {
        const shouldBlock = typeof when === "boolean" ? when : when();
        safeLog({ currentLocation, nextLocation, historyAction });
        return shouldBlock;
      }
    );
  }, [when, router]);

  return blocker;
};
export default useBlocker;
