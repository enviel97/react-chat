import { AnimatePresence } from "framer-motion";
import { FC, useEffect, useId, useState } from "react";
import useAppSelector from "@hooks/useAppSelector";
import { State } from "@store/common/state";
import { selectMessageById } from "@store/slices/messages";
import ErrorIcon from "./components/ErrorIcon";
import SuccessIcon from "./components/SuccessIcon";
import containerVariants from "./variants/container.variant";
import {
  KTooltip,
  PromiseLoadingContainer,
} from "./styles/PromiseLoading.decorate";

const PromiseLoading: FC<{ messageId: string }> = ({ messageId }) => {
  const message = useAppSelector((state) =>
    selectMessageById(state, messageId)
  );
  const [hasError, setError] = useState<boolean>(false);
  const [isPending, setPending] = useState<boolean | undefined>();
  const hintId = useId();

  useEffect(() => {
    if (!message) return;
    switch (message.modified) {
      case State.IDLE: {
        setPending(undefined);
        break;
      }
      case State.FULFILLED: {
        setPending(false);
        setError(false);
        break;
      }
      case State.ERROR: {
        setPending(false);
        setError(true);
        break;
      }
      case State.PENDING: {
        setPending(true);
        setError(false);
        break;
      }
    }
  }, [message]);

  if (isPending === undefined) return <></>;

  return (
    <AnimatePresence mode='wait' presenceAffectsLayout>
      <PromiseLoadingContainer
        id={hintId}
        variants={containerVariants}
        initial='initial'
        animate={isPending ? "loading" : hasError ? "error" : "success"}
      >
        {hasError ? <ErrorIcon /> : <SuccessIcon />}
        <KTooltip
          id='tooltip'
          anchorId={hintId}
          content={isPending ? "Sending" : hasError ? "Error" : "Sent"}
          place={"top"}
        />
      </PromiseLoadingContainer>
    </AnimatePresence>
  );
};

export default PromiseLoading;
