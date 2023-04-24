import { AnimatePresence } from "framer-motion";
import {
  createContext,
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
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

  const closeModal = useCallback((id: string) => {
    setModals((prevModals) => prevModals.filter((m) => m.key !== id));
    modalIds.current.delete(id);
  }, []);

  const showModal = useCallback(
    (children: any, options?: ModalOptions) => {
      const modalId = options?.modalId ?? uid();
      if (!modalIds.current.has(modalId)) {
        const modal = (
          <Modal
            {...options}
            key={modalId}
            handleClose={() => {
              options?.handleClose && options.handleClose();
              closeModal(modalId);
            }}
          >
            {children}
          </Modal>
        );
        setModals((prevModal) => [...prevModal, modal]);
        modalIds.current.set(modalId, 0);
      }
      return modalId;
    },
    [closeModal, uid]
  );

  const clearAll = useCallback(() => {
    setModals([]);
    modalIds.current.clear();
  }, []);

  const actions = useMemo(
    () => ({
      close: closeModal,
      show: showModal,
      closeAll: clearAll,
    }),
    [closeModal, showModal, clearAll]
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
