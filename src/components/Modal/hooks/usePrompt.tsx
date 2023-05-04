import { ReactNode, useCallback, useEffect, useState } from "react";
import { useModals } from "./useModals";
import { useNavigate } from "react-router-dom";
import useBlocker from "@context/hooks/useBlocker";
import ModalConfirm from "../components/ModalConfirm";

interface PromptProps {
  when?: boolean;
  option?: ModalOptions;
}

interface ContentCallback {
  onConfirm: () => void;
  onReject: () => void;
}

const MODAL_ID = Symbol("BlockedModalDefault").toString();

export function usePrompt(
  content: ((props: ContentCallback) => ReactNode) | string,
  {
    when = false,
    option = { modalId: MODAL_ID, height: "fit-content", width: "fit-content" },
  }: PromptProps
) {
  const { show } = useModals();
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);
  const navigator = useNavigate();

  const handleConfirmNavigate = useCallback(() => {
    setConfirmedNavigation(true);
  }, []);
  const handleBlockNavigate = useCallback(() => {
    setConfirmedNavigation(false);
  }, []);

  const blocker = useBlocker(
    useCallback(() => {
      const builder =
        typeof content === "string" ? (
          <ModalConfirm
            modalKey={MODAL_ID}
            content={content}
            onConfirm={handleConfirmNavigate}
            onBack={handleBlockNavigate}
          />
        ) : (
          content({
            onConfirm: handleConfirmNavigate,
            onReject: handleBlockNavigate,
          })
        );
      show(builder, { ...option, isDisableExitClose: true, isDialog: true });
      return when;
    }, [when, content, handleBlockNavigate, handleConfirmNavigate])
  );

  useEffect(() => {
    if (!when) return;
    if (blocker.state === "blocked" && confirmedNavigation) {
      blocker.reset();
      navigator(blocker.location.pathname);
    }
  }, [blocker, when, navigator, confirmedNavigation]);
}
