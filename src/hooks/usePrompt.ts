import { useCallback, useContext, useEffect } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";

function useConfirmExit(confirmExit: () => boolean, when = true) {
  const { navigator } = useContext(NavigationContext);

  useEffect(() => {
    if (!when) {
      return;
    }

    const push = navigator.push;

    navigator.push = (...args: Parameters<typeof push>) => {
      const result = confirmExit();
      if (result !== false) {
        push(...args);
      }
    };

    return () => {
      navigator.push = push;
    };
  }, [navigator, confirmExit, when]);
}

interface PromptOption {
  message: string;
  onConfirm?: () => void;
}

export default function usePrompt(when = true, options?: PromptOption) {
  const { message, onConfirm } = options ?? {
    message: "You must done action before move to next page",
  };

  useEffect(() => {
    if (when) {
      window.onbeforeunload = function () {
        return message;
      };
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [message, when]);

  const confirmExit = useCallback(() => {
    const confirm = window.confirm(message);
    if (confirm && !!onConfirm) {
      onConfirm();
    }
    return confirm;
  }, [message, onConfirm]);
  useConfirmExit(confirmExit, when);
}
