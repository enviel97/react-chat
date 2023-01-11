import { AnimatePresence } from "framer-motion";
import { createContext, ReactElement, useMemo, useState } from "react";
import Modal from "./components/Modal";
import useId from "./hooks/useId";

export const ModalContext = createContext({
  show: (modalContent: any, options?: ModalOptions) => {},
  close: (id: string) => {},
  closeAll: () => {},
});

const ModalProvider = (props: Components) => {
  const [modals, setModals] = useState<ReactElement[]>([]);
  const uid = useId();

  const actions = useMemo(
    () => ({
      close: (id: string) => {
        setModals((prevModals) => prevModals.filter((m) => m.key !== id));
      },
      show: (children: any, options?: ModalOptions) => {
        const key = options?.modalId ?? uid();
        const close = () => {
          setModals((prevModals) => prevModals.filter((m) => m.key !== key));
        };
        const modal = (
          <Modal {...options} key={key} handleClose={close}>
            {children}
          </Modal>
        );
        setModals((prevModal) => [...prevModal, modal]);
        return key;
      },
      closeAll: () => {
        setModals([]);
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
