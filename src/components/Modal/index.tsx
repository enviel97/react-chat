import { AnimatePresence } from "framer-motion";
import { createContext, ReactElement, useMemo, useRef, useState } from "react";
import Modal from "./components/Modal";
import useId from "./hooks/useId";

export const ModalContext = createContext({
  show: (modalContent: any, options?: ModalOptions) => {},
  close: (id: string) => {},
  closeAll: () => {},
});

const ModalProvider = (props: Components) => {
  const modalIds = useRef<Map<string, number>>(new Map());
  const [modals, setModals] = useState<ReactElement[]>([]);
  const uid = useId();

  const actions = useMemo(
    () => ({
      close: (id: string) => {
        setModals((prevModals) => prevModals.filter((m) => m.key !== id));
        modalIds.current.delete(id);
      },
      show: (children: any, options?: ModalOptions) => {
        const modalId = options?.modalId ?? uid();
        if (!modalIds.current.has(modalId)) {
          const close = () => {
            options?.handleClose && options.handleClose();
            setModals((prevModals) =>
              prevModals.filter((m) => m.key !== modalId)
            );
            modalIds.current.delete(modalId);
          };
          const modal = (
            <Modal {...options} key={modalId} handleClose={close}>
              {children}
            </Modal>
          );
          setModals((prevModal) => [...prevModal, modal]);
          modalIds.current.set(modalId, 0);
        }
        return modalId;
      },
      closeAll: () => {
        setModals([]);
        modalIds.current.clear();
      },
    }),
    [uid]
  );

  return (
    <ModalContext.Provider value={actions}>
      <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
        {modals}
      </AnimatePresence>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
