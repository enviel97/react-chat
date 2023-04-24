import { ButtonIconNeumorphism } from "@components/Button";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { RiCloseLine } from "react-icons/ri";
import {
  CloseButtonContainer,
  ModalContainer,
} from "../styles/decorates/Modal.decorate";
import { dropIn } from "../styles/variants/modal.variants";
import Backdrop from "./Backdrop";

type Props = ModalProps & ModalOptions;

const Modal = (props: Props) => {
  const {
    isDialog = true,
    showCloseButton = true,
    height = "25rem",
    width = "35rem",
    isDisableExitClose = false,
    handleClose,
  } = props;
  const tabRef = useRef(0);
  const focusableModalElements = useRef<NodeListOf<Element>>();

  const modalRef = useRef<HTMLDivElement>(null);

  const handleTabKey = useCallback(
    (e: any) => {
      if (!modalRef.current || !focusableModalElements.current) {
        return;
      }
      const focusElements = focusableModalElements.current;
      if (tabRef.current === focusElements.length - 1) {
        tabRef.current = 0;
      } else {
        tabRef.current = tabRef.current + 1;
      }
      const element = focusElements.item(tabRef.current) as HTMLElement;
      element.focus();
      return e.preventDefault();
    },
    [modalRef]
  );
  const handleEscKey = useCallback(() => {
    if (isDisableExitClose || !handleClose) return;
    handleClose();
  }, [isDisableExitClose, handleClose]);

  const keyListenersMap = useMemo(
    () =>
      new Map([
        ["Escape", handleEscKey],
        ["Tab", handleTabKey],
      ]),
    [handleTabKey, handleEscKey]
  );

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;
    modal.focus();

    const focusable = modal.querySelectorAll(
      'a[href], button:not([itemtype="close"]), textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    focusableModalElements.current = focusable;
  }, [modalRef]);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;
    const keyListener = (e: any) => {
      const listener = keyListenersMap.get(e.key);
      listener && listener(e);
    };
    modal.addEventListener("keydown", keyListener);

    return () => modal.removeEventListener("keydown", keyListener);
  }, [keyListenersMap, modalRef]);

  return (
    <Backdrop onClick={!isDialog ? props.handleClose : undefined}>
      <ModalContainer
        id='cc'
        ref={modalRef}
        height={height}
        width={width}
        variants={dropIn}
        initial='hidden'
        animate='visible'
        exit='exit'
        aria-modal='true'
        tabIndex={0}
        role={"dialog"}
        // Prevent click
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
        {showCloseButton && (
          <CloseButtonContainer tabIndex={-1} onClick={props.handleClose}>
            <ButtonIconNeumorphism
              itemType='close'
              icon={<RiCloseLine />}
              hint={"Close modal"}
              size={"2em"}
            />
          </CloseButtonContainer>
        )}
      </ModalContainer>
    </Backdrop>
  );
};

export default Modal;
