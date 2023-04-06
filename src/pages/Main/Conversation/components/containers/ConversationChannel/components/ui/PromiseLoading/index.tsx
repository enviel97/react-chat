import { AnimatePresence } from "framer-motion";
import { FC, useEffect, useId, useState } from "react";
import useAppSelector from "@hooks/useAppSelector";
import { State } from "@store/common/state";
import { selectMessageById } from "@store/slices/messages";
import containerVariants from "./variants/container.variant";
import {
  HintContainer,
  KTooltip,
  PromiseLoadingContainer,
} from "./styles/PromiseLoading.decorate";
import { FaCheck, FaExclamation } from "react-icons/fa";

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
    <HintContainer id={hintId}>
      <AnimatePresence mode='wait' presenceAffectsLayout>
        <PromiseLoadingContainer
          variants={containerVariants}
          initial='initial'
          animate={isPending ? "loading" : hasError ? "error" : "success"}
        >
          {hasError ? <FaExclamation /> : <FaCheck />}
        </PromiseLoadingContainer>
      </AnimatePresence>
      <KTooltip
        id='tooltip'
        anchorId={hintId}
        content={isPending ? "Sending" : hasError ? "Error" : "Sent"}
        place={"top"}
      />
    </HintContainer>
  );
};

export default PromiseLoading;
