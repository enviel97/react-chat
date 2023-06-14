import useListenKeyDown from "@hooks/useListenKeyDown";
import { AnimatePresence } from "framer-motion";
import { createContext, FC, useCallback, useMemo, useState } from "react";

import Overplay from "./components/ui/Overlay";
import ModalContainer from "./components/ui/Modal";
import ModalAction from "./components/ui/ModalAction";

export const AttachmentSlideContext = createContext<AttachmentSlideController>({
  closeSlide() {
    throw new Error("Method not implement");
  },
  openSlide() {
    throw new Error("Method not implement");
  },
});

const AttachmentSideProvider: FC<Components> = ({ children }) => {
  const [isOpen, setOpen] = useState(false);
  const [attachments, setAttachments] = useState<MessageAttachments[]>();
  const [defaultSelect, setDefaultSelect] = useState(0);

  useListenKeyDown({
    key: "escape",
    listener() {
      isOpen && setOpen(false);
    },
  });

  const onOpen = useCallback(
    ({ attachments, defaultIndex }: OpenSlideProps) => {
      setAttachments(attachments);
      setDefaultSelect(defaultIndex);
      setOpen(true);
    },
    []
  );

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onDownLoad = useCallback((downloadLink: string) => {
    throw new Error("Function not implement.");
  }, []);

  const value = useMemo(
    () => ({
      closeSlide: onClose,
      openSlide: onOpen,
    }),
    [onOpen, onClose]
  );

  return (
    <AttachmentSlideContext.Provider value={value}>
      <AnimatePresence>
        {isOpen && attachments?.isNotEmpty() && (
          <Overplay onClick={() => isOpen && setOpen(false)}>
            <ModalContainer
              attachments={attachments}
              defaultIndex={defaultSelect}
            >
              <ModalAction download={onDownLoad} closeModal={onClose} />
            </ModalContainer>
          </Overplay>
        )}
      </AnimatePresence>
      {children}
    </AttachmentSlideContext.Provider>
  );
};

export default AttachmentSideProvider;
